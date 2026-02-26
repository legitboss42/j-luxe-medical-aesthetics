import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const safetyItems = [
  "You are pregnant, planning pregnancy, or breastfeeding.",
  "You have active infection, fever, or inflammatory skin condition in the treatment area.",
  "You have blood-clotting disorders, severe anaemia, platelet disorders, or are on high-risk anticoagulation requiring specialist clearance.",
  "You have active cancer treatment or significant uncontrolled systemic illness.",
  "You have active scalp infection or open lesions for hair PRP protocols.",
] as const;

const preTreatmentItems = [
  "Hydrate well for 24 hours before treatment to support blood draw quality.",
  "Eat a light meal before your appointment.",
  "Avoid alcohol for at least 24 hours before treatment.",
  "If medically safe and approved by your prescribing clinician, avoid anti-inflammatory medication before treatment because it may affect inflammatory healing response.",
  "For scalp PRP: wash hair on treatment day and avoid heavy styling products.",
] as const;

const faceAftercareItems = [
  "Avoid makeup for at least 24 hours.",
  "Use gentle cleanser and hydrating products only for the first 24-48 hours.",
  "Avoid retinoids, acids, exfoliants, and active resurfacing products for around 5-7 days unless advised otherwise.",
  "Avoid gym, heat exposure, saunas, and alcohol for 24-48 hours.",
  "Use broad-spectrum SPF daily and avoid direct sun exposure.",
] as const;

const scalpAftercareItems = [
  "Avoid washing your hair for around 12-24 hours unless advised otherwise.",
  "Avoid hair dyes, chemical treatments, and harsh scalp products for several days.",
  "Avoid heavy sweating and heat exposure for 24-48 hours.",
  "Avoid scratching or aggressive scalp massage at injection sites.",
] as const;

const expectedEffects = [
  "Mild soreness, redness, swelling, or tightness at treatment sites.",
  "Small bruises at injection points or blood draw site.",
  "Gradual improvements over weeks; multiple sessions are usually required.",
] as const;

const ongoingAftercareItems = [
  "Continue gentle skincare/scalp care only until inflammation settles.",
  "Follow your planned session interval and practitioner review schedule.",
  "Maintain hydration, nutrition, and stress/sleep balance to support regenerative response.",
] as const;

const potentialRiskItems = [
  "Infection, prolonged swelling, or bruising at injection or draw sites.",
  "Temporary flare/purging in some skin or scalp protocols.",
  "Limited response if underlying causes are not clinically addressed.",
  "Procedure discomfort and short-term downtime variation by area treated.",
] as const;

const redFlagItems = [
  "Increasing pain, spreading redness, or fever.",
  "Pus, discharge, or signs of infection at treated area.",
  "Severe swelling, rash, or suspected allergic reaction.",
  "Persistent severe headache, dizziness, or unusual systemic symptoms.",
] as const;

export default function GuidelinesPrp() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Platelet-Rich Plasma"
        title="PRP Pre & Post-Treatment Guidelines"
        summary="This guide applies to PRP face and PRP hair protocols including area-based treatment plans for eyes, face, neck, decolletage, and scalp."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          PRP uses your own blood-derived platelet concentrate to support tissue repair and regenerative
          signaling. PRP can be used for skin quality support and hair/scalp treatment plans.
        </p>
        <p>
          PRP is a staged treatment. Most clients require a course of sessions and consistent aftercare to
          achieve progressive results.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>Clinical suitability is reviewed before each session.</p>
        <p>Treatment may be delayed or modified if any of the following apply:</p>
        <GuidelinesBulletList items={safetyItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <GuidelinesBulletList items={preTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          Blood is collected and processed, then PRP is delivered to the agreed area using an injection
          protocol. Temporary discomfort, pressure, or stinging may occur during treatment.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care">
        <p className="font-semibold text-white">Face/skin PRP:</p>
        <GuidelinesBulletList items={faceAftercareItems} compact />
        <p className="font-semibold text-white">Hair/scalp PRP:</p>
        <GuidelinesBulletList items={scalpAftercareItems} compact />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <GuidelinesBulletList items={expectedEffects} compact />
        <p>
          Visible skin and hair changes are gradual and often become clearer over 4-12 weeks, depending on
          treatment plan and baseline condition.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-14)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic">
        <p>Contact J Luxe promptly if concerning symptoms occur:</p>
        <GuidelinesBulletList items={redFlagItems} />
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesPrp" />
    </div>
  );
}
