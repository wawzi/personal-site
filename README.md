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

## Status

The public hub is built and runs on seed content. Authentication, the
diary, notes and the Codex are not started. See `CLAUDE.md` for the phase
plan and the decisions taken so far.
