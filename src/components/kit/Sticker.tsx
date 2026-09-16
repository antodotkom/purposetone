"use client";

export function Sticker({
  src,
  motion = "bob",
  rotate = -8,
  className = "",
}: {
  src: string;
  motion?: "bob" | "wiggle" | "spin" | "float";
  rotate?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`kit-sticker kit-${motion} ${className}`}
      style={{ ["--kit-rot" as string]: `${rotate}deg` }}
    />
  );
}
