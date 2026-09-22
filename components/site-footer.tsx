import { Fleuron } from "./ornament";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 px-5 pb-14 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <Fleuron className="mb-10" />

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="label">Colophon</p>
          <p className="max-w-lg text-sm leading-relaxed text-ink-soft">
            Set in Cormorant Garamond and EB Garamond, with IBM Plex Mono for
            catalogue matter. Built and kept by hand.
          </p>
          <p className="label mt-2">© {year}</p>
        </div>

        {/*
          The private wing is reached from here. Phase 2 turns this
          ornament into the unlisted entrance to the diary, the notes,
          and the Codex — deliberately unlabelled and not in the nav.
        */}
        <div className="mt-10 flex justify-center">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-rule-strong transition-colors hover:bg-brass"
          />
        </div>
      </div>
    </footer>
  );
}
