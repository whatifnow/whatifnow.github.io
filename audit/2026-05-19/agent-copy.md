# Copy & Voice audit — Daire (CO)

**Score:** 61 / 100 (grade D+)
**Success-metric link:** Unclear CTAs, hedged subheads, and register gaps reduce the visitor's confidence at every decision point — fixing them directly shortens the path from landing to qualified form submission.

---

## P0 — fix now

### CO-P0-01: Hero subhead hedges with "actually" — weakens the opening promise
- File: `src/components/Hero.astro:21`
- Impact: The word "actually" is a hedge disguised as emphasis. Per v1.1, WIN states things clearly. "The bits that would actually free up their team" reads as uncertain, almost apologetic. The hero subhead is the highest-leverage copy on the site — a weak word here undermines the confident voice before the visitor reads anything else.
- Fix:
  - Before: `Most small organisations are using more AI than they realise — and missing the bits that would actually free up their team. The 3-minute audit shows you where you sit.`
  - After: `Most small organisations are using more AI than they realise — and missing the parts that would free up their team. The 3-minute audit shows you where you stand.`
- Effort: 5 minutes

### CO-P0-02: Hero secondary CTA is lower-case, subordinate — loses a qualified lead entry point
- File: `src/components/Hero.astro:33`
- Impact: "or book a 20-min call" opens with a lower-case "or", visually and grammatically positioning the call CTA as an afterthought. A visitor who is ready to talk — the most qualified lead — is not pushed to act. The friction tier should be clear: audit first, then call. But the call CTA still needs to stand on its own.
- Fix:
  - Before: `or book a 20-min call`
  - After: `Book a 20-min scoping call`
- Effort: 5 minutes

### CO-P0-03: FinalCTA headline is generic — misses the August 2026 urgency driver
- File: `src/components/FinalCTA.astro:8`
- Impact: "Let's Have a Conversation" is the last headline a visitor reads before leaving or converting. It says nothing about why to act now. The EU AI Act enforcement date (August 2026) is the site's primary urgency driver per the brief. This headline squanders it, costing conversions from the compliance-motivated segment.
- Fix:
  - Before: `Let's Have a Conversation`
  - After: `The EU AI Act enforcement window closes in August. Let's talk now.`
- Effort: 10 minutes

### CO-P0-04: Contact page title tag is generic — reduces search-qualified traffic
- File: `src/pages/contact.astro:7`
- Impact: `<title>Contact Us | What If Now</title>` is a placeholder. "Contact Us" does not communicate what the visitor is contacting WIN about, nor does it signal the specialism. A visitor searching "AI Act compliance consultant Ireland" who lands on this page via a linked CTA expects to be reassured they are in the right place. The title fails that test and suppresses organic click-through for any future search visibility on this URL.
- Fix:
  - Before: `Contact Us | What If Now`
  - After: `Talk to an AI Consultant | What If Now`
- Effort: 5 minutes

### CO-P0-05: About section "Built for Business" heading is vague — carries zero brand signal
- File: `src/components/About.astro:11`
- Impact: "Built for Business" could belong to any consultancy, accountancy, or software firm. It communicates no specialism, no voice, no distinction. The section directly precedes the Compliance block where the EU AI Act urgency is established — a stronger heading would prime the reader.
- Fix:
  - Before: `Built for Business`
  - After: `We're in it with you.`
- Effort: 5 minutes

---

## P1 — fix soon

### CO-P1-01: Compliance section heading uses title case inconsistently with the rest of the site
- File: `src/components/Compliance.astro:33`
- Impact: "AI Adoption That's Compliant From Day One" uses title case while every other section heading uses sentence case. Register inconsistency breaks the single-brand-voice rule. Visitors and copywriters following the site as a style reference will replicate the error.
- Fix:
  - Before: `AI Adoption That's Compliant From Day One`
  - After: `AI adoption that's compliant from day one.`
- Effort: 5 minutes

### CO-P1-02: EngagementModels "Build" card description is overloaded with caveats
- File: `src/components/EngagementModels.astro:41`
- Impact: "Fixed scope, fixed fee. We document, train, and step out. Commercial fit — bespoke or product-based — agreed in scoping." The final sentence is internal procurement language, not client-facing copy. It erodes the confident voice precisely in the highest-value tier.
- Fix:
  - Before: `We design, build, and ship a working AI tool tailored to your operation. Fixed scope, fixed fee. We document, train, and step out. Commercial fit — bespoke or product-based — agreed in scoping.`
  - After: `We design, build, and ship a working AI tool tailored to your operation. Fixed scope, fixed fee. We hand over the docs, train your team, and step out. You own it.`
