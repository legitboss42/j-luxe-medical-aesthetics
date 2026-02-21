"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileTreatmentOpen, setIsMobileTreatmentOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about-us", label: "ABOUT US" },
    { href: "/treatment", label: "TREATMENT", hasChevron: true },
    { href: "/blog", label: "BLOG" },
    { href: "/pricing", label: "PRICING" },
    { href: "/training", label: "TRAINING" },
    { href: "/refer-a-friend", label: "REFER A FRIEND" },
    { href: "/contact-us", label: "CONTACT US" },
  ];

  const treatmentDropdownLinks = [
    { href: "/treatment", label: "All Treatments" },
    { href: "/facials", label: "Facials" },
    { href: "/body-sculpting-2", label: "Body Sculpting" },
    { href: "/fillers", label: "Dermal Fillers" },
    { href: "/anti-wrinkle-injection", label: "Anti-Wrinkle" },
    { href: "/skin-boosters-mesotherapy", label: "Skin Boosters" },
    { href: "/prp-treatment", label: "PRP Treatment" },
    { href: "/body-sculpting-2#fat-dissolving", label: "Fat Dissolving" },
    { href: "/teeth-whitening", label: "Teeth Whitening" },
    { href: "/exosomes", label: "Exosomes" },
    { href: "/chemical-peels", label: "Chemical Peels" },
    { href: "/iv-vitamin-drip", label: "IV Vitamin Drip" },
    { href: "/waxing", label: "Waxing" },
  ];

  const socialLinks = {
    instagram: "https://www.instagram.com/jluxemedicalaesthetics/",
    tiktok: "https://www.tiktok.com/@jluxemedicalaesthetics",
    facebook: "https://www.facebook.com/p/J-Luxe-Medical-Aesthetics-61562872448958/",
    whatsapp: "https://wa.me/447883050603",
  };

  const desktopLeftLinks = navLinks.slice(0, Math.ceil(navLinks.length / 2));
  const desktopRightLinks = navLinks.slice(Math.ceil(navLinks.length / 2));

  const treatmentPaths = [
    "/treatment",
    "/facials",
    "/body-sculpting-2",
    "/fillers",
    "/anti-wrinkle-injection",
    "/skin-boosters-mesotherapy",
    "/prp-treatment",
    "/teeth-whitening",
    "/exosomes",
    "/chemical-peels",
    "/iv-vitamin-drip",
    "/waxing",
  ];

  const normalizeHref = (href: string) => href.split("#")[0];

  const isTreatmentActive = treatmentPaths.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isActiveLink = (href: string, hasChevron?: boolean) => {
    if (hasChevron && href === "/treatment") return isTreatmentActive;

    const cleanHref = normalizeHref(href);
    if (cleanHref === "/") return pathname === "/";
    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-black border-b border-neutral-900">
      {/* Mobile header */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="relative w-10 h-10 rounded-full border border-[#D4AF37] bg-black/80 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="J Luxe Medical Aesthetics logo in Hackney, London"
              fill
              className="object-contain p-1"
              sizes="40px"
            />
          </div>
          <span className="text-white font-serif font-bold text-lg tracking-widest">
            J LUXE
          </span>
        </Link>

        <div className="flex items-center gap-3 z-50">
          <Link
            href="/pricing"
            className="cta-button bg-[#D4AF37] text-black text-xs font-extrabold py-2 px-4 rounded-full hover:bg-yellow-500 transition-colors"
          >
            BOOK NOW
          </Link>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              if (isOpen) {
                setIsMobileTreatmentOpen(false);
              }
            }}
            className="text-white hover:text-[#D4AF37] transition-colors p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 pt-4 pb-3 flex items-center justify-between border-b border-dashed border-neutral-700">
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#feda75] via-[#fa7e1e] to-[#d62976] text-white flex items-center justify-center hover:brightness-110 transition-all"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full bg-[#111] text-white border border-white/20 flex items-center justify-center hover:border-[#D4AF37] transition-colors"
            >
              <FaTiktok className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:brightness-110 transition-all"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:brightness-110 transition-all"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[#D4AF37] font-bold tracking-wide uppercase text-xl leading-none">
            CALL US <span className="text-white">+44 7883 050603</span>
          </p>

          <Link
            href="/pricing"
            className="cta-button bg-[#D4AF37] text-black font-extrabold uppercase tracking-wide py-3 px-8 rounded-full hover:bg-[#f0c24f] transition-colors"
          >
            Book a Treatment
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 xl:px-8 py-4">
          <div className="flex items-center text-white font-bold uppercase tracking-wide text-[13px] xl:text-[15px]">
            <div className="flex-1 flex items-center justify-end gap-5 xl:gap-7 pr-5 xl:pr-7">
              {desktopLeftLinks.map((link) => (
                link.hasChevron ? (
                  <div key={link.href} className="relative group/treatment">
                    <Link
                      href={link.href}
                      className={`whitespace-nowrap transition-colors inline-flex items-center gap-1 ${
                        isActiveLink(link.href, link.hasChevron)
                          ? "text-[#D4AF37]"
                          : "hover:text-[#D4AF37]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/treatment:rotate-180 group-focus-within/treatment:rotate-180" />
                    </Link>
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover/treatment:pointer-events-auto group-hover/treatment:visible group-hover/treatment:opacity-100 group-focus-within/treatment:pointer-events-auto group-focus-within/treatment:visible group-focus-within/treatment:opacity-100">
                      <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0b0b0b]/95 p-4 shadow-2xl backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-2">
                          {treatmentDropdownLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`rounded-lg border bg-black/35 px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors ${
                                isActiveLink(item.href)
                                  ? "border-[#D4AF37]/45 text-[#D4AF37]"
                                  : "border-white/10 text-gray-200 hover:border-[#D4AF37]/45 hover:text-[#D4AF37]"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap transition-colors inline-flex items-center gap-1 ${
                      isActiveLink(link.href, link.hasChevron)
                        ? "text-[#D4AF37]"
                        : "hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            <Link href="/" className="shrink-0 flex items-center justify-center">
              <div className="relative w-20 h-20 rounded-full border border-[#D4AF37] bg-black/80 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="J Luxe Medical Aesthetics logo in Hackney, London"
                  fill
                  className="object-contain p-1.5"
                  sizes="80px"
                />
              </div>
            </Link>

            <div className="flex-1 flex items-center justify-start gap-5 xl:gap-7 pl-5 xl:pl-7">
              {desktopRightLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors inline-flex items-center gap-1 ${
                    isActiveLink(link.href, link.hasChevron)
                      ? "text-[#D4AF37]"
                      : "hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                  {link.hasChevron && <ChevronDown className="w-4 h-4" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center pt-20 h-screen overflow-y-auto lg:hidden"
          >
            <ul className="text-center space-y-8 text-2xl font-serif py-10">
              {navLinks.map((link) =>
                link.hasChevron ? (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => setIsMobileTreatmentOpen(!isMobileTreatmentOpen)}
                      className={`transition-colors inline-flex items-center gap-1 ${
                        isActiveLink(link.href, link.hasChevron)
                          ? "text-[#D4AF37]"
                          : "hover:text-[#D4AF37]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isMobileTreatmentOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isMobileTreatmentOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 space-y-2 overflow-hidden"
                        >
                          {treatmentDropdownLinks.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsMobileTreatmentOpen(false);
                                }}
                                className={`block rounded-full border bg-black/45 px-4 py-2 text-sm font-sans font-semibold uppercase tracking-[0.12em] transition-colors ${
                                  isActiveLink(item.href)
                                    ? "border-[#D4AF37] text-[#D4AF37]"
                                    : "border-white/20 text-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileTreatmentOpen(false);
                      }}
                      className={`transition-colors inline-flex items-center gap-1 ${
                        isActiveLink(link.href, link.hasChevron)
                          ? "text-[#D4AF37]"
                          : "hover:text-[#D4AF37]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <Link
                  href="/pricing"
                  onClick={() => {
                    setIsOpen(false);
                    setIsMobileTreatmentOpen(false);
                  }}
                  className="cta-button inline-block mt-4 border border-[#D4AF37] text-[#D4AF37] py-3 px-8 rounded-full text-lg hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  Book Consultation
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
