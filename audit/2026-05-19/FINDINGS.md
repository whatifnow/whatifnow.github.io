# Audit synthesis — 2026-05-19

## One-page recap (read this first)

- **Weighted overall: 49 / 100 — grade D.** The site reads competent at a glance and falls apart on the two lenses that decide a B2B consultancy sale: Trust (22/F) and Legal (38/D).
- **Single biggest gap:** Zero named humans, zero business identity. A buyer cannot tell who they would be emailing, who controls their data, or whether "What If Now" is a registered Irish entity. Both Tomás (TR-01, TR-05) and Liam (LG-01) opened on this.
- **Single biggest win since last audit:** The OG image now exists (prior SEO-04 closed); the contact form is short (prior CR-01 closed — 3 required fields now); the sticky scroll CTA exists (prior CR-05 closed). The conversion mechanics are mostly fixed — what's broken is everything that makes someone *want* to convert.
- **Three next moves this week:** (1) Name the founder, photo + 60-word bio, on the homepage About (TR-01 + TR-02). (2) Add full business identity (legal entity, CRO, registered office, named controller) to footer + privacy (LG-01). (3) Rewrite homepage title/H1/meta to target "EU AI Act readiness for Irish SMEs" and ship Service + FAQPage schema (SE-P0-1, SE-P0-4).
- **Extraction verdict:** Compliance → extract to `/compliance` (UX + SEO + Legal converge here). About → keep on homepage but enrich. See §3.
- **Be honest:** The homepage has no named human anywhere. Adding Lar's name and face is the cheapest, highest-leverage trust intervention on the entire site. It cannot stay anonymous if the goal is qualified contact-form leads.

---

## Section 1 — Scorecard

| Lens | Reviewer | Now | Grade | Prior | Δ |
|---|---|---|---|---|---|
| SEO | Sinéad | 48 | D+ | 55 | −7 (regressed: still no per-page meta; new orphan v2 pages dirty the sitemap) |
| Trust | Tomás | 22 | F | 48 | −26 (regressed hard: stricter scoring, all five prior P0s still unfixed) |
| CRO | Ciara | 62 | C | 52 | +10 (improved: form is short, sticky CTA exists, prefilled subjects) |
| A11y | Aoife | 52 | D+ | 64 | −12 (regressed: new quiz JSX surfaced more failures; mobile menu, focus, motion all still broken) |
| Brand | Órla | 67 | C+ | 70 | −3 (favicon still pre-v1.1, AIReadinessQuiz bypasses tokens, coral bleed on /solutions) |
| UX/IA | Róisín | 56 | D+ | 58 | −2 (triplicate process sections gone, but anchor scroll still broken + demos still orphaned) |
| Copy | Daire | 61 | D+ | 60 | +1 (hero+H2s improved; new hedges crept in; "amnesty before enforcement" still absent) |
| Legal | Liam | 38 | D | 66 | −28 (regressed hard: stricter Art. 13/50/22 scoring + Google Fonts CDN flagged + Cloud Function processor undisclosed) |

**Weighted overall** (Trust 20% · Legal 15% · CRO 15% · SEO 10% · Copy 10% · UX 10% · A11y 10% · Brand 10%) **= 48.7 → 49 / 100 (D)**.

Headline: The site has the plumbing of a B2B consultancy and the trust signals of a pop-up shop. Two days of identity + named-human work would lift the weighted score by ~15 points.

---

## Section 2 — The 10 things to fix this week

Picked across six lenses. No more than 2 from any single lens. Every item traces to a specific finding.

**Status legend:** ✅ shipped · ⏭ skipped (out of scope this cycle) · _(unmarked)_ pending.

