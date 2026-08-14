// Content guard (ticket 6.5): the card-upfront answer below is kept verbatim from
// design-reference/index.html — it is deliberately CR-1-correct ("podajesz kartę przy starcie...").
const FAQS = [
  {
    q: "Czy muszę podawać dane karty, żeby zacząć?",
    a: "Tak — podajesz kartę przy starcie, ale przez 14 dni nie pobieramy żadnej opłaty. Możesz anulować w każdej chwili w panelu, zanim naliczy się pierwsza płatność.",
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
    <section className="section-pad" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            FAQ
          </span>
          <h2>Najczęstsze pytania.</h2>
        </div>
        <div className="faq-wrap">
          {FAQS.map((faq) => (
            <details key={faq.q} className="faq-item reveal">
              <summary>
                {faq.q}
                <span className="faq-icon">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
