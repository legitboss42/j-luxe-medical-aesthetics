"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  ShieldAlert,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MapEmbed from "../../components/MapEmbed";
import {
  pricingCategories,
  type PricingCategory,
  type PricingItem,
} from "../pricing/pricing-data";

const googleBusinessName = "J Luxe Medical Aesthetics";
const googleRating = 5;
const googleReviewCount = 80;
const googleMapsPlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
const googleMapsEmbedUrl =
  "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";

const categoryTitles = [
  "DERMAL FILLERS",
  "LIP BOOSTER",
  "DISSOLVE FILLERS",
] as const;

const heroHighlights = [
  "Consultation-Led Facial Mapping",
  "Natural Volume and Contour",
  "Premium Injectable Protocols",
];

const faqs = [
  {
    question: "How long do dermal filler results usually last?",
    answer:
      "Most filler results last between 6 and 18 months depending on area treated, product type, and your metabolism.",
  },
  {
    question: "Will my results look natural?",
    answer:
      "Yes. Your plan is based on facial anatomy and balance, with a natural, confidence-first finish as the goal.",
  },
  {
    question: "Can lip booster and lip filler be combined?",
    answer:
      "Yes. Many clients combine both to improve hydration, texture, and shape while keeping a soft, refined look.",
  },
  {
    question: "What if I need old filler dissolved?",
    answer:
      "Filler dissolving options are available and can be included before correction or refinement work where clinically appropriate.",
  },
  {
    question: "Is there downtime after fillers?",
    answer:
      "Downtime is usually minimal, with temporary swelling or bruising possible in the first few days.",
  },
];

const descriptionMap: Record<string, string> = {
  "Lips (0.5ml)":
    "Subtle lip enhancement for shape definition and gentle volume refinement.",
  "Lips (1ml)":
    "Full lip enhancement treatment for structure, hydration, and balanced projection.",
  "Nasolabial Folds":
    "Softens smile-line depth while preserving natural facial movement and expression.",
  "Marionette Lines":
    "Targets downturned mouth-line shadows for a smoother lower-face profile.",
  Cheeks:
    "Mid-face contour and volume restoration to support facial harmony and lift.",
  Chin: "Chin profiling filler to improve side profile balance and facial proportion.",
  Jawline:
    "Jawline contouring treatment to define angles and create a sharper lower-face frame.",
  "Tear Trough":
    "Under-eye hollow correction designed to reduce tired appearance and shadowing.",
  Temples:
    "Temple volume restoration to support a softer and more youthful upper-face contour.",
  "Non-Surgical Rhinoplasty":
    "Precision filler rhinoplasty to smooth profile irregularities without surgery.",
  "Smoker’s Lines":
    "Fine-line filler refinement around the upper lip area for smoother texture.",
  "Add on per 1ml":
    "Additional filler volume option to build on your base contouring treatment plan.",
  "Elective Filler dissolving (per area)":
    "Selective dissolving for correction or reset before a new treatment strategy.",
  "Lumi Lips Pro Booster":
    "Hydration-focused lip booster treatment to improve texture, softness, and glow.",
  "1 session to dissolve fillers":
    "Full dissolving session where clinically needed before correction or re-treatment.",
};

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : "0";
}

function getDescription(name: string) {
  return (
    descriptionMap[name] ??
    "Consultation-led dermal filler treatment tailored to your facial anatomy and goals."
  );
}

function renderStars(rating: number, sizeClass = "w-4 h-4") {
  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={`${sizeClass}-${index}`}
      className={`${sizeClass} ${
        index < Math.round(rating) ? "fill-current text-[#D4AF37]" : "text-neutral-700"
      }`}
    />
  ));
}

function isAddOn(item: PricingItem) {
  return /add on/i.test(item.name);
}

function isDissolve(item: PricingItem) {
  return /dissolv/i.test(item.name);
}

