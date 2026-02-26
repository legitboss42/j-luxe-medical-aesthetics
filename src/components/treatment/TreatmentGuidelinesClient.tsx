"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GuidelinesWaxing from "@/src/components/treatment/guidelines/GuidelinesWaxing";
import type { TreatmentFormTemplate } from "@/src/lib/treatment-forms";

type TreatmentGuidelinesClientProps = {
  slug: string;
  treatmentName: string;
  treatmentPath: `/${string}`;
  imageSrc: `/${string}`;
  template: TreatmentFormTemplate;
};

type SubmitState = "idle" | "submitting" | "success" | "error";
type FieldPayload = string | string[];

type GuidelineFieldBlueprintItem = {
  name: string;
  label: string;
  section: string;
  order: number;
};

type GuidelineSubmitResponse = {
  ok: boolean;
  message?: string;
  error?: string;
  pdf?: {
    fileName: string;
    mimeType: string;
    base64: string;
  };
};

function toSubmissionData(formData: FormData): Record<string, FieldPayload> {
  const payload: Record<string, FieldPayload> = {};

  for (const [key, rawValue] of formData.entries()) {
    if (typeof rawValue !== "string") {
      continue;
    }

    const value = rawValue.trim();
    if (!value) {
      continue;
    }

    const existing = payload[key];
    if (!existing) {
      payload[key] = value;
      continue;
    }

    if (Array.isArray(existing)) {
      existing.push(value);
      payload[key] = existing;
      continue;
    }

    payload[key] = [existing, value];
  }

  return payload;
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function readableFieldName(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function looksLikeQuestion(text: string): boolean {
  return /^\d+\./.test(text) || text.endsWith("?") || text.includes("Please") || text.includes("please");
}

function findNearestQuestionText(section: HTMLElement, field: HTMLElement): string {
  const candidates = Array.from(section.querySelectorAll("label, legend, p"))
    .filter((element) => !element.querySelector("input, select, textarea"));

  const beforeField = candidates.filter((candidate) => {
    const relation = candidate.compareDocumentPosition(field);
    return (relation & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
  });

  for (let index = beforeField.length - 1; index >= 0; index -= 1) {
    const text = normalizeText(beforeField[index].textContent ?? "");
    if (text && looksLikeQuestion(text)) {
      return text;
    }
  }

  for (let index = beforeField.length - 1; index >= 0; index -= 1) {
    const text = normalizeText(beforeField[index].textContent ?? "");
    if (text) {
      return text;
    }
  }

  return "";
}

function getFieldQuestionLabel(field: HTMLElement, section: HTMLElement, name: string): string {
  const ariaLabel = normalizeText(field.getAttribute("aria-label") ?? "");
  if (ariaLabel) {
    return ariaLabel;
  }

  const id = field.getAttribute("id");
  if (id) {
    const explicitLabel = Array.from(section.querySelectorAll("label[for]"))
      .find((label) => label.getAttribute("for") === id);

    const labelText = normalizeText(explicitLabel?.textContent ?? "");
    if (labelText) {
      return labelText;
    }
  }

  const nearestQuestion = findNearestQuestionText(section, field);
  if (nearestQuestion) {
    return nearestQuestion;
  }

  return readableFieldName(name);
}

function getSectionTitle(section: HTMLElement): string {
  const headingCandidate = Array.from(section.querySelectorAll("h2, h3, p"))
    .map((element) => normalizeText(element.textContent ?? ""))
    .find((text) => text.length > 0);

  return headingCandidate ?? "Guideline Details";
}

function extractGuidelineFieldBlueprint(form: HTMLFormElement): GuidelineFieldBlueprintItem[] {
  const blueprint: GuidelineFieldBlueprintItem[] = [];
  const seen = new Set<string>();
  let order = 0;

  const sections = Array.from(form.querySelectorAll("section"));
  for (const section of sections) {
    const sectionTitle = getSectionTitle(section);
    const fields = Array.from(section.querySelectorAll("input[name], select[name], textarea[name]")) as HTMLElement[];

    for (const field of fields) {
      const name = field.getAttribute("name")?.trim() ?? "";
      if (!name || seen.has(name)) {
        continue;
      }

      seen.add(name);
      blueprint.push({
        name,
        label: getFieldQuestionLabel(field, section, name),
        section: sectionTitle,
        order,
      });
      order += 1;
    }
  }

  const remainingFields = Array.from(form.querySelectorAll("input[name], select[name], textarea[name]")) as HTMLElement[];
  for (const field of remainingFields) {
    const name = field.getAttribute("name")?.trim() ?? "";
    if (!name || seen.has(name)) {
      continue;
    }

    seen.add(name);
    blueprint.push({
      name,
      label: readableFieldName(name),
      section: "Additional Submitted Details",
      order,
    });
    order += 1;
  }

  return blueprint;
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = window.atob(base64);
  const byteNumbers = new Array<number>(byteCharacters.length);

  for (let index = 0; index < byteCharacters.length; index += 1) {
    byteNumbers[index] = byteCharacters.charCodeAt(index);
  }

  return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
}

export default function TreatmentGuidelinesClient({
  slug,
  treatmentName,
  treatmentPath,
  imageSrc,
  template,
}: TreatmentGuidelinesClientProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const titleByTemplate: Record<TreatmentFormTemplate, string> = {
    antiWrinkle: "Anti-Wrinkle Pre & Post-Treatment Guidelines",
    bodySculpting: "Body Sculpting Pre & Post-Treatment Guidelines",
    chemicalPeels: "Chemical Peels Pre & Post-Treatment Guidelines",
    dermalFillers: "Dermal Fillers Pre & Post-Treatment Guidelines",
    exosomes: "Exosome Therapy Pre & Post-Treatment Guidelines",
    facials: "Facial Pre & Post-Treatment Guidelines",
    ivDrip: "IV Drip Pre & Post-Treatment Guidelines",
    microneedling: "Microneedling Pre & Post-Treatment Guidelines",
    prp: "PRP Pre & Post-Treatment Guidelines",
    skinBoosters: "Skin Boosters & Mesotherapy Pre & Post-Treatment Guidelines",
    teethWhitening: "Teeth Whitening Pre & Post-Treatment Guidelines",
    waxing: "Waxing Pre & Post-Treatment Guidelines",
    standard: `${treatmentName} Pre & Post-Treatment Guidelines`,
  };

  const guidelinesTitle = titleByTemplate[template];
  const supportsSubmission = template === "waxing";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setSubmitMessage("");

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = toSubmissionData(formData);
    const fieldBlueprint = extractGuidelineFieldBlueprint(formElement);

    try {
      const response = await fetch("/api/guidelines/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          treatmentName,
          treatmentPath,
          template,
          guidelinesTitle,
          submittedAt: new Date().toISOString(),
          data,
          fieldBlueprint,
        }),
      });

      const result = (await response.json()) as GuidelineSubmitResponse;

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Unable to submit guidelines.");
      }

      let hasDownloadedPdf = false;

      if (result.pdf?.base64 && result.pdf.fileName && result.pdf.mimeType) {
        const pdfBlob = base64ToBlob(result.pdf.base64, result.pdf.mimeType);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfUrl;
        downloadLink.download = result.pdf.fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 30_000);
        hasDownloadedPdf = true;
      }

      const baseMessage =
        result.message ?? "Thank you. Your pre & post-treatment guideline acknowledgement has been submitted successfully.";
      formElement.reset();
      setSubmitMessage(
        hasDownloadedPdf ? `${baseMessage} A copy of your completed guideline has been downloaded.` : baseMessage,
      );
      setSubmitState("success");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      console.error("[TreatmentGuidelinesSubmitError]", error);
      setSubmitMessage("We could not submit this guideline right now. Please try again.");
      setSubmitState("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="relative min-h-[46vh] overflow-hidden border-b border-[#D4AF37]/20 md:min-h-[52vh]">
        <Image
          src={imageSrc}
          alt={`${guidelinesTitle} at J Luxe Medical Aesthetics`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/78 to-black/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,175,55,0.22),transparent_48%)]" />

        <div className="relative z-10 mx-auto flex min-h-[46vh] w-full max-w-6xl items-end px-4 pb-10 pt-24 md:min-h-[52vh] md:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
              J Luxe Medical Aesthetics
            </p>
            <h1 className="mt-4 text-4xl font-serif font-bold uppercase leading-[0.94] md:text-6xl">
              {guidelinesTitle}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-gray-200 md:text-base">
              Review your treatment-specific preparation and aftercare instructions before your appointment.
              These guidelines are treatment-specific and should be followed alongside advice given by your
              practitioner.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={treatmentPath}
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
              >
                Back To Treatment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/forms/${slug}`}
                className="cta-button inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/55 bg-black/35 px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              >
                Consultation Form
                <ClipboardList className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <article className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0d0d0d] to-[#090909] p-6 md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-black/50">
                <BookOpen className="h-5 w-5 text-[#D4AF37]" />
              </span>
              <h2 className="text-2xl font-serif font-bold uppercase md:text-3xl">{guidelinesTitle}</h2>
            </div>

            {submitState === "success" && (
              <p className="mb-6 rounded-xl border border-[#D4AF37]/30 bg-[#1b1509] px-4 py-3 text-xs text-[#f0dc9b]">
                {submitMessage}
              </p>
            )}

            {submitState === "error" && (
              <p className="mb-6 rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-xs text-red-200">
                {submitMessage}
              </p>
            )}

            {supportsSubmission ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <GuidelinesWaxing />
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="cta-button inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] via-[#e4c45b] to-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black shadow-[0_12px_34px_rgba(212,175,55,0.3)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {submitState === "submitting" ? "Saving..." : "Submit Pre & Post-Treatment Guidelines"}
                </button>
              </form>
            ) : (
              <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
                <p className="text-sm leading-relaxed text-gray-200 md:text-base">
                  Pre- and post-treatment guidelines for {treatmentName} will be added here. Send the screenshots
                  section by section and the page will be updated to match.
                </p>
              </section>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
