import type { Metadata } from "next";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

export const metadata: Metadata = {
  title: "Booking & Cancellation Policy | J Luxe Aesthetics Hackney",
  description:
    "Read J Luxe Medical Aesthetics booking and cancellation policy in Hackney London, including deposits, late arrivals, no-shows, refunds, and payment terms.",
  alternates: {
    canonical: "/booking-cancellation-policy",
  },
  keywords: [
    primaryKeyword,
    "J Luxe booking and cancellation policy",
    "aesthetic clinic deposit policy London",
    "appointment cancellation terms Hackney",
    "medical aesthetics no show policy London",
  ],
  openGraph: {
    title: "Booking & Cancellation Policy | J Luxe Aesthetics Hackney",
    description:
      "Understand booking, deposit, cancellation, no-show, and payment terms at a medical aesthetics clinic in Hackney London.",
    url: "/booking-cancellation-policy",
    images: [
      {
        url: "/images/heroImagePrompt.png",
        width: 1200,
        height: 630,
        alt: "Booking and cancellation policy at a medical aesthetics clinic in Hackney London",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking & Cancellation Policy | J Luxe Aesthetics Hackney",
    description:
      "Understand booking, deposit, cancellation, no-show, and payment terms at a medical aesthetics clinic in Hackney London.",
    images: ["/images/heroImagePrompt.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingCancellationPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
