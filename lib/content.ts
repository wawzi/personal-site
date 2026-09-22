import type { Book, Plate, Recommendation, Writing } from "./types";

/**
 * SEED CONTENT — placeholder until the database is wired.
 *
 * Every export here is a plain array today and becomes an async
 * query later. Components already `await` them so that swap is
 * invisible outside this file.
 */

const books: Book[] = [
  {
    id: "bk-piranesi",
    title: "Piranesi",
    author: "Susanna Clarke",
    year: 2020,
    status: "read",
    finishedOn: "2026-08-14",
    rating: 5,
    note: "A house that is also a world, narrated by the only person who reads it correctly. The journal form does enormous work.",
    tags: ["fiction", "labyrinths", "form"],
  },
  {
    id: "bk-invisible-cities",
    title: "Invisible Cities",
    author: "Italo Calvino",
    year: 1972,
    status: "read",
    finishedOn: "2026-06-02",
    rating: 5,
    note: "Fifty-five cities, none of them real, all of them Venice. The structural table at the back is worth study on its own.",
    tags: ["fiction", "structure", "cities"],
  },
  {
    id: "bk-name-of-the-rose",
    title: "The Name of the Rose",
    author: "Umberto Eco",
    year: 1980,
    status: "read",
    finishedOn: "2026-03-19",
    rating: 4.5,
    note: "The library is the best character. Eco's postscript on how he built it is the real manual.",
    tags: ["fiction", "libraries", "medieval"],
  },
  {
    id: "bk-ficciones",
    title: "Ficciones",
    author: "Jorge Luis Borges",
    year: 1944,
    status: "reading",
    note: "Reading slowly, one story per sitting. 'Tlön' keeps rearranging what I think an encyclopedia is for.",
    tags: ["fiction", "encyclopedias", "short"],
  },
  {
    id: "bk-gormenghast",
    title: "Titus Groan",
    author: "Mervyn Peake",
    year: 1946,
    status: "reading",
    note: "Slow going by design. Peake was an illustrator first and it shows in every room.",
    tags: ["fiction", "architecture", "gothic"],
  },
  {
    id: "bk-wizard-earthsea",
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    year: 1968,
    status: "read",
    finishedOn: "2026-01-08",
    rating: 5,
    note: "The economy of it. An entire cosmology implied rather than catalogued — a standing rebuke to over-building.",
    tags: ["fiction", "restraint", "naming"],
  },
  {
    id: "bk-pale-fire",
    title: "Pale Fire",
    author: "Vladimir Nabokov",
    year: 1962,
    status: "shelved",
    note: "Waiting for a stretch of quiet. A poem plus its apparatus, where the apparatus eats the poem.",
    tags: ["fiction", "apparatus", "unreliable"],
  },
  {
    id: "bk-poetics-of-space",
    title: "The Poetics of Space",
    author: "Gaston Bachelard",
    year: 1958,
    status: "shelved",
    tags: ["nonfiction", "architecture", "interiority"],
  },
];

const recommendations: Recommendation[] = [
  {
    id: "rc-dictionary-khazars",
    title: "Dictionary of the Khazars",
    author: "Milorad Pavić",
    year: 1984,
    why: "A novel shaped as three cross-referencing encyclopedias that disagree with each other. If you want to see how far the reference-book form can be pushed as fiction, this is the far edge of it.",
    pairsWith: "Ficciones",
  },
  {
    id: "rc-jonathan-strange",
    title: "Jonathan Strange & Mr Norrell",
    author: "Susanna Clarke",
    year: 2004,
    why: "The footnotes are a second book running beneath the first, and they carry most of the worldbuilding. A working demonstration that apparatus can be the most alive part of a text.",
    pairsWith: "Piranesi",
  },
  {
    id: "rc-codex-seraphinianus",
    title: "Codex Seraphinianus",
    author: "Luigi Serafini",
    year: 1981,
    why: "An illustrated encyclopedia of an invented world written in an undecipherable script. Nothing teaches the visual grammar of a reference work faster, precisely because you cannot read a word of it.",
  },
  {
    id: "rc-house-of-leaves",
    title: "House of Leaves",
    author: "Mark Z. Danielewski",
    year: 2000,
    why: "The most aggressive experiment in letting layout carry meaning. Worth studying structurally even if the horror isn't your register.",
    pairsWith: "The Poetics of Space",
  },
  {
    id: "rc-atlas-remote-islands",
    title: "Atlas of Remote Islands",
    author: "Judith Schalansky",
    year: 2009,
    why: "Fifty real islands the author never visited, each given a map and a page of narrative. The exact tone a map section should aspire to — factual apparatus doing emotional work.",
  },
  {
    id: "rc-memory-police",
    title: "The Memory Police",
    author: "Yōko Ogawa",
    year: 1994,
    why: "A counterweight to all this accumulation: a novel about a place where things are systematically forgotten. Useful to hold in mind while building an archive.",
  },
];

