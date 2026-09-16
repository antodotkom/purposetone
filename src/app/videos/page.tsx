import type { Metadata } from "next";
import { BannerSlider } from "@/components/kit/BannerSlider";
import { Container } from "@/components/chrome/Container";
import { VideoCard } from "@/components/media/VideoCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { PageHero } from "@/components/ui/PageHero";
import { VerseCallout } from "@/components/ui/VerseCallout";
import { TAPE_SLIDES } from "@/lib/bannerSlides";
import { getVideos } from "@/lib/content";
import { VIDEO_CHIPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "On Tape",
  description:
    "Official and live YouTube performances — gospel, worship, studio, indie, country, and hip-hop.",
};

export default async function VideosPage({
  searchParams,
}: PageProps<"/videos">) {
  const params = await searchParams;
  const chip = typeof params.chip === "string" ? params.chip : undefined;
  const videos = chip
    ? getVideos().filter((video) => video.category === chip)
    : getVideos();
  const mid = Math.ceil(videos.length / 2);

  return (
    <>
      <PageHero
        kicker="On Tape"
        title="On Tape"
        sub="Real YouTube performances with thumbnails. Click to play — gospel and Christian music, mixed genres."
        banner="studio"
      />
      <Container className="py-10">
        <FilterBar
          items={VIDEO_CHIPS}
          active={VIDEO_CHIPS.includes(chip as (typeof VIDEO_CHIPS)[number]) ? chip : undefined}
          allHref="/videos"
          hrefFor={(item) => `/videos?chip=${encodeURIComponent(item)}`}
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, mid).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <div className="my-10">
          <BannerSlider slides={TAPE_SLIDES} tone="green" interval={4400} />
          <VerseCallout
            className="mt-8"
            quote="Make a joyful noise unto the Lord."
            verse="Psalm 100:1"
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(mid).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </Container>
    </>
  );
}
