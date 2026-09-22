import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SectionNav } from "./section-nav";
import { Ticker } from "./ticker";

// Static on small screens: ticker + masthead + wrapped nav would otherwise
// occupy a third of a phone viewport at all times.
export function SiteHeader() {
  return (
    <header className="relative z-40 lg:sticky lg:top-0">
      <Ticker />

      <div className="border-b border-rule-strong bg-paper">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-3 py-2.5 sm:px-5">
          <Link href="/" className="font-display text-2xl leading-none font-semibold tracking-tight text-ink">
            the<span className="text-brass">.</span>commonplace
          </Link>

          <p className="label hidden lg:block">
            reader <span className="text-brass">·</span> writer{" "}
            <span className="text-brass">·</span> builder of an imaginary place
          </p>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <SectionNav />
    </header>
  );
}
