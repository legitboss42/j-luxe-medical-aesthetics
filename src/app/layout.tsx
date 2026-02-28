import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopOnLoad from "./ScrollToTopOnLoad";
import FirstVisitSkinAdvisor from "@/src/components/ai/FirstVisitSkinAdvisor";

const siteUrl = "https://jluxemedicalaesthetics.com";
const primaryKeyword = "medical aesthetics clinic in Hackney London";

// Premium font pairing: editorial serif + clean luxury sans
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "J Luxe Medical Aesthetics | Premier Clinic in London",
  description:
    "J Luxe Medical Aesthetics is a medical aesthetics clinic in Hackney London offering dermal fillers, anti-wrinkle injections, facials, and body sculpting.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", type: "image/png", sizes: "150x150" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/images/logo.png", sizes: "150x150", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics",
    "London aesthetics clinic",
    "Hackney aesthetics clinic",
    "non-surgical aesthetic treatments in East London",
    "dermal fillers London",
    "anti-wrinkle injections London",
    "skin boosters London",
    "body sculpting London",
  ],
  openGraph: {
    title: "J Luxe Medical Aesthetics | Premier Clinic in London",
    description:
      "J Luxe Medical Aesthetics is a medical aesthetics clinic in Hackney London offering dermal fillers, anti-wrinkle injections, facials, and body sculpting.",
    url: "/",
    siteName: "J Luxe Medical Aesthetics",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "J Luxe Medical Aesthetics | Premier Clinic in London",
    description:
      "J Luxe Medical Aesthetics is a medical aesthetics clinic in Hackney London offering dermal fillers, anti-wrinkle injections, facials, and body sculpting.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${cormorant.variable} bg-[#0a0a0a] text-white flex flex-col min-h-screen antialiased`}
      >
        <ScrollToTopOnLoad />
        <Navbar />
        <FirstVisitSkinAdvisor />
        {/* Sticky header sits in flow, so no manual top offset needed */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
