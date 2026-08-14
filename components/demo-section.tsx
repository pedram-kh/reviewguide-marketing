import { ArrowDownIcon } from "@/components/icons";
import { ReplyTag } from "@/components/reply-tag";

/**
 * Two real review→response pairs pulled from docs/review/generation_batch_2026-08-05_v1.2.md
 * (prompt v1.2, PM-reviewed batch), per ticket 4.1 — wording preserved verbatim through the 6.5
 * redesign (ticket 6.5's content guard: anonymized example texts stay as-is). Restaurant name AND
 * address are redacted — the ticket only asked for the name, but a real Warsaw street address next
 * to a very specific review is itself enough to re-identify the place on Google, so it's blanked
 * too (disclosed, carried over from 4.1).
 */
const PAIRS = [
  {
    review:
      "Byłem zachęcony opiniami o kultowych zapiekankach. Niestety spotkało mnie wielkie rozczarowanie. Pieczarek i sera mało. Dodatkowo ser spalony. Jedynie na plus miękka i chrupiąca bułka.",
    response:
      "Szanowni Państwo, dziękujemy za podzielenie się opinią. Bardzo nam przykro, że zapiekanka nie spełniła Państwa oczekiwań – zbyt mała ilość farszu oraz przypalony ser to sygnał, na który koniecznie musimy zwrócić uwagę, zwłaszcza że to danie, z którego jesteśmy znani i na którym nam szczególnie zależy. Cieszymy się, że przynajmniej bułka przypadła Państwu do gustu, ale rozumiemy, że to za mało, by uznać wizytę za udaną. Chętnie porozmawiamy bezpośrednio o tym doświadczeniu – zapraszamy do kontaktu telefonicznego lub mailowego, podanego na naszej stronie. Państwa uwagi pomagają nam dbać o jakość każdej zapiekanki, jaka wychodzi z naszej kuchni.",
  },
  {
    review:
      "Miejsce z potencjałem, niestety padło ofiarą własnego sukcesu z powodu kolejek. Długie oczekiwanie na obsługę, stolik na 2 osoby przydzielony do grupy 5 osobowej. Personel nie jest zainteresowany klientem. Zamiast masła roślinna maź.",
    response:
      "Szanowni Państwo, dziękujemy za opinię i przykro nam z powodu opisanych niedogodności. Kolejki, niedopasowanie stolika do liczby osób oraz brak zaangażowania ze strony obsługi to sygnały, które traktujemy poważnie – nikt nie powinien czuć się w naszej restauracji niezauważony. Zwrócimy szczególną uwagę na organizację obsadzania stolików w godzinach wzmożonego ruchu oraz na sposób podejścia personelu do gości. Odnotowujemy również uwagę dotyczącą dodatku serwowanego do pieczywa – doceniamy tę informację. Będziemy wdzięczni za kontakt bezpośredni, jeśli mieliby Państwo chwilę, aby opisać szczegóły tej wizyty – pomoże nam to lepiej zrozumieć, co poszło nie tak, i wyciągnąć właściwe wnioski na przyszłość.",
  },
] as const;

export function DemoSection() {
  return (
    <section className="section-pad" id="przyklady">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            Zobacz sam
          </span>
          <h2>Prawdziwe opinie. Prawdziwe odpowiedzi.</h2>
        </div>
        <p className="ex-note reveal">
          Dwie autentyczne pary opinia → odpowiedź wygenerowane przez ReviewGuide (nazwa i adres
          restauracji ukryta).
        </p>
        <div className="examples">
          {PAIRS.map((pair, i) => (
            <div key={i} className="ex-card reveal">
              <div className="ex-meta">
                <div className="ex-place">
                  Restauracja
                  <span>Śródmieście</span>
                </div>
                <div className="stars">★★★★★</div>
              </div>
              <div className="review-block">„{pair.review}”</div>
              <div className="arrow-down">
                <div>
                  <ArrowDownIcon />
                </div>
              </div>
              <div className="reply-block">
                <ReplyTag label="Odpowiedź ReviewGuide" />
                {pair.response}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
