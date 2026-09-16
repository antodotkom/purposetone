import type { Metadata } from "next";
import { Container } from "@/components/chrome/Container";
import { PlaylistCard } from "@/components/media/PlaylistCard";
import { VideoCard } from "@/components/media/VideoCard";
import { PostCard } from "@/components/posts/PostCard";
import { JsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { NewsletterBlock } from "@/components/ui/NewsletterBlock";
import { PullQuote } from "@/components/ui/PullQuote";
import { SectionHead } from "@/components/ui/SectionHead";
import { VerseCallout } from "@/components/ui/VerseCallout";
import { BannerSlider } from "@/components/kit/BannerSlider";
import { Sticker } from "@/components/kit/Sticker";
import { StickerRail } from "@/components/kit/StickerRail";
import { StickerScatter } from "@/components/kit/StickerScatter";
import { HOME_CREAM_SLIDES, HOME_INK_SLIDES } from "@/lib/bannerSlides";
import { getPlaylists, getRecentPosts, getVideos } from "@/lib/content";
import { HERO_SUB, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — Music stories. Craft in the mix.` },
  description: HERO_SUB,
};

export default function Home() {
  const notes = getRecentPosts(6);
  const videos = getVideos().slice(0, 9);
  const mixes = getPlaylists().slice(0, 3);
  const featuredTape = videos[0];
  const sideTape = videos.slice(1, 3);
  const moreTape = videos.slice(3);

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <section className="relative overflow-hidden pt-ground-cream">
        <StickerScatter
          className="hidden lg:block"
          items={[
            { src: "/kit/stickers/15-on-purpose.png", className: "right-[3%] top-[10%] w-28", motion: "bob", rotate: -14 },
            { src: "/kit/stickers/25-purposetone.png", className: "right-[14%] top-[42%] w-32", motion: "wiggle", rotate: 12 },
            { src: "/kit/stickers/14-the-word.png", className: "right-[4%] bottom-[12%] w-28", motion: "spin", rotate: -10 },
            { src: "/kit/stickers/13-his-timing.png", className: "right-[22%] bottom-[8%] w-24", motion: "float", rotate: 8 },
          ]}
        />
        <Container className="relative z-10 py-12 md:py-20 lg:py-24">
          <div className="max-w-xl lg:max-w-[36rem]">
            <p className="pt-kicker">On purpose</p>
            <h1 className="pt-h1 mt-4">
              Music stories. <span className="text-brand">Craft</span> in the mix.
            </h1>
            <p className="pt-body mt-5">{HERO_SUB}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/posts">Latest stories</ButtonLink>
              <ButtonLink href="/videos" variant="ghost">
                On Tape
              </ButtonLink>
            </div>
            <VerseCallout
              className="mt-10"
              quote="Do it all for the glory of God."
              verse="1 Corinthians 10:31"
            />
          </div>
          <div className="mt-8 flex items-end gap-3 lg:hidden" aria-hidden="true">
            <Sticker src="/kit/stickers/15-on-purpose.png" className="w-16 sm:w-20" motion="bob" rotate={-10} />
            <Sticker src="/kit/stickers/25-purposetone.png" className="w-20 sm:w-24" motion="wiggle" rotate={8} />
            <Sticker src="/kit/stickers/06-amen.png" className="w-16 sm:w-20" motion="float" rotate={-6} />
          </div>
        </Container>
      </section>

      <StickerRail
        stickers={[
          "/kit/stickers/15-on-purpose.png",
          "/kit/stickers/23-gospel.png",
          "/kit/stickers/20-worship.png",
          "/kit/stickers/06-amen.png",
          "/kit/stickers/11-jesus-saves.png",
          "/kit/stickers/25-purposetone.png",
          "/kit/stickers/21-praise-loud.png",
          "/kit/stickers/08-redeemed.png",
        ]}
      />

      <section className="pt-ground-cream">
        <Container className="py-8 md:py-10">
          <BannerSlider slides={HOME_CREAM_SLIDES} tone="cream" interval={4600} />
        </Container>
      </section>

      <section className="pt-ground-ink">
        <Container className="py-12 md:py-16">
          <SectionHead
            kicker="Music stories"
            title="Recent stories"
            action={
              <ButtonLink href="/posts" variant="ghost" className="hidden sm:inline-flex">
                All stories
              </ButtonLink>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-ground-cream">
        <Container className="py-12 md:py-16">
          <SectionHead
            kicker="On tape"
            title="Gospel and Christian performances"
            action={
              <ButtonLink href="/videos" variant="ghost" className="hidden sm:inline-flex">
                All On Tape
              </ButtonLink>
            }
          />
          <div className="mt-2 grid gap-6 lg:grid-cols-3">
            {featuredTape ? (
              <div className="lg:col-span-2">
                <VideoCard video={featuredTape} featured />
              </div>
            ) : null}
            <div className="grid gap-6">
              {sideTape.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
          {moreTape.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreTape.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : null}
          <div className="mt-8 sm:hidden">
            <ButtonLink href="/videos" variant="ghost">
              All On Tape
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="pt-ground-ink">
        <Container className="py-12 md:py-16">
          <SectionHead kicker="Studio mixes" title="Three to work beside" />
          <div className="grid gap-5 md:grid-cols-3">
            {mixes.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-ground-ink">
        <Container className="py-8 md:py-10">
          <BannerSlider slides={HOME_INK_SLIDES} tone="ink" interval={5200} />
        </Container>
      </section>

      <section className="pt-ground-cream">
        <Container className="py-12 md:py-16">
          <PullQuote>
            “Finish rates beat inspiration myths every week of the year.”
          </PullQuote>
          <VerseCallout
            className="mt-10"
            quote="The joy of the Lord is your strength."
            verse="Nehemiah 8:10"
          />
        </Container>
      </section>

      <section className="pt-ground-cream">
        <Container className="py-12 md:pb-16">
          <NewsletterBlock />
        </Container>
      </section>
    </>
  );
}
