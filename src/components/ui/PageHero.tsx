export function PageHero({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  banner?: string;
}) {
  return (
    <section className="pt-ground-cream">
      <div className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 md:py-16">
        {kicker ? <p className="pt-kicker">{kicker}</p> : null}
        <h1 className="pt-h1 mt-3 max-w-xl md:max-w-3xl">{title}</h1>
        {sub ? <p className="pt-body mt-4">{sub}</p> : null}
      </div>
    </section>
  );
}
