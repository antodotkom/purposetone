import type { Metadata } from "next";
import { BannerSlider } from "@/components/kit/BannerSlider";
import { Container } from "@/components/chrome/Container";
import { PlaylistCard } from "@/components/media/PlaylistCard";
import { FilterBar } from "@/components/ui/FilterBar";
import { PageHero } from "@/components/ui/PageHero";
import { VerseCallout } from "@/components/ui/VerseCallout";
import { MIX_SLIDES } from "@/lib/bannerSlides";
import { getPlaylists } from "@/lib/content";
import { PLAYLIST_MOODS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio companion mixes",
  description:
    "Twenty studio companion mixes with slot roles — mood tags, not athletic BPM badges.",
};

export default async function PlaylistsPage({
  searchParams,
}: PageProps<"/playlists">) {
  const params = await searchParams;
  const mood = typeof params.mood === "string" ? params.mood : undefined;
  const playlists = mood
    ? getPlaylists().filter((playlist) => playlist.moodTags.includes(mood))
    : getPlaylists();

  return (
    <>
      <PageHero
        kicker="Mixes"
        title="Studio companion mixes"
        sub="Slot roles for the honest block. Mood tags — Focus, Admin, Rewrite, Warm-up, Reset, Late. No athletic meters."
        banner="mixes"
      />
      <Container className="py-10">
        <BannerSlider slides={MIX_SLIDES} tone="orange" interval={5400} />
        <VerseCallout
          className="mt-8"
          quote="I can do all things through Christ."
          verse="Philippians 4:13"
        />
        <div className="mt-8">
          <FilterBar
            items={PLAYLIST_MOODS}
            active={PLAYLIST_MOODS.includes(mood as (typeof PLAYLIST_MOODS)[number]) ? mood : undefined}
            allHref="/playlists"
            hrefFor={(item) => `/playlists?mood=${encodeURIComponent(item)}`}
          />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </Container>
    </>
  );
}
