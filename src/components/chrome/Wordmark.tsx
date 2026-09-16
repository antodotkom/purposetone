import Link from "next/link";

export function Wordmark({
  className = "",
  size = "md",
  invert = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  const sizeClass =
    size === "lg"
      ? "text-[28px] md:text-[34px]"
      : size === "sm"
        ? "text-[18px]"
        : "text-[20px] sm:text-[22px] md:text-[24px]";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-display font-bold lowercase tracking-[-0.02em] ${invert ? "text-cream" : "text-ink"} ${sizeClass} ${className}`.trim()}
      aria-label="purposetone home"
    >
      <span
        aria-hidden="true"
        className={`inline-flex size-[1.15em] shrink-0 items-center justify-center rounded-[0.32em] ${invert ? "bg-brand text-cream" : "bg-ink text-cream"}`}
      >
        <svg viewBox="0 0 24 24" className="size-[0.62em]" fill="currentColor">
          <path d="M9 5.2v9.35a3.15 3.15 0 1 0 1.7 2.82V9.1l8.1-1.55v6.2a3.15 3.15 0 1 0 1.7 2.82V4.15L9 5.2Z" />
        </svg>
      </span>
      <span>
        purpose<span className={invert ? "text-brand-300" : "text-brand"}>tone</span>
      </span>
    </Link>
  );
}
