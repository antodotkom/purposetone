import Link from "next/link";
import { BadgeEvergreen } from "@/components/ui/BadgeEvergreen";
import { formatUpdated } from "@/lib/format";
import type { ManualChapter } from "@/lib/types";

export function ManualCard({ chapter }: { chapter: ManualChapter }) {
  return (
    <article className="card-lift flex h-full flex-col rounded-lg bg-paper-deep p-4 text-ink shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="pt-eyebrow">{`Ch.${chapter.number}`}</span>
        <BadgeEvergreen />
      </div>
      <h3 className="pt-h3 mt-4">
        <Link href={`/manual/${chapter.slug}`} className="hover:text-brand">
          {chapter.title}
        </Link>
      </h3>
      <p className="pt-body mt-2 flex-1">{chapter.summary}</p>
      <p className="pt-eyebrow mt-4">{formatUpdated(chapter.updated)}</p>
    </article>
  );
}
