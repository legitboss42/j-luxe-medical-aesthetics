import { ArrowRight, BookOpen, Calendar, Sparkles, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts } from "@/src/lib/blog";

const journalStats = [
  { label: "Expert-Led Articles", value: "Clinical Focus" },
  { label: "Updated", value: "Weekly" },
  { label: "Location", value: "Hackney, London" },
];

export default async function BlogHubPage() {
  const blogPosts = await getAllBlogPosts();

  const categoryCounts = blogPosts.reduce<Record<string, number>>(
    (acc, post) => {
      acc[post.category] = (acc[post.category] ?? 0) + 1;
      return acc;
    },
    { All: blogPosts.length },
  );

  const categories = ["All", ...Object.keys(categoryCounts).filter((name) => name !== "All")];
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0] ?? null;
  const gridPosts = blogPosts.filter((post) => !featuredPost || post.slug !== featuredPost.slug);

  const blogSchema = {
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
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.jluxemedicalaesthetics.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.jluxemedicalaesthetics.com/blog",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 z-0">
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
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-8 md:pt-20">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="text-center lg:col-span-8 lg:text-left">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37] md:text-sm">
                Education & Insights
              </p>
              <h1 className="text-4xl font-serif font-bold uppercase leading-[0.92] md:text-6xl">
                The J Luxe Journal
              </h1>
              <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-[#D4AF37]/75 via-[#D4AF37]/25 to-transparent lg:mx-0" />
              <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base lg:mx-0">
                Expert advice, treatment education, and clinic updates from our medical aesthetics
                clinic in Hackney London. Learn before you book.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                {journalStats.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-200"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {item.value}
                  </span>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <article className="relative overflow-hidden rounded-[24px] border border-white/20 bg-black/45 p-5 backdrop-blur-sm">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/14 blur-3xl" />
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <BookOpen className="h-3.5 w-3.5" />
                  Editorial Standard
                </p>
                <h2 className="mt-4 text-2xl font-serif font-bold uppercase leading-[1.02]">
                  Built For
                  <span className="text-[#D4AF37]"> Trust & Conversion</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  Intent-led treatment explainers that guide readers toward safe,
                  consultation-led decisions.
                </p>
              </article>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-800 bg-[#0a0a0a]/88">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:justify-center lg:overflow-visible lg:pb-0">
            {categories.map((category) => (
              <span
                key={category}
                className="shrink-0 rounded-full border border-neutral-700 bg-neutral-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-gray-300"
              >
                {category} ({categoryCounts[category] ?? 0})
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          {featuredPost && (
            <article className="mb-14">
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
            </article>
          )}

          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/12 bg-gradient-to-b from-[#121212] via-[#0c0c0c] to-[#0a0a0a] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4AF37]/45"
                  >
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
                </article>
              ))}
            </div>
          )}

          {blogPosts.length === 0 && (
            <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-black/35 py-16 text-center">
              <h3 className="text-2xl font-serif font-bold text-gray-200">No Articles Found</h3>
              <p className="mt-2 text-sm text-gray-400">
                Add your first markdown post to <code>content/blog</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

