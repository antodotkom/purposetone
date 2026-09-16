"use client";

import { useState } from "react";
import type { StudioVideo } from "@/lib/types";
import { youtubeIdFromUrl, youtubeThumb } from "@/lib/format";

export function VideoEmbed({ video }: { video: StudioVideo }) {
  const [open, setOpen] = useState(false);
  const id = video.youtubeId ?? youtubeIdFromUrl(video.embedUrl);
  const thumb = video.thumbnailUrl ?? youtubeThumb(video.embedUrl);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block w-full overflow-hidden rounded-lg border border-paper-deep bg-paper-deep"
        aria-label={`Play ${video.title}`}
      >
        <div className="relative aspect-video">
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
          <span className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full border border-copper bg-paper-elevated/90 text-copper">
            <span className="ml-0.5 block border-y-[9px] border-l-[16px] border-y-transparent border-l-copper" />
          </span>
          <p className="absolute bottom-4 left-4 font-mono text-[12px] text-paper">
            {video.creatorLabel} · {video.durationEstimate}
          </p>
        </div>
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-paper-deep bg-paper-deep">
      <iframe
        title={video.title}
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
