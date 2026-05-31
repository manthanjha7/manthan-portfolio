import React, { useEffect, useRef } from "react";
import { renderBlock } from "./caseStudies.jsx";
import manthanPhoto from "./manthan.jpg";

/* ============================================================
   STYLE TOKENS
============================================================ */

const aInk     = "var(--ink)";
const aInk2    = "var(--ink-2)";
const aInk3    = "var(--ink-3)";
const aHair    = "var(--hairline)";
const aCard    = "var(--card)";
const aPaper   = "var(--paper)";
const aAccent  = "var(--accent)";

/* ============================================================
   DATA - ARTICLES
   ----------------------------------------------------------------
   Each article uses the same block vocabulary as caseStudies.jsx
   (hero, heading, body, image, imageGrid, quote, cards3, impact,
   testimonial, spacer). Start each piece with a body block of the
   full LinkedIn post text; split paragraphs into a `texts` array
   to get proper paragraph spacing. Add `heading`, `quote`, etc.
   blocks to break up longer pieces.
============================================================ */

const ARTICLES = [
  {
    id: "pm-to-coder-six-months",
    slug: "from-pm-to-coder-six-months-in",
    title: "From PM to coder, six months in",
    dek: "If you'd told me six months ago I'd be pushing code to git as a PM, I'd have laughed.",
    category: "Build in public",
    date: "Oct 2025",
    readTime: "3 min read",
    blocks: [
      {
        type: "body",
        texts: [
          "Six months ago, if you'd told me I'd be pushing code to git as a PM, I'd have laughed. Today it's just a regular afternoon.",
          "Somewhere along the way at Finrep AI, something shifted. I stopped drawing lines around what was \"my job\". I started opening the terminal myself.",
          "Claude Code became my second brain, I live in it now. Brainstorming a feature at 2am? In there. Figuring out what worked and what broke with the users? In there. And on the side, playing with MCPs, wiring up integrations, breaking things, fixing them, breaking them again.",
          "The wildest part isn't the code. It's the shift in how I think.",
          "I used to write PRDs and hand them off. Now I sketch an idea, build a rough version of it myself, watch it break in ways I never would've predicted on paper, and then write the PRD. The thing that hits prod is 10x sharper because I've already lived inside it.",
          "Same with understanding users. Figuring out what worked, what broke, what they struggled with, I started owning that end-to-end now instead of waiting on someone else to hand me the data.",
          "And the repeat workflows, the stuff I used to do manually every week, I've turned most of them into skills now. Write it once, never think about it again. It's freed up an absurd amount of headspace for the actual thinking.",
          "Being a PM at an early-stage startup in 2026 doesn't look like what the playbooks say anymore. The job isn't \"manage the product.\" It's \"go figure it out, and bring something back.\"",
          "Some days I'm in Figma. Some days I'm in SQL. Some days I'm building internal tools nobody asked for at 1am wondering what my life has become. And honestly? I've never learned faster.",
          "To anyone still waiting for permission, just build it, nobody's going to handhold you. Type the first line. The rest figures itself out.",
        ],
      },
    ],
  },
  {
    id: "claude-code-os-for-pms",
    slug: "claude-code-is-an-os-for-pms",
    title: "Claude Code is an OS for PMs",
    dek: "'Claude Code' is the most misleading name in AI.",
    category: "AI for PMs",
    date: "Oct 2025",
    readTime: "4 min read",
    blocks: [
      {
        type: "body",
        texts: [
          "\"Claude Code\" is the most misleading name in AI. I heard this line on Aakash Gupta's podcast with Hannah Stulberg (PM at DoorDash) and it hasn't left my head since.",
          "Because she's right. Coding is part of it. But honestly, most of what I do in Claude Code isn't code.",
          "Here's what changed for me recently. I stopped treating Claude Code as a coding tool. I started treating it as an operating system for my work.",
          "The shift was simple. Everything I touch as a PM lives in one folder now. Metric definitions. Writing guides. Competitive research. Meeting transcripts. Skills I reuse every week. Plan files from past projects I don't want to redo from scratch. All of it in one place, structured so that when I ask a question, the terminal knows exactly where to look.",
          "My current setup: Cursor as the home base, Anthropic's Claude Code running the workspace, and Wispr Flow so I'm talking to it instead of typing. That combination alone has changed how fast I can move.",
          "The magic isn't the tool. It's the context. When my workspace is organized, a question like \"what did I learn from customer calls in the last two weeks\" takes seconds and barely dents the context window. When it isn't, the same question burns through tokens and gives me garbage. Same model. Same prompt. Completely different output.",
          "The difference is whether I did the work upfront to make my context legible.",
          "I've seen PMs (myself included, not long ago) prompt harder when the real fix was organizing better. Writing clever prompts against a messy workspace and wondering why the output still feels shallow. I've been on both sides of this.",
          "What actually worked for me was spending less time on prompts and more time on how my folder is structured.",
          "I'm nowhere near where I want to be with this. My folder is still a mess in places. But every week it gets a little cleaner, a little more useful, and my output compounds a little harder.",
          "I was in the Claude chat window too, for a long time. Moving to the terminal changed a lot for me. Everything runs from there now, and it just feels like a much more powerful way to work.",
        ],
      },
    ],
  },
  {
    id: "claude-design-for-pms",
    slug: "claude-design-for-pms",
    title: "Claude Design for PMs",
    dek: "Design wasn't the skill I was missing. It was the time.",
    category: "AI for PMs",
    date: "Nov 2025",
    readTime: "3 min read",
    blocks: [
      {
        type: "body",
        texts: [
          "Tried Claude Design yesterday for the first time. Now I get what the noise is about.",
          "Design wasn't the skill I was missing. It was the time.",
          "I know how to design. I've done it before. But I haven't touched Figma seriously in months, and designing a full feature from scratch, getting back into the muscle memory, building every component, would have eaten days I didn't have.",
          "I'd already coded the feature. Design was the thing pending. The design team was occupied with other work, and I needed to keep moving, so I opened up Claude Design and figured I'd see how far I could get.",
          "I fed it everything I had. Our design guidelines. The GitHub repo. Reference screenshots from layouts I liked. Inspirations I'd been saving. Then I wrote out what I wanted in a clean, structured prompt, the way you'd brief any good collaborator.",
          "It actually understood. Brand language preserved. Colors and typography pulled straight from our system. Components that looked like our product, not generic SaaS. The heavy lifting that usually takes two or three full days of back-and-forth was just done.",
          "Two or three hours later, I had something real. Made some manual fixes where it was off. Handed it to Claude Code for the implementation. From idea to working feature in an afternoon.",
          "The part that's been stuck in my head: this is the worst Claude Design will ever be. Iteration one of AI-native design. The Tweaks panel, the clarifying questions, the handoff to Claude Code, all of it gets sharper from here.",
          "The gap between what a PM ships today and what a PM ships in eighteen months is going to be wider than the gap between today and two years ago.",
          "PMs are not going to replace design teams. Designers still own the surfaces where design is the moat. The brand-defining work, the custom illustration, the things that take real design judgment. None of that changes.",
          "What changes is everything around it. The features where design was just a step between idea and prod, those don't have to wait anymore. The barrier to shipping features end to end is dropping every week.",
        ],
      },
    ],
  },
];

