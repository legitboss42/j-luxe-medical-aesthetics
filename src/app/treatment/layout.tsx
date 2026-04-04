import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Book Aesthetic Treatments in Hackney London | J Luxe",
  description:
    "Book aesthetic treatments in Hackney London at J Luxe Medical Aesthetics, including fillers, anti-wrinkle injections, skin boosters, facials, and body sculpting consultations.",
  alternates: {
    canonical: "/treatment",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics",
    "London aesthetics clinic",
    "Hackney aesthetics clinic",
    "book aesthetic treatments Hackney",
    "non-surgical aesthetic treatments in East London",
    "dermal fillers London",
    "anti-wrinkle injections London",
    "skin boosters London",
    "body sculpting London",
    "aesthetic treatments in London",
  ],
  openGraph: {
    title: "Book Aesthetic Treatments in Hackney London | J Luxe",
    description:
      "Book aesthetic treatments in Hackney London at J Luxe Medical Aesthetics, including dermal fillers, anti-wrinkle injections, skin boosters, facials, and body sculpting consultations.",
    url: "/treatment",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Treatments at a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Aesthetic Treatments in Hackney London | J Luxe",
    description:
      "Book aesthetic treatments in Hackney London at J Luxe Medical Aesthetics, including dermal fillers, anti-wrinkle injections, skin boosters, facials, and body sculpting consultations.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TreatmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
