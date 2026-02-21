"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Gift, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const faqItems = [
  {
    q: "Can each client have a unique referral link?",
    a: "Yes. Enter your own referral code and we generate a unique link using your code in the URL.",
  },
  {
    q: "Will the referral be captured automatically?",
    a: "Yes. The ref parameter is carried into the contact form and can be prefilled for tracking.",
  },
  {
    q: "Can I share via WhatsApp and email?",
    a: "Yes. Use the share buttons to open WhatsApp or email with your referral link included.",
  },
];

const rewardCards = [
  { title: "Friend Reward", value: "GBP 20 off treatment over GBP 80" },
  { title: "Your Reward", value: "GBP 20 off your next treatment over GBP 80" },
  { title: "Referral Method", value: "Special link with your code" },
];

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

export default function ReferAFriendPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://jluxemedicalaesthetics.com");
  const searchParams = useSearchParams();

  const inboundCode = useMemo(
    () => normalizeReferralCode(searchParams.get("ref") ?? ""),
    [searchParams],
  );
  const referralCode = useMemo(() => normalizeReferralCode(inputCode), [inputCode]);

  const contactHref = inboundCode
    ? `/contact-us?ref=${encodeURIComponent(inboundCode)}`
    : "/contact-us";
  const bookingHref = inboundCode
    ? `/booking?ref=${encodeURIComponent(inboundCode)}`
    : "/booking";

  const referralLink = referralCode
    ? `${origin}/contact-us?ref=${encodeURIComponent(referralCode)}`
    : `${origin}/contact-us?ref=YOUR-CODE`;

  const whatsappHref = referralCode
    ? `https://wa.me/?text=${encodeURIComponent(`Use my J Luxe referral link: ${referralLink}`)}`
    : "#";
  const emailHref = referralCode
    ? `mailto:?subject=${encodeURIComponent("J Luxe referral link")}&body=${encodeURIComponent(
        `Use my J Luxe referral link: ${referralLink}`,
      )}`
    : "#";

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const copyLink = async () => {
    if (!referralCode) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div className="absolute inset-0 z-0" initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}>
          <Image
            src="/images/glowCta.png"
            alt="Refer a friend at J Luxe Medical Aesthetics in Hackney London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/74 to-black/64" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(212,175,55,0.23),transparent_48%)]" />
        </motion.div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-8 md:pb-16 md:pt-20">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="text-center lg:col-span-8 lg:text-left">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
                J Luxe Loyalty Programme
              </p>
              <h1 className="text-4xl font-serif font-bold uppercase leading-[0.95] md:text-6xl">
                Refer A Friend,
                <br />
                Share The Luxury.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-base lg:mx-0">
                Yes, each client can have a special referral link. Generate it below and share it
                with friends.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href={contactHref}
                  className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-500"
                >
                  Start A Referral
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={bookingHref}
                  className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Book Appointment
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <article className="rounded-[24px] border border-[#D4AF37]/30 bg-black/50 p-5 backdrop-blur-sm">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                  <Gift className="h-3.5 w-3.5" />
                  Referral Snapshot
                </p>
                <div className="mt-4 space-y-3">
                  {rewardCards.map((card) => (
                    <div key={card.title} className="rounded-xl border border-white/15 bg-black/45 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">{card.title}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{card.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          {inboundCode && (
            <div className="mb-6 rounded-xl border border-[#D4AF37]/45 bg-[#17130a]/75 px-4 py-3 text-sm text-[#f5e4af]">
              Referral detected: <span className="font-semibold text-white">{inboundCode}</span>
            </div>
          )}

          <article className="rounded-[26px] border border-[#D4AF37]/22 bg-gradient-to-b from-[#141007]/85 via-[#0b0b0b]/90 to-black/95 p-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
              <UsersRound className="h-3.5 w-3.5" />
              Special Referral Link Tool
            </p>
            <h2 className="mt-4 text-3xl font-serif font-bold uppercase leading-tight">
              Generate Your <span className="text-[#D4AF37]">Personal Referral Link</span>
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300">
              Enter your code, copy the link, then share it. Friends using your link carry your
              referral code automatically.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <label htmlFor="code" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                  Your Referral Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={inputCode}
                  onChange={(event) => setInputCode(event.target.value)}
                  placeholder="Example: JLUXE-JANE"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Normalized code: <span className="font-semibold text-gray-200">{referralCode || "YOUR-CODE"}</span>
                </p>
              </div>
              <div className="lg:col-span-4 lg:self-end">
                <button
                  type="button"
                  onClick={copyLink}
                  disabled={!referralCode}
                  className="cta-button inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {copied ? "Copied" : "Copy Link"}
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Referral Link</p>
              <p className="mt-1 break-all text-sm text-gray-100">{referralLink}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={`cta-button inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] ${
                  referralCode
                    ? "border-white/30 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    : "pointer-events-none border-white/20 text-gray-500"
                }`}
              >
                Share On WhatsApp
              </a>
              <a
                href={emailHref}
                className={`cta-button inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] ${
                  referralCode
                    ? "border-white/30 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    : "pointer-events-none border-white/20 text-gray-500"
                }`}
              >
                Share By Email
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-neutral-800 bg-[#060606] px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 lg:grid-cols-12">
          <article className="rounded-[26px] border border-white/15 bg-black/35 p-6 lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Referral FAQs
            </p>
            <h2 className="mt-4 text-3xl font-serif font-bold uppercase">
              Everything You Need <span className="text-[#D4AF37]">To Know</span>
            </h2>

            <div className="mt-6 space-y-2">
              {faqItems.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <button
                    key={faq.q}
                    type="button"
                    onClick={() => setActiveFaq(index)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                      isOpen
                        ? "border-[#D4AF37]/55 bg-[#17130a]/60"
                        : "border-white/12 bg-black/35 hover:border-[#D4AF37]/35"
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">{faq.q}</p>
                    {isOpen && <p className="mt-2 text-sm leading-relaxed text-gray-300">{faq.a}</p>}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a] via-[#0a0a0a] to-[#070707] p-6 lg:col-span-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Program Conditions
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-200">
              <li className="inline-flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                Referral discounts are non-transferable and cannot be exchanged for cash.
              </li>
              <li className="inline-flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                Discount is applied at checkout after a qualifying referral appointment.
              </li>
              <li className="inline-flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                A qualifying appointment must be completed before rewards are activated.
              </li>
            </ul>
            <div className="mt-5 space-y-3">
              <Link
                href={contactHref}
                className="cta-button inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-500"
              >
                Refer A Friend Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/treatment"
                className="cta-button inline-flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Browse Treatments
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
