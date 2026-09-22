# The Commonplace

A personal encyclopedia — a public hub for reading, writing and
photographs, with a private wing for a diary, notes, and a worldbuilding
Codex.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Where things live

```
app/
  layout.tsx      fonts, metadata, theme bootstrap
  globals.css     the design system — colour tokens, type, ornaments
  page.tsx        the home page
components/       UI, server-rendered unless interaction requires otherwise
lib/
  types.ts        domain types
  content.ts      seed data (stands in for the database)
public/plates/    generated placeholder images
```

## Setup

1. Copy `.env.example` to `.env.local` and fill in the two values from
   Supabase → Project Settings → API keys. Both are public by design;
   never add the secret / service_role key.
2. Run `supabase/migrations/0001_private_wing.sql` in the Supabase SQL
   editor. It is idempotent.
3. Create your user: Supabase → Authentication → Users → Add user.
   There is no public sign-up route.

## Status

The public hub runs on seed content. The private wing — sign-in, diary
and notes — is built against Supabase. The Codex is not started. See
`CLAUDE.md` for the phase plan and the decisions taken so far.
