"use client";

import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const hiddenPrefixes = ["/forms/", "/guidelines/"];

export default function StickyBookingBar() {
  const pathname = usePathname();

  if (!pathname) return null;
  if (pathname === "/training") return null;
  if (hiddenPrefixes.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D4AF37]/25 bg-[#050505]/95 px-3 py-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2">
        <Link
          href="/pricing"
          data-cta-name="book_consultation"
          data-cta-location="sticky_mobile_bar"
          data-page-type="mobile_sticky"
          className="cta-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-black"
        >
          <CalendarDays className="h-4 w-4" />
          Book
        </Link>
        <a
          href="https://wa.me/447883050603"
          target="_blank"
          rel="noreferrer"
          data-cta-name="whatsapp"
          data-cta-location="sticky_mobile_bar"
          data-page-type="mobile_sticky"
          className="cta-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/35 bg-black/45 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
        >
          <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
          WhatsApp
        </a>
        <a
          href="tel:+447883050603"
          data-cta-name="call_now"
          data-cta-location="sticky_mobile_bar"
          data-page-type="mobile_sticky"
          className="cta-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
      </div>
    </div>
  );
}

