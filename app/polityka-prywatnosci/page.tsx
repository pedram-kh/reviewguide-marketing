import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegalDoc } from "@/lib/legal";

const doc = loadLegalDoc("pl", "2-polityka-prywatnosci");

export const metadata: Metadata = {
  title: `${doc.title} — ReviewGuide`,
  description:
    "Polityka Prywatności ReviewGuide: jakie dane przetwarzamy, w jakim celu, komu je udostępniamy i jakie prawa przysługują osobom, których dane dotyczą.",
  alternates: { languages: { pl: "/polityka-prywatnosci", en: "/privacy-policy" } },
};

export default function PolitykaPrywatnosciPage() {
  return <LegalPage doc={doc} altLanguage={{ href: "/privacy-policy", label: "English" }} />;
}
