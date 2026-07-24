# UX & Information Architecture audit — Róisín

**Score:** 56 / 100 (grade D+)
**Success-metric link:** Structural and navigation failures — broken anchor scroll, nav that teleports visitors off non-home pages, and demos with no hub — each sever at least one plausible path from "I have a problem" to "I'm in the contact form."

---

## P0 — fix now

### P0-01: Nav links /#about and /#compliance hard-reload non-home pages to the homepage top, not the anchor

The navigation component is shared across every page. On any non-home page (contact, solutions, ai-readiness, privacy, toolkit), clicking "About" or "Compliance" in the nav issues a full page navigation to `/#about` or `/#compliance`. Because the browser lands on index then immediately jumps to the anchor, the OS-level scroll-to-anchor fires before the page has rendered, and the sticky nav (~64 px tall) is not offset. The effective result is that the anchor heading is hidden under the nav. A visitor who clicks "About" from `/contact` gets a disorienting full reload.

- File: `src/components/Navigation.astro:11-12, 28-29`
- Impact: Any user navigating from a non-home page through the About or Compliance nav links arrives at a page-top flash then a partially-obscured anchor. Trust signal lost; some visitors will bounce.
- Fix: Two sub-fixes needed. (1) Add `scroll-margin-top: 80px` (or equivalent) to `#about` and `#compliance` sections. (2) For the nav links specifically, decide: if About and Compliance stay on-page, accept the full-reload UX on inner pages or extract them to standalone pages (see P0-02/P2-01). Minimum fix today: add `scroll-margin-top` to both anchor sections in `global.css`.
- Effort: 30 minutes (scroll-margin fix); hours if page-extraction chosen.

---

### P0-02: Section order breaks the pain→solution→proof→ask mental model

Current homepage order: Hero → PainPoints → EngagementModels → Compliance → About → FinalCTA.

The problem: EngagementModels (the "buy" step) appears before Compliance and About. A first-time visitor who lands with the question "are these people credible?" hits a pricing grid before they have any reason to trust WIN. The mental model a new visitor needs is: (1) you recognise my problem, (2) you can fix it, (3) I believe you can do it compliantly, (4) I know who you are, (5) now I'll act. Putting the engagement-model cards at position 3 — where "proof" and "credibility" should live — treats every visitor as already sold. It is the single biggest conversion-path error on the site.

Correct order: Hero → PainPoints → Compliance → EngagementModels → About → FinalCTA.

Moving Compliance before EngagementModels also allows the PainPoints card "What about compliance and risk?" to naturally resolve into the Compliance section, tightening the narrative thread.

- File: `src/pages/index.astro:16-23`
- Impact: Every visitor who scrolls sequentially (the majority on mobile) hits the pricing grid before they have trust context. Estimated friction increase on conversion path.
- Fix: Reorder component imports and JSX to: Hero → PainPoints → Compliance → EngagementModels → About → FinalCTA. No copy changes needed.
- Effort: 15 minutes (reorder only).

---

### P0-03: Global fadeInUp animation on every section has no prefers-reduced-motion guard (regression from prior audit)

`src/pages/index.astro` applies `animation: fadeInUp 0.6s ease-out` to every `<section>` element via `is:global` CSS. There is no `@media (prefers-reduced-motion: reduce)` override in either `index.astro` or `global.css`. The prior audit (`src/pages/audit.astro:991-992`) identified this finding. The v2 variants (v2-a, v2-b, v2-c) fix it but the production index does not. This is an accessibility regression that is also a WCAG 2.2 AA failure (2.3.3 Animation from Interactions, at AAA, but movement on every page section is a 2.3.3 violation).

- File: `src/pages/index.astro:28-42`
- Impact: Vestibular disorder users can experience nausea. Also a legal exposure for an EU-AI-Act compliance consultancy whose own site fails WCAG.
- Fix: Wrap the keyframe declaration in `@media (prefers-reduced-motion: no-preference)` or add a complementary `@media (prefers-reduced-motion: reduce) { section { animation: none; } }` block. The v2 pages show the correct implementation.
- Effort: 5 minutes.

---

### P0-04: Mobile hamburger button has no aria-label and no aria-expanded toggle

