import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/AdBanner";
import { Container } from "@/components/chrome/Container";
import { PlaylistCard } from "@/components/media/PlaylistCard";
import { MarkdownBody } from "@/components/posts/MarkdownBody";
import { OtherStories } from "@/components/posts/OtherStories";
import { PostCard } from "@/components/posts/PostCard";
import { PostHero } from "@/components/posts/PostHero";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/Button";
import {
  getPost,
  getPosts,
  getRelatedPosts,
  relatedPlaylistForPost,
  resolveManualChapter,
} from "@/lib/content";
import { postShareImage, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Note" };
  const image = postShareImage(post.coverImage);
  return {
    title: post.seoTitle.replace(" · Purposetone", ""),
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/posts/${post.slug}`,
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const others = getPosts().filter((item) => item.slug !== post.slug).slice(0, 6);
  const chapter = resolveManualChapter(post);
  const mix = relatedPlaylistForPost(post);
  const raw = post.body ?? post.excerpt;
  const videoToken = "{{video}}";
  const videoAt = raw.indexOf(videoToken);
  const lead = videoAt >= 0 ? raw.slice(0, videoAt).trim() : "";
  const body = videoAt >= 0 ? raw.slice(videoAt + videoToken.length).trim() : raw;
  const midSplit = body.includes("\n## ")
    ? body.split(/(?=\n## )/)
    : [body];
  const firstHalf = midSplit.slice(0, Math.max(1, Math.ceil(midSplit.length / 2))).join("");
  const secondHalf = midSplit.slice(Math.max(1, Math.ceil(midSplit.length / 2))).join("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    inLanguage: "en-CA",
    url: `${SITE_URL}/posts/${post.slug}`,
    image: postShareImage(post.coverImage),
    articleSection: post.category,
    publisher: { "@type": "Organization", name: "Purposetone" },
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Stories", href: "/posts" },
            { name: post.title, href: `/posts/${post.slug}` },
          ]),
        ]}
      />
      <PostHero post={post} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article>
          <Breadcrumb
            items={[
              { href: "/", label: "Home" },
              { href: "/posts", label: "Stories" },
              { label: post.title },
            ]}
          />
          {lead ? (
            <div className="mt-8">
              <MarkdownBody markdown={lead} />
            </div>
          ) : null}
          {post.youtubeId ? (
            <figure className="mt-8 overflow-hidden rounded-lg border border-paper-deep bg-ink shadow-card">
              <iframe
                title={post.title}
                src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}?rel=0&modestbranding=1`}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <figcaption className="bg-paper-elevated px-4 py-3 font-display text-[15px] italic text-brand">
                Play the record
              </figcaption>
            </figure>
          ) : null}
          <div className="mt-8">
            <MarkdownBody markdown={firstHalf} />
          </div>
          <div className="my-10">
            <AdBanner slotId="post-inline-mid" size="large-rectangle" variant="house" />
          </div>
          {secondHalf ? <MarkdownBody markdown={secondHalf} /> : null}
          {chapter ? (
            <div className="mt-10 rounded-md border border-olive/30 bg-olive-soft/40 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-olive">
                Continue in Field Manual
              </p>
              <p className="mt-2 font-display text-[22px] font-semibold">
                Ch.{chapter.number} {chapter.title}
              </p>
              <p className="mt-1 text-[15px] text-line">{chapter.summary}</p>
              <div className="mt-4">
                <ButtonLink href={`/manual/${chapter.slug}`}>Open chapter</ButtonLink>
              </div>
            </div>
          ) : null}
        </article>
        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start lg:pt-12">
          <OtherStories posts={others} />
          <AdBanner slotId="post-sidebar" size="rectangle" variant="house" />
          {mix ? (
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-olive">
                Companion mix
              </p>
              <PlaylistCard playlist={mix} />
            </div>
          ) : null}
        </aside>
      </Container>
      {related.length ? (
        <Container className="pb-16">
          <h2 className="font-display text-[26px] font-semibold">Related notes</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
