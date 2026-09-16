import adsJson from "@/content/ads.json";
import manualJson from "@/content/manual.json";
import playlistsJson from "@/content/playlists.json";
import postsJson from "@/content/posts.json";
import videosJson from "@/content/videos.json";
import type {
  HouseAd,
  ManualChapter,
  PostCategory,
  PurposePost,
  StudioPlaylist,
  StudioVideo,
} from "@/lib/types";
import { categorySlug } from "@/lib/format";

const posts = postsJson as PurposePost[];
const chapters = manualJson as ManualChapter[];
const playlists = playlistsJson as StudioPlaylist[];
const videos = videosJson as StudioVideo[];
const ads = adsJson as HouseAd[];

export function getPosts(): PurposePost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string): PurposePost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: PostCategory): PurposePost[] {
  return getPosts().filter((post) => post.category === category);
}

export function getRecentPosts(limit = 6): PurposePost[] {
  return getPosts().slice(0, limit);
}

export function getRelatedPosts(post: PurposePost, limit = 3): PurposePost[] {
  return getPosts()
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, limit);
}

export function getManualChapters(): ManualChapter[] {
  return [...chapters].sort((a, b) => a.number.localeCompare(b.number));
}

export function getManualChapter(slug: string): ManualChapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function getPinnedManualChapters(): ManualChapter[] {
  return getManualChapters().slice(0, 3);
}

export function getChaptersByPart(part: string): ManualChapter[] {
  return getManualChapters().filter((chapter) => chapter.part === part);
}

