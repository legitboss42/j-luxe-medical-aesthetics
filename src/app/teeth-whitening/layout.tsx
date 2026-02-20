import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(
  treatmentSeoConfigs.teethWhitening,
);

export default function TeethWhiteningLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
