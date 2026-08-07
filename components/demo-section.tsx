import { DARK_GLASS_CARD, SECTION, SECTION_EYEBROW, SECTION_HEADING } from "@/lib/theme";

/**
 * Two real review→response pairs pulled from docs/review/generation_batch_2026-08-05_v1.2.md
 * (prompt v1.2, PM-reviewed batch), per ticket 4.1. Restaurant name AND address are redacted —
 * the ticket only asked for the name, but a real Warsaw street address next to a very specific
 * review is itself enough to re-identify the place on Google, so it's blanked too (disclosed).
 */
const PAIRS = [
  {
    rating: 2,
    review:
      "Byłem zachęcony opiniami o kultowych zapiekankach. Niestety spotkało mnie wielkie rozczarowanie. Pieczarek i sera mało. Dodatkowo ser spalony. Jedynie na plus miękka i chrupiąca bułka",
    response:
      "Szanowni Państwo,\n\ndziękujemy za podzielenie się opinią. Bardzo nam przykro, że zapiekanka nie spełniła Państwa oczekiwań – zbyt mała ilość farszu oraz przypalony ser to sygnał, na który koniecznie musimy zwrócić uwagę, zwłaszcza że to danie, z którego jesteśmy znani i na którym nam szczególnie zależy. Cieszymy się, że przynajmniej bułka przypadła Państwu do gustu, ale rozumiemy, że to za mało, by uznać wizytę za udaną.\n\nChętnie porozmawiamy bezpośrednio o tym doświadczeniu – zapraszamy do kontaktu telefonicznego lub mailowego, podanego na naszej stronie. Państwa uwagi pomagają nam dbać o jakość każdej zapiekanki, jaka wychodzi z naszej kuchni.",
  },
  {
    rating: 2,
    review:
      "Miejsce z potencjałem, niestety padło ofiarą własnego sukcesu z powodu kolejek. Długie oczekiwanie na obsługę, stolik na 2 osoby przydzielony do grupy 5 osobowej. Personel nie jest zainteresowany klientem. Zamiast masła roślinna maź.",
    response:
      "Szanowni Państwo,\n\ndziękujemy za opinię i przykro nam z powodu opisanych niedogodności. Kolejki, niedopasowanie stolika do liczby osób oraz brak zaangażowania ze strony obsługi to sygnały, które traktujemy poważnie – nikt nie powinien czuć się w naszej restauracji niezauważony. Zwrócimy szczególną uwagę na organizację obsadzania stolików w godzinach wzmożonego ruchu oraz na sposób podejścia personelu do gości. Odnotowujemy również uwagę dotyczącą dodatku serwowanego do pieczywa – doceniamy tę informację. Będziemy wdzięczni za kontakt bezpośredni, jeśli mieliby Państwo chwilę, aby opisać szczegóły tej wizyty – pomoże nam to lepiej zrozumieć, co poszło nie tak, i wyciągnąć właściwe wnioski na przyszłość.",
  },
] as const;

export function DemoSection() {
  return (
    <section id="przyklady" className={SECTION}>
      <p className={SECTION_EYEBROW}>Zobacz sam</p>
      <h2 className={SECTION_HEADING}>Prawdziwe opinie. Prawdziwe odpowiedzi.</h2>
      <p className="mt-3 max-w-2xl text-white/60">
        Dwie autentyczne pary opinia → odpowiedź wygenerowane przez ReviewGuide (nazwa i adres
        restauracji ukryte).
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {PAIRS.map((pair, i) => (
          <div key={i} className={`${DARK_GLASS_CARD} flex flex-col gap-4 p-6`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/50">Restauracja w Śródmieściu</span>
              <span className="text-amber-300" aria-label={`Ocena: ${pair.rating} na 5`}>
                {"★".repeat(pair.rating)}
                <span className="text-white/20">{"★".repeat(5 - pair.rating)}</span>
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-medium tracking-wide text-white/40 uppercase">Opinia</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{pair.review}</p>
            </div>

            <div className="rounded-xl border border-amber-200/15 bg-amber-100/[0.04] p-4">
              <p className="text-xs font-medium tracking-wide text-amber-200/70 uppercase">
                Odpowiedź ReviewGuide
              </p>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/90">
                {pair.response}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
