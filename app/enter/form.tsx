"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "./actions";

const INITIAL: SignInState = {};

export function SignInForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signIn, INITIAL);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="label mb-1 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full border border-rule-strong bg-paper px-2.5 py-2 text-[0.875rem] text-ink outline-none focus:border-brass"
        />
      </div>

      <div>
        <label htmlFor="password" className="label mb-1 block">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full border border-rule-strong bg-paper px-2.5 py-2 text-[0.875rem] text-ink outline-none focus:border-brass"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="border border-oxblood/40 bg-oxblood/10 px-2.5 py-2 text-[0.8125rem] text-oxblood"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-solid w-full disabled:opacity-60"
      >
        {pending ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
