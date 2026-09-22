@AGENTS.md

# The Commonplace

A personal encyclopedia: a public hub for reading, writing and photographs,
with a private wing behind a login for a diary, notes, and a large
worldbuilding Codex supporting an in-progress novel.

**Sessions do not share memory. This file is the handover.** Anything a
future session needs to know about intent belongs here, not in chat.

## Build phases

| Phase | Scope | State |
|---|---|---|
| 0 | Scaffold, design system, fonts, theming | **done** |
| 1 | Public hub — home, shelf, writings, plates, recommendations | **done (seed data)** |
| 2 | Auth, diary (dated entries), notes CRUD | not started |
| 3 | The Codex — articles, timelines, calendars, historical events, maps + metadata, manuscripts, secrets | not started |
| 4 | Content trees, interactive tables, whiteboards (tldraw) | not started |

## Decisions made

- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.**
- **Aesthetic: antiquarian library.** Warm paper and iron-gall ink by day,
  oiled leather and candle-brass by night. Cormorant Garamond (display),
  EB Garamond (body), IBM Plex Mono (catalogue matter).
- **Theming is token-driven.** Components never write `dark:` variants —
  they use semantic colours (`bg-paper`, `text-ink`, `border-rule`,
  `text-brass`) whose values swap in `globals.css`. Keep it that way.
- **Database: undecided.** The owner knows Firebase; Firestore is a poor
  fit for the Codex's graph-shaped data and has no full-text search.
  Supabase (Postgres + auth + storage) is the standing recommendation.
  Nothing in the codebase depends on the answer yet.

## Conventions

- `lib/content.ts` is **seed data standing in for the database.** Its
  accessors are already `async` so swapping in real queries touches that
  file only. Do not import the literals directly — go through the
  accessors.
- `lib/types.ts` holds the domain types and is the contract between
  storage and UI.
- Placeholder plates in `public/plates/` are generated SVGs, not real
  photographs. They go when uploads land.
- Server components by default; `"use client"` only where interaction
  genuinely requires it (currently the gallery and the theme toggle).
- The theme toggle is deliberately stateless — both icons render and CSS
  picks one (`.only-day` / `.only-night`). Do not reintroduce mount state;
  it causes hydration mismatch and an icon flash.

## Checks before committing

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

## Not yet built (deliberately)

- The footer carries an unlabelled ornament where the private entrance
  will go. The login route is meant to be unlisted — keep it out of the
  nav and out of the sitemap.
- Writings entries render as records, not links; article pages arrive with
  the database.
