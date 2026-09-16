import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/chrome/Container";
import { PostGrid } from "@/components/posts/PostGrid";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { getCategoryFromSlug, getPostsByCategory } from "@/lib/content";
import { categorySlug } from "@/lib/format";
import { CATEGORY_BLURBS, POST_CATEGORIES } from "@/lib/site";

export async function generateStaticParams() {
  return POST_CATEGORIES.map((category) => ({ slug: categorySlug(category) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryFromSlug(slug);
  if (!category) return { title: "Category" };
  return {
    title: category,
    description: CATEGORY_BLURBS[category],
  };
}

const PAGE_SIZE = 18;

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategoryFromSlug(slug);
  if (!category) notFound();
  const query = await searchParams;
  const page = Math.max(1, Number(query.page ?? 1) || 1);
  const all = getPostsByCategory(category);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const slice = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Categories", href: "/categories" },
          { name: category, href: `/categories/${slug}` },
        ])}
      />
      <PageHero
        kicker="Category"
        title={category}
        sub={CATEGORY_BLURBS[category]}
        banner={slug}
      />
      <Container className="py-12">
        <PostGrid posts={slice} />
        <Pagination
          page={Math.min(page, totalPages)}
          totalPages={totalPages}
          hrefFor={(item) =>
            item > 1 ? `/categories/${slug}?page=${item}` : `/categories/${slug}`
          }
        />
      </Container>
    </>
  );
}
