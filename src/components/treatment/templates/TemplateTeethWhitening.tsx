import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateTeethWhitening({
  inputClassName,
  labelClassName,
  nowDate,
}: TemplateSectionProps) {
  const oralConditionOptions = [
    "Sensitive teeth",
    "Gum irritation or gum disease",
    "Untreated cavities or tooth pain",
    "Cracked/chipped teeth",
    "Crowns, veneers, bonding, or composite restorations",
    "Braces/retainers or recent orthodontic treatment",
    "Recent dental treatment (within 2 weeks)",
    "Pregnancy or breastfeeding",
    "Smoking or heavy staining habits",
    "Previous whitening treatment in last 6 months",
    "Allergy to whitening products",
    "Other medical condition",
    "None of the above",
  ] as const;

  const contraindicationOptions = [
    "Untreated cavities or active tooth pain",
    "Active gum disease or severe gum recession",
    "Oral infection, ulcer, or open lesion",
    "Recent extraction/oral surgery",
    "Known allergy to whitening agents",
    "Pregnancy or breastfeeding without dental clearance",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Standard",
    "Premium",
    "Ultra",
    "Top Up (30 Minutes Session)",
  ] as const;

  const teethWhiteningConsentStatements = [
    "I confirm that I have read, understood, and agree to follow the pre- and post-treatment information guide provided with this consultation and consent form.",
    "I confirm that the information I have provided is accurate, and I have disclosed all relevant medical and dental history.",
    "I understand the possible temporary side effects including sensitivity, gum irritation, and temporary discomfort.",
    "I understand that whitening results vary between individuals and depend on existing tooth shade and lifestyle factors.",
    "I understand that crowns, veneers, fillings, and other restorations may not whiten in the same way as natural teeth.",
    "I have had the opportunity to ask questions, and all my questions have been answered to my satisfaction.",
    "I consent to photographs being taken for my medical record, with optional separate consent for marketing below.",
    "I consent to the processing of my personal data in accordance with the clinic's privacy policy and understand I can withdraw consent at any time.",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Oral Analysis</p>
        <label className={`${labelClassName} mt-4`}>2. Are you currently under the care of a dentist or doctor?</label>
        <div className="flex gap-5 text-sm text-gray-200">
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareTeeth" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareTeeth" value="no" />No</label>
        </div>
        <label htmlFor="doctorCareTeethDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCareTeethDetails" name="doctorCareTeethDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {oralConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsTeeth" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsTeethDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea id="conditionsTeethDetails" name="conditionsTeethDetails" rows={3} className={`${inputClassName} resize-none`} />
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
        <label className={`${labelClassName} mt-4`}>6. Please tick all that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {contraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="contraTeeth" value={option} />
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
              <input className="mt-1" type="radio" name="treatmentTeeth" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="recentTeeth" className={`${labelClassName} mt-4`}>
          8. Have you had any dental/whitening treatment within the last 6 weeks?
        </label>
        <textarea id="recentTeeth" name="recentTeeth" rows={2} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>9. Date of scheduled appointment. *</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="appointmentTeethDate" name="appointmentTeethDate" type="date" defaultValue={nowDate} className={inputClassName} />
          <input id="appointmentTeethTime" name="appointmentTeethTime" type="time" defaultValue="09:00" className={inputClassName} />
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
            {teethWhiteningConsentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentTeeth" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>11. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoTeeth" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoTeeth" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoTeeth" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoTeeth" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          12. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsTeethClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signatureTeeth" className={`${labelClassName} mt-4`}>12. Customer&apos;s Signature</label>
        <input id="signatureTeeth" name="signatureTeeth" type="text" className={inputClassName} required />
        <label htmlFor="signatureDateTeeth" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureDateTeeth" name="signatureDateTeeth" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientTeeth" className={`${labelClassName} mt-4`}>13. Client&apos;s Name *</label>
        <input id="clientTeeth" name="clientTeeth" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsTeethEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureTeeth" className={`${labelClassName} mt-4`}>14. Employee&apos;s Signature</label>
        <input id="employeeSignatureTeeth" name="employeeSignatureTeeth" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateTeeth" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDateTeeth" name="employeeSignatureDateTeeth" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeeTeeth" className={`${labelClassName} mt-4`}>15. Employee&apos;s Name</label>
        <input id="employeeTeeth" name="employeeTeeth" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentTeeth" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentTeeth" name="assessmentTeeth" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="shadeBeforeTeeth" className={`${labelClassName} mt-4`}>Shade Before Treatment:</label>
        <input id="shadeBeforeTeeth" name="shadeBeforeTeeth" type="text" className={inputClassName} />
        <label htmlFor="shadeAfterTeeth" className={`${labelClassName} mt-4`}>Shade After Treatment:</label>
        <input id="shadeAfterTeeth" name="shadeAfterTeeth" type="text" className={inputClassName} />
        <label htmlFor="batchTeeth" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchTeeth" name="batchTeeth" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsTeeth" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsTeeth" name="unitsTeeth" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsTeeth" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsTeeth" name="postCommentsTeeth" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}

