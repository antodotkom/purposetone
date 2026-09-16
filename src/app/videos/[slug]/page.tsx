import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/chrome/Container";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { VideoCard } from "@/components/media/VideoCard";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryChip } from "@/components/ui/CategoryChip";
import { PageHero } from "@/components/ui/PageHero";
import { getVideo, getVideos } from "@/lib/content";

export async function generateStaticParams() {
  return getVideos().map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/videos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) return { title: "Studio table" };
  return {
    title: video.title,
    description: video.description,
  };
}

export default async function VideoPage({
  params,
}: PageProps<"/videos/[slug]">) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();
  const related = getVideos()
    .filter((item) => item.slug !== video.slug && item.category === video.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "On Tape", href: "/videos" },
          { name: video.title, href: `/videos/${video.slug}` },
        ])}
      />
      <PageHero
        kicker="Studio table"
        title={video.title}
        sub={video.description}
        banner="studio"
      />
      <Container className="py-12">
        <Breadcrumb
          items={[
            { href: "/videos", label: "On Tape" },
            { label: video.title },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <VideoEmbed video={video} />
          <div className="mt-6 flex items-center gap-3">
            <CategoryChip category={video.category} href={`/videos?chip=${encodeURIComponent(video.category)}`} />
            <span className="font-mono text-[13px] text-line">
              {video.durationEstimate}
            </span>
            <span className="text-[13px] text-line-muted">{video.creatorLabel}</span>
          </div>
          <p className="mt-6 max-w-[65ch] font-serif text-[18px] leading-relaxed text-ink">
            {video.description}
          </p>
        </div>
        {related.length ? (
          <div className="mt-14">
            <h2 className="font-display text-[26px] font-semibold">More at the table</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <VideoCard key={item.id} video={item} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </>
  );
}
