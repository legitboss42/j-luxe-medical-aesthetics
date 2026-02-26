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
    title: "Facial Treatments | J Luxe Aesthetics Hackney",
    description:
      "Book facials at J Luxe Medical Aesthetics Hackney, including Hydrafacial, acne facials, glow facials, and advanced skin rejuvenation plans.",
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
    title: "Body Sculpting & Fat Dissolving | J Luxe Aesthetics Hackney",
    description:
      "Explore body sculpting and fat dissolving injections at J Luxe Medical Aesthetics Hackney, including Lemon Bottle, Aqualyx, EMS sculpt, and contouring care.",
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
    title: "Anti-Wrinkle Injections | J Luxe Aesthetics Hackney",
    description:
      "Book anti-wrinkle injections at J Luxe Medical Aesthetics Hackney for smoother expression lines, balanced dosing, and natural-looking results.",
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
    title: "Dermal Fillers | J Luxe Aesthetics Hackney",
    description:
      "Discover dermal fillers at J Luxe Medical Aesthetics Hackney for lips, contouring, lip booster options, and safe filler dissolving support.",
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
    title: "Skin Boosters | J Luxe Aesthetics Hackney",
    description:
      "Explore skin boosters and mesotherapy at J Luxe Medical Aesthetics Hackney for deep hydration, smoother texture, and stronger skin quality.",
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
    title: "PRP Treatment | J Luxe Aesthetics Hackney",
    description:
      "Book PRP treatment at J Luxe Medical Aesthetics Hackney for face and hair concerns, with regenerative protocols designed for natural progress.",
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
    title: "Fat Dissolving Injections | J Luxe Aesthetics Hackney",
    description:
      "Discover fat dissolving injections at J Luxe Medical Aesthetics Hackney with targeted contouring plans and consultation-led protocols.",
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
    title: "Teeth Whitening | J Luxe Aesthetics Hackney",
    description:
      "Book professional teeth whitening at J Luxe Medical Aesthetics Hackney for a brighter smile, reduced staining, and safe cosmetic results.",
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
    title: "Exosome Therapy | J Luxe Aesthetics Hackney",
    description:
      "Explore exosome therapy at J Luxe Medical Aesthetics Hackney for advanced skin regeneration, improved tone, and consultation-led rejuvenation plans.",
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
    title: "Chemical Peels | J Luxe Aesthetics Hackney",
    description:
      "Discover chemical peels at J Luxe Medical Aesthetics Hackney to improve tone, refine texture, reduce pigmentation, and support healthy skin renewal.",
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
    title: "IV Vitamin Drips | J Luxe Aesthetics Hackney",
    description:
      "Book IV vitamin drips at J Luxe Medical Aesthetics Hackney for hydration, energy support, recovery, and personalized wellness protocols.",
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
    title: "Waxing Services | J Luxe Aesthetics Hackney",
    description:
      "Explore professional waxing services at J Luxe Medical Aesthetics Hackney for face, body, and intimate waxing with smooth, long-lasting results.",
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
