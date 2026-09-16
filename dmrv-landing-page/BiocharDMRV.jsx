import React, { useState, useRef, useEffect } from "react";
import {
  Sprout, Cpu, LineChart, MapPin, FileCheck, ArrowRight, CheckCircle2,
  ShieldCheck, Network, Calculator, Thermometer, Timer, Gauge, TrendingUp,
  Phone, Mail, Menu, X, Check, DollarSign, Globe, BadgeCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens — all as inline styles to avoid needing Tailwind JIT */
/* ------------------------------------------------------------------ */
const LOGO_SRC =
  "data:image/jpeg;base64,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";

/* Gradient as inline style objects (no JIT needed) */
const gradStyle = { background: "linear-gradient(135deg,#6f4698 0%,#a83f96 100%)" };
const gradTextStyle = {
  background: "linear-gradient(135deg,#6f4698 0%,#a83f96 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const FOOTER_BG = "#090014";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Ping dot using inline styles only */
function PingDot() {
  return (
    <span style={{ position: "relative", display: "inline-flex", height: 8, width: 8 }}>
      <span style={{
        position: "absolute", display: "inline-flex", height: "100%", width: "100%",
        borderRadius: "9999px", opacity: 0.75, animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite",
        ...gradStyle,
      }} />
      <span style={{ position: "relative", display: "inline-flex", height: 8, width: 8, borderRadius: "9999px", ...gradStyle }} />
    </span>
  );
}

function Pill({ children, dot = false }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 9999,
      background: "#f5f3ff", padding: "6px 16px", fontSize: 12, fontWeight: 600,
      letterSpacing: "0.05em", color: "#6d28d9",
      boxShadow: "inset 0 0 0 1px #ede9fe",
    }}>
      {dot && <PingDot />}
      {children}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#7c3aed" }}>
      {children}
    </p>
  );
}

function PrimaryCTA({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        borderRadius: 9999, padding: "10px 24px", fontSize: 14, fontWeight: 600,
        color: "#fff", border: "none", cursor: "pointer",
        boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
        transition: "all 0.2s", ...gradStyle, ...style,
      }}
    >
      {children}
    </button>
  );
}

function GradIconBox({ icon: Icon, size = 48 }) {
  return (
    <span style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: size, width: size, borderRadius: 12, flexShrink: 0, ...gradStyle,
    }}>
      <Icon style={{ height: size * 0.5, width: size * 0.5, color: "#fff" }} strokeWidth={2} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard mock UIs (unchanged content)                             */
/* ------------------------------------------------------------------ */
function MockFeedstock() {
  const rows = [
    { id: "BIO-2041", coords: "21.17°N, 72.83°E", check: "Passed" },
    { id: "BIO-2042", coords: "19.07°N, 72.87°E", check: "Passed" },
    { id: "BIO-2043", coords: "18.52°N, 73.86°E", check: "Passed" },
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-500">Feedstock batches · live ledger</p>
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <div className="g-table bg-slate-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Batch ID</span><span>Origin coordinates</span><span>Deforestation</span>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="g-table items-center border-t border-slate-100 px-4 py-3 text-sm">
            <span className="font-semibold text-slate-800">{r.id}</span>
            <span className="text-slate-500">{r.coords}</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> {r.check}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GaugeTile({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-500">
        <Icon className="h-4 w-4 text-violet-600" />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function MockPyrolysis() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-500">IoT pyrolysis controller · Reactor 03</p>
      <div className="g-3" style={{ gap: "0.75rem" }}>
        <GaugeTile icon={Thermometer} label="Burn temp" value="650°C" sub="optimal range" />
        <GaugeTile icon={Timer} label="Residence" value="22 min" sub="held steady" />
        <GaugeTile icon={Gauge} label="Yield" value="32%" sub="biochar / biomass" />
      </div>
      <div className="flex items-center justify-between rounded-xl bg-violet-50 px-4 py-3">
        <span className="text-sm font-medium text-violet-800">Tamper-proof signature</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700">
          <ShieldCheck className="h-4 w-4" /> Verified
        </span>
      </div>
    </div>
  );
}

function MockLCA() {
  const bars = [
    { label: "Production emissions", val: 18, color: "#f87171", w: "32%" },
    { label: "Sequestered carbon", val: 56, color: "#7c3aed", w: "100%" },
  ];
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-slate-500">Life cycle assessment · per 100t feedstock</p>
      <div className="space-y-3">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-600">{b.label}</span>
              <span className="font-semibold text-slate-800">{b.val} tCO₂e</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100">
              <div style={{ height: 12, borderRadius: 9999, backgroundColor: b.color, width: b.w }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-800">
          <TrendingUp className="h-4 w-4" /> Net carbon removal
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, ...gradTextStyle }}>38 tCO₂e</span>
      </div>
    </div>
  );
}

