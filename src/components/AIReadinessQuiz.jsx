import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    id: 'strategy',
    label: 'Strategy & Leadership',
    weight: 0.14,
    questions: [
      {
        id: 'q1',
        text: 'In the past 3 months, has your business made any specific decision about how to use AI?',
        options: [
          "No — it hasn't come up in any concrete way",
          "We've talked about it informally but haven't decided anything",
          "Yes — we've identified specific areas and started planning",
          "Yes — we've committed budget or time and are actively implementing",
        ],
      },
      {
        id: 'q2',
        text: 'If a competitor started using AI to deliver their services faster or cheaper, how quickly could you respond?',
        options: [
          "We'd be caught off guard — we haven't thought about this",
          "We'd need to research from scratch — months at least",
          "We have some ideas ready but would need to move quickly to implement",
          "We're already ahead — AI is part of our competitive positioning",
        ],
      },
      {
        id: 'q3',
        text: 'Who in your organisation is responsible for evaluating AI opportunities?',
        options: [
          "Nobody — it's not anyone's job",
          "It falls to whoever happens to be interested",
          "A specific person or team keeps an eye on it, but informally",
          "There's a clear owner with time allocated to it",
        ],
      },
    ],
  },
  {
    id: 'processes',
    label: 'Processes & Workflows',
    weight: 0.14,
    questions: [
      {
        id: 'q4',
        text: "Think about your most time-consuming weekly task. Is there a written procedure someone else could follow to do it?",
        options: [
          "No — it's all in my head",
          "Partially — some steps are documented but not enough to hand over",
          "Mostly — someone could follow it with a few questions",
          "Fully — it's documented step by step with examples and edge cases",
        ],
      },
      {
        id: 'q5',
        text: 'In the past month, how many hours did your team spend on tasks that were essentially copy-paste, re-keying data, or manual formatting?',
        options: [
          "A huge amount — probably 20+ hours across the team",
          "Quite a bit — somewhere around 10–20 hours",
          "Some — under 10 hours, we've reduced the worst of it",
          "Very little — most of that is automated or eliminated",
        ],
      },
      {
        id: 'q6',
        text: 'When a new client or customer comes in, how many separate systems or documents need to be updated manually?',
        options: [
          "4 or more — it's a real pain point",
          "3 — there's definite duplication of effort",
          "2 — most things flow through but there are gaps",
          "1 or zero — data enters once and flows where it needs to go",
        ],
      },
    ],
  },
  {
    id: 'data',
    label: 'Data & Systems',
    weight: 0.14,
    questions: [
      {
        id: 'q7',
        text: "If you needed to pull a report on last quarter's performance right now, how long would it take?",
        options: [
          "Hours or days — data is scattered and I'd have to compile it manually",
          "An hour or two — I know where most things are but it takes work",
          "Under 30 minutes — it's mostly in one place with some manual steps",
          "Minutes — I can pull it from a dashboard or report that's already set up",
        ],
      },
      {
        id: 'q8',
        text: "How many times in the past month has someone in your team said 'I can't find that file' or 'which version is the latest'?",
        options: [
          "Constantly — it's a daily frustration",
          "Regularly — probably once or twice a week",
          "Occasionally — it happens but we mostly have things organised",
          "Rarely or never — we have a clear system and people use it",
        ],
      },
      {
        id: 'q9',
        text: 'What percentage of your important business data is in a format a computer could read and process automatically?',
        options: [
          "Very little — most is in emails, PDFs, paper, or people's heads",
          "Some — we have spreadsheets and documents but they're not standardised",
          "Most — our key data is in databases or structured systems",
          "Almost all — our data is clean, structured, and accessible via our tools",
        ],
      },
    ],
  },
  {
    id: 'technology',
    label: 'Technology',
    weight: 0.14,
    questions: [
      {
        id: 'q10',
        text: 'Which of these has anyone in your business used for actual work (not just testing) in the past month?',
        options: [
          "None of these — we haven't used AI tools for work",
          "ChatGPT, Copilot or similar for occasional tasks (emails, research)",
          "AI tools integrated into our workflow (Canva AI, accounting AI, scheduling AI)",
          "Multiple AI tools used daily as part of how we operate",
        ],
      },
      {
        id: 'q11',
        text: 'When was the last time you evaluated whether your business tools were still the best fit?',
        options: [
          "I can't remember — we've used the same setup for years",
          "Over a year ago — we looked but didn't change much",
          "In the past 6 months — we reviewed and made some changes",
          "We review regularly — at least quarterly — and adapt as needed",
        ],
      },
      {
        id: 'q12',
        text: 'If you wanted to connect two of your business tools together (e.g. your CRM to your email system), how would you do it?',
        options: [
          "I wouldn't know where to start",
          "I'd need to hire someone or ask an IT person",
          "I could probably figure it out with Zapier or a similar tool",
          "We already have integrations set up and I know how to manage them",
        ],
      },
    ],
  },
  {
    id: 'compliance',
    label: 'Compliance & Risk',
    weight: 0.30,
    questions: [
      {
        id: 'q13',
        text: 'Do you have a written record of every AI tool your business uses, who uses it, and what data goes into it?',
        options: [
          "No — I couldn't list them all right now if asked",
          "Informally — I could name the main ones but nothing is documented",
          "Partially — we have a list but it's not complete or regularly updated",
          "Yes — we maintain an AI inventory that's reviewed regularly",
        ],
      },
      {
        id: 'q14',
        text: 'The EU AI Act requires all businesses to ensure staff using AI have adequate AI literacy by February 2025. Where are you on this?',
        options: [
          "This is the first I've heard of it",
          "I've heard of the EU AI Act but haven't taken any action",
          "I'm aware of the obligation and we're starting to look into it",
          "We've already provided AI literacy training and have documentation to prove it",
        ],
      },
      {
        id: 'q15',
        text: 'If the Data Protection Commission asked you today to show how AI is governed in your business, what could you produce?',
        options: [
          "Nothing — we have no AI-specific documentation",
          "Very little — maybe some general IT policies that mention technology",
          "Something — we have draft policies or partial documentation",
          "A complete pack — AI usage policy, risk assessments, and training records",
        ],
      },
    ],
  },
  {
    id: 'people',
    label: 'People & Culture',
    weight: 0.14,
    questions: [
      {
        id: 'q16',
        text: 'In the past month, has anyone on your team shared an AI tip, tool, or shortcut with a colleague?',
        options: [
          "No — AI isn't part of our conversation",
          "Maybe once — but it wasn't a regular thing",
          "Yes — a few people are experimenting and sharing what they find",
          "Regularly — it's become a normal part of how we share knowledge",
        ],
      },
      {
        id: 'q17',
        text: 'If you introduced a new AI tool tomorrow, how would your team likely react?',
        options: [
          "Resistance — people would worry about their jobs or just not use it",
          "Caution — they'd be sceptical and need convincing",
          "Openness — most would be willing to try if given support",
          "Enthusiasm — people would jump in and probably suggest improvements",
        ],
      },
      {
        id: 'q18',
        text: 'Has anyone in your business received any formal AI training or completed an AI-related course?',
        options: [
          "No — no training at all",
          "Self-directed only — someone watched YouTube videos or read articles",
          "Some — one or two people did a course or attended a workshop",
          "Yes — we've invested in structured training for the team",
        ],
      },
    ],
  },
];

