import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Logan's existing brand serif, already in the repo. Self-hosted and
// subset at build time, replacing the old render-blocking Google Fonts
// <link> the CRA site loaded on every page.
const playfair = localFont({
  src: "../public/assets/fonts/PlayfairDisplay-VariableFont_wght.ttf",
  variable: "--font-playfair",
  display: "swap",
  weight: "300 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// The machine voice: telemetry readouts, node labels, code.
const monoCode = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

const SITE = "https://www.logan-m.com";
const DESCRIPTION =
  "Logan Moss — GTM Engineer, Content & Brand Strategist, Automation & Software Engineer. Marketing and machine logic: automation, APIs, and a whole lot of Airtable tabs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Logan Moss — GTM Engineer & Creative Technologist",
    template: "%s — Logan Moss",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Logan Moss",
    title: "Logan Moss — GTM Engineer & Creative Technologist",
    description: DESCRIPTION,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 655 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Logan Moss — GTM Engineer & Creative Technologist",
    description: DESCRIPTION,
    images: ["/assets/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${monoCode.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
