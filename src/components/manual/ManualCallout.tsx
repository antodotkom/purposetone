import type { ReactNode } from "react";
import { MarkdownBody } from "@/components/posts/MarkdownBody";

export function ManualCallout({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 border-l-[3px] border-copper bg-paper-deep/80 px-5 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-olive">
        Mentor note
      </p>
      <div className="mt-2 [&_.prose-pt]:max-w-none">{children}</div>
    </aside>
  );
}

export function ManualBody({
  sections,
}: {
  sections: { kind: "prose" | "mentor"; heading?: string; markdown: string }[];
}) {
  return (
    <div>
      {sections.map((section, index) =>
        section.kind === "mentor" ? (
          <ManualCallout key={`${section.heading}-${index}`}>
            <MarkdownBody markdown={section.markdown} />
          </ManualCallout>
        ) : (
          <MarkdownBody
            key={`${section.heading}-${index}`}
            markdown={section.markdown}
          />
        ),
      )}
    </div>
  );
}
