import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(
  treatmentSeoConfigs.antiWrinkleInjection,
);

export default function AntiWrinkleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
