"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MapEmbed from "../../components/MapEmbed";

type Treatment = {
  id: string;
  title: string;
  desc: string;
  href: string;
  imageSrc: string;
  objectPosition?: string;
  vibe: string;
};

const treatments: Treatment[] = [
  {
    id: "facials",
    title: "FACIALS",
    desc: "Enhance your natural beauty and achieve a radiant complexion.",
    href: "/facials",
    imageSrc: "/images/advancedFacials.png",
    objectPosition: "object-center",
    vibe: "Skin Rejuvenation",
  },
  {
    id: "body-sculpting",
    title: "BODY SCULPTING",
    desc: "Sculpt and contour your body with our non-surgical treatments.",
    href: "/body-sculpting-2",
    imageSrc: "/images/bodySculpting.png",
    objectPosition: "object-center",
    vibe: "Body Definition",
  },
  {
    id: "fillers",
    title: "DERMAL FILLERS",
    desc: "Restore volume and enhance your features with our premium fillers.",
    href: "/fillers",
    imageSrc: "/images/dermalFillers.png",
    objectPosition: "object-center",
    vibe: "Facial Harmony",
  },
  {
    id: "anti-wrinkle",
    title: "ANTI-WRINKLE INJECTIONS",
    desc: "Smooth away fine lines and wrinkles for a youthful appearance.",
    href: "/anti-wrinkle-injection",
    imageSrc: "/images/anti-wrinkle-injection.png",
    objectPosition: "object-center",
    vibe: "Refined Smoothness",
  },
  {
    id: "skin-boosters",
    title: "SKIN BOOSTERS",
    desc: "Revitalize your skin with our hydrating and rejuvenating treatments.",
    href: "/skin-boosters-mesotherapy",
    imageSrc: "/images/skin-boosters-mesotherapy.png",
    objectPosition: "object-center",
    vibe: "Hydration Focus",
  },
  {
    id: "prp",
    title: "PRP TREATMENT",
    desc: "Harness the power of your own body to stimulate collagen and elastin.",
    href: "/prp-treatment",
    imageSrc: "/images/prp-treatment.png",
    objectPosition: "object-center",
    vibe: "Collagen Renewal",
  },
  {
    id: "fat-dissolving",
    title: "FAT DISSOLVING",
    desc: "Target stubborn fat pockets and achieve a more sculpted physique.",
    href: "/body-sculpting-2#fat-dissolving",
    imageSrc: "/images/fat-dissolving-injections.png",
    objectPosition: "object-center",
    vibe: "Contouring Focus",
  },
  {
    id: "teeth-whitening",
    title: "TEETH WHITENING",
    desc: "Brighten your smile with our professional London teeth whitening.",
    href: "/teeth-whitening",
    imageSrc: "/images/teeth-whitening.png",
    objectPosition: "object-center",
    vibe: "Smile Brightening",
  },
  {
    id: "exosomes",
    title: "EXOSOMES",
    desc: "Promote cellular regeneration and healing with our advanced therapy.",
    href: "/exosomes",
    imageSrc: "/images/exosome.png",
    objectPosition: "object-center",
    vibe: "Cellular Support",
  },
  {
    id: "chemical-peels",
    title: "CHEMICAL PEELS",
    desc: "Improve skin texture and tone with our professional grade peels.",
    href: "/chemical-peels",
    imageSrc: "/images/chemical-peels.png",
    objectPosition: "object-[58%_34%]",
    vibe: "Texture Refinement",
  },
  {
    id: "iv-drip",
    title: "IV VITAMIN DRIP",
    desc: "Replenish your body with essential vitamins, minerals, and nutrients.",
    href: "/iv-vitamin-drip",
    imageSrc: "/images/iv-vitamin-drip.png",
    objectPosition: "object-[44%_34%]",
    vibe: "Wellness Infusion",
  },
  {
    id: "waxing",
    title: "WAXING",
    desc: "Achieve smooth, hair-free skin with our professional waxing services.",
    href: "/waxing",
    imageSrc: "/images/waxing.png",
    objectPosition: "object-center",
    vibe: "Smooth Finish",
  },
];

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
  {
    authorName: "Rushamba Wright",
    text:
      "A fantastic hydrafacial and a very thorough consultation. My skin looked refreshed and moisturised after.",
    relativeTimeDescription: "11 weeks ago",
    rating: 5,
  },
];

const googleBusinessName = "J Luxe Medical Aesthetics";
const googleRating = 5;
const googleReviewCount = 80;
const googleMapsPlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
const googleMapsEmbedUrl =
  "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";
const treatmentListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "J Luxe Medical Aesthetics Treatments",
  description:
    "Non-surgical aesthetic treatments in East London, including dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
  itemListElement: treatments.map((treatment, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: treatment.title,
    url: treatment.href,
  })),
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
      name: "Treatments",
      item: "https://jluxemedicalaesthetics.com/treatment",
    },
  ],
};

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
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

