import { getSupabaseServerClient } from '@/lib/supabase/server';

type EnquiryPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  area?: unknown;
  message?: unknown;
  puppyId?: unknown;
};

const text = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export async function POST(request: Request) {
  let payload: EnquiryPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = text(payload.name, 80);
  const phone = text(payload.phone, 40);
  const email = text(payload.email, 254);
  const area = text(payload.area, 80);
  const message = text(payload.message, 2000);
  const puppyId = text(payload.puppyId, 120);
  const recipient = process.env.ENQUIRY_TO_EMAIL || 'mohitpaladiya150@gmail.com';
  const sender = process.env.ENQUIRY_FROM_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (name.length < 2 || phone.length < 5) {
    return Response.json({ error: 'Name and phone number are required.' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }
  if (!resendApiKey || !sender) {
    console.error('Enquiry email configuration is missing RESEND_API_KEY or ENQUIRY_FROM_EMAIL.');
    return Response.json({ error: 'Email service is not configured yet.' }, { status: 503 });
  }

  try {
    const { error } = await getSupabaseServerClient().from('enquiries').insert({
      name,
      phone,
      email: email || null,
      area: area || null,
      message: message || null,
      puppy_id: puppyId || null,
    });

    if (error) {
      console.error('Supabase enquiry insert failed:', error.message);
      return Response.json({ error: 'Could not save your enquiry.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Supabase configuration error:', error);
    return Response.json({ error: 'Contact service is not configured yet.' }, { status: 503 });
  }

  const emailBody = [
    'A new enquiry was submitted on the TeddyPups website.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    `Area: ${area || 'Not provided'}`,
    `Puppy of interest: ${puppyId || 'Any puppy'}`,
    '',
    'Message:',
    message || 'No message provided.',
  ].join('\n');

  let emailResponse: Response;
  try {
    emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject: 'New TeddyPups website enquiry',
        text: emailBody,
        ...(email ? { reply_to: email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error('Resend request failed:', error);
    return Response.json(
      { error: 'Your enquiry was saved, but its email notification could not be sent. Please contact us on WhatsApp.' },
      { status: 502 },
    );
  }

  if (!emailResponse.ok) {
    const details = await emailResponse.text();
    console.error('Resend email delivery failed:', emailResponse.status, details);
    return Response.json(
      { error: 'Your enquiry was saved, but its email notification could not be sent. Please contact us on WhatsApp.' },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