/* ============================================================
   SHARED - Article card (used by Index and "More writing")
============================================================ */

function ArticleCard({ article, onClick }) {
  return (
    <button
      onClick={() => onClick(article.id)}
      className="card-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
        padding: "22px 22px 24px",
        border: "1px solid " + aHair,
        borderRadius: 12,
        background: aCard,
        color: aInk,
        position: "relative",
        minHeight: 168,
        cursor: "pointer",
        font: "inherit",
      }}
    >
      <div className="mono" style={{
        fontSize: 11, color: aInk3, letterSpacing: "0.02em",
        height: 16, lineHeight: "16px", marginBottom: 14, flexShrink: 0,
      }}>
        {article.category.toUpperCase()} · {article.date.toUpperCase()}
      </div>
      <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.3, color: aInk }}>
        {article.title}
      </div>
      <div style={{ marginTop: 8, color: aInk2, fontSize: 13.5, lineHeight: 1.5 }}>
        {article.dek}
      </div>
      <div className="flex items-center" style={{
        gap: 6, position: "absolute", right: 22, bottom: 18, color: aInk3, fontSize: 12,
      }}>
        <span className="mono">read</span>
        <svg className="read-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </button>
  );
}

/* ============================================================
   SHARED - sticky overlay back bar
============================================================ */

function OverlayBackBar({ title, onClose }) {
  return (
    <div className="m-pad-x" style={{
      position: "sticky", top: 0, zIndex: 2,
      background: "color-mix(in oklab, " + aPaper + " 85%, transparent)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--hairline-soft)",
      padding: "14px 28px",
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
    }}>
      <button onClick={onClose} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 14px",
        background: "transparent", color: aInk2,
        border: "1px solid " + aHair, borderRadius: 999, fontSize: 13,
        cursor: "pointer",
      }}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>
      <span className="mono" style={{ fontSize: 11, color: aInk3, textAlign: "center", maxWidth: "60%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {title}
      </span>
      <span className="mono" style={{ fontSize: 11, color: aInk3 }}>esc</span>
    </div>
  );
}

