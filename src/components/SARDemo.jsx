import { useState } from "react";

const C = {
  navy: "#2A4365", navyDark: "#1A2D4A", teal: "#2EC4B6", tealDark: "#229E93",
  tealLight: "#E8FAF8", tealSubtle: "#F0FDFC", amber: "#E8913A", amberLight: "#FEF6ED",
  offWhite: "#F2EEE9", white: "#FFFFFF", bg: "#FAFAF8", surface: "#FFFFFF",
  surfaceAlt: "#F7F5F2", border: "#E5E1DC", borderLight: "#EDEBE8",
  charcoal: "#2D3142", slate: "#475569", muted: "#7C8495", dim: "#A0A8B8",
  red: "#DC2626", redLight: "#FEF2F2", green: "#16A34A", greenLight: "#F0FDF4",
  purple: "#7C3AED", purpleLight: "#F5F3FF", blue: "#3B82F6", blueLight: "#EFF6FF",
};

function WinWordmark({ size = 20 }) {
  return <span style={{ fontSize: size, fontWeight: 700, letterSpacing: "-0.03em", fontFamily: "'Inter', system-ui, sans-serif", lineHeight: 1, userSelect: "none" }}><span style={{ color: C.navy }}>what </span><span style={{ color: C.teal }}>if</span><span style={{ color: C.navy }}> now</span></span>;
}
function WinLogo({ size = 32 }) {
  return <svg viewBox="0 0 32 32" width={size} height={size} style={{ flexShrink: 0 }}><circle cx="16" cy="16" r="16" fill="#0B1A2E" /><text x="16" y="22" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="18" fill="#00B4D8">W</text></svg>;
}
function Tag({ children, color = C.teal }) {
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: "4px 12px", borderRadius: 100, background: `${color}12`, color, textTransform: "uppercase" }}>{children}</span>;
}
function Card({ children, style = {} }) {
  return <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", ...style }}>{children}</div>;
}
function AppFrame({ path, children }) {
  return (
    <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 16, background: C.white, boxShadow: "0 4px 24px rgba(42,67,101,0.06)" }}>
      <div style={{ padding: "10px 16px", borderBottom: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: 10, background: C.surfaceAlt }}>
        <div style={{ display: "flex", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF605C" }} /><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD44" }} /><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00CA4E" }} /></div>
        <div style={{ flex: 1, background: C.white, borderRadius: 6, padding: "5px 14px", fontSize: 11, color: C.muted, textAlign: "center", border: `1px solid ${C.borderLight}` }}>app.whatifnow.ie{path ? ` / ${path}` : ""}</div>
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
}
function Field({ label, value }) {
  return <div style={{ marginBottom: 10 }}><div style={{ fontSize: 10, color: C.muted, marginBottom: 4, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</div><div style={{ background: C.surfaceAlt, border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: value ? C.charcoal : C.dim }}>{value || "..."}</div></div>;
}
function Btn({ children, primary, small, color, outline }) {
  const bg = primary ? (color || C.teal) : outline ? "transparent" : C.surfaceAlt;
  const bdr = outline ? (color || C.teal) : primary ? "transparent" : C.border;
  const text = primary ? C.white : outline ? (color || C.teal) : C.charcoal;
  return <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: small ? "6px 14px" : "10px 22px", borderRadius: 8, background: bg, border: `1.5px solid ${bdr}`, color: text, fontSize: small ? 11 : 13, fontWeight: 600, cursor: "default", boxShadow: primary ? "0 2px 8px rgba(46,196,182,0.25)" : "none" }}>{children}</div>;
}
function StatusPill({ status }) {
  const m = { new: { bg: "#EFF6FF", color: "#2563EB", label: "New" }, processing: { bg: "#FFFBEB", color: "#D97706", label: "Processing" }, review: { bg: C.purpleLight, color: C.purple, label: "Awaiting Review" }, complete: { bg: C.greenLight, color: C.green, label: "Complete" }, urgent: { bg: C.redLight, color: C.red, label: "Due in 3 days" } };
  const c = m[status] || m.new;
  return <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 100, background: c.bg, color: c.color }}>{c.label}</span>;
}
function Insight({ children, color = C.teal }) {
  return <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderLeft: `4px solid ${color}`, borderRadius: "0 10px 10px 0", padding: "14px 18px", margin: "14px 0" }}><div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.65 }}>{children}</div></div>;
}
function SectionLabel({ children }) {
  return <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1.5, marginBottom: 8, marginTop: 18, textTransform: "uppercase" }}>{children}</div>;
}

