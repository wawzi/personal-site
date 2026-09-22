-- ════════════════════════════════════════════════════════════════
-- Phase 2 — the private wing: notes and diary
--
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New
-- query → paste → Run). It is idempotent; running it twice is safe.
--
-- SECURITY NOTE: the publishable key is public, so every table here
-- has Row Level Security enabled and a policy scoping rows to their
-- owner. A table without RLS is readable by anyone on the internet.
-- ════════════════════════════════════════════════════════════════

-- ── Shared: keep updated_at honest ──────────────────────────────

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Notes ───────────────────────────────────────────────────────

create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  title       text not null default '',
  body        text not null default '',
  tags        text[] not null default '{}',
  pinned      boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists notes_user_updated_idx
  on public.notes (user_id, updated_at desc);

create index if not exists notes_user_pinned_idx
  on public.notes (user_id, pinned, updated_at desc);

alter table public.notes enable row level security;

drop policy if exists "notes are private to their owner" on public.notes;
create policy "notes are private to their owner"
  on public.notes
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop trigger if exists notes_touch_updated_at on public.notes;
create trigger notes_touch_updated_at
  before update on public.notes
  for each row execute function public.touch_updated_at();

-- ── Diary ───────────────────────────────────────────────────────

create table if not exists public.diary_entries (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  -- When the entry is *about*. Defaults to now, but is editable, so a
  -- late-night entry can be filed under the day it belongs to.
  entry_at    timestamptz not null default now(),
  title       text not null default '',
  body        text not null default '',
  mood        text,
  weather     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists diary_user_entry_at_idx
  on public.diary_entries (user_id, entry_at desc);

alter table public.diary_entries enable row level security;

drop policy if exists "diary entries are private to their owner" on public.diary_entries;
create policy "diary entries are private to their owner"
  on public.diary_entries
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop trigger if exists diary_touch_updated_at on public.diary_entries;
create trigger diary_touch_updated_at
  before update on public.diary_entries
  for each row execute function public.touch_updated_at();
