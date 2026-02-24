# J Luxe Medical Aesthetics Website

This project is the live marketing and conversion website for **J Luxe Medical Aesthetics** (Hackney, London).
It is built with Next.js App Router and is designed to:
- explain treatments clearly
- build trust with policy, review, and location content
- drive visitors to pricing and contact actions
- grow organic traffic through treatment pages and blog content

## 1) Tech Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## 2) Local Development
Install and run:

```bash
npm install
npm run dev
```

Local URL: `http://localhost:3000`

Production domain target: `https://jluxemedicalaesthetics.com`

## 3) Website Page Map (What Each Page Stands For)

### Core Business Pages
- `/`
  The primary conversion page. It introduces the brand, shows key services, trust signals, and pushes users to pricing/contact.
- `/about-us`
  The clinic story and authority page. It explains philosophy, standards, and why clients should trust the team.
- `/treatment`
  The treatment hub. This page helps visitors browse all treatment categories before going deeper.
- `/pricing`
  The main booking-intent page. Users compare services and pricing here before taking action.
- `/contact-us`
  Main enquiry page with direct contact paths and location guidance.
- `/refer-a-friend`
  Referral campaign page. Users can generate and share personal referral links.
- `/training`
  Academy offer page for education/training services.

### Treatment Pages
- `/facials`
  All facial options, outcomes, and suitability guidance.
- `/fillers`
  Dermal fillers services and consultation-led treatment information.
- `/anti-wrinkle-injection`
  Anti-wrinkle (Botox-style) treatment information and process.
- `/skin-boosters-mesotherapy`
  Hydration-focused injectable skin treatments and skin quality improvement.
- `/prp-treatment`
  PRP treatment content for face/hair regenerative pathways.
- `/body-sculpting-2`
  Body contouring page including fat dissolving coverage.
- `/chemical-peels`
  Peel options, expectations, and aftercare guidance.
- `/exosomes`
  Advanced regenerative exosome treatment content.
- `/iv-vitamin-drip`
  IV infusion/wellness treatment page.
- `/teeth-whitening`
  Smile-brightening and whitening services.
- `/waxing`
  Face/body/intimate waxing service information.

### Content and SEO Pages
- `/blog`
  Blog listing page with featured and category-based article discovery.
- `/blog/[slug]`
  Individual article pages generated from markdown in `content/blog`.

### Legal and Compliance Pages
- `/terms-of-use`
  Service terms, treatment expectations, and responsibilities.
- `/privacy-policy`
  Data handling, consent, cookies, and GDPR-related policy.
- `/complaints-policy`
  Complaint process, response timelines, and escalation routes.
- `/booking-cancellation-policy`
  Deposits, cancellations, lateness, and booking rules.

### Utility Routes
- `/robots.txt` from `src/app/robots.ts`
- `/sitemap.xml` from `src/app/sitemap.ts`
- `/api/referrals/track` for referral analytics

## 4) Where to Edit Things

### Global Layout and Navigation
- `src/app/layout.tsx`
  Global app shell, default metadata.
- `src/app/Navbar.tsx`
  Header navigation and top CTAs.
- `src/app/Footer.tsx`
  Footer links, legal links, contact details, socials.
- `src/app/globals.css`
  Global styling, typography, and shared section styles.

### SEO Setup
- `src/lib/seo/treatment-seo.ts`
  Treatment-specific metadata and keyword configuration.
- Route-specific metadata files:
  Example: `src/app/facials/layout.tsx`, `src/app/blog/layout.tsx`, etc.

### Blog Content
- Blog source files: `content/blog/*.md`
- Blog parser and rendering: `src/lib/blog.ts`
- Blog template files should start with `_` if they must stay unpublished.

## 5) Current CTA Behavior
- Main booking CTAs now route to `/pricing` (pricing-first conversion flow).
- Referral CTAs route to `/refer-a-friend`.
- Contact CTAs route to `/contact-us`.

## 6) SEO and Reporting Commands

Blog-only SEO scorecard:
```bash
npm run blog:seo-audit
```

Full-site SEO audit (JSON + PDF):
```bash
npm run seo:audit-pages
```

README PDF export:
```bash
npm run readme:pdf
```

Generated files are saved in:
- `reports/`

