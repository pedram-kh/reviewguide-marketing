# ReviewGuide — dokumenty prawne (pakiet FINALNY)

Komplet dokumentów formalnych dla serwisu **https://reviewguide.eu**, właściciel: **PEPE COMPANY sp. z o.o.**

## Zawartość

| # | Dokument | PL | EN |
|---|---|---|---|
| 1 | Regulamin / Terms of Service | `PL/1-Regulamin.md` | `EN/1-Terms-of-Service.md` |
| 2 | Polityka Prywatności / Privacy Policy | `PL/2-Polityka-Prywatnosci.md` | `EN/2-Privacy-Policy.md` |
| 3 | Polityka Cookies / Cookie Policy | `PL/3-Polityka-Cookies.md` | `EN/3-Cookie-Policy.md` |
| 4 | Umowa powierzenia danych (DPA) / Data Processing Agreement | `PL/4-Umowa-Powierzenia-DPA.md` | `EN/4-Data-Processing-Agreement-DPA.md` |
| — | Notatka dla informatyka (EN) | — | `EN/IMPLEMENTATION-NOTE-for-developer.md` |

Wersją wiążącą jest wersja **polska**; angielska to tłumaczenie pomocnicze (zapisano to w każdym dokumencie EN).

## Przyjęte dane (wpisane do dokumentów)

1. **E‑mail kontaktowy / prywatność:** `contact@reviewguide.eu`
2. **Operator płatności:** Stripe (Stripe Payments Europe, Ltd. + Stripe, Inc.)
3. **Ceny:** **netto** (+ VAT); kwota nie jest wpisana na sztywno w regulamin — cena widnieje na stronie i w bramce Stripe. Cena startowa **39 PLN netto/mies.** idzie na stronę z cennikiem i do Stripe, nie do regulaminu.
4. **Odbiorcy danych / dostawcy:** kompletna lista standardowych usługodawców wpisana do Polityki Prywatności (pkt 5) i DPA (§5): hosting/chmura (AWS, Google Cloud, Vercel), Stripe, dostawcy AI (OpenAI, Anthropic, Google), Google Business Profile, poczta (Amazon SES/SendGrid/Postmark/Brevo/Mailchimp), analityka (Google Analytics), wsparcie (Intercom/Crisp/HubSpot), księgowość/prawnicy.
5. **Transfer poza EOG:** opisany w Polityce Prywatności (pkt 6) i DPA — podstawa: decyzja adekwatności / EU–U.S. Data Privacy Framework lub standardowe klauzule umowne (SCC).
6. **Podprocesorzy:** ogólny wykaz kategorii i typowych dostawców w DPA (§5).
7. **Cookies (propozycja przyjęta):** niezbędne (sesja/logowanie + Stripe) oraz — za zgodą — analityczne (Google Analytics 4). Funkcjonalne i marketingowe tylko po wdrożeniu i za zgodą.

> **Uwaga o liście dostawców:** listy w pkt 4 i 6 obejmują kategorie i typowych dostawców. To sformułowanie jest bezpieczne prawnie (obejmuje realnie używane narzędzia), ale **zweryfikuj, czy zgadza się z rzeczywistym stackiem** — jeśli np. nie używacie Anthropic ani Mailchimp, możesz je usunąć; jeśli używacie czegoś spoza listy, dopisz.

## Wdrożenie techniczne

Szczegóły dla programisty: **`EN/IMPLEMENTATION-NOTE-for-developer.md`**. W skrócie:
- Podstrony: `/regulamin` + `/terms`, `/polityka-prywatnosci` + `/privacy-policy`, `/cookies` + `/cookie-policy`, `/dpa`.
- Checkboxy zgody przy rejestracji (Regulamin + Polityka — obowiązkowe; marketing — osobno, dobrowolnie).
- Checkbox zgody na natychmiastowe rozpoczęcie usługi (utrata prawa odstąpienia) — dla firm jednoosobowych na prawach konsumenta.
- Baner cookies z realnym wyborem; Google Analytics ładowany dopiero po zgodzie.
- Cena widoczna na stronie i w Stripe Checkout przed potwierdzeniem.

## ⚖️ Zastrzeżenie

To profesjonalne wzory dopasowane do modelu ReviewGuide i prawa polskiego (uśude, ustawa o prawach konsumenta, RODO). **Nie stanowią porady prawnej.** Przed publikacją zalecam weryfikację przez radcę prawnego / adwokata — szczególnie: płatności cykliczne i trial z kartą (Stripe), status procesora względem danych z opinii Google oraz zgodność z regulaminami Google (Business Profile API / User Data Policy) i dostawcy AI.
