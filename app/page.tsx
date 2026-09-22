import { Gallery } from "@/components/gallery";
import { Fleuron } from "@/components/ornament";
import { Recommendations } from "@/components/recommendations";
import { Section } from "@/components/section";
import { Shelf } from "@/components/shelf";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WritingsList } from "@/components/writings-list";
import { getCollections, getPlates } from "@/lib/content";

export default async function HomePage() {
  const [plates, collections] = await Promise.all([
    getPlates(),
    getCollections(),
  ]);

  return (
    <>
      <SiteHeader />

      <main className="flex-1 px-5 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          {/* Frontispiece */}
          <div className="py-16 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <p className="dropcap font-display text-xl leading-[1.75] text-ink">
                This is a commonplace book — the old habit of copying out what
                is worth keeping, and setting it beside everything else worth
                keeping, until the arrangement itself starts to say something.
                Here that means the books, the photographs, the half-finished
                arguments, and a long invention that has been going on quietly
                for some time.
              </p>
              <p className="mt-6 font-display text-xl italic leading-[1.75] text-ink-soft">
                Most of it is unfinished. That is the point of the form.
              </p>
            </div>
            <Fleuron className="mt-14" />
          </div>

          <Section
            id="shelf"
            label="The Shelf"
            title="What I have been reading"
            blurb="Kept honestly, including the ones abandoned and the ones still waiting."
          >
            <Shelf />
          </Section>

          <hr className="border-t border-rule" />

          <Section
            id="writings"
            label="Writings"
            title="Articles & notes in public"
            blurb="Essays on form, reference, and the trouble with documenting an invented place."
          >
            <WritingsList />
          </Section>

          <hr className="border-t border-rule" />

          <Section
            id="plates"
            label="Plates"
            title="Photographs & figures"
            blurb="Filed by collection. Show or hide whichever you want to look at."
          >
            <Gallery plates={plates} collections={collections} />
          </Section>

          <hr className="border-t border-rule" />

          <Section
            id="recommended"
            label="Recommended"
            title="Books that belong beside this one"
            blurb="Chosen for the shape of them — reference works pressed into service as literature."
          >
            <Recommendations />
          </Section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
