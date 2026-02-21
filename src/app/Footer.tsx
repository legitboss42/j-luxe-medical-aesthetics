import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

const quickLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/training", label: "Training Academy" },
  { href: "/refer-a-friend", label: "Refer a Friend" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
];

const treatmentLinks = [
  { href: "/anti-wrinkle-injection", label: "Anti-Wrinkle Injections" },
  { href: "/fillers", label: "Dermal Fillers" },
  { href: "/body-sculpting-2", label: "Body Sculpting" },
  { href: "/facials", label: "Luxury Facials" },
  { href: "/treatment", label: "All Treatments" },
];

const socialLinks = {
  instagram: "https://www.instagram.com/jluxemedicalaesthetics/",
  tiktok: "https://www.tiktok.com/@jluxemedicalaesthetics",
  facebook: "https://www.facebook.com/p/J-Luxe-Medical-Aesthetics-61562872448958/",
  whatsapp: "https://wa.me/447883050603",
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-gradient-to-b from-[#090909] via-[#050505] to-black text-gray-300 font-sans">
      <div className="pointer-events-none absolute -top-20 left-[-4rem] h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-[-5rem] h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
        <div className="mb-12 rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-r from-[#17120a] via-[#0d0d0d] to-[#17120a] p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" />
                Consultation-Led Aesthetics
              </p>
              <h3 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                Start Your Personalized
                <span className="text-[#D4AF37]"> Glow Plan</span>
              </h3>
              <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-300 leading-relaxed">
                Speak with our team in Hackney and get a tailored treatment plan
                for your skin, facial contouring, or body goals.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-black hover:bg-[#f0c24f] transition-colors"
              >
                BOOK CONSULTATION
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+447883050603"
                className="cta-button inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                CALL NOW
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-1 text-[#D4AF37]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h4 className="text-white text-2xl font-serif font-bold">
              J LUXE MEDICAL AESTHETICS
            </h4>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Premium non-surgical treatments in London with a medical-first
              approach, natural results, and attentive aftercare.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#fa7e1e] to-[#d62976] text-white hover:brightness-110 transition-all"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                <FaTiktok className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877f2] text-white hover:brightness-110 transition-all"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white hover:brightness-110 transition-all"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D4AF37] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D4AF37] mb-4">
              Treatments
            </h4>
            <ul className="space-y-3 text-sm">
              {treatmentLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D4AF37] mb-4">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=J+Luxe+Medical+Aesthetics+Hackney+London"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Hackney, London
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <a href="tel:+447883050603" className="hover:text-[#D4AF37] transition-colors">
                  +44 7883 050603
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <a
                  href="mailto:admin@jluxemedicalaesthetics.com"
                  className="hover:text-[#D4AF37] transition-colors break-all"
                >
                  admin@jluxemedicalaesthetics.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} J Luxe Medical Aesthetics. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <a
              href="https://webgrowth.info"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#D4AF37] transition-colors"
            >
              Built by Web Growth
            </a>
            <Link href="/terms-of-use" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy-policy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="/booking-cancellation-policy"
              className="text-gray-400 hover:text-[#D4AF37] transition-colors"
            >
              Cancellation Policy
            </Link>
            <Link href="/complaints-policy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Complaints Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
