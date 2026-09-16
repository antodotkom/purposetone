export function SearchBox({
  compact = false,
  defaultValue = "",
}: {
  compact?: boolean;
  defaultValue?: string;
}) {
  return (
    <form action="/search" method="get" role="search">
      <label className="sr-only" htmlFor={compact ? "nav-search" : "search-q"}>
        Search
      </label>
      <input
        id={compact ? "nav-search" : "search-q"}
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search the desk"
        className={`w-full rounded-pill border-2 border-paper-deep bg-white px-4 text-ink placeholder:text-ink-soft ${
          compact ? "h-10 text-[13px]" : "h-12 text-[15px]"
        }`}
      />
    </form>
  );
}
