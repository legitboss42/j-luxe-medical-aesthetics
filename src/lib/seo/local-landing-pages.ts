export type LocalLandingFaq = {
  question: string;
  answer: string;
};

export type LocalLandingResource = {
  label: string;
  href: string;
};

export type LocalAreaSlug =
  | "hackney"
  | "hoxton"
  | "bow"
  | "canary-wharf"
  | "stoke-newington"
  | "whitechapel"
  | "islington"
  | "shoreditch"
  | "dalston"
  | "bethnal-green"
  | "stratford";

export type LocalTreatmentSlug =
  | "anti-wrinkle-injections"
  | "dermal-fillers"
  | "facials"
  | "chemical-peels"
  | "body-sculpting"
  | "skin-boosters"
  | "exosomes";

export type LocalLandingPageConfig = {
  locationSlug: LocalAreaSlug;
  locationName: string;
  regionLabel: string;
  slug: LocalTreatmentSlug;
  path: `/${string}/${string}`;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  serviceLabel: string;
  treatmentName: string;
  treatmentCategory: string;
  treatmentType: string;
  image: string;
  imageAlt: string;
  servicePageHref: string;
  bookingHref: string;
  chips: string[];
  highlights: string[];
  idealFor: string[];
  whyChoose: string[];
  nearbyAreas: string[];
  faqs: LocalLandingFaq[];
  resources: LocalLandingResource[];
};

type LocalAreaConfig = {
  slug: LocalAreaSlug;
  name: string;
  regionLabel: string;
  nearbyAreas: string[];
  bookingIntentLabel: string;
  treatmentSlugs: LocalTreatmentSlug[];
};

type LocalTreatmentTemplate = {
  slug: LocalTreatmentSlug;
  titleBase: string;
  serviceLabel: string;
  treatmentName: string;
  treatmentCategory: string;
  treatmentType: string;
  image: string;
  servicePageHref: string;
  bookingHref: string;
  imageAlt: (locationName: string) => string;
  primaryKeyword: (locationName: string) => string;
  secondaryKeywords: (locationName: string, regionLabel: string) => string[];
  heroDescription: (locationName: string, regionLabel: string) => string;
  chips: (locationName: string) => string[];
  highlights: (locationName: string, regionLabel: string) => string[];
  idealFor: (locationName: string) => string[];
  whyChoose: (locationName: string, regionLabel: string) => string[];
  faqs: (locationName: string) => LocalLandingFaq[];
  resources: LocalLandingResource[];
};

const localAreaConfigs: readonly LocalAreaConfig[] = [
  {
    slug: "hackney",
    name: "Hackney",
    regionLabel: "East London",
    nearbyAreas: ["Dalston", "Bethnal Green", "Shoreditch", "Islington", "Stratford"],
    bookingIntentLabel: "Hackney Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "body-sculpting",
    ],
  },
  {
    slug: "hoxton",
    name: "Hoxton",
    regionLabel: "East London",
    nearbyAreas: ["Shoreditch", "Hackney", "Bethnal Green", "Dalston", "Islington"],
    bookingIntentLabel: "Hoxton Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "skin-boosters",
    ],
  },
  {
    slug: "bow",
    name: "Bow",
    regionLabel: "East London",
    nearbyAreas: ["Stratford", "Whitechapel", "Bethnal Green", "Hackney", "Canary Wharf"],
    bookingIntentLabel: "Bow Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "body-sculpting",
    ],
  },
  {
    slug: "canary-wharf",
    name: "Canary Wharf",
    regionLabel: "East London",
    nearbyAreas: ["Whitechapel", "Bow", "Stratford", "Bethnal Green", "Shoreditch"],
    bookingIntentLabel: "Canary Wharf Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "skin-boosters",
    ],
  },
  {
    slug: "stoke-newington",
    name: "Stoke Newington",
    regionLabel: "North East London",
    nearbyAreas: ["Dalston", "Hackney", "Islington", "Hoxton", "Bethnal Green"],
    bookingIntentLabel: "Stoke Newington Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "skin-boosters",
    ],
  },
  {
    slug: "whitechapel",
    name: "Whitechapel",
    regionLabel: "East London",
    nearbyAreas: ["Bethnal Green", "Bow", "Canary Wharf", "Shoreditch", "Hackney"],
    bookingIntentLabel: "Whitechapel Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "body-sculpting",
    ],
  },
  {
    slug: "islington",
    name: "Islington",
    regionLabel: "North London",
    nearbyAreas: ["Angel", "Highbury", "Canonbury", "Dalston", "Hackney"],
    bookingIntentLabel: "Islington Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "skin-boosters",
    ],
  },
  {
    slug: "shoreditch",
    name: "Shoreditch",
    regionLabel: "East London",
    nearbyAreas: ["Hoxton", "Bethnal Green", "Hackney", "Liverpool Street", "Dalston"],
    bookingIntentLabel: "Shoreditch Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "skin-boosters",
    ],
  },
  {
    slug: "dalston",
    name: "Dalston",
    regionLabel: "East London",
    nearbyAreas: ["Hackney", "Stoke Newington", "Islington", "Shoreditch", "Bethnal Green"],
    bookingIntentLabel: "Dalston Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "body-sculpting",
    ],
  },
  {
    slug: "bethnal-green",
    name: "Bethnal Green",
    regionLabel: "East London",
    nearbyAreas: ["Shoreditch", "Hackney", "Whitechapel", "Stratford", "Dalston"],
    bookingIntentLabel: "Bethnal Green Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "skin-boosters",
    ],
  },
  {
    slug: "stratford",
    name: "Stratford",
    regionLabel: "East London",
    nearbyAreas: ["Hackney", "Leyton", "Canary Wharf", "Bethnal Green", "Bow"],
    bookingIntentLabel: "Stratford Booking Page",
    treatmentSlugs: [
      "anti-wrinkle-injections",
      "dermal-fillers",
      "facials",
      "chemical-peels",
      "body-sculpting",
    ],
  },
] as const;

