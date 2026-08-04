-- ============================================================
-- AETHERFORGE — schema update 6 (access control hardening)
--
-- Row Level Security decides WHICH ROWS a customer may update,
-- but not WHICH COLUMNS. The designs update policy therefore let
-- a customer change any field on their own row — including
-- `status`. That meant a customer could mark their own submission
-- 'quoted' or 'completed' and desynchronise your pipeline, and
-- could also write arbitrary text into a field the site renders.
--
-- Column-level privileges close that: customers may edit only the
-- two fields the UI actually offers. Everything else — status,
-- file_path, user_id, timestamps — becomes staff-only, writable
-- through the service role key (which bypasses these grants).
-- Safe to re-run.
-- ============================================================

-- Start from no update rights, then hand back only what's needed.
revoke update on public.designs from authenticated;
grant  update (title, description) on public.designs to authenticated;

-- Insert/select/delete are unchanged and still governed by RLS.
grant select, insert, delete on public.designs to authenticated;

-- Orders were already read-only for customers; state it explicitly
-- so a future policy change can't silently widen it.
revoke insert, update, delete on public.orders from authenticated;
grant  select on public.orders to authenticated;

-- Confirm what customers can now do
select table_name, privilege_type, column_name
  from information_schema.column_privileges
 where grantee = 'authenticated'
   and table_name in ('designs','orders')
   and privilege_type = 'UPDATE'
 order by table_name, column_name;
