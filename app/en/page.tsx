import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoSection } from "@/components/demo-section";
import { FaqSection } from "@/components/faq-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SetHtmlLang } from "@/components/set-html-lang";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { EN_LANDING_ENABLED } from "@/lib/en-landing";

const SITE_URL = "https://reviewguide.eu";
const TITLE = "ReviewGuide — a professional response to every Google review";
// Ticket 6.14 — EN mirror of the PL meta-description sweep fix in app/layout.tsx.
const DESCRIPTION =
  "ReviewGuide checks your restaurant's Google reviews every 2 hours and prepares a calm, specific response.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/en",
    languages: { pl: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/en`,
    siteName: "ReviewGuide",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

/**
 * Ticket 6.6, part E — English landing page. Same sections/design as app/page.tsx, driven by
 * each section's `lang="en"` prop; the two review examples in <DemoSection> stay Polish with an
 * "(example in Polish)" note per the ticket's explicit carve-out, everything else is translated.
 * Gated behind EN_LANDING_ENABLED until the PM approves the pasted copy — see lib/en-landing.ts.
 */
export default function EnHome() {
  if (!EN_LANDING_ENABLED) notFound();

  return (
    <>
      <SetHtmlLang lang="en" />
      <RevealOnScroll />
      <SiteNav lang="en" />
      <main>
        <HeroSection lang="en" />
        <HowItWorks lang="en" />
        <DemoSection lang="en" />
        <PricingSection lang="en" />
        <FaqSection lang="en" />
        <FinalCtaSection lang="en" />
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
