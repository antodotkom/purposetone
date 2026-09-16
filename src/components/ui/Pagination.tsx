import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center gap-2">
      {pages.map((item) => (
        <Link
          key={item}
          href={hrefFor(item)}
          aria-current={item === page ? "page" : undefined}
          className={`inline-flex min-w-9 items-center justify-center rounded-md px-3 py-1.5 text-[14px] ${
            item === page
              ? "bg-copper text-pt-white"
              : "border border-line-muted text-ink hover:border-copper"
          }`}
        >
          {item}
        </Link>
      ))}
    </nav>
  );
}
