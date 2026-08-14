type Lang = "pl" | "en";

// Content guard (ticket 6.5, carried into 6.6's EN copy): the card-upfront answer below is kept
// verbatim/faithfully translated from design-reference/index.html — deliberately CR-1-correct
// ("podajesz kartę przy starcie..." / "you provide a card when you start...").
const COPY = {
  pl: {
    eyebrow: "FAQ",
    h2: "Najczęstsze pytania.",
    faqs: [
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
    ],
  },
  en: {
    eyebrow: "FAQ",
    h2: "Frequently asked questions.",
    faqs: [
      {
        q: "Do I need to provide card details to get started?",
        a: "Yes — you provide a card when you start, but we don't charge anything for 14 days. You can cancel anytime from your dashboard before the first charge.",
      },
      {
        q: "Are responses published automatically?",
        a: "No. You always see the finished response before it's sent, and you decide whether to send it — ReviewGuide never publishes anything without your approval.",
      },
      {
        q: "What languages does ReviewGuide reply in?",
        a: "We reply in the language the review was written in — most often Polish or English.",
      },
      {
        q: "What if a review concerns a serious issue, e.g. hygiene?",
        a: "Such reports are automatically flagged for manual review before any response is sent — we never send an automatic response to sensitive matters.",
      },
    ],
  },
} as const;

export function FaqSection({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];

  return (
    <section className="section-pad" id="faq">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            {copy.eyebrow}
          </span>
          <h2>{copy.h2}</h2>
        </div>
        <div className="faq-wrap">
          {copy.faqs.map((faq) => (
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
