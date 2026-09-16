import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, Check, CheckCircle, CheckCircle2,
  Sprout, Layers, ShieldCheck, BadgeCheck, Globe,
  TrendingUp, Users, Satellite, Activity, FileText,
  MapPin, Phone, Mail, Calculator, Download, ChevronDown,
  Droplets, Wifi, Thermometer, FileCheck,
  Trash2, Crosshair, Plus, DollarSign, Leaf, RotateCcw,
  Wheat, Trees,
} from "lucide-react";

/* ─── EXACT colours from battery-passport.emertech.io ─── */
const C = {
  heroBg:"#f5f3ff", white:"#ffffff", primary:"#7c3aed", primaryDark:"#6d28d9",
  primaryMid:"#9333ea", eyebrow:"#7c3aed", pillBg:"#f3e8ff", pillBorder:"#e9d5ff",
  pillText:"#7e22ce", iconBg:"#f5f0ff", cardBorder:"#f3f4f6", sectionAlt:"#fafafa",
  footerBg:"#090014", h:"#111827", body:"#6b7280", strong:"#374151",
};
const grad = "linear-gradient(135deg, #6f4698 0%, #a83f96 100%)";
const LOGO_URL = "data:image/jpeg;base64,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";

const go = id => e => { e?.preventDefault?.(); document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" }); };

function useInView() {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e]) => { if(e.isIntersecting){setV(true);io.unobserve(el);} }, {threshold:0.08});
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, v];
}
function FadeUp({ children, delay=0, style:s={} }) {
  const [ref,v] = useInView();
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(20px)", transition:`opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`, ...s }}>{children}</div>;
}

const H = ({ as:Tag="h2", children, style:s={} }) => (
  <Tag style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, letterSpacing:"-0.022em", color:C.h, lineHeight:1.12, ...s }}>{children}</Tag>
);
const Body = ({ children, style:s={} }) => (
  <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:400, lineHeight:1.7, color:C.body, margin:0, ...s }}>{children}</p>
);
const Eyebrow = ({ children }) => (
  <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.7rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.eyebrow, margin:0 }}>{children}</p>
);
const Btn = ({ children, onClick, style:s={} }) => (
  <button onClick={onClick} style={{
    background:grad, color:"#fff", border:"none", borderRadius:9999, fontFamily:"'Inter', sans-serif",
    fontWeight:600, fontSize:"0.88rem", padding:"0.6rem 1.5rem", cursor:"pointer",
    display:"inline-flex", alignItems:"center", gap:6, boxShadow:"0 4px 14px rgba(124,58,237,0.3)",
    transition:"filter .18s, box-shadow .18s", ...s }}
    onMouseEnter={e=>{e.currentTarget.style.filter="brightness(1.07)";e.currentTarget.style.boxShadow="0 6px 20px rgba(124,58,237,0.4)";}}
    onMouseLeave={e=>{e.currentTarget.style.filter="";e.currentTarget.style.boxShadow="0 4px 14px rgba(124,58,237,0.3)";}}>
    {children}
  </button>
);
const Pill = ({ children, dot }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:C.pillBg, border:`1px solid ${C.pillBorder}`, borderRadius:9999, padding:"0.32rem 0.9rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.76rem", color:C.pillText }}>
    {dot && <span style={{ position:"relative", display:"inline-flex", width:8, height:8 }}>
      <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:C.primaryMid, opacity:.7, animation:"ping 1.5s cubic-bezier(0,0,.2,1) infinite" }} />
      <span style={{ position:"relative", width:8, height:8, borderRadius:"50%", background:C.primaryMid, display:"block" }} />
    </span>}
    {children}
  </span>
);
const SmallPill = ({ children }) => (
  <span style={{ background:C.pillBg, border:`1px solid ${C.pillBorder}`, borderRadius:9999, padding:"0.22rem 0.75rem", fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.62rem", letterSpacing:"0.1em", color:C.pillText }}>{children}</span>
);
const Card = ({ children, style:s={} }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:C.white, border:`1px solid ${hov?C.pillBorder:C.cardBorder}`, borderRadius:18,
        boxShadow: hov?"0 8px 28px rgba(124,58,237,0.1)":"0 1px 8px rgba(0,0,0,0.04)",
        transform: hov?"translateY(-3px)":"translateY(0)", transition:"all .25s", ...s }}>{children}</div>
  );
};

