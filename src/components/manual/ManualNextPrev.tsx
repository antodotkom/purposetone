import Link from "next/link";
import type { ManualChapter } from "@/lib/types";

export function ManualNextPrev({
  prev,
  next,
}: {
  prev?: ManualChapter;
  next?: ManualChapter;
}) {
  return (
    <nav className="mt-14 grid gap-4 border-t border-paper-deep pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/manual/${prev.slug}`}
          className="rounded-md border border-paper-deep bg-paper-elevated p-4 hover:border-copper"
        >
          <p className="font-mono text-[12px] text-line">Previous</p>
          <p className="mt-1 font-display text-[18px] font-semibold">
            {`Ch.${prev.number} ${prev.title}`}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/manual/${next.slug}`}
          className="rounded-md border border-paper-deep bg-paper-elevated p-4 text-right hover:border-copper"
        >
          <p className="font-mono text-[12px] text-line">Next</p>
          <p className="mt-1 font-display text-[18px] font-semibold">
            {`Ch.${next.number} ${next.title}`}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
