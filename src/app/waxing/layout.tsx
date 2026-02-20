import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(treatmentSeoConfigs.waxing);

export default function WaxingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
