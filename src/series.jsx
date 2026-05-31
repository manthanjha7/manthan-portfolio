import React, { useEffect, useRef, useState } from "react";
import { renderBlock } from "./caseStudies.jsx";
import manthanPhoto from "./manthan.jpg";

/* ============================================================
   STYLE TOKENS
============================================================ */

const sInk    = "var(--ink)";
const sInk2   = "var(--ink-2)";
const sInk3   = "var(--ink-3)";
const sInk4   = "var(--ink-4)";
const sHair   = "var(--hairline)";
const sCard   = "var(--card)";
const sPaper  = "var(--paper)";
const sAccent = "var(--accent)";

/* ============================================================
   DATA - SERIES
   ----------------------------------------------------------------
   Each series has lessons. A lesson uses the same block vocabulary
   as caseStudies.jsx + the added `code`, `table`, and `video` blocks.

   Lessons with `blocks: []` render a "Coming soon" panel. Fill in
   blocks later to publish a lesson without any other code changes.
============================================================ */

const SERIES = [
  {
    id: "git-for-pms",
    slug: "github-for-product-managers",
    title: "GitHub for Product Managers",
    dek: "The 10-lesson series I wish I had when I first opened a terminal as a PM.",
    category: "Engineering for PMs",
    date: "Jun 2026",
    lessonCount: 10,
    lessons: [
      { n: 1,  title: "Why Git Exists",                    kicker: "Module 1 · Mental Model",                blocks: [] },
      { n: 2,  title: "Inside a Commit",                   kicker: "Module 1 · Mental Model",                blocks: [] },
      { n: 3,  title: "Branches, HEAD, Refs",              kicker: "Module 1 · Mental Model",                blocks: [] },
      { n: 4,  title: "Staging, Committing, Undoing",      kicker: "Module 2 · Daily Workflow",              blocks: [] },
      { n: 5,  title: "Merge vs Rebase vs Squash",         kicker: "Module 2 · Daily Workflow",              blocks: [] },
      { n: 6,  title: "Disasters & Reflog",                kicker: "Module 3 · Recovery",                    blocks: [] },
      { n: 7,  title: "Remotes",                           kicker: "Module 4 · Collaboration",               blocks: [] },
      { n: 8,  title: "PR Craft & Commit Hygiene",         kicker: "Module 4 · Collaboration",               blocks: [] },
      { n: 9,  title: "GitHub Actions & CI",               kicker: "Module 5 · AI-Era Product Engineer",     blocks: [] },
      { n: 10, title: "Reviewing Agent PRs + AGENTS.md",   kicker: "Module 5 · AI-Era Product Engineer",     blocks: [] },
    ],
  },
];

/* ============================================================
   SERIES CARD - used in Writing section + Index
============================================================ */

function SeriesCard({ series, onClick }) {
  return (
    <button
      onClick={() => onClick(series.id)}
      className="card-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
        padding: "22px 22px 24px",
        border: "1px solid " + sHair,
        borderRadius: 12,
        background: sCard,
        color: sInk,
        position: "relative",
        minHeight: 168,
        cursor: "pointer",
        font: "inherit",
      }}
    >
      <div className="flex items-center justify-between" style={{
        height: 16, lineHeight: "16px", marginBottom: 14, flexShrink: 0,
      }}>
        <span className="mono" style={{ fontSize: 11, color: sInk3, letterSpacing: "0.02em" }}>
          SERIES · {series.lessonCount} LESSONS
        </span>
        <span className="mono" style={{
          fontSize: 10, color: sAccent,
          padding: "2px 7px",
          border: "1px solid color-mix(in oklab, " + sAccent + " 35%, " + sHair + ")",
          borderRadius: 999, letterSpacing: "0.04em", textTransform: "uppercase",
        }}>New</span>
      </div>
      <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.3, color: sInk }}>
        {series.title}
      </div>
      <div style={{ marginTop: 8, color: sInk2, fontSize: 13.5, lineHeight: 1.5 }}>
        {series.dek}
      </div>
      <div className="flex items-center" style={{
        gap: 6, position: "absolute", right: 22, bottom: 18, color: sInk3, fontSize: 12,
      }}>
        <span className="mono">start</span>
        <svg className="read-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </button>
  );
}

/* ============================================================
   OverlayBackBar - duplicated lightweight version
============================================================ */

function SeriesBackBar({ title, onClose }) {
  return (
    <div className="m-pad-x" style={{
      position: "sticky", top: 0, zIndex: 2,
      background: "color-mix(in oklab, " + sPaper + " 85%, transparent)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--hairline-soft)",
      padding: "14px 28px",
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
    }}>
      <button onClick={onClose} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 14px",
        background: "transparent", color: sInk2,
        border: "1px solid " + sHair, borderRadius: 999, fontSize: 13,
        cursor: "pointer",
      }}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>
      <span className="mono" style={{ fontSize: 11, color: sInk3, textAlign: "center", maxWidth: "60%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {title}
      </span>
      <span className="mono" style={{ fontSize: 11, color: sInk3 }}>esc</span>
    </div>
  );
}

/* ============================================================
   LESSON NAV - Prev / Next at bottom of each lesson
============================================================ */

