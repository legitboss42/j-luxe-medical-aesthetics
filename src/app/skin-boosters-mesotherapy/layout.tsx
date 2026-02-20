import type { Metadata } from "next";
import {
  buildTreatmentMetadata,
  treatmentSeoConfigs,
} from "../../lib/seo/treatment-seo";

export const metadata: Metadata = buildTreatmentMetadata(
  treatmentSeoConfigs.skinBoostersMesotherapy,
);

export default function SkinBoostersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
