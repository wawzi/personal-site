import Link from "next/link";
import { signOut } from "@/app/enter/actions";
import { createClient } from "@/lib/supabase/server";
import { DeskNav } from "./nav";

export const metadata = {
  title: "Desk",
  robots: { index: false, follow: false },
};

export default async function DeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {/* Admin bar — visible only through the side door. */}
      <div className="border-b border-rule-strong bg-brass text-paper">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-2 px-3 py-1.5 sm:px-5">
          <span className="label">Admin mode</span>
          <span className="font-meta text-[0.6875rem] opacity-90">
            {user?.email}
          </span>

          <form action={signOut}>
            <button
              type="submit"
              className="label border border-paper/40 px-2 py-1 transition-colors hover:bg-paper hover:text-brass"
            >
              Sign out
            </button>
          </form>

          <Link
            href="/"
            className="label ml-auto opacity-80 transition-opacity hover:opacity-100"
          >
            ← back to the public side
          </Link>
        </div>
      </div>

      <DeskNav />

      <div className="mx-auto w-full max-w-[1400px] px-3 py-5 sm:px-5">
        {children}
      </div>
    </>
  );
}