const localTreatmentTemplates: Record<LocalTreatmentSlug, LocalTreatmentTemplate> = {
  "anti-wrinkle-injections": {
    slug: "anti-wrinkle-injections",
    titleBase: "Anti-Wrinkle Injections",
    serviceLabel: "Anti-Wrinkle Injections",
    treatmentName: "anti-wrinkle-injection",
    treatmentCategory: "injectables",
    treatmentType: "anti_wrinkle",
    image: "/images/anti-wrinkle-injection.png",
    servicePageHref: "/anti-wrinkle-injection",
    bookingHref: "/pricing",
    imageAlt: (locationName) => `Anti-wrinkle injections in ${locationName} London at J Luxe Medical Aesthetics`,
    primaryKeyword: (locationName) => `anti-wrinkle injections ${locationName} London`,
    secondaryKeywords: (locationName, regionLabel) => [
      `Botox ${locationName}`,
      `anti wrinkle injections ${locationName}`,
      `book Botox ${locationName}`,
      `Botox ${regionLabel}`,
      `${locationName} anti-wrinkle clinic`,
    ],
    heroDescription: (locationName) =>
      `Book consultation-led anti-wrinkle treatment for ${locationName} clients who want smoother expression lines, balanced dosing, and a fast route from local search to appointment booking.`,
    chips: (locationName) => [
      `${locationName} Botox Searches`,
      "Consultation-Led Planning",
      "Natural Expression Preservation",
    ],
    highlights: (locationName, regionLabel) => [
      `Designed for clients searching ${locationName} terms who want to compare, decide, and book quickly.`,
      `Supports forehead lines, frown lines, and crow's feet treatment planning with natural-looking results in mind.`,
      `Useful for ${regionLabel} visitors who want a direct path into consultation and pricing rather than general information only.`,
    ],
    idealFor: (locationName) => [
      `People in ${locationName} searching Botox or anti-wrinkle injections with real booking intent.`,
      "Clients who want smoother expression lines without a frozen look.",
      "Anyone comparing anti-wrinkle injections with fillers and wanting proper guidance first.",
    ],
    whyChoose: (locationName, regionLabel) => [
      `This page is written to capture ${locationName} booking searches and move them into consultation fast.`,
      "Natural-results planning, suitability-first treatment decisions, and clear aftercare support.",
      `Strong fit for ${regionLabel} clients who care more about choosing and booking the right service than reading generic information.`,
    ],
    faqs: (locationName) => [
      {
        question: `Can I book anti-wrinkle injections if I am searching from ${locationName}?`,
        answer:
          "Yes. This page is built to help local search visitors move quickly into consultation, pricing, and booking with J Luxe Medical Aesthetics.",
      },
      {
        question: "Do I have to decide the treatment before booking?",
        answer:
          "No. If you are not sure, booking a consultation or messaging on WhatsApp is the best route before treatment is selected.",
      },
      {
        question: `Why create a local ${locationName} page?`,
        answer:
          "Because booking-intent searches often include both the treatment and the area, and this page is designed to meet that commercial search behaviour directly.",
      },
    ],
    resources: [
      { label: "View full anti-wrinkle treatment page", href: "/anti-wrinkle-injection" },
      { label: "Read anti-wrinkle treatment guide", href: "/blog/anti-wrinkle-treatment-what-you-should-know" },
    ],
  },
  "dermal-fillers": {
    slug: "dermal-fillers",
    titleBase: "Dermal Fillers",
    serviceLabel: "Dermal Fillers",
    treatmentName: "fillers",
    treatmentCategory: "injectables",
    treatmentType: "dermal_fillers",
    image: "/images/dermalFillers.png",
    servicePageHref: "/fillers",
    bookingHref: "/pricing",
    imageAlt: (locationName) => `Dermal fillers in ${locationName} London at J Luxe Medical Aesthetics`,
    primaryKeyword: (locationName) => `dermal fillers ${locationName} London`,
    secondaryKeywords: (locationName, regionLabel) => [
      `lip fillers ${locationName}`,
      `dermal fillers ${locationName}`,
      `book lip fillers ${locationName}`,
      `lip fillers ${regionLabel}`,
      `${locationName} filler clinic`,
    ],
    heroDescription: (locationName) =>
      `Book consultation-led dermal filler treatment for lips, contouring, and facial balance if you are searching from ${locationName} and want a faster route into safe, natural-looking enhancement.`,
    chips: (locationName) => [
      `${locationName} Filler Searches`,
      "Lip Filler Consultation",
      "Facial Balance Planning",
    ],
    highlights: (locationName, regionLabel) => [
      `Built for people searching dermal fillers in ${locationName} who are already comparing clinics and looking to book.`,
      "Supports lips, contouring, and structure-led planning with suitability assessed first.",
      `Useful for ${regionLabel} clients who want a commercial booking page rather than a filler explainer article.`,
    ],
    idealFor: (locationName) => [
      `People searching dermal fillers, lip fillers, or facial contouring in ${locationName}.`,
      "Clients wanting a consultation-first approach before choosing the exact filler plan.",
      "Anyone looking for safe, balanced enhancement rather than overfilled results.",
    ],
    whyChoose: (locationName, regionLabel) => [
      `Targets high-intent filler searches from ${locationName} and nearby areas.`,
      "Clear booking routes, WhatsApp support, and direct links into pricing and treatment details.",
      `More useful for ${regionLabel} booking intent than a broad informational filler page alone.`,
    ],
    faqs: (locationName) => [
      {
        question: `Can I book dermal fillers if I am based in ${locationName}?`,
        answer:
          "Yes. This page is designed for local booking-intent searches and gives a direct route into consultation and pricing.",
      },
      {
        question: "Do I need to know the exact filler area before booking?",
        answer:
          "No. Consultation is the best place to decide whether lips, contouring, or another filler route is the right fit.",
      },
      {
        question: `Why focus on dermal fillers in ${locationName}?`,
        answer:
          "Because local filler searches are commercial. People searching this way usually want to compare clinics and book, not just browse.",
        },
    ],
    resources: [
      { label: "View full dermal fillers page", href: "/fillers" },
      { label: "Read dermal fillers guide", href: "/blog/ultimate-guide-to-dermal-fillers" },
    ],
  },
  facials: {
    slug: "facials",
    titleBase: "Facials",
    serviceLabel: "Facials",
    treatmentName: "facials",
    treatmentCategory: "facials",
    treatmentType: "facial_treatment",
    image: "/images/advancedFacials.png",
    servicePageHref: "/facials",
    bookingHref: "/pricing",
    imageAlt: (locationName) => `Facials in ${locationName} London at J Luxe Medical Aesthetics`,
    primaryKeyword: (locationName) => `facials ${locationName} London`,
    secondaryKeywords: (locationName, regionLabel) => [
      `Hydrafacial ${locationName}`,
      `facials ${locationName}`,
      `book facial ${locationName}`,
      `Hydrafacial ${regionLabel}`,
      `${locationName} facial clinic`,
    ],
    heroDescription: (locationName) =>
      `Book facials for hydration, glow, congestion, acne-prone skin, and overall skin quality if you are searching from ${locationName} and want a direct route into consultation and treatment planning.`,
    chips: (locationName) => [
      `${locationName} Facial Searches`,
      "Hydrafacial Interest",
      "Skin Consultation First",
    ],
    highlights: (locationName, regionLabel) => [
      `Designed for clients searching facials or Hydrafacial in ${locationName} with booking intent.`,
      "Supports skin goals like hydration, glow, congestion management, and maintenance planning.",
      `Useful for ${regionLabel} searchers who want a commercial service page, not just a beauty-content article.`,
    ],
    idealFor: (locationName) => [
      `People searching for facials or Hydrafacial in ${locationName}.`,
      "Clients who want a consultation-led route into the right skin treatment instead of guessing.",
      "Anyone looking for skin improvement and ongoing maintenance booking options.",
    ],
    whyChoose: (locationName, regionLabel) => [
      `Targets local facial booking searches from ${locationName}.`,
      "Connects visitors directly to pricing, WhatsApp support, and the full facials service page.",
      `Built to convert ${regionLabel} skin-treatment traffic into real consultations and bookings.`,
    ],
    faqs: (locationName) => [
      {
        question: `Can I book facials if I found you by searching ${locationName}?`,
        answer:
          "Yes. This page is designed for local facial searchers who want a quick route into treatment selection and booking.",
      },
      {
        question: "Do I need to choose the exact facial before booking?",
        answer:
          "No. If you are unsure, consultation-led planning is the safest and fastest route to the right facial plan.",
      },
      {
        question: `Why optimize facials for ${locationName}?`,
        answer:
          "Because local facial and Hydrafacial searches often come from visitors ready to compare clinics and book soon.",
      },
    ],
    resources: [
      { label: "View full facials page", href: "/facials" },
      { label: "Read microneedling and skin-treatment guide", href: "/blog/microneedling-treatment-what-you-should-know" },
    ],
  },
  "chemical-peels": {
    slug: "chemical-peels",
    titleBase: "Chemical Peels",
    serviceLabel: "Chemical Peels",
    treatmentName: "chemical-peels",
    treatmentCategory: "skin_rejuvenation",
    treatmentType: "chemical_peel",
    image: "/images/chemical-peels.png",
    servicePageHref: "/chemical-peels",
    bookingHref: "/pricing",
    imageAlt: (locationName) => `Chemical peels in ${locationName} London at J Luxe Medical Aesthetics`,
    primaryKeyword: (locationName) => `chemical peels ${locationName} London`,
    secondaryKeywords: (locationName, regionLabel) => [
      `chemical peel ${locationName}`,
      `BioRePeel ${locationName}`,
      `book chemical peel ${locationName}`,
      `chemical peel ${regionLabel}`,
      `${locationName} skin peel clinic`,
    ],
    heroDescription: (locationName) =>
      `Book consultation-led chemical peels for texture, pigmentation, acne marks, and skin clarity if you are searching from ${locationName} and want a clear route into treatment and pricing.`,
    chips: (locationName) => [
      `${locationName} Peel Searches`,
      "Pigmentation Support",
      "Skin Renewal Planning",
    ],
    highlights: (locationName, regionLabel) => [
      `Built for visitors searching chemical peels in ${locationName} with booking intent.`,
      "Useful for tone, texture, clarity, and overall skin-renewal goals.",
      `A stronger commercial route for ${regionLabel} peel searches than a generic skincare article.`,
    ],
    idealFor: (locationName) => [
      `People searching chemical peels or BioRePeel in ${locationName}.`,
      "Clients focused on pigmentation, texture, breakouts, or rejuvenation goals.",
      "Anyone who wants consultation-led peel selection before booking.",
    ],
    whyChoose: (locationName, regionLabel) => [
      `Targets high-intent peel searches from ${locationName}.`,
      "Moves search visitors toward booking, pricing, and WhatsApp support quickly.",
      `Helps convert ${regionLabel} commercial peel traffic instead of only attracting informational views.`,
    ],
    faqs: (locationName) => [
      {
        question: `Can I book a chemical peel from this ${locationName} page?`,
        answer:
          "Yes. The page is designed to connect local commercial search traffic directly to consultation and pricing.",
      },
      {
        question: "Do I need to know which peel I need first?",
        answer:
          "No. A consultation is the best place to select the right peel based on your skin goals and suitability.",
      },
      {
        question: `Why optimize chemical peels for ${locationName}?`,
        answer:
          "Because local peel searches often come from people ready to compare clinics and book a service, not just read about skincare.",
      },
    ],
    resources: [
      { label: "View full chemical peels page", href: "/chemical-peels" },
      { label: "Read how to prepare for a chemical peel", href: "/blog/preparing-for-chemical-peel" },
    ],
  },
  "body-sculpting": {
    slug: "body-sculpting",
    titleBase: "Body Sculpting",
    serviceLabel: "Body Sculpting",
    treatmentName: "body-sculpting-2",
    treatmentCategory: "body",
    treatmentType: "body_sculpting",
    image: "/images/bodySculpting.png",
    servicePageHref: "/body-sculpting-2",
    bookingHref: "/pricing",
    imageAlt: (locationName) => `Body sculpting in ${locationName} London at J Luxe Medical Aesthetics`,
    primaryKeyword: (locationName) => `body sculpting ${locationName} London`,
    secondaryKeywords: (locationName, regionLabel) => [
      `fat dissolving injections ${locationName}`,
      `body sculpting ${locationName}`,
      `Lemon Bottle ${locationName}`,
      `body contouring ${regionLabel}`,
      `book body sculpting ${locationName}`,
    ],
    heroDescription: (locationName) =>
      `Book consultation-led body sculpting for contouring, stubborn areas, and fat dissolving support if you are searching from ${locationName} and want a direct route into pricing and treatment selection.`,
    chips: (locationName) => [
      `${locationName} Body Searches`,
      "Fat Dissolving Interest",
      "Contour Consultation",
    ],
    highlights: (locationName, regionLabel) => [
      `Supports commercial searches for body sculpting, fat dissolving, and contouring in ${locationName}.`,
      "Useful for people comparing contour options and wanting a clinician-led booking route.",
      `Stronger match for ${regionLabel} booking intent than broad body-treatment content.`,
    ],
    idealFor: (locationName) => [
      `People searching body sculpting or fat dissolving in ${locationName}.`,
      "Clients comparing Lemon Bottle, contouring support, or localized treatment options.",
      "Anyone who wants clarity on the right body route before booking.",
    ],
    whyChoose: (locationName, regionLabel) => [
      `Targets local contouring and fat-dissolving searches from ${locationName}.`,
      "Built around booking behaviour with direct pricing and WhatsApp pathways.",
      `Helps convert ${regionLabel} body-treatment interest into real consultations.`,
    ],
    faqs: (locationName) => [
      {
        question: `Can I book body sculpting if I found you by searching ${locationName}?`,
        answer:
          "Yes. This page gives a local route into treatment guidance, consultation, and booking.",
      },
      {
        question: "Is body sculpting the same as fat dissolving?",
        answer:
          "Not always. Consultation is the safest way to decide which contouring route fits your goals best.",
      },
      {
        question: `Why build a ${locationName} body sculpting page?`,
        answer:
          "Because local commercial searches often include both the area and the service, and this page is designed to capture that booking intent directly.",
      },
    ],
    resources: [
      { label: "View full body sculpting page", href: "/body-sculpting-2" },
      { label: "Read Lemon Bottle body contouring article", href: "/blog/lemon-bottle-fat-dissolving" },
    ],
  },
  "skin-boosters": {
    slug: "skin-boosters",
    titleBase: "Skin Boosters",
    serviceLabel: "Skin Boosters",
    treatmentName: "skin-boosters-mesotherapy",
    treatmentCategory: "injectables",
    treatmentType: "skin_boosters",
    image: "/images/skin-boosters-mesotherapy.png",
    servicePageHref: "/skin-boosters-mesotherapy",
    bookingHref: "/pricing",
    imageAlt: (locationName) => `Skin boosters in ${locationName} London at J Luxe Medical Aesthetics`,
    primaryKeyword: (locationName) => `skin boosters ${locationName} London`,
    secondaryKeywords: (locationName, regionLabel) => [
      `skin boosters ${locationName}`,
      `mesotherapy ${locationName}`,
      `Profhilo ${locationName}`,
      `book skin boosters ${locationName}`,
      `skin boosters ${regionLabel}`,
    ],
    heroDescription: (locationName) =>
      `Book consultation-led skin boosters for hydration, smoother texture, and stronger skin quality if you are searching from ${locationName} and want a more direct route into treatment planning.`,
    chips: (locationName) => [
      `${locationName} Skin Booster Searches`,
      "Hydration-Focused Care",
      "Injectable Skin Quality Support",
    ],
    highlights: (locationName, regionLabel) => [
      `Built for clients searching skin boosters in ${locationName} with booking intent.`,
      "Useful for hydration, texture, and skin-quality improvement goals.",
      `A stronger commercial route for ${regionLabel} injectable skin searches than informational articles alone.`,
    ],
    idealFor: (locationName) => [
      `People searching skin boosters, mesotherapy, or Profhilo in ${locationName}.`,
      "Clients wanting an injectable skin-quality treatment rather than volume change.",
      "Anyone who wants a consultation before choosing the exact booster route.",
    ],
    whyChoose: (locationName, regionLabel) => [
      `Targets local skin-booster booking searches from ${locationName}.`,
      "Supports faster movement into pricing, WhatsApp guidance, and consultation booking.",
      `Helps convert ${regionLabel} skin-quality interest into treatment consultations.`,
    ],
    faqs: (locationName) => [
      {
        question: `Can I book skin boosters if I am searching from ${locationName}?`,
        answer:
          "Yes. This page is built for local service-intent traffic and connects directly to consultation and pricing.",
      },
      {
        question: "Do I need to know the exact product before booking?",
        answer:
          "No. Consultation is the best place to decide whether skin boosters or another skin route is the better fit.",
      },
      {
        question: `Why optimize skin boosters for ${locationName}?`,
        answer:
          "Because people using both the location and the treatment in search are usually much closer to booking intent.",
      },
    ],
    resources: [
      { label: "View full skin boosters page", href: "/skin-boosters-mesotherapy" },
      { label: "View pricing and book consultation", href: "/pricing" },
    ],
  },
  exosomes: {
    slug: "exosomes",
    titleBase: "Exosomes Treatment",
    serviceLabel: "Exosomes Treatment",
    treatmentName: "exosomes",
    treatmentCategory: "regenerative",
    treatmentType: "exosome_therapy",
    image: "/images/exosome.png",
    servicePageHref: "/exosomes",
    bookingHref: "/pricing",
    imageAlt: (locationName) => `Exosomes treatment in ${locationName} London at J Luxe Medical Aesthetics`,
    primaryKeyword: (locationName) => `exosomes treatment ${locationName} London`,
    secondaryKeywords: (locationName, regionLabel) => [
      `exosomes treatment ${locationName}`,
      `exosome facial ${locationName}`,
      `book exosomes ${locationName}`,
      `regenerative skin treatment ${regionLabel}`,
      `${locationName} exosome clinic`,
    ],
    heroDescription: (locationName) =>
      `Book consultation-led exosomes treatment for advanced skin rejuvenation if you are searching from ${locationName} and want a premium regenerative option with a direct route into appointment planning.`,
    chips: (locationName) => [
      `${locationName} Exosome Searches`,
      "Regenerative Skin Focus",
      "Premium Consultation Route",
    ],
    highlights: (locationName, regionLabel) => [
      `Built for high-intent exosomes treatment searches coming from ${locationName}.`,
      "Useful for clients comparing advanced regenerative skin options and wanting to book, not just browse.",
      `A stronger fit for premium ${regionLabel} skin-rejuvenation demand than generic educational content.`,
    ],
    idealFor: (locationName) => [
      `People searching exosomes treatment in ${locationName}.`,
      "Clients interested in advanced regenerative skin support.",
      "Anyone comparing exosomes with other rejuvenation routes before booking.",
    ],
    whyChoose: (locationName, regionLabel) => [
      `Targets premium booking-intent searches from ${locationName}.`,
      "Moves local regenerative-treatment interest into consultation and pricing faster.",
      `Helps convert ${regionLabel} exosome searches into real clinic enquiries.`,
    ],
    faqs: (locationName) => [
      {
        question: `Can I book exosomes treatment if I am searching from ${locationName}?`,
        answer:
          "Yes. This page gives a direct commercial route into consultation, pricing, and treatment exploration.",
      },
      {
        question: "Is exosomes treatment right for everyone?",
        answer:
          "No. Consultation-led planning is important to decide whether regenerative treatment is the right fit for your skin goals.",
      },
      {
        question: `Why target exosomes treatment in ${locationName}?`,
        answer:
          "Because premium skin-rejuvenation searches with a location attached are usually much closer to booking intent than broad informational searches.",
      },
    ],
    resources: [
      { label: "View full exosomes treatment page", href: "/exosomes" },
      { label: "Read exosomes vs PRP article", href: "/blog/exosomes-vs-prp" },
    ],
  },
};

