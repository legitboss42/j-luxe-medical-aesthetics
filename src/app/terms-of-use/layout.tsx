import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Terms of Use | J Luxe Aesthetics Hackney",
  description:
    "Read the terms of use for J Luxe Medical Aesthetics in Hackney London, including booking, deposits, cancellations, refunds, consent, and safety standards.",
  alternates: {
    canonical: "/terms-of-use",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics terms of use",
    "aesthetic clinic booking policy London",
    "medical aesthetics consent policy Hackney",
    "aesthetic clinic cancellation policy London",
  ],
  openGraph: {
    title: "Terms of Use | J Luxe Aesthetics Hackney",
    description:
      "Understand booking, consent, refunds, and safety policies at a medical aesthetics clinic in Hackney London.",
    url: "/terms-of-use",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Terms of use at a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | J Luxe Aesthetics Hackney",
    description:
      "Understand booking, consent, refunds, and safety policies at a medical aesthetics clinic in Hackney London.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