const views = [
  { id: "overview", label: "Overview" }, { id: "onboarding", label: "Onboarding" },
  { id: "dashboard", label: "Dashboard" }, { id: "intake", label: "SAR Intake" },
  { id: "upload", label: "Upload" }, { id: "processing", label: "AI Processing" },
  { id: "review", label: "Review" }, { id: "bundle", label: "Response Bundle" },
  { id: "notifications", label: "Notifications" }, { id: "security", label: "Security & Trust" },
];

function OverviewScreen() {
  const steps = [
    { n: "01", title: "Log the SAR", desc: "Enter the data subject's details. The tool auto-calculates your 30-day deadline.", color: C.teal },
    { n: "02", title: "Upload documents", desc: "Drag and drop — PDFs, emails, spreadsheets, Word documents. Encrypted on upload.", color: C.teal },
    { n: "03", title: "AI processes & redacts", desc: "AI reads every document, identifies third-party personal data, proposes redactions with confidence scores.", color: C.amber },
    { n: "04", title: "You review, adjust & approve", desc: "Accept AI suggestions, add missed redactions manually, adjust boundaries, annotate decisions. You always have the final say.", color: C.amber },
    { n: "05", title: "Download your bundle", desc: "Complete response package: redacted documents, cover letter, redaction log, full audit trail.", color: C.green },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Tag>How it works</Tag>
        <h3 style={{ fontSize: 22, color: C.navy, margin: "14px 0 8px", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>From SAR received to compliant response — in hours, not weeks</h3>
        <p style={{ fontSize: 14, color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>AI handles the heavy lifting. Your team stays in complete control.</p>
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 18, marginBottom: 4 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 44 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${s.color}14`, border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.n}</div>
            {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: C.borderLight, minHeight: 18 }} />}
          </div>
          <div style={{ paddingBottom: 18, flex: 1 }}><div style={{ fontSize: 15, fontWeight: 600, color: C.navy, marginBottom: 3 }}>{s.title}</div><div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{s.desc}</div></div>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
        {[{ value: "< 4 hrs", label: "Average SAR turnaround", sub: "vs 2-4 weeks manually" }, { value: "95%+", label: "AI redaction accuracy", sub: "with human review on top" }, { value: "100%", label: "EU-hosted", sub: "Data never leaves the EU" }].map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "18px 14px", borderRadius: 12, background: C.tealSubtle, border: `1px solid ${C.teal}18` }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.teal, fontFamily: "'DM Serif Display', Georgia, serif" }}>{s.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.navy, marginTop: 4 }}>{s.label}</div><div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OnboardingScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Operational in under five minutes. No IT department required. Sign in with Microsoft or Google.</p>
      <AppFrame path="signup">
        <div style={{ textAlign: "center", marginBottom: 18 }}><WinLogo size={36} /><div style={{ marginTop: 8 }}><WinWordmark size={18} /></div><div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>SAR Processing Tool</div></div>
        <div style={{ maxWidth: 320, margin: "0 auto" }}>
          {["Sign in with Microsoft 365", "Sign in with Google Workspace"].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.white, marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 500, color: C.charcoal }}>{t}</span></div>
          ))}
          <div style={{ textAlign: "center", fontSize: 11, color: C.dim, margin: "12px 0" }}>or continue with email</div>
          <Field label="Work Email" value="jane@threshold.ie" />
          <div style={{ marginTop: 12, textAlign: "center" }}><Btn primary>Create Account</Btn></div>
        </div>
      </AppFrame>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[{ title: "Data Processing Agreement", desc: "Clear summary for your DPO. Accept in one click." }, { title: "Team invitations", desc: "Role-appropriate access for reviewers and admins." }, { title: "Company profile", desc: "Pre-populates SAR cover letters automatically." }].map((item, i) => (
          <Card key={i} style={{ padding: "14px 16px" }}><div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 4 }}>{item.title}</div><div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>{item.desc}</div></Card>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Every active SAR, every deadline, every status — at a glance.</p>
      <AppFrame path="dashboard">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div><div style={{ fontSize: 16, color: C.navy, fontWeight: 600 }}>Welcome back, Jane</div><div style={{ fontSize: 12, color: C.muted }}>Threshold  |  3 active SARs</div></div>
          <Btn primary>+ New SAR</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[{ value: "3", label: "Active", color: C.teal, bg: C.tealLight }, { value: "1", label: "Awaiting review", color: C.purple, bg: C.purpleLight }, { value: "1", label: "Due within 7 days", color: C.red, bg: C.redLight }, { value: "12", label: "Completed (YTD)", color: C.green, bg: C.greenLight }].map((s, i) => (
            <div key={i} style={{ background: s.bg, borderRadius: 10, padding: "14px 12px", textAlign: "center" }}><div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div><div style={{ fontSize: 10, color: C.slate, marginTop: 2, fontWeight: 500 }}>{s.label}</div></div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Active Requests</div>
        {[{ id: "SAR-2026-023", subject: "M. Doyle (Renter / Client)", status: "urgent", deadline: "25 Mar 2026", docs: 34, days: 3 }, { id: "SAR-2026-022", subject: "K. Brennan (Former Employee)", status: "review", deadline: "08 Apr 2026", docs: 47, days: 17 }, { id: "SAR-2026-021", subject: "S. Walsh (Service User)", status: "processing", deadline: "14 Apr 2026", docs: 18, days: 23 }].map((sar, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 10, marginBottom: 6, background: i === 0 ? C.redLight : C.white, border: `1px solid ${i === 0 ? `${C.red}25` : C.borderLight}` }}>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>{sar.id}: {sar.subject}</div><div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>Deadline: {sar.deadline}  |  {sar.docs} docs  |  <span style={{ color: sar.days <= 7 ? C.red : C.slate, fontWeight: sar.days <= 7 ? 700 : 400 }}>{sar.days} days left</span></div></div>
            <StatusPill status={sar.status} />
          </div>
        ))}
      </AppFrame>
    </div>
  );
}

function IntakeScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Log it in the system. The 30-day clock starts automatically.</p>
      <AppFrame path="sar / new">
        <div style={{ fontSize: 16, color: C.navy, fontWeight: 600, marginBottom: 14 }}>Log a new SAR</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}><Field label="Data Subject Name" value="Margaret Doyle" /><Field label="Email" value="m.doyle@gmail.com" /><Field label="Relationship" value="Renter / Client" /><Field label="Date Received" value="22 March 2026" /></div>
        <Field label="Request Description" value="Full copy of all personal data held by Threshold including case notes, correspondence, and advice records." />
        <div style={{ background: C.amberLight, border: `1px solid ${C.amber}30`, borderRadius: 10, padding: "14px 18px", margin: "14px 0" }}>
          <div style={{ fontSize: 10, color: C.amber, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Deadline auto-calculated</div>
          <div style={{ fontSize: 15, color: C.navy, marginTop: 6, fontWeight: 600 }}>Response due by: 21 April 2026</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>30 calendar days. Extension available for complex requests.</div>
        </div>
        <Btn primary>Create SAR</Btn>
      </AppFrame>
    </div>
  );
}

function UploadScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Gather documents and upload securely. The tool guides what to look for.</p>
      <AppFrame path="sar / SAR-2026-023 / upload">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div><div style={{ fontSize: 14, color: C.navy, fontWeight: 600 }}>SAR-2026-023: M. Doyle</div><div style={{ fontSize: 11, color: C.muted }}>Renter / Client  |  Deadline: 25 Mar 2026</div></div>
          <StatusPill status="new" />
        </div>
        <div style={{ border: `2px dashed ${C.teal}50`, borderRadius: 12, padding: "28px 18px", textAlign: "center", background: C.tealSubtle, marginBottom: 14 }}>
          <div style={{ fontSize: 28, color: C.teal, marginBottom: 6 }}>+</div>
          <div style={{ fontSize: 14, color: C.teal, fontWeight: 600 }}>Drop files here or click to browse</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>PDF, DOCX, CSV, EML, MSG  |  Encrypted in transit and at rest</div>
        </div>
        {[{ name: "Case_Notes_Doyle.pdf", size: "1.8 MB", ok: true }, { name: "Email_Correspondence.eml", size: "4.2 MB", ok: true }, { name: "RTB_Records.pdf", size: "890 KB", ok: true }, { name: "Advice_Notes.docx", size: "240 KB", ok: false }].map((f, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: C.surfaceAlt, border: `1px solid ${C.borderLight}`, marginBottom: 4 }}>
            <div><div style={{ fontSize: 12, color: C.charcoal, fontWeight: 500 }}>{f.name}</div><div style={{ fontSize: 10, color: C.dim }}>{f.size}</div></div>
            <div style={{ fontSize: 11, color: f.ok ? C.green : C.amber, fontWeight: 600 }}>{f.ok ? "✓ Encrypted" : "Uploading..."}</div>
          </div>
        ))}
        <div style={{ marginTop: 14, display: "flex", gap: 10 }}><Btn primary>Start AI Processing</Btn><Btn outline>Save as Draft</Btn></div>
      </AppFrame>
    </div>
  );
}

function ProcessingScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Processing runs in the background. You will be notified when review is ready.</p>
      <AppFrame path="sar / SAR-2026-023 / processing">
        <div style={{ fontSize: 14, color: C.navy, fontWeight: 600, marginBottom: 14 }}>Processing: SAR-2026-023</div>
        <div style={{ background: C.tealSubtle, borderRadius: 10, padding: "16px 18px", marginBottom: 14, border: `1px solid ${C.teal}20` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>AI Analysis in Progress</span><span style={{ fontSize: 12, color: C.navy, fontWeight: 600 }}>6 of 8 documents</span></div>
          <div style={{ height: 8, background: `${C.teal}20`, borderRadius: 4, overflow: "hidden" }}><div style={{ width: "75%", height: "100%", background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal})`, borderRadius: 4 }} /></div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>~8 minutes remaining</div>
        </div>
        {[{ name: "Case_Notes_Doyle.pdf", s: "done", e: "28 entities | 11 redactions" }, { name: "Email_Correspondence.eml", s: "done", e: "67 entities | 34 redactions" }, { name: "RTB_Records.pdf", s: "active", e: null }, { name: "Advice_Notes.docx", s: "queued", e: null }].map((d, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 8, marginBottom: 4, border: `1px solid ${d.s === "active" ? `${C.amber}30` : C.borderLight}`, background: d.s === "active" ? C.amberLight : C.white }}>
            <div><div style={{ fontSize: 12, color: C.charcoal, fontWeight: 500 }}>{d.name}</div>{d.e && <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{d.e}</div>}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: d.s === "done" ? C.green : d.s === "active" ? C.amber : C.dim }}>{d.s === "done" ? "✓ Complete" : d.s === "active" ? "Analysing..." : "Queued"}</div>
          </div>
        ))}
      </AppFrame>
    </div>
  );
}

