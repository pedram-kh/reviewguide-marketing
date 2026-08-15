import { Logo } from "@/components/logo";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { MailIcon } from "@/components/icons";
import { landingHref } from "@/lib/en-landing";

type Lang = "pl" | "en";

const COPY = {
  pl: {
    tagline: "Każda opinia w Google dostaje spokojną, konkretną odpowiedź — zanim zdążysz się zdenerwować.",
    navLabel: "Stopka",
    productTitle: "Produkt",
    contactTitle: "Kontakt",
    legalTitle: "Dokumenty",
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
    companyLabel: "Dane rejestrowe",
  },
  en: {
    tagline: "Every Google review gets a calm, specific response — before you have time to get upset.",
    navLabel: "Footer",
    productTitle: "Product",
    contactTitle: "Contact",
    legalTitle: "Legal",
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
    companyLabel: "Company details",
  },
} as const;

/**
 * Ticket 6.6, part A — legal-links + company-info footer, rendered on every page that mounts
 * <SiteFooter /> (both landing pages and all seven legal routes via components/legal-page.tsx).
 *
 * Ticket 6.6, part E — `lang` points the legal links at the matching-language route; the company
 * block itself (name/address/NIP/KRS) is factual and stays identical in both languages.
 *
 * "Ustawienia cookies" / "Cookie settings" reopens the consent banner (part D) rather than linking
 * to /cookies — the Cookie Policy itself is linked separately, in the Legal group.
 *
 * Layout diverges deliberately from design-reference/index.html's single-row footer; see that
 * folder's README for the rationale (the reference row predates the legal/company/cookie content
 * this footer now has to carry, and colours every item at a contrast ratio that fails WCAG AA).
 */
export function SiteFooter({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];
  const home = landingHref(lang);

  return (
    <footer className="site-footer">
      <div className="wrap foot-top">
        <div className="foot-brand">
          <Logo href={`${home}#top`} />
          <p className="foot-tagline">{copy.tagline}</p>
        </div>

        <nav className="foot-groups" aria-label={copy.navLabel}>
          <div className="foot-group">
            <h2 className="foot-group-title">{copy.productTitle}</h2>
            <ul>
              {copy.links.map((link) => (
                <li key={link.href}>
                  <a href={`${home}${link.href}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot-group">
            <h2 className="foot-group-title">{copy.contactTitle}</h2>
            <ul>
              <li>
                <a className="foot-mail" href="mailto:anna@reviewguide.eu">
                  <MailIcon size={15} />
                  anna@reviewguide.eu
                </a>
              </li>
            </ul>
          </div>

          <div className="foot-group">
            <h2 className="foot-group-title">{copy.legalTitle}</h2>
            <ul>
              {copy.legal.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="wrap foot-bottom">
        <p className="foot-copy">© {new Date().getFullYear()} ReviewGuide</p>
        <address className="foot-company" aria-label={copy.companyLabel}>
          <span className="foot-company-name">PEPE COMPANY sp. z o.o.</span>
          <span>ul. Świętokrzyska 18/405, 00‑052 Warszawa</span>
          <span>NIP 5732861000 · KRS 0000599316</span>
        </address>
        <CookieSettingsLink label={copy.cookieSettings} />
      </div>
    </footer>
  );
}
