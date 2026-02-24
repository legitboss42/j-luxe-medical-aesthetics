import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateIvDrip({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
  const medicalConditionOptions = [
    "Allergies",
    "Pregnancy or breastfeeding",
    "Kidney disease",
    "Liver disease",
    "Heart disease",
    "High or low blood pressure",
    "Diabetes",
    "Thyroid disorder",
    "Bleeding or clotting disorder",
    "Current medications, supplements, or contraceptives (please list below)",
    "Other medical condition",
    "None of the above",
  ] as const;

  const contraindicationOptions = [
    "Active infection or fever",
    "Severe kidney impairment",
    "Severe heart failure or fluid overload condition",
    "Uncontrolled blood pressure",
    "Known allergy to infusion components",
    "Pregnancy or breastfeeding without clinical clearance",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Basic Hydration",
    "Multivitamin",
    "Multi-Mineral",
    "Energy",
    "Immunity",
    "Detox drip",
    "Detox drip (Double dose)",
    "Anti-aging drip",
    "High dose vitamin C",
    "Skin Brightening drip",
    "Weightloss drip",
    "Fitness drip",
    "Skin and hair drip",
    "NAD",
    "Myers Cocktail",
    "Other",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Wellness Analysis</p>
        <label className={`${labelClassName} mt-4`}>2. Are you currently under the care of a doctor or specialist?</label>
        <div className="flex gap-5 text-sm text-gray-200">
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareIv" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareIv" value="no" />No</label>
        </div>
        <label htmlFor="doctorCareIvDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCareIvDetails" name="doctorCareIvDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsIv" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsIvDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea id="conditionsIvDetails" name="conditionsIvDetails" rows={3} className={`${inputClassName} resize-none`} />
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
              <input className="mt-1" type="checkbox" name="contraIv" value={option} />
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
              <input className="mt-1" type="radio" name="treatmentIv" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="recentIv" className={`${labelClassName} mt-4`}>
          8. Have you had any IV infusion or injectable treatment within the last 6 weeks?
        </label>
        <textarea id="recentIv" name="recentIv" rows={2} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>9. Date of scheduled appointment. *</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="appointmentIvDate" name="appointmentIvDate" type="date" defaultValue={nowDate} className={inputClassName} />
          <input id="appointmentIvTime" name="appointmentIvTime" type="time" defaultValue="09:00" className={inputClassName} />
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
                <input className="mt-1" type="checkbox" name="consentIv" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>11. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoIv" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoIv" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoIv" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoIv" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          12. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsIvClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signatureIv" className={`${labelClassName} mt-4`}>12. Customer&apos;s Signature</label>
        <input id="signatureIv" name="signatureIv" type="text" className={inputClassName} required />
        <label htmlFor="signatureDateIv" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureDateIv" name="signatureDateIv" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientIv" className={`${labelClassName} mt-4`}>13. Client&apos;s Name *</label>
        <input id="clientIv" name="clientIv" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsIvEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureIv" className={`${labelClassName} mt-4`}>14. Employee&apos;s Signature</label>
        <input id="employeeSignatureIv" name="employeeSignatureIv" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateIv" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDateIv" name="employeeSignatureDateIv" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeeIv" className={`${labelClassName} mt-4`}>15. Employee&apos;s Name *</label>
        <input id="employeeIv" name="employeeIv" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentIv" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentIv" name="assessmentIv" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchIv" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchIv" name="batchIv" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsIv" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsIv" name="unitsIv" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsIv" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsIv" name="postCommentsIv" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}
