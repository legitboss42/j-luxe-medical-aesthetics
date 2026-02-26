import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const safetyItems = [
  "You are pregnant, planning pregnancy, or breastfeeding.",
  "You have active acne, cold sores, skin infection, or inflammation in the treatment area.",
  "You have had recent dental infection, dental treatment, or systemic infection.",
  "You have an autoimmune flare, are acutely unwell, or recently started high-risk medication.",
  "You have known allergy to hyaluronic acid filler components or local anaesthetic ingredients.",
  "You have had recent filler treatment in the same area and full review is still pending.",
] as const;

const preTreatmentItems = [
  "If medically safe and approved by your prescribing clinician, avoid blood-thinning supplements or anti-inflammatory medication for 48 hours to reduce bruising risk.",
  "Avoid alcohol for at least 24 hours pre-treatment.",
  "Avoid facials, peels, waxing, or aggressive exfoliation in treatment areas for 3-5 days before treatment.",
  "Avoid scheduling major dental treatment close to filler appointments unless discussed with your practitioner.",
  "Attend with clean skin and no heavy makeup where possible.",
] as const;

const aftercareFirst48Hours = [
  "Do not rub, press, or massage treated areas unless specifically instructed.",
  "Avoid intense exercise, saunas, steam rooms, and hot environments for 24-48 hours.",
  "Avoid alcohol for 24 hours post-treatment.",
  "Avoid makeup over puncture points for at least 12 hours.",
  "Sleep on your back with your head elevated the first night where possible.",
  "Avoid facials, laser, RF, and other aesthetic treatments on the area for around 2 weeks unless cleared.",
] as const;

const expectedEffects = [
  "Mild swelling, tenderness, redness, or bruising for several days.",
  "Temporary firmness while filler settles.",
  "Area-dependent swelling (especially lips) that may peak in the first 24-72 hours.",
] as const;

const ongoingAftercareItems = [
  "Continue gentle handling of treated areas for up to 14 days.",
  "Delay facials, dental treatment, and pressure-heavy treatments in the same area until reviewed if advised.",
  "Hydrate well and monitor asymmetry only after swelling settles.",
] as const;

const potentialRiskItems = [
  "Persistent swelling, bruising, nodules, or delayed inflammatory reaction.",
  "Asymmetry, over/under-correction, or contour irregularity.",
  "Infection or delayed healing at injection sites.",
  "Vascular compromise (rare but serious) requiring immediate intervention.",
] as const;

const urgentRedFlags = [
  "Severe or increasing pain not improving with time.",
  "Skin blanching, mottling, dusky discolouration, or cold skin.",
  "Visual disturbance, blurred vision, or sudden headache after treatment.",
  "Rapidly worsening swelling, spreading redness, fever, or pus.",
  "Breathing difficulty, tongue swelling, or severe allergic reaction symptoms.",
] as const;

export default function GuidelinesDermalFillers() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Hyaluronic Acid Dermal Fillers"
        title="Dermal Fillers Pre & Post-Treatment Guidelines"
        summary="This guide applies to lips, cheeks, chin, jawline, temples, tear trough, nasolabial and marionette lines, smoker's lines, and non-surgical rhinoplasty treatment plans."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          Dermal fillers are injectable gels used to restore volume, improve contour, and soften static
          lines. Treatment is tailored to your anatomy, tissue quality, and aesthetic goals.
        </p>
        <p>
          Immediate post-treatment change is expected, but final appearance should be judged after swelling
          settles. Depending on area, this usually takes around 1-2 weeks.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>
          Please disclose your complete medical history and any recent skin, dental, or injectable
          treatment before proceeding.
        </p>
        <p>Treatment may be postponed or declined if any of these apply:</p>
        <GuidelinesBulletList items={safetyItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <p>Follow these steps to reduce bruising, swelling, and treatment-day risk:</p>
        <GuidelinesBulletList items={preTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          Your practitioner will assess proportion, movement, and tissue support before treatment. Product
          choice and placement depth are selected to prioritize safe, natural outcomes.
        </p>
        <p>
          During treatment, mild pressure or stinging may occur. Cannula or needle technique is chosen by
          clinical indication.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care (First 24-48 Hours)">
        <GuidelinesBulletList items={aftercareFirst48Hours} />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <p className="font-semibold text-white">Common and usually temporary:</p>
        <GuidelinesBulletList items={expectedEffects} compact />
        <p>
          Minor asymmetry can occur while swelling settles. Follow-up review helps determine whether any
          refinement is clinically indicated.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-14)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic">
        <p>
          Although uncommon, vascular compromise and severe inflammatory reactions require immediate
          assessment.
        </p>
        <GuidelinesBulletList items={urgentRedFlags} />
        <p>
          If severe symptoms occur outside clinic hours, seek urgent emergency medical attention and notify
          the clinic as soon as possible.
        </p>
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesDermalFillers" />
    </div>
  );
}
