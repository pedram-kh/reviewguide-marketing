import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegalDoc } from "@/lib/legal";

const doc = loadLegalDoc("pl", "3-polityka-cookies");

export const metadata: Metadata = {
  title: `${doc.title} — ReviewGuide`,
  description:
    "Polityka Cookies ReviewGuide: rodzaje stosowanych plików cookies, ich cel oraz zasady wyrażania i wycofywania zgody.",
  alternates: { languages: { pl: "/cookies", en: "/cookie-policy" } },
};

export default function CookiesPage() {
  return <LegalPage doc={doc} altLanguage={{ href: "/cookie-policy", label: "English" }} />;
}
