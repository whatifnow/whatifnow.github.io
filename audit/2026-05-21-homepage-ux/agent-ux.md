# Homepage UX/IA review — Róisín · 2026-05-21

**Score** (out of 100, grade A+..F): 61 / 100 — C
**Layout-arc verdict** (one sentence — does the current arc work?): The pain-to-proof arc is structurally correct but is derailed by four consecutive card grids in the first half and a narrative stall between Compliance and About that buries the trust moment until position 5.

---

## Top observations (max 8, ranked by impact)

### 1. Four card grids in a row collapse the page into visual monotony
- What's happening now: FeaturePills (4 cards), PainPoints (3 cards), Compliance (4 cards), and EngagementModels (4 cards) are all grid-of-cards layouts — three of them appear before any visual break.
- Why it hurts qualified leads: A time-poor operations lead scanning on mobile reads "grid, grid, grid" and loses the narrative thread; the offer lands in the same register as the trust pills, so nothing signals hierarchy.
- Recommended change: Introduce a pattern interrupt between PainPoints and Compliance — the About section (currently position 5) is the natural break because it is a full-bleed, portrait-driven two-column layout on a dark background. Pull About above Compliance so the human moment arrives before the capability catalogue.

### 2. About is doing the hardest trust job from the worst position (position 5)
- What's happening now: The two named founders with photos appear after Hero, FeaturePills, PainPoints, Compliance, and the full pricing grid — well into the second half of the scroll.
- Why it hurts qualified leads: Positioning.md §6 names "who is this?" as layer one of the trust stack; the current order answers that question only after price has been quoted, reversing the emotional sequence a B2B consultancy sale requires.
- Recommended change: Move About to position 3 (immediately after PainPoints, before Compliance), making the sequence: pain recognised → humans who understand it → capabilities they bring → proof of build → how to engage.

### 3. ProductProof (position 6) is the strongest trust signal and is buried
- What's happening now: The "two products, both shipping" panel with live mock UIs appears at position 6 of 8, well after the pricing grid has already been seen.
- Why it hurts qualified leads: The proof-of-build section (positioning.md §6, layer 2) exists precisely to answer "have they built anything?" — but most mobile visitors will have scrolled past the pricing grid before encountering it, inverting the proof-before-ask sequence.
- Recommended change: Move ProductProof above EngagementModels. The sequence should be: About (who) → ProductProof (what they built) → EngagementModels (how to engage) → FinalCTA (ask). This matches the brief's own proof model order exactly.

### 4. FeaturePills (position 2) fires trust micro-signals before the visitor knows what the service is
- What's happening now: "GDPR-Compliant · EU AI Act Ready · Ireland-Built · SMEs & Charities" appears immediately below the Hero, before any pain articulation or human presence.
- Why it hurts qualified leads: Pills function as validation signals — they reassure someone who is already interested; placed before pain articulation they feel like a compliance badge checklist for a product whose promise hasn't yet been made, creating mild cognitive friction.
- Recommended change: Move FeaturePills below PainPoints (or fold it into the footer of the Hero section as a low-weight strip), so pain lands first and pills confirm "yes, and we handle those concerns" rather than leading with them.

### 5. Compliance (position 4) follows two sections that already mention compliance, creating redundancy
- What's happening now: The third PainPoints card explicitly names "GDPR, the EU AI Act, data governance" as a pain — then FeaturePills signals "GDPR-Compliant · EU AI Act Ready" — and then Compliance expands the same territory with four cards.
- Why it hurts qualified leads: The compliance topic has now been mentioned three times before the visitor reaches a section dedicated to it; rather than building, it creates a sense that the homepage is compliance-fixated, which the positioning brief (§5, §8) explicitly flags as the wrong lead for the emergent-phase buyer.
- Recommended change: Remove the explicit compliance framing from PainPoints card 3 (replace with an operational pain per positioning.md §8), and ensure FeaturePills pills read as trust signals not repeated topic headers. With those two changes the Compliance section lands as depth, not repetition.

