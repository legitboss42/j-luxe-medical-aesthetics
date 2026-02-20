import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const siteUrl = "https://jluxemedicalaesthetics.com";
const primaryKeyword = "medical aesthetics clinic in Hackney London";

// Font configurations for a premium feel
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "J Luxe Medical Aesthetics | Premier Clinic in London",
  description:
    "J Luxe Medical Aesthetics is a medical aesthetics clinic in Hackney London offering personalized non-surgical dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
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
      "J Luxe Medical Aesthetics is a medical aesthetics clinic in Hackney London offering personalized non-surgical dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
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
      "J Luxe Medical Aesthetics is a medical aesthetics clinic in Hackney London offering personalized non-surgical dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
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
      <body className={`${inter.variable} ${playfair.variable} bg-[#0a0a0a] text-white flex flex-col min-h-screen antialiased`}>
        <Navbar />
        {/* Offset for fixed navbar (mobile vs desktop header heights) */}
        <main className="flex-grow pt-20 lg:pt-[230px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
