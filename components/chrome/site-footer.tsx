import Link from "next/link";
import { SECTIONS, UTILITY } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-rule-strong bg-leaf-sunk">
      <div className="mx-auto w-full max-w-[1400px] px-3 py-7 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              the<span className="text-brass">.</span>commonplace
            </p>
            <p className="label mt-1">a personal encyclopedia, kept in public</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-1.5">
            {[...SECTIONS, ...UTILITY].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="label transition-colors hover:text-brass"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
          <p className="label">last tended — september 2026</p>
          {/*
            The private wing is reached from here. Phase 2 turns this
            ornament into the unlisted entrance; it stays out of the nav.
          */}
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-rule-strong transition-colors hover:bg-brass"
          />
        </div>
      </div>
    </footer>
  );
}