- Effort: 10 minutes

### CO-P1-03: Toolkit confirmation page CTA label is round-tripped from the old register
- File: `src/pages/toolkit.astro:44`
- Impact: "Book a Free 30-Minute Call" uses adjective stacking ("Free", "30-Minute") that reads promotional rather than human. The brief says "Human — contractions, short sentences." This is the post-assessment moment — the visitor is warm. A softer, more direct label converts better.
- Fix:
  - Before: `Book a Free 30-Minute Call`
  - After: `Talk through your results`
- Effort: 5 minutes

### CO-P1-04: Toolkit confirmation page sub-label "No obligation. No hard sell." is defensive
- File: `src/pages/toolkit.astro:46`
- Impact: Saying "No hard sell" raises the concept of a hard sell in the visitor's mind. This is the opposite of the reassurance it intends. v1.1 voice is confident, not apologetic. The contact page already handles this more cleanly ("One human reply … No sales sequence").
- Fix:
  - Before: `No obligation. No hard sell.`
  - After: `One call. No pitch.`
- Effort: 5 minutes

### CO-P1-05: Solutions page subhead switches register mid-sentence
- File: `src/pages/solutions.astro:64`
- Impact: "We don't just talk about it. We build the tools — for tenants who need to know their rights, and for the lawyers who help them." The phrase "We don't just talk about it" is a self-referential hedge — it implies there is something to defend. The second sentence is clear and confident; the first undermines it.
- Fix:
  - Before: `We don't just talk about it. We build the tools — for tenants who need to know their rights, and for the lawyers who help them.`
  - After: `We build the tools — for tenants who need to know their rights, and for the lawyers who help them.`
- Effort: 5 minutes

### CO-P1-06: About body copy contains "simply" equivalent — "just" used as a hedge filler
- File: `src/components/About.astro:15`
- Impact: "We're not here to sell you tools you don't need or strategies that don't fit." — negative framing. Starting a sentence with "We're not here to…" defines the brand against a negative. Voice rule: state what you do, not what you don't.
- Fix:
  - Before: `We're not here to sell you tools you don't need or strategies that don't fit.`
  - After: `We find the right fit for where you are now — and build from there.`
- Effort: 10 minutes

### CO-P1-07: PainPoints subhead uses "every day" — imprecise and mildly hyperbolic
- File: `src/components/PainPoints.astro:27`
- Impact: "These are the questions we hear every day." is a soft credibility claim with no grounding. Per v1.1 — practical, honest. A grounded alternative maintains empathy without the claim.
- Fix:
  - Before: `These are the questions we hear every day. You're not alone — and there are good answers.`
  - After: `These are the questions every organisation asks. You're not the first — and there are clear answers.`
- Effort: 5 minutes

### CO-P1-08: Navigation missing "Services" link — forces scroll to find the engagement model section
- File: `src/components/Navigation.astro:10-13`
- Impact: The nav exposes Solutions, About, Compliance — but not Services (the EngagementModels section). A prospect wanting to understand what WIN sells and at what price has no direct nav path. They must scroll or guess. Lost intent = lost lead.
- Fix: Add `<a href="/#services">Services</a>` between Solutions and About in both desktop and mobile nav.
- Effort: 10 minutes

---

## P2 — worth doing

### CO-P2-01: Contact form submit button copy is passive — misses an opportunity for momentum
- File: `src/pages/contact.astro:90`
- Impact: "Start the conversation" is not bad, but it is slightly passive. Given the page heading is already "Let's Talk", there is a register mismatch. A micro-rewrite aligns them.
- Fix:
  - Before: `Start the conversation`
  - After: `Send it`
- Effort: 5 minutes

### CO-P2-02: Compliance AML/KYC card description hedges with "without creating new risk"
- File: `src/components/Compliance.astro:13`
- Impact: "enhance compliance processes without creating new risk" is cautious phrasing that implicitly admits risk is in play. For a compliance-minded reader this phrase can seed doubt rather than build confidence.
- Fix:
  - Before: `For financial services and regulated industries, we design AI solutions that enhance compliance processes without creating new risk.`
  - After: `For financial services and regulated industries, we design AI solutions that strengthen compliance processes and are auditable from day one.`
