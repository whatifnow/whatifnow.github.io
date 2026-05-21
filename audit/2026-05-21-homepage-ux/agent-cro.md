# Homepage CRO review — Ciara · 2026-05-21

**Score** (out of 100, grade A+..F): 61 / C
**Conversion-choreography verdict** (one sentence): The proof-then-price sequencing is now correct and the StickyBookCTA is disciplined, but two dead zones and a structurally weak FinalCTA mean the page loses momentum exactly when a convinced visitor is ready to act.

---

## Top observations (max 8, ranked by impact)

### 1. Hero routes high-intent visitors away from /contact
- What's happening now: "Take the 3-minute audit" is the primary CTA (teal, dominant), routing to `/ai-readiness`; "or book a 20-min call" is a secondary ghost border with a lowercase "or" (`Hero.astro:27–33`).
- Why it costs qualified leads: a visitor who already knows they want help skips the quiz and hits the secondary CTA — which is visually and grammatically demoted. The path to `/contact` starts at a disadvantage from the first scroll position.
- Recommended change: swap hierarchy — make "Book a 20-min call" the primary amber button and demote the quiz to a ghost link labelled "Not sure yet? Take the 3-minute audit." This is the existing brief's intent (positioning.md §8 Hero) and aligns with the prior CRO finding CRO-P0-4 being only partially resolved.

### 2. Dead zone: PainPoints has no CTA of any kind
- What's happening now: PainPoints renders three pain cards with no link, no micro-CTA, and no forward hook (`PainPoints.astro:30–39`). It sits at scroll position 3, immediately after FeaturePills (also passive).
- Why it costs qualified leads: a visitor who recognises their pain at position 3 has nowhere to go. Two consecutive passive sections before Compliance means the first 30–40% of scroll depth converts nothing — a visitor who is already sold leaves no trace.
- Recommended change: add a single low-friction micro-CTA beneath the three cards, e.g. "Sound like your team? → Book a 20-min call" linking to `/contact?subject=Scoping+call`. One line, no box, no button weight heavier than a text link.

### 3. Compliance is a proof section positioned as a feature section — and has no CTA
- What's happening now: Compliance sits at position 4, between PainPoints and About, with no CTA (`Compliance.astro:30–50`). It reads as a capability list, not a trust signal and not a conversion moment.
- Why it costs qualified leads: this is the third consecutive passive section (FeaturePills → PainPoints → Compliance). The visitor who cares about GDPR/NIS2 sees the right content but has no path forward — they must scroll further before any CTA appears.
- Recommended change: add a single inline CTA at the base of Compliance — "Compliance is on our checklist. See how we scope it. → /contact?subject=Compliance" — or extract this section to /compliance (per prior UX P2-01 recommendation, now lower priority per positioning.md §7) and add a "Read more" link that at minimum breaks the passive run.

### 4. ProductProof CTAs route to an orphaned demo, not to /contact
- What's happening now: Stare panel's primary CTA is "Try the demo" → `/precedent-demo`, which the prior audit (UX P0-05) flagged as a bare React shell with no nav, footer, or back-link (`ProductProof.astro:119–123`).
- Why it costs qualified leads: a visitor who clicks the Stare demo enters a dead end — no path back to the homepage, no path to `/contact`. ProductProof is the last proof beat before EngagementModels; it should be building toward conversion, not routing visitors into a cul-de-sac.
- Recommended change: either (a) add a `/contact?subject=Stare+demo` CTA alongside "Try the demo", or (b) promote "How we built it → /solutions" to primary and demote the orphaned demo to secondary until the demo shell has proper nav/footer. Do not remove the demo link — but it cannot be the primary forward path.

### 5. FinalCTA is a structural echo with no new offer
- What's happening now: FinalCTA (`FinalCTA.astro:1–36`) leads with "Let's Have a Conversation", a generic para ("No pitch, no pressure"), and a teal-amber "Let's Talk" button. Below it a secondary navy block reads "Not ready to talk yet? Take the Free AI Readiness Assessment."
- Why it costs qualified leads: three problems compound. First, "Let's Have a Conversation" is a weaker restatement of what every prior CTA already said. Second, "Not ready to talk yet?" frames the quiz — the lower-friction offer — as a consolation, which is the right instinct for a visitor who got this far but the wrong copy (prior finding CRO-P2-2). Third, the section adds nothing new: no named human, no reply-time commitment with teeth, no specific offer differentiated from the EngagementModels CTAs 400px above.
- Recommended change: per positioning.md §8 FinalCTA ("Email Lar — he reads everything in this inbox"), replace the generic headline and para with a single named-human ask. Add the reply commitment here (not as footnote). Remove the secondary quiz block entirely — a visitor who scrolled to the bottom of the page is not a quiz lead; they are a contact lead.

