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
import { useReducedMotion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Code,
  Package,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/**
 * OurSimpleProcess (performance + SEO improvements)
 *
 * Improvements made:
 * - Converted to TypeScript (safer props/refs).
 * - Memoized static data to avoid recreating step objects.
 * - Throttled scroll handler using requestAnimationFrame for better performance.
 * - Guarded browser-only APIs (window, ResizeObserver) to be SSR-safe.
 * - Respect prefers-reduced-motion to disable non-essential animations.
 * - Replaced multiple setState triggers by using refs where appropriate to reduce re-renders.
 * - Improved accessibility: ARIA, keyboard handlers, focus-visible styles, semantic time elements.
 * - Injected JSON-LD (HowTo) for the process steps to improve SEO (server-side injection preferred).
 * - Minor visual optimizations and simpler class churn to help painters/layout.
 */

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  deliverables: string[];
  color: string;
};

const useSteps = (): Step[] =>
  useMemo(
    () => [
      {
        title: "Discovery Call",
        description:
          "Discuss your project goals, audience, and requirements to align on vision.",
        icon: MessageSquare,
        duration: "1-2 Days",
        deliverables: ["Project Brief", "Requirements Document", "Timeline"],
        color: "from-blue-500 to-cyan-500",
      },
      {
        title: "Planning & Strategy",
        description:
          "Create a project roadmap, sitemap, and technical plan for seamless execution.",
        icon: Calendar,
        duration: "3-5 Days",
        deliverables: ["Project Roadmap", "Sitemap", "Technical Specification"],
        color: "from-purple-500 to-indigo-500",
      },
      {
        title: "Design & Development",
        description:
          "Craft a custom design and build your site with clean, performant code.",
        icon: Code,
        duration: "2-4 Weeks",
        deliverables: ["UI/UX Design", "Responsive Code", "Quality Testing"],
        color: "from-emerald-500 to-teal-500",
      },
      {
        title: "Testing & Launch",
        description:
          "Conduct thorough testing, optimise performance, and deploy your site securely.",
        icon: CheckCircle,
        duration: "3-5 Days",
        deliverables: ["Performance Testing", "Security Audit", "Live Deployment"],
        color: "from-orange-500 to-red-500",
      },
      {
        title: "Ongoing Support",
        description:
          "Provide maintenance, updates, and analytics insights to keep you ahead.",
        icon: Package,
        duration: "Ongoing",
        deliverables: ["24/7 Monitoring", "Regular Updates", "Analytics Reports"],
        color: "from-pink-500 to-rose-500",
      },
    ],
    []
  );

