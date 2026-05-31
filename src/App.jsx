import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { GraduationCap, Sparkles, Briefcase } from "lucide-react";
import { PROJECTS, CaseStudyView, CSImage } from "./caseStudies.jsx";
import { ARTICLES, ArticleView, ArticlesIndexView } from "./articles.jsx";
import { EncryptedText, MagneticButton, CometCard, BackgroundGradient } from "./effects.jsx";
import manthanPhoto from "./manthan.jpg";

/* ============================================================
   DATA
============================================================ */

const NAME = "Manthan Jha";
const ROLE = "Product Manager — fintech · AI";

/* Headline alternates considered:
   "Turning financial complexity into products people trust."
   "I ship the unglamorous details that make products work."
*/
const HEADLINE = "I make complicated products feel obvious.";
/* Hero intro is rendered inline in <Hero> below (it contains links). */

/* ABOUT — credential chips for hero (2x2).
   `Icon` is a Lucide component — swap any one to change that chip's icon. */
const CREDENTIALS = [
  { Icon: GraduationCap, label: "IIT Roorkee" },
  { Icon: Sparkles,      label: "AI Product Manager" },
  { Icon: Briefcase,     label: "Finrep · Accel-backed" },
  { dot: true,           label: "Open to PM / APM roles" },
];

/* ABOUT modal content */
const ABOUT_BIO_LEFT  = "I'm Manthan. A PM who finds clarity in regulated, high-stakes products. My best work happens when the data is messy, the spec is moving, and the user has zero patience for cleverness.";
const ABOUT_BIO_RIGHT = "Outside work I'm usually deep in a product teardown, hunting good coffee, or arguing about checkout flows. The instinct is always the same — make the next step obvious.";

const ABOUT_INFO = [
  { label: "Status",    value: "Open to PM / APM", sub: "Internships & APM roles" },
  { label: "Based in",  value: "India",            sub: "Remote · open to relocate" },
  { label: "Currently", value: "Finrep",           sub: "AI for SEC reporting" },
];

const MILESTONES = [
  { date: "2026",     title: "Open to roles",       note: "PM / APM" },
  { date: "Mar 2026", title: "Fina — v1",           note: "AI copilot for the CFO office" },
  { date: "Nov 2025", title: "Section 16 Platform", note: "Forms 3/4/5 end-to-end" },
  { date: "Aug 2025", title: "Joined Finrep",       note: "Product Management Intern" },
  { date: "May 2025", title: "Tryo",                note: "Founder's Office Intern" },
  { date: "2023",     title: "IIT Roorkee",         note: "Integrated M.Tech" },
];

const SECTIONS = [
  { id: "hero",         num: "00", label: "About" },
  { id: "experience",   num: "01", label: "Experience" },
  { id: "education",    num: "02", label: "Education" },
  { id: "achievements", num: "03", label: "Achievements" },
  { id: "github",       num: "04", label: "GitHub" },
  // { id: "projects",  num: "05", label: "Projects" },   // hidden — re-enable later (also uncomment <Projects/> in <main> + restore num)
  { id: "writing",      num: "05", label: "Writing" },
  // { id: "exploring", num: "07", label: "Exploring" }, // hidden — re-enable later (also uncomment <Exploring/> in <main> + restore num)
  { id: "reach",        num: "06", label: "Reach out" },
];

const GH_USERNAME = "manthanjha7";

/* Real, verifiable achievements pulled from Jobs/profile.md + resume-base.md */
const ACHIEVEMENTS = [
  {
    title: "Tech GC 2026 — Geo-Blocking Analysis",
    sub: "IIT Roorkee",
    note: "Secured #1. Dual-layer DBSCAN clustering across 21 cities (75.8% coverage). Projected INR 18.1L annual savings.",
    year: "Mar 2026",
  },
  {
    title: "Head of PR, Hi-Res · E-Summit",
    sub: "IIT Roorkee",
    note: "PR campaigns reaching 10K+ students; secured 14+ industry speakers (Adobe, Zomato, IBM).",
    year: "Jan – Feb 2025",
  },
  {
    title: "Co-Founder — Swaps",
    sub: "College merchandise brand",
    note: "Scaled to INR 1L+ revenue in 6 months across campuses.",
    year: "Dec 2024 – May 2025",
  },
];

/* Projects data lives in caseStudies.jsx (PROJECTS).
   Each project carries a caseStudy object made of typed content
   blocks rendered by the case-study view. */

const EXPERIENCE = [
  {
    company: "Finrep",
    href: "https://finrep.ai",
    role: "Product Management Intern",
    dates: "Aug 2025 — Present",
    note: "Joined as Finrep's first PM intern; helped scale $0→$100K ARR in 9 months. Owns analytics across 7 modules and ships features end-to-end.",
    bullets: [
      "Joined as Finrep's first PM intern; helped scale from $0 to $100K ARR in 9 months owning activation, retention, and feature scoping across the fintech product used daily by SEC reporting and technical accounting teams.",
      "Managed Mixpanel + Metabase setup from scratch across 7 modules, ran session replay reviews to surface activation gaps the team was missing, and shipped automations that halved analytics turnaround and unblocked the team's shipping cadence.",
      "Scoped, designed, and shipped the ASC Codification Library end-to-end — a searchable in-product reference for 35,000+ FASB standards that let a key customer fully migrate off Intelligize/LexisNexis and consolidate their workflow.",
    ],
  },
  {
    company: "Tryo",
    href: "https://www.linkedin.com/company/tryoclub/",
    role: "Founder's Office Intern",
    dates: "May — Jul 2025",
    note: "Partnered with 8+ fast-fashion brands (Souled Store, Bear House, Bewakoof, Burger Bae). Drove daily-order growth via a Swish × Blinkit pamphlet GTM (−40% CAC) and referral screens (+10% referred customers).",
    bullets: [
      "Partnered with 8+ fast fashion brands including The Souled Store, The Bear House, Bewakoof, and Burger Bae, building long-term relationships that translated into sourcing wins and drove growth in the key apparel segment of our marketplace.",
      "Drove daily order growth through offline marketing — partnered with Swish/Blinkit to distribute pamphlets inside delivery bags, reducing CAC by 40%, and designed referral screens that secured 10% referred customers.",
      "Identified the supply-side gaps killing AOV in apparel by combining customer interviews with order-data analysis, then turned the findings into a sourcing roadmap the founders shipped — closing the demand gaps and lifting AOV across the category.",
    ],
  },
];

