import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const safetyItems = [
  "You are pregnant, planning pregnancy, or breastfeeding.",
  "You have significant kidney disease, severe heart disease, or fluid-restriction conditions.",
  "You have uncontrolled hypertension or unstable chronic illness.",
  "You have known allergy to infusion ingredients.",
  "You have G6PD deficiency or relevant metabolic conditions (especially for high-dose vitamin C protocols).",
  "You are currently unwell, febrile, or have active infection.",
] as const;

const preTreatmentItems = [
  "Eat a light meal before arrival to reduce dizziness risk.",
  "Hydrate well with water before your appointment.",
  "Avoid alcohol for at least 12-24 hours before infusion.",
  "Bring an updated medication/supplement list and disclose all allergies.",
  "Wear comfortable clothing that allows easy access to your arm.",
] as const;

const postTreatmentItems = [
  "Continue hydration for the rest of the day.",
  "Avoid alcohol and very strenuous exercise for 24 hours.",
  "Keep cannula site clean and monitor for redness or swelling.",
  "A light meal and rest are recommended if you feel tired after infusion.",
] as const;

const expectedEffects = [
  "Mild cool sensation in the arm during infusion.",
  "Temporary metallic taste, warmth, or lightheadedness in some protocols.",
  "Minor bruising or tenderness at the cannula site.",
] as const;

const ongoingAftercareItems = [
  "Keep monitoring the cannula site for 24-48 hours and keep it clean/dry.",
  "Continue oral hydration and balanced meals through the rest of the day.",
  "Allow recovery time if you feel fatigued post-infusion.",
] as const;

const potentialRiskItems = [
  "Phlebitis, bruising, or local irritation around the infusion site.",
  "Fluid overload risk in susceptible clients if not appropriately screened.",
  "Allergic-type reactions to infusion components.",
  "Lack of expected benefit depending on baseline deficiency status and clinical need.",
] as const;

const redFlagItems = [
  "Breathing difficulty, chest pain, or severe dizziness.",
  "Facial swelling, hives, or signs of allergic reaction.",
  "Persistent vomiting, severe headache, or confusion.",
  "Increasing pain, swelling, redness, or discharge at the cannula site.",
] as const;

export default function GuidelinesIvDrip() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="IV Vitamin Therapy"
        title="IV Drip Pre & Post-Treatment Guidelines"
        summary="This guide applies to hydration, immunity, energy, detox, skin-brightening, NAD, and high-dose vitamin C drip protocols."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          IV vitamin therapy delivers fluid and selected nutrients directly into the bloodstream through a
          cannula. Protocol choice is based on your goals, clinical suitability, and practitioner review.
        </p>
        <p>
          Session duration varies by drip type and rate, but many infusions take approximately 30-60
          minutes.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>
          Please disclose your full medical history, medication list, and any allergy history before each
          infusion session.
        </p>
        <p>Treatment may be postponed or modified if any of the following apply:</p>
        <GuidelinesBulletList items={safetyItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <GuidelinesBulletList items={preTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          A practitioner will confirm your selected drip, check suitability, and place a cannula in an
          appropriate vein. You will be monitored throughout infusion.
        </p>
        <p>
          Report any discomfort immediately, including burning at the site, chest symptoms, severe nausea,
          or unexpected pain.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care (First 24 Hours)">
        <GuidelinesBulletList items={postTreatmentItems} />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <p className="font-semibold text-white">Common and temporary:</p>
        <GuidelinesBulletList items={expectedEffects} compact />
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (First 48 Hours)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic Urgently">
        <p>Seek urgent advice if you experience:</p>
        <GuidelinesBulletList items={redFlagItems} />
        <p>
          If severe symptoms occur, seek immediate emergency care and notify the clinic as soon as
          possible.
        </p>
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesIvDrip" />
    </div>
  );
}
