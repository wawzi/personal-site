/**
 * Domain types for the public hub.
 *
 * These are deliberately storage-agnostic. Today `lib/content.ts`
 * satisfies them from a literal; when the database lands, only that
 * module changes — every component below it keeps its contract.
 */

export type ReadingStatus = "read" | "reading" | "shelved" | "abandoned";

export interface Book {
  id: string;
  title: string;
  author: string;
  /** First publication, not the edition read. */
  year?: number;
  status: ReadingStatus;
  /** ISO date; present when status is "read". */
  finishedOn?: string;
  /** 1–5, half-steps allowed. Omit to withhold judgement. */
  rating?: number;
  note?: string;
  tags: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  author: string;
  year?: number;
  /** Why it belongs here specifically. */
  why: string;
  pairsWith?: string;
}

export interface Writing {
  id: string;
  slug: string;
  title: string;
  dek: string;
  publishedOn: string;
  readingMinutes: number;
  tags: string[];
  /** Drafts render in the index only when signed in. */
  draft?: boolean;
}

export interface Plate {
  id: string;
  title: string;
  caption?: string;
  /** Drives the gallery's show/hide filter. */
  collection: string;
  capturedOn?: string;
  place?: string;
  src: string;
  width: number;
  height: number;
}

/* ── Homepage furniture ──────────────────────────────────── */

export interface SiteStatus {
  /** One word for the top line, e.g. "writing", "reading", "away". */
  state: string;
  mood?: string;
  weather?: string;
  vibe?: string;
}

export interface NowPlaying {
  track: string;
  source: string;
}

export interface CurrentlyItem {
  label: string;
  value: string;
}

export interface SiteUpdate {
  id: string;
  /** Free text, not a strict date — "Aug 2026", "last night". */
  when: string;
  text: string;
  tag?: string;
}

export interface RingSite {
  name: string;
  href: string;
}

/* ── The private wing ────────────────────────────────────── */

export interface Note {
  id: string;
  user_id: string;
  title: string;
  body: string;
  tags: string[];
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface DiaryEntry {
  id: string;
  user_id: string;
  /** When the entry is about — editable, unlike created_at. */
  entry_at: string;
  title: string;
  body: string;
  mood: string | null;
  weather: string | null;
  created_at: string;
  updated_at: string;
}
