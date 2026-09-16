import Link from "next/link";
import { categorySlug } from "@/lib/format";

export function CategoryChip({
  category,
  href,
  active = false,
}: {
  category: string;
  href?: string;
  active?: boolean;
}) {
  const className = `pt-eyebrow inline-flex rounded-pill px-3 py-1 ${
    active ? "bg-ink text-cream" : "bg-paper-deep text-ink"
  }`;

  return (
    <Link href={href ?? `/categories/${categorySlug(category)}`} className={className}>
      {category}
    </Link>
  );
}
