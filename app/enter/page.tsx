import { Panel } from "@/components/panel";
import { SignInForm } from "./form";

export const metadata = {
  title: "Enter",
  // Unlisted: keep it out of search results as well as out of the nav.
  robots: { index: false, follow: false },
};

export default async function EnterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = params.next;
  const next = typeof raw === "string" ? raw : "/desk";

  return (
    <div className="mx-auto w-full max-w-sm px-3 py-16 sm:px-5">
      <Panel title="The side door">
        <p className="mb-4 text-[0.8125rem] leading-relaxed text-ink-soft">
          Nothing public lives through here.
        </p>
        <SignInForm next={next} />
      </Panel>
    </div>
  );
}
