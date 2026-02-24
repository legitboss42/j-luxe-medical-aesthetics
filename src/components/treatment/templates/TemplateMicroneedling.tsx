import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateMicroneedling({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
  const treatmentSelectionOptions = [
    "Microneedling",
    "Microneedling with serum",
    "Microneedling + exosomes",
    "Microneedling (course package)",
    "Other",
  ] as const;

  const medicalConditionOptions = [
    "Allergies",
    "Pregnancy or breastfeeding",
    "Autoimmune or immune-compromised condition",
    "Circulatory disorder",
    "High or low blood pressure",
    "Heart disease",
    "Epilepsy or seizures",
    "Diabetes",
    "Active acne, hyperpigmentation, melasma, eczema, dermatitis, cold sores (Herpes Simplex), or skin infection",
    "Keloid or hypertrophic scarring",
    "Current medications, supplements, or contraceptives (please list below)",
    "Other medical condition",
    "None of the above",
  ] as const;

  const goalOptions = [
    "Fine lines and texture",
    "Acne scarring",
    "Dull or uneven skin tone",
    "Breakouts or congestion",
    "Pigmentation concerns",
    "Large pores",
    "Overall skin rejuvenation",
    "Other",
  ] as const;

  const currentProductsOptions = [
    "Retinol / Vitamin A",
    "AHA/BHA exfoliants",
    "Prescription acne treatment (for example isotretinoin)",
    "Steroid or immunosuppressive medication",
    "Blood-thinning medication or supplements",
    "Other active products/medications",
    "None of the above",
  ] as const;

  const absoluteContraindicationOptions = [
    "Active skin infection (bacterial, fungal, or viral)",
    "Open wounds, cuts, or broken skin in treatment area",
    "Current isotretinoin use",
    "Pregnancy or breastfeeding",
    "Keloid scarring tendency",
    "None of the above",
  ] as const;

  const relativeContraindicationOptions = [
    "Recent chemical peel or laser resurfacing",
    "Recent injectable treatment in the target area",
    "History of post-inflammatory hyperpigmentation",
    "Autoimmune or inflammatory skin flare-up",
    "Blood-thinning medication",
    "None of the above",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Skin Analysis</p>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className={labelClassName}>2. Are you currently under the care of a doctor or dermatologist?</label>
          <div className="flex gap-5 text-sm text-gray-200">
            <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareMicro" value="yes" required />Yes</label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareMicro" value="no" />No</label>
          </div>

          <label htmlFor="doctorCareMicroDetails" className={labelClassName}>3. If &quot;Yes&quot; please specify</label>
          <textarea id="doctorCareMicroDetails" name="doctorCareMicroDetails" rows={3} className={`${inputClassName} resize-none`} />

          <label className={labelClassName}>4. Treatment Selection - Please select the treatment you&apos;re booked for:</label>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {treatmentSelectionOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
                <input className="mt-1" type="radio" name="bookedTreatmentMicro" value={option} />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <label className={labelClassName}>
            5. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
          </label>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {medicalConditionOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
                <input className="mt-1" type="checkbox" name="conditionsMicro" value={option} />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <label htmlFor="conditionsMicroDetails" className={labelClassName}>
            6. If &quot;Yes&quot; to any of the above including current medication or other Medical Condition, please specify
          </label>
          <textarea id="conditionsMicroDetails" name="conditionsMicroDetails" rows={3} className={`${inputClassName} resize-none`} />

          <label htmlFor="skinTypeMicro" className={labelClassName}>7. How would you describe your skin?</label>
          <select id="skinTypeMicro" name="skinTypeMicro" className={inputClassName} defaultValue="">
            <option value="">Select</option>
            <option value="Dry">Dry</option>
            <option value="Oily">Oily</option>
            <option value="Combination">Combination</option>
            <option value="Sensitive">Sensitive</option>
            <option value="Normal">Normal</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="skinTypeMicroOther" className={labelClassName}>8. If &quot;Other&quot; please specify</label>
          <input id="skinTypeMicroOther" name="skinTypeMicroOther" type="text" className={inputClassName} />

          <label htmlFor="goalsMicro" className={labelClassName}>9. What would you most like to improve?</label>
          <select id="goalsMicro" name="goalsMicro" className={inputClassName} defaultValue="">
            <option value="">Select</option>
            {goalOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <label className={labelClassName}>10. Have you had any aesthetic treatment in the last 6 weeks?</label>
          <div className="flex gap-5 text-sm text-gray-200">
            <label className="inline-flex items-center gap-2"><input type="radio" name="recentAestheticMicro" value="yes" required />Yes</label>
            <label className="inline-flex items-center gap-2"><input type="radio" name="recentAestheticMicro" value="no" />No</label>
          </div>

          <label htmlFor="routineMicro" className={labelClassName}>11. Do you have a skincare routine? If yes, please describe it.</label>
          <textarea id="routineMicro" name="routineMicro" rows={3} className={`${inputClassName} resize-none`} />

          <label className={labelClassName}>12. Are you currently on any of the following?</label>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {currentProductsOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
                <input className="mt-1" type="checkbox" name="medicationMicro" value={option} />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <label className={labelClassName}>13. When is this appointment scheduled?</label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input id="appointmentDateMicro" name="appointmentDateMicro" type="date" className={inputClassName} defaultValue={nowDate} />
            <input id="appointmentTimeMicro" name="appointmentTimeMicro" type="time" className={inputClassName} defaultValue="09:00" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Contraindication Check</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          Microneedling cannot be performed if absolute contraindications apply and may need postponement if
          relative contraindications are present. It is essential to answer honestly to ensure safe treatment.
        </p>
        <p className="mt-3 text-sm text-gray-300">14. Are you currently on any of the following? (Absolute contraindications)</p>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {absoluteContraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="absoluteContraMicro" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-300">15. Are you currently on any of the following? (Relative contraindications)</p>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {relativeContraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="relativeContraMicro" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Client&apos;s Consent (Mandatory)</p>
        <p className="mt-3 text-sm text-gray-300">
          Photographs are taken before and after treatment for medical documentation and client records.
        </p>
        <fieldset className="mt-4">
          <legend className={labelClassName}>16. Client Consent (Mandatory) Please confirm each statement: *</legend>
          <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-gray-200">
            {consentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentMicro" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>17. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoConsentMicro" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoConsentMicro" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoConsentMicro" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoConsentMicro" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          18. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsMicroClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="customerSignatureMicro" className={`${labelClassName} mt-4`}>18. Customer Signature</label>
        <input id="customerSignatureMicro" name="customerSignatureMicro" type="text" className={inputClassName} required />
        <label htmlFor="signatureDateMicro" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureDateMicro" name="signatureDateMicro" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientNameMicro" className={`${labelClassName} mt-4`}>19. Client&apos;s Name *</label>
        <input id="clientNameMicro" name="clientNameMicro" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsMicroEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureMicro" className={`${labelClassName} mt-4`}>20. Employee&apos;s Signature</label>
        <input id="employeeSignatureMicro" name="employeeSignatureMicro" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateMicro" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDateMicro" name="employeeSignatureDateMicro" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeeNameMicro" className={`${labelClassName} mt-4`}>21. Employee&apos;s Name *</label>
        <input id="employeeNameMicro" name="employeeNameMicro" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentMicro" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentMicro" name="assessmentMicro" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchMicro" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchMicro" name="batchMicro" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsMicro" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsMicro" name="unitsMicro" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsMicro" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsMicro" name="postCommentsMicro" rows={4} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}
