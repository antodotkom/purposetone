export function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-1 w-full rounded-pill bg-paper-deep ${className}`} aria-hidden />;
}
