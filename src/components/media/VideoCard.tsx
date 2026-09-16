"use client";

import { useState } from "react";
import Link from "next/link";
import type { StudioVideo } from "@/lib/types";
import { youtubeIdFromUrl, youtubeThumb } from "@/lib/format";

export function VideoCard({
  video,
  featured = false,
}: {
  video: StudioVideo;
  featured?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const thumb = video.thumbnailUrl ?? youtubeThumb(video.embedUrl);
  const id = video.youtubeId ?? youtubeIdFromUrl(video.embedUrl);

  return (
    <article className="card-lift overflow-hidden rounded-lg bg-paper-deep text-ink shadow-card">
      <div className={`relative bg-paper-deep ${featured ? "aspect-[16/9]" : "aspect-video"}`}>
        {open && id ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute inset-0 w-full"
            aria-label={`Play ${video.title}`}
          >
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  const img = event.currentTarget;
                  if (img.src.includes("maxresdefault")) {
                    img.src = img.src.replace("maxresdefault", "mqdefault");
                  }
                }}
              />
            ) : null}
            <span className="absolute inset-0 bg-ink/20" />
            <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-pill bg-brand text-white shadow-btn">
              <span className="ml-0.5 block border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
            </span>
            <span className="absolute bottom-3 right-3 pt-eyebrow text-cream">
              {video.durationEstimate}
            </span>
          </button>
        )}
      </div>
      <Link href={`/videos/${video.slug}`} className="block p-4 sm:p-5">
        <p className="pt-eyebrow">{video.category}</p>
        <h3 className={`mt-2 font-display font-bold leading-snug ${featured ? "text-[26px]" : "pt-h3"}`}>
          {video.title}
        </h3>
        <p className="mt-2 text-[14px] text-ink-soft">{video.description}</p>
      </Link>
    </article>
  );
}
