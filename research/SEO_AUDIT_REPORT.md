# SEO / AEO Technical Audit Report
## Arizona Telepsychiatry Clinic — Landing Page Optimization Guide
### Date: April 4, 2026

---

## Table of Contents

1. [Competitive Landscape Analysis](#1-competitive-landscape-analysis)
2. [Technical SEO Checklist](#2-technical-seo-checklist)
3. [Content SEO Checklist](#3-content-seo-checklist)
4. [AEO (Answer Engine Optimization)](#4-aeo-answer-engine-optimization)
5. [Schema Markup Templates](#5-schema-markup-templates)
6. [Local SEO Strategy](#6-local-seo-strategy)
7. [Page-by-Page Implementation Guide](#7-page-by-page-implementation-guide)
8. [Verification Checklists](#8-verification-checklists)

---

## 1. Competitive Landscape Analysis

### 1.1 Target Keywords & Search Intent

| Keyword | Monthly Volume (est.) | Intent | Difficulty |
|---|---|---|---|
| online ADHD evaluation Arizona | Medium-High | Transactional | Medium |
| telepsychiatry Arizona | Medium | Informational/Transactional | Medium |
| online psychiatrist Phoenix | High | Transactional | High |
| ADHD telehealth Arizona | Medium | Transactional | Medium |
| anxiety treatment online Arizona | Medium | Transactional | Medium |
| online insomnia treatment Arizona | Low-Medium | Transactional | Low |

### 1.2 Top 5 Competitors

#### Competitor 1: Talkiatry (talkiatry.com/psychiatrist-near-me/arizona)
- **What they rank for:** "Arizona psychiatrist," "online psychiatrist Arizona," "insurance covered psychiatry Arizona"
- **Page structure:** State-specific landing pages with provider profiles, insurance info, FAQ section, condition-specific content blocks
- **Schema markup:** MedicalClinic, Organization, FAQPage, BreadcrumbList
- **Content length:** ~2,500-3,000 words per state page
- **Internal linking:** Strong hub-and-spoke model — state pages link to condition pages, provider profiles, and insurance pages
- **Strengths:** Massive insurance network (60+ plans), board-certified psychiatrist profiles with photos, in-network pricing ($30 or less), trust signals everywhere
- **Weaknesses:** Generic national template; not deeply localized to Arizona communities

#### Competitor 2: ADHD Online (adhdonline.com/state/arizona/)
- **What they rank for:** "ADHD online Arizona," "online ADHD assessment Arizona," "ADHD diagnosis Arizona"
- **Page structure:** State-specific page with pricing ($199 assessment), process steps, FAQ, state-specific legal info
- **Schema markup:** FAQPage, Organization, WebPage
- **Content length:** ~1,800-2,200 words
- **Internal linking:** Links to assessment product page, treatment pages, blog articles, state comparison pages
- **Strengths:** Clear pricing, fast assessment promise (7-day turnaround), strong ADHD niche authority
- **Weaknesses:** Single-condition focus, no anxiety/depression/insomnia coverage

#### Competitor 3: MEDvidi (medvidi.com/services/adhd-treatment/az/)
- **What they rank for:** "ADHD treatment online Arizona," "online ADHD medication Arizona," "telehealth ADHD Arizona"
- **Page structure:** Service + state hybrid page with condition info, treatment process, provider credentials, pricing
- **Schema markup:** MedicalWebPage, FAQPage, Organization
- **Content length:** ~2,000-2,500 words
- **Internal linking:** Cross-links to other conditions and other state pages; blog content supports service pages
- **Strengths:** Can prescribe stimulants, multiple condition coverage, insurance accepted
- **Weaknesses:** Generic template feel, limited Arizona-specific content

#### Competitor 4: Platinum Psychiatry (platinumpsychiatry.com)
- **What they rank for:** "online psychiatrist Arizona," "telepsychiatry Arizona," "Arizona telepsychiatry"
- **Page structure:** Single-page site with services, about, process, contact
- **Schema markup:** Minimal — LocalBusiness only
- **Content length:** ~1,500-2,000 words
- **Internal linking:** Minimal internal linking; mostly single-page navigation
- **Strengths:** Arizona-focused branding, local authority, personal feel
- **Weaknesses:** Thin content, limited schema, no condition-specific pages, no blog

#### Competitor 5: TelepsychHealth (telepsychhealth.com/telepsychiatry-arizona/)
- **What they rank for:** "telepsychiatry Arizona," "online psychiatrist Arizona," "virtual psychiatrist Arizona"
- **Page structure:** State-specific page with services list, legal info, telehealth process, contact form
- **Schema markup:** Organization, WebPage
- **Content length:** ~1,500-2,000 words
- **Internal linking:** Links to other state pages and general service pages
- **Strengths:** Multi-state coverage, professional presentation, Arizona legal compliance info
- **Weaknesses:** Not deeply condition-specific, limited E-E-A-T signals, no FAQ schema

### 1.3 Competitive Gaps We Can Exploit

1. **No competitor has dedicated insomnia landing pages** for Arizona telehealth — this is a wide-open opportunity.
2. **Most competitors use generic national templates** — deeply localized Arizona content (mentioning Phoenix, Tucson, Mesa, Scottsdale, Flagstaff, rural AZ) will differentiate.
3. **Few competitors implement comprehensive schema markup** — most only have basic Organization or LocalBusiness schema. Full MedicalWebPage + FAQPage + BreadcrumbList implementation is rare.
4. **E-E-A-T signals are weak across the competitive set** — very few show medical reviewer info, last-reviewed dates, or author credential blocks.
5. **AEO optimization is virtually nonexistent** — no competitors are structuring content for AI answer engines.
6. **Anxiety + depression combination pages** are underserved — most competitors separate these into individual condition pages, missing the co-occurrence search intent.

---

## 2. Technical SEO Checklist

### 2.1 Title Tags (Under 60 Characters)

| Page | Recommended Title Tag | Characters |
|---|---|---|
| adhd.html | `Online ADHD Evaluation in Arizona | AZ Telepsychiatry` | 54 |
| anxiety-depression.html | `Anxiety & Depression Treatment Online | AZ Telepsychiatry` | 58 |
| insomnia.html | `Online Insomnia Treatment Arizona | AZ Telepsychiatry` | 54 |
| services.html | `Telepsychiatry Services in Arizona | AZ Telepsychiatry` | 55 |

### 2.2 Meta Descriptions (Under 160 Characters)

| Page | Recommended Meta Description | Characters |
|---|---|---|
| adhd.html | `Get an online ADHD evaluation from board-certified providers in Arizona. Fast, private telehealth assessments for adults. Book your appointment today.` | 152 |
| anxiety-depression.html | `Online anxiety and depression treatment for adults in Arizona. Evidence-based medication management and therapy via secure telepsychiatry. Book now.` | 149 |
| insomnia.html | `Struggling with insomnia? Get online sleep treatment from Arizona-licensed psychiatric providers. CBT-I and medication management via telehealth.` | 149 |
| services.html | `Arizona Telepsychiatry Clinic offers online psychiatric evaluations, medication management, and therapy for ADHD, anxiety, depression, and insomnia.` | 152 |

### 2.3 Canonical URLs

Every page MUST include a self-referencing canonical tag:

```html
<!-- adhd.html -->
<link rel="canonical" href="https://arizonatelepsychiatryclinic.com/adhd.html" />

<!-- anxiety-depression.html -->
<link rel="canonical" href="https://arizonatelepsychiatryclinic.com/anxiety-depression.html" />

<!-- insomnia.html -->
<link rel="canonical" href="https://arizonatelepsychiatryclinic.com/insomnia.html" />

<!-- services.html -->
<link rel="canonical" href="https://arizonatelepsychiatryclinic.com/services.html" />
```

### 2.4 Open Graph Tags (Per Page)

Each page needs the following OG tags in `<head>`:

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Arizona Telepsychiatry Clinic" />
<meta property="og:title" content="[Same as title tag]" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:url" content="https://arizonatelepsychiatryclinic.com/[page].html" />
<meta property="og:image" content="https://arizonatelepsychiatryclinic.com/assets/og-[page].jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
```

OG image requirements:
- 1200x630px minimum
- Each page should have a unique OG image
- Include the page title and brand logo on the image
- Use the brand green (#6BAF92) as an accent color

### 2.5 Robots Meta Tag

All four landing pages should be indexable:

```html
<meta name="robots" content="index, follow" />
```

### 2.6 Sitemap Inclusion

Add all four pages to `/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://arizonatelepsychiatryclinic.com/index.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://arizonatelepsychiatryclinic.com/adhd.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arizonatelepsychiatryclinic.com/anxiety-depression.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arizonatelepsychiatryclinic.com/insomnia.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arizonatelepsychiatryclinic.com/services.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arizonatelepsychiatryclinic.com/blog.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://arizonatelepsychiatryclinic.com/book.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

Also create a `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://arizonatelepsychiatryclinic.com/sitemap.xml
```

### 2.7 Page Speed Optimization (Tailwind CDN Sites)

The site currently loads Tailwind via CDN (`cdn.tailwindcss.com`). This is the single biggest performance bottleneck. Here is the optimization priority list:

#### Critical (Must Fix)

1. **Tailwind CDN script is render-blocking** — It loads ~300KB+ of JavaScript that compiles CSS at runtime in the browser.
   - Short-term fix: Add `crossorigin` and preconnect hints:
     ```html
     <link rel="preconnect" href="https://cdn.tailwindcss.com" />
     ```
   - Long-term fix: Switch to a build step with `@tailwindcss/cli` to generate a static CSS file. This alone can cut LCP by 1-2 seconds.

2. **Google Fonts render-blocking** — Currently loading Red Hat Text from Google Fonts.
   - Add `font-display: swap` (already included via `&display=swap` -- confirm this is present on all pages)
   - Consider self-hosting the font files for fewer network requests

3. **No image optimization** — Serve images in WebP/AVIF format with explicit `width` and `height` attributes to prevent CLS.

#### Important

4. **Add resource hints** to `<head>`:
   ```html
   <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
   <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   ```

5. **Lazy-load below-the-fold images**:
   ```html
   <img loading="lazy" decoding="async" ... />
   ```

6. **Minify inline CSS and remove unused styles** in `<style>` blocks.

7. **Defer non-critical JavaScript** — Any scripts not needed for initial render should use `defer` or be moved to bottom of `<body>`.

### 2.8 Mobile-First Indexing Requirements

- [x] `<meta name="viewport" content="width=device-width, initial-scale=1">` present (confirmed in existing pages)
- [ ] All tap targets minimum 48x48px (buttons, links)
- [ ] Font size minimum 16px for body text (prevents zoom on iOS)
- [ ] No horizontal scrolling on any screen width
- [ ] All content visible without horizontal scroll at 320px width
- [ ] Mobile menu fully functional with all navigation items accessible
- [ ] Phone number clickable with `tel:` links
- [ ] Book Now CTA visible without scrolling on mobile (sticky header or above-the-fold)
- [ ] Form inputs use appropriate `type` attributes (email, tel, etc.) for mobile keyboards
- [ ] Test all pages in Chrome DevTools mobile emulation at 375px and 390px widths

### 2.9 Core Web Vitals Checklist

#### LCP (Largest Contentful Paint) — Target: Under 2.5 seconds
- [ ] Hero image/text renders within 2.5s
- [ ] No render-blocking resources delay main content
- [ ] Server response time (TTFB) under 800ms
- [ ] Hero image preloaded: `<link rel="preload" as="image" href="hero.webp" />`
- [ ] CDN serving static assets (Vercel handles this)

#### INP (Interaction to Next Paint) — Target: Under 200ms
- [ ] No long JavaScript tasks blocking main thread
- [ ] Click handlers respond within 200ms
- [ ] Mobile menu toggle is instant
- [ ] FAQ accordion animations are CSS-only (no JS layout thrashing)
- [ ] Book Now button navigation is immediate

#### CLS (Cumulative Layout Shift) — Target: Under 0.1
- [ ] All images have explicit `width` and `height` attributes
- [ ] Fonts use `font-display: swap` with size-adjust fallback
- [ ] No content injected above existing content after load
- [ ] Sticky header has fixed height (does not resize on scroll)
- [ ] No ads or dynamic banners that shift content

---

## 3. Content SEO Checklist

### 3.1 H1 Recommendations (One Per Page, Include Primary Keyword)

| Page | Recommended H1 |
|---|---|
| adhd.html | Online ADHD Evaluation & Treatment in Arizona |
| anxiety-depression.html | Online Anxiety & Depression Treatment in Arizona |
| insomnia.html | Online Insomnia Treatment in Arizona |
| services.html | Telepsychiatry Services for Adults Across Arizona |

### 3.2 H2 Structure Recommendations

#### adhd.html
```
H1: Online ADHD Evaluation & Treatment in Arizona
  H2: How Our Online ADHD Evaluation Works
  H2: ADHD Symptoms in Adults
  H2: Treatment Options for Adult ADHD
    H3: Medication Management
    H3: Behavioral Strategies
  H2: Why Choose Telehealth for ADHD Care in Arizona
  H2: What to Expect During Your First Visit
  H2: Insurance & Pricing
  H2: ADHD in Women and AFAB Adults
  H2: Frequently Asked Questions About ADHD Evaluations
  H2: Areas We Serve Across Arizona
  H2: Book Your ADHD Evaluation Today
```

#### anxiety-depression.html
```
H1: Online Anxiety & Depression Treatment in Arizona
  H2: Understanding Anxiety and Depression
    H3: Common Symptoms of Anxiety
    H3: Common Symptoms of Depression
    H3: When Anxiety and Depression Occur Together
  H2: How Online Treatment Works
  H2: Evidence-Based Treatment Approaches
    H3: Medication Management
    H3: Therapy Options
  H2: Why Telepsychiatry for Anxiety and Depression
  H2: What to Expect at Your First Appointment
  H2: Insurance & Pricing
  H2: Frequently Asked Questions
  H2: Areas We Serve Across Arizona
  H2: Start Your Treatment Today
```

#### insomnia.html
```
H1: Online Insomnia Treatment in Arizona
  H2: What Is Chronic Insomnia
  H2: Signs You May Need Professional Help for Sleep
  H2: How Online Insomnia Treatment Works
  H2: Treatment Approaches
    H3: CBT-I (Cognitive Behavioral Therapy for Insomnia)
    H3: Medication Management for Sleep
  H2: Why Choose Telehealth for Insomnia Care
  H2: What to Expect at Your First Visit
  H2: Insurance & Pricing
  H2: Frequently Asked Questions About Insomnia Treatment
  H2: Areas We Serve Across Arizona
  H2: Get Help With Your Sleep Tonight
```

#### services.html
```
H1: Telepsychiatry Services for Adults Across Arizona
  H2: Conditions We Treat
    H3: ADHD (Attention-Deficit/Hyperactivity Disorder)
    H3: Anxiety Disorders
    H3: Depression
    H3: Insomnia and Sleep Disorders
  H2: Our Services
    H3: Psychiatric Evaluations
    H3: Medication Management
    H3: Follow-Up Visits
  H2: How Telepsychiatry Works
  H2: Who We Serve
  H2: Our Providers
  H2: Insurance & Pricing
  H2: Frequently Asked Questions
  H2: Book Your First Appointment
```

### 3.3 Keyword Density Targets

Primary keyword density: 1-2% of total word count (naturally integrated, not stuffed).

| Page | Primary Keywords | Secondary Keywords | Long-Tail Keywords |
|---|---|---|---|
| adhd.html | "online ADHD evaluation Arizona" (4-6x), "ADHD telehealth Arizona" (2-3x) | "ADHD treatment Arizona," "ADHD diagnosis online," "adult ADHD Arizona" | "can I get ADHD medication online in Arizona," "how long does an online ADHD evaluation take" |
| anxiety-depression.html | "anxiety treatment online Arizona" (4-6x), "depression treatment online Arizona" (3-4x) | "online therapy Arizona," "telehealth anxiety treatment," "medication for anxiety Arizona" | "can a psychiatrist prescribe anxiety medication online in Arizona," "online depression help Arizona" |
| insomnia.html | "online insomnia treatment Arizona" (4-6x), "insomnia telehealth Arizona" (2-3x) | "CBT-I Arizona," "sleep disorder treatment online," "insomnia medication telehealth" | "can a doctor prescribe sleep medication online in Arizona," "CBT-I telehealth Arizona" |
| services.html | "telepsychiatry Arizona" (5-7x), "online psychiatrist Arizona" (3-4x) | "telehealth psychiatry Phoenix," "virtual psychiatry Arizona," "telepsychiatry services" | "how does telepsychiatry work in Arizona," "is telepsychiatry covered by insurance in Arizona" |

### 3.4 Internal Linking Map

```
index.html (Homepage - Hub)
├── adhd.html ←→ anxiety-depression.html (bidirectional: "Many adults with ADHD also experience anxiety or depression")
├── adhd.html ←→ services.html (bidirectional: "View all our services" / "Learn more about ADHD evaluations")
├── anxiety-depression.html ←→ insomnia.html (bidirectional: "Anxiety and depression often cause sleep problems")
├── anxiety-depression.html ←→ services.html (bidirectional)
├── insomnia.html ←→ services.html (bidirectional)
├── insomnia.html ←→ adhd.html (one-way: "Sleep problems are common with ADHD")
├── All condition pages → book.html (CTA links)
├── All condition pages → blog.html (relevant articles)
├── blog.html articles → condition pages (contextual backlinks)
└── services.html → all condition pages (condition cards with links)
```

**Minimum internal links per page:** 5-8 contextual links to other site pages.

Each condition page should include:
- 1 link to services.html ("See all services")
- 1 link to book.html ("Book now" CTA)
- 1-2 links to related condition pages (cross-condition linking)
- 1-2 links to relevant blog articles
- 1 link to index.html (via breadcrumb or logo)

### 3.5 Image Alt Text Requirements

Every `<img>` tag MUST have descriptive alt text:

| Image Type | Alt Text Pattern | Example |
|---|---|---|
| Hero/banner | "[Action] for [condition] via [method] in [location]" | "Adult completing an online ADHD evaluation from home in Arizona" |
| Provider photo | "[Name], [credentials] — [specialty] at Arizona Telepsychiatry Clinic" | "Dr. Smith, MD — Board-certified psychiatrist at Arizona Telepsychiatry Clinic" |
| Process/step | "Step [N]: [description of step]" | "Step 1: Schedule your online psychiatric evaluation" |
| Decorative | `alt=""` (empty alt, not missing) | `alt=""` |
| Icon/illustration | "[Description of what icon represents]" | "Checkmark icon indicating insurance accepted" |

### 3.6 Content Length Recommendations

| Page | Minimum Words | Target Words | Justification |
|---|---|---|---|
| adhd.html | 2,000 | 2,500-3,000 | Competitive keyword; needs depth to compete with ADHD Online, MEDvidi, Talkiatry |
| anxiety-depression.html | 2,000 | 2,500-3,000 | Covers two conditions; needs comprehensive treatment info |
| insomnia.html | 1,500 | 2,000-2,500 | Lower competition but still needs authority-building content |
| services.html | 1,800 | 2,000-2,500 | Overview page; needs enough depth to serve as a hub |

### 3.7 E-E-A-T Signals Required (CRITICAL for YMYL Healthcare Content)

Google classifies ALL healthcare content as YMYL (Your Money or Your Life). These signals are non-negotiable:

#### Experience
- [ ] Include a "Why we built this clinic" or "Our story" section referencing real clinical experience
- [ ] Use first-person clinical perspective where appropriate ("In our practice, we see...")
- [ ] Reference Arizona-specific clinical experience

#### Expertise
- [ ] **Author/reviewer block on EVERY page** — near the top, not buried at the bottom:
  ```
  Medically reviewed by [Name], [Credentials]
  Board-certified in [specialty]
  Last reviewed: [Date]
  ```
- [ ] Provider credentials prominently displayed (MD, DO, PMHNP-BC, etc.)
- [ ] Link to provider bio page or section
- [ ] Cite clinical guidelines (APA, AASM, DSM-5-TR) where relevant

#### Authoritativeness
- [ ] Include institutional affiliations if applicable
- [ ] Reference evidence-based treatment protocols
- [ ] Link to authoritative external sources (NIMH, APA, Mayo Clinic, CDC)
- [ ] Display any professional memberships (APA, AMA, Arizona Psychiatric Society)

#### Trustworthiness
- [ ] HTTPS enforced (Vercel handles this)
- [ ] Clear contact information on every page (phone, email, or contact form)
- [ ] Physical address or registered business address visible
- [ ] Privacy policy linked in footer
- [ ] Terms of service linked in footer
- [ ] HIPAA compliance badge/statement
- [ ] "Last updated" or "Medically reviewed" date on every clinical page
- [ ] Clear editorial/medical review process described
- [ ] No exaggerated claims ("guaranteed results," "instant cure," etc.)

---

## 4. AEO (Answer Engine Optimization)

### 4.1 People Also Ask (PAA) Questions to Target

#### adhd.html — Target PAA Questions

1. **"Can you get an ADHD diagnosis online in Arizona?"**
   - Format: Paragraph snippet (40-60 words)
   - Answer: "Yes, you can get an ADHD diagnosis online in Arizona. Licensed psychiatric providers can conduct comprehensive ADHD evaluations via secure telehealth video appointments. Arizona law permits telepsychiatry for psychiatric evaluations, diagnosis, and medication management, including for ADHD. The evaluation typically takes 60-90 minutes and may include standardized screening tools."

2. **"How much does an online ADHD evaluation cost in Arizona?"**
   - Format: Paragraph snippet
   - Answer: "An online ADHD evaluation in Arizona typically costs between $199 and $350 without insurance. Many telepsychiatry providers accept major insurance plans, including AHCCCS (Arizona Medicaid), which may significantly reduce out-of-pocket costs. Some providers offer sliding-scale pricing or payment plans."

3. **"Can you get ADHD medication prescribed online in Arizona?"**
   - Format: Paragraph snippet
   - Answer: "Yes, licensed psychiatric providers in Arizona can prescribe ADHD medication through telehealth appointments. This includes both stimulant and non-stimulant medications. Providers must follow DEA and Arizona State Board of Pharmacy regulations, which require a video-based evaluation before prescribing controlled substances."

4. **"How long does an online ADHD evaluation take?"**
   - Format: Paragraph snippet
   - Answer: "An online ADHD evaluation typically takes 60 to 90 minutes for the initial appointment. This includes a clinical interview, symptom assessment, and review of your history. Some providers also use standardized rating scales or computerized attention tests. You may receive a diagnosis and begin discussing treatment options during this same visit."

5. **"Does AHCCCS cover online ADHD treatment?"**
   - Format: Paragraph snippet
   - Answer: "Yes, AHCCCS (Arizona's Medicaid program) covers telepsychiatry services, including online ADHD evaluations and treatment. Telehealth services are reimbursed at the same rate as in-person visits under Arizona's insurance parity laws. Contact your AHCCCS health plan to verify specific provider network coverage."

#### anxiety-depression.html — Target PAA Questions

1. **"Can you get anxiety medication online in Arizona?"**
   - Answer: "Yes, Arizona-licensed psychiatric providers can prescribe anxiety medication through secure telehealth appointments. Common medications prescribed include SSRIs, SNRIs, and buspirone. For controlled substances like benzodiazepines, a video evaluation is required by law. Many providers prefer to start with first-line non-controlled medications."

2. **"What is the best online therapy for anxiety and depression?"**
   - Answer: "The best online treatment for anxiety and depression combines medication management with evidence-based therapy such as CBT (Cognitive Behavioral Therapy). Telepsychiatry providers can offer psychiatric evaluations, medication prescriptions, and ongoing management via secure video visits. Look for board-certified providers who accept your insurance."

3. **"How does online depression treatment work?"**
   - Answer: "Online depression treatment begins with a comprehensive psychiatric evaluation via video call. Your provider reviews your symptoms, medical history, and treatment goals. If appropriate, they may prescribe medication such as an SSRI or SNRI, with follow-up appointments every 4-6 weeks to monitor progress and adjust treatment."

4. **"Is telepsychiatry as effective as in-person psychiatry?"**
   - Answer: "Research shows telepsychiatry is as effective as in-person psychiatric care for conditions including anxiety and depression. A systematic review published in the Journal of Clinical Psychiatry found equivalent outcomes for medication management and patient satisfaction. Arizona law recognizes telepsychiatry as meeting the same standard of care as in-person visits."

5. **"Does insurance cover online therapy in Arizona?"**
   - Answer: "Yes, most insurance plans in Arizona cover telepsychiatry and online therapy services. Arizona has telehealth parity laws requiring insurance companies to cover telehealth services at the same rate as in-person care. This includes AHCCCS (Medicaid), Medicare, and most commercial plans including Aetna, Blue Cross Blue Shield, Cigna, and UnitedHealthcare."

#### insomnia.html — Target PAA Questions

1. **"Can a doctor prescribe sleep medication online in Arizona?"**
   - Answer: "Yes, Arizona-licensed psychiatric providers can prescribe sleep medication through telehealth appointments. Common medications include trazodone, hydroxyzine, and other non-controlled sleep aids. For controlled sleep medications, providers must conduct a video evaluation and review your medical history before prescribing."

2. **"What is CBT-I and does it work for insomnia?"**
   - Answer: "CBT-I (Cognitive Behavioral Therapy for Insomnia) is the gold-standard, first-line treatment for chronic insomnia recommended by the American Academy of Sleep Medicine. It typically involves 4-8 sessions focusing on sleep restriction, stimulus control, cognitive restructuring, and sleep hygiene. Studies show 70-80% of patients improve with CBT-I, with effects lasting longer than medication."

3. **"Can you do CBT-I online through telehealth?"**
   - Answer: "Yes, CBT-I can be effectively delivered through telehealth. Research shows that virtual CBT-I delivers outcomes comparable to in-person treatment, producing similar improvements in sleep efficiency, total sleep time, and insomnia severity. CBT-I via telehealth is covered by most insurance plans in Arizona."

4. **"When should I see a psychiatrist for insomnia?"**
   - Answer: "You should see a psychiatrist for insomnia if sleep problems persist for more than three months, significantly impact your daily functioning, or occur alongside other mental health conditions like anxiety or depression. A psychiatric evaluation can identify underlying causes and determine whether medication, CBT-I, or a combination approach is best for your situation."

5. **"How much does online insomnia treatment cost?"**
   - Answer: "Online insomnia treatment costs vary based on insurance coverage and provider. With insurance, copays typically range from $20-$50 per telehealth visit. Without insurance, initial evaluations may cost $200-$350, with follow-up appointments ranging from $100-$200. CBT-I programs may range from $500-$1,200 for a complete course of treatment."

#### services.html — Target PAA Questions

1. **"What is telepsychiatry and how does it work?"**
   - Answer: "Telepsychiatry is the delivery of psychiatric care through secure video technology. Patients connect with licensed psychiatrists or psychiatric nurse practitioners from their home using a computer, tablet, or smartphone. Services include psychiatric evaluations, diagnosis, medication management, and therapy. It follows the same standard of care as in-person visits."

2. **"Is telepsychiatry covered by insurance in Arizona?"**
   - Answer: "Yes, telepsychiatry is covered by insurance in Arizona. Arizona's telehealth parity law requires insurers to reimburse telehealth services at the same rate as in-person care. This includes AHCCCS (Arizona Medicaid), Medicare, and most commercial insurance plans. Contact your insurance provider to verify your specific benefits."

3. **"What conditions can a telepsychiatrist treat?"**
   - Answer: "Telepsychiatrists can evaluate and treat a wide range of mental health conditions including ADHD, anxiety disorders, depression, insomnia, bipolar disorder, PTSD, OCD, and more. Treatment options include medication management, psychotherapy, and combined approaches. Some conditions requiring emergency intervention may need in-person care."

4. **"How do I prepare for a telepsychiatry appointment?"**
   - Answer: "To prepare for a telepsychiatry appointment, find a quiet, private space with reliable internet. Have your insurance card, a list of current medications, and any relevant medical records ready. Write down your main concerns and symptoms. Test your device's camera and microphone beforehand. Your provider will guide you through the rest during your appointment."

5. **"Can a telepsychiatrist prescribe controlled substances?"**
   - Answer: "Yes, telepsychiatrists in Arizona can prescribe controlled substances, including stimulant medications for ADHD and certain sleep or anxiety medications. Federal and state regulations require a video-based evaluation (not audio-only) before prescribing controlled substances. Providers follow DEA guidelines and Arizona prescribing laws."

### 4.2 Featured Snippet Format Recommendations

| Page | Target Snippet Type | Implementation |
|---|---|---|
| adhd.html | **Paragraph snippet** for "Can you get ADHD diagnosed online" + **Numbered list** for "How online ADHD evaluation works" | Place a concise 40-50 word answer directly after the relevant H2, then follow with a numbered list for process questions |
| anxiety-depression.html | **Paragraph snippet** for "online anxiety treatment" + **Bulleted list** for "symptoms of anxiety" | Use a definition-style paragraph for treatment questions, symptom lists for diagnostic questions |
| insomnia.html | **Paragraph snippet** for "What is CBT-I" + **Numbered list** for "insomnia treatment steps" | Lead with a clear definition paragraph, then structured steps |
| services.html | **Table** for "telepsychiatry services comparison" + **Paragraph snippet** for "what is telepsychiatry" | Create a comparison table of services and use a clear definition block |

### 4.3 Concise Answer Blocks

For each major question, structure the content as follows:

```html
<h2>Can You Get an ADHD Diagnosis Online in Arizona?</h2>
<p class="lead">
  <!-- 40-60 word direct answer — this is what AI engines will extract -->
  Yes, you can get an ADHD diagnosis online in Arizona. Licensed psychiatric
  providers conduct comprehensive ADHD evaluations via secure telehealth video
  appointments. Arizona law permits telepsychiatry for psychiatric evaluations,
  diagnosis, and medication management, including for ADHD.
</p>
<p>
  <!-- Extended supporting content follows -->
  At Arizona Telepsychiatry Clinic, our board-certified providers use...
</p>
```

**Rule:** Place the concise answer within the first 120 words after each H2 heading. This is the "answer zone" that both Google Featured Snippets and AI engines (ChatGPT, Gemini, Perplexity) extract from.

### 4.4 Voice Search Optimization

Target conversational long-tail keywords by including them naturally as H2/H3 headings or in FAQ sections:

#### adhd.html Voice Search Keywords
- "How do I get tested for ADHD online in Arizona"
- "Where can I get an ADHD evaluation near me in Phoenix"
- "Can I get Adderall prescribed through telehealth in Arizona"
- "What does an online ADHD assessment involve"
- "How quickly can I see a psychiatrist for ADHD in Arizona"

#### anxiety-depression.html Voice Search Keywords
- "How can I get help for anxiety online in Arizona"
- "What is the fastest way to see a psychiatrist for depression in Arizona"
- "Can I get anxiety medication without going to an office in Arizona"
- "What is the difference between anxiety and depression"
- "How do I know if I need medication for anxiety"

#### insomnia.html Voice Search Keywords
- "How can I get help with insomnia online in Arizona"
- "What is the best treatment for chronic insomnia"
- "Can a doctor prescribe me something for sleep online"
- "What is CBT-I and how does it work"
- "Why can't I sleep and when should I see a doctor"

#### services.html Voice Search Keywords
- "How does telepsychiatry work in Arizona"
- "What is the difference between telepsychiatry and online therapy"
- "Can I see a psychiatrist from home in Arizona"
- "What insurance plans cover telepsychiatry in Arizona"
- "How do I book an online psychiatry appointment in Arizona"

---

## 5. Schema Markup Templates

### 5.1 adhd.html — Complete JSON-LD

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://arizonatelepsychiatryclinic.com/adhd.html#webpage",
      "url": "https://arizonatelepsychiatryclinic.com/adhd.html",
      "name": "Online ADHD Evaluation in Arizona | AZ Telepsychiatry",
      "description": "Get an online ADHD evaluation from board-certified providers in Arizona. Fast, private telehealth assessments for adults.",
      "medicalAudience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient",
        "healthCondition": {
          "@type": "MedicalCondition",
          "name": "Attention Deficit Hyperactivity Disorder",
          "alternateName": "ADHD",
          "code": {
            "@type": "MedicalCode",
            "code": "F90",
            "codingSystem": "ICD-10"
          }
        }
      },
      "aspect": "Treatment",
      "lastReviewed": "2026-04-04",
      "reviewedBy": {
        "@type": "Person",
        "name": "[Provider Name]",
        "jobTitle": "Board-Certified Psychiatrist",
        "worksFor": {
          "@id": "https://arizonatelepsychiatryclinic.com/#clinic"
        }
      },
      "isPartOf": {
        "@id": "https://arizonatelepsychiatryclinic.com/#website"
      },
      "breadcrumb": {
        "@id": "https://arizonatelepsychiatryclinic.com/adhd.html#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://arizonatelepsychiatryclinic.com/adhd.html#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://arizonatelepsychiatryclinic.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://arizonatelepsychiatryclinic.com/services.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "ADHD Evaluation & Treatment",
          "item": "https://arizonatelepsychiatryclinic.com/adhd.html"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://arizonatelepsychiatryclinic.com/adhd.html#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you get an ADHD diagnosis online in Arizona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can get an ADHD diagnosis online in Arizona. Licensed psychiatric providers can conduct comprehensive ADHD evaluations via secure telehealth video appointments. Arizona law permits telepsychiatry for psychiatric evaluations, diagnosis, and medication management, including for ADHD. The evaluation typically takes 60-90 minutes and may include standardized screening tools."
          }
        },
        {
          "@type": "Question",
          "name": "How much does an online ADHD evaluation cost in Arizona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An online ADHD evaluation in Arizona typically costs between $199 and $350 without insurance. Many telepsychiatry providers accept major insurance plans, including AHCCCS (Arizona Medicaid), which may significantly reduce out-of-pocket costs."
          }
        },
        {
          "@type": "Question",
          "name": "Can you get ADHD medication prescribed online in Arizona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, licensed psychiatric providers in Arizona can prescribe ADHD medication through telehealth appointments. This includes both stimulant and non-stimulant medications. Providers must follow DEA and Arizona State Board of Pharmacy regulations, which require a video-based evaluation before prescribing controlled substances."
          }
        },
        {
          "@type": "Question",
          "name": "How long does an online ADHD evaluation take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An online ADHD evaluation typically takes 60 to 90 minutes for the initial appointment. This includes a clinical interview, symptom assessment, and review of your history. You may receive a diagnosis and begin discussing treatment options during this same visit."
          }
        },
        {
          "@type": "Question",
          "name": "Does AHCCCS cover online ADHD treatment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, AHCCCS (Arizona's Medicaid program) covers telepsychiatry services, including online ADHD evaluations and treatment. Telehealth services are reimbursed at the same rate as in-person visits under Arizona's insurance parity laws."
          }
        }
      ]
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://arizonatelepsychiatryclinic.com/#clinic",
      "name": "Arizona Telepsychiatry Clinic",
      "url": "https://arizonatelepsychiatryclinic.com",
      "description": "Online psychiatric evaluations and treatment for adults across Arizona.",
      "medicalSpecialty": "Psychiatry",
      "areaServed": {
        "@type": "State",
        "name": "Arizona",
        "sameAs": "https://en.wikipedia.org/wiki/Arizona"
      },
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "AZ",
        "addressCountry": "US"
      },
      "availableService": [
        {
          "@type": "MedicalTherapy",
          "name": "Online ADHD Evaluation",
          "description": "Comprehensive telehealth ADHD evaluation for adults in Arizona"
        },
        {
          "@type": "MedicalTherapy",
          "name": "ADHD Medication Management",
          "description": "Ongoing medication management for ADHD via telepsychiatry"
        }
      ]
    }
  ]
}
</script>
```

### 5.2 anxiety-depression.html — Complete JSON-LD

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://arizonatelepsychiatryclinic.com/anxiety-depression.html#webpage",
      "url": "https://arizonatelepsychiatryclinic.com/anxiety-depression.html",
      "name": "Anxiety & Depression Treatment Online | AZ Telepsychiatry",
      "description": "Online anxiety and depression treatment for adults in Arizona. Evidence-based medication management and therapy via secure telepsychiatry.",
      "medicalAudience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient"
      },
      "about": [
        {
          "@type": "MedicalCondition",
          "name": "Generalized Anxiety Disorder",
          "code": {
            "@type": "MedicalCode",
            "code": "F41.1",
            "codingSystem": "ICD-10"
          }
        },
        {
          "@type": "MedicalCondition",
          "name": "Major Depressive Disorder",
          "code": {
            "@type": "MedicalCode",
            "code": "F33",
            "codingSystem": "ICD-10"
          }
        }
      ],
      "aspect": "Treatment",
      "lastReviewed": "2026-04-04",
      "reviewedBy": {
        "@type": "Person",
        "name": "[Provider Name]",
        "jobTitle": "Board-Certified Psychiatrist"
      },
      "breadcrumb": {
        "@id": "https://arizonatelepsychiatryclinic.com/anxiety-depression.html#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://arizonatelepsychiatryclinic.com/anxiety-depression.html#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://arizonatelepsychiatryclinic.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://arizonatelepsychiatryclinic.com/services.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Anxiety & Depression Treatment",
          "item": "https://arizonatelepsychiatryclinic.com/anxiety-depression.html"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://arizonatelepsychiatryclinic.com/anxiety-depression.html#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you get anxiety medication online in Arizona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Arizona-licensed psychiatric providers can prescribe anxiety medication through secure telehealth appointments. Common medications prescribed include SSRIs, SNRIs, and buspirone. For controlled substances like benzodiazepines, a video evaluation is required by law."
          }
        },
        {
          "@type": "Question",
          "name": "Is telepsychiatry as effective as in-person psychiatry?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Research shows telepsychiatry is as effective as in-person psychiatric care for conditions including anxiety and depression. Studies have found equivalent outcomes for medication management and patient satisfaction. Arizona law recognizes telepsychiatry as meeting the same standard of care as in-person visits."
          }
        },
        {
          "@type": "Question",
          "name": "How does online depression treatment work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Online depression treatment begins with a comprehensive psychiatric evaluation via video call. Your provider reviews your symptoms, medical history, and treatment goals. If appropriate, they may prescribe medication such as an SSRI or SNRI, with follow-up appointments every 4-6 weeks to monitor progress."
          }
        },
        {
          "@type": "Question",
          "name": "Does insurance cover online therapy in Arizona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, most insurance plans in Arizona cover telepsychiatry and online therapy services. Arizona has telehealth parity laws requiring insurance companies to cover telehealth services at the same rate as in-person care. This includes AHCCCS (Medicaid), Medicare, and most commercial plans."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best online therapy for anxiety and depression?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best online treatment for anxiety and depression combines medication management with evidence-based therapy such as CBT (Cognitive Behavioral Therapy). Telepsychiatry providers can offer psychiatric evaluations, medication prescriptions, and ongoing management via secure video visits."
          }
        }
      ]
    }
  ]
}
</script>
```

