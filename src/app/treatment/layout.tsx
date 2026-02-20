import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Treatments | J Luxe Medical Aesthetics Clinic in Hackney, London",
  description:
    "Discover expert non-surgical treatments at J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London offering dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
  alternates: {
    canonical: "/treatment",
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
    "aesthetic treatments in London",
  ],
  openGraph: {
    title: "Treatments | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Discover expert non-surgical treatments at a medical aesthetics clinic in Hackney London, including dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
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
    title: "Treatments | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Discover expert non-surgical treatments at a medical aesthetics clinic in Hackney London, including dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
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
