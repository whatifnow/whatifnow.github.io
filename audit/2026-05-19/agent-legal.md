# Compliance & Legal audit — Liam Gallagher (LG)

**Score:** 38 / 100 (grade D)
**Success-metric link:** WIN sells EU AI Act compliance to Irish SMEs and charities. A buyer who lands on `/privacy` or scans the footer sees a site that fails the same Article 13 / Article 6 / business-registration / AI-disclosure tests WIN will charge to fix. That is the credibility hit. Closing the gaps below is the cheapest, highest-trust lead generator on the entire site — every fix is also a portfolio piece you can point at.

## P0 — fix now

### LG·01: No business identity disclosed anywhere — no CRO number, no registered office, no controller name, no DPO/contact-for-data-rights
- File: `src/components/Footer.astro:5-53` (footer); `src/pages/privacy.astro:154-162` (privacy "Contact us")
- Impact: Companies Act 2014 s.151 requires every Irish company to disclose its full registered name, CRO number, registered office, and (if listing directors) directors on business letters and websites. GDPR Art. 13(1)(a)(b) requires identity and contact details of the **controller** (and the DPO if appointed) at the point of collection. Today the footer says only `© What If Now` and the privacy page closes with `What If Now · Dublin, Ireland`. A compliance buyer doing 30 seconds of due diligence cannot tell if "What If Now" is a registered Irish company, who controls their data, who to write to under Art. 15, or whether a DPO exists. This is the single most damaging finding on the site — it directly contradicts the value proposition.
- Fix: In the footer add the trading entity legal name (e.g. "What If Now Ltd"), CRO number, registered office, and (if registered) VAT number. In `privacy.astro` "Contact us", state the **data controller** by legal name + registered office, list a **named contact** (Data Protection Lead or DPO if you have one) with a dedicated `privacy@whatifnow.ie` mailbox, and the postal address. If no DPO is mandated, say so explicitly ("We are not required to appoint a DPO under Art. 37 GDPR; our Data Protection Lead is …").
- Effort: hours (paperwork; copy is ~80 words)

### LG·02: Quiz performs automated profiling (Art. 22) with no notice, no opt-out, no LIA, and feeds sector-tailored "compliance exposure" content back to the user
- File: `src/components/AIReadinessQuiz.jsx:337-356` (scoring), `230-291` (sector content), `419-523` (LeadScreen — collection without Art. 13 notice), `645-724` (results submit)
- Impact: The quiz collects name, work email, company, sector, size and 18 answers; computes a six-dimension score and tier; emits sector-specific "compliance exposure" copy that materially affects the user (it nudges them to book a call). Under GDPR Art. 22 + Recital 71, **solely automated decisions with significant effect** need either explicit consent, contractual necessity, or law — and Art. 13(2)(f) requires meaningful information about the logic. WIN currently relies on "legitimate interest" (privacy.astro:86) for follow-up marketing **without an LIA**, and the LeadScreen only shows a `Privacy Policy` link, not an Art. 13 just-in-time notice. The contradiction (a compliance consultancy that fails Art. 13 on its own lead-gen form) will be the first finding any procurement reviewer flags.
- Fix: Add a 40-word disclosure block under the LeadScreen submit (`AIReadinessQuiz.jsx:514-518`): "We use your answers to calculate a score and send you a tailored toolkit. We will not make any decision about you that significantly affects you using only this score. Legal basis: your consent (Art. 6(1)(a)) — withdraw any time at privacy@…". Switch lawful basis to **consent** with an unticked checkbox for the marketing follow-up — separate from the toolkit delivery (which is contractual / consent for the request). Drop the legitimate-interest framing in `privacy.astro:86-88` and publish a proper LIA only for the items that genuinely need it (e.g. anti-fraud logs).
- Effort: hours