const EDUCATION = [
  {
    company: "IIT Roorkee",
    href: "https://iitr.ac.in/",
    role: "Integrated M.Tech, Geological Technology",
    dates: "2023 — 2028",
    note: "Roorkee, India.",
    bullets: [
      "1st Prize, Tech GC 2026 (IIT Roorkee × COOX) — built a Python + DBSCAN geospatial clustering pipeline that extracted 72 actionable blocking zones across 21 cities, projecting INR 18.1L annual savings plus INR 1.5L/month in recovered fees.",
      "Head of PR, Hi-Res · E-Summit 2025 — ran PR campaigns reaching 10K+ students, secured 14+ industry speakers (Adobe, Zomato, IBM) and 10+ partner-college collaborations, anchoring the flagship design-a-thon.",
      "Co-Founder, Swaps — scaled a college merchandise brand to INR 1 lakh+ revenue in 6 months through strategic collaborations and end-to-end product delivery across campuses.",
    ],
  },
];

const EXPLORING = [
  { t: "AI agents for vertical SaaS",        d: "where they actually create leverage." },
  { t: "Evals & trust for AI products",      d: "making model output defensible." },
  { t: "Product analytics as discovery",     d: "instrumentation that shapes roadmap, not just dashboards." },
  { t: "Fintech / regtech",                  d: "turning regulation into usable product." },
];

const SOCIALS = [
  { label: "Email",    value: "manthank2021@gmail.com",     href: "mailto:manthank2021@gmail.com",         kbd: "E" },
  { label: "LinkedIn", value: "linkedin.com/in/manthan7805", href: "https://www.linkedin.com/in/manthan7805", kbd: "L" },
  { label: "GitHub",   value: "github.com/manthanjha7",      href: "https://github.com/manthanjha7",         kbd: "G" },
];

/* ============================================================
   THEME
============================================================ */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") || "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("mj-theme", theme); } catch (e) {}
  }, [theme]);
  return [theme, setTheme];
}

/* ============================================================
   ACTIVE SECTION (IntersectionObserver)
============================================================ */

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(entries => {
      // Pick the section whose top is closest to ~30% from viewport top
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - 140) - Math.abs(b.boundingClientRect.top - 140));
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/* ============================================================
   SCROLL REVEAL — sections fade + slide up on entering the viewport
============================================================ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={"reveal" + (visible ? " is-visible" : "")}>
      {children}
    </div>
  );
}

/* ============================================================
   KEYBOARD NAV (J/K)
============================================================ */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useJKNav(active, paletteOpen) {
  useEffect(() => {
    function isTyping() {
      const el = document.activeElement;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
    }
    function onKey(e) {
      if (paletteOpen) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping()) return;
      const idx = SECTIONS.findIndex(s => s.id === active);
      if (e.key === "j" || e.key === "J" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = SECTIONS[Math.min(SECTIONS.length - 1, idx + 1)];
        if (next) scrollToSection(next.id);
      } else if (e.key === "k" || e.key === "K" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = SECTIONS[Math.max(0, idx - 1)];
        if (prev) scrollToSection(prev.id);
      } else if (e.key === "g" || e.key === "G") {
        if (e.shiftKey) { e.preventDefault(); scrollToSection(SECTIONS[SECTIONS.length - 1].id); }
        else            { e.preventDefault(); scrollToSection(SECTIONS[0].id); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, paletteOpen]);
}

/* ============================================================
   TYPING ANIMATION
============================================================ */

function useTyping(text, { speed = 32, startDelay = 240 } = {}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setOut(text); setDone(true); return; }
    let i = 0;
    let timer = null;
    const start = setTimeout(function tick() {
      if (i <= text.length) {
        setOut(text.slice(0, i));
        i++;
        timer = setTimeout(tick, speed + (Math.random() * 18 - 6));
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => { clearTimeout(start); clearTimeout(timer); };
  }, [text, speed, startDelay]);
  return [out, done];
}

/* ============================================================
   ICONS
============================================================ */

const Icon = {
  sun: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  moon: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  search: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  ),
  hash: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
    </svg>
  ),
  link: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  ),
  brief: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8" />
    </svg>
  ),
  doc: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  image: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-4.5-4.5L7 21" />
    </svg>
  ),
  calendar: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
    </svg>
  ),
  github: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  ),
  send: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
};

const BOOK_URL = "https://cal.com/manthanjha";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjrygnl";
const RECEIVER_EMAIL = "manthank2021@gmail.com";

/* ============================================================
   TOP NAV
============================================================ */

