"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import MapEmbed from "../../components/MapEmbed";

const googleBusinessName = "J Luxe Medical Aesthetics";
const googleRating = 5;
const googleReviewCount = 80;
const clinicPhone = "+44 7883 050603";
const clinicPhoneHref = "tel:+447883050603";
const clinicEmail = "admin@jluxemedicalaesthetics.com";
const clinicEmailHref = "mailto:admin@jluxemedicalaesthetics.com";
const googleMapsPlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
const googleMapsEmbedUrl =
  "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";

const openingHours = [
  { day: "Monday", hours: "9:00 AM - 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 9:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 9:00 PM" },
  { day: "Friday", hours: "9:00 AM - 9:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 9:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const contactHighlights = [
  { label: "Response Window", value: "Within 24 Hours" },
  { label: "Care Model", value: "Advanced Clinical Aesthetics Clinic" },
  { label: "Clinic Area", value: "Hackney, London" },
];

const quickContactActions = [
  { label: "Call Receptionist", value: clinicPhone, href: clinicPhoneHref },
  { label: "Email Clinic", value: clinicEmail, href: clinicEmailHref },
];

const contactFlow = [
  {
    step: "01",
    title: "Share Your Goals",
    desc: "Tell us what you want to improve and any timeline you have in mind.",
  },
  {
    step: "02",
    title: "Personalised Guidance",
    desc: "Our team recommends the right consultation-led treatment route for you.",
  },
  {
    step: "03",
    title: "Book With Confidence",
    desc: "Secure your appointment with clear pricing and tailored aftercare planning.",
  },
];

const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: "easeOut" },
  },
};

const fieldStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const fieldItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

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

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle");
  const [referralCode, setReferralCode] = useState("");
  const [hasTrackedReferral, setHasTrackedReferral] = useState(false);
  const [incomingReferralParam, setIncomingReferralParam] = useState("");

  const contactSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact J Luxe Medical Aesthetics",
      description:
        "Contact J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney, London for consultations on dermal fillers, anti-wrinkle injections, skin boosters, and body sculpting.",
      mainEntity: {
        "@type": "MedicalBusiness",
        name: googleBusinessName,
        telephone: clinicPhone,
        email: clinicEmail,
        areaServed: "Hackney, London",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hackney",
          addressRegion: "London",
          addressCountry: "GB",
        },
        sameAs: [googleMapsPlaceUrl],
        hasMap: googleMapsEmbedUrl,
      },
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
          name: "Contact Us",
          item: "https://jluxemedicalaesthetics.com/contact-us",
        },
      ],
    }),
    [],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    setTimeout(() => {
      setSubmitState("success");
    }, 1400);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setIncomingReferralParam(params.get("ref") ?? "");
  }, []);

  useEffect(() => {
    setReferralCode(normalizeReferralCode(incomingReferralParam));
  }, [incomingReferralParam]);

  useEffect(() => {
    if (!incomingReferralParam || hasTrackedReferral) return;

    const normalized = normalizeReferralCode(incomingReferralParam);
    if (!normalized) return;

    if (typeof window !== "undefined") {
      localStorage.setItem("jluxe_referral_code", normalized);
      localStorage.setItem("jluxe_referral_seen_at", new Date().toISOString());
    }

    fetch("/api/referrals/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "referral_visit",
        ref: normalized,
        source: "contact-page",
        path: "/contact-us",
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // tracking failures are non-blocking
    });

    setHasTrackedReferral(true);
  }, [incomingReferralParam, hasTrackedReferral]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="relative min-h-[56vh] md:min-h-[62vh] overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/heroImagePrompt.png"
            alt="Contact team at J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/74 to-black/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(212,175,55,0.24),transparent_48%)]" />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f4dda1]/25 to-transparent"
            animate={{ x: ["-180%", "420%"] }}
            transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
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
          transition={{ duration: 9.1, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

        <div className="relative z-20 mx-auto flex min-h-[56vh] w-full max-w-6xl items-end px-4 pb-12 md:min-h-[62vh] md:px-8 md:pb-14">
          <motion.div initial="hidden" animate="visible" variants={revealStagger} className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="text-center lg:col-span-8 lg:text-left">
              <motion.p variants={revealItem} className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
                Contact J Luxe Medical Aesthetics
              </motion.p>
              <motion.h1 variants={revealItem} className="text-4xl font-serif font-bold uppercase leading-[0.94] md:text-6xl">
                Let&apos;s Plan Your
                <br />
                Glow Journey.
              </motion.h1>
              <motion.p variants={revealItem} className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-200 lg:mx-0 md:text-base">
                Speak with our Hackney, London team about dermal fillers, anti-wrinkle
                injections, skin boosters, body sculpting, and personalised treatment planning.
              </motion.p>
              <motion.div
                variants={revealItem}
                className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
              >
                {contactHighlights.map((item) => (
                  <motion.span
                    key={item.label}
                    className="inline-flex items-center rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-200"
                    whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.45)" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {item.value}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                variants={revealItem}
                className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
              >
                {quickContactActions.map((action) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    className="inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#141006]/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4dda1] transition-colors hover:border-[#D4AF37]/70 hover:text-[#ffedb5]"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {action.label}: {action.value}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <motion.div variants={revealItem} className="lg:col-span-4">
              <motion.article
                className="group relative overflow-hidden rounded-[24px] border border-[#D4AF37]/30 bg-gradient-to-br from-[#181208]/85 via-black/72 to-[#090909]/95 p-5 backdrop-blur-md"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ y: -4, scale: 1.01, borderColor: "rgba(212,175,55,0.35)" }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[24px] border border-[#D4AF37]/35"
                  animate={{ opacity: [0.36, 0.7, 0.36] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full bg-[#D4AF37]/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <motion.div
                  className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f5e1a3]/35 to-transparent"
                  animate={{ x: ["-180%", "420%"] }}
                  transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                />
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Consultation-Led Care
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <motion.div
                    className="rounded-xl border border-white/15 bg-black/45 px-4 py-3"
                    whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center gap-0.5">{renderStars(googleRating, "h-3 w-3")}</div>
                      <p className="text-lg font-serif font-bold text-white">{googleRating.toFixed(1)}</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="rounded-xl border border-white/15 bg-black/45 px-4 py-3"
                    whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Reviews</p>
                    <p className="mt-1 text-lg font-serif font-bold text-white">{googleReviewCount}+</p>
                  </motion.div>
                </div>
                <motion.a
                  href={googleMapsPlaceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cta-button mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37]/55 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-black"
                  whileTap={{ scale: 0.98 }}
                >
                  Open In Google Maps
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.a>
                <motion.a
                  href={clinicPhoneHref}
                  className="cta-button mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  whileTap={{ scale: 0.98 }}
                >
                  Call Our Team
                  <Phone className="h-3.5 w-3.5" />
                </motion.a>
              </motion.article>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="relative px-4 py-16 md:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(212,175,55,0.12),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(212,175,55,0.2)_1px,transparent_1px)] [background-size:28px_28px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto mb-8 w-full max-w-6xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
            Luxury Contact Experience
          </p>
          <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-5xl">
            Plan, Ask, and Book In One Place
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-300">
            Our Hackney, London team is available to guide your treatment journey with fast
            replies, transparent advice, and receptionist-level support.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealStagger}
          className="relative mx-auto mb-8 grid w-full max-w-6xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
        >
          {contactFlow.map((item) => (
            <motion.article
              key={item.step}
              variants={revealItem}
              whileHover={{ y: -4, borderColor: "rgba(212,175,55,0.4)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#141108]/80 via-black/65 to-[#090909]/90 p-4"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-2xl" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
                Step {item.step}
              </p>
              <h3 className="mt-2 text-lg font-serif font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.desc}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-7">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="relative overflow-hidden lg:col-span-7 rounded-[26px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#13100a]/85 via-[#0b0b0b]/92 to-black/95 p-5 sm:p-6 md:p-7"
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-16 h-52 w-52 rounded-full bg-[#D4AF37]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <motion.div
              className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f5e1a3]/20 to-transparent"
              animate={{ x: ["-180%", "420%"] }}
              transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                  Message Our Team
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-gray-200">
                  <ShieldCheck className="h-3 w-3 text-[#D4AF37]" />
                  Secure Inquiry
                </span>
              </div>
              <h2 className="mt-2 text-3xl font-serif font-bold uppercase md:text-4xl">
                Send Us A Message
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">
                Have questions about a treatment? Fill out the form and our medical aesthetics
                clinic in Hackney London will get back to you shortly.
              </p>
            </div>

            <div className="relative z-10 mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {contactHighlights.map((item) => (
                <motion.article
                  key={item.label}
                  className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5"
                  whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    {item.value}
                  </p>
                </motion.article>
              ))}
            </div>

            {referralCode && (
              <motion.div
                variants={fieldItem}
                className="relative z-10 mb-4 rounded-xl border border-[#D4AF37]/35 bg-[#17130a]/70 px-4 py-3 text-xs text-[#f5e4af]"
              >
                Referral code detected: <span className="font-semibold text-white">{referralCode}</span>
              </motion.div>
            )}

            <motion.form
              onSubmit={handleSubmit}
              className="relative z-10 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fieldStagger}
            >
              <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2" variants={fieldItem}>
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  <label htmlFor="firstName" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    First Name *
                  </label>
                  <input
                    required
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Jane"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </motion.div>
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  <label htmlFor="lastName" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Last Name *
                  </label>
                  <input
                    required
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2" variants={fieldItem}>
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  <label htmlFor="email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Email Address *
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </motion.div>
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                  <label htmlFor="phone" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+44 7883 050603"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={fieldItem} whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <label htmlFor="referralCode" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Referral Code (Optional)
                </label>
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={referralCode}
                  onChange={(event) => setReferralCode(normalizeReferralCode(event.target.value))}
                  placeholder="Example: JLUXE-JANE"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </motion.div>

              <motion.div variants={fieldItem} whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <label htmlFor="treatment" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Treatment Of Interest
                </label>
                <select
                  id="treatment"
                  name="treatment"
                  defaultValue=""
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                >
                  <option value="" disabled>
                    Select a treatment
                  </option>
                  <option value="facials">Facials</option>
                  <option value="anti-wrinkle">Anti-Wrinkle Injections</option>
                  <option value="dermal-fillers">Dermal Fillers</option>
                  <option value="skin-boosters">Skin Boosters</option>
                  <option value="body-sculpting">Body Sculpting</option>
                  <option value="iv-drip">IV Vitamin Drip</option>
                  <option value="waxing">Waxing</option>
                  <option value="not-sure">Not Sure Yet</option>
                </select>
              </motion.div>

              <motion.div variants={fieldItem} whileHover={{ y: -1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                <label htmlFor="message" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Your Message *
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help."
                  className="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
              </motion.div>

              <motion.div className="space-y-3 pt-1" variants={fieldItem}>
                <motion.button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="cta-button inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#e4c45b] to-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black shadow-[0_12px_34px_rgba(212,175,55,0.3)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
                  whileTap={{ scale: 0.985 }}
                >
                  {submitState === "submitting" ? "Sending..." : "Send Message"}
                  {submitState !== "submitting" && <Send className="h-4 w-4" />}
                </motion.button>

                <AnimatePresence>
                  {submitState === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="rounded-xl border border-[#D4AF37]/30 bg-[#1b1509] px-4 py-3 text-xs text-[#f0dc9b]"
                    >
                      Thanks. Your message has been received and our team will contact you shortly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.form>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut", delay: 0.08 }}
            className="space-y-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
          >
            <motion.article
              className="relative overflow-hidden rounded-[24px] border border-[#D4AF37]/28 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#080808] p-5 md:p-6"
              whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.42)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[24px] border border-[#D4AF37]/32"
                animate={{ opacity: [0.3, 0.62, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4AF37]/15 blur-3xl" />
              <motion.div
                className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f5e1a3]/30 to-transparent"
                animate={{ x: ["-180%", "420%"] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              />
              <div className="relative mb-4 h-32 overflow-hidden rounded-2xl border border-white/15">
                <Image
                  src="/images/advancedFacials.png"
                  alt="Luxury treatment setting at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-transparent" />
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                <Sparkles className="h-3.5 w-3.5" />
                Contact Details
              </p>
              <ul className="mt-4 space-y-4">
                <motion.li
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3"
                  whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Clinic Location
                  </p>
                  <p className="mt-1 text-sm text-gray-100">Hackney, London</p>
                </motion.li>
                <motion.li
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3"
                  whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Phone
                  </p>
                  <a href={clinicPhoneHref} className="mt-1 block text-sm text-gray-100 transition-colors hover:text-[#D4AF37]">
                    {clinicPhone}
                  </a>
                </motion.li>
                <motion.li
                  className="rounded-xl border border-white/15 bg-black/35 px-4 py-3"
                  whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    <Mail className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Email
                  </p>
                  <a href={clinicEmailHref} className="mt-1 block break-all text-sm text-gray-100 transition-colors hover:text-[#D4AF37]">
                    {clinicEmail}
                  </a>
                </motion.li>
              </ul>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Link
                  href="/pricing"
                  className="cta-button inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-yellow-500"
                >
                  Book Consultation
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={clinicPhoneHref}
                  className="cta-button inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Call Now
                </a>
              </div>
            </motion.article>

            <motion.article
              className="relative overflow-hidden rounded-[24px] border border-white/15 bg-gradient-to-b from-[#121212] via-[#0b0b0b] to-[#070707] p-5 md:p-6"
              whileHover={{ y: -3, borderColor: "rgba(212,175,55,0.35)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent" />
              <h3 className="inline-flex items-center gap-2 text-lg font-serif font-bold uppercase">
                <Clock3 className="h-5 w-5 text-[#D4AF37]" />
                Opening Hours
              </h3>
              <ul className="mt-4 space-y-2.5">
                {openingHours.map((entry) => (
                  <motion.li
                    key={entry.day}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm transition-colors duration-300 hover:border-[#D4AF37]/30 hover:bg-black/45"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <span className="inline-flex items-center gap-2 font-semibold text-gray-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/90" />
                      {entry.day}
                    </span>
                    <span className={entry.hours === "Closed" ? "text-gray-500" : "text-gray-300"}>
                      {entry.hours}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          </motion.aside>
        </div>
      </section>

      {/* MAP */}
      <section className="relative border-y border-neutral-800 bg-[#050505] px-4 py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.1),transparent_45%)]" />
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[26px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#13100a]/85 via-[#090909]/92 to-black/95 p-5 md:p-7"
            whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            <div className="pointer-events-none absolute -right-20 top-8 h-52 w-52 rounded-full bg-[#D4AF37]/12 blur-3xl" />
            <motion.div
              className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[16deg] bg-gradient-to-r from-transparent via-[#f6e9bc]/30 to-transparent"
              animate={{ x: ["-180%", "420%"] }}
              transition={{ duration: 7.1, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              Visit Our Clinic
            </p>
            <h2 className="mt-2 text-center text-3xl font-serif font-bold uppercase md:text-4xl">
              Hackney, London
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-gray-300">
              Conveniently located for clients across East London seeking consultation-led aesthetic
              care in a calm, luxury environment.
            </p>

            <div className="mx-auto mt-5 grid w-full max-w-3xl grid-cols-1 gap-2.5 sm:grid-cols-3">
              <motion.article
                className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5 text-center"
                whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">{googleRating.toFixed(1)}</p>
              </motion.article>
              <motion.article
                className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5 text-center"
                whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">Response</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">&lt;24h</p>
              </motion.article>
              <motion.article
                className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5 text-center"
                whileHover={{ y: -2, borderColor: "rgba(212,175,55,0.35)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">Clinic Area</p>
                <p className="mt-1 text-lg font-serif font-bold text-white">Hackney</p>
              </motion.article>
            </div>

            <MapEmbed
              src={googleMapsEmbedUrl}
              title="J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London map"
              className="mt-6 border border-neutral-800 bg-neutral-900 md:min-h-[360px]"
            />

            <div className="mt-6 text-center">
              <motion.a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-[#141006]/80 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#f4dda1] transition-colors hover:bg-[#D4AF37] hover:text-black"
                whileTap={{ scale: 0.985 }}
              >
                Get Directions
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
