export function VerseCallout({
  quote,
  verse,
  className = "",
}: {
  quote: string;
  verse: string;
  className?: string;
}) {
  return (
    <blockquote className={`verse-callout ${className}`}>
      <p className="pt-kicker">{quote}</p>
      <p className="pt-eyebrow mt-2">{verse}</p>
    </blockquote>
  );
}
