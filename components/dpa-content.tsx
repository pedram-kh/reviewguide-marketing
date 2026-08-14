"use client";

import { useState } from "react";
import type { LegalDoc } from "@/lib/legal";

interface DpaContentProps {
  pl: LegalDoc;
  en: LegalDoc;
}

/**
 * Ticket 6.6, part A — the DPA is the one document published as a single route ("/dpa (PL with
 * EN toggle)", per the ticket) rather than two parallel PL/EN routes like the other three.
 *
 * Both language bodies are rendered into the static HTML at build time and merely toggled with
 * the `hidden` attribute (not conditionally mounted) — so the EN translation stays reachable in
 * the page source for crawlers/accessibility tools even though only one is visible at a time,
 * and switching languages is instant (no re-render / re-fetch).
 */
export function DpaContent({ pl, en }: DpaContentProps) {
  const [lang, setLang] = useState<"pl" | "en">("pl");
  const doc = lang === "pl" ? pl : en;

  return (
    <>
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
    </>
  );
}
