"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, ClipboardList } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { TreatmentFormTemplate } from "@/src/lib/treatment-forms";
import TemplateAntiWrinkle from "@/src/components/treatment/templates/TemplateAntiWrinkle";
import TemplateBodySculpting from "@/src/components/treatment/templates/TemplateBodySculpting";
import TemplateDermalFillers from "@/src/components/treatment/templates/TemplateDermalFillers";
import TemplateFacials from "@/src/components/treatment/templates/TemplateFacials";
import TemplateWaxing from "@/src/components/treatment/templates/TemplateWaxing";

type SubmitState = "idle" | "submitting" | "success";

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

const microneedlingConsentStatements = [
  "I confirm that I have read, understood, and agree to follow the pre- and post-treatment information guide provided with this consultation and consent form.",
  "I confirm that the information I have provided is accurate, and I have disclosed all relevant medical history and allergies.",
  "I understand the general risks associated with aesthetic treatments, including bruising, swelling, asymmetry, infection, or temporary discomfort.",
  "I understand that results vary between individuals and that I may require further treatment for optimal or maintained results.",
  "I have had the opportunity to ask questions, and all my questions have been answered to my satisfaction.",
  "I understand that all aesthetic treatments provide temporary results and will naturally wear off over time.",
  "I consent to photographs being taken for my medical record, with optional separate consent for marketing below.",
  "I consent to the processing of my personal data in accordance with the clinic privacy policy.",
] as const;

