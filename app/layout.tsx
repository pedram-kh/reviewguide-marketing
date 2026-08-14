import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
      <body>{children}</body>
    </html>
  );
}
