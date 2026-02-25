"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, ClipboardList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { TreatmentFormTemplate } from "@/src/lib/treatment-forms";
import TemplateAntiWrinkle from "@/src/components/treatment/templates/TemplateAntiWrinkle";
import TemplateBodySculpting from "@/src/components/treatment/templates/TemplateBodySculpting";
import TemplateChemicalPeels from "@/src/components/treatment/templates/TemplateChemicalPeels";
import TemplateDermalFillers from "@/src/components/treatment/templates/TemplateDermalFillers";
import TemplateExosomes from "@/src/components/treatment/templates/TemplateExosomes";
import TemplateFacials from "@/src/components/treatment/templates/TemplateFacials";
import TemplateIvDrip from "@/src/components/treatment/templates/TemplateIvDrip";
import TemplateMicroneedling from "@/src/components/treatment/templates/TemplateMicroneedling";
import TemplatePrp from "@/src/components/treatment/templates/TemplatePrp";
import TemplateSkinBoosters from "@/src/components/treatment/templates/TemplateSkinBoosters";
import TemplateTeethWhitening from "@/src/components/treatment/templates/TemplateTeethWhitening";
import TemplateWaxing from "@/src/components/treatment/templates/TemplateWaxing";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FieldPayload = string | string[];

type PdfFieldBlueprintItem = {
  name: string;
  label: string;
  section: string;
  order: number;
};

type FormSubmitResponse = {
  ok: boolean;
  message?: string;
  error?: string;
  mailerLite?: {
    ok: boolean;
    skipped?: boolean;
    message: string;
  };
  pdf?: {
    fileName: string;
    mimeType: string;
    base64: string;
  };
};

type TreatmentFormsClientProps = {
  treatmentName: string;
  treatmentPath: `/${string}`;
  imageSrc: `/${string}`;
  intro: string;
  template: TreatmentFormTemplate;
};

const inputClassName =
  "w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20";
const labelClassName = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const universalConsentStatements = [
  "I confirm that I have read, understood, and agree to follow the pre- and post-treatment information guide provided with this consultation and consent form.",
  "I confirm that the information I have provided is accurate, and I have disclosed all relevant medical history and allergies.",
  "I understand the general risks associated with aesthetic treatments, including bruising, swelling, asymmetry, infection, or temporary discomfort.",
  "I understand that results vary between individuals and that I may require further treatment for optimal or maintained results.",
  "I have had the opportunity to ask questions, and all my questions have been answered to my satisfaction.",
  "I understand that all aesthetic treatments provide temporary results and will naturally wear off over time.",
  "I consent to photographs being taken for my medical record, with optional separate consent for marketing below.",
  "I consent to the processing of my personal data in accordance with the clinic's privacy policy and understand I can withdraw consent at any time.",
] as const;

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
  return /^\d+\./.test(text) || text.endsWith("?") || text.includes("please") || text.includes("Please");
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
  const id = field.getAttribute("id");
  if (id) {
    const explicitLabel = Array.from(section.querySelectorAll("label[for]"))
      .find((label) => label.getAttribute("for") === id);

    const labelText = normalizeText(explicitLabel?.textContent ?? "");
    if (labelText) {
      return labelText;
    }
  }

  const fieldset = field.closest("fieldset");
  if (fieldset instanceof HTMLElement) {
    const legend = fieldset.querySelector("legend");
    const legendText = normalizeText(legend?.textContent ?? "");
    if (legendText) {
      return legendText;
    }
  }

  const nearestQuestion = findNearestQuestionText(section, field);
  if (nearestQuestion) {
    return nearestQuestion;
  }

  return readableFieldName(name);
}

function getSectionTitle(section: HTMLElement): string {
  const headingCandidate = Array.from(section.querySelectorAll("p"))
    .map((element) => normalizeText(element.textContent ?? ""))
    .find((text) => text.length > 0);

  return headingCandidate ?? "Form Details";
}

function extractPdfFieldBlueprint(form: HTMLFormElement): PdfFieldBlueprintItem[] {
  const blueprint: PdfFieldBlueprintItem[] = [];
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

  for (let i = 0; i < byteCharacters.length; i += 1) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
}

function Demographics({ years }: { years: number[] }) {
  return (
    <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
        1. Client Demographic Information *
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClassName}>
            First Name *
          </label>
          <input id="firstName" name="firstName" required type="text" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Last Name *
          </label>
          <input id="lastName" name="lastName" required type="text" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="address1" className={labelClassName}>
            Address Line 1 *
          </label>
          <input id="address1" name="address1" required type="text" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="address2" className={labelClassName}>
            Address Line 2
          </label>
          <input id="address2" name="address2" type="text" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email *
          </label>
          <input id="email" name="email" required type="email" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClassName}>
            Phone Number *
          </label>
          <input id="phone" name="phone" required type="tel" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="gender" className={labelClassName}>
            Select Gender (Optional)
          </label>
          <select id="gender" name="gender" className={inputClassName} defaultValue="">
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className={labelClassName}>Birthday</label>
          <div className="grid grid-cols-3 gap-2">
            <select name="birthMonth" className={inputClassName} defaultValue="">
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select name="birthDay" className={inputClassName} defaultValue="">
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select name="birthYear" className={inputClassName} defaultValue="">
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="referredBy" className={labelClassName}>
            Referred By
          </label>
          <input id="referredBy" name="referredBy" type="text" className={inputClassName} />
        </div>
      </div>
    </section>
  );
}

