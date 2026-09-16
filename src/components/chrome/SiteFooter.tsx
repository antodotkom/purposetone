import Link from "next/link";
import { Container } from "@/components/chrome/Container";
import { Wordmark } from "@/components/chrome/Wordmark";
import { StickerRail } from "@/components/kit/StickerRail";
import { NewsletterBlock } from "@/components/ui/NewsletterBlock";
import { VerseCallout } from "@/components/ui/VerseCallout";
import {
  FOOTER_LINE,
  FOOTER_NAV,
  FOOTER_SEO,
  POST_CATEGORIES,
  SITE_TAGLINE,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto pt-ground-ink">
      <Container className="grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Wordmark invert />
          <p className="pt-kicker mt-4">{SITE_TAGLINE}</p>
          <p className="pt-body mt-4 text-cream">{FOOTER_LINE}</p>
          <p className="mt-4 max-w-prose font-body text-[14px] leading-relaxed text-cream/80">
            {FOOTER_SEO}
          </p>
          <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-body text-[15px] font-bold" aria-label="Footer">
            {FOOTER_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-cream hover:text-brand-300">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-body text-[13px] font-bold" aria-label="Music categories">
            {POST_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/posts?category=${encodeURIComponent(category)}`}
                className="text-brand-300 hover:text-cream"
              >
                {category}
              </Link>
            ))}
          </nav>
          <VerseCallout
            className="mt-8"
            quote="Be still, and know that I am God."
            verse="Psalm 46:10"
          />
        </div>
        <NewsletterBlock variant="footer" />
      </Container>
      <StickerRail
        stickers={[
          "/kit/stickers/01-be-still.png",
          "/kit/stickers/05-grace.png",
          "/kit/stickers/07-pray-first.png",
          "/kit/stickers/09-be-the-light.png",
          "/kit/stickers/16-keep-going.png",
          "/kit/stickers/24-turn-it-up.png",
        ]}
      />
      <div className="border-t border-cream/15">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5 font-body text-[13px] text-brand-300">
          <p>© {new Date().getFullYear()} Purposetone. en-CA.</p>
          <p>Craft first. Career second. Noise never.</p>
        </Container>
      </div>
    </footer>
  );
}
