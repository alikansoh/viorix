"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Shield,
  ArrowRight,
  Globe,
  Code,
  Database,
  Cpu,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";

const WhyUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Custom Web Development",
      description:
        "Bespoke solutions architected from scratch for London businesses — no templates, no shortcuts.",
      icon: <Code aria-hidden="true" className="w-7 h-7 text-[#00BFFF]" />,
      metric: "100% Custom",
      glow: "rgba(0,191,255,0.18)",
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-grade encryption, secure auth flows, and full compliance with UK GDPR and industry standards.",
      icon: <Shield aria-hidden="true" className="w-7 h-7 text-[#00BFFF]" />,
      metric: "ISO Certified",
      glow: "rgba(0,120,255,0.18)",
    },
    {
      title: "Performance Optimisation",
      description:
        "Sub-2s load times, Core Web Vitals optimised — because every millisecond costs conversions.",
      icon: <Zap aria-hidden="true" className="w-7 h-7 text-[#00BFFF]" />,
      metric: "Sub-2s Load",
      glow: "rgba(0,191,255,0.18)",
    },
    {
      title: "Data Analytics",
      description:
        "Real-time dashboards and actionable insights so you always know what's driving your growth.",
      icon: <Database aria-hidden="true" className="w-7 h-7 text-[#00BFFF]" />,
      metric: "Real-Time",
      glow: "rgba(0,80,200,0.18)",
    },
    {
      title: "Global Infrastructure",
      description:
        "Cloud-hosted on edge networks with a 99.9% uptime SLA — your site is always reachable, anywhere.",
      icon: <Globe aria-hidden="true" className="w-7 h-7 text-[#00BFFF]" />,
      metric: "99.9% Uptime",
      glow: "rgba(0,191,255,0.18)",
    },
    {
      title: "Rapid Deployment",
      description:
        "Agile sprints and CI/CD pipelines mean faster time-to-market without compromising quality.",
      icon: <TrendingUp aria-hidden="true" className="w-7 h-7 text-[#00BFFF]" />,
      metric: "Fast Launch",
      glow: "rgba(0,150,255,0.18)",
    },
  ];

  const values = [
    {
      title: "Proven Track Record",
      description: "40+ successful projects delivered with measurable ROI for London businesses.",
      icon: <CheckCircle className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "Expert Team",
      description: "Full-stack engineers with 10+ years of combined experience building at scale.",
      icon: <Code className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "Results-Focused",
      description: "We measure our success by your business growth, not billable hours.",
      icon: <TrendingUp className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "24/7 Support",
      description: "Dedicated support engineers available around the clock when you need us.",
      icon: <Users className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "Scalable Solutions",
      description: "Architecture that grows with your business from startup to enterprise.",
      icon: <Target className="w-5 h-5 text-[#00BFFF]" />,
    },
  ];

  const testimonials = [
    {
      name: "Imad Al Soudani",
      role: "Owner",
      company: "Hope BTC",
      quote:
        "Viorix built us a professional website that makes it easy for new students to register for training. Their dedication and support were excellent — we now have a strong online presence.",
      metric: "300% More Registrations",
      avatar: "IA",
    },
    {
      name: "Hassan Husseini",
      role: "Owner",
      company: "JRS Building Company",
      quote:
        "Ali created a modern portfolio website that showcases our projects beautifully and helps us attract new clients. Our company looks far more professional online.",
      metric: "250% More Enquiries",
      avatar: "HH",
    },
    {
      name: "Ali Hashem",
      role: "Owner",
      company: "ColdFix",
      quote:
        "Viorix designed a clean, SEO-friendly website for ColdFix that represents our services perfectly. Their professionalism has already brought us more leads.",
      metric: "40% More Leads",
      avatar: "AH",
    },
    {
      name: "Bader Al Badri",
      role: "Owner",
      company: "360 Drive Academy",
      quote:
        "They built a sleek, user-friendly website for our driving school. Students can now book lessons effortlessly and we've seen a clear increase in new enrolments.",
      metric: "30% More Bookings",
      avatar: "BB",
    },
  ];

  useEffect(() => {
    setVisibleCards(new Array(features.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 80);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-feature-card]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Viorix Digital Solutions",
            description:
              "Leading web development agency in London delivering custom websites, mobile apps, e-commerce, and digital marketing solutions for UK businesses.",
            url: "https://viorix.co.uk",
            areaServed: [
              { "@type": "City", name: "London" },
              { "@type": "Country", name: "United Kingdom" },
            ],
            serviceType: [
              "Web Development",
              "Mobile App Development",
              "E-commerce Solutions",
              "SEO Services",
              "Digital Marketing",
              "UI/UX Design",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              ratingCount: "50",
              bestRating: "5",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "London",
              addressCountry: "GB",
            },
          }),
        }}
      />

      <style>{`
        .wy-section {
          --blue: #00bfff;
          --blue2: #0099cc;
          --bg: #050a13;
          --bg2: #07101e;
          --border: rgba(0,191,255,0.14);
          --border-hover: rgba(0,191,255,0.44);
          --glass: rgba(0,191,255,0.04);
          --glass-hover: rgba(0,191,255,0.09);
          --muted: rgba(255,255,255,0.55);
          font-family: Inter, "DM Sans", system-ui, -apple-system, sans-serif;
          background: var(--bg);
          color: #fff;
          position: relative;
          overflow: hidden;
          padding: 96px 0 80px;
        }

        .wy-section * { box-sizing: border-box; }

        /* Grid bg identical to hero */
        .wy-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,191,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          opacity: 0.32;
        }

        .wy-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 20% 20%, rgba(0,80,170,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(0,80,170,0.14) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,8,16,0.6) 100%);
        }

        .wy-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 2;
        }

        /* ── Header ── */
        .wy-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .wy-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--glass);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--blue);
          font-weight: 600;
          margin-bottom: 20px;
        }

        .wy-title {
          font-size: clamp(34px, 5vw, 64px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.02;
          margin: 0 0 16px;
        }

        .wy-title-accent {
          background: linear-gradient(110deg, #00bfff 0%, #6ddcff 45%, #0099cc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wy-subtitle {
          font-size: 16px;
          color: var(--muted);
          max-width: 52ch;
          margin: 0 auto 24px;
          line-height: 1.7;
        }

        .wy-tag-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .wy-tag {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--glass);
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
        }

        /* ── Feature Cards ── */
        .wy-features-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 80px;
          perspective: 1200px;
        }

        .wy-feat-card {
          position: relative;
          border: 1px solid var(--border);
          background: linear-gradient(145deg, rgba(7,16,30,0.9) 0%, rgba(4,8,16,0.95) 100%);
          border-radius: 18px;
          padding: 32px 28px;
          cursor: default;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
          transform-style: preserve-3d;
          will-change: transform;
          opacity: 0;
          transform: translateY(24px);
        }

        .wy-feat-card.visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .wy-feat-card:hover {
          border-color: var(--border-hover);
        }

        .wy-feat-card-inner {
          position: relative;
          z-index: 2;
        }

        .wy-feat-card-shine {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,191,255,0.08) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .wy-feat-card:hover .wy-feat-card-shine {
          opacity: 1;
        }

        .wy-feat-corner-accent {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          border-top-right-radius: 18px;
          background: radial-gradient(ellipse at top right, rgba(0,191,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .wy-feat-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: 1px solid rgba(0,191,255,0.2);
          background: rgba(0,191,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          position: relative;
        }

        .wy-feat-icon-wrap::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(0,191,255,0.3) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .wy-feat-card:hover .wy-feat-icon-wrap::after {
          opacity: 1;
        }

        .wy-feat-metric {
          position: absolute;
          top: 28px;
          right: 24px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blue);
          border: 1px solid rgba(0,191,255,0.22);
          background: rgba(0,191,255,0.06);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .wy-feat-title {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }

        .wy-feat-desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.65;
          margin: 0;
        }

        /* 3D depth line at bottom of card */
        .wy-feat-card::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,191,255,0.3), transparent);
          border-radius: 999px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .wy-feat-card:hover::before {
          opacity: 1;
        }

        /* ── Values ── */
        .wy-values-wrap {
          margin-bottom: 80px;
        }

        .wy-section-label {
          text-align: center;
          margin-bottom: 40px;
        }

        .wy-section-label h3 {
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 800;
          letter-spacing: -0.025em;
          margin: 0 0 10px;
        }

        .wy-section-label p {
          font-size: 15px;
          color: var(--muted);
          max-width: 44ch;
          margin: 0 auto;
          line-height: 1.6;
        }

        .wy-values-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .wy-val-card {
          border: 1px solid var(--border);
          background: linear-gradient(160deg, rgba(7,16,30,0.88) 0%, rgba(4,8,16,0.93) 100%);
          border-radius: 14px;
          padding: 22px 18px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          position: relative;
          overflow: hidden;
        }

        .wy-val-card:hover {
          border-color: rgba(0,191,255,0.36);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,191,255,0.1);
        }

        .wy-val-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,191,255,0.4), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .wy-val-card:hover::after {
          opacity: 1;
        }

        .wy-val-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1px solid rgba(0,191,255,0.18);
          background: rgba(0,191,255,0.07);
          display: grid;
          place-items: center;
          margin-bottom: 14px;
        }

        .wy-val-title {
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }

        .wy-val-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        /* ── Testimonials ── */
        .wy-testi-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 80px;
        }

        .wy-testi-card {
          border: 1px solid var(--border);
          background: linear-gradient(145deg, rgba(7,16,30,0.9) 0%, rgba(4,8,16,0.95) 100%);
          border-radius: 18px;
          padding: 32px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          position: relative;
          overflow: hidden;
        }

        .wy-testi-card:hover {
          border-color: rgba(0,191,255,0.36);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.6), 0 0 60px rgba(0,191,255,0.06);
        }

        /* Subtle quote mark */
        .wy-testi-card::before {
          content: '"';
          position: absolute;
          top: 12px;
          right: 24px;
          font-size: 96px;
          line-height: 1;
          color: rgba(0,191,255,0.06);
          font-family: Georgia, serif;
          pointer-events: none;
        }

        .wy-testi-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .wy-stars {
          display: flex;
          gap: 3px;
        }

        .wy-testi-metric {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blue);
          border: 1px solid rgba(0,191,255,0.22);
          background: rgba(0,191,255,0.06);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .wy-testi-quote {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.75);
          margin: 0 0 24px;
          font-style: italic;
        }

        .wy-testi-author {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .wy-testi-avatar {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, #00bfff, #1b365d);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          border: 1px solid rgba(0,191,255,0.3);
        }

        .wy-testi-name {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 2px;
        }

        .wy-testi-role {
          font-size: 12px;
          color: var(--blue);
          font-weight: 600;
          margin: 0 0 1px;
        }

        .wy-testi-company {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }

        /* ── CTA ── */
        .wy-cta-block {
          position: relative;
          border-radius: 24px;
          padding: 64px;
          text-align: center;
          overflow: hidden;
          border: 1px solid rgba(0,191,255,0.2);
          background: linear-gradient(135deg, rgba(0,80,170,0.22) 0%, rgba(0,40,100,0.18) 50%, rgba(0,191,255,0.08) 100%);
        }

        .wy-cta-block::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 30% 50%, rgba(0,191,255,0.14) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 50%, rgba(0,80,200,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Grid inside CTA */
        .wy-cta-block::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,191,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,191,255,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          border-radius: inherit;
          opacity: 0.5;
          pointer-events: none;
        }

        .wy-cta-inner {
          position: relative;
          z-index: 2;
        }

        .wy-cta-title {
          font-size: clamp(26px, 3.5vw, 44px);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 14px;
          line-height: 1.05;
        }

        .wy-cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.65);
          max-width: 48ch;
          margin: 0 auto 32px;
          line-height: 1.65;
        }

        .wy-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00bfff;
          color: #050a13;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 15px 28px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 0 32px rgba(0,191,255,0.35), 0 4px 16px rgba(0,0,0,0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .wy-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 48px rgba(0,191,255,0.5), 0 8px 24px rgba(0,0,0,0.5);
          background: #33ccff;
        }

        /* SEO hidden strip */
        .wy-seo-strip {
          margin-top: 56px;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          background: rgba(255,255,255,0.012);
          padding: 14px 18px;
          color: rgba(255,255,255,0.22);
          font-size: 12px;
          line-height: 1.8;
        }

        @media (max-width: 1024px) {
          .wy-features-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .wy-values-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
        }

        @media (max-width: 768px) {
          .wy-section { padding: 64px 0 60px; }
          .wy-features-grid { grid-template-columns: 1fr; }
          .wy-values-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .wy-testi-grid { grid-template-columns: 1fr; }
          .wy-cta-block { padding: 40px 24px; }
          .wy-header { margin-bottom: 48px; }
        }

        @media (max-width: 520px) {
          .wy-values-grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wy-feat-card,
          .wy-val-card,
          .wy-testi-card,
          .wy-cta-btn { transition: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="wy-section"
        aria-labelledby="why-us-heading"
        itemScope
        itemType="https://schema.org/Service"
      >
        <div className="wy-grid-bg" aria-hidden />
        <div className="wy-vignette" aria-hidden />

        <div className="wy-inner">

          {/* ── Header ── */}
          <header className="wy-header">
            <div className="wy-eyebrow" aria-hidden="true">
              <Cpu className="w-3.5 h-3.5" />
              Web Development London
            </div>

            <h2 id="why-us-heading" className="wy-title" itemProp="name">
              Why London Businesses{" "}
              <span className="wy-title-accent">Choose Viorix</span>
            </h2>

            <p className="wy-subtitle" itemProp="description">
              We build high-performance digital products for growing companies across London and the UK — engineered for speed, designed for conversion, built to scale.
            </p>

            <div className="wy-tag-row" role="list" aria-label="Service highlights">
              {["Custom Solutions", "London-Based Team", "Proven ROI", "24/7 Support", "UK GDPR Compliant"].map((t) => (
                <span key={t} className="wy-tag" role="listitem">✓ {t}</span>
              ))}
            </div>
          </header>

          {/* ── Feature Cards ── */}
          <div
            className="wy-features-grid"
            onMouseMove={handleMouseMove}
            role="list"
            aria-label="Our services"
          >
            {features.map((feature, index) => (
              <article
                key={index}
                data-index={index}
                data-feature-card
                className={`wy-feat-card${visibleCards[index] ? " visible" : ""}`}
                role="listitem"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={
                  hoveredFeature === index
                    ? {
                        transform: `translateY(0) rotateX(${-mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`,
                        boxShadow: `0 20px 48px rgba(0,0,0,0.6), 0 0 48px ${feature.glow}`,
                      }
                    : undefined
                }
              >
                <div
                  className="wy-feat-card-shine"
                  style={{
                    "--mx": `${(mousePos.x + 1) * 50}%`,
                    "--my": `${(mousePos.y + 1) * 50}%`,
                  } as React.CSSProperties}
                />
                <div className="wy-feat-corner-accent" />

                <div className="wy-feat-card-inner">
                  <div className="wy-feat-icon-wrap">{feature.icon}</div>
                  <span className="wy-feat-metric" aria-label={`Metric: ${feature.metric}`}>{feature.metric}</span>
                  <h3 className="wy-feat-title">{feature.title}</h3>
                  <p className="wy-feat-desc">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* ── Core Values ── */}
          <div className="wy-values-wrap">
            <div className="wy-section-label">
              <h3>Our Core Values</h3>
              <p>The principles behind every project we ship for London businesses.</p>
            </div>

            <div className="wy-values-grid" role="list" aria-label="Core values">
              {values.map((value, index) => (
                <div key={index} className="wy-val-card" role="listitem">
                  <div className="wy-val-icon">{value.icon}</div>
                  <p className="wy-val-title">{value.title}</p>
                  <p className="wy-val-desc">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Testimonials ── */}
          <div aria-labelledby="testimonials-heading">
            <div className="wy-section-label">
              <h3 id="testimonials-heading">Client Success Stories</h3>
              <p>Real businesses. Measurable results. Real growth.</p>
            </div>

            <div className="wy-testi-grid" role="list" aria-label="Client testimonials">
              {testimonials.map((t, index) => (
                <article key={index} className="wy-testi-card" role="listitem" itemScope itemType="https://schema.org/Review">
                  <div className="wy-testi-top">
                    <div className="wy-stars" aria-label="5 star rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden />
                      ))}
                    </div>
                    <span className="wy-testi-metric">{t.metric}</span>
                  </div>

                  <p className="wy-testi-quote" itemProp="reviewBody">&quot;{t.quote}&quot;</p>

                  <div className="wy-testi-author" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <div className="wy-testi-avatar" aria-hidden>{t.avatar}</div>
                    <div>
                      <p className="wy-testi-name" itemProp="name">{t.name}</p>
                      <p className="wy-testi-role">{t.role}</p>
                      <p className="wy-testi-company">{t.company}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="wy-cta-block">
            <div className="wy-cta-inner">
              <h3 className="wy-cta-title">
                Ready to Grow Your<br />
                <span style={{ background: "linear-gradient(110deg,#00bfff 0%,#6ddcff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  London Business?
                </span>
              </h3>
              <p className="wy-cta-sub">
                Let&apos;s discuss how Viorix can build the digital product your business needs — from concept to launch and beyond.
              </p>
              <Link href="/web-quote" className="wy-cta-btn" aria-label="Start your web project with Viorix London">
                Start Your Project
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Hidden SEO enrichment */}
          <aside className="wy-seo-strip" aria-labelledby="seo-services">
            <h4 id="seo-services" className="sr-only">Web Development Services in London</h4>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "rgba(255,255,255,0.38)" }}>Viorix Digital Solutions</strong> — London&apos;s trusted web development agency offering bespoke website design, React &amp; Next.js development, e-commerce platforms (Shopify, WooCommerce), mobile app development, SEO, digital marketing, API integration, cloud infrastructure, and UI/UX design. Serving businesses across London, the City, Canary Wharf, Shoreditch, and across the UK.
            </p>
          </aside>

        </div>
      </section>
    </>
  );
};

export default WhyUs;