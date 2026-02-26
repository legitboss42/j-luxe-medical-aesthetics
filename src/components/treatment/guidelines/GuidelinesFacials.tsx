import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import { GuidelinesSignatureSection } from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const techniquesIncluded = [
  "Double cleansing",
  "Controlled exfoliation (enzyme, chemical, or mechanical)",
  "Manual or tool-assisted extractions",
  "Hydration infusion",
  "Lymphatic drainage",
  "LED therapy",
  "Steam therapy",
  "Mild resurfacing",
  "Oxygenation or peptide/HA infusion",
] as const;

const medicalSafetyItems = [
  "You are on Roaccutane/Isotretinoin (must be off for 6 months)",
  "You have used steroid creams on your face recently",
  "You have had chemical peels, microneedling, or laser in the last 7-14 days",
  "You have a cold sore, active acne flare, rash, cuts, or open wounds",
  "You have recently started or changed medication",
  "You are pregnant or breastfeeding (certain acids may be excluded)",
  "You have had Botox or filler in the last 2 weeks",
  "You have allergies to skincare ingredients",
  "You have an active skin condition (eczema/psoriasis/dermatitis) in the area",
  "You have had sunburn in the last week",
] as const;

const skincarePrepAvoidItems = [
  "Retinol or retinoids",
  "AHA/BHA acids (glycolic, lactic, mandelic, salicylic)",
  "Strong exfoliants or scrubs",
  "Benzoyl peroxide",
  "Hydroquinone",
  "Tretinoin",
  "At-home chemical peels",
] as const;

const skincarePrepNotes = [
  "No tanning or sun exposure 7 days before",
  "Must avoid alcohol 24 hours before",
  "Must disclose any illness, medication changes, or antibiotics",
  "Must avoid scheduling treatment right before an important event if downtime is expected",
  "Avoid facial waxing, threading, or hair removal cream before treatment",
] as const;

const lifestyleRestrictionItems = [
  "Steam rooms, saunas, jacuzzis, hot yoga",
  "Excess alcohol (dehydrates skin)",
  "Smoking/vaping (reduces glow)",
  "Excess caffeine if you suffer from sensitivity",
  "Heavy exercise right before your treatment",
  "Direct sun exposure or tanning",
] as const;

const arriveWithItems = [
  "A clean face (no makeup if possible)",
  "Comfortable clothing",
  "Hair tied away from the face",
] as const;

const expectDuringAppointmentItems = [
  "Assessment of your skin",
  "Review of form, sensitivities or allergies",
  "A customized plan tailored to your skin condition",
  "Possible temporary tingling, coolness, or warmth",
  "Extractions (if included)",
  "Immediate visible glow",
] as const;

const postTreatmentExpectedItems = [
  "Redness, flushing or warmth",
  "More radiant skin within 24-72 hours",
  "Tightness or fresh sensation",
  "Dryness/flaking/peeling if exfoliation, enzymes or chemical peel were used",
  "Increased sensitivity especially around extraction sites",
  "Temporary breakouts or purging",
  "Temporary swelling",
  "Risk of hyperpigmentation",
  "Bruising (especially microneedling/PRP)",
  "Discomfort",
  "Infection if aftercare not followed",
  "Unsuitable results if pre-care instructions not followed",
] as const;

const first24HoursItems = [
  "Keep your hands off your face, avoid touching, rubbing, or scratching.",
  "Do not apply makeup for at least 24 hours.",
  "Avoid sweating, heat, gym, sauna, steam rooms, hot showers or swimming pool.",
  "Avoid harsh lighting, strong winds, or dusty environments.",
  "Do not use exfoliants, acids, retinols, benzoyl peroxide, or clay masks.",
  "No heavy creams, oils, or new skincare products.",
  "Only use a gentle cleanser and a light hydrating serum/gel.",
  "Avoid sun exposure, stay indoors as much as possible.",
  "No picking or squeezing any areas that were extracted.",
  "No facial waxing, shaving, or dermaplaning.",
  "No swimming, chlorine, or spa environments.",
  "Avoid alcohol; it increases inflammation and dehydration.",
] as const;

const dayTwoToSevenItems = [
  "Continue with gentle skincare only.",
  "Introduce SPF daily (minimum SPF 30).",
  "Avoid retinol, acids, scrubs, exfoliants for 3-5 days.",
  "Avoid self-tan on the face.",
  "Avoid at-home extraction tools.",
  "Hydration, hydration, hydration, water + hydrating serums.",
  "If light flaking occurs, do NOT peel it off.",
  "Avoid direct sun exposure and wear a hat outdoors.",
] as const;

const redFlagItems = [
  "Severe or worsening redness",
  "Increasing burning or unusual pain",
  "Spreading rash or hives",
  "Sudden facial swelling (especially around the eyes or lips)",
  "Yellow crusting or discharge (signs of infection)",
  "Pus-filled lesions",
  "Persistent heat in the treated area",
  "Blistering or significant peeling",
  "Persistent headache or fever",
] as const;

