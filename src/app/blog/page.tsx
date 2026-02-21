"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Sparkles, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  publishedAt: string;
  author: string;
  imageSrc: string;
  slug: string;
  featured: boolean;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Dermal Fillers: What to Expect",
    excerpt:
      "Everything you need to know about dermal fillers, from consultation to aftercare, explained by our Hackney, London medical team.",
    category: "Injectables",
    dateLabel: "Feb 15, 2026",
    publishedAt: "2026-02-15",
    author: "J Luxe Team",
    imageSrc: "/images/dermalFillers.png",
    slug: "ultimate-guide-to-dermal-fillers",
    featured: true,
  },
  {
    id: "2",
    title: "Exosomes vs. PRP: Which Skin Rejuvenation is Right for You?",
    excerpt:
      "Compare two advanced regenerative options and discover which treatment path best supports your skin goals and lifestyle.",
    category: "Skin Rejuvenation",
    dateLabel: "Feb 02, 2026",
    publishedAt: "2026-02-02",
    author: "J Luxe Team",
    imageSrc: "/images/exosome.png",
    slug: "exosomes-vs-prp",
    featured: false,
  },
  {
    id: "3",
    title: "Preparing for Your First Chemical Peel",
    excerpt:
      "A simple prep guide before your peel appointment to help maximize results, reduce irritation, and support a smoother recovery.",
    category: "Skincare",
    dateLabel: "Jan 28, 2026",
    publishedAt: "2026-01-28",
    author: "J Luxe Team",
    imageSrc: "/images/chemical-peels.png",
    slug: "preparing-for-chemical-peel",
    featured: false,
  },
  {
    id: "4",
    title: "Why Lemon Bottle Is Changing Fat Dissolving Treatments",
    excerpt:
      "Learn why Lemon Bottle is increasingly requested for body contouring and how consultation-led planning improves outcomes.",
    category: "Body Sculpting",
    dateLabel: "Jan 15, 2026",
    publishedAt: "2026-01-15",
    author: "J Luxe Team",
    imageSrc: "/images/fat-dissolving-injections.png",
    slug: "lemon-bottle-fat-dissolving",
    featured: false,
  },
  {
    id: "5",
    title: "Top Benefits of Regular IV Vitamin Therapy",
    excerpt:
      "From improved energy to skin support, explore how IV vitamin drips can complement your wider wellness and aesthetics strategy.",
    category: "Wellness",
    dateLabel: "Jan 05, 2026",
    publishedAt: "2026-01-05",
    author: "J Luxe Team",
    imageSrc: "/images/iv-vitamin-drip.png",
    slug: "benefits-of-iv-vitamin-therapy",
    featured: false,
  },
  {
    id: "6",
    title: "How Long Do Lip Fillers Last? A Realistic Timeline",
    excerpt:
      "A practical guide to filler longevity, maintenance timing, and the factors that influence how long your lip results stay visible.",
    category: "Injectables",
    dateLabel: "Dec 19, 2025",
    publishedAt: "2025-12-19",
    author: "J Luxe Team",
    imageSrc: "/images/anti-wrinkle-injection.png",
    slug: "how-long-do-lip-fillers-last",
    featured: false,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const journalStats = [
  { label: "Expert-Led Articles", value: "Clinical Focus" },
  { label: "Updated", value: "Monthly" },
  { label: "Location", value: "Hackney, London" },
];

export default function BlogHubPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    [],
  );

  const categoryCounts = useMemo(() => {
    const base: Record<string, number> = { All: blogPosts.length };
    blogPosts.forEach((post) => {
      base[post.category] = (base[post.category] ?? 0) + 1;
    });
    return base;
  }, []);

  const filteredPosts = useMemo(
    () =>
      activeCategory === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === activeCategory),
    [activeCategory],
  );

  const featuredPost = useMemo(
    () => (activeCategory === "All" ? blogPosts.find((post) => post.featured) ?? null : null),
    [activeCategory],
  );

  const gridPosts = useMemo(
    () =>
      filteredPosts.filter(
        (post) => !(activeCategory === "All" && featuredPost && post.id === featuredPost.id),
      ),
    [filteredPosts, activeCategory, featuredPost],
  );

  const blogSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "The J Luxe Journal",
      description:
        "Educational aesthetics content from J Luxe Medical Aesthetics in Hackney, London covering injectables, skincare, and treatment planning.",
      publisher: {
        "@type": "MedicalBusiness",
        name: "J Luxe Medical Aesthetics",
      },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.publishedAt,
        author: {
          "@type": "Organization",
          name: post.author,
        },
        url: `/blog/${post.slug}`,
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
          name: "Blog",
          item: "https://jluxemedicalaesthetics.com/blog",
        },
      ],
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/heroBackground.png"
            alt="J Luxe Journal hero at a medical aesthetics clinic in Hackney London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/68" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.25),transparent_48%)]" />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f4dda1]/25 to-transparent"
            animate={{ x: ["-170%", "420%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/12 blur-3xl"
          animate={{ y: [-14, 16, -14], x: [0, 10, 0] }}
          transition={{ duration: 8.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-0 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [16, -14, 16], x: [0, -12, 0] }}
          transition={{ duration: 9.1, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-20 mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-8 md:pt-20">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="text-center lg:col-span-8 lg:text-left">
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] md:text-sm"
              >
                Education & Insights
              </motion.p>
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-4xl font-serif font-bold uppercase leading-[0.95] md:text-6xl"
              >
                The J Luxe Journal
              </motion.h1>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-[#D4AF37]/75 via-[#D4AF37]/25 to-transparent lg:mx-0"
              />
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base lg:mx-0"
              >
                Expert advice, treatment education, and clinic updates from our medical aesthetics
                clinic in Hackney London. Learn before you book.
              </motion.p>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
              >
                {journalStats.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-200"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {item.value}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
              className="lg:col-span-4"
            >
              <motion.article
                className="relative overflow-hidden rounded-[24px] border border-white/20 bg-black/45 p-5 backdrop-blur-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/14 blur-3xl" />
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <BookOpen className="h-3.5 w-3.5" />
                  Editorial Standard
                </p>
                <h3 className="mt-4 text-2xl font-serif font-bold uppercase leading-tight">
                  Built For
                  <span className="text-[#D4AF37]"> Trust & Conversion</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  Treatment explainers that answer intent-led searches and guide readers toward
                  safe, consultation-led decisions.
                </p>
              </motion.article>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-20 z-30 border-b border-neutral-800 bg-[#0a0a0a]/88 backdrop-blur-md lg:top-[172px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:justify-center lg:overflow-visible lg:pb-0">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActive
                      ? "border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_8px_20px_rgba(212,175,55,0.25)]"
                      : "border-neutral-700 bg-neutral-900/80 text-gray-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/50 hover:text-white"
                  }`}
                >
                  {isActive && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-black align-middle" />}
                  {category} ({categoryCounts[category] ?? 0})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mb-14"
            >
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative grid overflow-hidden rounded-[30px] border border-white/15 bg-black/35 shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4AF37]/45 lg:grid-cols-12"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
                <div className="relative min-h-[300px] lg:col-span-6 lg:min-h-[420px]">
                  <Image
                    src={featuredPost.imageSrc}
                    alt={`${featuredPost.title} at J Luxe Medical Aesthetics in Hackney London`}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-black">
                    Featured
                  </span>
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-200">
                    <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                    Editor Pick
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-6 lg:p-10">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-gray-400">
                    <span className="inline-flex items-center gap-1.5 text-[#D4AF37]">
                      <Tag className="h-3.5 w-3.5" />
                      {featuredPost.category}
                    </span>
                    <span className="text-neutral-600">|</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredPost.dateLabel}
                    </span>
                    <span className="text-neutral-600">|</span>
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {featuredPost.author}
                    </span>
                  </div>

                  <h2 className="text-3xl font-serif font-bold leading-tight text-white transition-colors group-hover:text-[#D4AF37] md:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
                    {featuredPost.excerpt}
                  </p>
                  <span className="cta-button mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          )}

          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/12 bg-gradient-to-b from-[#121212] via-[#0c0c0c] to-[#0a0a0a] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4AF37]/45"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.imageSrc}
                        alt={`${post.title} from J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London`}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-gray-400">
                        <span className="truncate font-semibold text-[#D4AF37]">{post.category}</span>
                        <span className="shrink-0">{post.dateLabel}</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold leading-snug text-white transition-colors group-hover:text-[#D4AF37]">
                        {post.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">{post.excerpt}</p>

                      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                          <User className="h-3.5 w-3.5" />
                          {post.author}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.11em] text-gray-300 transition-colors group-hover:text-[#D4AF37]">
                          Read
                          <ArrowRight className="h-4 w-4 text-gray-500 transition-colors group-hover:text-[#D4AF37]" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {gridPosts.length === 0 && (
            <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-black/35 py-16 text-center">
              <div className="pointer-events-none absolute -left-16 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
              <h3 className="text-2xl font-serif font-bold text-gray-200">No Articles Found</h3>
              <p className="mt-2 text-sm text-gray-400">
                We&apos;re preparing new content for the {activeCategory} category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="relative overflow-hidden border-t border-neutral-800 bg-gradient-to-t from-[#050505] to-[#0a0a0a] px-4 py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <Image
            src="/images/glowCta.png"
            alt="Luxury newsletter backdrop at J Luxe Medical Aesthetics in Hackney London"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[26px] border border-[#D4AF37]/25 bg-black/35 p-6 text-center shadow-[0_16px_55px_rgba(0,0,0,0.38)] md:p-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#D4AF37]/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            Journal Updates
          </p>
          <h2 className="mt-4 text-3xl font-serif font-bold uppercase md:text-4xl">Never Miss An Update</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300">
            Subscribe to receive J Luxe clinic updates, treatment explainers, and practical
            skincare insights from our Hackney team.
          </p>
          <form
            className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full rounded-full border border-neutral-700 bg-neutral-900/80 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="cta-button inline-flex shrink-0 items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-yellow-500"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
