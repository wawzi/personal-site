import { getWritings } from "@/lib/content";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function WritingsList() {
  const writings = await getWritings();

  return (
    <ol className="border-t border-rule">
      {writings.map((w, i) => (
        <li key={w.id} className="border-b border-rule">
          {/*
            Article pages arrive with the database. Until then the
            entry is a non-navigating record rather than a dead link.
          */}
          <article className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline">
            <span
              aria-hidden
              className="label tabular-nums text-brass sm:pt-1"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="font-display text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-brass">
                {w.title}
              </h3>
              <p className="mt-1.5 max-w-2xl leading-relaxed text-ink-soft">
                {w.dek}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                {w.tags.map((tag) => (
                  <li key={tag} className="label text-[0.625rem]">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1 sm:pt-1 sm:text-right">
              <time className="label whitespace-nowrap" dateTime={w.publishedOn}>
                {formatDate(w.publishedOn)}
              </time>
              <span className="label whitespace-nowrap">
                {w.readingMinutes} min
              </span>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
