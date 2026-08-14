import { Button } from "@/components/ui/button";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

/** New in the 6.5 redesign — the reference's closing section between FAQ and the footer. */
export function FinalCtaSection() {
  return (
    <section className="final-cta">
      <div className="wrap reveal">
        <div className="cta-box">
          <h2>
            Każda opinia dostaje odpowiedź.
            <br />
            Zanim zdążysz ją przeczytać.
          </h2>
          <p>Zacznij 14-dniowy okres próbny — 0 zł, anuluj w każdej chwili.</p>
          <Button href={`${APP_URL}/signup`} size="lg">
            Wypróbuj za darmo
          </Button>
        </div>
      </div>
    </section>
  );
}