**Shipped 2026-05-20:** items 2 (LG-01, PR #15), 5 (LG-04, PR #16), 8 (AX-01, PR #17), 9 (UX-P0-02, PR #17). Item 3 (EU AI Act repositioning) skipped — WIN pivot under way; revisit when positioning lands. Items 1, 4, 6, 7, 10 still pending.

### 1. Name the founder, with photo + bio, on the homepage About — Trust · TR-01 (agent-trust.md)
- Why: An SME director will not send a €12k Build enquiry to a faceless entity. Highest-leverage trust intervention; every other CTA leans on it.
- File: `src/components/About.astro:14-22`; add `public/images/lar.jpg`
- Effort: hours (AboutV2 draft already exists in `src/components/v2/AboutV2.astro`)
- Risk if not fixed: Every contact-form CTA asks a stranger to email a void.

### 2. ✅ Add full business identity (footer + privacy controller) — Legal · LG-01 (agent-legal.md) — shipped PR #15
- Why: Companies Act 2014 s.151 + GDPR Art. 13. Procurement reviewers fail the site at first scroll today. WIN sells compliance and fails the same Art. 13 test it bills clients to fix.
- File: `src/components/Footer.astro:5-53`; `src/pages/privacy.astro:154-162`
- Effort: hours (paperwork; copy is ~80 words once Lar pastes entity details)
- Risk if not fixed: Public-sector and charity buyers cannot proceed past procurement vetting.

### 3. ⏭ Rewrite homepage title, H1, meta to target EU AI Act keyword — SEO · SE-P0-1 (agent-seo.md) — skipped (positioning pivot)
- Why: WIN owns a defensible niche (EU AI Act for Irish SMEs, Aug 2026 deadline) and the homepage doesn't say so in any place a crawler can see. The v2-a draft already nails the formula — promote it.
- File: `src/pages/index.astro:14`, `src/layouts/Layout.astro:11`, `src/components/Hero.astro:16-19`
- Effort: hours
- Risk if not fixed: Zero chance of ranking for the one query that brings high-intent leads in the door.

### 4. Add Service + FAQPage structured data on homepage — SEO · SE-P0-4 (agent-seo.md)
- Why: Four priced engagement formats and three pain-point Q&A pairs are textbook schema candidates. Competitors that mark this up win the rich snippet.
- File: `src/layouts/Layout.astro:53-60`; emit in `src/pages/index.astro` head
- Effort: hours
- Risk if not fixed: Plain-text SERP entries vs competitors with rich results — measurable CTR hit.

### 5. ✅ Self-host Google Fonts (kill the consent-banner trigger) — Legal · LG-04 (agent-legal.md) — shipped PR #16
- Why: ePrivacy + Schrems II. `fonts.googleapis.com` transfers EU user IPs to Google with no consent. Self-hosting makes the site genuinely consent-free — aligns with "amnesty before audit".
- File: `src/layouts/Layout.astro:40-42`; also `src/components/SARDemo.jsx:408`, `RTBPrecedentDemo.jsx:469`
- Effort: hours
- Risk if not fixed: A regulator can flag this in 30 seconds; highest credibility-tax surface for a compliance consultancy.

### 6. Install Plausible + tag every conversion surface — CRO · CRO-P0-1 (agent-cro.md)
- Why: Without analytics, every other recommendation is unmeasurable. Prior audit's CR·06 unfixed (regression of intent per Ciara).
- File: `src/layouts/Layout.astro:60`; goals on contact submit, quiz start/complete, sticky-CTA, each tier CTA
- Effort: hours (sequence: LG-04 first or same PR so no banner is needed)
- Risk if not fixed: No proof any of the other nine fixes worked; no attribution by surface.

### 7. Differentiate CTA copy + add per-surface subject= attribution — CRO · CRO-P0-4 (agent-cro.md)
- Why: "Let's Talk" repeats 3× on Nav, FinalCTA, Sticky — all routing to a generic contact form. Nav + FinalCTA contribute zero attribution today.
- File: `src/components/Navigation.astro:13`; `src/components/FinalCTA.astro:8,17`; `src/components/StickyBookCTA.astro:7-25`
- Effort: minutes
- Risk if not fixed: Inbox triage stays blind to source surface.

### 8. ✅ Fix mobile menu accessibility (aria-label, aria-expanded, focus mgmt) — A11y · AX-01 (agent-a11y.md) + UX · P0-04 (agent-ux.md) — shipped PR #17
- Why: Mobile is the dominant first-touch channel for charity/local-gov RFPs and the only path to /contact on mobile is via this button. Screen-reader users can't operate it. WCAG 4.1.2 fail. Cross-lens duplicate.
- File: `src/components/Navigation.astro:17-21,37-50`
- Effort: 30 minutes
- Risk if not fixed: Direct lead-block for an entire audience segment; procurement-grade WCAG fail.

### 9. ✅ Reorder homepage sections to pain → solution → proof → ask — UX · P0-02 (agent-ux.md) — shipped PR #17 (final order: Hero → PainPoints → Compliance → About → EngagementModels → FinalCTA)
- Why: Today's order puts a €750–€12k pricing grid before any credibility signal. Single biggest IA error on the site.
- File: `src/pages/index.astro:16-23`
- Effort: 15 minutes (reorder imports; no copy changes)
- Risk if not fixed: Every mobile scroller hits price before trust.

### 10. Hero CTA hierarchy — amber primary, real verb on secondary — Brand · P0-01 + Copy · CO-P0-02 (agent-brand.md, agent-copy.md)
- Why: Brand spec says amber is primary; today the hero "Take the 3-minute audit" is teal. Copy starts the second CTA with lowercase "or", demoting it. Two lenses, one fix.
- File: `src/components/Hero.astro:27,31-36`
- Effort: 15 minutes
- Risk if not fixed: Two highest-leverage clicks on the site are visually and grammatically demoted.

**Lens coverage:** Trust (1), Legal (2), SEO (2), CRO (2), A11y/UX dual (1), UX (1), Brand/Copy dual (1). Six distinct lenses; no lens above two.

---

## Section 3 — Page extraction decisions

**Compliance → extract to `/compliance`. Verdict: yes.**

- UX Róisín (P2-01) explicitly recommends extraction: four distinct regulatory frameworks (GDPR, AML/KYC, NIS2, EU AI Act) deserve a URL with room to breathe.
- SEO Sinéad (SE-P0-1, SE-P1-1) aligned: homepage can't rank for "EU AI Act compliance Ireland" while compressing four regs into a 4-card grid. A standalone page can target the intent with Service schema.
- Trust Tomás (TR-03) aligned: extraction creates the surface for an AI-Act risk-classification playbook + "Updated May 2026" stamp + a dated framing of August 2026.
- Content expansion: ~350 words minimum — risk-classification explainer (prohibited / high-risk / limited-risk / minimal-risk) + one worked example ("A 40-person Dublin charity using ChatGPT for grant applications — what tier, what to do").
- Side benefit: Solves UX P0-01 (broken anchor scroll for `/#compliance` from non-home pages).

**About → keep on homepage. Verdict: no extraction.**

- UX Róisín (P2-02) explicitly dissents: 115 words is too thin to anchor a standalone page; would either stub-thin (SEO + trust hit) or need significant content investment first.
- Trust Tomás (TR-14) flags missing `/about` as P2 only.
- Resolution: enrich `About.astro` in-place per TR-01 + UX P1-05 (named founder, one concrete output, prior employer, 250 words). Revisit extraction when there's a second team member or case-study content.

**Dissent surfaced:** none material.

---

## Section 4 — Cross-lens conflicts

### Conflict A — UX wants nav consolidation; CRO wants more conversion surfaces
- UX P0-02 wants section reordering; Copy CO-P1-08 wants a new "Services" nav link; CRO CRO-P0-4 wants more *differentiated* CTAs.
- Resolution: ship the reorder + add the "Services" anchor (UX is neutral on more links if anchors resolve correctly with scroll-margin). Do not add exit-intent modal (CRO-P1-4) until analytics is in.

### Conflict B — Trust wants founder photo + bio; Legal wants no PII overshare without consent
- Trust TR-01/08/11 want Lar's name, photo, personal LinkedIn, prior employers.
- Legal LG-01 wants the controller named on privacy.
- These are aligned: controller name *should* match the person whose face is on About. No consent issue — the data subject is revealing themselves as controller, not collecting third-party PII.

### Conflict C — SEO wants longer body copy; Copy wants v1.1 brevity
- SEO SE-P1-7/SE-P1-8/SE-P0-4 want more *visible* body text. Copy CO-P0-01/05/06 want ruthless brevity.
- Resolution: not really in conflict. SEO wants Ireland/SME/charity *keywords* — not more words; better-loaded ones. Trim hedges, add geography/regulation nouns in the freed space.

### Conflict D — Legal wants Art. 50 AI disclosure on quiz; CRO wants frictionless quiz entry
- Legal LG-03 wants a "rules-based — no AI model" notice; CRO CRO-P1-8 wants to *reduce* from 5 upfront fields to 2.
- Resolution: complementary. Art. 50 notice is one line of microcopy that *increases* trust for compliance-shopping visitors. Pair the field-reduction with the transparency notice in the same PR.

### Conflict E — Brand wants amber CTA on Workshop; CRO/Trust want "MOST BOOKED" removed
- Brand P2-04 wants Workshop CTA changed from teal to amber. CRO CRO-P2-6 + Trust TR-12 want the unverifiable "MOST BOOKED" badge removed.
- Resolution: do both. They don't interact.

---

## Section 5 — Risk map (per Tier-1 item)

1. **Founder bio** — If Lar's prior roles are oversold, every trust gain reverses on first LinkedIn lookup. Keep claims verifiable.
2. **Business identity** — If WIN trades as a sole trader rather than Ltd, the disclosure is shorter but harder (no CRO number). Say so plainly.
3. **Homepage title rewrite** — Brand-tail keyword drops below the EU AI Act phrase. Correct for a low-awareness brand but worth knowing.
4. **Service + FAQPage schema** — Schema validation errors can break existing Org JSON-LD if nested wrong. Test in Google Rich Results before deploying.
5. **Self-host fonts** — Layout shift if local font metrics differ. Ship with `size-adjust` and measure CLS before/after.
6. **Plausible** — If LG-04 ships after, you've added a tracker before removing Google Fonts and still need a banner. Sequence LG-04 first or same PR.
7. **CTA differentiation** — Granular Formspree subjects only help if someone reads inbox by subject. Document the routing.
8. **Mobile menu a11y** — Focus management changes can introduce focus-trap bugs on iOS Safari. Test on a real device.
9. **Section reorder** — Verify FinalCTA's "scroll back up to pricing" path still works.
10. **Hero CTA hierarchy** — Quiz CTA becoming secondary may dip /ai-readiness traffic. That's correct (warm leads should hit /contact directly) but watch quiz-start rate for 2 weeks and rebalance if it falls >30%.

---

## Section 6 — What landed since the last audit

**Confirmed resolved (prior P0/P1s):**
- SEO·04 OG image now exists (1200×630 verified).
- CR·01 contact form is now 3 required fields (down from 7); phone correctly opt-in.
- CR·05 sticky scroll CTA exists.
- IA·01 triplicate process sections appear consolidated.
- BR·07 hard-coded `bg-[#1A3D54]` on featured engagement card resolved.
- CO·02 "Simply" hedge on How It Works headline gone.

**Still broken (prior audit → this audit):**
- TR·01 zero named humans → TR-01 (P0).
- TR·02 zero engagements → TR-02 (P0).
- TR·03 unverifiable 24-hr claim → TR-04, TR-13.
- SEO·02/03 H2s carry no keywords, generic description → SE-P0-1, SE-P1-1.
- CR·06 zero analytics → CRO-P0-1 (regression of intent).
- LG·01 no consent/banner → LG-04 (right fix per Liam is self-host, not banner).
- LG·02 controller identity missing → LG-01.
- A11Y·03 mobile menu aria → AX-01.
- A11Y·07 reduced motion → AX-05.
- IA·05 scroll-margin-top missing → UX-P0-01, UX-P1-03.

**Newly flagged (not in prior audit):**
- Orphan v2 pages in sitemap (`v2-a/b/c`) — SE-P0-3.
- Held-Square coral `#e8554a` bleeding into WIN /solutions — Brand P0-04.
- AIReadinessQuiz.jsx bypasses entire token system (30+ inline hex) — Brand P1-02.
- Demo pages (precedent-demo, threshold-sar-demo) are bare React shells with no nav/footer/back-link — UX P0-05.
- Quiz performs automated profiling without Art. 13/22 notice — LG-02.
- Google Cloud Function `send-toolkit` is an undisclosed processor — LG-05.
- Quiz q14 references obsolete Feb 2025 deadline as if still future — LG-08.
- StickyBookCTA competes with FinalCTA on /solutions, /ai-readiness, /toolkit — UX P1-08.
- Subject URL param read into form field with no whitelist — LG-11.
- New component StickyBookCTA exists (good, but needs page-specific suppression and dismiss button).

---

## Section 7 — Tier 2 + Tier 3 backlog

(All findings not in §2, indexed by lens for follow-on PRs.)

### SEO

| id | title | sev | effort | file |
|---|---|---|---|---|
| SE-P0-2 | Per-page meta descriptions missing | P0 | minutes | `src/layouts/Layout.astro:11`, `contact.astro:7` |
| SE-P0-3 | Sitemap includes noindex orphans | P0 | minutes | `astro.config.mjs:9` |
| SE-P0-5 | Demo pages are crawler-empty shells | P0 | days | precedent-demo.astro, threshold-sar-demo.astro |
| SE-P1-1 | Homepage H2s carry no keyword weight | P1 | hours | multi |
| SE-P1-2 | Solutions H1 doesn't say what's on page | P1 | minutes | `solutions.astro:60-62` |
| SE-P1-3 | Missing og:image:alt, twitter:image, og:locale | P1 | minutes | `Layout.astro:26-37` |
| SE-P1-4 | Org schema lacks logo/sameAs/address | P1 | minutes | `Layout.astro:53-60` |
| SE-P1-5 | Internal links live only in CTAs | P1 | minutes | PainPoints/Compliance |
| SE-P1-6 | Sticky CTA href identical across pages | P1 | minutes | StickyBookCTA.astro |
| SE-P1-7 | AI Readiness page is thin JS quiz | P1 | hours | `ai-readiness.astro:1-17` |
| SE-P1-8 | No Ireland/SME/Charity terms in homepage body | P1 | minutes | About.astro, Hero.astro |
| SE-P2-1 | No lastmod in sitemap | P2 | minutes | `astro.config.mjs:9` |
| SE-P2-2 | robots.txt doesn't block noindex orphans | P2 | minutes | `public/robots.txt` |
| SE-P2-3 | Privacy H1 decorative | P2 | minutes | `privacy.astro:18` |
| SE-P2-4 | No BreadcrumbList schema | P2 | hours | `Layout.astro` |
| SE-P2-5 | Check global.css for font-display:swap | P2 | minutes | `global.css` |
| SE-P2-6 | Default fallback description keyword-poor | P2 | minutes | `Layout.astro:11` |

### Trust

| id | title | sev | effort | file |
|---|---|---|---|---|
| TR-02 | Zero engagements / case studies | P0 | hours | EngagementModels.astro |
| TR-03 | EU AI Act expertise unproven | P0 | hours-days | `Compliance.astro:21-26` |
| TR-04 | "24-hour" claim unverifiable | P0 | minutes-hours | FinalCTA, contact.astro |
| TR-05 | Footer has no entity/CRO/address | P0 | minutes | `Footer.astro:5-11` |
| TR-06 | No testimonial, even anonymised | P1 | hours | between EngagementModels & Compliance |
| TR-07 | Substack link no context/count | P1 | hours | `Footer.astro:16-26` |
| TR-08 | LinkedIn link is company not person | P1 | minutes | `Footer.astro:29-39` |
| TR-09 | Contact form "human" doesn't name them | P1 | minutes | `contact.astro:12-14,93-95` |
| TR-10 | No third-party validators | P1 | hours-days | site-wide |
| TR-11 | "Decades of experience" unevidenced | P1 | minutes | `About.astro:17-19` |
| TR-12 | "MOST BOOKED" unsupported | P1 | minutes | `EngagementModels.astro:24,67-71` |
| TR-13 | Three "24-hour" copies amplify gap | P1 | minutes | FinalCTA + contact |
| TR-14 | No /about page | P2 | hours | new page |
| TR-15 | No inline privacy reassurance on form | P2 | minutes | `contact.astro:93-96` |
| TR-16 | No internal writing surface | P2 | hours | site-wide |
| TR-17 | No prior-employer badge row | P2 | hours | About |
| TR-18 | Compliance icons generic padlocks | P2 | hours | `Compliance.astro:3-25` |
| TR-19 | No "Updated {month}" stamps | P2 | minutes | site-wide |

### CRO

| id | title | sev | effort | file |
|---|---|---|---|---|
| CRO-P0-2 | No social proof above the fold | P0 | hours-days | index.astro |
| CRO-P0-3 | AI Act urgency never above the fold | P0 | minutes-hours | `Hero.astro:16-22` |
| CRO-P0-5 | Quiz completion doesn't hydrate contact form | P0 | hours | `AIReadinessQuiz.jsx:867-899,925-931` |
| CRO-P1-1 | Sticky CTA copy generic | P1 | minutes | `StickyBookCTA.astro:7,24` |
| CRO-P1-3 | EngagementModels Build has no per-tier qualifying questions | P1 | hours | `EngagementModels.astro:9-47` |
| CRO-P1-4 | No exit-intent / scroll-depth secondary capture | P1 | hours | site-wide |
| CRO-P1-5 | Phone hidden behind checkbox | P1 | minutes | `contact.astro:65-81` |
| CRO-P1-6 | Toolkit thank-you has no second micro-conversion | P1 | hours | `toolkit.astro:38-47` |
| CRO-P1-7 | Submit button lacks expectancy | P1 | minutes | `contact.astro:91` |
| CRO-P1-8 | Quiz LeadScreen requires 5 upfront fields | P1 | hours | `AIReadinessQuiz.jsx:422-429,452-519` |
| CRO-P2-1 | "Q 3/18" implies longer than promised | P2 | minutes | `Hero.astro:43-46` |
| CRO-P2-2 | "Not ready to talk yet?" frames assessment as downgrade | P2 | minutes | `FinalCTA.astro:24-34` |
| CRO-P2-3 | Subject param lost on navigation | P2 | hours | `contact.astro:104-111` |
| CRO-P2-4 | No partial-form abandonment tracking | P2 | hours | `contact.astro:16-98` |
| CRO-P2-5 | PainPoints cards don't ladder to matched CTAs | P2 | hours | `PainPoints.astro:30-39` |
| CRO-P2-6 | "MOST BOOKED" unverifiable | P2 | minutes | `EngagementModels.astro:23-24` |

### A11y

| id | title | sev | effort | file |
|---|---|---|---|---|
| AX-02 | Contact form has no aria-live/aria-invalid | P0 | hours | `contact.astro:16-98` |
| AX-03 | No skip-to-content link | P0 | 30 min | `Layout.astro:62-65` |
| AX-04 | Quiz step changes don't move focus | P0 | hours | `AIReadinessQuiz.jsx:527-641,939-980` |
| AX-05 | Global fadeInUp ignores prefers-reduced-motion | P0 | 15 min | `index.astro:27-42` |
| AX-06 | Decorative SVGs missing aria-hidden | P1 | 1 hr | multi |
| AX-07 | Required-field asterisk contrast + announcement | P1 | 30 min | contact.astro, quiz |
| AX-08 | No visible custom focus ring | P1 | 1 hr | global.css |
| AX-09 | Heading order broken (h1→h3) | P1 | 1 hr | Hero/contact/quiz |
| AX-10 | text-slate/60 + slate-400/500 below 4.5:1 | P1 | 1 hr | contact, quiz |
| AX-11 | Phone field reveal has no aria announcement | P1 | 30 min | `contact.astro:66-81,113-119` |
| AX-12 | Quiz options colour-only selection | P1 | 2 hrs | `AIReadinessQuiz.jsx:596-618` |
| AX-13 | Sticky CTA overlaps focused fields on mobile | P1 | 1 hr | StickyBookCTA.astro |
| AX-14 | Honeypot uses left:-9999px | P2 | minutes | `contact.astro:19-21` |
| AX-15 | Privacy grid not semantic list | P2 | 15 min | `privacy.astro:129-143` |
| AX-16 | Required vs optional indistinguishable | P2 | 15 min | contact.astro |
| AX-17 | Nav CTA conflicting font-weight | P2 | 5 min | `Navigation.astro:13,30` |
| AX-18 | html lang not en-IE | P2 | 1 min | `Layout.astro:17` |
| AX-19 | External links no SR cue | P2 | 15 min | privacy, Footer |

### Brand

| id | title | sev | effort | file |
|---|---|---|---|---|
| P0-02 | Contact submit uses rounded-xl, not rounded-full | P0 | 10 min | `contact.astro:89` |
| P0-03 | Favicon uses pre-v1.1 palette | P0 | 10 min | `public/favicon.svg:2-4` |
| P0-04 | Held-Square coral bleeds into /solutions | P0 | 30-45 min | `solutions.astro:72,75,94` |
| P1-01 | Nav CTA conflicting font-weight | P1 | 5 min | `Navigation.astro:13,30` |
| P1-02 | AIReadinessQuiz bypasses tokens | P1 | 2-3 hrs | quiz file |
| P1-03 | Demo components render old-palette logo | P1 | 10 min | RTBPrecedentDemo.jsx:17, SARDemo.jsx:17 |
| P1-04 | font-mono no registered token | P1 | 20 min | `Hero.astro:45,57` |
| P1-05 | HowItWorks uses Tailwind default border | P1 | 5 min | `HowItWorks.astro:49` |
| P1-06 | SVG stroke-width inconsistent | P1 | 20 min | multi |
| P1-07 | Privacy page inline hex border | P1 | 10 min | `privacy.astro:97,103` |
| P2-01 | About on navy lacks teal eyebrow | P2 | 15 min | `About.astro:11` |
| P2-02 | Wordmark uses Inter not DM Serif | P2 | 15 min | `Navigation.astro:6-7` |
| P2-03 | Form focus states have no visible ring | P2 | 15 min | contact.astro |
| P2-04 | Workshop featured CTA teal not amber | P2 | 10 min | `EngagementModels.astro:102-104` |
| P2-05 | Amber never used as structural accent | P2 | 1-2 hrs | site-wide |
| P2-06 | /toolkit unreachable from nav | P2 | 15 min | Navigation/toolkit |

### UX/IA

| id | title | sev | effort | file |
|---|---|---|---|---|
| UX-P0-01 | Nav anchor links miss scroll offset on inner pages | P0 | 30 min | Navigation, global.css |
| UX-P0-03 | Global fadeInUp, no reduced-motion guard | P0 | 5 min | `index.astro:28-42` |
| UX-P0-05 | Demo pages lack nav/footer/back-link | P0 | 1 hr | precedent-demo, threshold-sar-demo |
| UX-P1-01 | No skip-navigation link | P1 | 30 min | `Layout.astro:62` |
| UX-P1-02 | /solutions vs homepage positioning mismatch | P1 | hours-days | solutions, Navigation:10 |
| UX-P1-03 | scroll-margin-top missing on anchors | P1 | 10 min | global.css |
| UX-P1-04 | Hero CTA off-ramps high-intent visitors | P1 | 30 min | `Hero.astro:24-37` |
| UX-P1-05 | About section thin (115 words) | P1 | 1-2 hrs | `About.astro:13-23` |
| UX-P1-06 | v2 pages live with broken #tools nav | P1 | 30 min - days | v2-*.astro |
| UX-P1-07 | /ai-readiness no noscript fallback | P1 | 30 min - hrs | `ai-readiness.astro:13-15` |
| UX-P1-08 | StickyBookCTA competes with FinalCTA | P1 | 30 min | StickyBookCTA, Layout:64 |
| UX-P2-03 | No /tools hub | P2 | 2 hrs | DemosStrip candidate |
| UX-P2-04 | Submit button no focus state | P2 | 5 min | `contact.astro:87-90` |
| UX-P2-05 | Two cards share initial "B" | P2 | 30 min | `EngagementModels.astro:3-48` |
| UX-P2-06 | nav missing aria-label | P2 | 2 min | `Navigation.astro:4` |

### Copy

| id | title | sev | effort | file |
|---|---|---|---|---|
| CO-P0-01 | Hero subhead hedges with "actually" | P0 | 5 min | `Hero.astro:21` |
| CO-P0-03 | FinalCTA headline misses Aug 2026 urgency | P0 | 10 min | `FinalCTA.astro:8` |
| CO-P0-04 | Contact page title generic | P0 | 5 min | `contact.astro:7` |
| CO-P0-05 | About heading "Built for Business" empty | P0 | 5 min | `About.astro:11` |
| CO-P1-01 | Compliance heading title-case inconsistent | P1 | 5 min | `Compliance.astro:33` |
| CO-P1-02 | EngagementModels Build description has procurement language | P1 | 10 min | `EngagementModels.astro:41` |
| CO-P1-03 | Toolkit CTA "Book a Free 30-Minute Call" promotional | P1 | 5 min | `toolkit.astro:44` |
| CO-P1-04 | Toolkit "No obligation. No hard sell." defensive | P1 | 5 min | `toolkit.astro:46` |
| CO-P1-05 | Solutions subhead "We don't just talk about it" hedges | P1 | 5 min | `solutions.astro:64` |
| CO-P1-06 | About "We're not here to sell you…" negative | P1 | 10 min | `About.astro:15` |
| CO-P1-07 | PainPoints "we hear every day" imprecise | P1 | 5 min | `PainPoints.astro:27` |
| CO-P1-08 | Nav missing "Services" link | P1 | 10 min | `Navigation.astro:10-13` |
| CO-P2-01 | Submit button copy passive | P2 | 5 min | `contact.astro:90` |
| CO-P2-02 | Compliance AML/KYC "without creating new risk" hedges | P2 | 10 min | `Compliance.astro:13` |
| CO-P2-03 | Footer has no tagline | P2 | 10 min | `Footer.astro:5-53` |
| CO-P2-04 | Solutions bridge sentence flat | P2 | 5 min | `solutions.astro:143` |
| CO-P2-05 | AI Readiness title misses EU AI Act intent | P2 | 5 min | `ai-readiness.astro:9` |
| CO-P2-06 | Privacy "plain and simple" cliché | P2 | 5 min | `privacy.astro:19` |

### Legal

| id | title | sev | effort | file |
|---|---|---|---|---|
| LG-02 | Quiz profiling, no Art. 13/22 notice, no LIA | P0 | hours | `AIReadinessQuiz.jsx:337-356,419-523,645-724` |
| LG-03 | No Art. 50 AI transparency on quiz/demos | P0 | hours | quiz + demos |
| LG-05 | Privacy omits Google Cloud Function processor | P0 | minutes | `privacy.astro:92-113` |
| LG-06 | "Legitimate interest" catch-all without LIA | P1 | hours | `privacy.astro:85-88` |
| LG-07 | Contact form no Art. 13 just-in-time notice, no captcha | P1 | hours | `contact.astro:16-99` |
| LG-08 | Quiz q14 references obsolete Feb 2025 deadline | P1 | minutes | `AIReadinessQuiz.jsx:170-178` |
| LG-09 | No accessibility statement (EU WAD) | P1 | hours | new accessibility.astro |
| LG-10 | Privacy retention single-bucket 24 months | P1 | minutes | `privacy.astro:115-121` |
| LG-11 | subject URL param read with no sanitisation | P1 | minutes | `contact.astro:84,104-111` |
| LG-12 | "Last updated: March 2026" stale | P1 | minutes | `privacy.astro:24` |
| LG-13 | Privacy rights lack SLA/proof-of-ID/refusal | P1 | hours | `privacy.astro:124-149` |
| LG-14 | No security.txt | P2 | minutes | `public/.well-known/security.txt` |
| LG-15 | Org schema lacks legalName/address/vatID | P2 | minutes | `Layout.astro:53-60` |
| LG-16 | Quiz posts all 18 raw answers to Formspree | P2 | hours | `AIReadinessQuiz.jsx:682-714` |
| LG-17 | No Permissions-Policy / Referrer-Policy / CSP | P2 | hours | `Layout.astro:16-66` |
| LG-18 | No "we set zero cookies" trust claim | P2 | minutes | `privacy.astro` |
| LG-19 | Privacy doesn't address international transfers | P2 | hours | `privacy.astro:110-113` |

---

## Section 8 — Closing note for the founder

The site is one good week from a different conversation. Tier-1 items 1, 2, and 9 cost almost no engineering — a founder photo, a legal-entity line, and a 15-minute file reorder. Items 3, 4, 5, 6 are half a day each. Items 7, 8, 10 are minutes.

If only three could ship this week: 1, 2, 3. They are the trinity of the site's actual problem — *no human, no business, no positioning*. Everything else is downstream.
