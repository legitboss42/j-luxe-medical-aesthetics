import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateWaxing({
  inputClassName,
  labelClassName,
  nowDate,
}: TemplateSectionProps) {
  const medicalConditionOptions = [
    "Allergies",
    "Pregnancy or Breastfeeding",
    "Autoimmune or immune-compromised condition",
    "Metabolic syndrome",
    "Circulatory disorder",
    "Lymphoedema",
    "Lipoedema",
    "High or low blood pressure",
    "Heart disease",
    "Epilepsy or seizures",
    "Diabetes",
    "Active acne, hyperpigmentation, melasma, eczema, dermatitis cold sores (Herpes Simple), or skin infection",
    "Keloid or hypertrophic scarring",
    "Hernia",
    "Metal implants, pacemaker, or body piercings near treatment area",
    "Liver disease",
    "Kidney disease",
    "History of kidney stones",
    "Recent urinary issues",
    "History of DVT/PE",
    "Thyroid disorder",
    "Current medications, supplements, or contraceptives (please list below)",
    "Other medical condition",
    "None of the above",
  ] as const;

  const contraindicationOptions = [
    "Active eczema, psoriasis, dermatitis, or rosacea flare-ups",
    "Open wounds, cuts, abrasions, or broken skin",
    "Sunburn or recently tanned skin",
    "Severe inflammation, swelling, or skin irritation",
    "Skin lifting or compromised skin barrier",
    "Pregnancy-related skin sensitivity",
    "Diabetes, autoimmune conditions, or delayed wound healing",
    "Bleeding or clotting disorders",
    "History of hyperpigmentation or keloid scarring",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Ladies Waxing - Face",
    "Ladies Waxing - Arm And Underarm",
    "Ladies Waxing Upper Body",
    "Ladies Waxing - Legs",
    "Ladies Waxing - Intimate",
    "Ladies Waxing - Full Body",
    "Mens Waxing",
  ] as const;

  const waxingConsentStatements = [
    "I confirm that I have read, understood, and agree to follow the pre- and post-treatment information guide provided with this consultation and consent form.",
    "I confirm that the information I have provided is accurate, and I have disclosed all relevant medical history and allergies.",
    "I understand the general risks associated with aesthetic treatments, including bruising, swelling, asymmetry, infection, or temporary discomfort.",
    "I understand that results vary between individuals and that I may require further treatment for optimal or maintained results.",
    "I have had the opportunity to ask questions, and all my questions have been answered to my satisfaction.",
    "I understand that all aesthetic treatments provide temporary results and will naturally wear off over time.",
    "I consent to photographs being taken for my medical record, with optional separate consent for marketing below.",
    "I consent to the processing of my personal data in accordance with the clinic's privacy policy and understand I can withdraw consent at any time.",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Skin Analysis</p>
        <label className={`${labelClassName} mt-4`}>2. Are you currently under the care of a doctor or dermatologist?</label>
        <div className="flex gap-5 text-sm text-gray-200">
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareWaxing" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareWaxing" value="no" />No</label>
        </div>
        <label htmlFor="doctorCareWaxingDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCareWaxingDetails" name="doctorCareWaxingDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="conditionsWaxing" className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsWaxing" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsWaxingDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication&quot; or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea
          id="conditionsWaxingDetails"
          name="conditionsWaxingDetails"
          rows={3}
          className={`${inputClassName} resize-none`}
        />
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Contraindication Check</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          Please read carefully. Some conditions listed below are absolute contraindications, meaning treatment cannot
          be carried out under any circumstances. Others are relative contraindications, meaning treatment may still
          be possible but requires adjustment, additional precautions, or postponing the procedure.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          Declaring these honestly is essential to protect your safety, prevent complications, and ensure the
          practitioner can choose the safest and most effective treatment approach.
        </p>
        <label className={`${labelClassName} mt-4`}>6. Please tick all that apply</label>
        <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {contraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="contraWaxing" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>
          7. Treatment Selection - Please select the treatment you&apos;re booked for: *
        </label>
        <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {treatmentSelectionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="radio" name="treatmentWaxing" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="recentWaxing" className={`${labelClassName} mt-4`}>
          8. Have you had any aesthetic treatment (facials, microneedling, injectables, etc) within the last 6 weeks?
        </label>
        <textarea id="recentWaxing" name="recentWaxing" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="appointmentWaxing" className={`${labelClassName} mt-4`}>9. Date of scheduled appointment. *</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            id="appointmentWaxingDate"
            name="appointmentWaxingDate"
            type="date"
            defaultValue={nowDate}
            className={inputClassName}
          />
          <input
            id="appointmentWaxingTime"
            name="appointmentWaxingTime"
            type="time"
            defaultValue="09:00"
            className={inputClassName}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Client&apos;s Consent (Mandatory)</p>
        <p className="mt-3 text-sm text-gray-300">
          Photographs are taken before and after treatment for medical documentation and client records.
        </p>
        <fieldset className="mt-4">
          <legend className={labelClassName}>10. Client Consent (Mandatory) Please confirm each statement: *</legend>
          <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-gray-200">
            {waxingConsentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentWaxing" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>11. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoWaxing" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoWaxing" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoWaxing" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoWaxing" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          12. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsWaxingClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signatureWaxing" className={`${labelClassName} mt-4`}>12. Customer&apos;s Signature</label>
        <input id="signatureWaxing" name="signatureWaxing" type="text" className={inputClassName} required />
        <label htmlFor="signatureWaxingDate" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input
          id="signatureWaxingDate"
          name="signatureWaxingDate"
          type="date"
          className={inputClassName}
          defaultValue={nowDate}
        />
        <label htmlFor="clientWaxing" className={`${labelClassName} mt-4`}>13. Client&apos;s Name *</label>
        <input id="clientWaxing" name="clientWaxing" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsWaxingEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureWaxing" className={`${labelClassName} mt-4`}>14. Employee&apos;s Signature</label>
        <input id="employeeSignatureWaxing" name="employeeSignatureWaxing" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateWaxing" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input
          id="employeeSignatureDateWaxing"
          name="employeeSignatureDateWaxing"
          type="date"
          className={inputClassName}
          defaultValue={nowDate}
        />
        <label htmlFor="employeeWaxing" className={`${labelClassName} mt-4`}>15. Employee&apos;s Name</label>
        <input id="employeeWaxing" name="employeeWaxing" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentWaxing" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentWaxing" name="assessmentWaxing" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchWaxing" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchWaxing" name="batchWaxing" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsWaxing" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsWaxing" name="unitsWaxing" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsWaxing" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsWaxing" name="postCommentsWaxing" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}

