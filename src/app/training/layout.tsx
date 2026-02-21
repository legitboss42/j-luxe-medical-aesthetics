import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Training Academy | J Luxe Aesthetics Hackney",
  description:
    "Join the J Luxe Virtual Academy in Hackney London for CPD-led aesthetics training in injectables, clinical safety, and business strategy.",
  alternates: {
    canonical: "/training",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Virtual Academy",
    "aesthetics training London",
    "virtual aesthetics training",
    "CPD aesthetics course",
    "anti-wrinkle training course",
    "dermal filler training course",
    "aesthetics business training",
  ],
  openGraph: {
    title: "Training Academy | J Luxe Aesthetics Hackney",
    description:
      "CPD-accredited virtual aesthetics training from a medical aesthetics clinic in Hackney London.",
    url: "/training",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Training academy at a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Training Academy | J Luxe Aesthetics Hackney",
    description:
      "CPD-accredited virtual aesthetics training from a medical aesthetics clinic in Hackney London.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrainingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
