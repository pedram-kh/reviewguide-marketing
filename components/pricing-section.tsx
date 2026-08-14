import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

type Lang = "pl" | "en";

// Content guard (ticket 6.6, part B — supersedes 6.5's 129 zł guard): 39 zł NETTO/mies + VAT is
// the approved price as of the 2026-08-14 price revision; the trial badge names the
// card-upfront model explicitly ("karta wymagana" / "card required") — zero "bez karty"/"no card"
// anywhere in this copy.
const COPY = {
  pl: {
    eyebrow: "Cennik",
    h2: "Jedna, prosta cena.",
    plan: "ReviewGuide dla jednej restauracji",
    amount: "39 zł netto",
    per: "/mies. + VAT",
    fineprint: "kwota brutto widoczna przy płatności",
    trialBadge: "14 dni za darmo — karta wymagana, 0 zł przez okres próbny",
    features: [
      "Wykrywanie nowych opinii Google co 2 godziny",
      "Odpowiedzi w języku opinii (PL i EN)",
      "Wgląd i akceptacja przed wysyłką",
      "Wrażliwe zgłoszenia oznaczone do ręcznej weryfikacji",
      "Bez zobowiązań — anuluj w każdej chwili",
    ],
    cta: "Rozpocznij 14-dniowy okres próbny",
  },
  en: {
    eyebrow: "Pricing",
    h2: "One, simple price.",
    plan: "ReviewGuide for one restaurant",
    amount: "PLN 39 net",
    per: "/mo + VAT",
    fineprint: "gross amount shown at checkout",
    trialBadge: "14 days free — card required, PLN 0 during the trial",
    features: [
      "New Google review detection every 2 hours",
      "Responses in the review's language (PL and EN)",
      "Review and approve before sending",
      "Sensitive reports flagged for manual review",
      "No commitment — cancel anytime",
    ],
    cta: "Start your 14-day free trial",
  },
} as const;

export function PricingSection({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];

  return (
    <section className="section-pad tint" id="cennik">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            {copy.eyebrow}
          </span>
          <h2>{copy.h2}</h2>
        </div>
        <div className="price-wrap reveal">
          <div className="price-card">
            <div className="price-plan">{copy.plan}</div>
            <div className="price-amount">
              <span className="num">{copy.amount}</span>
              <span className="per">{copy.per}</span>
            </div>
            <p className="price-fineprint">{copy.fineprint}</p>
            <div className="trial-badge">
              <CheckIcon size={15} />
              {copy.trialBadge}
            </div>
            <ul className="feat-list">
              {copy.features.map((feature) => (
                <li key={feature}>
                  <span className="check">
                    <CheckIcon size={13} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href={`${APP_URL}/signup`} size="lg">
              {copy.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
