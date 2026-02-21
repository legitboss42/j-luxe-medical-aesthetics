# J Luxe Medical Aesthetics Website

This is the production website for **J Luxe Medical Aesthetics** in Hackney, London.
It is built with **Next.js App Router** and includes service pages, blog content, referral flow, and legal pages.

## Tech Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Run Locally
```bash
npm install
npm run dev
```

App URL: `http://localhost:3000`

## What Each Page Stands For

### Main Pages
- `/`  
  Main homepage. Introduces the clinic, highlights key treatments, and drives visitors to book.
- `/about-us`  
  Brand story and trust page. Explains the clinic approach and practitioner credibility.
- `/treatment`  
  Treatment directory page. Entry point to all individual treatment pages.
- `/pricing`  
  Full treatment pricing list and booking intent page.
- `/contact-us`  
  Contact and enquiry page with clinic details and location messaging.
- `/blog`  
  Blog hub with category filters and featured content.
- `/blog/[slug]`  
  Individual article page rendered from markdown content.
- `/training`  
  Academy/training offer page for education services.
- `/refer-a-friend`  
  Referral landing page where users generate and share referral links.

### Treatment Service Pages
- `/facials`  
  Facial treatment information, options, FAQs, and booking CTAs.
- `/fillers`  
  Dermal fillers page with consultation, treatment pathways, and safety framing.
- `/anti-wrinkle-injection`  
  Anti-wrinkle treatment page focused on lines, dosage planning, and results.
- `/skin-boosters-mesotherapy`  
  Skin booster and mesotherapy page for hydration and skin quality outcomes.
- `/prp-treatment`  
  PRP treatment page for regenerative face/hair support.
- `/body-sculpting-2`  
  Body contouring page including fat-dissolving treatment context.
- `/chemical-peels`  
  Chemical peels page covering indications, aftercare, and treatment journey.
- `/exosomes`  
  Exosome therapy page for advanced skin regeneration positioning.
- `/iv-vitamin-drip`  
  IV vitamin drip page for wellness and recovery-focused treatment options.
- `/teeth-whitening`  
  Teeth whitening page with treatment benefits and suitability notes.
- `/waxing`  
  Waxing service page with area-based service breakdown.

### Legal / Trust Pages
- `/terms-of-use`  
  Service terms, treatment expectations, and client responsibilities.
- `/privacy-policy`  
  Data handling, GDPR principles, and client privacy commitments.
- `/complaints-policy`  
  Complaint process, response timelines, and escalation options.
- `/booking-cancellation-policy`  
  Booking deposits, cancellation windows, lateness, and refund rules.

### Utility Routes
- `/robots.txt` from `src/app/robots.ts`
- `/sitemap.xml` from `src/app/sitemap.ts`
- `/api/referrals/track` for referral tracking

## Blog Content Location
- Blog files: `content/blog/*.md`
- Internal templates should start with `_` so they are not listed publicly.
- Blog data parsing logic: `src/lib/blog.ts`

## SEO Tools

Blog SEO checks:
```bash
npm run blog:seo-audit
```

All-page SEO audit (JSON + PDF):
```bash
npm run seo:audit-pages
```

## Export README to PDF
```bash
npm run readme:pdf
```

Output:
- `reports/readme-site-guide.pdf`

## Core Layout Files
- `src/app/layout.tsx` - global app shell and metadata defaults.
- `src/app/Navbar.tsx` - navigation and desktop/mobile menu behavior.
- `src/app/Footer.tsx` - footer links, contact details, and social links.
- `src/app/globals.css` - global visual styling and typography rules.
