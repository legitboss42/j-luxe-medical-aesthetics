import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(treatmentSeoConfigs.exosomes);

export default function ExosomesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