function MockSink() {
  const pins = [
    { top: "28%", left: "30%", label: "Agricultural soil" },
    { top: "58%", left: "62%", label: "Concrete additive" },
    { top: "44%", left: "48%", label: "Soil amendment" },
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-500">Carbon sink registry · geo-fenced application</p>
      <div
        className="relative h-48 overflow-hidden rounded-xl border border-slate-100"
        style={{ background: "radial-gradient(circle at 30% 30%, #ede9fe, transparent 60%), radial-gradient(circle at 70% 70%, #fae8ff, transparent 55%)" }}
      >
        <div className="absolute inset-0" style={{
          opacity: 0.4,
          backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        {pins.map((p) => (
          <div key={p.label} className="absolute" style={{ top: p.top, left: p.left, transform: "translate(-50%,-100%)" }}>
            <div className="flex flex-col items-center">
              <span className="whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700 shadow-sm">{p.label}</span>
              <MapPin className="mt-0.5 h-6 w-6 fill-violet-600 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockCert() {
  const standards = ["Puro.earth", "Verra VCS", "European Biochar Certificate (EBC)"];
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-500">Certification compiler · auto-generated</p>
      <div className="rounded-xl border border-slate-100 p-4">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-violet-600" />
          <span className="text-sm font-semibold text-slate-800">CDR_Credit_Dossier_v3.pdf</span>
          <span className="ml-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">Ready to submit</span>
        </div>
        <div className="mt-4 space-y-2">
          {standards.map((s) => (
            <div key={s} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-violet-600" />
              <span>{s}</span>
              <span className="ml-auto text-xs font-medium text-slate-400">mapped</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const FEATURES = [
  { key: "feedstock", icon: Sprout, title: "Biomass feedstock tracking", desc: "Trace every batch from field to reactor with origin proof and deforestation checks.", Mock: MockFeedstock },
  { key: "pyrolysis", icon: Cpu, title: "IoT pyrolysis integration", desc: "Pull live reactor telemetry straight into a tamper-proof record.", Mock: MockPyrolysis },
  { key: "lca", icon: LineChart, title: "Life cycle assessment", desc: "Net production emissions against sequestered carbon for a defensible CDR score.", Mock: MockLCA },
  { key: "sink", icon: MapPin, title: "Carbon sink application", desc: "Geo-fence where biochar lands and prove permanence of the sink.", Mock: MockSink },
  { key: "cert", icon: FileCheck, title: "Registry-ready certification", desc: "Compile a submission dossier for Puro.earth, Verra, or EBC in one click.", Mock: MockCert },
];

const NAV = [["Overview", "overview"], ["Platform", "platform"], ["Dashboard", "dashboard"], ["Carbon Credits", "carbon-credits"], ["Why Emertech", "why"]];

const HERO_BULLETS = [
  "IoT-verified pyrolysis monitoring",
  "Registry-approved CDR methodologies",
  "Highly durable carbon sinks",
  "End-to-end feedstock traceability",
];

const OWNERS = [
  { icon: Network, title: "Trace the full carbon journey", desc: "Track biomass to biochar to a permanent sink, with a verifiable record at every handoff." },
  { icon: Calculator, title: "Simplify CDR reporting", desc: "Turn raw reactor and field data into registry-ready submissions without the manual spreadsheet work." },
  { icon: ShieldCheck, title: "Issue durable, high-trust credits", desc: "Back every credit with permanence evidence buyers and verifiers can independently check." },
];

const PLATFORM = [
  { icon: Sprout, title: "Feedstock passport", desc: "Issue verifiable origin records for every biomass batch entering the reactor." },
  { icon: Network, title: "Chain-of-custody tracking", desc: "Follow material from biomass through pyrolysis to its final carbon sink." },
  { icon: Cpu, title: "IoT pyrolysis monitoring", desc: "Stream live reactor telemetry — temperature, residence time, and yield." },
  { icon: Calculator, title: "Net CDR accounting", desc: "Net out process emissions against sequestered carbon automatically." },
  { icon: MapPin, title: "Permanence verification", desc: "Geo-fence application sites and evidence the durability of each sink." },
  { icon: ShieldCheck, title: "Immutable audit trail", desc: "Cryptographic records keep every data point ready for third-party audit." },
];

const WHY_SMALL = [
  ["Methodology-aligned by default", "Built for EBC & Puro.earth, updated as standards evolve."],
  ["Automated net-CDR", "Life cycle carbon computed directly from your data inputs."],
  ["Live reactor dashboards", "Real-time pyrolysis telemetry for every batch in the field."],
  ["Tamper-proof ledger", "Cryptographic records ensure audit-ready documentation."],
  ["One-click dossiers", "Compile registry submissions in minutes, not weeks."],
  ["Geo-fenced sink proof", "Permanence you can verify and buyers can trust."],
];

/* ------------------------------------------------------------------ */
/*  Carbon Credits — hoverable card                                    */
/* ------------------------------------------------------------------ */
const CC_STEPS = [
  { icon: Sprout,     tag: "GENERATE",     title: "Issue verified biochar credits",  desc: "Convert audited pyrolysis and sink data into issuance-ready CDR credits aligned with Puro.earth, EBC, and Verra VCS methodologies." },
  { icon: TrendingUp, tag: "SELL",          title: "Reach global CDR buyers",         desc: "List and transact your credits across leading registries and exchanges, with transparent pricing and full end-to-end provenance." },
  { icon: BadgeCheck, tag: "BUY & OFFSET",  title: "Source durable removal credits",  desc: "Procure high-integrity biochar credits to meet your own net-zero and CSR commitments — every tonne fully traceable and permanence-backed." },
];

function CCCard({ icon: Icon, tag, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", border: `1px solid ${hov ? "#e9d5ff" : "#f3f4f6"}`,
        borderRadius: 18, padding: "1.75rem", boxSizing: "border-box",
        boxShadow: hov ? "0 8px 28px rgba(124,58,237,0.10)" : "0 1px 8px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-3px)" : "translateY(0)", transition: "all .25s",
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 46, width: 46, borderRadius: 13, background: "#f5f0ff" }}>
          <Icon style={{ color: "#7c3aed", width: 21, height: 21 }} strokeWidth={1.8} />
        </span>
        <span style={{ background: "#f3e8ff", border: "1px solid #e9d5ff", borderRadius: 9999, padding: "0.22rem 0.75rem", fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", color: "#7e22ce" }}>{tag}</span>
      </div>
      <p style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", margin: "0 0 10px", fontFamily: "'Inter', sans-serif" }}>{title}</p>
      <p style={{ fontSize: "0.86rem", lineHeight: 1.7, color: "#6b7280", margin: 0 }}>{desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function BiocharDMRV() {
  const [active, setActive] = useState("feedstock");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [robot, setRobot] = useState(false);
  const current = FEATURES.find((f) => f.key === active);
  const ActiveMock = current.Mock;
  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputCls = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

  return (
    <div id="top" className="min-h-screen bg-white antialiased" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn .35s ease both; }
        html { scroll-behavior: smooth; }

        .g-hero  { display: grid; gap: 3rem;   align-items: start; grid-template-columns: 3fr 2fr; }
        .g-dash  { display: grid; gap: 1.5rem; align-items: start; grid-template-columns: 0.9fr 1.1fr; }
        .g-3     { display: grid; gap: 1.5rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .g-2     { display: grid; gap: 0.75rem; grid-template-columns: 1fr 1fr; }
        .g-table { display: grid; grid-template-columns: 1fr 1.3fr 1fr; }

        @media (max-width: 980px) { .g-hero, .g-dash { grid-template-columns: 1fr; } }
        @media (max-width: 820px) { .g-3, .cc-grid { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .g-2 { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#overview" onClick={(e) => { e.preventDefault(); scrollToId("overview"); }} className="flex items-center gap-2.5">
            <img src={LOGO_SRC} alt="Emertech Innovations" className="h-9 w-9 rounded-lg object-contain" />
            <span className="whitespace-nowrap text-[15px] font-bold text-slate-900">Emertech Innovations</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollToId(id); }}
                className="cursor-pointer text-sm font-medium text-slate-500 transition-colors hover:text-violet-700">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToId("contact")}
              className="hidden cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-white sm:inline-block"
              style={{ ...gradStyle, boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
            >
              Get Compliant
            </button>
            <button onClick={() => setMobileOpen((o) => !o)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Toggle menu">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`}
                onClick={(e) => { e.preventDefault(); setMobileOpen(false); scrollToId(id); }}
                className="block cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-700">
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="overview" className="relative scroll-mt-20 overflow-hidden" style={{
        backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}>
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(196,181,253,0.3)" }} />
        <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(216,180,254,0.3)" }} />

        <div className="g-hero relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-24">
          {/* Left */}
          <div>
            <Pill dot>Biochar dMRV — Live</Pill>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Measure, Verify &amp; Scale
              <br />
              <span style={gradTextStyle}>Biochar Carbon Removal.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
              Emertech gives project developers, CSR teams, and buyers a single platform to measure, report, and
              verify biochar carbon removal — with transparent, audit-ready data from feedstock to final sink.
            </p>

            <ul className="mt-8 space-y-3.5">
              {HERO_BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-violet-600" />
                  <span className="text-sm font-medium text-slate-700">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryCTA onClick={() => scrollToId("dashboard")}>
                See the Platform <ArrowRight className="h-4 w-4" />
              </PrimaryCTA>
              <button onClick={() => scrollToId("contact")}
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
                Read the EBC Guide
              </button>
            </div>

            <div className="mt-9 inline-flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 px-5 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                <FileCheck className="h-5 w-5 text-violet-600" />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">Durable CDR</p>
                <p className="text-sm font-semibold text-slate-700">Puro.earth &amp; EBC certified methodologies — supported out of the box</p>
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <div id="contact" className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-100" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div className="px-7 py-6" style={gradStyle}>
              <h3 className="text-xl font-bold text-white">Get in touch with our team</h3>
              <p className="mt-1 text-sm text-violet-100">See how Emertech can power your Biochar dMRV reporting.</p>
            </div>
            <div className="space-y-4 p-7">
              <div className="g-2">
                <input className={inputCls} placeholder="Full name" value={form.name} onChange={setField("name")} />
                <input className={inputCls} placeholder="Company" value={form.company} onChange={setField("company")} />
                <input className={inputCls} type="email" placeholder="Work email" value={form.email} onChange={setField("email")} />
                <input className={inputCls} placeholder="Phone (optional)" value={form.phone} onChange={setField("phone")} />
              </div>
              <textarea className={`${inputCls} min-h-[100px] resize-none`}
                placeholder="Tell us about your Biochar dMRV needs"
                value={form.message} onChange={setField("message")} />

              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <label className="flex cursor-pointer items-center gap-3 select-none">
                  <button
                    onClick={() => setRobot((r) => !r)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      height: 24, width: 24, borderRadius: 4, border: robot ? "2px solid #6f4698" : "2px solid #cbd5e1",
                      background: robot ? "linear-gradient(135deg,#6f4698 0%,#a83f96 100%)" : "#fff",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                    aria-label="I'm not a robot"
                  >
                    {robot && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                  </button>
                  <span className="text-sm text-slate-600">I'm not a robot</span>
                </label>
                <div className="text-right leading-none">
                  <div className="text-[10px] font-bold text-slate-400">reCAPTCHA</div>
                  <div className="text-[8px] text-slate-300">Privacy · Terms</div>
                </div>
              </div>

              <button
                className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:brightness-105"
                style={{ ...gradStyle, boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
              >
                Request a Biochar dMRV demo
              </button>
              <p className="text-center text-xs text-slate-400">By submitting, you agree to be contacted regarding your inquiry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CDR Project Owners ── */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="text-center">
          <Eyebrow>For CDR project owners</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to run a biochar project
          </h2>
        </div>
        <div className="g-3 mt-12">
          {OWNERS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={{ transitionDuration: "0.3s" }}>
              <GradIconBox icon={Icon} />
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Platform ── */}
      <section id="platform" className="scroll-mt-20 bg-slate-50/70 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <Eyebrow>Emertech platform offers</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A complete biochar dMRV platform
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
              Everything you need to take a biochar credit from feedstock to issuance, in one workflow.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-7 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-3 lg:p-10">
            {PLATFORM.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet-500" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard ── */}
      <section id="dashboard" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 lg:px-8">
        <div className="text-center">
          <Eyebrow>Live dashboard</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            One platform, the full carbon journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
            Walk through how Emertech measures, reports, and verifies every stage of a biochar credit.
          </p>
        </div>
        <div className="g-dash mt-14">
          <div className="space-y-3">
            {FEATURES.map((f) => {
              const on = f.key === active;
              const Icon = f.icon;
              return (
                <button key={f.key} onClick={() => setActive(f.key)}
                  className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition ${on ? "border-violet-300 bg-violet-50 shadow-sm" : "border-slate-100 bg-white hover:border-violet-200"}`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={on ? { ...gradStyle } : { background: "#ede9fe" }}>
                    <Icon className="h-5 w-5" style={{ color: on ? "#fff" : "#7c3aed" }} />
                  </span>
                  <span>
                    <span className={`block font-semibold ${on ? "text-violet-900" : "text-slate-800"}`}>{f.title}</span>
                    <span className="mt-0.5 block text-sm text-slate-500">{f.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-300" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-300" />
              <span className="ml-3 text-xs font-medium text-slate-400">emertech.io / biochar / {active}</span>
            </div>
            <div key={active} className="animate-fade-in"><ActiveMock /></div>
          </div>
        </div>
      </section>

      {/* ── Carbon Credits Marketplace ── */}
      <section id="carbon-credits" style={{ background: "#fff", padding: "5rem 0" }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <Eyebrow>Monetise verified impact</Eyebrow>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem,3vw,2.5rem)", letterSpacing: "-0.022em", color: "#111827", lineHeight: 1.12, marginTop: 14, maxWidth: 700, margin: "14px auto 0" }}>
              Generate, sell, and buy biochar credits — end&nbsp;to&nbsp;end
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
              Emertech doesn't stop at measurement. We transform your verified biochar tonnes into registry-grade
              carbon credits — and connect you to the buyers, registries, and exchanges that value durable CDR assets.
            </p>
          </div>

          {/* 3 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 48 }} className="cc-grid">
            {CC_STEPS.map((step) => <CCCard key={step.title} {...step} />)}
          </div>

          {/* Big gradient banner */}
          <div style={{ marginTop: 36, borderRadius: 24, padding: "2.6rem", position: "relative", overflow: "hidden", boxShadow: "0 24px 60px rgba(111,70,152,0.32)", ...gradStyle }}>
            {/* decorative blobs */}
            <div style={{ position: "absolute", right: -50, top: -50, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: -30, bottom: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

            <div style={{ position: "relative" }}>
              {/* pill */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.16)", borderRadius: 9999, padding: "0.32rem 0.9rem", fontWeight: 600, fontSize: "0.74rem", color: "#fff" }}>
                <Globe style={{ width: 13, height: 13 }} /> Market connectivity layer
              </span>

              <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "#fff", marginTop: 14, maxWidth: 620, lineHeight: 1.2 }}>
                Plug into the world's leading CDR carbon markets
              </h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(255,255,255,0.86)", marginTop: 10, maxWidth: 640 }}>
                Through Emertech's connectivity layer, your biochar credits arrive transaction-ready across the
                registries and exchanges that set global carbon pricing — so durable removal converts into revenue
                without friction.
              </p>

              {/* market badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                {["Puro.earth CDR Registry", "Verra · VCS Registry", "European Biochar Certificate (EBC)", "Gold Standard Marketplace", "Xpansiv CBL", "Climate Impact X (CIX)"].map(m => (
                  <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 12, padding: "0.55rem 1rem", fontWeight: 600, fontSize: "0.82rem", color: "#fff" }}>
                    <CheckCircle2 style={{ width: 14, height: 14 }} /> {m}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToId("contact")}
                style={{ marginTop: 26, background: "#fff", color: "#6d28d9", border: "none", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", padding: "0.75rem 1.7rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, boxShadow: "0 6px 20px rgba(0,0,0,0.18)", transition: "filter .18s" }}
                onMouseEnter={e => e.currentTarget.style.filter = "brightness(0.96)"}
                onMouseLeave={e => e.currentTarget.style.filter = ""}
              >
                Talk to our carbon markets team <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Emertech ── */}
      <section id="why" className="scroll-mt-20 bg-slate-50/70 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <Eyebrow>Why Emertech</Eyebrow>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A team that makes carbon removal projects easier to run
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
              Expert guidance, tailored support, and proactive management for a smooth path to issuance.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-7 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:grid-cols-2 lg:grid-cols-3 lg:p-10">
            {WHY_SMALL.map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet-500" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <PrimaryCTA onClick={() => scrollToId("contact")} style={{ padding: "14px 32px", fontSize: 15 }}>
              Calculate Your CDR Potential <ArrowRight className="h-4 w-4" />
            </PrimaryCTA>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="company" style={{ backgroundColor: FOOTER_BG }} className="text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Explore our broader ecosystem</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "rgba(221,214,254,0.7)" }}>
                Emertech builds measurement, reporting, and verification across carbon markets — from agriculture to durable carbon removal.
              </p>
              <a href="https://emertech.io/" target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/5">
                Visit Emertech.io <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-9 space-y-3.5">
                {[
                  { icon: Phone, text: "+91 22 4000 1200" },
                  { icon: MapPin, text: "Shelton Sapphire, CBD Belapur, Navi Mumbai" },
                  { icon: Mail, text: "support@emertech.io" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(221,214,254,0.8)" }}>
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Learn more on this</h3>
              <div className="mt-6 space-y-4">
                {[
                  { icon: FileCheck, title: "Agriculture dMRV", sub: "Soil carbon & regenerative practices" },
                  { icon: ShieldCheck, title: "EU Battery Passports", sub: "Compliance for battery manufacturers" },
                ].map(({ icon: Icon, title, sub }) => (
                  <a key={title} href="#"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-all hover:border-white/25 hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.035)" }}>
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-5 w-5 text-violet-200" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="text-sm" style={{ color: "rgba(221,214,254,0.6)" }}>{sub}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-violet-300 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center" style={{ color: "rgba(221,214,254,0.5)" }}>
            <p>© 2026 Emertech. All rights reserved.</p>
            <p>Biochar Digital Measurement, Reporting &amp; Verification platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
