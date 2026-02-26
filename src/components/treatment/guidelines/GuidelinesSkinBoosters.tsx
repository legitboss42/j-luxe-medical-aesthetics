import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const safetyItems = [
  "You are pregnant, planning pregnancy, or breastfeeding.",
  "You have active skin infection, active herpes simplex, dermatitis flare, or open wounds in treatment areas.",
  "You have uncontrolled autoimmune or inflammatory disease requiring medical review.",
  "You have known allergy to treatment ingredients (including local anaesthetic where applicable).",
  "You are currently unwell, feverish, or recovering from acute infection.",
] as const;

const preTreatmentItems = [
  "Avoid alcohol for at least 24 hours pre-treatment.",
  "If medically safe and approved by your prescribing clinician, avoid blood-thinning supplements or anti-inflammatory medication for 24-48 hours before treatment to reduce bruising risk.",
  "Avoid active skincare (retinoids, acids, strong exfoliants) for around 3-5 days before treatment unless advised otherwise.",
  "Avoid laser, peels, or other aggressive skin procedures in the same area shortly before treatment unless reviewed by your practitioner.",
  "Attend with clean skin and no heavy makeup.",
] as const;

const postTreatmentItems = [
  "Avoid makeup for at least 12-24 hours unless advised otherwise.",
  "Avoid gym, heat exposure, saunas, and alcohol for 24-48 hours.",
  "Avoid touching, rubbing, or applying pressure to treated areas.",
  "Use gentle skincare and daily SPF.",
  "Avoid facials, microneedling, peels, laser, and massage over treated areas for around 1-2 weeks unless cleared.",
] as const;

const expectedEffects = [
  "Small papules/bumps at injection points for 24-72 hours (product-dependent).",
  "Mild bruising, swelling, tenderness, or redness.",
  "Gradual texture and hydration improvement over a treatment course rather than one session.",
] as const;

const ongoingAftercareItems = [
  "Maintain gentle skincare and strict SPF use while treated skin settles.",
  "Do not resume active acids/retinoids until advised by your practitioner.",
  "Attend review and complete treatment course for best hydration and texture outcomes.",
] as const;

const potentialRiskItems = [
  "Persistent nodules, prolonged swelling, or delayed inflammatory response.",
  "Bruising or tenderness lasting longer than expected.",
  "Infection risk if skin barrier care is not maintained.",
  "Rare vascular events requiring immediate emergency assessment.",
] as const;

const redFlagItems = [
  "Severe or escalating pain, blanching, or unusual skin discolouration.",
  "Visual disturbance, severe headache, or neurological symptoms (urgent emergency care required).",
  "Rapidly spreading redness, warmth, fever, or pus.",
  "Significant persistent swelling or allergic-type reaction.",
] as const;

export default function GuidelinesSkinBoosters() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Skin Boosters & Mesotherapy"
        title="Skin Boosters & Mesotherapy Pre & Post-Treatment Guidelines"
        summary="This guide applies to skin booster and mesotherapy protocols including under-eye boosters, Profhilo, hyaluronic skin boosters, polynucleotides/PDRN, and selected regenerative hydration plans."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          Skin boosters and mesotherapy deliver hydrating or regenerative actives into targeted skin
          layers to improve hydration, texture, elasticity, and overall skin quality.
        </p>
        <p>
          Most protocols are completed as a course of sessions. Full outcomes develop progressively over
          several weeks.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>Please disclose medical history, medications, and recent treatments before each session.</p>
        <GuidelinesBulletList items={safetyItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <GuidelinesBulletList items={preTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          Your practitioner will assess skin condition, injection planning points, and suitability before
          treatment. Mild stinging or pressure can occur during injection.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care (First 24-72 Hours)">
        <GuidelinesBulletList items={postTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <GuidelinesBulletList items={expectedEffects} compact />
        <p>
          Do not judge final result while swelling is active. Review timeline and repeat session planning
          are set by your practitioner based on product and skin response.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-14)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic">
        <p>Contact J Luxe immediately if any red-flag symptoms occur:</p>
        <GuidelinesBulletList items={redFlagItems} />
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesSkinBoosters" />
    </div>
  );
}
