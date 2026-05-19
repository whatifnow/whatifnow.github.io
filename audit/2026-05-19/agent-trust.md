# Trust & Credibility audit — Tomás

**Score:** 22 / 100 (grade F)
**Success-metric link:** Trust is the conversion enzyme. An SME director can read every word on this site and still have no idea who they would be emailing, who has hired this firm before, or what got delivered. Until at least one named human, one named (or pseudonymised) engagement, and one verifiable countable claim appear, the contact form is asking strangers to send work-email to a void. Every other lens compounds off this one.

## P0 — fix now

### TR-01: Zero named humans anywhere on the live site
- File: `src/components/About.astro:14-22` (the "Our team brings decades of experience" block); site-wide
- Impact: An Irish SME director procuring a fixed-fee €12k Build will not send a work email to a faceless entity. "Our team brings decades of experience in operations, customer experience, and business transformation — combined with engineering expertise" is the single most template-shaped sentence on the site and pattern-matches to scam. There is no founder name, no photo, no LinkedIn link to a person, no "Hi, I'm ___". The live About also has no link to the v2 AboutV2 component which appears to contain bio material — so the founder is absent in production.
- Fix: Rewrite `About.astro` around one named human (Lar Judge, founder). Add a square portrait (`public/images/lar.jpg`), one-line credential, a 60–80 word bio in first person, and a LinkedIn link to the personal profile (not just the company page in the footer). Match the AboutV2 draft's intent.
- Effort: hours (copy + one photo; component already exists)

### TR-02: Zero engagements, case studies, or named clients shown
- File: site-wide; closest stand-in is `src/components/EngagementModels.astro:51-58` where prices ("from €12,000") sit with no proof anyone has paid them
- Impact: Four price tiers ranging €750 → €12,000+ are quoted with zero evidence of prior work. "MOST BOOKED" on the Workshop card (line 24, 68-70) is a trust claim with no denominator behind it. A 5–250-staff SME shopping fixed-fee AI consulting wants one thing: "show me one charity / one SME you did this for." There is nothing — not even an anonymised "An Irish housing charity, Q4 2025" card.
- Fix: Add a "Recent engagements" section above `FinalCTA` with 3 cards: sector + size + problem + outcome (one number) + duration. Anonymise client names if needed ("A 40-person Dublin professional-services firm"). Remove "MOST BOOKED" until there is a real count to cite.
- Effort: hours (component + 3 short case summaries; Lar has the underlying engagements)

### TR-03: EU AI Act expertise is claimed but unproven — and Aug-2026 is the lead-driver
- File: `src/components/Compliance.astro:21-26` ("EU AI Act" card); echoed in `PainPoints.astro:14-17`
- Impact: The brief identifies EU AI Act compliance as a core specialism and the August 2026 deadline as the urgency driver. The Compliance card promises "We classify your AI use cases by risk level and ensure your implementations meet the EU's new requirements" — and offers no proof: no certification, no AI-Act briefing post linked from Substack, no named expert, no published risk-classification methodology, no client outcome. For the single highest-intent lead (a charity board panicking about Aug 2026), this card converts no better than a competitor's blog post.
- Fix: Replace generic prose with one specific proof point per regulation card: "Read our EU AI Act risk-classification playbook" (link to a Substack/long-form piece), or "Run a free AI Act gap-check" (link to a scoped form). Add a date stamp ("Updated May 2026") to signal currency.
- Effort: hours (one long-form piece + link wiring); days if writing the playbook from scratch

### TR-04: "Usually respond within 24 hours" is the only claim — and it is unverifiable
- File: `src/components/FinalCTA.astro:20-22`; `src/pages/contact.astro:13`, `94`
- Impact: This phrase appears three times across the homepage and contact page and is the *only* quantitative trust signal on the entire site. In isolation it is aspirational, not credible. There is no Substack subscriber count, no LinkedIn follower count, no "X assessments delivered", no Stripe Climate / B Corp / ISO / Cyber Essentials badge, no Calendly "next slot Tuesday 10am" widget. Visitors who would convert on a soft trust signal have nothing to grab onto.
- Fix: Add one verifiable countable adjacent to the 24-hour promise — pick the one that is true today: Substack subscriber count (auto-embed widget), LinkedIn followers, "47 readiness assessments completed", or a live "Next available scoping call: Tuesday 10am" Calendly preview. Make it auto-update or date-stamp it.
- Effort: minutes (Substack subscriber widget embed) to hours (Calendly preview)

