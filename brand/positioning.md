# WIN positioning brief

**Status:** living doc. Amend in place; git carries the history.
**Last revised:** 2026-05-21.
**Owner:** Lar.
**Replaces, in spirit:** Brand v1.1 (March 2026) on the positioning, audience, and proof model. The visual / typography spec from v1.1 still stands.

This brief is the gating reference for any PR that touches the homepage, hero, About, EngagementModels, Solutions, Compliance, or Footer. If a change can't cite a line in here, it doesn't ship.

---

## 1. The line

> **Practical AI for teams figuring out where it fits.**

That's the homepage positioning headline — shipped in PR #26's batch. The intent:

- "**Practical AI**" — what we offer, anchored to the voice triad (Practical · Honest · Capable).
- "**Teams**" — buyer-shaped. No geography in the headline (we serve Ireland and beyond; geography lives in feature pills as a trust signal, not the audience boundary).
- "**Figuring out where it fits**" — the visitor's actual mental state when they land. Replaces analyst-speak like "emergent phase".

Sub-headline (live on site): *"We're an AI consultancy. We find the manual, repetitive work eating your team's time, and build tools to handle it."*

**Retired:** *"Enterprise-grade rigour without the enterprise overhead."* Wrong register for an emergent-phase SME — sounds like it's pitching big-company process to small teams who don't want it.

---

## 2. Audience

**Who:** SMEs and charities, 5 to 250 staff. State and semi-state bodies of similar size. Geographically open — we're built in Ireland (a trust signal) but we don't pitch as "for Irish teams only" anywhere visitor-facing.

**Phase they're in:** *emergent.* They've heard about ChatGPT. Someone on staff is already using AI tools, probably without a policy. They don't have an AI inventory. They might have signed up to Copilot. They're not racing the EU AI Act — that's a 2027 worry for them, not a 2026 buying trigger.

**Mental state at first visit:**
- Curious. "What can AI actually do for *us*?"
- Cautious. "Don't want to waste money on a tool we won't use."
- Time-poor. The board meets monthly; the operations lead has six other jobs.
- Allergic to buzzwords. They want plain language and concrete examples.
- Looking for *judgment*, not capability — they assume the tools work; they need help picking and applying them.

**Who we are NOT serving here (deliberate):**
- Enterprise transformation programmes. Six-zero budgets go elsewhere.
- Companies whose only motivation is AI Act readiness. We can help them, but that's not who we lead for.
- Pure model-training shops. We integrate frontier models; we don't fine-tune.

---

## 3. What we do, in four shapes

The engagement model — settled, central, no longer up for debate.

- **Briefing** — 90 min to half-day. A plain-English session for a leadership team or board on what AI can do for an organisation their size, and what it can't. From €750/session.
- **Workshop** — 1–2 days, on-site or remote. Theory in the morning, hands-on labs in the afternoon. Your team leaves having built something — a custom GPT, a triage flow, an inventory. From €2,500/day.
- **Pairing** — fractional, 2 weeks to 3 months. One or two days a week beside someone on your team, working the task they're stuck on. From €4,000/sprint.
- **Build** — 4 to 10 weeks, fixed fee. Working AI tool tailored to your operation. Bespoke or product-based — commercial fit agreed in scoping. From €12,000/build.

Fixed-fee always. Floors are real. Day-rate creep is not our model.

**Retired:** the DIY / Done With You / Done For You depth ladder. It signalled "how deep we go" — but the four-format model signals "what shape the engagement takes", which is the actually-useful question for a first-time visitor.

---

## 4. Voice — triad restored, reframed

The triad is back:

- **Practical** — we recommend what fits, not what impresses.
- **Honest** — we tell you what AI can do, what it can't, what it'll cost.
- **Capable** — we ship working things; we don't deal in slideware.

These map verbatim to how Lar described WIN in this session: *"honest, good people that also have great product skills."*

