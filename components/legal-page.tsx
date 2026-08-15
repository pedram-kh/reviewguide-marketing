import type { ReactNode } from "react";
import { SetHtmlLang } from "@/components/set-html-lang";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { EN_LANDING_ENABLED } from "@/lib/en-landing";
import type { LegalDoc } from "@/lib/legal";

interface LegalPageProps {
  doc: LegalDoc;
  /** Link to the same document in the other language, e.g. { href: "/terms", label: "English" }. */
  altLanguage: { href: string; label: string };
  /** Nav/footer language — ticket 6.6, part E: EN legal routes get the English nav + footer too. */
  lang?: "pl" | "en";
  /** Extra content rendered between the meta bar and the document body (e.g. the DPA's PL/EN toggle). */
  children?: ReactNode;
}

/**
 * Ticket 6.6, part A — shared chrome for all seven legal-document routes: site nav/footer (so
 * the footer's legal links + company block from part A show here too), an "Effective date" +
 * "Version" bar, and the build-time-rendered Markdown body. No auth/noindex — these must be
 * publicly crawlable.
 */
export function LegalPage({ doc, altLanguage, lang = "pl", children }: LegalPageProps) {
  // EN legal pages are live independently of the gated /en landing (see lib/en-landing.ts) — so
  // until that's approved, the "← Home" breadcrumb here falls back to the PL home rather than a
  // 404.
  const homeHref = lang === "pl" ? "/" : EN_LANDING_ENABLED ? "/en" : "/";

  return (
    <>
      <SetHtmlLang lang={lang} />
      <SiteNav lang={lang} />
      <main>
        <div className="wrap legal-page">
          <div className="legal-breadcrumb">
            <a href={homeHref}>{lang === "pl" ? "← Strona główna" : "← Home"}</a>
          </div>
          <h1>{doc.title}</h1>
          <div className="legal-meta">
            <span className="legal-meta-item">
              {doc.effectiveDateLabel}: <strong>{doc.effectiveDate}</strong>
            </span>
            <span className="legal-meta-item">
              {doc.versionLabel}: <strong>{doc.version}</strong>
            </span>
            <a href={altLanguage.href} className="legal-meta-item">
              {altLanguage.label} →
            </a>
          </div>
          {doc.translationNote ? <p className="legal-translation-note">{doc.translationNote}</p> : null}
          {children}
          <div className="legal-doc" dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} />
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
