import { Container } from "@/components/chrome/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="pt-ground-cream">
      <Container className="py-24">
        <p className="pt-kicker">Lost the map</p>
        <h1 className="pt-h1 mt-3">Nothing on this desk.</h1>
        <p className="pt-body mt-4">
          That page is not in the catalog. Try Gospel, Country, Jazz, or the Field Manual.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/manual" variant="ghost">
            Field Manual
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
