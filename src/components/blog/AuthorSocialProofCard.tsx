import { Award, MapPin, MessageSquareQuote, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

type AuthorSocialProofCardProps = {
  author: string;
  category: string;
};

const googleRating = 5.0;
const reviewCount = 80;

export default function AuthorSocialProofCard({
  author,
  category,
}: AuthorSocialProofCardProps) {
  return (
    <section className="mx-auto max-w-4xl overflow-hidden rounded-[24px] border border-white/12 bg-gradient-to-b from-[#131313] via-[#0c0c0c] to-[#090909] p-5 md:p-7">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <article className="rounded-2xl border border-white/12 bg-black/35 p-4 lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
            <Award className="h-3.5 w-3.5" />
            Article Author
          </p>
          <h2 className="mt-3 text-2xl font-serif font-bold leading-tight text-white md:text-3xl">
            Written by {author}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
            This {category.toLowerCase()} article was produced using consultation-led clinical
            standards at J Luxe Medical Aesthetics, with a focus on safe, realistic, and
            natural-looking outcomes.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5 text-[11px] font-semibold uppercase tracking-[0.12em]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-gray-200">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              Consultation-Led
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-gray-200">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
              Hackney, London
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#17120a]/75 via-[#0d0d0d] to-[#080808] p-4 lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            Social Proof
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/12 bg-black/35 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">Google Rating</p>
              <div className="mt-1 inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-current text-[#D4AF37]" />
                <span className="text-sm font-bold text-white">{googleRating.toFixed(1)}</span>
              </div>
            </div>
            <div className="rounded-xl border border-white/12 bg-black/35 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">Reviews</p>
              <p className="mt-1 text-sm font-bold text-white">{reviewCount}+</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            “Clinical expertise, warm guidance, and confidence-first treatment planning” is what
            clients consistently highlight.
          </p>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Contact Team
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black hover:bg-yellow-500"
            >
              Book Consultation
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

