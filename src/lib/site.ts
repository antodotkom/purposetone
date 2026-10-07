import type { PostCategory } from "@/lib/types";

export const SITE_NAME = "Purposetone";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://purposetone.com";

/** Absolute image for WhatsApp and social cards. Local covers use a compressed copy. */
export function postShareImage(cover?: string): string | undefined {
  if (!cover) return undefined;
  if (/^https?:\/\//.test(cover)) return cover;
  const file = cover.split("/").pop();
  if (file && (cover.startsWith("/covers/") || cover.startsWith("/features/"))) {
    return `${SITE_URL}/share/${file}`;
  }
  return `${SITE_URL}${cover.startsWith("/") ? cover : `/${cover}`}`;
}
export const SITE_LOCALE = "en-CA";
export const SITE_TAGLINE = "Make the record. Keep the gospel.";
export const HERO_LINE = "Music stories. Craft in the mix.";
export const HERO_SUB =
  "A Christian music blog for gospel, country, jazz, indie, and hip-hop — artist stories, not desk notes.";
export const FOOTER_LINE =
  "Gospel 100%. Mixed genres. Mentor-grade music journalism for makers of songs.";
export const EMPTY_SEARCH =
  "Nothing on the desk for that query — try Gospel, Country, or Jazz.";
export const MANUAL_VERSION = "Manual v1.2 · Reviewed 2026-06";

export const NAV = [
  { href: "/posts", label: "Stories", emphasized: true },
  { href: "/videos", label: "On Tape", emphasized: false },
  { href: "/playlists", label: "Studio Mixes", emphasized: false },
  { href: "/about", label: "About", emphasized: false },
  { href: "/contact", label: "Contact", emphasized: false },
] as const;

export const FOOTER_NAV = [
  { href: "/manual", label: "Field Manual" },
  { href: "/posts", label: "Stories" },
  { href: "/videos", label: "On Tape" },
  { href: "/playlists", label: "Mixes" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_SEO =
  "Christian music blog for gospel choir, praise and worship, Christian hip-hop, country gospel, jazz gospel, faith indie, scripture songs, live worship, studio mixes, artist testimonies, and new-song coverage.";

export const POST_CATEGORIES: PostCategory[] = [
  "Gospel",
  "Country",
  "Jazz",
  "Indie",
  "Hip-Hop",
];

export const VIDEO_CHIPS = [
  "Gospel",
  "Worship",
  "Studio",
  "Indie",
  "Country",
  "Hip-Hop",
] as const;

export const PLAYLIST_MOODS = [
  "Focus",
  "Admin",
  "Rewrite",
  "Warm-up",
  "Reset",
  "Late",
] as const;

export const MANUAL_PARTS = [
  "Part I — Practice",
  "Part II — Process",
  "Part III — Career",
  "Part IV — Mindset & Meaning",
] as const;

export const CATEGORY_BLURBS: Record<PostCategory, string> = {
  Gospel: "Choir, shout, and church-night records — music stories, not practice hacks.",
  Country: "Country-gospel and faith-and-fiddle artist stories.",
  Jazz: "Jazz-gospel pocket: harmony as testimony.",
  Indie: "Faith-forward indie and singer-songwriter journalism.",
  "Hip-Hop": "Christian hip-hop as craft and career — bars, rooms, rollouts.",
};

export const AD_SLOT_HOUSE: Record<string, string> = {
  "home-hero-below": "pt-ad-01",
  "home-after-notes": "pt-ad-02",
  "home-footer-above": "pt-ad-03",
  "posts-archive-top": "pt-ad-04",
  "posts-grid-native-4": "pt-ad-05",
  "post-inline-mid": "pt-ad-06",
  "post-sidebar": "pt-ad-07",
  "manual-side": "pt-ad-08",
  "manual-after-section": "pt-ad-09",
  "videos-mid": "pt-ad-10",
  "playlists-top": "pt-ad-11",
  "search-empty": "pt-ad-12",
};
