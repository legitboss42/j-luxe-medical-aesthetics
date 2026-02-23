"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Copy,
  Gift,
  Link2,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const primaryKeyword = "medical aesthetics clinic in Hackney London";

const heroStats = [
  { label: "Client Rating", value: "5.0 Google" },
  { label: "Program Type", value: "Trackable Referral Links" },
  { label: "Clinic Area", value: "Hackney, London" },
];

const rewardCards = [
  { title: "Friend Reward", value: "GBP 20 off treatment over GBP 80" },
  { title: "Your Reward", value: "GBP 20 off your next treatment over GBP 80" },
  { title: "Referral Method", value: "Personal name-based link" },
];

const howItWorks = [
  {
    step: "01",
    title: "Enter Your Name",
    text: "Type your full name and your unique referral link is created instantly.",
  },
  {
    step: "02",
    title: "Share Anywhere",
    text: "Send your link via WhatsApp, email, SMS, Telegram, or copy-and-paste on social.",
  },
  {
    step: "03",
    title: "Trackable Referral",
    text: "Every link contains a unique referral ID to help track referral visits and conversion intent.",
  },
];

const eligibleTreatments = [
  { label: "Facials", href: "/facials" },
  { label: "Dermal Fillers", href: "/fillers" },
  { label: "Anti-Wrinkle Injections", href: "/anti-wrinkle-injection" },
  { label: "Body Sculpting", href: "/body-sculpting-2" },
  { label: "Skin Boosters", href: "/skin-boosters-mesotherapy" },
  { label: "Chemical Peels", href: "/chemical-peels" },
];

const luxuryReasons = [
  {
    title: "Consultation-Led Care",
    text: "Every referral enters a medical-first consultation process focused on safe, tailored outcomes.",
  },
  {
    title: "Luxury Client Journey",
    text: "From first inquiry to aftercare, your referred friend receives premium support and clear guidance.",
  },
  {
    title: "Natural-Looking Outcomes",
    text: "Our Hackney team is known for refined results that elevate confidence without looking overdone.",
  },
];

const faqItems = [
  {
    q: "How is the referral link created?",
    a: "You enter your name and we automatically generate a stylish referral link with your name in it.",
  },
  {
    q: "Is the referral link trackable?",
    a: "Yes. Every generated link includes a unique referral ID so visits can be tracked.",
  },
  {
    q: "Where can I share it?",
    a: "Anywhere: WhatsApp, email, SMS, Telegram, social media, or simply copy and paste.",
  },
  {
    q: "When is the discount applied?",
    a: "Referral discounts are applied at checkout after a qualifying appointment is completed.",
  },
];

function slugifyName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
}

function hashName(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).slice(0, 6);
}

type NavigatorShare = Navigator & {
  share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
};

