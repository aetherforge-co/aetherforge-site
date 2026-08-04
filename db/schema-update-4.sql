-- ============================================================
-- AETHERFORGE — schema update 4
-- Adds an orders table so purchases show up in a customer's
-- profile. Orders are only ever written by the Stripe webhook
-- (using the service role key, which bypasses RLS) — there is
-- deliberately no insert/update policy for regular users, so
-- nobody can fake an order via the public anon key.
-- Safe to re-run.
-- ============================================================

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  stripe_session_id text unique not null,
  customer_email text,
  items jsonb not null default '[]',
  amount_total numeric,
  currency text not null default 'usd',
  status text not null default 'paid',  -- paid | processing | shipped | delivered | refunded | cancelled
  tracking_number text,
  tracking_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Customers can see their own orders. No insert/update/delete policy
-- for the anon/authenticated roles on purpose — writes only happen
-- server-side via the service role key, which bypasses RLS entirely.
drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create or replace function public.set_orders_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_orders_updated_at();