function createLocalLandingPage(area: LocalAreaConfig, treatmentSlug: LocalTreatmentSlug): LocalLandingPageConfig {
  const treatment = localTreatmentTemplates[treatmentSlug];
  const title = `${treatment.titleBase} in ${area.name} London`;

  return {
    locationSlug: area.slug,
    locationName: area.name,
    regionLabel: area.regionLabel,
    slug: treatment.slug,
    path: `/${area.slug}/${treatment.slug}`,
    title,
    metaTitle: `${title} | Book Consultation | J Luxe`,
    metaDescription: `Looking to book ${treatment.serviceLabel.toLowerCase()} in ${area.name} London? Book consultation-led treatment at J Luxe Medical Aesthetics with fast pricing, WhatsApp guidance, and local booking support.`,
    heroEyebrow: area.bookingIntentLabel,
    heroTitle: title,
    heroDescription: treatment.heroDescription(area.name, area.regionLabel),
    primaryKeyword: treatment.primaryKeyword(area.name),
    secondaryKeywords: treatment.secondaryKeywords(area.name, area.regionLabel),
    serviceLabel: treatment.serviceLabel,
    treatmentName: treatment.treatmentName,
    treatmentCategory: treatment.treatmentCategory,
    treatmentType: treatment.treatmentType,
    image: treatment.image,
    imageAlt: treatment.imageAlt(area.name),
    servicePageHref: treatment.servicePageHref,
    bookingHref: treatment.bookingHref,
    chips: treatment.chips(area.name),
    highlights: treatment.highlights(area.name, area.regionLabel),
    idealFor: treatment.idealFor(area.name),
    whyChoose: treatment.whyChoose(area.name, area.regionLabel),
    nearbyAreas: area.nearbyAreas,
    faqs: treatment.faqs(area.name),
    resources: treatment.resources,
  };
}

