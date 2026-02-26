import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const suitabilityItems = [
  "You have active gum disease, untreated tooth decay, or oral infection.",
  "You have severe untreated sensitivity or cracked teeth.",
  "You are pregnant or breastfeeding.",
  "You have recent major dental treatment requiring stabilization before whitening.",
  "You have known allergy to whitening gel ingredients.",
] as const;

const preCareItems = [
  "Brush and floss before your appointment.",
  "Avoid highly staining foods/drinks for several hours before treatment.",
  "Disclose crowns, veneers, bonding, and existing sensitivity history.",
  "Follow practitioner advice if desensitizing preparation is recommended.",
] as const;

const first48HoursItems = [
  "Follow a low-stain or white-diet approach for 24-48 hours.",
  "Avoid coffee, tea, red wine, cola, berries, curry, soy sauce, and deeply pigmented foods.",
  "Avoid smoking and vaping where possible, especially in the first 24-48 hours.",
  "Use lukewarm rather than very hot or very cold drinks if sensitivity occurs.",
  "Continue gentle oral hygiene and use sensitivity toothpaste if advised.",
] as const;

const expectedEffects = [
  "Temporary tooth sensitivity to temperature changes.",
  "Mild gum irritation where gel contact occurred.",
  "Gradual shade stabilization over the first 24-72 hours.",
] as const;

const ongoingAftercareItems = [
  "Maintain stain-aware diet choices and oral hygiene to prolong results.",
  "Use sensitivity support toothpaste if needed for a few days.",
  "Schedule top-up sessions only when clinically appropriate rather than over-frequent whitening.",
] as const;

const potentialRiskItems = [
  "Short-term sensitivity spikes after higher-intensity whitening.",
  "Soft tissue irritation if gel contacts gums.",
  "Uneven shade if pre-existing restorations do not match natural enamel response.",
  "Relapse of staining if post-care and maintenance are not followed.",
] as const;

const redFlagItems = [
  "Severe pain not settling with routine sensitivity care.",
  "Persistent gum blanching, ulceration, or soft tissue irritation.",
  "Sensitivity that is worsening or not improving after 48 hours.",
] as const;

export default function GuidelinesTeethWhitening() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Professional Teeth Whitening"
        title="Teeth Whitening Pre & Post-Treatment Guidelines"
        summary="This guide applies to standard, premium, ultra, and top-up whitening sessions at J Luxe Medical Aesthetics."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          Professional whitening uses peroxide-based gels activated under controlled clinical conditions to
          reduce stain visibility and brighten tooth shade.
        </p>
        <p>
          Whitening results vary depending on baseline shade, enamel structure, hydration level, and
          lifestyle habits. Existing crowns, veneers, and fillings do not whiten like natural enamel.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Suitability & Safety Requirements">
        <p>Please disclose your dental and medical history before treatment.</p>
        <p>Treatment may be deferred if any of the following apply:</p>
        <GuidelinesBulletList items={suitabilityItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <GuidelinesBulletList items={preCareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          Soft tissues are protected before whitening gel is applied. Multiple short cycles may be used
          depending on protocol intensity and your sensitivity profile.
        </p>
        <p>
          Notify your practitioner immediately if discomfort feels sharp, persistent, or significantly
          uncomfortable during treatment.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care (First 24-48 Hours)">
        <p>This is the critical shade-stabilization period:</p>
        <GuidelinesBulletList items={first48HoursItems} />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <GuidelinesBulletList items={expectedEffects} compact />
        <p>
          Shade maintenance depends on oral hygiene and dietary habits. Top-up sessions may be recommended
          to maintain brightness over time.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-7)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic">
        <p>Contact J Luxe if any concerning symptoms persist:</p>
        <GuidelinesBulletList items={redFlagItems} />
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesTeethWhitening" />
    </div>
  );
}
