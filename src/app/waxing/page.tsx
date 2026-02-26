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
  "FACIAL WAXING",
  "UNDERARMS AND ARM WAXING",
  "LEG WAXING",
  "UPPER BODY WAXING",
  "INTIMATE WAXING (FEMALE)",
  "MENS WAXING",
  "FULL BODY COMBOS WAXING (FEMALE)",
] as const;

const heroHighlights = [
  "Hollywood Wax London Specialists",
  "Female and Male Waxing Services",
  "Consultation-Led Comfort Protocols",
];

const faqs = [
  {
    question: "Do you offer Hollywood wax London treatments?",
    answer:
      "Yes. We provide Hollywood wax London services alongside bikini, Brazilian, and full-body waxing options.",
  },
  {
    question: "How long does waxing result usually last?",
    answer:
      "Most clients stay smooth for around 3 to 4 weeks, depending on hair growth cycle and treatment area.",
  },
  {
    question: "Do you offer both female and male waxing?",
    answer:
      "Yes. We provide female and male waxing services including facial, body, intimate, and combo options.",
  },
  {
    question: "How should I prepare for a waxing appointment?",
    answer:
      "Keep the area clean, avoid heavy oils right before your appointment, and allow enough hair length for effective removal.",
  },
  {
    question: "Can I combine multiple waxing areas in one visit?",
    answer:
      "Yes. Full-body combo options are available and can be tailored during consultation.",
  },
];

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : "0";
}

