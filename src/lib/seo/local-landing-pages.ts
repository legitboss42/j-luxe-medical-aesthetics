export type LocalLandingFaq = {
  question: string;
  answer: string;
};

export type LocalLandingResource = {
  label: string;
  href: string;
};

export type LocalLandingPageConfig = {
  slug: string;
  path: `/hackney/${string}`;
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

export const localLandingPages = [
  {
    slug: "anti-wrinkle-injections",
    path: "/hackney/anti-wrinkle-injections",
    title: "Anti-Wrinkle Injections in Hackney London",
    metaTitle: "Anti-Wrinkle Injections in Hackney London | J Luxe",
    metaDescription:
      "Looking for anti-wrinkle injections in Hackney London? Book consultation-led treatment at J Luxe Medical Aesthetics for natural-looking smoothing and balanced results.",
    heroEyebrow: "Hackney Booking Page",
    heroTitle: "Anti-Wrinkle Injections in Hackney London",
    heroDescription:
      "Consultation-led anti-wrinkle treatment for smoother expression lines, balanced dosing, and refreshed results that still look like you.",
    primaryKeyword: "anti-wrinkle injections Hackney London",
    secondaryKeywords: [
      "Botox Hackney",
      "anti-wrinkle treatment Hackney",
      "Botox East London",
      "forehead line treatment Hackney",
      "crow's feet treatment Hackney",
    ],
    serviceLabel: "Anti-Wrinkle Injections",
    treatmentName: "anti-wrinkle-injection",
    treatmentCategory: "injectables",
    treatmentType: "anti_wrinkle",
    image: "/images/anti-wrinkle-injection.png",
    imageAlt: "Anti-wrinkle injections in Hackney London at J Luxe Medical Aesthetics",
    servicePageHref: "/anti-wrinkle-injection",
    bookingHref: "/pricing",
    chips: ["Botox Consultation-Led Planning", "Natural Expression Preservation", "Hackney Clinic Access"],
    highlights: [
      "Upper-face line softening with natural-looking facial movement still preserved.",
      "Consultation-first planning around treatment goals, lifestyle, and maintenance expectations.",
      "Convenient Hackney location for clients traveling from East London and surrounding areas.",
    ],
    idealFor: [
      "Forehead lines, frown lines, and crow's feet concerns.",
      "Clients wanting a softer and more rested look without looking overdone.",
      "Clients comparing anti-wrinkle injections with fillers and wanting guidance first.",
    ],
    whyChoose: [
      "Medically led planning focused on facial harmony and dose precision.",
      "Natural-results approach with clear aftercare and review expectations.",
      "Direct booking, WhatsApp guidance, and easy progression into consultation.",
    ],
    nearbyAreas: ["Dalston", "Stoke Newington", "Islington", "Homerton", "Bethnal Green"],
    faqs: [
      {
        question: "How soon can I book anti-wrinkle treatment in Hackney?",
        answer:
          "You can book directly through the pricing page or message the clinic first on WhatsApp if you want help deciding before your appointment.",
      },
      {
        question: "Do I need a consultation first?",
        answer:
          "Yes. Every anti-wrinkle plan is consultation-led so your anatomy, goals, and suitability are checked before treatment proceeds.",
      },
      {
        question: "Is this page only for Hackney clients?",
        answer:
          "No. It is written for people searching in and around Hackney, but the clinic also welcomes clients traveling from wider East London.",
      },
    ],
    resources: [
      { label: "View full anti-wrinkle treatment page", href: "/anti-wrinkle-injection" },
      { label: "Read anti-wrinkle guide", href: "/blog/anti-wrinkle-treatment-what-you-should-know" },
    ],
  },
  {
    slug: "dermal-fillers",
    path: "/hackney/dermal-fillers",
    title: "Dermal Fillers in Hackney London",
    metaTitle: "Dermal Fillers in Hackney London | J Luxe",
    metaDescription:
      "Searching for dermal fillers in Hackney London? Explore consultation-led lip, cheek, jawline, and facial contouring treatments at J Luxe Medical Aesthetics.",
    heroEyebrow: "Hackney Booking Page",
    heroTitle: "Dermal Fillers in Hackney London",
    heroDescription:
      "Consultation-led filler treatment for lips, contouring, profile balancing, and refreshed facial definition with a natural-results focus.",
    primaryKeyword: "dermal fillers Hackney London",
    secondaryKeywords: [
      "lip fillers Hackney",
      "dermal filler clinic Hackney",
      "cheek filler Hackney",
      "jawline filler Hackney",
      "lip fillers East London",
    ],
    serviceLabel: "Dermal Fillers",
    treatmentName: "fillers",
    treatmentCategory: "injectables",
    treatmentType: "dermal_fillers",
    image: "/images/dermalFillers.png",
    imageAlt: "Dermal fillers in Hackney London at J Luxe Medical Aesthetics",
    servicePageHref: "/fillers",
    bookingHref: "/pricing",
    chips: ["Lip, Cheek and Jawline Options", "Anatomy-Led Planning", "Hackney Consultation-Led Care"],
    highlights: [
      "Treatment options for lips, cheeks, jawline, chin, tear trough, and profile balancing.",
      "Suitable for clients seeking structure, refinement, or subtle restoration rather than an overfilled look.",
      "Built around a medically led assessment so treatment choice matches your face rather than trends.",
    ],
    idealFor: [
      "Lip enhancement with shape, symmetry, or hydration goals.",
      "Facial contouring for cheeks, jawline, chin, and profile refinement.",
      "Clients wanting guidance on filler versus lip booster or dissolving support.",
    ],
    whyChoose: [
      "Natural, confidence-first treatment planning rather than one-size-fits-all filler placement.",
      "A clear route into consultation, pricing, and direct support if you are comparing options.",
      "Strong local relevance for people specifically searching Hackney and East London filler care.",
    ],
    nearbyAreas: ["Hackney Central", "Canonbury", "Clapton", "Shoreditch", "Bethnal Green"],
    faqs: [
      {
        question: "Can I book lip fillers directly from this page?",
        answer:
          "Yes. You can move into pricing and booking from here, or go to the full dermal filler page if you want to compare treatment areas first.",
      },
      {
        question: "What if I do not know which filler area I need?",
        answer:
          "That is exactly what the consultation is for. You can also message the clinic on WhatsApp before booking if you want early guidance.",
      },
      {
        question: "Do you only treat clients from Hackney?",
        answer:
          "No. Hackney is the local search focus, but the clinic also serves clients from surrounding East London areas.",
      },
    ],
    resources: [
      { label: "View full dermal fillers page", href: "/fillers" },
      { label: "Read the dermal fillers guide", href: "/blog/ultimate-guide-to-dermal-fillers" },
    ],
  },
  {
    slug: "facials",
    path: "/hackney/facials",
    title: "Facials in Hackney London",
    metaTitle: "Facials in Hackney London | J Luxe",
    metaDescription:
      "Looking for facials in Hackney London? Discover consultation-led facials, Hydrafacial, acne care, glow treatments, and skin planning at J Luxe Medical Aesthetics.",
    heroEyebrow: "Hackney Booking Page",
    heroTitle: "Facials in Hackney London",
    heroDescription:
      "Consultation-led facial treatments for glow, hydration, congestion, texture concerns, and skin confidence at our Hackney clinic.",
    primaryKeyword: "facials Hackney London",
    secondaryKeywords: [
      "Hydrafacial Hackney",
      "facial clinic Hackney",
      "glow facial Hackney",
      "skin treatment Hackney",
      "facials East London",
    ],
    serviceLabel: "Facials",
    treatmentName: "facials",
    treatmentCategory: "skin",
    treatmentType: "facials",
    image: "/images/advancedFacials.png",
    imageAlt: "Facials in Hackney London at J Luxe Medical Aesthetics",
    servicePageHref: "/facials",
    bookingHref: "/pricing",
    chips: ["Hydrafacial and Glow Options", "Consultation-Led Skin Planning", "Hackney Skin Treatments"],
    highlights: [
      "Facial options include express, classic, Hydrafacial, acne, anti-ageing, luxury, and back facials.",
      "Strong fit for clients wanting visible glow, congestion support, or a more structured skin-maintenance routine.",
      "Great entry-point treatment for people starting their aesthetics journey in Hackney.",
    ],
    idealFor: [
      "Dull skin, dehydration, breakouts, congestion, and event prep.",
      "Clients who want a safer first step before more advanced skin treatments.",
      "People searching for Hydrafacial or professional facial treatment in Hackney.",
    ],
    whyChoose: [
      "Consultation-led matching of facial type to your current skin condition and goals.",
      "Easy progression from WhatsApp questions into treatment booking.",
      "Premium clinic presentation that supports both trust and local search relevance.",
    ],
    nearbyAreas: ["Dalston", "Hoxton", "Islington", "Stoke Newington", "London Fields"],
    faqs: [
      {
        question: "Can I book a facial even if I am not sure which one I need?",
        answer:
          "Yes. Your treatment can be selected through consultation-led skin analysis, and you can also message the clinic first for guidance.",
      },
      {
        question: "Are these facials only for glow and relaxation?",
        answer:
          "No. The menu includes acne-focused, extraction-focused, resurfacing, and hydration-led facials depending on your concern.",
      },
      {
        question: "Is Hackney the only area served?",
        answer:
          "Hackney is the local search target for this page, but the clinic welcomes clients from across East London and nearby areas.",
      },
    ],
    resources: [
      { label: "View full facials page", href: "/facials" },
      { label: "Read the microneedling guide", href: "/blog/microneedling-treatment-what-you-should-know" },
    ],
  },
  {
    slug: "chemical-peels",
    path: "/hackney/chemical-peels",
    title: "Chemical Peels in Hackney London",
    metaTitle: "Chemical Peels in Hackney London | J Luxe",
    metaDescription:
      "Searching for chemical peels in Hackney London? Explore consultation-led peel treatments including BioRePeel and PRX-T33 at J Luxe Medical Aesthetics.",
    heroEyebrow: "Hackney Booking Page",
    heroTitle: "Chemical Peels in Hackney London",
    heroDescription:
      "Consultation-led peel treatments for brightness, texture refinement, uneven tone, and acne-support protocols at our Hackney clinic.",
    primaryKeyword: "chemical peels Hackney London",
    secondaryKeywords: [
      "chemical peel Hackney",
      "BioRePeel Hackney",
      "PRX-T33 Hackney",
      "skin peel Hackney",
      "chemical peels East London",
    ],
    serviceLabel: "Chemical Peels",
    treatmentName: "chemical-peels",
    treatmentCategory: "skin",
    treatmentType: "chemical_peels",
    image: "/images/chemical-peels.png",
    imageAlt: "Chemical peels in Hackney London at J Luxe Medical Aesthetics",
    servicePageHref: "/chemical-peels",
    bookingHref: "/pricing",
    chips: ["BioRePeel and PRX-T33", "Texture and Tone Focus", "Hackney Skin Renewal Care"],
    highlights: [
      "Suitable for clients targeting uneven tone, pigmentation concerns, texture, congestion, or dullness.",
      "Structured consultation process to match peel strength and protocol to the right skin type.",
      "Designed to attract local clients searching for chemical peel treatment specifically in Hackney.",
    ],
    idealFor: [
      "Clients comparing peel options such as BioRePeel and PRX-T33.",
      "Skin concerns around roughness, breakouts, pigmentation, or post-inflammatory marks.",
      "People who want a more active skin treatment than a standard facial.",
    ],
    whyChoose: [
      "Consultation-led peel planning focused on suitability and aftercare, not rushed booking.",
      "Direct path into booking plus WhatsApp guidance if you are comparing protocols.",
      "Local booking page that connects search intent to an actual service route instead of a blog-only result.",
    ],
    nearbyAreas: ["Hackney Downs", "Clapton", "Dalston", "Victoria Park", "Mile End"],
    faqs: [
      {
        question: "Can I ask which peel is better before booking?",
        answer:
          "Yes. This page supports direct booking, but if you want to compare peel options first, WhatsApp is the fastest route.",
      },
      {
        question: "Do chemical peels require preparation?",
        answer:
          "Yes. Pre- and post-care matter for results and safety, and full guidance is provided before treatment.",
      },
      {
        question: "Is this only for clients in Hackney?",
        answer:
          "No. The page is localized for Hackney searches, but clients also travel in from nearby East London areas.",
      },
    ],
    resources: [
      { label: "View full chemical peels page", href: "/chemical-peels" },
      { label: "Read how to prepare for a chemical peel", href: "/blog/preparing-for-chemical-peel" },
    ],
  },
  {
    slug: "body-sculpting",
    path: "/hackney/body-sculpting",
    title: "Body Sculpting in Hackney London",
    metaTitle: "Body Sculpting in Hackney London | J Luxe",
    metaDescription:
      "Looking for body sculpting in Hackney London? Explore consultation-led body contouring and fat dissolving support at J Luxe Medical Aesthetics.",
    heroEyebrow: "Hackney Booking Page",
    heroTitle: "Body Sculpting in Hackney London",
    heroDescription:
      "Consultation-led body sculpting and contouring support for targeted shape goals, stubborn areas, and non-surgical confidence-building treatment plans.",
    primaryKeyword: "body sculpting Hackney London",
    secondaryKeywords: [
      "fat dissolving Hackney",
      "body contouring Hackney",
      "Lemon Bottle Hackney",
      "fat dissolving injections Hackney",
      "body sculpting East London",
    ],
    serviceLabel: "Body Sculpting",
    treatmentName: "body-sculpting-2",
    treatmentCategory: "body",
    treatmentType: "body_sculpting",
    image: "/images/bodySculpting.png",
    imageAlt: "Body sculpting in Hackney London at J Luxe Medical Aesthetics",
    servicePageHref: "/body-sculpting-2",
    bookingHref: "/pricing",
    chips: ["Body Contouring Support", "Fat Dissolving Options", "Hackney Consultation-Led Care"],
    highlights: [
      "Supports clients looking at body contouring, fat dissolving, or a non-surgical shaping route.",
      "Strong local page for searchers using body sculpting and fat dissolving terms around Hackney.",
      "Designed to move visitors quickly from interest to consultation and booking.",
    ],
    idealFor: [
      "Stubborn areas where shaping and contour support are the main concern.",
      "Clients comparing body sculpting with fat dissolving injections.",
      "People wanting a consultation-led plan rather than generic body treatment packages.",
    ],
    whyChoose: [
      "Direct progression into booking plus fast WhatsApp guidance if you are unsure which route fits best.",
      "Local trust signals and clinic positioning built around Hackney and East London access.",
      "Consistent internal linking back into the core treatment and pricing pages.",
    ],
    nearbyAreas: ["Hackney", "Dalston", "Bethnal Green", "Stratford", "Shoreditch"],
    faqs: [
      {
        question: "Is body sculpting the same as fat dissolving?",
        answer:
          "Not always. This page helps people searching locally, but the best route still depends on your goals and the area being treated.",
      },
      {
        question: "Can I book without deciding the exact treatment first?",
        answer:
          "Yes. Consultation-led planning is the safest route, and WhatsApp is available if you want help before booking.",
      },
      {
        question: "Why make a separate Hackney page?",
        answer:
          "Because people often search with both the treatment and the location, and this page is built specifically to meet that booking intent.",
      },
    ],
    resources: [
      { label: "View full body sculpting page", href: "/body-sculpting-2" },
      { label: "Read Lemon Bottle body contouring article", href: "/blog/lemon-bottle-fat-dissolving" },
    ],
  },
] as const satisfies readonly LocalLandingPageConfig[];

export function getLocalLandingPageBySlug(slug: string) {
  return localLandingPages.find((page) => page.slug === slug);
}
