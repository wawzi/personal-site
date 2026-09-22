"use client";

import { useActionState, useEffect, useRef } from "react";
import { createNote, type ActionState } from "@/app/desk/actions";

const INITIAL: ActionState = {};

export function NewNoteForm() {
  const [state, action, pending] = useActionState(createNote, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a successful save. This touches the DOM rather
  // than React state, so it belongs in an effect.
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <input
        name="title"
        placeholder="title"
        className="w-full border border-rule bg-paper px-2 py-1.5 text-[0.875rem] text-ink outline-none focus:border-brass"
      />
      <textarea
        name="body"
        rows={4}
        placeholder="what is it?"
        className="w-full resize-y border border-rule bg-paper px-2 py-1.5 text-[0.875rem] leading-relaxed text-ink outline-none focus:border-brass"
      />
      <input
        name="tags"
        placeholder="tags, comma separated"
        className="w-full border border-rule bg-paper px-2 py-1.5 font-meta text-[0.75rem] text-ink outline-none focus:border-brass"
      />

      {state.error && (
        <p role="alert" className="text-[0.8125rem] text-oxblood">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-solid w-full disabled:opacity-60">
        {pending ? "Saving…" : "Add note"}
      </button>
    </form>
  );
}