const universalConsentStatements = [
  "I confirm that I have read, understood, and agree to follow the pre- and post-treatment information guide provided with this consultation and consent form.",
  "I confirm that the information I have provided is accurate, and I have disclosed all relevant medical history and allergies.",
  "I understand the general risks associated with aesthetic treatments, including bruising, swelling, asymmetry, infection, or temporary discomfort.",
  "I understand that results vary between individuals and that I may require further treatment for optimal or maintained results.",
  "I have had the opportunity to ask questions, and all my questions have been answered to my satisfaction.",
  "I understand that all aesthetic treatments provide temporary results and will naturally wear off over time.",
  "I consent to photographs being taken for my medical record, with optional separate consent for marketing below.",
  "I consent to the processing of my personal data in accordance with the clinic privacy policy.",
] as const;

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
  const nowDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, index) => current - index);
  }, []);

  const formTitleByTemplate: Record<TreatmentFormTemplate, string> = {
    antiWrinkle: "Anti-Wrinkle Consultation & Consent Form",
    bodySculpting: "Body Sculpting Consultation & Consent Form",
    dermalFillers: "Dermal Fillers Consultation & Consent Form",
    facials: "Facial Consultation & Consent Form",
    microneedling: "Microneedling Consultation & Consent Form",
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
    dermalFillers: {
      primary:
        "Dermal filler treatments are non-surgical procedures designed to restore volume, enhance contour, and support facial balance.",
      secondary:
        "Your consultation is used to plan product selection, placement, dose, and risk management based on your anatomy and history.",
    },
    facials: {
      primary:
        "Facial treatments are tailored to cleanse, exfoliate, hydrate, and rejuvenate skin using clinically selected techniques and products.",
      secondary:
        "A consultation is required to assess suitability, current skincare, sensitivities, and safe treatment sequencing.",
    },
    microneedling: {
      primary:
        "Microneedling creates controlled micro-channels in the skin using sterile needles to stimulate collagen, improve texture, reduce scarring, and support skin rejuvenation.",
      secondary:
        "Results develop gradually and typically require a course of sessions. Temporary redness, sensitivity, and mild swelling are expected.",
    },
    waxing: {
      primary:
        "Waxing removes unwanted hair from the root and supports longer-lasting smoothness compared with shaving.",
      secondary:
        "Consultation helps identify sensitivities, contraindications, and the safest treatment approach for each area.",
    },
    standard: {
      primary: intro,
      secondary:
        "Complete this form before your appointment so your practitioner can assess suitability and proceed safely.",
    },
  };
  const descriptionOne = descriptionByTemplate[template].primary;
  const descriptionTwo = descriptionByTemplate[template].secondary;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    window.setTimeout(() => setSubmitState("success"), 900);
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
              ) : template === "dermalFillers" ? (
                <TemplateDermalFillers
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
              ) : template === "waxing" ? (
                <TemplateWaxing
                  inputClassName={inputClassName}
                  labelClassName={labelClassName}
                  nowDate={nowDate}
                  consentStatements={universalConsentStatements}
                />
              ) : template === "microneedling" ? (
                <>
                  <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Skin Analysis</p>
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      <label className={labelClassName}>2. Are you currently under the care of a doctor or dermatologist?</label>
                      <div className="flex gap-5 text-sm text-gray-200">
                        <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCare" value="yes" required />Yes</label>
                        <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCare" value="no" />No</label>
                      </div>
                      <label htmlFor="doctorCareDetails" className={labelClassName}>3. If &quot;Yes&quot; please specify</label>
                      <textarea id="doctorCareDetails" name="doctorCareDetails" rows={3} className={`${inputClassName} resize-none`} />
                      <label htmlFor="bookedTreatment" className={labelClassName}>4. Treatment Selection - Please select the treatment you&apos;re booked for:</label>
                      <input id="bookedTreatment" name="bookedTreatment" type="text" className={inputClassName} defaultValue="Microneedling with serum" />
                      <label htmlFor="conditions" className={labelClassName}>5. Do you have any relevant skin or medical conditions?</label>
                      <textarea id="conditions" name="conditions" rows={3} className={`${inputClassName} resize-none`} />
                      <label htmlFor="conditionsDetails" className={labelClassName}>6. If yes, please specify</label>
                      <textarea id="conditionsDetails" name="conditionsDetails" rows={3} className={`${inputClassName} resize-none`} />
                      <label htmlFor="skinType" className={labelClassName}>7. How would you describe your skin?</label>
                      <select id="skinType" name="skinType" className={inputClassName} defaultValue="">
                        <option value="">Select</option>
                        <option value="Dry">Dry</option>
                        <option value="Oily">Oily</option>
                        <option value="Combination">Combination</option>
                        <option value="Sensitive">Sensitive</option>
                        <option value="Normal">Normal</option>
                        <option value="Other">Other</option>
                      </select>
                      <label htmlFor="skinTypeOther" className={labelClassName}>8. If &quot;Other&quot; please specify</label>
                      <input id="skinTypeOther" name="skinTypeOther" type="text" className={inputClassName} />
                      <label htmlFor="goals" className={labelClassName}>9. What would you most like to improve?</label>
                      <select id="goals" name="goals" className={inputClassName} defaultValue="">
                        <option value="">Select</option>
                        <option value="Fine lines and texture">Fine lines and texture</option>
                        <option value="Acne scarring">Acne scarring</option>
                        <option value="Dull or uneven skin tone">Dull or uneven skin tone</option>
                        <option value="Breakouts or congestion">Breakouts or congestion</option>
                        <option value="Other">Other</option>
                      </select>
                      <label className={labelClassName}>10. Have you had aesthetic treatment in the last 6 weeks?</label>
                      <div className="flex gap-5 text-sm text-gray-200">
                        <label className="inline-flex items-center gap-2"><input type="radio" name="recentAesthetic" value="yes" required />Yes</label>
                        <label className="inline-flex items-center gap-2"><input type="radio" name="recentAesthetic" value="no" />No</label>
                      </div>
                      <label htmlFor="routine" className={labelClassName}>11. Do you have a skincare routine? If yes, please describe it.</label>
                      <textarea id="routine" name="routine" rows={3} className={`${inputClassName} resize-none`} />
                      <label htmlFor="medication" className={labelClassName}>12. Are you currently on any medications/products that may affect treatment?</label>
                      <textarea id="medication" name="medication" rows={3} className={`${inputClassName} resize-none`} />
                      <label htmlFor="appointmentDate" className={labelClassName}>13. When is this appointment scheduled?</label>
                      <input id="appointmentDate" name="appointmentDate" type="date" className={inputClassName} defaultValue={nowDate} />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Contraindication Check</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">
                      Microneedling cannot be performed if absolute contraindications apply and may need postponement
                      if relative contraindications are present. It is essential to answer honestly to ensure safe
                      treatment.
                    </p>
                    <p className="mt-3 text-sm text-gray-300">14. Are you currently on any of the following? (Absolute contraindications)</p>
                    <textarea name="absoluteContraindications" rows={3} className={`${inputClassName} mt-2 resize-none`} />
                    <p className="mt-4 text-sm text-gray-300">15. Are you currently on any of the following? (Relative contraindications)</p>
                    <textarea name="relativeContraindications" rows={3} className={`${inputClassName} mt-2 resize-none`} />
                  </section>

                  <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Client&apos;s Consent (Mandatory)</p>
                    <p className="mt-3 text-sm text-gray-300">
                      Photographs are taken before and after treatment for medical documentation and client records.
                    </p>
                    <fieldset className="mt-4">
                      <legend className={labelClassName}>16. Client Consent (Mandatory) Please confirm each statement:</legend>
                      <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-gray-200">
                        {microneedlingConsentStatements.map((item) => (
                          <label key={item} className="flex items-start gap-2">
                            <input className="mt-1" type="checkbox" name="consentStatements" value={item} required />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label className={`${labelClassName} mt-4`}>17. Photo & Marketing Consent.</label>
                    <div className="space-y-2 text-sm text-gray-200">
                      <label className="flex items-start gap-2"><input type="radio" name="photoConsent" value="anonymous-education" required /><span>I consent to anonymous training or educational use.</span></label>
                      <label className="flex items-start gap-2"><input type="radio" name="photoConsent" value="marketing" /><span>I consent to marketing use.</span></label>
                      <label className="flex items-start gap-2"><input type="radio" name="photoConsent" value="medical-only" /><span>I do not consent to use beyond medical record.</span></label>
                    </div>
                    <p className="mt-4 text-sm text-gray-300">
                      18. Please sign and date to confirm that you have read, understood, and agree to the statements above.
                    </p>
                    <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
                      <input className="mt-1" type="checkbox" name="electronicRecordsMicroneedlingClient" required />
                      <span>I agree to use electronic records and signatures.</span>
                    </label>
                    <label htmlFor="customerSignature" className={`${labelClassName} mt-4`}>18. Customer Signature</label>
                    <input id="customerSignature" name="customerSignature" type="text" className={inputClassName} required />
                    <label htmlFor="signatureDate" className={`${labelClassName} mt-4`}>Signature Date</label>
                    <input id="signatureDate" name="signatureDate" type="date" className={inputClassName} defaultValue={nowDate} />
                    <label htmlFor="clientName" className={`${labelClassName} mt-4`}>19. Client&apos;s Name</label>
                    <input id="clientName" name="clientName" type="text" className={inputClassName} required />
                    <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
                      <input className="mt-1" type="checkbox" name="electronicRecordsMicroneedlingEmployee" />
                      <span>I agree to use electronic records and signatures.</span>
                    </label>
                    <label htmlFor="employeeSignature" className={`${labelClassName} mt-4`}>20. Employee&apos;s Signature</label>
                    <input id="employeeSignature" name="employeeSignature" type="text" className={inputClassName} />
                    <label htmlFor="employeeSignatureDate" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
                    <input
                      id="employeeSignatureDate"
                      name="employeeSignatureDate"
                      type="date"
                      className={inputClassName}
                      defaultValue={nowDate}
                    />
                    <label htmlFor="employeeName" className={`${labelClassName} mt-4`}>21. Employee&apos;s Name</label>
                    <input id="employeeName" name="employeeName" type="text" className={inputClassName} />
                    <p className="mt-3 text-xs text-gray-400">
                      Note: Customers will not see the employee signature field when filling form online.
                    </p>
                  </section>

                  <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
                    <label htmlFor="assessment" className={`${labelClassName} mt-4`}>Assessment</label>
                    <textarea id="assessment" name="assessment" rows={3} className={`${inputClassName} resize-none`} />
                    <label htmlFor="batch" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date</label>
                    <textarea id="batch" name="batch" rows={3} className={`${inputClassName} resize-none`} />
                    <label htmlFor="units" className={`${labelClassName} mt-4`}>Treatment Given / Units Used</label>
                    <textarea id="units" name="units" rows={3} className={`${inputClassName} resize-none`} />
                    <label htmlFor="postComments" className={`${labelClassName} mt-4`}>Post-Treatment Comments</label>
                    <textarea id="postComments" name="postComments" rows={4} className={`${inputClassName} resize-none`} />
                  </section>
                </>
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
                  Form captured successfully. Final confirmation and signatures are completed in clinic.
                </p>
              )}
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}
