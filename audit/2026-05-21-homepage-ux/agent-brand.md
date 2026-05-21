# Homepage brand/visual review — Órla · 2026-05-21

**Score** (out of 100, grade A+..F): 63 / C+
**Visual-hierarchy verdict** (one sentence — does the page have rhythm?): The page has solid typographic anchors but the background-colour sequence is relentlessly dark, producing a monolithic navy column that erases sectional rhythm before the one off-white break at EngagementModels.

---

## Top observations (max 8, ranked by impact)

### 1. Dark-section fatigue — six of eight sections share the same navy canvas
- **What's happening now:** Hero, FeaturePills, About, ProductProof, FinalCTA, and Footer all render on `bg-navy` (or the near-identical `bg-navy-light`). The sole off-white sections — PainPoints, Compliance, and EngagementModels — are clustered back-to-back in the middle of the page, rather than distributed to break the scroll.
- **Why it weakens the homepage:** Visitors reading downward lose all sense of pace. Navy becomes the default "everything", stripping teal and amber of their contrast function. The 60/25/15 rhythm from the brand spec assumes navy is the primary field, not the total canvas.
- **Recommended change:** Pull EngagementModels back onto a navy background (contrast against the Compliance/PainPoints off-white block), and switch either About or ProductProof to `bg-off-white` with dark text. The sequence should read: dark → light → dark → light → dark → light → dark. One alternation per two sections minimum.

---

### 2. Amber is a single-point CTA spark — it has no presence in-content
- **What's happening now:** `--color-amber: #E8913A` appears in only three places — the nav "Let's Talk" pill, the FinalCTA button, and the StickyBookCTA. Amber is absent from section bodies, pull-quotes, pricing highlights, and founder names (where it does appear: `text-amber` on founder names in About — but this is the only in-content use of amber and it reads ambiguous rather than deliberate).
- **Why it weakens the homepage:** The 60/25/15 rule from the brand-showcase spec lists amber as the 15% "deliberate spark" — meant to draw attention to moments of significance. Used only on CTAs, it conflates conversion intent with any other highlighted element. The one in-content use (founder name colour) feels arbitrary without an established amber-for-names pattern.
- **Recommended change:** Add amber as a semantic accent at one more in-content moment per section — e.g., the "from €750" price floors in EngagementModels (currently `font-serif text-navy`/`text-white`) and the "MOST BOOKED" pill (currently `bg-teal text-navy`). Move "MOST BOOKED" to `bg-amber text-charcoal` — this is exactly the Von Restorff isolation the spec describes.

---

### 3. PainPoints and Compliance are visually identical card grids — zero pattern break
- **What's happening now:** PainPoints renders three `bg-white p-8 rounded-2xl` cards on `bg-off-white`. Compliance renders four `bg-white p-8 rounded-2xl` cards on `bg-off-white`. Same rounding, same padding, same shadow-on-hover, same icon-plus-copy layout. They immediately follow each other in the section order.
- **Why it weakens the homepage:** Back-to-back identical grid patterns signal "more of the same". The visitor's eye stops scanning. FeaturePills and EngagementModels add a third and fourth grid variant, compounding the monotony.
- **Recommended change:** Differentiate PainPoints structurally — drop the card grid entirely and use a large-type pull-quote row: the three pain statements rendered as blockquotes with a left teal border, on `bg-navy` background (reversing the colour field from Compliance). This breaks the grid cadence and plays to the conversational, first-person voice already in the copy.

---

### 4. EngagementModels "MOST BOOKED" badge uses teal — duplicates the icon accent colour
- **What's happening now:** The Workshop card's badge is `bg-teal text-navy`. Every section icon accent throughout the page is also `text-teal`. This makes the most important conversion differentiator — the featured card callout — indistinguishable in emphasis from any decorative icon.
- **Why it weakens the homepage:** The badge should be the highest-contrast element on the card. Using teal (already ubiquitous) collapses the hierarchy.
- **Recommended change:** Switch to `bg-amber text-charcoal` per the amber-as-CTA convention. This is the one place on the page where amber-in-content is unambiguously correct — it signals "recommended path", matching the nav/StickyBookCTA amber CTA cluster.

---

