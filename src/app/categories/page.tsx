import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/chrome/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getPostsByCategory } from "@/lib/content";
import { categorySlug } from "@/lib/format";
import { CATEGORY_BLURBS, POST_CATEGORIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categories",
  description: "Gospel, Country, Jazz, Indie, and Hip-Hop — five music desks.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        kicker="Index"
        title="Categories"
        sub="Five genres. Gospel in all of them. Music stories, not notes."
        banner="cats"
      />
      <Container className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {POST_CATEGORIES.map((category) => {
          const count = getPostsByCategory(category).length;
          return (
            <Link
              key={category}
              href={`/categories/${categorySlug(category)}`}
              className="card-lift rounded-md border border-paper-deep bg-paper-elevated p-6 shadow-[var(--shadow-card)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-olive">
                {category}
              </p>
              <h2 className="mt-3 font-display text-[26px] font-semibold">
                {category}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-line">
                {CATEGORY_BLURBS[category]}
              </p>
              <p className="mt-4 font-mono text-[13px] text-line-muted">
                {count} notes
              </p>
            </Link>
          );
        })}
      </Container>
    </>
  );
}
