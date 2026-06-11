"use client";

import React, { JSX, useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Calendar,
  Code2,
  CheckCircle,
  Package,
  ArrowUpRight,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    "aria-hidden"?: boolean;
  }>;
  duration: string;
  deliverables: string[];
  index: string;
};

const GAZE: { lx: number; ly: number; rx: number; ry: number }[] = [
  { lx: -2.8, ly: 1.2, rx: -2.8, ry: 1.2 },
  { lx: -1.2, ly: 0.4, rx: -1.2, ry: 0.4 },
  { lx: 0, ly: 0, rx: 0, ry: 0 },
  { lx: 1.2, ly: 0.4, rx: 1.2, ry: 0.4 },
  { lx: 2.8, ly: 1.2, rx: 2.8, ry: 1.2 },
];

function Robot({ active, size = 96 }: { active: number; size?: number }) {
  const g = GAZE[active] ?? GAZE[2];
  const barW = 10 + (active / 4) * 50;
  const h = Math.round(size * (148 / 110));

  return (
    <svg
      viewBox="0 0 110 148"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", width: size, height: h, overflow: "visible" }}
      className="op-robot-svg"
    >
      <line x1="55" y1="2" x2="55" y2="16" stroke="rgba(0,191,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="55" cy="2" r="4.5" fill="none" stroke="rgba(0,191,255,0.25)" strokeWidth="1" />
      <circle cx="55" cy="2" r="3" fill="#00bfff" opacity="0.9" className="op-antenna-pulse" />
      <circle cx="55" cy="2" r="1.5" fill="#6ddcff" />

      <rect x="16" y="16" width="78" height="54" rx="11" fill="#071525" stroke="rgba(0,191,255,0.28)" strokeWidth="1.2" />
      <rect x="16" y="16" width="78" height="6" rx="11" fill="rgba(0,191,255,0.07)" />
      <rect x="22" y="22" width="66" height="40" rx="7" fill="#040e1c" stroke="rgba(0,191,255,0.14)" strokeWidth="0.7" />

      <circle cx="39" cy="42" r="11" fill="#040e1c" stroke="rgba(0,191,255,0.18)" strokeWidth="0.8" />
      <circle cx="39" cy="42" r="8.8" fill="none" stroke="rgba(0,191,255,0.32)" strokeWidth="0.7" />
      <circle cx="39" cy="42" r="6.5" fill="rgba(0,191,255,0.14)" />
      <circle cx={39 + g.lx} cy={42 + g.ly} r="4.8" fill="#00bfff" opacity="0.92" className="op-pupil" />
      <circle cx={39 + g.lx * 0.6 + 1.4} cy={42 + g.ly * 0.6 - 1.4} r="1.6" fill="white" opacity="0.75" className="op-pupil-shine" />

      <circle cx="71" cy="42" r="11" fill="#040e1c" stroke="rgba(0,191,255,0.18)" strokeWidth="0.8" />
      <circle cx="71" cy="42" r="8.8" fill="none" stroke="rgba(0,191,255,0.32)" strokeWidth="0.7" />
      <circle cx="71" cy="42" r="6.5" fill="rgba(0,191,255,0.14)" />
      <circle cx={71 + g.rx} cy={42 + g.ry} r="4.8" fill="#00bfff" opacity="0.92" className="op-pupil" />
      <circle cx={71 + g.rx * 0.6 + 1.4} cy={42 + g.ry * 0.6 - 1.4} r="1.6" fill="white" opacity="0.75" className="op-pupil-shine" />

      <rect x="36" y="56" width="38" height="2.5" rx="1.25" fill="rgba(0,191,255,0.18)" />
      <rect x="36" y="56" width={barW} height="2.5" rx="1.25" fill="#00bfff" opacity="0.7" className="op-mouth-bar" />

      <rect x="44" y="70" width="22" height="7" rx="3" fill="#071525" stroke="rgba(0,191,255,0.18)" strokeWidth="0.7" />
      <line x1="49" y1="70" x2="49" y2="77" stroke="rgba(0,191,255,0.1)" strokeWidth="0.7" />
      <line x1="55" y1="70" x2="55" y2="77" stroke="rgba(0,191,255,0.1)" strokeWidth="0.7" />
      <line x1="61" y1="70" x2="61" y2="77" stroke="rgba(0,191,255,0.1)" strokeWidth="0.7" />

      <rect x="14" y="77" width="82" height="54" rx="9" fill="#071525" stroke="rgba(0,191,255,0.24)" strokeWidth="1.2" />
      <rect x="14" y="77" width="82" height="10" rx="9" fill="rgba(0,191,255,0.06)" />
      <rect x="22" y="83" width="66" height="40" rx="6" fill="#040e1c" stroke="rgba(0,191,255,0.12)" strokeWidth="0.7" />
      <line x1="22" y1="103" x2="88" y2="103" stroke="rgba(0,191,255,0.08)" strokeWidth="0.7" />

      {[34, 48, 62, 76].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy={94}
          r="3.5"
          fill={i < active + 1 ? "rgba(0,191,255,0.75)" : "rgba(0,191,255,0.1)"}
          stroke="rgba(0,191,255,0.3)"
          strokeWidth="0.5"
        />
      ))}

      <rect x="26" y="109" width="58" height="4" rx="2" fill="#040e1c" stroke="rgba(0,191,255,0.12)" strokeWidth="0.5" />
      <rect x="26" y="109" width={barW} height="4" rx="2" fill="#00bfff" opacity="0.75" />

      <circle cx="14" cy="84" r="5" fill="#071525" stroke="rgba(0,191,255,0.22)" strokeWidth="0.8" />
      <circle cx="96" cy="84" r="5" fill="#071525" stroke="rgba(0,191,255,0.22)" strokeWidth="0.8" />

      <circle cx="33" cy="131" r="5" fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.8" />
      <rect x="27" y="131" width="12" height="17" rx="6" fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.9" />
      <rect x="22" y="145" width="22" height="7" rx="3.5" fill="#060f1e" stroke="rgba(0,191,255,0.2)" strokeWidth="0.9" />
      <circle cx="77" cy="131" r="5" fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.8" />
      <rect x="71" y="131" width="12" height="17" rx="6" fill="#071525" stroke="rgba(0,191,255,0.2)" strokeWidth="0.9" />
      <rect x="66" y="145" width="22" height="7" rx="3.5" fill="#060f1e" stroke="rgba(0,191,255,0.2)" strokeWidth="0.9" />
    </svg>
  );
}

