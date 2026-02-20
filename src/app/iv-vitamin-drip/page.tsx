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
import { pricingCategories, type PricingItem } from "../pricing/pricing-data";

const googleBusinessName = "J Luxe Medical Aesthetics";
const googleRating = 5;
const googleReviewCount = 80;
const googleMapsPlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
const googleMapsEmbedUrl =
  "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";

const heroHighlights = [
  "IV Drip London Treatment Plans",
  "Hydration, Energy, and Immunity Support",
  "Consultation-Led Wellness Infusions",
];

const faqs = [
  {
    question: "What is an IV drip treatment?",
    answer:
      "An IV drip London treatment delivers fluids and nutrients directly into the bloodstream for fast absorption and targeted wellness support.",
  },
  {
    question: "How long does an IV drip session take?",
    answer:
      "Most IV sessions are completed in about 30 to 60 minutes depending on protocol and infusion volume.",
  },
  {
    question: "How often can I have an IV drip?",
    answer:
      "Frequency depends on your goals and practitioner guidance. Some clients book occasional sessions while others follow a monthly plan.",
  },
  {
    question: "Do you offer high-dose vitamin C and brightening drips?",
    answer:
      "Yes. We offer multiple high-dose vitamin C options and skin-brightening protocols at different dosage levels.",
  },
  {
    question: "Can IV drip treatment be combined with other services?",
    answer:
      "Yes. IV therapy can be integrated into broader skin and wellness plans where clinically appropriate.",
  },
];

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : "0";
}