The production `Navigation.astro` mobile button (`#mobile-menu-btn`) has neither `aria-label` nor `aria-expanded` attribute. Screen reader users get an unlabelled button and no state announcement when the menu opens. The v2 NavigationV2.astro fixes both (`aria-label="Open menu"`, `aria-expanded` toggled in JS). This is a WCAG 2.2 AA failure (4.1.2 Name, Role, Value) and particularly damaging for a consultancy positioned on compliance.

- File: `src/components/Navigation.astro:17-21`
- Impact: Screen reader users cannot identify or operate the mobile menu. Fails WCAG 4.1.2. Brand credibility damage for a compliance-positioned consultancy.
- Fix: Copy the `aria-label="Open menu"` and `aria-expanded` logic from `src/components/v2/NavigationV2.astro:18-23` and `43-52` directly into `Navigation.astro`. Also add `aria-controls="mobile-menu"` to the button.
- Effort: 20 minutes.

---

### P0-05: /precedent-demo and /threshold-sar-demo are bare HTML shells with no nav, no back-link, and no path to contact

Both demo pages render a React component inside a raw `<html>` with no `<Navigation>`, no `<Footer>`, no breadcrumb, and no link back to the site. A visitor who arrives at `/precedent-demo` via the Solutions page's "Try the Precedent Explorer" CTA is in a dead end: no way to reach `/contact`, no way to understand what WIN offers, no CTA. These pages are also `noindex`ed, meaning only referral traffic from within the site reaches them — and that traffic hits a conversion wall.

- File: `src/pages/precedent-demo.astro:1-20`, `src/pages/threshold-sar-demo.astro:1-20`
- Impact: Warm, product-interested visitors leave with no route to conversion. High-intent traffic is wasted.
- Fix: Wrap both demos in the standard `Layout` with `<Navigation>` and `<Footer>`. Add a sticky or bottom CTA: "Like what you see? Talk to us." linking to `/contact?subject=Stare`. Keep `noindex` — these are demos, not SEO targets — but fix the navigation desert.
- Effort: 1 hour (two files, same pattern).

---

## P1 — fix soon

### P1-01: No skip-navigation link

Neither `Layout.astro` nor `Navigation.astro` contains a skip-nav link. Keyboard and screen reader users must tab through the entire nav on every page load. WCAG 2.4.1 (Bypass Blocks) is a AA requirement. The contact form is especially affected: there are four nav items plus the logo before any form field is reachable.

- File: `src/layouts/Layout.astro:62` (body open tag — insert before `<slot />`)
- Impact: Keyboard-only users face unnecessary friction reaching the contact form. WCAG 2.4.1 failure.
- Fix: Add `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>` before the slot. Add `id="main-content"` to the `<main>` elements in each page.
- Effort: 30 minutes.

---

### P1-02: /solutions page positions WIN as a products company; the homepage positions it as a consultancy. The two pages have no shared narrative thread.

`/solutions` headline: "Two products. One bet." — leads with righttostay and Stare. Homepage: AI consulting for SMEs, four engagement tiers. A visitor who clicks "Solutions" in the nav expecting to learn more about the consultancy services lands on a page about tenant-rights tools and law-firm software. These are genuinely different audiences. The mismatch means "Solutions" in the nav is unpredictable — it does not resolve the visitor's question "what exactly would WIN do for me?"

- File: `src/pages/solutions.astro:59-66`, `src/components/Navigation.astro:10`
- Impact: Visitors seeking more depth on the consultancy offering reach a dead end. The nav label "Solutions" over-promises and under-delivers for the primary SME audience.
- Fix: Either (a) rename nav link to "Products" and add a separate "Services" nav item linking to a `/services` page that expands EngagementModels, or (b) add a consultancy services section at the top of `/solutions` above the product cards with a clear bridge ("We also offer…"). Option (a) is architecturally cleaner.
- Effort: Hours (rename + new /services stub) or days (full /services page).

---

### P1-03: Compliance section has no id-based anchor in the expected nav slot

The nav links to `/#compliance`. The Compliance component correctly sets `id="compliance"` (line 30). However, because there is no `scroll-margin-top` on the section, the sticky nav (approximately 64 px) covers the section heading when the browser scrolls to the anchor. On mobile the nav is taller relative to viewport. This is a companion to P0-01 but worth a separate fix entry because `#compliance` is the one anchor that does resolve to its own section (unlike About which also lacks the offset).

