"use client";

import { useEffect, useState } from "react";

const COUNTDOWN_STORAGE_KEY = "jluxe_site_coming_soon_target_v1";
const EIGHT_DAYS_MS = 8 * 24 * 60 * 60 * 1000;

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdownParts(diffMs: number): CountdownState {
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function padTime(value: number) {
  return String(value).padStart(2, "0");
}

function resolveTargetTimestamp(now: number): number {
  const envTarget = process.env.NEXT_PUBLIC_SITE_COMING_SOON_TARGET;
  if (envTarget) {
    const parsed = Date.parse(envTarget);
    if (Number.isFinite(parsed) && parsed > now) {
      return parsed;
    }
  }

  const storedTarget = Number(window.localStorage.getItem(COUNTDOWN_STORAGE_KEY));
  const hasValidStoredTarget = Number.isFinite(storedTarget) && storedTarget > now;
  if (hasValidStoredTarget) {
    return storedTarget;
  }

  const generated = now + EIGHT_DAYS_MS;
  window.localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(generated));
  return generated;
}

export default function SiteComingSoonOverlay() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 8,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const now = Date.now();
    const targetTimestamp = resolveTargetTimestamp(now);

    const updateCountdown = () => {
      const diff = targetTimestamp - Date.now();
      setCountdown(getCountdownParts(diff));
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-[#050505]/90 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-[28px] border border-[#D4AF37]/35 bg-[#0b0b0b]/95 p-8 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.65)] md:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
          J Luxe Medical Aesthetics
        </p>
        <h1 className="mt-3 text-4xl font-serif font-bold uppercase leading-tight md:text-6xl">
          Coming Soon
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
          We are preparing something new. Our website is currently in coming-soon mode and will be
          available after launch.
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          <div className="rounded-2xl border border-white/15 bg-black/45 px-4 py-4">
            <p className="text-3xl font-serif font-bold text-[#D4AF37] md:text-4xl">
              {padTime(countdown.days)}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Days
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/45 px-4 py-4">
            <p className="text-3xl font-serif font-bold text-[#D4AF37] md:text-4xl">
              {padTime(countdown.hours)}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Hours
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/45 px-4 py-4">
            <p className="text-3xl font-serif font-bold text-[#D4AF37] md:text-4xl">
              {padTime(countdown.minutes)}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Minutes
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/45 px-4 py-4">
            <p className="text-3xl font-serif font-bold text-[#D4AF37] md:text-4xl">
              {padTime(countdown.seconds)}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
              Seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