function getDescription(name: string) {
  const item = name.toLowerCase();
  if (item.includes("basic hydration")) {
    return "Core rehydration infusion to support recovery, fluid balance, and overall wellness.";
  }
  if (item.includes("multivitamin") || item.includes("multi-mineral")) {
    return "Nutrient-led infusion for daily wellness support and energy maintenance.";
  }
  if (item.includes("energy")) {
    return "Energy-focused protocol designed to reduce fatigue and support performance.";
  }
  if (item.includes("immunity")) {
    return "Immune-support drip with vitamins and antioxidants for resilience and recovery.";
  }
  if (item.includes("detox")) {
    return "Detox-focused infusion plan designed for recovery and internal reset support.";
  }
  if (item.includes("anti-aging")) {
    return "Antioxidant-rich protocol for skin vitality and healthy aging support.";
  }
  if (item.includes("high dose vitamin c")) {
    return "High-dose vitamin C infusion selected by dosage target and treatment objective.";
  }
  if (item.includes("skin brightening")) {
    return "Skin brightening drip protocol designed for radiance and tone support.";
  }
  if (item.includes("weightloss")) {
    return "Metabolic support drip for clients following structured body and wellness goals.";
  }
  if (item.includes("fitness")) {
    return "Performance infusion to support active recovery and physical output goals.";
  }
  if (item.includes("skin and hair")) {
    return "Targeted nutrient profile for skin glow and hair vitality support.";
  }
  if (item.includes("nad")) {
    return "Advanced NAD support infusion for recovery and cellular-energy goals.";
  }
  if (item.includes("myers")) {
    return "Classic Myers cocktail for broad-spectrum wellness and nutrient replenishment.";
  }
  return "Consultation-led IV drip protocol tailored to your wellness goals.";
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

export default function IvVitaminDripPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ivItems = useMemo(
    () =>
      pricingCategories.find((category) => category.title === "IV VITAMIN DRIP")?.items ?? [],
    [],
  );

  const hydrationItems = useMemo(
    () =>
      ivItems.filter((item) =>
        /(hydration|multivitamin|multi-mineral|energy|immunity|detox|anti-aging|myers|nad|fitness|weightloss|skin and hair)/i.test(
          item.name,
        ),
      ),
    [ivItems],
  );
  const vitaminCItems = useMemo(
    () => ivItems.filter((item) => /high dose vitamin c/i.test(item.name)),
    [ivItems],
  );
  const brighteningItems = useMemo(
    () => ivItems.filter((item) => /skin brightening/i.test(item.name)),
    [ivItems],
  );

  const bookingUrl =
    ivItems.find((item) => /basic hydration/i.test(item.name))?.link ??
    ivItems[0]?.link ??
    "/booking";
  const vitaminCBookingUrl = vitaminCItems[0]?.link ?? bookingUrl;
  const brighteningBookingUrl = brighteningItems[0]?.link ?? bookingUrl;

  const minimumPrice = useMemo(() => {
    const prices = ivItems
      .map((item) => Number(parsePrice(item.price)))
      .filter((price) => Number.isFinite(price) && price > 0);
    return prices.length > 0 ? Math.min(...prices) : null;
  }, [ivItems]);

  const ivSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "IV Drip London in Hackney",
      description:
        "Consultation-led IV drip London therapy at J Luxe Medical Aesthetics in Hackney, including hydration, vitamin C, brightening, and wellness infusion protocols.",
      areaServed: "Hackney, London",
      provider: { "@type": "MedicalBusiness", name: googleBusinessName },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IV Vitamin Drip Menu",
        itemListElement: ivItems.map((item: PricingItem) => ({
          "@type": "Offer",
          name: item.name,
          priceCurrency: "GBP",
          price: parsePrice(item.price),
          url: item.link,
        })),
      },
    }),
    [ivItems],
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
          name: "IV Vitamin Drip",
          item: "https://jluxemedicalaesthetics.com/iv-vitamin-drip",
        },
      ],
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ivSchema) }}
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
          src="/images/iv-vitamin-drip.png"
          alt="IV drip London treatment at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
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
              IV Drip London
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-200 lg:mx-0 md:text-base">
              Consultation-led IV drip protocols at our medical aesthetics clinic in Hackney
              London for hydration, immunity, energy, brightening, and wellness support.
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
                Book IV Drip
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
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">IV Protocols</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">{ivItems.length}</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Vitamin C</p>
                <p className="mt-1 text-sm font-bold text-white">{vitaminCItems.length} levels</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">From</p>
                <p className="mt-1 text-sm font-bold text-white">
                  {minimumPrice ? `GBP ${minimumPrice}` : "Consult"}
                </p>
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
              Frequency
            </p>
            <p className="mt-1 text-sm font-bold text-white">Goal dependent</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <ShieldAlert className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Downtime
            </p>
            <p className="mt-1 text-sm font-bold text-white">Minimal</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Focus
            </p>
            <p className="mt-1 text-sm font-bold text-white">Wellness support</p>
          </article>
        </div>
      </section>

      <section className="border-y border-[#D4AF37]/20 bg-gradient-to-b from-[#090909] to-[#070707] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-3">
          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Hydration and Recovery
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Core Wellness</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Hydration, immunity, and energy-focused IV options support day-to-day recovery and
              wellness performance.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-gray-400">
              {hydrationItems.length} protocols available
            </p>
            <a
              href={bookingUrl}
              target={bookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black hover:bg-[#eac85a]"
            >
              Book Wellness Drip
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          <article className="rounded-[24px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0d0d0d] to-[#090909] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              High-Dose Vitamin C
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Targeted Dosage Levels</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Multiple vitamin C infusion levels are available to match your support needs and
              treatment objective.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-gray-400">
              {vitaminCItems.length} dosage options
            </p>
            <a
              href={vitaminCBookingUrl}
              target={vitaminCBookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={vitaminCBookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Book Vitamin C Drip
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Skin Brightening
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Glow Support</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Skin-brightening infusions are available in escalating strengths for personalized
              glow and complexion-support plans.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-gray-400">
              {brighteningItems.length} brightening levels
            </p>
            <a
              href={brighteningBookingUrl}
              target={brighteningBookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={brighteningBookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Book Brightening Drip
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>
        </div>
      </section>

      <section id="service-menu" className="border-y border-neutral-800 bg-[#050505] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-serif font-bold uppercase md:text-5xl">
            IV Drip Services
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-gray-300 md:text-base">
            Services below are synced directly to your pricing data with live booking links.
          </p>

          <div className="mt-8 space-y-3">
            {ivItems.map((item, index) => {
              const external = item.link.startsWith("http");
              return (
                <article
                  key={`${item.name}-${index}`}
                  className="grid grid-cols-1 items-center gap-4 rounded-[20px] border border-white/12 bg-gradient-to-r from-black/70 via-[#101010] to-black/70 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:p-5"
                >
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-white">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/60 text-[10px] font-bold text-[#D4AF37]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-300">{getDescription(item.name)}</p>
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
                  <span className="text-sm font-semibold text-white md:text-base">{faq.question}</span>
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
          alt="IV drip London wellness support at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/72 to-black/85" />
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl font-serif font-bold uppercase md:text-4xl">
            Ready To Replenish and Recover?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            Book your IV drip consultation at our medical aesthetics clinic in Hackney London for
            a personalized infusion strategy.
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