- Effort: 10 minutes

### CO-P2-03: Footer has no tagline or closing brand statement
- File: `src/components/Footer.astro:5-53`
- Impact: The footer is copyright + links only. A single closing line ("Practical AI for growing organisations.") would reinforce brand recall at page exit — a micro-investment with modest but real brand-building value at the bottom of every page.
- Fix: Add one line above the copyright: `Practical AI for growing organisations.`
- Effort: 10 minutes

### CO-P2-04: Solutions page bridge sentence is passive and slightly self-deprecating
- File: `src/pages/solutions.astro:143`
- Impact: "We build because we use it ourselves. The consulting work and the products feed each other." The second sentence is functional but flat. The first sentence is a genuine differentiator — lean into it.
- Fix:
  - Before: `We build because we use it ourselves. The consulting work and the products feed each other.`
  - After: `We build because we use it ourselves. Client work sharpens the products. The products sharpen the work.`
- Effort: 5 minutes

### CO-P2-05: AI Readiness page `<title>` misses the compliance angle — lost search intent signal
- File: `src/pages/ai-readiness.astro:9`
- Impact: "AI Readiness Assessment | What If Now" is accurate but does not capture "EU AI Act" search intent. A low-cost improvement given August 2026 enforcement is the urgency driver.
- Fix:
  - Before: `AI Readiness Assessment | What If Now`
  - After: `EU AI Act Readiness Assessment | What If Now`
- Effort: 5 minutes

### CO-P2-06: Privacy page hero uses "plain and simple" — minor cliche, minor fix
- File: `src/pages/privacy.astro:19`
- Impact: "Your privacy. Plain and simple." — "plain and simple" is a worn phrase. The privacy page is not a primary conversion surface, but it is often read by cautious, high-consideration visitors. Voice consistency matters here.
- Fix:
  - Before: `Your privacy.<br />Plain and simple.`
  - After: `Your privacy.<br />Straight forward.`
- Effort: 5 minutes

---

## Agent notes

### Files inspected
- `src/components/Hero.astro`
- `src/components/PainPoints.astro`
- `src/components/EngagementModels.astro`
- `src/components/Compliance.astro`
- `src/components/About.astro`
- `src/components/FinalCTA.astro`
- `src/components/Navigation.astro`
- `src/components/Footer.astro`
- `src/pages/contact.astro`
- `src/pages/solutions.astro`
- `src/pages/toolkit.astro`
- `src/pages/privacy.astro` (first 60 lines)
- `src/pages/ai-readiness.astro`

### What I deliberately did not review

- `src/pages/audit.astro` — prior audit documentation per brief instructions; read for regression context only, not critiqued.
- `src/pages/v2-a.astro`, `v2-b.astro`, `v2-c.astro` and `src/components/v2/` — orphan experiments per brief; existence noted, quality not assessed.
- `src/pages/precedent-demo.astro` and `src/pages/threshold-sar-demo.astro` — demo/tool pages, not primary conversion surfaces; outside the brief's stated scope.
- `src/pages/brand-showcase.astro` — internal reference page, not client-facing.
- `src/components/AIReadinessQuiz.jsx` — quiz microcopy is a separate, high-volume surface that warrants its own focused review; spot-checking the wrapper page title was sufficient for this pass.

### Amnesty-before-enforcement line

The "amnesty before enforcement" framing called out in the brief as an audit-recommended phrase that should have landed does not appear anywhere in the inspected copy. The Compliance section is its natural home. Not raised as a standalone finding because the section already communicates the "compliant from day one" message; but the synthesis agent should weigh whether that precise phrase should be inserted as a headline or sub-label in Compliance or FinalCTA.

### Register summary

Three distinct registers are present across the site: (1) confident and conversational in Hero and PainPoints; (2) formal and cautious in About paragraph 3 and Compliance card copy; (3) promotional in Toolkit. Findings CO-P0-05, CO-P1-02, CO-P1-04, and CO-P1-06 address the most damaging register breaks. A full register normalisation pass would take approximately half a day and is worth scheduling as a follow-on.
