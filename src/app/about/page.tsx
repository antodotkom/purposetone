import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/chrome/Container";
import { BannerSlider } from "@/components/kit/BannerSlider";
import { Sticker } from "@/components/kit/Sticker";
import { PageHero } from "@/components/ui/PageHero";
import { PullQuote } from "@/components/ui/PullQuote";
import { VerseCallout } from "@/components/ui/VerseCallout";
import { ABOUT_SLIDES } from "@/lib/bannerSlides";
import { SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Purposetone is a Christian music blog: gospel, country, jazz, indie, and hip-hop artist stories.",
};

const blocks = [
  {
    title: "What",
    body: "Purposetone is a gospel and Christian music blog. We publish music stories — artists, records, rooms, rollouts — across gospel, country, jazz, indie, and hip-hop. The Field Manual stays for makers who ship songs. This is not a stack of desk notes.",
  },
  {
    title: "Gospel 100%",
    body: "Every story is faith-catalog. Mixed genres on purpose. We are not a church site with a sermon player, and we are not a course funnel. We write about the music.",
  },
  {
    title: "Who",
    body: "Listeners, musicians, producers, and anyone following Christian music as a living catalog — not a youth-group costume.",
  },
  {
    title: "Contact",
    body: "Use the contact form. We read slowly. Chemistry beats clout when the session gets hard.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="Make the record. Keep the gospel."
        sub="Music journalism for makers of songs. Mixed genres. Gospel in every piece."
        banner="about"
      />
      <section className="pt-ground-ink">
        <Container className="py-8 md:py-10">
          <BannerSlider slides={ABOUT_SLIDES} tone="ink" interval={5800} />
        </Container>
      </section>
      <Container className="relative max-w-[720px] py-12 md:pr-28">
        <Sticker
          src="/kit/stickers/12-blessed.png"
          className="absolute -right-1 top-8 z-20 hidden w-24 md:block md:w-28"
          motion="bob"
          rotate={-12}
        />
        <VerseCallout
          className="mb-10"
          quote="Speak to one another with psalms and hymns."
          verse="Ephesians 5:19"
        />
        <div className="space-y-10">
          {blocks.map((block) => (
            <section key={block.title}>
              <h2 className="pt-h3">{block.title}</h2>
              <p className="pt-body mt-3">{block.body}</p>
            </section>
          ))}
        </div>
        <p className="pt-body mt-10">
          <Link href="/contact" className="font-bold text-brand underline">
            Open the contact form
          </Link>
        </p>
        <PullQuote className="mt-12">{SITE_TAGLINE}</PullQuote>
      </Container>
    </>
  );
}
