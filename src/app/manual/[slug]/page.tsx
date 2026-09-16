import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/AdBanner";
import { Container } from "@/components/chrome/Container";
import { ManualBody } from "@/components/manual/ManualCallout";
import { ManualChapterHeader } from "@/components/manual/ManualChapterHeader";
import { ManualChecklist } from "@/components/manual/ManualChecklist";
import { ManualNextPrev } from "@/components/manual/ManualNextPrev";
import { ManualToc } from "@/components/manual/ManualToc";
import { PlaylistCard } from "@/components/media/PlaylistCard";
import { PostCard } from "@/components/posts/PostCard";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  getAdjacentChapters,
  getManualChapter,
  getManualChapters,
  relatedPlaylistForChapter,
  relatedPostsForChapter,
} from "@/lib/content";
import { extractHeadings, splitManualSections } from "@/lib/markdown";
import { MANUAL_VERSION, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return getManualChapters().map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/manual/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getManualChapter(slug);
  if (!chapter) return { title: "Field Manual" };
  return {
    title: `${chapter.title}`,
    description: chapter.summary,
  };
}

export default async function ManualChapterPage({
  params,
}: PageProps<"/manual/[slug]">) {
  const { slug } = await params;
  const chapter = getManualChapter(slug);
  if (!chapter) notFound();

  const headings = extractHeadings(chapter.body);
  const sections = splitManualSections(chapter.body);
  const { prev, next } = getAdjacentChapters(slug);
  const relatedPosts = relatedPostsForChapter(chapter);
  const mix = relatedPlaylistForChapter(chapter.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: chapter.title,
    description: chapter.summary,
    dateModified: chapter.updated,
    inLanguage: "en-CA",
    url: `${SITE_URL}/manual/${chapter.slug}`,
    version: "1.2",
    publisher: { "@type": "Organization", name: "Purposetone" },
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Field Manual", href: "/manual" },
            { name: chapter.part, href: "/manual" },
            { name: chapter.title, href: `/manual/${chapter.slug}` },
          ]),
        ]}
      />
      <div className="border-b border-paper-deep bg-[image:var(--grad-manual)]">
        <Container className="py-8">
          <Breadcrumb
            items={[
              { href: "/manual", label: "Manual" },
              { href: "/manual", label: chapter.part },
              { label: chapter.title },
            ]}
          />
        </Container>
      </div>
      <Container className="grid gap-10 py-12 lg:grid-cols-[240px_minmax(0,720px)] lg:justify-between">
        <aside className="z-[35] lg:order-none">
          <ManualToc headings={headings} />
          <div className="mt-8 hidden xl:block">
            <AdBanner slotId="manual-side" size="rectangle" variant="house" />
          </div>
        </aside>
        <article className="min-w-0">
          <ManualChapterHeader chapter={chapter} />
          <ManualBody sections={sections} />
          <div className="my-10">
            <AdBanner
              slotId="manual-after-section"
              size="sponsor-strip"
              variant="house"
            />
          </div>
          {chapter.checklist?.length ? (
            <ManualChecklist
              chapterSlug={chapter.slug}
              items={chapter.checklist}
            />
          ) : null}
          <ManualNextPrev prev={prev} next={next} />
          <p className="mt-8 font-mono text-[13px] text-line-muted">
            {MANUAL_VERSION}
          </p>
        </article>
      </Container>
      <Container className="pb-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <h2 className="font-display text-[26px] font-semibold">
              Related notes
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          {mix ? (
            <div>
              <h2 className="font-display text-[22px] font-semibold">
                Companion mix
              </h2>
              <div className="mt-6">
                <PlaylistCard playlist={mix} />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
}
