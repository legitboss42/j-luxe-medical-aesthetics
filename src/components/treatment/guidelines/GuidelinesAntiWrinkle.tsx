import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const medicalSafetyItems = [
  "You are pregnant, planning pregnancy, or breastfeeding.",
  "You have a neuromuscular condition or history of swallowing or breathing disorders.",
  "You have an active skin infection, inflammation, or open wound in the treatment area.",
  "You have had botulinum toxin treatment very recently (typically within the last 12 weeks).",
  "You are currently unwell, feverish, or recovering from acute infection.",
  "You have a known allergy to botulinum toxin or any treatment component.",
] as const;

const preTreatmentItems = [
  "Avoid alcohol for at least 24 hours before treatment.",
  "Avoid intense exercise on treatment day before your appointment.",
  "If medically safe and approved by your prescribing clinician, avoid blood-thinning supplements and anti-inflammatory medication for 24-48 hours to reduce bruising risk.",
  "Avoid facials, peels, or aggressive exfoliation on the treatment area for at least 48 hours before treatment.",
  "Arrive with clean skin and minimal or no makeup where possible.",
] as const;

const immediateAftercareItems = [
  "Remain upright for at least 4 hours after treatment.",
  "Do not rub, massage, or apply pressure to treated areas for 24 hours.",
  "Avoid gym sessions, heavy lifting, saunas, steam rooms, and hot yoga for 24 hours.",
  "Avoid alcohol for 24 hours after treatment.",
  "Avoid facials, massage, microneedling, laser, or RF in treated areas for 7-14 days unless advised otherwise.",
] as const;

const expectedEffects = [
  "Mild redness, tenderness, or pinpoint bumps at injection points.",
  "Mild bruising or short-lived headache.",
  "A feeling of tightness in treated muscles as product settles.",
] as const;

const uncommonEffects = [
  "Temporary asymmetry while product is settling.",
  "Heavier brow or eyelid if product migrates.",
  "Transient dry eye or forehead heaviness.",
] as const;

const ongoingAftercareItems = [
  "Continue avoiding direct pressure, aggressive facials, and high-heat treatments on treated areas for up to 7-14 days unless advised otherwise.",
  "Use gentle skincare and daily SPF while skin settles.",
  "Attend your scheduled 10-14 day review so final muscle response can be assessed safely.",
] as const;

const potentialRiskItems = [
  "Bruising, swelling, headache, or temporary heaviness in treated areas.",
  "Asymmetry requiring follow-up adjustment.",
  "Ptosis (drooping) if product diffuses into adjacent muscles.",
  "Rare systemic spread symptoms requiring urgent assessment.",
] as const;

const urgentRedFlags = [
  "Difficulty breathing, speaking, or swallowing.",
  "Widespread rash, facial swelling, or signs of severe allergy.",
  "Severe or worsening weakness away from the treatment area.",
  "Visual disturbance or severe persistent headache with neurological symptoms.",
] as const;

export default function GuidelinesAntiWrinkle() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Botulinum Toxin"
        title="Anti-Wrinkle Pre & Post-Treatment Guidelines"
        summary="This guide applies to anti-wrinkle treatment areas including forehead, frown lines, crow's feet, bunny lines, lip flip, gummy smile, masseter/bruxism, neck lift, and hyperhidrosis protocols."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          Anti-wrinkle treatment uses prescription botulinum toxin to reduce excessive muscle
          contraction and soften dynamic lines. Treatment is tailored to facial anatomy, muscle activity,
          and your clinical goals.
        </p>
        <p>
          Results are not immediate. Most clients begin to notice changes in 3-5 days, with full effect
          typically visible at 10-14 days. Longevity is commonly around 3-4 months depending on treatment
          area and individual metabolism.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>
          Safe treatment depends on accurate disclosure of your medical history, current medications, and
          recent treatments.
        </p>
        <p>Treatment may be postponed or declined if any of the following apply:</p>
        <GuidelinesBulletList items={medicalSafetyItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <p>For lower bruising risk and better treatment precision, follow these steps before your appointment:</p>
        <GuidelinesBulletList items={preTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment & What to Expect">
        <p>
          Your practitioner will assess facial movement, treatment history, and suitability before
          injection. Marking and dosing are tailored for balanced, natural movement.
        </p>
        <p>
          Treatment itself is usually brief, with multiple small injections in selected points. Mild
          stinging is normal and usually settles quickly.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care (First 24-48 Hours)">
        <p>To reduce migration risk and support a clean treatment outcome:</p>
        <GuidelinesBulletList items={immediateAftercareItems} />
        <p>
          If advised by your practitioner, perform prescribed facial movement exercises after treatment.
          Do not self-massage treated areas.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <p className="font-semibold text-white">Common and temporary:</p>
        <GuidelinesBulletList items={expectedEffects} compact />
        <p className="font-semibold text-white">Less common:</p>
        <GuidelinesBulletList items={uncommonEffects} compact />
        <p>
          A formal review is often scheduled around day 10-14 to assess final effect and determine if
          refinement is clinically appropriate.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-14)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <p>Although treatment is generally well tolerated in suitable clients, risks include:</p>
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic Urgently">
        <p>Contact J Luxe immediately if you experience any red-flag symptoms:</p>
        <GuidelinesBulletList items={urgentRedFlags} />
        <p>
          Early review allows prompt support and helps prevent progression of uncommon complications.
        </p>
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesAntiWrinkle" />
    </div>
  );
}
