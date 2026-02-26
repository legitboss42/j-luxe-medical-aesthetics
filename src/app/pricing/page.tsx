"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Copy, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MapEmbed from "../../components/MapEmbed";
import { pricingCategories, type PricingItem } from "./pricing-data";

const googleBusinessName = "J Luxe Medical Aesthetics";
const googleRating = 5;
const googleReviewCount = 80;
const googleMapsPlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
const googleMapsEmbedUrl =
  "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";
const referralDiscountCode = "JLUXE-DUMMY20";
const referralPopupSeenStorageKey = "jluxe_referral_popup_seen";
const referralDiscountCodeStorageKey = "jluxe_referral_discount_code";

const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

function parsePrice(price: string) {
  const numeric = price.replace(/[^0-9.]/g, "");
  return numeric.length > 0 ? numeric : "0.00";
}

function extractPriceValues(price: string) {
  const matches = price.match(/\d+(?:\.\d+)?/g);
  if (!matches) return [];
  return matches
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
}

function getStartingPrice(items: PricingItem[]) {
  const values = items.flatMap((item) => extractPriceValues(item.price));
  if (values.length === 0) return null;
  return Math.min(...values);
}

function formatPounds(value: number) {
  return `£${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2)}`;
}

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

function normalizeReferralCode(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "-")
    .replace(/[^A-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 28);
}

