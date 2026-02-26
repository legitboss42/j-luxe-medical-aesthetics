import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const safetyItems = [
  "You are pregnant, planning pregnancy, or breastfeeding.",
  "You have active infection, open wounds, or inflammatory skin flare in treatment areas.",
  "You have active herpes simplex without disclosed management plan when relevant.",
  "You are immunocompromised or under active medical treatment requiring specialist clearance.",
  "You are currently unwell, feverish, or recovering from acute infection.",
] as const;

const preTreatmentItems = [
  "Avoid retinoids, exfoliating acids, and aggressive active skincare for around 3-5 days before treatment unless advised otherwise.",
  "Avoid sun exposure, tanning, and treatment on sunburned skin.",
  "Avoid alcohol for at least 24 hours before treatment.",
  "For scalp protocols, arrive with a clean scalp and avoid heavy styling products.",
  "Disclose all recent procedures such as microneedling, peels, laser, injectables, or scalp treatments.",
] as const;

const postTreatmentItems = [
  "Follow the exact aftercare of the delivery method used (for example needling-assisted, topical channeling, or injectable protocol).",
  "Avoid makeup, hair products, and touching treated areas for at least 24 hours unless advised otherwise.",
  "Avoid exercise, heat exposure, saunas, and alcohol for 24-48 hours.",
  "Use gentle cleansing and barrier-supportive hydration only during early recovery.",
  "Use daily broad-spectrum SPF and avoid direct sun exposure while skin is reactive.",
] as const;

const expectedEffects = [
  "Mild redness, warmth, tightness, or sensitivity for 24-72 hours.",
  "Temporary dryness, roughness, or mild flaking where channeling/needling was used.",
  "Scalp tenderness or mild shedding fluctuation in early hair protocols.",
] as const;

const ongoingAftercareItems = [
  "Continue strict barrier-first skincare/scalp care until reactivity settles.",
  "Avoid introducing new active products without practitioner advice.",
  "Attend follow-up to assess response and determine whether maintenance sessions are appropriate.",
] as const;

const potentialRiskItems = [
  "Prolonged irritation, swelling, or delayed inflammatory reaction.",
  "Infection risk if post-care hygiene is poor after channeling/needling.",
  "Variable response due to protocol differences and baseline condition.",
  "Evidence quality varies across regenerative protocols; outcomes are not guaranteed.",
] as const;

const redFlagItems = [
  "Increasing pain, severe swelling, or spreading redness.",
  "Pus, crusting, fever, or signs of infection.",
  "Generalized rash, hives, facial swelling, or breathing difficulty.",
  "Any severe or persistent reaction not settling within expected recovery windows.",
] as const;

export default function GuidelinesExosomes() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Regenerative Exosome Therapy"
        title="Exosome Therapy Pre & Post-Treatment Guidelines"
        summary="This guide applies to exosome face and hair/scalp protocols. Exact aftercare depends on whether exosomes are combined with microneedling, channeling, or injection-based delivery."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          Exosome therapy is a regenerative-support treatment used in selected facial and scalp protocols.
          It is commonly integrated with other procedures to support skin or scalp recovery and improve
          treatment response quality.
        </p>
        <p>
          Treatment plans are individualized. Session number, spacing, and expected progression depend on
          baseline condition, protocol intensity, and consistency with aftercare.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>
          A complete consultation is required before treatment. Suitability is assessed per protocol and
          may change between sessions.
        </p>
        <GuidelinesBulletList items={safetyItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <GuidelinesBulletList items={preTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          Your practitioner will confirm treatment method and post-care instructions based on the exact
          protocol delivered on the day.
        </p>
        <p>
          Temporary warmth, stinging, or tenderness may occur during delivery, especially when combined
          with needling or channeling procedures.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care (First 24-72 Hours)">
        <GuidelinesBulletList items={postTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <GuidelinesBulletList items={expectedEffects} compact />
        <p>
          Improvements are progressive rather than immediate. Maintenance and adjunct protocols may be
          recommended based on your clinical response.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-14)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic">
        <p>Contact J Luxe immediately if you experience:</p>
        <GuidelinesBulletList items={redFlagItems} />
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesExosomes" />
    </div>
  );
}