function categoryIntro(title: string) {
  if (title === "DERMAL FILLERS") {
    return "Core filler treatments for lips, facial contour, profile balancing, and line refinement.";
  }
  if (title === "LIP BOOSTER") {
    return "Hydration-focused lip enhancement designed to improve lip quality and texture.";
  }
  return "Clinical dissolving options for correction, reset, and treatment re-planning.";
}

export default function FillersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = useMemo(
    () =>
      categoryTitles
        .map((title) => pricingCategories.find((category) => category.title === title))
        .filter((category): category is PricingCategory => Boolean(category)),
    [],
  );

  const allItems = useMemo(
    () => categories.flatMap((category) => category.items),
    [categories],
  );

  const dermalItems = useMemo(
    () => categories.find((category) => category.title === "DERMAL FILLERS")?.items ?? [],
    [categories],
  );
  const lipBoosterItems = useMemo(
    () => categories.find((category) => category.title === "LIP BOOSTER")?.items ?? [],
    [categories],
  );
  const dissolveCategoryItems = useMemo(
    () => categories.find((category) => category.title === "DISSOLVE FILLERS")?.items ?? [],
    [categories],
  );

  const coreFillerItems = useMemo(
    () => dermalItems.filter((item) => !isAddOn(item) && !isDissolve(item)),
    [dermalItems],
  );
  const fillerAddOnItems = useMemo(
    () => dermalItems.filter(isAddOn),
    [dermalItems],
  );
  const dissolveOptions = useMemo(() => {
    const mapped = new Map<string, PricingItem>();
    for (const item of [...dermalItems.filter(isDissolve), ...dissolveCategoryItems]) {
      mapped.set(item.name, item);
    }
    return Array.from(mapped.values());
  }, [dermalItems, dissolveCategoryItems]);

  const bookingUrl =
    dermalItems.find((item) => item.name === "Lips (1ml)")?.link ??
    coreFillerItems[0]?.link ??
    "/booking";
  const lipBoosterBookingUrl = lipBoosterItems[0]?.link ?? bookingUrl;
  const dissolveBookingUrl = dissolveOptions[0]?.link ?? bookingUrl;

  const minimumFillerPrice = useMemo(() => {
    const prices = coreFillerItems
      .map((item) => Number(parsePrice(item.price)))
      .filter((price) => Number.isFinite(price) && price > 0);
    return prices.length > 0 ? Math.min(...prices) : null;
  }, [coreFillerItems]);

  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Dermal Fillers in Hackney, London",
      description:
        "Consultation-led dermal fillers at J Luxe Medical Aesthetics in Hackney, London including lip fillers, facial contouring, lip booster, and filler dissolving.",
      areaServed: "Hackney, London",
      provider: { "@type": "MedicalBusiness", name: googleBusinessName },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dermal Filler Service Menu",
        itemListElement: allItems.map((item: PricingItem) => ({
          "@type": "Offer",
          name: item.name,
          priceCurrency: "GBP",
          price: parsePrice(item.price),
          url: item.link,
        })),
      },
    }),
    [allItems],
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    }),
    [],
  );

  const breadcrumbSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://jluxemedicalaesthetics.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Dermal Fillers",
          item: "https://jluxemedicalaesthetics.com/fillers",
        },
      ],
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative min-h-[62vh] overflow-hidden border-b border-[#D4AF37]/20 md:min-h-[70vh]">
        <Image
          src="/images/dermalFillers.png"
          alt="Dermal fillers at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/76 to-black/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(212,175,55,0.22),transparent_48%)]" />

        <div className="relative z-20 mx-auto grid min-h-[62vh] w-full max-w-6xl grid-cols-1 gap-6 px-4 pb-10 pt-28 md:pb-12 md:min-h-[70vh] md:px-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:col-span-8 lg:text-left"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
              J Luxe Medical Aesthetics
            </p>
            <h1 className="mt-4 text-4xl font-serif font-bold uppercase leading-[0.94] md:text-6xl">
              Dermal Fillers
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-200 lg:mx-0 md:text-base">
              Consultation-led filler treatments at our medical aesthetics clinic in Hackney
              London for lips, jawline, cheeks, tear trough, profile balancing, and refinement.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {heroHighlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-100"
                >
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href={bookingUrl}
                target={bookingUrl.startsWith("http") ? "_blank" : undefined}
                rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined}
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
              >
                Book Fillers
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/pricing"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                View Full Pricing
              </Link>
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-[24px] border border-[#D4AF37]/28 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#080808] p-5 lg:col-span-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">{renderStars(googleRating, "h-3 w-3")}</div>
                  <span className="text-sm font-bold text-white">{googleRating.toFixed(1)}</span>
                </div>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Filler Areas</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">{coreFillerItems.length}</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Lip Booster</p>
                <p className="mt-1 text-sm font-bold text-white">{lipBoosterItems.length} option</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Dissolve</p>
                <p className="mt-1 text-sm font-bold text-white">{dissolveOptions.length} options</p>
              </article>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="relative border-b border-neutral-800 bg-[#0b0b0b] px-4 py-7 md:px-8 md:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.1),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <Clock3 className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Session Time
            </p>
            <p className="mt-1 text-sm font-bold text-white">30-60 mins</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <CalendarDays className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Longevity
            </p>
            <p className="mt-1 text-sm font-bold text-white">6-18 months</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <ShieldAlert className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Downtime
            </p>
            <p className="mt-1 text-sm font-bold text-white">Low to minimal</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Outcome
            </p>
            <p className="mt-1 text-sm font-bold text-white">Balanced contour</p>
          </article>
        </div>
      </section>

      <section className="relative px-4 py-12 md:px-8 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(212,175,55,0.1),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-white/15 lg:col-span-5"
          >
            <Image
              src="/images/leadPractitioner.png"
              alt="Dermal fillers consultation at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
              width={1200}
              height={1400}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut", delay: 0.06 }}
            className="relative overflow-hidden rounded-[28px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#141108]/85 via-[#0b0b0b] to-black/95 p-6 lg:col-span-7 md:p-7"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4AF37]/12 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              J Luxe Medical Aesthetics
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">
              About Dermal Fillers
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              Dermal filler treatment at our medical aesthetics clinic in Hackney London is built
              around precision anatomy, natural proportion, and long-term facial harmony. We
              prioritize subtle correction and elegant contouring over overfilled outcomes.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
              From lip refinement to jawline definition and tear trough correction, every area is
              assessed during consultation to ensure safe and suitable treatment sequencing.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <article className="rounded-xl border border-white/15 bg-black/40 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                  Anatomy-Led Planning
                </p>
                <p className="mt-1 text-sm text-gray-200">Each area is mapped for safe, balanced enhancement.</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/40 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                  Refinement Strategy
                </p>
                <p className="mt-1 text-sm text-gray-200">We can include lip booster and dissolving support where needed.</p>
              </article>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="border-y border-[#D4AF37]/20 bg-gradient-to-b from-[#090909] to-[#070707] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="rounded-[24px] border border-white/15 bg-black/45 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Lip Booster
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Hydration and Lip Quality</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Lip booster treatments focus on hydration, smoothness, and lip texture quality,
              making them ideal for subtle refresh plans and maintenance.
            </p>
            <a
              href={lipBoosterBookingUrl}
              target={lipBoosterBookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={lipBoosterBookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Book Lip Booster
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ delay: 0.05 }}
            className="rounded-[24px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0d0d0d] to-[#090909] p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Filler Dissolving
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Correction and Reset</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              If previous filler requires correction or a full reset, dissolving services are
              available as part of your long-term aesthetic treatment plan.
            </p>
            <a
              href={dissolveBookingUrl}
              target={dissolveBookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={dissolveBookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black hover:bg-[#eac85a]"
            >
              Book Dissolve Consultation
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.article>
        </div>
      </section>

      <section id="service-menu" className="border-y border-neutral-800 bg-[#050505] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-serif font-bold uppercase md:text-5xl">
            Dermal Filler Services
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-gray-300 md:text-base">
            Services below are synced directly to your pricing data, including filler areas, lip
            booster, add-ons, and dissolving options.
          </p>

          <div className="mt-8 space-y-7">
            {categories.map((category, categoryIndex) => (
              <article
                key={category.title}
                className="rounded-[24px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0d0d0d] to-[#090909] p-4 md:p-5"
              >
                <header className="mb-4 border-b border-white/10 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                    Category {String(categoryIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-2xl font-serif font-bold uppercase text-white md:text-3xl">
                    {category.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-300">
                    {categoryIntro(category.title)}
                  </p>
                </header>

                <div className="space-y-3">
                  {category.items.map((item, index) => {
                    const external = item.link.startsWith("http");
                    return (
                      <article
                        key={`${category.title}-${item.name}-${index}`}
                        className="grid grid-cols-1 items-center gap-4 rounded-[20px] border border-white/12 bg-gradient-to-r from-black/70 via-[#101010] to-black/70 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:p-5"
                      >
                        <div>
                          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-white">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/60 text-[10px] font-bold text-[#D4AF37]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {item.name}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-gray-300">
                            {getDescription(item.name)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 md:flex-col md:items-end">
                          <span className="rounded-full border border-[#D4AF37]/35 bg-[#17120a]/65 px-3 py-1 text-lg font-serif font-bold text-[#D4AF37]">
                            {item.price}
                          </span>
                          <a
                            href={item.link}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="cta-button inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                          >
                            Book now
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          {fillerAddOnItems.length > 0 && (
            <article className="mt-8 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0c0c0c] to-[#090909] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Filler Add-On
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {fillerAddOnItems.map((item, index) => {
                  const external = item.link.startsWith("http");
                  return (
                    <a
                      key={`${item.name}-${index}`}
                      href={item.link}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="group rounded-xl border border-white/15 bg-black/40 px-4 py-3 transition-colors hover:border-[#D4AF37]/45"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-gray-100 transition-colors group-hover:text-white">
                          {item.name}
                        </p>
                        <span className="text-sm font-bold text-[#D4AF37]">{item.price}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </article>
          )}

          {minimumFillerPrice && (
            <p className="mt-6 text-center text-sm text-gray-400">
              Core dermal filler areas start from{" "}
              <span className="font-semibold text-[#D4AF37]">£{minimumFillerPrice}</span>.
            </p>
          )}
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-center text-3xl font-serif font-bold uppercase md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <article
                key={faq.question}
                className="overflow-hidden rounded-xl border border-white/15 bg-black/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#121212] md:px-6"
                >
                  <span className="text-sm font-semibold text-white md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#D4AF37] transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-300 md:px-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#D4AF37]/20 px-4 py-14 md:px-8">
        <Image
          src="/images/glowCta.png"
          alt="Dermal filler confidence results at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/72 to-black/85" />
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl font-serif font-bold uppercase md:text-4xl">
            Ready To Refine and Enhance?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            Book your dermal filler consultation at our medical aesthetics clinic in Hackney London
            and receive a personalized, anatomy-led treatment plan.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={bookingUrl}
              target={bookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact-us"
              className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#060606] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-12">
          <article className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#080808] p-6 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              {googleBusinessName}
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Our Happy Patients</h3>
            <div className="mt-3 flex items-center gap-1">{renderStars(googleRating, "h-4 w-4")}</div>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Rated {googleRating.toFixed(1)} on Google with {googleReviewCount}+ verified reviews.
            </p>
            <a
              href={googleMapsPlaceUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-button mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              View All Reviews
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          <article className="rounded-[26px] border border-white/15 bg-black/45 p-5 lg:col-span-8 md:p-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              J Luxe Medical Aesthetics
            </p>
            <h3 className="mt-3 text-center text-3xl font-serif font-bold uppercase md:text-4xl">
              Our Location
            </h3>
            <MapEmbed
              src={googleMapsEmbedUrl}
              title="J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London map"
              className="mt-6 border border-neutral-800 bg-neutral-900 md:min-h-[360px]"
            />
            <div className="mt-6 text-center">
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Get Directions
                <MapPin className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}


