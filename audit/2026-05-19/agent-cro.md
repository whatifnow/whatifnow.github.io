# Conversion (CRO) audit — Ciara

**Score:** 62 / 100 (grade C)
**Success-metric link:** This lens is the metric. Every friction point between a visitor landing and a contact-form submission lives here — field count, CTA hierarchy, the micro-conversion ladder, and the ability to measure any of it.

The fundamentals are mostly right: the form is short (3 required), subject-prefill works, sticky CTA hides intelligently around FinalCTA, four pricing tiers each have their own prefilled CTA. The grade is held down by one thing above all: **none of this is measurable** — zero analytics ship — so no claim made anywhere on this page can be verified against the metric. The other gaps are: no social proof anywhere on the homepage, no urgency anchor on the Aug-2026 AI Act lever, and CTA copy that says "Let's Talk" three different ways without varying the offer underneath.

---

## P0 — fix now

### CRO-P0-1: Zero analytics shipping — every recommendation here is unmeasurable
- File: `src/layouts/Layout.astro:16-66` (no `<script>` for any analytics provider); confirmed by `grep -rni "plausible|fathom|gtag|umami|posthog" src/` returning nothing in live code (only hits are inside the documentation page `src/pages/audit.astro`).
- Impact: You cannot prove a single CRO change moved the metric. Form submits aren't counted. Quiz starts vs completions aren't counted. The 4 prefilled-subject CTAs in EngagementModels are indistinguishable in your inbox by source. The prior audit (audit.astro:487, :851, :958-959) flagged this — it's been unfixed long enough to register as a regression of intent.
- Fix: Install Plausible (`<script defer data-domain="whatifnow.ie" src="https://plausible.io/js/script.outbound-links.js">`) in `Layout.astro:60`. Fire goals on (a) contact-form submit, (b) quiz `Start My Free Assessment`, (c) quiz `Get My Free Toolkit`, (d) sticky-CTA click, (e) each EngagementModels CTA tagged with its tier. Ship the cookie banner before/with the script (ePrivacy).
- Effort: hours

### CRO-P0-2: No social proof above the fold — or anywhere on the homepage
- File: `src/pages/index.astro:14-23` (page composition: Hero → PainPoints → EngagementModels → Compliance → About → FinalCTA — no testimonials, no client logos, no case-study strip); confirmed by `grep -i "testimonial|client|trusted|case stud"` returning zero matches across `src/components/*.astro`.
- Impact: Fixed-fee engagements from €750 to €12,000+ are being asked of strangers with no proof anyone else has bought, finished, or recommended. This is the single biggest lift you can give to lead quality and quantity simultaneously — without it, every CTA below is a leap of faith.
- Fix: Add a 4–6-logo strip ("Trusted by…") immediately under the Hero, plus one short testimonial (named person, named org, one sentence on a measurable outcome — "saved 8 hrs/week" per brand voice). If no permissioned logos exist yet, ship a single founder-named quote with a photo and a sector tag ("Charity, 40 staff") and a "more case studies" link to a placeholder page. Better one real proof point than four polished generics.
- Effort: hours (component) + days (asset clearance from clients)

### CRO-P0-3: AI Act urgency — the whole positioning lever — never appears above the fold
- File: `src/components/Hero.astro:16-22` (headline = sector benchmark question, subhead = "free up their team"); first AI-Act mention is buried in `PainPoints.astro:16` then in `Compliance.astro` (4th section).
- Impact: BRIEF.md names "EU AI Act compliance — August 2026 enforcement" as the urgency driver. With ~15 weeks left, the homepage hero treats it as a footnote. A countdown / dated framing in the hero turns browsers into leads because the deadline is not negotiable — and you own the practical-not-fearmongering angle ("amnesty before audit").
- Fix: Add a small dated banner or hero eyebrow: "EU AI Act enforcement: August 2026 — 15 weeks to amnesty." Keep the existing sector-benchmark headline, but add a second hero CTA variant: `/contact?subject=AI+Act+readiness` next to the existing two. Test it.
- Effort: minutes (copy) + hours (dynamic countdown if desired)

