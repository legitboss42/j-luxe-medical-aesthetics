"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
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

const faqs = [
  {
    question: "How often should I get a professional facial?",
    answer:
      "For optimal skin health and a consistent glow, most clients benefit from facials every 4 to 6 weeks, aligned with your skin renewal cycle.",
  },
  {
    question: "Do you extract blackheads and whiteheads?",
    answer:
      "Yes. Our acne and deep extraction protocols include safe, professional extraction techniques to clear congestion while protecting surrounding skin.",
  },
  {
    question: "Can I wear makeup after my facial?",
    answer:
      "We recommend giving your skin 12 to 24 hours before makeup whenever possible, so active ingredients can fully absorb and calm the skin barrier.",
  },
  {
    question: "What is the difference between a Classic Facial and Hydrafacial?",
    answer:
      "A Classic Facial is manual and massage-led, while Hydrafacial uses device-based vortex technology to cleanse, exfoliate, and infuse serums in one treatment.",
  },
  {
    question: "Are facials suitable for sensitive skin?",
    answer:
      "Yes. Your facial plan is consultation-led, so products and intensity are selected specifically for sensitive, reactive, or acne-prone skin.",
  },
];

const descriptionMap: Record<string, string> = {
  "Express Facial":
    "A 30-minute treatment for refreshed skin and instant radiance with minimal downtime.",
  "Classic Facial":
    "A timeless treatment for deep cleansing, hydration, and skin rebalancing across all skin types.",
  "Microdermabrasion Facial":
    "Mechanical exfoliation to smooth texture, refine pores, and brighten dull skin tone.",
  "Dermaplaning Facial":
    "Removes dead skin and peach fuzz for silk-smooth skin and improved product absorption.",
  "Acne (Deep Extraction /High Frequency)":
    "Targets congestion and active breakouts with extraction-focused, clinical-grade care.",
  Hydrafacial:
    "A vortex-powered treatment that cleanses, exfoliates, and infuses hydration in one session.",
  "Glow Facial":
    "Brightening and hydration-led treatment for visible luminosity and event-ready skin.",
  "Anti-ageing Facial":
    "A firming, collagen-support treatment designed to improve elasticity and skin vitality.",
  "Microcurrent/EMS (Face Sculpting)":
    "Microcurrent stimulation to lift and sculpt facial contours with a non-invasive approach.",
  "Vampire Facial":
    "Regenerative skin treatment focused on collagen stimulation and texture renewal.",
  "Customized Luxury Facial":
    "Fully tailored facial protocol based on your skin analysis and treatment goals.",
  "Back Facial (Women)":
    "Deep cleansing and exfoliation for back acne, texture concerns, and smooth skin.",
  "Back Facial (Men)":
    "Targeted back treatment for congestion and skin clarity with a treatment-led protocol.",
  "Chemical Peel Facial":
    "Clinical peel treatment for improved skin tone, brightness, and refined texture.",
};

const heroHighlights = [
  "Consultation-Led Skin Planning",
  "Medical-Grade Product Protocols",
  "Natural, Confidence-First Results",
];

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

function renderStars(rating: number, sizeClass = "w-4 h-4") {
  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={`${sizeClass}-${index}`}
      className={`${sizeClass} ${
        index < Math.round(rating) ? "text-[#D4AF37] fill-current" : "text-neutral-700"
      }`}
    />
  ));
}

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : "0";
}

function isAddon(item: PricingItem) {
  return /\badd[- ]?on\b/i.test(item.name);
}

function getDescription(name: string) {
  return (
    descriptionMap[name] ??
    "Consultation-led facial treatment personalized to your skin needs and aesthetic goals."
  );
}

