import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";
import { WritingsList } from "@/components/writings-list";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <PageShell
      label="Blog"
      title="Thoughts, in public"
      blurb="Essays on form and reference, and the recurring problem of documenting a place that doesn't exist."
    >
      <Panel title="All posts">
        <WritingsList />
      </Panel>
    </PageShell>
  );
}
