import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateDermalFillers({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
  const medicalConditionOptions = [
    "Allergies (including lidocaine, hyaluronic acid, hyaluronidase, latex)",
    "Pregnancy or breastfeeding",
    "Autoimmune or immune-compromised condition",
    "Circulatory disorder",
    "High or low blood pressure",
    "Heart disease",
    "Epilepsy or seizures",
    "Diabetes",
    "Active acne, hyperpigmentation, melasma, eczema, dermatitis, cold sores (Herpes Simplex), or skin infection",
    "History of keloid or hypertrophic scarring",
    "Current medications, supplements, or contraceptives (please list below)",
    "Other medical condition",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Lips (0.5ml)",
    "Lips (1ml)",
    "Nasolabial Folds",
    "Marionette Lines",
    "Cheeks",
    "Chin",
    "Jawline",
    "Tear Trough",
    "Temples",
    "Non-Surgical Rhinoplasty",
    "Smoker's Lines",
    "Lumi Lips Pro Booster",
    "Elective Filler dissolving (per area)",
    "1 session to dissolve fillers",
    "Add on per 1ml",
    "Other",
  ] as const;

  const treatmentHistoryOptions = [
    "Anti-wrinkle injections in the past",
    "Dermal fillers in the past",
    "Filler dissolving in the past",
    "Skin boosters/mesotherapy in the past",
    "Laser or chemical peel treatment in the past 6 weeks",
    "Dental treatment in the past 2 weeks",
    "None of the above",
  ] as const;

  const contraindicationOptions = [
    "Pregnancy or breastfeeding",
    "Active infection near treatment area",
    "Recent dental infection or invasive dental treatment",
    "History of keloid scarring or poor wound healing",
    "Known hypersensitivity to filler ingredients",
    "Bleeding or clotting disorder",
    "None of the above",
  ] as const;

  const currentProductsOptions = [
    "Retinol / Vitamin A",
    "AHA/BHA exfoliants",
    "Prescription acne treatment (for example isotretinoin)",
    "Blood-thinning medication or supplements",
    "Steroid or immunosuppressive medication",
    "Other active products/medications",
    "None of the above",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Skin Analysis</p>
        <label className={`${labelClassName} mt-4`}>
          2. Are you currently under the care of a doctor or dermatologist?
        </label>
        <div className="flex gap-5 text-sm text-gray-200">
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareFillers" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareFillers" value="no" />No</label>
        </div>
        <label htmlFor="doctorCareFillersDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCareFillersDetails" name="doctorCareFillersDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsFillers" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsFillersDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication&quot; or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea id="conditionsFillersDetails" name="conditionsFillersDetails" rows={3} className={`${inputClassName} resize-none`} />
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Treatment & History</p>
        <label className={`${labelClassName} mt-4`}>6. Treatment Selection - Please select the treatment you&apos;re booked for:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {treatmentSelectionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="radio" name="treatmentFillers" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="otherFillers" className={`${labelClassName} mt-4`}>7. If &quot;Other&quot; please specify</label>
        <input id="otherFillers" name="otherFillers" type="text" className={inputClassName} />
        <label className={`${labelClassName} mt-4`}>8. When is the appointment scheduled?</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="appointmentFillersDate" name="appointmentFillersDate" type="date" defaultValue={nowDate} className={inputClassName} />
          <input id="appointmentFillersTime" name="appointmentFillersTime" type="time" defaultValue="09:00" className={inputClassName} />
        </div>
        <label className={`${labelClassName} mt-4`}>9. Please tick all that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {treatmentHistoryOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="historyFillers" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>10. If yes, specify area and date</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="historyFillersArea" name="historyFillersArea" type="text" className={inputClassName} placeholder="Area treated" />
          <input id="historyFillersDate" name="historyFillersDate" type="date" className={inputClassName} />
        </div>
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
        <label className={`${labelClassName} mt-4`}>11. Please tick any that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {contraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="contraFillers" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>12. Are you currently on any of the following?</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {currentProductsOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="productsFillers" value={option} />
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
          <legend className={labelClassName}>13. Client Consent (Mandatory) Please confirm each statement: *</legend>
          <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-gray-200">
            {consentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentFillers" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>14. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFillers" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFillers" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFillers" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFillers" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          15. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFillersClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signatureFillers" className={`${labelClassName} mt-4`}>15. Customer&apos;s Signature</label>
        <input id="signatureFillers" name="signatureFillers" type="text" className={inputClassName} required />
        <label htmlFor="signatureFillersDate" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureFillersDate" name="signatureFillersDate" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientFillers" className={`${labelClassName} mt-4`}>16. Client&apos;s Name *</label>
        <input id="clientFillers" name="clientFillers" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFillersEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureFillers" className={`${labelClassName} mt-4`}>17. Employee&apos;s Signature</label>
        <input id="employeeSignatureFillers" name="employeeSignatureFillers" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateFillers" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDateFillers" name="employeeSignatureDateFillers" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeeFillers" className={`${labelClassName} mt-4`}>18. Employee&apos;s Name *</label>
        <input id="employeeFillers" name="employeeFillers" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="otherAreaFillers" className={`${labelClassName} mt-4`}>19. For &quot;Other&quot;, please specify area:</label>
        <textarea id="otherAreaFillers" name="otherAreaFillers" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="assessmentFillers" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentFillers" name="assessmentFillers" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchFillers" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchFillers" name="batchFillers" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsFillers" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsFillers" name="unitsFillers" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsFillers" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsFillers" name="postCommentsFillers" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}
