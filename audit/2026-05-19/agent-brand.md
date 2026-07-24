# Brand & Visual Consistency audit — Órla (specialist:brand)

**Score:** 67 / 100 (grade C+)
**Success-metric link:** Inconsistent button colours, a misfiring primary CTA hierarchy, and hard-coded palette leakage erode the visual trust signal that converts a first-time SME visitor into a contact-form lead.

---

## P0 — fix now

### P0-01: Hero primary CTA is teal, not amber — CTA hierarchy inverted

- File: `/tmp/whatifnow.github.io/src/components/Hero.astro:27`
- Impact: The brand spec (Direction A, confirmed by brand-showcase) designates amber as the primary action colour and teal as secondary. On the homepage hero — the highest-converting surface on the site — the "Take the 3-minute audit" CTA is `bg-teal`, while the soft secondary "book a call" CTA is an outlined ghost. This is backwards. The amber CTA is the Von Restorff isolator that drives contact-form leads; using teal here means the warm accent's attention premium is wasted on a secondary action. The brand-showcase explicitly shows amber for "Book a Discovery Call" as the primary button.
- Fix: Swap "Take the 3-minute audit" to `bg-amber text-charcoal` (matching Navigation and FinalCTA). Make the secondary CTA the ghost outline. Confirm copy hierarchy matches new visual hierarchy.
- Effort: 15 minutes

### P0-02: Contact form submit button uses `rounded-xl` and deviates from amber token

- File: `/tmp/whatifnow.github.io/src/pages/contact.astro:89`
- Impact: The submit button on the contact form — the literal lead-capture trigger — uses `rounded-xl` (not `rounded-full` as every other CTA on the site) and `hover:bg-amber/90` (an opacity shorthand) instead of `hover:bg-amber-dark` (the named token). This produces a visually inconsistent button that breaks the pill-button grammar established everywhere else. A visitor arriving directly at `/contact` sees a different button shape than every other CTA that drove them there. Radius inconsistency on the conversion action undermines trust at the decisive moment.
- Fix: Change `rounded-xl` to `rounded-full`; change `hover:bg-amber/90` to `hover:bg-amber-dark`; change `text-navy` to `text-charcoal` to match the amber CTA spec used in Navigation, FinalCTA, and StickyBookCTA.
- Effort: 10 minutes

### P0-03: Favicon embeds old-palette colours (#0B1A2E, #00B4D8) — brand mismatch on every tab

- File: `/tmp/whatifnow.github.io/public/favicon.svg:2-4`
- Impact: The favicon circle uses `#0B1A2E` (pre-v1.1 navy) and `#00B4D8` (old teal / favicon-legacy colour) directly in the SVG. The v1.1 token system uses `#2A4365` as navy and `#2EC4B6` as teal. Every browser tab, bookmark, and link preview shows the legacy palette. The brand-showcase notes `#00B4D8` as the "Current Teal" being replaced. This is the most pervasive surface — it appears in every session — and it sends the wrong colour signal before the page even loads.
- Fix: Update `favicon.svg` fill to `#2A4365` (navy token) and the "W" text fill to `#2EC4B6` (teal token).
- Effort: 10 minutes

### P0-04: Hard-coded Held-Square coral `#e8554a` bleeds into WIN page (solutions.astro)

- File: `/tmp/whatifnow.github.io/src/pages/solutions.astro:72,75,94`
- Impact: The Held-Square (righttostay) brand coral `#e8554a` appears three times on the WIN solutions page as Tailwind arbitrary values (`bg-[#e8554a]`, `text-[#e8554a]`, `hover:bg-[#d44a40]`). The CLAUDE.md rule is explicit: "righttostay brand is Held-Square, not WIN. Never WIN navy/teal. Drift is a defect." The corollary is also true: Held-Square coral must not bleed into WIN brand surfaces. On a WIN page, the coral creates a palette intruder that undermines the navy/teal/amber system. It also means a visitor sees a colour that has no semantic anchor in the WIN system — it reads as an error, not a deliberate accent.
- Fix: Replace the three arbitrary hex values with a named token. The correct treatment is a border accent using `border-teal` or `border-amber` to distinguish the righttostay card within the WIN palette. If the coral is intentionally signalling the Held-Square sub-brand, add a CSS custom property `--color-rts-coral: #e8554a` to global.css with a comment explaining the deliberate cross-brand usage, then reference it via a Tailwind token rather than bare hex.
- Effort: 30 minutes (token decision) + 15 minutes (implementation)

---

## P1 — fix soon

### P1-01: Navigation CTA has conflicting font-weight classes (font-extrabold + font-medium)