## 7) Deployment Notes
- Keep route slugs stable to preserve SEO history and indexing continuity.
- If replacing any old WordPress URL, ensure redirect mapping is maintained.
- Re-run SEO audits after major content or metadata edits.

## 8) Consultation Form Integration
Consultation forms now submit to:
- `POST /api/forms/submit`
- MailerLite (exact mapped fields per treatment)
- Printable PDF generation (full submitted form data)

### 8.1 What Happens When Someone Fills a Form
1. The user completes a treatment-specific form at `/forms/[treatment]`.
2. The frontend serializes form values and submits JSON to `POST /api/forms/submit` with:
   - `treatmentName`
   - `treatmentPath`
   - `template`
   - `submittedAt`
   - `data` (all form fields, including checkbox arrays)
3. The API validates and normalizes data, removing empty values.
4. The API attempts MailerLite sync:
   - Requires `MAILERLITE_API_TOKEN`.
   - Requires a submitted `email` field.
   - Creates missing MailerLite custom fields automatically.
   - Sends subscriber update to MailerLite with:
     - base subscriber fields (`email`, `status`, `subscribed_at`)
     - MailerLite standard fields (`name`, `last_name`, `phone`) when provided
     - custom mapped form fields using `form_` keys
   - If `MAILERLITE_GROUP_IDS` is set, the subscriber is added to those groups.
5. The API always builds a printable PDF from all submitted form fields (not just mapped MailerLite fields).
6. The PDF is saved server-side in a private folder (`reports/submissions` by default), not sent to the user browser.
7. The API emails the PDF attachment to clinic addresses when SMTP is configured.
8. The API returns a success payload (plus a submission reference), and the frontend shows a success message only.
9. If MailerLite or clinic email fails, the form can still succeed and PDF storage still runs.
10. If PDF storage fails, the API returns an error and the submitter will see the failure message.

### 8.2 MailerLite Environment Variables
Set these in your deployment environment:

```bash
MAILERLITE_API_TOKEN=your_mailerlite_token
MAILERLITE_GROUP_IDS=group_id_1,group_id_2
FORMS_PDF_STORAGE_DIR=reports/submissions
FORMS_SMTP_HOST=smtp.your-provider.com
FORMS_SMTP_PORT=587
FORMS_SMTP_SECURE=false
FORMS_SMTP_USER=your_smtp_username
FORMS_SMTP_PASS=your_smtp_password
FORMS_PDF_EMAIL_FROM=clinic@yourdomain.com
FORMS_PDF_EMAIL_TO=owner@yourdomain.com,manager@yourdomain.com
```

Notes:
- If `MAILERLITE_API_TOKEN` is not set, form submission still works and PDF generation still works.
- `MAILERLITE_GROUP_IDS` is optional (comma-separated list).
- `FORMS_PDF_STORAGE_DIR` is optional. If omitted, PDFs are saved to `reports/submissions`.
- Clinic email delivery is enabled when `FORMS_SMTP_HOST`, `FORMS_PDF_EMAIL_FROM`, and `FORMS_PDF_EMAIL_TO` are set.
- `FORMS_SMTP_USER`/`FORMS_SMTP_PASS` are optional for SMTP servers that allow unauthenticated relay.
- `FORMS_SMTP_SECURE=true` is usually used with port `465`; otherwise use `587` with `false`.

### 8.3 Exact MailerLite Field Mapping (Per Treatment)
Source of truth in code:
- `src/app/api/forms/submit/route.ts`
- `COMMON_MAILERLITE_KEYS`
- `MAILERLITE_KEYS_BY_TEMPLATE`

All custom form fields are sent to MailerLite as `form_<fieldName>`.
Example: `firstName` -> `form_firstName`.

Always-sent metadata fields:
- `form_treatment_name`
- `form_treatment_path`
- `form_template`
- `form_submitted_at`

Common fields for all templates:
- `firstName`, `lastName`, `email`, `phone`, `address1`, `address2`, `gender`, `birthMonth`, `birthDay`, `birthYear`, `referredBy`

