import { Button } from "@/components/ui/button";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

type Lang = "pl" | "en";

const COPY = {
  pl: {
    heading: (
      <>
        Każda opinia dostaje odpowiedź.
        <br />
        Zanim zdążysz ją przeczytać.
      </>
    ),
    body: "Zacznij 14-dniowy okres próbny — 0 zł, anuluj w każdej chwili.",
    cta: "Wypróbuj za darmo",
  },
  en: {
    heading: (
      <>
        Every review gets a response.
        <br />
        Before you even finish reading it.
      </>
    ),
    body: "Start your 14-day free trial — PLN 0, cancel anytime.",
    cta: "Try for free",
  },
} as const;

/** New in the 6.5 redesign — the reference's closing section between FAQ and the footer. */
export function FinalCtaSection({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];

  return (
    <section className="final-cta">
      <div className="wrap reveal">
        <div className="cta-box">
          <h2>{copy.heading}</h2>
          <p>{copy.body}</p>
          <Button href={`${APP_URL}/signup`} size="lg">
            {copy.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
