"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MapEmbed from "../../components/MapEmbed";

const googleBusinessName = "J Luxe Medical Aesthetics";
const googleRating = 5;
const googleReviewCount = 80;
const googleMapsPlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
const googleMapsEmbedUrl =
  "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";

const patientReviews = [
  {
    authorName: "Amo",
    text: "Amazing experience. Definitely recommend. The EM sculpt is great.",
    relativeTimeDescription: "5 weeks ago",
    rating: 5,
  },
  {
    authorName: "A",
    text:
      "So warm and welcoming, explained the procedure thoroughly, and I achieved great results from my treatment.",
    relativeTimeDescription: "9 weeks ago",
    rating: 5,
  },
  {
    authorName: "Hannah Jones",
    text:
      "Jennifer is incredibly knowledgeable and personable. I had micro needling done and it was great.",
    relativeTimeDescription: "11 weeks ago",
    rating: 5,
  },
];

const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "J Luxe Medical Aesthetics",
  description:
    "Medical aesthetics clinic in Hackney, London offering dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
  areaServed: "Hackney, London",
  url: "/about-us",
  sameAs: [googleMapsPlaceUrl],
};
const breadcrumbSchema = {
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
      name: "About Us",
      item: "https://jluxemedicalaesthetics.com/about-us",
    },
  ],
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