### 5.3 insomnia.html — Complete JSON-LD

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://arizonatelepsychiatryclinic.com/insomnia.html#webpage",
      "url": "https://arizonatelepsychiatryclinic.com/insomnia.html",
      "name": "Online Insomnia Treatment Arizona | AZ Telepsychiatry",
      "description": "Struggling with insomnia? Get online sleep treatment from Arizona-licensed psychiatric providers. CBT-I and medication management via telehealth.",
      "medicalAudience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient",
        "healthCondition": {
          "@type": "MedicalCondition",
          "name": "Chronic Insomnia Disorder",
          "code": {
            "@type": "MedicalCode",
            "code": "G47.0",
            "codingSystem": "ICD-10"
          }
        }
      },
      "aspect": "Treatment",
      "lastReviewed": "2026-04-04",
      "reviewedBy": {
        "@type": "Person",
        "name": "[Provider Name]",
        "jobTitle": "Board-Certified Psychiatrist"
      },
      "breadcrumb": {
        "@id": "https://arizonatelepsychiatryclinic.com/insomnia.html#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://arizonatelepsychiatryclinic.com/insomnia.html#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://arizonatelepsychiatryclinic.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://arizonatelepsychiatryclinic.com/services.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Insomnia Treatment",
          "item": "https://arizonatelepsychiatryclinic.com/insomnia.html"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://arizonatelepsychiatryclinic.com/insomnia.html#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can a doctor prescribe sleep medication online in Arizona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Arizona-licensed psychiatric providers can prescribe sleep medication through telehealth appointments. Common medications include trazodone, hydroxyzine, and other non-controlled sleep aids. For controlled sleep medications, providers must conduct a video evaluation first."
          }
        },
        {
          "@type": "Question",
          "name": "What is CBT-I and does it work for insomnia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CBT-I (Cognitive Behavioral Therapy for Insomnia) is the gold-standard, first-line treatment for chronic insomnia recommended by the American Academy of Sleep Medicine. Studies show 70-80% of patients improve with CBT-I, with effects lasting longer than medication."
          }
        },
        {
          "@type": "Question",
          "name": "Can you do CBT-I online through telehealth?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, CBT-I can be effectively delivered through telehealth. Research shows that virtual CBT-I delivers outcomes comparable to in-person treatment, producing similar improvements in sleep efficiency, total sleep time, and insomnia severity."
          }
        },
        {
          "@type": "Question",
          "name": "When should I see a psychiatrist for insomnia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You should see a psychiatrist for insomnia if sleep problems persist for more than three months, significantly impact your daily functioning, or occur alongside other mental health conditions like anxiety or depression."
          }
        },
        {
          "@type": "Question",
          "name": "How much does online insomnia treatment cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With insurance, copays for telepsychiatry visits typically range from $20-$50. Without insurance, initial evaluations may cost $200-$350, with follow-up appointments ranging from $100-$200. Most Arizona insurance plans, including AHCCCS, cover telehealth visits."
          }
        }
      ]
    }
  ]
}
</script>
```

### 5.4 services.html — Complete JSON-LD

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://arizonatelepsychiatryclinic.com/services.html#webpage",
      "url": "https://arizonatelepsychiatryclinic.com/services.html",
      "name": "Telepsychiatry Services in Arizona | AZ Telepsychiatry",
      "description": "Arizona Telepsychiatry Clinic offers online psychiatric evaluations, medication management, and therapy for ADHD, anxiety, depression, and insomnia.",
      "medicalAudience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient"
      },
      "lastReviewed": "2026-04-04",
      "breadcrumb": {
        "@id": "https://arizonatelepsychiatryclinic.com/services.html#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://arizonatelepsychiatryclinic.com/services.html#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://arizonatelepsychiatryclinic.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://arizonatelepsychiatryclinic.com/services.html"
        }
      ]
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://arizonatelepsychiatryclinic.com/#clinic",
      "name": "Arizona Telepsychiatry Clinic",
      "url": "https://arizonatelepsychiatryclinic.com",
      "description": "Online psychiatric evaluations and treatment for adults across Arizona via secure telepsychiatry.",
      "medicalSpecialty": "Psychiatry",
      "areaServed": [
        {
          "@type": "City",
          "name": "Phoenix",
          "containedInPlace": { "@type": "State", "name": "Arizona" }
        },
        {
          "@type": "City",
          "name": "Tucson",
          "containedInPlace": { "@type": "State", "name": "Arizona" }
        },
        {
          "@type": "City",
          "name": "Mesa",
          "containedInPlace": { "@type": "State", "name": "Arizona" }
        },
        {
          "@type": "City",
          "name": "Scottsdale",
          "containedInPlace": { "@type": "State", "name": "Arizona" }
        },
        {
          "@type": "City",
          "name": "Chandler",
          "containedInPlace": { "@type": "State", "name": "Arizona" }
        },
        {
          "@type": "City",
          "name": "Flagstaff",
          "containedInPlace": { "@type": "State", "name": "Arizona" }
        },
        {
          "@type": "State",
          "name": "Arizona"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "AZ",
        "addressCountry": "US"
      },
      "availableService": [
        {
          "@type": "MedicalTherapy",
          "name": "Psychiatric Evaluation",
          "description": "Comprehensive initial psychiatric evaluation via secure telehealth"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Medication Management",
          "description": "Ongoing psychiatric medication management via telepsychiatry"
        },
        {
          "@type": "MedicalTherapy",
          "name": "ADHD Evaluation and Treatment",
          "description": "Online ADHD assessment, diagnosis, and medication management for adults"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Anxiety Treatment",
          "description": "Evidence-based treatment for anxiety disorders via telehealth"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Depression Treatment",
          "description": "Online treatment for major depressive disorder and related conditions"
        },
        {
          "@type": "MedicalTherapy",
          "name": "Insomnia Treatment",
          "description": "CBT-I and medication management for chronic insomnia via telehealth"
        }
      ],
      "telephone": "[PHONE NUMBER]",
      "email": "[EMAIL ADDRESS]"
    },
    {
      "@type": "FAQPage",
      "@id": "https://arizonatelepsychiatryclinic.com/services.html#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is telepsychiatry and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Telepsychiatry is the delivery of psychiatric care through secure video technology. Patients connect with licensed psychiatrists or psychiatric nurse practitioners from their home using a computer, tablet, or smartphone. Services include psychiatric evaluations, diagnosis, medication management, and therapy."
          }
        },
        {
          "@type": "Question",
          "name": "Is telepsychiatry covered by insurance in Arizona?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, telepsychiatry is covered by insurance in Arizona. Arizona's telehealth parity law requires insurers to reimburse telehealth services at the same rate as in-person care. This includes AHCCCS (Arizona Medicaid), Medicare, and most commercial insurance plans."
          }
        },
        {
          "@type": "Question",
          "name": "What conditions can a telepsychiatrist treat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Telepsychiatrists can evaluate and treat a wide range of mental health conditions including ADHD, anxiety disorders, depression, insomnia, bipolar disorder, PTSD, OCD, and more. Treatment options include medication management, psychotherapy, and combined approaches."
          }
        },
        {
          "@type": "Question",
          "name": "How do I prepare for a telepsychiatry appointment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Find a quiet, private space with reliable internet. Have your insurance card, a list of current medications, and any relevant medical records ready. Write down your main concerns and symptoms. Test your device's camera and microphone beforehand."
          }
        },
        {
          "@type": "Question",
          "name": "Can a telepsychiatrist prescribe controlled substances?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, telepsychiatrists in Arizona can prescribe controlled substances, including stimulant medications for ADHD and certain sleep or anxiety medications. Federal and state regulations require a video-based evaluation before prescribing controlled substances."
          }
        }
      ]
    }
  ]
}
</script>
```