export default function TreatmentPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(treatmentListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* HERO */}
      <section className="relative min-h-[72vh] flex items-center overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/heroImagePrompt.png"
            alt="Luxury treatments hero at J Luxe Medical Aesthetics in Hackney, London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/72 to-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_36%,rgba(212,175,55,0.22),transparent_46%)]" />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f5df9d]/25 to-transparent"
            animate={{ x: ["-170%", "420%"] }}
            transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[#D4AF37]/12 blur-3xl"
          animate={{ y: [-16, 16, -16], x: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [16, -16, 16], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroStagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-end"
          >
            <div className="lg:col-span-7">
              <motion.p
                variants={revealItem}
                className="text-[#D4AF37] tracking-[0.22em] uppercase text-xs md:text-sm font-semibold mb-4"
              >
                J Luxe Medical Aesthetics
              </motion.p>

              <motion.h1
                variants={revealItem}
                className="text-4xl md:text-6xl font-serif font-bold leading-[0.92] tracking-[0.012em] uppercase max-w-[14ch]"
              >
                Redefining Beauty,
                <br />
                One Signature Treatment
                <br />
                At A Time.
              </motion.h1>

              <motion.p
                variants={revealItem}
                className="mt-6 max-w-[44ch] text-gray-200/95 text-base md:text-lg leading-relaxed"
              >
                Discover expert non-surgical aesthetic treatments in East London,
                including dermal fillers, anti-wrinkle injections, skin boosters,
                and body sculpting, tailored for natural-looking results.
              </motion.p>

              <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="cta-button inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold py-3 px-7 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  BOOK CONSULTATION
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-us"
                  className="cta-button inline-flex items-center gap-2 border border-white/30 text-white font-bold py-3 px-7 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  TALK TO OUR TEAM
                </Link>
              </motion.div>
            </div>

            <motion.div variants={revealItem} className="lg:col-span-5">
              <motion.div
                className="rounded-[30px] overflow-hidden border border-white/20 bg-black/45 backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative h-72 md:h-80">
                  <Image
                    src="/images/featureImagePrompt.png"
                    alt="Treatment consultation at J Luxe Medical Aesthetics in Hackney, London"
                    fill
                    className="object-cover object-[50%_38%]"
                    sizes="(min-width: 1024px) 34vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45" />
                  <div className="absolute left-4 right-4 bottom-4 rounded-full border border-[#D4AF37]/40 bg-black/65 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#D4AF37] text-center">
                    Advanced Nurse-Led Aesthetic Medicine
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 border border-white/12 rounded-2xl bg-black/45 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-400">Treatments</p>
                    <p className="text-lg font-serif font-bold text-white">12+</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 border border-white/12 rounded-2xl bg-black/45 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">{renderStars(5, "w-3.5 h-3.5")}</div>
                      <p className="text-sm font-semibold text-white">5.0</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TREATMENTS DIRECTORY */}
      <section className="relative pt-20 pb-8 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-6xl mx-auto text-center mb-12"
        >
          <p className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-3">
            Trusted Aesthetics Specialists in East London
          </p>
          <h2 className="mx-auto max-w-[18ch] text-3xl md:text-5xl font-serif font-bold leading-[0.98]">
            Aesthetic Treatments in
            <span className="text-[#D4AF37]"> Hackney, London</span>
          </h2>
          <p className="mt-5 text-gray-300 max-w-[60ch] mx-auto leading-relaxed">
            From lip filler and anti-wrinkle injections to advanced body contouring
            and skin rejuvenation, every treatment is consultation-led and designed
            for balanced, confidence-first results.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={heroStagger}
          className="max-w-6xl mx-auto flex flex-col gap-6"
        >
          {treatments.map((treatment, index) => (
            <Link key={treatment.id} href={treatment.href} className="block group">
              {/*
                Some larger PNGs can appear blank while Next image optimization resolves.
                For known heavy assets, we bypass optimization and eager-load for reliability.
              */}
              {(() => {
                const forceDirectImage =
                  treatment.id === "chemical-peels" || treatment.id === "iv-drip";

                return (
              <motion.article
                variants={revealItem}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[32px] md:rounded-full border border-white/15 bg-black/45 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
              >
                <div className="absolute inset-y-0 right-0 w-[58%] md:w-[46%]">
                  <Image
                    src={treatment.imageSrc}
                    alt={`${treatment.title} treatment at J Luxe Medical Aesthetics in Hackney, London`}
                    fill
                    unoptimized={forceDirectImage}
                    loading={forceDirectImage ? "eager" : "lazy"}
                    className={`object-cover ${treatment.objectPosition ?? "object-center"} transition-transform duration-700 group-hover:scale-105`}
                    sizes="(min-width: 1024px) 42vw, (min-width: 768px) 55vw, 85vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/76 to-black/28 group-hover:from-black/85 group-hover:via-black/66 transition-colors duration-300" />
                <div className="absolute inset-y-0 right-[40%] hidden md:block w-20 bg-gradient-to-r from-black/75 to-transparent" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[#D4AF37]/20" />
                <div className="pointer-events-none absolute left-8 bottom-5 h-20 w-20 rounded-full bg-[#D4AF37]/12 blur-2xl" />

                <div className="relative z-10 min-h-[220px] md:min-h-[188px] px-6 md:px-11 py-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/60 text-[#D4AF37] text-xs font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#D4AF37]">
                      {treatment.vibe}
                    </p>
                  </div>

                  <h3 className="mt-4 text-2xl md:text-3xl font-serif font-bold leading-[1.04] tracking-[0.01em] text-white">
                    {treatment.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-gray-200 max-w-xl leading-relaxed">
                    {treatment.desc}
                  </p>

                  <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37] group-hover:border-[#D4AF37]">
                    Explore Treatment
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.article>
                );
              })()}
            </Link>
          ))}
        </motion.div>

      </section>

      {/* CONTACT US */}
      <section className="pt-6 pb-16 px-4 md:px-8 border-t border-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto overflow-hidden rounded-[30px] border border-[#D4AF37]/25 bg-gradient-to-r from-[#17120a] via-[#0b0b0b] to-[#17120a] p-7 md:p-10"
        >
          <motion.div
            className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-[#D4AF37]/12 blur-3xl"
            animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute right-0 bottom-0 h-44 w-44 rounded-full bg-white/8 blur-3xl"
            animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f8e8b4]/28 to-transparent"
            animate={{ x: ["-180%", "420%"] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={heroStagger}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-end"
          >
            <div className="lg:col-span-8">
              <motion.p
                variants={revealItem}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Contact Us
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="mt-4 max-w-[16ch] text-3xl md:text-4xl font-serif font-bold leading-[1.02]"
              >
                Ready To Start Your
                <span className="text-[#D4AF37]"> Personalized Glow Plan?</span>
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-4 max-w-[54ch] text-sm md:text-base text-gray-300 leading-relaxed"
              >
                Tell us your goals and we will guide you to the right treatment path.
                Our Hackney team offers consultation-led care with natural-looking,
                confidence-first outcomes.
              </motion.p>
            </div>

            <motion.div variants={revealItem} className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/contact-us"
                  className="cta-button inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 text-white font-bold py-3 px-6 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  CONTACT US
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/pricing"
                  className="cta-button inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] text-black font-bold py-3 px-6 hover:bg-yellow-500 transition-colors"
                >
                  BOOK CONSULTATION
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.a
                href="tel:+447883050603"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="cta-button inline-flex items-center justify-center rounded-full border border-[#D4AF37]/45 bg-black/35 px-6 py-3 text-sm font-semibold text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/55 transition-colors"
              >
                +44 7883 050603
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-4 md:px-8 border-y border-neutral-800 bg-[#060606]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 rounded-[26px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#070707] p-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37] mb-2">
              {googleBusinessName}
            </p>
            <h3 className="text-2xl font-serif font-bold mb-4">Our Happy Clients</h3>
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

            <div className="relative z-10 mt-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {patientReviews.map((review, index) => (
                  <button
                    key={`${review.authorName}-${index}`}
                    type="button"
                    aria-label={`Show review ${index + 1}`}
                    onClick={() => setActiveReview(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeReview ? "w-7 bg-[#D4AF37]" : "w-2.5 bg-white/35 hover:bg-white/55"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous review"
                  onClick={() =>
                    setActiveReview(
                      (current) => (current - 1 + patientReviews.length) % patientReviews.length,
                    )
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next review"
                  onClick={() => setActiveReview((current) => (current + 1) % patientReviews.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* LOCATION + CONTACT */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="lg:col-span-8 rounded-[30px] border border-white/15 bg-black/45 p-6 md:p-8"
          >
            <p className="text-[#D4AF37] tracking-[0.16em] uppercase text-xs md:text-sm mb-2">
              Tailored For You
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5">Our Location</h2>

            <MapEmbed
              src={googleMapsEmbedUrl}
              title="J Luxe Medical Aesthetics location on Google Maps"
              className="border border-neutral-800 bg-neutral-900 md:min-h-[360px]"
            />

            <p className="mt-5 text-sm text-gray-300 max-w-3xl leading-relaxed">
              Visit our medical aesthetics clinic in Hackney, London for
              consultation-led treatment planning and elegant, natural-looking
              outcomes.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
            className="lg:col-span-4 rounded-[30px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#070707] p-6 md:p-7"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              Get In Touch
            </p>
            <h3 className="mt-4 text-2xl font-serif font-bold">Plan Your Next Appointment</h3>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              Have questions about a specific treatment? Our team will guide you to the
              right protocol based on your goals.
            </p>

            <div className="mt-5 rounded-xl border border-white/15 bg-black/35 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#D4AF37] mb-2">Clinic Area</p>
              <p className="text-sm text-gray-200 inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                Hackney, London
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="cta-button inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white font-bold py-3 px-6 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                GET DIRECTIONS
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/pricing"
                className="cta-button inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] text-black font-bold py-3 px-6 hover:bg-yellow-500 transition-colors"
              >
                BOOK CONSULTATION
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
