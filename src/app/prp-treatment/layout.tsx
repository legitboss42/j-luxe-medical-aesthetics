import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(
  treatmentSeoConfigs.prpTreatment,
);

export default function PrpTreatmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