### 5.5 Schema Verification Checklist

- [ ] Validate all JSON-LD with Google's Rich Results Test: https://search.google.com/test/rich-results
- [ ] Validate with Schema.org validator: https://validator.schema.org/
- [ ] Confirm FAQPage schema triggers FAQ rich results in Google Search Console
- [ ] Confirm BreadcrumbList appears in search results
- [ ] Verify MedicalWebPage `lastReviewed` date is current
- [ ] Replace all `[Provider Name]` placeholders with actual provider names
- [ ] Replace `[PHONE NUMBER]` and `[EMAIL ADDRESS]` with actual contact info
- [ ] Test schema renders correctly after deployment with Google's URL Inspection tool
- [ ] Check for JSON syntax errors (missing commas, unclosed brackets)
- [ ] Ensure no duplicate schema types on the same page (e.g., two FAQPage blocks)

---

## 6. Local SEO Strategy

### 6.1 Google Business Profile (GBP) Optimization

#### Profile Setup for Telepsychiatry

- **Business Name:** Arizona Telepsychiatry Clinic (exact match to website — no keyword stuffing)
- **Primary Category:** Psychiatrist
- **Secondary Categories:** Mental Health Service, Psychiatric Clinic, Telehealth Service
- **Service Area:** State of Arizona (select "Arizona" as service area, then add key cities: Phoenix, Tucson, Mesa, Scottsdale, Chandler, Gilbert, Glendale, Tempe, Peoria, Surprise, Flagstaff, Yuma)
- **Address Display:** Hide physical address (virtual practice); use registered agent address for verification only
- **Hours:** Set business hours for appointment availability
- **Website:** https://arizonatelepsychiatryclinic.com
- **Appointment Link:** https://arizonatelepsychiatryclinic.com/book.html
- **Attributes:** Enable "Online appointments," "Online care," "Telehealth"

