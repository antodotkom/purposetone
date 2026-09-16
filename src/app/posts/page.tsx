import type { Metadata } from "next";
import { BannerSlider } from "@/components/kit/BannerSlider";
import { Container } from "@/components/chrome/Container";
import { PostGrid } from "@/components/posts/PostGrid";
import { FilterBar } from "@/components/ui/FilterBar";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { VerseCallout } from "@/components/ui/VerseCallout";
import { STORIES_SLIDES } from "@/lib/bannerSlides";
import { getPosts } from "@/lib/content";
import { POST_CATEGORIES } from "@/lib/site";
import type { PostCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Music stories",
  description:
    "Gospel, country, jazz, indie, and hip-hop — Christian music journalism, not desk notes.",
};

const PAGE_SIZE = 18;

export default async function PostsPage({
  searchParams,
}: PageProps<"/posts">) {
  const params = await searchParams;
  const categoryParam = typeof params.category === "string" ? params.category : undefined;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const category = POST_CATEGORIES.includes(categoryParam as PostCategory)
    ? (categoryParam as PostCategory)
    : undefined;

  const all = category
    ? getPosts().filter((post) => post.category === category)
    : getPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const slice = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHero
        kicker="Archive"
        title="Music stories"
        sub="Gospel, country, jazz, indie, hip-hop — artist and record journalism, gospel in every piece."
        banner="notes"
      />
      <Container className="py-10">
        <BannerSlider slides={STORIES_SLIDES} tone="rose" interval={5000} />
        <VerseCallout
          className="mt-8"
          quote="He has put a new song in my mouth."
          verse="Psalm 40:3"
        />
        <div className="mt-8">
          <FilterBar
            items={POST_CATEGORIES}
            active={category}
            allHref="/posts"
            hrefFor={(item) => `/posts?category=${encodeURIComponent(item)}`}
          />
        </div>
        <div className="mt-8">
          <PostGrid posts={slice} nativeEvery={8} />
        </div>
        <Pagination
          page={Math.min(page, totalPages)}
          totalPages={totalPages}
          hrefFor={(item) => {
            const query = new URLSearchParams();
            if (category) query.set("category", category);
            if (item > 1) query.set("page", String(item));
            const qs = query.toString();
            return qs ? `/posts?${qs}` : "/posts";
          }}
        />
      </Container>
    </>
  );
}
