# Bristol House Clearances — Implementation Plan for Claude Code

**Stack:** Astro 5 · Tailwind 4 · TypeScript 5.7 · Zod 3 · Resend · Cloudflare Turnstile · Cloudflare Pages  
**Domain:** bristolhouseclearances.co.uk  
**Skills:** astro-forms · lead-gen-calculator · zero-cost-tracking

---

## Phase 0 — Project Scaffold

### 0.1 Create project

```bash
npm create astro@latest bristol-house-clearances -- --template minimal --typescript strict
cd bristol-house-clearances
npx astro add tailwind cloudflare
npm i zod resend @astrojs/sitemap
npm i -D @cloudflare/workers-types
```

### 0.2 Directory structure

```
src/
├── config/
│   ├── site.ts              # Brand, contact, social, business info
│   ├── navigation.ts        # Main nav + footer links
│   └── areas.ts             # All area data (name, slug, region, tier, description, propertyTypes, avgPrice, postcodes, nearestRecycling, charityRoutes)
├── content/
│   ├── config.ts            # Content collection schemas (Zod)
│   ├── services/            # .md — pillar + cluster pages
│   ├── areas/               # .md — location pages
│   ├── guides/              # .md — resource hub articles
│   ├── blog/                # .md — seasonal/trending posts
│   ├── case-studies/        # .md — project case studies
│   └── faqs/                # .json — FAQ items by category
├── layouts/
│   ├── BaseLayout.astro     # <html>, meta, fonts, scripts, GTM
│   ├── ServiceLayout.astro  # Service page wrapper (breadcrumb, sidebar CTA, related services)
│   ├── GuideLayout.astro    # Article wrapper (TOC, author, reading time, related guides)
│   ├── AreaLayout.astro     # Location page wrapper (map embed, area stats, service links)
│   └── LegalLayout.astro    # Privacy, T&C
├── components/
│   ├── global/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Breadcrumb.astro
│   │   ├── CookieBanner.astro
│   │   ├── SkipToContent.astro
│   │   └── MobileMenu.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   ├── Accordion.astro     # For FAQ sections
│   │   ├── Testimonial.astro
│   │   └── BeforeAfter.astro   # Before/after image slider
│   ├── sections/
│   │   ├── Hero.astro           # Reusable hero with Picture
│   │   ├── ServiceGrid.astro    # 4 service pillars
│   │   ├── ProcessSteps.astro   # How it works (3-4 steps)
│   │   ├── TrustBar.astro       # Logos: Environment Agency, Checkatrade, etc.
│   │   ├── AreaGrid.astro       # Grid of area links
│   │   ├── TestimonialsCarousel.astro
│   │   ├── FAQSection.astro     # With Schema.org markup
│   │   ├── CTABanner.astro      # "Get a free quote" CTA band
│   │   ├── RelatedServices.astro
│   │   ├── PricingTable.astro
│   │   └── EnvironmentalStats.astro  # Recycling rate, tonnes diverted
│   ├── forms/
│   │   ├── QuoteForm.astro      # Main contact/quote form
│   │   └── CallbackForm.astro   # Short "call me back" form
│   └── seo/
│       ├── SchemaOrg.astro      # JSON-LD: LocalBusiness, Service, FAQ, BreadcrumbList
│       ├── OpenGraph.astro
│       └── Canonical.astro
├── pages/
│   ├── index.astro
│   ├── house-clearance/
│   │   ├── index.astro                    # Pillar
│   │   ├── hoarder-clearance.astro
│   │   ├── end-of-tenancy-clearance.astro
│   │   ├── landlord-clearance.astro
│   │   ├── loft-clearance.astro
│   │   ├── cellar-clearance.astro
│   │   ├── flat-clearance.astro
│   │   ├── downsizing-clearance.astro
│   │   └── furniture-removal.astro
│   ├── probate-house-clearance/
│   │   ├── index.astro                    # Pillar
│   │   ├── bereavement-clearance.astro
│   │   └── estate-clearance.astro
│   ├── commercial-clearance/
│   │   ├── index.astro                    # Pillar
│   │   ├── office-clearance.astro
│   │   ├── shop-clearance.astro
│   │   ├── warehouse-clearance.astro
│   │   └── confidential-waste-disposal.astro
│   ├── garden-clearance/
│   │   ├── index.astro                    # Pillar
│   │   ├── garage-clearance.astro
│   │   ├── shed-clearance.astro
│   │   ├── garden-waste-removal.astro
│   │   └── outbuilding-clearance.astro
│   ├── areas/
│   │   ├── index.astro                    # Hub
│   │   ├── [...slug].astro                # Dynamic: regional hubs + individual areas
│   ├── guides/
│   │   ├── [...slug].astro                # Dynamic from content collection
│   ├── blog/
│   │   ├── index.astro                    # Blog listing
│   │   ├── [...slug].astro
│   ├── case-studies/
│   │   ├── index.astro
│   │   ├── [...slug].astro
│   ├── about.astro
│   ├── reviews.astro
│   ├── licensing-accreditations.astro
│   ├── environmental-policy.astro
│   ├── faq.astro
│   ├── for-solicitors.astro
│   ├── for-estate-agents.astro
│   ├── charity-partners.astro
│   ├── contact.astro
│   ├── thank-you.astro
│   ├── privacy-policy.astro
│   ├── terms-and-conditions.astro
│   └── api/
│       ├── quote.ts              # Quote form endpoint
│       └── callback.ts           # Callback form endpoint
├── lib/
│   └── forms/                    # From astro-forms skill boilerplate
│       ├── schemas.ts
│       ├── email/
│       ├── turnstile.ts
│       ├── rate-limit.ts
│       ├── logger.ts
│       └── sheets.ts
├── styles/
│   └── global.css                # Tailwind directives, custom properties
└── assets/
    └── images/                   # ChatGPT-generated images (see §Image Strategy)
        ├── heroes/
        ├── services/
        ├── areas/
        ├── guides/
        ├── blog/
        └── trust/
```