#### GBP Description (750 characters max)

```
Arizona Telepsychiatry Clinic provides online psychiatric care for adults across
Arizona. Our board-certified providers offer comprehensive evaluations and treatment
for ADHD, anxiety, depression, and insomnia through secure telehealth appointments.
We accept most major insurance plans, including AHCCCS. Whether you are in Phoenix,
Tucson, Scottsdale, Mesa, or a rural Arizona community, you can access expert
psychiatric care from the comfort of your home. Our services include psychiatric
evaluations, medication management, and follow-up care. Book your first appointment
online today.
```

#### GBP Services to List

| Service Name | Service Description |
|---|---|
| Online ADHD Evaluation | Comprehensive ADHD assessment for adults via secure video appointment |
| ADHD Medication Management | Ongoing medication management for adult ADHD including stimulant and non-stimulant options |
| Anxiety Treatment | Evidence-based treatment for generalized anxiety, social anxiety, and panic disorder |
| Depression Treatment | Psychiatric evaluation and medication management for major depressive disorder |
| Insomnia Treatment | CBT-I and medication management for chronic insomnia via telehealth |
| Psychiatric Evaluation | Initial comprehensive psychiatric evaluation for new patients |
| Medication Management | Ongoing follow-up visits for psychiatric medication management |

#### GBP Posts Strategy

