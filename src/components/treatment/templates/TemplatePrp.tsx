import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplatePrp({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
  const medicalConditionOptions = [
    "Allergies",
    "Pregnancy or breastfeeding",
    "Autoimmune or immune-compromised condition",
    "Blood clotting disorder",
    "Platelet disorder or severe anaemia",
    "Current skin/scalp infection",
    "History of keloid or hypertrophic scarring",
    "Current medications, supplements, or contraceptives (please list below)",
    "Other medical condition",
    "None of the above",
  ] as const;

  const contraindicationOptions = [
    "Active skin or scalp infection in treatment area",
    "Open wounds, cuts, abrasions, or broken skin",
    "Pregnancy or breastfeeding",
    "Severe blood disorder or platelet dysfunction",
    "Current anticoagulant therapy without clearance",
    "Recent aggressive treatment in same area",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Eyes",
    "Face",
    "Neck",
    "Decollatage",
    "Face and Neck",
    "Face, Neck and Decollatage",
    "Hair (1 session)",
    "Hair + Biotin (1 session)",
    "Other",
  ] as const;

  const goalOptions = [
    "Texture and glow",
    "Fine lines and skin quality",
    "Under-eye rejuvenation",
    "Neck/chest rejuvenation",
    "Scalp support",
    "Hair density support",
    "Other",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Skin Analysis</p>
        <label className={`${labelClassName} mt-4`}>2. Are you currently under the care of a doctor or dermatologist?</label>
        <div className="flex gap-5 text-sm text-gray-200">
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCarePrp" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCarePrp" value="no" />No</label>
        </div>
        <label htmlFor="doctorCarePrpDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCarePrpDetails" name="doctorCarePrpDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsPrp" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsPrpDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea id="conditionsPrpDetails" name="conditionsPrpDetails" rows={3} className={`${inputClassName} resize-none`} />
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
              <input className="mt-1" type="checkbox" name="contraPrp" value={option} />
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
              <input className="mt-1" type="radio" name="treatmentPrp" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>8. What would you most like to improve?</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {goalOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="radio" name="goalPrp" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>9. Date of scheduled appointment. *</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="appointmentPrpDate" name="appointmentPrpDate" type="date" defaultValue={nowDate} className={inputClassName} />
          <input id="appointmentPrpTime" name="appointmentPrpTime" type="time" defaultValue="09:00" className={inputClassName} />
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
            {consentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentPrp" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>11. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPrp" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPrp" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPrp" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPrp" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          12. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsPrpClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signaturePrp" className={`${labelClassName} mt-4`}>12. Customer&apos;s Signature</label>
        <input id="signaturePrp" name="signaturePrp" type="text" className={inputClassName} required />
        <label htmlFor="signatureDatePrp" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureDatePrp" name="signatureDatePrp" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientPrp" className={`${labelClassName} mt-4`}>13. Client&apos;s Name *</label>
        <input id="clientPrp" name="clientPrp" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsPrpEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignaturePrp" className={`${labelClassName} mt-4`}>14. Employee&apos;s Signature</label>
        <input id="employeeSignaturePrp" name="employeeSignaturePrp" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDatePrp" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDatePrp" name="employeeSignatureDatePrp" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeePrp" className={`${labelClassName} mt-4`}>15. Employee&apos;s Name</label>
        <input id="employeePrp" name="employeePrp" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentPrp" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentPrp" name="assessmentPrp" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchPrp" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchPrp" name="batchPrp" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsPrp" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsPrp" name="unitsPrp" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsPrp" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsPrp" name="postCommentsPrp" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}