### CRO-P0-4: "Let's Talk" repeats 3× with no offer differentiation
- File: `src/components/Navigation.astro:13` ("Let's Talk" → `/contact`), `src/components/FinalCTA.astro:8` (heading "Let's Have a Conversation") + `:17` (button "Let's Talk" → `/contact`), `src/components/StickyBookCTA.astro:7-25` ("Book a call" → `/contact?subject=Book+a+call`).
- Impact: Three of your top-most-clicked surfaces all route to the same generic contact form. The visitor who scrolled past the hero to reach the sticky has demonstrated higher intent than the nav clicker — but you treat them identically. You also lose the chance to A/B "book a call" vs "take the audit" vs "get a quote" — the only varied CTA today is the Hero's "Take the 3-minute audit" (good) vs "book a 20-min call" (Hero.astro:31-36).
- Fix: Differentiate by intent: Nav stays "Let's Talk" (top-of-funnel). FinalCTA becomes "Book a 20-min call — no pitch" (matches Hero secondary copy). Sticky becomes "Get a quote in 24 hrs" with `?subject=Quote+request`. Each should prefill `subject=` so you can see in Formspree which surface converted. Currently Nav + FinalCTA contribute zero attribution because neither sets a subject param.
- Effort: minutes

### CRO-P0-5: Quiz completion does not transfer the lead into a contact-form record — soft handoff only
- File: `src/components/AIReadinessQuiz.jsx:867-899` (results-screen "Book a Free 30-Minute Call" is a plain `<a>` to `/contact?subject=AI Readiness Assessment - Book a Call`) and `:925-931` (sent screen, same anchor).
- Impact: A user who completed an 18-question quiz, gave name + work email + company + sector + size, has identified themselves as a high-intent lead. After clicking "Book a Call" they land on a contact form with empty `name`, empty `email`, empty `message` — they have to retype everything they just gave. Drop-off here is the easiest large lead leak to plug. The Formspree-side ticket already exists (quiz submits to a separate Formspree endpoint `mwvrgqgb`), but a hot lead clicking through is treated like a cold visitor.
- Fix: After quiz submit, store `lead.name / email / company` in `sessionStorage`; on contact page, hydrate the form fields if present. Set the message body prefill with their tier + score + priority gap ("I scored 47% — Awakening tier — priority gap: Governance. I'd like to talk through what to do."). Add a `utm_source=quiz` to the link so Plausible (once installed) can attribute the conversion.
- Effort: hours

---

## P1 — fix soon

### CRO-P1-1: Sticky CTA copy is generic, not promise-shaped
- File: `src/components/StickyBookCTA.astro:7,24` (calendar icon + "Book a call").
- Impact: Higher-intent surface (post-400px scroll) deserves a higher-promise CTA. "Book a call" reads as commitment; "See if we're a fit — 20 min" reads as low-risk and probably converts better. Calendar icon also implies "you're about to be asked to pick a time slot", which is a known friction trigger.
- Fix: Replace with "Have a 20-min chat — no pitch" or "Get a quote in 24 hrs". Swap the calendar icon for a chat bubble.
- Effort: minutes

### CRO-P1-2: Hero secondary CTA copy is weak ("or book a 20-min call")
- File: `src/components/Hero.astro:31-36`.
- Impact: Starting a CTA with "or" reads like an afterthought — it tells the user the primary path is the intended one and this is the consolation. For a fee-based consultancy, the call IS the conversion. Equal-weight the two, or invert the prominence on a test.
- Fix: Remove "or". CTA reads "Book a 20-min scoping call". Consider running a 50/50 split with quiz-primary vs call-primary once Plausible is in.
- Effort: minutes

### CRO-P1-3: EngagementModels CTAs all point to one form — no per-tier qualifying question
- File: `src/components/EngagementModels.astro:9-47` (4 cards, each `/contact?subject=Briefing|Workshop|Pairing|Build`).
- Impact: Subject-prefill is good. But a €12,000 Build enquiry and a €750 Briefing enquiry need different qualifying info. The Build card is essentially asking the user to write a free-text brief in the contact-form message box. You're losing scope data that would let you reply faster (= higher reply-rate = higher conversion).
- Fix: For the Build tier (highest LTV), add 1–2 prefilled questions in the textarea placeholder: "What's the team size, the rough problem you'd like solved, and your target timeline?" Or — better — give Build its own short page (`/scope-a-build`) with 4–5 fields. Keep Briefing/Workshop/Pairing pointing at the unified form.
- Effort: hours

