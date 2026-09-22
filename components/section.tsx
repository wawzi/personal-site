import { Label } from "./ornament";

export function Section({
  id,
  label,
  title,
  blurb,
  children,
}: {
  id: string;
  label: string;
  title: string;
  blurb?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 py-16 sm:py-20">
      <header className="mb-10">
        <Label>{label}</Label>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {blurb && (
          <p className="mt-3 max-w-2xl text-ink-soft italic font-display text-lg">
            {blurb}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
