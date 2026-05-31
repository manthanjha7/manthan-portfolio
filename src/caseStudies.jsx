import React, { useEffect as csUseEffect, useRef as csUseRef, useState as csUseState } from "react";
/* ============================================================
   CASE-STUDY BUILDING BLOCKS ("tools")
   ----------------------------------------------------------------
   Every project's case study is an ordered list of blocks.
   Each block is a tagged object: { type, ...props }.
   The renderer below switches on `type`. To add new content,
   just append a new block to PROJECTS[i].caseStudy.blocks - no
   custom JSX needed per project.

   AVAILABLE BLOCK TYPES
   ─────────────────────
   hero        big lead image (4:3-ish frame, soft mat)
                 { label?, caption?, aspect?, src? }
   title       huge page-title h1
                 { text }
   meta        left meta list (Brand / My Role / Timeline / Status / Impact)
               + right Overview heading & paragraph(s)
                 { items: [{k, v}], heading, body | bodies: [...] }
   heading     2-line bold section heading
                 { text }            // \n inside text becomes a line break
   body        body paragraph(s)
                 { text | texts: [...] }
   image       single image card with optional caption underneath
                 { label?, caption?, aspect?, frame?, src? }
   imageGrid   side-by-side images
                 { items: [{label, aspect, frame?}], cols?: 2 }
   cards3      3-column info cards
                 { items: [{title, body}] }
   flow        horizontal step boxes connected by arrows
                 { steps: [{label, state?: 'idle'|'blocked'|'active'}] }
   flowCards   illustrated step cards (icon + label + sub)
                 { items: [{title, sub?, state?: 'danger'|'neutral'|'success', icon?}] }
   quote       pulled inline quote (offset block)
                 { text }
   impact      KPI stats row
                 { items: [{stat, label}] }
   testimonial customer/colleague quote with avatar + role
                 { quote, name, role }
   spacer      vertical breathing room
                 { h?: number }
============================================================ */

/* ============================================================
   STYLE TOKENS (CS = case study, unique-name pattern)
============================================================ */

const csInk      = "var(--ink)";
const csInk2     = "var(--ink-2)";
const csInk3     = "var(--ink-3)";
const csInk4     = "var(--ink-4)";
const csHair     = "var(--hairline)";
const csCard     = "var(--card)";
const csPaper    = "var(--paper)";
const csPaper2   = "var(--paper-2)";
const csAccent   = "var(--accent)";

/* shared image-frame look (matches the CodeAnt reference: soft mat around a centered screenshot) */
const csImageFrame = {
  borderRadius: 14,
  border: "1px solid " + csHair,
  background:
    "linear-gradient(180deg, color-mix(in oklab, var(--ink-4) 6%, var(--paper-2)) 0%, var(--paper-2) 100%)",
  padding: 28,
};

/* ============================================================
   PROJECTS - list shown on the homepage card stack
   Each one carries a caseStudy = { title, meta, blocks: [...] }
============================================================ */

