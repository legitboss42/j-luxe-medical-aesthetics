import type { Metadata } from "next";
import { Calendar, Clock3, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorSocialProofCard from "@/src/components/blog/AuthorSocialProofCard";
import { getAllBlogPosts, getBlogPostBySlug, getBlogSlugs } from "@/src/lib/blog";

export const dynamicParams = true;

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | J Luxe Journal",
      description: "The requested article could not be found.",
    };
  }

  const metaTitle = post.metaTitle ?? `${post.title} | J Luxe Journal`;
  const metaDescription = post.metaDescription ?? post.excerpt;
  const canonical = `/blog/${post.slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      images: [
        {
          url: post.heroImageSrc,
          width: 1200,
          height: 630,
          alt: `${post.title} by J Luxe Medical Aesthetics`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [post.heroImageSrc],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    image: [`https://jluxemedicalaesthetics.com${post.heroImageSrc}`],
    mainEntityOfPage: `https://jluxemedicalaesthetics.com/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "J Luxe Medical Aesthetics",
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://jluxemedicalaesthetics.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://jluxemedicalaesthetics.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.heroImageSrc}
            alt={`${post.title} cover image`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/64" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.22),transparent_50%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-12 pt-14 md:px-8 md:pb-14 md:pt-18">
          <p className="inline-flex items-center rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
            {post.category}
          </p>
          <h1 className="mt-5 max-w-[17ch] text-4xl font-serif font-bold uppercase leading-[0.92] md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-gray-200 md:text-base">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-gray-300">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
              {post.dateLabel}
            </span>
            <span className="text-neutral-600">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-[#D4AF37]" />
              {post.readTime}
            </span>
            <span className="text-neutral-600">|</span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#D4AF37]" />
              {post.author}
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-14">
        <article
          className="blog-content mx-auto max-w-4xl rounded-[26px] border border-white/12 bg-gradient-to-b from-[#111111] via-[#0c0c0c] to-[#090909] p-6 md:p-10"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </section>

      <section className="px-4 pb-8 md:px-8 md:pb-10">
        <AuthorSocialProofCard author={post.author} category={post.category} />
      </section>

      <section className="px-4 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[24px] border border-[#D4AF37]/25 bg-gradient-to-r from-[#17120a] via-[#0b0b0b] to-[#17120a] p-6 md:p-8">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
            Next Step
          </p>
          <h2 className="mt-4 text-3xl font-serif font-bold leading-[1.02] md:text-4xl">
            Ready To Plan Your Treatment Safely?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            Every treatment at J Luxe Medical Aesthetics is consultation-led and tailored to your goals,
            anatomy, and timeline for natural-looking outcomes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="cta-button inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-500 transition-colors"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact-us"
              className="cta-button inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-800 px-4 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-serif font-bold uppercase md:text-3xl">Related Reads</h2>
            <Link href="/blog" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37] hover:text-white">
              Back to Journal
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group rounded-2xl border border-white/12 bg-black/35 p-4 transition-colors hover:border-[#D4AF37]/45"
              >
                <p className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-[#D4AF37]">
                  <Tag className="h-3 w-3" />
                  {item.category}
                </p>
                <h3 className="mt-3 text-lg font-serif font-bold leading-tight text-white group-hover:text-[#D4AF37]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


