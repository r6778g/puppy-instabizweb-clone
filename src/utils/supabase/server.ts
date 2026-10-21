import { createServerClient } from '@supabase/ssr';
import type { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function createClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error('Missing Supabase public environment variables.');
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot set cookies. The proxy refreshes sessions instead.
        }
      },
    },
  });
}
