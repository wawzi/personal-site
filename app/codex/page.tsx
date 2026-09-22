import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";

export const metadata = { title: "The Codex" };

/**
 * Public face of the worldbuilding wing. The working tools — the
 * editors, the private articles, the secrets — live behind the
 * login in Phase 3. This page is the lobby.
 */
const WINGS = [
  { name: "Articles", body: "People, places, factions, objects. The encyclopedia proper.", n: "—" },
  { name: "Maps", body: "Drawn by hand, uploaded with far too much metadata attached.", n: "—" },
  { name: "Timelines", body: "What happened when, and which accounts disagree about it.", n: "—" },
  { name: "Calendars", body: "The reckoning systems. There is more than one, which is the problem.", n: "—" },
  { name: "Historical events", body: "The turning points, cross-linked to everyone they ruined.", n: "—" },
  { name: "Manuscripts", body: "The novel itself, in pieces, in the order it was written.", n: "—" },
];

export default function CodexPage() {
  return (
    <PageShell
      label="The Codex"
      title="An imaginary country"
      blurb="A novel needs somewhere to keep its own history. This is that place — part encyclopedia, part filing cabinet, part argument with myself about what is canon."
    >
      <div className="flex flex-col gap-4">
        <Panel title="Notice">
          <p className="text-[0.875rem] leading-relaxed text-ink-soft">
            The Codex isn&rsquo;t built yet. It&rsquo;s the largest thing on the
            plan and it needs a database underneath it before a single article
            can exist. What follows is the shape it will take, not a live index.
          </p>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WINGS.map((w) => (
            <article key={w.name} className="panel p-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-xl font-semibold text-ink">
                  {w.name}
                </h2>
                <span className="label">{w.n}</span>
              </div>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">
                {w.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
