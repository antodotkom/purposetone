import { Marked } from "marked";
import { slugify } from "@/lib/format";

const marked = new Marked();

marked.use({
  gfm: true,
  breaks: true,
  renderer: {
    heading({ text, depth }) {
      const id = slugify(text);
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
    link({ href, title, text }) {
      const titleAttr = title ? ` title="${title}"` : "";
      return `<a href="${href}"${titleAttr}>${text}</a>`;
    },
  },
});

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

export function extractHeadings(markdown: string): { id: string; text: string }[] {
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((match) => {
    const text = match[1].replace(/\*\*/g, "").trim();
    return { id: slugify(text), text };
  });
}

export type ManualSection = {
  kind: "prose" | "mentor";
  heading?: string;
  markdown: string;
};

export function splitManualSections(markdown: string): ManualSection[] {
  const parts = markdown.split(/^## /gm).filter(Boolean);
  return parts.map((part) => {
    const newline = part.indexOf("\n");
    const heading = newline === -1 ? part.trim() : part.slice(0, newline).trim();
    const body = newline === -1 ? "" : part.slice(newline + 1).trim();
    const isMentor = /^mentor note/i.test(heading);
    return {
      kind: isMentor ? "mentor" : "prose",
      heading,
      markdown: isMentor ? body : `## ${heading}\n\n${body}`,
    };
  });
}
