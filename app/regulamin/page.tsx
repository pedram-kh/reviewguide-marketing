import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegalDoc } from "@/lib/legal";

const doc = loadLegalDoc("pl", "1-regulamin");

export const metadata: Metadata = {
  title: `${doc.title} — ReviewGuide`,
  description: "Regulamin świadczenia usługi ReviewGuide: zakres usługi, płatności, prawo odstąpienia i zasady korzystania z Serwisu.",
  alternates: { languages: { pl: "/regulamin", en: "/terms" } },
};

export default function RegulaminPage() {
  return <LegalPage doc={doc} altLanguage={{ href: "/terms", label: "English" }} />;
}