export default function AboutPage() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveReview((current) => (current + 1) % patientReviews.length);
    }, 5200);

    return () => clearInterval(intervalId);
  }, []);

  const currentReview = patientReviews[activeReview];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO */}
      <section className="relative min-h-[66vh] md:min-h-[74vh] flex items-center overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/heroImagePrompt.png"
            alt="J Luxe Medical Aesthetics luxury hero in Hackney, London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/70 to-black/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,175,55,0.22),transparent_50%)]" />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f4dda1]/25 to-transparent"
            animate={{ x: ["-180%", "420%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#D4AF37]/12 blur-3xl"
          animate={{ y: [-16, 16, -16], x: [0, 12, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-14 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [16, -16, 16], x: [0, -10, 0] }}
          transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealStagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end"
          >
            <div className="lg:col-span-8 text-center lg:text-left">
              <motion.p
                variants={revealItem}
                className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-4"
              >
                J Luxe Medical Aesthetics
              </motion.p>
              <motion.h1
                variants={revealItem}
                className="text-4xl md:text-6xl font-serif font-bold leading-[0.94] uppercase"
              >
                Where Aesthetics
                <br />
                Meet Excellence.
              </motion.h1>
              <motion.div
                variants={revealItem}
                className="mt-5 h-px w-40 mx-auto lg:mx-0 bg-gradient-to-r from-[#D4AF37]/70 via-[#D4AF37]/30 to-transparent"
              />
              <motion.p
                variants={revealItem}
                className="mt-6 text-gray-200 text-sm md:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Discover a luxury medical aesthetics clinic in Hackney, London
                where clinical precision meets elegant, natural-looking outcomes.
              </motion.p>
              <motion.div
                variants={revealItem}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                <Link
                  href="/pricing"
                  className="cta-button inline-flex items-center gap-2 border border-[#D4AF37] text-white font-bold py-3 px-8 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors text-sm uppercase tracking-[0.1em]"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/treatment"
                  className="cta-button inline-flex items-center gap-2 border border-white/30 text-white font-bold py-3 px-8 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-sm uppercase tracking-[0.1em]"
                >
                  View Treatments
                </Link>
              </motion.div>
            </div>

            <motion.div variants={revealItem} className="lg:col-span-4">
              <motion.div
                className="rounded-[24px] border border-white/20 bg-black/45 backdrop-blur-sm p-5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5" />
                  Trusted in Hackney
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center gap-0.5">{renderStars(googleRating, "w-3 h-3")}</div>
                      <p className="text-lg font-serif font-bold text-white">{googleRating.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Reviews</p>
                    <p className="mt-1 text-lg font-serif font-bold text-white">{googleReviewCount}+</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-2.5 text-sm text-gray-200 inline-flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                    Consultation-Led Care
                  </div>
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-2.5 text-sm text-gray-200 inline-flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                    Natural-Looking Results
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealItem}
            className="relative h-full"
          >
            <div className="relative h-full min-h-[420px] rounded-[24px] overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#070707] p-6 md:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.45)]">
              <motion.div
                className="pointer-events-none absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#D4AF37]/15 blur-3xl"
                animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"
                animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
                transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f4dda1]/30 to-transparent"
                animate={{ x: ["-180%", "420%"] }}
                transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5" />
                  Clinical Story Card
                </p>

                <h3 className="mt-4 text-2xl md:text-3xl font-serif font-bold leading-tight">
                  Consultation-Led
                  <span className="text-[#D4AF37]"> Luxury Standards</span>
                </h3>

                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  Every journey begins with detailed assessment, facial mapping, and
                  a plan that prioritizes natural-looking confidence and long-term
                  skin health.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                    <p className="mt-1 text-xl font-serif font-bold text-white">5.0</p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Trusted Reviews</p>
                    <p className="mt-1 text-xl font-serif font-bold text-white">80+</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#D4AF37]">Step 1</p>
                    <p className="text-sm text-gray-200 mt-1">In-depth consultation and skin analysis</p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#D4AF37]">Step 2</p>
                    <p className="text-sm text-gray-200 mt-1">Precision treatment design for facial harmony</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealStagger}
            className="relative h-full min-h-[420px] rounded-[24px] border border-white/15 bg-black/35 p-6 md:p-7 overflow-hidden"
          >
            <div className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full bg-[#D4AF37]/10 blur-2xl" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

            <motion.p
              variants={revealItem}
              className="inline-flex items-center rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[#D4AF37] tracking-[0.2em] uppercase text-[11px] md:text-xs font-semibold mb-4"
            >
              Our Story
            </motion.p>
            <motion.h2 variants={revealItem} className="text-3xl md:text-4xl font-serif font-bold mb-4 uppercase">
              Built In Hackney, London
            </motion.h2>
            <motion.div
              variants={revealItem}
              className="mb-5 h-px w-40 bg-gradient-to-r from-[#D4AF37]/65 via-[#D4AF37]/25 to-transparent"
            />
            <motion.p variants={revealItem} className="text-gray-300 text-sm leading-relaxed mb-4">
              J Luxe Medical Aesthetics was founded to deliver a refined,
              welcoming, and medically led experience for clients seeking
              confidence-first aesthetic care in East London.
            </motion.p>
            <motion.p variants={revealItem} className="text-gray-300 text-sm leading-relaxed">
              Our approach replaces one-size-fits-all plans with tailored treatment
              mapping focused on facial balance, skin quality, and long-term
              results.
            </motion.p>

            <motion.div variants={revealStagger} className="mt-6 space-y-3">
              <motion.div
                variants={revealItem}
                className="rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-gray-200"
              >
                <span className="text-[#D4AF37] font-semibold uppercase text-[11px] tracking-[0.12em]">
                  Medical-Led
                </span>
                <p className="mt-1 text-gray-300">Clinical standards guide every recommendation.</p>
              </motion.div>
              <motion.div
                variants={revealItem}
                className="rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-gray-200"
              >
                <span className="text-[#D4AF37] font-semibold uppercase text-[11px] tracking-[0.12em]">
                  Personalized
                </span>
                <p className="mt-1 text-gray-300">Plans tailored to your anatomy, goals, and lifestyle.</p>
              </motion.div>
            </motion.div>

            <motion.div variants={revealItem} className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-black font-bold py-3 px-6 text-xs uppercase tracking-[0.12em] hover:bg-yellow-500 transition-colors"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact-us"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-bold py-3 px-6 text-xs uppercase tracking-[0.12em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealStagger}
            className="order-2 md:order-1 relative h-full min-h-[420px] rounded-[24px] border border-white/15 bg-black/35 p-6 md:p-7 overflow-hidden"
          >
            <div className="pointer-events-none absolute -left-10 top-8 h-32 w-32 rounded-full bg-[#D4AF37]/12 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-28 w-28 rounded-full bg-white/8 blur-3xl" />

            <motion.p
              variants={revealItem}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[#D4AF37] tracking-[0.2em] uppercase text-[11px] md:text-xs font-semibold mb-4"
            >
              <Star className="w-3.5 h-3.5" />
              Our Philosophy
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="text-3xl md:text-4xl font-serif font-bold mb-4 uppercase"
            >
              Natural Results,
              <span className="text-[#D4AF37]"> Refined Confidence</span>
            </motion.h2>
            <motion.div
              variants={revealItem}
              className="mb-5 h-px w-40 bg-gradient-to-r from-[#D4AF37]/65 via-[#D4AF37]/25 to-transparent"
            />
            <motion.p variants={revealItem} className="text-gray-300 text-sm leading-relaxed mb-5">
              We prioritize subtle enhancement, skin health, and facial harmony.
              Every recommendation is guided by clinical standards and your
              individual goals.
            </motion.p>

            <motion.div variants={revealStagger} className="space-y-3 mb-6">
              <motion.div
                variants={revealItem}
                className="rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-gray-200"
              >
                <span className="text-[#D4AF37] font-semibold uppercase text-[11px] tracking-[0.12em]">
                  Facial Harmony
                </span>
                <p className="mt-1 text-gray-300">Balanced enhancements that respect your natural anatomy.</p>
              </motion.div>
              <motion.div
                variants={revealItem}
                className="rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-sm text-gray-200"
              >
                <span className="text-[#D4AF37] font-semibold uppercase text-[11px] tracking-[0.12em]">
                  Long-Term Skin Health
                </span>
                <p className="mt-1 text-gray-300">Treatment planning built for sustainable, elegant outcomes.</p>
              </motion.div>
            </motion.div>

            <motion.div variants={revealItem} className="flex flex-wrap gap-3">
              <Link
                href="/treatment"
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-black font-bold py-3 px-6 text-xs uppercase tracking-[0.12em] hover:bg-yellow-500 transition-colors"
              >
                View Treatments
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-bold py-3 px-6 text-xs uppercase tracking-[0.12em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealItem}
            className="order-1 md:order-2 relative h-full"
          >
            <motion.div
              className="relative h-full min-h-[420px] rounded-[24px] overflow-hidden border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#070707] p-6 md:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.45)]"
            >
              <motion.div
                className="pointer-events-none absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#D4AF37]/14 blur-3xl"
                animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute right-0 bottom-0 h-36 w-36 rounded-full bg-white/10 blur-3xl"
                animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
                transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f5e2aa]/25 to-transparent"
                animate={{ x: ["-180%", "420%"] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5" />
                  Trust Metrics
                </p>

                <h3 className="mt-4 text-2xl md:text-3xl font-serif font-bold leading-tight">
                  Why Clients Trust
                  <span className="text-[#D4AF37]"> J Luxe</span>
                </h3>

                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  Clinical consistency, consultation-led planning, and premium
                  standards at our Hackney, London clinic.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="rounded-xl border border-white/15 bg-black/45 px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center gap-0.5">{renderStars(googleRating, "w-3 h-3")}</div>
                      <p className="text-lg font-serif font-bold text-white">{googleRating.toFixed(1)}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="rounded-xl border border-white/15 bg-black/45 px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Verified Reviews</p>
                    <p className="mt-1 text-lg font-serif font-bold text-white">{googleReviewCount}+</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="rounded-xl border border-white/15 bg-black/45 px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Care Model</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-100">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Consultation-Led
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="rounded-xl border border-white/15 bg-black/45 px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Location</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-100">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Hackney, London
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  variants={revealItem}
                  className="mt-6 rounded-xl border border-[#D4AF37]/25 bg-gradient-to-r from-black/55 via-black/45 to-black/30 px-4 py-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                    Client Promise
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-200">
                      Precision planning, natural-looking results, and elevated aftercare.
                    </p>
                    <Link
                      href="/pricing"
                      className="cta-button inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                    >
                      Start Consultation
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealItem}
            className="relative h-full min-h-[420px] flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
                <motion.div
                  className="absolute -inset-5 md:-inset-6 rounded-full border border-[#D4AF37]/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-2.5 md:-inset-3 rounded-full border border-white/10"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                  <Image
                    src="/images/advancedFacials.png"
                    alt="Advanced facial treatment at J Luxe Medical Aesthetics in Hackney, London"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 360px, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/25" />
                </div>
                <div className="absolute top-2 right-5 md:right-7 w-8 h-8 rounded-full bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
              </div>
              <div className="mt-5 rounded-full border border-[#D4AF37]/40 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                London Skin Care
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealStagger}
            className="relative h-full rounded-[24px] border border-white/15 bg-black/35 p-6 md:p-7 overflow-hidden"
          >
            <div className="pointer-events-none absolute -right-8 top-6 h-28 w-28 rounded-full bg-[#D4AF37]/10 blur-2xl" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-24 w-24 rounded-full bg-white/8 blur-2xl" />
            <motion.p
              variants={revealItem}
              className="inline-flex items-center rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[#D4AF37] tracking-[0.2em] uppercase text-[11px] md:text-xs font-semibold mb-4"
            >
              What We Offer
            </motion.p>
            <motion.h2 variants={revealItem} className="text-3xl md:text-4xl font-serif font-bold mb-4 uppercase">
              Comprehensive Non-Surgical Care
            </motion.h2>
            <motion.div
              variants={revealItem}
              className="mb-5 h-px w-40 bg-gradient-to-r from-[#D4AF37]/65 via-[#D4AF37]/25 to-transparent"
            />
            <motion.p variants={revealItem} className="text-gray-300 text-sm leading-relaxed mb-5">
              As a London aesthetics clinic, we offer expert dermal fillers,
              anti-wrinkle injections, skin boosters, body sculpting, chemical
              peels, and more.
            </motion.p>
            <motion.ul variants={revealStagger} className="space-y-3 mb-8 text-sm text-gray-200">
              <motion.li
                variants={revealItem}
                className="flex items-start gap-2.5 rounded-xl border border-white/15 bg-black/45 px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" />
                Anti-wrinkle injections to smooth expression lines
              </motion.li>
              <motion.li
                variants={revealItem}
                className="flex items-start gap-2.5 rounded-xl border border-white/15 bg-black/45 px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" />
                Dermal fillers for structure, contour, and balance
              </motion.li>
              <motion.li
                variants={revealItem}
                className="flex items-start gap-2.5 rounded-xl border border-white/15 bg-black/45 px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" />
                Skin boosters and mesotherapy for hydration and glow
              </motion.li>
              <motion.li
                variants={revealItem}
                className="flex items-start gap-2.5 rounded-xl border border-white/15 bg-black/45 px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 mt-0.5 text-[#D4AF37] shrink-0" />
                Body sculpting and fat dissolving for definition
              </motion.li>
            </motion.ul>
            <motion.div variants={revealItem}>
              <Link
                href="/treatment"
                className="cta-button inline-flex items-center gap-2 border border-white text-white py-3 px-8 rounded-full text-xs font-bold uppercase tracking-[0.14em] hover:bg-white hover:text-black transition-colors"
              >
                View All Treatments
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealStagger}
            className="order-2 md:order-1 relative h-full rounded-[24px] border border-white/15 bg-black/35 p-6 md:p-7 overflow-hidden"
          >
            <div className="pointer-events-none absolute -left-10 top-8 h-28 w-28 rounded-full bg-[#D4AF37]/10 blur-2xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 rounded-full bg-white/8 blur-2xl" />
            <motion.p
              variants={revealItem}
              className="inline-flex items-center rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[#D4AF37] tracking-[0.2em] uppercase text-[11px] md:text-xs font-semibold mb-4"
            >
              Our Promise
            </motion.p>
            <motion.h2 variants={revealItem} className="text-3xl md:text-4xl font-serif font-bold mb-4 uppercase">
              Why Clients Choose J Luxe
            </motion.h2>
            <motion.div
              variants={revealItem}
              className="mb-5 h-px w-40 bg-gradient-to-r from-[#D4AF37]/65 via-[#D4AF37]/25 to-transparent"
            />
            <motion.ul variants={revealStagger} className="space-y-4 mb-8 text-sm text-gray-300">
              <motion.li
                variants={revealItem}
                className="flex gap-3 rounded-xl border border-white/15 bg-black/45 px-4 py-3"
              >
                <span className="text-[#D4AF37]">-</span>
                <span>
                  <strong>Personalized treatment planning:</strong> every protocol
                  is tailored to your anatomy and goals.
                </span>
              </motion.li>
              <motion.li
                variants={revealItem}
                className="flex gap-3 rounded-xl border border-white/15 bg-black/45 px-4 py-3"
              >
                <span className="text-[#D4AF37]">-</span>
                <span>
                  <strong>Premium products and standards:</strong> we use trusted,
                  high-quality products selected for safety and consistency.
                </span>
              </motion.li>
              <motion.li
                variants={revealItem}
                className="flex gap-3 rounded-xl border border-white/15 bg-black/45 px-4 py-3"
              >
                <span className="text-[#D4AF37]">-</span>
                <span>
                  <strong>Medical-led expertise:</strong> our approach is grounded
                  in clinical assessment and refined outcomes.
                </span>
              </motion.li>
            </motion.ul>
            <motion.div variants={revealItem}>
              <Link
                href="/pricing"
                className="cta-button inline-flex items-center gap-2 border border-white text-white py-3 px-8 rounded-full text-xs font-bold uppercase tracking-[0.14em] hover:bg-white hover:text-black transition-colors"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealItem}
            className="order-1 md:order-2 relative h-full min-h-[420px] flex items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
                <motion.div
                  className="absolute -inset-5 md:-inset-6 rounded-full border border-[#D4AF37]/20"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-2.5 md:-inset-3 rounded-full border border-white/10"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                  <Image
                    src="/images/dermalFillers.png"
                    alt="Dermal filler treatment at J Luxe Medical Aesthetics in Hackney, London"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 360px, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/25" />
                </div>
                <div className="absolute top-2 right-5 md:right-7 w-8 h-8 rounded-full bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
              </div>
              <div className="mt-5 rounded-full border border-[#D4AF37]/40 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                Medical-Led Results
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-16 px-4 md:px-8 border-t border-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto overflow-hidden rounded-[30px] border border-[#D4AF37]/25 bg-gradient-to-r from-[#17120a] via-[#0b0b0b] to-[#17120a] p-6 md:p-8"
        >
          <motion.div
            className="pointer-events-none absolute -left-12 top-10 h-40 w-40 rounded-full bg-[#D4AF37]/12 blur-3xl"
            animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute right-0 bottom-0 h-44 w-44 rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
            transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={revealItem}
              className="md:col-span-4"
            >
              <div className="rounded-[24px] border border-white/15 bg-black/35 p-4">
                <div className="relative h-64 rounded-[18px] overflow-hidden border border-white/15">
                  <Image
                    src="/images/featureImagePrompt.png"
                    alt="Founder portrait at J Luxe Medical Aesthetics in Hackney, London"
                    fill
                    className="object-cover object-[50%_28%]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/20" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#D4AF37] text-center">
                  Founder & Lead Practitioner
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={revealStagger}
              className="md:col-span-8 rounded-[24px] border border-white/15 bg-black/35 p-5 md:p-6"
            >
              <motion.p
                variants={revealItem}
                className="inline-flex items-center rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[#D4AF37] tracking-[0.18em] uppercase text-[11px] font-semibold mb-4"
              >
                Meet The Founder
              </motion.p>
              <motion.h3
                variants={revealItem}
                className="text-2xl md:text-3xl font-serif font-bold leading-tight"
              >
                A Personal Commitment To
                <span className="text-[#D4AF37]"> Natural, Elegant Results</span>
              </motion.h3>
              <motion.p variants={revealItem} className="mt-4 text-gray-300 text-sm leading-relaxed">
                &quot;My mission is to empower clients through safe, effective, and
                naturally elegant results. We guide each treatment with care,
                transparency, and clinical precision from consultation to aftercare.&quot;
              </motion.p>

              <motion.div variants={revealItem} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Approach</p>
                  <p className="mt-1 text-sm font-semibold text-gray-100">Medical-Led & Personalized</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Clinic Base</p>
                  <p className="mt-1 text-sm font-semibold text-gray-100">Hackney, London</p>
                </div>
              </motion.div>

              <motion.div variants={revealItem} className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-bold py-3 px-6 text-xs uppercase tracking-[0.12em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] text-black font-bold py-3 px-6 text-xs uppercase tracking-[0.12em] hover:bg-yellow-500 transition-colors"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* REVIEWS + LOCATION + CONTACT CTA */}
      <section className="py-16 px-4 md:px-8 bg-[#050505] border-y border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 rounded-[26px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#070707] p-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-2">
              Tailored For You
            </p>
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
            className="lg:col-span-8 rounded-[26px] border border-white/15 bg-black/45 p-6 md:p-7 overflow-hidden relative"
          >
            <motion.div
              className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f6e9bc]/35 to-transparent"
              animate={{ x: ["-180%", "420%"] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentReview.authorName}-${currentReview.relativeTimeDescription}`}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-black text-xs font-bold uppercase">
                      {currentReview.authorName.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{currentReview.authorName}</p>
                      <p className="text-xs text-gray-500">{currentReview.relativeTimeDescription}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">{renderStars(currentReview.rating, "w-4 h-4")}</div>
                </div>
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">{currentReview.text}</p>
              </motion.div>
            </AnimatePresence>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-6xl mx-auto rounded-[30px] border border-white/15 bg-black/45 p-6 md:p-8 mb-10"
        >
          <p className="text-[#D4AF37] tracking-[0.16em] uppercase text-xs md:text-sm mb-2 text-center">
            {googleBusinessName}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6">
            Our Location
          </h2>

          <MapEmbed
            src={googleMapsEmbedUrl}
            title="J Luxe Medical Aesthetics location on Google Maps"
            className="border border-neutral-800 bg-neutral-900 md:min-h-[360px]"
          />

          <p className="mt-5 text-sm text-gray-300 text-center max-w-3xl mx-auto">
            Visit us in Hackney, London for consultation-led treatment planning,
            dermal fillers, anti-wrinkle injections, skin boosters, and body
            sculpting treatments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 uppercase">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Have questions about treatments or consultation suitability? Our team is
            happy to help.
          </p>
          <Link
            href="/contact-us"
            className="cta-button inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full text-xs uppercase tracking-[0.14em] transition-colors"
          >
            Contact
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
