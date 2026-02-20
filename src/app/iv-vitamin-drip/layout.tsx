import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(treatmentSeoConfigs.ivVitaminDrip);

export default function IvVitaminDripLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