### 0.3 Config files

**astro.config.ts:**
```typescript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bristolhouseclearances.co.uk',
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [tailwind(), sitemap()],
  image: { domains: [] },
});
```

**wrangler.toml:**
```toml
name = "bristol-house-clearances"
compatibility_date = "2025-01-01"
pages_build_output_dir = "./dist"

[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "TO_BE_CREATED"
```

**.env.example:**
```env
RESEND_API_KEY=re_xxxxx
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/...
SITE_URL=https://bristolhouseclearances.co.uk
TURNSTILE_SITE_KEY=0x...
TURNSTILE_SECRET_KEY=0x...
BUSINESS_EMAIL=info@bristolhouseclearances.co.uk
BUSINESS_PHONE=0117XXXXXXX
```

### 0.4 Content collection schemas (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    h1: z.string(),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()),
    silo: z.enum(['house-clearance', 'probate', 'commercial', 'garden']),
    priority: z.enum(['high', 'medium', 'low']),
    heroImage: z.string(),
    images: z.array(z.string()).length(3),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    relatedServices: z.array(z.string()).optional(),
    relatedAreas: z.array(z.string()).optional(),
  }),
});

const areas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    h1: z.string(),
    area: z.string(),
    region: z.enum(['central', 'north', 'south', 'east', 'west', 'south-gloucestershire', 'north-somerset', 'bath-keynsham']),
    tier: z.enum(['1', '2', '3']),
    primaryKeyword: z.string(),
    postcodes: z.array(z.string()),
    propertyTypes: z.array(z.string()),
    avgPropertyPrice: z.string().optional(),
    nearestRecyclingCentre: z.string(),
    localCharities: z.array(z.string()),
    serviceFocus: z.enum(['probate-estate', 'landlord-tenant', 'family-downsizing', 'mixed']),
    heroImage: z.string(),
    images: z.array(z.string()).length(3),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3).max(5),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    h1: z.string(),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()),
    category: z.enum(['cost', 'how-to', 'comparison', 'item-disposal', 'seasonal']),
    priority: z.enum(['high', 'medium', 'low']),
    wordCount: z.number().min(800),
    heroImage: z.string(),
    images: z.array(z.string()).length(3),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    relatedServices: z.array(z.string()),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    primaryKeyword: z.string(),
    category: z.enum(['seasonal', 'tips', 'local', 'news']),
    heroImage: z.string(),
    images: z.array(z.string()).length(3),
    publishDate: z.date(),
    author: z.string().default('Bristol House Clearances Team'),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    serviceType: z.enum(['house-clearance', 'probate', 'commercial', 'garden', 'hoarder']),
    area: z.string(),
    propertyType: z.string(),
    challenge: z.string(),
    outcome: z.string(),
    recyclingRate: z.string(),
    duration: z.string(),
    heroImage: z.string(),
    images: z.array(z.string()).length(3),
    testimonialQuote: z.string().optional(),
    testimonialName: z.string().optional(),
  }),
});

