import Link from "next/link";

export function FilterBar({
  items,
  active,
  allHref,
  hrefFor,
}: {
  items: readonly string[];
  active?: string;
  allHref: string;
  hrefFor: (item: string) => string;
}) {
  return (
    <div className="-mx-1 flex flex-wrap gap-2 px-1">
      <Link
        href={allHref}
        className={`rounded-pill px-4 py-2 font-body text-[15px] font-bold ${
          !active ? "bg-ink text-cream" : "bg-white text-ink"
        }`}
      >
        All
      </Link>
      {items.map((item) => (
        <Link
          key={item}
          href={hrefFor(item)}
          className={`rounded-pill px-4 py-2 font-body text-[15px] font-bold ${
            active === item ? "bg-ink text-cream" : "bg-white text-ink"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