function ArmSVG({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 36 80"
      width="36"
      height="80"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)", display: "block" } : { display: "block" }}
    >
      <rect x="18" y="0" width="14" height="44" rx="7" fill="#071525" stroke="rgba(0,191,255,0.25)" strokeWidth="1.2" />
      <rect x="20" y="4" width="6" height="16" rx="3" fill="rgba(0,191,255,0.08)" />
      <circle cx="25" cy="44" r="7" fill="#071525" stroke="rgba(0,191,255,0.32)" strokeWidth="1.2" />
      <rect x="12" y="44" width="20" height="18" rx="6" fill="#071525" stroke="rgba(0,191,255,0.28)" strokeWidth="1.2" />
      <rect x="15" y="47" width="14" height="10" rx="3" fill="rgba(0,191,255,0.07)" />
      <rect x="3" y="44" width="11" height="6.5" rx="3.25" fill="#071525" stroke="rgba(0,191,255,0.25)" strokeWidth="1" />
      <rect x="2" y="52.5" width="11" height="6.5" rx="3.25" fill="#071525" stroke="rgba(0,191,255,0.25)" strokeWidth="1" />
      <rect x="3" y="61" width="10" height="6" rx="3" fill="#071525" stroke="rgba(0,191,255,0.22)" strokeWidth="1" />
      <line x1="5" y1="47.5" x2="10" y2="47.5" stroke="rgba(0,191,255,0.35)" strokeWidth="0.7" strokeLinecap="round" />
      <line x1="4" y1="56" x2="9" y2="56" stroke="rgba(0,191,255,0.35)" strokeWidth="0.7" strokeLinecap="round" />
      <line x1="5" y1="64.5" x2="9" y2="64.5" stroke="rgba(0,191,255,0.3)" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}

