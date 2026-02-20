"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
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
  "BODY SERVICES",
  "FAT DISSOLVING INJECTIONS",
  "EMS SCULPT",
] as const;

const heroHighlights = [
  "Contour-Focused Body Plans",
  "Lemon Bottle and Aqualyx Options",
  "Advanced Non-Surgical Devices",
  "Visible Definition Progression",
];

const faqs = [
  {
    question: "How many sessions are recommended?",
    answer:
      "Most clients start with 3 to 6 sessions depending on treatment area, body goals, and response speed.",
  },
  {
    question: "Can body sculpting and fat dissolving be combined?",
    answer:
      "Yes. They target different goals and are often sequenced together for better contour results.",
  },
  {
    question: "Which fat dissolving option is right for me?",
    answer:
      "Your practitioner will assess your treatment area and advise whether Lemon Bottle or Aqualyx is the best fit for your goals.",
  },
  {
    question: "Does EMS Sculpt replace exercise?",
    answer:
      "No. EMS Sculpt supports muscle stimulation and definition, while training and nutrition remain essential.",
  },
  {
    question: "Is there downtime?",
    answer:
      "Most treatments have minimal downtime, with occasional mild tenderness or redness.",
  },
];

const descriptionMap: Record<string, string> = {
  "Wood Therapy (45 mins)":
    "Manual sculpting protocol designed to stimulate circulation and support contour definition.",
  "Slimming and Cellulite Reduction (60 mins)":
    "Cellulite-focused treatment plan to smooth texture and improve visible skin tone.",
  "Snatched and Contoured (45 mins)":
    "Premium body contouring treatment tailored to your goals and target area.",
  "Advanced Cavitation (60 mins)":
    "Ultrasound contour treatment used to target localized stubborn fat deposits.",
  "RF (60 mins)":
    "Radio-frequency session to support tighter-looking skin and collagen activity.",
  "Vacuum (60 mins)":
    "Vacuum-assisted contouring to encourage lymphatic flow and body shaping support.",
  "Laser Pad (60 mins)":
    "Laser pad protocol designed to complement slimming and circumference-reduction plans.",
  "Body Sculpting Fusion (Wood Therapy, Advanced Cavitation, RF, Vacuum and Laser Pad) (90 mins)":
    "Our signature multi-modality contour session for full-shape refinement.",
  "Post Op care & Manual (60 mins)":
    "Post-operative support treatment to aid recovery, drainage, and tissue comfort.",
  "Skin tightening radio-frequency":
    "Targeted tightening treatment for areas with reduced firmness and elasticity concerns.",
  "Laser Lipo Pads":
    "Focused laser lipo support treatment for body contour maintenance between sessions.",
  "Lymphatic Drainage Massage (30 mins)":
    "Quick drainage reset to reduce fluid retention and support recovery.",
  "Lymphatic Drainage Massage (45 mins)":
    "Balanced drainage protocol for improved circulation and post-treatment comfort.",
  "Lymphatic Drainage Massage (60 mins)":
    "Extended drainage treatment for consistent detox and contour support.",
  "Lymphatic Drainage Massage (90 mins)":
    "Comprehensive full-body lymphatic protocol for advanced recovery needs.",
  "Lemon Bottle: Small Area (1 vial)":
    "Targeted fat dissolving for smaller treatment zones requiring precise refinement.",
  "Lemon Bottle: Medium Area (3 Vials)":
    "Targeted fat dissolving option for medium treatment zones.",
  "Lemon Bottle: Large area (4 vials)":
    "Higher-volume Lemon Bottle plan for larger contouring areas.",
  "Aqualyx: Small Area (1 vial)":
    "Aqualyx starter option for small localized fat-pocket reduction.",
  "Aqualyx: Medium Area (3 Vials)":
    "Clinical fat dissolving protocol for deeper contour correction.",
  "Aqualyx: Large area (4 vials)":
    "Advanced Aqualyx package for broader-area body contour plans.",
  "1 Area (1 Session)":
    "Single EMS Sculpt session for one body area to stimulate tone and definition.",
  "1 Area (3 Sessions)":
    "Three-session EMS package for progressive muscle engagement in one area.",
  "1 Areas (6 Session)":
    "Six-session intensive EMS plan for stronger tone outcomes in one area.",
  "2 Areas (1 Session)":
    "Dual-area EMS Sculpt treatment for balanced body stimulation in one visit.",
  "2 Areas (3 Sessions)":
    "Three-session dual-area package for consistent contour and tone progression.",
  "2 Areas (6 Sessions)":
    "Intensive EMS package for dual-zone tone and definition progression.",
};

