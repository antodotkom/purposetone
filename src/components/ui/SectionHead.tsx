import type { ReactNode } from "react";

export function SectionHead({
  kicker,
  title,
  action,
}: {
  kicker: string;
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div>
        <p className="pt-kicker">{kicker}</p>
        <h2 className="pt-h2 mt-2">{title}</h2>
      </div>
      {action}
    </div>
  );
}
