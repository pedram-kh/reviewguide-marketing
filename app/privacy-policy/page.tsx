import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegalDoc } from "@/lib/legal";

const doc = loadLegalDoc("en", "2-privacy-policy");

export const metadata: Metadata = {
  title: `${doc.title} — ReviewGuide`,
  description:
    "ReviewGuide Privacy Policy: what data we process, why, who we share it with, and the rights of data subjects.",
  alternates: { languages: { pl: "/polityka-prywatnosci", en: "/privacy-policy" } },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={doc} lang="en" altLanguage={{ href: "/polityka-prywatnosci", label: "Polski" }} />;
}
