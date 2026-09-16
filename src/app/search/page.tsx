import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "@/components/ads/AdBanner";
import { Container } from "@/components/chrome/Container";
import { ManualCard } from "@/components/manual/ManualCard";
import { PlaylistCard } from "@/components/media/PlaylistCard";
import { VideoCard } from "@/components/media/VideoCard";
import { PostCard } from "@/components/posts/PostCard";
import { PageHero } from "@/components/ui/PageHero";
import { SearchBox } from "@/components/ui/SearchBox";
import { searchAll } from "@/lib/content";
import { EMPTY_SEARCH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search",
  description: "Search notes, Field Manual chapters, studio mixes, and videos.",
};

const TABS = ["Stories", "Manual", "Mixes", "On Tape"] as const;
type Tab = (typeof TABS)[number];

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const tabParam = typeof params.tab === "string" ? params.tab : "Stories";
  const tab = TABS.includes(tabParam as Tab) ? (tabParam as Tab) : "Stories";
  const results = searchAll(q);
  const counts = {
    Stories: results.posts.length,
    Manual: results.chapters.length,
    Mixes: results.playlists.length,
    "On Tape": results.videos.length,
  };
  const empty =
    Boolean(q) &&
    results.posts.length +
      results.chapters.length +
      results.playlists.length +
      results.videos.length ===
      0;

  return (
    <>
      <PageHero
        kicker="Search"
        title="Search the desk"
        sub="Stories, Field Manual, mixes, and what’s on tape."
        banner="search"
      />
      <Container className="py-10">
        <div className="max-w-xl">
          <SearchBox defaultValue={q} />
        </div>
        {q ? (
          <p className="mt-4 text-[14px] text-line">
            Results for “{q}”
          </p>
        ) : (
          <p className="mt-4 text-[14px] text-line">
            Try Gospel, Country, Jazz, or an artist name.
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((item) => {
            const href = q
              ? `/search?q=${encodeURIComponent(q)}&tab=${encodeURIComponent(item)}`
              : `/search?tab=${encodeURIComponent(item)}`;
            return (
              <Link
                key={item}
                href={href}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${
                  tab === item
                    ? "border-copper bg-copper-soft text-copper-hot"
                    : "border-line-muted text-line hover:border-copper"
                }`}
              >
                {item}
                {q ? ` (${counts[item]})` : ""}
              </Link>
            );
          })}
        </div>

        {empty ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <p className="font-serif text-[20px] leading-relaxed text-ink">
              {EMPTY_SEARCH}
            </p>
            <AdBanner slotId="search-empty" size="rectangle" variant="house" />
          </div>
        ) : null}

        {!empty && tab === "Stories" ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(q ? results.posts : []).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : null}
        {!empty && tab === "Manual" ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {(q ? results.chapters : []).map((chapter) => (
              <ManualCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        ) : null}
        {!empty && tab === "Mixes" ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(q ? results.playlists : []).map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : null}
        {!empty && tab === "On Tape" ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(q ? results.videos : []).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : null}
      </Container>
    </>
  );
}
