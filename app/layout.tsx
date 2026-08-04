import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const FALLBACK_SITE_URL = "http://localhost:3000";

function resolveMetadataBase(): URL {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!rawSiteUrl) {
    return new URL(FALLBACK_SITE_URL);
  }

  const normalizedSiteUrl = /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`;

  try {
    return new URL(normalizedSiteUrl);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

const titleFont = Libre_Baskerville({
  variable: "--font-title",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meeting Planner",
  },
  description: "Plan, view, and print sacrament meeting programs.",
  metadataBase: resolveMetadataBase(),
  openGraph: {
    title: "Sacrament Meeting Planner",
    description: "Plan, view, and print sacrament meeting programs.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sacrament Meeting Planner",
    description: "Plan, view, and print sacrament meeting programs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${titleFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