export function getAdjacentChapters(slug: string): {
  prev?: ManualChapter;
  next?: ManualChapter;
} {
  const list = getManualChapters();
  const index = list.findIndex((chapter) => chapter.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function getPlaylists(): StudioPlaylist[] {
  return playlists;
}

export function getPlaylist(slug: string): StudioPlaylist | undefined {
  return playlists.find((playlist) => playlist.slug === slug);
}

export function getVideos(): StudioVideo[] {
  return videos;
}

export function getVideo(slug: string): StudioVideo | undefined {
  return videos.find((video) => video.slug === slug);
}

export function getAds(): HouseAd[] {
  return ads;
}

export function getAd(id: string): HouseAd | undefined {
  return ads.find((ad) => ad.id === id);
}

export function getCategoryFromSlug(slug: string): PostCategory | undefined {
  const match = posts.find((post) => categorySlug(post.category) === slug);
  return match?.category;
}

const CHAPTER_ALIASES: Record<string, string> = {
  "shipping-week-is-a-container": "shipping-week",
  "shipping-week-day-by-day": "shipping-week",
  "practice-block-audit-chapter": "practice-block-audit",
  "pricing-chapter-companion": "pricing",
  "quiet-release-chapter": "quiet-release",
  "purpose-poster-chapter": "purpose-without-poster",
  "checklist-that-gets-ticked": "shipping-week",
  "mentor-callout-component": "feedback-protocol",
  "chapter-next-prev-ux": "career-map",
  "manual-print-friendly": "session-hygiene",
  "evergreen-vs-news-hooks": "finish-rates",
  "manual-how-to-use-chapters": "practice-block-audit",
  "pinned-guides-on-the-home": "practice-block-audit",
  "field-manual-spine": "practice-block-audit",
  "part-i-practice-overview": "practice-block-audit",
  "part-ii-process-overview": "session-hygiene",
  "part-iii-career-overview": "career-map",
  "part-iv-mindset-overview": "purpose-without-poster",
  "not-a-course-funnel": "purpose-without-poster",
  "no-countdown-timers": "shipping-week",
};

export function resolveManualChapter(
  post: Pick<PurposePost, "manualChapter" | "category" | "title" | "slug">,
): ManualChapter | undefined {
  const ref = post.manualChapter;
  if (ref) {
    const exact = getManualChapter(ref);
    if (exact) return exact;
    const alias = CHAPTER_ALIASES[ref];
    if (alias) return getManualChapter(alias);
    const fuzzy = getManualChapters().find(
      (chapter) => ref.includes(chapter.slug) || chapter.slug.includes(ref),
    );
    if (fuzzy) return fuzzy;
  }

  const byTitle = getManualChapters().find(
    (chapter) =>
      post.title.toLowerCase().includes(chapter.title.toLowerCase()) ||
      chapter.title.toLowerCase().includes(post.title.toLowerCase()),
  );
  if (byTitle) return byTitle;

  if (post.category === "Indie") return getManualChapters()[0];
  return undefined;
}

const CHAPTER_MIX: Record<string, string> = {
  "practice-block-audit": "deep-practice",
  "finish-rates": "deep-practice",
  "deep-work-studio": "deep-practice",
  "warm-start": "before-the-session",
  "session-hygiene": "before-the-session",
  versioning: "before-the-session",
  "feedback-protocol": "after-feedback",
  "shipping-week": "release-week-am",
  "career-map": "portfolio-update",
  pricing: "money-morning",
  collaborators: "collaborator-drive",
  "quiet-release": "post-release-quiet",
  "purpose-without-poster": "restoration-day",
  "keep-tone": "late-build",
  "stewardship-attention": "deep-practice",
  "rest-craft": "restoration-day",
};

const CATEGORY_MIX: Record<string, string> = {
  Gospel: "deep-practice",
  Country: "money-morning",
  Jazz: "after-feedback",
  Indie: "mentor-office-hour",
  "Hip-Hop": "before-the-session",
};

export function relatedPlaylistForChapter(slug: string): StudioPlaylist | undefined {
  return getPlaylist(CHAPTER_MIX[slug] ?? "deep-practice");
}

export function relatedPlaylistForPost(post: PurposePost): StudioPlaylist | undefined {
  const chapter = resolveManualChapter(post);
  if (chapter) return relatedPlaylistForChapter(chapter.slug);
  return getPlaylist(CATEGORY_MIX[post.category] ?? "deep-practice");
}

export function relatedPostsForChapter(chapter: ManualChapter, limit = 3): PurposePost[] {
  const byChapter = getPosts().filter((post) => {
    const resolved = resolveManualChapter(post);
    return resolved?.slug === chapter.slug;
  });
  if (byChapter.length >= limit) return byChapter.slice(0, limit);

  const partCategory =
    chapter.part.includes("Career")
      ? "Country"
      : chapter.part.includes("Mindset")
        ? "Jazz"
        : chapter.part.includes("Process")
          ? "Hip-Hop"
          : "Gospel";

  const extras = getPosts().filter(
    (post) =>
      !byChapter.some((item) => item.slug === post.slug) &&
      (post.category === "Indie" || post.category === partCategory),
  );
  return [...byChapter, ...extras].slice(0, limit);
}

export function searchAll(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { posts: [] as PurposePost[], chapters: [] as ManualChapter[], playlists: [] as StudioPlaylist[], videos: [] as StudioVideo[] };
  }
  const hit = (value: string) => value.toLowerCase().includes(q);
  return {
    posts: getPosts().filter(
      (post) =>
        hit(post.title) ||
        hit(post.excerpt) ||
        hit(post.category) ||
        post.tags.some(hit) ||
        (post.body ? hit(post.body) : false),
    ),
    chapters: getManualChapters().filter(
      (chapter) =>
        hit(chapter.title) ||
        hit(chapter.summary) ||
        hit(chapter.part) ||
        hit(chapter.body),
    ),
    playlists: getPlaylists().filter(
      (playlist) =>
        hit(playlist.title) ||
        hit(playlist.description) ||
        playlist.moodTags.some(hit) ||
        playlist.slots.some((slot) => hit(slot.role) || hit(slot.cue)),
    ),
    videos: getVideos().filter(
      (video) =>
        hit(video.title) || hit(video.description) || hit(video.category),
    ),
  };
}
