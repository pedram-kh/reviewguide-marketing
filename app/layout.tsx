import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { ConsentModeInit } from "@/components/consent-mode-init";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { Ga4Loader } from "@/components/ga4-loader";

// next/font self-hosts + preloads the font (no render-blocking Google Fonts <link>), and
// latin-ext is required — the base "latin" subset drops the Polish diacritics (ą ć ę ł ń ó ś ź ż)
// this entire site is written in.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const SITE_URL = "https://reviewguide.eu";
// Ticket 6.5: title/description ported verbatim from the Stakeholder's design-reference/index.html.
const TITLE = "ReviewGuide — profesjonalna odpowiedź na każdą opinię Google";
const DESCRIPTION =
  "ReviewGuide sprawdza opinie Twojej restauracji na Google co 2 godziny i przygotowuje spokojną, konkretną odpowiedź — zanim zdążysz się zdenerwować.";

// Ticket 6.6b — `viewport-fit=cover` is required for `env(safe-area-inset-*)` (globals.css's
// `.wrap`) to resolve to anything but 0 on iOS Safari; without it the page always renders inside
// the safe area already, so the CSS additions there would be dead code on every device.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // Ticket 6.6, part E — hreflang alternates; overridden by app/en/page.tsx's own `alternates`
  // (Next merges page-level metadata over layout-level per key, canonical included).
  alternates: {
    canonical: "/",
    languages: { pl: "/", en: "/en", "x-default": "/" },
  },
  // Ticket 6.7 — `?v=6.7` cache-busts the brand-mark replacement. Browsers cache favicons far more
  // aggressively than ordinary assets (sometimes ignoring normal cache-control entirely), so a
  // same-path deploy risks a returning visitor's tab keeping the old mark indefinitely; the query
  // string forces every icon URL to be treated as new. Bump this string again for any future mark
  // change, same convention.
  icons: {
    icon: [
      { url: "/favicon.ico?v=6.7", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png?v=6.7", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png?v=6.7", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=6.7", sizes: "180x180" }],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "ReviewGuide",
    locale: "pl_PL",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={plusJakartaSans.variable}>
      <head>
        {/* Ticket 6.6, part D — must run before any analytics tag could load. */}
        <ConsentModeInit />
      </head>
      <body>
        {children}
        <CookieConsentBanner />
        <Ga4Loader />
      </body>
    </html>
  );
}
