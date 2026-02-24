import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateBodySculpting({
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
    "Pregnancy or breastfeeding",
    "Open wounds, cuts, abrasions, or broken skin",
    "Active skin infection in treatment area",
    "Severe inflammation, swelling, or skin irritation",
    "Uncontrolled diabetes or severe cardiovascular condition",
    "Bleeding or clotting disorders",
    "Recent surgery in treatment area",
    "History of severe keloid scarring",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Wood Therapy (45 mins)",
    "Slimming and Cellulite Reduction (60 mins)",
    "Snatched and Contoured (45 mins)",
    "Advanced Cavitation (60 mins)",
    "RF (60 mins)",
    "Vacuum (60 mins)",
    "Laser Pad (60 mins)",
    "Body Sculpting Fusion (90 mins)",
    "Post Op care & Manual (60 mins)",
    "Skin tightening radio-frequency",
    "Laser Lipo Pads",
    "Lymphatic Drainage Massage",
    "Lemon Bottle",
    "Aqualyx",
    "Electrical Muscle Stimulation (EMS)",
    "Other",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Medical History & Skin Analysis</p>
        <label className={`${labelClassName} mt-4`}>
          2. Are you currently under the care of a doctor or dermatologist?
        </label>
        <div className="flex gap-5 text-sm text-gray-200">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="doctorCareBody" value="yes" required />
            Yes
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="doctorCareBody" value="no" />
            No
          </label>
        </div>
        <label htmlFor="doctorCareBodyDetails" className={`${labelClassName} mt-4`}>
          3. If &quot;Yes&quot; please specify
        </label>
        <textarea
          id="doctorCareBodyDetails"
          name="doctorCareBodyDetails"
          rows={3}
          className={`${inputClassName} resize-none`}
        />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsBody" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsBodyDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication&quot; or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea id="conditionsBodyDetails" name="conditionsBodyDetails" rows={3} className={`${inputClassName} resize-none`} />
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
              <input className="mt-1" type="checkbox" name="contraBody" value={option} />
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
              <input className="mt-1" type="radio" name="treatmentBody" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="recentBody" className={`${labelClassName} mt-4`}>
          8. Have you had any aesthetic treatment (facials, microneedling, injectables, etc) within the last 6 weeks?
        </label>
        <textarea id="recentBody" name="recentBody" rows={2} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>9. When is this appointment scheduled?</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="appointmentBodyDate" name="appointmentBodyDate" type="date" defaultValue={nowDate} className={inputClassName} />
          <input id="appointmentBodyTime" name="appointmentBodyTime" type="time" defaultValue="09:00" className={inputClassName} />
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
                <input className="mt-1" type="checkbox" name="consentBody" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>11. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoBody" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoBody" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoBody" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoBody" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          12. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsBodyClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="customerSignatureBody" className={`${labelClassName} mt-4`}>12. Customer&apos;s Signature</label>
        <input id="customerSignatureBody" name="customerSignatureBody" type="text" className={inputClassName} required />
        <label htmlFor="signatureDateBody" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureDateBody" name="signatureDateBody" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientNameBody" className={`${labelClassName} mt-4`}>13. Client&apos;s Name *</label>
        <input id="clientNameBody" name="clientNameBody" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsBodyEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureBody" className={`${labelClassName} mt-4`}>14. Employee&apos;s Signature</label>
        <input id="employeeSignatureBody" name="employeeSignatureBody" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateBody" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDateBody" name="employeeSignatureDateBody" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeeNameBody" className={`${labelClassName} mt-4`}>15. Employee&apos;s Name</label>
        <input id="employeeNameBody" name="employeeNameBody" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentBody" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentBody" name="assessmentBody" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchBody" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchBody" name="batchBody" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsBody" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsBody" name="unitsBody" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsBody" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsBody" name="postCommentsBody" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}

