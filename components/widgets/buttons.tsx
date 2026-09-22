import { Panel } from "@/components/panel";

const BADGES = [
  { text: "built by hand", tone: "brass" },
  { text: "no trackers", tone: "plain" },
  { text: "best viewed awake", tone: "plain" },
  { text: "powered by tea", tone: "brass" },
];

export function ButtonsWidget() {
  return (
    <Panel title="Buttons">
      <div className="flex flex-wrap justify-center gap-1.5">
        {BADGES.map((b) => (
          <span
            key={b.text}
            className={`badge-88 ${
              b.tone === "brass"
                ? "bg-brass text-paper"
                : "bg-leaf-sunk text-ink-soft"
            }`}
          >
            {b.text}
          </span>
        ))}
      </div>
    </Panel>
  );
}
