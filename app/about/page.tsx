import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageShell label="About" title="Who is doing all this">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <Panel title="The short version">
          <div className="space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            <p>
              I write software for a living and fiction for everything else. I
              read more than I finish, I take far too many notes, and I have
              been building the same imaginary country since I was old enough
              to draw a coastline badly.
            </p>
            <p>
              This site exists because the ideas were getting away from me.
              Scattered notebooks, three note apps, a folder called{" "}
              <span className="font-meta text-ink">misc-final-FINAL</span>. The
              cure for that is one place, kept properly, and enough structure
              that future me can find anything again.
            </p>
            <p>
              The public half is the part worth showing. The private half is
              where the actual work happens.
            </p>
          </div>
        </Panel>

        <Panel title="Elsewhere">
          <ul className="space-y-1.5">
            {["portfolio", "art", "email", "rss"].map((l) => (
              <li key={l}>
                <span className="btn w-full cursor-default opacity-60">{l}</span>
              </li>
            ))}
          </ul>
          <p className="label mt-2 text-center">links to come</p>
        </Panel>
      </div>
    </PageShell>
  );
}