export const collections = { services, areas, guides, blog, 'case-studies': caseStudies };
```

---

## Phase 1 — Core Pages (Claude Code Steps 1–15)

Execute these steps sequentially. Each step is one Claude Code task.

### Step 1: Base layout + global components

Create `BaseLayout.astro` with:
- `<html lang="en">`, responsive viewport meta
- Preconnect to fonts.googleapis.com, load Inter (400,500,600,700)
- `font-display: swap`, critical CSS inline
- Skip-to-content link
- GTM container (noscript fallback)
- CookieBanner component (basic GDPR, CookieYes integration point)
- SchemaOrg component (LocalBusiness JSON-LD on every page)
- OpenGraph + Twitter Cards from page props
- Canonical URL
- Hreflang (not needed — English only)
- CSP headers via `<meta http-equiv>`
- `prefers-reduced-motion` support

**Brand tokens for Tailwind:**
```
Primary: #1B5E3B (forest green — trust, eco)
Secondary: #2D3748 (dark slate)
Accent: #F6A623 (warm amber — CTAs)
Background: #FAFAF8 (warm white)
Text: #1A1A1A
```

### Step 2: Header + Footer + Navigation

Create `Header.astro`:
- Logo (text or SVG) + phone number (click-to-call) top right
- Main nav: House Clearance | Probate | Commercial | Garden | Areas | Guides | Contact
- Mobile hamburger menu (no JS framework — vanilla `<details>` or Alpine.js)
- Sticky on scroll (CSS `position: sticky`)

Create `Footer.astro`:
- 4-column grid: Services | Areas (top 6) | Guides | Company
- Contact details, waste carrier licence number, company registration
- Copyright, privacy policy, T&C links
- "Proudly serving Bristol and surrounding areas"

### Step 3: Homepage

Create `src/pages/index.astro`:
- Hero: H1 "Bristol's Trusted House Clearance Service", subheading, CTA button, trust badges
- ServiceGrid: 4 cards linking to pillars (house clearance, probate, commercial, garden)
- ProcessSteps: "How It Works" — 3 steps (Call → Quote → Clear)
- TrustBar: Environment Agency, Checkatrade, insurance logos
- Testimonials: 3 featured reviews
- AreaGrid: "Areas We Cover" — top 12 areas with links
- CTABanner: "Get Your Free Quote Today"
- FAQSection: 5 top FAQs with Schema.org
- Schema: LocalBusiness + Service + FAQ

### Step 4: Quote form (astro-forms skill)

Copy astro-forms boilerplate to `src/lib/forms/`.

Create `QuoteForm.astro` with fields:
- Name (required)
- Email (required, with typo detection)
- Phone (required)
- Postcode (required, UK lookup → city autofill)
- Service type (dropdown: House Clearance | Probate | Commercial | Garden | Other)
- Property type (dropdown: House | Flat | Bungalow | Commercial | Other)
- Bedrooms (dropdown: 1 | 2 | 3 | 4 | 5+)
- Preferred date (date picker, optional)
- Message (textarea, optional)
- GDPR checkbox + Turnstile
- Honeypot + time-check spam protection

Create API endpoint `src/pages/api/quote.ts`:
- Zod validation (schemas.ts)
- Rate limiting (KV)
- Turnstile verification
- Email to business via Resend
- Confirmation email to customer
- Google Sheets logging
- Structured logging

Create `thank-you.astro` — conversion tracking page.

### Step 5: Contact page

`src/pages/contact.astro`:
- QuoteForm component
- Phone number (click-to-call)
- Email address
- Physical address
- Operating hours (Mon–Sat 7am–7pm, Sun by arrangement)
- Embedded Google Map (lazy loaded with poster image)
- Schema: LocalBusiness with all contact details

### Step 6: House Clearance pillar page

`src/pages/house-clearance/index.astro` using `ServiceLayout`:
- Hero with Picture component (AVIF/WebP)
- "What's Included" section
- Process steps (customised for house clearance)
- Property types handled
- Pricing overview with link to cost guide
- "Our Bristol Coverage" — link to areas hub
- Testimonials (house clearance specific)
- FAQ section (5-6 questions, Schema.org)
- Related cluster pages sidebar navigation
- CTABanner
- Schema: Service + FAQ + BreadcrumbList

### Step 7: Probate pillar page

`src/pages/probate-house-clearance/index.astro`:
- Empathetic tone throughout
- Legal context section (what probate is, executor responsibilities)
- Sensitive approach explanation
- Valuable items handling (valuation, auction, charity)
- Working with solicitors section
- Timeline and process
- Pricing overview
- Link to executor's guide
- FAQ section
- Schema: Service + FAQ + BreadcrumbList

### Step 8: Commercial + Garden pillar pages

`src/pages/commercial-clearance/index.astro`:
- B2B focused messaging
- Compliance section (Duty of Care, Waste Transfer Notes, WEEE)
- Sectors served
- Out-of-hours availability

`src/pages/garden-clearance/index.astro`:
- Seasonal messaging
- Full garden clearance vs. green waste only
- Before/after gallery
- Links to garage, shed, outbuilding pages

### Step 9: High-priority cluster pages (6 pages)

Build these service cluster pages:
1. `/house-clearance/hoarder-clearance/` — sensitive, empathetic, link to mental health resources
2. `/house-clearance/furniture-removal/` — pricing table, compare vs. council bulky waste
3. `/house-clearance/downsizing-clearance/` — target elderly/family, staged approach
4. `/probate-house-clearance/bereavement-clearance/` — emotional support tone
5. `/commercial-clearance/office-clearance/` — B2B, IT disposal, WEEE
6. `/garden-clearance/garage-clearance/` — standalone service, conversion prep

Each page: ServiceLayout, Hero, unique content, FAQ (3-5 Qs), related services sidebar, CTA.

### Step 10: Remaining cluster pages (10 pages)

Build remaining cluster pages:
- `/house-clearance/end-of-tenancy-clearance/`
- `/house-clearance/landlord-clearance/`
- `/house-clearance/loft-clearance/`
- `/house-clearance/cellar-clearance/`
- `/house-clearance/flat-clearance/`
- `/probate-house-clearance/estate-clearance/`
- `/commercial-clearance/shop-clearance/`
- `/commercial-clearance/warehouse-clearance/`
- `/commercial-clearance/confidential-waste-disposal/`
- `/garden-clearance/shed-clearance/`
- `/garden-clearance/garden-waste-removal/`
- `/garden-clearance/outbuilding-clearance/`

### Step 11: Trust & authority pages

- `/about/` — Company story, team, years of experience, properties cleared, Bristol roots
- `/reviews/` — Aggregate reviews hub, Review schema, categorised by service type
- `/licensing-accreditations/` — Waste carrier licence, insurance, Environment Agency link
- `/environmental-policy/` — Recycling rate, landfill diversion, charity donations stats
- `/faq/` — 25-30 FAQs grouped by category, FAQ schema, links to guides/services
- `/charity-partners/` — SOFA Project, Emmaus Bristol, BHF, Salvation Army
- `/for-solicitors/` — B2B referral page for probate solicitors
- `/for-estate-agents/` — B2B referral page for letting/sales agents
- `/privacy-policy/` and `/terms-and-conditions/`

### Step 12: Areas hub + regional hubs

`/areas/index.astro`:
- H1: "Areas We Cover in Bristol"
- Interactive service area overview (CSS grid map or list with region groupings)
- Postcode checker (link to contact with postcode pre-filled)
- Links to all 8 regional hubs

Regional hub pages (8 pages) via `[...slug].astro` dynamic route:
- `/areas/central-bristol/`
- `/areas/north-bristol/`
- `/areas/south-bristol/`
- `/areas/east-bristol/`
- `/areas/west-bristol/`
- `/areas/south-gloucestershire/`
- `/areas/north-somerset/`
- `/areas/bath-and-keynsham/`

Each: AreaLayout, 800-1200 words, links to individual area pages, all 4 service pillars linked.

### Step 13: Tier 1 area pages (14 pages)

Create content collection entries in `src/content/areas/` for:
Clifton, Redland, Bishopston, Henleaze, Westbury-on-Trym, Stoke Bishop, Bedminster, Southville, Knowle, Fishponds, Brislington, Totterdown, Keynsham, Portishead.

Each page (800-1200 words) MUST include unique:
- H1: "House Clearance in [Area], Bristol"
- Local property profile (dominant types, avg price, typical challenges)
- Service emphasis matching area demographics
- Local landmarks, transport links
- Nearest recycling centre
- Local charity donation routes
- Area-specific testimonial (anonymised)
- Embedded Google Map
- 3-5 area-specific FAQs
- Links to all 4 service pillars with area-specific anchor text
- Schema: LocalBusiness (areaServed), BreadcrumbList

### Step 14: High-priority guides (3 pages)

`/guides/house-clearance-cost-bristol/` (2000-2500 words):
- Pricing table: small (£175-300), medium (£300-500), full (£500-900)
- Factors affecting cost
- Compare vs. skip hire, council bulky waste, charity clearance
- "Get a quote" CTA

`/guides/clearing-house-after-death/` (2500-3000 words):
- Emotional preparation
- Legal considerations (can you clear before probate?)
- Practical steps, timeline
- Who pays (executor from estate funds)
- Link to probate service page

`/guides/house-clearance-vs-skip-hire/` (1500-2000 words):
- Direct comparison table
- Bristol skip hire costs + permit costs
- Decision matrix
- When each option makes sense

### Step 15: Case studies hub + first 3 case studies

`/case-studies/index.astro` — grid layout with filters.

3 initial case studies:
1. Probate clearance in Clifton (Victorian townhouse)
2. Hoarder clearance (anonymised, staged approach)
3. Commercial office clearance (Temple Quarter)

Each: property type, area, challenge, approach, outcome, before/after images, recycling rate, duration, testimonial quote.

---

## Phase 2 — Content Expansion (Claude Code Steps 16–22)

### Step 16: Tier 2 area pages (17 pages)

Cotham, Horfield, Ashley Down, Montpelier, Hotwells, Easton, St George, Kingswood, Downend, Bradley Stoke, Filton, Yate, Thornbury, Clevedon, Nailsea, Long Ashton, Bath.

### Step 17: Remaining guides (8 pages)

- `/guides/probate-clearance-guide/` (3000-4000 words — executor's comprehensive guide)
- `/guides/probate-valuations/`
- `/guides/how-to-prepare-for-house-clearance/`
- `/guides/house-clearance-checklist/` (+ downloadable PDF lead magnet)
- `/guides/what-house-clearance-companies-do-with-stuff/`
- `/guides/diy-vs-professional-house-clearance/`
- `/guides/council-bulky-waste-vs-house-clearance/`
- `/guides/charity-house-clearance-bristol/`

### Step 18: Item disposal guides (5 pages)

- `/guides/mattress-disposal-bristol/`
- `/guides/furniture-disposal-bristol/`
- `/guides/fridge-freezer-disposal-bristol/`
- `/guides/electronics-recycling-bristol/`
- `/guides/paint-chemicals-disposal-bristol/`

### Step 19: Bristol recycling ecosystem + how-to-choose

- `/guides/bristol-recycling-centres/` — St Philips, Hartcliffe Way, Avonmouth guide
- `/guides/donate-furniture-bristol/` — Charity donation directory
- `/guides/how-to-choose-house-clearance-company/` — Buyer's guide

### Step 20: Blog — first batch (5 posts)

- `/blog/spring-cleaning-clearance-guide/`
- `/blog/new-year-decluttering-guide/`
- `/blog/summer-moving-house-clearance/`
- `/blog/student-house-clearance-bristol/`
- `/blog/garden-clearance-spring-guide/`

Blog listing page with category filters.

### Step 21: More case studies (3)

- Garden transformation (before/after)
- End-of-tenancy (landlord perspective)
- Downsizing (family story, empathetic)

### Step 22: Tier 3 area pages (20+ pages)

All remaining areas: Emersons Green, Staple Hill, Mangotsfield, Hanham, Warmley, Winterbourne, Chipping Sodbury, Southmead, Lockleaze, Brentry, Sea Mills, Shirehampton, Avonmouth, Stockwood, Bishopsworth, Hartcliffe, Hengrove, Whitchurch, Windmill Hill, etc.

---

## Phase 3 — Tracking & Optimisation (Steps 23–26)

### Step 23: Zero-cost tracking (zero-cost-tracking skill)

- CookieYes integration
- GTM container setup
- Google Ads Enhanced Conversions on thank-you page
- localStorage GCLID/UTM persistence (90 days)
- sendBeacon delivery for form submissions
- DataLayer events: `quote_form_submit`, `callback_form_submit`, `page_view`
- Zaraz setup for Meta CAPI (if running Facebook ads)

### Step 24: Lead gen calculator (lead-gen-calculator skill)

Build instant quote calculator at `/instant-quote/`:

Steps:
1. Service type (radio): House | Probate | Commercial | Garden
2. Property type (radio): House | Flat | Bungalow | Office | Garden Only
3. Bedrooms/Size (radio): 1-2 | 3 | 4 | 5+ (or S/M/L for commercial)
4. Access (radio): Easy | Moderate | Difficult (stairs/narrow)
5. Urgency (radio): Within 48h | This week | Flexible
6. Contact form (form): Name, email, phone, postcode

Result page with price range estimate + "Book your free assessment" CTA.

### Step 25: Sitemap + robots.txt + meta verification

```
# robots.txt
User-agent: *
Allow: /

