"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Laugh, X } from "lucide-react";
import { APRIL_FOOLS_STORAGE_KEY, isAprilFoolsWindow } from "@/src/lib/april-fools";

const CODE_COLUMNS = [
  "01001010 01001100 01010101 01011000 01000101",
  "01100010 01101111 01101111 01101011 00100000",
  "01000001 01010000 01010010 01001001 01001100",
  "01100011 01101100 01101001 01101110 01101001",
  "01010111 01001000 01000001 01010100 01010011",
  "01101000 01100001 01100011 01101011 01101110",
  "01001100 01001111 01001100 00100000 01001111",
  "01110011 01101001 01110100 01100101 00100000",
  "01000011 01001111 01000100 01000101 00100000",
  "01100110 01100001 01101011 01100101 00100000",
  "01001100 01000001 01010101 01000111 01001000",
  "01110010 01100101 01100100 00100000 01110010",
];

export default function AprilFoolsPopup() {
  const [phase, setPhase] = useState<"hidden" | "rain" | "popup">("hidden");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isAprilFoolsWindow(new Date())) {
      return;
    }

    const hasSeen = window.localStorage.getItem(APRIL_FOOLS_STORAGE_KEY);
    if (hasSeen) {
      return;
    }

    const introTimer = window.setTimeout(() => {
      setPhase("rain");
      window.localStorage.setItem(APRIL_FOOLS_STORAGE_KEY, "1");
    }, 450);

    const popupTimer = window.setTimeout(() => {
      setPhase("popup");
    }, 4550);

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(popupTimer);
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[85] overflow-hidden bg-black">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          phase === "rain" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(220,38,38,0.16),_transparent_34%)]" />
        <div className="flex h-full w-full justify-between px-2 sm:px-4">
          {CODE_COLUMNS.map((column, index) => (
            <div
              key={`${column}-${index}`}
              className="april-code-column flex-1"
              style={
                {
                  "--delay": `${index * 0.16}s`,
                  "--duration": `${2.5 + (index % 4) * 0.35}s`,
                } as CSSProperties
              }
            >
              <span>{column}</span>
              <span>{column}</span>
              <span>{column}</span>
              <span>{column}</span>
              <span>{column}</span>
              <span>{column}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/78 px-4 backdrop-blur-sm transition-opacity duration-700 ${
          phase === "popup" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-[#D4AF37]/35 bg-gradient-to-b from-[#17120a] via-[#090909] to-[#050505] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.6)] md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#D4AF37]/10 blur-3xl" />
          <button
            type="button"
            onClick={() => setPhase("hidden")}
            aria-label="Close April Fools popup"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
            <Laugh className="h-4 w-4" />
            April Fools
          </div>

          <div className="mt-5 text-5xl">🤣</div>
          <h2 className="mt-4 text-3xl font-serif font-bold uppercase leading-tight text-white md:text-4xl">
            You made it through the code rain.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-200">
            For a second it looked like the site had been hijacked by glowing clinic code. It has not.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            The real site is still here, bookings still work, and you can head back in normally now.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPhase("hidden")}
              className="cta-button inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
            >
              Continue To Site
            </button>
            <Link
              href="/treatment"
              className="cta-button inline-flex items-center justify-center rounded-full border border-white/25 bg-black/35 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              View Treatments
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .april-code-column {
          position: relative;
          overflow: hidden;
          color: #4ade80;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          line-height: 1.6;
          opacity: 0.9;
        }

        .april-code-column span {
          display: block;
          white-space: pre-wrap;
          word-break: break-word;
          animation: aprilRain var(--duration) linear infinite,
            aprilCodeShift var(--duration) ease-in forwards;
          animation-delay: var(--delay), var(--delay);
          text-shadow: 0 0 12px rgba(34, 197, 94, 0.45);
        }

        @keyframes aprilRain {
          0% {
            transform: translateY(-120%);
          }
          100% {
            transform: translateY(120vh);
          }
        }

        @keyframes aprilCodeShift {
          0%,
          55% {
            color: #4ade80;
            text-shadow: 0 0 12px rgba(34, 197, 94, 0.45);
          }
          100% {
            color: #ef4444;
            text-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