Post weekly to GBP with topics such as:
- Service highlights ("Now accepting new patients for ADHD evaluations")
- Educational content ("3 signs you might have adult ADHD")
- Insurance updates ("We now accept [plan name]")
- Seasonal relevance ("Holiday stress? Get help for anxiety from home")

### 6.2 NAP Consistency

NAP (Name, Address, Phone) must be IDENTICAL across all citations:

```
Arizona Telepsychiatry Clinic
[Registered Business Address]
[Phone Number]
```

#### Critical Citation Sources to Submit To

1. Google Business Profile
2. Yelp (Health & Medical > Psychiatrists)
3. Healthgrades
4. Zocdoc
5. Psychology Today directory
6. WebMD physician directory
7. Vitals.com
8. NPI Registry (if applicable)
9. Arizona Medical Board (verify provider licenses are public)
10. Better Business Bureau (BBB)
11. Apple Maps / Apple Business Connect
12. Bing Places for Business

### 6.3 Service Area Configuration for Virtual Care

Since this is a telehealth-only practice:

1. **Do NOT claim a specific storefront location** in GBP unless you have a physical office patients can visit
2. **Set service area to "Arizona"** as the primary area
3. **Add individual cities** as secondary service areas (Phoenix, Tucson, Mesa, Scottsdale, Chandler, Gilbert, Tempe, Flagstaff, Yuma, Prescott, Sierra Vista, Lake Havasu City)
4. **In schema markup**, list areaServed with both the state and major cities (as shown in the services.html schema above)
5. **Create location-mention content** — reference Arizona cities naturally in page content (e.g., "Whether you are in Phoenix, Tucson, or a rural Arizona community...")