### 6. StickyBookCTA suppresses correctly but its copy is generic
- What's happening now: StickyBookCTA hides when FinalCTA is in view, surfaces after 400px scroll, and routes to `/contact?subject=Book+a+call` (`StickyBookCTA.astro:6–7, 39`). The label is "Book a call."
- Why it costs qualified leads: "Book a call" is lower-specificity than any of the four EngagementModels CTAs. A visitor mid-scroll through the proof sections who clicks sticky sees a generic form with a prefilled subject that says "Book a call" — no context, no anchoring to the format they were reading about.
- Recommended change: update copy to "Book a 20-min scoping call" to match the hero's secondary CTA language and set visitor expectation. This is a one-word change that aligns all three /contact entry points (hero secondary, sticky, FinalCTA primary) on the same ask.

### 7. EngagementModels position is correct — but the section-to-section transition is abrupt
- What's happening now: ProductProof ends (navy background) and EngagementModels begins (off-white background) with no bridging element (`index.astro:24–25`). A visitor who has just processed two product panels is dropped immediately into price cards.
- Why it costs qualified leads: proof → price with no transition is abrupt for a visitor who hasn't fully processed the capability signal. The positioning.md §6 proof model explicitly positions ProductProof as "Layer 2 — What have they actually built?" and §7 notes EngagementModels needs no copy change — but the jump from product proof to pricing without a single bridging sentence means the price grid arrives before the capability signal has landed emotionally.
- Recommended change: add a one-line section heading transition between ProductProof and EngagementModels — something like an eyebrow on EngagementModels that reads "Want this for your team?" rather than jumping straight to "Pick the engagement that fits." This costs zero layout work; it's a copy addition to EngagementModels' heading block.

### 8. Friction tier ladder is partially built but the middle rung is missing
- What's happening now: the ladder the brief assumes (assessment → scoping call → engagement booking) maps to: quiz → /contact → EngagementModels CTA. But there is no explicit on-page mechanism that walks a quiz completer back to /contact pre-filled (prior finding CRO-P0-5: "quiz completion doesn't hydrate contact form"). A visitor who takes the quiz and gets a result is not channelled forward.
- Why it costs qualified leads: the quiz is the highest-volume mid-funnel touchpoint, positioned in the hero as the primary CTA. If quiz completers exit without contacting, the highest-traffic CTA becomes a dead end. The ladder breaks at its second rung.
- Recommended change: on the quiz result screen, surface a single pre-filled CTA: "Your score is X — book a 20-min call to talk through it → /contact?subject=AI+Readiness+Result". This is the CRO-P0-5 fix from the prior audit, still open. It is the highest-leverage conversion move remaining on the site.

---

## Specific moves to test

- Promote "Book a 20-min call" to amber primary in the hero; demote "Take the 3-minute audit" to ghost secondary — removes the CTA hierarchy inversion at first scroll.
- Add a single text-link micro-CTA beneath PainPoints cards ("Sound familiar? Book a 20-min call →") — closes the longest dead zone (positions 2–5 with no conversion opportunity).
- Add one sentence at the base of Compliance that links to /contact?subject=Compliance — breaks the three-section passive run without requiring a new section.
- Rewrite FinalCTA headline from "Let's Have a Conversation" to a named-human ask ("Email Lar — he reads everything") and remove the secondary quiz block — the quiz consolation is wrong register for a visitor who reached the page bottom.
- Change StickyBookCTA label from "Book a call" to "Book a 20-min scoping call" — aligns all /contact entry points on the same named offer.
- Add a one-line eyebrow on EngagementModels ("Want this for your team?") to bridge the ProductProof → pricing transition — costs no layout work.
- Fix quiz result screen to surface a pre-filled /contact CTA (CRO-P0-5, still open from prior audit) — closes the broken middle rung of the friction ladder.

---

## Out of scope

- Analytics instrumentation (CRO-P0-1 is parked per prior audit; not flagged here).
- Named-human photo/bio (founder photos in progress, tracked in prior audit item 1; CRO lens does not re-open it).
- "MOST BOOKED" badge on Workshop card (prior finding CRO-P2-6 / Trust TR-12; noted in prior audit as resolved via separate PR; not re-examined here).
- /solutions, /ai-readiness, /contact page copy (this review is homepage-only per the brief).
- A11y and legal compliance of the quiz (out of lens scope).