const SECTOR_DATA = {
  'Accountancy / Finance': {
    benchmark: 38,
    quickWin: 'Automate client onboarding document collection and data extraction from financial statements. AI can reduce the manual effort of compiling reports and chasing paperwork by 60–70%.',
    complianceNote: 'High exposure. AI used in credit decisions, fraud detection, or financial recommendations may be classified as high-risk under the EU AI Act — requiring formal risk assessment and human oversight documentation before August 2026.',
    focusFirst: 'Your data is already structured (accounting systems, spreadsheets). Start with report automation and client communication templates — the infrastructure is there, it just needs to be connected.',
  },
  'Legal / Solicitors': {
    benchmark: 32,
    quickWin: 'AI-assisted first-draft contract review and clause flagging. Tools like Harvey or Copilot for legal can reduce document review time by 40–50% while maintaining partner oversight.',
    complianceNote: 'High exposure. AI systems used in legal research or document drafting must be inventoried and governed carefully. Client data sensitivity and professional liability obligations apply on top of AI Act requirements.',
    focusFirst: 'Document management first. Standardise how case files are stored and named before adding AI — unstructured data is the single biggest blocker for legal AI adoption.',
  },
  'Healthcare / Wellness': {
    benchmark: 30,
    quickWin: 'Automate appointment scheduling, reminders, and follow-up communications. Non-clinical automation delivers immediate time savings with minimal compliance complexity.',
    complianceNote: 'Very high exposure. AI in clinical decision support or patient triage is classified as high-risk under the EU AI Act. GDPR requirements for health data (special category) add another compliance layer. Get governance in place now.',
    focusFirst: 'Data hygiene first. Patient and client records must be structured, properly consented, and GDPR-compliant before any AI tool touches them. This is the prerequisite for everything else.',
  },
  'Hospitality / Tourism': {
    benchmark: 28,
    quickWin: 'Automate guest FAQs, booking query responses, and review management. AI chatbots handle 80% of common questions, freeing staff for the experience moments that matter.',
    complianceNote: 'Lower risk profile for most hospitality businesses. AI used in customer communication tools is generally limited-risk. Focus on GDPR compliance for guest data rather than AI Act high-risk classifications.',
    focusFirst: 'Pick the single highest-volume manual task — usually booking queries or check-in communications — and automate it end-to-end before expanding. One workflow done well beats five done poorly.',
  },
  'Retail / E-commerce': {
    benchmark: 35,
    quickWin: 'AI-generated product descriptions at scale, automated inventory alerts, and personalised abandoned cart flows. E-commerce has the highest density of automation opportunities per hour saved.',
    complianceNote: 'Moderate exposure. AI used in personalisation, pricing, or recommendation engines needs documentation. Consumer-facing AI decisions require transparency disclosures under emerging regulations.',
    focusFirst: 'Customer communication automation — email sequences, chat responses, product recommendations. Highest ROI and lowest compliance risk for retail; measurable results within 30 days.',
  },
  'Construction / Trades': {
    benchmark: 24,
    quickWin: 'Automate job quoting templates, scheduling communications, and supplier quote requests. Even basic automation of these admin tasks saves 5–8 hours per week in a typical trades business.',
    complianceNote: 'Lower risk profile. Most AI use in construction and trades is administrative (quoting, scheduling, communication) rather than high-risk classifications. Focus on data GDPR rather than AI Act complexity.',
    focusFirst: "Write your processes down first. SOPs for quoting, onboarding subcontractors, and project handover are the prerequisite for any AI assistance — and they're valuable on their own regardless of AI.",
  },
  'Consulting / Professional Services': {
    benchmark: 42,
    quickWin: 'AI-assisted research synthesis, proposal drafting, and meeting summaries. Consultants who use AI for preparation and documentation reclaim 6–10 hours per week for billable work.',
    complianceNote: 'Moderate to high exposure. If AI informs recommendations that clients act on — particularly in risk, financial, or strategic contexts — documentation and disclosure obligations apply. Build a governance framework now.',
    focusFirst: 'Standardise your deliverable templates. AI performs best when it has a consistent format to work within — proposal structures, report frameworks, workshop outputs. Define the template first, then apply AI to fill it.',
  },
  'Marketing / Creative': {
    benchmark: 45,
    quickWin: 'Content calendar generation, ad copy variants at scale, and performance analysis summaries. Marketing teams using AI for content production report 3–4x output with the same headcount.',
    complianceNote: 'Moderate exposure. AI-generated content must be disclosed in certain advertising and media contexts. Copyright status of AI outputs is evolving — document what tools generate what content as a precaution.',
    focusFirst: 'Build an AI content workflow — define which tasks AI handles (drafts, variants, research) versus human review (strategy, brand voice, final approval). Document it. This protects you legally and makes the process repeatable.',
  },
  'Technology': {
    benchmark: 52,
    quickWin: 'AI-assisted code review, documentation generation, customer support automation, and internal knowledge base Q&A. Technology businesses have the highest AI adoption rate and the most to gain from compounding it.',
    complianceNote: 'High awareness required. Technology businesses are often both subject-to and users-of the EU AI Act — if your product uses AI to make decisions, you may have provider obligations on top of user obligations. Governance is urgent.',
    focusFirst: 'Document what AI powers your product or service. This is simultaneously a compliance requirement and a competitive differentiator — clients and enterprise customers will start asking for AI governance evidence in procurement.',
  },
  'Other': {
    benchmark: 34,
    quickWin: "Identify the single most repetitive task in your business — the one the team complains about most — and evaluate AI automation options for it. Start there before building a broader strategy.",
    complianceNote: 'All businesses operating in the EU are subject to the AI Act regardless of sector. Start with an AI tool inventory — list every AI tool in use, who uses it, and what data it processes. This is the foundation of compliance.',
    focusFirst: "Start with process documentation. Writing down how your key workflows operate is the prerequisite for AI assistance — and it improves consistency and training regardless of whether you add AI.",
  },
};