### LG·03: No EU AI Act Article 50 transparency notice on the quiz, the SAR demo, or the RTB Precedent demo
- File: `src/components/AIReadinessQuiz.jsx:360-401` (HeroScreen — no AI disclosure), `src/components/SARDemo.jsx` (full file — markets "AI redaction" with no user-facing transparency notice on the live site), `src/components/RTBPrecedentDemo.jsx` (full file — markets "AI analysis" without on-page disclosure)
- Impact: Article 50 AI Act (transparency obligations, **applicable from 2 August 2026** — the very deadline WIN sells against) requires that natural persons interacting with an AI system be informed of that fact, and that AI-generated content be marked. The quiz produces algorithmically scored output that reads like AI-generated advice. The SAR and RTB demo components are simulations, but the marketing copy around them on the live pages (`solutions.astro`, `precedent-demo.astro`, `threshold-sar-demo.astro`) speaks in product-present-tense without an "this is a product preview / mockup data" badge being load-bearing. Selling Art. 50 compliance while failing the same Art. 50 test on your own homepage is the worst possible look.
- Fix: (a) On `AIReadinessQuiz.jsx` HeroScreen, add a one-line notice: "This assessment uses a rules-based scoring algorithm — no AI model generates your result. We follow the EU AI Act Art. 50 transparency standard." (b) On the SAR and RTB demos, add a persistent banner: "Product preview — interface mockup with illustrative data. No real personal data is processed." (c) Anywhere the site offers AI-generated text to a user (e.g. tailored sector content at `AIReadinessQuiz.jsx:230-291` is currently static, so it's fine — but if you ever swap to LLM-generated copy you must add a "generated by AI" mark).
- Effort: hours

### LG·04: No cookie / consent mechanism, and `fonts.googleapis.com` is loaded on every page before any consent
- File: `src/layouts/Layout.astro:40-42`; also in `src/components/SARDemo.jsx:408` and `src/components/RTBPrecedentDemo.jsx:469`
- Impact: Google Fonts served via `fonts.googleapis.com` transfers the user's IP address to Google in the US. Following CJEU C-311/18 (Schrems II) and the well-known Munich Regional Court ruling on Google Fonts (Jan 2022), serving fonts from Google's CDN without consent has been treated as an unlawful transfer of personal data by EU DPAs. ePrivacy (Directive 2002/58/EC as transposed by SI 336/2011) also requires consent **before** any non-strictly-necessary third-party load. Today: no banner, no consent gate, fonts load on first byte. The site sells compliance and ships a textbook violation on every page view.
- Fix: Self-host the three fonts (DM Sans, DM Serif Display, Inter) under `/public/fonts/` and serve via `@font-face` in `global.css`. Remove the three `fonts.googleapis.com` `<link>` tags. This is preferable to a consent banner because it makes the entire site consent-free by design (your stated philosophy: "amnesty before audit"). After self-hosting, document the choice in `privacy.astro` ("We self-host fonts — no third-party CDN requests from this site"). If you ever add analytics, **then** add Klaro/cookiebot — but the right move first is to remove the trigger.
- Effort: hours (download the fonts, add `@font-face`, retest layout)

### LG·05: Privacy notice omits the Cloud Function / Google Cloud sub-processor that actually receives quiz data
- File: `src/pages/privacy.astro:92-113` lists only Resend and Formspree; `src/components/AIReadinessQuiz.jsx:645` posts to `https://europe-west1-whatifnow-production.cloudfunctions.net/send-toolkit`
- Impact: GDPR Art. 13(1)(e) requires disclosure of **the recipients or categories of recipients** of the personal data. The quiz posts the user's name, email, company, sector, size, scores and full answer set to a Google Cloud Function. Google Cloud is therefore a processor (or at minimum, infrastructure provider) and `whatifnow-production` is a controller-side endpoint that needs to be characterised. Currently the privacy page tells the user only about Resend and Formspree — Google Cloud is invisible. A regulator following the data flow will find the undisclosed recipient in two clicks of devtools.
- Fix: Add a third sub-processor card under `privacy.astro:96-109`: "Google Cloud (europe-west1, Belgium) — hosts the assessment-processing function. Data residency is EU. Standard Contractual Clauses + Google DPA in place." Cross-reference the SAR/RTB demo claims (which already say "Google Cloud Belgium/Netherlands") so the story is consistent across pages.
- Effort: minutes

## P1 — fix soon

### LG·06: Privacy policy uses "legitimate interest" as catch-all without an LIA balancing test
- File: `src/pages/privacy.astro:85-88`
- Impact: GDPR Art. 6(1)(f) requires a documented balancing test (LIA) when relying on legitimate interest, and Art. 13(1)(d) requires the **specific legitimate interest** to be stated. "You've asked us for something and we're delivering it" is contract/consent territory, not legitimate interest. The follow-up marketing emails ("we may send occasional emails") need either consent (PECR/ePrivacy soft opt-in rules) or a documented LI with a documented opt-out path. Today neither exists.
- Fix: Split the lawful basis: (a) **performance of a request** (Art. 6(1)(b) — or consent under 6(1)(a)) for sending the toolkit; (b) **consent** (Art. 6(1)(a) + PECR soft opt-in) for marketing follow-up, with an unticked checkbox on the LeadScreen. Publish a one-page LIA at `/lia` or as an appendix to the privacy page for any residual LI use (e.g. fraud prevention, security logs).
- Effort: hours

### LG·07: Contact form has honeypot but no rate limit, no Captcha, and no Article 13 just-in-time notice
- File: `src/pages/contact.astro:16-99` (especially `19-21` honeypot, `92-96` legal notice)
- Impact: The honeypot stops naïve bots but not the credential-stuffing or scraped-list spam that hits any public Formspree endpoint. More importantly, GDPR Art. 13 requires that when personal data is collected from the data subject, the controller provides identity, purpose, lawful basis, retention period, recipients, and rights **at the time of collection**. Today the form gives a single underlined "Privacy policy" link with no in-line summary. The buyer expects to see — and we are not showing — the four-line just-in-time notice that WIN would charge a client €X to draft.
- Fix: (a) Add a 50-word notice block above the submit button: "Submitting this form sends your message to our hello@whatifnow.ie inbox via Formspree (EU servers). We keep enquiries for 24 months. Lawful basis: your consent. Read the full notice." (b) Add Formspree's Cloudflare Turnstile or hCaptcha plugin (one line in the Formspree dashboard, no code change) for rate-limit / bot protection. (c) Consider Formspree's built-in `_replyto` validation and the per-IP rate limit setting.
- Effort: hours

### LG·08: Quiz q14 references an obsolete EU AI Act date and a misnamed obligation
- File: `src/components/AIReadinessQuiz.jsx:170-178`
- Impact: The question reads "The EU AI Act requires all businesses to ensure staff using AI have adequate AI literacy by **February 2025**." Today's date is 2026-05-19 — the February 2025 Art. 4 literacy obligation is already past. A compliance buyer answering "this is the first I've heard of it" sees a quiz that talks about a deadline that's already four months in the rear-view mirror, and the framing "by February 2025" reads as stale content. This undermines the credibility of every other compliance claim on the site.
- Fix: Rewrite to "Article 4 of the EU AI Act has required, since 2 February 2025, that every organisation providing or deploying AI ensures its staff have adequate AI literacy. Where are you on this?" Add a parallel question for Art. 50 (transparency, applicable from 2 August 2026) which is the live urgency driver. Sync with whoever owns `compliance.astro` so the two pages tell the same story.
- Effort: minutes

### LG·09: No accessibility statement — EU Web Accessibility Directive (2016/2102) is load-bearing for state-funded body buyers
- File: site-wide; closest current home would be `src/pages/privacy.astro` or a new `src/pages/accessibility.astro`
- Impact: BUILD-target buyers include state-funded bodies (charities receiving exchequer funding, semi-states). EU WAD obliges public-sector bodies to publish an accessibility statement and obliges their suppliers to demonstrate WCAG 2.1 AA conformance. A procurement officer at a charity board cannot tick the box without seeing your statement. Today there is no accessibility page, no WCAG conformance claim, no contact for accessibility issues.
- Fix: Add `src/pages/accessibility.astro` modelled on the EU template (status, conformance level, known issues, contact for accessibility issues, complaint route to the Irish Human Rights and Equality Commission). 250-word page. Link from the footer next to "Privacy Policy".
- Effort: hours

### LG·10: Privacy retention is single-bucket (24 months for everything) — no segmentation
- File: `src/pages/privacy.astro:115-121`
- Impact: Art. 5(1)(e) (storage limitation) expects retention to be proportionate to each purpose. Today the policy says "2 years from the date you completed the assessment, or until you ask us to delete it." That's fine for the toolkit follow-up. But anonymised aggregate scores (the `improve the assessment` purpose at line 82) have no retention statement, and contact-form enquiries — which never touched the assessment — fall into a gap.
- Fix: Add a table-shaped retention block with three rows: (a) assessment submissions: 24 months from completion; (b) contact enquiries: 24 months from last contact; (c) anonymised aggregate scores: indefinite, but reduce to k-anonymous bands of n≥10 within 12 months.
- Effort: minutes

### LG·11: `subject` URL parameter is read into a hidden form field with no sanitisation
- File: `src/pages/contact.astro:84,104-111`
- Impact: The script at line 107-111 sets `document.getElementById('subject').value = subject` from `URLSearchParams`. Formspree will send whatever string is provided as the email subject. A crafted link (`?subject=PHISHING ATTEMPT`) will set the email subject — low-severity but allows social-engineering of WIN's inbox triage. Not a GDPR issue; a brand-safety one.
- Fix: Whitelist allowable subject values (`general-enquiry | tier-foundation | tier-building | tier-scaling | quiz-call`) and map the URL param against that list before assignment. Reject anything else with a fallback to "General enquiry".
- Effort: minutes

### LG·12: Privacy page "Last updated: March 2026" while today is 2026-05-19 — and the policy doesn't list a versioning / change-notification process
- File: `src/pages/privacy.astro:24`
- Impact: Art. 13(2)(a) does not strictly require a "last updated" date but DPC guidance (and procurement reviewers) treat policies older than ~12 months as stale. More important: there's no statement about how material changes are communicated to existing data subjects. If you change processors next quarter, what's the notification path?
- Fix: Bump "Last updated: May 2026" when you publish the LG·01–LG·05 fixes anyway. Add one paragraph: "We will email anyone on our list at least 14 days before any material change to this policy takes effect. Minor edits (typos, contact-detail updates) will be reflected here without notice."
- Effort: minutes

### LG·13: Privacy lists rights but no rights-handling SLA, no proof-of-identity process, and no charge / refusal policy
- File: `src/pages/privacy.astro:124-149`
- Impact: Art. 12(3)–(5) sets the 30-day SLA (which the page does mention), and Art. 12(6) permits the controller to request additional ID where reasonable doubt exists. Art. 12(5) allows refusal or a reasonable fee for manifestly unfounded or excessive requests. None of this is on the page. A buyer evaluating WIN as a sub-processor will ask for evidence of a documented DSAR process — and there isn't one.
- Fix: Add a short "How we handle your request" subsection: "We respond within 30 days. We may ask for one form of ID to verify it's really you. We may refuse or charge a reasonable fee if the request is manifestly unfounded or repetitive (Art. 12(5))." Link to a one-page internal DSAR runbook (or commit to publishing one).
- Effort: hours

## P2 — worth doing

### LG·14: No security.txt, no `.well-known/security.txt` route, no vulnerability disclosure policy
- File: site-wide; `public/` (currently has `robots.txt`, `favicon.svg`, `images/`, `toolkit/`, `brand/` — no `.well-known/`)
- Impact: RFC 9116. ENISA recommends every business-grade site publish security.txt. Not regulatory, but procurement-grade buyers (state bodies, banks) increasingly check.
- Fix: Add `public/.well-known/security.txt` with `Contact: mailto:security@whatifnow.ie`, `Expires:` (12 months out), `Preferred-Languages: en`, `Policy: /security`.
- Effort: minutes

### LG·15: Schema.org Organization JSON-LD doesn't include `legalName`, `taxID`, or `address`
- File: `src/layouts/Layout.astro:53-60`
- Impact: Trust signal for Google's Knowledge Graph and for buyers who scrape structured data for due diligence. Once LG·01 lands (legal name, registered office, CRO/VAT) you can mirror those into the LD-JSON for free.
- Fix: After LG·01, extend the JSON-LD block to include `legalName`, `address` (`PostalAddress` type), `vatID`, `taxID` (CRO number), and `email`.
- Effort: minutes

### LG·16: Quiz results blob is posted to Formspree with all 18 answers including potentially commercially sensitive answers (e.g. q15 "no AI documentation")
- File: `src/components/AIReadinessQuiz.jsx:682-714`
- Impact: A user who completes the quiz is effectively telling WIN their compliance posture in detail. That's exactly what WIN wants — but the data minimisation principle (Art. 5(1)(c)) says you should justify each field collected. Today the privacy notice (`privacy.astro:32-63`) lists "Quiz answers — to calculate your AI readiness score" but doesn't say the per-question answers are stored in Formspree's database.
- Fix: Either (a) post only the dimension scores (not the per-question answers) to Formspree and keep individual answers client-side only; or (b) update the privacy notice to explicitly say "Your per-question answers are stored alongside your contact details so we can tailor our follow-up." Option (a) is more defensible; option (b) is honest.
- Effort: hours

### LG·17: No `Permissions-Policy`, `Referrer-Policy`, or `Content-Security-Policy` meta tags
- File: `src/layouts/Layout.astro:16-66`
- Impact: Not a GDPR finding per se, but a security-hardening signal. Astro static sites can ship these via meta tags or via deploy-time headers. Without CSP, a future inline-script regression could exfiltrate quiz data to a third party.
- Fix: Add minimum `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; ...">` (tighten once self-hosted fonts land). Add `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- Effort: hours

### LG·18: No cookies / no localStorage claim — but the site sets neither, and we don't tell the user that (missed trust signal)
- File: `src/pages/privacy.astro` (add a new section)
- Impact: A meaningful sales asset: "This site sets zero cookies and uses zero analytics. No banner is needed because there is nothing to consent to." If you adopt LG·04 (self-host fonts) and never add analytics, this becomes a genuine and unusual claim.
- Fix: Add a section "Cookies and tracking" to `privacy.astro`: "We set no cookies. We use no analytics or advertising trackers. We don't fingerprint your browser. There is no banner because there is nothing to consent to." Updates the moment you add anything.
- Effort: minutes

### LG·19: Privacy claim "We don't share with data brokers, advertising networks, or third-party marketing platforms" is good — but doesn't address international transfers
- File: `src/pages/privacy.astro:110-113`
- Impact: Resend is a US company (Delaware), with EU sub-processing options. Formspree is US-headquartered. Both involve a Schrems II analysis. The current notice doesn't mention international transfers, Standard Contractual Clauses, the EU-US Data Privacy Framework, or the user's right to a copy of the SCCs (Art. 46(2)).
- Fix: Add a "Where your data goes" subsection naming each sub-processor's jurisdiction and the safeguard used (DPF certification + SCCs are the standard pair for US processors today). Confirm whether Resend has been configured to use EU-region processing.
- Effort: hours

## Agent notes

**Files inspected:**
- `src/pages/privacy.astro` (full)
- `src/layouts/Layout.astro` (full)
- `src/components/Footer.astro` (full)
- `src/pages/contact.astro` (full)
- `src/components/AIReadinessQuiz.jsx` (full)
- `src/components/SARDemo.jsx` (full)
- `src/components/RTBPrecedentDemo.jsx` (full)
- `src/components/Navigation.astro` (full)
- `src/pages/ai-readiness.astro` (full)
- `public/robots.txt` (full)
- Grepped: tracking pixels (`gtag|googletagmanager|analytics|hotjar|fbq|posthog|pixel`) → none found; cookies / consent UI → none; accessibility statement → none; Google Fonts CDN → confirmed loaded in three places.

**What I deliberately didn't review (and why):**
- `src/pages/audit.astro` — per BRIEF, that's the prior audit page documentation, not a current production surface. I noted the prior LG·01 (cookie banner) and LG·02 (legitimate interest) findings still apply unchanged — both made it into this re-audit at P0.
- `src/pages/v2-a.astro`, `v2-b.astro`, `v2-c.astro`, `src/components/v2/` — per BRIEF, orphan experiments.
- Tailwind class accessibility (contrast ratios, focus rings) — that's the UX/a11y reviewer's lens, not Compliance. I touched WAD only because it gates public-sector procurement.
- Brand showcase, toolkit page, solutions page content — those are marketing-lens; I checked them only for hidden Formspree endpoints (none found beyond what's documented).
- Live Formspree configuration (rate-limit toggles, Captcha plugin) — read-only, can't introspect; I assumed defaults.

**Net:** the credibility-tax on this site is large. Fixing LG·01 through LG·05 is two days of work and would lift the score from D to B+ overnight. The legal lens converts directly to leads because the audience is selecting WIN **on the strength of compliance competence** — every gap below is a counter-signal a procurement reviewer will flag.

— Liam Gallagher (LG)
