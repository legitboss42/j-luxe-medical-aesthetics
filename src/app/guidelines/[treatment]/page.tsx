import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentGuidelinesClient from "@/src/components/treatment/TreatmentGuidelinesClient";
import { getTreatmentFormConfig, getTreatmentFormSlugs } from "@/src/lib/treatment-forms";

type TreatmentGuidelinesPageProps = {
  params: Promise<{
    treatment: string;
  }>;
};

export function generateStaticParams() {
  return getTreatmentFormSlugs().map((treatment) => ({ treatment }));
}

export async function generateMetadata({ params }: TreatmentGuidelinesPageProps): Promise<Metadata> {
  const { treatment } = await params;
  const config = getTreatmentFormConfig(treatment);

  if (!config) {
    return {
      title: "Guidelines Not Found | J Luxe Medical Aesthetics",
      description: "The requested treatment guidelines page could not be found.",
    };
  }

  const title = `${config.treatmentName} Pre & Post Treatment Guidelines | J Luxe`;
  const description = `Read pre- and post-treatment guidelines for ${config.treatmentName.toLowerCase()} at J Luxe Medical Aesthetics.`;
  const canonical = `/guidelines/${config.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: config.imageSrc,
          width: 1200,
          height: 630,
          alt: `${config.treatmentName} pre and post treatment guidelines at J Luxe Medical Aesthetics`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [config.imageSrc],
    },
  };
}

export default async function TreatmentGuidelinesPage({ params }: TreatmentGuidelinesPageProps) {
  const { treatment } = await params;
  const config = getTreatmentFormConfig(treatment);

  if (!config) {
    notFound();
  }

  return (
    <TreatmentGuidelinesClient
      slug={config.slug}
      treatmentName={config.treatmentName}
      treatmentPath={config.treatmentPath}
      imageSrc={config.imageSrc}
      template={config.template}
    />
  );
}
