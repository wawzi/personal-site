import Link from "next/link";
import { Panel } from "@/components/panel";
import { deskCounts } from "@/lib/desk/queries";

export default async function DeskPage() {
  const counts = await deskCounts();

  const cards = [
    {
      href: "/desk/diary",
      title: "Diary",
      n: counts.diary,
      body: "Dated entries. Write now, file it under whenever it actually happened.",
    },
    {
      href: "/desk/notes",
      title: "Notes",
      n: counts.notes,
      body: "Everything else. Pin the ones you keep coming back to.",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Panel title="The desk">
        <p className="text-[0.875rem] leading-relaxed text-ink-soft">
          The private half. Nothing here is visible to anyone but you —
          enforced at the database, not just in the interface.
        </p>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="panel group flex flex-col p-5 transition-colors hover:border-brass"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink">
                {c.title}
              </h2>
              <span className="lining font-display text-2xl font-semibold text-rule-strong transition-colors group-hover:text-brass">
                {c.n}
              </span>
            </div>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
              {c.body}
            </p>
          </Link>
        ))}
      </div>

      <Panel title="Not yet here">
        <p className="text-[0.875rem] leading-relaxed text-ink-soft">
          The Codex — articles, maps, timelines, calendars, manuscripts — is
          Phase 3. It needs its own schema and a good deal of thinking about
          how everything links together before any of it gets built.
        </p>
      </Panel>
    </div>
  );
}
