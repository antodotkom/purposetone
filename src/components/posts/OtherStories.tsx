import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PurposePost } from "@/lib/types";

export function OtherStories({ posts }: { posts: PurposePost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="rounded-lg border border-paper-deep bg-paper-elevated p-5" aria-label="Other stories">
      <p className="font-display text-[1.35rem] font-medium italic leading-none text-brand">Still on the desk</p>
      <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-tight text-ink">Other stories</h2>
      <ul className="mt-5 divide-y divide-paper-deep">
        {posts.map((post) => (
          <li key={post.slug} className="py-3 first:pt-0 last:pb-0">
            <Link href={`/posts/${post.slug}`} className="group flex gap-3">
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt=""
                  className="size-14 shrink-0 rounded-md object-cover"
                />
              ) : null}
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-semibold leading-snug text-ink group-hover:text-brand">
                  {post.title}
                </span>
                <span className="mt-1 block text-[12px] font-bold uppercase tracking-[0.08em] text-brand">
                  {formatDate(post.date)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/posts" className="mt-4 inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-ink hover:text-brand">
        All stories
      </Link>
    </section>
  );
}
