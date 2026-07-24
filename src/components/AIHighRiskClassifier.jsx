import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// "Is My AI High-Risk?" — indicative EU AI Act classifier (lead-gen tool)
//
// Grounded against Regulation (EU) 2024/1689 (the EU AI Act):
//   - Prohibited practices ........ Article 5
//   - High-risk areas ............. Annex III (points 1–8) via Article 6(2)
//   - Transparency / limited risk . Article 50
//   - Minimal risk ................ (no specific obligations)
//
// Design rules (deliberately conservative):
//   - Any plausible prohibited practice -> "prohibited" (escalate, seek advice).
//   - Any Annex III area touched -> "high-risk", UNLESS the user clearly states a
//     narrow Art. 6(3) preparatory/procedural use AND understands the
//     documentation burden — even then we say "likely high-risk, confirm".
//   - "Not sure" on any gating question is treated as the RISKIER branch.
//   - We never tell anyone they are definitively "fine". Minimal/limited results
//     still carry a "this is indicative only — get advice" banner.
// ─────────────────────────────────────────────────────────────────────────────

const TIERS = {
  prohibited: {
    key: "prohibited",
    label: "Possibly a PROHIBITED practice",
    article: "Article 5, EU AI Act",
    color: "#B91C1C",
    accent: "#FEE2E2",
    headline: "This may be a prohibited AI practice.",
    body:
      "Your answers point to a use that the EU AI Act may ban outright under Article 5 — for example untargeted scraping of facial images to build recognition databases, social scoring, certain emotion recognition in work or education, exploiting vulnerabilities, or most real-time remote biometric identification in public spaces. Prohibited practices have applied since 2 February 2025. If there is any chance this describes your system, stop and get qualified legal advice before deploying or continuing.",
    action: "This needs a definitive legal assessment now, not a self-check.",
  },
  high: {
    key: "high",
    label: "Likely HIGH-RISK",
    article: "Article 6(2) + Annex III, EU AI Act",
    color: "#B45309",
    accent: "#FEF3C7",
    headline: "Your AI system is likely high-risk.",
    body:
      "Your answers indicate use in an area that the EU AI Act lists as high-risk in Annex III. High-risk systems carry the heaviest obligations — a risk-management system (Art. 9), data governance (Art. 10), technical documentation (Art. 11 / Annex IV), record-keeping, transparency to deployers, human oversight (Art. 14), accuracy and robustness, a conformity assessment, and EU-database registration. Most of these obligations apply from 2 August 2026. A narrow Article 6(3) exception exists for purely preparatory or procedural uses, but it is itself a documented assessment — you cannot simply assume it applies.",
    action:
      "Start your documentation now. The AI Act Compliance Pack gives you the article-referenced templates; a readiness call can confirm your classification.",
  },
  limited: {
    key: "limited",
    label: "Likely LIMITED-RISK (transparency duties)",
    article: "Article 50, EU AI Act",
    color: "#0E7490",
    accent: "#CFFAFE",
    headline: "Your AI system likely has transparency obligations.",
    body:
      "Your answers suggest a system that interacts with people or generates or manipulates content — a chatbot, a generative-AI tool, synthetic audio/image/video, or a deepfake. The EU AI Act does not classify these as high-risk, but Article 50 requires transparency: people must be told they are dealing with AI, and AI-generated or manipulated content must be marked as such. These duties apply from 2 August 2026. You should still document why your system is not high-risk.",
    action:
      "Confirm your transparency wording and keep a written note of your classification reasoning. A readiness call can sanity-check it.",
  },
  minimal: {
    key: "minimal",
    label: "Likely MINIMAL-RISK",
    article: "No specific AI Act obligations (but verify)",
    color: "#15803D",
    accent: "#DCFCE7",
    headline: "Your AI system is likely minimal-risk — but verify.",
    body:
      "Based on your answers, your system does not obviously fall into a prohibited, high-risk, or transparency category. Most AI uses sit here, with no specific obligations beyond general law. But this tool only saw a handful of answers. Classification depends on the precise intended purpose, who is affected, and how outputs are used — detail a short questionnaire cannot capture. The AI literacy duty (Art. 4) applies to virtually everyone using AI, and your sector may carry obligations of its own.",
    action:
      "It is worth a quick written record of why you concluded minimal-risk, in case the position is ever questioned.",
  },
};

// ─── Questions ───────────────────────────────────────────────────────────────
// Order matters: prohibited gate first, then Annex III high-risk gate, then the
// Art. 6(3) narrowing question, then transparency. "Not sure" always routes to
// the riskier branch.

