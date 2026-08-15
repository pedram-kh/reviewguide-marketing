import type { Metadata } from "next";
import { DpaContent } from "@/components/dpa-content";
import { loadLegalDoc } from "@/lib/legal";

const plDoc = loadLegalDoc("pl", "4-umowa-powierzenia-dpa");
const enDoc = loadLegalDoc("en", "4-data-processing-agreement-dpa");

export const metadata: Metadata = {
  title: `${plDoc.title} — ReviewGuide`,
  description:
    "Umowa powierzenia przetwarzania danych osobowych (DPA) / Data Processing Agreement — Załącznik nr 2 do Regulaminu ReviewGuide.",
};

// <DpaContent> owns the whole page shell (nav/breadcrumb/document/footer) so its language toggle
// switches all of it together — see that component's doc comment for why this isn't split the
// way the other six legal routes are (SiteNav/SiteFooter rendered here, LegalPage in between).
export default function DpaPage() {
  return <DpaContent pl={plDoc} en={enDoc} />;
}
