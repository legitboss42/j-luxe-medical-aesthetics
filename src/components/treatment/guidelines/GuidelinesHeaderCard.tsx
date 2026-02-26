import Image from "next/image";

type GuidelinesHeaderCardProps = {
  title: string;
  summary?: string;
  scope?: string;
};

export default function GuidelinesHeaderCard({
  title,
  summary,
  scope,
}: GuidelinesHeaderCardProps) {
  return (
    <section className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#120e06]/85 via-black/60 to-black/35 p-5 md:p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-white/20 bg-black shadow-[0_0_0_1px_rgba(212,175,55,0.2)] md:h-24 md:w-24">
          <Image
            src="/images/logo.png"
            alt="J Luxe Medical Aesthetics logo"
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div>
          <p className="text-2xl font-semibold text-white md:text-3xl">J Luxe Medical Aesthetics</p>
          <p className="mt-1 text-base text-gray-300">London, GB</p>
        </div>
      </div>

      <hr className="my-5 border-white/15" />

      {scope ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E7C97C]">
          {scope}
        </p>
      ) : null}

      <h2 className={`${scope ? "mt-3" : ""} text-3xl font-serif font-bold text-white md:text-4xl`}>
        {title}
      </h2>

      {summary ? (
        <p className="mt-5 max-w-5xl text-base leading-relaxed text-gray-200 md:text-lg">{summary}</p>
      ) : null}
    </section>
  );
}
