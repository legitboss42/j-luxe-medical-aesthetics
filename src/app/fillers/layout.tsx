import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(treatmentSeoConfigs.fillers);

export default function FillersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