**Where the triad appears on the site:** at minimum as eyebrows / section labels on About and EngagementModels, and inside the bio on About (#1). Not as a bullet list anywhere — the words live inside sentences.

**Tone-of-voice rules (unchanged from brand v1.1):** confident not arrogant, expert not technical, warm not casual. Plain English. Short sentences. Contractions. Active voice. Ask questions when it helps.

**Say-this / not-this** examples for the current direction:

| Say this | Not this |
|---|---|
| Practical AI for the emergent phase | Strategic AI transformation |
| Your team is already using AI. We help you do it well. | Are you AI-ready? |
| We map what your team already does and where AI fits. | We'll explore the AI landscape together. |
| Fixed fee. Floors are real. | Bespoke pricing on request. |
| Workshops leave your team having built something. | We deliver hands-on AI capability uplift. |

---

## 5. What we say / what we don't say

**Lead with:**
- The four formats — these *are* the offer.
- The audience phrase ("emergent phase" / "figuring out where AI fits").
- Product proof: what we've built (righttostay, Stare, the free reports).
- Named human (deferred — #1).

**Present but not the lead:**
- EU AI Act. A driver but not a headline. Compliance lives on the Compliance section / page as one of several capabilities. Phrases like "August 2026 deadline" only appear when the visitor self-identifies as compliance-driven (e.g., on a compliance-specific landing).

**Retired explicitly:**
- *"Illumination before enforcement / amnesty not audit."* This was the AI-Act-led narrative. It was right for a different audience. Not for the emergent-phase buyer.
- *"Enterprise-grade rigour without the enterprise overhead."* See §1.
- The DIY/DWY/DFY ladder language. See §3.
- Any urgency framing built on the August 2026 deadline as the primary motivator. Urgency now comes from "your team is already using AI — let's do it well" not "the regulator is coming."

**Keep (still works):**
- *"We build it. You own it."* — the Build engagement model in one line.
- *"What AI can do, what it can't, what it'll cost."* — the Honest pillar in three clauses.
- The "Plain English" promise on the privacy page (and we should restate it elsewhere).

---

## 6. Proof model — three layers

Trust is built in three layers. Each layer answers a different visitor question.

**Layer 1 — Who is this?**
Two named humans on About: **Paul Thompson** (Co-Founder · Business Lead) and **Lar Judge** (Co-Founder · Technical Architect). Photos + titles + bullet bios. Bios drawn verbatim (typos fixed) from the canonical founders info pack (`public/downloads/whatifnow-info-pack.pdf`). Closes audit finding TR-01 — shipped in the same PR that locked the headline.

**Layer 2 — What have they actually built?**
A homepage strip showcasing **righttostay** as a working product: screenshot, one sentence on what it does ("a free tenant rights tool that turns 25,000+ RTB decisions into an answer for any Irish renter"), link out. Sits between the proof-block sections (Compliance + About) and the offer (EngagementModels). Tracked in #3.

Same depth for **Stare** on the Solutions page when it's rebuilt (#5).

**Layer 3 — Can they make complex data make sense?**
The **free reports on righttostay.ie** — what's published there demonstrates *data-to-insight* in formats business people read (stats, charts, plain-language framings). Pull one chart or stat into the homepage as a capability signal — "this is what we do when we point AI at messy public data." Tracked in #4 (may fold into #3).

**Out of scope for proof in this brief:**
- Case studies / client logos / testimonials. We don't have client cooperation lined up; not a near-term lever. Stays in the audit backlog (Trust TR-02 / TR-06).

---

## 7. Information architecture

**Pages that exist and what each is for:**

| Path | Role | Status |
|---|---|---|
| `/` (home) | Lead generation. Position WIN, surface proof, route to /contact. | Live; biggest pending change is hero rewrite (#6) + product showcase strip (#3, #4). |
| `/solutions` | Depth on the two built products (righttostay + Stare). The "what we've built" page. | Live but shallow; full rebuild in #5. |
| `/contact` | Lead-capture form. Plain. 3 required fields. | Live, recently tightened. No changes pending. |
| `/ai-readiness` | The 3-minute quiz. Quiz preview lives on the homepage hero; full quiz here. | Live. Re-check copy against this brief (#6). |
| `/audit` | The 8-reviewer audit deliverable, noindex. Internal. | Live. Unchanged. |
| `/brand-showcase` | Brand v1.1 spec, internal. | Live, noindex. Should be updated to point at this brief for positioning, but the typography/colour spec still stands. Not a session-blocker. |
| `/privacy` | GDPR / data-controller policy. | Live, recently updated with full controller identification (PR #15). |
| `/toolkit`, `/precedent-demo`, `/threshold-sar-demo` | Lead magnets / product demos. | Live but orphaned — no nav, no back-link. Out of scope here; flagged in audit FINDINGS.md backlog. |

**Pages that should exist and don't (yet):**
- `/about` — deferred. The current About section on the homepage is 115 words; too thin for a standalone page. Revisit when there's a founder + team narrative to write (post-#1).
- `/accessibility` — EU WAD declaration. Tracked in audit FINDINGS.md backlog (LG-09), not in this round.
- `/compliance` — the audit recommended extraction. Still in the backlog (UX P2-01). Lower priority now that compliance is no longer the lead positioning.

**Footer completeness check (#2):**
The footer is suspected to have lost links. The audit-completed identity strip stays. To audit and likely change:
- Substack link — **retire** (we've moved off Substack).
- LinkedIn — currently the company page. Move to Lar's personal profile (Trust TR-08).
- Hello@whatifnow.ie — keep as general contact.
- Privacy Policy link — keep.
- Need to add: `/contact`, `/accessibility` (when it lands), maybe a sitemap link, maybe an honest "Built in Dublin · ©" line.

---

## 8. Tone-of-section rules for the homepage

One paragraph each. These are the job each section is doing under the new positioning.

**Hero.** Name the audience and the practical promise. The current quiz preview *can* survive — the framing ("how does your team's AI use compare to your sector?") fits the emergent-phase mental model. Re-check the headline against §1; the CTA stays "Take the 3-minute audit" but `/ai-readiness` may need a copy pass to match the brief.

**PainPoints.** Three pains the emergent-phase buyer recognises. Not regulator-fear pains. Operational pains: "Half my team is using ChatGPT and I don't know what for", "We've got a Copilot licence nobody opens", "I can't tell if AI is helping or hurting." Current copy needs a re-read against this.

**Compliance.** Stays as a section, but tonally it's now *one capability* among several, not *the* lead. The four regulation cards (GDPR / AML / NIS2 / EU AI Act) can stay. The section heading should de-emphasise — something like "Compliance we handle in the background" rather than "Built for Business".

**About.** The single most important section under the new positioning. Where the named human appears (#1). Where the voice triad gets a sentence-level home. Where prior employers are named.

**EngagementModels.** Already aligned. The four-format grid is the offer. No copy change needed unless the section heading or sub-copy needs sharper register per §4.

**Product showcase strip (new, #3).** Right after Compliance + About, before EngagementModels. One screenshot of righttostay + 1–2 sentences + link to /solutions. Optional: one chart/stat from a free report (#4).

**FinalCTA.** Re-read against §4. Audit notes this is currently a weak echo of Hero. Tighten to a single, human ask that names the human ("Email Lar — he reads everything in this inbox").

---

## 9. Decisions log

Recording the calls made this session so future sessions don't re-litigate.

| Decision | Date | Reason |
|---|---|---|
| Two co-founders on About (Paul + Lar) | 2026-05-21 | Prior brief assumed Lar was the sole face. The canonical founders info pack names Paul Thompson as Co-Founder · Business Lead — material change to the trust positioning. Bios shipped verbatim from the PDF. |
| Hero locked: "Practical AI for teams figuring out where it fits." | 2026-05-21 | The PDF's "We help you do what only you can." is voice-correct but doesn't say what we do or who we serve (the audit's Copy reviewer flagged exactly this). Final line drops geography (per founder direction) and avoids analyst-speak ("emergent phase"). |
| Drop geography from the lead | 2026-05-21 | "Irish teams" framing limits ambition. "Ireland-Built" stays as a feature-pill trust signal — not in the hero, not in the audience definition. |
| Unify general inbox on info@whatifnow.ie | 2026-05-21 | PDF uses info@; site had drifted to hello@. privacy@ remains the controller channel. |
| No phone number on the site | 2026-05-21 | PDF lists one; site doesn't need it. We surface a reply commitment (email) instead. |
| Fractional AI Officer absorbed into Pairing card | 2026-05-21 | PDF lists it as a fourth service; structurally it's a rolling retainer, which the Pairing card now describes ("sprint or retainer"). Keeps the engagement grid at four. |
| Feature pills strip below hero | 2026-05-21 | GDPR-Compliant · EU AI Act Ready · Ireland-Built · SMEs & Charities. Trust signals, not audience constraints. AI Act resurfaces as a *feature*, not the *lead*. |
| Capability strip on EngagementModels | 2026-05-21 | One-line summary of the four services from the PDF (strategy / custom automation / fractional AI officer cover / training) — captures the capability axis without a second grid of four. |
| Drop EU AI Act as homepage lead | 2026-05-21 | Target audience (teams figuring out where AI fits) is not yet motivated by August 2026 enforcement. Compliance still featured, just not the headline. |
| Retire "amnesty before enforcement / illumination before enforcement" | 2026-05-21 | The phrase ladders to the dropped AI-Act-led positioning. Won't survive on the public site. May resurface in client-doc voice for compliance engagements. |
| Retire "Enterprise-grade rigour without the enterprise overhead" | 2026-05-21 | Wrong register for emergent-phase SMEs. |
| Drop DIY / Done With You / Done For You ladder | 2026-04 (PR #13) | The four-format model communicates engagement *shape* better than depth. Already shipped. |
| Restore the Practical · Honest · Capable triad on the site | 2026-05-21 | Matches Lar's self-description verbatim ("honest, good people that also have great product skills"). |
| Keep four engagement formats settled | 2026-05-21 | Already shipped, working, central to §3. Don't reopen. |
| Defer named-human change to a later session | 2026-05-21 | Founder photos in progress; bio writing happens then. Tracked in #1. |
| Retire Substack as a content surface | 2026-05-21 | Founder has moved off. Surfaces still link to it; cleanup in #2. |
| Park Plausible / analytics | 2026-05-21 (PR #19) | Heavy Google stack; revisit alongside any future GA4 decision. |
| Keep /compliance as a backlog extraction, not a near-term page | 2026-05-21 | The case for extraction (audit UX P2-01) was strongest when compliance was the lead. Now it's one of several capabilities — homepage section is enough for now. |

---

## Pointers

- Brand v1.1 visual spec (typography, palette, wordmark): `src/pages/brand-showcase.astro`.
- Most recent multi-agent audit findings: `audit/2026-05-19/FINDINGS.md`.
- The Trust / Copy gap evidence: `audit/2026-05-19/agent-trust.md`, `audit/2026-05-19/agent-copy.md`.
- Live homepage component graph: `src/pages/index.astro` and the components it renders.
- This brief: `brand/positioning.md`.
