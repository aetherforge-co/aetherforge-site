-- ============================================================
-- AETHERFORGE — schema update 3
-- Adds a private storage bucket for profile pictures. Each user's
-- avatar lives at avatars/<user_id>/avatar and is only readable
-- by that user (via a signed URL the app generates), same pattern
-- as the designs bucket. No new table needed — the reference to
-- "you have an avatar" is stored in Supabase Auth's own user
-- metadata, not a database row.
-- Safe to re-run.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', false)
on conflict (id) do nothing;

drop policy if exists "Users can upload their own avatar" on storage.objects;
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can update their own avatar" on storage.objects;
create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can view their own avatar" on storage.objects;
create policy "Users can view their own avatar"
  on storage.objects for select
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete their own avatar" on storage.objects;
create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
