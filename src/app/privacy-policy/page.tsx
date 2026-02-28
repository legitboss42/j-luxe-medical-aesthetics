import { ArrowRight, Cookie, MapPin, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const effectiveDate = "25 June 2025";
const businessName = "J Luxe Medical Aesthetics";
const clinicAddress = "81 Amhurst Road, Hackney, London E8 2AH";
const clinicEmail = "admin@jluxemedicalaesthetics.com";
const clinicPhone = "+44 7883 050603";
const icoUrl = "https://www.ico.org.uk";

const privacySections = [
  {
    id: "introduction",
    title: "Introduction",
    points: [
      "J Luxe Medical Aesthetics is committed to protecting client and visitor data with care, clarity, and clinical responsibility.",
      "This Privacy and Cookies Policy explains how we collect, use, store, and protect data in line with UK GDPR and the Data Protection Act 2018.",
    ],
  },
  {
    id: "information-collected",
    title: "What Information We Collect",
    points: [
      "Personal data: name, date of birth, contact details, emergency contact details, appointment history, and billing or payment details.",
      "Website data: usage and interaction data captured via cookies and analytics tools.",
      "Special category data: medical history, medications, allergies, treatment records, clinical notes, and treatment photography for medical records and consented marketing use.",
    ],
  },
  {
    id: "how-collected",
    title: "How We Collect Data",
    points: [
      "Consultation and consent forms (digital and in-clinic).",
      "In-person and virtual consultations.",
      "Appointment booking through our website or approved third-party booking systems.",
      "Communication via email, phone, WhatsApp, and social channels.",
      "Newsletter sign-up forms and website cookies.",
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    points: [
      "Consent: for marketing communication and optional follow-up communication.",
      "Contract: to provide requested treatments and booked services.",
      "Legal obligation: to meet healthcare, financial, and regulatory duties.",
      "Legitimate interests: clinic administration, quality assurance, and client safety.",
      "Vital interests: in rare situations where urgent medical protection is needed.",
      "You may withdraw consent at any time where consent is the lawful basis.",
    ],
  },
  {
    id: "how-used",
    title: "How We Use Data",
    points: [
      "To assess treatment suitability and support safe clinical decisions.",
      "To deliver consultation-led, personalized aesthetic treatment plans.",
      "To manage bookings, reminders, confirmations, and treatment records.",
      "To process payments and package administration.",
      "To provide aftercare support and relevant treatment guidance.",
      "To send clinic updates and offers only where you have opted in.",
    ],
  },
  {
    id: "storage-protection",
    title: "How We Store and Protect Data",
    points: [
      "Clinical and personal data are stored in secure, encrypted, password-protected systems.",
      "Any paper records are kept in locked, access-controlled storage.",
      "Access is limited to authorized personnel involved in care and administration.",
      "Potential breaches are logged, reviewed, and handled in line with GDPR obligations.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    points: [
      "Medical records are retained for a minimum of 8 years from last treatment (or until age 25 for minors where applicable).",
      "Booking and communication records are retained for up to 6 years.",
      "Marketing data is kept until you unsubscribe or withdraw consent.",
      "Data is retained only for as long as necessary for legal, clinical, and operational purposes.",
    ],
  },
  {
    id: "sharing",
    title: "How We Share Data",
    points: [
      "We do not sell your personal data.",
      "Data may be shared internally with staff directly involved in your care.",
      "Data may be shared with GDPR-compliant providers such as booking or payment platforms.",
      "Data may be disclosed where required by law, regulators, insurers, or legal authorities.",
      "External referral sharing occurs only with your consent.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    points: [
      "We do not transfer data outside the UK or EEA unless lawful safeguards apply.",
      "Where required, we rely on adequacy decisions, Standard Contractual Clauses, or explicit consent.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights Under UK GDPR",
    points: [
      "You have the right to access, correct, erase, restrict, object, and request portability of your personal data where applicable.",
      "You may withdraw consent at any time for consent-based processing.",
      `To exercise rights, contact us at ${clinicEmail}.`,
    ],
  },
  {
    id: "cookies-policy",
    title: "Cookies Policy",
    points: [
      "Cookies are small text files used to collect standard web log and user behavior data.",
      "Essential cookies: required for core website functionality.",
      "Analytical cookies: used to understand usage and improve website performance.",
      "Marketing cookies: used with your permission to tailor content and improve relevance.",
      "You can manage or disable cookies via browser settings.",
      "A cookie notice or consent mechanism is presented where required.",
    ],
  },
  {
    id: "email-sms",
    title: "Email and SMS Communication",
    points: [
      "With consent, we may send appointment reminders, treatment follow-ups, updates, and offers.",
      "You can unsubscribe from marketing communications at any time via unsubscribe links or direct contact.",
    ],
  },
  {
    id: "external-links",
    title: "External Links",
    points: [
      "Our website may contain links to third-party websites.",
      "We are not responsible for the privacy practices of third-party services.",
      "Please review third-party privacy policies before submitting information.",
    ],
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    points: [
      "This policy is reviewed regularly and the latest version is published on this website.",
      "Material updates may be communicated to clients where appropriate.",
    ],
  },
  {
    id: "contact-data-concerns",
    title: "Contact for Data Concerns",
    points: [
      "Data Protection Lead: J Luxe Medical Aesthetics, 81 Amhurst Road, Hackney, London E8 2AH.",
      `Email: ${clinicEmail}.`,
      "Phone: +44 7883 050603.",
      `You may also raise a concern with the Information Commissioner's Office at ${icoUrl}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
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
        name: "Privacy Policy",
        item: "https://www.jluxemedicalaesthetics.com/privacy-policy",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | J Luxe Medical Aesthetics",
    description:
      "Privacy Policy for J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London.",
    url: "https://www.jluxemedicalaesthetics.com/privacy-policy",
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
          alt="Privacy policy at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,175,55,0.22),transparent_46%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-28 md:px-8 md:pb-14 md:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
            {businessName}
          </p>
          <h1 className="mt-4 text-4xl font-serif font-bold uppercase leading-[0.95] md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base">
            We protect personal and medical data with clinical responsibility, transparent
            communication, and secure systems at our medical aesthetics clinic in Hackney London.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Effective Date</p>
              <p className="mt-1 text-sm font-semibold text-white">{effectiveDate}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Business</p>
              <p className="mt-1 text-sm font-semibold text-white">{businessName}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Email</p>
              <a
                href={`mailto:${clinicEmail}`}
                className="mt-1 block text-sm font-semibold text-white hover:text-[#D4AF37]"
              >
                {clinicEmail}
              </a>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Phone</p>
              <a
                href={`tel:${clinicPhone.replace(/\s+/g, "")}`}
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#D4AF37]"
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                {clinicPhone}
              </a>
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
            {privacySections.map((section) => (
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
          {privacySections.map((section, index) => (
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
              Cookies and Consent
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">
              Clear Choices, Secure Handling
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              You can manage cookie settings through your browser at any time. Where required, we
              request consent before using non-essential cookies and marketing trackers.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <Cookie className="h-3.5 w-3.5 text-[#D4AF37]" />
                Essential Cookies
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <Cookie className="h-3.5 w-3.5 text-[#D4AF37]" />
                Analytics Cookies
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <Cookie className="h-3.5 w-3.5 text-[#D4AF37]" />
                Marketing Cookies
              </span>
            </div>
          </article>

          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6 lg:col-span-5">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/40 text-[#D4AF37]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-2xl font-serif font-bold uppercase">Data Concerns and Contact</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              If you have questions about your data, your rights, or this policy, contact our team
              directly and we will respond as soon as possible.
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-200">
              <p>
                <span className="font-semibold text-white">Address: </span>
                {clinicAddress}
              </p>
              <p>
                <span className="font-semibold text-white">Email: </span>
                {clinicEmail}
              </p>
              <p>
                <span className="font-semibold text-white">Phone: </span>
                {clinicPhone}
              </p>
              <p>
                <span className="font-semibold text-white">ICO: </span>
                <a href={icoUrl} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:text-[#eac85a]">
                  {icoUrl}
                </a>
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
              <a
                href="https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London"
                target="_blank"
                rel="noreferrer"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Get Directions
                <MapPin className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
