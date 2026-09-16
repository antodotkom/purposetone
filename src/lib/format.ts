export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatUpdated(iso: string): string {
  return `Updated ${formatDate(iso)}`;
}

export function categorySlug(category: string): string {
  return category.toLowerCase();
}

export function youtubeIdFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get("v") ?? parsed.pathname.split("/").filter(Boolean).pop() ?? "";
  } catch {
    return "";
  }
}

export function youtubeThumb(url: string): string {
  const id = youtubeIdFromUrl(url);
  return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "";
}

export function youtubePlaceholderId(embedUrl: string): string {
  return youtubeIdFromUrl(embedUrl) || embedUrl;
}
