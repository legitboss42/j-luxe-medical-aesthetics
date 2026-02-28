import { AlertTriangle, ArrowRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const businessName = "J Luxe Medical Aesthetics";
const effectiveDate = "25 June 2025";
const clinicEmail = "admin@jluxemedicalaesthetics.com";
const clinicPhone = "+44 7883 050603";
const clinicAddress = "81 Amhurst Road, Hackney, London E8 2AH";

const complaintsSections = [
  {
    id: "introduction",
    title: "Introduction",
    points: [
      "At J Luxe Medical Aesthetics, we welcome feedback as part of delivering safe, respectful, and high-quality care.",
      "We handle all complaints through a clear, fair, and confidential process aligned with UK clinical governance standards.",
      "Our approach is informed by professional guidance from bodies such as JCCP, GMC, and NMC.",
    ],
  },
  {
    id: "purpose",
    title: "Purpose of This Policy",
    points: [
      "To ensure concerns are acknowledged, investigated, and addressed promptly.",
      "To maintain trust through transparent communication and respectful dialogue.",
      "To protect clients and practitioners through a clinically governed process.",
      "To separate valid service concerns from outcomes rooted in unrealistic expectations or behavior outside policy.",
    ],
  },
  {
    id: "who-can-complain",
    title: "Who Can Submit a Complaint",
    points: [
      "Current or former clients of J Luxe Medical Aesthetics.",
      "A legal representative acting for a client with valid consent.",
      "Prospective clients with a clear concern about communication or conduct.",
    ],
  },
  {
    id: "what-can-be-complained-about",
    title: "What Can Be Complained About",
    points: [
      "Clinical care within the scope of treatments provided.",
      "Conduct or communication of staff members.",
      "Service quality, delivery, premises safety, or cleanliness.",
      "Complaints are not processed where outcomes are within informed consent expectations and clinical standards were met.",
      "Complaints are not used to bypass no-refund terms where no clinical fault is identified.",
      "Anonymous complaints or complaints raised over 6 months after the incident may not be accepted.",
    ],
  },
  {
    id: "how-to-complain",
    title: "How to Make a Complaint",
    points: [
      "Include your full name and contact details.",
      "Provide a clear summary of events including dates, people involved, and what happened.",
      "Attach relevant evidence where available.",
      "State your preferred resolution, where appropriate.",
      `Submit by email to ${clinicEmail} or by post to ${clinicAddress}.`,
    ],
  },
  {
    id: "process",
    title: "Our Complaint Process",
    points: [
      "Step 1 - Acknowledgement: we confirm receipt within 3 working days.",
      "Step 2 - Initial review: minor concerns may be resolved informally by phone or in writing.",
      "Step 3 - Formal investigation: serious concerns are reviewed by the Clinical Director or a designated lead.",
      "Formal investigations may include review of clinical records, internal statements, and factual verification.",
      "A written outcome is normally issued within 20 working days.",
      "If more time is needed, we will explain why and provide a revised timeline.",
    ],
  },
  {
    id: "outcomes",
    title: "Possible Outcomes",
    points: [
      "A written explanation and formal apology where appropriate.",
      "Service or process improvements.",
      "Clinical clarification and guidance.",
      "Corrective treatment only when clinically appropriate and accepted by the treating practitioner.",
      "In rare cases, recommendation for independent review or formal escalation.",
      "Compensation is not offered unless liability is established with suitable clinical or legal basis.",
    ],
  },
  {
    id: "escalation",
    title: "Escalation Routes",
    points: [
      "Joint Council for Cosmetic Practitioners (JCCP): www.jccp.org.uk",
      "Save Face (where accreditation applies): www.saveface.co.uk",
      "General Medical Council (GMC): www.gmc-uk.org",
      "Nursing and Midwifery Council (NMC): www.nmc.org.uk",
    ],
  },
  {
    id: "behavioural-policy",
    title: "Behavioural Policy",
    points: [
      "We operate a zero-tolerance approach to abusive, threatening, or intimidating behavior.",
      "Defamatory public statements made during an active complaint review may be treated as misconduct.",
      "Attempts to pressure staff for refunds or services outside policy are not accepted.",
      "Breach of conduct standards may result in care termination and potential legal action.",
    ],
  },
  {
    id: "confidentiality",
    title: "Data Protection and Confidentiality",
    points: [
      "Complaints are managed in line with our Privacy Policy and UK GDPR.",
      "Complaint records are retained securely for a minimum of 8 years.",
      "Records are shared only with consent or where legally required.",
    ],
  },
  {
    id: "improvement",
    title: "Commitment to Improvement",
    points: [
      "Complaint trends are reviewed regularly to identify training and service improvements.",
      "Each complaint is treated as an opportunity to improve care quality and client experience.",
      "This policy is available in-clinic and on our website.",
    ],
  },
];

export default function ComplaintsPolicyPage() {
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
        name: "Complaints Policy",
        item: "https://www.jluxemedicalaesthetics.com/complaints-policy",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Complaints Policy | J Luxe Medical Aesthetics",
    description:
      "Complaints policy for J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London.",
    url: "https://www.jluxemedicalaesthetics.com/complaints-policy",
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
          alt="Complaints policy at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
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
            Complaints Policy
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base">
            Transparent, respectful, and clinically responsible complaint handling at our medical
            aesthetics clinic in Hackney London.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Effective Date</p>
              <p className="mt-1 text-sm font-semibold text-white">{effectiveDate}</p>
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
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Address</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                {clinicAddress}
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
            {complaintsSections.map((section) => (
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
          {complaintsSections.map((section, index) => (
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
              Complaint Support
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">
              Fair Process, Clear Communication
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              We review each concern objectively and professionally, aiming to resolve issues
              quickly while maintaining clinical governance and respectful communication.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                Confidential Handling
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <AlertTriangle className="h-3.5 w-3.5 text-[#D4AF37]" />
                Zero Tolerance Abuse Policy
              </span>
            </div>
          </article>

          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6 lg:col-span-5">
            <h3 className="text-2xl font-serif font-bold uppercase">Need to Raise a Concern?</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Send your complaint by email or contact us directly. Include dates, key details, and
              your preferred resolution where possible.
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-200">
              <p>
                <span className="font-semibold text-white">Email: </span>
                {clinicEmail}
              </p>
              <p>
                <span className="font-semibold text-white">Phone: </span>
                {clinicPhone}
              </p>
              <p>
                <span className="font-semibold text-white">Address: </span>
                {clinicAddress}
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
                href="/terms-of-use"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                View Terms of Use
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