`antiWrinkle` template fields:
- `absoluteContraAnti`, `appointmentDateAnti`, `appointmentTimeAnti`, `areasConcernAnti`, `areasConcernAntiOther`, `assessmentAnti`, `batchAnti`, `clientNameAnti`, `conditionsAnti`, `conditionsAntiDetails`, `consentAnti`, `currentProductsAnti`, `customerSignatureAnti`, `doctorCareAnti`, `doctorCareAntiDetails`, `electronicRecordsAntiClient`, `electronicRecordsAntiEmployee`, `employeeNameAnti`, `employeeSignatureAnti`, `employeeSignatureDateAnti`, `historyAnti`, `historyAntiArea`, `historyAntiDate`, `otherAreaAnti`, `photoAnti`, `postCommentsAnti`, `relativeContraAnti`, `signatureDateAnti`, `unitsAnti`

`bodySculpting` template fields:
- `appointmentBodyDate`, `appointmentBodyTime`, `assessmentBody`, `batchBody`, `clientNameBody`, `conditionsBody`, `conditionsBodyDetails`, `consentBody`, `contraBody`, `customerSignatureBody`, `doctorCareBody`, `doctorCareBodyDetails`, `electronicRecordsBodyClient`, `electronicRecordsBodyEmployee`, `employeeNameBody`, `employeeSignatureBody`, `employeeSignatureDateBody`, `photoBody`, `postCommentsBody`, `recentBody`, `signatureDateBody`, `treatmentBody`, `unitsBody`

`chemicalPeels` template fields:
- `appointmentPeelDate`, `appointmentPeelTime`, `assessmentPeel`, `batchPeel`, `clientPeel`, `conditionsPeel`, `conditionsPeelDetails`, `consentPeel`, `contraPeel`, `doctorCarePeel`, `doctorCarePeelDetails`, `electronicRecordsPeelClient`, `electronicRecordsPeelEmployee`, `employeePeel`, `employeeSignatureDatePeel`, `employeeSignaturePeel`, `photoPeel`, `postCommentsPeel`, `recentPeel`, `signatureDatePeel`, `signaturePeel`, `treatmentPeel`, `unitsPeel`

`dermalFillers` template fields:
- `appointmentFillersDate`, `appointmentFillersTime`, `assessmentFillers`, `batchFillers`, `clientFillers`, `conditionsFillers`, `conditionsFillersDetails`, `consentFillers`, `contraFillers`, `doctorCareFillers`, `doctorCareFillersDetails`, `electronicRecordsFillersClient`, `electronicRecordsFillersEmployee`, `employeeFillers`, `employeeSignatureDateFillers`, `employeeSignatureFillers`, `historyFillers`, `historyFillersArea`, `historyFillersDate`, `otherAreaFillers`, `otherFillers`, `photoFillers`, `postCommentsFillers`, `productsFillers`, `signatureFillers`, `signatureFillersDate`, `treatmentFillers`, `unitsFillers`

`exosomes` template fields:
- `appointmentExosomeDate`, `appointmentExosomeTime`, `assessmentExosome`, `batchExosome`, `clientExosome`, `conditionsExosome`, `conditionsExosomeDetails`, `consentExosome`, `contraExosome`, `doctorCareExosome`, `doctorCareExosomeDetails`, `electronicRecordsExosomeClient`, `electronicRecordsExosomeEmployee`, `employeeExosome`, `employeeSignatureDateExosome`, `employeeSignatureExosome`, `exosomeFocus`, `photoExosome`, `postCommentsExosome`, `signatureDateExosome`, `signatureExosome`, `treatmentExosome`, `unitsExosome`

`facials` template fields:
- `assessmentFacial`, `batchFacial`, `clientFacial`, `consentFacial`, `doctorCareFacial`, `doctorCareFacialDetails`, `electronicRecordsFacialClient`, `electronicRecordsFacialEmployee`, `employeeFacial`, `employeeSignatureDateFacial`, `employeeSignatureFacial`, `facialAppointmentDate`, `facialAppointmentTime`, `facialConditions`, `facialConditionsDetails`, `facialContra`, `facialGoals`, `facialProducts`, `facialRecentTreatment`, `facialRoutine`, `facialTreatment`, `fitzpatrickFacial`, `photoFacial`, `postCommentsFacial`, `signatureFacial`, `signatureFacialDate`, `skinTypeFacial`, `skinTypeFacialOther`, `unitsFacial`

