import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(treatmentSeoConfigs.facials);

export default function FacialsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