function TopNav({ active, onOpenPalette, theme, setTheme }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        background: "color-mix(in oklab, var(--paper) 80%, transparent)",
        borderBottom: "1px solid var(--hairline-soft)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1180, padding: "14px 28px" }}>
        <div className="flex items-center justify-between gap-6">
          <a href="#hero" className="flex items-baseline gap-3" aria-label="Top">
            <span style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>Manthan Jha</span>
          </a>

          <div className="flex items-center" style={{ gap: 10 }}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={"Switch to " + (theme === "dark" ? "light" : "dark") + " mode"}
              style={{
                width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--hairline)", borderRadius: 8, background: "var(--card)",
                color: "var(--ink-2)", cursor: "pointer",
              }}
            >
              {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHead({ num, label, kicker, action }) {
  return (
    <div className="flex items-baseline justify-between" style={{ marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid var(--hairline)" }}>
      <div className="flex items-baseline" style={{ gap: 18 }}>
        <span className="mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: "0.02em" }}>{num}</span>
        <h2 style={{ margin: 0, fontSize: "clamp(23px, 2.3vw, 27px)", fontWeight: 600, letterSpacing: "-0.022em" }}>{label}</h2>
      </div>
      {action ? (
        action.onClick ? (
          <button onClick={action.onClick} className="mono link-grow" style={{
            color: "var(--accent)", fontSize: 12, background: "transparent",
            border: "none", padding: 0, cursor: "pointer", font: "inherit",
          }}>
            {action.label} →
          </button>
        ) : (
          <a href={action.href} target="_blank" rel="noopener" className="mono link-grow" style={{ color: "var(--accent)", fontSize: 12 }}>
            {action.label} ↗
          </a>
        )
      ) : (kicker && <span className="mono" style={{ color: "var(--ink-3)", fontSize: 11 }}>{kicker}</span>)}
    </div>
  );
}

/* ============================================================
   HERO
============================================================ */

function PhotoPlaceholder({ aspect = "4/5", label = "photo", style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--hairline)",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--accent) 8%, var(--paper-2)) 0%, var(--paper-2) 70%)",
        ...style,
      }}
    >
      {/* subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--ink) 8%, transparent) 1px, transparent 0)",
        backgroundSize: "14px 14px",
        opacity: 0.55,
      }} />
      <div className="flex items-center justify-center" style={{
        position: "absolute", inset: 0, color: "var(--ink-3)", gap: 8, flexDirection: "column",
      }}>
        <Icon.image />
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase" }}>{label}</span>
      </div>
    </div>
  );
}

function CredentialChip({ Icon, dot, label }) {
  return (
    <div className="card-lift flex items-center" style={{
      gap: 10,
      padding: "12px 14px",
      border: "1px solid var(--hairline)",
      borderRadius: 10,
      background: "var(--card)",
      color: "var(--ink)",
      fontSize: 13.5,
      lineHeight: 1.2,
      minHeight: 46,
    }}>
      <span style={{ color: "var(--accent)", display: "inline-flex", flexShrink: 0 }}>
        {dot ? (
          <span style={{
            width: 8, height: 8, borderRadius: 999, background: "var(--good)",
            boxShadow: "0 0 0 3px color-mix(in oklab, var(--good) 22%, transparent)", display: "inline-block",
          }} />
        ) : (
          <Icon size={16} strokeWidth={1.8} />
        )}
      </span>
      <span>{label}</span>
    </div>
  );
}

function Hero({ onOpenAbout }) {
  return (
    <section id="hero" className="anchor m-pad-y-hero" style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* Photo + bio + credentials + Know More */}
      <div
        className="fade-up m-stack-1"
        style={{
          marginTop: 0,
          display: "grid",
          gridTemplateColumns: "minmax(0, 480px) minmax(0, 1fr)",
          gap: 48,
          alignItems: "center",
        }}
      >
        <BackgroundGradient style={{ maxWidth: 480 }} radius={22}>
          <img
            src={manthanPhoto}
            alt="Manthan Jha"
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: 22,
              border: "1px solid var(--hairline)",
            }}
          />
        </BackgroundGradient>

        <div>
          <p style={{
            margin: 0,
            fontSize: "clamp(19px, 1.7vw, 22px)",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
            color: "var(--ink-2)",
            maxWidth: 52 + "ch",
            fontStyle: "italic",
            fontFamily: "var(--serif)",
            fontWeight: 400,
          }}>
            <EncryptedText text="Hey, I'm Manthan, a 4th-year UG at IIT Roorkee, currently working as an AI PM at " />
            <a href="https://finrep.ai" target="_blank" rel="noopener" className="link-grow" style={{ color: "var(--accent)" }}><EncryptedText text="Finrep.ai" /></a>
            <EncryptedText text=" (" />
            <a href="https://www.accel.com/" target="_blank" rel="noopener" className="link-grow" style={{ color: "var(--accent)" }}><EncryptedText text="Accel" /></a>
            <EncryptedText text=" Backed)." />
          </p>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 10,
              maxWidth: 560,
            }}
          >
            {CREDENTIALS.map((c, i) => <CredentialChip key={i} Icon={c.Icon} dot={c.dot} label={c.label} />)}
          </div>

          {/* top contact row — text-only ghost buttons */}
          <div className="flex" style={{ flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener"
                className="btn-ghost"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center" style={{ gap: 20, marginTop: 28, flexWrap: "wrap" }}>
            <MagneticButton onClick={onOpenAbout} className="btn-cta">
              Know More <Icon.arrow className="cta-arrow" />
            </MagneticButton>
            {/* <a href="#projects" className="link-grow" style={{ fontSize: 14, color: "var(--ink-2)" }}>
              See selected work
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT MODAL — opens from "Know More"
============================================================ */

function AboutModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="About Manthan Jha"
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "color-mix(in oklab, var(--ink) 38%, transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "5vh 16px",
        overflowY: "auto",
        animation: "fadeIn 160ms ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="scroll-thin"
        style={{
          width: "min(1080px, 100%)",
          background: "var(--paper)",
          color: "var(--ink)",
          border: "1px solid var(--hairline)",
          borderRadius: 18,
          boxShadow: "var(--shadow-pop)",
          padding: "48px clamp(24px, 4vw, 56px) 56px",
          animation: "popIn 220ms cubic-bezier(.2,.7,.2,1) both",
          position: "relative",
        }}
      >
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 18, right: 18,
            width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--hairline)", borderRadius: 999, background: "var(--card)",
            color: "var(--ink-2)", cursor: "pointer",
          }}
        >
          <Icon.close />
        </button>

        <h2 style={{
          margin: 0,
          fontSize: "clamp(40px, 5.4vw, 64px)",
          letterSpacing: "-0.03em",
          fontWeight: 600,
          lineHeight: 1.0,
        }}>
          About Me
        </h2>

        {/* gallery row */}
        <div
          className="m-stack-3"
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {["Campus", "Off-sites", "Demo day", "Side build", "Travel"].map((l, i) => (
            <PhotoPlaceholder key={i} aspect="1/1" label={l} />
          ))}
        </div>

        {/* two-column bio */}
        <div
          className="m-stack-1"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 56,
            color: "var(--ink-2)",
            fontSize: 15.5,
            lineHeight: 1.65,
          }}
        >
          <p style={{ margin: 0 }}>{ABOUT_BIO_LEFT}</p>
          <p style={{ margin: 0 }}>{ABOUT_BIO_RIGHT}</p>
        </div>

        {/* info columns */}
        <div
          className="m-stack-1"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 32,
          }}
        >
          {ABOUT_INFO.map((info, i) => (
            <div key={i}>
              <div className="mono" style={{
                fontSize: 11, color: "var(--ink-3)",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{info.label}</div>
              <div style={{ marginTop: 10, fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{info.value}</div>
              <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-3)" }}>{info.sub}</div>
            </div>
          ))}
        </div>

        {/* milestone timeline */}
        <div style={{ marginTop: 64 }}>
          <Timeline items={MILESTONES} />
        </div>

        <div className="m-flex-col" style={{
          marginTop: 56, paddingTop: 24,
          borderTop: "1px solid var(--hairline)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14,
        }}>
          <span style={{ color: "var(--ink-3)", fontSize: 13 }}>
            Want the longer version? <a href="mailto:manthank2021@gmail.com" className="link-grow" style={{ color: "var(--accent)" }}>manthank2021@gmail.com</a>
          </span>
          <button
            onClick={onClose}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 16px", background: "transparent", color: "var(--ink-2)",
              border: "1px solid var(--hairline)", borderRadius: 999,
              fontSize: 13, cursor: "pointer",
            }}
          >
            Close <span className="kbd">esc</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Timeline({ items }) {
  // Render a horizontal scroll strip with tick marks + labelled milestones.
  return (
    <div className="scroll-thin" style={{ overflowX: "auto", paddingBottom: 8 }}>
      <div style={{ position: "relative", minWidth: Math.max(680, items.length * 150) }}>
        {/* ticks */}
        <div aria-hidden style={{ height: 36, display: "flex", alignItems: "flex-end", gap: 6 }}>
          {Array.from({ length: items.length * 12 }).map((_, i) => {
            const isMonth = i % 12 === 0;
            return (
              <span key={i} style={{
                width: 1,
                height: isMonth ? 28 : 12,
                background: isMonth ? "var(--ink-3)" : "var(--ink-4)",
                opacity: isMonth ? 1 : 0.55,
                flex: 1,
              }} />
            );
          })}
        </div>
        {/* labels */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          gap: 12,
          marginTop: 14,
        }}>
          {items.map((m, i) => (
            <div key={i}>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{m.date}</div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 500, letterSpacing: "-0.005em" }}>{m.title}</div>
              <div style={{ marginTop: 2, fontSize: 12, color: "var(--ink-3)" }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   WORK
============================================================ */

function ProjectCard({ project, n, onOpen }) {
  return (
    <article
      className="card-lift m-stack-1"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        gap: 48,
        alignItems: "center",
        padding: "32px 4px",
        borderTop: n === 0 ? "1px solid var(--hairline)" : "none",
        borderBottom: "1px solid var(--hairline)",
        position: "relative",
      }}
    >
      {/* left: number + title + paragraph + button */}
      <div>
        <div className="flex items-center" style={{ gap: 12, marginBottom: 14 }}>
          <span className="mono" style={{ color: "var(--ink-4)", fontSize: 12 }}>
            {String(n + 1).padStart(2, "0")} /
          </span>
          <StatusPill status={project.tag} />
        </div>
        <h3 style={{
          margin: 0,
          fontSize: "clamp(28px, 3vw, 36px)",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          lineHeight: 1.08,
          color: "var(--ink)",
        }}>
          {project.name}
        </h3>
        <p style={{
          margin: "16px 0 0 0",
          color: "var(--ink-2)",
          fontSize: 16,
          lineHeight: 1.55,
          maxWidth: 50 + "ch",
        }}>
          {project.one}
        </p>
        <button
          onClick={() => onOpen(project.id)}
          className="card-lift"
          style={{
            marginTop: 24,
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "11px 18px",
            background: "var(--card)",
            color: "var(--ink)",
            border: "1.5px solid var(--accent)",
            borderRadius: 999,
            fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}
          aria-label={"View case study: " + project.name}
        >
          View Case Study
          <Icon.arrow />
        </button>
      </div>

      {/* right: hero preview frame */}
      <button
        onClick={() => onOpen(project.id)}
        aria-label={"Open " + project.name + " case study"}
        style={{
          padding: 0, border: "none", background: "transparent", cursor: "pointer",
          width: "100%",
        }}
      >
        <CometCard>
          <CSImage label={project.heroLabel || project.name} aspect="16/10" />
        </CometCard>
      </button>
    </article>
  );
}

function StatusPill({ status }) {
  const live = /live/i.test(status);
  const wip  = /wip/i.test(status);
  const color = live ? "var(--good)" : wip ? "#C58A1A" : "var(--ink-3)";
  return (
    <span className="mono" style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 10.5, letterSpacing: "0.04em", textTransform: "uppercase",
      color, padding: "2px 7px",
      border: "1px solid color-mix(in oklab, " + color + " 35%, var(--hairline))",
      borderRadius: 999, lineHeight: 1.6,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 999, background: color }} />
      {status}
    </span>
  );
}

function Projects({ onOpenCase }) {
  const list = PROJECTS || [];
  return (
    <section id="projects" className="anchor m-pad-y-56" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionHead num="04" label="Projects" kicker={list.length + " case studies"} />
      <div>
        {list.map((p, i) => (
          <ProjectCard key={p.id} project={p} n={i} onOpen={onOpenCase} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE
============================================================ */

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);
  return isTouch;
}

function TimelineItem({ item, index, total, forceOpen }) {
  const [hovered, setHovered] = useState(false);
  const hasBullets = Array.isArray(item.bullets) && item.bullets.length > 0;
  const open = hasBullets && (forceOpen || hovered);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="card-lift m-stack-1"
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr auto",
        gap: 24,
        padding: "22px 4px",
        borderTop: index === 0 ? "none" : "1px solid var(--hairline)",
        borderBottom: index === total - 1 ? "1px solid var(--hairline)" : "none",
        alignItems: "baseline",
      }}
    >
      <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{item.dates}</div>
      <div>
        <div className="flex items-baseline" style={{ gap: 10, flexWrap: "wrap" }}>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noopener" className="link-grow"
              style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--accent)" }}>
              {item.company}
            </a>
          ) : (
            <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{item.company}</span>
          )}
        </div>
        <div style={{ color: "var(--ink-2)", marginTop: 4, fontSize: 14 }}>{item.role}</div>
        {item.note && !hasBullets && <div style={{ color: "var(--ink-3)", marginTop: 6, fontSize: 13 }}>{item.note}</div>}
        {hasBullets && (
          <div style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            transition: "grid-template-rows 240ms ease, margin-top 240ms ease",
            marginTop: open ? 12 : 0,
            overflow: "hidden",
          }}>
            <ul style={{
              minHeight: 0,
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: 8,
            }}>
              {item.bullets.map((b, j) => (
                <li key={j} style={{
                  position: "relative",
                  paddingLeft: 14,
                  color: "var(--ink-2)",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                }}>
                  <span aria-hidden style={{
                    position: "absolute", left: 0, top: "0.55em",
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--ink-4)",
                  }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center" style={{ gap: 10 }}>
        <span className="mono m-hide" style={{ color: "var(--ink-4)", fontSize: 11 }}>{String(index + 1).padStart(2, "0")}</span>
        {hasBullets && !forceOpen && (
          <span aria-hidden style={{
            color: "var(--ink-3)",
            display: "inline-flex",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms ease",
          }}>
            <Icon.chevron />
          </span>
        )}
      </div>
    </li>
  );
}

function TimelineList({ items }) {
  const isTouch = useIsTouchDevice();
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((e, i) => (
        <TimelineItem key={i} item={e} index={i} total={items.length} forceOpen={isTouch} />
      ))}
    </ol>
  );
}