/* ================================================================
   NAVBAR
================================================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["Overview","overview"],["Platform","platform"],["Dashboard","dashboard"],["Why Emertech","why-emertech"]];
  return (
    <header style={{ position:"fixed", inset:"0 0 auto 0", zIndex:50, background:C.white,
      borderBottom:`1px solid ${scrolled?"#e5e7eb":"#f3f4f6"}`, boxShadow:scrolled?"0 1px 8px rgba(0,0,0,0.06)":"none", transition:"all .3s" }}>
      <nav style={{ maxWidth:1180, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.85rem 2rem" }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
          <img src={LOGO_URL} alt="Emertech" style={{ height:40, width:40, objectFit:"contain", borderRadius:8 }}
            onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
          <div style={{ display:"none", width:40, height:40, alignItems:"center", justifyContent:"center" }}>
            <svg viewBox="0 0 80 80" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa"/><stop offset="50%" stopColor="#818cf8"/><stop offset="100%" stopColor="#c084fc"/>
              </linearGradient></defs>
              <path d="M40 8 C52 8 62 16 65 27 C70 24 76 26 76 33 C76 40 70 44 64 42 C62 53 52 60 40 60 C28 60 18 53 16 42 C10 44 4 40 4 33 C4 26 10 24 15 27 C18 16 28 8 40 8Z" fill="none" stroke="url(#lg1)" strokeWidth="5" strokeLinejoin="round"/>
              <path d="M28 35 C28 28 33 22 40 22 C47 22 52 28 52 35 C52 42 47 48 40 48 C33 48 28 42 28 35Z" fill="url(#lg1)" opacity="0.6"/>
            </svg>
          </div>
          <span style={{ whiteSpace:"nowrap", fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.95rem", color:C.h }}>Emertech Innovations</span>
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:0, flex:1, justifyContent:"center", maxWidth:520 }}>
          {links.map(([l,id]) => (
            <a key={id} href={`#${id}`} onClick={go(id)} style={{ fontFamily:"'Inter', sans-serif", fontWeight:500, fontSize:"0.88rem", color:"#374151", textDecoration:"none", cursor:"pointer", padding:"0.4rem 1rem", transition:"color .18s" }}
              onMouseEnter={e=>e.target.style.color=C.primary} onMouseLeave={e=>e.target.style.color="#374151"}>{l}</a>
          ))}
        </div>
        <Btn onClick={go("contact")} style={{ flexShrink:0 }}>Get Compliant</Btn>
      </nav>
    </header>
  );
}

/* ================================================================
   CONTACT FORM + HERO
================================================================ */
function ContactForm() {
  const [d, setD] = useState({ name:"", company:"", email:"", phone:"", msg:"" });
  const [robot, setRobot] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const set = k => e => setD(p=>({...p,[k]:e.target.value}));
  const submit = () => {
    if(!d.name||!d.company||!d.email){setErr("Please fill name, company and email.");return;}
    if(!robot){setErr("Please confirm you're not a robot.");return;}
    setErr(""); setDone(true);
  };
  const inp = { width:"100%", border:"1px solid #e5e7eb", borderRadius:10, padding:"0.65rem 0.9rem", fontSize:"0.84rem", color:C.h, background:C.white, outline:"none", fontFamily:"'Inter', sans-serif", boxSizing:"border-box", transition:"border .18s, box-shadow .18s" };
  const focus = e => { e.target.style.borderColor=C.primary; e.target.style.boxShadow=`0 0 0 3px rgba(124,58,237,0.1)`; };
  const blur  = e => { e.target.style.borderColor="#e5e7eb"; e.target.style.boxShadow="none"; };
  return (
    <div style={{ background:C.white, borderRadius:20, overflow:"hidden", boxShadow:"0 8px 40px rgba(124,58,237,0.14)", border:`1px solid ${C.pillBorder}` }}>
      <div style={{ background:grad, padding:"1.35rem 1.6rem" }}>
        <H as="h3" style={{ color:"#fff", fontSize:"1.1rem", margin:0 }}>Get in touch with our team</H>
        <p style={{ fontFamily:"'Inter', sans-serif", color:"rgba(255,255,255,0.82)", fontSize:"0.8rem", marginTop:4, marginBottom:0 }}>See how Emertech can power your Agri-dMRV reporting.</p>
      </div>
      <div style={{ padding:"1.35rem 1.6rem" }}>
        {done ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"2.5rem 1rem", textAlign:"center" }}>
            <div style={{ width:50, height:50, borderRadius:"50%", background:C.pillBg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}><CheckCircle style={{ color:C.primary, width:26, height:26 }} /></div>
            <H as="h4" style={{ fontSize:"1rem" }}>Thanks, {d.name.split(" ")[0]}!</H>
            <Body style={{ marginTop:6, fontSize:"0.84rem", maxWidth:220 }}>A specialist will reach out within one business day.</Body>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              <input style={inp} placeholder="Full name" value={d.name} onChange={set("name")} onFocus={focus} onBlur={blur}/>
              <input style={inp} placeholder="Company" value={d.company} onChange={set("company")} onFocus={focus} onBlur={blur}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              <input style={inp} type="email" placeholder="Work email" value={d.email} onChange={set("email")} onFocus={focus} onBlur={blur}/>
              <input style={inp} placeholder="Phone (optional)" value={d.phone} onChange={set("phone")} onFocus={focus} onBlur={blur}/>
            </div>
            <textarea style={{...inp, minHeight:78, resize:"none"}} placeholder="Tell us about your Agri-dMRV needs" value={d.msg} onChange={set("msg")} onFocus={focus} onBlur={blur}/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", border:"1px solid #e5e7eb", borderRadius:8, background:"#f9fafb", padding:"0.65rem 1rem" }}>
              <label style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", userSelect:"none" }}>
                <button type="button" onClick={()=>setRobot(r=>!r)} style={{ width:22, height:22, borderRadius:4, border:`2px solid ${robot?C.primary:"#d1d5db"}`, background:robot?C.primary:C.white, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .15s" }}>
                  {robot && <Check style={{ color:"#fff", width:13, height:13, strokeWidth:3 }}/>}
                </button>
                <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.84rem", color:C.strong }}>I'm not a robot</span>
              </label>
              <div style={{ textAlign:"right", lineHeight:1 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af" }}>reCAPTCHA</div>
                <div style={{ fontSize:8, color:"#d1d5db" }}>Privacy · Terms</div>
              </div>
            </div>
            {err && <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.76rem", color:"#ef4444", margin:0 }}>{err}</p>}
            <button onClick={submit} style={{ background:grad, color:"#fff", border:"none", borderRadius:10, fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.86rem", padding:"0.82rem", cursor:"pointer", width:"100%" }}>Request an Agri-dMRV demo</button>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", color:"#9ca3af", textAlign:"center", margin:0 }}>By submitting, you agree to be contacted regarding your inquiry.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Hero() {
  const checks = ["Satellite & IoT-verified measurements","Registry-approved carbon methodologies","Built for CSR & NGO transparency","End-to-end farm traceability"];
  return (
    <section id="overview" style={{ paddingTop:70, background:"#ffffff", backgroundImage:"radial-gradient(circle, rgba(168,85,247,0.06) 1px, transparent 1px)", backgroundSize:"26px 26px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", left:-60, top:20, width:300, height:300, borderRadius:"50%", background:"rgba(167,139,250,0.12)", filter:"blur(70px)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:-40, top:60, width:280, height:280, borderRadius:"50%", background:"rgba(192,132,252,0.1)", filter:"blur(70px)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1180, margin:"0 auto", display:"grid", gridTemplateColumns:"1.7fr 1fr", gap:"3rem", alignItems:"start", padding:"5.5rem 2rem 7rem", position:"relative" }}>
        <div>
          <Pill dot>Agriculture dMRV — Live</Pill>
          <H as="h1" style={{ marginTop:22, fontSize:"2.85rem", lineHeight:1.1 }}>
            Measure, Verify, and Scale Your <span style={{ background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Agricultural Impact.</span>
          </H>
          <Body style={{ marginTop:18, fontSize:"0.95rem" }}>Emertech gives CSR teams, NGOs, and project owners a single platform to measure, report, and verify agricultural carbon outcomes — with transparent, audit-ready data across every farm and sector.</Body>
          <ul style={{ marginTop:22, display:"flex", flexDirection:"column", gap:9, listStyle:"none", padding:0 }}>
            {checks.map(c => (
              <li key={c} style={{ display:"flex", alignItems:"center", gap:9 }}>
                <CheckCircle2 style={{ color:C.primary, width:17, height:17, flexShrink:0 }}/>
                <span style={{ fontFamily:"'Inter', sans-serif", fontWeight:500, fontSize:"0.875rem", color:C.strong }}>{c}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop:24, display:"flex", alignItems:"center", gap:12, background:C.white, border:`1px solid ${C.pillBorder}`, borderRadius:14, padding:"0.75rem 1.1rem" }}>
            <div style={{ width:34, height:34, borderRadius:9, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Activity style={{ color:C.primaryMid, width:17, height:17 }}/></div>
            <div style={{ lineHeight:1.3 }}>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:C.eyebrow, margin:0 }}>CCTS 2023</p>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.84rem", fontWeight:600, color:C.strong, margin:0 }}>India's carbon credit scheme — now enrolling</p>
            </div>
          </div>
        </div>
        <ContactForm/>
      </div>
    </section>
  );
}

/* ================================================================
   VALUE PROP
================================================================ */
function ValueProp() {
  const cols = [
    { icon:Layers,    title:"Achieve transparency across farms", desc:"Emertech enables full visibility into your agricultural project. Track soil, practices, and emissions at every stage — from field preparation through harvest and sequestration." },
    { icon:Globe,     title:"Simplify sustainability reporting",  desc:"Streamline CCTS, Verra, and Gold Standard reporting with accurate, verifiable data directly from the field, reducing the time and effort required to compile submissions." },
    { icon:BadgeCheck,title:"Achieve your compliance goals",      desc:"Gain actionable insights into your farm portfolio, align operations with national and international sustainability objectives, and empower your team to make data-driven decisions." },
  ];
  return (
    <section style={{ background:C.white, padding:"5rem 2rem" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center" }}>
          <Eyebrow>For agri project owners</Eyebrow>
          <H as="h2" style={{ fontSize:"2.2rem", marginTop:12, whiteSpace:"nowrap" }}>Unlock compliance with verifiable agricultural data</H>
        </FadeUp>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:50 }}>
          {cols.map((c,i) => {
            const Icon = c.icon;
            return (
              <FadeUp key={c.title} delay={i*80}>
                <Card style={{ padding:"1.75rem", height:"100%", boxSizing:"border-box" }}>
                  <div style={{ width:46, height:46, borderRadius:13, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}><Icon style={{ color:C.primary, width:21, height:21 }} strokeWidth={1.8}/></div>
                  <H as="h3" style={{ fontSize:"1rem", marginBottom:10 }}>{c.title}</H>
                  <Body style={{ fontSize:"0.86rem" }}>{c.desc}</Body>
                </Card>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp delay={120}>
          <div style={{ marginTop:44, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16, background:C.sectionAlt, border:`1px solid #e5e7eb`, borderRadius:18, padding:"1.4rem 1.8rem" }}>
            <div><Eyebrow>Ready to get started?</Eyebrow><H as="p" style={{ fontSize:"1.05rem", marginTop:4 }}>Partner with Emertech to implement verified Agri-dMRV.</H></div>
            <Btn onClick={go("contact")} style={{ flexShrink:0 }}>Talk to a dMRV expert <ArrowRight style={{ width:15, height:15 }}/></Btn>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ================================================================
   SOLUTIONS GRID
================================================================ */
const SOLUTIONS = [
  { icon:Sprout,     tag:"CORE PRODUCT", title:"Soil carbon tracking",        desc:"Quantify and verify soil organic carbon changes using satellite imagery, field sampling, and approved registry methodologies." },
  { icon:Activity,   tag:"TRACEABILITY",  title:"Lifecycle traceability",       desc:"Track farm practices from seed and soil through to harvest, sequestration, and credit issuance with a full provenance record." },
  { icon:TrendingUp, tag:"PERFORMANCE",   title:"Carbon impact modeling",       desc:"Real-time modeling of carbon sequestration, emission reductions, and project-level GHG impact across every enrolled farm." },
  { icon:Layers,     tag:"SUSTAINABILITY",title:"Carbon footprint declaration", desc:"Calculate and document farm-level carbon footprint with verified lifecycle emissions aligned to Scope 3 reporting frameworks." },
  { icon:Globe,      tag:"SUPPLY CHAIN",  title:"Supply chain transparency",    desc:"Full visibility into agricultural inputs with due diligence for water, fertilizer, and critical practice disclosures." },
  { icon:ShieldCheck,tag:"COMPLIANCE",    title:"Immutable audit trail",        desc:"Cryptographic records ensure tamper-proof documentation for regulatory audits and third-party verification." },
];
function SolutionsGrid() {
  return (
    <section id="platform" style={{ background:C.sectionAlt, padding:"5rem 2rem", scrollMarginTop:70 }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center" }}>
          <Eyebrow>Emertech platform offers</Eyebrow>
          <H as="h2" style={{ fontSize:"2.4rem", marginTop:12 }}>A complete Agri-dMRV platform</H>
          <Body style={{ marginTop:10, maxWidth:460, margin:"10px auto 0" }}>Everything you need for agricultural carbon compliance, in one end-to-end workflow.</Body>
        </FadeUp>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginTop:50 }}>
          {SOLUTIONS.map((s,i) => {
            const Icon = s.icon;
            return (
              <FadeUp key={s.title} delay={(i%3)*70}>
                <Card style={{ padding:"1.6rem", height:"100%", boxSizing:"border-box" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18 }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon style={{ color:C.primary, width:19, height:19 }} strokeWidth={1.8}/></div>
                    <SmallPill>{s.tag}</SmallPill>
                  </div>
                  <H as="h3" style={{ fontSize:"0.97rem", marginBottom:8 }}>{s.title}</H>
                  <Body style={{ fontSize:"0.84rem" }}>{s.desc}</Body>
                </Card>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PLATFORM DEMO — interactive "Feature Switcher"
================================================================ */
function useNarrow(bp = 900) {
  const [n, setN] = useState(typeof window !== "undefined" && window.innerWidth < bp);
  useEffect(() => { const f = () => setN(window.innerWidth < bp); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, [bp]);
  return n;
}

const DEMO_TABS = [
  { icon:Users,      title:"Farmer & Stakeholder Profiling", desc:"Digitally onboard farmers, landowners, and project participants with verified identity, land boundaries, and activity logs." },
  { icon:MapPin,     title:"Geo-Spatial Plot Mapping",       desc:"GIS-based farm and land mapping with boundary validation, satellite overlays, and deforestation risk assessment." },
  { icon:Wheat,      title:"Crop & Land-Use Mix",            desc:"Configure the crops and land-use practices across each plot — every crop carries its own sequestration and emissions profile." },
  { icon:TrendingUp, title:"Baseline Carbon Modeling",       desc:"Establish historical land use, carbon baselines, and methodology-aligned impact projections." },
  { icon:Activity,   title:"Real-Time Monitoring",           desc:"Capture field activities, biomass growth, soil practices, and biochar production through mobile and IoT integrations." },
  { icon:Calculator, title:"Carbon Quantification Engine",   desc:"Automated estimation of emissions reduction and carbon sequestration aligned with Verra, Gold Standard, and other registries." },
  { icon:FileText,   title:"Audit-Ready Reporting",          desc:"Generate structured documentation for third-party validation, registry submission, and investor review." },
];

function Slider({ label, value, min, max, step=1, unit="", onChange }) {
  return (
    <div style={{ marginBottom:13 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.76rem", color:C.strong, fontWeight:600 }}>{label}</span>
        <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.8rem", fontWeight:700, color:C.primary }}>{value.toLocaleString()}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} style={{ width:"100%", accentColor:C.primary, cursor:"pointer", height:5 }}/>
    </div>
  );
}
const StatusPill = ({ ok, children }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:5, borderRadius:9999, padding:"0.18rem 0.6rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.68rem", background: ok?"#f3e8ff":"#fef3c7", color: ok?C.pillText:"#92400e", border:`1px solid ${ok?C.pillBorder:"#fde68a"}` }}>
    {ok && <Check style={{ width:11, height:11 }} strokeWidth={3}/>}{children}
  </span>
);

/* Mock 1: Profiling */
function MockProfiling() {
  const initial = [
    { name:"Ramesh Patel", region:"Nashik, MH", size:4.2, verified:true },
    { name:"Anita Devi", region:"Sambalpur, OD", size:2.8, verified:true },
    { name:"Suresh Kumar", region:"Guntur, AP", size:6.1, verified:true },
    { name:"Lakshmi Rao", region:"Warangal, TS", size:3.5, verified:false },
    { name:"Mohan Singh", region:"Ludhiana, PB", size:8.4, verified:false },
  ];
  const [rows, setRows] = useState(initial);
  const [minSize, setMinSize] = useState(0);
  const filtered = rows.filter(r => r.size >= minSize);
  const verified = rows.filter(r => r.verified).length;
  const th = { fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.66rem", letterSpacing:"0.08em", textTransform:"uppercase", color:"#9ca3af", textAlign:"left", padding:"0 0 0.6rem" };
  const td = { fontFamily:"'Inter', sans-serif", fontSize:"0.82rem", color:C.strong, padding:"0.6rem 0", borderTop:`1px solid ${C.cardBorder}` };
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.92rem", color:C.h, margin:0 }}>Onboarded Participants</p>
        <SmallPill>{verified}/{rows.length} VERIFIED</SmallPill>
      </div>
      <div style={{ background:"#fafafa", border:`1px solid ${C.cardBorder}`, borderRadius:10, padding:"0.8rem 1rem", marginBottom:14 }}>
        <Slider label="Filter: minimum farm size" value={minSize} min={0} max={9} step={0.5} unit=" ha" onChange={setMinSize}/>
        <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", color:C.body, margin:0 }}>Showing {filtered.length} of {rows.length} participants</p>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead><tr><th style={th}>Name</th><th style={th}>Region</th><th style={th}>Size</th><th style={{...th, textAlign:"right"}}>Identity</th></tr></thead>
        <tbody>
          {filtered.map((r) => {
            const realIdx = rows.indexOf(r);
            return (
              <tr key={r.name}>
                <td style={{...td, fontWeight:600, color:C.h}}>{r.name}</td>
                <td style={td}>{r.region}</td>
                <td style={td}>{r.size} ha</td>
                <td style={{...td, textAlign:"right"}}>
                  {r.verified
                    ? <StatusPill ok>Verified</StatusPill>
                    : <button onClick={()=>setRows(rs=>rs.map((x,i)=>i===realIdx?{...x,verified:true}:x))} style={{ cursor:"pointer", border:`1px solid #fde68a`, background:"#fffbeb", color:"#92400e", borderRadius:9999, padding:"0.2rem 0.65rem", fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.68rem" }}>Verify now →</button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* Mock 2: Satellite map boundary tool */
const FIELD_PRESETS = {
  "Field A — North block": [{x:70,y:55},{x:210,y:42},{x:240,y:120},{x:150,y:165},{x:55,y:130}],
  "Field B — River parcel": [{x:200,y:60},{x:340,y:80},{x:330,y:175},{x:215,y:160}],
};
function MockMap() {
  const VB_W = 400, VB_H = 250, MPP = 1.6;
  const [pts, setPts] = useState(FIELD_PRESETS["Field A — North block"]);
  const [active, setActiveField] = useState("Field A — North block");
  const wrapRef = useRef(null);
  const addPoint = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * VB_W;
    const y = ((e.clientY - rect.top) / rect.height) * VB_H;
    setPts(p => [...p, { x:Math.round(x), y:Math.round(y) }]);
    setActiveField("Custom boundary");
  };
  const shoelace = (p) => { if(p.length<3) return 0; let a=0; for(let i=0;i<p.length;i++){const j=(i+1)%p.length; a+=p[i].x*p[j].y - p[j].x*p[i].y;} return Math.abs(a/2); };
  const areaHa = (shoelace(pts) * MPP * MPP) / 10000;
  const risk = areaHa > 12 ? { t:"Medium", c:"#b45309", bg:"#fffbeb", bd:"#fde68a" } : { t:"Low", c:"#15803d", bg:"#f0fdf4", bd:"#bbf7d0" };
  const poly = pts.map(p=>`${p.x},${p.y}`).join(" ");
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10, flexWrap:"wrap", gap:8 }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.92rem", color:C.h, margin:0 }}>Boundary Mapping Tool</p>
        <div style={{ display:"flex", gap:6 }}>
          {Object.keys(FIELD_PRESETS).map(f => (
            <button key={f} onClick={()=>{setPts(FIELD_PRESETS[f]); setActiveField(f);}} style={{ cursor:"pointer", border:`1px solid ${active===f?C.primary:C.cardBorder}`, background:active===f?C.iconBg:C.white, color:active===f?C.primaryDark:C.body, borderRadius:8, padding:"0.25rem 0.6rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.68rem" }}>{f.split(" — ")[0]}</button>
          ))}
        </div>
      </div>
      <div ref={wrapRef} onClick={addPoint} style={{ position:"relative", width:"100%", borderRadius:12, overflow:"hidden", border:`1px solid ${C.cardBorder}`, cursor:"crosshair", aspectRatio:"400 / 250" }}>
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block" }}>
          <rect width={VB_W} height={VB_H} fill="#4a5a30"/>
          <polygon points="0,0 185,0 165,95 0,115" fill="#5d7339"/>
          <polygon points="185,0 400,0 400,82 165,95" fill="#79854a"/>
          <polygon points="0,115 165,95 152,185 0,212" fill="#8e8f55"/>
          <polygon points="165,95 400,82 400,172 152,185" fill="#62763b"/>
          <polygon points="0,212 152,185 205,250 0,250" fill="#9b9a5b"/>
          <polygon points="152,185 400,172 400,250 205,250" fill="#566a34"/>
          {[[300,30],[318,42],[290,48],[332,28],[308,58],[345,46]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="13" fill="#2f4524" opacity="0.85"/>)}
          <path d="M-10,130 Q120,150 200,120 T410,140" stroke="#5b86a8" strokeWidth="9" fill="none" opacity="0.75"/>
          <path d="M40,-10 Q90,120 60,260" stroke="#cfc9b6" strokeWidth="5" fill="none" opacity="0.8"/>
          {pts.length>1 && <polygon points={poly} fill="rgba(124,58,237,0.28)" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6 4"/>}
          {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#7c3aed" stroke="#fff" strokeWidth="2"/>)}
        </svg>
        <div style={{ position:"absolute", top:9, left:9, display:"inline-flex", alignItems:"center", gap:5, background:"rgba(17,24,39,0.72)", color:"#fff", borderRadius:7, padding:"0.25rem 0.55rem", fontFamily:"'Inter', sans-serif", fontSize:"0.62rem", fontWeight:600 }}>
          <Satellite style={{ width:12, height:12 }}/> Satellite view · 19.99°N 73.78°E
        </div>
        {pts.length>=3 && (
          <div style={{ position:"absolute", bottom:9, left:9, display:"inline-flex", alignItems:"center", gap:6, background:C.primary, color:"#fff", borderRadius:9999, padding:"0.32rem 0.8rem", fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", fontWeight:600, boxShadow:"0 4px 12px rgba(124,58,237,0.4)" }}>
            <CheckCircle style={{ width:13, height:13 }}/> {pts.length}-point boundary · {areaHa.toFixed(2)} ha
          </div>
        )}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:10, flexWrap:"wrap" }}>
        <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", color:C.body, display:"inline-flex", alignItems:"center", gap:5 }}><Crosshair style={{ width:13, height:13, color:C.primary }}/> Click the map to drop boundary points</span>
        <div style={{ flex:1 }}/>
        <button onClick={(e)=>{e.stopPropagation(); setPts(p=>p.slice(0,-1));}} style={{ cursor:"pointer", border:`1px solid ${C.cardBorder}`, background:C.white, color:C.strong, borderRadius:8, padding:"0.3rem 0.6rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.68rem", display:"inline-flex", alignItems:"center", gap:4 }}><RotateCcw style={{ width:12, height:12 }}/> Undo</button>
        <button onClick={(e)=>{e.stopPropagation(); setPts([]); setActiveField("Custom boundary");}} style={{ cursor:"pointer", border:`1px solid #fecaca`, background:"#fef2f2", color:"#dc2626", borderRadius:8, padding:"0.3rem 0.6rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.68rem", display:"inline-flex", alignItems:"center", gap:4 }}><Trash2 style={{ width:12, height:12 }}/> Clear</button>
      </div>
      <div style={{ display:"flex", gap:10, marginTop:10 }}>
        <div style={{ flex:1, background:C.iconBg, border:`1px solid ${C.pillBorder}`, borderRadius:10, padding:"0.6rem 0.9rem" }}>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.64rem", color:"#9ca3af", margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>Mapped Area</p>
          <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"1rem", color:C.h, margin:"2px 0 0" }}>{areaHa.toFixed(2)} hectares</p>
        </div>
        <div style={{ flex:1, background:risk.bg, border:`1px solid ${risk.bd}`, borderRadius:10, padding:"0.6rem 0.9rem" }}>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.64rem", color:"#9ca3af", margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>Deforestation Risk</p>
          <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"1rem", color:risk.c, margin:"2px 0 0" }}>● {risk.t}</p>
        </div>
      </div>
    </div>
  );
}

/* Mock 3: Crop & land-use mix */
const CROP_LIBRARY = [
  { name:"Rice (paddy)",          icon:Sprout, factor:-0.5 },
  { name:"Wheat",                 icon:Wheat,  factor:0.5 },
  { name:"Maize",                 icon:Wheat,  factor:0.6 },
  { name:"Sugarcane",             icon:Sprout, factor:0.8 },
  { name:"Cotton",                icon:Leaf,   factor:0.3 },
  { name:"Millet",                icon:Wheat,  factor:0.7 },
  { name:"Legumes / Pulses",      icon:Leaf,   factor:1.0 },
  { name:"Cover crops",           icon:Leaf,   factor:1.5 },
  { name:"Agroforestry / Trees",  icon:Trees,  factor:3.0 },
];
function MockCrops() {
  const [rows, setRows] = useState([{ ci:1, ha:20 }, { ci:8, ha:8 }]);
  const [pick, setPick] = useState(0);
  const add = () => setRows(r => [...r, { ci:pick, ha:5 }]);
  const remove = i => setRows(r => r.filter((_,idx)=>idx!==i));
  const setHa = (i,ha) => setRows(r => r.map((x,idx)=>idx===i?{...x,ha}:x));
  const totalHa = rows.reduce((s,r)=>s+r.ha,0);
  const net = rows.reduce((s,r)=>s + r.ha*CROP_LIBRARY[r.ci].factor, 0);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.92rem", color:C.h, margin:0 }}>Crop & Land-Use Configuration</p>
        <SmallPill>{totalHa} HA · {rows.length} CROPS</SmallPill>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <select value={pick} onChange={e=>setPick(Number(e.target.value))} style={{ flex:1, border:"1px solid #e5e7eb", borderRadius:9, padding:"0.55rem 0.7rem", fontFamily:"'Inter', sans-serif", fontSize:"0.8rem", color:C.h, background:C.white, outline:"none", cursor:"pointer" }}>
          {CROP_LIBRARY.map((c,i)=>(
            <option key={c.name} value={i}>{c.name}  ·  {c.factor>0?"+":""}{c.factor} tCO₂e/ha/yr</option>
          ))}
        </select>
        <button onClick={add} style={{ background:grad, color:"#fff", border:"none", borderRadius:9, padding:"0 1rem", fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.78rem", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5 }}><Plus style={{ width:14, height:14 }}/> Add crop</button>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {rows.length===0 && (
          <div style={{ textAlign:"center", padding:"1.5rem", border:`1px dashed ${C.pillBorder}`, borderRadius:12, fontFamily:"'Inter', sans-serif", fontSize:"0.82rem", color:C.body }}>No crops added yet — pick one above and hit “Add crop”.</div>
        )}
        {rows.map((r,i) => {
          const crop = CROP_LIBRARY[r.ci]; const Icon = crop.icon;
          const contrib = r.ha * crop.factor;
          const pos = contrib >= 0;
          return (
            <div key={i} style={{ border:`1px solid ${C.cardBorder}`, borderRadius:12, padding:"0.85rem 1rem" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                  <span style={{ width:30, height:30, borderRadius:8, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon style={{ color:C.primary, width:15, height:15 }}/></span>
                  <span style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.86rem", color:C.h }}>{crop.name}</span>
                </div>
                <button onClick={()=>remove(i)} style={{ border:"1px solid #fecaca", background:"#fef2f2", color:"#dc2626", borderRadius:7, padding:"0.25rem 0.4rem", cursor:"pointer", display:"inline-flex" }}><Trash2 style={{ width:13, height:13 }}/></button>
              </div>
              <Slider label="Area under this crop" value={r.ha} min={0} max={200} step={1} unit=" ha" onChange={ha=>setHa(i,ha)}/>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.74rem", margin:0, color:pos?"#15803d":"#b45309", fontWeight:600 }}>
                Net carbon: {pos?"+":""}{contrib.toFixed(1)} tCO₂e/yr {!pos && "· offset via improved practices"}
              </p>
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", gap:10, marginTop:14 }}>
        <div style={{ flex:1, background:C.iconBg, border:`1px solid ${C.pillBorder}`, borderRadius:10, padding:"0.7rem 0.9rem" }}>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.64rem", color:"#9ca3af", margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>Total Cropped Area</p>
          <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"1.05rem", color:C.h, margin:"2px 0 0" }}>{totalHa} hectares</p>
        </div>
        <div style={{ flex:1, background: net>=0?"#f0fdf4":"#fffbeb", border:`1px solid ${net>=0?"#bbf7d0":"#fde68a"}`, borderRadius:10, padding:"0.7rem 0.9rem" }}>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.64rem", color:"#9ca3af", margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>Est. Net Annual Impact</p>
          <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"1.05rem", color: net>=0?"#15803d":"#b45309", margin:"2px 0 0" }}>{net>=0?"+":""}{net.toFixed(1)} tCO₂e/yr</p>
        </div>
      </div>
      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.72rem", color:C.body, marginTop:10, marginBottom:0 }}>
        Each crop carries its own factor — flooded paddy is a net emitter, while agroforestry and cover crops drive removals. This mix feeds directly into baseline modeling and the quantification engine.
      </p>
    </div>
  );
}

/* Mock 4: Baseline modeling */
function MockChart() {
  const [area, setArea] = useState(50);
  const [rate, setRate] = useState(8);
  const baseRate = 0.5;
  const years = [2024,2025,2026,2027];
  const data = years.map((yr,i) => ({ yr, base: area*baseRate, proj: area*baseRate*(1 + (rate/100)*(i*2)) }));
  const max = Math.max(...data.map(d=>d.proj), 1);
  const uplift = Math.round(((data[3].proj - data[3].base) / data[3].base) * 100);
  return (
    <div>
      <div style={{ background:"#fafafa", border:`1px solid ${C.cardBorder}`, borderRadius:10, padding:"0.8rem 1rem", marginBottom:14 }}>
        <Slider label="Project land area" value={area} min={5} max={500} step={5} unit=" ha" onChange={setArea}/>
        <Slider label="Annual practice improvement" value={rate} min={2} max={20} step={1} unit="% / yr" onChange={setRate}/>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.88rem", color:C.h, margin:0 }}>Baseline vs Projected (tCO₂e)</p>
        <div style={{ display:"flex", gap:12, fontFamily:"'Inter', sans-serif", fontSize:"0.66rem", color:C.body }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:5 }}><span style={{ width:9, height:9, borderRadius:2, background:"#d1d5db" }}/>Baseline</span>
          <span style={{ display:"inline-flex", alignItems:"center", gap:5 }}><span style={{ width:9, height:9, borderRadius:2, background:C.primary }}/>Projected</span>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-around", height:150, borderBottom:`1px solid ${C.cardBorder}` }}>
        {data.map(d => (
          <div key={d.yr} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:7, flex:1 }}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:120 }}>
              <div style={{ width:16, height:`${(d.base/max)*100}%`, background:"#e5e7eb", borderRadius:"4px 4px 0 0", transition:"height .3s" }}/>
              <div style={{ width:16, height:`${(d.proj/max)*100}%`, background:grad, borderRadius:"4px 4px 0 0", boxShadow:"0 2px 8px rgba(124,58,237,0.25)", transition:"height .3s" }}/>
            </div>
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", fontWeight:600, color:C.body }}>{d.yr}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.78rem", color:C.body, marginTop:12, marginBottom:0 }}>
        By 2027, projected sequestration outpaces baseline by <strong style={{ color:C.primary }}>+{uplift}%</strong> ({Math.round(data[3].proj)} tCO₂e/yr) under VM0042 methodology.
      </p>
    </div>
  );
}

/* Mock 5: Monitoring */
function MockMonitoring() {
  const [moisture, setMoisture] = useState(42);
  const [biomass, setBiomass] = useState(14);
  const [sync, setSync] = useState("2 mins ago");
  const status = moisture < 30 ? { t:"Too dry", c:"#b45309" } : moisture > 70 ? { t:"Saturated", c:"#1d4ed8" } : { t:"Optimal range", c:"#15803d" };
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.92rem", color:C.h, margin:0 }}>Live Field Telemetry</p>
        <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", fontWeight:600, color:"#15803d" }}>
          <span style={{ position:"relative", display:"inline-flex", width:8, height:8 }}>
            <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#22c55e", opacity:.7, animation:"ping 1.5s cubic-bezier(0,0,.2,1) infinite" }}/>
            <span style={{ position:"relative", width:8, height:8, borderRadius:"50%", background:"#22c55e", display:"block" }}/>
          </span>Streaming
        </span>
      </div>
      <div style={{ background:"#fafafa", border:`1px solid ${C.cardBorder}`, borderRadius:10, padding:"0.8rem 1rem", marginBottom:14 }}>
        <Slider label="Soil moisture sensor" value={moisture} min={0} max={100} step={1} unit="%" onChange={setMoisture}/>
        <Slider label="Biomass growth index" value={biomass} min={-10} max={40} step={1} unit="%" onChange={setBiomass}/>
        <button onClick={()=>setSync("just now")} style={{ cursor:"pointer", border:`1px solid ${C.pillBorder}`, background:C.iconBg, color:C.primary, borderRadius:9, padding:"0.45rem 0.9rem", fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.74rem", display:"inline-flex", alignItems:"center", gap:6 }}><RotateCcw style={{ width:13, height:13 }}/> Sync sensors now</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {[
          { icon:Droplets,    label:"Soil Moisture", value:`${moisture}%`, note:status.t, nc:status.c },
          { icon:Sprout,      label:"Biomass Index", value:`${biomass>0?"+":""}${biomass}%`, note:"vs last month", nc:"#9ca3af" },
          { icon:Thermometer, label:"Soil Temp",     value:"24°C", note:"Within target", nc:"#9ca3af" },
          { icon:Wifi,        label:"Latest Sync",   value:sync, note:"38 sensors live", nc:"#9ca3af" },
        ].map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} style={{ background:C.white, border:`1px solid ${C.cardBorder}`, borderRadius:12, padding:"0.85rem 1rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
                <span style={{ width:28, height:28, borderRadius:8, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon style={{ color:C.primary, width:14, height:14 }}/></span>
                <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.72rem", color:C.body }}>{m.label}</span>
              </div>
              <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"1.15rem", color:C.h, margin:0 }}>{m.value}</p>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.66rem", color:m.nc, margin:"2px 0 0", fontWeight:600 }}>{m.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Mock 6: Quantification calculator */
function MockQuantify() {
  const [area, setArea] = useState(120);
  const [rate, setRate] = useState(1.8);
  const [years, setYears] = useState(5);
  const [biochar, setBiochar] = useState(60);
  const [avoided, setAvoided] = useState(140);
  const [price, setPrice] = useState(18);
  const soilSeq = area * rate * years;
  const biocharSeq = biochar * 2.5;
  const gross = soilSeq + biocharSeq + avoided;
  const buffer = gross * 0.15;
  const net = Math.max(gross - buffer, 0);
  const value = net * price;
  const fmt = n => Math.round(n).toLocaleString();
  const row = (label, val, sub) => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.55rem 0", borderTop:`1px solid ${C.cardBorder}` }}>
      <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.82rem", color:C.strong }}>{label}{sub && <span style={{ color:"#9ca3af", fontSize:"0.72rem" }}> {sub}</span>}</span>
      <span style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.86rem", color:C.h }}>{val}</span>
    </div>
  );
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <div style={{ background:"#fafafa", border:`1px solid ${C.cardBorder}`, borderRadius:12, padding:"1rem" }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.82rem", color:C.h, margin:"0 0 12px" }}>Project inputs</p>
        <Slider label="Land area" value={area} min={5} max={1000} step={5} unit=" ha" onChange={setArea}/>
        <Slider label="Sequestration rate" value={rate} min={0.5} max={4} step={0.1} unit=" tCO₂e/ha/yr" onChange={setRate}/>
        <Slider label="Crediting period" value={years} min={1} max={10} step={1} unit=" yrs" onChange={setYears}/>
        <Slider label="Biochar applied" value={biochar} min={0} max={500} step={5} unit=" t" onChange={setBiochar}/>
        <Slider label="Avoided emissions" value={avoided} min={0} max={600} step={10} unit=" tCO₂e" onChange={setAvoided}/>
        <Slider label="Credit price" value={price} min={5} max={50} step={1} unit=" $/t" onChange={setPrice}/>
      </div>
      <div>
        <div style={{ background:grad, borderRadius:14, padding:"1.2rem", color:"#fff", boxShadow:"0 8px 24px rgba(124,58,237,0.3)" }}>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.82)", margin:0 }}>Net Verified Credits</p>
          <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"2.1rem", margin:"2px 0 8px", letterSpacing:"-0.02em" }}>{fmt(net)} <span style={{ fontSize:"1rem", fontWeight:600 }}>tCO₂e</span></p>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.95rem" }}>
            <DollarSign style={{ width:16, height:16 }}/> {fmt(value)} <span style={{ fontWeight:500, fontSize:"0.78rem", opacity:.85 }}>est. credit value</span>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10 }}>
            {["Verra VM0042 Aligned","Gold Standard"].map(b => (
              <span key={b} style={{ display:"inline-flex", alignItems:"center", gap:4, background:"rgba(255,255,255,0.18)", borderRadius:9999, padding:"0.2rem 0.6rem", fontFamily:"'Inter', sans-serif", fontSize:"0.66rem", fontWeight:600 }}>
                <Check style={{ width:11, height:11 }} strokeWidth={3}/> {b} <ChevronDown style={{ width:11, height:11, opacity:.7 }}/>
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop:12 }}>
          {row("Soil organic carbon", `${fmt(soilSeq)} tCO₂e`, `(${area}ha × ${rate} × ${years}y)`)}
          {row("Biochar sequestration", `${fmt(biocharSeq)} tCO₂e`)}
          {row("Avoided emissions", `${fmt(avoided)} tCO₂e`)}
          {row("Uncertainty buffer", `− ${fmt(buffer)} tCO₂e`, "(15%)")}
        </div>
      </div>
    </div>
  );
}

/* Mock 7: Reporting */
function MockReporting() {
  const allDocs = [
    ["Registry_Submission_VM0042.pdf", "2.4 MB"],
    ["Third-Party_Verification.pdf", "1.1 MB"],
    ["Investor_Impact_Summary.pdf", "880 KB"],
  ];
  const [sel, setSel] = useState({ 0:true, 1:true, 2:false });
  const [phase, setPhase] = useState("idle");
  const [prog, setProg] = useState(0);
  const timer = useRef(null);
  useEffect(() => () => { if(timer.current) clearInterval(timer.current); }, []);
  const generate = () => {
    setPhase("running"); setProg(0);
    timer.current = setInterval(() => {
      setProg(p => { if(p>=100){ clearInterval(timer.current); setPhase("done"); return 100; } return p+4; });
    }, 55);
  };
  const chosen = allDocs.filter((_,i)=>sel[i]);
  return (
    <div>
      <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.92rem", color:C.h, margin:"0 0 12px" }}>Audit Package Builder</p>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
        {allDocs.map(([name,size],i) => (
          <label key={name} style={{ display:"flex", alignItems:"center", gap:11, border:`1px solid ${sel[i]?C.pillBorder:C.cardBorder}`, background:sel[i]?C.iconBg:C.white, borderRadius:10, padding:"0.6rem 0.9rem", cursor:"pointer" }}>
            <span onClick={()=>setSel(s=>({...s,[i]:!s[i]}))} style={{ width:20, height:20, borderRadius:5, border:`2px solid ${sel[i]?C.primary:"#d1d5db"}`, background:sel[i]?C.primary:C.white, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {sel[i] && <Check style={{ color:"#fff", width:12, height:12 }} strokeWidth={3}/>}
            </span>
            <FileText style={{ color:C.primary, width:15, height:15, flexShrink:0 }}/>
            <span style={{ flex:1, fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.8rem", color:C.h, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{name}</span>
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.68rem", color:"#9ca3af" }}>{size}</span>
          </label>
        ))}
      </div>
      {phase==="idle" && (
        <button onClick={generate} disabled={!chosen.length} style={{ width:"100%", cursor:chosen.length?"pointer":"not-allowed", opacity:chosen.length?1:0.5, background:grad, color:"#fff", border:"none", borderRadius:10, padding:"0.75rem", fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.84rem", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7 }}>
          <FileCheck style={{ width:16, height:16 }}/> Generate audit package ({chosen.length} docs)
        </button>
      )}
      {phase==="running" && (
        <div style={{ background:"#fafafa", border:`1px solid ${C.cardBorder}`, borderRadius:10, padding:"0.9rem 1.1rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:9 }}>
            <span style={{ fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.82rem", color:C.strong }}>Compiling audit trail…</span>
            <span style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.82rem", color:C.primary }}>{prog}%</span>
          </div>
          <div style={{ height:8, borderRadius:9999, background:"#ede9fe", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${prog}%`, borderRadius:9999, background:grad, transition:"width .1s linear" }}/>
          </div>
        </div>
      )}
      {phase==="done" && (
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:7, color:"#15803d", fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.82rem", marginBottom:10 }}>
            <CheckCircle style={{ width:16, height:16 }}/> Package ready — {chosen.length} documents compiled
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {chosen.map(([name,size]) => (
              <div key={name} style={{ display:"flex", alignItems:"center", gap:11, border:`1px solid ${C.cardBorder}`, borderRadius:10, padding:"0.6rem 0.9rem" }}>
                <span style={{ width:30, height:30, borderRadius:8, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><FileText style={{ color:C.primary, width:15, height:15 }}/></span>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.8rem", color:C.h, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{name}</p>
                  <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.68rem", color:"#9ca3af", margin:0 }}>{size}</p>
                </div>
                <button style={{ display:"inline-flex", alignItems:"center", gap:5, background:C.iconBg, color:C.primary, border:`1px solid ${C.pillBorder}`, borderRadius:8, padding:"0.35rem 0.7rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.72rem", cursor:"pointer", flexShrink:0 }}><Download style={{ width:13, height:13 }}/> PDF</button>
              </div>
            ))}
          </div>
          <button onClick={()=>{setPhase("idle"); setProg(0);}} style={{ marginTop:10, cursor:"pointer", border:`1px solid ${C.cardBorder}`, background:C.white, color:C.body, borderRadius:8, padding:"0.4rem 0.8rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.72rem", display:"inline-flex", alignItems:"center", gap:5 }}><RotateCcw style={{ width:12, height:12 }}/> Regenerate</button>
        </div>
      )}
    </div>
  );
}

const MOCKS = [MockProfiling, MockMap, MockCrops, MockChart, MockMonitoring, MockQuantify, MockReporting];

function PlatformDemo() {
  const [active, setActive] = useState(0);
  const narrow = useNarrow(900);
  const ActiveMock = MOCKS[active];
  return (
    <section id="dashboard" style={{ background:C.white, padding:"5rem 2rem", scrollMarginTop:70 }}>
      <style>{`@keyframes demoFade { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:translateY(0);} }`}</style>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center", marginBottom:48 }}>
          <Eyebrow>See it in action</Eyebrow>
          <H as="h2" style={{ fontSize:"2.4rem", marginTop:12 }}>One platform, the full dMRV lifecycle</H>
          <Body style={{ marginTop:10, maxWidth:540, margin:"10px auto 0" }}>Click through the workflow — drag the sliders, map a boundary, and run the carbon calculator live.</Body>
        </FadeUp>
        <div style={{ display:"grid", gridTemplateColumns: narrow ? "1fr" : "0.82fr 1.18fr", gap:24, alignItems:"start" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {DEMO_TABS.map((t,i) => {
              const Icon = t.icon; const on = i===active;
              return (
                <button key={t.title} onClick={()=>setActive(i)} style={{ textAlign:"left", cursor:"pointer", width:"100%", background:on?C.iconBg:C.white, border:`1px solid ${on?C.primary:C.cardBorder}`, borderRadius:16, padding:"1rem 1.1rem", boxShadow:on?"0 4px 16px rgba(124,58,237,0.12)":"0 1px 6px rgba(0,0,0,0.03)", transition:"all .2s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ width:38, height:38, borderRadius:11, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background:on?grad:C.iconBg, transition:"all .2s" }}><Icon style={{ color:on?"#fff":C.primary, width:18, height:18 }} strokeWidth={1.9}/></span>
                    <span style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.92rem", color:on?C.primaryDark:C.h }}>{t.title}</span>
                  </div>
                  {on && <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.8rem", lineHeight:1.6, color:C.body, margin:"10px 0 0 50px", animation:"demoFade .35s ease" }}>{t.desc}</p>}
                </button>
              );
            })}
          </div>
          <div style={{ borderRadius:16, border:`1px solid #e5e7eb`, overflow:"hidden", boxShadow:"0 24px 60px rgba(124,58,237,0.16)", background:C.white }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"0.7rem 1rem", borderBottom:`1px solid ${C.cardBorder}`, background:"#fafafa" }}>
              <span style={{ width:11, height:11, borderRadius:"50%", background:"#ff5f57" }}/>
              <span style={{ width:11, height:11, borderRadius:"50%", background:"#febc2e" }}/>
              <span style={{ width:11, height:11, borderRadius:"50%", background:"#28c840" }}/>
              <div style={{ flex:1, marginLeft:8, background:C.white, border:`1px solid ${C.cardBorder}`, borderRadius:7, padding:"0.25rem 0.7rem", fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", color:"#9ca3af", textAlign:"center", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                app.emertech.io / {DEMO_TABS[active].title.toLowerCase().replace(/[^a-z]+/g,"-")}
              </div>
            </div>
            <div key={active} style={{ padding:"1.5rem", minHeight:340, animation:"demoFade .4s ease" }}><ActiveMock/></div>
          </div>
        </div>
        <FadeUp delay={120} style={{ textAlign:"center", marginTop:48 }}>
          <Btn onClick={go("contact")} style={{ padding:"0.85rem 2rem", fontSize:"0.95rem", boxShadow:"0 8px 26px rgba(124,58,237,0.35)" }}>Request a Full Platform Demo <ArrowRight style={{ width:17, height:17 }}/></Btn>
        </FadeUp>
      </div>
    </section>
  );
}

/* ================================================================
   REGIONAL CALLOUT
================================================================ */
function RegionalCallout() {
  return (
    <section style={{ background:C.white, padding:"3rem 2rem" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <FadeUp>
          <div style={{ background:"#faf9ff", border:`1px solid ${C.pillBorder}`, borderRadius:22, padding:"2.8rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" }}>
              <div>
                <Pill><Globe style={{ width:12, height:12 }}/> Regional compliance bridge</Pill>
                <H as="h2" style={{ marginTop:18, fontSize:"2.2rem" }}>Are you a <span style={{ background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>farmer</span> or project owner?</H>
                <Body style={{ marginTop:14, fontSize:"0.9rem" }}>Indian agricultural projects can now earn credits under the mandatory <strong style={{ color:C.h }}>Carbon Credit Trading Scheme (CCTS) 2023</strong> under India's Energy Conservation Act.</Body>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem 1rem", marginTop:18 }}>
                  {["Unified data for CCTS & international registries","Integrated QR labelling for BEE portal","One-click dual-compliance audit trail","NABARD & MoEFCC aligned reporting"].map(pt => (
                    <div key={pt} style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
                      <CheckCircle2 style={{ color:C.primary, width:15, height:15, flexShrink:0, marginTop:3 }}/>
                      <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.84rem", color:C.strong }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ background:C.white, borderRadius:14, padding:"1.3rem", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", border:`1px solid ${C.cardBorder}` }}>
                  <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.87rem", lineHeight:1.7, color:C.strong, fontStyle:"italic", margin:0 }}>"Manage both national and international compliance frameworks from a single, unified dashboard."</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:12 }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center" }}><ShieldCheck style={{ color:C.primary, width:15, height:15 }}/></div>
                    <div>
                      <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.84rem", color:C.h, margin:0 }}>Compliance Expert</p>
                      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.74rem", color:C.body, margin:0 }}>Regulatory Strategy Team</p>
                    </div>
                  </div>
                </div>
                <Btn onClick={go("contact")} style={{ justifyContent:"center", padding:"0.8rem 1rem" }}>Explore CCTS Solutions <ArrowRight style={{ width:15, height:15 }}/></Btn>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ================================================================
   CARBON CREDITS — "Monetise verified impact"
================================================================ */
function CarbonCredits() {
  const steps = [
    { icon:Sprout,     tag:"GENERATE",    title:"Issue verified credits", desc:"Convert audited field data into issuance-ready carbon credits aligned with Verra, Gold Standard, and CCTS methodologies." },
    { icon:TrendingUp, tag:"SELL",        title:"Reach global buyers",    desc:"List and transact your credits across leading registries and exchanges, with transparent pricing and full end-to-end provenance." },
    { icon:BadgeCheck, tag:"BUY & OFFSET",title:"Source with integrity",  desc:"Procure high-integrity credits to meet your own net-zero and CSR commitments — every tonne fully traceable and audit-backed." },
  ];
  const markets = ["Verra · VCS Registry","Gold Standard Marketplace","Xpansiv CBL","Climate Impact X (CIX)","AirCarbon Exchange (ACX)","India CCTS · Carbon Market"];
  return (
    <section id="carbon-credits" style={{ background:C.white, padding:"5rem 2rem", scrollMarginTop:70 }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center" }}>
          <Eyebrow>Monetise verified impact</Eyebrow>
          <H as="h2" style={{ fontSize:"2.4rem", maxWidth:700, margin:"12px auto 0" }}>Generate, sell, and buy carbon credits — end&nbsp;to&nbsp;end</H>
          <Body style={{ marginTop:12, maxWidth:600, margin:"12px auto 0" }}>Emertech doesn't stop at measurement. We transform your verified tonnes into registry-grade carbon credits — and connect you to the buyers, registries, and exchanges that value high-integrity climate assets.</Body>
        </FadeUp>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:48 }}>
          {steps.map((c,i) => {
            const Icon = c.icon;
            return (
              <FadeUp key={c.title} delay={i*80}>
                <Card style={{ padding:"1.75rem", height:"100%", boxSizing:"border-box" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                    <div style={{ width:46, height:46, borderRadius:13, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon style={{ color:C.primary, width:21, height:21 }} strokeWidth={1.8}/></div>
                    <SmallPill>{c.tag}</SmallPill>
                  </div>
                  <H as="h3" style={{ fontSize:"1.02rem", marginBottom:10 }}>{c.title}</H>
                  <Body style={{ fontSize:"0.86rem" }}>{c.desc}</Body>
                </Card>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp delay={140}>
          <div style={{ marginTop:36, borderRadius:24, padding:"2.6rem", background:grad, color:"#fff", position:"relative", overflow:"hidden", boxShadow:"0 24px 60px rgba(124,58,237,0.32)" }}>
            <div style={{ position:"absolute", right:-50, top:-50, width:240, height:240, borderRadius:"50%", background:"rgba(255,255,255,0.08)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", left:-30, bottom:-60, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
            <div style={{ position:"relative" }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.16)", borderRadius:9999, padding:"0.32rem 0.9rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.74rem", color:"#fff" }}><Globe style={{ width:13, height:13 }}/> Market connectivity layer</span>
              <H as="h3" style={{ color:"#fff", fontSize:"1.7rem", marginTop:14, maxWidth:620 }}>Plug into the world's leading carbon markets</H>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.92rem", lineHeight:1.7, color:"rgba(255,255,255,0.86)", marginTop:10, maxWidth:640 }}>Through Emertech's connectivity layer, your credits arrive transaction-ready across the registries and exchanges that set global carbon pricing — so impact converts into revenue without friction.</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:22 }}>
                {markets.map(m => (
                  <span key={m} style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.22)", borderRadius:12, padding:"0.55rem 1rem", fontFamily:"'Inter', sans-serif", fontWeight:600, fontSize:"0.82rem", color:"#fff" }}>
                    <CheckCircle2 style={{ width:14, height:14 }}/> {m}
                  </span>
                ))}
              </div>
              <button onClick={go("contact")} style={{ marginTop:26, background:"#fff", color:C.primaryDark, border:"none", borderRadius:9999, fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.9rem", padding:"0.75rem 1.7rem", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:7, boxShadow:"0 6px 20px rgba(0,0,0,0.18)" }}>
                Talk to our carbon markets team <ArrowRight style={{ width:16, height:16 }}/>
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ================================================================
   WHY EMERTECH
================================================================ */
const PILLARS = [
  { icon:Activity,   title:"Comprehensive MRV management",  desc:"End-to-end project tracking keeps every stakeholder aligned, with progress visibility and risk flags across your verification pipeline." },
  { icon:Users,      title:"Customised onboarding support", desc:"Kickoff calls set clear expectations. Live sessions address team-specific needs. One-on-one guidance ensures smooth data entry and platform adoption." },
  { icon:ShieldCheck,title:"Dedicated MRV expertise",       desc:"Direct assistance throughout the process. Our specialists stay current with evolving carbon standards and reporting frameworks." },
];
const FEATURES = [
  ["Full regulatory compliance",    "Built for leading carbon registries, updated as methodologies evolve."],
  ["QR & API-based access",         "Each project links to its digital MRV record via secure, shareable access."],
  ["Automated carbon calculations", "Sequestration and emissions computed automatically from verified inputs."],
  ["Real-time field monitoring",    "Live dashboards for every project and credit in the field."],
  ["IoT & satellite integration",   "Plug-and-play connectors for field sensors and remote-sensing data."],
  ["Audit-ready trails",            "Tamper-evident records that stand up to third-party verification."],
];
function WhyEmertech() {
  return (
    <section id="why-emertech" style={{ background:C.sectionAlt, padding:"5rem 2rem", scrollMarginTop:70 }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <FadeUp style={{ textAlign:"center" }}>
          <Eyebrow>Why Emertech</Eyebrow>
          <H as="h2" style={{ fontSize:"2.4rem", marginTop:12, maxWidth:580, margin:"12px auto 0" }}>A team that makes your daily operations easier</H>
          <Body style={{ marginTop:10, maxWidth:480, margin:"10px auto 0" }}>We provide expert guidance, tailored support, and proactive management for a smooth transition and long-term success.</Body>
        </FadeUp>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:32, marginTop:50 }}>
          {PILLARS.map((p,i) => {
            const Icon = p.icon;
            return (
              <FadeUp key={p.title} delay={i*90}>
                <div style={{ width:44, height:44, borderRadius:12, background:C.iconBg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}><Icon style={{ color:C.primary, width:20, height:20 }}/></div>
                <H as="h3" style={{ fontSize:"1.02rem", marginBottom:10 }}>{p.title}</H>
                <Body style={{ fontSize:"0.86rem" }}>{p.desc}</Body>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp delay={120}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginTop:44 }}>
            {FEATURES.map(([title,body]) => (
              <div key={title} style={{ display:"flex", gap:11, background:C.white, border:`1px solid ${C.cardBorder}`, borderRadius:13, padding:"1rem 1.1rem", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
                <CheckCircle2 style={{ color:C.primary, width:17, height:17, flexShrink:0, marginTop:2 }}/>
                <div>
                  <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.86rem", color:C.h, margin:"0 0 3px" }}>{title}</p>
                  <Body style={{ fontSize:"0.8rem" }}>{body}</Body>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
================================================================ */
function Footer() {
  const ecoLinks = [
    { icon:DollarSign, title:"Monetise verified impact",       sub:"Generate, sell & buy carbon credits", to:"carbon-credits" },
    { icon:FileText,   title:"What is Agri-dMRV?",              sub:"Read the introductory guide" },
    { icon:Activity,   title:"Strategic Implications for 2027", sub:"Comprehensive guide for project owners" },
  ];
  const contacts = [
    { icon:Phone,  text:"+91 22 4000 1200" },
    { icon:MapPin, text:"A 609, Shelton Sapphire, Sector 15, CBD Belapur, Navi Mumbai, Maharashtra - 400614" },
    { icon:Mail,   text:"support@emertech.io" },
  ];
  return (
    <footer style={{ background:C.footerBg, color:"#fff" }}>
      <div style={{ maxWidth:1180, margin:"0 auto", padding:"4rem 2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem" }}>
          <div>
            <H as="h3" style={{ fontSize:"1.45rem", color:"#fff" }}>Explore our broader ecosystem</H>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.86rem", lineHeight:1.7, color:"rgba(199,185,255,0.72)", marginTop:10, maxWidth:380 }}>Emertech builds comprehensive compliance, traceability, and sustainability solutions across global supply chains.</p>
            <a href="https://emertech.io/" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:7, marginTop:18, border:"1px solid rgba(255,255,255,0.22)", borderRadius:9999, padding:"0.6rem 1.2rem", fontSize:"0.84rem", fontFamily:"'Inter', sans-serif", fontWeight:600, color:"#fff", textDecoration:"none", transition:"border-color .2s, background .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.45)";e.currentTarget.style.background="rgba(255,255,255,0.06)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.22)";e.currentTarget.style.background="";}}>
              Visit Emertech.io <ArrowRight style={{ width:13, height:13 }}/>
            </a>
            <div style={{ marginTop:26, display:"flex", flexDirection:"column", gap:11 }}>
              {contacts.map((c,i) => {
                const Icon = c.icon;
                return (<div key={i} style={{ display:"flex", alignItems:"flex-start", gap:9 }}><Icon style={{ color:"#a78bfa", width:14, height:14, marginTop:3, flexShrink:0 }}/><span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.81rem", color:"rgba(199,185,255,0.72)", lineHeight:1.6 }}>{c.text}</span></div>);
              })}
            </div>
          </div>
          <div>
            <H as="h3" style={{ fontSize:"1.45rem", color:"#fff" }}>Learn more on this</H>
            <div style={{ marginTop:18, display:"flex", flexDirection:"column", gap:12 }}>
              {ecoLinks.map(l => {
                const Icon = l.icon;
                return (
                  <a key={l.title} href={l.to?`#${l.to}`:"#"} onClick={l.to?go(l.to):(e=>e.preventDefault())} style={{ display:"flex", alignItems:"center", gap:13, borderRadius:14, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", padding:"1rem 1.2rem", textDecoration:"none", transition:"background .2s, border-color .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";}}>
                    <div style={{ width:38, height:38, borderRadius:9, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon style={{ color:"rgba(199,185,255,0.85)", width:17, height:17 }}/></div>
                    <div>
                      <p style={{ fontFamily:"'Inter', sans-serif", fontWeight:700, fontSize:"0.88rem", color:"#fff", margin:0 }}>{l.title}</p>
                      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.76rem", color:"rgba(199,185,255,0.6)", margin:0 }}>{l.sub}</p>
                    </div>
                    <ArrowRight style={{ color:"rgba(199,185,255,0.55)", width:14, height:14, marginLeft:"auto" }}/>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ marginTop:44, paddingTop:18, borderTop:"1px solid rgba(255,255,255,0.09)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.78rem", color:"rgba(199,185,255,0.45)", margin:0 }}>© 2026 Emertech. All rights reserved.</p>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.78rem", color:"rgba(199,185,255,0.45)", margin:0 }}>Agricultural dMRV platform — collect, verify, report.</p>
        </div>
      </div>
    </footer>
  );
}

function StickyBottomCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position:"fixed", bottom:18, right:18, zIndex:40, opacity:show?1:0, transform:show?"translateY(0)":"translateY(14px)", pointerEvents:show?"auto":"none", transition:"all .3s" }}>
      <Btn onClick={go("contact")} style={{ boxShadow:"0 6px 22px rgba(124,58,237,0.38)" }}>Get in Touch <ArrowRight style={{ width:14, height:14 }}/></Btn>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ minHeight:"100vh", background:C.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { font-family:'Inter', sans-serif; font-weight:400; line-height:1.7; -webkit-font-smoothing:antialiased; }
        @keyframes ping { 75%,100% { transform:scale(2); opacity:0; } }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#c4b5fd; border-radius:3px; }
      `}</style>
      <Navbar/>
      <main>
        <Hero/>
        <ValueProp/>
        <SolutionsGrid/>
        <PlatformDemo/>
        <RegionalCallout/>
        <CarbonCredits/>
        <WhyEmertech/>
      </main>
      <Footer/>
      <StickyBottomCTA/>
    </div>
  );
}
