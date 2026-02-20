import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "About Us | J Luxe Medical Aesthetics in Hackney, London",
  description:
    "Learn about J Luxe Medical Aesthetics, a consultation-led medical aesthetics clinic in Hackney London offering dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
  alternates: {
    canonical: "/about-us",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics",
    "About J Luxe Medical Aesthetics",
    "London aesthetics clinic",
    "Hackney aesthetics clinic",
    "dermal fillers London",
    "anti-wrinkle injections London",
    "skin boosters London",
    "body sculpting London",
  ],
  openGraph: {
    title: "About Us | J Luxe Medical Aesthetics in Hackney, London",
    description:
      "Discover the team, philosophy, and clinical approach behind a medical aesthetics clinic in Hackney London.",
    url: "/about-us",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "About J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | J Luxe Medical Aesthetics in Hackney, London",
    description:
      "Discover the team, philosophy, and clinical approach behind a medical aesthetics clinic in Hackney London.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