export const localAreaSlugs = localAreaConfigs.map((area) => area.slug);

export const localLandingPages = localAreaConfigs.flatMap((area) =>
  area.treatmentSlugs.map((treatmentSlug) => createLocalLandingPage(area, treatmentSlug)),
);

export const featuredLocalBookingLinks = [
  { label: "Anti-Wrinkle in Hackney", href: "/hackney/anti-wrinkle-injections" },
  { label: "Dermal Fillers in Hoxton", href: "/hoxton/dermal-fillers" },
  { label: "Facials in Bow", href: "/bow/facials" },
  { label: "Facials in Islington", href: "/islington/facials" },
  { label: "Chemical Peels in Shoreditch", href: "/shoreditch/chemical-peels" },
  { label: "Anti-Wrinkle in Dalston", href: "/dalston/anti-wrinkle-injections" },
  { label: "Dermal Fillers in Bethnal Green", href: "/bethnal-green/dermal-fillers" },
  { label: "Body Sculpting in Stratford", href: "/stratford/body-sculpting" },
  { label: "Chemical Peels in Canary Wharf", href: "/canary-wharf/chemical-peels" },
  { label: "Skin Boosters in Stoke Newington", href: "/stoke-newington/skin-boosters" },
] as const;

export function getLocalLandingPage(locationSlug: string, slug: string) {
  return localLandingPages.find(
    (page) => page.locationSlug === locationSlug && page.slug === slug,
  );
}

export function getLocalLandingPagesForArea(locationSlug: string) {
  return localLandingPages.filter((page) => page.locationSlug === locationSlug);
}