### 6. Dead CTA zone between Compliance (position 4) and EngagementModels (position 7)
- What's happening now: Three consecutive sections (Compliance → About → ProductProof) contain no actionable CTA — only the sticky CTA floats in that scroll region.
- Why it hurts qualified leads: A visitor convinced at the About section has no in-page path to act; they must either use the sticky bottom-right button (which competes with FinalCTA per prior finding UX-P1-08) or scroll to EngagementModels.
- Recommended change: Add a single low-friction inline CTA at the base of the About section — one line, not a full CTA block. Something like "Want to talk through your situation? Email info@whatifnow.ie" or a link to /contact?subject=Call. This does not require a new section.

### 7. FinalCTA is a weak echo of Hero, not a closing argument
- What's happening now: FinalCTA leads with "Let's Have a Conversation" and restates the quiz link as the secondary ask — the same two CTAs that appear in Hero.
- Why it hurts qualified leads: A visitor who has scrolled all eight sections is a qualified, warm lead; the closing ask should name a human and make a concrete commitment, not replay the top-of-funnel entry ramp. The brief (§8) names this explicitly: "tighten to a single, human ask that names the human."
- Recommended change: Rewrite the FinalCTA headline to name Lar or Paul directly ("Email Lar — he reads everything in this inbox") and remove the quiz secondary CTA from the bottom of the page; by this point in the journey the quiz is a demotion, not a help.

### 8. Nav anchors /#about and /#compliance are now positionally misleading
- What's happening now: Nav links to /#about and /#compliance resolve to their sections, but the recommended moves in this review would swap their positions — and even in the current order, /#compliance sits above /#about in the page but appears after it in the nav list.
- Why it hurts qualified leads: A visitor using the nav expects "About" to be the human story and "Compliance" to be technical depth; today the nav order implies About comes before Compliance in the page (it doesn't — Compliance is at position 4, About at position 5), causing mild orientation confusion.
- Recommended change: If About moves above Compliance (observation 2 above), the nav order becomes correct. If the section order is not changed, swap the nav items so /#compliance appears before /#about, matching the actual scroll order. Either fix closes the mismatch.

---

## Specific section moves to test

- Move About above Compliance (from position 5 to position 3): the named-human trust moment must arrive before the capability catalogue — this is the single highest-leverage structural change.
- Move ProductProof above EngagementModels (keep at position 5, after About): proof of build should precede the offer, not follow it.
- Move FeaturePills below PainPoints (from position 2 to position 4, after PainPoints and before Compliance): pills validate an already-interested visitor; firing them before pain articulation reverses their function.
- Do not move or merge PainPoints — it is correctly placed as the first narrative beat after the Hero.
- Do not extract Compliance from the homepage: the positioning brief (§7) already ruled this out for now; keep as a section but ensure it does not read as the lead capability.
- Consider merging FinalCTA with a light "email the founders" strip rather than maintaining a standalone section: the section is currently 6 lines and adds no new information after EngagementModels.

---

## Out of scope (noted but not flagged)

- All copy-level issues (pain card wording, compliance heading tone, FinalCTA verb choices) — the brief says content is fine; tone/word-level problems belong to the Copy lens.
- Hero copy and CTA colour hierarchy — live findings in prior audit items CO-P0-01 and Brand-P0-01; not a layout issue.
- Accessibility failures (AX-02, AX-03, AX-05, AX-09, etc.) — WCAG 2.2 AA is the floor but the brief scoped this review to layout/IA/narrative only.
- StickyBookCTA competing with FinalCTA (UX-P1-08, prior audit) — flagged already; not re-opened here.
- Anchor scroll offset missing (UX-P0-01, UX-P1-03) — existing backlog item, not a layout-arc concern.
- /solutions page positioning mismatch (UX-P1-02) — out of scope; this review covers the homepage only.
- Demo pages without nav/footer (UX-P0-05) — not homepage.
