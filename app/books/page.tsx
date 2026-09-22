import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";
import { Recommendations } from "@/components/recommendations";
import { Shelf } from "@/components/shelf";

export const metadata = { title: "Books" };

export default function BooksPage() {
  return (
    <PageShell
      label="Books"
      title="The shelf"
      blurb="Tracked honestly, including the abandoned ones and the ones still waiting."
    >
      <div className="flex flex-col gap-4">
        <Panel title="Reading log">
          <Shelf />
        </Panel>

        <Panel title="Recommendations">
          <p className="mb-5 max-w-2xl text-[0.875rem] leading-relaxed text-ink-soft">
            Books that belong beside this one — mostly reference works pressed
            into service as literature.
          </p>
          <Recommendations />
        </Panel>
      </div>
    </PageShell>
  );
}
