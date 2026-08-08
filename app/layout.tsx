import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://reviewguide.eu";
const TITLE = "ReviewGuide — automatyczne odpowiedzi na opinie Google dla restauracji";
const DESCRIPTION =
  "ReviewGuide sprawdza opinie Twojej restauracji na Google co 2 godziny i w ciągu maksymalnie 2 godzin przygotowuje gotową, spokojną odpowiedź. 14 dni za darmo, bez karty.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "ReviewGuide",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-black text-white">{children}</body>
    </html>
  );
}
