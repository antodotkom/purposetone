import Link from "next/link";
import { AD_SLOT_HOUSE } from "@/lib/site";
import { getAd } from "@/lib/content";
import type { AdSize } from "@/lib/types";
import { HouseAdCreative } from "@/components/ads/HouseAdCreative";

export type AdBannerProps = {
  slotId: string;
  size: AdSize;
  variant: "house" | "network";
  houseConceptId?: string;
  label?: string;
};

const SIZE_CLASS: Record<AdSize, string> = {
  leaderboard: "min-h-[90px] w-full max-w-[728px]",
  "leaderboard-mobile": "min-h-[50px] w-full max-w-[320px]",
  rectangle: "min-h-[250px] w-full max-w-[300px]",
  "large-rectangle": "min-h-[280px] w-full max-w-[336px]",
  billboard: "min-h-[250px] w-full max-w-[970px]",
  "sponsor-strip": "min-h-[72px] w-full",
  "native-card": "min-h-[180px] w-full",
  "playlist-rail": "min-h-[320px] w-full max-w-[280px]",
};

export function AdBanner({
  slotId,
  size,
  variant = "house",
  houseConceptId,
  label = "Advertisement",
}: AdBannerProps) {
  const id = houseConceptId ?? AD_SLOT_HOUSE[slotId] ?? "pt-ad-01";
  const ad = getAd(id);

  if (!ad) return null;

  return (
    <aside
      data-ad={slotId}
      data-variant={variant}
      className={`z-30 mx-auto ${SIZE_CLASS[size]}`}
      aria-label={label}
    >
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-line-muted">
        {label}
      </p>
      <HouseAdCreative ad={ad} size={size} />
    </aside>
  );
}

export function NativeAdCard({ slotId }: { slotId: string }) {
  const ad = getAd(AD_SLOT_HOUSE[slotId] ?? "pt-ad-05");
  if (!ad) return null;
  return (
    <article data-ad={slotId} className="flex h-full flex-col rounded-md border border-copper/40 bg-paper-elevated p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-sm bg-olive-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-olive">
          Studio
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-line-muted">
          Advertisement
        </span>
      </div>
      <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug text-ink">
        {ad.headline}
      </h3>
      <p className="mt-2 flex-1 text-[14px] text-line">{ad.sub}</p>
      <Link href={ad.href} className="mt-4 text-[14px] font-semibold text-copper-hot hover:text-copper">
        {ad.cta} →
      </Link>
    </article>
  );
}
