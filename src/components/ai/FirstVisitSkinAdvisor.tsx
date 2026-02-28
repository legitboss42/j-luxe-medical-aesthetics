"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Sparkles, X } from "lucide-react";

type AdvisorFormState = {
  primaryConcern: string;
  goal: string;
  timeline: string;
  skinSensitivity: string;
  injectablePreference: string;
  downtimeTolerance: string;
  notes: string;
};

type AdvisorRecommendation = {
  treatmentId: string;
  treatmentName: string;
  treatmentPath: string;
  reason: string;
  confidence: "high" | "medium" | "low";
  alternatives: Array<{
    id: string;
    name: string;
    path: string;
  }>;
  careNote: string;
  disclaimer: string;
};

type AdvisorApiResponse = {
  ok: boolean;
  error?: string;
  recommendation?: AdvisorRecommendation;
};

const STORAGE_KEY = "jluxe_skin_advisor_seen_v1";

const INITIAL_FORM: AdvisorFormState = {
  primaryConcern: "",
  goal: "",
  timeline: "",
  skinSensitivity: "",
  injectablePreference: "",
  downtimeTolerance: "",
  notes: "",
};

const concernOptions = [
  "Fine lines and wrinkles",
  "Acne marks or uneven skin texture",
  "Pigmentation or uneven skin tone",
  "Dry or dehydrated skin",
  "Volume loss or facial hollowing",
  "Stubborn fat or body contour concerns",
  "Unwanted hair",
  "Low energy or wellness support",
  "Smile brightness / teeth discolouration",
];

const goalOptions = [
  "Natural-looking refresh",
  "Faster visible change for an upcoming event",
  "Long-term skin quality improvement",
  "Body contour or shape refinement",
  "General maintenance and prevention",
];

const timelineOptions = [
  "As soon as possible (within 2 weeks)",
  "Within 1 to 2 months",
  "I am planning ahead over 3+ months",
];

const sensitivityOptions = [
  "Sensitive or reactive",
  "Normal",
  "Oily / acne-prone",
  "Dry",
  "Combination",
];

const injectablePreferenceOptions = [
  "Open to injectables if recommended",
  "Maybe, depending on advice",
  "Prefer non-injectable options only",
];

const downtimeOptions = [
  "No downtime preferred",
  "Mild downtime is fine (1-3 days)",
  "I can manage moderate downtime",
];

function confidenceBadge(confidence: AdvisorRecommendation["confidence"]): string {
  if (confidence === "high") {
    return "High confidence";
  }
  if (confidence === "medium") {
    return "Medium confidence";
  }
  return "Early-match suggestion";
}

export default function FirstVisitSkinAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<AdvisorFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState<AdvisorRecommendation | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasSeen = window.localStorage.getItem(STORAGE_KEY);
    if (hasSeen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      window.localStorage.setItem(STORAGE_KEY, "1");
    }, 1100);

    return () => window.clearTimeout(timer);
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(
      formState.primaryConcern &&
      formState.goal &&
      formState.timeline &&
      formState.skinSensitivity &&
      formState.injectablePreference &&
      formState.downtimeTolerance,
    );
  }, [formState]);

  function closeModal() {
    setIsOpen(false);
  }

  function updateField<K extends keyof AdvisorFormState>(key: K, value: AdvisorFormState[K]) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || submitting) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/ai/skin-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = (await response.json()) as AdvisorApiResponse;
      if (!response.ok || !result.ok || !result.recommendation) {
        setError(result.error ?? "We could not generate a recommendation right now. Please try again.");
        return;
      }

      setRecommendation(result.recommendation);
    } catch {
      setError("We could not generate a recommendation right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/78 px-4 py-8">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-[#D4AF37]/30 bg-gradient-to-b from-[#17120a] via-[#0b0b0b] to-[#070707] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.65)] md:p-7">
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close skin advisor popup"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
        >
          <X className="h-4 w-4" />
        </button>

        {!recommendation ? (
          <>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Skin Match Assistant
            </p>
            <h2 className="mt-4 text-3xl font-serif font-bold leading-[1.02]">
              Let us recommend your best treatment match
            </h2>
            <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-gray-300">
              Answer a few quick questions about your skin challenge and goals. We will suggest a
              treatment from currently available options on the website.
            </p>

            <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
              <label className="text-sm">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  1. Main concern
                </span>
                <select
                  value={formState.primaryConcern}
                  onChange={(event) => updateField("primaryConcern", event.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37]"
                  required
                >
                  <option value="">Select one</option>
                  {concernOptions.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                    2. Goal
                  </span>
                  <select
                    value={formState.goal}
                    onChange={(event) => updateField("goal", event.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37]"
                    required
                  >
                    <option value="">Select one</option>
                    {goalOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                    3. Timeline
                  </span>
                  <select
                    value={formState.timeline}
                    onChange={(event) => updateField("timeline", event.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37]"
                    required
                  >
                    <option value="">Select one</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                    4. Skin sensitivity
                  </span>
                  <select
                    value={formState.skinSensitivity}
                    onChange={(event) => updateField("skinSensitivity", event.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37]"
                    required
                  >
                    <option value="">Select one</option>
                    {sensitivityOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                    5. Downtime tolerance
                  </span>
                  <select
                    value={formState.downtimeTolerance}
                    onChange={(event) => updateField("downtimeTolerance", event.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37]"
                    required
                  >
                    <option value="">Select one</option>
                    {downtimeOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="text-sm">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  6. Injectable preference
                </span>
                <select
                  value={formState.injectablePreference}
                  onChange={(event) => updateField("injectablePreference", event.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37]"
                  required
                >
                  <option value="">Select one</option>
                  {injectablePreferenceOptions.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  Additional notes (optional)
                </span>
                <textarea
                  value={formState.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Anything else you want us to consider..."
                  className="w-full rounded-xl border border-white/20 bg-black/50 px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </label>

              {error ? (
                <p className="rounded-xl border border-red-400/40 bg-red-900/25 px-3 py-2 text-sm text-red-200">
                  {error}
                </p>
              ) : null}

              <div className="mt-1 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="inline-flex min-w-44 items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Matching..." : "Get Recommendation"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended Match
            </p>
            <h2 className="mt-4 text-3xl font-serif font-bold leading-[1.02]">
              {recommendation.treatmentName}
            </h2>
            <p className="mt-2 inline-flex rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-gray-200">
              {confidenceBadge(recommendation.confidence)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-200">{recommendation.reason}</p>
            <p className="mt-3 rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-sm text-gray-300">
              {recommendation.careNote}
            </p>

            {recommendation.alternatives.length > 0 ? (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#D4AF37]">
                  Alternative options
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recommendation.alternatives.map((item) => (
                    <Link
                      key={item.id}
                      href={item.path}
                      className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="mt-5 text-xs leading-relaxed text-gray-400">{recommendation.disclaimer}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={recommendation.treatmentPath}
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-yellow-500"
              >
                View Treatment
              </Link>
              <Link
                href="/pricing"
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Book Consultation
              </Link>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-300 transition-colors hover:border-white/40 hover:text-white"
              >
                Continue Browsing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

