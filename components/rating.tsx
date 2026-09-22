const DIAMOND = "M5 0 L10 5 L5 10 L0 5 Z";
const DIAMOND_LEFT = "M5 0 L5 10 L0 5 Z";

/**
 * Five lozenges. Half-steps are drawn as geometry rather than a
 * clip path so that repeated ratings on one page introduce no
 * duplicate element ids.
 */
export function Rating({ value }: { value: number }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`${value} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <svg key={i} width="8" height="8" viewBox="0 0 10 10" aria-hidden>
            <path
              d={DIAMOND}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-rule-strong"
            />
            {fill >= 1 && <path d={DIAMOND} className="fill-brass" />}
            {fill > 0 && fill < 1 && (
              <path d={DIAMOND_LEFT} className="fill-brass" />
            )}
          </svg>
        );
      })}
    </span>
  );
}