function RobotHoldLeft({
  active,
  engaged,
}: {
  active: number;
  engaged: boolean;
}) {
  return (
    <div className={`op-hold-root${engaged ? " is-engaged" : ""}`} aria-hidden="true">
      <div className="op-hold-arm op-hold-arm--front">
        <ArmSVG />
      </div>
      <div className="op-hold-bot">
        <Robot active={active} size={76} />
      </div>
      <div className="op-hold-arm op-hold-arm--back">
        <ArmSVG />
      </div>
    </div>
  );
}

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

export default function OurProcess(): JSX.Element {
  const steps = useSteps();
  const [hoveredStep, setHoveredStep] = useState<number>(-1);
  const [focusedStep, setFocusedStep] = useState<number>(-1);
  const [visible, setVisible] = useState<boolean>(false);
  const [activeMobileStep, setActiveMobileStep] = useState<number>(0);
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ─── Mobile active step via IntersectionObserver ───────────────────────────
  // Carve a ~2px horizontal band at exactly 50vh using rootMargin.
  // Whichever card's center crosses that band fires isIntersecting=true.
  // On resize/orientation-change we disconnect and recreate so the margins
  // stay accurate for the new viewport height.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    if (!mq.matches) return;

    let obs: IntersectionObserver | null = null;

    const connect = () => {
      obs?.disconnect();

      const vh = window.innerHeight;
      const half = Math.round(vh / 2);
      // rootMargin: top shrinks viewport to 1px above center; bottom shrinks to 1px below center
      const margin = `-${vh - half - 1}px 0px -${half - 1}px 0px`;

      obs = new IntersectionObserver(
        (entries) => {
          // Among all currently-intersecting entries pick the one whose
          // center is closest to the viewport midpoint (handles edge cases
          // where two cards straddle the band simultaneously).
          let bestIdx: number | null = null;
          let bestDist = Infinity;

          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            const rect = entry.boundingClientRect;
            const cardCenter = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenter - vh / 2);
            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = idx;
            }
          });

          if (bestIdx !== null) {
            setActiveMobileStep(bestIdx);
          }
        },
        { rootMargin: margin, threshold: 0 }
      );

      mobileRefs.current.forEach((el) => el && obs!.observe(el));
    };

    connect();

    // Recreate observer on resize so rootMargin stays correct after
    // orientation changes or browser chrome resizing on mobile.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(connect, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      obs?.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const activeDesktopStep = hoveredStep >= 0 ? hoveredStep : focusedStep;
  const railPct = activeDesktopStep >= 0 ? ((activeDesktopStep + 1) / 5) * 100 : 20;

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Our Process",
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          name: `${i + 1}. ${s.title}`,
          url: `#op-step-${i + 1}`,
        })),
      }),
    [steps]
  );

  return (
    <section className={`op-root${visible ? " op-visible" : ""}`} role="region" aria-labelledby="op-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        .op-root{--blue:#00bfff;--blue2:#0099cc;--blue-dim:rgba(0,191,255,0.06);--blue-mid:rgba(0,191,255,0.14);--blue-glow:rgba(0,191,255,0.32);--bg:#050a13;--surface:#071525;--border:rgba(0,191,255,0.16);--muted:rgba(255,255,255,0.55);--text:#fff;font-family:Inter,"DM Sans",system-ui,sans-serif;background:var(--bg);color:var(--text);position:relative;overflow:hidden;opacity:0;transition:opacity .55s ease;}
        .op-root *{box-sizing:border-box;margin:0;padding:0}.op-visible{opacity:1!important}
        .op-bg-grid{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(0,191,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,191,255,0.05) 1px,transparent 1px);background-size:48px 48px;opacity:.35}
        .op-bg-vignette{position:absolute;inset:0;pointer-events:none;z-index:1;background:radial-gradient(ellipse at 50% 0%,rgba(0,80,170,0.2) 0%,transparent 55%),radial-gradient(ellipse at 50% 100%,transparent 40%,rgba(4,8,16,0.65) 100%)}
        .op-header{max-width:1240px;margin:0 auto;padding:clamp(64px,9vw,112px) clamp(20px,5vw,64px) clamp(40px,5vw,64px);display:flex;align-items:flex-end;justify-content:space-between;gap:32px;border-bottom:1px solid var(--border);position:relative;z-index:3}
        @media(max-width:600px){.op-header{flex-direction:column;align-items:flex-start}.op-header-desc{text-align:left;max-width:100%}}
        .op-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);font-weight:600;margin-bottom:14px}
        .op-heading{font-size:clamp(36px,5.5vw,72px);font-weight:800;line-height:.94;letter-spacing:-.03em}
        .op-heading em{font-style:normal;background:linear-gradient(110deg,#00bfff 0%,#6ddcff 45%,#0099cc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .op-header-desc{font-size:14px;line-height:1.75;color:var(--muted);max-width:38ch;font-weight:400;text-align:right}
        .op-rail{position:relative;z-index:3;margin:0 clamp(20px,5vw,64px);height:1px;background:var(--border);overflow:visible}
        .op-rail-fill{height:1px;background:linear-gradient(90deg,#00bfff,#6ddcff);box-shadow:0 0 8px rgba(0,191,255,0.5);transition:width .45s cubic-bezier(.34,1.1,.64,1)}
        .op-rail-orb{position:absolute;top:-3px;width:7px;height:7px;border-radius:50%;background:#00bfff;box-shadow:0 0 12px rgba(0,191,255,0.8);transition:left .45s cubic-bezier(.34,1.1,.64,1);pointer-events:none}
        .op-body{max-width:1240px;margin:0 auto;padding:0 clamp(20px,5vw,64px);position:relative;z-index:3}
        .op-steps-grid{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--border);border-top:none}
        @media(min-width:901px){.op-mobile-cards{display:none}}
        @media(max-width:900px){.op-steps-grid{display:none}.op-mobile-cards{display:flex;flex-direction:column;gap:48px;padding:28px clamp(16px,5vw,32px) 80px;position:relative;z-index:3}}

        .op-mobile-item{
          position:relative;
          margin:0 18px 0 70px;
          scroll-margin-top:28vh;
        }

        .op-hold-root{
          position:absolute;
          left:-82px;
          top:50%;
          width:120px;
          height:190px;
          transform:translateY(-50%);
          pointer-events:none;
          z-index:2;
          opacity:0;
        }
        .op-hold-root.is-engaged{opacity:1}

        .op-hold-bot{
          position:absolute;
          left:8px;
          bottom:0;
          transform:translateX(-26px) translateY(8px) scale(.92);
          opacity:0;
          filter:drop-shadow(0 0 18px rgba(0,191,255,0.35));
        }
        .op-hold-root.is-engaged .op-hold-bot{
          animation:op-bot-enter .62s cubic-bezier(.22,.9,.2,1) forwards,
                    op-bot-bob 3.2s .62s ease-in-out infinite;
        }

        .op-hold-arm{
          position:absolute;
          left:72px;
          top:72px;
          transform-origin:85% 14%;
          opacity:0;
        }

        .op-hold-arm--front{
          z-index:5;
          transform:translateX(-22px) rotate(-28deg);
        }
        .op-hold-root.is-engaged .op-hold-arm--front{
          animation:op-arm-front-enter .55s .12s cubic-bezier(.22,.9,.2,1) forwards,
                    op-arm-front-grip 2.6s .8s ease-in-out infinite;
        }

        .op-hold-arm--back{
          z-index:1;
          transform:translateX(-20px) rotate(-40deg) scale(.98);
          opacity:.5;
          filter:brightness(.9);
        }
        .op-hold-root.is-engaged .op-hold-arm--back{
          animation:op-arm-back-enter .55s .08s cubic-bezier(.22,.9,.2,1) forwards,
                    op-arm-back-grip 2.6s .85s ease-in-out infinite;
        }

        @keyframes op-bot-enter{
          from{opacity:0;transform:translateX(-26px) translateY(8px) scale(.92)}
          to{opacity:1;transform:translateX(0) translateY(0) scale(1)}
        }
        @keyframes op-bot-bob{
          0%,100%{transform:translateX(0) translateY(0) scale(1)}
          50%{transform:translateX(0) translateY(-4px) scale(1)}
        }
        @keyframes op-arm-front-enter{
          from{opacity:0;transform:translateX(-22px) rotate(-28deg)}
          to{opacity:1;transform:translateX(0) rotate(-6deg)}
        }
        @keyframes op-arm-front-grip{
          0%,100%{transform:translateX(0) rotate(-6deg)}
          50%{transform:translateX(2px) rotate(-8deg)}
        }
        @keyframes op-arm-back-enter{
          from{opacity:0;transform:translateX(-20px) rotate(-40deg) scale(.98)}
          to{opacity:.78;transform:translateX(-2px) rotate(-14deg) scale(.98)}
        }
        @keyframes op-arm-back-grip{
          0%,100%{transform:translateX(-2px) rotate(-14deg) scale(.98)}
          50%{transform:translateX(0) rotate(-16deg) scale(.98)}
        }

        .op-mobile-card{
          position:relative;
          z-index:3;
          background:#071525;
          border:1px solid rgba(0,191,255,0.22);
          border-radius:16px;
          padding:clamp(20px,5vw,28px);
          box-shadow:0 0 0 1px rgba(0,191,255,0.08),0 8px 32px rgba(0,0,0,0.45),0 0 40px rgba(0,191,255,0.06);
          transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease;
          transform:translateX(0);
        }
        .op-mobile-card.is-engaged{
          transform:translateX(6px) translateY(-3px);
          border-color:rgba(0,191,255,0.42);
          box-shadow:0 0 0 1px rgba(0,191,255,0.16),0 16px 40px rgba(0,0,0,0.55),0 0 60px rgba(0,191,255,0.12);
        }
        .op-mobile-card::before{
          content:'';position:absolute;top:0;left:10%;right:10%;height:1.5px;border-radius:2px;
          background:linear-gradient(90deg,transparent,#00bfff 40%,#6ddcff 60%,transparent);
          box-shadow:0 0 14px rgba(0,191,255,0.5)
        }

        .op-step{position:relative;padding:clamp(22px,2.8vw,34px) clamp(16px,2vw,24px);background:transparent;border-right:1px solid var(--border);cursor:pointer;outline:none;overflow:visible;transition:background .35s ease;transform-style:preserve-3d;perspective:800px}
        .op-step:last-child{border-right:none}
        .op-step:focus-visible{outline:2px solid var(--blue);outline-offset:-2px}
        .op-step:hover,.op-step.is-engaged{background:rgba(0,191,255,0.04)}
        .op-step::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent 0%,#00bfff 40%,#6ddcff 60%,transparent 100%);box-shadow:0 0 14px rgba(0,191,255,0.55);opacity:0;transform:scaleX(0);transform-origin:left center;transition:opacity .4s ease,transform .55s cubic-bezier(.34,1.1,.64,1);z-index:2}
        .op-step:hover::before,.op-step.is-engaged::before{opacity:1;transform:scaleX(1)}
        .op-step-inner{position:relative;z-index:2;transition:transform .45s cubic-bezier(.34,1.2,.64,1);transform-origin:50% 100%}
        .op-step:hover .op-step-inner,.op-step.is-engaged .op-step-inner{transform:perspective(600px) rotateX(-6deg) translateY(-4px)}
        .op-robot-peek{position:absolute;bottom:100%;left:50%;transform:translateX(-50%) translateY(72px) scale(.7);transform-origin:50% 100%;opacity:0;pointer-events:none;z-index:1;transition:transform .52s cubic-bezier(.34,1.56,.64,1),opacity .35s ease;filter:drop-shadow(0 -6px 20px rgba(0,191,255,0.38));margin-bottom:-6px}
        .op-step:hover .op-robot-peek,.op-step.is-engaged .op-robot-peek{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
        .op-step-num{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(0,191,255,0.35);font-weight:600;margin-bottom:14px;transition:color .3s}
        .op-step-icon{width:36px;height:36px;border-radius:9px;border:1px solid var(--border);background:var(--blue-dim);display:grid;place-items:center;margin-bottom:16px;transition:border-color .35s,background .35s,box-shadow .35s}
        .op-step-title{font-size:clamp(13px,1.35vw,15px);font-weight:700;letter-spacing:-.02em;color:#fff;margin-bottom:10px;line-height:1.2}
        .op-step-desc{font-size:12px;line-height:1.8;color:var(--muted);font-weight:400;margin-bottom:16px}
        .op-duration{display:inline-flex;align-items:center;padding:5px 12px;border-radius:999px;border:1px solid var(--border);background:var(--blue-dim);color:rgba(255,255,255,0.45);font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;transition:border-color .35s,color .35s,background .35s,box-shadow .35s}
        .op-tags{display:flex;flex-wrap:wrap;gap:6px;padding-top:14px;border-top:1px solid var(--border);margin-top:14px}
        .op-tag{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(0,191,255,0.5);border:1px solid rgba(0,191,255,0.16);background:rgba(0,191,255,0.04);padding:4px 10px;border-radius:4px;font-weight:600}
        .op-step:hover .op-step-num,.op-step.is-engaged .op-step-num{color:var(--blue)}
        .op-step:hover .op-step-icon,.op-step.is-engaged .op-step-icon{border-color:rgba(0,191,255,0.45);background:rgba(0,191,255,0.12);box-shadow:0 0 20px rgba(0,191,255,0.2)}
        .op-step:hover .op-duration,.op-step.is-engaged .op-duration{border-color:rgba(0,191,255,0.45);color:var(--blue);background:rgba(0,191,255,0.1);box-shadow:0 0 12px rgba(0,191,255,0.18)}
        .op-step:hover .op-tag,.op-step.is-engaged .op-tag{border-color:rgba(0,191,255,0.38);color:var(--blue);background:rgba(0,191,255,0.09)}
        .op-mobile-card .op-step-icon{border-color:rgba(0,191,255,0.38);background:rgba(0,191,255,0.1);box-shadow:0 0 16px rgba(0,191,255,0.16)}
        .op-mobile-card .op-step-num{color:var(--blue)}
        .op-mobile-card .op-duration{border-color:rgba(0,191,255,0.38);color:var(--blue);background:rgba(0,191,255,0.1)}
        .op-mobile-card .op-tag{border-color:rgba(0,191,255,0.32);color:var(--blue);background:rgba(0,191,255,0.08)}

        @keyframes op-breath{0%,100%{transform:translateY(0) scaleY(1)}45%{transform:translateY(-3px) scaleY(1.01)}}
        .op-robot-svg{animation:op-breath 3.5s cubic-bezier(.37,0,.63,1) infinite;transform-origin:50% 95%}
        @keyframes op-ant-pulse{0%,100%{opacity:.9;r:3}50%{opacity:.5;r:4}}
        .op-antenna-pulse{animation:op-ant-pulse 2.5s ease-in-out infinite}
        .op-pupil,.op-pupil-shine{transition:cx .38s cubic-bezier(.34,1.2,.64,1),cy .38s}
        .op-mouth-bar{transition:width .45s cubic-bezier(.34,1.2,.64,1)}

        .op-cta-wrap{border-top:1px solid var(--border);padding:clamp(40px,5vw,72px) clamp(20px,5vw,64px);max-width:1240px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap;position:relative;z-index:3}
        @media(max-width:600px){.op-cta-wrap{flex-direction:column;align-items:flex-start;gap:24px}}
        .op-cta-label{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(0,191,255,0.56);font-weight:600;margin-bottom:10px}
        .op-cta-heading{font-size:clamp(24px,3.5vw,48px);font-weight:800;letter-spacing:-.03em;line-height:1}
        .op-cta-heading em{font-style:normal;background:linear-gradient(110deg,#00bfff 0%,#6ddcff 45%,#0099cc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .op-cta-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:9px;background:var(--blue);color:#fff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 0 28px rgba(0,191,255,0.3);transition:opacity .2s,box-shadow .25s;flex-shrink:0;white-space:nowrap}
        .op-cta-btn:hover{opacity:.88;box-shadow:0 0 44px rgba(0,191,255,0.48)}

        @media(prefers-reduced-motion:reduce){
          .op-robot-svg,.op-antenna-pulse{animation:none!important}
          .op-step-inner,.op-robot-peek,.op-step::before,.op-step-icon,.op-duration,.op-rail-fill,.op-rail-orb,.op-pupil,.op-pupil-shine,.op-mouth-bar,.op-tag,.op-mobile-card,.op-hold-root,.op-hold-bot,.op-hold-arm{transition:none!important;animation:none!important}
        }
      `}</style>

      <div className="op-bg-grid" aria-hidden />
      <div className="op-bg-vignette" aria-hidden />

      <header className="op-header">
        <div>
          <p className="op-eyebrow">How We Work</p>
          <h2 id="op-heading" className="op-heading">
            Our <em>Process</em>
          </h2>
        </div>
        <p className="op-header-desc">
          Five deliberate stages, each one accountable. A proven methodology built on transparency and craft.
        </p>
      </header>

      <div
        className="op-rail"
        role="progressbar"
        aria-valuenow={activeDesktopStep >= 0 ? activeDesktopStep + 1 : 1}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label="Process progress"
      >
        <div className="op-rail-fill" style={{ width: `${railPct}%` }} />
        <div className="op-rail-orb" style={{ left: `calc(${railPct}% - 3.5px)` }} />
      </div>

      <div className="op-body">
        <div className="op-steps-grid" role="list">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const engaged = activeDesktopStep === idx;

            return (
              <article
                key={idx}
                id={`op-step-${idx + 1}`}
                className={`op-step${engaged ? " is-engaged" : ""}`}
                role="listitem"
                tabIndex={0}
                aria-label={`Step ${idx + 1}: ${step.title}`}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(-1)}
                onFocus={() => setFocusedStep(idx)}
                onBlur={() => setFocusedStep(-1)}
              >
                <div className="op-robot-peek" aria-hidden="true">
                  <Robot active={idx} />
                </div>
                <div className="op-step-inner">
                  <p className="op-step-num">{step.index}</p>
                  <div className="op-step-icon">
                    <Icon size={15} color="rgba(0,191,255,0.38)" aria-hidden />
                  </div>
                  <h3 className="op-step-title">{step.title}</h3>
                  <p className="op-step-desc">{step.description}</p>
                  <time className="op-duration" dateTime={step.duration}>
                    {step.duration}
                  </time>
                  <div className="op-tags">
                    {step.deliverables.map((d) => (
                      <span key={d} className="op-tag">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="op-mobile-cards" role="list">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const engaged = activeMobileStep === idx;

          return (
            <div
              key={idx}
              id={`op-step-m-${idx + 1}`}
              className="op-mobile-item"
              role="listitem"
              data-idx={idx}
              ref={(el) => {
                mobileRefs.current[idx] = el;
              }}
            >
              <RobotHoldLeft active={idx} engaged={engaged} />

              <article
                className={`op-mobile-card${engaged ? " is-engaged" : ""}`}
                aria-label={`Step ${idx + 1}: ${step.title}`}
              >
                <p className="op-step-num">{step.index}</p>
                <div className="op-step-icon">
                  <Icon size={15} color="rgba(0,191,255,0.38)" aria-hidden />
                </div>
                <h3 className="op-step-title">{step.title}</h3>
                <p className="op-step-desc">{step.description}</p>
                <time className="op-duration" dateTime={step.duration}>
                  {step.duration}
                </time>
                <div className="op-tags">
                  {step.deliverables.map((d) => (
                    <span key={d} className="op-tag">
                      {d}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <aside className="op-cta-wrap" aria-label="Call to action">
        <div>
          <p className="op-cta-label">Next Step</p>
          <p className="op-cta-heading">
            Ready to <em>Begin?</em>
          </p>
        </div>
        <Link href="/contact" className="op-cta-btn" aria-label="Start your project">
          Start Your Project
          <ArrowUpRight size={14} aria-hidden />
        </Link>
      </aside>
    </section>
  );
}