import type { ReactNode } from "react";
import Link from "next/link";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "secondary";
  className?: string;
}) {
  const kind = variant === "primary" ? "pt-btn--primary" : "pt-btn--ghost";
  return (
    <Link href={href} className={`pt-btn ${kind} ${className}`}>
      {children}
    </Link>
  );
}
