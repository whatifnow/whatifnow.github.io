# Accessibility (WCAG 2.2 AA) audit — Aoife

**Score:** 52 / 100 (grade D+)
**Success-metric link:** Public-sector and charity buyers (a real slice of WIN's ICP) routinely require WCAG 2.2 AA conformance in their supplier checks; the site as it stands would fail a procurement-grade audit, lose those qualified leads at the door, and silently exclude assistive-tech users from the contact form itself.

## P0 — fix now

### AX-01: Mobile menu button has no accessible name, no aria-expanded, no aria-controls
- File: `src/components/Navigation.astro:17-21,37-50`
- Impact: Icon-only `<button id="mobile-menu-btn">` is a hamburger SVG with no `aria-label`, no `aria-expanded`, no `aria-controls`. Screen-reader users hear "button" with no purpose; keyboard users have no announced state when they open/close. On mobile (where most first-touch leads on charity/local-gov procurement land via phone) the only path to /contact is via this menu — assistive-tech users effectively cannot get to the form. Direct lead-blocker.
- Fix: Add `aria-label="Open menu"`, `aria-expanded="false"`, `aria-controls="mobile-menu"`. In the click handler, toggle `aria-expanded` and update label to "Close menu". Add `aria-hidden="true"` to the inner SVG. Move focus to first menu link on open; restore to button on close. Listen for Escape to close.
- Effort: 30 minutes

### AX-02: Contact form has no aria-live status region and no submit/error announcement
- File: `src/pages/contact.astro:16-98`
- Impact: Form posts to Formspree but there is no client-side validation summary, no `aria-live="polite"` region for success/error, no `aria-invalid` on required fields, and no `aria-describedby` linking the helper text under the submit button to the form. A screen-reader user submitting on the contact page (which IS the conversion event) gets zero confirmation of submit state. Browser-native `:required` errors are not announced consistently across AT. This is the single highest-stakes form on the site.
- Fix: Wrap form in or add a `<div role="status" aria-live="polite" aria-atomic="true">` for inline submit feedback. On submit, prevent default, validate client-side, set `aria-invalid="true"` on bad fields, focus the first invalid field, and announce the count in the live region ("Please fix 2 fields"). On success (Formspree fetch with `Accept: application/json`), announce "Message sent. We'll reply within 24 hours." Same applies to the AI Readiness `LeadScreen` (`src/components/AIReadinessQuiz.jsx:419-523`) which currently sets `errors` state but never moves focus or announces.
- Effort: hours

### AX-03: No skip-to-content link; fixed nav covers ~80px of top viewport
- File: `src/layouts/Layout.astro:62-65`, `src/components/Navigation.astro:4`
- Impact: Every page renders `<Navigation />` first inside the slot. Keyboard users must tab through 4 nav links + the Let's Talk CTA on every single page before reaching the form on /contact. WCAG 2.4.1 Bypass Blocks is a Level A failure, not even AA. Procurement scans will flag this immediately. Also the nav is `position: fixed` — even after scrolling, a keyboard user tabbing back to the top hits the nav again, no anchor to jump past it.
- Fix: Add a `<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-amber focus:text-navy focus:px-4 focus:py-2 focus:rounded">Skip to content</a>` as the first element inside `<body>` in `Layout.astro`. Add `id="main"` and `tabindex="-1"` to each page's `<main>`.
- Effort: 30 minutes

### AX-04: AI Readiness Quiz step changes do not move focus or announce — keyboard/SR users get stranded
- File: `src/components/AIReadinessQuiz.jsx:527-641` (Quiz), `:939-980` (screen switch)
- Impact: When `screen` flips hero→lead→quiz→results→sent, the entire view re-renders but focus stays on the now-unmounted button (or worse, on `<body>`). When `currentQ` advances inside QuizScreen, the new question header receives no focus, no `aria-live` announces "Question 4 of 18", and progress-bar update is silent. SR users have no idea the page changed; keyboard users lose their place. This is the lead-magnet that fills the pipeline — every drop-off here is a lost lead.
- Fix: Add a `useEffect` on each screen mount that moves focus to the `<h1>`/`<h2>` (give it `tabindex="-1"` and `ref`). Wrap the question stem in `<div role="status" aria-live="polite">` or announce question changes via a visually-hidden live region. Progress bar needs `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="18"`, `aria-label="Question progress"`.
- Effort: hours

### AX-05: Global `animation: fadeInUp 0.6s` on every section ignores prefers-reduced-motion
- File: `src/pages/index.astro:27-42`
- Impact: A `<style is:global>` block fades and translates EVERY `<section>` on the entire site (because it's `is:global`, not scoped to homepage). Users with vestibular disorders, migraine triggers, or `prefers-reduced-motion: reduce` set will see motion on every page load — a WCAG 2.3.3 AA failure and a documented accessibility/health harm. The v2-a/b/c experiments correctly gate animations behind `@media (prefers-reduced-motion: reduce)` but the live homepage does not.
- Fix: Wrap the `section { animation: ... }` rule in `@media (prefers-reduced-motion: no-preference) { ... }`, OR scope the style to `:where(:not(:root))` and gate. Better: move from `is:global` to scoped, applied only to the homepage hero. Move the rule into `global.css` once so it cascades correctly across pages.
- Effort: 15 minutes

## P1 — fix soon

### AX-06: Every decorative SVG icon on the site is missing aria-hidden="true"
- File: `src/components/PainPoints.astro:4-14`, `src/components/Compliance.astro:4-22`, `src/components/Navigation.astro:18-20`, `src/components/Footer.astro:23,36,47`, `src/components/AIReadinessQuiz.jsx:913` (the tick)
- Impact: VoiceOver/NVDA/JAWS will announce each one as "image" / "graphic" / nothing. The footer social icons have `aria-label` on the link but the SVG inside is not hidden, so SR users hear "Substack, image. LinkedIn, image. Email, image." The pain-point cards have a paragraph of text accompanied by an icon — the icon adds nothing semantic and clutters the SR experience.
- Fix: Add `aria-hidden="true"` (and `focusable="false"` for IE-fallback safety) to every decorative SVG. The hamburger SVG in nav already needs this per AX-01. The tick in `SentScreen` is decorative because the heading "Check your inbox" carries meaning.
- Effort: 1 hour

### AX-07: Required-field marker (asterisk) is announced inconsistently and amber-on-white may not pass 3:1 as a UI indicator
- File: `src/pages/contact.astro:25,39,53`, `src/components/AIReadinessQuiz.jsx:408-410`
- Impact: `<span class="text-amber">*</span>` — the amber `#E8913A` against the form's off-white `#F2EEE9` background is ~2.6:1; against pure white it's ~2.9:1. Both fail the 3:1 non-text UI contrast threshold (WCAG 1.4.11). Also screen readers will literally read "asterisk" rather than "required". Combined with the inputs' `required` attribute (which IS announced), this is duplicated AND unreliable.
- Fix: Either (a) hide the asterisk with `aria-hidden="true"` and add visually-hidden text "(required)" inside the label, or (b) use `<abbr title="required">*</abbr>`. Darken the asterisk to `text-amber-dark` (#d4802e) at minimum, ideally to navy. Also add a single line of plain English at the top of the form: "Fields marked required must be filled in."
- Effort: 30 minutes

### AX-08: No visible custom focus ring; default browser outline removed by Tailwind reset on some elements
- File: `src/styles/global.css:1-29` (no `:focus-visible` defined), `src/pages/contact.astro:33,47,61,78` (`focus:outline-none` strips outline), `src/components/AIReadinessQuiz.jsx:439` (same)
- Impact: Every form input has `focus:outline-none` and relies on `focus:border-teal` as the only focus indicator. On the amber CTA buttons (`bg-amber`, no focus state declared) there is NO visible focus ring at all when tabbing. Border-colour-only focus is also too subtle on the form fields (just a colour shift, no thickness change) — WCAG 2.4.7 and 2.4.11 (new in 2.2) focus appearance failures. Keyboard users cannot tell where they are on the page.
- Fix: Add a global `:focus-visible { outline: 2px solid var(--color-amber); outline-offset: 2px; border-radius: 4px; }` in `global.css`. For dark backgrounds, swap to teal. Audit every `focus:outline-none` and ensure a thicker `focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2` (or equivalent) replaces it.
- Effort: 1 hour

### AX-09: Page heading order is broken on multiple pages — h1 then h3, no h2
- File: `src/components/Hero.astro:16` (h1), `src/components/Hero.astro:50` (h3 inside card with no h2 between); `src/pages/contact.astro:11` (h1) — page has no h2 at all; `src/components/AIReadinessQuiz.jsx:368` (h1) then `:446` (h2) OK, but `:593` (h2) appears on quiz screen where there is no h1 because hero unmounted (the screen has no h1)
- Impact: WCAG 1.3.1 and 2.4.6. Screen-reader users who navigate by headings get a broken outline. On the quiz screen specifically, an h2 appearing with no h1 above it confuses the document outline. Procurement audits routinely fail sites on this.
- Fix: Re-heading: quiz-card `<h3>` in Hero is decorative preview content — change to `<p class="font-serif text-xl ...">` or wrap card in a `<section aria-label="Quiz preview">` with `<h2 class="sr-only">Quiz preview</h2>`. On QuizScreen/LeadScreen/ResultsScreen, ensure each screen begins with an `<h1>` (the screen IS the page from a user's POV).
- Effort: 1 hour

### AX-10: `text-slate/60` and `text-slate-400/500` on off-white backgrounds fail body text 4.5:1
- File: `src/pages/contact.astro:93` (`text-slate/60` = #475569 at 60% alpha on off-white), `src/components/AIReadinessQuiz.jsx:397,449,514,567,569` (`text-slate-400`, `text-slate-500` on white/off-white), `src/components/AIReadinessQuiz.jsx:832` ("Compliance & Risk is weighted at 30%..." in `text-slate-400`)
- Impact: `text-slate-400` (Tailwind default ~#94a3b8) on white is ~2.8:1. `text-slate-500` (~#64748b) on white is ~4.4:1 — just below the 4.5:1 threshold. The 60% alpha version of `slate` against `off-white` falls below 3:1. These are body-text helpers under inputs, privacy notes, and the toolkit microcopy — the exact text that builds the trust to convert.
- Fix: Promote helper text to `text-slate` (no opacity) which is `#475569` and gives ~7.5:1 on off-white. Reserve `slate-400` for purely decorative dividers. Run an automated contrast check (axe, Lighthouse) once palette is fixed.
- Effort: 1 hour

### AX-11: Phone field reveal in contact form has no aria announcement and focus jumps without context
- File: `src/pages/contact.astro:66-81,113-119`
- Impact: Clicking the "I'd prefer a phone call" checkbox toggles `hidden` on the phone wrapper. SR users hear the checkbox state change but no announcement that a new field has appeared. The script then focuses the phone field — but `<div class="hidden">` does NOT have `aria-hidden`, so the input was technically already in the AT tree, just visually hidden, leading to inconsistent SR behaviour.
- Fix: Add `aria-controls="phone-wrap"` and `aria-expanded` to the checkbox. Replace `hidden` toggling with `hidden` attribute (not class) or set `aria-hidden` alongside `display:none`. Add the label "Phone number" with visually-hidden text or visible label inside the wrapper so the focused input is identified.
- Effort: 30 minutes

### AX-12: Quiz option buttons rely on colour-only selection state
- File: `src/components/AIReadinessQuiz.jsx:596-618`
- Impact: Selected option is indicated only by border colour and faint background tint (teal). No `aria-pressed`, no `role="radio"` (this is semantically a radio group, not a button list), no visible checkmark. WCAG 1.4.1 (use of colour) failure. Users with colour-vision differences may not see which option is active. Also: these should be radios — keyboard arrow-key navigation between options is the standard, but currently each option is a separate Tab stop.
- Fix: Convert to `role="radiogroup"` with `aria-labelledby="question-stem"`, individual options as `role="radio"` with `aria-checked`, arrow-key handler, single Tab stop. Add a visible tick (checkmark SVG) inside the selected option's A/B/C/D circle, not just colour change.
- Effort: 2 hours

### AX-13: Sticky "Book a call" CTA can overlap and trap last interactive element on mobile
- File: `src/components/StickyBookCTA.astro:1-25`
- Impact: Fixed `bottom-6 right-6` floating CTA on every non-/contact page. On a 360px mobile viewport with on-screen keyboard, this can cover footer links and the privacy-policy link below the contact form trigger. Also it's added LAST in DOM (after `<slot />`) so the keyboard tab order places it as the very last stop — fine — but it has no escape mechanism for users who want to dismiss (only the JS heuristic of FinalCTA-in-view).
- Fix: Move the sticky CTA before the footer in DOM (or use `inset-inline-end` and respect safe-area-inset-bottom). Add a small dismiss `×` button so users can close it without scrolling. Ensure it never overlaps focused form fields — add `body:has(input:focus) #sticky-book-cta { display: none; }`.
- Effort: 1 hour

## P2 — worth doing

### AX-14: Honeypot field uses left:-9999px instead of the safer `.sr-only` pattern
- File: `src/pages/contact.astro:19-21`
- Impact: `position:absolute;left:-9999px` works for honeypot purposes but is the old-school anti-pattern that some screen readers (Talkback, older NVDA) still read. The `aria-hidden="true"` mitigates it, but a tab landing in the input is still possible if any AT scripts the tabindex differently. Use the canonical clip-rect sr-only.
- Fix: Replace inline style with `class="sr-only" tabindex="-1"` plus `autocomplete="off"`.
- Effort: minutes

### AX-15: Privacy page right-column grid items lack focusable container and don't form a list semantically
- File: `src/pages/privacy.astro:129-143`
- Impact: The "Your rights" grid renders 6 cards via `.map()` but they are plain `<div>`s, not a `<ul>`/`<li>`. SR users lose the count ("list of 6 items"). Minor but it's a structural list.
- Fix: Wrap grid in `<ul role="list" class="grid ...">` and items in `<li>`. Remove the heading-level mismatch.
- Effort: 15 minutes

### AX-16: Form labels use `font-semibold` only — required and optional fields look identical in scan
- File: `src/pages/contact.astro:24,38,52`
- Impact: Cognitive accessibility. Returning users skimming the form can't distinguish required from optional by glance because all three fields are required, but the phone field (optional) is in a different styled box. Clearer "required" wording inside the label improves form completion rates.
- Fix: Pair AX-07 fix: spell out "(required)" in label rather than asterisk-only.
- Effort: 15 minutes

### AX-17: Phantom class `font-medium` after `font-extrabold` and `font-medium` after `font-bold` in nav CTA
- File: `src/components/Navigation.astro:13,30`
- Impact: Not a phantom Tailwind token, but `font-ui font-extrabold text-base px-5 py-2 rounded-full font-medium` declares two conflicting `font-weight` utilities. Final cascade wins so it's not visually broken, but it confuses any human reading the markup, and `font-medium` (500) overriding `extrabold` is a defect.
- Fix: Pick one — keep `font-extrabold`, drop `font-medium`. Same in mobile menu copy.
- Effort: 5 minutes

### AX-18: HTML `<html lang="en">` is fine, but no `lang="en-IE"` or BCP47 locale — minor SEO+SR localisation defect
- File: `src/layouts/Layout.astro:17`
- Impact: Screen readers announce English in US accent by default. For an Irish-targeted site, `lang="en-IE"` would route the right voice synthesis. Tiny effect; included as a courtesy.
- Fix: Change to `<html lang="en-IE">`.
- Effort: 1 minute

### AX-19: External links open in new tab but no visual or SR cue
- File: `src/pages/privacy.astro:148`, `src/components/Footer.astro:18,30`
- Impact: External links with `target="_blank"` don't announce "opens in new tab" to SR users. WCAG 3.2.5 (Change on Request) prefers either telling the user or not changing context.
- Fix: Add `<span class="sr-only"> (opens in new tab)</span>` to each external link, or drop `target="_blank"` and let users decide.
- Effort: 15 minutes

## Agent notes

**Files inspected:**
- `src/components/Navigation.astro`
- `src/pages/contact.astro`
- `src/styles/global.css`
- `src/components/Hero.astro`
- `src/components/Footer.astro`
- `src/components/StickyBookCTA.astro`
- `src/components/AIReadinessQuiz.jsx`
- `src/components/PainPoints.astro` (icon SVGs)
- `src/components/Compliance.astro` (icon SVGs)
- `src/pages/privacy.astro`
- `src/pages/index.astro`
- `src/pages/ai-readiness.astro`
- `src/pages/solutions.astro` (banner + aria-live usage as reference)
- `src/layouts/Layout.astro`

**What I deliberately didn't review (and why):**
- `src/pages/audit.astro` — per BRIEF, prior audit page, not under critique.
- `src/pages/v2-a.astro`, `v2-b.astro`, `v2-c.astro`, `src/components/v2/` — orphan experiments per BRIEF.
- `src/pages/brand-showcase.astro`, `toolkit.astro`, `precedent-demo.astro`, `threshold-sar-demo.astro` — secondary pages off the lead-conversion path; spot-checked but did not formalise findings (most defects above are site-wide and apply there too).
- `RTBPrecedentDemo.jsx`, `SARDemo.jsx` — interactive demos not on the primary contact-form path.

**Method:** Manual code inspection against WCAG 2.2 AA. No live-site fetching, no live a11y scanner. Contrast ratios are estimates from hex values per the Tailwind palette + custom theme tokens in `global.css`. Confirm with axe DevTools once fixes land.

**Cross-cutting recommendation:** P0 items AX-01 through AX-05 are the qualifying gates. Public-sector and charity procurement RFPs in Ireland increasingly include WCAG 2.2 AA conformance attestation. Five 30-minute-to-day-each fixes lift this site from "would fail an audit" to "would pass". That is a direct lead-unlock for the highest-margin slice of WIN's pipeline.
