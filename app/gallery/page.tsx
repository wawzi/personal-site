import { Gallery } from "@/components/gallery";
import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";
import { getCollections, getPlates } from "@/lib/content";

export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const [plates, collections] = await Promise.all([
    getPlates(),
    getCollections(),
  ]);

  return (
    <PageShell
      label="Gallery"
      title="Plates & figures"
      blurb="Filed by collection. Show or hide whichever you feel like looking at."
    >
      <Panel title="The drawer">
        <Gallery plates={plates} collections={collections} />
      </Panel>
    </PageShell>
  );
}