- File: `src/components/Compliance.astro:30`, `src/styles/global.css`
- Impact: The section heading "AI Adoption That's Compliant From Day One" is hidden under the nav on anchor arrival — the user sees a blank section top.
- Fix: Add `scroll-margin-top: 80px` to `#compliance` and `#about` in `global.css`. Or use Tailwind's `scroll-mt-20` on the section element.
- Effort: 10 minutes.

---

### P1-04: Hero CTA hierarchy conflict — "Take the 3-minute audit" leads to an off-ramp from the conversion funnel

The primary hero CTA sends visitors to `/ai-readiness`. After completing the quiz, the visitor's next step is a toolkit download or a "Book a 30-Minute Call" link on `/toolkit`. The contact form is never directly surfaced until the visitor completes an 18-question quiz, processes their results, and clicks a secondary CTA on a downstream page. A visitor who already knows they want to talk is forced past the audit to reach the contact form.

The secondary hero CTA ("or book a 20-min call") is visually de-emphasised (ghost button, lowercase "or") and leads directly to `/contact`. This hierarchy should be inverted or equalised.

- File: `src/components/Hero.astro:24-37`
- Impact: High-intent visitors who want to speak to someone face a longer path than low-intent visitors taking the quiz. The audit funnel is correct for cold traffic; the contact path is correct for warm traffic. Both need equal visual weight.
- Fix: Equalise button visual weight or make the primary CTA conditional on scroll/entry point. At minimum, remove "or" (dismissive) and raise the "book a call" button to the same visual level as the audit CTA.
- Effort: 30 minutes (copy and style change).

---

### P1-05: About section is mispositioned and too thin to do its job wherever it sits

The About section (115 words, two differentiator tags: "Growing Businesses · Our Focus" and "Practical AI · Our Approach") appears after Compliance and before FinalCTA. It does not contain: who the founders are, any social proof, any client references, or anything that would let a sceptical visitor form a view on whether WIN is worth talking to. "Decades of experience" is a trust claim with no substantiation. The tags are so generic they add no signal.

Even if the section order is fixed per P0-02, About in its current form does not serve the "proof" function. This is a content problem, not just a position problem.

- File: `src/components/About.astro:13-23`
- Impact: The section that should convert sceptics into enquirers delivers no evidence. Credibility gap directly upstream of FinalCTA.
- Fix: Add at minimum: one named founder with a one-line credential, one concrete output ("we shipped X for Y sector"), or one testimonial. The two differentiator tags need specificity ("Irish SMEs and charities, 5–250 staff" instead of "Growing Businesses").
- Effort: 1–2 hours (copy only, no structural change needed).

---

### P1-06: v2-a, v2-b, v2-c are live, crawlable via direct URL, and reference a #tools anchor that does not exist in the production nav

All three v2 pages are `noindex`ed but they are publicly accessible. More importantly, `NavigationV2.astro` (used by all three) links to `#services`, `#tools`, `#about`, `#compliance` — but none of the v2 pages contain a section with `id="tools"` in the production component set except `DemosStrip.astro` which is only in the v2 pages. If someone shares a v2 link and a visitor clicks "Tools" in the nav, nothing happens. These experiments are also quietly demonstrating a better IA (DemosStrip as a first-class section) but they have no path to becoming the production nav.

- File: `src/pages/v2-a.astro:1-38`, `src/components/v2/NavigationV2.astro:11`
- Impact: Not a direct conversion blocker (noindexed), but they represent a better IA that is not being promoted. They also add dead-end nav links on the live experiments.
- Fix: (a) Decide whether v2 is the next production homepage. If yes, schedule migration. If no, delete the v2 pages so they stop accumulating drift. (b) As an immediate fix, remove the broken `#tools` link from `NavigationV2.astro` or add the `id="tools"` anchor to the v2 pages that include `DemosStrip`.
- Effort: 30 minutes (cleanup); days (if v2 → production migration).

---

### P1-07: /ai-readiness uses `client:only="react"` with no server-rendered fallback — crawlers and JS-disabled users see a blank main