export default function ReferAFriendPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [referrerName, setReferrerName] = useState("");
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://jluxemedicalaesthetics.com");
  const [inboundRef, setInboundRef] = useState("");
  const inboundContactHref = inboundRef
    ? `/contact-us?ref=${encodeURIComponent(inboundRef)}`
    : "/contact-us";

  const nameSlug = useMemo(() => slugifyName(referrerName), [referrerName]);
  const referralId = useMemo(
    () => (nameSlug ? `${nameSlug}-jlx-${hashName(nameSlug)}` : ""),
    [nameSlug],
  );
  const referralLink = referralId
    ? `${origin}/contact-us?ref=${encodeURIComponent(referralId)}`
    : `${origin}/contact-us?ref=YOUR-NAME-JLX-123ABC`;

  const whatsappHref = referralId
    ? `https://wa.me/?text=${encodeURIComponent(
        `Use my J Luxe referral link: ${referralLink}`,
      )}`
    : "#";
  const emailHref = referralId
    ? `mailto:?subject=${encodeURIComponent("J Luxe referral link")}&body=${encodeURIComponent(
        `Use my J Luxe referral link: ${referralLink}`,
      )}`
    : "#";
  const telegramHref = referralId
    ? `https://t.me/share/url?url=${encodeURIComponent(
        referralLink,
      )}&text=${encodeURIComponent("Use my J Luxe referral link")}`
    : "#";
  const smsHref = referralId
    ? `sms:?&body=${encodeURIComponent(`Use my J Luxe referral link: ${referralLink}`)}`
    : "#";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
      const params = new URLSearchParams(window.location.search);
      setInboundRef(params.get("ref") ?? "");
    }
  }, []);

  const copyLink = async () => {
    if (!referralId) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const shareLink = async () => {
    if (!referralId) return;
    const shareNavigator = navigator as NavigatorShare;
    if (!shareNavigator.share) return;

    try {
      await shareNavigator.share({
        title: "J Luxe Referral Link",
        text: "Use my J Luxe referral link",
        url: referralLink,
      });
    } catch {
      // user canceled
    }
  };

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    }),
    [],
  );

  const webPageSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Refer a Friend | J Luxe Medical Aesthetics",
      description:
        "Generate a trackable referral link at a medical aesthetics clinic in Hackney London and unlock treatment discounts.",
      url: "https://jluxemedicalaesthetics.com/refer-a-friend",
      about: primaryKeyword,
    }),
    [],
  );

  const shareButtons = [
    { label: "WhatsApp", href: whatsappHref },
    { label: "Email", href: emailHref },
    { label: "SMS", href: smsHref },
    { label: "Telegram", href: telegramHref },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <section className="relative overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <Image
            src="/images/glowCta.png"
            alt="Refer a friend at a medical aesthetics clinic in Hackney London"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/74 to-black/64" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(212,175,55,0.25),transparent_48%)]" />
          <motion.div
            className="pointer-events-none absolute -top-1/3 -bottom-1/3 -left-1/3 w-1/3 rotate-[14deg] bg-gradient-to-r from-transparent via-[#f6e6b9]/25 to-transparent"
            animate={{ x: ["-180%", "430%"] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 pb-14 pt-16 md:px-8 md:pb-16 md:pt-20">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="text-center lg:col-span-8 lg:text-left">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
                J Luxe Loyalty Programme
              </p>
              <h1 className="text-4xl font-serif font-bold uppercase leading-[0.92] tracking-[0.012em] md:text-6xl">
                Refer A Friend,
                <br />
                Share The Luxury.
              </h1>
              <p className="mx-auto mt-6 max-w-[54ch] text-sm leading-relaxed text-gray-200 md:text-base lg:mx-0">
                Generate your personalised referral link in seconds and introduce your friends to a{" "}
                <span className="text-[#D4AF37]">{primaryKeyword}</span>.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                {heroStats.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-200"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {item.value}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  href="#referral-generator"
                  className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-500"
                >
                  Start Referral
                  <ArrowRight className="h-4 w-4" />
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

      <section id="referral-generator" className="relative scroll-mt-24 px-4 py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.1),transparent_45%)]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-[26px] border border-[#D4AF37]/22 bg-gradient-to-b from-[#141007]/85 via-[#0b0b0b]/90 to-black/95 p-6 lg:col-span-8">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
              <UsersRound className="h-3.5 w-3.5" />
              Auto Link Generator
            </p>
            <h2 className="mt-4 max-w-[16ch] text-3xl font-serif font-bold uppercase leading-[1.02]">
              Type Name,
              <span className="text-[#D4AF37]"> Link Creates Itself</span>
            </h2>
            <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-gray-300">
              Your name appears in the URL and every referral is trackable through a unique
              identifier.
            </p>

            <div className="mt-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
                <div className="md:col-span-8">
                  <label htmlFor="referrerName" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Your Full Name
                  </label>
                  <input
                    id="referrerName"
                    name="referrerName"
                    type="text"
                    value={referrerName}
                    onChange={(event) => setReferrerName(event.target.value)}
                    placeholder="Example: Jane Doe"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </div>
                <div className="md:col-span-4">
                  <button
                    type="button"
                    onClick={copyLink}
                    disabled={!referralId}
                    className="cta-button inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {copied ? "Copied" : "Copy Link"}
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Referral ID: <span className="font-semibold text-gray-200">{referralId || "jane-doe-jlx-123abc"}</span>
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-white/15 bg-black/45 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-gray-400">Your Referral Link</p>
              <p className="mt-1 break-all text-sm text-gray-100">{referralLink}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={shareLink}
                disabled={!referralId}
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-3.5 w-3.5" />
                Share Link
              </button>
              {shareButtons.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`cta-button inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] ${
                    referralId
                      ? "border-white/30 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      : "pointer-events-none border-white/20 text-gray-500"
                  }`}
                >
                  <Link2 className="h-3.5 w-3.5" />
                  {item.label}
                </a>
              ))}
            </div>
          </article>

          <aside className="space-y-3 lg:col-span-4">
            {howItWorks.map((item) => (
              <article
                key={item.step}
                className="rounded-xl border border-white/15 bg-gradient-to-b from-[#151515] via-[#0d0d0d] to-[#090909] p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                  Step {item.step}
                </p>
                <h3 className="mt-1 text-lg font-serif font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.text}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="border-y border-neutral-800 bg-[#060606] px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] md:text-sm">
              Eligible Services
            </p>
            <h2 className="mt-3 text-3xl font-serif font-bold uppercase md:text-5xl">
              Where Referral Discounts Apply
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-300">
              Referral discounts can be used on selected services at our{" "}
              <span className="text-[#D4AF37]">{primaryKeyword}</span>, including advanced
              injectables, facials, and skin rejuvenation.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {eligibleTreatments.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-xl border border-white/15 bg-gradient-to-r from-[#141414] via-[#0d0d0d] to-[#0a0a0a] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/45"
              >
                <span className="text-sm font-semibold text-gray-100 group-hover:text-[#D4AF37]">
                  {item.label}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#D4AF37]" />
              </Link>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {luxuryReasons.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#17120a]/70 via-[#0c0c0c] to-[#080808] p-5"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45 text-[#D4AF37]">
                  <Star className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-xl font-serif font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
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
                Referral links are monitored for fraud prevention and program integrity.
              </li>
            </ul>
            <div className="mt-5 space-y-3">
              <Link
                href={inboundContactHref}
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
