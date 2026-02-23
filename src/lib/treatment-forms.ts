export type TreatmentFormConfig = {
  slug: string;
  treatmentName: string;
  treatmentPath: `/${string}`;
  imageSrc: `/${string}`;
  intro: string;
  template: TreatmentFormTemplate;
};

export type TreatmentFormTemplate =
  | "standard"
  | "waxing"
  | "microneedling"
  | "antiWrinkle"
  | "bodySculpting"
  | "dermalFillers"
  | "facials";

const treatmentFormConfigsMap = {
  "anti-wrinkle-injection": {
    slug: "anti-wrinkle-injection",
    treatmentName: "Anti-Wrinkle Injections",
    treatmentPath: "/anti-wrinkle-injection",
    imageSrc: "/images/anti-wrinkle-injection.png",
    intro:
      "Complete your anti-wrinkle consultation and consent details before your appointment to streamline in-clinic assessment.",
    template: "antiWrinkle",
  },
  "body-sculpting-2": {
    slug: "body-sculpting-2",
    treatmentName: "Body Sculpting and Fat Dissolving",
    treatmentPath: "/body-sculpting-2",
    imageSrc: "/images/bodySculpting.png",
    intro:
      "Share contouring goals, treatment history, and consent preferences before your body sculpting or fat dissolving session.",
    template: "bodySculpting",
  },
  "chemical-peels": {
    slug: "chemical-peels",
    treatmentName: "Chemical Peels",
    treatmentPath: "/chemical-peels",
    imageSrc: "/images/chemical-peels.png",
    intro:
      "Provide skin history, sensitivity details, and consent declarations ahead of your chemical peel consultation.",
    template: "standard",
  },
  exosomes: {
    slug: "exosomes",
    treatmentName: "Exosome Therapy",
    treatmentPath: "/exosomes",
    imageSrc: "/images/exosome.png",
    intro:
      "Submit your exosome therapy consultation profile and treatment consent details to support safe clinical planning.",
    template: "standard",
  },
  facials: {
    slug: "facials",
    treatmentName: "Facials",
    treatmentPath: "/facials",
    imageSrc: "/images/advancedFacials.png",
    intro:
      "Share your skin goals and complete consent questions so your facial protocol can be tailored before arrival.",
    template: "facials",
  },
  fillers: {
    slug: "fillers",
    treatmentName: "Dermal Fillers",
    treatmentPath: "/fillers",
    imageSrc: "/images/dermalFillers.png",
    intro:
      "Complete your filler consultation and consent details in advance to support safe, anatomy-led treatment planning.",
    template: "dermalFillers",
  },
  "iv-vitamin-drip": {
    slug: "iv-vitamin-drip",
    treatmentName: "IV Vitamin Drips",
    treatmentPath: "/iv-vitamin-drip",
    imageSrc: "/images/iv-vitamin-drip.png",
    intro:
      "Submit wellness goals, relevant health information, and consent choices before your IV vitamin drip appointment.",
    template: "standard",
  },
  "prp-treatment": {
    slug: "prp-treatment",
    treatmentName: "PRP Treatment",
    treatmentPath: "/prp-treatment",
    imageSrc: "/images/prp-treatment.png",
    intro:
      "Provide your PRP consultation history and complete informed consent checkpoints prior to treatment day.",
    template: "standard",
  },
  "skin-boosters-mesotherapy": {
    slug: "skin-boosters-mesotherapy",
    treatmentName: "Skin Boosters and Mesotherapy",
    treatmentPath: "/skin-boosters-mesotherapy",
    imageSrc: "/images/skin-boosters-mesotherapy.png",
    intro:
      "Complete your skin booster consultation notes and consent declarations before your planned protocol.",
    template: "standard",
  },
  "teeth-whitening": {
    slug: "teeth-whitening",
    treatmentName: "Teeth Whitening",
    treatmentPath: "/teeth-whitening",
    imageSrc: "/images/teeth-whitening.png",
    intro:
      "Share suitability information and complete consent statements before your whitening appointment.",
    template: "standard",
  },
  waxing: {
    slug: "waxing",
    treatmentName: "Waxing",
    treatmentPath: "/waxing",
    imageSrc: "/images/waxing.png",
    intro:
      "Complete pre-appointment consultation and consent details for your waxing treatment area and preferences.",
    template: "waxing",
  },
} as const satisfies Record<string, TreatmentFormConfig>;

const treatmentFormConfigsRecord: Record<string, TreatmentFormConfig> = treatmentFormConfigsMap;

export function getTreatmentFormSlugs(): string[] {
  return Object.keys(treatmentFormConfigsMap);
}

export function getTreatmentFormConfig(slug: string): TreatmentFormConfig | null {
  return treatmentFormConfigsRecord[slug] ?? null;
}
