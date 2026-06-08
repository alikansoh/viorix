"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, Check, Code2, Palette, Smartphone } from "lucide-react";

/* ─────────────────────────── data ─────────────────────────────── */
const SERVICES = [
  {
    id: "web",
    index: "01",
    tab: "Web Dev",
    title: "Web",
    subtitle: "Development",
    description:
      "We build premium web platforms with clean architecture, exceptional speed, and conversion-focused UX. Every layer is engineered for scale and long-term reliability.",
    image: "/web.webp",
    imageAlt: "Web development",
    icon: Code2,
    accent: "#00bfff",
    counter: "99.9%",
    counterLabel: "Uptime",
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "<2s", label: "Load time" },
    ],
    features: [
      "Next.js / React architecture",
      "Technical SEO + Core Web Vitals",
      "Scalable backend & API design",
      "Accessibility-first implementation",
    ],
  },
  {
    id: "mobile",
    index: "02",
    tab: "Mobile",
    title: "Mobile",
    subtitle: "Excellence",
    description:
      "From concept to launch, we craft high-performance mobile apps with intuitive flows and native-grade interactions designed to improve retention and engagement.",
    image: "/mobile.jpg",
    imageAlt: "Mobile apps",
    icon: Smartphone,
    accent: "#6ddcff",
    counter: "4.9★",
    counterLabel: "App rating",
    stats: [
      { value: "4.9★", label: "App rating" },
      { value: "60fps", label: "Smooth UI" },
    ],
    features: [
      "Cross-platform + native quality",
      "Push notifications & realtime sync",
      "App Store optimisation",
      "Offline-ready experience",
    ],
  },
  {
    id: "design",
    index: "03",
    tab: "UI/UX",
    title: "Design",
    subtitle: "& UX",
    description:
      "We design elegant, high-converting interfaces rooted in user behaviour, visual hierarchy, and brand clarity. Beautiful experiences with measurable outcomes.",
    image: "/ui.jpg",
    imageAlt: "UI/UX design",
    icon: Palette,
    accent: "#00bfff",
    counter: "3.2×",
    counterLabel: "Conversions",
    stats: [
      { value: "3.2×", label: "Conversions" },
      { value: "AAA", label: "Accessibility" },
    ],
    features: [
      "Modern design systems",
      "User journey optimisation",
      "Brand-aligned interface language",
      "Conversion-focused UX patterns",
    ],
  },
] as const;

const N = SERVICES.length;

