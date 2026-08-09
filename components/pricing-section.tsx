import Image from "next/image";

import { SECTION, SECTION_EYEBROW, SECTION_HEADING } from "@/lib/theme";
import { GlowButton } from "@/components/ui/glow-button";

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

      <div className="pricing-card-frame mt-10 max-w-md">
        <div className="pricing-card-inner rounded-[calc(1rem-1px)] border border-white/10 bg-[#0b0906]/95 p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          <Image
            src="/icon-192.png"
            alt=""
            width={48}
            height={48}
            className="rounded-full"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-medium text-white/50">ReviewGuide dla jednej restauracji</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight text-white">129 zł</span>
            <span className="text-white/50">/mies.</span>
          </p>
          <p className="mt-2 text-sm font-medium text-amber-200/80">
            14 dni za darmo — karta wymagana, 0 zł przez okres próbny
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

          <GlowButton
            href={`${APP_URL}/signup`}
            label="Rozpocznij 14-dniowy okres próbny"
            className="mt-8 block w-full rounded-full bg-white px-6 py-3 text-center font-semibold text-black transition-colors hover:bg-white/90"
          />
        </div>
      </div>
    </section>
  );
}
