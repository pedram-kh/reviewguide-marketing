import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/**
 * Ticket 6.6, part A — build-time Markdown → HTML for the four legal documents.
 *
 * Source of truth is `content/legal/{pl,en}/*.md`: the Stakeholder's pristine package
 * (design-reference/DOC) with the PM-sanctioned amendments applied (see PROGRESS.md /
 * SPRINT_06.md for the diffs). This module never reads design-reference/DOC directly — content/
 * is the one deployed copy, kept in version control like code.
 *
 * Each document's first few lines are a predictable meta block —
 *   # Title
 *   **Effective date / Data wejścia w życie:** ...
 *   **Version / Wersja:** ...
 *   *(EN only) This is an English translation ... convenience notice*
 * — which we peel off and render as a dedicated `<LegalMeta>` bar (ticket: "Effective date"
 * and "Version" must be visible at the top of the page) rather than leaving them as the first
 * paragraph of prose.
 */

export type LegalLang = "pl" | "en";

export interface LegalDoc {
  title: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  versionLabel: string;
  version: string;
  translationNote: string | null;
  bodyHtml: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content", "legal");

const META_LABELS: Record<LegalLang, { effectiveDate: string; version: string }> = {
  pl: { effectiveDate: "Data wejścia w życie", version: "Wersja" },
  en: { effectiveDate: "Effective date", version: "Version" },
};

marked.use({ gfm: true });

export function loadLegalDoc(lang: LegalLang, slug: string): LegalDoc {
  const filePath = path.join(CONTENT_ROOT, lang, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");

  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const effectiveDateMatch = raw.match(/\*\*(?:Data wejścia w życie|Effective date):\*\*\s*(.+)/);
  const versionMatch = raw.match(/\*\*(?:Wersja|Version):\*\*\s*(.+)/);
  const translationNoteMatch = raw.match(/^\*(This is an English translation.+)\*$/m);

  let body = raw;
  if (titleMatch) body = body.replace(titleMatch[0], "");
  if (effectiveDateMatch) body = body.replace(effectiveDateMatch[0], "");
  if (versionMatch) body = body.replace(versionMatch[0], "");
  if (translationNoteMatch) body = body.replace(translationNoteMatch[0], "");
  // Only the horizontal rule immediately after the meta block (present on the two ToS
  // documents, right before "## § 1") is stripped — LegalMeta renders that separation itself.
  // A later "---" (e.g. before the withdrawal-form annex) is intentionally left as a real <hr>.
  body = body.replace(/^\s*---\s*$/m, "");

  // Wrap tables for horizontal scroll on narrow viewports (the DPA sub-processor table is wide)
  // instead of letting them overflow the page or squash unreadably.
  const bodyHtml = (marked.parse(body.trim(), { async: false }) as string)
    .replace(/<table>/g, '<div class="legal-doc-table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return {
    title: titleMatch?.[1].trim() ?? slug,
    effectiveDateLabel: META_LABELS[lang].effectiveDate,
    effectiveDate: effectiveDateMatch?.[1].trim() ?? "",
    versionLabel: META_LABELS[lang].version,
    version: versionMatch?.[1].trim() ?? "",
    translationNote: translationNoteMatch?.[1].trim() ?? null,
    bodyHtml,
  };
}
