export type TreatmentCatalogItem = {
  id: string;
  name: string;
  path: string;
  summary: string;
  bestFor: string[];
  injectable: boolean;
};

export const TREATMENT_CATALOG: TreatmentCatalogItem[] = [
  {
    id: "facials",
    name: "Facials",
    path: "/facials",
    summary: "Gentle skin rejuvenation and glow-focused care with minimal downtime.",
    bestFor: ["dullness", "sensitivity", "maintenance", "congestion", "hydration"],
    injectable: false,
  },
  {
    id: "chemicalPeels",
    name: "Chemical Peels",
    path: "/chemical-peels",
    summary: "Improves texture, tone, and uneven pigmentation with controlled exfoliation.",
    bestFor: ["pigmentation", "texture", "acneMarks", "dullness"],
    injectable: false,
  },
  {
    id: "antiWrinkle",
    name: "Anti-Wrinkle Injections",
    path: "/anti-wrinkle-injection",
    summary: "Softens dynamic lines and expression wrinkles for a smoother appearance.",
    bestFor: ["fineLines", "wrinkles", "expressionLines"],
    injectable: true,
  },
  {
    id: "dermalFillers",
    name: "Dermal Fillers",
    path: "/fillers",
    summary: "Restores volume and enhances facial balance in key areas.",
    bestFor: ["volumeLoss", "contouring", "facialBalance"],
    injectable: true,
  },
  {
    id: "skinBoosters",
    name: "Skin Boosters",
    path: "/skin-boosters-mesotherapy",
    summary: "Deep hydration support for improved skin quality and elasticity.",
    bestFor: ["dehydration", "crepeySkin", "glow", "earlyLaxity"],
    injectable: true,
  },
  {
    id: "prp",
    name: "PRP Treatment",
    path: "/prp-treatment",
    summary: "Regenerative treatment using platelet-rich plasma to support skin renewal.",
    bestFor: ["rejuvenation", "texture", "recoverySupport", "acneMarks"],
    injectable: true,
  },
  {
    id: "exosomes",
    name: "Exosomes",
    path: "/exosomes",
    summary: "Advanced regenerative support for skin recovery and rejuvenation.",
    bestFor: ["regeneration", "recovery", "inflammationSupport", "skinQuality"],
    injectable: true,
  },
  {
    id: "bodySculpting",
    name: "Body Sculpting",
    path: "/body-sculpting-2",
    summary: "Non-surgical contouring for body definition and shape enhancement.",
    bestFor: ["stubbornFat", "bodyContour", "definition"],
    injectable: false,
  },
  {
    id: "fatDissolving",
    name: "Fat Dissolving",
    path: "/body-sculpting-2#fat-dissolving",
    summary: "Targets localized fat pockets in selected treatment areas.",
    bestFor: ["localizedFat", "doubleChin", "contouring"],
    injectable: true,
  },
  {
    id: "teethWhitening",
    name: "Teeth Whitening",
    path: "/teeth-whitening",
    summary: "Professional whitening to brighten smile appearance.",
    bestFor: ["discolouration", "smileBrightness"],
    injectable: false,
  },
  {
    id: "ivDrip",
    name: "IV Vitamin Drip",
    path: "/iv-vitamin-drip",
    summary: "Vitamin and hydration infusion for wellness support.",
    bestFor: ["fatigue", "hydration", "wellnessSupport"],
    injectable: true,
  },
  {
    id: "waxing",
    name: "Waxing",
    path: "/waxing",
    summary: "Professional hair-removal treatment for smooth skin.",
    bestFor: ["unwantedHair", "smoothSkin"],
    injectable: false,
  },
];

export function getTreatmentById(id: string): TreatmentCatalogItem | null {
  const normalized = id.trim().toLowerCase();
  const found = TREATMENT_CATALOG.find((item) => item.id.toLowerCase() === normalized);
  return found ?? null;
}

