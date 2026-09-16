"use client";

const DEFAULTS = [
  "/kit/stickers/01-be-still.png",
  "/kit/stickers/06-amen.png",
  "/kit/stickers/15-on-purpose.png",
  "/kit/stickers/20-worship.png",
  "/kit/stickers/23-gospel.png",
  "/kit/stickers/25-purposetone.png",
];

const COPIES = 4;

export function StickerRail({
  stickers = DEFAULTS,
  className = "",
}: {
  stickers?: string[];
  className?: string;
}) {
  return (
    <div className={`kit-rail ${className}`}>
      <div className="kit-rail-track">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div className="kit-rail-set" key={copy} aria-hidden="true">
            {stickers.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${copy}-${src}-${index}`}
                src={src}
                alt=""
                className="kit-sticker kit-rail-sticker"
                style={{
                  ["--kit-rot" as string]: `${index % 2 === 0 ? -8 : 8}deg`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
