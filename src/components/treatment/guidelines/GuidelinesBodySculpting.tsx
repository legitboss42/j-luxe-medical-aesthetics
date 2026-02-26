import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const generalContraindications = [
  "You are pregnant, planning pregnancy, or breastfeeding.",
  "You have an active skin infection, open wounds, severe eczema, or dermatitis in treatment areas.",
  "You have uncontrolled medical conditions (for example uncontrolled blood pressure or unstable diabetes).",
  "You have implanted electrical devices or metal implants that conflict with selected modality (EMS/RF protocols).",
  "You are currently unwell, feverish, or recovering from recent acute illness.",
] as const;

const preTreatmentItems = [
  "Hydrate well for 24 hours before treatment.",
  "Avoid alcohol and very high-salt meals the day before and day of treatment.",
  "Avoid heavy exercise immediately before your session.",
  "Wear loose, comfortable clothing that allows easy area access.",
  "For fat-dissolving injections: if medically safe and approved by your prescriber, avoid blood-thinning supplements and anti-inflammatory medication for 24-48 hours to reduce bruising risk.",
] as const;

const postCareDeviceBased = [
  "Maintain hydration to support lymphatic clearance.",
  "Light movement and walking are encouraged unless advised otherwise.",
  "Avoid alcohol and very salty foods for 24-48 hours.",
  "Follow any advised home protocol (lymphatic massage/compression where clinically indicated).",
] as const;

const postCareInjectable = [
  "Expect swelling, tenderness, warmth, and firmness in the treated area for several days.",
  "Avoid gym sessions, saunas, steam rooms, and hot baths for at least 24-48 hours.",
  "Do not massage or apply pressure unless specifically instructed.",
  "Wear compression garment if your practitioner has advised it for your treatment plan.",
] as const;

const expectedEffects = [
  "Temporary redness, swelling, tenderness, or bruising.",
  "Mild nodularity or firmness after injectable fat dissolving sessions.",
  "Gradual contour change over multiple sessions rather than immediate final results.",
] as const;

const ongoingAftercareItems = [
  "Continue hydration and daily movement to support lymphatic clearance.",
  "Follow your practitioner-advised spacing between sessions for safer cumulative outcomes.",
  "Maintain realistic expectations: body contouring requires treatment course consistency.",
] as const;

const potentialRiskItems = [
  "Prolonged tenderness, bruising, swelling, or localized nodularity.",
  "Skin irritation, burns, or contour irregularity (modality-dependent).",
  "Post-inflammatory pigmentation in sensitive skin.",
  "Infection or delayed healing where skin integrity is compromised.",
] as const;

const redFlagItems = [
  "Severe pain, rapidly increasing swelling, or spreading redness.",
  "Blistering, skin breakdown, or signs of burn injury.",
  "Fever, discharge, or suspected infection.",
  "Shortness of breath, chest pain, or any severe systemic symptom.",
] as const;

export default function GuidelinesBodySculpting() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Body Contouring & Fat Dissolving"
        title="Body Sculpting Pre & Post-Treatment Guidelines"
        summary="This guide applies to body contouring services including wood therapy, cavitation, RF, vacuum, laser pad/lipo protocols, EMS sculpt, lymphatic support, and fat-dissolving injection plans."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          Body sculpting and contouring treatments are non-surgical protocols designed to support
          inch-loss, improved contour, and skin quality. Some plans are device-based, while others include
          injectable fat-dissolving treatment.
        </p>
        <p>
          Outcomes depend on treatment selection, body composition, adherence to aftercare, and session
          consistency. These protocols are not a substitute for medical weight-loss management.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>
          Your practitioner must screen your suitability for each modality at every session. Treatment may
          be postponed if contraindications are present.
        </p>
        <GuidelinesBulletList items={generalContraindications} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <p>Prepare properly to reduce side effects and support better treatment response:</p>
        <GuidelinesBulletList items={preTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          The treatment area will be assessed and marked where needed. Some modalities create warmth,
          suction, pressure, or muscle contraction sensations during treatment.
        </p>
        <p>
          If your protocol includes fat-dissolving injections, localized stinging and temporary swelling
          are expected.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care">
        <p className="font-semibold text-white">Device-based contouring aftercare:</p>
        <GuidelinesBulletList items={postCareDeviceBased} compact />
        <p className="font-semibold text-white">Fat-dissolving aftercare:</p>
        <GuidelinesBulletList items={postCareInjectable} compact />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <GuidelinesBulletList items={expectedEffects} compact />
        <p>
          Significant contour changes generally require a planned course of sessions plus supportive
          lifestyle consistency.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-14)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic">
        <p>Contact J Luxe immediately if any concerning symptoms develop:</p>
        <GuidelinesBulletList items={redFlagItems} />
        <p>Early review helps reduce risk and supports timely management.</p>
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesBodySculpting" />
    </div>
  );
}
