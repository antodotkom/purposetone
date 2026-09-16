import type { ReactNode } from "react";

export function PullQuote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={`pull-quote max-w-[62ch] ${className}`}>
      <p className="pt-kicker">A line to keep</p>
      <p className="pt-h2 mt-3">{children}</p>
    </blockquote>
  );
}
