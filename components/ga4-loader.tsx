"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_CHANGE_EVENT, readConsentCookie, type ConsentState } from "@/lib/cookie-consent";

// Ticket 6.6, part D — env-gated on purpose: launches with this EMPTY, so GA4 stays fully
// inactive (no script tag ever injected, regardless of consent) until Ops sets a real
// measurement ID on Netlify — "analytics activates later without code changes."
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/**
 * Loads gtag.js + fires the GA4 config call only once both are true: a measurement ID is
 * configured, and the visitor has granted analytics consent (via the banner, initially or
 * having just changed their choice through "Ustawienia cookies") — never on first paint, unlike
 * the essential-only <ConsentModeInit> stub that always runs.
 */
export function Ga4Loader() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    setGranted(readConsentCookie()?.analytics ?? false);

    function onChange(event: Event) {
      const detail = (event as CustomEvent<ConsentState>).detail;
      setGranted(detail.analytics);
      if (detail.analytics && window.gtag) {
        window.gtag("consent", "update", { analytics_storage: "granted" });
      }
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!GA_MEASUREMENT_ID || !granted) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
