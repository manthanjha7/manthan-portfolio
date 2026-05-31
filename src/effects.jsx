import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, animate } from "motion/react";
import { memo, useCallback } from "react";

/* tiny classnames join (no tailwind-merge needed here) */
const cn = (...a) => a.filter(Boolean).join(" ");
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   EncryptedText - scrambles characters, then reveals the real
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
   MagneticButton - drifts toward the cursor on hover, springs
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
   CometCard - perspective 3D tilt toward the cursor + a moving
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
   BackgroundGradient - animated multi-radial gradient that sits
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

/* ----------------------------------------------------------------
   GlowingEffect - animated conic-gradient border that follows the
   cursor as it approaches the parent. Drop inside any element with
   position: relative (and a matching border-radius). Adapted from
   ui.aceternity.com/components/glowing-effect.
---------------------------------------------------------------- */
export const GlowingEffect = memo(function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  movementDuration = 2,
  borderWidth = 1,
  disabled = false,
}) {
  const containerRef = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(0);

  const handleMove = useCallback((e) => {
    if (!containerRef.current) return;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      const element = containerRef.current;
      if (!element) return;

      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = e?.x ?? lastPosition.current.x;
      const mouseY = e?.y ?? lastPosition.current.y;

      if (e) lastPosition.current = { x: mouseX, y: mouseY };

      const center = [left + width * 0.5, top + height * 0.5];
      const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
      const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

      if (distanceFromCenter < inactiveRadius) {
        element.style.setProperty("--active", "0");
        return;
      }

      const isActive =
        mouseX > left - proximity &&
        mouseX < left + width + proximity &&
        mouseY > top - proximity &&
        mouseY < top + height + proximity;

      element.style.setProperty("--active", isActive ? "1" : "0");
      if (!isActive) return;

      const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
      let targetAngle =
        (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;

      animate(currentAngle, newAngle, {
        duration: movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          element.style.setProperty("--start", String(value));
        },
      });
    });
  }, [inactiveZone, proximity, movementDuration]);

  useEffect(() => {
    if (disabled) return;
    const handleScroll = () => handleMove();
    const handlePointerMove = (e) => handleMove(e);

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handleMove, disabled]);

  const gradient =
    variant === "white"
      ? "repeating-conic-gradient(from 236.84deg at 50% 50%, #000, #000 calc(25% / 5))"
      : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
         radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
         radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
         radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #dd7bbb 0%,
           #d79f1e calc(25% / 5),
           #5a922c calc(50% / 5),
           #4c7894 calc(75% / 5),
           #dd7bbb calc(100% / 5)
         )`;

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        "--blur": `${blur}px`,
        "--spread": spread,
        "--start": "0",
        "--active": "0",
        "--glowingeffect-border-width": `${borderWidth}px`,
        "--gradient": gradient,
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
        opacity: 1,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
      className={cn(
        "glow",
        className,
        'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
        "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
        "after:[background:var(--gradient)] after:[background-attachment:fixed]",
        "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
        "after:[mask-clip:padding-box,border-box]",
        "after:[mask-composite:intersect]",
        "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
        glow && "after:!opacity-100"
      )}
    />
  );
});