### TR-05: Footer has no business entity, no Irish company registration, no address
- File: `src/components/Footer.astro:5-11`
- Impact: Footer shows "© 2026 What If Now" and three social icons. For an Irish-registered consultancy selling to charities, state-funded bodies, and SMEs that procure under public-money rules, the absence of (a) legal entity name, (b) CRO number, (c) registered address, and (d) VAT number is a hard procurement blocker — and a soft trust blocker for everyone else. The privacy page (lines 145, 159) shows a `hello@whatifnow.ie` address but no controller identity, which is also a GDPR Article 13 gap that compounds the trust hit.
- Fix: Add a footer line: `What If Now Ltd · Company No. ______ · Registered office: ______, Dublin · VAT IE______`. If the trading entity is a sole trader, say so plainly. Mirror the controller identity into `privacy.astro`.
- Effort: minutes (once Lar pastes the entity details)

## P1 — fix soon

### TR-06: No testimonial, even one-line, even anonymised
- File: site-wide; obvious gap between `EngagementModels.astro` and `Compliance.astro` in `src/pages/index.astro:18-20`
- Impact: A single pull-quote ("They saved my fundraising team a day a week." — Operations Director, Dublin charity) materially outperforms 200 words of body copy on consulting sites. Zero quotes is a self-inflicted wound when at least one engagement has shipped.
- Fix: Add a one-card testimonial strip between EngagementModels and Compliance. Anonymise the name if needed; keep the role and sector real.
- Effort: hours

### TR-07: Substack link has no context, no count, no proof of life
- File: `src/components/Footer.astro:16-26`
- Impact: A naked Substack icon in the footer with no subscriber count, no post frequency, and no "Latest: …" line could equally well be a dormant 2023 newsletter or an active weekly. If it is active, this is the cheapest trust signal on the site and it is being squandered.
- Fix: Either embed Substack's subscribe-with-count widget on the homepage (above FinalCTA), or add a "Latest post: {title} ({date})" line in the footer auto-fetched at build time. If the Substack is dormant, remove the link.
- Effort: hours (widget embed or build-time fetch)

### TR-08: LinkedIn link points to the company page, not a person
- File: `src/components/Footer.astro:29-39`
- Impact: For a small consultancy, the founder's personal LinkedIn (with connections, posts, endorsements) is a stronger trust signal than the company page. The current link sends visitors to whatever low-activity company page exists. A visitor doing pre-call due diligence finds nothing.
- Fix: Add Lar's personal LinkedIn alongside or instead of the company page. Put the personal one in the About bio (TR-01), keep the company one in the footer.
- Effort: minutes

### TR-09: Contact form promises "no sales sequence" but page makes no claim about who reads it
- File: `src/pages/contact.astro:12-14, 93-95`
- Impact: "One human reply, usually within 24 hours. No sales sequence." is strong copy — undermined by the fact the visitor still does not know which human. Naming the responder ("Lar will read this") converts measurably better than "we" in 1–10 person consulting firms.
- Fix: Change the subhead to "Tell us a little about what you're working on and Lar will get back to you within 24 hours." Mirror the change at line 94.
- Effort: minutes

### TR-10: No third-party validators anywhere
- File: site-wide
- Impact: No Stripe Climate, no B Corp, no ISO 27001, no Cyber Essentials, no Microsoft / Google / AWS partner badge, no Enterprise Ireland mention, no Tech Ireland membership, no chamber. Irish SMEs and especially charities procuring under restricted-funds rules look for at least one external validator. Zero is a procurement red flag.
- Fix: Audit which validators Lar actually qualifies for today (Cyber Essentials and Stripe Climate are realistic short-horizon wins; Tech Ireland membership is cheap). Add a single-row badge strip under Compliance with the one or two that are real now. Do not invent.
- Effort: hours (audit) + days (achieve the first validator if none exist yet)

### TR-11: "Decades of experience" / "engineering expertise" are unevidenced claims
- File: `src/components/About.astro:17-19`
- Impact: Plural unattributed credentials are read as filler. Specific named credentials with verifiable employers (e.g. "10 years at Stripe", "Built data platform at the Irish Times") are read as proof. Current copy is the worst kind — large claim, no proof.
- Fix: Replace with one or two named, verifiable prior roles (linked to LinkedIn where possible). One real CV line beats "decades of experience" every time.
- Effort: minutes (once TR-01 lands)

### TR-12: "MOST BOOKED" on Workshop tile is an unsupported social-proof claim
- File: `src/components/EngagementModels.astro:24, 67-71`
- Impact: A "MOST BOOKED" badge implies a denominator. If the denominator is single digits, the claim is a misrepresentation risk — and a savvy visitor will know that. Stronger to remove than to leave unsupported.
- Fix: Either replace with a concrete count ("12 booked in Q1 2026") or remove the badge entirely until the data supports it.
- Effort: minutes

### TR-13: Three "Usually respond within 24 hours" copies make the gap louder
- File: `src/components/FinalCTA.astro:21`; `src/pages/contact.astro:13`; `src/pages/contact.astro:94`
- Impact: Repeating an unverifiable claim three times amplifies the absence of any other claim. Worth de-duplicating and reinforcing once it has been backed by TR-04.
- Fix: After TR-04, keep one canonical "24 hours" line on the contact page; on the homepage replace with the new countable.
- Effort: minutes

