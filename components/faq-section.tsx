import { DARK_GLASS_CARD, SECTION, SECTION_EYEBROW, SECTION_HEADING } from "@/lib/theme";

const FAQS = [
  {
    q: "Czy muszę podawać dane karty, żeby zacząć?",
    a: "Tak — kartę podajesz przy rejestracji, ale nic nie płacisz przez 14 dni. Pierwsza płatność (129 zł) pojawia się dopiero po zakończeniu okresu próbnego. Możesz anulować w dowolnym momencie jednym kliknięciem w panelu, zanim do niej dojdzie.",
  },
  {
    q: "Czy odpowiedzi są publikowane automatycznie?",
    a: "Nie. Zawsze widzisz gotową odpowiedź przed wysłaniem i to Ty decydujesz, czy ją wysłać — ReviewGuide nigdy nie publikuje niczego bez Twojej zgody.",
  },
  {
    q: "W jakich językach ReviewGuide odpowiada?",
    a: "Odpowiadamy w języku, w którym napisana jest opinia — najczęściej polskim lub angielskim.",
  },
  {
    q: "Co jeśli opinia dotyczy poważnego problemu, np. higieny?",
    a: "Takie zgłoszenia są automatycznie oznaczane do ręcznej weryfikacji przed wysłaniem odpowiedzi — nigdy nie wysyłamy automatycznej odpowiedzi na wrażliwe sprawy.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className={SECTION}>
      <p className={SECTION_EYEBROW}>FAQ</p>
      <h2 className={SECTION_HEADING}>Najczęstsze pytania.</h2>

      <div className="mt-10 space-y-3">
        {FAQS.map((faq) => (
          <details key={faq.q} className={`${DARK_GLASS_CARD} group p-5`}>
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-white">
              {faq.q}
              <span className="ml-4 shrink-0 text-white/40 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
