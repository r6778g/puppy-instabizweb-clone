import { createClient } from '@supabase/supabase-js';
import type { Puppy, FaqItem, JourneyStep, PolaroidPhoto } from '@/types';

function db() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type DbPuppy = { id: string; name: string; breed: string; gender: Puppy['gender']; display_age: string | null; status: string; image_url: string; origin: string; description: string | null; accent_color: string | null; has_video: boolean };
const toPuppy = (p: DbPuppy): Puppy => ({ id: p.id, name: p.name, breed: p.breed, gender: p.gender, age: p.display_age || '', status: p.status === 'gone_home' ? 'Gone home' : p.status === 'reserved' ? 'Reserved' : 'Available', image: p.image_url, href: `/puppies/${p.id}`, origin: p.origin === 'Korea' ? 'imported' : 'local', meta: p.description || undefined, color: p.accent_color || '#785838', hasVideo: p.has_video });

async function query<T>(run: () => PromiseLike<{ data: T[] | null; error: { message: string } | null }>) {
  const { data, error } = await run();
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getPuppies(status = 'available') { "use cache"; return (await query(() => db().from('puppies').select('*').eq('status', status).order('created_at', { ascending: true }))).map(toPuppy); }
export async function getPuppy(slug: string) { "use cache"; const rows = await query(() => db().from('puppies').select('*').eq('id', slug).limit(1)); return rows[0] ? toPuppy(rows[0] as DbPuppy) : null; }
export async function getFaqs(): Promise<FaqItem[]> { "use cache"; return query(() => db().from('faqs').select('id, question, answer').eq('is_published', true).order('sort_order')); }
export async function getJourneySteps(): Promise<JourneyStep[]> { "use cache"; return (await query(() => db().from('journey_steps').select('step_number, title, description').order('step_number'))).map((x: { step_number: number; title: string; description: string }) => ({ step: x.step_number, title: x.title, description: x.description })); }
export async function getPolaroids(): Promise<PolaroidPhoto[]> { "use cache"; return (await query(() => db().from('gallery').select('*').like('source_key', 'polaroid-%').order('sort_order'))).map((x: any, i: number) => ({ id: i + 1, image: x.image_url, caption: x.caption || '', style: `--tilt:${x.display_tilt || '0deg'};--tape:${x.tape_color || '#f6d79a'};--i:${i}`, family: x.family || undefined, location: x.location || undefined })); }
export async function getFamilyGallery() { "use cache"; return query(() => db().from('gallery').select('*').not('source_key', 'like', 'polaroid-%').order('sort_order')); }
export async function getTestimonial() { "use cache"; const rows = await query(() => db().from('testimonials').select('*').eq('id', 'main-testimonial').limit(1)); return rows[0] || null; }
