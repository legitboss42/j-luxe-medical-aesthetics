import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Privacy Policy | J Luxe Aesthetics Hackney",
  description:
    "Read the privacy policy for J Luxe Medical Aesthetics in Hackney London, including UK GDPR data handling, cookies, consent, and client rights.",
  alternates: {
    canonical: "/privacy-policy",
  },
  keywords: [
    primaryKeyword,
    "J Luxe Medical Aesthetics privacy policy",
    "GDPR aesthetics clinic London",
    "cookies policy Hackney clinic",
    "medical aesthetics data protection London",
  ],
  openGraph: {
    title: "Privacy Policy | J Luxe Aesthetics Hackney",
    description:
      "Learn how a medical aesthetics clinic in Hackney London collects, stores, and protects personal and medical data under UK GDPR.",
    url: "/privacy-policy",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Privacy policy at a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | J Luxe Aesthetics Hackney",
    description:
      "Learn how a medical aesthetics clinic in Hackney London collects, stores, and protects personal and medical data under UK GDPR.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
