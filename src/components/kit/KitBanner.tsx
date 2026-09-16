import Link from "next/link";
import { BANNER_THEMES, type BannerTheme } from "@/components/kit/bannerThemes";
import { SITE_NAME } from "@/lib/site";

export function KitBanner({
  theme,
  href = "/",
  className = "",
}: {
  theme: BannerTheme;
  href?: string;
  className?: string;
}) {
  const banner = BANNER_THEMES[theme];
  const verse = banner.verse || SITE_NAME;

  return (
    <aside className={`kit-banner ${className}`} aria-label={`${banner.kicker}: ${banner.quote}`}>
      <Link href={href} className={`kit-banner-inner kit-banner-${banner.tone}`}>
        <p className="kit-banner-brand">
          purpose<span>tone</span>
        </p>
        <div className="kit-banner-copy">
          <p className="kit-banner-kicker">{banner.kicker}</p>
          <p className="kit-banner-quote">{banner.quote}</p>
          <p className="kit-banner-verse">{verse}</p>
        </div>
        <div className="kit-banner-art" aria-hidden="true">
          {banner.stickers.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className={`kit-sticker kit-banner-s${index + 1} ${index % 2 === 0 ? "kit-bob" : "kit-wiggle"}`}
            />
          ))}
        </div>
      </Link>
    </aside>
  );
}