`ai-readiness.astro` renders `<AIReadinessQuiz client:only="react" />` inside an otherwise empty `<main>`. There is no `<noscript>` message, no loading state visible to crawlers, and no alt content. The page has no `noindex` directive, so Google will crawl and render it. Googlebot renders JS but with a delay; the page may be indexed as empty.

- File: `src/pages/ai-readiness.astro:13-15`
- Impact: The quiz is the primary lead-gen mechanism. If it fails to render (JS timeout, slow device, crawler), visitors see a blank page with a nav and footer. Zero fallback to contact form.
- Fix: Add a `<noscript>` fallback inside `<main>` with a short message and a link to `/contact`. Consider adding `noindex` if the quiz has no indexable value, or add a static hero above the React mount point.
- Effort: 30 minutes (noscript fallback); hours (static hero above quiz).

---

### P1-08: StickyBookCTA suppressed on /contact but active on /solutions, /ai-readiness, /toolkit — creates two competing amber CTAs on pages with their own prominent amber buttons

`StickyBookCTA` is injected via `Layout.astro` into every page using the Layout wrapper. It is correctly suppressed on `/contact`. However, on `/solutions` the FinalCTA section (imported at the bottom) has its own prominent amber "Let's Talk" button, and the sticky floats in the bottom-right at the same time. On `/ai-readiness` the quiz completion flow leads to a CTA, and the sticky competes. The `FinalCTA`'s `id="contact"` suppression logic only works for the homepage scroll context.

- File: `src/components/StickyBookCTA.astro:31-34`, `src/layouts/Layout.astro:64`
- Impact: On pages with their own amber CTA sections, two amber floating elements compete for attention — diluting the action rather than amplifying it.
- Fix: Extend the `suppress` logic to also suppress on `/solutions` and `/toolkit`. Or make the StickyBookCTA observe all `id="contact"` sections site-wide via the existing IntersectionObserver.
- Effort: 30 minutes.

---

## P2 — worth doing

### P2-01: Compliance page extraction — support the brief's recommendation

The brief proposes extracting Compliance to a standalone page. This is correct. The Compliance section covers GDPR, AML/KYC, NIS2, and EU AI Act — four distinct regulatory frameworks in four cards. This is a genuine specialism and a primary SEO target (EU AI Act enforcement, August 2026 urgency). A standalone `/compliance` page can carry: the four framework cards, a "compliance readiness" CTA, the amnesty-before-audit positioning statement, case studies or worked examples, and structured data for the specialism. The homepage section can compress to a 2-line teaser + "See our compliance work →" link.

- File: `src/components/Compliance.astro` (extract); `src/pages/compliance.astro` (create); `src/components/Navigation.astro:12` (update to `/compliance` instead of `/#compliance`)
- Impact: SEO value for "EU AI Act compliance Ireland" queries; removes the nav-broken-anchor problem for Compliance (P0-01/P1-03); gives the specialism room to breathe.
- Effort: 3–4 hours (new page + nav update + homepage teaser).

---

### P2-02: About — keep on homepage, do not extract

The brief floats About extraction as a question. I dissent from extraction. At 115 words the section is too thin to anchor a standalone page; an `/about` page would either be this thin (and hurt SEO/trust) or would need significant new content investment before it earns its own URL. The correct fix is to enrich About in-place (P1-05) so it actually does the trust-building job on the homepage, directly upstream of FinalCTA. A well-written 250-word About section with a named founder and one concrete proof point is more effective than a stub About page. Revisit extraction when there is a team page, testimonials, or case study content to populate it with.

- File: `src/components/About.astro` (enrich in-place)
- Impact: Trust-building upstream of FinalCTA without the cost of a thin standalone page.
- Effort: 1–2 hours (copy enrichment).

---

### P2-03: No /tools hub — the demos are orphaned from the production site's IA

The production homepage has no section that surfaces `/ai-readiness`, `/precedent-demo`, or `/threshold-sar-demo` as a coherent set of tools. The only way a homepage visitor reaches them is via the Hero audit CTA or the FinalCTA's secondary "Take the Free AI Readiness Assessment" link. The v2 DemosStrip (`src/components/v2/DemosStrip.astro`) solves this with a three-card "Working software, not slide decks" section. The production site has no equivalent.

