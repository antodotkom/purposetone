import type { Metadata } from "next";
import { Container } from "@/components/chrome/Container";
import { KitBanner } from "@/components/kit/KitBanner";
import { Sticker } from "@/components/kit/Sticker";
import { ContactForm } from "@/components/ui/ContactForm";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Pitch a gospel or Christian music story to Purposetone.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Write the desk."
        sub="Gospel, country, jazz, indie, hip-hop — music stories, not notes. Pitch an artist or a record."
        banner="about"
      />
      <Container className="relative max-w-[720px] py-12 md:pr-28">
        <Sticker
          src="/kit/stickers/22-sing-it.png"
          className="absolute -right-1 top-10 z-20 hidden w-24 md:block md:w-28"
          motion="wiggle"
          rotate={12}
        />
        <KitBanner
          className="mb-10"
          theme="joy"
          href="/posts"
        />
        <ContactForm />
      </Container>
    </>
  );
}
