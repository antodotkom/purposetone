export type PostCategory = "Gospel" | "Country" | "Jazz" | "Indie" | "Hip-Hop";

export type PurposePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  category: PostCategory;
  tags: string[];
  date: string;
  readMinutes: number;
  coverConcept: string;
  coverImage?: string;
  bannerStyle: string;
  softFaithLean: boolean;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  manualChapter?: string;
};

export type ManualChapter = {
  id: string;
  slug: string;
  part: string;
  number: string;
  title: string;
  summary: string;
  body: string;
  updated: string;
  checklist?: string[];
};

export type PlaylistSlot = {
  role: string;
  cue: string;
};

export type StudioPlaylist = {
  id: string;
  slug: string;
  title: string;
  moodTags: string[];
  description: string;
  coverConcept: string;
  slots: PlaylistSlot[];
};

export type StudioVideo = {
  id: string;
  slug: string;
  title: string;
  creatorLabel: string;
  embedUrl: string;
  youtubeId?: string;
  thumbnailUrl?: string;
  category: string;
  durationEstimate: string;
  description: string;
};

export type HouseAd = {
  id: string;
  headline: string;
  sub: string;
  cta: string;
  href: string;
  sizeHints: string[];
  artConcept: string;
};

export type AdSize =
  | "leaderboard"
  | "leaderboard-mobile"
  | "rectangle"
  | "large-rectangle"
  | "billboard"
  | "sponsor-strip"
  | "native-card"
  | "playlist-rail";
