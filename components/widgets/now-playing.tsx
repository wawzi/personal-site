import { Panel } from "@/components/panel";
import { getNowPlaying } from "@/lib/content";

/** Static bars — decorative, not an audio visualiser. */
const BARS = [5, 11, 7, 14, 9, 4, 12, 8];

export async function NowPlayingWidget() {
  const np = await getNowPlaying();

  return (
    <Panel title="Now playing">
      <p className="font-display text-lg leading-tight text-ink">{np.track}</p>
      <p className="mt-0.5 text-[0.8125rem] text-ink-soft">{np.source}</p>

      <div aria-hidden className="mt-3 flex items-end gap-[3px]">
        {BARS.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}px` }}
            className="w-[3px] bg-brass/70"
          />
        ))}
      </div>
    </Panel>
  );
}
