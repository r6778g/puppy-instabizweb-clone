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

  if (name.length < 2 || phone.length < 5) {
    return Response.json({ error: 'Name and phone number are required.' }, { status: 400 });
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

  return Response.json({ ok: true }, { status: 201 });
}