const writings: Writing[] = [
  {
    id: "wr-index-as-argument",
    slug: "the-index-as-argument",
    title: "The Index as Argument",
    dek: "Every reference work makes a claim about what deserves an entry. On the quiet editorial violence of the alphabetical list.",
    publishedOn: "2026-09-05",
    readingMinutes: 9,
    tags: ["form", "reference"],
  },
  {
    id: "wr-against-completeness",
    slug: "against-completeness",
    title: "Against Completeness",
    dek: "Le Guin implied an archipelago with a handful of names. A note on why the fully documented world so often feels smaller than the sketched one.",
    publishedOn: "2026-07-22",
    readingMinutes: 6,
    tags: ["worldbuilding", "restraint"],
  },
  {
    id: "wr-keeping-a-commonplace",
    slug: "keeping-a-commonplace-book",
    title: "Keeping a Commonplace Book in Public",
    dek: "Four hundred years of people copying passages into notebooks, and what changes when the notebook has a URL.",
    publishedOn: "2026-05-30",
    readingMinutes: 12,
    tags: ["method", "history"],
  },
  {
    id: "wr-marginalia",
    slug: "in-defence-of-marginalia",
    title: "In Defence of Marginalia",
    dek: "The best reading I have ever done was ruined books.",
    publishedOn: "2026-04-11",
    readingMinutes: 5,
    tags: ["reading", "method"],
  },
];

const plates: Plate[] = [
  { id: "pl-01", title: "Reading room, north light", collection: "Interiors", capturedOn: "2026-08-02", place: "Trinity", src: "/plates/plate-01.svg", width: 1200, height: 1500 },
  { id: "pl-02", title: "Stair, disused wing", collection: "Interiors", capturedOn: "2026-07-19", src: "/plates/plate-02.svg", width: 1200, height: 900 },
  { id: "pl-03", title: "Survey marker", collection: "Field notes", capturedOn: "2026-06-30", place: "Ridgeway", src: "/plates/plate-03.svg", width: 1200, height: 1200 },
  { id: "pl-04", title: "Coastline, redrawn", collection: "Cartography", capturedOn: "2026-06-11", src: "/plates/plate-04.svg", width: 1200, height: 1500 },
  { id: "pl-05", title: "Shelf mark", collection: "Interiors", capturedOn: "2026-05-24", src: "/plates/plate-05.svg", width: 1200, height: 900 },
  { id: "pl-06", title: "Orrery detail", collection: "Instruments", capturedOn: "2026-05-02", src: "/plates/plate-06.svg", width: 1200, height: 1200 },
  { id: "pl-07", title: "Estuary at low water", collection: "Field notes", capturedOn: "2026-04-18", place: "Blackwater", src: "/plates/plate-07.svg", width: 1200, height: 900 },
  { id: "pl-08", title: "Compass rose, unfinished", collection: "Cartography", capturedOn: "2026-03-27", src: "/plates/plate-08.svg", width: 1200, height: 1500 },
  { id: "pl-09", title: "Barometer, broken", collection: "Instruments", capturedOn: "2026-02-14", src: "/plates/plate-09.svg", width: 1200, height: 1200 },
];

/* ── Accessors ──────────────────────────────────────────────
   Async on purpose: these become real queries without touching
   a single call site. */

export async function getBooks(): Promise<Book[]> {
  return books;
}

export async function getRecommendations(): Promise<Recommendation[]> {
  return recommendations;
}

export async function getWritings(): Promise<Writing[]> {
  return writings
    .filter((w) => !w.draft)
    .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

export async function getPlates(): Promise<Plate[]> {
  return plates;
}

export async function getCollections(): Promise<string[]> {
  return [...new Set(plates.map((p) => p.collection))].sort();
}

/* ── Homepage furniture ──────────────────────────────────── */

import type {
  CurrentlyItem,
  NowPlaying,
  RingSite,
  SiteStatus,
  SiteUpdate,
} from "./types";

const status: SiteStatus = {
  state: "writing",
  mood: "caffeinated, stubborn",
  weather: "grey, threatening rain",
  vibe: "chapter four is not working",
};

const nowPlaying: NowPlaying = {
  track: "Rain on a Tin Roof",
  source: "some lo-fi channel, hour six",
};

const currently: CurrentlyItem[] = [
  { label: "Reading", value: "Ficciones — Borges" },
  { label: "Watching", value: "nothing, honestly" },
  { label: "Building", value: "the Codex, slowly" },
  { label: "Stuck on", value: "a map projection problem" },
];

const updates: SiteUpdate[] = [
  { id: "u-4", when: "this week", text: "Rebuilt the whole front end. Again. It looks like a website now instead of a brochure.", tag: "building" },
  { id: "u-3", when: "Sep 2026", text: "Added the shelf. Backfilled everything I read this year from memory, so some dates are lies." },
  { id: "u-2", when: "Aug 2026", text: "Bought the domain. Stared at it for three weeks.", tag: "milestone" },
  { id: "u-1", when: "Aug 2026", text: "Decided the novel needed a wiki more than it needed another outline." },
];

const ring: RingSite[] = [
  { name: "prev", href: "#" },
  { name: "hub", href: "#" },
  { name: "next", href: "#" },
];

export async function getStatus(): Promise<SiteStatus> {
  return status;
}

export async function getNowPlaying(): Promise<NowPlaying> {
  return nowPlaying;
}

export async function getCurrently(): Promise<CurrentlyItem[]> {
  return currently;
}

export async function getUpdates(): Promise<SiteUpdate[]> {
  return updates;
}

export async function getRing(): Promise<RingSite[]> {
  return ring;
}
