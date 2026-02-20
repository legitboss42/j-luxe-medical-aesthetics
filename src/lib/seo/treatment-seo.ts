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
    title: "Facials | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Discover luxury facials at J Luxe Medical Aesthetics in Hackney, London, including Hydrafacial, glow facials, acne facials, and advanced skin rejuvenation.",
    primaryKeyword: "Hydrafacial London",
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
    title:
      "Body Sculpting and Fat Dissolving Injections | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Explore body sculpting and fat dissolving injections at J Luxe Medical Aesthetics in Hackney, London, including Lemon Bottle, Aqualyx, wood therapy, RF, vacuum, and EMS sculpt.",
    primaryKeyword: "fat dissolving injections London",
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
    title: "Anti-Wrinkle Injections | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Explore anti-wrinkle injections (Botox) at J Luxe Medical Aesthetics in Hackney, London for smoother, natural-looking facial rejuvenation.",
    primaryKeyword: "Botox London",
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
    title: "Dermal Fillers | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Discover dermal fillers at J Luxe Medical Aesthetics in Hackney, London for lips, facial contouring, lip booster treatments, and filler dissolving options.",
    primaryKeyword: "Lip fillers London",
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
    title: "Skin Boosters | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Explore skin booster, mesotherapy, and exosome-led rejuvenation treatments at J Luxe Medical Aesthetics in Hackney, London for hydration and skin quality.",
    primaryKeyword: "Skin boosters London",
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
    title: "PRP Treatment | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Book PRP Face and PRP Hair treatment at J Luxe Medical Aesthetics in Hackney, London for natural regenerative skin and hair support.",
    primaryKeyword: "PRP treatment London",
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
    title: "Fat Dissolving Injections | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Discover fat dissolving injections at J Luxe Medical Aesthetics in Hackney, London, including targeted contouring protocols.",
    primaryKeyword: "Lemon Bottle injections London",
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
    title: "Teeth Whitening | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Book professional teeth whitening at J Luxe Medical Aesthetics in Hackney, London for a brighter smile.",
    primaryKeyword: "Teeth whitening London",
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
    title: "Exosomes | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Explore exosome treatments at J Luxe Medical Aesthetics in Hackney, London for advanced skin rejuvenation protocols.",
    primaryKeyword: "Exosome therapy London",
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
    title: "Chemical Peels | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Discover chemical peels at J Luxe Medical Aesthetics in Hackney, London for brighter tone, smoother texture, and skin renewal.",
    primaryKeyword: "Chemical peel London",
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
    title: "IV Vitamin Drip | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Book IV vitamin drip therapy at J Luxe Medical Aesthetics in Hackney, London for hydration, energy, and wellness support.",
    primaryKeyword: "IV drip London",
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
    title: "Waxing | J Luxe Medical Aesthetics Clinic in Hackney, London",
    description:
      "Explore professional waxing services at J Luxe Medical Aesthetics in Hackney, London including face, body, and intimate waxing.",
    primaryKeyword: "Hollywood wax London",
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
