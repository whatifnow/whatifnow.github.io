# SEO & Discoverability audit — Sinéad

**Score:** 48 / 100 (grade D+)
**Success-metric link:** SEO determines whether a lead finds whatifnow.ie at all. Right now the site has clean Org schema and a working sitemap, but it isn't bidding on the one keyword that matches the buying intent (EU AI Act / Irish SMEs), and shares a single default meta description across most pages. That caps top-of-funnel volume hard — fix the discoverability layer and qualified-lead flow scales with it.

## P0 — fix now

### SE-P0-1: Homepage doesn't target a single keyword
- File: `src/pages/index.astro:14`, `src/layouts/Layout.astro:11` (default description), `src/components/Hero.astro:16-19` (H1)
- Impact: Title is `What If Now | Do what only you can` — pure brand, zero intent. H1 is `How does your team's AI use compare to your sector?` — a question, not a ranking phrase. Default meta description is `AI consulting for businesses. Get AI-ready with What If Now — strategy, training, and implementation.` That's a generic global phrase competing with thousands of consultancies. WIN owns a defensible niche (EU AI Act compliance for Irish SMEs, August 2026 deadline) and the homepage doesn't say so anywhere a crawler can see. Result: no chance of ranking for `EU AI Act Ireland SME`, `AI Act readiness Ireland`, `Irish AI consulting charity`, `fixed fee AI compliance Ireland`. The v2-a draft page (noindex'd, but the copy exists in `src/pages/v2-a.astro`) already nails this — that title is `What If Now | EU AI Act Readiness for Irish SMEs`. Just promote it.
- Fix: Set the homepage title to `EU AI Act Readiness for Irish SMEs & Charities | What If Now`. Set the description to `Fixed-fee EU AI Act readiness for Irish SMEs, charities, and state-funded bodies. Free 18-question audit. August 2026 deadline.` Then rewrite at least one H2 on the page (Compliance section, line 32-34) to read `EU AI Act compliance for Irish SMEs — fixed fee, before August 2026` rather than `AI Adoption That's Compliant From Day One`.
- Effort: hours

### SE-P0-2: Every page that doesn't pass a description gets the same default
- File: `src/layouts/Layout.astro:11`; affected pages `src/pages/index.astro:14`, `src/pages/contact.astro:7`, `src/pages/audit.astro`, `src/pages/brand-showcase.astro`, `src/pages/v2-*.astro`
- Impact: index, contact, and any future page inherits one global description. Google de-duplicates pages that share descriptions and picks one to surface — usually the homepage — burying contact and any future deep page in the SERP. Lower CTR even when ranked. Solutions/ai-readiness/toolkit/privacy do pass a description; the home and contact pages — the two highest-intent doors — do not.
- Fix: Pass a per-page description on `index.astro` (see SE-P0-1) and on `contact.astro:7`. For contact: `Talk to What If Now about EU AI Act readiness, AI training, or a fixed-fee build. One human reply within 24 hours.` Audit `audit.astro` and `brand-showcase.astro` are already `noindex` (good) — leave their descriptions alone.
- Effort: minutes

### SE-P0-3: Sitemap includes pages that are noindex
- File: `astro.config.mjs:9`, generated `dist/sitemap-0.xml`
- Impact: The sitemap currently lists `/v2-a/`, `/v2-b/`, `/v2-c/`, `/audit/`, `/brand-showcase/` — all five carry `<meta name="robots" content="noindex, nofollow">`. Submitting noindex URLs in a sitemap is a Google Search Console error ("indexed though blocked") and a soft signal that the site doesn't know what it wants indexed. Wastes crawl budget on orphan experiments and dilutes the trust of the sitemap. The filter today only excludes the three demos — it should exclude the orphans too.
- Fix: Extend the sitemap filter in `astro.config.mjs:9` to also exclude `v2-a`, `v2-b`, `v2-c`, `audit`, `brand-showcase`. Example: `filter: (page) => !['threshold-sar-demo','/toolkit','precedent-demo','v2-a','v2-b','v2-c','/audit','brand-showcase'].some(p => page.includes(p))`.
- Effort: minutes

### SE-P0-4: No Service or FAQPage structured data
- File: `src/layouts/Layout.astro:53-60` (only Organization), `src/components/EngagementModels.astro` (4 services, no schema), `src/components/PainPoints.astro` (3 Q&A pairs, no schema)
- Impact: WIN has four named, priced engagement formats (Briefing €750, Workshop €2,500, Pairing €4,000, Build €12,000) — perfect Service schema candidates that produce rich SERP results. The PainPoints section is literally three customer questions with answers — textbook FAQPage. Currently neither is marked up, so the SERP entry is plain. Competing AI consultancies that mark this up win the rich snippet and the click.
- Fix: Add `Service` schema entries (one per engagement format) inside an `OfferCatalog` on the homepage `<head>`, and `FAQPage` schema for the three PainPoints questions. Both can live as additional `<script type="application/ld+json">` blocks in `Layout.astro` gated by a prop, or directly in `index.astro` to avoid polluting other pages. Use `provider: { @id: "https://whatifnow.ie/#organization" }` to link to the existing Org node.
- Effort: hours

### SE-P0-5: Demo pages are crawler-empty React shells with no internal link strategy
- File: `src/pages/precedent-demo.astro:1-21`, `src/pages/threshold-sar-demo.astro:1-21`, `src/components/RTBPrecedentDemo.jsx`, `src/components/SARDemo.jsx`
- Impact: Both demos render via `client:only="react"` — server HTML is an empty `<body>`. They're correctly `noindex` so Google won't index a thin page, but that also means the strongest proof artefacts on the site (live precedent search, live SAR triage) carry **zero** SEO value. The audit's own internal review (audit.astro:902-903) flagged this and it's unresolved. Worse, `solutions.astro:122` links to `/precedent-demo` but the page passes no signal back — it should be a hub linking back to `/solutions` and `/contact?subject=Stare`. These are WIN's moat; right now they're crawl dead-ends.
- Fix: Keep `noindex` for now (the shell really is thin) but add a pre-rendered intro block above each demo: H1 (`Live RTB Precedent Explorer — 25,000+ Decisions`), 150-word description, internal links to `/solutions`, `/contact?subject=Stare+early+access`. Once that content exists, **remove** the noindex on `precedent-demo` and `threshold-sar-demo`. That alone gives WIN two more landing pages for `RTB decisions search`, `SAR processing tool Ireland` — long-tail but high-intent. Also unfilter them from the sitemap once content is real.
- Effort: days

## P1 — fix soon

### SE-P1-1: H2s on the homepage carry zero keyword weight
- File: `src/components/PainPoints.astro:23-25` (`Sound familiar?`), `src/components/EngagementModels.astro:53-55` (`Pick the engagement that fits.`), `src/components/Compliance.astro:32-34` (`AI Adoption That's Compliant From Day One`), `src/components/About.astro:11` (`Built for Business`), `src/components/FinalCTA.astro:6-8` (`Let's Have a Conversation`)
- Impact: Five H2s, none containing `EU AI Act`, `Ireland`, `SME`, `charity`, `compliance` in a ranking phrase. Compliance.astro is the closest but uses a slogan-style construction. Search engines weight H2s heavily for topical relevance.
- Fix: At minimum rewrite two: Compliance H2 → `EU AI Act, GDPR, NIS2 — compliance built in, not bolted on` (line 33). EngagementModels H2 → `Four ways to work with us — fixed fee, no day-rate` (line 54). Keeps the brand voice (practical, honest) while loading real keywords.
- Effort: hours

### SE-P1-2: Solutions page H1 doesn't say what's on the page
- File: `src/pages/solutions.astro:60-62`
- Impact: H1 reads `Two products. One bet.` — poetic, but a Google snippet pulls no signal from it. The page is *about* RTB precedent search and tenant-rights tooling — both queryable phrases. Title is also brand-tail `Solutions | What If Now` and the description (`builds two products: righttostay, a free tenant rights tool in 14 languages, and Stare, precedent intelligence for Irish law firms`) is good but should match the H1.
- Fix: Change H1 to `Two products from What If Now — Stare and righttostay`, or better, `Precedent intelligence and tenant rights tools — built in Ireland`. Update the title to `Stare & righttostay — AI tools for Irish law & housing | What If Now`.
- Effort: minutes

### SE-P1-3: No `og:image:alt`, no `twitter:image`, no Twitter handle
- File: `src/layouts/Layout.astro:26-37`
- Impact: Twitter card declares `summary_large_image` but no `twitter:image` is set (it falls back to `og:image` on most clients but X/Twitter validation prefers an explicit tag, and LinkedIn's parser sometimes misses it). No `og:image:alt` means screen readers and image-search miss the value of the asset. No `og:locale` (should be `en_IE`).
- Fix: Add `<meta name="twitter:image" content={ogImageURL} />`, `<meta property="og:image:alt" content="What If Now — EU AI Act readiness for Irish SMEs" />`, `<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`, `<meta property="og:locale" content="en_IE" />`. All next to the existing OG block (line 26-32).
- Effort: minutes

### SE-P1-4: Organization schema is undernourished
- File: `src/layouts/Layout.astro:53-60`
- Impact: The JSON-LD has `name`, `description`, `url`, `serviceType`. No `logo`, `sameAs` (LinkedIn + Substack), no `contactPoint`, no `address` (`addressCountry: IE`), no `@id`. Without those, Google can't build a Knowledge Panel and other schema can't `@id`-reference this Org node.
- Fix: Expand to: `@id: "https://whatifnow.ie/#organization"`, `logo: "https://whatifnow.ie/images/og-image.jpg"` (or a square logo), `sameAs: ["https://www.linkedin.com/company/whatifnow/", "https://whatifnow.substack.com"]`, `contactPoint: { @type: ContactPoint, email: "hello@whatifnow.ie", contactType: "sales" }`, `address: { @type: PostalAddress, addressCountry: "IE" }`.
- Effort: minutes

### SE-P1-5: Internal links live only in CTAs — body copy doesn't link
- File: `src/components/PainPoints.astro`, `src/components/Compliance.astro`, `src/components/About.astro`, `src/components/EngagementModels.astro` — none contain `<a>` tags inside body paragraphs
- Impact: Every internal link on the homepage is a button. Google reads anchor text on body links as a strong topical signal. Right now `EU AI Act` is mentioned in body copy (Compliance.astro:24, PainPoints.astro:15) but never as an anchor to a deeper page. There's no AI Act landing page to link to, but `/solutions` and `/ai-readiness` would do for now.
- Fix: In PainPoints "What about compliance and risk?" body (line 16), link `EU AI Act` to `/ai-readiness`. In Compliance EU AI Act card description (line 25), link "before they're enforced" to `/contact?subject=AI+Act+readiness`. Two body links is enough.
- Effort: minutes

### SE-P1-6: Sticky "Book a call" CTA is the same anchor on every page
- File: `src/components/StickyBookCTA.astro` (likely; referenced from `Layout.astro:3`)
- Impact: A link with identical anchor text appearing on every page is fine, but if its `href` lacks a UTM or a distinct `subject=`, all those sessions arrive at `/contact` indistinguishable from organic clicks. That's a measurement problem more than a ranking one, but it directly affects whether a marketer can prove which page sourced the lead.
- Fix: Pass the page slug into the sticky CTA's `subject=` so contact form submissions reveal the source page. Effort small — but verify the StickyBookCTA component renders identical href everywhere first.
- Effort: minutes

### SE-P1-7: AI Readiness page is a tagged JS quiz with thin pre-render
- File: `src/pages/ai-readiness.astro:1-17`
- Impact: The page has good title/description but the body is a `<AIReadinessQuiz client:only="react" />`. Same risk as the demos — Googlebot sees an empty `<main>` and ranks the page low for `AI readiness assessment Ireland` despite this being the strongest top-of-funnel lead magnet. The title `AI Readiness Assessment | What If Now` is solid for `AI readiness assessment` but the page can't back it up.
- Fix: Add a pre-rendered `<section>` above the quiz with H1 `AI Readiness Assessment for Irish SMEs and Charities`, 200 words explaining the 18 questions, what the report contains, who it's for, and a link back to `/solutions`. The quiz mounts below it. Don't touch the quiz UX itself.
- Effort: hours

### SE-P1-8: No mention of "Ireland", "Irish SME", "Charity", or "EU AI Act" in canonical homepage HTML body text outside one card
- File: rendered `dist/index.html` (grep `Ireland`, `Irish`, `SME`, `charity`, `EU AI Act`); source: `src/components/About.astro`, `src/components/Hero.astro`, `src/components/PainPoints.astro`
- Impact: The body of the homepage barely contains Ireland-specific or SME-specific terms. About.astro talks generically about "growing businesses". Hero says "small organisations". This is a positioning fix as much as SEO — but for search it means a query like `AI consultant for Irish charity` will not surface this page even though that's exactly the ICP.
- Fix: One sentence in About.astro (line 14-16) should ground the geography: `We work with Irish SMEs, charities, and state-funded bodies — 5 to 250 staff, anywhere in Ireland.` Hero subhead (Hero.astro:20-22) could say `small Irish organisations` rather than `small organisations`.
- Effort: minutes

## P2 — worth doing

### SE-P2-1: No `lastmod` in sitemap
- File: `astro.config.mjs:9`
- Impact: `@astrojs/sitemap` defaults to no `<lastmod>` unless configured. Crawlers re-crawl URLs more frequently when `lastmod` is recent, accelerating index refresh after a fix.
- Fix: Add `lastmod: true` to the sitemap integration config, or wire it to git history per page.
- Effort: minutes

### SE-P2-2: `robots.txt` doesn't block the noindex orphans
- File: `public/robots.txt:1-4`
- Impact: noindex is the right tool, but adding `Disallow: /v2-a/`, `/v2-b/`, `/v2-c/`, `/brand-showcase/`, `/audit/` would stop crawl-budget spend on five pages that should never be indexed. Belt-and-braces.
- Fix: Append `Disallow:` lines after the `Allow: /`. Keep `User-agent: *` block. Do NOT disallow `/precedent-demo/` or `/threshold-sar-demo/` if you plan to remove their noindex per SE-P0-5.
- Effort: minutes

### SE-P2-3: Privacy page H1 is decorative
- File: `src/pages/privacy.astro:18`
- Impact: H1 reads `Your privacy. Plain and simple.` — fine on-brand, but the page is the canonical answer to `What If Now privacy policy GDPR` and a useful trust signal for B2B procurement search. H1 could carry one ranking term.
- Fix: H1 → `Privacy policy — plain English, GDPR-compliant.` Keeps voice, gains keyword. Page-level title is already fine.
- Effort: minutes

### SE-P2-4: No BreadcrumbList schema
- File: `src/layouts/Layout.astro`
- Impact: Pages two levels deep (contact, solutions, ai-readiness) lack `BreadcrumbList` JSON-LD. Google sometimes displays breadcrumb in SERP in place of URL — small CTR boost, free win.
- Fix: Add a small breadcrumb prop to `Layout.astro` and emit `BreadcrumbList` schema when set. Low-stakes, can wait.
- Effort: hours

### SE-P2-5: Font preconnect but no `font-display: swap` declared
- File: `src/layouts/Layout.astro:40-42`
- Impact: Google Fonts URL includes `&display=swap` already (line 42) — so this is fine, false alarm-ish — but the CSS file `src/styles/global.css` (not read) likely has `@font-face` declarations that would benefit from a check. Affects Core Web Vitals (LCP), which is a confirmed Google ranking factor.
- Fix: Audit `src/styles/global.css` for any locally-declared `@font-face` blocks; ensure `font-display: swap`. If only Google Fonts is used, no action needed.
- Effort: minutes (check); hours (if local fonts exist and need updating)

### SE-P2-6: Layout fallback description repeats "AI consulting for businesses"
- File: `src/layouts/Layout.astro:11`
- Impact: Even after fixing per-page descriptions per SE-P0-2, the default fallback is keyword-poor. If a new page is ever added without a description, it inherits this.
- Fix: Change the default to `Fixed-fee EU AI Act readiness, AI training, and AI builds for Irish SMEs and charities.` That way any future page defaults to a useful description.
- Effort: minutes

## Agent notes

**Files inspected:**
- `src/layouts/Layout.astro` (meta, OG, canonical, JSON-LD)
- `astro.config.mjs` (site URL, sitemap filter)
- `public/robots.txt`
- `public/images/og-image.jpg` (verified 1200x630 — correct)
- `src/pages/index.astro`, `contact.astro`, `solutions.astro`, `ai-readiness.astro`, `precedent-demo.astro`, `threshold-sar-demo.astro`, `toolkit.astro`, `privacy.astro`, `brand-showcase.astro` (titles, descriptions, noindex, H1s)
- All `src/components/*.astro` rendered on the homepage (heading hierarchy, body copy keyword density, internal link presence)
- Built `dist/index.html`, `dist/contact/index.html`, `dist/solutions/index.html`, `dist/sitemap-0.xml`, `dist/v2-*/index.html`, `dist/brand-showcase/index.html` (verified what crawlers actually see)
- `src/pages/audit.astro` (previous SEO findings only; spot-checked SE block at lines 887-903)

**What I deliberately didn't review (and why):**
- `src/pages/v2-a.astro`, `v2-b.astro`, `v2-c.astro` content — brief says orphan experiments; noted they correctly carry `noindex` and that v2-a already has the right homepage title formula to lift.
- `src/components/v2/*` — same reason.
- The audit page's design — brief says don't critique.
- `dist/_astro/*.css` performance — out of lens scope (perf is its own agent).
- Live-site checks — brief says codebase is source of truth.
- Backlink profile / off-page SEO — codebase scope only.