- File: `/tmp/whatifnow.github.io/src/components/Navigation.astro:13,30`
- Impact: Both desktop and mobile "Let's Talk" nav CTAs carry `font-extrabold` and `font-medium` in the same class string. The last class wins in Tailwind, so `font-medium` overrides `font-extrabold` — the button renders at 500 weight, not the intended 800. This makes the most visible CTA on every page lighter than designed. Across the site, equivalent amber CTAs use `font-bold` (700). Inconsistent weight on the primary conversion trigger weakens its visual authority.
- Fix: Remove the redundant `font-medium`; settle on `font-bold` (consistent with FinalCTA and StickyBookCTA).
- Effort: 5 minutes

### P1-02: AIReadinessQuiz.jsx bypasses token system entirely — 30+ inline hex values

- File: `/tmp/whatifnow.github.io/src/components/AIReadinessQuiz.jsx:298,304,310,604,658-660,729,751,756,838,846,854,868`
- Impact: The AI Readiness Quiz is the primary lead-generation funnel (linked from hero CTA, FinalCTA, and navigation). The entire component uses inline `style={{}}` with raw hex strings: `#E8913A`, `#2EC4B6`, `#2A4365`, `#3B5680`. None reference CSS variables or Tailwind tokens. If the palette evolves, this component will silently diverge. Already the gradient `linear-gradient(135deg, #2A4365, #3B5680)` is bespoke and untokenised. The brand-showcase gradient uses `linear-gradient(145deg, #0F2137…)` — a different angle and different navy stop. The component also uses `background: 'linear-gradient(135deg, #2A4365, #3B5680)'` twice for hero sections, creating a gradient treatment not present in any other live component.
- Fix: Extract colours into a `const C = { navy: 'var(--color-navy)', ... }` object referencing CSS custom properties, or pass Tailwind class names where feasible. At minimum, centralise the hex values into a single constants object at the top of the file (a pattern already used in RTBPrecedentDemo.jsx and SARDemo.jsx — extend that pattern here).
- Effort: 2–3 hours

### P1-03: Demo components (RTBPrecedentDemo.jsx, SARDemo.jsx) render old-palette favicon logo inline

- File: `/tmp/whatifnow.github.io/src/components/RTBPrecedentDemo.jsx:17` and `/tmp/whatifnow.github.io/src/components/SARDemo.jsx:17`
- Impact: Both demo components render a faux-browser chrome with an inline WIN logo SVG using `fill="#0B1A2E"` (old navy) and `fill="#00B4D8"` (old teal / favicon-legacy). This is a demonstration surface shown to prospects considering the product — it will be the first thing a potential Stare customer scrutinises. The logo inside a demo should match the current brand, not the pre-v1.1 palette. This is a trust signal at a critical evaluation moment.
- Fix: Update inline SVG fills to `#2A4365` and `#2EC4B6` to match the corrected favicon.
- Effort: 10 minutes

### P1-04: `font-mono` used in production without a registered mono token

- File: `/tmp/whatifnow.github.io/src/components/Hero.astro:45,57`
- Impact: The hero quiz preview card uses `font-mono` for "Q 3 / 18" and the footer metadata strip. The global.css token system defines `--font-family-sans`, `--font-family-serif`, and `--font-family-ui` — but no `--font-family-mono`. Tailwind's `font-mono` will therefore fall back to the browser's default monospace stack (typically Courier New on Windows), not IBM Plex Mono or any designed choice. The brand-showcase shows IBM Plex Mono only in Direction B (Catalyst) — it is not part of the chosen Direction A type system. Using an unregistered mono token in the hero card is both a type-system leak and a rendering gamble.
- Fix: Either (a) remove the `font-mono` usage and replace with `font-ui text-xs tracking-widest` to keep the label feel within the system, or (b) register `--font-family-mono` in global.css with a deliberate stack and load the font. Option (a) is preferred for Direction A coherence.
- Effort: 20 minutes

### P1-05: `HowItWorks.astro` uses Tailwind default `border-slate-200` instead of `border-slate/15` token

- File: `/tmp/whatifnow.github.io/src/components/HowItWorks.astro:49`
- Impact: The audit strip at the bottom of How It Works uses `border border-slate-200` — a raw Tailwind default shade, not the token pattern (`border-slate/15` or `border-slate/20`) used consistently across every other bordered element. `slate-200` is a fixed Tailwind colour; the project's `--color-slate` is `#475569`. These produce different border colours. Minor but a visible inconsistency on an informational component.
- Fix: Replace `border-slate-200` with `border-slate/15` to match the pattern in PainPoints, EngagementModels, and contact.astro.
- Effort: 5 minutes

### P1-06: SVG stroke-width inconsistency across icon sets