# LLM crawlers
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /

Sitemap: https://bristolhouseclearances.co.uk/sitemap-index.xml
```

Sitemap auto-generated by `@astrojs/sitemap`. Verify:
- Google Search Console
- Bing Webmaster Tools

### Step 26: Performance audit

Run Lighthouse on key pages. Targets:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Check:
- All images use `<Picture />` with AVIF/WebP
- YouTube/iframes lazy loaded with poster
- Above-fold CSS inlined
- Font preloading active
- No layout shifts (CLS < 0.1)
- All external links have `rel="noopener noreferrer"`

---

## Image Strategy — ChatGPT Generation

### Consistent style prompt (use for ALL images)

Save this as the base prompt prefix for every image generation request:

```
STYLE: Professional editorial photography style, clean and bright, 
natural daylight lighting, shallow depth of field, warm but not 
oversaturated colour palette. Colours lean toward forest green (#1B5E3B), 
warm amber (#F6A623), and soft cream backgrounds. No text overlays, 
no watermarks, no people's faces (use hands/silhouettes/backs only for 
GDPR compliance). UK residential/commercial settings. 
Aspect ratio: 16:9 for heroes, 4:3 for inline images.
```

### Images per page — generation prompts

**Each page gets 3 images.** Generate in batches per silo.

#### SILO 1: House Clearance images (27 images total = 9 pages × 3)

| Page | Image 1 (Hero 16:9) | Image 2 (Inline 4:3) | Image 3 (Inline 4:3) |
|------|---------------------|----------------------|----------------------|
| House Clearance pillar | Professional clearance team loading van outside a Bristol Victorian terrace, green branded uniform, tidy operation | Neatly sorted items on a driveway: keep pile, donate pile, recycle pile, with labels | Inside a cleared living room, freshly empty, sunlight through sash windows, clean floors |
| Hoarder Clearance | Compassionate team carefully handling items in a cluttered room, gentle body language, backs to camera | Before: overfilled room with stacked items floor to ceiling, narrow pathway | After: same room completely clear, clean, bright, fresh |
| End-of-Tenancy | Empty rental flat with leftover furniture and boxes, modern Bristol apartment interior | Clearance operative carrying boxes down apartment stairs | Clean empty flat ready for new tenants, modern kitchen visible |
| Landlord Clearance | Row of Bristol terraced houses (typical BS2/BS3 street), one with skip outside | Professional clearance van parked outside HMO property, organised operation | Stack of waste transfer notes and paperwork on clipboard, professional documentation |
| Loft Clearance | Open loft hatch with ladder, boxes visible in loft space, warm attic lighting | Variety of typical loft items: old suitcases, boxes, forgotten furniture | Cleared loft space, clean boarded floor, ready for conversion |
| Cellar Clearance | Victorian cellar door leading down stone steps, typical Bristol property | Damp cellar with stored items, showing challenge of confined space | Cleared cellar, clean stone walls, single light bulb, empty |
| Flat Clearance | Bristol Harbourside apartment building exterior, modern flats | Narrow staircase in Victorian converted flat, challenge of access | Cleared modern apartment, floor-to-ceiling windows, empty and clean |
| Downsizing | Elderly couple's hands holding a photo frame over packed boxes (no faces) | Large detached house with "sold" sign, garden, Edwardian style | Smaller cottage with neatly arranged furniture, cosy, downsized |
| Furniture Removal | Old sofa and mattress on a driveway ready for collection | Variety of furniture items: wardrobe, dining table, bed frame, stacked | Furniture being loaded into clearance van, gloved hands, organised |

#### SILO 2: Probate & Bereavement (9 images = 3 pages × 3)

| Page | Image 1 (Hero) | Image 2 | Image 3 |
|------|---------------|---------|---------|
| Probate pillar | Solicitor's desk with estate paperwork, house keys, warm lighting | Empty period property room with personal items still present, sensitive scene | Professional team member with clipboard doing property assessment |
| Bereavement | Hands placing items carefully into a memory box, soft warm light | Empty armchair with folded blanket in cleared room, poignant but not depressing | Family photos in frame on windowsill with cleared room behind |
| Estate Clearance | Grand property hallway with antique furniture, estate clearance context | Auction room with tagged items, paintings and furniture | Inventory clipboard with detailed list, professional valuation |

#### SILO 3: Commercial (12 images = 4 pages × 3)

| Page | Image 1 (Hero) | Image 2 | Image 3 |
|------|---------------|---------|---------|
| Commercial pillar | Empty commercial office space, desks being removed, professional operation | Warehouse with stacked items and clearance team working | Waste transfer note document close-up, compliance theme |
| Office Clearance | Open plan office being cleared, desks, chairs, monitors stacked | IT equipment (monitors, keyboards, towers) sorted for WEEE disposal | Clean empty office space, carpet marks where desks were, ready for fit-out |
| Shop Clearance | Retail shop front with clearance in progress, Gloucester Road style | Shopfitting and shelving being dismantled | Empty retail unit, clean, ready for new tenant |
| Warehouse | Industrial warehouse interior, racking and pallets | Fork truck and clearance van at loading bay | Empty warehouse floor, clean, industrial lighting |

#### SILO 4: Garden & Outdoor (12 images = 4 pages × 3)

| Page | Image 1 (Hero) | Image 2 | Image 3 |
|------|---------------|---------|---------|
| Garden pillar | Overgrown Bristol garden with mature trees, before clearance | Team clearing garden waste into bags, green waste | Cleared garden, neat lawn, tidy borders, after transformation |
| Garage Clearance | Packed garage with tools, paint tins, old furniture, bikes | Hazardous materials sorted separately: paint, oil, chemicals | Clean empty garage with car parked, room to move |
| Shed Clearance | Old wooden shed surrounded by overgrowth, typical UK garden | Shed contents laid out on garden, sorted by category | Garden without shed, clean area where it stood, new patio potential |
| Garden Waste | Green waste bags filled with hedge trimmings and branches | Garden waste loaded into clearance vehicle | Composting facility, recycling theme |

#### SILO 5: Location pages (generic set of 6 reusable + area-specific)

Create 6 generic Bristol images reusable across area pages:
1. Clifton Suspension Bridge with residential streets below (16:9 hero)
2. Colourful houses of Totterdown/Southville (4:3)
3. Victorian terrace street typical of North Bristol (4:3)
4. Modern apartment buildings Harbourside (4:3)
5. Suburban street with semi-detached houses (4:3)
6. Clearance van on a residential Bristol street (4:3)

For Tier 1 areas, generate 1 unique hero per area showing recognisable local character.

#### SILO 6: Guides & Blog (per article — 3 each)

Generate contextually relevant images per guide topic. Examples:

| Guide | Image 1 | Image 2 | Image 3 |
|-------|---------|---------|---------|
| Cost Guide | Calculator and pound coins on desk with property brochure | Pricing comparison table visual (infographic style) | Happy customer receiving clear quote on tablet |
| After Death Guide | Gentle image of house keys on a wooden table with paperwork | Empty room with single chair and sunlight, contemplative | Hands sorting through papers and photos in box |
| Skip Hire vs Clearance | Yellow skip on residential street, half full | Split image: skip vs clearance van side by side | House exterior with clear driveway, job done |

#### SILO 7: Trust pages (9 images)

1. About: Team photo (backs/silhouettes), branded van fleet, Bristol office
2. Reviews: 5-star rating visual, happy customer themes
3. Environmental: Recycling facility, sorted materials, charity shop delivery

### Image file naming convention

```
src/assets/images/{silo}/{page-slug}-{n}.{avif|webp|jpg}
```

Examples:
```
src/assets/images/services/house-clearance-hero.avif
src/assets/images/services/house-clearance-sorted-items.avif
src/assets/images/services/house-clearance-cleared-room.avif
src/assets/images/areas/clifton-hero.avif
src/assets/images/guides/house-clearance-cost-calculator.avif
```

### ChatGPT batch generation workflow

Generate images in batches of 9-12 (one silo at a time):

1. Open ChatGPT with DALL-E
2. Paste the base style prompt
3. Add specific image description from the tables above
4. Generate → download → rename per convention
5. Convert to AVIF/WebP using Astro's built-in image optimisation (automatic via `<Picture />`)
6. Place in `src/assets/images/{silo}/`

**Total images needed: ~150 images across all pages**

Batch schedule:
- Batch 1 (Phase 1): Heroes + services = ~45 images
- Batch 2 (Phase 1): Areas Tier 1 + trust pages = ~25 images
- Batch 3 (Phase 2): Guides + blog = ~40 images
- Batch 4 (Phase 2): Areas Tier 2-3 = ~40 images

---

## Schema.org Implementation Checklist

Every page gets `BreadcrumbList`. Additional schemas per page type:

| Page type | Schemas |
|-----------|---------|
| Homepage | LocalBusiness, Service (×4), FAQ, WebSite |
| Service pillar | Service, FAQ, BreadcrumbList |
| Service cluster | Service, FAQ, BreadcrumbList |
| Area page | LocalBusiness (areaServed), Service, FAQ, BreadcrumbList |
| Guide/Blog | Article, FAQ (if FAQs present), BreadcrumbList, HowTo (if step-by-step) |
| Case study | Article, BreadcrumbList |
| FAQ hub | FAQPage, BreadcrumbList |
| Reviews | AggregateRating, Review (×multiple), BreadcrumbList |
| Contact | LocalBusiness (full), ContactPoint, BreadcrumbList |

Speakable schema on FAQ and guide pages for LLM/voice assistant visibility.

---

## Internal Linking Matrix (Simplified)

```
Navigation (every page):
  → Homepage
  → 4 pillar pages
  → Areas hub
  → Guides
  → Contact

Service cluster → own pillar (1st paragraph + breadcrumb)
Service cluster → related clusters (sidebar)
Service cluster → areas hub ("See our work in your area")
Service cluster → relevant guide (inline CTA)
Service cluster → contact (bottom CTA)

Area page → all 4 pillars (area-specific anchor: "Probate clearance in Clifton")
Area page → regional hub (breadcrumb)
Area page → areas hub (breadcrumb)
Area page → nearest area pages (sidebar: "Nearby areas")

Guide → 2-3 service pages (inline contextual links)
Guide → contact/quote (bottom CTA)
Guide → related guides (sidebar)

Blog → relevant pillar (inline link)
Blog → related blog posts
Blog → contact (bottom CTA)

Case study → relevant service pillar
Case study → relevant area page
Case study → contact (bottom CTA)

FAQ answer → relevant guide OR service page
```

---

## Deployment Pipeline

### Cloudflare Pages setup

```bash
# Connect GitHub repo to Cloudflare Pages
# Build command: npm run build
# Build output: dist/
# Node.js version: 20

# Environment variables (set in CF dashboard):
RESEND_API_KEY
GOOGLE_SHEETS_WEBHOOK_URL
TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
SITE_URL=https://bristolhouseclearances.co.uk

# Create KV namespace
wrangler kv:namespace create RATE_LIMIT_KV
# Copy ID to wrangler.toml
```

### DNS setup (Cloudflare)

```
Type  Name                              Content
A     bristolhouseclearances.co.uk      192.0.2.1 (proxied)
CNAME www                               bristolhouseclearances.co.uk (proxied)
```

Enable:
- Always Use HTTPS
- Auto Minify (HTML, CSS, JS)
- Brotli compression
- HTTP/3
- 0-RTT

### Page rules

```
www.bristolhouseclearances.co.uk/* → 301 → https://bristolhouseclearances.co.uk/$1
```

---

## Content Production Checklist (Per Page)

For every page Claude Code creates, verify:

- [ ] Unique H1 (contains primary keyword naturally)
- [ ] Meta title (≤60 chars, keyword + "Bristol" + brand)
- [ ] Meta description (≤155 chars, includes CTA)
- [ ] Canonical URL set
- [ ] BreadcrumbList schema
- [ ] Page-specific schema (Service/FAQ/Article/etc.)
- [ ] Open Graph tags (title, description, image)
- [ ] 3 images with alt text (keyword-rich but natural)
- [ ] Images use `<Picture />` with AVIF/WebP
- [ ] Internal links: ≥2 to other pages in same silo
- [ ] Internal links: ≥1 to different silo
- [ ] CTA linking to /contact/ or QuoteForm
- [ ] FAQ section with ≥3 questions (if applicable)
- [ ] No orphan page (linked from ≥1 other page)
- [ ] Mobile responsive (test at 375px)
- [ ] `rel="noopener noreferrer"` on external links
- [ ] No duplicate keyword targeting with another page

---

## Summary: Total Page Count

| Silo | Pages |
|------|-------|
| House Clearance (pillar + 8 clusters) | 9 |
| Probate (pillar + 2 clusters) | 3 |
| Commercial (pillar + 4 clusters) | 5 |
| Garden (pillar + 4 clusters) | 5 |
| Areas (hub + 8 regional + 50+ individual) | 59+ |
| Guides | 16 |
| Blog | 5+ (ongoing) |
| Case Studies | 6+ |
| Trust & Authority | 12 |
| Legal | 2 |
| Utility (thank-you, 404) | 2 |
| **Total** | **~124 pages** |
