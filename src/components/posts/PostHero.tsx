import { CategoryChip } from "@/components/ui/CategoryChip";
import { formatDate } from "@/lib/format";
import type { PurposePost } from "@/lib/types";

export function PostHero({ post }: { post: PurposePost }) {
  return (
    <header>
      {post.coverImage ? (
        <div
          className={`relative w-full overflow-hidden bg-paper-deep ${
            post.coverImage.startsWith("/covers/")
              ? "mx-auto aspect-square max-w-md md:max-w-lg"
              : "aspect-[16/7]"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt=""
            className={`absolute inset-0 h-full w-full ${
              post.coverImage.startsWith("/covers/") ? "object-contain" : "object-cover"
            }`}
          />
        </div>
      ) : null}
      <div className="pt-ground-cream">
        <div className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 md:py-16">
          <p className="pt-kicker">{post.category}</p>
          <h1 className="pt-h1 mt-3">{post.title}</h1>
          <p className="pt-body mt-5">{post.excerpt}</p>
          <p className="pt-eyebrow mt-4">
            {formatDate(post.date)} · {post.readMinutes} min read
          </p>
          <div className="mt-4">
            <CategoryChip category={post.category} />
          </div>
        </div>
      </div>
    </header>
  );
}
