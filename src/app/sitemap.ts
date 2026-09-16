import type { MetadataRoute } from "next";
import { getManualChapters, getPlaylists, getPosts, getVideos } from "@/lib/content";
import { categorySlug } from "@/lib/format";
import { POST_CATEGORIES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/posts",
    "/manual",
    "/videos",
    "/playlists",
    "/categories",
    "/about",
    "/search",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: new Date("2026-09-15"),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = getPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const chapters = getManualChapters().map((chapter) => ({
    url: `${SITE_URL}/manual/${chapter.slug}`,
    lastModified: new Date(chapter.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const videos = getVideos().map((video) => ({
    url: `${SITE_URL}/videos/${video.slug}`,
    lastModified: new Date("2026-06-01"),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const playlists = getPlaylists().map((playlist) => ({
    url: `${SITE_URL}/playlists/${playlist.slug}`,
    lastModified: new Date("2026-06-01"),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const categories = POST_CATEGORIES.map((category) => ({
    url: `${SITE_URL}/categories/${categorySlug(category)}`,
    lastModified: new Date("2026-09-15"),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...posts,
    ...chapters,
    ...videos,
    ...playlists,
    ...categories,
  ];
}
