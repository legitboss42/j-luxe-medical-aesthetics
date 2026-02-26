import GuidelinesHeaderCard from "@/src/components/treatment/guidelines/GuidelinesHeaderCard";
import {
  GuidelinesBulletList,
  GuidelinesSection,
  GuidelinesSignatureSection,
} from "@/src/components/treatment/guidelines/GuidelinesPrimitives";

const contraindicationItems = [
  "You are pregnant, planning pregnancy, or breastfeeding (product-dependent).",
  "You have active dermatitis, eczema flare, open wounds, infection, or sunburn in the treatment area.",
  "You have used isotretinoin recently (timing must be assessed clinically).",
  "You have had recent laser, needling, waxing, or aggressive resurfacing in the area.",
  "You have active herpes simplex history without disclosed management plan when relevant.",
  "You have a history of severe post-inflammatory hyperpigmentation, abnormal scarring, or poor wound healing.",
] as const;

const preCareItems = [
  "Stop retinoids, exfoliating acids, benzoyl peroxide, and strong active serums 5-7 days before treatment unless medically instructed otherwise.",
  "Avoid sun exposure, tanning, and fake tan in treatment areas for at least 7 days before treatment.",
  "Avoid waxing, threading, depilatory creams, and abrasive scrubs in treatment zones for around 7 days before treatment.",
  "Disclose all prescription skincare, recent procedures, and any new medication.",
  "Attend with clean skin and no heavy makeup.",
] as const;

const postCareItems = [
  "Use gentle cleanser, barrier-supporting moisturizer, and broad-spectrum SPF 30-50 daily.",
  "Do not pick, peel, rub, or force shedding skin.",
  "Avoid retinoids, exfoliating acids, scrubs, and active resurfacing products until your practitioner advises reintroduction.",
  "Avoid intense exercise, heat exposure, saunas, and steam rooms for 24-48 hours.",
  "Avoid direct sun exposure and tanning while skin is healing.",
  "Avoid additional facial procedures (waxing, peels, microneedling, laser) until clinically cleared.",
] as const;

const expectedRecovery = [
  "Mild redness, tightness, dryness, or flaking.",
  "Temporary darkening of superficial pigmentation before exfoliation.",
  "Variable downtime depending on peel type, depth, and skin sensitivity.",
] as const;

const ongoingAftercareItems = [
  "Continue barrier repair skincare and broad-spectrum SPF every day.",
  "Do not restart active acids/retinoids until your practitioner confirms timing.",
  "Avoid friction, picking, and unnecessary heat exposure while shedding is active.",
] as const;

const potentialRiskItems = [
  "Prolonged erythema, persistent irritation, or delayed healing.",
  "Post-inflammatory hyperpigmentation or uneven pigment change.",
  "Unexpected blistering, crusting, or secondary infection.",
  "Suboptimal outcome if pre-care or post-care guidance is not followed.",
] as const;

const redFlagItems = [
  "Severe swelling, blistering, or intense burning pain.",
  "Yellow crusting, pus, or signs of infection.",
  "Spreading redness with increasing tenderness or fever.",
  "Unexpected severe pigment change or prolonged delayed healing.",
] as const;

export default function GuidelinesChemicalPeels() {
  return (
    <div className="space-y-6">
      <GuidelinesHeaderCard
        scope="Clinical Skin Resurfacing"
        title="Chemical Peels Pre & Post-Treatment Guidelines"
        summary="This guide applies to in-clinic peel protocols including BioRePeel and PRX-T33 plans for face, neck, decolletage, and selected body areas."
      />

      <GuidelinesSection title="1. Treatment Overview">
        <p>
          Chemical peels use controlled exfoliation to improve texture, brightness, tone irregularity,
          and overall skin quality. Different peel protocols have different strengths and expected recovery
          patterns.
        </p>
        <p>
          Multiple sessions are often required for cumulative improvement. Strict aftercare is essential to
          protect the skin barrier and reduce pigmentation or irritation risk.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="2. Medical & Safety Requirements">
        <p>
          A full skin and medical review is required before each peel. Treatment may be postponed or
          modified if contraindications are present.
        </p>
        <GuidelinesBulletList items={contraindicationItems} />
      </GuidelinesSection>

      <GuidelinesSection title="3. Pre-Treatment Preparation">
        <p>To lower complication risk and improve peel tolerance:</p>
        <GuidelinesBulletList items={preCareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="4. On the Day of Treatment">
        <p>
          During treatment, you may feel warmth, tingling, or brief stinging depending on peel type.
          Treatment intensity is selected based on your skin condition and tolerance.
        </p>
        <p>
          Immediate post-treatment appearance may include erythema and a tighter skin feel. This is
          commonly temporary.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="5. Post-Treatment Care (First 7 Days)">
        <p>Follow all post-care instructions exactly to reduce irritation and pigment complications:</p>
        <GuidelinesBulletList items={postCareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="6. What to Expect During Recovery">
        <p className="font-semibold text-white">Common and usually temporary:</p>
        <GuidelinesBulletList items={expectedRecovery} compact />
        <p>
          If peeling is minimal, this does not mean treatment was ineffective. Healing response varies by
          skin type and peel protocol.
        </p>
      </GuidelinesSection>

      <GuidelinesSection title="7. Aftercare Guide (Days 2-14)">
        <GuidelinesBulletList items={ongoingAftercareItems} />
      </GuidelinesSection>

      <GuidelinesSection title="8. Potential Risks & Side Effects">
        <GuidelinesBulletList items={potentialRiskItems} />
      </GuidelinesSection>

      <GuidelinesSection title="9. Disclaimer & When to Contact the Clinic">
        <p>Contact J Luxe immediately if you experience any of the following:</p>
        <GuidelinesBulletList items={redFlagItems} />
        <p>Early intervention helps preserve skin integrity and outcome quality.</p>
      </GuidelinesSection>

      <GuidelinesSignatureSection prefix="guidelinesChemicalPeels" />
    </div>
  );
}