const PROJECTS = [
  /* ---------------- FINA - full case study ---------------- */
  {
    id: "fina",
    name: "Fina - AI copilot for the CFO office",
    one: "Designed and shipped the question-to-answer surface - ask a question, get a sourced, defensible answer on SEC disclosures and peer benchmarking.",
    tag: "Live",
    heroLabel: "Fina · product surface",
    caseStudy: {
      title: "Fina - AI copilot for the CFO office",
      meta: {
        items: [
          { k: "Product",  v: "Fina (by Finrep)" },
          { k: "My Role",  v: "Product Manager" },
          { k: "Timeline", v: "Aug 25 - Present" },
          { k: "Status",   v: "Live · v1" },
          { k: "Impact",   v: "Used by [X] CFO teams · [Y] queries/day" }, // [EDIT] real adoption numbers
        ],
        heading: "Overview",
        bodies: [
          "Fina is a research copilot for the CFO office. Ask a question in plain English - about a peer's disclosure, a recent 8-K, a footnote in a 10-K - and get a sourced, citation-backed answer in seconds.",
          "This case study focuses on the problem I spent the most time on as we shipped v1: making the model's answer defensible enough that a finance team will actually paste it into their own deck.",
        ],
      },
      blocks: [
        { type: "hero", label: "Fina · answer surface", aspect: "16/10" },

        { type: "heading", text: "A CFO will not paste a model's answer\ninto a board deck unless they can audit it." },
        { type: "body",    text: "We could already retrieve the right paragraph from the right filing. The hard part was the last 10% - turning that retrieval into an answer the user trusted enough to *use*. Without that, Fina was a fancy demo." },

        { type: "image",   label: "Sourced answer card", aspect: "16/9" },

        { type: "heading", text: "Three surfaces, one product." },
        { type: "cards3",  items: [
          { title: "Answer surface",       body: "Question → sourced answer with inline citations the user can click through to the underlying paragraph." },
          { title: "Peer benchmark grid",  body: "Compare disclosures across a defined peer set in one structured grid, with the source filing one click away." },
          { title: "Audit trail",          body: "Every answer carries a versioned trace - which sources, which prompt, which model - so finance can defend the output." },
        ]},
        { type: "imageGrid", cols: 2, items: [
          { label: "Citation drawer" },
          { label: "Peer grid · disclosures" },
        ]},

        { type: "heading", text: "The flow looked complete.\nUsers were dropping at the citation step." },
        { type: "body",    text: "Ask a question, scan the answer, expand citations to verify, copy. The flow had four steps. Users were stalling at step three - they'd ask, read the answer, then leave without ever opening a single citation." },
        { type: "flow",    steps: [
          { label: "Ask",         state: "idle" },
          { label: "Answer",      state: "idle" },
          { label: "Verify",      state: "blocked" },
          { label: "Use answer",  state: "active" },
        ]},
        { type: "image",   label: "Funnel · session-replay analysis", aspect: "16/9", caption: "We watched ~30 replays in a week. The pattern was always the same: users skimmed the answer, never clicked a citation, then closed the tab." },

        { type: "heading", text: "This was not a UX problem.\nIt was a trust problem." },
        { type: "body",    text: "We had built citations as a *secondary surface* - collapsed, two clicks away. The user had to choose to trust the model before they'd ever see the evidence. Enterprise finance doesn't work that way: the evidence has to come first." },
        { type: "quote",   text: "“The model's answer was the headline. The source was a footnote. We had to flip that.”" },

        { type: "heading", text: "So we made the source the answer." },
        { type: "body",    text: "We rebuilt the answer surface so the citation paragraph is the primary visual - the model's synthesis sits below as a one-line summary. Same data, completely different posture. Verification stopped being a step; it became the default view." },
        { type: "flowCards", items: [
          { title: "Old default",      sub: "Model answer · citations collapsed", state: "danger"  },
          { title: "Reframed",         sub: "Source paragraph forward",            state: "neutral" },
          { title: "One-line synthesis", sub: "Below the source, not above",       state: "neutral" },
          { title: "Trust restored",   sub: "Citation open-rate ↑ 5×",             state: "success" }, // [EDIT] verify metric
        ]},

        { type: "heading", text: "Evals as a product habit, not a launch checklist." },
        { type: "body",    text: "We set up a 200-example eval set the team runs on every model or prompt change. Pass/fail isn't manual any more - we ship model updates the same way we ship code. The biggest unlock wasn't accuracy; it was the team's confidence to iterate." },
        { type: "image",   label: "Eval dashboard", aspect: "16/9" },

        // [EDIT] confirm these impact numbers before the site is public
        { type: "impact", items: [
          { stat: "5×",   label: "Citation open-rate after the trust redesign" },
          { stat: "−42%", label: "Time-to-answer for first-time users" },
          { stat: "200",  label: "Eval cases run on every model change" },
        ]},

        { type: "testimonial", quote: "Working with Manthan made the model the easy part. The hard part - convincing a CFO to actually trust the output - that's what he owns.", name: "[EDIT] Engineering lead", role: "Finrep" },
      ],
    },
  },

  /* ---------------- SECTION 16 PLATFORM ---------------- */
  {
    id: "section16",
    name: "Section 16 Platform - SEC ownership reporting",
    one: "End-to-end Forms 3/4/5: transaction ledger, vesting calendar, footnote generation, and automated EDGAR filing.",
    tag: "Live",
    heroLabel: "Section 16 · transaction ledger",
    caseStudy: {
      title: "Section 16 Platform - SEC ownership reporting",
      meta: {
        items: [
          { k: "Product",  v: "Section 16 (by Finrep)" },
          { k: "My Role",  v: "Product Manager - full surface" },
          { k: "Timeline", v: "[EDIT] – Present" },
          { k: "Status",   v: "Live" },
          { k: "Impact",   v: "[X] filings shipped · 103-event analytics taxonomy" },
        ],
        heading: "Overview",
        body: "The Section 16 platform takes a grant from the moment HR enters it through to EDGAR submission - vesting calendar, footnotes, transaction ledger, late-filing reconciliation - all on one surface. I owned the spec end-to-end and the analytics layer that lets us actually understand how it's used.",
      },
      blocks: [
        { type: "hero",    label: "Section 16 · main surface", aspect: "16/10" },
        { type: "heading", text: "One surface, six legally distinct flows." },
        { type: "body",    text: "[EDIT] Walkthrough of how grant entry, vesting, transactions, footnotes, late filings, and the EDGAR submission all live on one ledger." },
        { type: "imageGrid", cols: 2, items: [{ label: "Grant entry" }, { label: "Vesting calendar" }] },
        { type: "quote",   text: "“[EDIT] Pull quote - the moment we realised footnotes were the actual product.”" },
        { type: "heading", text: "[EDIT] Section heading - the bottleneck we found." },
        { type: "body",    text: "[EDIT] What broke when volume scaled. The decision. The fix." },
        { type: "impact",  items: [
          { stat: "[X]",   label: "Filings shipped" },
          { stat: "103",   label: "Analytics events instrumented" },
          { stat: "[EDIT]", label: "Reduction in filing time" },
        ]},
      ],
    },
  },

  /* ---------------- GRID REPORTS ---------------- */
  {
    id: "grid",
    name: "Grid Reports - Benchmarking Engine",
    one: "Compare disclosures, metrics, and positioning across a defined peer set in one structured grid.",
    tag: "WIP",
    heroLabel: "Grid Reports · benchmarking",
    caseStudy: {
      title: "Grid Reports - Benchmarking Engine",
      meta: {
        items: [
          { k: "Product",  v: "Grid Reports (by Finrep)" },
          { k: "My Role",  v: "Spec, decomposition logic" },
          { k: "Timeline", v: "[EDIT] – Present" },
          { k: "Status",   v: "WIP" },
          { k: "Impact",   v: "[EDIT]" },
        ],
        heading: "Overview",
        body: "The hard part of benchmarking isn't the grid - it's deciding what 'comparable' means when two companies disclose the same thing in incompatible shapes. This case study is about the decomposition + normalization layer that turns messy filings into a grid an analyst can actually defend.",
      },
      blocks: [
        { type: "hero",    label: "Grid Reports · peer view", aspect: "16/10" },
        { type: "heading", text: "[EDIT] Define 'comparable' before you build the grid." },
        { type: "body",    text: "[EDIT] Decomposition logic - how we split disclosures into atomic claims." },
        { type: "image",   label: "Decomposition flow", aspect: "16/9" },
      ],
    },
  },

  /* ---------------- PRODUCT ANALYTICS ---------------- */
  {
    id: "analytics",
    name: "Product Analytics System",
    one: "End-to-end Mixpanel instrumentation, funnels, and session-replay analysis driving roadmap decisions.",
    tag: "Internal",
    heroLabel: "Analytics · funnel dashboard",
    caseStudy: {
      title: "Product Analytics System",
      meta: {
        items: [
          { k: "Product",  v: "Internal · Finrep" },
          { k: "My Role",  v: "Instrumentation strategy, insight synthesis" },
          { k: "Timeline", v: "[EDIT] – Present" },
          { k: "Status",   v: "Live · internal" },
          { k: "Impact",   v: "Weekly replay reviews → roadmap input" },
        ],
        heading: "Overview",
        body: "The win wasn't 'more data' - it was a shared vocabulary. I set the taxonomy, owned the dashboards, and turned weekly replay reviews into the discovery engine that shapes the roadmap.",
      },
      blocks: [
        { type: "hero",    label: "Funnels · weekly review", aspect: "16/10" },
        { type: "heading", text: "[EDIT] A taxonomy is a product spec, not a config." },
        { type: "body",    text: "[EDIT] Why we wrote 103 events before writing a single dashboard." },
      ],
    },
  },
];

