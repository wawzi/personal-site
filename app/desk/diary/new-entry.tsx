"use client";

import { useActionState, useEffect, useRef } from "react";
import { createEntry, type ActionState } from "@/app/desk/actions";

const INITIAL: ActionState = {};

/** `datetime-local` wants "YYYY-MM-DDTHH:mm" in local time. */
function localNow() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function NewEntryForm() {
  const [state, action, pending] = useActionState(createEntry, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  const field =
    "w-full border border-rule bg-paper px-2 py-1.5 text-[0.875rem] text-ink outline-none focus:border-brass";

  return (
    <form ref={formRef} action={action} className="space-y-2">
      <div>
        <label htmlFor="entry_at" className="label mb-1 block">
          When
        </label>
        <input
          id="entry_at"
          name="entry_at"
          type="datetime-local"
          defaultValue={localNow()}
          className={`${field} font-meta text-[0.75rem]`}
        />
      </div>

      <input name="title" placeholder="title (optional)" className={field} />

      <textarea
        name="body"
        rows={7}
        placeholder="how was it?"
        className={`${field} resize-y leading-relaxed`}
      />

      <div className="grid grid-cols-2 gap-2">
        <input name="mood" placeholder="mood" className={field} />
        <input name="weather" placeholder="weather" className={field} />
      </div>

      {state.error && (
        <p role="alert" className="text-[0.8125rem] text-oxblood">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-solid w-full disabled:opacity-60">
        {pending ? "Saving…" : "Add entry"}
      </button>
    </form>
  );
}
