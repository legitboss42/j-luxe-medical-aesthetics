"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Droplet,
  FileText,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MapEmbed from "../components/MapEmbed";

export default function HomePage() {
  const heroStagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.12,
      },
    },
  };

  const heroItem: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: "easeOut" },
    },
  };

  const googleBusinessName = "J Luxe Medical Aesthetics";
  const googleRating = 5;
  const googleReviewCount = 80;
  const googleMapsPlaceUrl =
    "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
  const googleMapsEmbedUrl =
    "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: googleBusinessName,
    description:
      "Medical aesthetics clinic in Hackney, London offering dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
    areaServed: "Hackney, London",
    url: "/",
    sameAs: [googleMapsPlaceUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: googleRating,
      reviewCount: googleReviewCount,
    },
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
    ],
  };

  const happyPatients = [
    {
      authorName: "Amo",
      text:
        "amazing experience! Definitely recommend. The EM sculpt is great",
      relativeTimeDescription: "5 weeks ago",
      rating: 5,
    },
    {
      authorName: "A",
      text:
        "Thank you so much, Jennifer!!! So warm and welcoming, explained the procedure thoroughly and was open to questions. I achieved great results from my treatment. Would definitely recommend. Professional and personable - I will be back!!",
      relativeTimeDescription: "9 weeks ago",
      rating: 5,
    },
    {
      authorName: "hannah jones",
      text:
        "Jennifer is the most wonderful practitioner, she is so knowledgeable and also one of the most personable people I've ever met! Would fully recommend, I had micro needling done and think it's great",
      relativeTimeDescription: "11 weeks ago",
      rating: 5,
    },
    {
      authorName: "Rushamba Wright",
      text:
        "I had the most wonderful time with Jennifer. I received a hydrafacial treatment and Jennifer went above and beyond to make me feel comfortable, informed and well taken care of. We had a really thorough consultation where I was able to talk about my skin concerns and receive advise, which was followed up with a fantastic facial. My skin looked so moisturised and refreshed after. I cannot recommend her service enough, I've already booked my next appointment and advise everyone else book her too!",
      relativeTimeDescription: "11 weeks ago",
      rating: 5,
    },
    {
      authorName: "Christie Tannous",
      text:
        "Cant recommend this place enough - Nurse Jennifer is incredibly knowledgeable, warm and professional.",
      relativeTimeDescription: "26 weeks ago",
      rating: 5,
    },
  ];

  const renderStars = (rating: number, sizeClass = "w-4 h-4") =>
    Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={`${sizeClass}-${index}`}
        className={`${sizeClass} ${
          index < Math.round(rating) ? "text-[#D4AF37] fill-current" : "text-neutral-700"
        }`}
      />
    ));

  const [activePatientSlide, setActivePatientSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActivePatientSlide((current) => (current + 1) % happyPatients.length);
    }, 4800);

    return () => clearInterval(intervalId);
  }, [happyPatients.length]);

  const currentPatientReview = happyPatients[activePatientSlide];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden">
        {/* Hero Background */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[#080808]" />
          <div className="absolute inset-y-0 right-0 w-full sm:w-[88%] md:w-[72%] lg:w-[60%]">
            <Image
              src="/images/heroBackground.png"
              alt="J Luxe Medical Aesthetics treatment room in Hackney, London"
              fill
              priority
              className="object-contain object-right-top"
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 72vw, 88vw"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-44 md:w-56 lg:w-72 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 -left-8 w-16 bg-[#080808]/70 blur-2xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/72 to-black/45 z-10" />
          <div className="absolute inset-0 bg-black/28 z-10" />
        </motion.div>

        {/* Moving atmosphere layers */}
        <motion.div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#D4AF37]/15 blur-3xl"
          animate={{ y: [-14, 14, -14], x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [18, -18, 18], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroStagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end"
          >
            <div className="lg:col-span-7 text-left">
              <motion.p
                variants={heroItem}
                className="text-[#D4AF37] tracking-[0.22em] uppercase text-xs md:text-sm font-semibold mb-5"
              >
                Award-Winning Medical Aesthetics Clinic in Hackney, London
              </motion.p>

              <motion.h1
                variants={heroItem}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[0.95]"
              >
                LONDON MEDICAL
                <br />
                AESTHETICS CLINIC
              </motion.h1>

              <motion.div
                variants={heroItem}
                className="mt-5 h-[2px] w-36 bg-[#D4AF37]"
              />

              <motion.p
                variants={heroItem}
                className="text-gray-200 text-base md:text-lg mt-6 max-w-2xl"
              >
                Discover expert non-surgical aesthetic treatments in East London,
                including dermal fillers, anti-wrinkle injections, skin boosters,
                and body sculpting, tailored for natural-looking results.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="mt-8 flex flex-wrap items-center gap-3 text-xs md:text-sm uppercase tracking-wide"
              >
                <span className="border border-[#D4AF37]/70 bg-black/35 px-3 py-2 rounded-full text-[#D4AF37]">
                  Medical-Led
                </span>
                <span className="border border-white/30 bg-black/35 px-3 py-2 rounded-full">
                  Personalized Plans
                </span>
                <span className="border border-white/30 bg-black/35 px-3 py-2 rounded-full">
                  Luxury Aftercare
                </span>
              </motion.div>
            </div>

            <motion.div variants={heroItem} className="lg:col-span-5">
              <div className="relative bg-black/40 border border-neutral-700 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
                <motion.div
                  className="absolute -top-4 -right-2 rounded-full bg-[#D4AF37] text-black text-[11px] font-extrabold uppercase tracking-wide px-4 py-2"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  5-Star Rated
                </motion.div>

                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-3">
                  Your Glow Starts Here
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-4">
                  Dermal Fillers, Anti-Wrinkle and Skin Treatments
                </h2>
                <p className="text-gray-300 mb-6">
                  Book a consultation with our Hackney team and receive a
                  personalized plan designed around your facial and body goals.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    className="cta-button inline-block bg-[#D4AF37] text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors duration-300"
                  >
                    BOOK NOW
                  </Link>
                  <Link
                    href="/treatment"
                    className="cta-button inline-block border border-white/35 text-white font-bold py-3 px-6 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    VIEW TREATMENTS
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="py-24 px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealStagger}
          className="relative max-w-7xl mx-auto overflow-hidden rounded-[34px] border border-neutral-800 bg-gradient-to-br from-[#111111] via-[#080808] to-[#131313] p-6 md:p-10 lg:p-12"
        >
          <motion.div
            className="pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, -16, 0], y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <motion.p
                variants={revealItem}
                className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-4"
              >
                Trusted Aesthetics Specialists in East London
              </motion.p>

              <motion.h2
                variants={revealItem}
                className="text-3xl md:text-5xl font-serif font-bold leading-tight"
              >
                Non-Surgical Facial and Body
                <span className="text-[#D4AF37]"> Treatments in London</span>
              </motion.h2>

              <motion.p
                variants={revealItem}
                className="text-gray-300 leading-relaxed mt-6 max-w-2xl"
              >
                From lip filler and anti-wrinkle injections to advanced body
                contouring and skin rejuvenation, we combine clinical precision
                with personalized care to help you look refreshed and confident.
              </motion.p>

              <motion.div
                variants={revealStagger}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <motion.div
                  variants={revealItem}
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3 flex items-center gap-3"
                >
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-sm text-gray-200">Medical-led expertise</span>
                </motion.div>
                <motion.div
                  variants={revealItem}
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3 flex items-center gap-3"
                >
                  <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-sm text-gray-200">Natural-looking results</span>
                </motion.div>
                <motion.div
                  variants={revealItem}
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3 flex items-center gap-3"
                >
                  <Droplet className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-sm text-gray-200">Premium product range</span>
                </motion.div>
                <motion.div
                  variants={revealItem}
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-sm text-gray-200">Dedicated aftercare</span>
                </motion.div>
              </motion.div>

              <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="cta-button inline-block bg-[#D4AF37] text-black font-bold py-3 px-7 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  BOOK CONSULTATION
                </Link>
                <Link
                  href="/refer-a-friend"
                  className="cta-button inline-block border border-white/30 text-white font-bold py-3 px-7 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  REFER A FRIEND
                </Link>
              </motion.div>
            </div>

            <motion.div variants={revealItem} className="lg:col-span-5">
              <div className="relative">
                <motion.div
                  className="pointer-events-none absolute -inset-2 rounded-[30px] bg-gradient-to-br from-[#D4AF37]/25 to-transparent blur-xl"
                  animate={{ opacity: [0.45, 0.75, 0.45] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative rounded-[28px] border border-white/20 bg-black/50 backdrop-blur-sm p-6 md:p-7">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
                    Client Journey
                  </p>
                  <h3 className="text-2xl font-serif font-bold mb-6">
                    Clear process, premium experience
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center shrink-0">
                        01
                      </span>
                      <p className="text-sm text-gray-300">
                        Consultation and personalized assessment
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center shrink-0">
                        02
                      </span>
                      <p className="text-sm text-gray-300">
                        Personalized treatment with expert precision
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center shrink-0">
                        03
                      </span>
                      <p className="text-sm text-gray-300">
                        Structured aftercare for lasting confidence
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <motion.div
                      variants={revealItem}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#151515] to-[#090909] px-4 py-5 text-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative mb-3 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-300 whitespace-nowrap">
                          <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                          Trusted
                        </span>
                      </div>
                      <p className="relative text-3xl font-extrabold text-[#D4AF37] leading-none">
                        1.5k+
                      </p>
                      <p className="relative mt-2 text-[11px] uppercase tracking-[0.14em] text-gray-300">
                        Happy Clients
                      </p>
                    </motion.div>

                    <motion.div
                      variants={revealItem}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.18 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#151515] to-[#090909] px-4 py-5 text-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative mb-3 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-300 whitespace-nowrap">
                          <Star className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                          Top Rated
                        </span>
                      </div>
                      <p className="relative text-3xl font-extrabold text-[#D4AF37] leading-none">
                        5.0
                      </p>
                      <p className="relative mt-2 text-[11px] uppercase tracking-[0.14em] text-gray-300">
                        Client Rating
                      </p>
                    </motion.div>

                    <motion.div
                      variants={revealItem}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.36 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#151515] to-[#090909] px-4 py-5 text-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative mb-3 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-300 whitespace-nowrap">
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                          Personalized
                        </span>
                      </div>
                      <p className="relative text-3xl font-extrabold text-[#D4AF37] leading-none">
                        10+
                      </p>
                      <p className="relative mt-2 text-[11px] uppercase tracking-[0.14em] text-gray-300">
                        Core Services
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FEATURED TREATMENTS */}
      <section className="relative py-20 px-4 md:px-8 bg-neutral-900/50 overflow-hidden">
        <motion.div
          className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={revealStagger}
              className="lg:col-span-7"
            >
              <motion.p
                variants={revealItem}
                className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-3"
              >
                Most Requested in London
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="text-3xl md:text-5xl font-serif font-bold leading-tight"
              >
                Popular Non-Surgical
                <span className="text-[#D4AF37]"> Aesthetic Treatments</span>
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="lg:col-span-5 text-gray-300 leading-relaxed"
            >
              Explore advanced facials, body sculpting, and dermal fillers in
              Hackney. Every treatment plan is built for natural-looking,
              confidence-boosting results.
            </motion.p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealStagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.article
              variants={revealItem}
              whileHover={{ y: -10, scale: 1.02, rotate: -0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[34px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#1a1409] via-[#0c0c0c] to-[#070707] backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#D4AF37]/25" />
              <div className="pointer-events-none absolute -left-10 bottom-12 h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-2xl" />

              <div className="relative h-56 overflow-hidden rounded-b-[44px] border-b border-[#D4AF37]/20">
                <Image
                  src="/images/advancedFacials.png"
                  alt="Advanced facial treatment at J Luxe Medical Aesthetics in Hackney, London"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent"
                  animate={{ opacity: [0.3, 0.75, 0.3], scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-black/55 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-200 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Skin Focus
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-gray-400">
                    45-60 min
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">Advanced Facials</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Improve tone, hydration, and texture with clinical skin
                  rejuvenation protocols tailored to your skin goals.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    Skin texture refinement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    Glow and hydration support
                  </li>
                </ul>
              </div>
            </motion.article>

            <motion.article
              variants={revealItem}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[34px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#111710] via-[#0b0c0a] to-[#070707] backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              <div className="pointer-events-none absolute -left-14 -top-14 h-36 w-36 rounded-full border border-[#D4AF37]/20" />
              <div className="pointer-events-none absolute right-0 bottom-8 h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-2xl" />

              <div className="relative h-56 overflow-hidden rounded-b-[44px] border-b border-[#D4AF37]/20">
                <Image
                  src="/images/bodySculpting.png"
                  alt="Body sculpting treatment at J Luxe Medical Aesthetics in Hackney, London"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent"
                  animate={{ opacity: [0.3, 0.75, 0.3], scale: [1, 1.08, 1], rotate: [0, -4, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-black/55 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-200 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]">
                    <Droplet className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Body Focus
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-gray-400">
                    60 min
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">Body Sculpting</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Target stubborn areas with non-surgical body contouring designed
                  to support shape definition and confidence.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    Localized contour support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    Structured treatment plan
                  </li>
                </ul>
              </div>
            </motion.article>

            <motion.article
              variants={revealItem}
              whileHover={{ y: -10, scale: 1.02, rotate: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[34px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#191308] via-[#0c0b09] to-[#070707] backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full border border-[#D4AF37]/20" />
              <div className="pointer-events-none absolute -left-6 bottom-10 h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-2xl" />

              <div className="relative h-56 overflow-hidden rounded-b-[44px] border-b border-[#D4AF37]/20">
                <Image
                  src="/images/dermalFillers.png"
                  alt="Dermal filler consultation at J Luxe Medical Aesthetics in Hackney, London"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent"
                  animate={{ opacity: [0.3, 0.75, 0.3], scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 border border-[#D4AF37]/35 bg-black/55 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-200 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Face Focus
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-gray-400">
                    30-45 min
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">Dermal Fillers</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Restore balance and subtle volume with filler treatments focused
                  on natural facial harmony and precision.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    Lips, cheeks, and contour areas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    Medical consultation included
                  </li>
                </ul>
              </div>
            </motion.article>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            className="text-center mt-12"
          >
            <Link
              href="/treatment"
              className="cta-button inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold py-3 px-8 rounded-full transition-colors"
            >
              SEE ALL SERVICES
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MORE THAN A CLINIC SECTION */}
      <section className="relative py-24 px-4 md:px-8">
        <motion.div
          className="pointer-events-none absolute left-0 top-24 h-56 w-56 rounded-full bg-[#D4AF37]/10 blur-3xl"
          animate={{ x: [0, 24, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 bottom-8 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealItem}
            className="lg:col-span-6 relative overflow-hidden rounded-[34px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#16120a] via-[#0b0b0b] to-[#070707] min-h-[520px]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent"
              animate={{ opacity: [0.25, 0.65, 0.25], scale: [1, 1.08, 1] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full border border-[#D4AF37]/25"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <Image
              src="/images/leadPractitioner.png"
              alt="Lead practitioner consultation at J Luxe Medical Aesthetics in Hackney, London"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/35" />

            <div className="absolute left-6 right-6 bottom-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/20 bg-black/55 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#D4AF37] mb-1">
                  Clinical Standard
                </p>
                <p className="text-sm text-gray-200">Safety-first treatment protocols</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-black/55 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#D4AF37] mb-1">
                  Signature Finish
                </p>
                <p className="text-sm text-gray-200">Natural, refined outcomes</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealStagger}
            className="lg:col-span-6 rounded-[34px] border border-white/15 bg-black/45 backdrop-blur-sm p-7 md:p-9"
          >
            <motion.p
              variants={revealItem}
              className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-3"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="text-3xl md:text-5xl font-serif font-bold leading-tight"
            >
              Why Clients Choose Our
              <span className="text-[#D4AF37]"> Hackney Aesthetics Clinic</span>
            </motion.h2>
            <motion.p variants={revealItem} className="text-gray-300 mt-5 leading-relaxed">
              We combine medical expertise, detailed consultations, and tailored
              treatment planning to deliver elegant results with a focus on long-term
              skin and facial confidence.
            </motion.p>

            <motion.div variants={revealStagger} className="mt-7 space-y-3">
              <motion.div
                variants={revealItem}
                className="rounded-xl border border-white/15 bg-black/45 px-4 py-3 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Personalized treatment plans</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Every recommendation is built around your features and goals.
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={revealItem}
                className="rounded-xl border border-white/15 bg-black/45 px-4 py-3 flex items-start gap-3"
              >
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Premium, industry-leading products</p>
                  <p className="text-xs text-gray-400 mt-1">
                    We use trusted products selected for safety and performance.
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={revealItem}
                className="rounded-xl border border-white/15 bg-black/45 px-4 py-3 flex items-start gap-3"
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Dedicated aftercare support</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Structured guidance helps protect and prolong your results.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="cta-button bg-[#D4AF37] text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition-colors"
              >
                BOOK CONSULTATION
              </Link>
              <Link
                href="/about-us"
                className="cta-button border border-white/30 text-white font-bold py-3 px-8 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                ABOUT THE CLINIC
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OUR PROMISE TO YOU */}
      <section className="relative py-20 px-4 md:px-8 border-t border-b border-neutral-800 bg-[#050505] overflow-hidden">
        <motion.div
          className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#D4AF37]/10 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 bottom-0 h-52 w-52 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealStagger}
            className="text-center mb-12"
          >
            <motion.p
              variants={revealItem}
              className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-3"
            >
              Our Promise
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="text-3xl md:text-5xl font-serif font-bold leading-tight"
            >
              Our Promise as a Leading
              <span className="text-[#D4AF37]"> London Aesthetics Clinic</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-5 text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Every appointment is grounded in safety, product quality, and
              natural-looking outcomes so your results feel elevated and authentic.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealStagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.article
              variants={revealItem}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#15120b] via-[#0a0a0a] to-[#070707] p-6"
            >
              <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full border border-[#D4AF37]/20" />
              <motion.div
                className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f5e7b0]/45 to-transparent"
                animate={{ x: ["-180%", "420%"] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/50 text-[#D4AF37] mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Expert Care</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Administered by highly trained professionals with a safety-first
                clinical approach.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                  Consultation-led decisions
                </p>
              </div>
            </motion.article>

            <motion.article
              variants={revealItem}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#15120b] via-[#0a0a0a] to-[#070707] p-6"
            >
              <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full border border-[#D4AF37]/20" />
              <motion.div
                className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f5e7b0]/45 to-transparent"
                animate={{ x: ["-180%", "420%"] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
              />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/50 text-[#D4AF37] mb-5">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Premium Products</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                We use top-tier, industry-leading formulas selected for consistency,
                reliability, and performance.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                  Trusted product standards
                </p>
              </div>
            </motion.article>

            <motion.article
              variants={revealItem}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#15120b] via-[#0a0a0a] to-[#070707] p-6"
            >
              <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full border border-[#D4AF37]/20" />
              <motion.div
                className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f5e7b0]/45 to-transparent"
                animate={{ x: ["-180%", "420%"] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/50 text-[#D4AF37] mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Natural Results</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                We enhance your features with refined treatment planning for subtle,
                balanced, confidence-first outcomes.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#D4AF37]">
                  Refined aesthetic outcomes
                </p>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* GLOW ERA CTA */}
      <section className="relative py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/glowCta.png"
            alt="Radiant skin results at J Luxe Medical Aesthetics in Hackney, London"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/85 z-10" />

        <motion.div
          className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl z-10"
          animate={{ x: [0, 20, 0], y: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl z-10"
          animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-20 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealStagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <div className="lg:col-span-7">
              <motion.p
                variants={revealItem}
                className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs md:text-sm font-semibold mb-3"
              >
                Glow Era Begins Here
              </motion.p>
              <motion.h2
                variants={revealItem}
                className="text-4xl md:text-6xl font-serif font-bold text-white leading-[0.95]"
              >
                Step Into Your
                <span className="text-[#D4AF37]"> Glow Era</span>
              </motion.h2>
              <motion.p
                variants={revealItem}
                className="mt-6 text-gray-200 text-base md:text-lg max-w-2xl leading-relaxed"
              >
                Your journey to healthier skin and confidence starts here. Book your
                London aesthetics consultation and receive a personalized treatment
                roadmap from our expert team.
              </motion.p>

              <motion.div
                variants={revealItem}
                className="mt-7 flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em]"
              >
                <span className="border border-[#D4AF37]/60 bg-black/35 rounded-full px-3 py-2 text-[#D4AF37]">
                  Consultation-Led
                </span>
                <span className="border border-white/25 bg-black/35 rounded-full px-3 py-2 text-white">
                  Medical Expertise
                </span>
                <span className="border border-white/25 bg-black/35 rounded-full px-3 py-2 text-white">
                  Natural Results
                </span>
              </motion.div>
            </div>

            <motion.div variants={revealItem} className="lg:col-span-5">
              <div className="relative rounded-[28px] border border-[#D4AF37]/30 bg-black/55 backdrop-blur-sm p-7">
                <motion.div
                  className="pointer-events-none absolute -inset-[1px] rounded-[28px] border border-[#D4AF37]/35"
                  animate={{ opacity: [0.35, 0.75, 0.35] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.18em] mb-3">
                  Limited Weekly Slots
                </p>
                <h3 className="text-2xl font-serif font-bold mb-4">
                  Reserve Your Appointment
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Speak with our team in Hackney and secure your next treatment
                  session with a tailored plan and full aftercare guidance.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    className="cta-button inline-block bg-[#D4AF37] text-black font-bold py-3 px-7 rounded-full hover:bg-yellow-500 transition-colors"
                  >
                    BOOK NOW
                  </Link>
                  <Link
                    href="/contact-us"
                    className="cta-button inline-block border border-white/30 text-white font-bold py-3 px-7 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    CONTACT US
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BLOG & RESOURCES */}
      <section className="relative py-20 px-4 md:px-8 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealStagger}
          className="relative max-w-7xl mx-auto overflow-hidden rounded-[34px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#16120a] via-[#0b0b0b] to-[#070707] text-white px-6 py-10 md:px-10 lg:px-12"
        >
          <motion.div
            className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4AF37]/15 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -left-14 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, -12, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <motion.p
              variants={revealItem}
              className="text-[#D4AF37] tracking-[0.16em] uppercase text-xs md:text-sm font-semibold text-center"
            >
              J Luxe Medical Aesthetics
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-3 text-center text-4xl md:text-6xl font-serif font-bold leading-[0.95]"
            >
              Blog & Resources
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-5 max-w-3xl mx-auto text-center text-gray-300 leading-relaxed"
            >
              Explore expert insights on skin health, dermal fillers,
              anti-wrinkle treatments, aftercare guidance, and medical aesthetics
              education from our London clinic team.
            </motion.p>

            <motion.div
              variants={revealStagger}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <motion.article
                variants={revealItem}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-sm p-5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-[#D4AF37] mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Treatment Guides</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Understand what to expect before, during, and after popular
                  aesthetic treatments.
                </p>
              </motion.article>

              <motion.article
                variants={revealItem}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-sm p-5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-[#D4AF37] mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Aftercare Tips</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Practical post-treatment advice to protect your results and
                  support long-term skin confidence.
                </p>
              </motion.article>

              <motion.article
                variants={revealItem}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-2xl border border-white/15 bg-black/45 backdrop-blur-sm p-5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-[#D4AF37] mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Aesthetic Insights</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Stay informed on techniques, trends, and evidence-based
                  approaches in modern medical aesthetics.
                </p>
              </motion.article>
            </motion.div>

            <motion.div
              variants={revealItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="/blog"
                className="cta-button inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold py-3 px-7 rounded-full hover:bg-yellow-500 transition-colors"
              >
                VISIT BLOG
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/training"
                className="cta-button inline-flex items-center gap-2 border border-white/30 text-white font-bold py-3 px-7 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                EXPLORE RESOURCES
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* REVIEWS & LOCATION */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="rounded-[30px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#141007] via-[#0a0a0a] to-[#070707] p-7 md:p-8"
        >
          <p className="text-[#D4AF37] tracking-[0.16em] uppercase text-xs md:text-sm mb-2 text-center">
            {googleBusinessName}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">
            OUR HAPPY PATIENTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
            <motion.article
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl border border-white/15 bg-black/45 p-5 text-center"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#D4AF37] mb-2">
                Excellent
              </p>
              <div className="flex justify-center gap-1 mb-2">
                {renderStars(googleRating, "w-4 h-4")}
              </div>
              <p className="text-sm text-gray-300">
                Rated {googleRating.toFixed(1)} on Google ({googleReviewCount} reviews)
              </p>
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="cta-button mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-yellow-400 transition-colors"
              >
                VIEW ALL REVIEWS
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.article>

            <div className="relative md:col-span-3 rounded-2xl border border-white/15 bg-black/45 p-5 md:p-6 overflow-hidden">
              <motion.div
                className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f6e9bc]/40 to-transparent"
                animate={{ x: ["-180%", "420%"] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
              />

              <AnimatePresence mode="wait">
                <motion.article
                  key={`${currentPatientReview.authorName}-${currentPatientReview.relativeTimeDescription}`}
                  initial={{ opacity: 0, x: 44, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -44, scale: 0.98 }}
                  transition={{ duration: 0.58, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-black text-xs font-bold uppercase">
                        {currentPatientReview.authorName.charAt(0)}
                      </span>
                      <p className="text-sm font-semibold text-gray-100">
                        {currentPatientReview.authorName}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {currentPatientReview.relativeTimeDescription}
                    </p>
                  </div>

                  <div className="flex gap-0.5 mb-4">
                    {renderStars(currentPatientReview.rating, "w-4 h-4")}
                  </div>

                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {currentPatientReview.text}
                  </p>
                </motion.article>
              </AnimatePresence>

              <div className="relative z-10 mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {happyPatients.map((review, index) => (
                    <button
                      key={`${review.authorName}-${index}`}
                      type="button"
                      aria-label={`Show review ${index + 1}`}
                      onClick={() => setActivePatientSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === activePatientSlide
                          ? "w-7 bg-[#D4AF37]"
                          : "w-2.5 bg-white/35 hover:bg-white/55"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={() =>
                      setActivePatientSlide(
                        (current) => (current - 1 + happyPatients.length) % happyPatients.length,
                      )
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={() =>
                      setActivePatientSlide((current) => (current + 1) % happyPatients.length)
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
          className="mt-10 rounded-[30px] border border-white/15 bg-black/45 p-7 md:p-8"
        >
          <p className="text-[#D4AF37] tracking-[0.16em] uppercase text-xs md:text-sm mb-2 text-center">
            {googleBusinessName}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6">
            OUR LOCATION
          </h2>

          <MapEmbed
            src={googleMapsEmbedUrl}
            title="J Luxe Medical Aesthetics location on Google Maps"
            className="border border-neutral-800 bg-neutral-900 md:min-h-[360px]"
          />

          <p className="mt-5 text-sm text-gray-300 text-center max-w-3xl mx-auto">
            We are based in Hackney, London. Use Google Maps for the fastest
            route and up-to-date travel times.
          </p>

          <div className="mt-6 text-center">
            <a
              href={googleMapsPlaceUrl}
              target="_blank"
              rel="noreferrer"
              className="cta-button inline-flex items-center gap-2 border border-white/30 text-white font-bold py-3 px-6 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            >
              GET DIRECTIONS
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
