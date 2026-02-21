import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Pricing | J Luxe Aesthetics Hackney",
  description:
    "View clear pricing at J Luxe Medical Aesthetics in Hackney London for fillers, anti-wrinkle injections, facials, skin boosters, and body sculpting.",
  alternates: {
    canonical: "/pricing",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics pricing",
    "London aesthetics clinic pricing",
    "Hackney aesthetics clinic prices",
    "dermal fillers London prices",
    "anti-wrinkle injections London prices",
    "skin boosters London prices",
    "body sculpting London prices",
    "facial treatment prices Hackney",
    "consultation-led aesthetic clinic pricing",
  ],
  openGraph: {
    title: "Pricing | J Luxe Aesthetics Hackney",
    description:
      "Explore transparent treatment pricing at a medical aesthetics clinic in Hackney London with consultation-led care and clear package options.",
    url: "/pricing",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Pricing at a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | J Luxe Aesthetics Hackney",
    description:
      "Explore transparent treatment pricing at a medical aesthetics clinic in Hackney London with consultation-led care and clear package options.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
