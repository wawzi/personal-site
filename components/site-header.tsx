import Link from "next/link";
import { DoubleRule } from "./ornament";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "#shelf", label: "The Shelf" },
  { href: "#writings", label: "Writings" },
  { href: "#plates", label: "Plates" },
  { href: "#recommended", label: "Recommended" },
];

export function SiteHeader() {
  return (
    <header className="px-5 pt-6 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Running head — volume, issue, controls */}
        <div className="flex items-baseline justify-between gap-4">
          <span className="label">Vol. I · No. 1</span>
          <span className="label hidden sm:inline">
            Kept continuously since MMXXVI
          </span>
          <div className="self-center">
            <ThemeToggle />
          </div>
        </div>

        <DoubleRule className="mt-4" />

        {/* Title block */}
        <div className="py-10 text-center sm:py-14">
          <Link href="/" className="inline-block">
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[0.02em] text-ink sm:text-7xl">
              The Commonplace
            </h1>
          </Link>
          <p className="mx-auto mt-5 max-w-xl font-display text-lg italic text-ink-soft sm:text-xl">
            An encyclopedia of reading, looking, and invention —
            <br className="hidden sm:block" /> a commonplace book kept in public.
          </p>
        </div>

        <DoubleRule />

        <nav aria-label="Sections" className="py-3.5">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            {NAV.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="px-3 text-[0.5rem] text-brass/70 select-none"
                  >
                    ◆
                  </span>
                )}
                <Link
                  href={item.href}
                  className="label link-underline py-1 transition-colors hover:text-brass"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <hr className="border-t border-rule" />
      </div>
    </header>
  );
}
