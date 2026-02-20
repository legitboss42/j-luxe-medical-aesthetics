import { ArrowRight, CalendarClock, MapPin, Phone, ShieldCheck, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const businessName = "J Luxe Medical Aesthetics";
const effectiveDate = "25 June 2025";
const clinicAddress = "81 Amhurst Road, Hackney, London E8 2AH";
const bookingEmail = "bookings@jluxemedicalaesthetics.co.uk";
const supportEmail = "jluxemedicalaesthetics@gmail.com";
const clinicPhoneDisplay = "07883050603";
const clinicPhoneLink = "+447883050603";

const policySections = [
  {
    id: "booking-terms",
    title: "Booking Terms",
    points: [
      "All appointments require a non-refundable 50% deposit at booking.",
      "The remaining balance is due on the day of treatment unless agreed otherwise.",
      "Bookings can be made via website, WhatsApp, or direct clinic contact.",
      "Appointments are confirmed only after deposit payment is received and processed.",
      "Booking confirmation is issued by email or SMS.",
    ],
  },
  {
    id: "cancellation-reschedule",
    title: "Cancellation and Rescheduling",
    points: [
      "Please request changes at least 24 hours before your appointment.",
      "Cancellations or reschedules with less than 24 hours notice result in forfeiture of the 50% deposit.",
      "No-shows are treated as cancellations and deposits are not refunded or transferred.",
      "Late-notice reschedules may be treated as cancellations if an immediate alternative slot is not secured.",
      "For prepaid or discounted packages, missed appointments may result in loss of that session.",
    ],
  },
  {
    id: "late-arrivals",
    title: "Late Arrivals",
    points: [
      "Clients arriving more than 15 minutes late may be refused treatment and the appointment may be treated as a cancellation.",
      "If you expect to be late, contact the clinic immediately so we can advise next steps.",
      "Where treatment proceeds after delay, session length may be reduced to protect later bookings.",
    ],
  },
  {
    id: "refunds",
    title: "Refund Policy",
    points: [
      "Deposits and treatment bookings are non-refundable unless the clinic is unable to provide the service.",
      "Treatments are elective and outcomes vary; refunds are not issued where treatment was delivered correctly and consented.",
      "Refunds are not provided for change of mind or personal scheduling conflicts after booking confirmation.",
    ],
  },
  {
    id: "medical-emergency",
    title: "Medical Cancellations and Emergencies",
    points: [
      "If you are unwell or medically unsuitable before your appointment, contact us as early as possible.",
      "A medical note may be required to approve rescheduling without penalty.",
      "Emergency requests are reviewed case by case at management discretion.",
    ],
  },
  {
    id: "communications",
    title: "Communications and Reminders",
    points: [
      "Automated SMS or email reminders are typically sent around 48 hours before appointment time.",
      "Clients remain responsible for attending appointments regardless of reminder receipt.",
      "Please keep contact details up to date so reminders and updates can be delivered reliably.",
    ],
  },
  {
    id: "payment-terms",
    title: "Payment Terms",
    points: [
      "Accepted methods include debit and credit cards, bank transfer, and selected payment platforms.",
      "Payment plans may be available through third-party providers such as Klarna, subject to eligibility.",
      "Prepaid packages must usually be used within 12 months unless otherwise stated in writing.",
    ],
  },
  {
    id: "client-agreement",
    title: "Your Agreement",
    points: [
      "By booking with J Luxe Medical Aesthetics, you confirm that you have read and accepted this policy.",
      "You are responsible for attending on time and providing accurate contact and medical details.",
      "Failure to follow policy terms may result in deposit loss and future booking restrictions.",
    ],
  },
];

export default function BookingCancellationPolicyPage() {
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
        name: "Booking and Cancellation Policy",
        item: "https://jluxemedicalaesthetics.com/booking-cancellation-policy",
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Booking and Cancellation Policy | J Luxe Medical Aesthetics",
    description:
      "Booking and cancellation policy for J Luxe Medical Aesthetics, a medical aesthetics clinic in Hackney London.",
    url: "https://jluxemedicalaesthetics.com/booking-cancellation-policy",
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
          alt="Booking and cancellation policy at J Luxe Medical Aesthetics medical aesthetics clinic in Hackney London"
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
            Booking and Cancellation Policy
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base">
            Your time is valued, and so is ours. This policy explains deposits, scheduling changes,
            late arrivals, payment, and booking responsibilities at our medical aesthetics clinic
            in Hackney London.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Effective Date</p>
              <p className="mt-1 text-sm font-semibold text-white">{effectiveDate}</p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Booking Email</p>
              <a
                href={`mailto:${bookingEmail}`}
                className="mt-1 block text-sm font-semibold text-white hover:text-[#D4AF37]"
              >
                {bookingEmail}
              </a>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Phone</p>
              <a
                href={`tel:${clinicPhoneLink}`}
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#D4AF37]"
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                {clinicPhoneDisplay}
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
            {policySections.map((section) => (
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
          {policySections.map((section, index) => (
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
              Booking Standards
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-4xl">
              Fair Scheduling for Every Client
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
              This policy protects treatment quality, schedule integrity, and fairness for all
              clients. It also helps our team maintain timely, consultation-led care.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                50% Deposit Required
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <CalendarClock className="h-3.5 w-3.5 text-[#D4AF37]" />
                24h Notice for Changes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
                <Wallet className="h-3.5 w-3.5 text-[#D4AF37]" />
                No-Show Deposit Forfeit
              </span>
            </div>
          </article>

          <article className="rounded-[24px] border border-white/15 bg-black/45 p-6 lg:col-span-5">
            <h3 className="text-2xl font-serif font-bold uppercase">Need Help With a Booking?</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Contact our team before your appointment if your circumstances change. Early
              communication gives the best chance of flexibility.
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-200">
              <p>
                <span className="font-semibold text-white">Booking Email: </span>
                {bookingEmail}
              </p>
              <p>
                <span className="font-semibold text-white">General Support: </span>
                {supportEmail}
              </p>
              <p>
                <span className="font-semibold text-white">Phone: </span>
                {clinicPhoneDisplay}
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
                View Terms
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
