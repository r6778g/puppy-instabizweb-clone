import { NextResponse } from 'next/server';
import {
  getFamilyGallery,
  getFaqs,
  getJourneySteps,
  getPolaroids,
  getPuppies,
  getPuppy,
  getTestimonial,
} from '@/lib/content';

type Resource = 'puppies' | 'faqs' | 'journey' | 'polaroids' | 'families' | 'testimonial';

export async function GET(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params;
  const { searchParams } = new URL(request.url);

  try {
    switch (resource as Resource) {
      case 'puppies': {
        const slug = searchParams.get('slug');
        return NextResponse.json(slug ? await getPuppy(slug) : await getPuppies(searchParams.get('status') || 'available'));
      }
      case 'faqs': return NextResponse.json(await getFaqs());
      case 'journey': return NextResponse.json(await getJourneySteps());
      case 'polaroids': return NextResponse.json(await getPolaroids());
      case 'families': return NextResponse.json(await getFamilyGallery());
      case 'testimonial': return NextResponse.json(await getTestimonial());
      default: return NextResponse.json({ error: 'Unknown content resource.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Content API error:', error);
    return NextResponse.json({ error: 'Could not load content.' }, { status: 500 });
  }
}
