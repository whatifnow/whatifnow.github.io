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
        <div style={{ flex: 1, background: C.white, borderRadius: 6, padding: "5px 14px", fontSize: 11, color: C.muted, textAlign: "center", border: `1px solid ${C.borderLight}` }}>precedent.whatifnow.ie{path ? ` / ${path}` : ""}</div>
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
}
function Btn({ children, primary, small, color, outline }) {
  const bg = primary ? (color || C.teal) : outline ? "transparent" : C.surfaceAlt;
  const bdr = outline ? (color || C.teal) : primary ? "transparent" : C.border;
  const text = primary ? C.white : outline ? (color || C.teal) : C.charcoal;
  return <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: small ? "6px 14px" : "10px 22px", borderRadius: 8, background: bg, border: `1.5px solid ${bdr}`, color: text, fontSize: small ? 11 : 13, fontWeight: 600, cursor: "default", boxShadow: primary ? "0 2px 8px rgba(46,196,182,0.25)" : "none" }}>{children}</div>;
}
function Insight({ children, color = C.teal }) {
  return <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderLeft: `4px solid ${color}`, borderRadius: "0 10px 10px 0", padding: "14px 18px", margin: "14px 0" }}><div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.65 }}>{children}</div></div>;
}
function ConfBadge({ score }) {
  const c = score >= 90 ? C.green : score >= 75 ? C.teal : C.amber;
  const bg = score >= 90 ? C.greenLight : score >= 75 ? C.tealLight : C.amberLight;
  return <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, background: bg, color: c }}>{score}</div>;
}
function MiniBar({ pct, color = C.teal }) {
  return <div style={{ height: 6, background: `${color}20`, borderRadius: 3, overflow: "hidden", flex: 1 }}><div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} /></div>;
}

const views = [
  { id: "overview", label: "Overview" },
  { id: "search", label: "Search" },
  { id: "results", label: "Results" },
  { id: "detail", label: "Decision" },
  { id: "benchmarks", label: "Benchmarks" },
  { id: "dashboard", label: "Dashboard" },
  { id: "security", label: "Security" },
];

function OverviewScreen() {
  const steps = [
    { n: "01", title: "Describe your case", desc: "Type a plain-English description of the tenant's situation. No legal jargon needed.", color: C.teal },
    { n: "02", title: "AI searches 40,000+ decisions", desc: "Semantic search finds the most relevant RTB adjudications and tribunal reports from the full published corpus.", color: C.teal },
    { n: "03", title: "Get precedent analysis", desc: "AI summarises typical outcomes, damages ranges, and key reasoning patterns from similar cases.", color: C.amber },
    { n: "04", title: "Review cited decisions", desc: "Every claim is backed by specific RTB reference numbers. Drill into any decision to read the full text.", color: C.amber },
    { n: "05", title: "Build your case", desc: "Get suggested questions, evidence checklists, and red flags tailored to the case type.", color: C.green },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Tag>How it works</Tag>
        <h3 style={{ fontSize: 22, color: C.navy, margin: "14px 0 8px", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }}>From case description to evidence-based advice — in seconds</h3>
        <p style={{ fontSize: 14, color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>AI searches every published RTB decision. You stay in complete control.</p>
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
        {[{ value: "40,000+", label: "RTB decisions indexed", sub: "2004 to present" }, { value: "< 8 sec", label: "Average query time", sub: "Search + AI analysis" }, { value: "100%", label: "EU-hosted", sub: "Google Cloud, Frankfurt" }].map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "18px 14px", borderRadius: 12, background: C.tealSubtle, border: `1px solid ${C.teal}18` }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.teal, fontFamily: "'DM Serif Display', Georgia, serif" }}>{s.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.navy, marginTop: 4 }}>{s.label}</div><div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Describe the case in plain English. The AI finds the most relevant precedents.</p>
      <AppFrame path="search">
        <div style={{ fontSize: 16, color: C.navy, fontWeight: 600, marginBottom: 14 }}>Search RTB precedents</div>
        <div style={{ border: `2px solid ${C.teal}`, borderRadius: 12, padding: 16, marginBottom: 16, background: C.tealSubtle }}>
          <div style={{ fontSize: 10, color: C.teal, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Describe the case</div>
          <div style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.7 }}>Tenant received a notice of termination. Landlord claims they are selling the property. Tenant has been in the property for 4 years. The notice only gave 90 days. The tenant believes this is not enough notice and wants to know their rights.</div>
        </div>
        <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 10, textTransform: "uppercase" }}>Filter by dispute type</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {["All types", "Notice of termination", "Unlawful termination", "Deposit retention", "Rent / RPZ", "Standards"].map((f, i) => (
            <div key={i} style={{ padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 500, background: i <= 1 ? C.teal : C.surfaceAlt, color: i <= 1 ? C.white : C.slate, border: `1px solid ${i <= 1 ? C.teal : C.border}` }}>{f}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 4 }}>Year range</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ background: C.surfaceAlt, border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.charcoal, flex: 1 }}>2020</div>
              <div style={{ fontSize: 12, color: C.dim, display: "flex", alignItems: "center" }}>to</div>
              <div style={{ background: C.surfaceAlt, border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.charcoal, flex: 1 }}>2026</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, marginBottom: 4 }}>Applicant role</div>
            <div style={{ background: C.surfaceAlt, border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.charcoal }}>Tenant (default)</div>
          </div>
        </div>
        <Btn primary>Search precedents</Btn>
      </AppFrame>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { title: "Natural language", desc: "No legal jargon needed. Describe the situation as a tenant would describe it to you." },
          { title: "Semantic matching", desc: "AI understands meaning, not just keywords. 'Kicked out' matches 'unlawful termination'." },
          { title: "Smart filters", desc: "Narrow by dispute type, year, party role, or outcome. Combine filters freely." },
          { title: "Instant results", desc: "Searches 40,000+ decisions in under 3 seconds. Analysis generated in 5-8 seconds." },
        ].map((item, i) => (
          <Card key={i} style={{ padding: "14px 16px" }}><div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 4 }}>{item.title}</div><div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>{item.desc}</div></Card>
        ))}
      </div>
    </div>
  );
}

function ResultsScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>AI analysis with cited precedents. Every claim is backed by a specific RTB decision.</p>
      <AppFrame path="search / results">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div><div style={{ fontSize: 14, color: C.navy, fontWeight: 600 }}>Results: Notice of termination — sale of property</div><div style={{ fontSize: 11, color: C.muted }}>47 relevant decisions found  |  Analysis generated in 6.2s</div></div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn small outline>Save search</Btn>
            <Btn small outline>Export</Btn>
          </div>
        </div>

        <div style={{ background: C.tealSubtle, border: `1px solid ${C.teal}20`, borderRadius: 12, padding: "18px 20px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} />
            <div style={{ fontSize: 10, fontWeight: 700, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>AI analysis — strong precedent (47 comparable decisions)</div>
          </div>
          <div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 10px" }}>For a tenancy of <strong>4 years</strong>, the required notice period under the Residential Tenancies Act is <strong>180 days</strong> (Section 66, Table 1, as amended). A 90-day notice is <strong>significantly short</strong> of the statutory requirement and is likely to be found invalid.</p>
            <p style={{ margin: "0 0 10px" }}>Across 47 comparable decisions involving sale-of-property terminations (2020–2026), the RTB has <strong>consistently upheld tenant claims</strong> where the notice period was below the statutory minimum.</p>
            <p style={{ margin: "0 0 10px" }}><strong>Typical damages range:</strong> €2,000 – €7,500 (median €3,750 across 23 cases where damages were awarded).</p>
            <p style={{ margin: 0, color: C.muted, fontStyle: "italic", fontSize: 12 }}>This is legal information for research purposes, not legal advice. Outcomes depend on the specific facts and evidence presented.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div style={{ background: C.amberLight, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.amber}20` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.amber, letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>Suggested questions</div>
            <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.7 }}>
              1. Has the property been listed for sale?<br />
              2. Was a statutory declaration provided?<br />
              3. Is the landlord's claimed reason genuine?<br />
              4. Has the tenant received a valid NoT before?
            </div>
          </div>
          <div style={{ background: C.redLight, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.red}20` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.red, letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>Red flags to investigate</div>
            <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.7 }}>
              1. 90-day notice is 90 days short of the 180-day requirement<br />
              2. Check if property was re-let after the "sale"<br />
              3. Landlord may owe damages for invalid notice<br />
              4. Tenant may be entitled to remain
            </div>
          </div>
        </div>

        <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Most relevant decisions</div>

        {[
          { ref: "TR-2024-0847", date: "14 Mar 2024", parties: "Walsh v. Kennedy", type: "Notice of termination", outcome: "Upheld", damages: "€3,500", similarity: 94, summary: "120-day notice found invalid for 5-year tenancy. Landlord failed to provide statutory declaration. Tenant awarded damages for unlawful termination." },
          { ref: "TR-2023-1203", date: "22 Nov 2023", parties: "O'Brien v. Park Developments Ltd", type: "Unlawful termination", outcome: "Upheld", damages: "€5,000", summary: "90-day notice for sale of property. 6-year tenancy required 180 days. Property re-let at higher rent within 6 months — bad faith finding.", similarity: 91 },
          { ref: "TR-2025-0156", date: "3 Feb 2025", parties: "Kavanagh v. Murphy", type: "Notice of termination", outcome: "Partially upheld", damages: "€2,200", summary: "Notice period 30 days short. Landlord did eventually sell. Damages reduced due to genuine intent but procedural failure.", similarity: 88 },
          { ref: "TR-2024-0512", date: "18 Jul 2024", parties: "Byrne v. Clúid Housing", type: "Notice of termination", outcome: "Dismissed", damages: "€0", summary: "AHB provided correct 224-day notice for renovation. Statutory declaration filed. Tenant's claim of insufficient notice dismissed.", similarity: 72 },
        ].map((d, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 10, marginBottom: 6, border: `1px solid ${C.borderLight}`, background: C.white }}>
            <ConfBadge score={d.similarity} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>{d.ref}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>{d.parties}</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: d.outcome === "Upheld" ? C.greenLight : d.outcome === "Dismissed" ? C.redLight : C.amberLight, color: d.outcome === "Upheld" ? C.green : d.outcome === "Dismissed" ? C.red : C.amber }}>{d.outcome}</span>
                  {d.damages !== "€0" && <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: C.blueLight, color: C.blue }}>{d.damages}</span>}
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 4 }}>{d.summary}</div>
              <div style={{ display: "flex", gap: 12, fontSize: 10, color: C.dim }}>
                <span>{d.date}</span>
                <span>{d.type}</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Btn small outline>Show 43 more decisions</Btn>
        </div>
      </AppFrame>
    </div>
  );
}

function DetailScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Full decision text with key findings highlighted. Drill into any precedent from search results.</p>
      <AppFrame path="decisions / TR-2024-0847">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 18, color: C.navy, fontWeight: 600 }}>TR-2024-0847</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Walsh v. Kennedy  |  14 March 2024</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn small outline>Bookmark</Btn>
            <Btn small outline>Print</Btn>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Outcome", value: "Upheld", color: C.green, bg: C.greenLight },
            { label: "Damages", value: "€3,500", color: C.blue, bg: C.blueLight },
            { label: "Type", value: "Tribunal", color: C.navy, bg: `${C.navy}10` },
            { label: "Tenancy", value: "5 years", color: C.slate, bg: C.surfaceAlt },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <Card style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Parties</div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.charcoal }}>
              <strong>Applicant (Tenant):</strong> Sarah Walsh<br />
              <strong>Respondent (Landlord):</strong> Patrick Kennedy
            </div>
          </Card>
          <Card style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Damages breakdown</div>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: C.charcoal }}>
              Compensation: €2,500<br />
              Deposit return: €1,000<br />
              <strong>Total: €3,500</strong>
            </div>
          </Card>
        </div>

        <div style={{ background: C.tealSubtle, borderRadius: 10, padding: "16px 18px", marginBottom: 16, border: `1px solid ${C.teal}20` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.teal, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Key findings</div>
          <div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.7 }}>The Tribunal found that the landlord issued a notice of termination with 120 days' notice for a tenancy of 5 years' duration. The statutory requirement under Section 66 of the Residential Tenancies Act is 180 days. The notice was therefore invalid. The landlord failed to provide a statutory declaration as required. The Tribunal was not satisfied that the landlord had demonstrated a genuine intention to sell.</div>
        </div>

        <div style={{ background: C.surfaceAlt, borderRadius: 10, padding: "16px 18px", marginBottom: 16, border: `1px solid ${C.borderLight}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.slate, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Tribunal reasoning</div>
          <div style={{ fontSize: 13, color: C.charcoal, lineHeight: 1.7 }}>The Tribunal considered the landlord's claim that the property was to be sold. No evidence of listing, valuation, or engagement with an estate agent was presented. The tenant had been in occupation for five years and had complied with all obligations. The notice period fell 60 days short of the statutory minimum. The Tribunal determined that the termination was invalid on procedural grounds and awarded the tenant €2,500 in compensation for the distress and inconvenience caused, plus the return of the €1,000 deposit.</div>
        </div>

        <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Legal provisions cited</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {["Section 34", "Section 66 (Table 1)", "Section 35(3)", "Section 62"].map((s, i) => (
            <span key={i} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, background: C.blueLight, color: C.blue, fontWeight: 500 }}>{s}</span>
          ))}
        </div>

        <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Similar decisions</div>
        {[
          { ref: "TR-2023-1203", parties: "O'Brien v. Park Developments", outcome: "Upheld", damages: "€5,000", similarity: 91 },
          { ref: "TR-2025-0156", parties: "Kavanagh v. Murphy", outcome: "Partially upheld", damages: "€2,200", similarity: 88 },
          { ref: "TR-2024-0291", parties: "Nguyen v. Smith Properties", outcome: "Upheld", damages: "€4,100", similarity: 85 },
        ].map((d, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, marginBottom: 4, border: `1px solid ${C.borderLight}`, background: C.white }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ConfBadge score={d.similarity} />
              <div><div style={{ fontSize: 12, color: C.navy, fontWeight: 600 }}>{d.ref}</div><div style={{ fontSize: 11, color: C.muted }}>{d.parties}</div></div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: d.outcome === "Upheld" ? C.greenLight : C.amberLight, color: d.outcome === "Upheld" ? C.green : C.amber }}>{d.outcome}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: C.blueLight, color: C.blue }}>{d.damages}</span>
            </div>
          </div>
        ))}
      </AppFrame>
    </div>
  );
}

function BenchmarksScreen() {
  const categories = [
    { name: "Notice of termination", count: 8420, upheld: 68, min: 500, median: 3750, max: 15000, avg: 4200 },
    { name: "Deposit retention", count: 6890, upheld: 74, min: 200, median: 1200, max: 8500, avg: 1650 },
    { name: "Unlawful termination", count: 4210, upheld: 71, min: 1000, median: 5500, max: 28000, avg: 6800 },
    { name: "Standards & maintenance", count: 3950, upheld: 62, min: 250, median: 2000, max: 12000, avg: 2800 },
    { name: "Rent / RPZ breach", count: 2180, upheld: 58, min: 500, median: 3200, max: 18000, avg: 4100 },
    { name: "Overholding", count: 1840, upheld: 81, min: 800, median: 4500, max: 22000, avg: 5600 },
  ];
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Damages benchmarking across the full RTB corpus. Know what similar cases have been awarded.</p>
      <AppFrame path="benchmarks">
        <div style={{ fontSize: 14, color: C.navy, fontWeight: 600, marginBottom: 14 }}>Damages benchmarks by dispute type</div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>Based on 40,000+ published RTB decisions (2004–2026)</div>

        {categories.map((cat, i) => (
          <div key={i} style={{ padding: "14px 16px", borderRadius: 10, marginBottom: 8, border: `1px solid ${C.borderLight}`, background: i % 2 === 0 ? C.white : C.surfaceAlt }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>{cat.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{cat.count.toLocaleString()} decisions</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MiniBar pct={cat.upheld} color={C.green} />
                <span style={{ fontSize: 11, fontWeight: 600, color: C.green, minWidth: 32, textAlign: "right" }}>{cat.upheld}%</span>
                <span style={{ fontSize: 10, color: C.muted }}>upheld</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
              <div style={{ fontSize: 10, color: C.dim, minWidth: 52, textAlign: "right", paddingRight: 8 }}>€{cat.min.toLocaleString()}</div>
              <div style={{ flex: 1, position: "relative", height: 24, background: `${C.teal}10`, borderRadius: 4 }}>
                <div style={{ position: "absolute", left: `${((cat.median - cat.min) / (cat.max - cat.min)) * 100}%`, top: 0, bottom: 0, width: 3, background: C.teal, borderRadius: 2 }} />
                <div style={{ position: "absolute", left: `${((cat.avg - cat.min) / (cat.max - cat.min)) * 100}%`, top: 2, bottom: 2, width: 3, background: C.amber, borderRadius: 2 }} />
                <div style={{ position: "absolute", left: `${Math.max(((cat.median - cat.min) / (cat.max - cat.min)) * 100 - 2, 0)}%`, top: -16, fontSize: 9, fontWeight: 700, color: C.teal }}>€{cat.median.toLocaleString()}</div>
              </div>
              <div style={{ fontSize: 10, color: C.dim, minWidth: 60, paddingLeft: 8 }}>€{cat.max.toLocaleString()}</div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 6, fontSize: 10, color: C.dim }}>
              <span><span style={{ display: "inline-block", width: 8, height: 3, background: C.teal, borderRadius: 1, marginRight: 4 }} />Median</span>
              <span><span style={{ display: "inline-block", width: 8, height: 3, background: C.amber, borderRadius: 1, marginRight: 4 }} />Average</span>
            </div>
          </div>
        ))}
      </AppFrame>
      <Insight><strong>Advisor tip:</strong> Use benchmarks to set realistic expectations with clients. If the median damages for a deposit retention case is €1,200, a client expecting €5,000 should understand that would be at the high end of historical awards.</Insight>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Organisation-level view. Track usage, recent searches, and saved precedents.</p>
      <AppFrame path="dashboard">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div><div style={{ fontSize: 16, color: C.navy, fontWeight: 600 }}>Welcome back, Ann-Marie</div><div style={{ fontSize: 12, color: C.muted }}>Threshold  |  RTB Precedent Intelligence</div></div>
          <Btn primary>New search</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[
            { value: "127", label: "Searches this month", color: C.teal, bg: C.tealLight },
            { value: "34", label: "Saved searches", color: C.navy, bg: `${C.navy}10` },
            { value: "89", label: "Bookmarked decisions", color: C.blue, bg: C.blueLight },
            { value: "12", label: "Active advisors", color: C.green, bg: C.greenLight },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.slate, marginTop: 2, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Recent searches by your team</div>
        {[
          { user: "Ann-Marie", query: "Landlord selling property, 4-year tenancy, 90-day notice", time: "2 min ago", results: 47 },
          { user: "Conor", query: "Deposit withheld for cleaning, no evidence of damage beyond wear and tear", time: "1 hr ago", results: 83 },
          { user: "Sarah", query: "HAP tenant, landlord refusing to sign form, threatening eviction", time: "3 hrs ago", results: 29 },
          { user: "David", query: "Mould and damp issues, landlord not responding to repair requests for 6 months", time: "Yesterday", results: 61 },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: 8, marginBottom: 4, border: `1px solid ${C.borderLight}`, background: C.white }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: C.navy, fontWeight: 500 }}>{s.query}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{s.user}  |  {s.time}  |  {s.results} results</div>
            </div>
            <Btn small outline>View</Btn>
          </div>
        ))}

        <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8, marginTop: 18, textTransform: "uppercase" }}>Top dispute types searched</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { type: "Notice of termination", pct: 42 },
            { type: "Deposit retention", pct: 28 },
            { type: "Standards & maintenance", pct: 18 },
          ].map((t, i) => (
            <Card key={i} style={{ padding: "12px 14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 6 }}>{t.type}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MiniBar pct={t.pct} />
                <span style={{ fontSize: 12, fontWeight: 600, color: C.teal }}>{t.pct}%</span>
              </div>
            </Card>
          ))}
        </div>
      </AppFrame>
    </div>
  );
}

function SecurityScreen() {
  return (
    <div>
      <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 18 }}>Built for organisations that advise vulnerable tenants. EU-resident, AI Act-compliant.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {[
          { title: "EU-hosted infrastructure", desc: "Google Cloud, Frankfurt (europe-west3). All data storage and AI processing within the EU. Data never crosses the Atlantic." },
          { title: "AI via Vertex AI (EU)", desc: "Claude is called through Google Vertex AI in Frankfurt. EU data residency guaranteed. No data sent to US servers." },
          { title: "No AI training on your data", desc: "Contractual guarantee via Google Cloud DPA. Your queries and case data are never used to train AI models." },
          { title: "Multi-tenant isolation", desc: "Row Level Security ensures Threshold's data is invisible to other organisations. Complete tenant isolation at the database level." },
          { title: "EU AI Act compliant", desc: "Transparency notices on all AI-generated outputs. Human oversight by design — advisors always review and decide." },
          { title: "Full audit trail", desc: "Every search, every AI response, every bookmarked decision logged with user identity and timestamp." },
        ].map((s, i) => (
          <Card key={i} style={{ borderLeft: `4px solid ${C.teal}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{s.desc}</div>
          </Card>
        ))}
      </div>
      <div style={{ background: C.navy, borderRadius: 12, padding: "22px 24px", color: C.white }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.teal, marginBottom: 8, textTransform: "uppercase" }}>Data architecture</div>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: "#CBD5E1" }}>
          <strong style={{ color: C.white }}>Data at rest:</strong> Supabase PostgreSQL, EU (Frankfurt)<br />
          <strong style={{ color: C.white }}>AI processing:</strong> Google Vertex AI, EU (Frankfurt, europe-west3)<br />
          <strong style={{ color: C.white }}>RTB corpus:</strong> Google Cloud Storage, EU (Frankfurt)<br />
          <strong style={{ color: C.white }}>Frontend:</strong> Vercel Edge, EU region<br />
          <strong style={{ color: C.white }}>Sub-processors:</strong> Google Cloud (infrastructure), Anthropic via Vertex AI (AI model, EU processing)<br /><br />
          All covered by Data Processing Agreements. All processing within the EU.<br />
          Compliant with GDPR, EU AI Act, and Irish public sector procurement requirements.
        </div>
      </div>
      <Insight color={C.navy}><strong>Procurement-ready:</strong> Single vendor relationship (Google Cloud) for all AI and infrastructure. Standard DPA. SOC 2 Type II certified. GDPR-compliant EU data residency. Ready for state and semi-state body procurement processes.</Insight>
    </div>
  );
}

