import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateFacials({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
  const medicalConditionOptions = [
    "Allergies",
    "Pregnancy or breastfeeding",
    "Autoimmune or immune-compromised condition",
    "Metabolic syndrome",
    "Circulatory disorder",
    "Lymphoedema",
    "Lipoedema",
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

  const contraindicationOptions = [
    "Active eczema, psoriasis, dermatitis, or rosacea flare-ups",
    "Open wounds, cuts, abrasions, or broken skin",
    "Sunburn or recently tanned skin",
    "Severe inflammation, swelling, or skin irritation",
    "Pregnancy-related skin sensitivity",
    "History of severe hyperpigmentation or keloid scarring",
    "Recent aggressive exfoliation or resurfacing",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Express Facial",
    "Classic Facial",
    "Microdermabrasion Facial",
    "Dermaplaning Facial",
    "Acne (Deep Extraction /High Frequency)",
    "Hydrafacial",
    "Glow Facial",
    "Anti-ageing Facial",
    "Microcurrent/EMS (Face Sculpting)",
    "Vampire Facial",
    "Customised Luxury Facial",
    "Back Facial (Women)",
    "Back Facial (Men)",
    "Chemical Peel Facial",
  ] as const;

  const goalOptions = [
    "Fine lines and texture",
    "Acne scarring",
    "Dull or uneven skin tone",
    "Breakouts or congestion",
    "Hydration and glow",
    "Redness or sensitivity",
    "Pigmentation concerns",
    "Other",
  ] as const;

  const currentProductsOptions = [
    "Retinol / Vitamin A",
    "AHA/BHA exfoliants",
    "Prescription acne treatment (for example isotretinoin)",
    "Steroid creams",
    "Photosensitising medication",
    "Recent antibiotics",
    "Other active products/medications",
    "None of the above",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Skin Analysis</p>
        <label className={`${labelClassName} mt-4`}>2. Are you currently under the care of a doctor or dermatologist?</label>
        <div className="flex gap-5 text-sm text-gray-200">
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareFacial" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareFacial" value="no" />No</label>
        </div>
        <label htmlFor="doctorCareFacialDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCareFacialDetails" name="doctorCareFacialDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="facialConditions" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="facialConditionsDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication&quot; or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea id="facialConditionsDetails" name="facialConditionsDetails" rows={3} className={`${inputClassName} resize-none`} />
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
        <label className={`${labelClassName} mt-4`}>6. Please tick any that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {contraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="facialContra" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>
          7. Treatment Selection - Please select the treatment you&apos;re booked for:
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {treatmentSelectionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="radio" name="facialTreatment" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="skinTypeFacial" className={`${labelClassName} mt-4`}>8. How would you describe your skin?</label>
        <select id="skinTypeFacial" name="skinTypeFacial" className={inputClassName} defaultValue="">
          <option value="">Select</option>
          <option value="Dry">Dry</option>
          <option value="Oily">Oily</option>
          <option value="Combination">Combination</option>
          <option value="Sensitive">Sensitive</option>
          <option value="Normal">Normal</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="skinTypeFacialOther" className={`${labelClassName} mt-4`}>9. If &quot;Other&quot; please specify</label>
        <input id="skinTypeFacialOther" name="skinTypeFacialOther" type="text" className={inputClassName} />
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Fitzpatrick Skin Type Assessment</p>
        <label htmlFor="fitzpatrickFacial" className={`${labelClassName} mt-4`}>
          10. Please select the option that best describes your skin&apos;s natural colour, how it tans, and how it reacts to sun exposure.
        </label>
        <select id="fitzpatrickFacial" name="fitzpatrickFacial" className={inputClassName} defaultValue="">
          <option value="">Select</option>
          <option value="Type I - Very fair skin, always burns, never tans">Type I - Very fair skin, always burns, never tans</option>
          <option value="Type II - Fair skin, usually burns, tans minimally">Type II - Fair skin, usually burns, tans minimally</option>
          <option value="Type III - Medium/Olive skin, sometimes burns and gradually tans">Type III - Medium/Olive skin, sometimes burns and gradually tans</option>
          <option value="Type IV - Olive/Brown skin, rarely burns, tans easily">Type IV - Olive/Brown skin, rarely burns, tans easily</option>
          <option value="Type V - Brown skin, very rarely burns, tans very easily">Type V - Brown skin, very rarely burns, tans very easily</option>
          <option value="Type VI - Deeply pigmented skin, never burns">Type VI - Deeply pigmented skin, never burns</option>
        </select>
        <label htmlFor="facialGoals" className={`${labelClassName} mt-4`}>11. What would you most like to improve?</label>
        <select id="facialGoals" name="facialGoals" className={inputClassName} defaultValue="">
          <option value="">Select</option>
          {goalOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <label className={`${labelClassName} mt-4`}>12. When is this appointment scheduled?</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="facialAppointmentDate" name="facialAppointmentDate" type="date" defaultValue={nowDate} className={inputClassName} />
          <input id="facialAppointmentTime" name="facialAppointmentTime" type="time" defaultValue="09:00" className={inputClassName} />
        </div>
        <label htmlFor="facialRecentTreatment" className={`${labelClassName} mt-4`}>
          13. Have you had any aesthetic treatment (facials, microneedling, injectables, etc) within the last 6 weeks?
        </label>
        <textarea id="facialRecentTreatment" name="facialRecentTreatment" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="facialRoutine" className={`${labelClassName} mt-4`}>
          14. Do you have a skincare routine? If yes, please describe it
        </label>
        <textarea id="facialRoutine" name="facialRoutine" rows={2} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>15. Are you currently on any of the following?</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {currentProductsOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="facialProducts" value={option} />
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
                <input className="mt-1" type="checkbox" name="consentFacial" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>17. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFacial" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFacial" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFacial" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFacial" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          18. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFacialClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signatureFacial" className={`${labelClassName} mt-4`}>18. Customer&apos;s Signature</label>
        <input id="signatureFacial" name="signatureFacial" type="text" className={inputClassName} required />
        <label htmlFor="signatureFacialDate" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureFacialDate" name="signatureFacialDate" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientFacial" className={`${labelClassName} mt-4`}>19. Client&apos;s Name *</label>
        <input id="clientFacial" name="clientFacial" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFacialEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureFacial" className={`${labelClassName} mt-4`}>20. Employee&apos;s Signature</label>
        <input id="employeeSignatureFacial" name="employeeSignatureFacial" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateFacial" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDateFacial" name="employeeSignatureDateFacial" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeeFacial" className={`${labelClassName} mt-4`}>21. Employee&apos;s Name *</label>
        <input id="employeeFacial" name="employeeFacial" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentFacial" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentFacial" name="assessmentFacial" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchFacial" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchFacial" name="batchFacial" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsFacial" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsFacial" name="unitsFacial" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsFacial" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsFacial" name="postCommentsFacial" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}
