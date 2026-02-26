import type { TemplateSectionProps } from "./TemplateSectionProps";
import SignaturePadField from "./SignaturePadField";

export default function TemplateChemicalPeels({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
  const skinConcernOptions = [
    "Acne or congestion",
    "Hyperpigmentation or melasma",
    "Dull or uneven skin tone",
    "Rough texture or enlarged pores",
    "Fine lines and early ageing",
    "Sun damage or photodamage",
    "Back/chest/body texture concerns",
    "Active eczema, dermatitis, or rosacea",
    "Other medical condition",
    "None of the above",
  ] as const;

  const contraindicationOptions = [
    "Pregnancy or breastfeeding",
    "Active skin infection or cold sores in treatment area",
    "Open wounds, cuts, abrasions, or broken skin",
    "Sunburn or recently tanned skin",
    "Recent isotretinoin use",
    "Recent laser resurfacing or aggressive treatment",
    "History of severe post-inflammatory hyperpigmentation",
    "Keloid scarring tendency",
    "None of the above",
  ] as const;

  const treatmentSelectionOptions = [
    "Biorepeel Face",
    "Biorepeel Neck",
    "Biorepeel Decoletage",
    "Biorepeel Body",
    "Biorepeel (3 Sessions)",
    "PRX - T33 (Single)",
    "PRX - T33 (3 Sessions)",
  ] as const;

  return (
    <>
      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-base font-bold uppercase tracking-[0.12em] text-[#E7C97C]">Medical History & Skin Analysis</p>
        <label className={`${labelClassName} mt-4`}>2. Are you currently under the care of a doctor or dermatologist?</label>
        <div className="flex gap-5 text-base text-gray-200">
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCarePeel" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCarePeel" value="no" />No</label>
        </div>
        <label htmlFor="doctorCarePeelDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCarePeelDetails" name="doctorCarePeelDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {skinConcernOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-base text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsPeel" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsPeelDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea id="conditionsPeelDetails" name="conditionsPeelDetails" rows={3} className={`${inputClassName} resize-none`} />
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-base font-bold uppercase tracking-[0.12em] text-[#E7C97C]">Contraindication Check</p>
        <p className="mt-3 text-base leading-relaxed text-gray-300">
          Please read carefully. Some conditions listed below are absolute contraindications, meaning treatment cannot
          be carried out under any circumstances. Others are relative contraindications, meaning treatment may still
          be possible but requires adjustment, additional precautions, or postponing the procedure.
        </p>
        <p className="mt-3 text-base leading-relaxed text-gray-300">
          Declaring these honestly is essential to protect your safety, prevent complications, and ensure the
          practitioner can choose the safest and most effective treatment approach.
        </p>
        <label className={`${labelClassName} mt-4`}>6. Please tick all that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {contraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-base text-gray-200">
              <input className="mt-1" type="checkbox" name="contraPeel" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>
          7. Treatment Selection - Please select the treatment you&apos;re booked for:
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {treatmentSelectionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-base text-gray-200">
              <input className="mt-1" type="radio" name="treatmentPeel" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="recentPeel" className={`${labelClassName} mt-4`}>
          8. Have you had any aesthetic treatment (facials, microneedling, injectables, etc) within the last 6 weeks?
        </label>
        <textarea id="recentPeel" name="recentPeel" rows={2} className={`${inputClassName} resize-none`} />
        <label className={`${labelClassName} mt-4`}>9. Date of scheduled appointment. *</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input id="appointmentPeelDate" name="appointmentPeelDate" type="date" defaultValue={nowDate} className={inputClassName}  required/>
          <input id="appointmentPeelTime" name="appointmentPeelTime" type="time" defaultValue="09:00" className={inputClassName}  required/>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-base font-bold uppercase tracking-[0.12em] text-[#E7C97C]">Client&apos;s Consent (Mandatory)</p>
        <p className="mt-3 text-base text-gray-300">
          Photographs are taken before and after treatment for medical documentation and client records.
        </p>
        <fieldset className="mt-4">
          <legend className={labelClassName}>10. Client Consent (Mandatory) Please confirm each statement: *</legend>
          <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-base text-gray-200">
            {consentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentPeel" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>11. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-base text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPeel" value="training-education" /><span>I consent to my photos being used anonymously for training or educational purposes.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPeel" value="social-marketing" /><span>I consent to my photos being used on social media/marketing.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPeel" value="medical-only" /><span>I do not consent to any use of my photos beyond my medical record.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoPeel" value="email-updates" /><span>I consent to receive emails with offers and updates.</span></label>
        </div>
        <p className="mt-4 text-base text-gray-300">
          12. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-base text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsPeelClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signaturePeel" className={`${labelClassName} mt-4`}>12. Customer&apos;s Signature</label>
        <SignaturePadField id="signaturePeel" name="signaturePeel" label="Customer Signature" required />
        <label htmlFor="signatureDatePeel" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureDatePeel" name="signatureDatePeel" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientPeel" className={`${labelClassName} mt-4`}>13. Client&apos;s Name *</label>
        <input id="clientPeel" name="clientPeel" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-base text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsPeelEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignaturePeel" className={`${labelClassName} mt-4`}>14. Employee&apos;s Signature</label>
        <SignaturePadField id="employeeSignaturePeel" name="employeeSignaturePeel" label="Employee Signature" />
        <label htmlFor="employeeSignatureDatePeel" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input id="employeeSignatureDatePeel" name="employeeSignatureDatePeel" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="employeePeel" className={`${labelClassName} mt-4`}>15. Employee&apos;s Name</label>
        <input id="employeePeel" name="employeePeel" type="text" className={inputClassName} />
        <p className="mt-3 text-sm text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-base font-bold uppercase tracking-[0.12em] text-[#E7C97C]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentPeel" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentPeel" name="assessmentPeel" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchPeel" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchPeel" name="batchPeel" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsPeel" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsPeel" name="unitsPeel" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsPeel" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsPeel" name="postCommentsPeel" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}


