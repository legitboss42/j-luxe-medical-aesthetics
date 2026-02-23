import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentFormsClient from "@/src/components/treatment/TreatmentFormsClient";
import { getTreatmentFormConfig, getTreatmentFormSlugs } from "@/src/lib/treatment-forms";

type TreatmentFormsPageProps = {
  params: Promise<{
    treatment: string;
  }>;
};

export function generateStaticParams() {
  return getTreatmentFormSlugs().map((treatment) => ({ treatment }));
}

export async function generateMetadata({ params }: TreatmentFormsPageProps): Promise<Metadata> {
  const { treatment } = await params;
  const config = getTreatmentFormConfig(treatment);

  if (!config) {
    return {
      title: "Forms Not Found | J Luxe Medical Aesthetics",
      description: "The requested treatment form page could not be found.",
    };
  }

  const formNameByTemplate = {
    antiWrinkle: "Anti-Wrinkle Consultation and Consent Form",
    bodySculpting: "Body Sculpting Consultation and Consent Form",
    dermalFillers: "Dermal Fillers Consultation and Consent Form",
    facials: "Facial Consultation and Consent Form",
    microneedling: "Microneedling Consultation and Consent Form",
    waxing: "Waxing Consultation and Consent Form",
    standard: `${config.treatmentName} Consultation and Consent Form`,
  } as const;
  const formName = formNameByTemplate[config.template];
  const title = `${formName} | J Luxe`;
  const description = `Complete your ${formName.toLowerCase()} before your appointment at J Luxe Medical Aesthetics.`;
  const canonical = `/forms/${config.slug}`;

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
          alt: `${formName} at J Luxe Medical Aesthetics`,
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TreatmentFormsPage({ params }: TreatmentFormsPageProps) {
  const { treatment } = await params;
  const config = getTreatmentFormConfig(treatment);

  if (!config) {
    notFound();
  }

  return (
    <TreatmentFormsClient
      treatmentName={config.treatmentName}
      treatmentPath={config.treatmentPath}
      imageSrc={config.imageSrc}
      intro={config.intro}
      template={config.template}
    />
  );
}
