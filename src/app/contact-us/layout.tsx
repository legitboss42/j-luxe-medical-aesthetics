import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Contact Us | J Luxe Aesthetics Hackney",
  description:
    "Contact J Luxe Medical Aesthetics in Hackney London to book consultations for dermal fillers, anti-wrinkle injections, skin boosters, and facials.",
  alternates: {
    canonical: "/contact-us",
  },
  keywords: [
    primaryKeyword,
    "Contact J Luxe Medical Aesthetics",
    "Hackney aesthetics clinic contact",
    "London aesthetics clinic contact",
    "book dermal fillers consultation London",
    "anti-wrinkle injections Hackney consultation",
    "skin booster consultation London",
    "body sculpting consultation Hackney",
  ],
  openGraph: {
    title: "Contact Us | J Luxe Aesthetics Hackney",
    description:
      "Get in touch with a medical aesthetics clinic in Hackney London to discuss treatments and book your consultation.",
    url: "/contact-us",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Contact J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | J Luxe Aesthetics Hackney",
    description:
      "Get in touch with a medical aesthetics clinic in Hackney London to discuss treatments and book your consultation.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