- File: `PainPoints.astro:4,9,14` (stroke-width="1.5"), `StickyBookCTA.astro:15` (stroke-width="2.2"), `solutions.astro:27` (stroke-width="2.5"), `solutions.astro:47` (stroke-width="2")
- Impact: Four different SVG stroke weights are in use across production surfaces: 1.5 (PainPoints, Compliance), 2 (solutions dismiss), 2.2 (StickyBookCTA), 2.5 (solutions thank-you). The showcase spec does not define a stroke system, but the dominant weight is 1.5 from Heroicons — deviations at 2.2 and 2.5 read as heavier and slightly off-brand. The StickyBookCTA calendar icon at 2.2 is the most visible instance (it floats on screen for every scroll session).
- Fix: Standardise on `stroke-width="1.5"` for decorative/section icons; `stroke-width="2"` is acceptable for small UI icons (16–20px). Remove the 2.2 and 2.5 outliers.
- Effort: 20 minutes

### P1-07: Privacy page uses hard-coded hex borders instead of tokens

- File: `/tmp/whatifnow.github.io/src/pages/privacy.astro:97,103`
- Impact: Two `style="border-left: 4px solid #2EC4B6;"` inline styles appear on the privacy page. Teal is correct colour, but it bypasses the token system. This is a lower-risk page but still a client-facing surface (linked from the contact form).
- Fix: Replace inline style with Tailwind `border-l-4 border-teal`.
- Effort: 10 minutes

---

## P2 — worth doing

### P2-01: About section (`About.astro`) has no `font-serif` heading — breaks section rhythm

- File: `/tmp/whatifnow.github.io/src/components/About.astro:11`
- Impact: `<h2>` uses `font-serif` — this is correct. However the about section lives on a navy background, making it the only dark-background section that uses DM Serif Display without a teal accent word or structural highlight. Every other serif heading on a light background pairs with teal or amber micro-copy. The navy-on-dark section feels visually flat compared to the warmth of off-white sections with teal detail. Not a defect, but an opportunity to add the 15% teal rhythm missing from this section.
- Fix: Introduce a teal eyebrow label above the h2 (e.g. "About WIN" in `font-ui uppercase tracking-widest text-teal text-xs`) consistent with the pattern in EngagementModels duration labels.
- Effort: 15 minutes

### P2-02: Wordmark in Navigation uses plain `font-bold` (Inter) rather than the spec'd `font-serif` (DM Serif Display)

- File: `/tmp/whatifnow.github.io/src/components/Navigation.astro:6-7`
- Impact: The brand-showcase spec shows the wordmark as "What if Now" in DM Serif Display. The live navigation renders it in Inter Bold (`font-bold` with no `font-serif` class). The wordmark is the most persistent brand element on every page. Using the wrong font family breaks the typographic identity at its most canonical point.
- Fix: Add `font-serif` to the wordmark `<a>` element and remove `font-bold tracking-tight` in favour of `font-serif text-xl` (DM Serif Display has its own tracking). Verify the "if" teal accent still renders correctly within the new family.
- Effort: 15 minutes

### P2-03: Contact form focus states suppress the ring (focus:outline-none) without a visible ring replacement

- File: `/tmp/whatifnow.github.io/src/pages/contact.astro:33,47,61,78`
- Impact: All four form inputs use `focus:border-teal focus:outline-none`. The border colour change from `slate/20` to `teal` provides some focus indication, but `border-2` at 2px on a white form may not meet WCAG 2.4.11 (Focus Appearance) in all contrast conditions. There is no `focus:ring` added. For a contact form — the literal conversion surface — keyboard and assistive-tech users need clear, unmistakable focus states. This is also a trust signal: a form that clearly shows where you are feels professional.
- Fix: Add `focus:ring-2 focus:ring-teal focus:ring-offset-2` to all inputs, keeping `focus:outline-none` to suppress the browser default.
- Effort: 15 minutes

### P2-04: EngagementModels featured card (Workshop) uses teal CTA, not amber

- File: `/tmp/whatifnow.github.io/src/components/EngagementModels.astro:102-104`
- Impact: The "MOST BOOKED" featured card (Workshop) renders its CTA as `bg-teal text-navy hover:bg-teal-dark`. On a navy card, teal-on-navy offers lower contrast than amber-on-navy and misses the amber accent's role as the warm isolator. The amber CTA is the conversion signal; placing teal here on the most prominent card dilutes amber's primacy as the action colour. P2 rather than P1 because the contact links still work and the overall card is clearly the featured option.
- Fix: Change the featured card CTA to `bg-amber text-charcoal hover:bg-amber-dark` — consistent with FinalCTA, StickyBookCTA, and Navigation.
- Effort: 10 minutes

### P2-05: Inconsistent 60/25/15 colour rhythm — amber appears only in CTAs, never as structural accent

