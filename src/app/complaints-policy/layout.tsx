import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Complaints Policy | J Luxe Aesthetics Hackney",
  description:
    "Read the complaints policy for J Luxe Medical Aesthetics in Hackney London, including response timelines, escalation routes, and conduct standards.",
  alternates: {
    canonical: "/complaints-policy",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics complaints policy",
    "aesthetic clinic complaint process London",
    "clinical complaints procedure Hackney",
    "medical aesthetics service complaints London",
  ],
  openGraph: {
    title: "Complaints Policy | J Luxe Aesthetics Hackney",
    description:
      "Understand complaint handling, response timelines, and escalation pathways at a medical aesthetics clinic in Hackney London.",
    url: "/complaints-policy",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Complaints policy at a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complaints Policy | J Luxe Aesthetics Hackney",
    description:
      "Understand complaint handling, response timelines, and escalation pathways at a medical aesthetics clinic in Hackney London.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ComplaintsPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
