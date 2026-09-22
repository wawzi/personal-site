import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";

export const metadata = { title: "Colophon" };

const ROWS: [string, string][] = [
  ["Framework", "Next.js 16, App Router, React 19"],
  ["Language", "TypeScript"],
  ["Styling", "Tailwind v4, semantic colour tokens"],
  ["Display type", "Cormorant Garamond"],
  ["Body type", "EB Garamond"],
  ["Catalogue type", "IBM Plex Mono"],
  ["Database", "not yet chosen"],
  ["Images", "placeholder SVGs, generated"],
];

export default function ColophonPage() {
  return (
    <PageShell
      label="Colophon"
      title="How this is made"
      blurb="The old habit of printing the details of a book's manufacture at the back of it."
    >
      <Panel title="Specification">
        <dl className="divide-y divide-rule">
          {ROWS.map(([k, v]) => (
            <div key={k} className="flex flex-wrap gap-x-4 gap-y-1 py-2">
              <dt className="label w-40 shrink-0">{k}</dt>
              <dd className="text-[0.875rem] text-ink-soft">{v}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </PageShell>
  );
}
