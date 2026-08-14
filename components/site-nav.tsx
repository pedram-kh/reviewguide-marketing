import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { EN_LANDING_ENABLED } from "@/lib/en-landing";

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
 * no changes; app/en/page.tsx is the only caller that passes "en". Section anchor hrefs (#jak
 * etc.) are intentionally left as-is in both languages — app/en/page.tsx mounts the same section
 * ids, just with English copy inside them.
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

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Logo />
        <nav className="nav-links">
          {copy.links.map((link) => (
            <a key={link.href} href={link.href}>
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
