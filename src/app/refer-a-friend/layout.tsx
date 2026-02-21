import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Refer a Friend | J Luxe Medical Aesthetics Clinic in Hackney, London",
  description:
    "Create a personal, trackable refer-a-friend link at J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London, and unlock treatment discounts for both you and your referral.",
  alternates: {
    canonical: "/refer-a-friend",
  },
  keywords: [
    primaryKeyword,
    "refer a friend aesthetics clinic London",
    "Hackney aesthetic referral offer",
    "J Luxe refer a friend",
    "aesthetic treatment discount London",
    "trackable referral link aesthetics",
    "name based referral link clinic",
    "facial referral deal Hackney",
    "dermal fillers referral London",
  ],
  openGraph: {
    title: "Refer a Friend | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Generate a personal, trackable referral link and share luxury treatment discounts at J Luxe Medical Aesthetics in Hackney, London.",
    url: "/refer-a-friend",
    images: [
      {
        url: "/images/glowCta.png",
        width: 1200,
        height: 630,
        alt: "Refer a friend at J Luxe Medical Aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refer a Friend | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Generate a personal, trackable referral link and share treatment discounts at J Luxe Medical Aesthetics in Hackney, London.",
    images: ["/images/glowCta.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReferAFriendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
