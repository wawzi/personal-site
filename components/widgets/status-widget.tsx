import { Panel } from "@/components/panel";
import { getStatus } from "@/lib/content";

export async function StatusWidget() {
  const s = await getStatus();
  const rows = [
    ["mood", s.mood],
    ["weather", s.weather],
    ["vibe", s.vibe],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <Panel title="Status">
      <p className="flex items-center gap-2 font-display text-lg text-ink">
        <span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full bg-brass ring-3 ring-brass/25"
        />
        {s.state}
      </p>
      <dl className="mt-2.5 space-y-1">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="label shrink-0">{k}</dt>
            <dd className="text-[0.8125rem] leading-snug text-ink-soft">{v}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
