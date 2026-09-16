"use client";

import { useEffect, useMemo, useState } from "react";

export function ManualChecklist({
  chapterSlug,
  items,
}: {
  chapterSlug: string;
  items: string[];
}) {
  const storageKey = `pt-checklist-${chapterSlug}`;
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const [toast, setToast] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as boolean[];
      if (Array.isArray(parsed) && parsed.length === items.length) {
        setChecked(parsed);
      }
    } catch {
      /* ignore */
    }
  }, [items.length, storageKey]);

  const remaining = useMemo(
    () => checked.filter((value) => !value).length,
    [checked],
  );

  function toggle(index: number) {
    setChecked((current) => {
      const next = current.map((value, i) => (i === index ? !value : value));
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      setToast(true);
      window.setTimeout(() => setToast(false), 2200);
      return next;
    });
  }

  return (
    <section className="mt-12 rounded-lg border border-paper-deep bg-paper-elevated p-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-[22px] font-semibold">Checklist</h2>
        <p className="font-mono text-[13px] text-line">
          {items.length - remaining}/{items.length}
        </p>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug">
              <input
                type="checkbox"
                checked={checked[index] ?? false}
                onChange={() => toggle(index)}
                className="mt-1 size-4 accent-olive"
              />
              <span className={checked[index] ? "text-line line-through" : "text-ink"}>
                <span className="mr-2 font-mono text-[12px] text-line-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {toast ? (
        <p
          role="status"
          className="toast-enter mt-4 rounded-md bg-olive-soft px-3 py-2 font-mono text-[13px] text-olive"
        >
          Checklist saved on this device
        </p>
      ) : null}
    </section>
  );
}
