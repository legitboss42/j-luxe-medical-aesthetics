"use client";

export default function SiteComingSoonOverlay() {
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
      </div>
    </div>
  );
}
