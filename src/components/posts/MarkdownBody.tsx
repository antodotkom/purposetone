import { renderMarkdown } from "@/lib/markdown";

export function MarkdownBody({ markdown }: { markdown: string }) {
  return (
    <div
      className="prose-pt"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
}
