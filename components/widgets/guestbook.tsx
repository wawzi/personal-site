import { Panel } from "@/components/panel";

/**
 * Shell only. Signing needs somewhere to write, so the form is
 * disabled until the database lands — deliberately visible rather
 * than hidden, so the slot is obvious.
 */
const SAMPLE = [
  { who: "anon", said: "found you through the ring. nice shelf." },
  { who: "mara", said: "chapter four will come. it always does." },
];

export function GuestbookWidget() {
  return (
    <Panel title="Guestbook">
      <ul className="space-y-1.5">
        {SAMPLE.map((m, i) => (
          <li key={i} className="well px-2 py-1.5">
            <span className="label">{m.who}</span>
            <p className="text-[0.8125rem] leading-snug text-ink-soft">
              {m.said}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-2.5">
        <input
          disabled
          placeholder="leave a message…"
          aria-label="Leave a message (not yet available)"
          className="w-full border border-rule bg-paper px-2 py-1.5 text-[0.8125rem] text-ink placeholder:text-ink-faint disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button disabled className="btn btn-solid mt-1.5 w-full disabled:opacity-50">
          Sign
        </button>
        <p className="label mt-1.5 text-center">needs the database</p>
      </div>
    </Panel>
  );
}
