alter table public.puppies alter column age_months drop not null;
alter table public.puppies alter column age_months type numeric(3, 1);
alter table public.puppies add column if not exists display_age text;
alter table public.puppies add column if not exists accent_color text;
alter table public.puppies add column if not exists has_video boolean not null default false;

alter table public.gallery add column if not exists source_key text unique;
alter table public.gallery add column if not exists category text not null default 'happy_family';
alter table public.gallery add column if not exists alt_text text;
alter table public.gallery add column if not exists family text;
alter table public.gallery add column if not exists location text;
alter table public.gallery add column if not exists display_tilt text;
alter table public.gallery add column if not exists tape_color text;
alter table public.gallery add column if not exists sort_order integer not null default 0;

create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null,
  is_published boolean not null default true
);

create table if not exists public.journey_steps (
  step_number integer primary key,
  title text not null,
  description text not null
);

create table if not exists public.trust_stamps (
  id text primary key,
  title text not null,
  description text not null,
  stamp_type text not null,
  color text,
  display_tilt text,
  sort_order integer not null
);

create table if not exists public.testimonials (
  id text primary key,
  quote text not null,
  author_name text not null,
  location text,
  is_published boolean not null default true
);

alter table public.faqs enable row level security;
alter table public.journey_steps enable row level security;
alter table public.trust_stamps enable row level security;
alter table public.testimonials enable row level security;

create policy "Public can read FAQs" on public.faqs for select using (is_published);
create policy "Public can read journey steps" on public.journey_steps for select using (true);
create policy "Public can read trust stamps" on public.trust_stamps for select using (true);
create policy "Public can read testimonials" on public.testimonials for select using (is_published);