function getDescription(name: string) {
  const item = name.toLowerCase();
  if (item.includes("hollywood")) {
    return "Premium Hollywood wax London service focused on precision, comfort, and smooth long-lasting results.";
  }
  if (item.includes("braz")) {
    return "Intimate waxing option with precision shaping and comfort-focused technique.";
  }
  if (item.includes("bikini")) {
    return "Targeted bikini-area waxing with clean edges and smooth finish.";
  }
  if (item.includes("full face")) {
    return "Comprehensive face waxing protocol for smooth, makeup-ready skin.";
  }
  if (item.includes("eyebrow")) {
    return "Defined eyebrow waxing to clean and shape the brow line.";
  }
  if (item.includes("upper lip") || item.includes("lower lip") || item.includes("chin")) {
    return "Precision facial waxing to remove fine or coarse hair in high-detail areas.";
  }
  if (item.includes("underarm")) {
    return "Quick underarm waxing service for smooth and low-maintenance results.";
  }
  if (item.includes("full arm") || item.includes("half arm")) {
    return "Arm waxing service for consistent smoothness and clean finish.";
  }
  if (item.includes("full leg") || item.includes("half leg") || item.includes("3/4 leg")) {
    return "Leg waxing treatment for long-lasting smoothness and even skin texture.";
  }
  if (item.includes("back") || item.includes("chest") || item.includes("stomach")) {
    return "Upper-body waxing service with consultation-led area planning.";
  }
  if (item.includes("combo") || item.includes("full arms, full legs")) {
    return "Bundled waxing package designed for full-body efficiency and value.";
  }
  return "Consultation-led waxing service tailored to your preferred area and finish.";
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

function categoryIntro(title: string) {
  if (title === "FACIAL WAXING") {
    return "Precision face-area waxing including brows, upper lip, chin, and full face options.";
  }
  if (title === "UNDERARMS AND ARM WAXING") {
    return "Arm and underarm waxing options for clean, smooth finish with quick maintenance.";
  }
  if (title === "LEG WAXING") {
    return "Half-leg, 3/4-leg, and full-leg waxing protocols for long-lasting smoothness.";
  }
  if (title === "UPPER BODY WAXING") {
    return "Upper body waxing for chest, back, and stomach with area-specific planning.";
  }
  if (title === "INTIMATE WAXING (FEMALE)") {
    return "Female intimate waxing including bikini, Brazilian, and Hollywood wax London options.";
  }
  if (title === "MENS WAXING") {
    return "Male waxing services for chest, back, shoulders, limbs, and intimate areas.";
  }
  return "Value-driven full-body waxing bundles for efficient multi-area treatment.";
}

export default function WaxingPage() {
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

  const femaleIntimateItems = useMemo(
    () => categories.find((category) => category.title === "INTIMATE WAXING (FEMALE)")?.items ?? [],
    [categories],
  );
  const mensWaxingItems = useMemo(
    () => categories.find((category) => category.title === "MENS WAXING")?.items ?? [],
    [categories],
  );
  const facialWaxingItems = useMemo(
    () => categories.find((category) => category.title === "FACIAL WAXING")?.items ?? [],
    [categories],
  );
  const comboItems = useMemo(
    () =>
      categories.find((category) => category.title === "FULL BODY COMBOS WAXING (FEMALE)")
        ?.items ?? [],
    [categories],
  );

  const bookingUrl =
    femaleIntimateItems.find((item) => /hollywood/i.test(item.name))?.link ??
    allItems[0]?.link ??
    "/pricing";
  const facialBookingUrl = facialWaxingItems[0]?.link ?? bookingUrl;
  const comboBookingUrl = comboItems[0]?.link ?? bookingUrl;

  const minimumPrice = useMemo(() => {
    const prices = allItems
      .map((item) => Number(parsePrice(item.price)))
      .filter((price) => Number.isFinite(price) && price > 0);
    return prices.length > 0 ? Math.min(...prices) : null;
  }, [allItems]);

  const waxingSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hollywood Wax London and Body Waxing in Hackney",
      description:
        "Professional Hollywood wax London and full-body waxing services at J Luxe Medical Aesthetics in Hackney, London for female and male clients.",
      areaServed: "Hackney, London",
      provider: { "@type": "MedicalBusiness", name: googleBusinessName },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Waxing Service Menu",
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
          name: "Waxing",
          item: "https://jluxemedicalaesthetics.com/waxing",
        },
      ],
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(waxingSchema) }}
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
          src="/images/waxing.png"
          alt="Hollywood wax London service at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
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
              Hollywood Wax London
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-200 lg:mx-0 md:text-base">
              Professional waxing services at our medical aesthetics clinic in Hackney London,
              including female and male treatments across face, body, intimate areas, and combo packages.
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
                Book Waxing
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/pricing"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                View Full Pricing
              </Link>
              <Link
                href="/forms/waxing"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-black/35 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              >
                Consultation & Consent Forms
              </Link>
              <Link
                href="/guidelines/waxing"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Pre & Post Guidelines
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
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Waxing Services</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">{allItems.length}</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Female Intimate</p>
                <p className="mt-1 text-sm font-bold text-white">{femaleIntimateItems.length} options</p>
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
            <p className="mt-1 text-sm font-bold text-white">15-60 mins</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
            <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
              <CalendarDays className="h-4 w-4 text-[#D4AF37]" />
            </span>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Maintenance
            </p>
            <p className="mt-1 text-sm font-bold text-white">Every 3-4 weeks</p>
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
              Finish
            </p>
            <p className="mt-1 text-sm font-bold text-white">Smooth skin</p>
          </article>
        </div>
      </section>

      <section className="border-y border-[#D4AF37]/20 bg-gradient-to-b from-[#090909] to-[#070707] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-3">
          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Facial Waxing
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Precision Detailing</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Brow, lip, chin, and full-face options are designed for clean lines and smooth
              finish with quick maintenance.
            </p>
            <a
              href={facialBookingUrl}
              target={facialBookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={facialBookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Book Facial Waxing
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          <article className="rounded-[24px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0d0d0d] to-[#090909] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Intimate Waxing
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Bikini to Hollywood</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Female intimate plans include bikini line, Brazilian, and Hollywood wax London
              services based on your preferred finish.
            </p>
            <a
              href={bookingUrl}
              target={bookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black hover:bg-[#eac85a]"
            >
              Book Intimate Waxing
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Full Body Combos
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Multi-Area Packages</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Value-focused combo packages for clients who want multiple waxing areas completed in
              one appointment.
            </p>
            <a
              href={comboBookingUrl}
              target={comboBookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={comboBookingUrl.startsWith("http") ? "noreferrer" : undefined}
              className="cta-button mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Book Combo Package
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>
        </div>
      </section>

      <section id="service-menu" className="border-y border-neutral-800 bg-[#050505] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-serif font-bold uppercase md:text-5xl">
            Waxing Services
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-gray-300 md:text-base">
            Services below are synced directly to your pricing data with live booking links.
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
          alt="Hollywood wax London smooth skin results at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/72 to-black/85" />
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl font-serif font-bold uppercase md:text-4xl">
            Ready For Smooth, Long-Lasting Results?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            Book your waxing consultation at our medical aesthetics clinic in Hackney London for a
            personalized treatment plan across face, body, and intimate areas.
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
        </div>
      </section>

      <section className="bg-[#060606] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-12">
          <article className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#080808] p-6 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              {googleBusinessName}
            </p>
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


