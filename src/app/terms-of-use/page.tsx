import { ArrowRight, CalendarDays, MapPin, Phone, Scale, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const effectiveDate = "25 June 2025";

const termsSections = [
  {
    id: "clinical-standards",
    title: "Clinical Standards and Duty of Care",
    points: [
      "All treatments are performed by qualified, insured, and NMC-registered medical professionals in line with evidence-based practice.",
      "You must provide complete and accurate medical information at consultation and before each treatment session.",
      "If we identify medical, ethical, or safety concerns, we may decline or postpone treatment in your best interest.",
      "You must inform us of any health changes between appointments, including new medication, pregnancy, or illness.",
      "Failure to disclose relevant medical information may limit or remove clinic liability in the event of complications.",
    ],
  },
  {
    id: "consultation-booking-deposit",
    title: "Consultation, Booking, and Deposit Policy",
    points: [
      "A consultation is required before injectable or invasive treatments. Consultation fees may apply and may be redeemable against treatment within 30 days.",
      "A non-refundable 50% deposit is required to secure appointments and is deducted from treatment cost on the day.",
      "Deposits are not transferable to other people or unrelated services once a booking is confirmed.",
      "Repeated cancellations or reschedules may require full prepayment for future bookings.",
      "No-shows are recorded and may result in refusal of future bookings.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations, Rescheduling, and Late Arrivals",
    points: [
      "At least 48 hours notice is required to cancel or reschedule without penalty.",
      "Cancellations made with less than 24 hours notice will forfeit the full deposit.",
      "Arriving more than 15 minutes late may result in refusal of treatment and deposit loss.",
      "Repeated late cancellations or lateness may remove access to promotions and booking privileges.",
      "For genuine emergencies, flexibility may be offered at clinic discretion with supporting documentation.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds and Satisfaction",
    points: [
      "Aesthetic treatments are elective and outcomes vary by person; refunds are not available once treatment is administered.",
      "Treatments are designed for subtle and natural enhancement, not guaranteed perfection.",
      "If you are unhappy with results, a review appointment may be offered within 5 working days.",
      "A review does not guarantee refunds or free corrective treatment unless clinically indicated.",
      "No refunds are provided for change of mind, post-consultation unsuitability, or subjective expectations not met.",
    ],
  },
  {
    id: "topups",
    title: "Top-Ups, Adjustments, and Maintenance",
    points: [
      "Top-up appointments are not included unless clearly stated and are usually booked between day 10 and day 21 post-treatment.",
      "Some treatments require a course and ongoing maintenance; booking and completion remain your responsibility.",
      "Adjustments are carried out only where clinically appropriate.",
      "Corrective work requested outside advised review windows is chargeable at standard rates.",
    ],
  },
  {
    id: "eligibility",
    title: "Age, Health, and Eligibility",
    points: [
      "We do not treat clients under 18 years old. Valid photo ID may be required.",
      "We do not treat clients who are pregnant or breastfeeding unless clinically cleared in writing where relevant.",
      "Known contraindications may prevent treatment for your safety.",
      "False medical or age information may lead to immediate termination of service and permanent refusal of future treatment.",
    ],
  },
  {
    id: "consent-photography",
    title: "Informed Consent and Clinical Photography",
    points: [
      "You must complete and sign medical history and consent documents before treatment.",
      "If consent forms are not signed, treatment will be canceled and your deposit will not be refunded.",
      "Clinical before-and-after photographs may be taken for your confidential medical records.",
      "Clinical images are not used publicly without explicit written consent.",
    ],
  },
  {
    id: "promotions-packages",
    title: "Promotions, Packages, and Offers",
    points: [
      "Promotions are limited, subject to availability, and may be changed or withdrawn without notice.",
      "Discounts cannot be combined unless clearly stated.",
      "Prepaid packages are non-refundable once treatment has started and must be used within stated validity periods.",
      "If medical reasons prevent completion of a package, partial refund requests may be considered at clinic discretion after deduction of delivered services and administrative fees.",
    ],
  },
  {
    id: "vouchers-credits",
    title: "Gift Vouchers and Credits",
    points: [
      "Gift vouchers are valid for 6 months, non-refundable, and non-transferable.",
      "Vouchers cannot be exchanged for cash and cannot be used after expiry.",
      "Voucher details must be presented at booking or treatment time.",
    ],
  },
  {
    id: "aftercare",
    title: "Aftercare and Client Responsibility",
    points: [
      "You must follow all aftercare instructions given verbally and in writing.",
      "Ignoring aftercare guidance may affect outcomes and increase side-effect risk.",
      "The clinic is not responsible for results affected by poor aftercare, excessive alcohol, smoking, sun exposure, or unadvised products and treatments.",
      "Contact us immediately if you have any concerns after treatment.",
    ],
  },
  {
    id: "liability-behaviour",
    title: "Liability, Behaviour, and Clinic Safety",
    points: [
      "We are not responsible for loss or damage to personal property during clinic visits.",
      "We are not responsible for complications caused by inaccurate medical disclosures.",
      "We are not responsible for results affected by treatments performed elsewhere or unapproved at-home products.",
      "Clients under the influence of alcohol or recreational drugs will be refused treatment and charged in full.",
      "Abusive, threatening, or inappropriate behavior toward staff may result in permanent ban and legal action.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property and Brand Protection",
    points: [
      "Service descriptions, treatment names, protocols, forms, and visual content are the intellectual property of J Luxe Medical Aesthetics.",
      "No clinic content may be reused, republished, copied, or sold without written permission.",
      "Unauthorized commercial or educational reuse may lead to legal action.",
    ],
  },
  {
    id: "data-protection",
    title: "Data Protection and Confidentiality",
    points: [
      "J Luxe Medical Aesthetics complies with UK GDPR requirements.",
      "Client records, consultation forms, and images are stored securely and treated as confidential medical data.",
      "Data will not be shared with third parties without written consent unless required by law.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    points: [
      "These terms are governed by the laws of England and Wales.",
      "By booking consultation or treatment, you agree to these Terms of Use in full.",
    ],
  },
];

const clientPromise = [
  "Ethical and medically sound practice",
  "Transparent communication at every step",
  "Natural-looking, confidence-first results",
  "Strict client confidentiality",
  "Luxury care and attentive support throughout your journey",
];

export default function TermsOfUsePage() {
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
        name: "Terms of Use",
        item: "https://jluxemedicalaesthetics.com/terms-of-use",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Use | J Luxe Medical Aesthetics",
    description:
      "Terms of Use for J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London.",
    url: "https://jluxemedicalaesthetics.com/terms-of-use",
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
        <Image
          src="/images/heroBackground.png"
          alt="Terms and conditions at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,175,55,0.22),transparent_46%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
            J Luxe Medical Aesthetics
          </p>
          <h1 className="mt-4 text-4xl font-serif font-bold uppercase leading-[0.95] md:text-6xl">
            Terms of Use
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base">
            These terms explain how treatment, booking, consent, and aftercare are managed at
            J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London. They are
            designed to protect clinical safety, transparency, and client confidence.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Effective From</p>
              <p className="mt-1 text-sm font-semibold text-white">{effectiveDate}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Clinic Phone</p>
              <a href="tel:+447883050603" className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#D4AF37]">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                +44 7883 050603
              </a>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Clinic Location</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                81 Amhurst Road, Hackney, London E8 2AH
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-800 bg-[#0b0b0b] px-4 py-8 md:px-8">
        <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-black/35 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
            Quick Navigation
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {termsSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl space-y-5">
          {termsSections.map((section, index) => (
            <article
              id={section.id}
              key={section.id}
              className="rounded-[24px] border border-white/15 bg-gradient-to-b from-[#141108]/80 via-[#0c0c0c] to-black/90 p-5 md:p-6"
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/55 text-[10px] font-bold text-[#D4AF37]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-serif font-bold uppercase leading-snug md:text-2xl">
                  {section.title}
                </h2>
              </div>
              <ul className="ml-5 list-disc space-y-2.5 text-sm leading-relaxed text-gray-300 md:text-base">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D4AF37]/20 bg-gradient-to-b from-[#0b0b0b] to-[#070707] px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-12">
          <article className="rounded-[24px] border border-[#D4AF37]/30 bg-gradient-to-b from-[#1a1408] via-[#0d0d0d] to-[#090909] p-6 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Our Client Promise
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">
              Ethical, Safe, and Premium Care
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              We are committed to delivering consultation-led care with medical integrity and
              clear communication throughout your treatment journey.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-gray-200 md:text-base">
              {clientPromise.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6 lg:col-span-5">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/40 text-[#D4AF37]">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-2xl font-serif font-bold uppercase">Legal Notice</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              By booking a consultation, purchasing services, or undergoing treatment at J Luxe
              Medical Aesthetics, you confirm that you have read, understood, and agreed to these
              Terms of Use.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              All results vary by individual and by treatment type. Clinical recommendations are
              always made based on safety, suitability, and realistic outcomes.
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-200">
              <p>
                <span className="font-semibold text-white">Email: </span>
                admin@jluxemedicalaesthetics.com
              </p>
              <p>
                <span className="font-semibold text-white">Address: </span>
                81 Amhurst Road, Hackney, London E8 2AH
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black hover:bg-[#eac85a]"
              >
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/booking"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Book Consultation
                <CalendarDays className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