export default function PricingPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(
    pricingCategories[0]?.title ?? null,
  );
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);
  const totalTreatments = useMemo(
    () => pricingCategories.reduce((sum, category) => sum + category.items.length, 0),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: number | null = null;

    const maybeShowReferralPopup = () => {
      const params = new URLSearchParams(window.location.search);
      const referralParam = params.get("ref") ?? "";
      const referralSource = (params.get("src") ?? "").toLowerCase();
      const isGeneratedReferralLink =
        referralSource === "referral" && /-jlx-/i.test(referralParam);

      if (!isGeneratedReferralLink) return;

      const normalizedReferral = normalizeReferralCode(referralParam);
      if (normalizedReferral) {
        localStorage.setItem("jluxe_referral_code", normalizedReferral);
      }

      fetch("/api/referrals/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "referral_visit",
          ref: normalizedReferral,
          source: "pricing-page",
          path: "/pricing",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // tracking failures are non-blocking
      });

      const alreadyShown = localStorage.getItem(referralPopupSeenStorageKey) === "1";
      if (alreadyShown) return;

      localStorage.setItem(referralPopupSeenStorageKey, "1");
      localStorage.setItem(referralDiscountCodeStorageKey, referralDiscountCode);
      localStorage.setItem("jluxe_referral_popup_seen_at", new Date().toISOString());
      setShowReferralPopup(true);
    };

    if (document.readyState === "complete") {
      timeoutId = window.setTimeout(maybeShowReferralPopup, 120);
    } else {
      window.addEventListener("load", maybeShowReferralPopup, { once: true });
    }

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("load", maybeShowReferralPopup);
    };
  }, []);

  const copyReferralDiscountCode = async () => {
    try {
      await navigator.clipboard.writeText(referralDiscountCode);
      setCopiedReferralCode(true);
      window.setTimeout(() => setCopiedReferralCode(false), 1800);
    } catch {
      setCopiedReferralCode(false);
    }
  };

  const pricingSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "J Luxe Medical Aesthetics Price List",
      itemListElement: pricingCategories.map((category, categoryIndex) => ({
        "@type": "OfferCatalog",
        name: category.title,
        position: categoryIndex + 1,
        itemListElement: category.items.map((item, itemIndex) => ({
          "@type": "Offer",
          name: item.name,
          position: itemIndex + 1,
          priceCurrency: "GBP",
          price: parsePrice(item.price),
          availability: "https://schema.org/InStock",
          url: item.link,
        })),
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
          name: "Pricing",
          item: "https://jluxemedicalaesthetics.com/pricing",
        },
      ],
    }),
    [],
  );

  const toggleCategory = (title: string) => {
    setOpenCategory((current) => (current === title ? null : title));
  };

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnimatePresence>
        {showReferralPopup && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-xl rounded-2xl border border-[#D4AF37]/35 bg-[#0b0b0b] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] md:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="referral-discount-heading"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                Referral Discount
              </p>
              <h2
                id="referral-discount-heading"
                className="mt-2 text-2xl font-serif font-bold uppercase leading-tight md:text-3xl"
              >
                Your Discount Code Is Ready
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                You arrived through a referral link. Copy your code now and keep it safe for
                Vagaro checkout.
              </p>

              <div className="mt-4 rounded-xl border border-[#D4AF37]/30 bg-black/45 p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Discount Code</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <code className="rounded-md border border-white/15 bg-black/50 px-3 py-2 text-sm font-bold tracking-[0.08em] text-[#D4AF37]">
                    {referralDiscountCode}
                  </code>
                  <button
                    type="button"
                    onClick={copyReferralDiscountCode}
                    className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    {copiedReferralCode ? "Copied" : "Copy Code"}
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-300">
                <li>Select a treatment and click BOOK to open Vagaro.</li>
                <li>At Vagaro checkout, paste this code in the discount or promo code field.</li>
                <li>Apply the code and complete your booking.</li>
              </ol>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                Copy this code now and keep it safe.
              </p>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setShowReferralPopup(false)}
                  className="cta-button inline-flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
                >
                  I Have Saved My Code
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-[54vh] md:min-h-[62vh] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/heroImagePrompt.png"
            alt="Pricing consultation visual at J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.22),transparent_50%)]" />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-[#D4AF37]/12 blur-3xl"
          animate={{ y: [-14, 14, -14], x: [0, 12, 0] }}
          transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-14 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [16, -16, 16], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-20 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={revealItem}>
            <p className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-4">
              J Luxe Medical Aesthetics
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[0.94] uppercase">
              Luxury Aesthetics.
              <br />
              Honest Pricing.
            </h1>
            <p className="mt-6 text-gray-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Transparent pricing with no hidden fees. Final quotes are confirmed during consultation
              based on your treatment goals.
            </p>
            <div className="mt-8">
              <Link
                href="/treatment"
                className="cta-button inline-flex items-center gap-2 border border-[#D4AF37] text-white font-bold py-3 px-8 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors text-sm uppercase tracking-[0.1em]"
              >
                Explore Treatments
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-14 md:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(212,175,55,0.10),transparent_45%)]" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 md:mb-10"
          >
            <p className="text-[#D4AF37] tracking-[0.18em] uppercase text-xs md:text-sm font-semibold mb-2">
              {googleBusinessName}
            </p>
            <h2 className="text-4xl font-serif font-bold mb-5 uppercase">Price List</h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
              At J Luxe Medical Aesthetics, we keep pricing transparent and consultation-led for
              safety and suitability. Browse live treatment pricing below and book directly from
              each service line.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.04 }}
            className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4"
          >
            <article className="rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#161109] via-[#0c0c0c] to-[#0a0a0a] p-3.5 sm:p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                Categories
              </p>
              <p className="mt-2 text-3xl font-serif font-bold text-white">{pricingCategories.length}</p>
              <p className="mt-1 text-xs text-gray-400">Treatment menus</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/35 p-3.5 sm:p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                Total Services
              </p>
              <p className="mt-2 text-3xl font-serif font-bold text-white">{totalTreatments}</p>
              <p className="mt-1 text-xs text-gray-400">Bookable lines</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/35 p-3.5 sm:p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                Google Rating
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">{renderStars(googleRating, "h-4 w-4")}</div>
                <span className="text-sm font-semibold text-white">{googleRating.toFixed(1)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">{googleReviewCount}+ client reviews</p>
            </article>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="overflow-hidden rounded-[28px] border border-[#D4AF37]/30 bg-black/35 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-[2px]"
          >
            {pricingCategories.map((category) => {
              const isOpen = openCategory === category.title;
              const startingPrice = getStartingPrice(category.items);
              const priceBadge =
                startingPrice === null ? "Consultation required" : `From ${formatPounds(startingPrice)}`;
              const mobilePriceBadge =
                startingPrice === null ? "Consult" : `From ${formatPounds(startingPrice)}`;

              return (
                <div key={category.title} className="border-b border-[#D4AF37]/20 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.title)}
                    className={`w-full min-h-[64px] px-3 py-3.5 text-left transition-colors duration-300 md:px-5 md:py-5 ${
                      isOpen
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#c59d2c] text-black"
                        : "text-white hover:bg-neutral-900/80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="block truncate text-[11px] font-bold uppercase tracking-[0.11em] sm:text-xs md:text-sm">
                            {category.title}
                          </span>
                          <span
                            className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:hidden ${
                              isOpen
                                ? "border-black/25 bg-black/10 text-black"
                                : "border-white/20 bg-black/35 text-gray-200"
                            }`}
                          >
                            {category.items.length}
                          </span>
                        </div>
                        <span
                          className={`mt-1 hidden text-[11px] sm:block ${
                            isOpen ? "text-black/75" : "text-gray-400"
                          }`}
                        >
                          {category.items.length} services
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:hidden ${
                            isOpen
                              ? "border-black/25 bg-black/10 text-black"
                              : "border-[#D4AF37]/35 bg-black/40 text-[#D4AF37]"
                          }`}
                        >
                          {mobilePriceBadge}
                        </span>
                        <span
                          className={`hidden rounded-full px-3 py-1 text-[11px] font-semibold sm:inline-flex ${
                            isOpen
                              ? "border border-black/20 bg-black/10 text-black"
                              : "border border-[#D4AF37]/35 bg-black/40 text-[#D4AF37]"
                          }`}
                        >
                          {priceBadge}
                        </span>
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                            isOpen ? "border-black/25 bg-black/10" : "border-white/20 bg-black/25"
                          }`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-black" : "text-[#D4AF37]"
                            }`}
                          />
                        </span>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden bg-gradient-to-b from-neutral-950/75 to-neutral-900/35"
                      >
                        <div className="flex flex-col gap-2 p-3 md:p-5">
                          {category.items.map((item, index) => (
                            <div
                              key={`${item.name}-${index}`}
                              className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 px-3 py-3 transition-colors duration-300 hover:border-[#D4AF37]/45 hover:bg-black/60 sm:flex-row sm:items-center sm:justify-between sm:gap-3 md:px-4 md:py-3.5"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[11px] font-bold text-[#D4AF37]">
                                  {index + 1}
                                </span>
                                <span className="text-sm font-medium leading-snug text-gray-100 md:text-[15px]">
                                  {item.name}
                                </span>
                              </div>
                              <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
                                <span className="whitespace-nowrap pr-2 text-sm font-semibold text-[#D4AF37] md:text-base">
                                  {item.price}
                                </span>
                                <Link
                                  href={item.link}
                                  className="cta-button inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#D4AF37] hover:text-black sm:min-h-0 sm:px-5 sm:py-2"
                                >
                                  BOOK
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-5 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-xs text-gray-400 leading-relaxed md:mt-6"
          >
            All treatments are consultation-led, and final recommendations are confirmed in clinic
            for safety and suitability.
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-[#050505] border-y border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 rounded-[26px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#070707] p-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-2">Tailored For You</p>
            <h2 className="text-2xl font-serif font-bold mb-4">Our Happy Clients</h2>
            <div className="flex items-center gap-1 mb-3">{renderStars(googleRating, "w-4 h-4")}</div>
            <p className="text-sm text-gray-300 mb-5">
              Rated {googleRating.toFixed(1)} on Google ({googleReviewCount} reviews)
            </p>
            <a
              href={googleMapsPlaceUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-button inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              View All Reviews
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="lg:col-span-8 rounded-[26px] border border-white/15 bg-black/45 p-6 md:p-7"
          >
            <p className="text-[#D4AF37] tracking-[0.16em] uppercase text-xs md:text-sm mb-2 text-center">
              {googleBusinessName}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6">Our Location</h2>

            <MapEmbed
              src={googleMapsEmbedUrl}
              title="J Luxe Medical Aesthetics location on Google Maps"
              className="border border-neutral-800 bg-neutral-900 md:min-h-[360px]"
            />

            <p className="mt-5 text-sm text-gray-300 text-center max-w-3xl mx-auto inline-flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              Visit our Hackney, London clinic for consultation-led treatment planning.
            </p>

            <div className="mt-6 text-center">
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="cta-button inline-flex items-center gap-2 border border-white/30 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] font-bold py-3 px-8 rounded-full text-xs uppercase tracking-[0.14em] transition-colors"
              >
                Get Directions
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
