import { Button } from "@/components/ui/button";
import { ClockIcon, CheckIcon } from "@/components/icons";
import { ReplyTag } from "@/components/reply-tag";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

/**
 * Ported from design-reference/index.html's <section class="hero" id="top">. The reference's
 * heading IS the real, visible <h1> (unlike the old dark hero, which needed a separate sr-only
 * <h1> behind a decorative glow effect) — so this needed no single-text-node workaround, but the
 * same principle from that earlier bug still applies: nothing here renders the heading twice.
 */
export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">
            <span className="dot" />
            Automatyczne odpowiedzi na opinie
          </span>
          <h1>
            Każda negatywna opinia na Google dostaje profesjonalną odpowiedź, zanim zdążysz się
            zdenerwować.
          </h1>
          <p className="lead">
            ReviewGuide sprawdza opinie Twojej restauracji na Google co 2 godziny i w ciągu
            maksymalnie 2 godzin przygotowuje gotową odpowiedź — spokojną, konkretną i bez
            szablonowego tonu.
          </p>
          <div className="cta-row">
            <Button href={`${APP_URL}/signup`} size="lg">
              Wypróbuj za darmo
            </Button>
            <Button href="#jak" variant="ghost" size="lg">
              Zobacz, jak to działa
            </Button>
          </div>
          <div className="trust">
            <span className="stars">★★★★★</span>
            <span>Każda opinia dostaje odpowiedź — zanim zdążysz ją przeczytać.</span>
          </div>
        </div>

        <div className="hero-visual reveal">
          <span className="pill-status">
            <CheckIcon size={14} />
            Odpowiedź gotowa
          </span>
          <div className="float-card review-card">
            <div className="rc-head">
              <div className="avatar" style={{ background: "linear-gradient(135deg,#ff8a8a,#ff6b6b)" }}>
                MK
              </div>
              <div>
                <div className="rc-name">Marek K.</div>
                <div className="rc-sub">
                  <span className="g-badge">Google</span>{" "}
                  <span className="stars" style={{ fontSize: ".85rem" }}>
                    ★★☆☆☆
                  </span>
                </div>
              </div>
            </div>
            <div className="rc-body">
              „Miejsce z potencjałem, ale długie oczekiwanie na obsługę i stolik na 2 osoby dla
              naszej piątki. Personel niezainteresowany klientem…”
            </div>
          </div>
          <div className="reply-card">
            <ReplyTag label="Odpowiedź od ReviewGuide" />
            <div className="rc-body">
              „Szanowni Państwo, dziękujemy za opinię i przykro nam z powodu opisanych
              niedogodności. Kolejki oraz niedopasowanie stolika to sygnały, które traktujemy
              poważnie — nikt nie powinien czuć się u nas niezauważony…”
            </div>
          </div>
          <div className="ping-badge">
            <span className="ping-ic">
              <ClockIcon size={16} />
            </span>
            Sprawdzamy co 2h
          </div>
        </div>
      </div>
    </section>
  );
}
