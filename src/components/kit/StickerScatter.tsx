import { Sticker } from "@/components/kit/Sticker";

export function StickerScatter({
  items,
  className = "",
}: {
  items: { src: string; className: string; motion?: "bob" | "wiggle" | "spin" | "float"; rotate?: number }[];
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-visible ${className}`} aria-hidden>
      {items.map((item) => (
        <Sticker
          key={item.src + item.className}
          src={item.src}
          motion={item.motion}
          rotate={item.rotate}
          className={`pointer-events-auto absolute ${item.className}`}
        />
      ))}
    </div>
  );
}
