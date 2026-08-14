import { Logo } from "@/components/logo";
import { CookieSettingsLink } from "@/components/cookie-settings-link";

type Lang = "pl" | "en";

const COPY = {
  pl: {
    links: [
      { href: "#jak", label: "Jak to działa" },
      { href: "#cennik", label: "Cennik" },
      { href: "#faq", label: "FAQ" },
    ],
    legal: [
      { href: "/regulamin", label: "Regulamin" },
      { href: "/polityka-prywatnosci", label: "Polityka Prywatności" },
      { href: "/cookies", label: "Polityka Cookies" },
      { href: "/dpa", label: "DPA" },
    ],
    cookieSettings: "Ustawienia cookies",
  },
  en: {
    links: [
      { href: "#jak", label: "How it works" },
      { href: "#cennik", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    legal: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/dpa", label: "DPA" },
    ],
    cookieSettings: "Cookie settings",
  },
} as const;

/**
 * Ticket 6.6, part A — legal-links + company-info row, added below the existing
 * jak-to-dziala/cennik/faq row so it renders on every page that mounts <SiteFooter /> (today:
 * both landing pages and all seven legal-document routes via components/legal-page.tsx).
 *
 * Ticket 6.6, part E — `lang` points the legal links at the matching-language route (the
 * ticket's requirement that the EN landing's footer link to /terms, /privacy-policy, etc.
 * rather than their PL equivalents); the company block itself (name/address/NIP/KRS) is factual
 * and stays identical in both languages.
 *
 * "Ustawienia cookies" / "Cookie settings" reopens the consent banner (part D) rather than
 * linking to /cookies — the Cookie Policy itself is linked separately, right next to it.
 */
export function SiteFooter({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];

  return (
    <footer>
      <div className="wrap foot-inner">
        <Logo />
        <div className="foot-links">
          {copy.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="mailto:anna@reviewguide.eu">anna@reviewguide.eu</a>
        </div>
        <div className="foot-copy">© {new Date().getFullYear()} ReviewGuide</div>
      </div>
      <div className="wrap foot-legal">
        <div className="foot-legal-links">
          {copy.legal.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <CookieSettingsLink label={copy.cookieSettings} />
        </div>
        <p className="foot-legal-company">
          PEPE COMPANY sp. z o.o. · ul. Świętokrzyska 18/405, 00‑052 Warszawa · NIP 5732861000 ·
          KRS 0000599316
        </p>
      </div>
    </footer>
  );
}
