import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";

/* tiny classnames join (no tailwind-merge needed here) */
const cn = (...a) => a.filter(Boolean).join(" ");
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   EncryptedText — scrambles characters, then reveals the real
   text left-to-right (Aceternity "encrypted-text").
============================================================ */
const ENC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>/\\[]{}=+-";

export function EncryptedText({ text, className, style, charset = ENC_CHARS, durationMs = 1100, tickMs = 30 }) {
  const scramble = () =>
    text.split("").map((c) => (c === " " ? " " : charset[(Math.random() * charset.length) | 0])).join("");
  const [display, setDisplay] = useState(() => (prefersReduced() ? text : scramble()));

  useEffect(() => {
    if (prefersReduced()) { setDisplay(text); return; }
    const len = text.length;
    const ticks = Math.max(1, Math.round(durationMs / tickMs));
    const step = Math.max(1, Math.ceil(len / ticks));
    let revealed = 0;
    const id = setInterval(() => {
      revealed += step;
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i];
        out += ch === " " || i < revealed ? ch : charset[(Math.random() * charset.length) | 0];
      }
      setDisplay(out);
      if (revealed >= len) { setDisplay(text); clearInterval(id); }
    }, tickMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span className={className} style={style} aria-label={text}>{display}</span>;
}

/* ============================================================
   MagneticButton — drifts toward the cursor on hover, springs
   back on leave (Aceternity "magnetic-button").
============================================================ */
export function MagneticButton({ children, className, strength = 0.35, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15, mass: 0.1 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/* ============================================================
   CometCard — perspective 3D tilt toward the cursor + a moving
   glare highlight (Aceternity "comet-card").
============================================================ */
export function CometCard({ children, className, rotateDepth = 13, scaleOnHover = 1.02, radius = 14 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const opts = { stiffness: 180, damping: 18, mass: 0.2 };
  const rotateX = useSpring(useTransform(my, [0, 1], [rotateDepth, -rotateDepth]), opts);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-rotateDepth, rotateDepth]), opts);
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), transparent 45%)`;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };

  if (prefersReduced()) return <div className={className}>{children}</div>;

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileHover={{ scale: scaleOnHover }}
        transition={opts}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative" }}
        className={className}
      >
        {children}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            background: glare,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ============================================================
   BackgroundGradient — animated multi-radial gradient that sits
   behind content as a glowing, moving border (Aceternity
   "background-gradient"), tuned to the accent palette.
============================================================ */
export function BackgroundGradient({ children, className, containerClassName, style, animate = true, radius = 22 }) {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };
  const gradient =
    "radial-gradient(circle farthest-side at 0 100%, var(--accent), transparent)," +
    "radial-gradient(circle farthest-side at 100% 0, #8AB4FF, transparent)," +
    "radial-gradient(circle farthest-side at 100% 100%, #B58AFF, transparent)," +
    "radial-gradient(circle farthest-side at 0 0, var(--accent), var(--paper-2))";
  const layer = { backgroundImage: gradient, backgroundSize: "300% 300%", borderRadius: radius + 2 };
  const motionProps = animate
    ? { variants, initial: "initial", animate: "animate", transition: { duration: 6, repeat: Infinity, repeatType: "reverse" } }
    : {};

  return (
    <div className={cn("relative group", containerClassName)} style={{ padding: 2, borderRadius: radius + 2, ...style }}>
      <motion.div {...motionProps} aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.12] blur-md transition duration-500 group-hover:opacity-[0.22]"
        style={layer} />
      <motion.div {...motionProps} aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.55] transition duration-500 group-hover:opacity-[0.7]"
        style={layer} />
      <div className={cn("relative z-10", className)} style={{ borderRadius: radius }}>
        {children}
      </div>
    </div>
  );
}