function LessonNav({ series, idx, onGo }) {
  const total = series.lessons.length;
  const prevDisabled = idx <= 0;
  const nextDisabled = idx >= total - 1;
  const prev = !prevDisabled ? series.lessons[idx - 1] : null;
  const next = !nextDisabled ? series.lessons[idx + 1] : null;

  function NavButton({ disabled, side, lesson, onClick }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={disabled ? "" : "card-lift"}
        aria-label={side === "prev" ? "Previous lesson" : "Next lesson"}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: side === "prev" ? "flex-start" : "flex-end",
          textAlign: side === "prev" ? "left" : "right",
          gap: 6,
          padding: "16px 18px",
          border: "1px solid " + sHair,
          borderRadius: 12,
          background: disabled ? "transparent" : sCard,
          color: disabled ? sInk4 : sInk,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          font: "inherit",
        }}
      >
        <span className="mono" style={{
          fontSize: 11, color: disabled ? sInk4 : sInk3, letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          {side === "prev" ? "← Previous" : "Next →"}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.005em", lineHeight: 1.3 }}>
          {lesson ? `Lesson ${lesson.n} · ${lesson.title}` : "End of series"}
        </span>
      </button>
    );
  }

  return (
    <div className="m-stack-1" style={{
      marginTop: 64, paddingTop: 28,
      borderTop: "1px solid " + sHair,
      display: "flex", gap: 14, alignItems: "stretch",
    }}>
      <NavButton
        side="prev"
        disabled={prevDisabled}
        lesson={prev}
        onClick={prevDisabled ? undefined : () => onGo(idx - 1)}
      />
      <NavButton
        side="next"
        disabled={nextDisabled}
        lesson={next}
        onClick={nextDisabled ? undefined : () => onGo(idx + 1)}
      />
    </div>
  );
}

/* ============================================================
   SERIES VIEW - fullscreen lesson reader
============================================================ */

function SeriesView({ series, onClose }) {
  const scrollRef = useRef(null);
  const [idx, setIdx] = useState(0);

  // Reset to lesson 1 every time a series opens
  useEffect(() => {
    if (series) setIdx(0);
  }, [series && series.id]);

  // Lock scroll + escape + scroll-to-top on lesson change
  useEffect(() => {
    if (!series) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && idx < series.lessons.length - 1) setIdx(i => i + 1);
      if (e.key === "ArrowLeft" && idx > 0) setIdx(i => i - 1);
    }
    window.addEventListener("keydown", onKey);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [series, onClose, idx]);

  if (!series) return null;

  const lesson = series.lessons[idx];
  const total = series.lessons.length;
  const hasContent = lesson.blocks && lesson.blocks.length > 0;

  function goTo(i) {
    setIdx(i);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={series.title + " · " + lesson.title}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: sPaper,
        animation: "fadeIn 180ms ease both",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      <SeriesBackBar title={series.title + " · Lesson " + lesson.n + " of " + total} onClose={onClose} />

      <div ref={scrollRef} className="scroll-thin" style={{ overflowY: "auto", flex: 1 }}>
        <article className="m-pad-x" style={{ maxWidth: 760, margin: "0 auto", padding: "56px 28px 96px" }}>
          {/* Series eyebrow */}
          <div className="mono" style={{ fontSize: 12, color: sAccent, letterSpacing: "0.04em", marginBottom: 10, textTransform: "uppercase" }}>
            {series.title}
          </div>

          {/* Lesson number + module kicker */}
          <div className="flex items-baseline" style={{ gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
            <span className="mono" style={{
              fontSize: 12, color: sInk3, letterSpacing: "0.04em",
              padding: "3px 9px", border: "1px solid " + sHair, borderRadius: 999,
            }}>
              LESSON {String(lesson.n).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {lesson.kicker && (
              <span className="mono" style={{ fontSize: 11.5, color: sInk3 }}>{lesson.kicker}</span>
            )}
            {lesson.readTime && (
              <span className="mono" style={{ fontSize: 11.5, color: sInk3 }}>{lesson.readTime.toUpperCase()}</span>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            margin: "0 0 24px 0",
            fontSize: "clamp(36px, 4.8vw, 56px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: sInk,
          }}>
            {lesson.title}
          </h1>

          {/* Byline */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            paddingTop: 20, paddingBottom: 28,
            borderTop: "1px solid " + sHair,
            borderBottom: "1px solid " + sHair,
            marginBottom: 48,
          }}>
            <img
              src={manthanPhoto}
              alt="Manthan Jha"
              style={{
                width: 36, height: 36, borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid " + sHair,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: sInk }}>Manthan Jha</span>
              <span className="mono" style={{ fontSize: 11, color: sInk3 }}>{series.category}</span>
            </div>
          </div>

          {/* Body */}
          {hasContent ? (
            <div style={{ display: "grid", gap: 28 }}>
              {lesson.blocks.map((b, i) => renderBlock(b, i))}
            </div>
          ) : (
            <div style={{
              padding: "32px 28px",
              border: "1px dashed " + sHair,
              borderRadius: 12,
              background: "color-mix(in oklab, var(--ink) 3%, transparent)",
              color: sInk3,
              fontSize: 14.5,
              lineHeight: 1.6,
              textAlign: "center",
            }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: sInk4, marginBottom: 10 }}>
                COMING SOON
              </div>
              This lesson is on the way. Use Next / Previous to keep moving through the series.
            </div>
          )}

          <LessonNav series={series} idx={idx} onGo={goTo} />
        </article>
      </div>
    </div>
  );
}

/* ============================================================
   EXPORTS
============================================================ */

export { SERIES, SeriesCard, SeriesView };
