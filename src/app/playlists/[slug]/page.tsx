import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/chrome/Container";
import { PlaylistCard } from "@/components/media/PlaylistCard";
import { StudioMixRack } from "@/components/media/StudioMixRack";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { getPlaylist, getPlaylists } from "@/lib/content";

export async function generateStaticParams() {
  return getPlaylists().map((playlist) => ({ slug: playlist.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/playlists/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const playlist = getPlaylist(slug);
  if (!playlist) return { title: "Studio mix" };
  return {
    title: playlist.title,
    description: playlist.description,
  };
}

export default async function PlaylistPage({
  params,
}: PageProps<"/playlists/[slug]">) {
  const { slug } = await params;
  const playlist = getPlaylist(slug);
  if (!playlist) notFound();
  const related = getPlaylists()
    .filter(
      (item) =>
        item.slug !== playlist.slug &&
        item.moodTags.some((tag) => playlist.moodTags.includes(tag)),
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Studio Mixes", href: "/playlists" },
          { name: playlist.title, href: `/playlists/${playlist.slug}` },
        ])}
      />
      <PageHero
        kicker="Studio companion"
        title={playlist.title}
        sub={playlist.description}
        banner="mixes"
      />
      <Container className="py-12">
        <Breadcrumb
          items={[
            { href: "/playlists", label: "Studio Mixes" },
            { label: playlist.title },
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {playlist.moodTags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-olive-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-olive"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-[65ch] font-serif text-[17px] leading-relaxed text-line">
          Work beside this mix, do not perform for it. Slot roles keep the hour
          honest. There is no BPM board here — only mood and sequence.
        </p>
        <div className="mt-8 max-w-3xl">
          <StudioMixRack slots={playlist.slots} />
        </div>
        {related.length ? (
          <div className="mt-14">
            <h2 className="font-display text-[26px] font-semibold">Nearby mixes</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PlaylistCard key={item.id} playlist={item} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </>
  );
}