function ReviewScreen() {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>
        The heart of the tool. Review AI redactions, <strong style={{ color: C.navy }}>add ones the AI missed</strong>, adjust boundaries, and annotate decisions. You always have the final say.
      </p>
      <AppFrame path="sar / SAR-2026-023 / review">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>Reviewing: Case_Notes_Doyle.pdf</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 11, color: C.muted }}>Doc 1 of 8</div>
            <div style={{ background: C.tealLight, borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600, color: C.teal }}>11 AI + 2 Manual</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, padding: "10px 14px", background: C.blueLight, borderRadius: 8, border: `1px solid ${C.blue}25`, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, flexShrink: 0 }} />
          <div style={{ fontSize: 12, color: C.charcoal, flex: 1 }}><strong>Manual mode active:</strong> Select any text in the original to add a redaction</div>
          <Btn small primary color={C.green}>Accept All High-Confidence</Btn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          <div style={{ background: C.surfaceAlt, borderRadius: 8, padding: 14, border: `1px solid ${C.borderLight}`, position: "relative" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Original — select text to redact</div>
            <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.9 }}>
              ...case opened by{" "}
              <span style={{ background: "#FEE2E2", padding: "2px 4px", borderRadius: 3, fontWeight: 600 }}>Aoife Ryan</span>{" "}
              on 14 January 2026. Client Margaret Doyle was advised by{" "}
              <span style={{ background: "#FEE2E2", padding: "2px 4px", borderRadius: 3, fontWeight: 600 }}>Aoife</span>{" "}
              to contact the RTB regarding notice period. Landlord{" "}
              <span style={{ background: "#FEE2E2", padding: "2px 4px", borderRadius: 3, fontWeight: 600 }}>Patrick Hennessy</span>{" "}
              had issued a notice of termination.{" "}
              <span onClick={() => setShowPopover(!showPopover)} style={{ background: showPopover ? "#DBEAFE" : "transparent", padding: "2px 4px", borderRadius: 3, cursor: "pointer", borderBottom: showPopover ? `2px solid ${C.blue}` : "none", transition: "all 0.15s" }}>The family upstairs in unit 4B</span>{" "}
              had also received a similar notice.
            </div>

            {showPopover && (
              <div style={{ marginTop: 12, background: C.white, borderRadius: 10, border: `2px solid ${C.blue}`, padding: 14, boxShadow: "0 8px 32px rgba(42,67,101,0.12)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Add manual redaction</div>
                <div style={{ fontSize: 12, color: C.charcoal, marginBottom: 10, padding: "8px 12px", background: C.blueLight, borderRadius: 6, border: `1px solid #BFDBFE` }}>
                  Selected: <strong>"The family upstairs in unit 4B"</strong>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 4 }}>CATEGORY</div>
                    <div style={{ background: C.surfaceAlt, border: `1px solid ${C.borderLight}`, borderRadius: 6, padding: "8px 10px", fontSize: 11, color: C.charcoal }}>Third-party PII  ▾</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 4 }}>NOTE (OPTIONAL)</div>
                    <div style={{ background: C.surfaceAlt, border: `1px solid ${C.borderLight}`, borderRadius: 6, padding: "8px 10px", fontSize: 11, color: C.slate }}>Contextual ID — identifies other tenants</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <Btn small outline color={C.muted}>Cancel</Btn>
                  <Btn small primary>Add Redaction</Btn>
                </div>
              </div>
            )}
          </div>

          <div style={{ background: C.white, borderRadius: 8, padding: 14, border: `1.5px solid ${C.teal}30` }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.teal, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Redacted Preview</div>
            <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.9 }}>
              ...case opened by <span style={{ background: C.navy, color: C.navy, padding: "2px 8px", borderRadius: 3, fontSize: 10 }}>REDACTED</span> on 14 January 2026. Client Margaret Doyle was advised by <span style={{ background: C.navy, color: C.navy, padding: "2px 8px", borderRadius: 3, fontSize: 10 }}>REDACTED</span> to contact the RTB regarding notice period. Landlord <span style={{ background: C.navy, color: C.navy, padding: "2px 8px", borderRadius: 3, fontSize: 10 }}>REDACTED</span> had issued a notice of termination. {showPopover ? <span style={{ background: C.blue, color: C.blue, padding: "2px 8px", borderRadius: 3, fontSize: 10 }}>REDACTED</span> : "The family upstairs in unit 4B"} had also received a similar notice.
            </div>
          </div>
        </div>

        <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>All Redactions</div>

        {[
          { entity: "Aoife Ryan", type: "Staff member", conf: 98, src: "ai" },
          { entity: "Patrick Hennessy", type: "Third party (landlord)", conf: 96, src: "ai" },
          { entity: "aoife.ryan@threshold.ie", type: "Staff email", conf: 99, src: "ai" },
          { entity: "the other tenant in unit 4B", type: "Contextual identifier", conf: 74, src: "ai" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 4, border: `1px solid ${r.conf < 80 ? `${C.amber}40` : C.borderLight}`, background: r.conf < 80 ? C.amberLight : C.white }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, background: r.conf >= 95 ? C.greenLight : r.conf >= 80 ? C.tealLight : C.amberLight, color: r.conf >= 95 ? C.green : r.conf >= 80 ? C.teal : C.amber }}>{r.conf}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>{r.entity}</div><div style={{ fontSize: 11, color: C.muted }}>{r.type}</div></div>
            <div style={{ display: "flex", gap: 6 }}><Btn small primary>Accept</Btn><Btn small outline>Reject</Btn></div>
          </div>
        ))}

        {[
          { entity: "her social worker from Tusla", type: "Third-party PII", note: "Identifies professional by role" },
          { entity: "14 Clanbrassil St, Apt 3", type: "Third-party PII", note: "Landlord address — identifies individual combined with name" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 4, border: `1.5px solid ${C.blue}35`, background: C.blueLight }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, flexShrink: 0, background: "#DBEAFE", color: C.blue, letterSpacing: 0.3 }}>Manual</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>{r.entity}</span>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1, padding: "2px 6px", borderRadius: 3, background: "#DBEAFE", color: C.blue }}>MANUAL</span>
              </div>
              <div style={{ fontSize: 11, color: C.muted }}>{r.type}</div>
              <div style={{ fontSize: 10, color: C.slate, marginTop: 2, fontStyle: "italic" }}>Note: {r.note}</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}><Btn small outline>Edit</Btn><Btn small outline color={C.red}>Remove</Btn></div>
          </div>
        ))}

        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between" }}>
          <Btn outline>Previous Document</Btn>
          <Btn primary>Next Document</Btn>
        </div>
      </AppFrame>

      <SectionLabel>Review capabilities</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { title: "Add missed redactions", desc: "Select text to create a manual redaction. Choose a category and add notes explaining your reasoning.", color: C.blue },
          { title: "Adjust boundaries", desc: "Expand a redaction to capture the wider context — 'Patrick Hennessy' becomes 'Patrick Hennessy, the landlord at 14 Clanbrassil Street'.", color: C.teal },
          { title: "Entity grouping", desc: "Accept 'Aoife Ryan' once and it applies across all 8 documents. One decision, everywhere.", color: C.green },
          { title: "Full audit trail", desc: "AI and manual decisions logged separately with reviewer identity, timestamp, category, and notes. Ready for DPC inspection.", color: C.navy },
        ].map((item, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${item.color}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>{item.desc}</div>
          </Card>
        ))}
      </div>
      <Insight><strong>Try it:</strong> Click <strong>"The family upstairs in unit 4B"</strong> in the original text above to see the manual redaction workflow in action.</Insight>
    </div>
  );
}

function BundleScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Professional response package, ready to send. No additional formatting needed.</p>
      <AppFrame path="sar / SAR-2026-023 / complete">
        <div style={{ textAlign: "center", padding: "16px 0 20px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: C.green, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 18, color: C.green, fontWeight: 700 }}>SAR-2026-023 Complete</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>45 AI + 8 manual redactions  |  Completed 3 days before deadline</div>
        </div>
        {[{ name: "Complete_Bundle.zip", desc: "Everything below in one download", size: "3.8 MB", primary: true }, { name: "Redacted_Documents.pdf", desc: "All documents with redactions applied", size: "2.9 MB" }, { name: "Cover_Letter.pdf", desc: "Pre-drafted response citing GDPR articles", size: "48 KB" }, { name: "Redaction_Log.pdf", desc: "AI and manual decisions with reviewer notes", size: "95 KB" }, { name: "Audit_Trail.pdf", desc: "Complete timeline with identity and timestamps", size: "72 KB" }].map((f, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 8, marginBottom: 4, border: `1px solid ${f.primary ? `${C.teal}35` : C.borderLight}`, background: f.primary ? C.tealSubtle : C.white }}>
            <div><div style={{ fontSize: 12, color: C.navy, fontWeight: f.primary ? 700 : 500 }}>{f.name}</div><div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{f.desc}  |  {f.size}</div></div>
            <Btn small primary={f.primary}>{f.primary ? "Download All" : "Download"}</Btn>
          </div>
        ))}
      </AppFrame>
    </div>
  );
}

function NotificationsScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Escalating alerts ensure you never miss a 30-day deadline.</p>
      {[{ trigger: "New SAR received", channel: "Email + In-app", color: C.teal }, { trigger: "AI processing complete", channel: "Email + In-app", color: C.teal }, { trigger: "14 days remaining", channel: "In-app", color: C.teal }, { trigger: "7 days remaining", channel: "Email + In-app (daily)", color: C.amber }, { trigger: "3 days remaining", channel: "Email + In-app + SMS (daily)", color: C.red }, { trigger: "Deadline missed", channel: "Email + In-app (immediate)", color: C.red }, { trigger: "Review completed", channel: "Email + In-app", color: C.green }, { trigger: "Monthly summary", channel: "Email (1st of month)", color: C.navy }].map((n, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 8, marginBottom: 4, background: C.white, border: `1px solid ${C.borderLight}`, borderLeft: `4px solid ${n.color}` }}>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.navy }}>{n.trigger}</div>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 500 }}>{n.channel}</div>
        </div>
      ))}
    </div>
  );
}

function SecurityScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Built for organisations that handle sensitive personal data from vulnerable individuals.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {[{ title: "EU-hosted infrastructure", desc: "Google Cloud, Belgium/Netherlands. Data never crosses the Atlantic." }, { title: "AES-256 encryption", desc: "Encrypted at rest and in transit. Customer-managed keys available." }, { title: "No AI training on your data", desc: "Contractual guarantee. Not just a promise." }, { title: "VPC security perimeter", desc: "Locked-down Virtual Private Cloud. No exfiltration path exists." }, { title: "Full audit trail", desc: "AI decisions and manual reviewer actions logged with identity and timestamps." }, { title: "Configurable retention", desc: "Choose 30, 60, or 90-day retention. Documents permanently purged after expiry." }].map((s, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${C.teal}` }}><div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 4 }}>{s.title}</div><div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{s.desc}</div></Card>
        ))}
      </div>
      <div style={{ background: C.navy, borderRadius: 12, padding: "22px 24px", color: C.white }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.teal, marginBottom: 8, textTransform: "uppercase" }}>Compliance architecture</div>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: "#CBD5E1" }}>
          <strong style={{ color: C.white }}>Data controller:</strong> Your organisation.<br />
          <strong style={{ color: C.white }}>Data processor:</strong> What If Now (operating the tool).<br />
          <strong style={{ color: C.white }}>Sub-processors:</strong> Google Cloud (infrastructure) + Anthropic (AI, via Vertex AI).<br />
          All covered by Data Processing Agreements. All processing within the EU.
        </div>
      </div>
    </div>
  );
}

export default function SARDemo() {
  const [activeView, setActiveView] = useState("overview");
  const map = { overview: OverviewScreen, onboarding: OnboardingScreen, dashboard: DashboardScreen, intake: IntakeScreen, upload: UploadScreen, processing: ProcessingScreen, review: ReviewScreen, bundle: BundleScreen, notifications: NotificationsScreen, security: SecurityScreen };
  const Comp = map[activeView] || OverviewScreen;
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: C.bg, color: C.charcoal, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=Inter:wght@700&display=swap" rel="stylesheet" />
      <style>{`.dn::-webkit-scrollbar{display:none}@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.df{animation:fu .3s ease-out}`}</style>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "16px 22px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}><WinLogo size={30} /><WinWordmark size={18} /><div style={{ flex: 1 }} /><Tag color={C.navy}>Product Preview</Tag></div>
        <h1 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 4px", fontFamily: "'DM Serif Display', Georgia, serif", color: C.navy }}>AI-Powered SAR Processing</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>GDPR Subject Access Request compliance — faster, cheaper, more accurate</p>
      </div>
      <div className="dn" style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${C.border}`, background: C.white, padding: "0 22px" }}>
        {views.map(v => <button key={v.id} onClick={() => setActiveView(v.id)} style={{ all: "unset", cursor: "pointer", padding: "12px 16px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", color: activeView === v.id ? C.navy : C.muted, borderBottom: activeView === v.id ? `2.5px solid ${C.teal}` : "2.5px solid transparent", transition: "all 0.15s" }}>{v.label}</button>)}
      </div>
      <div key={activeView} className="df" style={{ padding: "24px 22px", maxHeight: "calc(100vh - 155px)", overflowY: "auto" }}><Comp /></div>
    </div>
  );
}
