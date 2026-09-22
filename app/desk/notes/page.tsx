import { Panel } from "@/components/panel";
import { listNotes } from "@/lib/desk/queries";
import { NewNoteForm } from "./new-note";
import { NoteCard } from "./note-card";

export const metadata = { title: "Notes", robots: { index: false, follow: false } };

export default async function NotesPage() {
  const notes = await listNotes();

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-4 lg:self-start">
        <Panel title="New note">
          <NewNoteForm />
        </Panel>
      </aside>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-2xl font-semibold text-ink">Notes</h1>
          <span className="label lining">{notes.length}</span>
        </div>

        {notes.length === 0 ? (
          <p className="panel px-5 py-12 text-center font-display text-lg text-ink-faint">
            Nothing yet. The form on the left is the whole point.
          </p>
        ) : (
          notes.map((n) => <NoteCard key={n.id} note={n} />)
        )}
      </div>
    </div>
  );
}
