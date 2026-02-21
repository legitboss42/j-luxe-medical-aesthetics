import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Aesthetics Blog | J Luxe Aesthetics Hackney",
  description:
    "Read expert aesthetics articles from J Luxe Medical Aesthetics in Hackney London, covering dermal fillers, anti-wrinkle care, skin health, and aftercare.",
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics blog",
    "Hackney aesthetics clinic blog",
    "London dermal fillers guide",
    "anti-wrinkle injections advice London",
    "skin booster information London",
    "body sculpting insights Hackney",
    "aesthetic treatment aftercare blog",
  ],
  openGraph: {
    title: "Aesthetics Blog | J Luxe Aesthetics Hackney",
    description:
      "Educational aesthetics articles and treatment insights from a medical aesthetics clinic in Hackney London.",
    url: "/blog",
    images: [
      {
        url: "/images/heroBackground.png",
        width: 1200,
        height: 630,
        alt: "J Luxe Journal by a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aesthetics Blog | J Luxe Aesthetics Hackney",
    description:
      "Educational aesthetics articles and treatment insights from a medical aesthetics clinic in Hackney London.",
    images: ["/images/heroBackground.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
