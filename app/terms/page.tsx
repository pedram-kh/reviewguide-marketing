import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegalDoc } from "@/lib/legal";

const doc = loadLegalDoc("en", "1-terms-of-service");

export const metadata: Metadata = {
  title: `${doc.title} — ReviewGuide`,
  description:
    "ReviewGuide Terms of Service: scope of the service, payments, right of withdrawal and rules for using the Service.",
  alternates: { languages: { pl: "/regulamin", en: "/terms" } },
};

export default function TermsPage() {
  return <LegalPage doc={doc} lang="en" altLanguage={{ href: "/regulamin", label: "Polski" }} />;
}
