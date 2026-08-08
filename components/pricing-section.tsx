import Link from "next/link";

import { DARK_GLASS_CARD, SECTION, SECTION_EYEBROW, SECTION_HEADING } from "@/lib/theme";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

const FEATURES = [
  "Wykrywanie nowych opinii Google co 2 godziny",
  "Odpowiedzi w języku opinii (PL i EN)",
  "Wgląd i akceptacja przed wysyłką",
  "Wrażliwe zgłoszenia oznaczone do ręcznej weryfikacji",
  "Bez zobowiązań — anuluj w każdej chwili",
] as const;

export function PricingSection() {
  return (
    <section id="cennik" className={SECTION}>
      <p className={SECTION_EYEBROW}>Cennik</p>
      <h2 className={SECTION_HEADING}>Jedna, prosta cena.</h2>

      <div className={`${DARK_GLASS_CARD} mt-10 max-w-md p-8`}>
        <p className="text-sm font-medium text-white/50">ReviewGuide dla jednej restauracji</p>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-5xl font-semibold tracking-tight text-white">129 zł</span>
          <span className="text-white/50">/mies.</span>
        </p>
        <p className="mt-2 text-sm font-medium text-amber-200/80">
          14 dni za darmo, bez karty
        </p>

        <ul className="mt-6 space-y-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-white/75">
              <span className="mt-0.5 text-amber-300" aria-hidden="true">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={`${APP_URL}/signup`}
          className="mt-8 block w-full rounded-full bg-white px-6 py-3 text-center font-semibold text-black transition-colors hover:bg-white/90"
        >
          Rozpocznij 14-dniowy okres próbny
        </Link>
      </div>
    </section>
  );
}
