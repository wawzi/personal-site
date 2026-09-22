import type { ReactNode } from "react";

export function PageShell({
  label,
  title,
  blurb,
  children,
}: {
  label: string;
  title: string;
  blurb?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-3 py-5 sm:px-5">
      <header className="panel mb-4 px-5 py-6 sm:px-7">
        <p className="label">{label}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-5xl">
          {title}
        </h1>
        {blurb && (
          <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
            {blurb}
          </p>
        )}
      </header>
      {children}
    </div>
  );
}
