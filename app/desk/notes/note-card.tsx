"use client";

import { useActionState, useState } from "react";
import {
  deleteNote,
  toggleNotePin,
  updateNote,
  type ActionState,
} from "@/app/desk/actions";
import type { Note } from "@/lib/types";

const INITIAL: ActionState = {};

function when(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NoteCard({ note }: { note: Note }) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState(updateNote, INITIAL);

  // Close the editor once the saved row comes back from the server.
  // Keyed on updated_at rather than state.ok, which stays true after the
  // first save and would otherwise stop the editor ever reopening.
  const [lastSavedAt, setLastSavedAt] = useState(note.updated_at);
  if (note.updated_at !== lastSavedAt) {
    setLastSavedAt(note.updated_at);
    setEditing(false);
  }

  return (
    <article className={`panel ${note.pinned ? "border-brass" : ""}`}>
      <header className="panel-head">
        <span className="label">
          {note.pinned && <span className="text-brass">pinned · </span>}
          {when(note.updated_at)}
        </span>

        <span className="flex items-center gap-1">
          <form action={toggleNotePin}>
            <input type="hidden" name="id" value={note.id} />
            <input type="hidden" name="pinned" value={String(note.pinned)} />
            <button type="submit" className="label px-1.5 py-0.5 hover:text-brass">
              {note.pinned ? "unpin" : "pin"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="label px-1.5 py-0.5 hover:text-brass"
          >
            {editing ? "cancel" : "edit"}
          </button>

          <form action={deleteNote}>
            <input type="hidden" name="id" value={note.id} />
            <button type="submit" className="label px-1.5 py-0.5 hover:text-oxblood">
              del
            </button>
          </form>
        </span>
      </header>

      <div className="panel-body">
        {editing ? (
          <form action={action} className="space-y-2">
            <input type="hidden" name="id" value={note.id} />
            <input
              name="title"
              defaultValue={note.title}
              placeholder="title"
              className="w-full border border-rule bg-paper px-2 py-1.5 text-[0.875rem] text-ink outline-none focus:border-brass"
            />
            <textarea
              name="body"
              defaultValue={note.body}
              rows={5}
              className="w-full resize-y border border-rule bg-paper px-2 py-1.5 text-[0.875rem] leading-relaxed text-ink outline-none focus:border-brass"
            />
            <input
              name="tags"
              defaultValue={note.tags.join(", ")}
              placeholder="tags, comma separated"
              className="w-full border border-rule bg-paper px-2 py-1.5 font-meta text-[0.75rem] text-ink outline-none focus:border-brass"
            />
            {state.error && (
              <p role="alert" className="text-[0.8125rem] text-oxblood">
                {state.error}
              </p>
            )}
            <button type="submit" disabled={pending} className="btn btn-solid disabled:opacity-60">
              {pending ? "Saving…" : "Save"}
            </button>
          </form>
        ) : (
          <>
            {note.title && (
              <h3 className="font-display text-lg font-semibold text-ink">
                {note.title}
              </h3>
            )}
            {note.body && (
              <p className="mt-1 text-[0.875rem] leading-relaxed whitespace-pre-wrap text-ink-soft">
                {note.body}
              </p>
            )}
            {note.tags.length > 0 && (
              <ul className="mt-2.5 flex flex-wrap gap-1">
                {note.tags.map((t) => (
                  <li key={t} className="label border border-rule px-1.5 py-0.5">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </article>
  );
}
