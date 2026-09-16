import Link from "next/link";
import type { AdSize, HouseAd } from "@/lib/types";

export function HouseAdCreative({
  ad,
  size,
}: {
  ad: HouseAd;
  size: AdSize;
}) {
  const compact =
    size === "sponsor-strip" ||
    size === "leaderboard" ||
    size === "leaderboard-mobile";

  return (
    <Link
      href={ad.href}
      className={`flex h-full w-full border border-copper/50 bg-paper ${
        compact
          ? "flex-row items-center gap-4 px-5 py-3"
          : "flex-col justify-between p-5"
      }`}
    >
      <div className="min-w-0">
        <span className="rounded-sm bg-olive-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-olive">
          Studio
        </span>
        <p
          className={`mt-2 font-display font-semibold leading-snug text-ink ${
            compact ? "text-[18px]" : "text-[22px]"
          }`}
        >
          {ad.headline}
        </p>
        <p className="mt-1 text-[13px] text-line">{ad.sub}</p>
      </div>
      <span className="shrink-0 text-[13px] font-semibold text-copper-hot">
        {ad.cta} →
      </span>
    </Link>
  );
}

export function AdSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse border border-line-muted/40 bg-paper-deep ${className}`}
      aria-hidden
    />
  );
}
