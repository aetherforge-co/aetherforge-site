-- ============================================================
-- AETHERFORGE — schema update 5 (security hardening)
-- Enforces upload limits at the STORAGE layer, not just in the
-- browser. The 50MB check in account.js can be bypassed by
-- calling the Supabase API directly, so without this a single
-- request could exhaust the storage quota.
-- Safe to re-run.
-- ============================================================

-- Design files: 50MB cap, matching what the UI promises.
-- MIME types are deliberately NOT restricted here: browsers report
-- CAD formats inconsistently (an .stl often arrives as an empty type
-- or application/octet-stream), so an allowlist would reject genuine
-- customer uploads. Size is the control that actually matters for
-- quota abuse; the bucket is private and served only via signed URLs.
update storage.buckets
   set file_size_limit = 52428800          -- 50 MiB
 where id = 'designs';

-- Avatars: 5MB cap and a real image allowlist. Unlike CAD files,
-- browser image MIME types are reliable, so this one can be strict.
update storage.buckets
   set file_size_limit = 5242880,          -- 5 MiB
       allowed_mime_types = array[
         'image/png','image/jpeg','image/jpg','image/webp','image/gif'
       ]
 where id = 'avatars';

-- Confirm what landed
select id, file_size_limit, allowed_mime_types
  from storage.buckets
 where id in ('designs','avatars');