/* ============================================================
   BLOCK COMPONENTS
============================================================ */

function CSImage({ label, aspect = "16/10", caption, frame = true, style = {} }) {
  // soft mat + placeholder
  const inner = (
    <div style={{
      width: "100%",
      aspectRatio: aspect,
      borderRadius: 10,
      background: csCard,
      border: "1px solid " + csHair,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: csInk3, gap: 10, flexDirection: "column",
      position: "relative", overflow: "hidden",
      ...style,
    }}>
      {/* subtle grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--ink) 7%, transparent) 1px, transparent 0)",
        backgroundSize: "16px 16px",
        opacity: 0.5,
      }} />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative" }}>
        <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-4.5-4.5L7 21" />
      </svg>
      <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.10em", textTransform: "uppercase", position: "relative" }}>{label || "image"}</span>
    </div>
  );

  return (
    <figure style={{ margin: 0 }}>
      <div className={frame ? "m-frame-tight" : ""} style={frame ? csImageFrame : { borderRadius: 14, overflow: "hidden" }}>{inner}</div>
      {caption && (
        <figcaption style={{
          marginTop: 12, fontSize: 13, color: csInk3,
        }}>{caption}</figcaption>
      )}
    </figure>
  );
}

function CSHeading({ text }) {
  const lines = String(text).split("\n");
  return (
    <h2 style={{
      margin: 0,
      fontSize: "clamp(26px, 2.6vw, 36px)",
      fontWeight: 600,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
      color: csInk,
    }}>
      {lines.map((l, i) => (
        <span key={i} style={{ display: "block" }}>{l}</span>
      ))}
    </h2>
  );
}

function CSBody({ text, texts }) {
  const arr = texts || [text];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {arr.map((t, i) => (
        <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: csInk2, maxWidth: 72 + "ch" }}>{t}</p>
      ))}
    </div>
  );
}

function CSMeta({ items, heading, body, bodies }) {
  return (
    <div className="m-stack-1" style={{
      display: "grid",
      gridTemplateColumns: "minmax(220px, 1fr) minmax(0, 1.6fr)",
      gap: 56,
      alignItems: "start",
    }}>
      <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 28, rowGap: 14, margin: 0 }}>
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <dt style={{ fontWeight: 600, fontSize: 14, color: csInk, letterSpacing: "-0.005em" }}>{it.k}</dt>
            <dd style={{ margin: 0, fontSize: 14, color: csInk2 }}>{it.v}</dd>
          </React.Fragment>
        ))}
      </dl>
      <div>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: csInk }}>{heading}</h3>
        <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
          {(bodies || [body]).filter(Boolean).map((b, i) => (
            <p key={i} style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: csInk2, maxWidth: 64 + "ch" }}>{b}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function CSCards3({ items }) {
  return (
    <div className="m-stack-1" style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: 16,
    }}>
      {items.map((it, i) => (
        <div key={i} className="card-lift" style={{
          padding: 22,
          border: "1px solid " + csHair,
          borderRadius: 12,
          background: csPaper2,
        }}>
          <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em", color: csInk }}>{it.title}</div>
          <p style={{ margin: "8px 0 0 0", fontSize: 13.5, color: csInk2, lineHeight: 1.55 }}>{it.body}</p>
        </div>
      ))}
    </div>
  );
}

function CSImageGrid({ items, cols = 2 }) {
  return (
    <div className="m-stack-1" style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: 16,
    }}>
      {items.map((it, i) => (
        <CSImage key={i} label={it.label} aspect={it.aspect || "4/3"} frame={true} />
      ))}
    </div>
  );
}

function CSFlow({ steps }) {
  const stateColor = (s) => s === "blocked" ? "#D04A3A" : s === "active" ? "var(--good)" : csInk3;
  return (
    <div style={{
      padding: 28,
      borderRadius: 14,
      background: csPaper2,
      border: "1px solid " + csHair,
    }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{
              minWidth: 160,
              padding: "18px 22px",
              background: csCard,
              border: "1.5px solid " + (s.state === "active" || s.state === "blocked" ? stateColor(s.state) : csHair),
              borderRadius: 10,
              textAlign: "center",
              fontWeight: 500,
              fontSize: 15,
              color: csInk,
              boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
            }}>{s.label}</div>
            {i < steps.length - 1 && (
              <div aria-hidden style={{ display: "flex", alignItems: "center", color: csInk3 }}>
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h22M19 2l5 5-5 5" /></svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function CSFlowCards({ items }) {
  const tone = (s) => {
    if (s === "danger")  return { border: "color-mix(in oklab, #D04A3A 50%, var(--hairline))", text: "#D04A3A" };
    if (s === "success") return { border: "color-mix(in oklab, var(--good) 55%, var(--hairline))", text: "var(--good)" };
    return { border: csHair, text: csInk2 };
  };
  return (
    <div style={{
      padding: 28,
      borderRadius: 14,
      background: csPaper2,
      border: "1px solid " + csHair,
    }}>
      <div className="m-stack-1" style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`, gap: 16, alignItems: "stretch" }}>
        {items.map((it, i) => {
          const t = tone(it.state);
          return (
            <div key={i} style={{
              padding: "20px 16px 18px",
              borderRadius: 12,
              background: csCard,
              border: "1.5px solid " + t.border,
              display: "flex", flexDirection: "column", gap: 10,
              minHeight: 140,
            }}>
              <div style={{
                height: 56, borderRadius: 8, background: csPaper2, border: "1px dashed " + csHair,
                display: "flex", alignItems: "center", justifyContent: "center", color: csInk4, fontSize: 11,
              }} className="mono">illustration</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text, letterSpacing: "-0.005em", textAlign: "center" }}>{it.title}</div>
              {it.sub && <div style={{ fontSize: 12, color: csInk3, textAlign: "center", lineHeight: 1.45 }}>{it.sub}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CSQuote({ text }) {
  return (
    <div style={{
      padding: "18px 22px",
      background: csPaper2,
      border: "1px solid " + csHair,
      borderRadius: 10,
      fontSize: 15.5,
      color: csInk,
      lineHeight: 1.5,
    }}>{text}</div>
  );
}

function CSImpact({ items }) {
  return (
    <div className="m-stack-1" style={{
      display: "grid",
      gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
      gap: 16,
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: "26px 24px",
          border: "1px solid " + csHair,
          borderRadius: 12,
          background: csPaper2,
        }}>
          <div className="stat-num" style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.025em", color: csInk, lineHeight: 1.0 }}>{it.stat}</div>
          <div style={{ marginTop: 8, color: csInk2, fontSize: 14 }}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}

function CSTestimonial({ quote, name, role }) {
  return (
    <div style={{
      padding: "26px 28px 24px",
      borderRadius: 14,
      background: csPaper2,
      border: "1px solid " + csHair,
    }}>
      <div aria-hidden style={{ color: csInk3, fontSize: 24, lineHeight: 1, marginBottom: 10 }}>“ ”</div>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: csInk, maxWidth: 78 + "ch" }}>{quote}</p>
      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: "linear-gradient(135deg, var(--accent-soft), var(--paper-2))", border: "1px solid " + csHair }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
          <div style={{ fontSize: 12.5, color: csInk3 }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BLOCK RENDERER
============================================================ */

function renderBlock(b, i) {
  switch (b.type) {
    case "hero":        return <CSImage key={i} label={b.label} aspect={b.aspect || "16/10"} frame caption={b.caption} />;
    case "title":       return <h1 key={i} style={{ margin: 0, fontSize: "clamp(40px, 5.4vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{b.text}</h1>;
    case "meta":        return <CSMeta key={i} {...b} />;
    case "heading":     return <CSHeading key={i} text={b.text} />;
    case "body":        return <CSBody key={i} text={b.text} texts={b.texts} />;
    case "image":       return <CSImage key={i} label={b.label} aspect={b.aspect} caption={b.caption} frame={b.frame !== false} />;
    case "imageGrid":   return <CSImageGrid key={i} items={b.items} cols={b.cols} />;
    case "cards3":      return <CSCards3 key={i} items={b.items} />;
    case "flow":        return <CSFlow key={i} steps={b.steps} />;
    case "flowCards":   return <CSFlowCards key={i} items={b.items} />;
    case "quote":       return <CSQuote key={i} text={b.text} />;
    case "impact":      return <CSImpact key={i} items={b.items} />;
    case "testimonial": return <CSTestimonial key={i} {...b} />;
    case "spacer":      return <div key={i} style={{ height: b.h || 32 }} />;
    default:            return null;
  }
}

/* ============================================================
   CASE STUDY VIEW - fullscreen overlay
============================================================ */

function CaseStudyView({ project, onClose, onNext }) {
  const scrollRef = csUseRef(null);

  csUseEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
    }
    window.addEventListener("keydown", onKey);
    // reset scroll
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, onNext]);

  if (!project) return null;
  const cs = project.caseStudy;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cs.title}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: csPaper,
        animation: "fadeIn 180ms ease both",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* sticky close bar */}
      <div className="m-pad-x" style={{
        position: "sticky", top: 0, zIndex: 2,
        background: "color-mix(in oklab, " + csPaper + " 85%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--hairline-soft)",
        padding: "14px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
      }}>
        <button onClick={onClose} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 14px",
          background: "transparent", color: csInk2,
          border: "1px solid " + csHair, borderRadius: 999, fontSize: 13,
          cursor: "pointer",
        }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          Back
        </button>
        <span className="mono" style={{ fontSize: 11, color: csInk3 }}>{cs.title}</span>
        <span className="mono" style={{ fontSize: 11, color: csInk3 }}>esc</span>
      </div>

      {/* scroll container */}
      <div ref={scrollRef} className="scroll-thin" style={{ overflowY: "auto", flex: 1 }}>
        <article className="m-pad-x" style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 28px 80px" }}>
          {/* Hero: first block is hero image */}
          {cs.blocks[0] && cs.blocks[0].type === "hero" && (
            <div style={{ marginBottom: 48 }}>
              {renderBlock(cs.blocks[0], "hero-0")}
            </div>
          )}

          <h1 style={{
            margin: "0 0 40px 0",
            fontSize: "clamp(42px, 5.6vw, 68px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            color: csInk,
          }}>
            {cs.title}
          </h1>

          {/* Meta block */}
          <CSMeta {...cs.meta} />

          {/* Remaining blocks */}
          <div style={{ marginTop: 56, display: "grid", gap: 40 }}>
            {cs.blocks.slice(1).map((b, i) => renderBlock(b, i + 1))}
          </div>

          {/* Next case study */}
          {onNext && (
            <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid " + csHair }}>
              <button onClick={onNext} className="card-lift" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "12px 18px",
                background: csCard, color: csInk,
                border: "1.5px solid " + csAccent,
                borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: "pointer",
              }}>
                Next Case Study
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

/* ============================================================
   EXPORTS
============================================================ */

export { PROJECTS, CaseStudyView, CSImage, renderBlock };
