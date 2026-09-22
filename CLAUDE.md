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
| 1 | Public hub — home, blog, books, gallery, codex, about | **done (seed data)** |
| 2 | Auth, diary (dated entries), notes CRUD | not started |
| 3 | The Codex — articles, timelines, calendars, historical events, maps + metadata, manuscripts, secrets | not started |
| 4 | Content trees, interactive tables, whiteboards (tldraw) | not started |

## Decisions made

- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.**
- **Aesthetic: the old personal homepage, done cleanly.** Web rings,
  guestbook, status and now-playing widgets, a hit counter, 88x31 buttons,
  a scrolling ticker — the indie-web vocabulary, executed with restraint
  rather than tiled backgrounds. Dense and characterful, never corporate.
  Warm cream and bronze by day, dark leather and candle-brass by night.
  Cormorant Garamond (display), EB Garamond (body), IBM Plex Mono (labels).

  **An earlier build read as a literary journal** — one long page, airy,
  quiet. That was the wrong target and was replaced. If a change starts
  making the site feel like a brochure, it is going the wrong way.

- **Multi-page, not one scroll.** Every section is its own route and every
  route is listed in the always-visible section nav (`lib/nav.ts`). Do not
  collapse sections back onto the home page.
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
  genuinely requires it (currently the gallery, the theme toggle, and the
  section nav, which needs `usePathname`).
- `Panel` is the basic layout unit — a bordered box with a labelled title
  bar. Side-rail widgets live in `components/widgets/`, site chrome in
  `components/chrome/`.
- Body type is set small (0.9375rem) on purpose. This layout wants density.
- Display numerals need the `.lining` class; the body default is old-style
  figures, which read as letters at large sizes.
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
- The guestbook and the visitor counter are **shells**. Both are labelled
  in the UI as not yet wired and both need somewhere to persist. Do not
  fake either with client-side state.
- `/codex` is the public lobby for the worldbuilding wing. The editors and
  the private material go behind the login in Phase 3.