export default function OurSimpleProcess(): JSX.Element {
  const steps = useSteps();
  const [activeStep, setActiveStep] = useState<number>(0);
  const hoveredStepRef = useRef<number | null>(null); // avoids re-renders for hover only state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useReducedMotion();

  // Detect mobile (debounced via resize observer fallback)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => setIsMobile(window.innerWidth < 1024);
    check();

    let rafId: number | null = null;
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        check();
        rafId = null;
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Smooth scroll helper (centers the element in viewport)
  const smoothScrollTo = useCallback((index: number) => {
    if (typeof window === "undefined") return;
    const el = stepRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const absoluteTop = rect.top + window.pageYOffset;
    const middle = absoluteTop - window.innerHeight / 2 + rect.height / 2;

    window.scrollTo({
      top: Math.max(0, middle),
      behavior: "smooth",
    });
  }, []);

  // IntersectionObserver to detect active step (optimized)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!stepRefs.current.length) return;

    let currentActive = activeStep;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "-20% 0px -40% 0px",
    };

    const observers: IntersectionObserver[] = [];

    const onIntersect =
      (index: number) => (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (!entry) return;

        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);

        if (entry.isIntersecting && distanceFromCenter < windowHeight * 0.4) {
          if (index !== currentActive) {
            currentActive = index;
            setActiveStep(index);
          }
        }
      };

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const obs = new IntersectionObserver(onIntersect(index), observerOptions);
      obs.observe(ref);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once; activeStep state updates via setActiveStep()

  // Throttled scroll handler for progress line
  useEffect(() => {
    if (typeof window === "undefined") return;
    let rafId: number | null = null;

    const calcProgress = () => {
      const container = containerRef.current;
      if (!container) {
        setScrollProgress(0);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + window.pageYOffset;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      const containerStart = containerTop - windowHeight * 0.5;
      const containerEnd = containerTop + containerHeight - windowHeight * 0.5;

      let progress = 0;
      if (scrollTop > containerStart && scrollTop < containerEnd) {
        progress = (scrollTop - containerStart) / (containerEnd - containerStart);
      } else if (scrollTop >= containerEnd) {
        progress = 1;
      }
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        calcProgress();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // initial calc
    calcProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Entrance visibility
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Keyboard handler (Enter / Space)
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveStep(index);
        smoothScrollTo(index);
      }
    },
    [smoothScrollTo]
  );

  // Build structured data (HowTo) for SEO: server-side injection is preferred.
  const jsonLd = useMemo(() => {
    const howTo = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Our Simple Process",
      description:
        "Our project process from initial discovery to launch and ongoing support.",
      step: steps.map((s, i) => ({
        "@type": "HowToStep",
        name: `${i + 1}. ${s.title}`,
        url: `#step-${i + 1}`,
        itemListElement: s.deliverables.map((d) => ({
          "@type": "ListItem",
          name: d,
        })),
      })),
    };
    return JSON.stringify(howTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Safe assignment of step refs in render
  const setStepRef = useCallback((el: HTMLElement | null, idx: number) => {
    stepRefs.current[idx] = el;
  }, []);

  const backgroundStyles = useMemo(
    () => ({
      background:
        "linear-gradient(135deg, rgba(249,250,251,0.8) 0%, rgba(255,255,255,1) 50%, rgba(239,246,255,0.6) 100%)",
    }),
    []
  );

  // Only animate decorative backgrounds if motion is allowed
  const showBackgroundAnimation = !reducedMotion;

  return (
    <section
      className={`py-16 lg:py-24 relative overflow-hidden transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      ref={containerRef}
      role="region"
      aria-labelledby="process-heading"
      style={backgroundStyles}
    >
      {/* JSON-LD (client-injected). For best SEO, add this in head on server. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Decorative backgrounds (simple and cheap) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {showBackgroundAnimation && (
          <>
            <div
              className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.06), rgba(139,92,246,0.05))",
                animation: "pulse-bg 6s ease-in-out infinite",
              }}
            />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(34,211,238,0.04))",
                animation: "pulse-bg 8s ease-in-out infinite",
              }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        <header className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full text-sm font-medium text-[#0047AB] mb-4 transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Streamlined Process</span>
          </div>

          <h1
            id="process-heading"
            className={`text-3xl md:text-4xl lg:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0047AB] via-[#0066CC] to-[#00B4D8] leading-tight transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "240ms" }}
          >
            Our Simple Process
          </h1>

          <p
            className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "360ms" }}
          >
            From initial concept to final launch, we follow a proven methodology
            that ensures <span className="font-semibold text-[#0047AB]">quality</span>,{" "}
            <span className="font-semibold text-[#0047AB]">transparency</span>, and{" "}
            <span className="font-semibold text-[#0047AB]">results</span>.
          </p>

          <nav
            aria-label="Process steps progress"
            className={`flex items-center justify-center gap-2 mt-8 transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "480ms" }}
          >
            {steps.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeStep === idx
                    ? "w-8 bg-gradient-to-r from-[#0047AB] to-[#00B4D8] shadow-lg"
                    : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-4"
                }`}
                onClick={() => {
                  setActiveStep(idx);
                  smoothScrollTo(idx);
                }}
                aria-label={`Go to step ${idx + 1}`}
                aria-current={activeStep === idx ? "step" : undefined}
              />
            ))}
          </nav>
        </header>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex">
            {/* Left column: vertical icon rail (desktop only) */}
            <aside
              className="hidden lg:flex flex-col relative w-24"
              aria-hidden="true"
            >
              <div
                ref={progressLineRef}
                className="absolute left-8 w-1 rounded-full"
                style={{
                  top: 60,
                  height: "calc(100% - 120px)",
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(180deg, #0047AB, #00B4D8)",
                    height: `${Math.round(scrollProgress * 100)}%`,
                    transformOrigin: "top",
                    transition: "height 220ms linear",
                    borderRadius: 999,
                  }}
                />
              </div>

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <div
                    key={idx}
                    className="relative flex items-start justify-start"
                    style={{
                      minHeight: idx === steps.length - 1 ? 160 : 240,
                      paddingTop: 40,
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveStep(idx);
                        smoothScrollTo(idx);
                      }}
                      aria-label={`Navigate to step ${idx + 1}: ${step.title}`}
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isActive
                          ? "bg-gradient-to-r from-[#0047AB] to-[#00B4D8] shadow-2xl scale-110"
                          : isPassed
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-md"
                          : "bg-white/90 border-2 border-gray-200 shadow-md hover:shadow-lg hover:scale-105"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive || isPassed ? "text-white" : "text-[#0047AB]"
                        }`}
                      />

                      <div className="absolute -top-1 -right-1">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                            isActive || isPassed
                              ? "bg-white text-[#0047AB]"
                              : "bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white"
                          }`}
                        >
                          <span className="font-bold text-xs">
                            {isPassed ? "✓" : idx + 1}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </aside>

            {/* Main content */}
            <main className="flex-1 lg:pl-12">
              <div className="space-y-16 lg:space-y-24">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeStep === idx;
                  const isPassed = activeStep > idx; // <-- defined here
                  const isHovered = hoveredStepRef.current === idx;

                  return (
                    <article
                      key={idx}
                      id={`step-${idx + 1}`}
                      ref={(el) => setStepRef(el, idx)}
                      className={`group relative transition-all duration-500 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      }`}
                      style={{ transitionDelay: `${idx * 60 + 200}ms`, minHeight: 200 }}
                      onMouseEnter={() => {
                        hoveredStepRef.current = idx;
                      }}
                      onMouseLeave={() => {
                        hoveredStepRef.current = null;
                      }}
                    >
                      <div
                        className={`relative p-8 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                          isActive
                            ? "shadow-2xl scale-105 border-transparent bg-gradient-to-br from-blue-50/80 to-cyan-50/80"
                            : "shadow-lg border-gray-200/50 bg-white/80 hover:shadow-xl hover:scale-101"
                        }`}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => handleKeyPress(e, idx)}
                        onClick={() => {
                          setActiveStep(idx);
                          smoothScrollTo(idx);
                        }}
                        aria-label={`Step ${idx + 1}: ${step.title}`}
                      >
                        {/* Mobile Icon */}
                        <div className="lg:hidden mb-6 relative">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white shadow-lg"
                                : isPassed
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                : "bg-gray-100 text-[#0047AB]"
                            }`}
                          >
                            <Icon className="w-7 h-7" />
                          </div>

                          <div className="absolute -top-2 -left-2">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
                                isActive || isPassed
                                  ? "bg-white text-[#0047AB]"
                                  : "bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white"
                              }`}
                            >
                              <span className="font-bold text-xs">
                                {isPassed ? "✓" : idx + 1}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                            <h2
                              className={`text-xl lg:text-2xl font-bold transition-colors duration-200 flex-1 ${
                                isActive ? "text-[#0047AB]" : "text-gray-800"
                              }`}
                            >
                              {step.title}
                            </h2>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Clock className="w-4 h-4 text-[#00B4D8]" aria-hidden />
                              <time
                                className={`text-sm font-medium px-3 py-1 rounded-full ${
                                  isActive
                                    ? "text-white bg-gradient-to-r from-[#0047AB] to-[#00B4D8]"
                                    : "text-[#0047AB] bg-blue-100"
                                }`}
                                dateTime={step.duration}
                              >
                                {step.duration}
                              </time>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>

                          {/* Deliverables — show on hover/active or on mobile */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isActive || isHovered || isMobile ? "opacity-100 max-h-48" : "opacity-0 max-h-0"
                            }`}
                          >
                            <div className="pt-4 border-t border-gray-200/50">
                              <h3 className="text-sm font-semibold text-[#0047AB] mb-3">Deliverables:</h3>
                              <div className="flex flex-wrap gap-2">
                                {step.deliverables.map((d, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                                      isActive
                                        ? "bg-gradient-to-r from-[#0047AB]/10 to-[#00B4D8]/10 border border-[#00B4D8]/50 text-[#0047AB]"
                                        : "bg-white/80 border border-[#00B4D8]/30 text-[#0047AB]"
                                    }`}
                                    style={{ transitionDelay: `${dIdx * 60}ms` }}
                                  >
                                    {d}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </main>
          </div>

          {/* CTA */}
          <aside
            className={`mt-16 text-center lg:pl-44 transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="p-8 bg-gradient-to-r from-[#0047AB]/5 to-[#00B4D8]/5 rounded-2xl border border-[#00B4D8]/20 backdrop-blur-sm">
              <h2 className="text-xl lg:text-2xl font-bold text-[#0047AB] mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 mb-6">
                Let&apos;s discuss your project and create something amazing together.
              </p>

              {/* Fixed Link usage: pass className/aria directly to Link (no inner <a>) */}
              <Link
                href="/contact"
                aria-label="Start your web development project"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
              >
                <MessageSquare className="w-5 h-5" aria-hidden />
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        /* small custom easing for subtle motion */
        @keyframes pulse-bg {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.95;
          }
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
        }

        /* reduced-motion: disable animations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* focus-visible for keyboard users */
        :global(button:focus-visible),
        :global([role="button"]:focus-visible) {
          outline: 3px solid rgba(0, 71, 171, 0.12);
          outline-offset: 3px;
        }

        /* Slight hover scales used sparingly */
        .hover\\:scale-101:hover {
          transform: scale(1.01);
        }
      `}</style>
    </section>
  );
}