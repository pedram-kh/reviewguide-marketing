import { Button } from "@/components/ui/button";
import { ClockIcon, CheckIcon } from "@/components/icons";
import { ReplyTag } from "@/components/reply-tag";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

type Lang = "pl" | "en";

// Ticket 6.6, part E — this floating review/reply snippet is illustrative UI copy (no sourcing
// note, unlike demo-section.tsx's two real, redacted examples pulled from
// docs/review/generation_batch_2026-08-05_v1.2.md), so it's translated in full rather than kept
// Polish-with-a-note — the "examples stay Polish" carve-out is specifically about demo-section's
// two authentic pairs.
const COPY = {
  pl: {
    eyebrow: "Automatyczne odpowiedzi na opinie",
    h1: "Każda negatywna opinia na Google dostaje profesjonalną odpowiedź.",
    lead: "ReviewGuide sprawdza opinie Twojej restauracji na Google co 2 godziny i przygotowuje gotową odpowiedź — spokojną, konkretną i bez szablonowego tonu.",
    ctaPrimary: "Wypróbuj za darmo",
    ctaSecondary: "Zobacz, jak to działa",
    trust: "Każda opinia dostaje odpowiedź — zanim zdążysz ją przeczytać.",
    pillStatus: "Odpowiedź gotowa",
    reviewerName: "Marek K.",
    reviewText:
      "„Miejsce z potencjałem, ale długie oczekiwanie na obsługę i stolik na 2 osoby dla naszej piątki. Personel niezainteresowany klientem…”",
    replyTag: "Odpowiedź od ReviewGuide",
    replyText:
      "„Szanowni Państwo, dziękujemy za opinię i przykro nam z powodu opisanych niedogodności. Kolejki oraz niedopasowanie stolika to sygnały, które traktujemy poważnie — nikt nie powinien czuć się u nas niezauważony…”",
    pingBadge: "Sprawdzamy co 2h",
  },
  en: {
    eyebrow: "Automatic responses to reviews",
    h1: "Every negative Google review gets a professional response.",
    lead: "ReviewGuide checks your restaurant's Google reviews every 2 hours and prepares a ready response — calm, specific, and never generic.",
    ctaPrimary: "Try for free",
    ctaSecondary: "See how it works",
    trust: "Every review gets a response — before you even finish reading it.",
    pillStatus: "Response ready",
    reviewerName: "Mark K.",
    reviewText:
      "“A place with potential, but a long wait for service and a table for 2 given to our party of 5. Staff seemed uninterested in customers…”",
    replyTag: "Response from ReviewGuide",
    replyText:
      "“Dear Guest, thank you for your review — we're sorry for the inconvenience described. Long queues and table mismatches are signals we take seriously; no one should feel overlooked here…”",
    pingBadge: "Checking every 2h",
  },
} as const;

/**
 * Ported from design-reference/index.html's <section class="hero" id="top">. The reference's
 * heading IS the real, visible <h1> (unlike the old dark hero, which needed a separate sr-only
 * <h1> behind a decorative glow effect) — so this needed no single-text-node workaround, but the
 * same principle from that earlier bug still applies: nothing here renders the heading twice.
 */
export function HeroSection({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">
            <span className="dot" />
            {copy.eyebrow}
          </span>
          <h1>{copy.h1}</h1>
          <p className="lead">{copy.lead}</p>
          <div className="cta-row">
            <Button href={`${APP_URL}/signup`} size="lg">
              {copy.ctaPrimary}
            </Button>
            <Button href="#jak" variant="ghost" size="lg">
              {copy.ctaSecondary}
            </Button>
          </div>
          <div className="trust">
            <span className="stars">★★★★★</span>
            <span>{copy.trust}</span>
          </div>
        </div>

        <div className="hero-visual reveal">
          <span className="pill-status">
            <CheckIcon size={14} />
            {copy.pillStatus}
          </span>
          <div className="float-card review-card">
            <div className="rc-head">
              <div className="avatar" style={{ background: "linear-gradient(135deg,#ff8a8a,#ff6b6b)" }}>
                MK
              </div>
              <div>
                <div className="rc-name">{copy.reviewerName}</div>
                <div className="rc-sub">
                  <span className="g-badge">Google</span>{" "}
                  <span className="stars" style={{ fontSize: ".85rem" }}>
                    ★★☆☆☆
                  </span>
                </div>
              </div>
            </div>
            <div className="rc-body">{copy.reviewText}</div>
          </div>
          <div className="reply-card">
            <ReplyTag label={copy.replyTag} />
            <div className="rc-body">{copy.replyText}</div>
          </div>
          <div className="ping-badge">
            <span className="ping-ic">
              <ClockIcon size={16} />
            </span>
            {copy.pingBadge}
          </div>
        </div>
      </div>
    </section>
  );
}
