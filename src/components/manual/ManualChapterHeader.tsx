import { BadgeEvergreen } from "@/components/ui/BadgeEvergreen";
import { Rule } from "@/components/ui/Rule";
import { formatUpdated } from "@/lib/format";
import { MANUAL_VERSION } from "@/lib/site";
import type { ManualChapter } from "@/lib/types";

export function ManualChapterHeader({ chapter }: { chapter: ManualChapter }) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[14px] font-medium text-copper">
          {`Ch.${chapter.number}`}
        </span>
        <BadgeEvergreen />
        <span className="text-[13px] text-line">{chapter.part}</span>
      </div>
      <h1 className="mt-3 font-display text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink md:text-[36px]">
        {chapter.title}
      </h1>
      <Rule className="mt-5 max-w-32" />
      <p className="mt-4 font-serif text-[18px] leading-relaxed text-line">
        {chapter.summary}
      </p>
      <p className="mt-4 font-mono text-[13px] text-line-muted">
        {formatUpdated(chapter.updated)} · {MANUAL_VERSION}
      </p>
    </header>
  );
}
