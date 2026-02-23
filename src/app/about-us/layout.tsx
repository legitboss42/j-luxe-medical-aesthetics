import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "About Us | J Luxe Aesthetics Hackney",
  description:
    "Learn about J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London focused on safe, natural-looking outcomes and personalised treatment planning.",
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
    title: "About Us | J Luxe Aesthetics Hackney",
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
    title: "About Us | J Luxe Aesthetics Hackney",
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