### 6.4 Review Generation Strategy

#### Approach

- Ask patients for Google reviews after successful second or third appointment (not the first — build relationship first)
- Use a simple review link: `https://g.page/[your-gbp-id]/review`
- Send automated follow-up email 24-48 hours after appointment with review request
- Goal: 5+ new reviews per month to build authority

#### Review Request Template

```
Subject: How was your visit with Arizona Telepsychiatry Clinic?

Hi [First Name],

Thank you for your recent appointment with us. We hope your visit was
helpful. If you have a moment, we would greatly appreciate a Google
review. Your feedback helps other Arizonans find quality mental health
care online.

[Leave a Review Button → Google Review Link]

Thank you for trusting us with your care.

— The Arizona Telepsychiatry Clinic Team
```

#### Review Response Guidelines

- Respond to ALL reviews within 48 hours
- Thank positive reviewers specifically (without revealing health details — HIPAA)
- For negative reviews: Acknowledge, do not argue, invite them to contact the office privately
- Never confirm or deny that someone is a patient in a public review response

---

## 7. Page-by-Page Implementation Guide

### 7.1 adhd.html

#### Head Section Checklist
- [ ] Title: `Online ADHD Evaluation in Arizona | AZ Telepsychiatry`
- [ ] Meta description (152 chars): as specified in Section 2.2
- [ ] Canonical URL: `https://arizonatelepsychiatryclinic.com/adhd.html`
- [ ] Open Graph tags (all 8 OG properties)
- [ ] `<meta name="robots" content="index, follow" />`
- [ ] JSON-LD schema (MedicalWebPage + BreadcrumbList + FAQPage + MedicalClinic)
- [ ] Viewport meta tag
- [ ] Preconnect hints for fonts and CDN

