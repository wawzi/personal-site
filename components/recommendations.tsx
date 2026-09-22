import { getRecommendations } from "@/lib/content";

export async function Recommendations() {
  const items = await getRecommendations();

  return (
    <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
      {items.map((r) => (
        <article key={r.id} className="flex flex-col">
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">
            {r.title}
          </h3>
          <p className="mt-0.5 text-ink-soft">
            {r.author}
            {r.year && <span className="text-ink-faint"> · {r.year}</span>}
          </p>

          <p className="mt-3 leading-relaxed text-ink-soft">{r.why}</p>

          {r.pairsWith && (
            <p className="label mt-3.5">Pairs with — {r.pairsWith}</p>
          )}
        </article>
      ))}
    </div>
  );
}