function parsePrice(price: string) {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : "0";
}

function getDescription(name: string) {
  return (
    descriptionMap[name] ??
    "Advanced body contouring session selected during consultation for your treatment zone."
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

function categoryIntro(title: string) {
  if (title === "BODY SERVICES") {
    return "Technology-led and manual contouring services for shape, skin tone, and post-op support.";
  }
  if (title === "FAT DISSOLVING INJECTIONS") {
    return "Lemon Bottle and Aqualyx injectable options for localized fat-pocket treatment.";
  }
  return "EMS packages focused on muscle activation and definition.";
}

export default function BodySculptingPage() {
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

  const bodyServicesItems = useMemo(
    () =>
      categories.find((category) => category.title === "BODY SERVICES")?.items ?? [],
    [categories],
  );
  const fatDissolvingItems = useMemo(
    () =>
      categories.find((category) => category.title === "FAT DISSOLVING INJECTIONS")?.items ??
      [],
    [categories],
  );
  const emsItems = useMemo(
    () => categories.find((category) => category.title === "EMS SCULPT")?.items ?? [],
    [categories],
  );

  const bookingUrl =
    bodyServicesItems.find((item) => item.name.includes("Body Sculpting Fusion"))?.link ??
    bodyServicesItems[0]?.link ??
    allItems[0]?.link ??
    "/booking";
  const fatDissolvingBookingUrl = fatDissolvingItems[0]?.link ?? bookingUrl;
  const minimumFatDissolvingPrice = useMemo(() => {
    const prices = fatDissolvingItems
      .map((item) => Number(parsePrice(item.price)))
      .filter((price) => Number.isFinite(price) && price > 0);
    return prices.length > 0 ? Math.min(...prices) : null;
  }, [fatDissolvingItems]);

  const serviceSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Body Sculpting and Fat Dissolving Injections in Hackney, London",
      description:
        "Non-surgical body sculpting and fat dissolving injections at J Luxe Medical Aesthetics in Hackney, London, including Lemon Bottle, Aqualyx, contouring services, and EMS sculpt.",
      areaServed: "Hackney, London",
      provider: { "@type": "MedicalBusiness", name: googleBusinessName },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Body Sculpting and Fat Dissolving Service Menu",
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
        { "@type": "ListItem", position: 1, name: "Home", item: "https://jluxemedicalaesthetics.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Body Sculpting and Fat Dissolving",
          item: "https://jluxemedicalaesthetics.com/body-sculpting-2",
        },
      ],
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative min-h-[62vh] overflow-hidden border-b border-[#D4AF37]/20 md:min-h-[70vh]">
        <Image
          src="/images/bodySculpting.png"
          alt="Body sculpting at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(212,175,55,0.22),transparent_48%)]" />

        <div className="relative z-20 mx-auto grid min-h-[62vh] w-full max-w-6xl grid-cols-1 gap-6 px-4 pb-10 pt-28 md:pb-12 md:min-h-[70vh] md:px-8 lg:grid-cols-12 lg:items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center lg:col-span-8 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">J Luxe Medical Aesthetics</p>
            <h1 className="mt-4 text-4xl font-serif font-bold uppercase leading-[0.94] md:text-6xl">Body Sculpting &amp; Fat Dissolving</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-200 lg:mx-0 md:text-base">
              Non-surgical contouring at our medical aesthetics clinic in Hackney London, with
              dedicated body sculpting protocols and targeted fat dissolving injections.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {heroHighlights.map((item) => (
                <span key={item} className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-100">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href={bookingUrl} target={bookingUrl.startsWith("http") ? "_blank" : undefined} rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined} className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]">
                Book Body Sculpting
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/pricing" className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]">
                View Full Pricing
              </Link>
            </div>
          </motion.div>

          <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[24px] border border-[#D4AF37]/28 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#080808] p-5 lg:col-span-4">
            <div className="grid grid-cols-2 gap-3">
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">{renderStars(googleRating, "h-3 w-3")}</div>
                  <span className="text-sm font-bold text-white">{googleRating.toFixed(1)}</span>
                </div>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Body Services</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">{bodyServicesItems.length}</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Fat Dissolving</p>
                <p className="mt-1 text-sm font-bold text-white">{fatDissolvingItems.length} options</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">EMS Packages</p>
                <p className="mt-1 text-sm font-bold text-white">{emsItems.length} packages</p>
              </article>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="relative border-b border-neutral-800 bg-[#0b0b0b] px-4 py-7 md:px-8 md:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.1),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} className="rounded-[26px] border border-white/15 bg-black/45 p-5 lg:col-span-5 md:p-6">
            <Image src="/images/fat-dissolving-injections.png" alt="Fat dissolving treatment at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London" width={1000} height={1200} className="h-64 w-full rounded-2xl object-cover object-center" />
          </motion.article>
          <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ delay: 0.05 }} className="rounded-[26px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#141108]/85 via-[#0b0b0b] to-black/95 p-6 lg:col-span-7 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">J Luxe Medical Aesthetics</p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">About Body Sculpting and Fat Dissolving</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              We combine high-performance contouring technology with tailored treatment sequencing
              to support definition, skin quality, and confidence-first results.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-white/15 bg-black/40 p-3 text-center">
                <Clock3 className="mx-auto h-4 w-4 text-[#D4AF37]" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-300">Duration</p>
                <p className="mt-1 text-sm font-bold text-white">45-90 mins</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/40 p-3 text-center">
                <ShieldAlert className="mx-auto h-4 w-4 text-[#D4AF37]" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-300">Downtime</p>
                <p className="mt-1 text-sm font-bold text-white">Minimal</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/40 p-3 text-center">
                <Sparkles className="mx-auto h-4 w-4 text-[#D4AF37]" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-300">Focus</p>
                <p className="mt-1 text-sm font-bold text-white">Tone + Contour</p>
              </article>
            </div>
          </motion.article>
        </div>
      </section>

      <section
        id="fat-dissolving"
        className="relative border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#0b0b0b] via-[#090909] to-[#070707] px-4 py-12 md:px-8 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(212,175,55,0.13),transparent_46%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-12">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="overflow-hidden rounded-[26px] border border-[#D4AF37]/28 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#090909] p-6 lg:col-span-7 md:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Fat Dissolving Injections
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">
              Lemon Bottle and Aqualyx in One Plan
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              This page now includes dedicated fat dissolving information, pricing, and booking
              for localized fat-pocket treatment. Your practitioner maps the area first, selects
              the right injectable protocol, and combines it with contouring support when needed.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <article className="rounded-xl border border-white/15 bg-black/45 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  Step 01
                </p>
                <p className="mt-1 text-sm text-gray-200">Consultation and area assessment</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  Step 02
                </p>
                <p className="mt-1 text-sm text-gray-200">Protocol choice: Lemon Bottle or Aqualyx</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  Step 03
                </p>
                <p className="mt-1 text-sm text-gray-200">Review and follow-up treatment planning</p>
              </article>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={fatDissolvingBookingUrl}
                target={fatDissolvingBookingUrl.startsWith("http") ? "_blank" : undefined}
                rel={fatDissolvingBookingUrl.startsWith("http") ? "noreferrer" : undefined}
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black hover:bg-[#eac85a]"
              >
                Book Fat Dissolving
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#service-menu"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                View Packages
              </a>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ delay: 0.06 }}
            className="overflow-hidden rounded-[26px] border border-white/15 bg-black/45 p-5 lg:col-span-5"
          >
            <Image
              src="/images/fat-dissolving-injections.png"
              alt="Fat dissolving injections at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
              width={1000}
              height={1200}
              className="h-72 w-full rounded-2xl object-cover object-center"
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Packages</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">
                  {fatDissolvingItems.length}
                </p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">From</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">
                  {minimumFatDissolvingPrice ? `£${minimumFatDissolvingPrice}` : "Consult"}
                </p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Best For</p>
                <p className="mt-1 text-sm font-bold text-white">Stubborn Fat Pockets</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Downtime</p>
                <p className="mt-1 text-sm font-bold text-white">Minimal</p>
              </article>
            </div>
          </motion.article>
        </div>
      </section>

      <section id="service-menu" className="border-y border-neutral-800 bg-[#050505] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-3xl font-serif font-bold uppercase md:text-5xl">Body Sculpting and Fat Dissolving Services</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-gray-300 md:text-base">
            Services below are synced to your pricing page data and include direct booking links
            for body contouring, fat dissolving injections, and EMS packages.
          </p>

          <div className="mt-8 space-y-7">
            {categories.map((category, categoryIndex) => (
              <article key={category.title} className="rounded-[24px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0d0d0d] to-[#090909] p-4 md:p-5">
                <header className="mb-4 border-b border-white/10 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Category {String(categoryIndex + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-serif font-bold uppercase text-white md:text-3xl">{category.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-300">{categoryIntro(category.title)}</p>
                </header>

                <div className="space-y-3">
                  {category.items.map((item, index) => {
                    const external = item.link.startsWith("http");
                    return (
                      <article key={`${category.title}-${item.name}-${index}`} className="grid grid-cols-1 items-center gap-4 rounded-[20px] border border-white/12 bg-gradient-to-r from-black/70 via-[#101010] to-black/70 p-4 md:grid-cols-[minmax(0,1fr)_auto] md:p-5">
                        <div>
                          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-white">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/60 text-[10px] font-bold text-[#D4AF37]">{String(index + 1).padStart(2, "0")}</span>
                            {item.name}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-gray-300">{getDescription(item.name)}</p>
                        </div>
                        <div className="flex items-center gap-3 md:flex-col md:items-end">
                          <span className="rounded-full border border-[#D4AF37]/35 bg-[#17120a]/65 px-3 py-1 text-lg font-serif font-bold text-[#D4AF37]">{item.price}</span>
                          <a href={item.link} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="cta-button inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]">
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
          <h2 className="text-center text-3xl font-serif font-bold uppercase md:text-5xl">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <article key={faq.question} className="overflow-hidden rounded-xl border border-white/15 bg-black/40">
                <button type="button" onClick={() => setOpenFaq((current) => (current === index ? null : index))} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#121212] md:px-6">
                  <span className="text-sm font-semibold text-white md:text-base">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-[#D4AF37] transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="overflow-hidden">
                      <p className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-gray-300 md:px-6">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#D4AF37]/20 px-4 py-14 md:px-8">
        <Image src="/images/glowCta.png" alt="Body sculpting confidence results at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/72 to-black/85" />
        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl font-serif font-bold uppercase md:text-4xl">Ready To Sculpt and Dissolve Stubborn Fat?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            Book your consultation for body sculpting and fat dissolving injections at our medical
            aesthetics clinic in Hackney London.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href={bookingUrl} target={bookingUrl.startsWith("http") ? "_blank" : undefined} rel={bookingUrl.startsWith("http") ? "noreferrer" : undefined} className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]">
              Book Now
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact-us" className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#060606] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-12">
          <article className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#080808] p-6 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">{googleBusinessName}</p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Our Happy Patients</h3>
            <div className="mt-3 flex items-center gap-1">{renderStars(googleRating, "h-4 w-4")}</div>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Rated {googleRating.toFixed(1)} on Google with {googleReviewCount}+ verified reviews.
            </p>
            <a href={googleMapsPlaceUrl} target="_blank" rel="noreferrer" className="cta-button mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
              View All Reviews
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          <article className="rounded-[26px] border border-white/15 bg-black/45 p-5 lg:col-span-8 md:p-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">J Luxe Medical Aesthetics</p>
            <h3 className="mt-3 text-center text-3xl font-serif font-bold uppercase md:text-4xl">Our Location</h3>
            <MapEmbed src={googleMapsEmbedUrl} title="J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London map" className="mt-6 border border-neutral-800 bg-neutral-900 md:min-h-[360px]" />
            <div className="mt-6 text-center">
              <a href={googleMapsPlaceUrl} target="_blank" rel="noreferrer" className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]">
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


