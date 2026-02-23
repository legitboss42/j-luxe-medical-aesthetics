"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Laptop,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type VirtualFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Course = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  deliveryLabel: string;
  priceLabel: string;
  priceValue: number;
  ctaLabel: string;
  href: string;
  bullets: string[];
};

const virtualFeatures: VirtualFeature[] = [
  {
    title: "HD Video Modules",
    description:
      "Watch high-definition injection demos with over-the-shoulder angles. Pause, replay, and study each movement in detail.",
    icon: PlayCircle,
  },
  {
    title: "Live Virtual Mentorship",
    description:
      "Join scheduled live clinics for Q&A, case review, and treatment strategy with direct practitioner feedback.",
    icon: Laptop,
  },
  {
    title: "Downloadable Resources",
    description:
      "Get protocol checklists, consent templates, anatomy maps, and structured aftercare guides for daily use.",
    icon: BookOpen,
  },
];

const courses: Course[] = [
  {
    id: "advanced-lips",
    title: "Advanced Lip Mastery",
    description:
      "Master premium lip shaping frameworks, profile balancing, and correction pathways through fully virtual skill modules.",
    imageSrc: "/images/dermalFillers.png",
    imageAlt:
      "Advanced lip filler training at a medical aesthetics clinic in Hackney London",
    deliveryLabel: "100% Virtual Masterclass",
    priceLabel: "£450",
    priceValue: 450,
    ctaLabel: "Enroll Now",
    href: "/contact-us",
    bullets: [
      "CPD-accredited certification",
      "Lifetime module access",
      "Complications awareness training",
    ],
  },
  {
    id: "foundation-pathway",
    title: "Foundation Anti-Wrinkle & Fillers",
    description:
      "Complete virtual theory first, then transition into focused practical application for a structured beginner-to-practitioner pathway.",
    imageSrc: "/images/anti-wrinkle-injection.png",
    imageAlt:
      "Foundation anti wrinkle and filler training at a medical aesthetics clinic in Hackney London",
    deliveryLabel: "Blended Learning",
    priceLabel: "£1,800",
    priceValue: 1800,
    ctaLabel: "Apply Now",
    href: "/contact-us",
    bullets: [
      "Pre-study digital curriculum",
      "Guided treatment planning",
      "In-clinic practical day support",
    ],
  },
  {
    id: "business-aesthetics",
    title: "The Business of Aesthetics",
    description:
      "Build commercial confidence with pricing architecture, offer positioning, and social growth systems for sustainable bookings.",
    imageSrc: "/images/leadPractitioner.png",
    imageAlt:
      "Business mentorship training at a medical aesthetics clinic in Hackney London",
    deliveryLabel: "100% Virtual",
    priceLabel: "£299",
    priceValue: 299,
    ctaLabel: "Enroll Now",
    href: "/contact-us",
    bullets: [
      "Offer and pricing frameworks",
      "Content and lead strategy",
      "Client conversion workflows",
    ],
  },
];

