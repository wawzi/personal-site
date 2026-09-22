import { getBooks } from "@/lib/content";
import type { Book, ReadingStatus } from "@/lib/types";
import { Rating } from "./rating";

const GROUPS: { status: ReadingStatus; heading: string }[] = [
  { status: "reading", heading: "Reading now" },
  { status: "read", heading: "Read" },
  { status: "shelved", heading: "Shelved for later" },
];

function formatFinished(iso?: string) {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function BookEntry({ book }: { book: Book }) {
  const finished = formatFinished(book.finishedOn);

  return (
    <article className="group relative border-l-2 border-rule pl-5 transition-colors hover:border-brass">
      <h4 className="font-display text-xl font-semibold leading-snug text-ink">
        {book.title}
      </h4>

      <p className="mt-0.5 text-ink-soft">
        {book.author}
        {book.year && (
          <span className="text-ink-faint"> · {book.year}</span>
        )}
      </p>

      {(book.rating !== undefined || finished) && (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {book.rating !== undefined && <Rating value={book.rating} />}
          {finished && <span className="label">{finished}</span>}
        </div>
      )}

      {book.note && (
        <p className="mt-2.5 font-display text-[1.0625rem] italic leading-relaxed text-ink-soft">
          {book.note}
        </p>
      )}

      {book.tags.length > 0 && (
        <ul className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1">
          {book.tags.map((tag) => (
            <li key={tag} className="label text-[0.625rem]">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export async function Shelf() {
  const books = await getBooks();

  return (
    <div className="space-y-12">
      {GROUPS.map(({ status, heading }) => {
        const inGroup = books.filter((b) => b.status === status);
        if (inGroup.length === 0) return null;

        return (
          <div key={status}>
            <div className="mb-6 flex items-baseline gap-4">
              <h3 className="label whitespace-nowrap">{heading}</h3>
              <span aria-hidden className="h-px flex-1 bg-rule" />
              <span className="label">{inGroup.length}</span>
            </div>

            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {inGroup.map((book) => (
                <BookEntry key={book.id} book={book} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
