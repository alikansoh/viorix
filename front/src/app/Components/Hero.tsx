"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Smartphone,
  TrendingUp,
  Zap,
  Briefcase,
  Award,
  Headphones,
  Star,
} from "lucide-react";

const TypeAnimation = dynamic(
  () => import("react-type-animation").then((m) => m.TypeAnimation),
  { ssr: false }
);

function AnimatedNumber({
  target,
  suffix = "",
  duration = 1.6,
  run = false,
  ariaLabel,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  run?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!run || !ref.current) return;
    let mounted = true;

    import("gsap").then(({ gsap }) => {
      if (!mounted || !ref.current) return;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${Math.floor(obj.value)}${suffix}`;
        },
        onComplete: () => {
          if (ref.current) ref.current.textContent = `${target}${suffix}`;
        },
      });
    });

    return () => {
      mounted = false;
    };
  }, [run, target, suffix, duration]);

  return (
    <span ref={ref} aria-label={ariaLabel}>
      0{suffix}
    </span>
  );
}

function Laptop({
  sceneRef,
  lidRef,
}: {
  sceneRef: React.RefObject<HTMLDivElement>;
  lidRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div ref={sceneRef} className="vx-laptop-scene" aria-hidden>
      <div ref={lidRef} className="vx-lid">
        <div className="vx-lid-front">
          <div className="vx-bezel">
            <div className="vx-screen-wrap">
              <div className="vx-reflection-sweep" />
              <div className="vx-scanlines" />
              <div className="vx-screen-bg" />

              <div className="vx-browser-bar">
                <span />
                <span />
                <span />
                <div className="vx-url">viorix.co.uk</div>
              </div>

              <div className="vx-screen-content">
                <div className="vx-lines">
                  <i />
                  <i />
                  <i />
                </div>

                <div className="vx-buttons">
                  <i />
                  <i />
                </div>

                <div className="vx-cards">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                      <i />
                      <i />
                    </div>
                  ))}
                </div>

                <div className="vx-cursor" />
              </div>

              <div className="vx-screen-bloom" />
            </div>

            <div className="vx-camera" />
          </div>
        </div>

        <div className="vx-lid-back" />
        <div className="vx-lid-edge-left" />
        <div className="vx-lid-edge-right" />
      </div>

      <div className="vx-base">
        <div className="vx-base-top">
          <div className="vx-keys">
            {Array.from({ length: 4 }).map((_, r) => (
              <div className={`vx-key-row vx-key-row-${r + 1}`} key={r}>
                {Array.from({ length: 12 - r }).map((__, k) => (
                  <i key={k} />
                ))}
              </div>
            ))}
          </div>
          <div className="vx-trackpad" />
        </div>
        <div className="vx-base-front" />
      </div>

      <div className="vx-shadow" />
      <div className="vx-screen-aura" />
    </div>
  );
}

export default function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  const [statsRun, setStatsRun] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const features = useMemo(
    () => [
      { icon: Code2, text: "Custom Dev" },
      { icon: Smartphone, text: "Mobile-First" },
      { icon: TrendingUp, text: "SEO Optimized" },
      { icon: Zap, text: "Ultra Fast" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { icon: Briefcase, target: 50, suffix: "+", label: "Projects", sub: "Completed", aria: "50 plus projects" },
      { icon: Award, target: 99, suffix: "%", label: "Success", sub: "Delivery Rate", aria: "99 percent success rate" },
      { icon: Headphones, target: 24, suffix: "/7", label: "Support", sub: "Always On", aria: "24 7 support" },
      { icon: null, target: 5, suffix: ".0", label: "Rating", sub: "Client Reviews", aria: "5.0 rating" },
    ],
    []
  );

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 980px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setIsMobile(mobileMq.matches);
      setReducedMotion(motionMq.matches);
    };

    update();
    mobileMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);

    return () => {
      mobileMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    let dead = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (dead) return;

      gsap.registerPlugin(ScrollTrigger);

      // ── Entry animation ──────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".h-eyebrow", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(".h-line1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
        .fromTo(".h-line2", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.18)
        .fromTo(".h-line3", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.26)
        .fromTo(".h-desc", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.34)
        .fromTo(".h-pill", { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4 }, 0.42)
        .fromTo(".h-cta", { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.45 }, 0.5)
        .fromTo(rightRef.current, { x: 64, opacity: 0 }, { x: 0, opacity: 1, duration: 0.95 }, 0.12);

      // ── Laptop lid open animation ─────────────────────────────────────────
      // Start closed (-5deg = almost shut from the top), animate to open (-20deg faces user)
      if (!reducedMotion) {
        gsap.set(lidRef.current, { rotateX: -5 });

        gsap.to(lidRef.current, {
          rotateX: -20,           // open angle — screen faces viewer
          duration: 1.6,
          delay: 0.4,
          ease: "power3.inOut",
        });

        gsap.fromTo(
          ".vx-screen-aura",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1.05, duration: 1.2, delay: 0.7, ease: "power2.out" }
        );

        gsap.fromTo(
          ".vx-reflection-sweep",
          { xPercent: -130, opacity: 0 },
          {
            xPercent: 170,
            opacity: 0.65,
            duration: 2.1,
            delay: 2.0,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 2.2,
          }
        );
      } else {
        // Reduced motion: just show it open immediately
        gsap.set(lidRef.current, { rotateX: -20 });
      }

      // ── Scroll-reveal for [data-reveal] elements ─────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.03,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // ── Stats counter trigger ─────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 84%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ".h-stat-card",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" }
          );
          setStatsRun(true);
        },
      });

      // ── Mouse-parallax (desktop only) ────────────────────────────────────
      if (!isMobile && !reducedMotion && wrapRef.current && sceneRef.current && leftRef.current && lidRef.current) {
        const qSceneRx = gsap.quickTo(sceneRef.current, "rotateX", { duration: 0.35, ease: "power2.out" });
        const qSceneRy = gsap.quickTo(sceneRef.current, "rotateY", { duration: 0.35, ease: "power2.out" });
        const qSceneX  = gsap.quickTo(sceneRef.current, "x", { duration: 0.35, ease: "power2.out" });
        const qSceneY  = gsap.quickTo(sceneRef.current, "y", { duration: 0.35, ease: "power2.out" });

        // Lid nudges slightly around its open position
        const qLidRx   = gsap.quickTo(lidRef.current, "rotateX", { duration: 0.35, ease: "power2.out" });

        const qLeftX   = gsap.quickTo(leftRef.current, "x", { duration: 0.45, ease: "power2.out" });
        const qLeftY   = gsap.quickTo(leftRef.current, "y", { duration: 0.45, ease: "power2.out" });

        const onMove = (e: MouseEvent) => {
          const rect = wrapRef.current!.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
          const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;

          qSceneRx(-ny * 8);
          qSceneRy(nx * 12);
          qSceneX(nx * 10);
          qSceneY(ny * 6);

          // Lid stays near its open angle but shifts ±1.5deg with cursor
          qLidRx(-20 + ny * 1.5);

          qLeftX(-nx * 5);
          qLeftY(-ny * 3);
        };

        const onLeave = () => {
          qSceneRx(0);
          qSceneRy(0);
          qSceneX(0);
          qSceneY(0);
          qLidRx(-20);
          qLeftX(0);
          qLeftY(0);
        };

        wrapRef.current.addEventListener("mousemove", onMove);
        wrapRef.current.addEventListener("mouseleave", onLeave);

        cleanup = () => {
          wrapRef.current?.removeEventListener("mousemove", onMove);
          wrapRef.current?.removeEventListener("mouseleave", onLeave);
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      } else {
        cleanup = () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      }
    })();

    return () => {
      dead = true;
      cleanup?.();
    };
  }, [isMobile, reducedMotion]);

  return (
    <>
      <style>{`
        .vx-hero {
          --blue: #00bfff;
          --blue2: #0099cc;
          --bg: #050a13;
          --border: rgba(0,191,255,0.16);
          --glass: rgba(0,191,255,0.05);
          --muted: rgba(255,255,255,0.6);
          font-family: Inter, "DM Sans", system-ui, -apple-system, sans-serif;
          background: var(--bg);
          color: #fff;
          position: relative;
          min-height: 100vh;
          overflow: clip;
          perspective: 1200px;
        }
        .vx-hero * { box-sizing: border-box; }

        .vx-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          opacity: 0.35;
        }

        .vx-bg-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 70% 30%, rgba(0,80,170,0.22) 0%, transparent 58%),
            radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,8,16,0.7) 100%);
        }

        .vx-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 24px 20px 32px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .vx-main-row {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(20px, 4vw, 56px);
          align-items: center;
        }

        .h-eyebrow {
          margin: 0 0 14px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--blue);
          font-weight: 600;
        }

        .h-line1 {
          display: block;
          font-size: clamp(32px, 5.4vw, 80px);
          line-height: 0.95;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .h-line2 {
          display: block;
          min-height: 1.05em;
          font-size: clamp(30px, 5vw, 78px);
          line-height: 0.95;
          font-weight: 800;
          letter-spacing: -0.03em;
          background: linear-gradient(110deg,#00bfff 0%,#6ddcff 45%,#0099cc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .h-line3 {
          display: block;
          margin-top: 4px;
          font-size: clamp(21px, 3vw, 48px);
          line-height: 1.06;
          font-weight: 500;
          color: rgba(255,255,255,0.32);
        }

        .h-desc {
          margin: 18px 0 20px;
          max-width: 56ch;
          line-height: 1.7;
          font-size: 15px;
          color: var(--muted);
        }

        .h-feature-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
        }

        .h-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--glass);
          color: rgba(255,255,255,0.72);
          font-size: 12px;
          font-weight: 600;
          transition: transform .18s ease, border-color .18s ease, background .18s ease;
        }
        .h-pill:hover {
          transform: translateY(-1px);
          border-color: rgba(0,191,255,0.5);
          background: rgba(0,191,255,0.1);
        }

        .h-cta-row { display: flex; flex-wrap: wrap; gap: 10px; }

        .h-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 9px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 12px;
          font-weight: 700;
        }
        .h-cta-primary {
          background: var(--blue);
          color: #fff;
          box-shadow: 0 0 28px rgba(0,191,255,0.3);
        }
        .h-cta-ghost {
          border: 1px solid var(--border);
          color: rgba(255,255,255,0.7);
        }

        /* ── Laptop scene ──────────────────────────────────────────────────── */
        .vx-right-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .vx-laptop-scene {
          width: clamp(300px, 44vw, 460px);
          aspect-ratio: 460 / 360;
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Lid: pivot at its bottom edge. rotateX(-20deg) = open, facing viewer */
        .vx-lid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 80%;
          transform-style: preserve-3d;
          transform-origin: 50% 100%;
          /* default set by GSAP — start closed, open via animation */
          transform: rotateX(-5deg);
          will-change: transform;
        }

        .vx-lid-front {
          position: absolute;
          inset: 0;
          border-radius: 14px 14px 2px 2px;
          background: linear-gradient(160deg, #172842 0%, #0a1526 100%);
          border: 1.5px solid rgba(0, 191, 255, 0.22);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.09),
            0 0 60px rgba(0,191,255,0.18),
            0 0 120px rgba(0,120,255,0.08);
          overflow: hidden;
        }

        .vx-lid-back {
          position: absolute;
          inset: 0;
          transform: translateZ(-10px);
          border-radius: 14px 14px 2px 2px;
          background: linear-gradient(160deg,#0d1a2e,#080f1e);
          border: 1px solid rgba(0,60,120,0.44);
        }

        .vx-lid-edge-left,
        .vx-lid-edge-right {
          position: absolute;
          top: 0;
          width: 10px;
          height: 100%;
          background: #0a1525;
        }
        .vx-lid-edge-left {
          left: 0;
          transform: rotateY(90deg);
          transform-origin: left center;
        }
        .vx-lid-edge-right {
          right: 0;
          transform: rotateY(-90deg);
          transform-origin: right center;
        }

        .vx-screen-wrap {
          position: absolute;
          top: 8px;
          left: 10px;
          right: 10px;
          bottom: 6px;
          border-radius: 8px;
          overflow: hidden;
          background: #03080f;
        }

        .vx-screen-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 35% 45%, rgba(0,90,220,0.34) 0%, #040c1a 65%);
        }

        .vx-scanlines {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.14) 2px, rgba(0,0,0,0.14) 3px);
        }

        .vx-browser-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 22px;
          background: rgba(255,255,255,0.035);
          border-bottom: 1px solid rgba(0,191,255,0.09);
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 5px;
          z-index: 8;
        }
        .vx-browser-bar > span { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
        .vx-browser-bar > span:nth-child(1){ background:#ff5f57; }
        .vx-browser-bar > span:nth-child(2){ background:#febc2e; }
        .vx-browser-bar > span:nth-child(3){ background:#28c840; }

        .vx-url {
          margin-left: 8px;
          flex: 1;
          height: 12px;
          border-radius: 3px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 7px;
          letter-spacing: .08em;
          color: rgba(255,255,255,0.35);
        }

        .vx-screen-content {
          position: absolute;
          top: 28px;
          left: 10px;
          right: 10px;
          bottom: 8px;
          z-index: 7;
        }

        .vx-lines { display: grid; gap: 4px; margin-bottom: 8px; }
        .vx-lines i:nth-child(1){ width:58%; height:7px; border-radius:2px; background: rgba(0,191,255,.58); display:block; }
        .vx-lines i:nth-child(2){ width:42%; height:4px; border-radius:2px; background: rgba(0,191,255,.3); display:block; }
        .vx-lines i:nth-child(3){ width:50%; height:4px; border-radius:2px; background: rgba(255,255,255,.08); display:block; }

        .vx-buttons { display: flex; gap: 5px; margin-bottom: 10px; }
        .vx-buttons i:nth-child(1){ width:50px; height:12px; border-radius:2px; background: rgba(0,191,255,.6); display:block; }
        .vx-buttons i:nth-child(2){ width:38px; height:12px; border-radius:2px; border:1px solid rgba(0,191,255,.36); display:block; }

        .vx-cards { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 4px; }
        .vx-cards > div {
          height: 36px;
          border-radius: 3px;
          background: rgba(0,50,110,.22);
          border: 1px solid rgba(0,191,255,.2);
          padding: 4px;
        }
        .vx-cards > div i { display: block; }
        .vx-cards > div i:nth-child(1){
          height: 3px; width: 55%; border-radius: 1px;
          background: rgba(0,191,255,.58); margin-bottom: 3px;
        }
        .vx-cards > div i:nth-child(2){
          height: 2.5px; width: 75%; border-radius: 1px;
          background: rgba(255,255,255,.13);
        }

        .vx-cursor {
          position: absolute;
          right: 14px;
          bottom: 8px;
          width: 2px;
          height: 12px;
          border-radius: 1px;
          background: #00bfff;
          box-shadow: 0 0 8px #00bfff;
          animation: vx-blink 1s steps(1) infinite;
        }

        @keyframes vx-blink {
          0%, 48% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .vx-screen-bloom {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(180deg, rgba(0,191,255,.07) 0%, transparent 100%);
          pointer-events: none;
          z-index: 9;
        }

        .vx-camera {
          position: absolute;
          top: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0d1e30;
          border: 1px solid rgba(0,191,255,0.3);
        }

        .vx-base {
          position: absolute;
          top: calc(80% + 4px);
          left: 0;
          width: 100%;
          height: 20%;
          transform-style: preserve-3d;
          transform-origin: 50% 0;
          transform: rotateX(12deg);
        }

        .vx-base-top {
          position: absolute;
          inset: 0;
          border-radius: 2px 2px 12px 12px;
          background: linear-gradient(180deg,#111d35 0%,#0b1525 100%);
          border: 1.5px solid rgba(0,191,255,0.16);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          overflow: hidden;
        }

        .vx-keys { position: absolute; top: 8px; left: 12px; right: 12px; }
        .vx-key-row { display: grid; gap: 2px; margin-bottom: 3px; }
        .vx-key-row-1 { grid-template-columns: repeat(12, 1fr); }
        .vx-key-row-2 { grid-template-columns: repeat(11, 1fr); margin-left: 2%; margin-right: 2%; }
        .vx-key-row-3 { grid-template-columns: repeat(10, 1fr); margin-left: 4%; margin-right: 4%; }
        .vx-key-row-4 { grid-template-columns: repeat(9, 1fr); margin-left: 7%; margin-right: 7%; }

        .vx-key-row i {
          height: 7px;
          border-radius: 1.5px;
          background: rgba(0,191,255,0.06);
          border: 1px solid rgba(0,191,255,0.12);
          box-shadow: 0 1px 0 rgba(0,0,0,0.5);
          display: block;
        }

        .vx-trackpad {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 26px;
          border-radius: 5px;
          background: rgba(0,191,255,0.04);
          border: 1px solid rgba(0,191,255,0.1);
        }

        .vx-base-front {
          position: absolute;
          left: 0; right: 0; bottom: -8px;
          height: 8px;
          border-radius: 0 0 14px 14px;
          background: linear-gradient(180deg,#0c1828,#070f1a);
          transform: rotateX(-90deg);
          transform-origin: top center;
        }

        .vx-shadow {
          position: absolute;
          bottom: -16%;
          left: 50%;
          transform: translateX(-50%);
          width: 84%;
          height: 20px;
          background: radial-gradient(ellipse,rgba(0,0,0,0.72) 0%,transparent 70%);
          filter: blur(10px);
        }

        .vx-screen-aura {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 110%;
          height: 70%;
          background: radial-gradient(ellipse at 50% 40%,rgba(0,191,255,0.22) 0%,transparent 65%);
          filter: blur(22px);
          pointer-events: none;
          z-index: -1;
          opacity: 0;
        }

        .vx-reflection-sweep {
          position: absolute;
          top: -40%;
          left: -35%;
          width: 45%;
          height: 180%;
          transform: skewX(-18deg);
          background: linear-gradient(90deg, transparent 0%, rgba(130,220,255,0.15) 45%, transparent 100%);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        /* ── Floating cards ─────────────────────────────────────────────────── */
        .h-fc {
          position: absolute;
          z-index: 4;
          border: 1px solid rgba(0,191,255,0.24);
          background: rgba(7,12,24,0.88);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.38);
        }
        .h-fc-1 { top: 2%; left: -2%; padding: 10px 12px; }
        .h-fc-2 { top: 5%; right: -2%; padding: 10px 12px; }
        .h-fc-3 {
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 14px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        /* ── Stats ──────────────────────────────────────────────────────────── */
        /* Added margin-top: 48px so the section breathes */
        .vx-stats { margin-top: 48px; }
        .vx-stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; }
        .h-stat-card {
          opacity: 0;
          border: 1px solid var(--border);
          background: var(--glass);
          border-radius: 10px;
          padding: 16px;
        }
        .h-stat-num {
          font-size: clamp(28px, 3.2vw, 38px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-top: 4px;
        }

        .vx-seo-strip {
          margin-top: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          background: rgba(255,255,255,0.015);
          padding: 14px 16px;
          color: rgba(255,255,255,0.28);
          font-size: 12px;
          line-height: 1.75;
        }

        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0,0,0,0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        @media (max-width: 1100px) {
          .vx-main-row { grid-template-columns: 1fr; }
          .vx-right-wrap { order: -1; margin-bottom: 4px; }
          .h-fc-1 { left: 2%; }
          .h-fc-2 { right: 2%; }
        }

        @media (max-width: 980px) {
          .vx-inner { padding-top: 16px; }
          .vx-stat-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .h-desc { font-size: 14px; }
          .h-fc { display: none; }
          .vx-stats { margin-top: 32px; }
        }

        @media (max-width: 560px) {
          .vx-inner { padding: 14px 14px 24px; }
          .h-cta-row { width: 100%; }
          .h-cta { flex: 1 1 100%; justify-content: center; }
          .vx-stat-grid { gap: 10px; }
          .vx-stats { margin-top: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vx-reflection-sweep { display: none !important; }
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap"
      />

      <main
        ref={wrapRef}
        className="vx-hero"
        role="main"
        aria-labelledby="hero-heading"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <div className="vx-bg-grid" aria-hidden />
        <div className="vx-bg-vignette" aria-hidden />

        <div className="vx-inner">
          <div className="vx-main-row">
            <div ref={leftRef}>
              <p className="h-eyebrow" data-reveal>
                Viorix Digital Solutions · UK
              </p>

              <h1 id="hero-heading" itemProp="headline" style={{ margin: 0 }}>
                <span className="h-line1" data-reveal>
                  Professional
                </span>

                <span className="h-line2" data-reveal>
                  <TypeAnimation
                    sequence={[
                      "Web Development", 1800,
                      "Mobile Apps", 1800,
                      "E-commerce", 1800,
                      "Digital Marketing", 1800,
                      "Custom Software", 1800,
                      "SEO Solutions", 1800,
                      "UI/UX Design", 1800,
                    ]}
                    wrapper="span"
                    repeat={Infinity}
                  />
                </span>

                <span className="h-line3" data-reveal>
                  That Scale Your Business
                </span>
              </h1>

              <p className="h-desc" itemProp="description" data-reveal>
                <strong style={{ color: "rgba(255,255,255,0.84)" }}>Viorix Digital Solutions</strong>{" "}
                builds responsive web platforms, cross-platform mobile apps, and e-commerce experiences
                that drive measurable growth for UK businesses.
              </p>

              <div className="h-feature-list" role="list" aria-label="Key features" data-reveal>
                {features.map(({ icon: Icon, text }) => (
                  <div className="h-pill" role="listitem" key={text}>
                    <Icon size={13} color="#00bfff" aria-hidden />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <nav className="h-cta-row" role="navigation" aria-label="Primary actions" data-reveal>
                <Link href="/contact" className="h-cta h-cta-primary" aria-label="Get free consultation">
                  Free Consultation <ArrowUpRight size={14} aria-hidden />
                </Link>
                <Link href="/about" className="h-cta h-cta-ghost" aria-label="About us">
                  About Us <ArrowUpRight size={14} aria-hidden />
                </Link>
              </nav>
            </div>

            <div ref={rightRef} className="vx-right-wrap" data-reveal>
              <Laptop
                sceneRef={sceneRef as React.RefObject<HTMLDivElement>}
                lidRef={lidRef as React.RefObject<HTMLDivElement>}
              />

              {!isMobile && (
                <>
                  <div className="h-fc h-fc-1" aria-hidden>
                    <p style={{ margin: 0, fontSize: 9, letterSpacing: ".13em", color: "#00bfff", textTransform: "uppercase" }}>
                      Success Rate
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700 }}>99%</p>
                  </div>

                  <div className="h-fc h-fc-2" aria-hidden>
                    <p style={{ margin: 0, fontSize: 9, letterSpacing: ".13em", color: "#00bfff", textTransform: "uppercase" }}>
                      Projects
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700 }}>50+</p>
                  </div>

                  <div className="h-fc h-fc-3" aria-hidden>
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} color="#facc15" fill="#facc15" />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.62)" }}>5.0 Rating</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Stats ── margin-top: 48px applied via .vx-stats in CSS */}
          <section ref={statsRef} className="vx-stats" aria-labelledby="track-record" data-reveal>
            <h2
              id="track-record"
              style={{
                margin: "0 0 14px",
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(0,191,255,0.56)",
              }}
            >
              Our Track Record
            </h2>

            <div className="vx-stat-grid" role="list" aria-label="Company statistics">
              {stats.map((s, i) => (
                <article className="h-stat-card" role="listitem" key={s.label}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      border: "1px solid rgba(0,191,255,0.2)",
                      background: "rgba(0,191,255,0.08)",
                      display: "grid",
                      placeItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    {s.icon ? (
                      <s.icon size={15} color="#00bfff" aria-hidden />
                    ) : (
                      <div style={{ display: "flex", gap: 1 }}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={7} color="#facc15" fill="#facc15" aria-hidden />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="h-stat-num">
                    <AnimatedNumber
                      target={s.target}
                      suffix={s.suffix}
                      duration={1.4 + i * 0.15}
                      run={statsRun}
                      ariaLabel={s.aria}
                    />
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    {s.label}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{s.sub}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="vx-seo-strip" aria-labelledby="seo-content" data-reveal>
            <h2 id="seo-content" className="sr-only">
              Our Comprehensive Digital Services
            </h2>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "rgba(255,255,255,0.45)" }}>Viorix Digital Solutions</strong>{" "}
              specializes in responsive web design, mobile app development, e-commerce platforms, SEO, digital marketing,
              custom software, API integration, cloud solutions, and UI/UX design for UK businesses.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}