"use client";

/**
 * Flips `data-theme` on <html> and remembers the choice.
 *
 * Deliberately stateless: both icons are rendered and CSS reveals
 * the correct one (see `.only-day` / `.only-night`). That keeps the
 * server and client markup identical — no mount effect, no flash,
 * and the control still reflects the OS preference when the reader
 * has never chosen explicitly.
 */

function resolvedTheme(): "light" | "dark" {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  function toggle() {
    const next = resolvedTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice simply won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between day and night reading"
      title="Switch between day and night reading"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule text-ink-faint transition-colors hover:border-brass hover:text-brass"
    >
      {/* Shown in day mode: offer the moon */}
      <svg
        width="15" height="15" viewBox="0 0 24 24" fill="none"
        aria-hidden className="only-day"
      >
        <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z" fill="currentColor" />
      </svg>

      {/* Shown in night mode: offer the sun */}
      <svg
        width="15" height="15" viewBox="0 0 24 24" fill="none"
        aria-hidden className="only-night"
      >
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={12 + Math.cos(a) * 6.6} y1={12 + Math.sin(a) * 6.6}
              x2={12 + Math.cos(a) * 9.2} y2={12 + Math.sin(a) * 9.2}
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
            />
          );
        })}
      </svg>
    </button>
  );
}