const Q = {
  // Q1 — prohibited practices (Art. 5)
  prohibited: {
    id: "prohibited",
    section: "Step 1 — Prohibited uses",
    text:
      "Does your AI system do any of the following? (Select the closest answer.)",
    help:
      "These are practices the EU AI Act bans under Article 5. If any sound even partly like your system, choose the matching answer.",
    options: [
      {
        label:
          "Yes — e.g. social scoring of people, scraping faces from the web/CCTV to build a recognition database, real-time face recognition in public spaces, emotion recognition at work or school, or predicting crime purely from profiling",
        value: "yes",
      },
      {
        label:
          "I'm not sure whether any of those describe my system",
        value: "unsure",
      },
      { label: "No — none of those apply", value: "no" },
    ],
  },

  // Q2 — Annex III high-risk areas
  annex3: {
    id: "annex3",
    section: "Step 2 — High-risk areas (Annex III)",
    text: "Is your AI system used in any of these areas?",
    help:
      "These eight areas are listed in Annex III of the EU AI Act. A system used to make or materially inform decisions in any of them is, as a starting point, high-risk.",
    options: [
      {
        label:
          "Biometrics — remote identification, biometric categorisation, or emotion recognition (where not already prohibited)",
        value: "yes",
        annex: "Annex III(1) — Biometrics",
      },
      {
        label:
          "Critical infrastructure — safety components for water, gas, heating, electricity, road traffic, or digital infrastructure",
        value: "yes",
        annex: "Annex III(2) — Critical infrastructure",
      },
      {
        label:
          "Education & vocational training — admissions, evaluating learning outcomes, allocating people to programmes, or exam-cheating detection",
        value: "yes",
        annex: "Annex III(3) — Education and vocational training",
      },
      {
        label:
          "Employment & workers — recruitment, screening CVs, hiring, promotion/termination, task allocation, or monitoring performance",
        value: "yes",
        annex: "Annex III(4) — Employment and worker management",
      },
      {
        label:
          "Essential services — eligibility for public benefits, creditworthiness/credit scoring, life or health insurance pricing, or emergency call triage",
        value: "yes",
        annex: "Annex III(5) — Access to essential private and public services",
      },
      {
        label:
          "Law enforcement — victim/offending risk assessment, evidence reliability, profiling, or polygraph-type tools",
        value: "yes",
        annex: "Annex III(6) — Law enforcement",
      },
      {
        label:
          "Migration, asylum & border control — risk assessment, application examination, or detection/identification of persons",
        value: "yes",
        annex: "Annex III(7) — Migration, asylum and border control",
      },
      {
        label:
          "Justice & democratic processes — assisting judicial decisions, or influencing elections/referenda or voting behaviour",
        value: "yes",
        annex: "Annex III(8) — Administration of justice and democratic processes",
      },
      {
        label: "I'm not sure whether my system touches any of these areas",
        value: "unsure",
      },
      { label: "No — none of these areas apply to my system", value: "no" },
    ],
  },

  // Q3 — Article 6(3) narrowing — only asked if Annex III = yes
  narrowing: {
    id: "narrowing",
    section: "Step 3 — How decisive is the AI?",
    text:
      "Within that area, how much does the AI affect the outcome for a person?",
    help:
      "Annex III systems can be exempt under Article 6(3) only if they perform a narrow, preparatory or procedural task and do not pose a significant risk to people's rights — and even then you must document that conclusion. We treat anything decisive as high-risk.",
    options: [
      {
        label:
          "It makes, or significantly influences, decisions about people (e.g. who gets hired, scored, flagged, admitted, or refused)",
        value: "decisive",
      },
      {
        label:
          "I'm not sure how much weight its output carries in the decision",
        value: "unsure",
      },
      {
        label:
          "It only performs a narrow, preparatory or formatting task and a human decides everything material (a possible Article 6(3) exception)",
        value: "narrow",
      },
    ],
  },

  // Q4 — transparency (Art. 50) — asked if not high-risk / prohibited
  transparency: {
    id: "transparency",
    section: "Step 4 — Interaction & generated content",
    text: "Does your AI system do any of these?",
    help:
      "Article 50 imposes transparency duties on AI that interacts with people or creates synthetic content, even when the system is not high-risk.",
    options: [
      {
        label:
          "It chats with or responds to people directly (a chatbot or AI assistant)",
        value: "yes",
      },
      {
        label:
          "It generates or edits text, images, audio, or video (generative AI / synthetic media / deepfakes)",
        value: "yes",
      },
      {
        label: "I'm not sure",
        value: "unsure",
      },
      {
        label: "No — it does neither of those",
        value: "no",
      },
    ],
  },
};

// ─── Classification logic (conservative) ─────────────────────────────────────