export default function TreatmentFormsClient({
  treatmentName,
  treatmentPath,
  imageSrc,
  intro,
  template,
}: TreatmentFormsClientProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const nowDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, index) => current - index);
  }, []);

  const formTitleByTemplate: Record<TreatmentFormTemplate, string> = {
    antiWrinkle: "Anti-Wrinkle Consultation & Consent Form",
    bodySculpting: "Body Sculpting Consultation & Consent Form",
    chemicalPeels: "Chemical Peel Consultation & Consent Form",
    dermalFillers: "Dermal Fillers Consultation & Consent Form",
    exosomes: "Exosome Therapy Consultation & Consent Form",
    facials: "Facial Consultation & Consent Form",
    ivDrip: "IV Drip Consultation & Consent Form",
    microneedling: "Microneedling Consultation & Consent Form",
    prp: "PRP Consultation & Consent Form",
    skinBoosters: "Skin Boosters & Mesotherapy Consultation & Consent Form",
    teethWhitening: "Teeth Whitening Consultation & Consent Form",
    waxing: "Waxing Consultation & Consent Form",
    standard: `${treatmentName} Consultation & Consent Form`,
  };
  const formTitle = formTitleByTemplate[template];

  const descriptionByTemplate: Record<TreatmentFormTemplate, { primary: string; secondary: string }> = {
    antiWrinkle: {
      primary:
        "Anti-wrinkle injections use carefully measured doses of a prescription-only medication to temporarily relax specific facial muscles responsible for expression lines.",
      secondary:
        "A thorough consultation is required before treatment to assess medical safety, suitability, and personalised dosing strategy.",
    },
    bodySculpting: {
      primary:
        "Body sculpting treatments are designed to contour, firm, and refine the body by targeting stubborn fat deposits and enhancing natural shape.",
      secondary:
        "Consultation reviews medical history, body goals, and contraindications to ensure a safe and realistic treatment plan.",
    },
    chemicalPeels: {
      primary:
        "Chemical peel treatments support skin renewal by improving tone, texture, and visible clarity using clinically selected peel protocols.",
      secondary:
        "Consultation is required to assess skin history, sensitivities, recent treatments, and product use before treatment.",
    },
    dermalFillers: {
      primary:
        "Dermal filler treatments are non-surgical procedures designed to restore volume, enhance contour, and support facial balance.",
      secondary:
        "Your consultation is used to plan product selection, placement, dose, and risk management based on your anatomy and history.",
    },
    exosomes: {
      primary:
        "Exosome therapy is a regenerative treatment used to support skin and scalp quality through consultation-led protocol selection.",
      secondary:
        "Consultation is essential to assess suitability, current conditions, and safe treatment sequencing.",
    },
    facials: {
      primary:
        "Facial treatments are tailored to cleanse, exfoliate, hydrate, and rejuvenate skin using clinically selected techniques and products.",
      secondary:
        "A consultation is required to assess suitability, current skincare, sensitivities, and safe treatment sequencing.",
    },
    ivDrip: {
      primary:
        "IV drip treatments deliver hydration and nutrient support through consultation-led infusion protocols matched to wellness goals.",
      secondary:
        "A detailed medical screening is required before treatment to confirm suitability and reduce risk.",
    },
    microneedling: {
      primary:
        "Microneedling creates controlled micro-channels in the skin using sterile needles to stimulate collagen, improve texture, reduce scarring, and support skin rejuvenation.",
      secondary:
        "Results develop gradually and typically require a course of sessions. Temporary redness, sensitivity, and mild swelling are expected.",
    },
    prp: {
      primary:
        "PRP treatment uses platelet-rich plasma from your own blood to support regenerative skin and scalp outcomes.",
      secondary:
        "Consultation confirms clinical suitability, treatment goals, and contraindication screening before treatment.",
    },
    skinBoosters: {
      primary:
        "Skin boosters and mesotherapy protocols are designed to improve hydration, skin quality, and visible rejuvenation.",
      secondary:
        "Consultation is required to select the correct protocol, number of sessions, and safe treatment sequencing.",
    },
    teethWhitening: {
      primary:
        "Professional teeth whitening treatments are delivered with protocol-led shade planning and aftercare guidance.",
      secondary:
        "A consultation is required to review oral suitability, exclusions, and realistic whitening outcomes.",
    },
    waxing: {
      primary:
        "Body waxing is a professional hair-removal treatment that uses warm or hot wax to gently but effectively remove unwanted hair from the root across larger areas of the body. By lifting hair directly from the follicle, waxing leaves the skin smooth, clean, and evenly refreshed, with results that last longer than shaving or depilatory creams. Regrowth is typically finer and softer over time, with results lasting around 3 - 4 weeks depending on individual hair growth cycles and hormonal factors.",
      secondary:
        "A consultation is essential before body waxing to assess skin type, sensitivity, current skincare products, and any underlying conditions. Certain treatments, medications, or skin concerns can make waxing unsuitable or require modified techniques. Honest disclosure helps prevent irritation, burns, or skin lifting and allows your practitioner to tailor the treatment for maximum comfort, safety, and optimal results.",
    },
    standard: {
      primary: intro,
      secondary:
        "Complete this form before your appointment so your practitioner can assess suitability and proceed safely.",
    },
  };
  const descriptionOne = descriptionByTemplate[template].primary;
  const descriptionTwo = descriptionByTemplate[template].secondary;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setSubmitMessage("");

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = toSubmissionData(formData);
    const fieldBlueprint = extractPdfFieldBlueprint(formElement);

    try {
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          treatmentName,
          treatmentPath,
          template,
          submittedAt: new Date().toISOString(),
          data,
          fieldBlueprint,
        }),
      });

      const result = (await response.json()) as FormSubmitResponse;

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Unable to submit form.");
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

      const baseMessage = result.message ?? "Thank you. Your consultation form has been submitted successfully.";
      formElement.reset();
      setSubmitMessage(
        hasDownloadedPdf ? `${baseMessage} A copy of your submitted form has been downloaded.` : baseMessage,
      );
      setSubmitState("success");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      console.error("[TreatmentFormSubmitError]", error);
      setSubmitMessage("We could not submit this form right now. Please try again.");
      setSubmitState("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="relative min-h-[48vh] overflow-hidden border-b border-[#D4AF37]/20 md:min-h-[54vh]">
        <Image
          src={imageSrc}
          alt={`${formTitle} at J Luxe Medical Aesthetics`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/78 to-black/62" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(212,175,55,0.22),transparent_48%)]" />

        <div className="relative z-10 mx-auto flex min-h-[48vh] w-full max-w-6xl items-end px-4 pb-10 pt-24 md:min-h-[54vh] md:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] md:text-sm">
              J Luxe Medical Aesthetics
            </p>
            <h1 className="mt-4 text-4xl font-serif font-bold uppercase leading-[0.94] md:text-6xl">
              {formTitle}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-gray-200 md:text-base">{descriptionOne}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">{descriptionTwo}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={treatmentPath}
                className="cta-button inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black hover:bg-[#eac85a]"
              >
                Back To Treatment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <article className="rounded-[26px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#151006] via-[#0d0d0d] to-[#090909] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-black/50">
                <ClipboardList className="h-5 w-5 text-[#D4AF37]" />
              </span>
              <h2 className="text-2xl font-serif font-bold uppercase md:text-3xl">{formTitle}</h2>
            </div>

            <form className="mt-8 space-y-7" onSubmit={handleSubmit}>
              <Demographics years={years} />

              {template === "antiWrinkle" ? (
                <TemplateAntiWrinkle
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "bodySculpting" ? (
                <TemplateBodySculpting
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "chemicalPeels" ? (
                <TemplateChemicalPeels
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "dermalFillers" ? (
                <TemplateDermalFillers
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "exosomes" ? (
                <TemplateExosomes
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "facials" ? (
                <TemplateFacials
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "ivDrip" ? (
                <TemplateIvDrip
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "microneedling" ? (
                <TemplateMicroneedling
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "prp" ? (
                <TemplatePrp
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "skinBoosters" ? (
                <TemplateSkinBoosters
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "teethWhitening" ? (
                <TemplateTeethWhitening
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "waxing" ? (
                <TemplateWaxing
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : (
                <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Consultation & Consent</p>
                  <label htmlFor="mainConcern" className={`${labelClassName} mt-4`}>Main Concern</label>
                  <textarea id="mainConcern" name="mainConcern" rows={3} className={`${inputClassName} resize-none`} />
                  <label htmlFor="medicalHistory" className={`${labelClassName} mt-4`}>Relevant Medical History</label>
                  <textarea id="medicalHistory" name="medicalHistory" rows={3} className={`${inputClassName} resize-none`} />
                  <label htmlFor="consentSignature" className={`${labelClassName} mt-4`}>Client Signature</label>
                  <input id="consentSignature" name="consentSignature" type="text" className={inputClassName} required />
                </section>
              )}

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="cta-button inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] via-[#e4c45b] to-[#D4AF37] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black shadow-[0_12px_34px_rgba(212,175,55,0.3)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {submitState === "submitting" ? "Saving..." : "Submit Consultation & Consent Form"}
              </button>

              {submitState === "success" && (
                <p className="rounded-xl border border-[#D4AF37]/30 bg-[#1b1509] px-4 py-3 text-xs text-[#f0dc9b]">
                  {submitMessage}
                </p>
              )}

              {submitState === "error" && (
                <p className="rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-xs text-red-200">
                  {submitMessage}
                </p>
              )}
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}
