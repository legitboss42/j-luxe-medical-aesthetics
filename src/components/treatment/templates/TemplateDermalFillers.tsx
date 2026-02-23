import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateDermalFillers({
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
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareFillers" value="yes" required />Yes</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="doctorCareFillers" value="no" />No</label>
        </div>
        <label htmlFor="doctorCareFillersDetails" className={`${labelClassName} mt-4`}>3. If &quot;Yes&quot; please specify</label>
        <textarea id="doctorCareFillersDetails" name="doctorCareFillersDetails" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="conditionsFillers" className={`${labelClassName} mt-4`}>4. Relevant conditions, allergies, medications</label>
        <textarea id="conditionsFillers" name="conditionsFillers" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="conditionsFillersDetails" className={`${labelClassName} mt-4`}>5. If yes, please specify</label>
        <textarea id="conditionsFillersDetails" name="conditionsFillersDetails" rows={3} className={`${inputClassName} resize-none`} />
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Treatment & History</p>
        <label htmlFor="treatmentFillers" className={`${labelClassName} mt-4`}>6. Treatment Selection - Please select the treatment you&apos;re booked for</label>
        <input id="treatmentFillers" name="treatmentFillers" type="text" className={inputClassName} />
        <label htmlFor="otherFillers" className={`${labelClassName} mt-4`}>7. If &quot;Other&quot; please specify</label>
        <input id="otherFillers" name="otherFillers" type="text" className={inputClassName} />
        <label htmlFor="appointmentFillers" className={`${labelClassName} mt-4`}>8. When is the appointment scheduled?</label>
        <input id="appointmentFillers" name="appointmentFillers" type="date" defaultValue={nowDate} className={inputClassName} />
        <label htmlFor="historyFillers" className={`${labelClassName} mt-4`}>9. Cosmetic treatment history (tick all that apply)</label>
        <textarea id="historyFillers" name="historyFillers" rows={3} className={`${inputClassName} resize-none`} />
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
        <label htmlFor="contraFillers" className={`${labelClassName} mt-4`}>11. Please tick any contraindications that apply</label>
        <textarea id="contraFillers" name="contraFillers" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="productsFillers" className={`${labelClassName} mt-4`}>12. Are you currently on any of the following?</label>
        <textarea id="productsFillers" name="productsFillers" rows={3} className={`${inputClassName} resize-none`} />
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Client&apos;s Consent (Mandatory)</p>
        <p className="mt-3 text-sm text-gray-300">
          Photographs are taken before and after treatment for medical documentation and client records.
        </p>
        <fieldset className="mt-4">
          <legend className={labelClassName}>13. Client Consent (Mandatory) Please confirm each statement</legend>
          <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-gray-200">
            {consentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentFillers" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>14. Photo & Marketing Consent</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFillers" value="training" /><span>I consent to anonymous training or educational use.</span></label>
          <label className="flex items-start gap-2"><input type="checkbox" name="photoFillers" value="medical-only" /><span>I do not consent beyond my medical record.</span></label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          15. Please sign and date to confirm that you have read, understood, and agree to the statements above.
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFillersClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="signatureFillers" className={`${labelClassName} mt-4`}>15. Customer&apos;s Signature</label>
        <input id="signatureFillers" name="signatureFillers" type="text" className={inputClassName} required />
        <label htmlFor="signatureFillersDate" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureFillersDate" name="signatureFillersDate" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientFillers" className={`${labelClassName} mt-4`}>16. Client&apos;s Name</label>
        <input id="clientFillers" name="clientFillers" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsFillersEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureFillers" className={`${labelClassName} mt-4`}>17. Employee&apos;s Signature</label>
        <input id="employeeSignatureFillers" name="employeeSignatureFillers" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateFillers" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input
          id="employeeSignatureDateFillers"
          name="employeeSignatureDateFillers"
          type="date"
          className={inputClassName}
          defaultValue={nowDate}
        />
        <label htmlFor="employeeFillers" className={`${labelClassName} mt-4`}>18. Employee&apos;s Name</label>
        <input id="employeeFillers" name="employeeFillers" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="otherAreaFillers" className={`${labelClassName} mt-4`}>19. For &quot;Other&quot;, please specify area</label>
        <textarea id="otherAreaFillers" name="otherAreaFillers" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="assessmentFillers" className={`${labelClassName} mt-4`}>Assessment</label>
        <textarea id="assessmentFillers" name="assessmentFillers" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchFillers" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date</label>
        <textarea id="batchFillers" name="batchFillers" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsFillers" className={`${labelClassName} mt-4`}>Treatment Given / Units Used</label>
        <textarea id="unitsFillers" name="unitsFillers" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsFillers" className={`${labelClassName} mt-4`}>Post-Treatment Comments</label>
        <textarea id="postCommentsFillers" name="postCommentsFillers" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}