function classify(answers) {
  // Step 1 — prohibited (and "unsure" escalates here too).
  if (answers.prohibited === "yes" || answers.prohibited === "unsure") {
    return { tier: "prohibited", annex: null };
  }

  // Step 2 — Annex III high-risk. "unsure" is treated as high-risk.
  if (answers.annex3 === "unsure") {
    return { tier: "high", annex: null, uncertain: true };
  }
  if (answers.annex3 === "yes") {
    // Step 3 — narrowing. Only a clear, deliberate narrow answer steps down,
    // and even then we keep them at high-risk with a strong "confirm" note,
    // because the Art. 6(3) exception is itself a documented assessment.
    if (answers.narrowing === "narrow") {
      return { tier: "high", annex: answers._annexLabel, art63: true };
    }
    // decisive OR unsure -> high-risk.
    return { tier: "high", annex: answers._annexLabel };
  }

  // Step 4 — transparency. "unsure" escalates to limited (the riskier of the
  // two remaining tiers).
  if (answers.transparency === "yes" || answers.transparency === "unsure") {
    return { tier: "limited", annex: null };
  }

  return { tier: "minimal", annex: null };
}

// Determine the next step given current answers (drives the flow).
function nextStep(answers) {
  if (answers.prohibited === undefined) return "prohibited";
  if (answers.prohibited === "yes" || answers.prohibited === "unsure") return "result";
  if (answers.annex3 === undefined) return "annex3";
  if (answers.annex3 === "unsure") return "result";
  if (answers.annex3 === "yes") {
    if (answers.narrowing === undefined) return "narrowing";
    return "result";
  }
  if (answers.transparency === undefined) return "transparency";
  return "result";
}

// ─── Disclaimer banner ───────────────────────────────────────────────────────

function DisclaimerBanner() {
  return (
    <div
      className="rounded-xl border-2 px-5 py-4 text-sm leading-relaxed"
      style={{ borderColor: "#E8913A", backgroundColor: "rgba(232,145,58,0.08)" }}
    >
      <p className="font-bold text-navy mb-1">
        Indicative only — this is not legal advice.
      </p>
      <p className="text-slate-600">
        The EU AI Act classification of a specific system depends on detail this
        tool cannot capture — your exact intended purpose, who is affected, your
        role (provider or deployer), and how outputs are used. This tool is
        deliberately conservative: when answers are ambiguous it flags the
        riskier outcome. For a definitive assessment, get advice from a qualified
        professional before you rely on any result.
      </p>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-teal font-semibold text-sm tracking-widest uppercase mb-6">
          Free · 1 Minute · EU AI Act
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
          Is my AI <em>high-risk</em>?
        </h1>

        <p className="text-slate-300 text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
          A short, plain-language check against the EU AI Act. Answer a few
          questions and get an indicative risk tier — prohibited, high-risk,
          limited, or minimal — with the article that applies and what to do next.
        </p>

        <div className="max-w-2xl mx-auto mb-10">
          <DisclaimerBanner />
        </div>

        <button
          onClick={onStart}
          className="bg-teal text-white font-bold py-4 px-12 rounded-xl hover:opacity-90 transition text-lg"
        >
          Start the Check →
        </button>

        <p className="text-slate-500 text-sm mt-4">
          No account, no email needed to see your result. Indicative guidance only.
        </p>
      </div>
    </div>
  );
}

// ─── Question screen ─────────────────────────────────────────────────────────

function QuestionScreen({ step, answers, onAnswer, onBack, stepIndex, totalSteps }) {
  const q = Q[step];
  const [selected, setSelected] = useState(answers[q.id] ?? null);
  const [selectedAnnex, setSelectedAnnex] = useState(answers._annexLabel ?? null);
  const progress = (stepIndex / totalSteps) * 100;

  function handleSelect(opt, idx) {
    setSelected(idx);
    setSelectedAnnex(opt.annex ?? null);
  }

  function handleNext() {
    if (selected === null) return;
    const opt = q.options[selected];
    const patch = { [q.id]: opt.value };
    if (q.id === "annex3") patch._annexLabel = opt.annex ?? null;
    onAnswer(patch);
  }

  return (
    <div className="min-h-screen bg-off-white flex flex-col px-6 py-12">
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>{q.section}</span>
          <span>
            Step {stepIndex + 1} of up to {totalSteps}
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-2 leading-snug">
            {q.text}
          </h2>
          <p className="text-slate-500 text-sm mb-6">{q.help}</p>

          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt, idx)}
                className="w-full text-left p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor:
                    selected === idx ? "#2EC4B6" : "rgba(100,116,139,0.2)",
                  backgroundColor:
                    selected === idx ? "rgba(46,196,182,0.05)" : "transparent",
                  color: selected === idx ? "#2A4365" : "#475569",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-navy transition"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="bg-teal text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>

        <p className="text-slate-400 text-xs mt-6 text-center max-w-xl mx-auto">
          Indicative only — not legal advice. When in doubt, this check flags the
          riskier outcome and points you to advice.
        </p>
      </div>
    </div>
  );
}