export default function RTBDemo() {
  const [activeView, setActiveView] = useState("overview");
  const map = { overview: OverviewScreen, search: SearchScreen, results: ResultsScreen, detail: DetailScreen, benchmarks: BenchmarksScreen, dashboard: DashboardScreen, security: SecurityScreen };
  const Comp = map[activeView] || OverviewScreen;
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: C.bg, color: C.charcoal, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=Inter:wght@700&display=swap" rel="stylesheet" />
      <style>{`.dn::-webkit-scrollbar{display:none}@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.df{animation:fu .3s ease-out}`}</style>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "16px 22px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}><WinLogo size={30} /><WinWordmark size={18} /><div style={{ flex: 1 }} /><Tag color={C.navy}>Product Preview</Tag></div>
        <h1 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 4px", fontFamily: "'DM Serif Display', Georgia, serif", color: C.navy }}>RTB Precedent Intelligence</h1>
        <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>AI-powered search across 40,000+ RTB decisions — evidence-based advice at your fingertips</p>
      </div>
      <div className="dn" style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${C.border}`, background: C.white, padding: "0 22px" }}>
        {views.map(v => <button key={v.id} onClick={() => setActiveView(v.id)} style={{ all: "unset", cursor: "pointer", padding: "12px 16px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", color: activeView === v.id ? C.navy : C.muted, borderBottom: activeView === v.id ? `2.5px solid ${C.teal}` : "2.5px solid transparent", transition: "all 0.15s" }}>{v.label}</button>)}
      </div>
      <div key={activeView} className="df" style={{ padding: "24px 22px", maxHeight: "calc(100vh - 155px)", overflowY: "auto" }}><div style={{ maxWidth: 860, margin: "0 auto" }}><Comp /></div></div>
    </div>
  );
}