`ivDrip` template fields:
- `appointmentIvDate`, `appointmentIvTime`, `assessmentIv`, `batchIv`, `clientIv`, `conditionsIv`, `conditionsIvDetails`, `consentIv`, `contraIv`, `doctorCareIv`, `doctorCareIvDetails`, `electronicRecordsIvClient`, `electronicRecordsIvEmployee`, `employeeIv`, `employeeSignatureDateIv`, `employeeSignatureIv`, `photoIv`, `postCommentsIv`, `recentIv`, `signatureDateIv`, `signatureIv`, `treatmentIv`, `unitsIv`

`microneedling` template fields:
- `absoluteContraMicro`, `appointmentDateMicro`, `appointmentTimeMicro`, `assessmentMicro`, `batchMicro`, `bookedTreatmentMicro`, `clientNameMicro`, `conditionsMicro`, `conditionsMicroDetails`, `consentMicro`, `customerSignatureMicro`, `doctorCareMicro`, `doctorCareMicroDetails`, `electronicRecordsMicroClient`, `electronicRecordsMicroEmployee`, `employeeNameMicro`, `employeeSignatureDateMicro`, `employeeSignatureMicro`, `goalsMicro`, `medicationMicro`, `photoConsentMicro`, `postCommentsMicro`, `recentAestheticMicro`, `relativeContraMicro`, `routineMicro`, `signatureDateMicro`, `skinTypeMicro`, `skinTypeMicroOther`, `unitsMicro`

`prp` template fields:
- `appointmentPrpDate`, `appointmentPrpTime`, `assessmentPrp`, `batchPrp`, `clientPrp`, `conditionsPrp`, `conditionsPrpDetails`, `consentPrp`, `contraPrp`, `doctorCarePrp`, `doctorCarePrpDetails`, `electronicRecordsPrpClient`, `electronicRecordsPrpEmployee`, `employeePrp`, `employeeSignatureDatePrp`, `employeeSignaturePrp`, `goalPrp`, `photoPrp`, `postCommentsPrp`, `signatureDatePrp`, `signaturePrp`, `treatmentPrp`, `unitsPrp`

`skinBoosters` template fields:
- `appointmentBoostersDate`, `appointmentBoostersTime`, `assessmentBoosters`, `batchBoosters`, `clientBoosters`, `conditionsBoosters`, `conditionsBoostersDetails`, `consentBoosters`, `contraBoosters`, `doctorCareBoosters`, `doctorCareBoostersDetails`, `electronicRecordsBoostersClient`, `electronicRecordsBoostersEmployee`, `employeeBoosters`, `employeeSignatureBoosters`, `employeeSignatureDateBoosters`, `goalBoosters`, `photoBoosters`, `postCommentsBoosters`, `signatureBoosters`, `signatureDateBoosters`, `treatmentBoosters`, `unitsBoosters`

`teethWhitening` template fields:
- `appointmentTeethDate`, `appointmentTeethTime`, `assessmentTeeth`, `batchTeeth`, `clientTeeth`, `conditionsTeeth`, `conditionsTeethDetails`, `consentTeeth`, `contraTeeth`, `doctorCareTeeth`, `doctorCareTeethDetails`, `electronicRecordsTeethClient`, `electronicRecordsTeethEmployee`, `employeeSignatureDateTeeth`, `employeeSignatureTeeth`, `employeeTeeth`, `photoTeeth`, `postCommentsTeeth`, `recentTeeth`, `shadeAfterTeeth`, `shadeBeforeTeeth`, `signatureDateTeeth`, `signatureTeeth`, `treatmentTeeth`, `unitsTeeth`

`waxing` template fields:
- `appointmentWaxingDate`, `appointmentWaxingTime`, `assessmentWaxing`, `batchWaxing`, `clientWaxing`, `conditionsWaxing`, `conditionsWaxingDetails`, `consentWaxing`, `contraWaxing`, `doctorCareWaxing`, `doctorCareWaxingDetails`, `electronicRecordsWaxingClient`, `electronicRecordsWaxingEmployee`, `employeeSignatureDateWaxing`, `employeeSignatureWaxing`, `employeeWaxing`, `photoWaxing`, `postCommentsWaxing`, `recentWaxing`, `signatureWaxing`, `signatureWaxingDate`, `treatmentWaxing`, `unitsWaxing`

`standard` template fields:
- `mainConcern`, `medicalHistory`, `consentSignature`
