import Link from "next/link";
import { CategoryChip } from "@/components/ui/CategoryChip";
import { formatDate } from "@/lib/format";
import type { PurposePost } from "@/lib/types";

export function PostCard({ post }: { post: PurposePost }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-lg bg-paper-deep text-ink shadow-card">
      <div className={`relative overflow-hidden bg-paper-deep ${post.coverImage?.startsWith("/covers/") ? "aspect-square" : "h-40"}`}>
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            className={`absolute inset-0 h-full w-full ${post.coverImage.startsWith("/covers/") ? "object-contain" : "object-cover"}`}
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <CategoryChip category={post.category} />
        <h3 className="pt-h3 mt-3">
          <Link href={`/posts/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="pt-body mt-2 flex-1">{post.excerpt}</p>
        <p className="pt-eyebrow mt-4 text-brand">{formatDate(post.date)} · {post.readMinutes} min</p>
      </div>
    </article>
  );
}