const TIERS = {
  Foundation: {
    range: '0–34%',
    description: "You're at the start of your AI journey — and you're not alone. Most Irish SMEs are here. Taking this assessment already puts you ahead of the majority. The opportunity is significant; the right starting point matters most.",
    nextStep: "Focus on one workflow — the task the team complains about most — and explore how AI could reduce the manual effort. Don't try to transform everything at once.",
    color: '#E8913A',
  },
  Building: {
    range: '35–64%',
    description: "AI is on your radar and being put to work. The gap is moving from scattered experiments to a structured approach: consistent tools, clear policies, and measurable results.",
    nextStep: "Standardise what's working. Pick the tools, set guidelines for your team, and build AI into repeatable processes rather than leaving it as individual experiments.",
    color: '#2EC4B6',
  },
  Scaling: {
    range: '65–100%',
    description: "You're ahead of the vast majority of Irish SMEs. AI is embedded in your operations. The focus now is governance, compliance readiness, and widening your competitive advantage.",
    nextStep: "The gap is likely governance, not capability. Document your AI usage, formally train the team, and prepare for EU AI Act enforcement in August 2026.",
    color: '#2A4365',
  },
};

const SECTORS = [
  'Accountancy / Finance',
  'Legal / Solicitors',
  'Healthcare / Wellness',
  'Hospitality / Tourism',
  'Retail / E-commerce',
  'Construction / Trades',
  'Consulting / Professional Services',
  'Marketing / Creative',
  'Technology',
  'Other',
];