- File: `src/components/v2/DemosStrip.astro` (candidate for production promotion); `src/pages/index.astro` (add after EngagementModels)
- Impact: Free tools are a primary trust-building mechanism and a lead-gen path. Hiding them below the fold or in a v2 experiment means they generate no traffic or trust signal on the production homepage.
- Effort: 2 hours (promote DemosStrip to production, adapt section copy).

---

### P2-04: /contact form has no visible focus state on submit button

The submit button uses `hover:bg-amber/90` but no `focus:` variant. Keyboard-only users who tab to the submit button get no visible focus ring. The input fields do have `focus:border-teal`, so this is an inconsistency rather than a systematic gap, but the submit button is the terminal action in the conversion flow.

- File: `src/pages/contact.astro:87-90`
- Impact: Keyboard-only users may not see which element is focused at the moment of submission. Minor WCAG 2.4.7 risk.
- Fix: Add `focus:ring-2 focus:ring-amber focus:ring-offset-2 focus:outline-none` to the button class string.
- Effort: 5 minutes.

---

### P2-05: EngagementModels has two cards with initial "B" (Briefing and Build) — scannability problem in a 4-card grid

All four engagement tiers display an initial letter in a badge. Briefing = "B", Workshop = "W", Pairing = "P", Build = "B". Two of four cards share the same initial. A visitor scanning the grid for orientation cannot use the badge as a quick identifier — the most common pattern for this UI element. The Build card also has an initial collision with the card that is least like it (Briefing is 90 min; Build is 4–10 weeks).

- File: `src/components/EngagementModels.astro:3-48` (the `initial` data fields)
- Impact: Minor cognitive friction in a section where rapid orientation is the goal. No conversion blocker, but a small trust signal about attention to craft.
- Fix: Change Briefing's initial to "Br" or use an icon rather than a letter initial for one of the two. Or replace initials entirely with icons (more distinct and accessible).
- Effort: 30 minutes.

---

### P2-06: nav missing aria-label on the <nav> element — ambiguous landmark for screen readers with multiple nav regions

`Navigation.astro` uses `<nav>` without an `aria-label`. The Footer also links but is not a `<nav>`. If any page adds a secondary nav (breadcrumb, in-page) both become unlabelled "navigation" landmarks — indistinguishable to screen reader users navigating by landmark. Not a current failure since there is only one `<nav>`, but a defect to fix before any inner-page nav is added.

- File: `src/components/Navigation.astro:4`
- Impact: Preventative. Screen reader users rely on landmark labels to skip between navigation regions. Adding the label now prevents regression.
- Fix: Add `aria-label="Main navigation"` to the `<nav>` element.
- Effort: 2 minutes.

---

## Agent notes

**Files inspected:**
- `src/pages/index.astro`
- `src/components/Hero.astro`, `PainPoints.astro`, `EngagementModels.astro`, `Compliance.astro`, `About.astro`, `FinalCTA.astro`
- `src/components/Navigation.astro`, `Footer.astro`, `StickyBookCTA.astro`
- `src/layouts/Layout.astro`
- `src/styles/global.css`
- `src/pages/contact.astro`, `solutions.astro`, `ai-readiness.astro`, `toolkit.astro`, `privacy.astro`, `precedent-demo.astro`, `threshold-sar-demo.astro`, `brand-showcase.astro`
- `src/pages/v2-a.astro`, `v2-b.astro` (structure only, not design quality)
- `src/components/v2/NavigationV2.astro`, `HeroDeadline.astro`, `DemosStrip.astro`

**What I deliberately did not review:**
- `src/pages/audit.astro` — prior audit documentation per BRIEF.md exclusion
- `src/components/AIReadinessQuiz.jsx`, `RTBPrecedentDemo.jsx`, `SARDemo.jsx` — interactive component internals; I noted the shell/wrapper issues only
- `src/components/v2/` design quality (HeroContrarian, HeroPromise, HowWeWork, EngagementModelsV2, AboutV2, FinalCTAV2) — flagged v2 existence per brief; did not audit their internal design
- `brand-showcase.astro` — noindexed internal deliverable; noted existence, did not critique design
- Copy/tone quality — out of UX-IA scope; handled by a separate lens agent
