"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/lib/nav";

/** Every section, always visible, with the current one marked. */
export function SectionNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sections"
      className="border-b border-rule-strong bg-leaf-sunk"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-stretch gap-x-1 px-3 sm:px-5">
        {SECTIONS.map((s) => {
          const active =
            s.href === "/" ? pathname === "/" : pathname.startsWith(s.href);

          return (
            <Link
              key={s.href}
              href={s.href}
              aria-current={active ? "page" : undefined}
              className={`label border-b-2 px-3 py-2.5 transition-colors ${
                active
                  ? "border-brass text-brass"
                  : "border-transparent hover:border-rule-strong hover:text-ink"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
