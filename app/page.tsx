import { DemoSection } from "@/components/demo-section";
import { FaqSection } from "@/components/faq-section";
import { HowItWorks } from "@/components/how-it-works";
import { PricingSection } from "@/components/pricing-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { IlluminatedHero } from "@/components/ui/illuminated-hero";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 bg-black">
        <IlluminatedHero />
        <HowItWorks />
        <DemoSection />
        <PricingSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
