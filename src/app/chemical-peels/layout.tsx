import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(treatmentSeoConfigs.chemicalPeels);

export default function ChemicalPeelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
