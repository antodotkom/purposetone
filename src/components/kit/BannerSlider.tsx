"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type BannerSlide = {
  src: string;
  alt: string;
  href?: string;
};

const TONE_CLASS: Record<string, string> = {
  cream: "kit-slide--cream",
  ink: "kit-slide--ink",
  orange: "kit-slide--orange",
  green: "kit-slide--green",
  rose: "kit-slide--rose",
};

export function BannerSlider({
  slides,
  tone = "cream",
  interval = 4800,
  wide = false,
  className = "",
}: {
  slides: BannerSlide[];
  tone?: keyof typeof TONE_CLASS;
  interval?: number;
  wide?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <aside
      className={`kit-slide ${TONE_CLASS[tone]} ${wide ? "kit-slide--wide" : ""} ${className}`}
      aria-roledescription="carousel"
      aria-label="PurposeTone scripture banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="kit-slide-window">
        <div
          className="kit-slide-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => {
            const image = (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slide.src} alt={slide.alt} className="kit-slide-img" />
            );
            return (
              <div key={slide.src} className="kit-slide-item">
                {slide.href ? (
                  <Link href={slide.href} className="kit-slide-link">
                    {image}
                  </Link>
                ) : (
                  image
                )}
              </div>
            );
          })}
        </div>
      </div>
      {slides.length > 1 ? (
        <div className="kit-slide-dots" role="tablist" aria-label="Banner slides">
          {slides.map((slide, dot) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={dot === index}
              aria-label={`Show ${slide.alt}`}
              className={`kit-slide-dot ${dot === index ? "is-on" : ""}`}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
      ) : null}
    </aside>
  );
}