### CRO-P1-4: No exit-intent or scroll-depth secondary capture
- File: site-wide; nearest equivalent is `StickyBookCTA.astro:39` `SHOW_AFTER_PX = 400`.
- Impact: The only "I'm leaving" capture mechanism is the sticky, which fires on scroll-down, not on cursor-exit. Visitors who scroll the full page, don't click, and leave the tab are completely lost. An exit-intent modal offering the toolkit (already produced — `/toolkit/ai-ready-business-toolkit.pdf`) is a low-cost second-bite that you've already paid the asset cost for.
- Fix: Add a single, dismissible exit-intent modal: "Leaving? Take the toolkit — practical AI templates for Irish SMEs. One email." 1 field (email). On submit, fire to the same `send-toolkit` Cloud Function the quiz uses (`AIReadinessQuiz.jsx:645`). Suppress on `/contact` and after dismissal (cookie).
- Effort: hours

### CRO-P1-5: Contact form hides phone field behind a checkbox — buries the lowest-friction channel
- File: `src/pages/contact.astro:65-81`.
- Impact: For an Irish SME owner, a phone number is often the preferred channel and the highest-intent signal. Hiding it behind "I'd prefer a phone call" requires them to opt into a slightly awkward framing. Optional fields belong, but the framing is wrong: phone should be presented as an explicit optional channel, not a workflow flag.
- Fix: Replace the checkbox + hidden wrap with an always-visible "Phone (optional, if you'd prefer we call)" field. No checkbox. Phone in your inbox = caller; phone empty = emailer. Same data, less friction.
- Effort: minutes

### CRO-P1-6: Toolkit thank-you page has no second micro-conversion — dead end after download
- File: `src/pages/toolkit.astro:38-47`.
- Impact: After download, the only next step is "Book a Free 30-Minute Call" — the same hard ask the quiz already presented. A visitor who took the soft action (download) is unlikely to immediately take the hard action (call). You need a middle rung: newsletter, calendar reminder for the AI Act deadline, follow-up case study.
- Fix: Add between line 36 and 38 a one-field newsletter signup: "Want a monthly note when we publish a new case study? One email a month." This is the missing middle rung in the micro-conversion ladder (toolkit → newsletter → call).
- Effort: hours

### CRO-P1-7: No conversion microcopy on the submit button — "Start the conversation" lacks expectancy
- File: `src/pages/contact.astro:91`.
- Impact: The button copy is on-brand ("conversation") but doesn't set expectations the way the line below it does ("One human reply, usually within 24 hours"). Top copy + button-side copy + sub-copy should all reinforce the same promise. Right now the button itself is the weakest link.
- Fix: Either move the sub-copy promise into the button area as a small inline note ("→ Reply within 24 hrs") or change button copy to "Send — we reply within 24 hrs". Test against current.
- Effort: minutes

### CRO-P1-8: AI Readiness lead-capture form requires 5 fields up-front — heavy for cold traffic
- File: `src/components/AIReadinessQuiz.jsx:422-429,452-519` (name + email + company + sector + size, all required, before the 18 questions even start).
- Impact: 5 required fields before any value is delivered is high friction. Hero promises "3-minute audit"; this screen says "give us 5 fields, then 18 questions." The drop-off here will dwarf the actual quiz drop-off. The quiz is currently lead-gating its own engagement loop.
- Fix: Cut to 2 required upfront (name + email). Ask sector + size after Q4 or Q5, once the user has invested. Make `company` optional. This is the highest-traffic conversion event on the site after the contact form.
- Effort: hours

---

## P2 — worth doing

### CRO-P2-1: Hero stat-card on right shows "Q 3 / 18" — implies the assessment is longer than promised
- File: `src/components/Hero.astro:43-46` ("3 MIN · INSTANT RESULT") vs `:46` ("Q 3 / 18").
- Impact: Hero subhead promises 3 minutes; the preview card shows you're on question 3 of 18 — math reads as ~10s/question = doable, but the "18" number is the friction prompt before the user even starts. Cognitive load.
- Fix: Replace "Q 3 / 18" with "Q 3 — 2 min left" to keep the time-promise visible. Or drop the count entirely — show progress bar only.
- Effort: minutes

### CRO-P2-2: FinalCTA secondary "Not ready to talk yet?" frames the assessment as a downgrade
- File: `src/components/FinalCTA.astro:24-34`.
- Impact: The wording "Not ready to talk yet?" implies the call is the real path and the assessment is for the timid. For lead-quality, this is upside-down: the quiz is your highest-intent qualification tool (5 fields + 18 answers + score). Frame it as the smart first step, not the fallback.
- Fix: Replace the "Not ready to talk yet?" framing with "Want a benchmark first? Take the 3-minute audit." Removes the implicit downgrade.
- Effort: minutes