const academyStats = [
  { value: "CPD", label: "Fully Accredited" },
  { value: "24/7", label: "Portal Access" },
  { value: "1:1", label: "Mentorship Support" },
  { value: "100%", label: "Post-Course Guidance" },
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
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function TrainingAcademyPage() {
  const trainingSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "J Luxe Virtual Academy Courses",
      description:
        "Virtual aesthetics training courses from J Luxe Medical Aesthetics in Hackney, London.",
      itemListElement: courses.map((course, index) => ({
        "@type": "Course",
        position: index + 1,
        name: course.title,
        description: course.description,
        provider: {
          "@type": "Organization",
          name: "J Luxe Medical Aesthetics",
        },
        offers: {
          "@type": "Offer",
          price: course.priceValue,
          priceCurrency: "GBP",
          url: course.href,
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
          name: "Training Academy",
          item: "https://jluxemedicalaesthetics.com/training",
        },
      ],
    }),
    [],
  );

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trainingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div aria-hidden className="pointer-events-none select-none blur-[6px]">

      {/* HERO */}
      <section className="relative min-h-[72vh] overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/heroImagePrompt.png"
            alt="Aesthetic practitioner training demonstration at a medical aesthetics clinic in Hackney London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/74 to-black/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(212,175,55,0.24),transparent_48%)]" />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f4dda1]/25 to-transparent"
            animate={{ x: ["-170%", "420%"] }}
            transition={{ duration: 8.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#D4AF37]/12 blur-3xl"
          animate={{ y: [-14, 16, -14], x: [0, 12, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-14 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [16, -14, 16], x: [0, -10, 0] }}
          transition={{ duration: 9.1, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-20 mx-auto flex min-h-[72vh] w-full max-w-7xl items-end px-4 pb-14 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealStagger}
            className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12"
          >
            <div className="text-center lg:col-span-8 lg:text-left">
              <motion.p
                variants={revealItem}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                J Luxe Virtual Academy
              </motion.p>
              <motion.h1
                variants={revealItem}
                className="text-4xl font-serif font-bold uppercase leading-[0.95] md:text-6xl"
              >
                Master The Art
                <br />
                Of Aesthetics
              </motion.h1>
              <motion.p
                variants={revealItem}
                className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base lg:mx-0"
              >
                Build clinical confidence through state-of-the-art virtual aesthetics education
                with mentorship, protocol depth, and career-ready business frameworks.
              </motion.p>

              <motion.div
                variants={revealItem}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <a
                  href="#courses"
                  className="cta-button inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-yellow-500"
                >
                  View Courses
                </a>
                <Link
                  href="/login"
                  className="cta-button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/35 px-8 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  <Laptop className="h-4 w-4" />
                  Student Portal
                </Link>
              </motion.div>
            </div>

            <motion.aside variants={revealItem} className="lg:col-span-4">
              <motion.article
                className="relative overflow-hidden rounded-[24px] border border-white/20 bg-black/45 p-5 backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/14 blur-3xl" />
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Virtual Advantage
                </p>
                <h2 className="mt-4 text-2xl font-serif font-bold uppercase leading-tight">
                  Structured.
                  <span className="text-[#D4AF37]"> Practical.</span> Scalable.
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Delivery</p>
                    <p className="mt-1 text-lg font-serif font-bold text-white">Virtual</p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Support</p>
                    <p className="mt-1 text-lg font-serif font-bold text-white">1:1</p>
                  </div>
                </div>
              </motion.article>
            </motion.aside>
          </motion.div>
        </div>
      </section>

      {/* VIRTUAL EXPERIENCE */}
      <section className="relative px-4 py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_5%,rgba(212,175,55,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-bold uppercase md:text-4xl">
              The Virtual Experience
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
              Every module is designed for remote clarity and real-world application, with guided
              learning paths that translate into confident treatment delivery.
            </p>
          </div>

          <motion.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {virtualFeatures.map((feature) => (
              <motion.article
                key={feature.title}
                variants={revealItem}
                className="group rounded-[22px] border border-white/12 bg-black/35 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/45"
              >
                <feature.icon className="h-10 w-10 text-[#D4AF37]" />
                <h3 className="mt-5 text-lg font-bold uppercase tracking-[0.06em]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{feature.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="border-y border-neutral-800 bg-[#050505] px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                Enroll Today
              </p>
              <h2 className="mt-2 text-3xl font-serif font-bold uppercase md:text-4xl">
                Our Curriculum
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-gray-300 md:text-right">
              Built for ambitious beginners and growth-focused practitioners who need technical
              excellence plus commercial confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {courses.map((course, index) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: "easeOut" }}
                className="group overflow-hidden rounded-[22px] border border-white/12 bg-black/35 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/45"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={course.imageSrc}
                    alt={course.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                      course.deliveryLabel === "Blended Learning"
                        ? "border border-[#D4AF37]/50 bg-[#D4AF37]/20 text-[#D4AF37]"
                        : "border border-white/25 bg-black/55 text-white"
                    }`}
                  >
                    {course.deliveryLabel}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold leading-tight">{course.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-300">{course.description}</p>

                  <ul className="mt-5 space-y-2">
                    {course.bullets.map((bullet) => (
                      <li key={bullet} className="inline-flex items-center gap-2 text-sm text-gray-200">
                        <CheckCircle className="h-4 w-4 text-[#D4AF37]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-gray-500">Tuition</p>
                      <p className="mt-1 text-2xl font-serif font-bold text-[#D4AF37]">{course.priceLabel}</p>
                    </div>
                    <Link
                      href={course.href}
                      className="cta-button inline-flex min-h-[42px] items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#D4AF37]"
                    >
                      {course.ctaLabel}
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
              className="rounded-[22px] bg-gradient-to-br from-[#D4AF37] to-[#b78813] p-7 text-black"
            >
              <ShieldCheck className="h-11 w-11" />
              <h3 className="mt-5 text-3xl font-serif font-bold leading-tight">
                Complications Management Protocol
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed">
                Every clinical student receives our virtual risk-response framework covering safety
                escalation, vascular concerns, and urgent intervention pathways.
              </p>
              <Link
                href="/contact-us"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] underline-offset-4 hover:underline"
              >
                Ask About The Curriculum
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          </div>
        </div>
      </section>

      {/* STANDARD */}
      <section className="px-4 py-16 text-center md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <Award className="mx-auto h-16 w-16 text-[#D4AF37]" />
          <h2 className="mt-6 text-3xl font-serif font-bold uppercase md:text-4xl">
            The J Luxe Standard
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            Beyond certificates, we train for long-term outcomes: safe clinical practice,
            repeatable systems, and confident career growth.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4">
            {academyStats.map((item) => (
              <article key={item.label} className="rounded-xl border border-white/10 bg-black/35 px-4 py-4">
                <p className="text-3xl font-serif font-bold text-[#D4AF37]">{item.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-gray-400">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </div>

      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm">
        <div className="w-full max-w-xl rounded-2xl border border-[#D4AF37]/35 bg-[#0b0b0b]/95 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)] md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
            J Luxe Training Academy
          </p>
          <h1 className="mt-3 text-4xl font-serif font-bold uppercase leading-tight md:text-5xl">
            Coming Soon
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-300 md:text-base">
            Training enrolment is currently unavailable. Please check back shortly for launch
            updates.
          </p>
        </div>
      </div>
    </main>
  );
}
