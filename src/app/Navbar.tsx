"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Music2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about-us", label: "ABOUT US" },
    { href: "/treatment", label: "TREATMENT", hasChevron: true },
    { href: "/blog", label: "BLOG" },
    { href: "/pricing", label: "PRICING" },
    { href: "/training", label: "TRAINING" },
    { href: "/shop", label: "SHOP" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/refer-a-friend", label: "REFER A FRIEND" },
    { href: "/contact-us", label: "CONTACT US" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-black border-b border-neutral-900">
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
            href="/booking"
            className="cta-button bg-[#D4AF37] text-black text-xs font-extrabold py-2 px-4 rounded-full hover:bg-yellow-500 transition-colors"
          >
            BOOK NOW
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
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
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:bg-[#f0c24f] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:bg-[#f0c24f] transition-colors"
            >
              <Music2 className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:bg-[#f0c24f] transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:bg-[#f0c24f] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[#D4AF37] font-bold tracking-wide uppercase text-xl leading-none">
            CALL US <span className="text-white">+44 7883 050603</span>
          </p>

          <Link
            href="/booking"
            className="cta-button bg-[#D4AF37] text-black font-extrabold uppercase tracking-wide py-3 px-8 rounded-full hover:bg-[#f0c24f] transition-colors"
          >
            Book a Treatment
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 xl:px-8 py-4">
          <div className="flex items-center justify-center gap-5 xl:gap-7 text-white font-bold uppercase tracking-wide text-[13px] xl:text-[15px]">
            <Link
              href="/"
              className="whitespace-nowrap text-[#D4AF37] hover:text-[#f0c24f] transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/about-us"
              className="whitespace-nowrap hover:text-[#D4AF37] transition-colors"
            >
              ABOUT US
            </Link>
            <Link
              href="/treatment"
              className="whitespace-nowrap hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1"
            >
              TREATMENT
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link href="/blog" className="whitespace-nowrap hover:text-[#D4AF37] transition-colors">
              BLOG
            </Link>
            <Link
              href="/pricing"
              className="whitespace-nowrap text-[#D4AF37] hover:text-[#f0c24f] transition-colors"
            >
              PRICING
            </Link>

            <Link href="/" className="mx-2 shrink-0 flex items-center justify-center">
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

            <Link
              href="/training"
              className="whitespace-nowrap hover:text-[#D4AF37] transition-colors"
            >
              TRAINING
            </Link>
            <Link href="/shop" className="whitespace-nowrap hover:text-[#D4AF37] transition-colors">
              SHOP
            </Link>
            <Link
              href="/gallery"
              className="whitespace-nowrap hover:text-[#D4AF37] transition-colors"
            >
              GALLERY
            </Link>
            <Link
              href="/refer-a-friend"
              className="whitespace-nowrap hover:text-[#D4AF37] transition-colors"
            >
              REFER A FRIEND
            </Link>
            <Link
              href="/contact-us"
              className="whitespace-nowrap hover:text-[#D4AF37] transition-colors"
            >
              CONTACT US
            </Link>
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
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center pt-20 h-screen lg:hidden"
          >
            <ul className="text-center space-y-8 text-2xl font-serif">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.hasChevron && <ChevronDown className="w-4 h-4" />}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
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
