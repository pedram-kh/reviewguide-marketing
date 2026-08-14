import type { Metadata } from "next";
import { DpaContent } from "@/components/dpa-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { loadLegalDoc } from "@/lib/legal";

const plDoc = loadLegalDoc("pl", "4-umowa-powierzenia-dpa");
const enDoc = loadLegalDoc("en", "4-data-processing-agreement-dpa");

export const metadata: Metadata = {
  title: `${plDoc.title} — ReviewGuide`,
  description:
    "Umowa powierzenia przetwarzania danych osobowych (DPA) / Data Processing Agreement — Załącznik nr 2 do Regulaminu ReviewGuide.",
};

export default function DpaPage() {
  return (
    <>
      <SiteNav />
      <main>
        <div className="wrap legal-page">
          <div className="legal-breadcrumb">
            <a href="/">← Strona główna</a>
          </div>
          <DpaContent pl={plDoc} en={enDoc} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
