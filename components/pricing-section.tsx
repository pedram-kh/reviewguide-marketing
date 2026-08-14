import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

// Content guard (ticket 6.5): 129 zł/mies is the approved price; the trial badge names the
// card-upfront model explicitly ("karta wymagana") — zero "bez karty" anywhere in this copy.
const FEATURES = [
  "Wykrywanie nowych opinii Google co 2 godziny",
  "Odpowiedzi w języku opinii (PL i EN)",
  "Wgląd i akceptacja przed wysyłką",
  "Wrażliwe zgłoszenia oznaczone do ręcznej weryfikacji",
  "Bez zobowiązań — anuluj w każdej chwili",
] as const;

export function PricingSection() {
  return (
    <section className="section-pad tint" id="cennik">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            Cennik
          </span>
          <h2>Jedna, prosta cena.</h2>
        </div>
        <div className="price-wrap reveal">
          <div className="price-card">
            <div className="price-plan">ReviewGuide dla jednej restauracji</div>
            <div className="price-amount">
              <span className="num">129 zł</span>
              <span className="per">/mies.</span>
            </div>
            <div className="trial-badge">
              <CheckIcon size={15} />
              14 dni za darmo — karta wymagana, 0 zł przez okres próbny
            </div>
            <ul className="feat-list">
              {FEATURES.map((feature) => (
                <li key={feature}>
                  <span className="check">
                    <CheckIcon size={13} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href={`${APP_URL}/signup`} size="lg">
              Rozpocznij 14-dniowy okres próbny
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
