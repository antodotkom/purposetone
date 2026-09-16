import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/AdBanner";
import { Container } from "@/components/chrome/Container";
import { ManualIndexGrid } from "@/components/manual/ManualIndexGrid";
import { JsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Field Manual",
  description:
    "Evergreen guides you can return to all year — practice, process, career, and mindset.",
};

export default function ManualIndexPage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <PageHero
        kicker="Evergreen"
        title="Field Manual"
        sub="Evergreen guides you can return to all year."
        banner="manual"
      />
      <Container className="grid gap-10 py-12 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="prose-pt max-w-[65ch]">
            The Field Manual is the spine of Purposetone: sixteen chapters you
            can reopen in June as easily as in January. Use it when a practice
            block starts lying, when a shipping week needs a container, when
            pricing shrinks, or when meaning tries to become a poster. Read a
            chapter, tick the checklist, then return to the desk. These are not
            news hooks and not a gated course. They are mentor notes — direct,
            kind, specific — for makers who want finish rates and career
            clarity without the noise. Start with Practice if the week is
            dishonest; start with Career if the map is missing; skip the
            meaning chapters if you came for cables. They will still be here.
          </p>
          <div className="mt-12">
            <ManualIndexGrid />
          </div>
        </div>
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <AdBanner slotId="manual-side" size="rectangle" variant="house" />
          </div>
        </aside>
      </Container>
    </>
  );
}
