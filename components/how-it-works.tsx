import { DARK_GLASS_CARD, SECTION, SECTION_EYEBROW, SECTION_HEADING } from "@/lib/theme";

const STEPS = [
  {
    number: "01",
    title: "Wykrywamy",
    body: "ReviewGuide sprawdza opinie Twojej restauracji na Google co 2 godziny i wyłapuje te, które wymagają odpowiedzi — zwłaszcza te z niską oceną i bez reakcji właściciela.",
  },
  {
    number: "02",
    title: "Piszemy odpowiedź",
    body: "AI przygotowuje spokojną, konkretną odpowiedź dopasowaną do treści opinii — w języku, w którym została napisana, bez szablonowego tonu.",
  },
  {
    number: "03",
    title: "Ty akceptujesz i wysyłasz",
    body: "Zawsze widzisz gotową odpowiedź przed wysłaniem. Jedno kliknięcie — i opinia ma odpowiedź, zanim ktokolwiek zdąży ją przewinąć.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="jak-to-dziala" className={SECTION}>
      <p className={SECTION_EYEBROW}>Jak to działa</p>
      <h2 className={SECTION_HEADING}>Trzy kroki, zero pilnowania.</h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.number} className={`${DARK_GLASS_CARD} p-6`}>
            <p className="font-mono text-sm text-amber-200/70">{step.number}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