// ─── Result ──────────────────────────────────────────────────────────────────

function ResultScreen({ result, onRestart }) {
  const tier = TIERS[result.tier];

  return (
    <div className="bg-off-white min-h-screen pb-24">
      <div className="py-16 px-6" style={{ backgroundColor: tier.color }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
            Indicative result
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 font-serif">
            {tier.label}
          </h1>
          <p className="text-white/90 text-lg font-semibold">{tier.article}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-12 space-y-8">
        <DisclaimerBanner />

        <div
          className="bg-white rounded-2xl p-8 shadow-sm"
          style={{ borderTop: `4px solid ${tier.color}` }}
        >
          <h2 className="text-2xl font-bold text-navy mb-4 font-serif">
            {tier.headline}
          </h2>

          {result.annex && (
            <p
              className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: tier.accent, color: tier.color }}
            >
              Flagged area: {result.annex}
            </p>
          )}

          <p className="text-slate-700 leading-relaxed mb-4">{tier.body}</p>

          {result.uncertain && (
            <p className="text-slate-700 leading-relaxed mb-4">
              You weren't sure whether your system touches a high-risk area. We
              have treated that as high-risk on purpose — the safe assumption
              until a definitive assessment confirms otherwise.
            </p>
          )}

          {result.art63 && (
            <p className="text-slate-700 leading-relaxed mb-4">
              You indicated a possible Article 6(3) exception (a narrow,
              preparatory task with a human deciding). That exception is real but
              it is not automatic — you must assess and <em>document</em> that
              your system poses no significant risk before relying on it. Until
              you have, treat the system as high-risk.
            </p>
          )}

          <div
            className="rounded-xl px-5 py-4 text-navy font-medium"
            style={{ backgroundColor: tier.accent }}
          >
            {tier.action}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: "linear-gradient(135deg, #2A4365, #3B5680)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-serif">
            Turn this into a defensible position
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            Our EU AI Act Compliance Pack gives you the article-referenced
            templates — system inventory, risk assessment, transparency notices,
            FRIA, data governance and technical documentation — to evidence your
            classification and start your obligations. Or talk it through with us.
          </p>
          <a
            href="/contact?subject=EU AI Act — Is My AI High-Risk follow-up"
            className="inline-block bg-teal text-white font-bold py-4 px-10 rounded-xl hover:opacity-90 transition text-lg mb-3"
          >
            Talk to us about the Compliance Pack →
          </a>
          <p className="text-slate-400 text-sm">
            No obligation. We'll point you to the right next step for your tier.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="text-slate-500 hover:text-navy transition underline text-sm"
          >
            Start the check again
          </button>
        </div>

        <p className="text-slate-400 text-xs text-center max-w-2xl mx-auto leading-relaxed">
          Drafted against Regulation (EU) 2024/1689 (the EU AI Act). Article and
          annex references may be changed by later delegated or implementing acts,
          Commission guidance, or corrections — check the current consolidated
          text. This tool gives an indicative, non-binding view only and is not
          legal advice. What If Now Limited accepts no liability for reliance on
          its output.
        </p>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function AIHighRiskClassifier() {
  const [screen, setScreen] = useState("hero"); // hero | quiz | result
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]); // stack of step ids for Back

  const totalSteps = 4;
  const step = nextStep(answers);

  function start() {
    setAnswers({});
    setHistory([]);
    setScreen("quiz");
  }

  function answer(patch) {
    const current = nextStep(answers);
    const updated = { ...answers, ...patch };
    setHistory((h) => [...h, current]);
    setAnswers(updated);
    if (nextStep(updated) === "result") setScreen("result");
  }

  function back() {
    if (history.length === 0) {
      setScreen("hero");
      return;
    }
    const prev = history[history.length - 1];
    const { [Q[prev].id]: _drop, _annexLabel, ...rest } = answers;
    // Drop the annex label too if we're stepping back over the annex question.
    const cleaned = prev === "annex3" ? rest : { ...rest, _annexLabel };
    setHistory((h) => h.slice(0, -1));
    setAnswers(cleaned);
  }

  if (screen === "hero") return <HeroScreen onStart={start} />;

  if (screen === "result") {
    const result = classify(answers);
    return <ResultScreen result={result} onRestart={start} />;
  }

  // quiz
  const stepIndex = history.length;
  return (
    <QuestionScreen
      step={step}
      answers={answers}
      onAnswer={answer}
      onBack={back}
      stepIndex={stepIndex}
      totalSteps={totalSteps}
    />
  );
}
