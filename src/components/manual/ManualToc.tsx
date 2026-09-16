"use client";

import { useEffect, useState } from "react";

export function ManualToc({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );
    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const list = (
    <ol className="space-y-2">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={`block border-l-2 pl-3 text-[14px] leading-snug ${
              active === heading.id
                ? "border-copper text-copper-hot"
                : "border-transparent text-line hover:text-ink"
            }`}
            onClick={() => setOpen(false)}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="lg:sticky lg:top-24">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-paper-deep bg-paper-deep px-4 py-3 text-left text-[13px] font-semibold uppercase tracking-[0.1em] text-ink lg:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        On this chapter
        <span aria-hidden>{open ? "–" : "+"}</span>
      </button>
      <div className={`${open ? "mt-4 block" : "hidden"} lg:block`}>
        <p className="mb-3 hidden text-[11px] font-semibold uppercase tracking-[0.1em] text-olive lg:block">
          On this chapter
        </p>
        {list}
      </div>
    </div>
  );
}
