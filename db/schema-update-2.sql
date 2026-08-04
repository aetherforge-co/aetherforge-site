-- ============================================================
-- AETHERFORGE — schema update 2
-- Adds: (1) an updated_at timestamp that auto-refreshes whenever
-- a design row changes, so customers can see "last updated" info,
-- and (2) permission for customers to edit their own submissions.
-- Safe to run even if you've already run this before.
-- ============================================================

alter table public.designs add column if not exists updated_at timestamptz not null default now();

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists designs_set_updated_at on public.designs;
create trigger designs_set_updated_at
  before update on public.designs
  for each row execute function public.set_updated_at();

drop policy if exists "Users can update their own designs" on public.designs;
create policy "Users can update their own designs"
  on public.designs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
