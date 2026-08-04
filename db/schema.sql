-- ============================================================
-- AETHERFORGE — accounts + saved designs schema
-- Paste this whole file into Supabase SQL Editor and run it.
-- Safe to re-run even if part of it already ran before.
-- Supabase's built-in `auth.users` table handles the actual
-- accounts (signup/login/password) — we don't touch that here,
-- we just reference it.
-- ============================================================

-- Designs customers submit for us to make
create table if not exists public.designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  file_path text,               -- path inside the 'designs' storage bucket, if a file was uploaded
  status text not null default 'submitted',  -- submitted | reviewing | quoted | in_production | completed | declined
  created_at timestamptz not null default now()
);

-- Row Level Security: without this, anyone with the anon key could
-- read or write every customer's designs. This restricts every row
-- to the user who owns it.
alter table public.designs enable row level security;

drop policy if exists "Users can view their own designs" on public.designs;
create policy "Users can view their own designs"
  on public.designs for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own designs" on public.designs;
create policy "Users can insert their own designs"
  on public.designs for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own designs" on public.designs;
create policy "Users can delete their own designs"
  on public.designs for delete
  using (auth.uid() = user_id);

-- Storage bucket for uploaded design files (images, STL, PDF, etc.)
-- Not public — files are only reachable via signed URLs we generate
-- for the owning user.
insert into storage.buckets (id, name, public)
values ('designs', 'designs', false)
on conflict (id) do nothing;

-- Storage policies: each user's files live under a folder named
-- after their own user id (e.g. designs/<user_id>/blueprint.stl),
-- and these policies enforce that they can only touch their own folder.
drop policy if exists "Users can upload to their own folder" on storage.objects;
create policy "Users can upload to their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'designs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can view their own files" on storage.objects;
create policy "Users can view their own files"
  on storage.objects for select
  using (
    bucket_id = 'designs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete their own files" on storage.objects;
create policy "Users can delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'designs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
