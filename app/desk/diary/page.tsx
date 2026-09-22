import { Panel } from "@/components/panel";
import { deleteEntry } from "@/app/desk/actions";
import { listDiaryEntries } from "@/lib/desk/queries";
import type { DiaryEntry } from "@/lib/types";
import { NewEntryForm } from "./new-entry";

export const metadata = { title: "Diary", robots: { index: false, follow: false } };

function stamp(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

function Entry({ entry }: { entry: DiaryEntry }) {
  const { date, time } = stamp(entry.entry_at);
  const meta = [entry.mood, entry.weather].filter(Boolean).join(" · ");

  return (
    <article className="panel">
      <header className="panel-head">
        <span className="label">
          {date} <span className="text-brass">·</span> {time}
        </span>
        <form action={deleteEntry}>
          <input type="hidden" name="id" value={entry.id} />
          <button type="submit" className="label px-1.5 py-0.5 hover:text-oxblood">
            del
          </button>
        </form>
      </header>

      <div className="panel-body">
        {entry.title && (
          <h2 className="font-display text-xl font-semibold text-ink">
            {entry.title}
          </h2>
        )}
        <p className="mt-1 text-[0.875rem] leading-relaxed whitespace-pre-wrap text-ink-soft">
          {entry.body}
        </p>
        {meta && <p className="label mt-3">{meta}</p>}
      </div>
    </article>
  );
}

export default async function DiaryPage() {
  const entries = await listDiaryEntries();

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <Panel title="New entry">
          <NewEntryForm />
        </Panel>
      </aside>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-2xl font-semibold text-ink">Diary</h1>
          <span className="label lining">{entries.length}</span>
        </div>

        {entries.length === 0 ? (
          <p className="panel px-5 py-12 text-center font-display text-lg text-ink-faint">
            No entries yet.
          </p>
        ) : (
          entries.map((e) => <Entry key={e.id} entry={e} />)
        )}
      </div>
    </div>
  );
}
