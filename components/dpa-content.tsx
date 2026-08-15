"use client";

import { useState } from "react";
import { SetHtmlLang } from "@/components/set-html-lang";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { landingHref } from "@/lib/en-landing";
import type { LegalDoc } from "@/lib/legal";

interface DpaContentProps {
  pl: LegalDoc;
  en: LegalDoc;
}

const BREADCRUMB = { pl: "← Strona główna", en: "← Home" } as const;

/**
 * Ticket 6.6, part A — the DPA is the one document published as a single route ("/dpa (PL with
 * EN toggle)", per the ticket) rather than two parallel PL/EN routes like the other three.
 *
 * Owns the *whole* page shell (nav/breadcrumb/document/footer), not just the document body: an
 * earlier version only toggled the body text here while `app/dpa/page.tsx` rendered a
 * hardcoded-Polish `<SiteNav />`/breadcrumb/`<SiteFooter />` around it, so switching to English
 * left the surrounding chrome in Polish — inconsistent with every other legal route, where
 * language is a whole-page property (components/legal-page.tsx passes one `lang` to all three).
 * A single `lang` state here now drives the nav, breadcrumb, footer and document together, the
 * same way navigating from /regulamin to /terms does everywhere else.
 *
 * The document body (only) still dual-renders both language trees and toggles `hidden` rather
 * than conditionally mounting — see the ticket's rationale below — so the EN translation stays
 * reachable in the static HTML for crawlers/accessibility tools even though only one is visible
 * at a time, and toggling is instant. Nav/breadcrumb/footer don't need that treatment: they carry
 * no legally significant text, just link labels, so a plain reactive swap is simpler and avoids
 * duplicating <header>/<footer> landmarks in the DOM.
 *
 * Also fires <SetHtmlLang>, same as every two-route legal page (components/legal-page.tsx) — the
 * cookie banner mounted in the root layout reads that signal to pick its own language, and DPA's
 * toggle needs to keep it live-updated across clicks rather than only setting it once on mount.
 */
export function DpaContent({ pl, en }: DpaContentProps) {
  const [lang, setLang] = useState<"pl" | "en">("pl");
  const doc = lang === "pl" ? pl : en;
  const home = landingHref(lang);

  return (
    <>
      <SetHtmlLang lang={lang} />
      <SiteNav lang={lang} />
      <main>
        <div className="wrap legal-page">
          <div className="legal-breadcrumb">
            <a href={`${home}#top`}>{BREADCRUMB[lang]}</a>
          </div>
          <h1>{doc.title}</h1>
          <div className="legal-lang-toggle" role="group" aria-label="Język dokumentu / Document language">
            <button type="button" aria-pressed={lang === "pl"} onClick={() => setLang("pl")}>
              Polski
            </button>
            <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              English
            </button>
          </div>
          <div className="legal-meta">
            <span className="legal-meta-item">
              {doc.effectiveDateLabel}: <strong>{doc.effectiveDate}</strong>
            </span>
            <span className="legal-meta-item">
              {doc.versionLabel}: <strong>{doc.version}</strong>
            </span>
          </div>
          {en.translationNote ? (
            <p className="legal-translation-note" hidden={lang !== "en"}>
              {en.translationNote}
            </p>
          ) : null}
          <div className="legal-doc" hidden={lang !== "pl"} dangerouslySetInnerHTML={{ __html: pl.bodyHtml }} />
          <div className="legal-doc" hidden={lang !== "en"} dangerouslySetInnerHTML={{ __html: en.bodyHtml }} />
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