#### Content Structure
- [ ] H1: "Online ADHD Evaluation & Treatment in Arizona"
- [ ] Minimum 2,500 words
- [ ] 5 FAQ questions with structured answers (matching schema)
- [ ] Concise answer blocks within first 120 words after each H2
- [ ] Medical reviewer block near top of page
- [ ] "Last reviewed: [Date]" visible on page
- [ ] At least 6 internal links (services.html, anxiety-depression.html, insomnia.html, book.html, blog articles)
- [ ] At least 2 external authority links (NIMH, APA, or similar)
- [ ] CTA button above the fold ("Book Your ADHD Evaluation")
- [ ] CTA button after FAQ section
- [ ] Arizona cities mentioned naturally in body text
- [ ] All images have descriptive alt text

#### Keywords to Include Naturally
- "online ADHD evaluation Arizona" (4-6x)
- "ADHD telehealth Arizona" (2-3x)
- "adult ADHD" (3-4x)
- "ADHD diagnosis online" (2-3x)
- "ADHD medication telehealth" (1-2x)
- "telepsychiatry" (2-3x)
- "board-certified" (1-2x)

### 7.2 anxiety-depression.html

#### Head Section Checklist
- [ ] Title: `Anxiety & Depression Treatment Online | AZ Telepsychiatry`
- [ ] Meta description (149 chars): as specified in Section 2.2
- [ ] Canonical URL: `https://arizonatelepsychiatryclinic.com/anxiety-depression.html`
- [ ] Open Graph tags
- [ ] Robots meta tag
- [ ] JSON-LD schema (MedicalWebPage + BreadcrumbList + FAQPage)
- [ ] Viewport meta tag
- [ ] Preconnect hints

#### Content Structure
- [ ] H1: "Online Anxiety & Depression Treatment in Arizona"
- [ ] Minimum 2,500 words
- [ ] 5 FAQ questions with structured answers
- [ ] Concise answer blocks within 120 words after each H2
- [ ] Medical reviewer block near top
- [ ] "Last reviewed: [Date]" visible
- [ ] At least 6 internal links
- [ ] At least 2 external authority links
- [ ] CTA above fold
- [ ] Symptom lists formatted as bulleted lists (for featured snippets)
- [ ] Co-occurrence section: "When Anxiety and Depression Occur Together"
- [ ] Arizona cities mentioned

#### Keywords to Include Naturally
- "anxiety treatment online Arizona" (4-6x)
- "depression treatment online Arizona" (3-4x)
- "online therapy Arizona" (2-3x)
- "medication management" (2-3x)
- "telepsychiatry" (2-3x)
- "CBT" / "cognitive behavioral therapy" (2-3x)
- "board-certified" (1-2x)

### 7.3 insomnia.html

#### Head Section Checklist
- [ ] Title: `Online Insomnia Treatment Arizona | AZ Telepsychiatry`
- [ ] Meta description (149 chars): as specified in Section 2.2
- [ ] Canonical URL: `https://arizonatelepsychiatryclinic.com/insomnia.html`
- [ ] Open Graph tags
- [ ] Robots meta tag
- [ ] JSON-LD schema (MedicalWebPage + BreadcrumbList + FAQPage)
- [ ] Viewport meta tag
- [ ] Preconnect hints

#### Content Structure
- [ ] H1: "Online Insomnia Treatment in Arizona"
- [ ] Minimum 2,000 words
- [ ] 5 FAQ questions with structured answers
- [ ] Concise answer blocks
- [ ] Medical reviewer block
- [ ] "Last reviewed: [Date]" visible
- [ ] At least 5 internal links
- [ ] At least 2 external authority links (AASM, Sleep Foundation)
- [ ] CTA above fold
- [ ] CBT-I explanation section (paragraph format for featured snippet)
- [ ] Arizona cities mentioned

#### Keywords to Include Naturally
- "online insomnia treatment Arizona" (4-6x)
- "insomnia telehealth Arizona" (2-3x)
- "CBT-I" / "cognitive behavioral therapy for insomnia" (3-5x)
- "sleep medication online" (2-3x)
- "chronic insomnia" (2-3x)
- "telepsychiatry" (2-3x)

