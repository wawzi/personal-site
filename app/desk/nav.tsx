"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DESK = [
  { href: "/desk", label: "Desk" },
  { href: "/desk/diary", label: "Diary" },
  { href: "/desk/notes", label: "Notes" },
];

export function DeskNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Desk"
      className="border-b border-rule-strong bg-leaf-sunk"
    >
      <div className="mx-auto flex w-full max-w-[1400px] gap-x-1 px-3 sm:px-5">
        {DESK.map((d) => {
          const active =
            d.href === "/desk" ? pathname === "/desk" : pathname.startsWith(d.href);

          return (
            <Link
              key={d.href}
              href={d.href}
              aria-current={active ? "page" : undefined}
              className={`label border-b-2 px-3 py-2.5 transition-colors ${
                active
                  ? "border-brass text-brass"
                  : "border-transparent hover:border-rule-strong hover:text-ink"
              }`}
            >
              {d.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
