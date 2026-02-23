import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateFacials({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
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
        <label htmlFor="facialConditions" className={`${labelClassName} mt-4`}>4. Relevant conditions or skin concerns</label>
        <textarea id="facialConditions" name="facialConditions" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="facialConditionsDetails" className={`${labelClassName} mt-4`}>5. If yes, please specify</label>
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
        <label htmlFor="facialContra" className={`${labelClassName} mt-4`}>6. Please tick any that apply</label>
        <textarea id="facialContra" name="facialContra" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="facialTreatment" className={`${labelClassName} mt-4`}>7. Treatment Selection - Please select the treatment you&apos;re booked for</label>
        <input id="facialTreatment" name="facialTreatment" type="text" className={inputClassName} />
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
        <label htmlFor="fitzpatrickFacial" className={`${labelClassName} mt-4`}>10. Select the option that best describes your skin</label>
        <select id="fitzpatrickFacial" name="fitzpatrickFacial" className={inputClassName} defaultValue="">
          <option value="">Select</option>
          <option value="Type I">Type I</option>
          <option value="Type II">Type II</option>
          <option value="Type III">Type III</option>
          <option value="Type IV">Type IV</option>
          <option value="Type V">Type V</option>
          <option value="Type VI">Type VI</option>
        </select>
        <label htmlFor="facialGoals" className={`${labelClassName} mt-4`}>11. What would you most like to improve?</label>
        <input id="facialGoals" name="facialGoals" type="text" className={inputClassName} />
        <label htmlFor="facialAppointment" className={`${labelClassName} mt-4`}>12. When is this appointment scheduled?</label>
        <input id="facialAppointment" name="facialAppointment" type="date" defaultValue={nowDate} className={inputClassName} />
        <label htmlFor="facialRecentTreatment" className={`${labelClassName} mt-4`}>13. Have you had any aesthetic treatment within the last 6 weeks?</label>
        <textarea id="facialRecentTreatment" name="facialRecentTreatment" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="facialRoutine" className={`${labelClassName} mt-4`}>14. Do you have a skincare routine?</label>
        <textarea id="facialRoutine" name="facialRoutine" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="facialProducts" className={`${labelClassName} mt-4`}>15. Are you currently on any of the following?</label>
        <textarea id="facialProducts" name="facialProducts" rows={2} className={`${inputClassName} resize-none`} />
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Client&apos;s Consent (Mandatory)</p>
        <p className="mt-3 text-sm text-gray-300">
          Photographs are taken before and after treatment for medical documentation and client records.
        </p>
        <fieldset className="mt-4">
          <legend className={labelClassName}>16. Client Consent (Mandatory) Please confirm each statement</legend>
          <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-gray-200">
            {consentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentFacial" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>17. Photo & Marketing Consent</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFacial" value="training" /><span>I consent to anonymous training or educational use.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFacial" value="medical-only" /><span>I do not consent beyond my medical record.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          18. Please sign and date to confirm that you have read, understood, and agree to the statements above.
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFacialClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signatureFacial" className={`${labelClassName} mt-4`}>18. Customer&apos;s Signature</label>
        <input id="signatureFacial" name="signatureFacial" type="text" className={inputClassName} required />
        <label htmlFor="signatureFacialDate" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureFacialDate" name="signatureFacialDate" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientFacial" className={`${labelClassName} mt-4`}>19. Client&apos;s Name</label>
        <input id="clientFacial" name="clientFacial" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFacialEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureFacial" className={`${labelClassName} mt-4`}>20. Employee&apos;s Signature</label>
        <input id="employeeSignatureFacial" name="employeeSignatureFacial" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateFacial" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input
          id="employeeSignatureDateFacial"
          name="employeeSignatureDateFacial"
          type="date"
          className={inputClassName}
          defaultValue={nowDate}
        />
        <label htmlFor="employeeFacial" className={`${labelClassName} mt-4`}>21. Employee&apos;s Name</label>
        <input id="employeeFacial" name="employeeFacial" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="assessmentFacial" className={`${labelClassName} mt-4`}>Assessment</label>
        <textarea id="assessmentFacial" name="assessmentFacial" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchFacial" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date</label>
        <textarea id="batchFacial" name="batchFacial" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsFacial" className={`${labelClassName} mt-4`}>Treatment Given / Units Used</label>
        <textarea id="unitsFacial" name="unitsFacial" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsFacial" className={`${labelClassName} mt-4`}>Post-Treatment Comments</label>
        <textarea id="postCommentsFacial" name="postCommentsFacial" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}