function Experience() {
  return (
    <section id="experience" className="anchor" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionHead num="01" label="Experience" action={{ label: "View LinkedIn", href: "https://www.linkedin.com/in/manthan7805" }} />
      <TimelineList items={EXPERIENCE} />
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="anchor" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionHead num="02" label="Education" />
      <TimelineList items={EDUCATION} />
    </section>
  );
}

/* ============================================================
   ACHIEVEMENTS
============================================================ */

function Achievements() {
  return (
    <section id="achievements" className="anchor m-pad-y-56" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionHead num="03" label="Achievements" />
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {ACHIEVEMENTS.map((a, i) => (
          <li key={i} className="card-lift" style={{
            padding: "20px 4px",
            borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
            borderBottom: i === ACHIEVEMENTS.length - 1 ? "1px solid var(--hairline)" : "none",
          }}>
            <div className="flex items-baseline justify-between" style={{ gap: 12, flexWrap: "wrap" }}>
              <div className="flex items-baseline" style={{ gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{a.title}</span>
                <span className="serif" style={{ fontStyle: "italic", color: "var(--ink-3)", fontSize: 13 }}>— {a.sub}</span>
              </div>
              <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>{a.year}</span>
            </div>
            <div style={{ color: "var(--ink-2)", marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>{a.note}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   WRITING
============================================================ */

function Writing({ onOpenArticle, onOpenArticles }) {
  const featured = ARTICLES.slice(0, 3);
  return (
    <section id="writing" className="anchor m-pad-y-56" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionHead num="05" label="Writing" action={{ label: "All writing", onClick: onOpenArticles }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {featured.map((a, i) => (
          <button
            key={a.id}
            onClick={() => onOpenArticle(a.id)}
            className="card-lift"
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "100%",
              padding: "22px 22px 24px",
              border: "1px solid var(--hairline)",
              borderRadius: 12,
              background: "var(--card)",
              color: "var(--ink)",
              position: "relative",
              minHeight: 156,
              cursor: "pointer",
              font: "inherit",
            }}>
            <div style={{ height: 16, lineHeight: "16px", marginBottom: 14, flexShrink: 0 }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>POST · {String(i + 1).padStart(2, "0")}</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{a.title}</div>
            <div style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 13.5 }}>{a.dek}</div>
            <div className="flex items-center" style={{ gap: 6, position: "absolute", right: 22, bottom: 18, color: "var(--ink-3)", fontSize: 12 }}>
              <span className="mono">read</span> <Icon.arrow className="read-arrow" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   EXPLORING
============================================================ */

function Exploring() {
  return (
    <section id="exploring" className="anchor m-pad-y-56" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionHead num="06" label="Exploring" />
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0 }}>
        {EXPLORING.map((e, i) => (
          <li key={i} className="explore-cell" style={{
            padding: "20px 20px 22px",
            border: "1px solid var(--hairline)",
            marginLeft: i % 2 === 1 ? -1 : 0,
            marginTop: i >= 2 ? -1 : 0,
          }}>
            <div className="flex items-baseline" style={{ gap: 12 }}>
              <span className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}>{e.t}</span>
            </div>
            <p style={{ margin: "8px 0 0 28px", color: "var(--ink-2)", fontSize: 14 }}>{e.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   GITHUB — live contribution graph (real data, public API)
   Fetches the contribution calendar at runtime so it always
   reflects the latest pushes. No fabricated numbers.
============================================================ */

function ghLevelBg(lvl) {
  if (lvl === 0) return "color-mix(in oklab, var(--ink) 6%, transparent)";
  const pct = [0, 25, 50, 75, 100][lvl] || 100;
  return `color-mix(in oklab, var(--good) ${pct}%, var(--paper-2))`;
}

function computeGhStats(days) {
  const total = days.reduce((a, d) => a + (d.count || 0), 0);
  const activeDays = days.filter(d => d.count > 0).length;
  let longest = 0, run = 0;
  for (const d of days) {
    if (d.count > 0) { run++; longest = Math.max(longest, run); } else run = 0;
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++; else break;
  }
  return { total, activeDays, longest, current };
}

function toWeeks(days) {
  if (!days.length) return [];
  const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay(); // 0=Sun
  const padded = Array.from({ length: pad }, () => null).concat(days);
  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

function useContributions(username) {
  const [days, setDays] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | error
  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then(j => { if (alive) { setDays(j.contributions || []); setStatus("ok"); } })
      .catch(() => { if (alive) setStatus("error"); });
    return () => { alive = false; };
  }, [username]);
  return [days, status];
}

function fmtGhDate(iso) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function ContributionGrid({ weeks }) {
  // Custom tooltip — appears instantly (no ~1s native `title` delay).
  const [tip, setTip] = useState(null); // { date, count, x, y }
  return (
    <div className="scroll-thin" style={{ overflowX: "auto" }}>
      <div style={{ minWidth: 720, paddingTop: 4 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {weeks.map((week, w) => (
            <div key={w} style={{ display: "grid", gridTemplateRows: "repeat(7, 11px)", rowGap: 3 }}>
              {Array.from({ length: 7 }).map((_, d) => {
                const cell = week[d];
                if (!cell) return <span key={d} style={{ width: 11, height: 11 }} />;
                return (
                  <span
                    key={d}
                    onMouseEnter={(e) => setTip({ date: cell.date, count: cell.count, x: e.clientX, y: e.clientY })}
                    onMouseMove={(e) => setTip(t => (t ? { ...t, x: e.clientX, y: e.clientY } : t))}
                    onMouseLeave={() => setTip(null)}
                    style={{
                      width: 11, height: 11, borderRadius: 3,
                      background: ghLevelBg(cell.level),
                      border: cell.level === 0 ? "1px solid color-mix(in oklab, var(--ink) 6%, transparent)" : "none",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center" style={{ gap: 6, marginTop: 16, justifyContent: "flex-end" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <span key={l} style={{
              width: 11, height: 11, borderRadius: 3, background: ghLevelBg(l),
              border: l === 0 ? "1px solid color-mix(in oklab, var(--ink) 6%, transparent)" : "none",
            }} />
          ))}
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>More</span>
        </div>
      </div>

      {tip && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            left: tip.x,
            top: tip.y - 40,
            transform: "translateX(-50%)",
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "5px 9px",
            borderRadius: 6,
            fontSize: 11,
            fontFamily: "var(--mono)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 70,
            boxShadow: "var(--shadow-pop)",
          }}
        >
          <strong style={{ fontWeight: 600 }}>{tip.count}</strong> contribution{tip.count === 1 ? "" : "s"} · {fmtGhDate(tip.date)}
        </div>
      )}
    </div>
  );
}

function GitHub() {
  const [days, status] = useContributions(GH_USERNAME);
  const stats = useMemo(() => (days ? computeGhStats(days) : null), [days]);
  const weeks = useMemo(() => (days ? toWeeks(days) : []), [days]);

  const statCards = stats ? [
    { stat: String(stats.total),      label: "Contributions · last year" },
    { stat: String(stats.activeDays), label: "Active days" },
    { stat: String(stats.current),    label: "Current streak" },
    { stat: String(stats.longest),    label: "Longest streak" },
  ] : [];

  return (
    <section id="github" className="anchor m-pad-y-56" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <SectionHead num="04" label="GitHub" action={{ label: "View profile", href: "https://github.com/" + GH_USERNAME }} />

      {status === "ok" && (
        <div className="m-stack-2" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, marginBottom: 18 }}>
          {statCards.map((s, i) => (
            <div key={i} className="card-lift" style={{
              padding: "22px 22px", border: "1px solid var(--hairline)", borderRadius: 12, background: "var(--card)",
            }}>
              <div className="stat-num" style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.0 }}>{s.stat}</div>
              <div style={{ marginTop: 8, fontSize: 13.5, color: "var(--ink-3)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: 24, border: "1px solid var(--hairline)", borderRadius: 12, background: "var(--card)" }}>
        <div className="flex items-center justify-between" style={{ gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--good)" }} />
            <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>Contribution Activity</span>
          </div>
          <a href={"https://github.com/" + GH_USERNAME} target="_blank" rel="noopener" className="mono link-grow"
             style={{ fontSize: 11, color: "var(--accent)" }}>github.com/{GH_USERNAME} ↗</a>
        </div>

        {status === "loading" && (
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", padding: "24px 0" }}>Loading contributions…</div>
        )}
        {status === "error" && (
          <div style={{ fontSize: 13, color: "var(--ink-3)", padding: "16px 0" }}>
            Couldn’t load the live graph right now — see it on{" "}
            <a href={"https://github.com/" + GH_USERNAME} target="_blank" rel="noopener" className="link-grow" style={{ color: "var(--accent)" }}>GitHub</a>.
          </div>
        )}
        {status === "ok" && weeks.length > 0 && <ContributionGrid weeks={weeks} />}
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = email.trim() && message.trim() && status !== "sending";

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, _subject: "Portfolio contact — " + email }),
      });
      if (res.ok) {
        setStatus("sent");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data && data.errors && data.errors[0] && data.errors[0].message) || "Something went wrong. Try again or email me directly.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Couldn't reach the server. Check your connection or email me directly.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 14, minWidth: 280 }}>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, color: "var(--ink-2)" }}>Your email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{
            padding: "11px 13px", fontSize: 14,
            background: "var(--card)", color: "var(--ink)",
            border: "1px solid var(--hairline)", borderRadius: 10,
            outline: "none", font: "inherit",
          }}
        />
      </label>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 13, color: "var(--ink-2)" }}>Your message</span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Type your message here."
          style={{
            padding: "11px 13px", fontSize: 14, resize: "vertical",
            background: "var(--card)", color: "var(--ink)",
            border: "1px solid var(--hairline)", borderRadius: 10,
            outline: "none", font: "inherit", minHeight: 110,
          }}
        />
      </label>
      <button
        type="submit"
        disabled={!canSubmit}
        className="card-lift"
        style={{
          padding: "12px 16px", fontSize: 14, fontWeight: 500,
          background: status === "sent" ? "var(--good, #16a34a)" : "var(--accent)",
          color: "white", border: "none", borderRadius: 10,
          cursor: canSubmit ? "pointer" : "not-allowed",
          opacity: canSubmit ? 1 : 0.55,
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        {status === "sending" ? "Sending…" : status === "sent" ? "Message sent ✓" : (<><Icon.send /> Send message</>)}
      </button>
      <div style={{ fontSize: 12, color: status === "error" ? "#d04a3a" : "var(--ink-3)", minHeight: 18 }}>
        {status === "error" ? errorMsg : <>Messages are directed to <span className="mono">{RECEIVER_EMAIL}</span>.</>}
      </div>
    </form>
  );
}

function Footer() {
  const SOCIAL_ICONS = [
    { label: "Email",    href: "mailto:" + RECEIVER_EMAIL,          Icon: Icon.mail },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/manthan7805", Icon: Icon.linkedin },
    { label: "GitHub",   href: "https://github.com/manthanjha7",     Icon: Icon.github },
  ];
  return (
    <footer id="reach" className="anchor m-pad-y-56" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 56, paddingBottom: 56, marginTop: 40 }}>
      <SectionHead num="06" label="Reach out" />
      <div className="flex items-start justify-between m-flex-col" style={{ gap: 48, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 360px", maxWidth: 480 }}>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, fontWeight: 400, letterSpacing: "-0.01em", marginTop: 0, lineHeight: 1.25, maxWidth: "26ch" }}>
            Still reading? That means something clicked. Let's talk.
          </div>

          <div className="flex items-center" style={{ gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener"
              className="card-lift"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 16px", borderRadius: 999,
                background: "var(--accent)", color: "white",
                fontSize: 13.5, fontWeight: 500, textDecoration: "none",
              }}
            >
              <Icon.calendar /> book a meet
            </a>
            <a
              href="https://www.linkedin.com/in/manthan7805"
              target="_blank"
              rel="noopener"
              className="card-lift"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 16px", borderRadius: 999,
                background: "var(--card)", color: "var(--ink)",
                border: "1px solid var(--hairline)",
                fontSize: 13.5, fontWeight: 500, textDecoration: "none",
              }}
            >
              <Icon.linkedin /> dm on linkedin
            </a>
          </div>

          <div style={{ marginTop: 28, fontSize: 13, color: "var(--ink-3)" }}>or find me here</div>
          <div className="flex items-center" style={{ gap: 8, marginTop: 10 }}>
            {SOCIAL_ICONS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener"
                aria-label={s.label}
                className="card-lift"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: "var(--card)", color: "var(--ink-2)",
                  border: "1px solid var(--hairline)",
                }}
              >
                <s.Icon />
              </a>
            ))}
          </div>
        </div>

        <div style={{ flex: "1 1 320px", maxWidth: 440 }}>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 12 }}>or send a message</div>
          <ContactForm />
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ marginTop: 48, paddingTop: 18, borderTop: "1px solid var(--hairline-soft)", color: "var(--ink-3)", fontSize: 12, flexWrap: "wrap", gap: 12 }}>
        <span className="mono">© 2026 Manthan Jha — built with Claude.</span>
      </div>
    </footer>
  );
}

/* ============================================================
   COMMAND PALETTE
============================================================ */

function fuzzyScore(q, str) {
  if (!q) return 1;
  q = q.toLowerCase();
  str = str.toLowerCase();
  if (str.includes(q)) return 100 - str.indexOf(q);
  // subsequence
  let qi = 0;
  for (let i = 0; i < str.length && qi < q.length; i++) {
    if (str[i] === q[qi]) qi++;
  }
  return qi === q.length ? 10 + qi : -1;
}

function CommandPalette({ open, onClose, openCase }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const allItems = useMemo(() => {
    const items = [];
    SECTIONS.forEach(s => items.push({
      kind: "Section", icon: Icon.hash, label: s.label, hint: s.num, action: () => { scrollToSection(s.id); }
    }));
    // Projects hidden for now — palette won't list them. Re-enable when <Projects/> comes back.
    // const WORK_LIST = PROJECTS || [];
    // WORK_LIST.forEach(w => items.push({
    //   kind: "Project", icon: Icon.spark, label: w.name, hint: w.tag || "",
    //   action: () => { scrollToSection("projects"); if (typeof openCase === "function") openCase(w.id); }
    // }));
    SOCIALS.forEach(s => items.push({
      kind: "Link", icon: Icon.link, label: s.label, hint: s.value,
      action: () => { window.open(s.href, s.href.startsWith("mailto") ? "_self" : "_blank"); }
    }));
    items.push({
      kind: "Action", icon: Icon.sun, label: "Toggle theme", hint: "light / dark",
      action: () => {
        const cur = document.documentElement.getAttribute("data-theme");
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("mj-theme", next); } catch (e) {}
        window.dispatchEvent(new Event("mj-theme-changed"));
      }
    });
    return items;
  }, []);

  const filtered = useMemo(() => {
    if (!query) return allItems;
    return allItems
      .map(it => ({ it, score: fuzzyScore(query, it.label + " " + it.kind + " " + it.hint) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.it);
  }, [allItems, query]);

  useEffect(() => { setCursor(0); }, [query, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) {
        e.preventDefault(); setCursor(c => Math.min(filtered.length - 1, c + 1));
      } else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
        e.preventDefault(); setCursor(c => Math.max(0, c - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[cursor];
        if (it) { it.action(); onClose(); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, cursor, filtered, onClose]);

  // scroll active into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector('[data-active="true"]');
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [cursor, filtered]);

  if (!open) return null;

  const grouped = {};
  filtered.forEach(it => { (grouped[it.kind] ||= []).push(it); });
  const flatOrder = [];
  Object.keys(grouped).forEach(k => grouped[k].forEach(it => flatOrder.push(it)));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 80,
        background: "color-mix(in oklab, var(--ink) 28%, transparent)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "12vh 16px 16px",
        animation: "fadeIn 140ms ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(620px, 100%)",
          background: "var(--card)",
          color: "var(--ink)",
          border: "1px solid var(--hairline)",
          borderRadius: 14,
          boxShadow: "var(--shadow-pop)",
          overflow: "hidden",
          animation: "popIn 180ms cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div className="flex items-center" style={{
          gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--hairline)",
        }}>
          <span style={{ color: "var(--ink-3)" }}><Icon.search /></span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section, project, or link…"
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              color: "var(--ink)", fontSize: 15, fontFamily: "var(--sans)",
            }}
          />
          <span className="kbd">esc</span>
        </div>

        <div ref={listRef} className="scroll-thin" style={{ maxHeight: 380, overflowY: "auto", padding: 6 }}>
          {flatOrder.length === 0 && (
            <div style={{ padding: "26px 16px", color: "var(--ink-3)", fontSize: 14 }}>No matches.</div>
          )}
          {Object.keys(grouped).map(group => (
            <div key={group}>
              <div className="mono" style={{
                padding: "10px 12px 6px", fontSize: 10.5, color: "var(--ink-4)",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{group}</div>
              {grouped[group].map((it) => {
                const idx = flatOrder.indexOf(it);
                const active = idx === cursor;
                return (
                  <div
                    key={it.kind + ":" + it.label + ":" + idx}
                    data-active={active}
                    onMouseEnter={() => setCursor(idx)}
                    onClick={() => { it.action(); onClose(); }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "20px 1fr auto",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                      color: active ? "var(--ink)" : "var(--ink-2)",
                      background: active ? "var(--accent-soft)" : "transparent",
                      borderLeft: "2px solid " + (active ? "var(--accent)" : "transparent"),
                      transition: "background-color 100ms ease, color 100ms ease",
                    }}
                  >
                    <span style={{ color: active ? "var(--accent)" : "var(--ink-3)", display: "inline-flex" }}><it.icon /></span>
                    <span style={{ fontSize: 14 }}>{it.label}</span>
                    <span className="mono" style={{ color: "var(--ink-4)", fontSize: 11 }}>{it.hint}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between" style={{
          padding: "8px 12px",
          borderTop: "1px solid var(--hairline)",
          fontSize: 11,
          color: "var(--ink-3)",
        }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <span className="flex items-center" style={{ gap: 6 }}><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
            <span className="flex items-center" style={{ gap: 6 }}><span className="kbd">↵</span> select</span>
          </div>
          <span className="flex items-center" style={{ gap: 6 }}><span className="kbd">esc</span> close</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP
============================================================ */

function App() {
  const [theme, setTheme] = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const active = useActiveSection();
  useJKNav(active, paletteOpen || aboutOpen || !!caseId || !!articleId || articlesOpen);

  const currentArticle = ARTICLES.find(a => a.id === articleId) || null;

  const projectList = PROJECTS || [];
  const currentProject = projectList.find(p => p.id === caseId) || null;
  const nextProject = currentProject ? (() => {
    const idx = projectList.findIndex(p => p.id === caseId);
    return projectList[(idx + 1) % projectList.length];
  })() : null;

  // Listen for palette-toggled theme to refresh React state
  useEffect(() => {
    function onChanged() {
      const t = document.documentElement.getAttribute("data-theme");
      setTheme(t === "dark" ? "dark" : "light");
    }
    window.addEventListener("mj-theme-changed", onChanged);
    return () => window.removeEventListener("mj-theme-changed", onChanged);
  }, [setTheme]);

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setPaletteOpen(o => !o);
      } else if (e.key === "/" && !paletteOpen) {
        const el = document.activeElement;
        const tag = el && el.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          setPaletteOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  return (
    <div>
      <TopNav active={active} onOpenPalette={() => setPaletteOpen(true)} theme={theme} setTheme={setTheme} />

      <main className="mx-auto m-pad-x" style={{ maxWidth: 1180, padding: "0 28px" }}>
        <Hero onOpenAbout={() => setAboutOpen(true)} />
        <Reveal><Experience /></Reveal>
        <Reveal><Education /></Reveal>
        <Reveal><Achievements /></Reveal>
        <Reveal><GitHub /></Reveal>
        {/* <Reveal><Projects onOpenCase={(id) => setCaseId(id)} /></Reveal>  hidden — re-enable later */}
        <Reveal><Writing onOpenArticle={setArticleId} onOpenArticles={() => setArticlesOpen(true)} /></Reveal>
        {/* <Reveal><Exploring /></Reveal>  hidden — re-enable later */}
        <Reveal><Footer /></Reveal>
      </main>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} openCase={(id) => setCaseId(id)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <CaseStudyView
        project={currentProject}
        onClose={() => setCaseId(null)}
        onNext={nextProject ? () => setCaseId(nextProject.id) : null}
      />
      <ArticleView
        article={currentArticle}
        onClose={() => setArticleId(null)}
        onOpenArticle={(id) => setArticleId(id)}
      />
      <ArticlesIndexView
        open={articlesOpen}
        onClose={() => setArticlesOpen(false)}
        onOpenArticle={(id) => { setArticlesOpen(false); setArticleId(id); }}
      />
    </div>
  );
}

export default App;
