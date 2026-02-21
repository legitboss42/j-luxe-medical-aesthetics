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
