import { getTreatmentFormConfig, getTreatmentFormSlugs } from "@/src/lib/treatment-forms";

export type AnalyticsPageContext = {
  pageType: string;
  treatmentName?: string;
  contentGroup?: string;
  treatmentCategory?: string;
  treatmentType?: string;
};

const treatmentMetaBySlug: Record<
  string,
  { treatmentCategory: string; treatmentType: string }
> = {
  "anti-wrinkle-injection": {
    treatmentCategory: "injectables",
    treatmentType: "anti_wrinkle",
  },
  "body-sculpting-2": {
    treatmentCategory: "body_contouring",
    treatmentType: "body_sculpting",
  },
  "chemical-peels": {
    treatmentCategory: "skin_rejuvenation",
    treatmentType: "chemical_peel",
  },
  exosomes: {
    treatmentCategory: "regenerative",
    treatmentType: "exosome_therapy",
  },
  facials: {
    treatmentCategory: "facials",
    treatmentType: "facial_treatment",
  },
  fillers: {
    treatmentCategory: "injectables",
    treatmentType: "dermal_fillers",
  },
  "iv-vitamin-drip": {
    treatmentCategory: "wellness",
    treatmentType: "iv_therapy",
  },
  "prp-treatment": {
    treatmentCategory: "regenerative",
    treatmentType: "prp",
  },
  "skin-boosters-mesotherapy": {
    treatmentCategory: "injectables",
    treatmentType: "skin_boosters",
  },
  "teeth-whitening": {
    treatmentCategory: "smile",
    treatmentType: "teeth_whitening",
  },
  waxing: {
    treatmentCategory: "hair_removal",
    treatmentType: "waxing",
  },
};

const staticContexts: Array<[path: string, context: AnalyticsPageContext]> = [
  ["/", { pageType: "homepage", contentGroup: "marketing" }],
  ["/about-us", { pageType: "about_page", contentGroup: "marketing" }],
  ["/blog", { pageType: "blog_index", contentGroup: "blog" }],
  ["/contact-us", { pageType: "contact_page", contentGroup: "lead_generation" }],
  ["/pricing", { pageType: "pricing_page", contentGroup: "pricing" }],
  ["/refer-a-friend", { pageType: "referral_page", contentGroup: "lead_generation" }],
  ["/training", { pageType: "training_page", contentGroup: "training" }],
  ["/treatment", { pageType: "treatment_hub", contentGroup: "treatments" }],
];

export function getAnalyticsPageContext(pathname: string): AnalyticsPageContext {
  const exact = staticContexts.find(([path]) => path === pathname);
  if (exact) {
    return exact[1];
  }

  const treatmentConfig = getTreatmentFormSlugs()
    .map((slug) => getTreatmentFormConfig(slug))
    .find((config) => config?.treatmentPath === pathname);

  if (treatmentConfig) {
    const treatmentMeta = treatmentMetaBySlug[treatmentConfig.slug];
    return {
      pageType: "treatment_page",
      treatmentName: treatmentConfig.treatmentName,
      contentGroup: "treatments",
      treatmentCategory: treatmentMeta?.treatmentCategory,
      treatmentType: treatmentMeta?.treatmentType,
    };
  }

  if (pathname.startsWith("/blog/")) {
    return { pageType: "blog_post", contentGroup: "blog" };
  }

  if (pathname.startsWith("/forms/")) {
    const slug = pathname.replace("/forms/", "");
    const config = getTreatmentFormConfig(slug);
    return {
      pageType: "consultation_form",
      contentGroup: "forms",
      treatmentName: config?.treatmentName,
    };
  }

  if (pathname.startsWith("/guidelines/")) {
    const slug = pathname.replace("/guidelines/", "");
    const config = getTreatmentFormConfig(slug);
    return {
      pageType: "treatment_guidelines",
      contentGroup: "guidelines",
      treatmentName: config?.treatmentName,
    };
  }

  return { pageType: "website_page" };
}