### 7.4 services.html

#### Head Section Checklist
- [ ] Title: `Telepsychiatry Services in Arizona | AZ Telepsychiatry`
- [ ] Meta description (152 chars): as specified in Section 2.2
- [ ] Canonical URL: `https://arizonatelepsychiatryclinic.com/services.html`
- [ ] Open Graph tags
- [ ] Robots meta tag
- [ ] JSON-LD schema (MedicalWebPage + BreadcrumbList + MedicalClinic + FAQPage)
- [ ] Viewport meta tag
- [ ] Preconnect hints

#### Content Structure
- [ ] H1: "Telepsychiatry Services for Adults Across Arizona"
- [ ] Minimum 2,000 words
- [ ] 5 FAQ questions with structured answers
- [ ] Service cards linking to each condition page (ADHD, Anxiety/Depression, Insomnia)
- [ ] "How Telepsychiatry Works" process section
- [ ] Provider credentials section
- [ ] Insurance information section
- [ ] Pricing transparency
- [ ] Medical reviewer block
- [ ] CTA above fold and after each major section
- [ ] All four condition pages linked prominently

#### Keywords to Include Naturally
- "telepsychiatry Arizona" (5-7x)
- "online psychiatrist Arizona" (3-4x)
- "telehealth psychiatry Phoenix" (1-2x)
- "virtual psychiatry Arizona" (1-2x)
- "psychiatric evaluation online" (2-3x)
- "medication management" (3-4x)

---

## 8. Verification Checklists

### 8.1 Pre-Launch Technical Audit

Run these checks before publishing each page:

#### HTML Validation
- [ ] Validate HTML with W3C Validator (https://validator.w3.org/)
- [ ] No duplicate IDs
- [ ] All tags properly closed
- [ ] No broken internal links (test every `<a>` href)
- [ ] All images have `alt` attributes

#### SEO Tag Verification
- [ ] Only ONE `<h1>` per page
- [ ] Title tag present and under 60 characters
- [ ] Meta description present and under 160 characters
- [ ] Canonical URL present and correct
- [ ] Robots meta tag set to `index, follow`
- [ ] Open Graph tags complete (test with https://opengraph.dev)
- [ ] `lang="en"` attribute on `<html>` tag

#### Schema Verification
- [ ] JSON-LD validates at https://search.google.com/test/rich-results
- [ ] JSON-LD validates at https://validator.schema.org/
- [ ] No JSON syntax errors
- [ ] All placeholder values replaced with real data
- [ ] FAQPage questions match visible FAQ content on the page
- [ ] BreadcrumbList URLs are correct and resolve
- [ ] MedicalWebPage `lastReviewed` date is current

#### Performance Verification
- [ ] Run Google PageSpeed Insights (https://pagespeed.web.dev/) — target 90+ mobile score
- [ ] LCP under 2.5 seconds on mobile
- [ ] INP under 200ms
- [ ] CLS under 0.1
- [ ] All images are optimized (WebP/AVIF, compressed, width/height set)
- [ ] No render-blocking resources besides Tailwind CDN
- [ ] Fonts loading with `display=swap`

#### Mobile Verification
- [ ] Test at 375px width (iPhone SE)
- [ ] Test at 390px width (iPhone 14)
- [ ] Test at 412px width (Pixel 7)
- [ ] All text readable without zooming
- [ ] All buttons/links tappable (48px minimum touch targets)
- [ ] No horizontal scroll
- [ ] Mobile menu fully functional
- [ ] CTA visible above fold on mobile

### 8.2 Post-Launch Monitoring

#### Week 1
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for all four new pages in Google Search Console
- [ ] Verify all pages are crawlable (URL Inspection tool)
- [ ] Check for crawl errors in Google Search Console
- [ ] Verify schema is recognized (Enhancements > FAQ, Breadcrumbs in GSC)
- [ ] Confirm pages appear in Google with `site:arizonatelepsychiatryclinic.com`

#### Week 2-4
- [ ] Monitor impressions and clicks in Google Search Console
- [ ] Check which queries are triggering the pages
- [ ] Verify FAQ rich results are appearing
- [ ] Monitor Core Web Vitals in GSC (Experience > Core Web Vitals)
- [ ] Check for any manual actions or security issues in GSC

#### Monthly Ongoing
- [ ] Update "Last reviewed" dates on all clinical pages (quarterly minimum)
- [ ] Monitor keyword rankings for target keywords
- [ ] Check for broken links
- [ ] Review and respond to all Google reviews
- [ ] Publish 2-4 new blog posts per month linking to condition pages
- [ ] Monitor competitor changes and new entrants
- [ ] Update schema if services, providers, or contact info changes

### 8.3 Content Quality Checklist (YMYL Compliance)

Before publishing any clinical content, verify:

- [ ] All medical claims are accurate and evidence-based
- [ ] No guarantees of outcomes ("you will feel better" — instead: "many patients experience improvement")
- [ ] Sources cited for clinical statistics and treatment protocols
- [ ] Medical reviewer has actually reviewed the content
- [ ] Content does not substitute for medical advice — include disclaimer
- [ ] Emergency resources included (988 Suicide & Crisis Lifeline, 911) on anxiety/depression page
- [ ] No off-label medication claims without proper context
- [ ] Treatment descriptions align with current APA/AASM guidelines
- [ ] Privacy/HIPAA language is present where patient data is discussed

---

## Appendix A: Quick-Reference Keyword Map

| Target Keyword | Primary Page | Supporting Pages | Blog Articles to Create |
|---|---|---|---|
| online ADHD evaluation Arizona | adhd.html | services.html, index.html | "What to Expect During an Online ADHD Evaluation" |
| telepsychiatry Arizona | services.html | index.html, all condition pages | "What Is Telepsychiatry? A Guide for Arizona Residents" |
| online psychiatrist Phoenix | services.html | index.html | "How to Find an Online Psychiatrist in Phoenix" |
| ADHD telehealth Arizona | adhd.html | services.html | "ADHD Telehealth in Arizona: Everything You Need to Know" |
| anxiety treatment online Arizona | anxiety-depression.html | services.html | "Online Anxiety Treatment Options in Arizona" |
| online insomnia treatment Arizona | insomnia.html | services.html | "Can't Sleep? Online Insomnia Treatment in Arizona" |
| ADHD medication online Arizona | adhd.html | services.html | "Getting ADHD Medication Online in Arizona: What to Know" |
| CBT-I telehealth Arizona | insomnia.html | services.html | "CBT-I via Telehealth: How It Works in Arizona" |
| depression treatment telehealth Arizona | anxiety-depression.html | services.html | "Online Depression Treatment in Arizona" |
| AHCCCS telepsychiatry | services.html | all condition pages | "Does AHCCCS Cover Telepsychiatry? Arizona Medicaid Guide" |

## Appendix B: Competitor Quick-Reference

| Competitor | Domain | Strengths to Match | Weaknesses to Exploit |
|---|---|---|---|
| Talkiatry | talkiatry.com | Insurance coverage, provider profiles, trust signals | Generic national template, not AZ-localized |
| ADHD Online | adhdonline.com | Niche ADHD authority, clear pricing, fast turnaround | Single condition only, no insomnia/anxiety pages |
| MEDvidi | medvidi.com | Multi-condition, state-specific pages, stimulant prescribing | Template feel, limited AZ-specific content |
| Platinum Psychiatry | platinumpsychiatry.com | Arizona-focused, local authority | Thin content, minimal schema, no blog |
| TelepsychHealth | telepsychhealth.com | Multi-state, professional presentation | Weak E-E-A-T signals, no FAQ schema, generic content |

## Appendix C: Medical Disclaimer Template

Include this on all clinical pages (footer or bottom of main content):

```
Medical Disclaimer: The information on this page is for educational purposes
and is not a substitute for professional medical advice, diagnosis, or treatment.
Always consult a qualified healthcare provider with questions about your mental
health. If you are in crisis, call 988 (Suicide & Crisis Lifeline) or 911.

Content reviewed by [Provider Name], [Credentials]
Last reviewed: [Date]
```

---

*Report prepared: April 4, 2026*
*For: Arizona Telepsychiatry Clinic (arizonatelepsychiatryclinic.com)*
*Landing pages covered: adhd.html, anxiety-depression.html, insomnia.html, services.html*