### CRO-P2-3: Subject param in `/contact?subject=` loses context if the user navigates away
- File: `src/pages/contact.astro:104-111` (script reads `?subject=` on load, sets hidden field).
- Impact: If a user clicks "Book a workshop" from EngagementModels (`?subject=Workshop`), reads the page, then clicks the Nav "Let's Talk" link to start over — the subject is lost (Nav links to `/contact` plain). All Nav/FinalCTA submissions show as "General enquiry" in Formspree, masking the actual conversion source.
- Fix: Cache the subject in sessionStorage if present, then hydrate on contact-page load if URL has no subject param. Tag Nav link with `?subject=Nav` and FinalCTA with `?subject=FinalCTA` so attribution works in Formspree even without analytics.
- Effort: hours

### CRO-P2-4: No tracking of partial form abandonment
- File: `src/pages/contact.astro:16-98`.
- Impact: Even with Plausible installed, a `<form>` Submit event won't tell you whether users typed into Name and bailed at Message, or vice versa. The optional phone-tickbox UI in particular is a candidate for abandonment.
- Fix: After Plausible is live (CRO-P0-1), add a `blur` listener on each field that fires `plausible('Form Field Filled', {props: {field: 'email'}})`. Two-week sample tells you where the form bleeds.
- Effort: hours

### CRO-P2-5: PainPoints section misses the chance to anchor objection-handling to a CTA
- File: `src/components/PainPoints.astro:30-39`.
- Impact: The three pain cards name the right objections ("Where do we start?", "No time to experiment", "Compliance and risk?") — but each card is a static prose block. Each one could ladder directly into the matching CTA: "Where do we start?" → "Take the 3-min audit"; "Compliance and risk?" → "Read the AI Act briefing"; "No time to experiment?" → "Book a 20-min scoping call".
- Fix: Add a small inline link/button at the bottom of each pain card. Three matched micro-CTAs is better conversion architecture than one final mega-CTA.
- Effort: hours

### CRO-P2-6: Engagement card "Workshop" featured tag says "MOST BOOKED" — unverifiable claim, no analytics to back it up
- File: `src/components/EngagementModels.astro:23-24,68-70`.
- Impact: With zero analytics, "MOST BOOKED" cannot be true in the directional sense, and if it's unverifiable it's a small trust nick for a CRO-savvy buyer. Brand voice says "Honest"; this label leans marketing-puff.
- Fix: Once analytics + Formspree subject-tagging are in (CRO-P0-1 + P0-4), revisit whether the claim is true and update or replace with "Best for first-time AI work" or "Best value" — verifiable framing.
- Effort: minutes (once data exists)

---

## Agent notes

**Files inspected:**
- `src/pages/contact.astro` (full)
- `src/components/Hero.astro` (full)
- `src/components/Navigation.astro` (full)
- `src/components/EngagementModels.astro` (full)
- `src/components/FinalCTA.astro` (full)
- `src/components/StickyBookCTA.astro` (full)
- `src/components/PainPoints.astro` (full)
- `src/components/AIReadinessQuiz.jsx` (lead-screen, results-screen, sent-screen sections — lines 350-980; not the quiz internals)
- `src/pages/ai-readiness.astro` (full)
- `src/pages/toolkit.astro` (full)
- `src/pages/index.astro` (full)
- `src/layouts/Layout.astro` (full)
- Site-wide grep: analytics tags, testimonials, social proof, CTA strings, "subject=" prefill usage.

**What I deliberately didn't review (and why):**
- `src/pages/audit.astro` — per BRIEF, this is documentation of a prior audit. Read once to verify which CRO issues are unresolved regressions (Plausible/analytics confirmed still unfixed at audit.astro:487, :851, :958-959).
- `src/pages/v2-a.astro` / `v2-b.astro` / `v2-c.astro` and `src/components/v2/` — per BRIEF, orphan experiments. Not in scope.
- `src/components/Compliance.astro`, `About.astro`, `HowItWorks.astro` — read names only; content lens (brand/copy) owns these. Cross-checked AI-Act surfacing for P0-3.
- Quiz internals (`AIReadinessQuiz.jsx:1-350`, computeScores, dimension logic) — UX/product lens.
- `precedent-demo.astro`, `threshold-sar-demo.astro`, `solutions.astro`, `brand-showcase.astro` — not in the visitor → contact-form funnel for the named target audience.
- Live site — per BRIEF, codebase is source of truth.
