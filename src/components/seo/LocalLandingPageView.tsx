import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  ShieldAlert,
  Sparkles,
  Star,
} from "lucide-react";
import MapEmbed from "@/src/components/MapEmbed";
import type { LocalLandingPageConfig } from "@/src/lib/seo/local-landing-pages";

const siteUrl = "https://www.jluxemedicalaesthetics.com";
const googleBusinessName = "J Luxe Medical Aesthetics";
const googleRating = 5;
const googleReviewCount = 80;
const clinicLocationLabel = "Hackney, London";
const googleMapsPlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London";
const googleMapsEmbedUrl =
  "https://maps.google.com/maps?hl=en&q=J%20Luxe%20Medical%20Aesthetics%20Hackney%20London&t=&z=15&ie=UTF8&iwloc=B&output=embed";

type LocalLandingPageViewProps = {
  page: LocalLandingPageConfig;
};

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

export default function LocalLandingPageView({ page }: LocalLandingPageViewProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Treatments",
        item: `${siteUrl}/treatment`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `${siteUrl}${page.path}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    areaServed: `${page.locationName}, London`,
    serviceType: page.serviceLabel,
    provider: {
      "@type": "MedicalBusiness",
      name: googleBusinessName,
      url: siteUrl,
    },
    image: `${siteUrl}${page.image}`,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${page.bookingHref}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative min-h-[62vh] overflow-hidden border-b border-[#D4AF37]/20 md:min-h-[70vh]">
        <Image
          src={page.image}
          alt={page.imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/76 to-black/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(212,175,55,0.22),transparent_48%)]" />

        <div className="relative z-20 mx-auto grid min-h-[62vh] w-full max-w-6xl grid-cols-1 gap-6 px-4 pb-10 pt-28 md:min-h-[70vh] md:px-8 md:pb-12 lg:grid-cols-12 lg:items-end">
          <div className="text-center lg:col-span-8 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
              {page.heroEyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-serif font-bold uppercase leading-[0.94] md:text-6xl">
              {page.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-200 md:text-base lg:mx-0">
              {page.heroDescription}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs uppercase tracking-[0.14em] text-gray-300 md:text-sm lg:mx-0">
              Looking for {page.primaryKeyword}? This page is built to move you faster from local
              search into consultation, pricing, and booking.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {page.chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-100"
                >
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href={page.bookingHref}
                data-cta-name="book_consultation"
                data-cta-location="local_service_hero"
                data-treatment-name={page.treatmentName}
                data-page-type="local_service_page"
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/447883050603"
                target="_blank"
                rel="noreferrer"
                data-cta-name="whatsapp"
                data-cta-location="local_service_hero"
                data-treatment-name={page.treatmentName}
                data-page-type="local_service_page"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                Ask On WhatsApp
              </a>
              <Link
                href={page.servicePageHref}
                data-cta-name="treatment_page_cta"
                data-cta-location="local_service_hero"
                data-treatment-name={page.treatmentName}
                data-page-type="local_service_page"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                View Full Treatment Page
              </Link>
            </div>
          </div>

          <article className="rounded-[24px] border border-[#D4AF37]/28 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#080808] p-5 lg:col-span-4">
            <div className="grid grid-cols-2 gap-3">
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Google Rating</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">{renderStars(googleRating, "h-3 w-3")}</div>
                  <span className="text-sm font-bold text-white">{googleRating.toFixed(1)}</span>
                </div>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Local Search</p>
                <p className="mt-1 text-sm font-bold text-white">{page.locationName}, London</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Approach</p>
                <p className="mt-1 text-sm font-bold text-white">Consultation-led</p>
              </article>
              <article className="rounded-xl border border-white/15 bg-black/45 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Booking Route</p>
                <p className="mt-1 text-sm font-bold text-white">Pricing or WhatsApp</p>
              </article>
            </div>
          </article>
        </div>
      </section>

      <section className="relative border-b border-neutral-800 bg-[#0b0b0b] px-4 py-7 md:px-8 md:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.1),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
                <Clock3 className="h-4 w-4 text-[#D4AF37]" />
              </span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Booking Focus
              </p>
              <p className="mt-1 text-sm font-bold text-white">Fast local route</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
                <CalendarDays className="h-4 w-4 text-[#D4AF37]" />
              </span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Search Area
              </p>
              <p className="mt-1 text-sm font-bold text-white">{page.locationName}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
                <ShieldAlert className="h-4 w-4 text-[#D4AF37]" />
              </span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Planning Style
              </p>
              <p className="mt-1 text-sm font-bold text-white">Suitability first</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#17120a]/70 via-black/55 to-black/75 p-4 text-center">
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              </span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                Service Goal
              </p>
              <p className="mt-1 text-sm font-bold text-white">Book the right treatment</p>
            </article>
          </div>
          <article className="rounded-[24px] border border-[#D4AF37]/20 bg-gradient-to-r from-[#17120a]/70 via-black/55 to-black/70 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              Popular related searches in {page.locationName}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {page.secondaryKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-100"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          <article className="rounded-[28px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#141108]/85 via-[#0b0b0b] to-black/95 p-6 lg:col-span-7 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Why people book from this page
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">
              {page.serviceLabel} for {page.locationName} clients who want a clear next step
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              This page is built for visitors already searching with service intent. Instead of
              sending you through general information only, it connects your local search directly
              to pricing, consultation, and clinician support.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
              If you are searching for {page.serviceLabel.toLowerCase()} in {page.locationName},
              London, or nearby areas, the goal here is simple: help you decide faster and book the
              right service with less friction.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {page.highlights.map((item) => (
                <article
                  key={item}
                  className="rounded-xl border border-white/15 bg-black/40 px-4 py-3"
                >
                  <p className="text-sm leading-relaxed text-gray-200">{item}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-white/15 bg-black/45 p-6 lg:col-span-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Ideal for
            </p>
            <div className="mt-4 space-y-3">
              {page.idealFor.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <p className="text-sm leading-relaxed text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-neutral-800 bg-[#050505] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-[28px] border border-[#D4AF37]/20 bg-gradient-to-b from-[#17120a]/75 via-black/60 to-black/75 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Why choose J Luxe
              </p>
              <div className="mt-5 space-y-3">
                {page.whyChoose.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <p className="text-sm leading-relaxed text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-white/15 bg-black/45 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Nearby areas we can serve
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {page.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-100"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-gray-300">
                If you are based in or around {page.locationName} and want a quicker route into
                booking, this page is designed to reduce friction and move you toward the right
                appointment faster.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
          <article className="rounded-[28px] border border-white/15 bg-black/45 p-6 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Useful next steps
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  data-cta-name="treatment_page_cta"
                  data-cta-location="local_service_resources"
                  data-treatment-name={page.treatmentName}
                  data-page-type="local_service_page"
                  className="cta-button rounded-2xl border border-white/12 bg-black/35 px-4 py-4 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  {resource.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={page.bookingHref}
                data-cta-name="book_consultation"
                data-cta-location="local_service_resources"
                data-treatment-name={page.treatmentName}
                data-page-type="local_service_page"
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+447883050603"
                data-cta-name="call_now"
                data-cta-location="local_service_resources"
                data-page-type="local_service_page"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Phone className="h-4 w-4" />
                Call The Clinic
              </a>
            </div>
          </article>

          <article className="rounded-[28px] border border-white/15 bg-black/45 p-6 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Frequently asked
            </p>
            <div className="mt-5 space-y-4">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <h3 className="text-sm font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{faq.answer}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#060606] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 lg:grid-cols-12">
          <article className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#080808] p-6 lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              {googleBusinessName}
            </p>
            <h3 className="mt-3 text-2xl font-serif font-bold uppercase">Our Happy Clients</h3>
            <div className="mt-3 flex items-center gap-1">{renderStars(googleRating, "h-4 w-4")}</div>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Rated {googleRating.toFixed(1)} on Google with {googleReviewCount}+ verified reviews.
            </p>
            <a
              href={googleMapsPlaceUrl}
              target="_blank"
              rel="noreferrer"
              data-cta-name="contact"
              data-cta-location="local_service_reviews"
              data-page-type="local_service_page"
              className="cta-button mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              View All Reviews
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          <article className="rounded-[26px] border border-white/15 bg-black/45 p-5 lg:col-span-8 md:p-6">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Travel To Our Clinic
            </p>
            <h3 className="mt-3 text-center text-3xl font-serif font-bold uppercase md:text-4xl">
              From {page.locationName} To {clinicLocationLabel}
            </h3>
            <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-gray-300">
              J Luxe Medical Aesthetics is based in {clinicLocationLabel} and is well positioned for
              clients travelling from {page.locationName} and nearby {page.regionLabel} areas to
              book consultation-led treatment.
            </p>
            <MapEmbed
              src={googleMapsEmbedUrl}
              title={`${page.title} map`}
              className="mt-6 border border-neutral-800 bg-neutral-900 md:min-h-[360px]"
            />
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-center">
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                data-cta-name="contact"
                data-cta-location="local_service_map"
                data-page-type="local_service_page"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Get Directions
                <MapPin className="h-4 w-4" />
              </a>
              <Link
                href="/contact-us"
                data-cta-name="contact"
                data-cta-location="local_service_map"
                data-page-type="local_service_page"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Contact The Clinic
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
