import type { BannerSlide } from "@/components/kit/BannerSlider";

const b = (file: string) => `/kit/banners/slides/${file}`;

export const HOME_CREAM_SLIDES: BannerSlide[] = [
  {
    quote: "Do it all for the glory of God.",
    verse: "1 Corinthians 10:31",
    alt: "Do it all for the glory of God. 1 Corinthians 10:31",
    href: "/posts",
  },
  {
    quote: "Every good and perfect gift is from above.",
    verse: "James 1:17",
    alt: "Every good and perfect gift is from above. James 1:17",
    href: "/about",
  },
  {
    quote: "Your word is a lamp unto my feet.",
    verse: "Psalm 119:105",
    alt: "Your word is a lamp unto my feet. Psalm 119:105",
    href: "/posts",
  },
  {
    quote: "The joy of the Lord is your strength.",
    verse: "Nehemiah 8:10",
    alt: "The joy of the Lord is your strength. Nehemiah 8:10",
    href: "/playlists",
  },
];

export const HOME_INK_SLIDES: BannerSlide[] = [
  { src: b("scripture.png"), alt: "Be still, and know that I am God. Psalm 46:10", href: "/posts" },
  { src: b("faith.png"), alt: "Faith comes by hearing. Romans 10:17", href: "/videos" },
  { src: b("community.png"), alt: "Speak to one another with psalms and hymns. Ephesians 5:19", href: "/about" },
  { src: b("praise.png"), alt: "Let everything that has breath praise the Lord. Psalm 150:6", href: "/videos" },
];

export const STORIES_SLIDES: BannerSlide[] = [
  { src: b("testimony.png"), alt: "He has put a new song in my mouth. Psalm 40:3", href: "/videos" },
  { src: b("purpose.png"), alt: "Do it all for the glory of God.", href: "/posts" },
  { src: b("guidance.png"), alt: "Your word is a lamp unto my feet.", href: "/posts" },
];

export const TAPE_SLIDES: BannerSlide[] = [
  { src: b("worship.png"), alt: "Make a joyful noise unto the Lord. Psalm 100:1", href: "/videos" },
  { src: b("praise.png"), alt: "Let everything that has breath praise the Lord.", href: "/videos" },
  { src: b("new-song.png"), alt: "Sing to the Lord a new song. Psalm 96:1", href: "/playlists" },
  { src: b("faith.png"), alt: "Faith comes by hearing, and hearing by the word.", href: "/posts" },
];

export const MIX_SLIDES: BannerSlide[] = [
  { src: b("strength.png"), alt: "I can do all things through Christ. Philippians 4:13", href: "/playlists" },
  { src: b("joy.png"), alt: "The joy of the Lord is your strength.", href: "/playlists" },
  { src: b("new-song.png"), alt: "Sing to the Lord a new song.", href: "/videos" },
];

export const ABOUT_SLIDES: BannerSlide[] = [
  { src: b("community.png"), alt: "Speak to one another with psalms and hymns.", href: "/posts" },
  { src: b("brand.png"), alt: "Every gift has a purpose.", href: "/about" },
  { src: b("scripture.png"), alt: "Be still, and know that I am God.", href: "/contact" },
];