/* ─────────────────────── helpers ──────────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const renderRef = useRef(0);

  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [wipe, setWipe] = useState<{ from: number; to: number; t: number } | null>(null);

  /* ── scroll ─────────────────────────────────────────────── */
  const lastIdxRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;

      const scrolled = -sec.getBoundingClientRect().top;
      const fullHeight = sec.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, scrolled / fullHeight));
      const idx = Math.min(Math.floor(prog * N), N - 1);

      setProgress(prog);

      if (idx !== lastIdxRef.current) {
        const from = lastIdxRef.current;
        const to = idx;
        lastIdxRef.current = idx;
        setActiveIdx(idx);
        setWipe({ from, to, t: 0 });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── animate wipe progress ──────────────────────────────── */
  useEffect(() => {
    if (!wipe) return;
    let raf: number;
    const dur = 700;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setWipe((w) => (w ? { ...w, t: ease } : null));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setWipe(null);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [wipe?.from, wipe?.to]);

  /* ── mouse tracking ─────────────────────────────────────── */
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = stickyRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseRef.current = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    };
  }, []);

  /* ── rAF loop: image tilt + breathing ────────── */
  useEffect(() => {
    const smooth = { x: 0.5, y: 0.5 };
    let breath = 0;

    const tick = () => {
      smooth.x = lerp(smooth.x, mouseRef.current.x, 0.06);
      smooth.y = lerp(smooth.y, mouseRef.current.y, 0.06);
      breath += 0.018;

      const nx = (smooth.x - 0.5) * 2;
      const ny = (smooth.y - 0.5) * 2;
      const breathScale = 1 + Math.sin(breath) * 0.012;

      const imgEl = stickyRef.current?.querySelector<HTMLElement>(".svc-img-inner");
      if (imgEl) {
        imgEl.style.transform = `
          perspective(1100px)
          rotateY(${nx * 10}deg)
          rotateX(${-ny * 6}deg)
          scale(${breathScale})
          translateZ(0)
        `;
      }

      const lbl = stickyRef.current?.querySelector<HTMLElement>(".svc-img-badge");
      if (lbl) {
        lbl.style.transform = `translate(${nx * 8}px, ${ny * 5}px)`;
      }

      renderRef.current = requestAnimationFrame(tick);
    };

    renderRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(renderRef.current);
  }, []);

  /* ── particle canvas ────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.35 + 0.08,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = W;
        if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,191,255,${d.a})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const goTo = (i: number) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const h = sec.offsetHeight - window.innerHeight;
    window.scrollTo({ top: sec.offsetTop + (i / N) * h, behavior: "smooth" });
  };

  const s = SERVICES[activeIdx];
  const Icon = s.icon;
  const drumAngle = wipe ? (1 - wipe.t) * -90 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .svc-root {
          --bg:#03080f;
          --a:#00bfff;
          --a2:#6ddcff;
          --dim:rgba(255,255,255,.5);
          background:var(--bg);
          color:#fff;
          font-family: Inter, "DM Sans", system-ui, -apple-system, sans-serif;
        }
        .svc-root * { box-sizing:border-box; margin:0; padding:0; }

        .svc-spacer { height:${N * 100}vh; position:relative; }
        .svc-sticky { position:sticky; top:0; height:100vh; overflow:hidden; }

        .svc-bg {
          position:absolute; inset:0; z-index:0;
          background:
            radial-gradient(ellipse 70% 60% at 75% 25%, rgba(0,140,255,.11) 0%, transparent 65%),
            radial-gradient(ellipse 50% 55% at 15% 80%, rgba(0,60,140,.1)   0%, transparent 60%),
            #03080f;
        }
        .svc-scan {
          position:absolute; inset:0; z-index:0; pointer-events:none; opacity:.04;
          background-image:repeating-linear-gradient(0deg, rgba(255,255,255,.6) 0px, rgba(255,255,255,.6) 1px, transparent 1px, transparent 3px);
        }
        .svc-canvas { position:absolute; inset:0; z-index:1; pointer-events:none; }

        .svc-nav {
          position:absolute; top:0; left:0; right:0; z-index:40;
          height:62px; display:flex; align-items:center; gap:4px;
          padding:0 24px;
          background:rgba(3,8,15,.8); backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(0,191,255,.07);
        }
        .svc-nav-spacer { flex:1; }
        .svc-tab {
          display:flex; align-items:center; gap:6px;
          padding:6px 14px; border-radius:999px;
          border:1px solid transparent; background:transparent;
          color:rgba(255,255,255,.3);
          font-family:"DM Sans",sans-serif;
          font-size:11px; font-weight:500; letter-spacing:.1em; text-transform:uppercase;
          cursor:pointer; transition:all .2s;
        }
        .svc-tab:hover  { color:rgba(255,255,255,.55); }
        .svc-tab.on {
          color:var(--a);
          border-color:rgba(0,191,255,.3);
          background:rgba(0,191,255,.08);
        }
        .svc-counter-pill {
          margin-left:auto;
          display:flex; align-items:center; gap:6px;
          font-size:11px; letter-spacing:.08em; text-transform:uppercase;
          color:rgba(255,255,255,.28);
        }
        .svc-counter-val {
          font-family:'Inter',sans-serif;
          font-size:13px; font-weight:800;
          color:var(--a);
        }

        .svc-dots {
          position:absolute; right:22px; top:50%; transform:translateY(-50%);
          z-index:40; display:flex; flex-direction:column; gap:10px;
        }
        .svc-dot {
          width:4px; border-radius:999px; border:none; cursor:pointer;
          background:rgba(255,255,255,.18); height:4px;
          transition:all .35s cubic-bezier(.4,0,.2,1);
        }
        .svc-dot.on { height:30px; background:var(--a); box-shadow:0 0 14px rgba(0,191,255,.55); }

        .svc-prog {
          position:absolute; left:0; bottom:0; height:1.5px; z-index:40;
          background:linear-gradient(90deg,transparent,var(--a),var(--a2),transparent);
          transition:width .08s linear;
        }

        .svc-stage {
          position:absolute; inset:0; z-index:5;
          display:grid;
          grid-template-columns:1fr 1fr;
          align-items:center;
          padding:70px 56px 36px 72px;
          gap:56px;
        }

        .svc-left { display:flex; flex-direction:column; position:relative; z-index:2; }

        .svc-drum {
          font-family:'Inter',sans-serif;
          font-size:clamp(90px,14vw,160px);
          font-weight:800;
          line-height:.8;
          letter-spacing:-.06em;
          color:transparent;
          -webkit-text-stroke:1px rgba(0,191,255,.12);
          user-select:none;
          transform-origin:center bottom;
          transition:none;
          margin-bottom:-14px;
          display:block;
        }

        .svc-title {
          font-family:'Inter',sans-serif;
          font-size:clamp(38px,6vw,80px);
          font-weight:800;
          line-height:.88;
          letter-spacing:-.04em;
        }
        .svc-sub {
          font-family:'Inter',sans-serif;
          font-size:clamp(34px,5.4vw,72px);
          font-weight:800;
          line-height:.88;
          letter-spacing:-.04em;
          background:linear-gradient(115deg,#00bfff 0%,#6ddcff 55%,#0099cc 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          margin-bottom:18px;
        }

        .svc-rule {
          width:0; height:1px; margin-bottom:20px;
          background:linear-gradient(90deg,var(--a),var(--a2),transparent);
          transition:width .6s cubic-bezier(.22,1,.36,1);
        }
        .svc-rule.open { width:110px; }

        .svc-desc {
          font-size:14.5px; line-height:1.78; color:var(--dim);
          max-width:46ch; margin-bottom:28px;
        }

        .svc-stats { display:flex; gap:10px; margin-bottom:22px; flex-wrap:wrap; }
        .svc-stat {
          padding:10px 14px; border-radius:8px;
          border:1px solid rgba(0,191,255,.12);
          background:rgba(0,191,255,.03);
          min-width:110px;
        }
        .svc-stat-v { font-family:'Inter',sans-serif; font-size:20px; font-weight:800; color:var(--a); line-height:1; }
        .svc-stat-l { font-size:10px; margin-top:3px; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.32); }

        .svc-feats { display:flex; flex-direction:column; gap:7px; margin-bottom:28px; }
        .svc-feat  { display:flex; align-items:flex-start; gap:9px; font-size:13px; color:rgba(255,255,255,.68); }
        .svc-dot2  { width:15px; height:15px; flex-shrink:0; margin-top:2px; border-radius:50%; display:grid; place-items:center; border:1px solid rgba(0,191,255,.35); background:rgba(0,191,255,.1); }

        .svc-cta {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 20px; border-radius:8px; cursor:pointer;
          border:1px solid rgba(0,191,255,.35); background:rgba(0,191,255,.12); color:#fff;
          font-family:'DM Sans',sans-serif;
          font-size:11px; font-weight:500; letter-spacing:.1em; text-transform:uppercase;
          box-shadow:0 0 22px rgba(0,191,255,.15);
          transition:all .2s; width:fit-content;
        }
        .svc-cta:hover { background:rgba(0,191,255,.22); transform:translateY(-2px); }

        .svc-img-outer {
          position:relative;
          border-radius:20px; overflow:hidden;
          box-shadow:
            0 0 0 1px rgba(0,191,255,.15),
            0 50px 120px rgba(0,0,0,.6),
            inset 0 1px 0 rgba(255,255,255,.06);
          aspect-ratio:4/3;
          transform-style:preserve-3d;
        }

        .svc-img-inner {
          position:absolute; inset:-5%;
          transform-style:preserve-3d;
          will-change:transform;
          transition:transform .05s linear;
        }

        .svc-img-gloss {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background:
            linear-gradient(135deg,rgba(0,191,255,.1) 0%,transparent 42%),
            linear-gradient(to top,rgba(3,8,15,.6) 0%,transparent 45%);
        }
        .svc-img-outer::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px; z-index:5;
          background:linear-gradient(90deg,transparent 5%,rgba(0,191,255,.5) 50%,transparent 95%);
        }

        .svc-img-badge {
          position:absolute; left:16px; bottom:16px; z-index:6;
          display:flex; align-items:center; gap:8px;
          padding:7px 14px; border-radius:999px;
          border:1px solid rgba(0,191,255,.3);
          background:rgba(3,8,15,.85); backdrop-filter:blur(14px);
          font-size:11px; font-weight:500; letter-spacing:.1em; text-transform:uppercase;
          color:rgba(255,255,255,.75);
          transition:transform .1s ease;
          will-change:transform;
        }

        @keyframes upIn    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes leftIn  { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:none} }
        @keyframes popIn   { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:none} }

        .sa1{animation:upIn   .55s cubic-bezier(.22,1,.36,1) .04s both}
        .sa2{animation:upIn   .55s cubic-bezier(.22,1,.36,1) .10s both}
        .sa3{animation:upIn   .55s cubic-bezier(.22,1,.36,1) .16s both}
        .sa4{animation:upIn   .45s cubic-bezier(.22,1,.36,1) .24s both}
        .sa5{animation:popIn  .4s  cubic-bezier(.22,1,.36,1) .30s both}
        .sa6{animation:popIn  .4s  cubic-bezier(.22,1,.36,1) .37s both}
        .sf0{animation:leftIn .38s cubic-bezier(.22,1,.36,1) .34s both}
        .sf1{animation:leftIn .38s cubic-bezier(.22,1,.36,1) .40s both}
        .sf2{animation:leftIn .38s cubic-bezier(.22,1,.36,1) .46s both}
        .sf3{animation:leftIn .38s cubic-bezier(.22,1,.36,1) .52s both}
        .sa7{animation:upIn   .4s  cubic-bezier(.22,1,.36,1) .56s both}

        @keyframes imgEntrance {
          from { opacity:0; transform:perspective(1100px) translateX(55px) rotateY(-16deg) scale(.95); }
          to   { opacity:1; transform:perspective(1100px) translateX(0) rotateY(0deg) scale(1); }
        }
        .svc-img-outer { animation:imgEntrance .8s cubic-bezier(.22,1,.36,1) .06s both; }

        @keyframes badgeEntrance { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        .svc-img-badge { animation:badgeEntrance .4s ease .65s both; }

        /* Large tablet */
        @media (max-width: 1100px) {
          .svc-stage{
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 76px 28px 28px;
            align-content: start;
          }

          .svc-left{ order: 2; }

          .svc-img-outer{
            order: 1;
            width: min(100%, 780px);
            margin: 0 auto;
            aspect-ratio: 16/9;
          }

          .svc-desc{ max-width: 100%; }
        }

        /* Tablet / mobile */
        @media (max-width: 920px){
          .svc-nav{
            height: auto;
            min-height: 58px;
            padding: 10px 12px;
            gap: 6px;
            flex-wrap: wrap;
          }

          .svc-tab{
            font-size: 10px;
            padding: 6px 10px;
          }

          .svc-nav-spacer{ display: none; }
          .svc-counter-pill{ display: none; }

          .svc-stage{
            padding: 84px 16px 20px;
            gap: 18px;
          }

          .svc-drum{
            font-size: clamp(56px, 16vw, 90px);
            margin-bottom: -6px;
          }

          .svc-title{
            font-size: clamp(30px, 10vw, 46px);
            line-height: .95;
          }

          .svc-sub{
            font-size: clamp(28px, 9vw, 42px);
            line-height: .95;
            margin-bottom: 12px;
          }

          .svc-rule{ margin-bottom: 14px; }
          .svc-desc{
            font-size: 14px;
            line-height: 1.65;
            margin-bottom: 18px;
          }

          .svc-stats{
            gap: 8px;
            margin-bottom: 16px;
          }

          .svc-stat{
            min-width: calc(50% - 4px);
            flex: 1 1 calc(50% - 4px);
            padding: 10px 12px;
          }

          .svc-stat-v{ font-size: 18px; }

          .svc-feats{
            gap: 6px;
            margin-bottom: 18px;
          }

          .svc-feat{
            font-size: 12.5px;
            line-height: 1.45;
          }

          .svc-cta{
            width: 100%;
            justify-content: center;
            padding: 11px 14px;
          }

          .svc-dots{ display:none; }

          .svc-img-outer{
            aspect-ratio: 16/10;
            border-radius: 14px;
          }

          .svc-img-badge{
            left: 10px;
            bottom: 10px;
            font-size: 10px;
            padding: 6px 10px;
          }
        }

        /* Small phones */
        @media (max-width: 560px){
          .svc-stage{ padding: 88px 12px 16px; }

          .svc-tab{
            font-size: 9px;
            padding: 5px 8px;
            letter-spacing: .06em;
          }

          .svc-stat{
            min-width: 100%;
            flex: 1 1 100%;
          }

          .svc-title{ font-size: clamp(28px, 11vw, 40px); }
          .svc-sub{ font-size: clamp(24px, 10vw, 36px); }

          .svc-prog{ height: 1px; }
        }
      `}</style>

      <section className="svc-root" ref={sectionRef}>
        <div className="svc-spacer">
          <div className="svc-sticky" ref={stickyRef} onMouseMove={onMouseMove}>
            <div className="svc-bg" />
            <div className="svc-scan" />
            <canvas className="svc-canvas" ref={canvasRef} />

            <nav className="svc-nav">
              {SERVICES.map((sv, i) => {
                const Ic = sv.icon;
                return (
                  <button
                    key={sv.id}
                    className={`svc-tab ${i === activeIdx ? "on" : ""}`}
                    onClick={() => goTo(i)}
                  >
                    <Ic size={11} />
                    {sv.tab}
                  </button>
                );
              })}
              <span className="svc-nav-spacer" />
              <div className="svc-counter-pill">
                <span className="svc-counter-val">{s.counter}</span>
                {s.counterLabel}
              </div>
            </nav>

            <div className="svc-dots" aria-hidden>
              {SERVICES.map((sv, i) => (
                <button
                  key={sv.id}
                  className={`svc-dot ${i === activeIdx ? "on" : ""}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <div className="svc-stage" key={`${activeIdx}`}>
              <div className="svc-left">
                <span
                  className="svc-drum"
                  style={{
                    transform: `perspective(600px) rotateX(${drumAngle}deg)`,
                    opacity: wipe ? Math.max(0, wipe.t) : 1,
                  }}
                >
                  {s.index}
                </span>

                <h3 className="svc-title sa1">{s.title}</h3>
                <h4 className="svc-sub sa2">{s.subtitle}</h4>
                <div className="svc-rule sa3 open" />
                <p className="svc-desc sa4">{s.description}</p>

                <div className="svc-stats">
                  {s.stats.map((st, si) => (
                    <div key={st.label} className={`svc-stat sa${5 + si}`}>
                      <div className="svc-stat-v">{st.value}</div>
                      <div className="svc-stat-l">{st.label}</div>
                    </div>
                  ))}
                </div>

                <div className="svc-feats">
                  {s.features.map((f, fi) => (
                    <div key={f} className={`svc-feat sf${fi}`}>
                      <span className="svc-dot2">
                        <Check size={8} color={s.accent} strokeWidth={3} />
                      </span>
                      {f}
                    </div>
                  ))}
                </div>

                <button className="svc-cta sa7">
                  Explore service <ArrowUpRight size={13} />
                </button>
              </div>

              <div className="svc-img-outer">
                <div className="svc-img-inner">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 920px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="svc-img-gloss" />
                <div className="svc-img-badge">
                  <Icon size={11} />
                  {s.tab}
                </div>
              </div>
            </div>

            {wipe && (
              <div
                className="svc-wipe"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 30,
                  background: "var(--bg)",
                  pointerEvents: "none",
                  clipPath: (() => {
                    const t = wipe.t;
                    const shear = 6;
                    const edge = (1 - t) * 105;
                    const lead = Math.max(0, edge - shear);
                    return `polygon(${lead}% 0%, ${edge}% 0%, ${edge}% 100%, ${lead}% 100%)`;
                  })(),
                }}
              />
            )}

            <div className="svc-prog" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </section>
    </>
  );
}