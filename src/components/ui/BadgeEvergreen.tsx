export function BadgeEvergreen({ className = "" }: { className?: string }) {
  return (
    <span className={`pt-eyebrow inline-flex items-center rounded-pill bg-paper-deep px-3 py-1 text-ink ${className}`}>
      Evergreen
    </span>
  );
}
