"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/chrome/Wordmark";
import { SearchBox } from "@/components/ui/SearchBox";
import { NAV } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 no-print pt-ground-cream">
      <div className="mx-auto flex max-w-[1080px] items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
        <Wordmark className="min-w-0 shrink" />
        <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link text-[15px] ${
                item.emphasized ? "font-bold text-ink" : "font-bold text-ink-soft"
              }`}
              data-active={isActive(pathname, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden w-52 lg:ml-6 lg:block">
          <SearchBox compact />
        </div>
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border-2 border-ink text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-4 bg-ink" />
            <span className="block h-px w-4 bg-ink" />
            <span className="block h-px w-4 bg-ink" />
          </span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-paper-deep px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`font-body text-lg font-bold ${
                  isActive(pathname, item.href) ? "text-brand" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">
            <SearchBox />
          </div>
        </div>
      ) : null}
    </header>
  );
}
