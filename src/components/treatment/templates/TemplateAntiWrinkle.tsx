import type { TemplateSectionProps } from "./TemplateSectionProps";

export default function TemplateAntiWrinkle({
  inputClassName,
  labelClassName,
  nowDate,
  consentStatements,
}: TemplateSectionProps) {
  const medicalConditionOptions = [
    "Allergies (including lidocaine, hyaluronic acid, hyaluronidase, latex)",
    "Pregnancy or breastfeeding",
    "Autoimmune or immune-compromised condition",
    "Neuromuscular disorder (for example myasthenia gravis or Eaton-Lambert syndrome)",
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

  const areaOfConcernOptions = [
    "Forehead",
    "Crow's feet",
    "Frown lines",
    "Bunny Lines",
    "Gummy Smile",
    "Lip Flip",
    "2 areas treatment (Forehead and frown line)",
    "3 areas treatment (forehead, frown line and crow's feet)",
    "Hyperhydrosis",
    "Nefertiti Neck Lift",
    "Bruxism (Teeth Grinding)",
    "Masseter (Jaw slimming)",
    "Sweaty palm",
    "High heel Tox/Sweaty feet",
    "Other",
  ] as const;

  const treatmentHistoryOptions = [
    "Anti-wrinkle injections in the past",
    "Dermal fillers in the past",
    "Skin boosters/mesotherapy in the past",
    "Laser or light-based treatment in the past 6 weeks",
    "Chemical peels or microneedling in the past 6 weeks",
    "Facial surgery or dental treatment in the past 6 weeks",
    "None of the above",
  ] as const;

  const absoluteContraindicationOptions = [
    "Pregnancy or breastfeeding",
    "Known allergy to botulinum toxin or formulation ingredients",
    "Active infection at the intended injection site",
    "Neuromuscular disease affecting muscle function",
    "None of the above",
  ] as const;

  const relativeContraindicationOptions = [
    "Recent aesthetic treatment in the same area",
    "History of severe bruising or bleeding disorder",
    "Use of anticoagulants or blood-thinning medication",
    "Active autoimmune flare-up",
    "Uncontrolled medical condition",
    "None of the above",
  ] as const;

  const currentProductsOptions = [
    "Retinol / Vitamin A",
    "AHA/BHA exfoliants",
    "Prescription acne treatment (for example isotretinoin)",
    "Anti-inflammatory or steroid medication",
    "Blood-thinning medication or supplements",
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
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="doctorCareAnti" value="yes" required />
            Yes
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="doctorCareAnti" value="no" />
            No
          </label>
        </div>
        <label htmlFor="doctorCareAntiDetails" className={`${labelClassName} mt-4`}>
          3. If &quot;Yes&quot; please specify
        </label>
        <textarea
          id="doctorCareAntiDetails"
          name="doctorCareAntiDetails"
          rows={3}
          className={`${inputClassName} resize-none`}
        />
        <label className={`${labelClassName} mt-4`}>
          4. Do you have any of the following conditions? Please answer truthfully, this ensures your treatment is safe and effective
        </label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditionOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="conditionsAnti" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="conditionsAntiDetails" className={`${labelClassName} mt-4`}>
          5. If &quot;Yes&quot; to any of these including current medication&quot; or &quot;Other Medical Condition&quot;, please specify
        </label>
        <textarea
          id="conditionsAntiDetails"
          name="conditionsAntiDetails"
          rows={3}
          className={`${inputClassName} resize-none`}
        />
        <label className={`${labelClassName} mt-4`}>6. Areas of concern (tick all that apply):</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {areaOfConcernOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="areasConcernAnti" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label htmlFor="areasConcernAntiOther" className={`${labelClassName} mt-4`}>
          7. If &quot;Other&quot; please specify
        </label>
        <input id="areasConcernAntiOther" name="areasConcernAntiOther" type="text" className={inputClassName} />
        <label className={`${labelClassName} mt-4`}>8. When is the appointment scheduled?</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            id="appointmentDateAnti"
            name="appointmentDateAnti"
            type="date"
            defaultValue={nowDate}
            className={inputClassName}
          />
          <input
            id="appointmentTimeAnti"
            name="appointmentTimeAnti"
            type="time"
            defaultValue="09:00"
            className={inputClassName}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Cosmetic Treatment History</p>
        <label className={`${labelClassName} mt-4`}>9. Please tick all that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {treatmentHistoryOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="historyAnti" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>10. If yes, please specify area and date</label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            id="historyAntiArea"
            name="historyAntiArea"
            type="text"
            className={inputClassName}
            placeholder="Area treated"
          />
          <input id="historyAntiDate" name="historyAntiDate" type="date" className={inputClassName} />
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Contraindication Check</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          Anti-wrinkle injections cannot be performed if any absolute contraindications apply, and may require
          postponement or additional precautions if relative contraindications are present. It is essential to answer
          all questions honestly to ensure safe and appropriate treatment.
        </p>
        <label className={`${labelClassName} mt-4`}>11. Please tick any that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {absoluteContraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="absoluteContraAnti" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>12. Please tick any that apply:</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {relativeContraindicationOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="relativeContraAnti" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <label className={`${labelClassName} mt-4`}>13. Are you currently on any of the following?</label>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {currentProductsOptions.map((option) => (
            <label key={option} className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="currentProductsAnti" value={option} />
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
          <legend className={labelClassName}>14. Client Consent (Mandatory) Please confirm each statement: *</legend>
          <div className="space-y-2 rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-gray-200">
            {consentStatements.map((item) => (
              <label key={item} className="flex items-start gap-2">
                <input className="mt-1" type="checkbox" name="consentAnti" value={item} required />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={`${labelClassName} mt-4`}>15. Photo & Marketing Consent. *</label>
        <div className="space-y-2 text-sm text-gray-200">
          <label className="flex items-start gap-2">
            <input type="checkbox" name="photoAnti" value="training-education" />
            <span>I consent to my photos being used anonymously for training or educational purposes.</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" name="photoAnti" value="social-marketing" />
            <span>I consent to my photos being used on social media/marketing.</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" name="photoAnti" value="medical-only" />
            <span>I do not consent to any use of my photos beyond my medical record.</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" name="photoAnti" value="email-updates" />
            <span>I consent to receive emails with offers and updates.</span>
          </label>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          16. Please sign and date to confirm that you have read, understood, and agree to the statements above. *
        </p>
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsAntiClient" required />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="customerSignatureAnti" className={`${labelClassName} mt-4`}>16. Customer&apos;s Signature</label>
        <input id="customerSignatureAnti" name="customerSignatureAnti" type="text" className={inputClassName} required />
        <label htmlFor="signatureDateAnti" className={`${labelClassName} mt-4`}>Signature Date</label>
        <input id="signatureDateAnti" name="signatureDateAnti" type="date" className={inputClassName} defaultValue={nowDate} />
        <label htmlFor="clientNameAnti" className={`${labelClassName} mt-4`}>17. Client&apos;s Name *</label>
        <input id="clientNameAnti" name="clientNameAnti" type="text" className={inputClassName} required />
        <label className="mt-4 flex items-start gap-2 text-sm text-gray-200">
          <input className="mt-1" type="checkbox" name="electronicRecordsAntiEmployee" />
          <span>I agree to use electronic records and signatures.</span>
        </label>
        <label htmlFor="employeeSignatureAnti" className={`${labelClassName} mt-4`}>18. Employee&apos;s Signature</label>
        <input id="employeeSignatureAnti" name="employeeSignatureAnti" type="text" className={inputClassName} />
        <label htmlFor="employeeSignatureDateAnti" className={`${labelClassName} mt-4`}>Employee Signature Date</label>
        <input
          id="employeeSignatureDateAnti"
          name="employeeSignatureDateAnti"
          type="date"
          className={inputClassName}
          defaultValue={nowDate}
        />
        <label htmlFor="employeeNameAnti" className={`${labelClassName} mt-4`}>19. Employee&apos;s Name *</label>
        <input id="employeeNameAnti" name="employeeNameAnti" type="text" className={inputClassName} />
        <p className="mt-3 text-xs text-gray-400">
          Note: Customers will not see the employee signature field when filling form online.
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#D4AF37]">Practitioner Notes (For Internal Use Only)</p>
        <label htmlFor="otherAreaAnti" className={`${labelClassName} mt-4`}>20. For &quot;Other&quot;, please specify area:</label>
        <textarea id="otherAreaAnti" name="otherAreaAnti" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="assessmentAnti" className={`${labelClassName} mt-4`}>Assessment:</label>
        <textarea id="assessmentAnti" name="assessmentAnti" rows={3} className={`${inputClassName} resize-none`} />
        <label htmlFor="batchAnti" className={`${labelClassName} mt-4`}>Batch Number & Expiry Date:</label>
        <textarea id="batchAnti" name="batchAnti" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="unitsAnti" className={`${labelClassName} mt-4`}>Treatment Given / Units Used:</label>
        <textarea id="unitsAnti" name="unitsAnti" rows={2} className={`${inputClassName} resize-none`} />
        <label htmlFor="postCommentsAnti" className={`${labelClassName} mt-4`}>Post-Treatment Comments:</label>
        <textarea id="postCommentsAnti" name="postCommentsAnti" rows={3} className={`${inputClassName} resize-none`} />
      </section>
    </>
  );
}
