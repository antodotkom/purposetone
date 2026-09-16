import Link from "next/link";
import type { StudioPlaylist } from "@/lib/types";

export function PlaylistCard({ playlist }: { playlist: StudioPlaylist }) {
  return (
    <article className="card-lift flex h-full flex-col rounded-lg bg-paper-deep p-4 text-ink shadow-card sm:p-6">
      <p className="pt-kicker">Studio companion</p>
      <h3 className="pt-h3 mt-3">
        <Link href={`/playlists/${playlist.slug}`} className="hover:text-brand">
          {playlist.title}
        </Link>
      </h3>
      <p className="pt-body mt-2 flex-1">{playlist.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {playlist.moodTags.map((tag) => (
          <span key={tag} className="pt-eyebrow rounded-pill bg-paper-deep px-3 py-1 text-ink">
            {tag}
          </span>
        ))}
      </div>
      <p className="pt-eyebrow mt-4">{playlist.slots.length} slot roles</p>
    </article>
  );
}