## P2 — worth doing

### TR-14: No "About the founder" page exists; About is one section on the homepage
- File: `src/pages/` (no `about.astro`); only `src/components/About.astro` exists, used at `src/pages/index.astro:21`
- Impact: A visitor doing due diligence after the homepage has nowhere to go. There is no `/about` URL to share, link from LinkedIn, or surface in search.
- Fix: Add `src/pages/about.astro` with founder bio, photo, prior work, and an explicit "Why I started What If Now" paragraph. Cross-link from About component and Navigation.
- Effort: hours

### TR-15: No privacy/data-handling reassurance on the contact form itself
- File: `src/pages/contact.astro:93-96`
- Impact: The link to `/privacy` is at the bottom in 12px text. For a form asking work email, a one-line "We don't share your email. Ever. — Privacy" inline reassurance increases submit rate. Standard pattern, missing.
- Fix: Lift the privacy reassurance to a one-liner directly under the email field, in addition to the footer link.
- Effort: minutes

### TR-16: No site search / no easy way to find evidence of expertise
- File: site-wide; no `/blog`, no `/writing`, no `/work` page; `solutions.astro` and `audit.astro` are not surfaced in Navigation
- Impact: Visitors looking for proof of subject-matter expertise have only the homepage. The Substack is off-site. There is no in-product writing surface to skim before contacting.
- Fix: Add a "Writing" or "Notes" section that pulls 3 latest Substack posts at build time, or links to them directly with date + title. Surface in Navigation.
- Effort: hours

### TR-17: No "Past employers" or "Trained with" badge row
- File: site-wide
- Impact: For a solo/small consultancy, the founder's *prior* employer logos (with permission) are valid trust signals — "Lar previously: Company A, Company B." This is a cheap, honest signal that does not require client logos.
- Fix: Once TR-01 ships, add a single thin row of prior-employer logos on the About page. Greyscale, small.
- Effort: hours

### TR-18: Compliance.astro icons are decorative SVGs that look like padlocks regardless of regulation
- File: `src/components/Compliance.astro:3-25`
- Impact: Visual cue collapses four distinct regulations into "generic compliance vibes". Soft trust signal that the regulations are not deeply understood by the designer.
- Fix: Use distinct, regulation-specific iconography (or a small label colour) per card. Lower priority than the missing proof content (TR-03).
- Effort: hours

### TR-19: No date stamp anywhere indicates the site is current
- File: site-wide; copyright in `Footer.astro:7-9` is the only year
- Impact: An EU-AI-Act consultancy whose site has no "Updated April 2026" or "Last reviewed" stamps invites the question "is this firm still active?" — especially on the Compliance section where regulations change.
- Fix: Add an "Updated {month year}" stamp on the Compliance section and the About section. Auto-set at build time.
- Effort: minutes

## Agent notes

**Files inspected:**
- `src/pages/index.astro`
- `src/pages/contact.astro`
- `src/pages/privacy.astro` (skimmed for controller identity)
- `src/components/About.astro`
- `src/components/Compliance.astro`
- `src/components/Footer.astro`
- `src/components/FinalCTA.astro`
- `src/components/Hero.astro`
- `src/components/PainPoints.astro`
- `src/components/EngagementModels.astro`
- `src/components/HowItWorks.astro`
- Site-wide grep for testimonial/case-study/founder/Lar/Judge/CRO/VAT/registered/ISO/B Corp/Stripe Climate/Cyber Essentials/subscribers/years/delivered — all returned empty outside `audit.astro` (prior-audit doc) and `v2/` (orphan drafts, out of scope per brief).
- Verified `public/images/` contains only `og-image.jpg` — no founder portrait, no client logos, no engagement screenshots exist on disk.

**What I deliberately didn't review (and why):**
- `src/components/v2/AboutV2.astro` and other `v2/` components — brief flags as orphan experiments. Noted only as evidence that founder bio content has been drafted but is not in production.
- `src/pages/v2-a.astro`, `v2-b.astro`, `v2-c.astro`, `brand-showcase.astro` — same reason.
- `src/pages/audit.astro` — brief explicitly excluded from critique (it is the prior audit doc).
- Visual / aesthetic design quality — that is the Aesthetics lens, not Trust.
- Copy voice critique outside trust-bearing copy — that is the Brand-Voice lens.
- The monorepo at `/Users/larjudge/Development/whatifnow/win` — out of scope per brief.

**Method note:** I read the prior audit's `TR` entries in `audit.astro` only after drafting these P0/P1 lines to check for regressions. The findings here were derived independently from the current source. The continuity is unsurprising — none of TR-01..TR-05 from the prior audit have been resolved in production, which is itself the headline finding: **the trust gap is unchanged.**