function BulletList({ items, compact = false }: { items: readonly string[]; compact?: boolean }) {
  return (
    <ul className={`${compact ? "space-y-1.5" : "space-y-2"} mt-3 text-base leading-relaxed text-gray-200 md:text-lg`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#D4AF37]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function GuidelinesFacials() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Facial Treatments"
        title="Facial Pre & Post Treatment Guidelines"
        summary="This guide covers all facial treatments, including Express, Glow, Classic, Hydrofacial, Dermaplaning, Microdermabrasion, Acne, Anti-Ageing, Luxury, Microcurrent, Vampire/PRP, Back Facials and more."
      />

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold uppercase text-white md:text-xl">Introduction</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p>
            Your skin deserves precision, not guesswork. Each J Luxe experience is built on advanced
            clinical techniques that rejuvenate the skin at different depths for visible, long-lasting
            results.
          </p>
          <p>
            These Pre &amp; Post treatment Guidelines ensure your skin is properly prepared before your
            appointment and supported afterwards. Following them closely helps protect your skin barrier,
            reduces complications, enhances your results, and protects the integrity of your skin
            regardless of the treatment booked.
          </p>
          <p>
            Every step in this guide exists for a reason: to keep you safe and to ensure the outcome
            reflects the high standard of J Luxe Medical Aesthetics. Please read carefully and inform
            your practitioner of any changes to your health, skincare, or medications prior to treatment.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <div className="space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p>
            Facial treatments are professional targeted skin therapies designed to deep-cleanse,
            exfoliate, hydrate, and re-balance the skin barrier. Depending on the treatment chosen,
            this may include:
          </p>
          <BulletList items={techniquesIncluded} compact />
          <p>
            Each technique works to remove impurities, boost circulation, enhances product penetration,
            support cellular turnover, and strengthen the skin barrier. Results continue to develop for
            24-72 hours as the skin settles, re-balances and re-hydrates.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">Medical &amp; Safety Requirements</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p>You MUST inform J Luxe Medical Aesthetics before your appointment if:</p>
          <BulletList items={medicalSafetyItems} compact />
          <p>If any contraindication is present, treatment may be rescheduled for your safety.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">Skincare Preparation (IMPORTANT)</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p className="font-semibold text-white">Avoid for 5-7 days before your facial:</p>
          <BulletList items={skincarePrepAvoidItems} compact />
          <BulletList items={skincarePrepNotes} compact />
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">Lifestyle Restrictions</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p className="font-semibold text-white">Avoid for 24-48 hours before your facial:</p>
          <BulletList items={lifestyleRestrictionItems} compact />
          <p>
            Drink <span className="font-semibold text-white">at least 1.5-2 litres of water</span> the
            day before and the day of treatment.
          </p>
          <p>
            Eat a light meal before your appointment, low blood sugar increases fainting risk.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">On the Day of Treatment</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p className="font-semibold text-white">Please arrive with:</p>
          <BulletList items={arriveWithItems} compact />

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="font-semibold text-white">Expect During Your Appointment:</h3>
            <BulletList items={expectDuringAppointmentItems} compact />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="font-semibold text-white">Treatment Duration:</p>
            <p className="mt-2">Depending on facial type.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">
          What to Expect Post Treatment (This include risks and side effects)
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p>Please note that some of these reactions are normal and expected:</p>
          <BulletList items={postTreatmentExpectedItems} compact />
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">Immediately After Treatment - First 24 Hours</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <BulletList items={first24HoursItems} compact />
          <p>Reason: your skin barrier is temporarily more porous and reactive.</p>
          <p>Results take time. Consistent skincare routine and multiple sessions advised.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">Day 2-7</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p>This is the skin-calming and repairing phase.</p>
          <BulletList items={dayTwoToSevenItems} compact />
          <p>
            If LED was applied, the skin should continue improving over the week.
          </p>
          <p>
            If deep extractions were done, mild purging may occur for 2-5 days.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/12 bg-black/35 p-5 md:p-6">
        <h2 className="text-lg font-bold text-white md:text-xl">Disclaimers &amp; When to Contact the Clinic</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-200 md:text-lg">
          <p>
            Results vary depending on skin type, lifestyle, hormones, and the consistency of your
            homecare routine.
          </p>
          <p>
            Purging may occur after certain treatments and is not considered an adverse reaction unless
            it is accompanied by heat, swelling, spreading inflammation, or increasing pain.
          </p>
          <p>
            Strict adherence to aftercare is essential to achieve optimal results and reduce the risk of
            complications.
          </p>

          <div className="pt-2">
            <h3 className="font-semibold text-white">When to Contact J Luxe (Red Flags)</h3>
            <p className="mt-2">
              Seek urgent advice <span className="font-semibold text-white">immediately</span> if you
              experience:
            </p>
            <BulletList items={redFlagItems} compact />
          </div>

          <p className="font-semibold text-white">
            Serious reactions are rare, but early intervention prevents escalation.
          </p>
          <p>
            Early assessment and intervention help protect skin integrity and support proper healing.
          </p>
        </div>
      </section>

      <GuidelinesSignatureSection prefix="guidelinesFacial" />
    </div>
  );
}
