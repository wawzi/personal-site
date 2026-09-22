import Link from "next/link";
import { Panel } from "@/components/panel";
import { ButtonsWidget } from "@/components/widgets/buttons";
import { CounterWidget } from "@/components/widgets/counter";
import { CurrentlyWidget } from "@/components/widgets/currently";
import { GuestbookWidget } from "@/components/widgets/guestbook";
import { NowPlayingWidget } from "@/components/widgets/now-playing";
import { StatusWidget } from "@/components/widgets/status-widget";
import { WebRingWidget } from "@/components/widgets/web-ring";
import { getUpdates } from "@/lib/content";

const DOORS = [
  {
    n: "01",
    href: "/blog",
    title: "Blog",
    body: "Thoughts, arguments with myself, things I changed my mind about.",
    cta: "Read posts",
  },
  {
    n: "02",
    href: "/books",
    title: "Books",
    body: "Everything I read, tracked honestly — including the ones I gave up on.",
    cta: "See the shelf",
  },
  {
    n: "03",
    href: "/gallery",
    title: "Gallery",
    body: "Photographs and figures, filed by collection. Show or hide as you like.",
    cta: "Open the drawer",
  },
  {
    n: "04",
    href: "/codex",
    title: "The Codex",
    body: "A novel's worth of invented history. Maps, timelines, people who don't exist.",
    cta: "Go wandering",
  },
];

const TAGS = [
  "reader",
  "aspiring author",
  "software developer",
  "map hoarder",
  "cosy things",
];

export default async function HomePage() {
  const updates = await getUpdates();

  return (
    <div className="mx-auto w-full max-w-[1400px] px-3 py-5 sm:px-5">
      <div className="grid gap-4 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_230px]">
        {/* ── Left rail ───────────────────────────────── */}
        <aside className="order-2 flex flex-col gap-4 lg:order-1">
          <StatusWidget />
          <NowPlayingWidget />
          <CurrentlyWidget />
        </aside>

        {/* ── Centre ──────────────────────────────────── */}
        <div className="order-1 flex flex-col gap-4 lg:order-2">
          <section className="panel px-5 py-7 sm:px-8 sm:py-10">
            <p className="label">welcome, stranger</p>
            <h1 className="mt-2 font-display text-4xl leading-[1.05] font-semibold text-ink sm:text-6xl">
              Hello, world.
              <br />
              <span className="text-brass">Come in, it&rsquo;s warm.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
              This is my corner of the internet — not a portfolio, not a brand,
              just the place where I keep the things I&rsquo;d otherwise lose.
              The books, the half-finished arguments, the photographs, and a
              very large imaginary country I&rsquo;ve been building for years.
            </p>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
              Wander around. Nothing here is trying to sell you anything.
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {TAGS.map((t) => (
                <li key={t} className="label border border-rule px-2 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Doors to the other sections */}
          <div className="grid gap-4 sm:grid-cols-2">
            {DOORS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="panel group flex flex-col p-5 transition-colors hover:border-brass"
              >
                <span className="lining font-display text-3xl leading-none font-semibold text-rule-strong transition-colors group-hover:text-brass">
                  {d.n}
                </span>
                <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                  {d.title}
                </h2>
                <p className="mt-1.5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">
                  {d.body}
                </p>
                <span className="label mt-4 text-brass">{d.cta} →</span>
              </Link>
            ))}
          </div>

          <Panel
            title="Site updates"
            action={<span className="label">{updates.length}</span>}
          >
            <ol className="space-y-1.5">
              {updates.map((u) => (
                <li
                  key={u.id}
                  className="well flex flex-wrap items-baseline gap-x-3 gap-y-1 px-2.5 py-2"
                >
                  <span className="label w-20 shrink-0">{u.when}</span>
                  <p className="flex-1 text-[0.875rem] leading-snug text-ink-soft">
                    {u.text}
                  </p>
                  {u.tag && (
                    <span className="label border border-brass/50 px-1.5 py-0.5 text-brass">
                      {u.tag}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        {/* ── Right rail ──────────────────────────────── */}
        <aside className="order-3 flex flex-col gap-4">
          <GuestbookWidget />
          <WebRingWidget />
          <CounterWidget />
          <ButtonsWidget />
        </aside>
      </div>
    </div>
  );
}
