import { Panel } from "@/components/panel";
import { getCurrently } from "@/lib/content";

export async function CurrentlyWidget() {
  const items = await getCurrently();

  return (
    <Panel title="Currently">
      <dl className="space-y-2.5">
        {items.map((it) => (
          <div key={it.label}>
            <dt className="label">{it.label}</dt>
            <dd className="text-[0.8125rem] leading-snug text-ink">
              {it.value}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