const SIZES = [
  'Just me (sole trader)',
  '2–10 employees',
  '11–50 employees',
  '51–200 employees',
  '200+ employees',
];

// ─── Scoring ─────────────────────────────────────────────────────────────────

function computeScores(answers) {
  const dimRaw = {};
  DIMENSIONS.forEach(dim => {
    dimRaw[dim.id] = dim.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
  });

  const dimPct = {};
  DIMENSIONS.forEach(dim => {
    dimPct[dim.id] = (dimRaw[dim.id] / 9) * 100;
  });

  const overall = DIMENSIONS.reduce((sum, dim) => sum + dimPct[dim.id] * dim.weight, 0);
  const tier = overall < 35 ? 'Foundation' : overall < 65 ? 'Building' : 'Scaling';

  const sorted = [...DIMENSIONS].sort((a, b) => dimPct[b.id] - dimPct[a.id]);
  const topStrength = sorted[0];
  const priorityGap = sorted[sorted.length - 1];

  return { dimRaw, dimPct, overall, tier, topStrength, priorityGap };
}

// ─── HeroScreen ──────────────────────────────────────────────────────────────

function HeroScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-teal font-semibold text-sm tracking-widest uppercase mb-6">
          Free · 3 Minutes · Instant On-Screen Results
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
          How AI-ready is your business, <em>really</em>?
        </h1>

        <p className="text-slate-300 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
          18 questions across 6 dimensions. Get your AI readiness score and sector benchmark on screen — plus a free toolkit emailed to you at the end.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-12 text-center">
          {[
            { stat: '18', label: 'Questions' },
            { stat: '6', label: 'Dimensions' },
            { stat: '3 min', label: 'Estimated time' },
            { stat: '100%', label: 'Free' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-teal">{stat}</div>
              <div className="text-slate-300 text-sm">{label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="bg-teal text-white font-bold py-4 px-12 rounded-xl hover:opacity-90 transition text-lg"
        >
          Start My Free Assessment
        </button>

        <p className="text-slate-500 text-sm mt-4">No account needed. Results shown instantly. We'll email you a summary and toolkit link at the end.</p>
      </div>
    </div>
  );
}

// ─── Field helper ─────────────────────────────────────────────────────────────

function Field({ label, error, required, children }) {
  return (
    <div>
      <label className="block text-navy font-semibold mb-1">
        {label}{required && <span className="text-amber-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

// ─── LeadScreen ──────────────────────────────────────────────────────────────

function LeadScreen({ lead, setLead, onNext }) {
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!lead.name.trim()) e.name = 'Required';
    if (!lead.email.trim() || !/\S+@\S+\.\S+/.test(lead.email)) e.email = 'Valid email required';
    if (!lead.company.trim()) e.company = 'Required';
    if (!lead.sector) e.sector = 'Please select your sector';
    if (!lead.size) e.size = 'Please select your business size';
    return e;
  }

  function handleNext(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onNext();
  }

  const inputClass = "w-full rounded-xl border-2 border-slate-200 focus:border-teal focus:outline-none p-3 text-navy bg-white";

  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-teal font-semibold text-sm tracking-widest uppercase">Step 1 of 3</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-3 font-serif">
            Tell us about your business
          </h2>
          <p className="text-slate-500">So we can tailor your results to your sector and size.</p>
        </div>

        <form onSubmit={handleNext} className="space-y-6 bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Your Name" error={errors.name} required>
              <input
                type="text"
                value={lead.name}
                onChange={e => setLead({ ...lead, name: e.target.value })}
                className={inputClass}
                placeholder="Jane Smith"
              />
            </Field>
            <Field label="Company Name" error={errors.company} required>
              <input
                type="text"
                value={lead.company}
                onChange={e => setLead({ ...lead, company: e.target.value })}
                className={inputClass}
                placeholder="Acme Ltd"
              />
            </Field>
          </div>

          <Field label="Work Email" error={errors.email} required>
            <input
              type="email"
              value={lead.email}
              onChange={e => setLead({ ...lead, email: e.target.value })}
              className={inputClass}
              placeholder="jane@company.ie"
            />
          </Field>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Sector" error={errors.sector} required>
              <select
                value={lead.sector}
                onChange={e => setLead({ ...lead, sector: e.target.value })}
                className={inputClass}
              >
                <option value="">Select your sector...</option>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Business Size" error={errors.size} required>
              <select
                value={lead.size}
                onChange={e => setLead({ ...lead, size: e.target.value })}
                className={inputClass}
              >
                <option value="">Select size...</option>
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="bg-teal text-white font-bold py-3 px-10 rounded-xl hover:opacity-90 transition"
            >
              Start the Assessment →
            </button>
            <p className="text-slate-400 text-xs mt-3">
              Your answers are used to calculate your score. We'll email you a results summary and toolkit link when you finish.{' '}
              <a href="/privacy" className="underline hover:text-slate-300">Privacy Policy</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── QuizScreen ──────────────────────────────────────────────────────────────

function QuizScreen({ answers, setAnswers, currentDim, setCurrentDim, currentQ, setCurrentQ, onComplete }) {
  const dim = DIMENSIONS[currentDim];
  const question = dim.questions[currentQ];
  const totalQuestions = 18;
  const questionNumber = DIMENSIONS.slice(0, currentDim).reduce((sum, d) => sum + d.questions.length, 0) + currentQ + 1;
  const progress = (questionNumber / totalQuestions) * 100;
  const selectedAnswer = answers[question.id] ?? null;

  function handleSelect(score) {
    setAnswers({ ...answers, [question.id]: score });
  }

  function handleNext() {
    if (selectedAnswer === null) return;
    const isLastQ = currentQ === dim.questions.length - 1;
    const isLastDim = currentDim === DIMENSIONS.length - 1;
    if (isLastQ && isLastDim) {
      onComplete({ ...answers, [question.id]: selectedAnswer });
    } else if (isLastQ) {
      setCurrentDim(currentDim + 1);
      setCurrentQ(0);
    } else {
      setCurrentQ(currentQ + 1);
    }
  }

  function handleBack() {
    if (currentQ > 0) { setCurrentQ(currentQ - 1); return; }
    if (currentDim > 0) {
      setCurrentDim(currentDim - 1);
      setCurrentQ(DIMENSIONS[currentDim - 1].questions.length - 1);
    }
  }

  const isFirst = currentDim === 0 && currentQ === 0;
  const isLast = currentDim === DIMENSIONS.length - 1 && currentQ === dim.questions.length - 1;

  return (
    <div className="min-h-screen bg-off-white flex flex-col px-6 py-12">
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>{dim.label}</span>
          <span>{questionNumber} of {totalQuestions}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-2 mt-3">
          {DIMENSIONS.map((d, i) => (
            <div
              key={d.id}
              className="flex-1 h-1 rounded-full transition-colors"
              style={{
                backgroundColor: i < currentDim ? '#2EC4B6' : i === currentDim ? 'rgba(46,196,182,0.5)' : '#e2e8f0'
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-4">{dim.label}</p>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-8 leading-snug">{question.text}</h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="w-full text-left p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: selectedAnswer === idx ? '#2EC4B6' : 'rgba(100,116,139,0.2)',
                  backgroundColor: selectedAnswer === idx ? 'rgba(46,196,182,0.05)' : 'transparent',
                  color: selectedAnswer === idx ? '#2A4365' : '#475569',
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold mr-3"
                  style={{
                    backgroundColor: selectedAnswer === idx ? '#2EC4B6' : 'rgba(203,213,225,0.5)',
                    color: selectedAnswer === idx ? '#fff' : '#475569',
                  }}
                >
                  {['A', 'B', 'C', 'D'][idx]}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={isFirst}
            className="text-slate-500 hover:text-navy transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-teal text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLast ? 'See My Results →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ResultsScreen ────────────────────────────────────────────────────────────

const CLOUD_FUNCTION_URL = 'https://europe-west1-whatifnow-production.cloudfunctions.net/send-toolkit';
const FORMSPREE_URL = 'https://formspree.io/f/mwvrgqgb';

function ResultsScreen({ lead, answers, scores, setScreen }) {
  const { dimPct, overall, tier, topStrength, priorityGap } = scores;
  const tierData = TIERS[tier];
  const sectorData = SECTOR_DATA[lead.sector] || SECTOR_DATA['Other'];
  const sectorBenchmark = sectorData.benchmark;
  const vsAvg = Math.round(overall) - sectorBenchmark;
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function barColor(pct) {
    if (pct < 35) return '#E8913A';
    if (pct < 65) return '#2EC4B6';
    return '#2A4365';
  }

  async function handleDownload() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const emailPayload = {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        sector: lead.sector,
        size: lead.size,
        overall: Math.round(overall),
        tier,
        topStrength: topStrength.label,
        topStrengthScore: Math.round(dimPct[topStrength.id]),
        priorityGap: priorityGap.label,
        priorityGapScore: Math.round(dimPct[priorityGap.id]),
        quickWin: sectorData.quickWin,
      };

      const formspreePayload = {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        sector: lead.sector,
        size: lead.size,
        overall_score: Math.round(overall),
        tier,
        top_strength: topStrength.label,
        top_strength_score: Math.round(dimPct[topStrength.id]),
        priority_gap: priorityGap.label,
        priority_gap_score: Math.round(dimPct[priorityGap.id]),
        subject: `AI Readiness Assessment — ${lead.company} — ${tier} (${Math.round(overall)}%)`,
        ...Object.fromEntries(
          DIMENSIONS.map(dim => [`score_${dim.id}`, Math.round(dimPct[dim.id])])
        ),
        ...Object.fromEntries(
          DIMENSIONS.flatMap(dim => dim.questions.map(q => [q.id, answers[q.id] ?? '']))
        ),
      };

      const [emailRes, formspreeRes] = await Promise.all([
        fetch(CLOUD_FUNCTION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailPayload),
        }),
        fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formspreePayload),
        }),
      ]);

      if (!emailRes.ok) throw new Error('Failed to send email');
      if (!formspreeRes.ok) throw new Error('Failed to save submission');
      setScreen('sent');
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-off-white min-h-screen pb-24">
      {/* 1. Tier Hero */}
      <div className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #2A4365, #3B5680)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
            Your Result
          </span>
          <div className="text-8xl font-bold mb-2" style={{ color: tierData.color }}>
            {Math.round(overall)}%
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">{tier}</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">{tierData.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-8">

        {/* 2. Score Cards Row */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ borderTop: `4px solid ${tierData.color}` }}>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide mb-2">Overall Score</p>
            <p className="text-5xl font-bold text-navy">{Math.round(overall)}%</p>
            <p className="text-slate-500 text-sm mt-1">{tier}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ borderTop: '4px solid #2EC4B6' }}>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide mb-2">Top Strength</p>
            <p className="text-xl font-bold text-navy">{topStrength.label}</p>
            <p className="text-2xl font-bold" style={{ color: '#2EC4B6' }}>{Math.round(dimPct[topStrength.id])}%</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ borderTop: '4px solid #E8913A' }}>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide mb-2">Priority Gap</p>
            <p className="text-xl font-bold text-navy">{priorityGap.label}</p>
            <p className="text-2xl font-bold" style={{ color: '#E8913A' }}>{Math.round(dimPct[priorityGap.id])}%</p>
          </div>
        </div>

        {/* 3. Benchmark Comparison */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-6">
            How You Compare — {lead.sector || 'Your Sector'}
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-navy">You</span>
                <span className="font-bold text-navy">{Math.round(overall)}%</span>
              </div>
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-navy rounded-full transition-all" style={{ width: `${Math.min(overall, 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Avg. for {lead.sector || 'your sector'}</span>
                <span className="font-semibold text-slate-500">{sectorBenchmark}%</span>
              </div>
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${sectorBenchmark}%`, backgroundColor: 'rgba(46,196,182,0.4)' }} />
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            {vsAvg > 0
              ? `You're ${vsAvg} points ahead of the average ${lead.sector || 'sector'} business.`
              : vsAvg < 0
              ? `You're ${Math.abs(vsAvg)} points behind the average ${lead.sector || 'sector'} business — significant opportunity ahead.`
              : `You're right at the average for ${lead.sector || 'your sector'} businesses.`
            }
            {' '}Based on WIN's assessment of Irish SMEs.
          </p>
        </div>

        {/* 4. Dimension Breakdown */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide mb-6">Dimension Breakdown</p>
          <div className="space-y-4">
            {DIMENSIONS.map(dim => {
              const pct = Math.round(dimPct[dim.id]);
              const isWeakest = dim.id === priorityGap.id;
              return (
                <div key={dim.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-navy flex items-center gap-2 flex-wrap">
                      {dim.label}
                      {dim.id === 'compliance' && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(232,145,58,0.1)', color: '#E8913A' }}>
                          30% weight
                        </span>
                      )}
                      {isWeakest && (
                        <span className="text-xs" style={{ color: '#E8913A' }}>⚠ Priority gap</span>
                      )}
                    </span>
                    <span className="font-bold" style={{ color: barColor(pct) }}>{pct}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: barColor(pct) }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-slate-400 text-xs mt-4">
            Compliance & Risk is weighted at 30% due to EU AI Act enforcement in August 2026.
          </p>
        </div>

        {/* 5. Sector Quick Win */}
        <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ borderLeft: '4px solid #2EC4B6' }}>
          <p className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: '#2EC4B6' }}>
            Quick Win for {lead.sector || 'Your Sector'}
          </p>
          <p className="text-navy leading-relaxed">{sectorData.quickWin}</p>
        </div>

        {/* 6. Compliance Note */}
        <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ borderLeft: '4px solid #E8913A' }}>
          <p className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: '#E8913A' }}>
            Compliance Exposure
          </p>
          <p className="text-navy leading-relaxed">{sectorData.complianceNote}</p>
        </div>

        {/* 7. Where to Focus First */}
        <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ borderLeft: '4px solid #2A4365' }}>
          <p className="font-semibold text-sm uppercase tracking-wide mb-3 text-navy">
            Where to Focus First
          </p>
          <p className="text-navy leading-relaxed">{sectorData.focusFirst}</p>
        </div>

        {/* 8. Tier Next Step */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-slate-500 font-semibold text-sm uppercase tracking-wide mb-3">Your Next Step</p>
          <p className="text-navy text-lg leading-relaxed font-medium">{tierData.nextStep}</p>
        </div>

        {/* 9. CTA Block */}
        <div className="rounded-2xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #2A4365, #3B5680)' }}>
          <h2 className="text-3xl font-bold text-white mb-3 font-serif">
            Take action on your results
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Download your free AI Ready Business Toolkit — practical frameworks to help your team start using AI with confidence.
          </p>
          <button
            onClick={handleDownload}
            disabled={submitting}
            className="inline-block bg-teal text-white font-bold py-4 px-10 rounded-xl hover:opacity-90 transition text-lg mb-2 disabled:opacity-50"
          >
            {submitting ? 'Sending…' : 'Get My Free Toolkit →'}
          </button>
          {submitError && (
            <p className="text-red-400 text-sm mt-1">{submitError}</p>
          )}
          <p className="text-slate-400 text-sm mb-2">We'll email your results and toolkit to <strong className="text-slate-300">{lead.email}</strong>.</p>
          <p className="text-slate-500 text-xs mb-6"><a href="/privacy" className="underline hover:text-slate-400">Privacy Policy</a></p>

          <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-slate-300 mb-4">Want expert guidance on your results?</p>
            <a
              href="/contact?subject=AI Readiness Assessment - Book a Call"
              className="inline-block text-white font-semibold py-3 px-8 rounded-xl transition"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Book a Free 30-Minute Call
            </a>
            <p className="text-slate-500 text-xs mt-2">No obligation. No hard sell.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── SentScreen ───────────────────────────────────────────────────────────────

function SentScreen({ lead }) {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal/10 mb-8">
          <svg className="w-10 h-10 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Check your inbox</h1>
        <p className="text-slate-300 text-lg mb-2 leading-relaxed">
          We've sent your results and toolkit to{' '}
          <strong className="text-white">{lead.email}</strong>.
        </p>
        <p className="text-slate-400 text-sm mb-10">
          Check your spam folder if it doesn't arrive within a minute.
        </p>
        <a
          href="/contact?subject=AI Readiness Assessment - Book a Call"
          className="inline-block bg-teal text-white font-bold py-4 px-10 rounded-xl hover:opacity-90 transition text-lg"
        >
          Book a Free 30-Minute Call
        </a>
        <p className="text-slate-500 text-xs mt-3">No obligation. No hard sell.</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AIReadinessQuiz() {
  const [screen, setScreen] = useState('hero');
  const [lead, setLead] = useState({ name: '', email: '', company: '', sector: '', size: '' });
  const [answers, setAnswers] = useState({});
  const [currentDim, setCurrentDim] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState(null);

  if (screen === 'hero') {
    return <HeroScreen onStart={() => setScreen('lead')} />;
  }

  if (screen === 'lead') {
    return <LeadScreen lead={lead} setLead={setLead} onNext={() => setScreen('quiz')} />;
  }

  if (screen === 'quiz') {
    return (
      <QuizScreen
        answers={answers}
        setAnswers={setAnswers}
        currentDim={currentDim}
        setCurrentDim={setCurrentDim}
        currentQ={currentQ}
        setCurrentQ={setCurrentQ}
        onComplete={(finalAnswers) => {
          const computed = computeScores(finalAnswers);
          setScores(computed);
          setScreen('results');
        }}
      />
    );
  }

  if (screen === 'results') {
    return <ResultsScreen lead={lead} answers={answers} scores={scores} setScreen={setScreen} />;
  }

  if (screen === 'sent') return <SentScreen lead={lead} />;

  return null;
}