- File: Site-wide — `global.css`, all section components
- Impact: The Direction A spec describes a 60/25/15 rhythm: navy dominant, teal secondary structural use (dividers, icons, labels), amber reserved for CTAs and highest-urgency highlights. Amber is currently used only in CTA buttons. It never appears as a structural highlight — no amber rule, no amber quote accent, no amber eyebrow label. This means amber reads as purely functional (button colour) rather than as a brand accent, which limits its distinctiveness. On pages where the amber CTAs are not visible (e.g. long scroll before FinalCTA appears), the palette reduces to navy/teal/off-white only.
- Fix: Introduce one amber structural use per page — e.g. an amber left-border on the "EU AI Act" compliance card (the urgency item), or an amber asterisk on required form fields as a brand-coherent detail (already at contact.astro:25 in `text-amber` — good, but could be extended). Do not overuse.
- Effort: 1–2 hours across components

### P2-06: Missing `font-serif` for About h2 on dark background (minor heading inconsistency)

- File: Site-wide review finding — `src/pages/toolkit.astro:21`
- Impact: `/toolkit` exists as a page with a full `font-serif` `<h1>` but is not linked from Navigation or Footer, making it unreachable for organic visitors. This is not a brand defect (the page itself is fine) but the page appears to be orphaned — a visitor who finds it via a direct link sees a styled WIN page but has no way back except the browser back button (Navigation is present but the page isn't in the nav). This affects brand coherence for any direct-URL visitor.
- Fix: Either add `/toolkit` to Navigation under a "Resources" item, or add a `noindex` meta tag until it has a nav path. If it is a deliberate unlisted page, add `noindex` and a visible return path.
- Effort: 15 minutes

---

## Agent notes

**Files inspected:**
- `/tmp/whatifnow.github.io/src/styles/global.css` — token system (colour, type, no mono token)
- `/tmp/whatifnow.github.io/src/pages/brand-showcase.astro` — authoritative v1.1 spec
- `/tmp/whatifnow.github.io/src/components/Hero.astro`
- `/tmp/whatifnow.github.io/src/components/Navigation.astro`
- `/tmp/whatifnow.github.io/src/components/EngagementModels.astro`
- `/tmp/whatifnow.github.io/src/components/Footer.astro`
- `/tmp/whatifnow.github.io/src/components/FinalCTA.astro`
- `/tmp/whatifnow.github.io/src/components/PainPoints.astro`
- `/tmp/whatifnow.github.io/src/components/About.astro`
- `/tmp/whatifnow.github.io/src/components/Compliance.astro`
- `/tmp/whatifnow.github.io/src/components/HowItWorks.astro`
- `/tmp/whatifnow.github.io/src/components/StickyBookCTA.astro`
- `/tmp/whatifnow.github.io/src/components/AIReadinessQuiz.jsx` (inline style audit)
- `/tmp/whatifnow.github.io/src/components/RTBPrecedentDemo.jsx` (logo inline SVG)
- `/tmp/whatifnow.github.io/src/components/SARDemo.jsx` (logo inline SVG)
- `/tmp/whatifnow.github.io/src/pages/index.astro`
- `/tmp/whatifnow.github.io/src/pages/contact.astro`
- `/tmp/whatifnow.github.io/src/pages/solutions.astro`
- `/tmp/whatifnow.github.io/src/pages/ai-readiness.astro`
- `/tmp/whatifnow.github.io/src/pages/privacy.astro`
- `/tmp/whatifnow.github.io/src/pages/toolkit.astro`
- `/tmp/whatifnow.github.io/src/layouts/Layout.astro`
- `/tmp/whatifnow.github.io/public/favicon.svg`

**What I deliberately did not review:**
- `src/pages/audit.astro` — prior audit documentation, excluded per brief
- `src/components/v2/` and `src/pages/v2-*.astro` — orphan experiments, excluded per brief
- `src/pages/precedent-demo.astro` and `threshold-sar-demo.astro` — product demo shells that embed the JSX components already reviewed; the shells add only a `body { background: #FAFAF8; }` override which is within-palette
- Cross-brand bleed in the righttostay product itself at `products/righttostay/` — out of scope (whatifnow.github.io only)

**Key verdict:** The token system in `global.css` is well-constructed and navy value (#2A4365) correctly matches the v1.1 pack. The type pairing (DM Serif Display / DM Sans / Inter) is consistently applied in Astro components. The failures are concentrated in: (1) CTA hierarchy inversion on the hero, (2) the favicon carrying the pre-v1.1 palette, (3) Held-Square coral bleeding into a WIN page, and (4) the AIReadinessQuiz — the most-trafficked conversion funnel — operating entirely outside the token system.