### 5. About section portrait circles are 176–208px — visually heavier than the ProductProof panels
- **What's happening now:** Two `w-44 h-44 md:w-52 md:h-52` (176px / 208px) portrait circles sit on a dark navy background with `border-2 border-teal/30`. The section that follows (ProductProof) carries two equally-tall product panels. The visual weight of the portrait block — four bullet bios per founder, plus five bullet items for Lar — makes About the heaviest section on the page.
- **Why it weakens the homepage:** About's weight comes before ProductProof, which is the page's actual proof of capability. The authority signal (who we are) should subordinate to the proof signal (what we've built), but the layout reverses this.
- **Recommended change:** Reduce portrait circles to `w-32 h-32` (128px) and move the multi-bullet bios to a collapsed `<details>` pattern or cut to two bullets each. Let ProductProof be the visually dominant section. Alternatively, swap the section order: ProductProof before About, so proof leads and human context follows.

---

### 6. FinalCTA background is `bg-off-white` — breaks with every other terminal section pattern and creates a weak close
- **What's happening now:** FinalCTA renders on `bg-off-white` with `text-navy`. It follows ProductProof (`bg-navy`). The amber CTA button (`bg-amber text-charcoal`) floats on a pale field, reducing contrast versus placing it on navy.
- **Why it weakens the homepage:** Closing an otherwise dark-primary page on off-white deflates the finish. The highest-contrast amber lands better on navy — this is the precise pairing the brand-showcase Navigator direction illustrates. The pale close also means the footer (`bg-navy border-t border-navy-light`) immediately follows, creating a light-then-dark snap that reads as a layout accident.
- **Recommended change:** Switch FinalCTA to `bg-navy` with white headline text. Keep `bg-amber text-charcoal` for the primary CTA — it has far more pop against navy. The `bg-navy` footer then reads as a seamless continuation of the close, not a colour reversal.

---

### 7. Navigation wordmark uses Inter, body uses DM Sans for UI elements — third variant slips in on the About eyebrow
- **What's happening now:** The nav wordmark (`font-bold tracking-tight`, no explicit font-family class) inherits `font-sans` (Inter Variable). All `font-ui` elements use DM Sans. About's eyebrow label (`font-ui font-bold text-xs tracking-widest uppercase`) correctly uses DM Sans. However, EngagementModels duration labels (`text-xs font-ui tracking-wider uppercase`) also use DM Sans — correct. The inconsistency is that some section eyebrows use `font-ui` and others omit it entirely, defaulting to Inter. PainPoints and Compliance section headings lack an eyebrow label at all, missing the label rhythm the brand-showcase spec specifies for sectional organisation.
- **Why it weakens the homepage:** Missing eyebrow labels on PainPoints and Compliance mean the visitor has no quick-scan anchors for those sections. The spec's "Labels — DM Sans 500" pattern is applied selectively, making the hierarchy feel ad hoc.
- **Recommended change:** Add `<span>` eyebrow labels to PainPoints ("What we hear") and Compliance ("How we work") matching the `font-ui font-bold text-xs tracking-widest uppercase text-teal` pattern used consistently in About, ProductProof, and EngagementModels.

---

### 8. Mobile: six consecutive dark sections produce an undifferentiated scroll at 375px
- **What's happening now:** At mobile width, FeaturePills (navy), then PainPoints (off-white cards), then Compliance (off-white cards), then About (navy), then ProductProof (navy), then EngagementModels (off-white) stacks. The two off-white card sections are adjacent — identical at narrow width. The three dark sections above and below offer no landmark.
- **Why it weakens the homepage:** Mobile users cannot perceive sectional rhythm. The fixed nav is navy/90 — it dissolves into the navy sections without a distinguishing border. The only visible section transitions are off-white-to-off-white (PainPoints → Compliance) and navy-to-navy (About → ProductProof).
- **Recommended change:** Apply the background alternation fix from Observation 1 — this resolves both desktop and mobile simultaneously. Additionally, thicken the nav border: `border-b border-teal/30` instead of `border-navy-light` to provide a visual seam between the fixed bar and the navy sections beneath it.

---

## Specific layout/visual moves to test

- FinalCTA: switch from `bg-off-white` to `bg-navy`; headline becomes `text-white`; existing `bg-amber text-charcoal` CTA button gains maximum contrast
- EngagementModels "MOST BOOKED" badge: `bg-teal text-navy` → `bg-amber text-charcoal`
- About: reduce portrait circles `w-44 md:w-52` → `w-32 md:w-36`; trim bios to two bullets each; section remains navy
- ProductProof: switch from `bg-navy` to `bg-off-white`; move to position before About in `index.astro` (proof before faces)
- PainPoints: drop white card grid; render three pain statements as large-type teal-bordered blockquotes on `bg-navy` background
- Navigation: widen bottom border to `border-teal/30` for legibility against navy sections
- Add eyebrow labels (`font-ui font-bold text-xs tracking-widest uppercase text-teal`) to PainPoints and Compliance headings
- EngagementModels price floors (`from €750` etc): apply `text-amber` on the featured card and `text-amber` on the price in the non-featured cards to make amber's in-content role meaningful

---

## Out of scope (noted but not flagged)

- Copy review, voice, or tone accuracy — reviewed by a separate agent
- Held-Square brand bleed: the `#e8554a` coral and `#1a2744` navy in ProductProof's righttostay mock are correctly contained inside the product card frame with explicit inline hex values; no bleed detected outside that frame
- Accessibility colour contrast ratios — not the focus of this review lens
- Animation behaviour (`@keyframes fadeInUp` on every `section`) — a UX concern, not a brand-token concern
- Footer content completeness (Substack retirement, LinkedIn personal vs company) — flagged in `brand/positioning.md` §7 and tracked separately
- The `/brand-showcase.astro` page itself, which references Google Fonts in violation of the ePrivacy principle stated in `global.css` — out of scope for this homepage review
