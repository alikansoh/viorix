"use client";

import React, {
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  MessageSquare,
  Calendar,
  Code2,
  CheckCircle,
  Package,
  ArrowUpRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string; "aria-hidden"?: boolean }>;
  duration: string;
  deliverables: string[];
  index: string;
};

/* ─────────────────────────────────────────────────────────────
   Eye gaze targets per step — subtle, professional saccades
───────────────────────────────────────────── */
const GAZE: { lx: number; ly: number; rx: number; ry: number }[] = [
  { lx: -2.8, ly:  1.2, rx: -2.8, ry:  1.2 },
  { lx: -1.2, ly:  0.4, rx: -1.2, ry:  0.4 },
  { lx:  0,   ly:  0,   rx:  0,   ry:  0   },
  { lx:  1.2, ly:  0.4, rx:  1.2, ry:  0.4 },
  { lx:  2.8, ly:  1.2, rx:  2.8, ry:  1.2 },
];

/* ─────────────────────────────────────────────────────────────
   Lean angles per step — robot tilts toward the active step
───────────────────────────────────────────── */
const LEAN_ANGLES = [-4, -2, 0, 2, 4] as const;

/* ─────────────────────────────────────────────────────────────
   Robot — refined, professional illustration
───────────────────────────────────────────── */
function Robot({ active }: { active: number }) {
  const g = GAZE[active] ?? GAZE[2];
  const barW = 10 + (active / 4) * 50;

  return (
    <svg
      viewBox="0 0 110 148"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", width: 110, height: 148, overflow: "visible" }}
      className="op-robot-svg"
    >
      {/* Antenna stem */}
      <line x1="55" y1="2" x2="55" y2="16"
        stroke="rgba(0,191,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Antenna orb glow ring */}
      <circle cx="55" cy="2" r="4.5"
        fill="none" stroke="rgba(0,191,255,0.25)" strokeWidth="1" />
      {/* Antenna orb */}
      <circle cx="55" cy="2" r="3"
        fill="#00bfff" opacity="0.9" className="op-antenna-pulse" />
      <circle cx="55" cy="2" r="1.5"
        fill="#6ddcff" />

      {/* ── Head shell ── */}
      <rect x="16" y="16" width="78" height="54" rx="11"
        fill="#071525" stroke="rgba(0,191,255,0.22)" strokeWidth="1.2" />
      {/* Head top highlight bevel */}
      <rect x="16" y="16" width="78" height="6" rx="11"
        fill="rgba(0,191,255,0.06)" />

      {/* Face panel inset */}
      <rect x="22" y="22" width="66" height="40" rx="7"
        fill="#040e1c" stroke="rgba(0,191,255,0.12)" strokeWidth="0.7" />

      {/* ── Left eye assembly ── */}
      <circle cx="39" cy="42" r="11"
        fill="#040e1c" stroke="rgba(0,191,255,0.14)" strokeWidth="0.8" />
      <circle cx="39" cy="42" r="8.8"
        fill="none" stroke="rgba(0,191,255,0.28)" strokeWidth="0.6"
        className="op-eye-ring-l" />
      <circle cx="39" cy="42" r="6.5"
        fill="rgba(0,191,255,0.12)" />
      <circle
        cx={39 + g.lx} cy={42 + g.ly} r="4.8"
        fill="#00bfff" opacity="0.92"
        className="op-pupil"
      />
      <circle
        cx={39 + g.lx * 0.6 + 1.4} cy={42 + g.ly * 0.6 - 1.4} r="1.6"
        fill="white" opacity="0.75"
        className="op-pupil-shine"
      />

      {/* ── Right eye assembly ── */}
      <circle cx="71" cy="42" r="11"
        fill="#040e1c" stroke="rgba(0,191,255,0.14)" strokeWidth="0.8" />
      <circle cx="71" cy="42" r="8.8"
        fill="none" stroke="rgba(0,191,255,0.28)" strokeWidth="0.6"
        className="op-eye-ring-r" />
      <circle cx="71" cy="42" r="6.5"
        fill="rgba(0,191,255,0.12)" />
      <circle
        cx={71 + g.rx} cy={42 + g.ry} r="4.8"
        fill="#00bfff" opacity="0.92"
        className="op-pupil"
      />
      <circle
        cx={71 + g.rx * 0.6 + 1.4} cy={42 + g.ry * 0.6 - 1.4} r="1.6"
        fill="white" opacity="0.75"
        className="op-pupil-shine"
      />

      {/* Mouth — thin horizontal status line */}
      <rect x="36" y="56" width="38" height="2.5" rx="1.25"
        fill="rgba(0,191,255,0.18)" />
      <rect x="36" y="56"
        width={8 + active * 7.5} height="2.5" rx="1.25"
        fill="#00bfff" opacity="0.7"
        className="op-mouth-bar"
      />

      {/* ── Neck ── */}
      <rect x="44" y="70" width="22" height="7" rx="3"
        fill="#071525" stroke="rgba(0,191,255,0.16)" strokeWidth="0.7" />
      <line x1="49" y1="70" x2="49" y2="77"
        stroke="rgba(0,191,255,0.1)" strokeWidth="0.7" />
      <line x1="55" y1="70" x2="55" y2="77"
        stroke="rgba(0,191,255,0.1)" strokeWidth="0.7" />
      <line x1="61" y1="70" x2="61" y2="77"
        stroke="rgba(0,191,255,0.1)" strokeWidth="0.7" />

      {/* ── Body shell ── */}
      <rect x="14" y="77" width="82" height="54" rx="9"
        fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="1.2" />
      <rect x="14" y="77" width="82" height="10" rx="9"
        fill="rgba(0,191,255,0.05)" />

      {/* Chest panel */}
      <rect x="22" y="83" width="66" height="40" rx="6"
        fill="#040e1c" stroke="rgba(0,191,255,0.1)" strokeWidth="0.7" />
      <line x1="22" y1="103" x2="88" y2="103"
        stroke="rgba(0,191,255,0.08)" strokeWidth="0.7" />

      {/* Indicator dots */}
      {[34, 48, 62, 76].map((cx, i) => (
        <circle key={cx} cx={cx} cy={94} r="3.5"
          fill={i < active + 1 ? "rgba(0,191,255,0.75)" : "rgba(0,191,255,0.1)"}
          stroke="rgba(0,191,255,0.3)" strokeWidth="0.5"
          className="op-dot"
        />
      ))}

      {/* Progress bar track */}
      <rect x="26" y="109" width="58" height="4" rx="2"
        fill="#040e1c" stroke="rgba(0,191,255,0.12)" strokeWidth="0.5" />
      <rect x="26" y="109" width={barW} height="4" rx="2"
        fill="#00bfff" opacity="0.75"
        className="op-bar-fill"
      />
      <rect x={26 + barW - 3} y="109" width="5" height="4" rx="2"
        fill="#6ddcff" opacity="0.9"
        className="op-bar-tip"
      />

      {/* Side vents on body */}
      {[83, 88, 93, 98, 103, 108].map((y) => (
        <line key={`lv${y}`} x1="14" y1={y} x2="10" y2={y}
          stroke="rgba(0,191,255,0.12)" strokeWidth="0.8" strokeLinecap="round" />
      ))}
      {[83, 88, 93, 98, 103, 108].map((y) => (
        <line key={`rv${y}`} x1="96" y1={y} x2="100" y2={y}
          stroke="rgba(0,191,255,0.12)" strokeWidth="0.8" strokeLinecap="round" />
      ))}

      {/* ── Arms ── */}
      <circle cx="14" cy="84" r="5"
        fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.8" />
      <rect x="3" y="82" width="11" height="30" rx="5.5"
        fill="#071525" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />
      <circle cx="8.5" cy="114" r="4.5"
        fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.8" />
      <rect x="4" y="114" width="9" height="18" rx="4.5"
        fill="#060f1e" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />

      <circle cx="96" cy="84" r="5"
        fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.8" />
      <rect x="96" y="82" width="11" height="30" rx="5.5"
        fill="#071525" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />
      <circle cx="101.5" cy="114" r="4.5"
        fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.8" />
      <rect x="97" y="114" width="9" height="18" rx="4.5"
        fill="#060f1e" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />

      {/* ── Legs ── */}
      <circle cx="33" cy="131" r="5"
        fill="#071525" stroke="rgba(0,191,255,0.18)" strokeWidth="0.8" />
      <rect x="27" y="131" width="12" height="17" rx="6"
        fill="#071525" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />
      <rect x="22" y="145" width="22" height="7" rx="3.5"
        fill="#060f1e" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />

      <circle cx="77" cy="131" r="5"
        fill="#071525" stroke="rgba(0,191,255,0.18)" strokeWidth="0.8" />
      <rect x="71" y="131" width="12" height="17" rx="6"
        fill="#071525" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />
      <rect x="66" y="145" width="22" height="7" rx="3.5"
        fill="#060f1e" stroke="rgba(0,191,255,0.18)" strokeWidth="0.9" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Steps data
───────────────────────────────────────────── */
const useSteps = (): Step[] =>
  useMemo(
    () => [
      {
        title: "Discovery",
        description:
          "We listen first. A focused session to align on your goals, audience, and constraints — before a single line is written.",
        icon: MessageSquare,
        duration: "1–2 days",
        deliverables: ["Project Brief", "Requirements", "Timeline"],
        index: "01",
      },
      {
        title: "Planning",
        description:
          "Architecture before aesthetics. We map information structure, technical stack, and milestones with surgical clarity.",
        icon: Calendar,
        duration: "3–5 days",
        deliverables: ["Roadmap", "Sitemap", "Tech Spec"],
        index: "02",
      },
      {
        title: "Design & Build",
        description:
          "Craft meets performance. Custom interfaces built on clean, tested code — every component intentional, every interaction considered.",
        icon: Code2,
        duration: "2–4 weeks",
        deliverables: ["UI/UX Design", "Responsive Code", "QA Testing"],
        index: "03",
      },
      {
        title: "Launch",
        description:
          "Nothing ships untested. Performance benchmarks, security audits, and staged deployment ensure a flawless go-live.",
        icon: CheckCircle,
        duration: "3–5 days",
        deliverables: ["Perf Testing", "Security Audit", "Deployment"],
        index: "04",
      },
      {
        title: "Support",
        description:
          "The relationship continues post-launch. Monitoring, updates, and analytics keep your platform ahead of the curve.",
        icon: Package,
        duration: "Ongoing",
        deliverables: ["24/7 Monitor", "Updates", "Analytics"],
        index: "05",
      },
    ],
    []
  );

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function OurProcess(): JSX.Element {
  const steps = useSteps();
  const [active, setActive] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  // ── NEW: ref tracks current step without closure staleness ──
  const activeRef = useRef<number>(0);
  // ── NEW: ref to the inner bounce wrapper for JS-triggered animation ──
  const robotBounceRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const demoRunning = useRef(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ── NEW: unified step setter — triggers directional bounce animation ──
  const goToStep = useCallback((idx: number) => {
    const from = activeRef.current;
    const dir = idx >= from ? "right" : "left";
    activeRef.current = idx;

    if (robotBounceRef.current) {
      const el = robotBounceRef.current;
      // Reset animation so it re-triggers even if same direction is repeated
      el.style.animation = "none";
      void el.offsetWidth; // force reflow
      el.style.animation = `op-bounce-from-${dir} 0.52s cubic-bezier(0.34,1.56,0.64,1) forwards`;
    }

    setActive(idx);
  }, []);

  const stopDemo = useCallback(() => {
    demoRunning.current = false;
    if (demoRef.current) clearTimeout(demoRef.current);
  }, []);

  useEffect(() => {
    let idx = 1;
    const tick = () => {
      if (!demoRunning.current || idx > 4) return;
      goToStep(idx); // ← was plain setActive; now also drives the animation
      idx++;
      demoRef.current = setTimeout(tick, 1400);
    };
    demoRef.current = setTimeout(tick, 1200);
    return () => { if (demoRef.current) clearTimeout(demoRef.current); };
  }, [goToStep]);

  const jsonLd = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Our Process",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      name: `${i + 1}. ${s.title}`,
      url: `#op-step-${i + 1}`,
    })),
  }), [steps]);

  return (
    <section
      className={`op-root${visible ? " op-visible" : ""}`}
      role="region"
      aria-labelledby="op-heading"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .op-root {
          --blue:      #00bfff;
          --blue2:     #0099cc;
          --blue-dim:  rgba(0,191,255,0.06);
          --blue-mid:  rgba(0,191,255,0.14);
          --blue-glow: rgba(0,191,255,0.32);
          --bg:        #050a13;
          --surface:   #071525;
          --border:    rgba(0,191,255,0.16);
          --muted:     rgba(255,255,255,0.55);
          --text:      #ffffff;
          font-family: Inter, "DM Sans", system-ui, sans-serif;
          background: var(--bg);
          color: var(--text);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.55s ease;
        }
        .op-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .op-visible { opacity: 1 !important; }

        .op-bg-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.35;
        }
        .op-bg-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background:
            radial-gradient(ellipse at 50% 0%,   rgba(0,80,170,0.2)  0%, transparent 55%),
            radial-gradient(ellipse at 50% 100%, transparent 40%, rgba(4,8,16,0.65) 100%);
        }
        .op-robot-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 520px; height: 320px;
          background: radial-gradient(ellipse at 50% 55%,
            rgba(0,191,255,0.09) 0%, transparent 68%);
          pointer-events: none; z-index: 1;
        }

        /* ── Header ──────────────────────────────────────────── */
        .op-header {
          max-width: 1240px; margin: 0 auto;
          padding: clamp(64px,9vw,112px) clamp(20px,5vw,64px) clamp(40px,5vw,64px);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: end;
          border-bottom: 1px solid var(--border);
          position: relative; z-index: 3;
        }
        @media (max-width: 680px) { .op-header { grid-template-columns: 1fr; } }

        .op-eyebrow {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--blue); font-weight: 600; margin-bottom: 14px;
        }
        .op-heading {
          font-size: clamp(36px,5.5vw,72px);
          font-weight: 800; line-height: 0.94; letter-spacing: -0.03em;
        }
        .op-heading em {
          font-style: normal;
          background: linear-gradient(110deg,#00bfff 0%,#6ddcff 45%,#0099cc 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .op-header-right { text-align: right; }
        .op-header-desc {
          font-size: 14px; line-height: 1.75; color: var(--muted);
          max-width: 38ch; font-weight: 400; margin-bottom: 24px;
          text-align: right;
        }

        .op-step-nav {
          display: flex; align-items: center; justify-content: flex-end; gap: 6px;
        }
        .op-nav-dot {
          height: 6px; border-radius: 3px;
          background: rgba(0,191,255,0.15);
          border: 1px solid var(--border);
          cursor: pointer; padding: 0;
          transition: width 0.4s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.3s ease, box-shadow 0.3s ease;
          width: 6px;
        }
        .op-nav-dot:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
        .op-nav-dot.is-active {
          width: 28px;
          background: var(--blue);
          box-shadow: 0 0 10px rgba(0,191,255,0.45), 0 0 24px rgba(0,191,255,0.2);
        }

        /* ── Robot stage ─────────────────────────────────────── */
        .op-robot-stage {
          position: relative; z-index: 3;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-top: 32px;
          height: 200px;
        }

        /* ── NEW: Lean wrapper — tilts toward the active step ── */
        .op-robot-lean {
          transition: transform 0.55s cubic-bezier(0.34, 1.2, 0.64, 1);
          transform-origin: 50% 96%; /* pivot near robot's feet */
          will-change: transform;
        }

        /* ── NEW: Bounce-from-side keyframes ─────────────────── */
        /*
          The bounce div has no base class styling — animation is applied via
          inline style in JS so each step change reliably re-triggers it.
          The two keyframe sets cover entering from the right or left.
        */
        @keyframes op-bounce-from-right {
          0%   { transform: translateX(46px) rotate(6deg);   opacity: 0.4; }
          55%  { transform: translateX(-8px) rotate(-1deg); }
          78%  { transform: translateX(3px)  rotate(0.4deg); }
          100% { transform: translateX(0)    rotate(0deg);   opacity: 1; }
        }
        @keyframes op-bounce-from-left {
          0%   { transform: translateX(-46px) rotate(-6deg);  opacity: 0.4; }
          55%  { transform: translateX(8px)   rotate(1deg); }
          78%  { transform: translateX(-3px)  rotate(-0.4deg); }
          100% { transform: translateX(0)     rotate(0deg);   opacity: 1; }
        }

        /* Idle breath on the SVG — unchanged */
        @keyframes op-breath {
          0%,100% { transform: translateY(0)    scaleY(1)    scaleX(1); }
          45%      { transform: translateY(-3px) scaleY(1.01) scaleX(0.995); }
        }
        .op-robot-svg {
          animation: op-breath 4s cubic-bezier(0.37,0,0.63,1) infinite;
          transform-origin: 50% 95%;
        }

        @keyframes op-ring-pulse {
          0%   { opacity: 1; r: 8.8; }
          50%  { opacity: 0.8; r: 10.5; }
          100% { opacity: 1; r: 8.8; }
        }
        .op-root .op-eye-ring-l,
        .op-root .op-eye-ring-r {
          animation: none;
        }
        .op-root.eye-pulse .op-eye-ring-l,
        .op-root.eye-pulse .op-eye-ring-r {
          animation: op-ring-pulse 0.45s ease-out forwards;
        }

        @keyframes op-ant-pulse {
          0%,100% { opacity: 0.9; r: 3; }
          50%      { opacity: 0.5; r: 4; }
        }
        .op-antenna-pulse {
          animation: op-ant-pulse 2.5s ease-in-out infinite;
        }

        .op-pupil, .op-pupil-shine {
          transition: cx 0.38s cubic-bezier(0.34,1.2,0.64,1),
                      cy 0.38s cubic-bezier(0.34,1.2,0.64,1);
        }
        .op-mouth-bar, .op-bar-fill, .op-bar-tip {
          transition: width 0.45s cubic-bezier(0.34,1.2,0.64,1);
        }
        .op-bar-tip {
          transition: x 0.45s cubic-bezier(0.34,1.2,0.64,1), width 0.45s ease;
        }
        .op-dot {
          transition: fill 0.3s ease;
        }

        .op-robot-shadow {
          width: 88px; height: 10px; border-radius: 50%;
          background: radial-gradient(ellipse,
            rgba(0,191,255,0.2) 0%, transparent 72%);
          margin: 4px auto 0;
          animation: op-shadow 4s cubic-bezier(0.37,0,0.63,1) infinite;
        }
        @keyframes op-shadow {
          0%,100% { transform: scaleX(1);   opacity: 0.8; }
          45%      { transform: scaleX(0.85); opacity: 0.55; }
        }

        /* ── Progress rail ───────────────────────────────────── */
        .op-rail {
          position: relative; z-index: 3;
          margin: 0 clamp(20px,5vw,64px);
          height: 1px;
          background: var(--border);
          overflow: visible;
        }
        .op-rail-fill {
          height: 1px;
          background: linear-gradient(90deg,#00bfff,#6ddcff);
          box-shadow: 0 0 8px rgba(0,191,255,0.5);
          transition: width 0.45s cubic-bezier(0.34,1.1,0.64,1);
        }
        .op-rail-orb {
          position: absolute;
          top: -3px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #00bfff;
          box-shadow: 0 0 12px rgba(0,191,255,0.8);
          transition: left 0.45s cubic-bezier(0.34,1.1,0.64,1);
          pointer-events: none;
        }

        /* ── Steps grid ──────────────────────────────────────── */
        .op-body {
          max-width: 1240px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,64px);
          position: relative; z-index: 3;
        }
        .op-steps-grid {
          display: grid;
          grid-template-columns: repeat(5,1fr);
          gap: 0;
          border: 1px solid var(--border);
          border-top: none;
        }
        @media (max-width: 900px) {
          .op-steps-grid { grid-template-columns: 1fr; }
          .op-step { border-right: none !important; border-bottom: 1px solid var(--border); }
          .op-step:last-child { border-bottom: none; }
        }

        .op-step {
          position: relative;
          padding: clamp(22px,2.8vw,34px) clamp(16px,2vw,24px);
          background: transparent;
          border-right: 1px solid var(--border);
          cursor: pointer;
          outline: none;
          overflow: hidden;
          transition:
            background  0.35s ease,
            box-shadow  0.35s ease,
            transform   0.35s cubic-bezier(0.34,1.2,0.64,1);
        }
        .op-step:last-child { border-right: none; }
        .op-step:hover { background: rgba(0,191,255,0.03); }
        .op-step:focus-visible { outline: 2px solid var(--blue); outline-offset: -2px; }

        .op-step.is-active {
          background: rgba(0,191,255,0.055);
          box-shadow: inset 0 0 40px rgba(0,191,255,0.05);
          z-index: 1;
        }

        .op-step::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%, #00bfff 40%, #6ddcff 60%, transparent 100%);
          box-shadow: 0 0 14px rgba(0,191,255,0.55);
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left center;
          transition:
            opacity 0.4s ease,
            transform 0.55s cubic-bezier(0.34,1.1,0.64,1);
        }
        .op-step.is-active::before {
          opacity: 1;
          transform: scaleX(1);
        }

        .op-step::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 60%;
          background: radial-gradient(ellipse at 50% 0%,
            rgba(0,191,255,0.08) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .op-step.is-active::after { opacity: 1; }

        .op-step-num {
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(0,191,255,0.35); font-weight: 600;
          margin-bottom: 14px;
          transition: color 0.3s ease;
        }
        .op-step.is-active .op-step-num { color: var(--blue); }

        .op-step-icon {
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid var(--border);
          background: var(--blue-dim);
          display: grid; place-items: center;
          margin-bottom: 16px;
          transition:
            border-color  0.35s ease,
            background    0.35s ease,
            box-shadow    0.35s ease;
        }
        .op-step.is-active .op-step-icon {
          border-color: rgba(0,191,255,0.45);
          background: rgba(0,191,255,0.12);
          box-shadow: 0 0 20px rgba(0,191,255,0.2);
        }

        .op-step-title {
          font-size: clamp(13px,1.35vw,15px);
          font-weight: 700; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 10px; line-height: 1.2;
          transition: color 0.3s ease;
        }

        .op-step-desc {
          font-size: 12px; line-height: 1.8; color: var(--muted);
          font-weight: 400; margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: -webkit-line-clamp 0.3s;
        }
        .op-step.is-active .op-step-desc {
          -webkit-line-clamp: unset;
          overflow: visible;
        }

        .op-duration {
          display: inline-flex; align-items: center;
          padding: 5px 12px; border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--blue-dim);
          color: rgba(255,255,255,0.45);
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          transition:
            border-color 0.35s ease, color 0.35s ease,
            background 0.35s ease, box-shadow 0.35s ease;
        }
        .op-step.is-active .op-duration {
          border-color: rgba(0,191,255,0.45);
          color: var(--blue);
          background: rgba(0,191,255,0.1);
          box-shadow: 0 0 12px rgba(0,191,255,0.18);
        }

        .op-deliverables {
          overflow: hidden;
          max-height: 0; opacity: 0;
          transition: max-height 0.42s ease, opacity 0.38s ease;
        }
        .op-step.is-active .op-deliverables,
        .op-step:hover .op-deliverables {
          max-height: 120px; opacity: 1;
        }
        @media (max-width: 900px) {
          .op-deliverables { max-height: 120px; opacity: 1; }
        }

        .op-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          margin-top: 14px;
        }
        .op-tag {
          font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(0,191,255,0.5);
          border: 1px solid rgba(0,191,255,0.16);
          background: rgba(0,191,255,0.04);
          padding: 4px 10px; border-radius: 4px; font-weight: 600;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
        }
        .op-step.is-active .op-tag {
          border-color: rgba(0,191,255,0.38);
          color: var(--blue);
          background: rgba(0,191,255,0.09);
        }
        .op-step.is-active .op-tag:nth-child(1) { animation: op-tag-in 0.3s 0.05s both ease-out; }
        .op-step.is-active .op-tag:nth-child(2) { animation: op-tag-in 0.3s 0.12s both ease-out; }
        .op-step.is-active .op-tag:nth-child(3) { animation: op-tag-in 0.3s 0.19s both ease-out; }
        @keyframes op-tag-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── CTA ─────────────────────────────────────────────── */
        .op-cta-wrap {
          border-top: 1px solid var(--border);
          padding: clamp(40px,5vw,72px) clamp(20px,5vw,64px);
          max-width: 1240px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 40px; flex-wrap: wrap;
          position: relative; z-index: 3;
        }
        .op-cta-label {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(0,191,255,0.56); font-weight: 600; margin-bottom: 10px;
        }
        .op-cta-heading {
          font-size: clamp(24px,3.5vw,48px);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.0;
        }
        .op-cta-heading em {
          font-style: normal;
          background: linear-gradient(110deg,#00bfff 0%,#6ddcff 45%,#0099cc 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .op-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 9px;
          background: var(--blue); color: #fff;
          text-decoration: none; font-size: 12px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          box-shadow: 0 0 28px rgba(0,191,255,0.3);
          transition: opacity 0.2s, box-shadow 0.25s;
          flex-shrink: 0;
        }
        .op-cta-btn:hover {
          opacity: 0.88;
          box-shadow: 0 0 44px rgba(0,191,255,0.48);
        }

        /* ── Reduced motion ──────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          /* Disable all animations */
          .op-robot-svg, .op-robot-shadow,
          .op-antenna-pulse, .op-robot-bounce { animation: none !important; }
          /* Disable all transitions */
          .op-step, .op-step::before, .op-step-icon,
          .op-duration, .op-rail-fill, .op-rail-orb,
          .op-pupil, .op-pupil-shine, .op-mouth-bar,
          .op-bar-fill, .op-bar-tip, .op-dot,
          .op-nav-dot, .op-deliverables, .op-tag,
          .op-robot-lean { transition: none !important; }
        }
      `}</style>

      <div className="op-bg-grid" aria-hidden />
      <div className="op-bg-vignette" aria-hidden />
      <div className="op-robot-glow" aria-hidden />

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="op-header">
        <div>
          <p className="op-eyebrow">How We Work</p>
          <h2 id="op-heading" className="op-heading">
            Our <em>Process</em>
          </h2>
        </div>
        <div className="op-header-right">
          <p className="op-header-desc">
            Five deliberate stages, each one accountable. A proven methodology built on transparency and craft.
          </p>
          <nav className="op-step-nav" aria-label="Process steps">
            {steps.map((s, i) => (
              <button
                key={i}
                className={`op-nav-dot${active === i ? " is-active" : ""}`}
                onClick={() => { stopDemo(); goToStep(i); }}
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-current={active === i ? "step" : undefined}
              />
            ))}
          </nav>
        </div>
      </header>

      {/* ── Robot ────────────────────────────────────────────── */}
      <div className="op-robot-stage" aria-hidden="true">
        {/*
          op-robot-lean  — outer wrapper, smooth CSS-transition rotation
                           pivoting from the feet toward the active step
          op-robot-bounce — inner wrapper, JS-triggered translateX+rotate
                            spring animation that fires on every step change
          op-robot-svg   — the SVG itself, keeps its own idle breath
        */}
        <div
          className="op-robot-lean"
          style={{ transform: `rotate(${LEAN_ANGLES[active]}deg)` }}
        >
          <div ref={robotBounceRef} className="op-robot-bounce">
            <Robot active={active} />
          </div>
        </div>
        <div className="op-robot-shadow" />
      </div>

      {/* ── Progress rail ────────────────────────────────────── */}
      <div
        className="op-rail"
        role="progressbar"
        aria-valuenow={active + 1}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label="Process progress"
      >
        <div
          className="op-rail-fill"
          style={{ width: `${((active + 1) / 5) * 100}%` }}
        />
        <div
          className="op-rail-orb"
          style={{ left: `calc(${((active + 1) / 5) * 100}% - 3.5px)` }}
        />
      </div>

      {/* ── Steps ────────────────────────────────────────────── */}
      <div className="op-body">
        <div className="op-steps-grid" role="list">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = active === idx;
            return (
              <article
                key={idx}
                id={`op-step-${idx + 1}`}
                className={`op-step${isActive ? " is-active" : ""}`}
                role="listitem"
                tabIndex={0}
                aria-label={`Step ${idx + 1}: ${step.title}`}
                onClick={() => { stopDemo(); goToStep(idx); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    stopDemo();
                    goToStep(idx);
                  }
                  if (e.key === "ArrowRight" && idx < 4) {
                    e.preventDefault();
                    stopDemo();
                    goToStep(idx + 1);
                    (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
                  }
                  if (e.key === "ArrowLeft" && idx > 0) {
                    e.preventDefault();
                    stopDemo();
                    goToStep(idx - 1);
                    (e.currentTarget.previousElementSibling as HTMLElement)?.focus();
                  }
                }}
              >
                <p className="op-step-num">{step.index}</p>

                <div className="op-step-icon">
                  <Icon
                    size={15}
                    color={isActive ? "#00bfff" : "rgba(0,191,255,0.38)"}
                    aria-hidden
                  />
                </div>

                <h3 className="op-step-title">{step.title}</h3>
                <p className="op-step-desc">{step.description}</p>

                <time className="op-duration" dateTime={step.duration}>
                  {step.duration}
                </time>

                <div className="op-deliverables">
                  <div className="op-tags">
                    {step.deliverables.map((d) => (
                      <span key={d} className="op-tag">{d}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <aside className="op-cta-wrap" aria-label="Call to action">
        <div>
          <p className="op-cta-label">Next Step</p>
          <p className="op-cta-heading">Ready to <em>Begin?</em></p>
        </div>
        <Link
          href="/contact"
          className="op-cta-btn"
          aria-label="Start your project with Viorix"
        >
          Start Your Project
          <ArrowUpRight size={14} aria-hidden />
        </Link>
      </aside>
    </section>
  );
}