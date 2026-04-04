import type { Metadata } from "next";

export type TreatmentSeoConfig = {
  path: `/${string}`;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  image: string;
  imageAlt: string;
};

// High-demand head term is always first (primaryKeyword) for each treatment page.
export const treatmentSeoConfigs = {
  facials: {
    path: "/facials",
    title: "Facials in Hackney London | Book Consultation | J Luxe",
    description:
      "Book facials in Hackney London at J Luxe Medical Aesthetics, including Hydrafacial, acne facials, glow facials, and consultation-led skin treatment plans.",
    primaryKeyword: "facials Hackney London",
    secondaryKeywords: [
      "facials Hackney",
      "acne facial London",
      "glow facial London",
      "skin rejuvenation facial London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/advancedFacials.png",
    imageAlt: "Facials at a medical aesthetics clinic in Hackney London",
  },
  bodySculpting2: {
    path: "/body-sculpting-2",
    title: "Body Sculpting in Hackney London | Book Consultation | J Luxe",
    description:
      "Book body sculpting in Hackney London at J Luxe Medical Aesthetics, including fat dissolving support, contouring consultation, and non-surgical body treatment planning.",
    primaryKeyword: "body sculpting Hackney London",
    secondaryKeywords: [
      "body sculpting London",
      "Lemon Bottle London",
      "Aqualyx London",
      "body contouring Hackney",
      "EMS sculpt London",
      "wood therapy London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/bodySculpting.png",
    imageAlt:
      "Body sculpting and fat dissolving injections at a medical aesthetics clinic in Hackney London",
  },
  // Ready for treatment pages you generate next:
  antiWrinkleInjection: {
    path: "/anti-wrinkle-injection",
    title: "Anti-Wrinkle Injections in Hackney London | Book Consultation | J Luxe",
    description:
      "Book anti-wrinkle injections in Hackney London at J Luxe Medical Aesthetics for smoother expression lines, consultation-led dosing, and natural-looking results.",
    primaryKeyword: "anti-wrinkle injections Hackney London",
    secondaryKeywords: [
      "anti wrinkle injections London",
      "Botox Hackney",
      "forehead lines treatment London",
      "crow's feet treatment London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/anti-wrinkle-injection.png",
    imageAlt: "Anti-wrinkle treatment at a medical aesthetics clinic in Hackney London",
  },
  fillers: {
    path: "/fillers",
    title: "Dermal Fillers in Hackney London | Book Consultation | J Luxe",
    description:
      "Book dermal fillers in Hackney London at J Luxe Medical Aesthetics for lips, contouring, facial balance, and consultation-led filler planning.",
    primaryKeyword: "dermal fillers Hackney London",
    secondaryKeywords: [
      "dermal fillers London",
      "cheek filler London",
      "jawline filler London",
      "lip booster London",
      "filler dissolving London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/dermalFillers.png",
    imageAlt: "Dermal filler treatment at a medical aesthetics clinic in Hackney London",
  },
  skinBoostersMesotherapy: {
    path: "/skin-boosters-mesotherapy",
    title: "Skin Boosters in Hackney London | Book Consultation | J Luxe",
    description:
      "Book skin boosters in Hackney London at J Luxe Medical Aesthetics for deep hydration, smoother texture, and consultation-led skin quality treatment.",
    primaryKeyword: "skin boosters Hackney London",
    secondaryKeywords: [
      "mesotherapy London",
      "profhilo London",
      "polynucleotide treatment London",
      "exosome skin treatment London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/skin-boosters-mesotherapy.png",
    imageAlt: "Skin booster treatment at a medical aesthetics clinic in Hackney London",
  },
  prpTreatment: {
    path: "/prp-treatment",
    title: "PRP Treatment in Hackney London | Book Consultation | J Luxe",
    description:
      "Book PRP treatment in Hackney London at J Luxe Medical Aesthetics for regenerative face and hair support with consultation-led treatment planning.",
    primaryKeyword: "PRP treatment Hackney London",
    secondaryKeywords: [
      "PRP facial London",
      "PRP hair treatment London",
      "PRP face London",
      "vampire facial London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/prp-treatment.png",
    imageAlt: "PRP treatment at a medical aesthetics clinic in Hackney London",
  },
  fatDissolvingInjections: {
    path: "/fat-dissolving-injections",
    title: "Fat Dissolving Injections in Hackney London | Book Consultation | J Luxe",
    description:
      "Book fat dissolving injections in Hackney London at J Luxe Medical Aesthetics with targeted contouring consultation and treatment planning.",
    primaryKeyword: "fat dissolving injections Hackney London",
    secondaryKeywords: [
      "fat dissolving injections London",
      "Aqualyx London",
      "double chin fat dissolving London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/fat-dissolving-injections.png",
    imageAlt: "Fat dissolving treatment at a medical aesthetics clinic in Hackney London",
  },
  teethWhitening: {
    path: "/teeth-whitening",
    title: "Teeth Whitening in Hackney London | Book Consultation | J Luxe",
    description:
      "Book professional teeth whitening in Hackney London at J Luxe Medical Aesthetics for a brighter smile, reduced staining, and consultation-led cosmetic care.",
    primaryKeyword: "teeth whitening Hackney London",
    secondaryKeywords: [
      "laser teeth whitening London",
      "professional teeth whitening Hackney",
      "smile brightening London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/teeth-whitening.png",
    imageAlt: "Teeth whitening at a medical aesthetics clinic in Hackney London",
  },
  exosomes: {
    path: "/exosomes",
    title: "Exosomes Treatment in Hackney London | Book Consultation | J Luxe",
    description:
      "Book exosomes treatment in Hackney London at J Luxe Medical Aesthetics for advanced skin regeneration, tone support, and consultation-led rejuvenation planning.",
    primaryKeyword: "exosomes treatment Hackney London",
    secondaryKeywords: [
      "exosome facial London",
      "regenerative skin treatment London",
      "advanced skin rejuvenation London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/exosome.png",
    imageAlt: "Exosome treatment at a medical aesthetics clinic in Hackney London",
  },
  chemicalPeels: {
    path: "/chemical-peels",
    title: "Chemical Peels in Hackney London | Book Consultation | J Luxe",
    description:
      "Book chemical peels in Hackney London at J Luxe Medical Aesthetics to improve tone, refine texture, reduce pigmentation, and plan the right peel consultation.",
    primaryKeyword: "chemical peels Hackney London",
    secondaryKeywords: [
      "BioRePeel London",
      "skin peel treatment London",
      "pigmentation peel London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/chemical-peels.png",
    imageAlt: "Chemical peel at a medical aesthetics clinic in Hackney London",
  },
  ivVitaminDrip: {
    path: "/iv-vitamin-drip",
    title: "IV Vitamin Drips in Hackney London | Book Consultation | J Luxe",
    description:
      "Book IV vitamin drips in Hackney London at J Luxe Medical Aesthetics for hydration, energy support, recovery, and consultation-led wellness planning.",
    primaryKeyword: "IV vitamin drips Hackney London",
    secondaryKeywords: [
      "vitamin drip London",
      "NAD drip London",
      "glutathione drip London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/iv-vitamin-drip.png",
    imageAlt: "IV vitamin drip at a medical aesthetics clinic in Hackney London",
  },
  waxing: {
    path: "/waxing",
    title: "Waxing Services in Hackney London | Book Appointment | J Luxe",
    description:
      "Book waxing services in Hackney London at J Luxe Medical Aesthetics for face, body, and intimate waxing with smooth, long-lasting results.",
    primaryKeyword: "waxing Hackney London",
    secondaryKeywords: [
      "full body waxing London",
      "facial waxing London",
      "intimate waxing London",
      "medical aesthetics clinic in Hackney London",
    ],
    image: "/images/waxing.png",
    imageAlt: "Waxing treatment at a medical aesthetics clinic in Hackney London",
  },
} as const satisfies Record<string, TreatmentSeoConfig>;

export function buildTreatmentMetadata(config: TreatmentSeoConfig): Metadata {
  const keywords = Array.from(
    new Set([config.primaryKeyword, ...config.secondaryKeywords].map((item) => item.trim())),
  );

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: config.path,
    },
    keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.path,
      images: [
        {
          url: config.image,
          width: 1200,
          height: 630,
          alt: config.imageAlt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

