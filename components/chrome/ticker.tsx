const PHRASES = [
  "software developer",
  "aspiring fantasy author",
  "building worlds",
  "daily reader",
  "creature of the internet",
  "keeper of notes",
];

/**
 * Scrolling strip across the very top. The track is rendered
 * twice and translated -50%, so the loop has no visible seam.
 */
export function Ticker() {
  const run = [...PHRASES, ...PHRASES];

  return (
    <div className="ticker border-b border-rule-strong bg-brass text-paper">
      <div className="ticker-track py-1.5">
        {run.map((phrase, i) => (
          <span key={i} className="flex items-center">
            <span className="label px-6">{phrase}</span>
            <span aria-hidden className="text-paper/50 select-none">
              —
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
