import { ManualCard } from "@/components/manual/ManualCard";
import { getChaptersByPart } from "@/lib/content";
import { MANUAL_PARTS } from "@/lib/site";

export function ManualIndexGrid() {
  return (
    <div className="space-y-14">
      {MANUAL_PARTS.map((part) => (
        <section key={part}>
          <h2 className="font-display text-[22px] font-semibold text-ink md:text-[26px]">
            {part}
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {getChaptersByPart(part).map((chapter) => (
              <ManualCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
