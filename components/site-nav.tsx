import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { EN_LANDING_ENABLED, landingHref } from "@/lib/en-landing";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

type Lang = "pl" | "en";

const COPY = {
  pl: {
    links: [
      { href: "#jak", label: "Jak to działa" },
      { href: "#przyklady", label: "Przykłady" },
      { href: "#cennik", label: "Cennik" },
      { href: "#faq", label: "FAQ" },
    ],
    login: "Zaloguj się",
    trial: "Wypróbuj za darmo",
  },
  en: {
    links: [
      { href: "#jak", label: "How it works" },
      { href: "#przyklady", label: "Examples" },
      { href: "#cennik", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    login: "Log in",
    trial: "Try for free",
  },
} as const;

/**
 * Ticket 6.6, part E — `lang` defaults to "pl" so the existing landing page (app/page.tsx) needs
 * no changes; app/en/page.tsx is the only caller that passes "en".
 *
 * Section anchors are prefixed with the landing's own path (lib/en-landing.ts's landingHref)
 * because this component renders on the seven legal routes too, where bare "#jak" pointed at an
 * id that doesn't exist there; see that helper for why this doesn't regress the landing itself.
 *
 * The PL→EN switch is hidden while EN_LANDING_ENABLED is off (the English landing page itself
 * 404s until the PM approves its copy — see lib/en-landing.ts), so no visitor lands on a dead
 * link. The EN→PL switch always shows: this component also renders on the already-live EN legal
 * pages (/terms, /privacy-policy, ...), which are unrelated to the landing-copy approval gate,
 * and it always points back to "/", which is always live.
 */
export function SiteNav({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];
  const showLangSwitch = lang === "en" || EN_LANDING_ENABLED;
  const otherLang = lang === "pl" ? "/en" : "/";
  const home = landingHref(lang);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Logo href={`${home}#top`} />
        <nav className="nav-links">
          {copy.links.map((link) => (
            <a key={link.href} href={`${home}${link.href}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          {showLangSwitch ? (
            <a href={otherLang} className="lang-switch" aria-label="Switch language">
              {lang === "pl" ? "EN" : "PL"}
            </a>
          ) : null}
          <Button href={`${APP_URL}/login`} variant="ghost">
            {copy.login}
          </Button>
          <Button href={`${APP_URL}/signup`}>{copy.trial}</Button>
        </div>
      </div>
    </header>
  );
}
