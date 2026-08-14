import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegalDoc } from "@/lib/legal";

const doc = loadLegalDoc("en", "3-cookie-policy");

export const metadata: Metadata = {
  title: `${doc.title} — ReviewGuide`,
  description:
    "ReviewGuide Cookie Policy: the types of cookies used, their purpose, and how to give or withdraw consent.",
  alternates: { languages: { pl: "/cookies", en: "/cookie-policy" } },
};

export default function CookiePolicyPage() {
  return <LegalPage doc={doc} lang="en" altLanguage={{ href: "/cookies", label: "Polski" }} />;
}
