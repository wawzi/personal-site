import { Panel } from "@/components/panel";
import { getRing } from "@/lib/content";

export async function WebRingWidget() {
  const ring = await getRing();

  return (
    <Panel title="Web ring">
      <div className="grid grid-cols-3 gap-1">
        {ring.map((s) => (
          <a key={s.name} href={s.href} className="btn px-1">
            {s.name}
          </a>
        ))}
      </div>
      <p className="label mt-2 text-center">a ring of cosy sites</p>
    </Panel>
  );
}
