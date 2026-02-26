const cannotProceedList = [
  "currently unwell or feverish",
  "sunburnt or recently tanned in the treatment area",
  "experiencing broken skin, cuts, abrasions, or open wounds",
  "experiencing an active skin infection or rash",
  "experiencing severe inflammation or irritation in the treatment area",
] as const;

const medicalSkinConditions = [
  "sensitive or highly reactive skin",
  "eczema, psoriasis, or dermatitis",
  "folliculitis or ingrown hair issues",
  "active acne on the body (back, chest, shoulders, etc.)",
  "hyperpigmentation or post-inflammatory marks",
  "diabetes or slow wound healing",
  "a history of skin lifting or adverse waxing reactions",
] as const;

const skincareRestrictions = [
  "using Roaccutane / Isotretinoin (within the last 6-12 months)",
  "using topical retinoids (tretinoin, adapalene, retinal, retinol) on the treatment area",
  "using AHAs, BHAs, PHAs, azelaic acid, or benzoyl peroxide on the treatment area",
  "using prescription acne or resurfacing treatments",
  "undergoing chemical peels, microneedling, laser, RF, or IPL on the body area within the last 2-4 weeks",
] as const;

const skinPreparationAvoidList = [
  "exfoliating scrubs, gloves, or body brushes",
  "retinol, acids, vitamin C, or active serums",
  "hair removal creams or shaving",
  "sun exposure, tanning, or fake tan",
  "perfumed or alcohol-based products",
  "heavy oils or occlusive creams",
] as const;

const hairLengthRequirementList = [
  "at least 1/4 inch in length (approximately the size of a grain of rice)",
  "not freshly shaved (allow 7-14 days of growth, depending on hair type and growth speed)",
] as const;

const onTheDayBeforeAppointmentList = [
  "Shower and cleanse the body area to be waxed",
  "Do not apply oils, lotions, SPF, deodorant, serums, or moisturisers to the treatment area",
  "Avoid heavy workouts, saunas, steam rooms, or heat exposure before your appointment",
  "Wear loose, comfortable clothing to reduce friction after treatment",
] as const;

const doNotAttendIfSkinFeelsList = [
  "sore or tender",
  "tight or over-exfoliated",
  "sunburnt or recently tanned",
  "irritated, inflamed, or broken",
] as const;

const treatmentExpectationList = [
  "a brief, sharp pulling sensation as the hair is removed",
  "warmth from the wax application",
  "temporary redness in the treated area",
  "mild swelling or sensitivity, particularly in delicate areas such as the underarms or bikini line",
] as const;

const estimatedTreatmentDurationList = [
  "Underarms: 10-15 minutes",
  "Half arms or half legs: 20-30 minutes",
  "Full arms or full legs: 30-45 minutes",
  "Bikini: 15-30 minutes (depending on type)",
  "Back or chest: 20-40 minutes",
  "Full body: 45-90 minutes",
] as const;

const aftercareAvoidList = [
  "hot showers, hot baths, saunas, steam rooms, or heat exposure",
  "intense exercise or heavy sweating",
  "swimming pools or hot tubs",
  "direct sun exposure, tanning, or fake tan",
  "touching, rubbing, or scratching the treated area",
  "tight or restrictive clothing over waxed areas",
  "deodorants, perfumes, or fragranced body products on sensitive freshly waxed areas",
  "active skincare products such as acids, retinol, or benzoyl peroxide on newly waxed skin",
] as const;

const commonExpectedEffectsList = [
  "redness",
  "warmth",
  "mild swelling",
  "tenderness or sensitivity",
  "small bumps or follicle irritation",
] as const;

const lessCommonEffectsList = [
  "bruising",
  "prolonged irritation",
  "ingrown hairs",
  "skin lifting (especially if the skin is thin, over-exfoliated, or sensitized)",
] as const;

const rareSeriousEffectsList = [
  "skin lifting or tearing",
  "blistering from overheated wax",
  "scarring",
  "post-inflammatory hyperpigmentation",
  "allergic reaction to wax or products used",
  "skin infection if bacteria enter compromised skin",
  "delayed healing when the skin barrier is already damaged",
] as const;

