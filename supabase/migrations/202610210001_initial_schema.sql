-- Run this migration in Supabase SQL Editor, or with: supabase db push

create table public.puppies (
  -- Text IDs match the existing site slugs (for example: "max-maltipoo-male").
  id text primary key check (char_length(id) between 2 and 120),
  name text not null,
  breed text not null,
  gender text not null check (gender in ('boy', 'girl', 'boy & girl')),
  age_months smallint not null check (age_months >= 0 and age_months <= 24),
  status text not null default 'available'
    check (status in ('available', 'reserved', 'gone_home')),
  image_url text not null,
  video_url text,
  origin text not null check (origin in ('Dubai', 'Korea')),
  description text,
  created_at timestamptz not null default now()
);

create index puppies_status_created_at_idx on public.puppies (status, created_at desc);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (char_length(phone) between 5 and 40),
  email text,
  area text,
  message text,
  puppy_id text references public.puppies(id) on delete set null,
  created_at timestamptz not null default now()
);

create index enquiries_created_at_idx on public.enquiries (created_at desc);
create index enquiries_puppy_id_idx on public.enquiries (puppy_id);

create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

alter table public.puppies enable row level security;
alter table public.enquiries enable row level security;
alter table public.gallery enable row level security;

-- Public visitors can view published content. Enquiries stay private and are
-- inserted only from the server API using the service-role key.
create policy "Public can read puppies"
  on public.puppies for select using (true);
create policy "Public can read gallery"
  on public.gallery for select using (true);
