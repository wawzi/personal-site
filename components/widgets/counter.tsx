import { Panel } from "@/components/panel";

/**
 * Odometer plate. The value is a placeholder — a real count needs
 * somewhere to persist it, so nothing here is actually counting yet.
 */
const PLACEHOLDER = "0000000";

export function CounterWidget() {
  return (
    <Panel title="Visitors">
      <div className="flex justify-center gap-[2px]" aria-label="Visitor counter, not yet live">
        {PLACEHOLDER.split("").map((d, i) => (
          <span
            key={i}
            className="font-meta border border-rule-strong bg-ink px-1.5 py-1 text-sm text-paper tabular-nums"
          >
            {d}
          </span>
        ))}
      </div>
      <p className="label mt-2 text-center">not wired up yet</p>
    </Panel>
  );
}