export default function FacialsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const facialItems = useMemo(
    () => pricingCategories.find((category) => category.title === "FACIAL")?.items ?? [],
    [],
  );
  const coreFacials = useMemo(() => facialItems.filter((item) => !isAddon(item)), [facialItems]);
  const addOnFacials = useMemo(() => facialItems.filter(isAddon), [facialItems]);

  const bookingUrl =
    coreFacials.find((item) => item.name === "Customized Luxury Facial")?.link ??
    coreFacials[0]?.link ??
    "/pricing";

  const facialsSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Luxury Facials in Hackney, London",
      description:
        "Consultation-led facial treatments at J Luxe Medical Aesthetics in Hackney, London including Hydrafacial, acne facials, glow facials, and advanced skin rejuvenation.",
      areaServed: "Hackney, London",
      provider: {
        "@type": "MedicalBusiness",
        name: googleBusinessName,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Facial Treatment Menu",
        itemListElement: facialItems.map((item) => ({
          "@type": "Offer",
          name: item.name,
          priceCurrency: "GBP",
          price: parsePrice(item.price),
          url: item.link,
        })),
      },
    }),
    [facialItems],
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
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
          name: "Facials",
          item: "https://jluxemedicalaesthetics.com/facials",
        },
      ],
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(facialsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative min-h-[62vh] overflow-hidden border-b border-[#D4AF37]/20 md:min-h-[70vh]">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/advancedFacials.png"
            alt="Luxury facial treatment at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/76 to-black/58" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(212,175,55,0.22),transparent_48%)]" />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f4dda1]/25 to-transparent"
            animate={{ x: ["-180%", "420%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[#D4AF37]/12 blur-3xl"
          animate={{ y: [-14, 14, -14], x: [0, 10, 0] }}
          transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-14 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [16, -14, 16], x: [0, -12, 0] }}
          transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-20 mx-auto flex min-h-[62vh] w-full max-w-6xl items-end px-4 pb-9 md:min-h-[70vh] md:px-8 md:pb-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealStagger}
            className="grid w-full grid-cols-1 gap-7 lg:grid-cols-12"
          >
            <div className="text-center lg:col-span-8 lg:text-left">
              <motion.p
                variants={revealItem}
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm"
              >
                J Luxe Medical Aesthetics
              </motion.p>
              <motion.h1
                variants={revealItem}
                className="text-4xl font-serif font-bold uppercase leading-[0.92] tracking-[0.012em] md:text-6xl"
              >
                Facial Treatments
              </motion.h1>
              <motion.p
                variants={revealItem}
                className="mx-auto mt-5 max-w-[50ch] text-sm leading-relaxed text-gray-200 lg:mx-0 md:text-base"
              >
                Discover consultation-led facials at our medical aesthetics clinic in Hackney
                London, including Hydrafacial, deep extraction, glow facials, and advanced
                rejuvenation protocols.
              </motion.p>
              <motion.div
                variants={revealItem}
                className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start"
              >
                {heroHighlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-100"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {item}
                  </span>
                ))}
              </motion.div>
              <motion.div variants={revealItem} className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href={bookingUrl}
                  target={bookingUrl.startsWith("http") ? "_blank" : undefined}
                  rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined}
                  className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
                >
                  Book Your Glow
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/pricing"
                  className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  View Full Pricing
                </Link>
                <Link
                  href="/forms/facials"
                  className="cta-button inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-black/35 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                >
                  Consultation & Consent Forms
                </Link>
                <Link
                  href="/guidelines/facials"
                  className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Pre & Post Guidelines
                </Link>
              </motion.div>
            </div>

            <motion.article
              variants={revealItem}
              className="relative overflow-hidden rounded-[24px] border border-[#D4AF37]/28 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#080808] p-5 lg:col-span-4"
              whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.42)" }}
            >
              <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/15 blur-3xl" />
              <div className="relative h-44 overflow-hidden rounded-2xl border border-white/15">
                <Image
                  src="/images/featureImagePrompt.png"
                  alt="Facial consultation at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-transparent" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">{renderStars(googleRating, "h-3 w-3")}</div>
                    <span className="text-sm font-bold text-white">{googleRating.toFixed(1)}</span>
                  </div>
                </article>
                <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Core Facials</p>
                  <p className="mt-1 text-lg font-serif font-bold text-white">{coreFacials.length}+</p>
                </article>
                <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Add-Ons</p>
                  <p className="mt-1 text-lg font-serif font-bold text-white">{addOnFacials.length}</p>
                </article>
                <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Maintenance</p>
                  <p className="mt-1 text-lg font-serif font-bold text-white">4-6w</p>
                </article>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-neutral-800 bg-[#0b0b0b] px-4 py-7 md:px-8 md:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.1),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <motion.article
            whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.35)" }}
            className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center"
          >
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <Clock3 className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Duration</p>
            <p className="mt-1 text-sm font-bold text-white">30-60 mins</p>
          </motion.article>
          <motion.article
            whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.35)" }}
            className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center"
          >
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <CalendarDays className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Maintenance</p>
            <p className="mt-1 text-sm font-bold text-white">Every 4-6 weeks</p>
          </motion.article>
          <motion.article
            whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.35)" }}
            className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center"
          >
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <ShieldAlert className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Downtime</p>
            <p className="mt-1 text-sm font-bold text-white">None to minimal</p>
          </motion.article>
          <motion.article
            whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.35)" }}
            className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center"
          >
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Results</p>
            <p className="mt-1 text-sm font-bold text-white">Immediate glow</p>
          </motion.article>
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
              src="/images/featureImagePrompt.png"
              alt="Facial consultation at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
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
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase leading-[1.02] tracking-[0.01em] md:text-4xl">About Facials</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              At our medical aesthetics clinic in Hackney London, facials are delivered with
              clinical precision and luxury-level care. Every appointment begins with skin
              assessment, then we build your protocol around hydration, congestion, pigmentation,
              sensitivity, and long-term skin health.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
              From express maintenance to advanced hydrating and resurfacing options, your
              treatment is selected for visible results with a natural, confidence-first finish.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <article className="rounded-xl border border-white/15 bg-black/40 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">Facial Harmony</p>
                <p className="mt-1 text-sm text-gray-200">Balanced enhancements that respect natural anatomy.</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/40 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">Long-Term Skin Health</p>
                <p className="mt-1 text-sm text-gray-200">Treatment planning designed for sustainable elegance.</p>
              </article>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="border-y border-neutral-800 bg-[#050505] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
              J Luxe Medical Aesthetics
            </p>
            <h2 className="mx-auto mt-3 max-w-[18ch] text-3xl font-serif font-bold uppercase leading-[0.98] md:text-5xl">Facial Treatments</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
              Browse our complete facial menu with live pricing and direct Vagaro booking links.
              All facial treatments are consultation-led and customized to your skin goals.
            </p>
          </motion.div>

          <div className="mt-8 space-y-3">
            {coreFacials.map((item, index) => {
              const external = item.link.startsWith("http");
              return (
                <motion.article
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: (index % 6) * 0.04 }}
                  whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.35)" }}
                  className="group relative grid grid-cols-1 items-center gap-4 overflow-hidden rounded-[22px] border border-white/12 bg-gradient-to-r from-black/70 via-[#101010] to-black/70 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:p-5"
                >
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
                  <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-[#D4AF37]/10 blur-2xl" />
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
                </motion.article>
              );
            })}
          </div>

          {addOnFacials.length > 0 && (
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-8 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0c0c0c] to-[#090909] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Enhancement Add-Ons</p>
              <div className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {addOnFacials.map((item, index) => {
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
                        <p className="text-sm font-semibold text-gray-100 transition-colors group-hover:text-white">{item.name}</p>
                        <span className="text-sm font-bold text-[#D4AF37]">{item.price}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.article>
          )}
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
              J Luxe Medical Aesthetics
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-5xl">Frequently Asked Questions</h2>
          </motion.div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <motion.article
                key={faq.question}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.03 }}
                className="overflow-hidden rounded-xl border border-white/15 bg-black/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#121212] md:px-6"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF37]/55 bg-black/55 text-[10px] font-bold text-[#D4AF37]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-white md:text-base">{faq.question}</span>
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#D4AF37]/20 px-4 py-14 md:px-8">
        <Image
          src="/images/glowCta.png"
          alt="Facial skincare results at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/72 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.22),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.72, ease: "easeOut" }}
          className="relative z-10 mx-auto w-full max-w-5xl text-center"
        >
          <h2 className="text-3xl font-serif font-bold uppercase md:text-4xl">Ready To Rediscover Your Confidence?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            Book your consultation-led facial treatment at our medical aesthetics clinic in Hackney
            London and receive a personalized skincare plan designed around your goals.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/pricing"
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
        </motion.div>
      </section>

      <section className="bg-[#060606] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-12">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#080808] p-6 lg:col-span-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">{googleBusinessName}</p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Our Happy Clients</h3>
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
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut", delay: 0.06 }}
            className="rounded-[26px] border border-white/15 bg-black/45 p-5 lg:col-span-8 md:p-6"
          >
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
          </motion.article>
        </div>
      </section>
    </main>
  );
}