const whenToContactClinicList = [
  "severe pain",
  "increasing heat, pus, or swelling",
  "spreading redness or signs of infection",
  "blistering or significant skin lifting",
  "an allergic reaction (hives, itching, rash, or breathing difficulty)",
] as const;

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-200 md:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#D4AF37]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SignaturePanel({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/[0.03] p-4">
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          className="rounded-md border border-white/25 px-4 py-1.5 text-xs font-medium text-white/90"
        >
          Clear
        </button>
      </div>
      <textarea
        name={name}
        aria-label={label}
        rows={3}
        required={required}
        placeholder="Type full name to sign"
        className="w-full resize-none border-0 bg-transparent px-0 py-0 text-sm text-white placeholder:text-gray-500 outline-none"
      />
      <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-xs text-gray-400">
        <span>{label}</span>
        <span>Timestamp captured on sign</span>
      </div>
    </div>
  );
}

export default function GuidelinesWaxing() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#D4AF37]/20 bg-black/35 p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
          J Luxe Medical Aesthetics
        </p>
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.08em] text-white md:text-base">
          Body Waxing (Arms, Underarms, Legs, Bikini, Back, Chest &amp; Full Body)
        </p>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.08em] text-white md:text-base">
          Pre- &amp; Post-Treatment Guidelines
        </p>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">1. Treatment Overview</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <p>
            Body waxing is a professional hair-removal treatment that eliminates unwanted hair directly
            from the root using warm or hot wax. This method provides smoother skin for longer periods
            compared to shaving and supports cleaner, longer-lasting results with consistent treatments.
          </p>
          <p>
            Although body skin is generally thicker and more resilient than facial skin, waxing can still
            cause temporary sensitivity, redness, or irritation if the skin is not properly prepared or
            aftercare instructions are not followed. Proper screening, preparation, and post-treatment
            care are essential to minimize discomfort and protect the skin.
          </p>
          <p>
            Hair typically begins to regrow within 3-6 weeks, depending on individual hair growth cycles,
            hormones, and consistency of treatments.
          </p>
          <p>
            Body waxing is a temporary hair-removal method and does not provide permanent hair reduction.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">2. Medical &amp; Safety Requirements</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <p>
            You must disclose all relevant medical history, medications, skincare use, and recent
            treatments before your body waxing appointment.
          </p>
          <div>
            <p>Treatment cannot proceed if you are:</p>
            <BulletList items={cannotProceedList} />
          </div>
          <p>Waxing compromised skin increases the risk of lifting, burns, and delayed healing.</p>
          <div>
            <h3 className="font-semibold text-white">Medical &amp; Skin Conditions</h3>
            <p className="mt-3">Inform your therapist if you have:</p>
            <BulletList items={medicalSkinConditions} />
          </div>
          <p>Additional precautions or postponement may be required for safety.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">
          3. Medication &amp; Skincare Restrictions (CRITICAL)
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <div>
            <p>
              Body waxing <span className="font-semibold text-white">cannot</span> be performed if you are:
            </p>
            <BulletList items={skincareRestrictions} />
          </div>
          <p>
            These treatments thin and sensitize the skin, significantly increasing the risk of skin
            lifting, burns, and scarring.
          </p>
          <p>
            Discontinue all active or exfoliating body products on the treatment area{" "}
            <span className="font-semibold text-white">7-10 days before waxing</span>, unless advised
            otherwise by a medical professional.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">4. Skin Preparation</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <p>Healthy, calm skin is required for safe waxing.</p>
          <div>
            <p>For 72 hours before treatment, avoid:</p>
            <BulletList items={skinPreparationAvoidList} />
          </div>
          <p>Skin must be clean, intact, and irritation-free on the day of treatment.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">5. Hair Length Requirements</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <p>
            For effective and comfortable body waxing, hair must be long enough for the wax to
            properly adhere and remove it from the root.
          </p>
          <div>
            <p>Hair must be:</p>
            <BulletList items={hairLengthRequirementList} />
          </div>
          <p>
            Hair that is too short will not lift properly, which may result in incomplete removal,
            repeated passes, increased discomfort, and unnecessary skin irritation.
          </p>
          <p>
            Allowing adequate growth ensures cleaner results, fewer passes, and a more comfortable
            treatment.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">6. On the Day of Treatment Guide</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <p>
            For best results, arrive with clean, product-free skin in the treatment area.
          </p>
          <div>
            <p>Before your appointment:</p>
            <BulletList items={onTheDayBeforeAppointmentList} />
          </div>
          <div>
            <p>Do not attend your appointment if the skin feels:</p>
            <BulletList items={doNotAttendIfSkinFeelsList} />
          </div>
          <p>
            Waxing compromised skin increases the risk of lifting, bruising, and post-treatment
            irritation. If the skin is not healthy on the day, treatment may be postponed for safety.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">7. What to Expect During Treatment</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <div>
            <p>During body waxing, you may experience:</p>
            <BulletList items={treatmentExpectationList} />
          </div>
          <p>These reactions are normal and typically settle within a few hours.</p>
          <p>
            Body skin is generally thicker and less sensitive than facial skin, so most clients
            tolerate treatment well. However, areas with coarse hair or thinner skin (bikini, inner
            thighs, underarms) may feel more intense.
          </p>
          <p>Treatment is performed in sections for comfort and efficiency.</p>
          <div>
            <p className="font-semibold text-white">Estimated Treatment Duration:</p>
            <BulletList items={estimatedTreatmentDurationList} />
          </div>
          <p>Timing may vary depending on treatment area, hair growth, and comfort level.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">8. Aftercare Guide</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <div>
            <p className="font-semibold text-white">First 24-48 Hours</p>
            <p className="mt-2">
              Mild redness, warmth, and sensitivity may occur immediately after treatment and usually
              settle within 24-48 hours.
            </p>
          </div>
          <div>
            <p>During this period, avoid:</p>
            <BulletList items={aftercareAvoidList} />
          </div>
          <p>
            These activities can irritate freshly waxed skin and increase the risk of redness,
            ingrown hairs, and infection.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">9. Potential Risks &amp; Side Effects</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <p>
            All professional waxing treatments carry some degree of temporary skin reaction. Most
            effects are mild and short-lived.
          </p>
          <div>
            <p className="font-semibold text-white">Common (Expected and Temporary)</p>
            <BulletList items={commonExpectedEffectsList} />
            <p className="mt-3">These typically resolve within a few hours to 24 hours.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Less Common</p>
            <BulletList items={lessCommonEffectsList} />
            <p className="mt-3">
              These are more likely to occur when aftercare is not followed, the skin is sensitive,
              or active products were used before treatment.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Rare but Serious</p>
            <BulletList items={rareSeriousEffectsList} />
            <p className="mt-3">
              The likelihood of serious side effects is greatly reduced when treatment is performed on
              healthy skin and all contraindications are properly screened.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">
          10. Disclaimer &amp; When to Contact the Clinic
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-200 md:text-base">
          <p>
            Seek medical advice and contact the clinic if symptoms are unusual, severe, or persist
            beyond normal waxing reactions.
          </p>
          <div>
            <p>Contact the clinic promptly if you experience:</p>
            <BulletList items={whenToContactClinicList} />
          </div>
          <p>
            Early assessment and intervention help protect skin integrity and support proper healing.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <div className="space-y-8">
          <hr className="border-white/25" />
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-gray-200 md:text-base">
              1. Please sign below to confirm you&apos;ve read and understood the guide{" "}
              <span className="text-red-300">*</span>
            </p>
            <label className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="guidelinesWaxingElectronicClient" required />
              <span>
                I agree to use{" "}
                <span className="text-[#2ea5ff]">electronic records and signatures.</span>
              </span>
            </label>
            <SignaturePanel label="Customer Signature" name="guidelinesWaxingClientSignature" required />
            <label htmlFor="guidelinesWaxingClientName" className="block text-sm text-gray-200">
              Client&apos;s Name
            </label>
            <input
              id="guidelinesWaxingClientName"
              name="guidelinesWaxingClientName"
              type="text"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-gray-200 md:text-base">
              2. Please sign below to confirm the client has read and understood the guide
            </p>
            <label className="flex items-start gap-2 text-sm text-gray-200">
              <input className="mt-1" type="checkbox" name="guidelinesWaxingElectronicEmployee" />
              <span>
                I agree to use{" "}
                <span className="text-[#2ea5ff]">electronic records and signatures.</span>
              </span>
            </label>
            <SignaturePanel label="Employee Signature" name="guidelinesWaxingEmployeeSignature" />
            <p className="rounded-lg border border-[#2ea5ff]/20 bg-[#2ea5ff]/10 px-4 py-3 text-xs text-[#72c7ff]">
              Note: Customers will not see the employee signature field when filling form online.
            </p>
            <label htmlFor="guidelinesWaxingEmployeeName" className="block text-sm text-gray-200">
              Employee&apos;s Name
            </label>
            <input
              id="guidelinesWaxingEmployeeName"
              name="guidelinesWaxingEmployeeName"
              type="text"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>
          <hr className="border-white/25" />
        </div>
      </section>
    </div>
  );
}