/* ============================================================
   ARTICLE VIEW - fullscreen long-form overlay (OpenAI-style)
============================================================ */

function ArticleView({ article, onClose, onOpenArticle }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!article) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [article, onClose]);

  if (!article) return null;

  const hasHero = article.blocks[0] && article.blocks[0].type === "hero";
  const bodyBlocks = hasHero ? article.blocks.slice(1) : article.blocks;

  // "More writing" - up to 2 other articles after this one (cyclic)
  const idx = ARTICLES.findIndex(a => a.id === article.id);
  const more = [
    ARTICLES[(idx + 1) % ARTICLES.length],
    ARTICLES[(idx + 2) % ARTICLES.length],
  ].filter(a => a && a.id !== article.id).slice(0, 2);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: aPaper,
        animation: "fadeIn 180ms ease both",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      <OverlayBackBar title={article.title} onClose={onClose} />

      <div ref={scrollRef} className="scroll-thin" style={{ overflowY: "auto", flex: 1 }}>
        <article className="m-pad-x" style={{ maxWidth: 720, margin: "0 auto", padding: "72px 28px 96px" }}>
          {/* Eyebrow */}
          <div className="mono" style={{ fontSize: 12, color: aInk3, letterSpacing: "0.02em", marginBottom: 20 }}>
            {article.category.toUpperCase()} · {article.date.toUpperCase()} · {article.readTime.toUpperCase()}
          </div>

          {/* Title */}
          <h1 style={{
            margin: "0 0 24px 0",
            fontSize: "clamp(36px, 4.8vw, 56px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: aInk,
          }}>
            {article.title}
          </h1>

          {/* Dek */}
          {article.dek && (
            <p style={{
              margin: "0 0 32px 0",
              fontSize: 19,
              lineHeight: 1.5,
              color: aInk2,
              fontWeight: 400,
              letterSpacing: "-0.005em",
            }}>
              {article.dek}
            </p>
          )}

          {/* Byline */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            paddingTop: 20, paddingBottom: 32,
            borderTop: "1px solid " + aHair,
            borderBottom: "1px solid " + aHair,
            marginBottom: 48,
          }}>
            <img
              src={manthanPhoto}
              alt="Manthan Jha"
              style={{
                width: 36, height: 36, borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid " + aHair,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: aInk }}>Manthan Jha</span>
              <span className="mono" style={{ fontSize: 11, color: aInk3 }}>Product Manager</span>
            </div>
          </div>

          {/* Hero (if present) */}
          {hasHero && (
            <div style={{ marginBottom: 48 }}>
              {renderBlock(article.blocks[0], "hero-0")}
            </div>
          )}

          {/* Body blocks */}
          <div style={{ display: "grid", gap: 32 }}>
            {bodyBlocks.map((b, i) => renderBlock(b, i + (hasHero ? 1 : 0)))}
          </div>

          {/* More writing */}
          {more.length > 0 && (
            <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid " + aHair }}>
              <div className="mono" style={{ fontSize: 11, color: aInk3, letterSpacing: "0.06em", marginBottom: 20, textTransform: "uppercase" }}>
                More writing
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
              }}>
                {more.map(a => (
                  <ArticleCard key={a.id} article={a} onClick={onOpenArticle} />
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

/* ============================================================
   ARTICLES INDEX VIEW - fullscreen 3-col grid overlay
============================================================ */

function ArticlesIndexView({ open, onClose, onOpenArticle }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
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
      aria-label="All writing"
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: aPaper,
        animation: "fadeIn 180ms ease both",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
    >
      <OverlayBackBar title="Writing" onClose={onClose} />

      <div className="scroll-thin" style={{ overflowY: "auto", flex: 1 }}>
        <div className="m-pad-x" style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 28px 96px" }}>
          {/* Header */}
          <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: "1px solid " + aHair }}>
            <div className="mono" style={{ fontSize: 12, color: aAccent, marginBottom: 12, letterSpacing: "0.02em" }}>
              WRITING
            </div>
            <h1 style={{
              margin: "0 0 12px 0",
              fontSize: "clamp(36px, 4.8vw, 56px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: aInk,
            }}>
              Notes from the build
            </h1>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: aInk2, maxWidth: 640 }}>
              Short posts on building products, learning to code as a PM, and what I'm figuring out at Finrep.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}>
            {ARTICLES.map(a => (
              <ArticleCard key={a.id} article={a} onClick={onOpenArticle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EXPORTS
============================================================ */

export { ARTICLES, ArticleView, ArticlesIndexView };
