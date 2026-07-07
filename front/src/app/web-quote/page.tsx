"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import {
  Code,
  Smartphone,
  Palette,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Zap,
  Shield,
  Target,
  Send,
  MessageCircle,
  DollarSign,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LineChart,
  Users,
  User,
  Layers,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { projects } from "../projects/portfolioData";
import { Project } from "../projects/schema";

interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  tagline: string;
  features: string[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  budget: string;
  message: string;
}

interface PortfolioItem {
  title: string;
  category: string;
  imageSrc: string;
  alt: string;
  description?: string;
  link?: string;
}

interface Review {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
  result: string;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: LucideIcon;
  budgetMatch: string;
  features: string[];
  featured?: boolean;
}

// TODO: replace this with your real Google Business Profile review link
// (Google Business Profile → Get more reviews → copy the short link, or use
// https://g.page/r/XXXXXXXXXXXXXXXX/review once you have your Place ID).
// The search URL below works right away and will surface your profile in
// Google's results, but a direct GBP link is a smoother experience.
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Viorix+reviews";

/* ─── tiny animated number ─── */
function AnimNum({
  target,
  suffix = "",
  run = false,
}: {
  target: number;
  suffix?: string;
  run?: boolean;
}) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!run) return;

    const t0 = performance.now();
    const dur = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [run, target]);

  return (
    <>
      {v}
      {suffix}
    </>
  );
}

/* ─── reviews slider ─── */
function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % reviews.length);
    }, 6500);
  }, [clearTimer, reviews.length]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  const go = (newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + reviews.length) % reviews.length);
    startTimer();
  };

  const next = () => go(index + 1, 1);
  const prev = () => go(index - 1, -1);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  };

  const r = reviews[index];

  return (
    <div className="slider-wrap">
      <div className="slider-track">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) next();
              else if (info.offset.x > 70) prev();
            }}
            className="review-card"
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} style={{ width: 14, height: 14, fill: "#facc15", color: "#facc15" }} aria-hidden />
                ))}
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--blue)",
                  border: "1px solid rgba(0,191,255,.22)",
                  background: "rgba(0,191,255,.07)",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                {r.result}
              </span>
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.75)",
                margin: "0 0 22px",
                fontStyle: "italic",
                minHeight: 84,
              }}
            >
              &quot;{r.text}&quot;
            </p>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,.06)",
                paddingTop: 18,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#00bfff,#1b365d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                  border: "1px solid rgba(0,191,255,.3)",
                }}
              >
                {r.avatar}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{r.name}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", margin: 0 }}>
                  {r.role}, {r.company}
                </p>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="slider-controls">
        <button aria-label="Previous review" onClick={prev} className="slider-arrow">
          <ChevronLeft style={{ width: 18, height: 18 }} aria-hidden />
        </button>
        <div className="slider-dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to review ${i + 1}`}
              className={`slider-dot${i === index ? " active" : ""}`}
              onClick={() => go(i, i > index ? 1 : -1)}
            />
          ))}
        </div>
        <button aria-label="Next review" onClick={next} className="slider-arrow">
          <ChevronRight style={{ width: 18, height: 18 }} aria-hidden />
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 18 }}>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "rgba(255,255,255,.5)",
            textDecoration: "none",
          }}
        >
          See all our reviews on Google
          <ExternalLink style={{ width: 12, height: 12 }} aria-hidden />
        </a>
      </div>
    </div>
  );
}

const OptimizedLandingPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("web");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showFaq, setShowFaq] = useState<string | null>(null);
  const [statsRun, setStatsRun] = useState(false);

  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [portfolioQuery] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const formRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLElement | null>(null);
  const pricingRef = useRef<HTMLElement | null>(null);

  const isFormInView = useInView(formRef, { once: true });
  const isReviewsInView = useInView(reviewsRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const currentMonthLabel = useMemo(
    () => new Date().toLocaleString("en-GB", { month: "long" }),
    [],
  );

  useEffect(() => {
    if (isStatsInView) setStatsRun(true);
  }, [isStatsInView]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service && ["web", "mobile", "uiux", "marketing"].includes(service)) {
      setSelectedService(service);
    }
  }, []);

  const services: Service[] = [
    {
      id: "web",
      title: "Website Development",
      icon: Code,
      description: "Professional business websites that convert visitors to customers",
      tagline: "Custom Design · Fast Delivery",
      features: [
        "Custom Design",
        "Fast Delivery",
        "SEO Optimisation",
        "Secure Hosting",
        "Professional Support",
        "Easy Content Management",
      ],
    },
    {
      id: "mobile",
      title: "Mobile Apps",
      icon: Smartphone,
      description: "iOS & Android apps that engage users and drive revenue",
      tagline: "Native Performance · Fast Delivery",
      features: [
        "Native Performance",
        "Fast Delivery",
        "iOS & Android",
        "Push Notifications",
        "Professional Support",
        "Cloud Backend",
      ],
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      icon: Palette,
      description: "Beautiful, user-friendly designs that boost conversions",
      tagline: "Custom Design · User-Focused",
      features: [
        "Custom Design",
        "User-Focused Research",
        "Interactive Prototypes",
        "Brand Identity",
        "Professional Support",
        "Design System",
      ],
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      icon: LineChart,
      description: "Growth-focused campaigns that drive leads and sales",
      tagline: "Data-Driven · Fast Results",
      features: [
        "Data-Driven Strategy",
        "Fast Results",
        "SEO & Local SEO",
        "Google & Meta Ads",
        "Professional Support",
        "Monthly Reporting",
      ],
    },
  ];

  const reviews: Review[] = [
    {
      name: "Imad Al Soudani",
      role: "Owner",
      company: "Hope BTC",
      rating: 5,
      text: "Professional website that makes registration easy for new students. Excellent support and dedication throughout.",
      avatar: "IA",
      result: "40% more registrations",
    },
    {
      name: "Hassan Husseini",
      role: "Owner",
      company: "JRS Building",
      rating: 5,
      text: "Modern portfolio that showcases our projects beautifully. The design brings in new clients consistently.",
      avatar: "HH",
      result: "3× more leads monthly",
    },
    {
      name: "Ali Hashem",
      role: "Owner",
      company: "ColdFix",
      rating: 5,
      text: "Clean, SEO-friendly website that represents our services perfectly. We're getting more calls than ever.",
      avatar: "AH",
      result: "Top 3 Google rankings",
    },
    {
      name: "Bader Al Badri",
      role: "Owner",
      company: "360 Drive Academy",
      rating: 5,
      text: "Sleek website for our driving school. Students book lessons online effortlessly now. A genuine game-changer.",
      avatar: "BB",
      result: "60% faster bookings",
    },
  ];

  const faqs = [
    {
      q: "How long does a website take to build?",
      a: "Most websites are completed in 2–4 weeks. We'll give you an exact timeline during your free consultation based on your requirements.",
    },
    {
      q: "Do you offer payment plans?",
      a: "Yes — 50% upfront, 50% on completion. For larger projects we can arrange monthly instalments. We want the process to feel comfortable.",
    },
    {
      q: "Will I be able to update the content myself?",
      a: "Absolutely. We build with easy-to-use CMS tools and provide training so you're fully in control from day one.",
    },
    {
      q: "What if I'm not happy with the result?",
      a: "We offer unlimited revisions until you're 100% satisfied — and a 14-day money-back guarantee if we ever fall short.",
    },
    {
      q: "Do you handle hosting and maintenance?",
      a: "Yes. All packages include secure hosting for the first year. Affordable maintenance plans are available to keep everything running smoothly.",
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      id: "basic",
      name: "Basic",
      description:
        "Ideal for small businesses or personal projects. Get a professional online presence with a clean, responsive website.",
      price: "£500",
      icon: Code,
      budgetMatch: "£500 - £1,000",
      features: [
        "1–5 Page Website",
        "Custom Design Tailored to Your Brand",
        "Responsive Layout for Mobile & Desktop",
        "Basic SEO to Boost Visibility",
        "Fast Loading & Optimised Performance",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      description:
        "Perfect for growing businesses. Includes advanced design, SEO, and CMS integration for easy content management.",
      price: "£1,500",
      icon: Zap,
      budgetMatch: "£1,000 - £2,500",
      featured: true,
      features: [
        "5–10 Page Website",
        "Custom Design with Modern UI/UX",
        "Responsive Layout for All Devices",
        "SEO Optimisation for Better Search Ranking",
        "CMS Integration for Easy Content Management",
        "Contact Forms & Lead Capture",
      ],
    },
    {
      id: "ecommerce",
      name: "E-commerce & CMS",
      description:
        "Comprehensive e-commerce solution with full CMS integration. Perfect for businesses looking to sell products online effectively.",
      price: "£2,500",
      icon: ShoppingCart,
      budgetMatch: "£2,500 - £5,000",
      features: [
        "Unlimited Pages",
        "Custom Design with Professional Branding",
        "Responsive Layout for All Devices",
        "CMS & E-commerce Setup",
        "Payment Gateway Integration",
        "Product Catalog & Inventory Management",
        "Advanced SEO & Marketing Tools",
      ],
    },
  ];

  const budgetOptions = [
    "£500 - £1,000",
    "£1,000 - £2,500",
    "£2,500 - £5,000",
    "£5,000 - £10,000",
    "£10,000+",
  ];

  const portfolioItems: PortfolioItem[] = useMemo(() => {
    return projects.map((p: Project) => {
      const resolvedImage =
        typeof p.image === "string" && p.image.length > 0
          ? p.image
          : Array.isArray(p.images) && p.images.length > 0
          ? p.images[0]
          : "/images/placeholder.png";

      return {
        title: p.title || "Untitled Project",
        category: (p.category || "Websites").replace(/Webistes/gi, "Websites"),
        imageSrc: resolvedImage.startsWith("/") ? resolvedImage : resolvedImage,
        alt: p.alt || `${p.title || "Project"} screenshot`,
        description: p.description || p.longDescription || "",
        link: p.liveUrl || p.link || "",
      };
    });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(portfolioItems.map((p) => p.category)));
    return ["All", ...cats];
  }, [portfolioItems]);

  const filteredPortfolio = useMemo(
    () =>
      portfolioItems.filter((item) => {
        const matchesCat = portfolioFilter === "All" || item.category === portfolioFilter;
        const matchesQ =
          portfolioQuery.trim() === "" ||
          item.title.toLowerCase().includes(portfolioQuery.toLowerCase()) ||
          (item.description || "").toLowerCase().includes(portfolioQuery.toLowerCase());
        return matchesCat && matchesQ;
      }),
    [portfolioItems, portfolioFilter, portfolioQuery],
  );

  const closeModal = useCallback(() => {
    setActiveModalIndex(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (!filteredPortfolio.length) return;

      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") {
        setActiveModalIndex((p) => (p === null ? null : (p + 1) % filteredPortfolio.length));
      } else if (e.key === "ArrowLeft") {
        setActiveModalIndex((p) =>
          p === null ? null : (p - 1 + filteredPortfolio.length) % filteredPortfolio.length,
        );
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [activeModalIndex, filteredPortfolio.length, closeModal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      budget: formData.budget || "Not specified",
      message: formData.message || "No additional details",
      selectedService: services.find((s) => s.id === selectedService)?.title ?? "Unknown service",
      submittedAt: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        "service_c73djix",
        "template_rl3gq4l",
        templateParams,
        "_-PS7ydJYxLOybs71",
      );
      setSubmitSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({ name: "", email: "", phone: "", budget: "", message: "" });
      }, 8000);
    } catch {
      setIsSubmitting(false);
      alert("We couldn't send your request. Please call us directly at +44 7464 485 026");
    }
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToPortfolio = () =>
    portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToPricing = () =>
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const selectPackage = (tier: PricingTier) => {
    setFormData((prev) => ({
      ...prev,
      budget: tier.budgetMatch,
      message: prev.message || `I'm interested in the ${tier.name} package.`,
    }));
    scrollToForm();
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);

  return (
    <>
      <style>{`
        .lp {
          --bg: #0d1c30;
          --blue: #00bfff;
          --navy: #1b365d;
          --border: rgba(0,191,255,.13);
          --bh: rgba(0,191,255,.4);
          --glass: rgba(0,191,255,.05);
          --muted: rgba(255,255,255,.55);
          font-family: Inter, "DM Sans", system-ui, -apple-system, sans-serif;
        }
        .lp-hero{background:linear-gradient(180deg,#1a3559 0%,var(--bg) 100%);}
        .lp-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,191,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,191,255,.07) 1px,transparent 1px);background-size:48px 48px;opacity:.3;pointer-events:none;}
        .lp-vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 70% 20%,rgba(30,130,230,.28) 0%,transparent 55%),radial-gradient(ellipse at 50% 60%,transparent 45%,rgba(8,14,26,.32) 100%);}
        .lp-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px);}
        .lp-orb-a{width:520px;height:520px;top:-100px;right:-120px;background:rgba(30,150,255,.22);animation:orbA 20s ease-in-out infinite alternate;}
        .lp-orb-b{width:380px;height:380px;bottom:-60px;left:-80px;background:rgba(0,191,255,.13);animation:orbB 25s ease-in-out infinite alternate;}
        @keyframes orbA{0%{transform:translate(0,0) scale(1);}100%{transform:translate(-40px,40px) scale(1.1);}}
        @keyframes orbB{0%{transform:translate(0,0) scale(1);}100%{transform:translate(50px,-30px) scale(1.08);}}
        .svc-tab{border:1px solid var(--border);background:rgba(255,255,255,.04);color:rgba(255,255,255,.6);border-radius:10px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .22s,background .22s,color .22s;display:flex;align-items:center;gap:7px;}
        .svc-tab.active{border-color:var(--blue);background:rgba(0,191,255,.1);color:#fff;}
        .svc-tab:hover:not(.active){border-color:rgba(0,191,255,.3);background:rgba(0,191,255,.06);color:#fff;}
        .feat-chip{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:9px;padding:9px 12px;font-size:13px;color:rgba(255,255,255,.8);}
        .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--blue);color:#050a13;font-size:14px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:14px 26px;border-radius:12px;text-decoration:none;position:relative;overflow:hidden;transition:transform .18s ease,box-shadow .18s ease,background .18s ease;border:none;cursor:pointer;box-shadow:0 8px 20px -8px rgba(0,191,255,.55);}
        .btn-primary:hover{transform:translateY(-2px);background:#33ccff;box-shadow:0 12px 26px -8px rgba(0,191,255,.65);}
        .btn-primary:active{transform:translateY(0);}
        .btn-primary-pulse{animation:ctaPulse 2.6s ease-in-out infinite;}
        @keyframes ctaPulse{0%,100%{box-shadow:0 8px 20px -8px rgba(0,191,255,.55),0 0 0 0 rgba(0,191,255,.35);}50%{box-shadow:0 8px 20px -8px rgba(0,191,255,.55),0 0 0 8px rgba(0,191,255,0);}}
        .btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1.5px solid rgba(255,255,255,.3);color:rgba(255,255,255,.85);font-size:14px;font-weight:700;padding:14px 26px;border-radius:12px;text-decoration:none;transition:border-color .2s ease,background .2s ease,color .2s ease;background:transparent;}
        .btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.08);color:#fff;}
        .btn-primary:focus-visible,.btn-ghost:focus-visible,.svc-tab:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid #6ddcff;outline-offset:2px;}
        .stat-card{border:1px solid var(--border);background:linear-gradient(145deg,rgba(12,22,38,.9),rgba(8,14,26,.95));border-radius:14px;padding:18px 12px;text-align:center;transition:border-color .25s,transform .28s cubic-bezier(.22,1,.36,1);}
        .stat-card:hover{border-color:var(--bh);transform:translateY(-3px);}
        .stat-num{font-size:clamp(24px,4vw,44px);font-weight:800;letter-spacing:-.03em;background:linear-gradient(110deg,#fff,rgba(255,255,255,.7));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .stat-suf{background:linear-gradient(110deg,var(--blue),#6ddcff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

        /* ─── form: stronger border + white copy ─── */
        .form-card{background:linear-gradient(145deg,rgba(14,26,44,.98),rgba(8,14,26,1));border:2px solid rgba(0,191,255,.55);border-radius:18px;padding:24px 18px;box-shadow:0 0 0 1px rgba(0,191,255,.1),inset 0 1px 0 rgba(255,255,255,.05),0 30px 60px -30px rgba(0,0,0,.7);}
        .form-input{width:100%;padding:13px 16px;border:1.5px solid rgba(255,255,255,.28);border-radius:11px;background:rgba(255,255,255,.06);color:#fff;font-size:16px;transition:border-color .22s,background .22s,box-shadow .22s;outline:none;font-family:inherit;}
        .form-input:hover{border-color:rgba(255,255,255,.4);}
        .form-input:focus{border-color:var(--blue);background:rgba(0,191,255,.08);box-shadow:0 0 0 3px rgba(0,191,255,.18);}
        .form-input::placeholder{color:rgba(255,255,255,.42);}
        .form-label{display:block;font-size:12.5px;font-weight:700;color:#fff;margin-bottom:7px;letter-spacing:.06em;text-transform:uppercase;}
        select.form-input option{background:#0f1c30;color:#fff;}
        .form-section-label{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--blue);margin-bottom:16px;}
        .form-section-label:not(:first-child){margin-top:6px;padding-top:22px;border-top:1px solid rgba(255,255,255,.1);}
        .input-icon-wrap{position:relative;}
        .input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:rgba(255,255,255,.5);pointer-events:none;transition:color .2s;}
        .input-icon-wrap:focus-within .input-icon{color:var(--blue);}
        .form-input.has-icon{padding-left:42px;}
        .budget-pills{display:flex;flex-wrap:wrap;gap:8px;}
        .budget-pill{border:1.5px solid rgba(255,255,255,.22);background:rgba(255,255,255,.05);color:#fff;border-radius:999px;padding:8px 15px;font-size:12.5px;font-weight:600;cursor:pointer;transition:border-color .2s,background .2s,color .2s;}
        .budget-pill:hover{border-color:rgba(0,191,255,.5);background:rgba(0,191,255,.1);}
        .budget-pill.active{border-color:var(--blue);background:rgba(0,191,255,.2);color:#fff;}
        .form-helper{font-size:12px;color:rgba(255,255,255,.55);}

        .port-card{background:linear-gradient(145deg,rgba(12,22,38,.9),rgba(8,14,26,.95));border:1px solid var(--border);border-radius:18px;overflow:hidden;transition:border-color .25s,transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;}
        .port-card:hover{border-color:var(--bh);transform:translateY(-5px);box-shadow:0 20px 48px rgba(0,0,0,.6);}
        .review-card{background:linear-gradient(145deg,rgba(12,22,38,.9),rgba(8,14,26,.95));border:1px solid var(--border);border-radius:18px;padding:28px;transition:border-color .25s,transform .3s cubic-bezier(.22,1,.36,1);}
        .review-card:hover{border-color:var(--bh);transform:translateY(-4px);}
        .google-rev-card{transition:border-color .22s,background .22s,transform .22s;}
        .google-rev-card:hover{border-color:var(--bh);background:rgba(0,191,255,.06);transform:translateY(-2px);}
        .review-card::before{content:'"';position:absolute;top:8px;right:20px;font-size:88px;line-height:1;color:rgba(0,191,255,.05);font-family:Georgia,serif;pointer-events:none;}
        .faq-item{background:linear-gradient(145deg,rgba(12,22,38,.9),rgba(8,14,26,.95));border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:border-color .22s;}
        .faq-item:hover{border-color:rgba(0,191,255,.28);}
        .faq-item.open{border-color:rgba(0,191,255,.35);}
        .val-card{background:linear-gradient(145deg,rgba(12,22,38,.9),rgba(8,14,26,.95));border:1px solid var(--border);border-radius:18px;padding:28px;transition:border-color .25s,transform .3s cubic-bezier(.22,1,.36,1);}
        .val-card:hover{border-color:var(--bh);transform:translateY(-4px);}
        .val-ico{width:52px;height:52px;border-radius:14px;border:1px solid rgba(0,191,255,.2);background:rgba(0,191,255,.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;transition:background .25s;}
        .val-card:hover .val-ico{background:rgba(0,191,255,.15);}
        .guar-card{background:linear-gradient(145deg,rgba(12,22,38,.95),rgba(8,14,26,.98));border:1px solid rgba(0,191,255,.18);border-radius:20px;padding:26px 20px;}

        /* ─── pricing: simplified, cleaner cards ─── */
        .price-card{position:relative;display:flex;flex-direction:column;background:rgba(13,24,41,.92);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:28px 24px 24px;transition:border-color .22s ease,transform .22s ease;}
        .price-card:hover{border-color:rgba(0,191,255,.45);transform:translateY(-3px);}
        .price-card.featured{border-color:rgba(0,191,255,.6);background:rgba(15,32,54,.96);}
        .price-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--blue);color:#04101d;font-size:10.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:6px 16px;border-radius:999px;white-space:nowrap;z-index:2;}
        .price-icon-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
        .price-name{font-size:19px;font-weight:800;margin:0 0 8px;color:#fff;}
        .price-desc{font-size:13px;color:rgba(255,255,255,.55);line-height:1.6;margin:0 0 22px;}
        .price-amount-row{display:flex;align-items:baseline;gap:6px;margin-bottom:24px;padding-bottom:22px;border-bottom:1px solid rgba(255,255,255,.1);}
        .price-from{font-size:12px;color:rgba(255,255,255,.45);}
        .price-amount{font-size:32px;font-weight:800;letter-spacing:-.02em;color:#fff;}
        .price-feature{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;color:rgba(255,255,255,.8);line-height:1.5;}
        .pricing-grid{display:grid;grid-template-columns:1fr;gap:20px;}
        @media(min-width:900px){
          .pricing-grid{grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch;}
        }
        .cta-block{position:relative;border-radius:24px;padding:40px 20px;text-align:center;overflow:hidden;border:1px solid rgba(0,191,255,.2);background:linear-gradient(135deg,rgba(0,80,170,.18) 0%,rgba(0,40,100,.14) 50%,rgba(0,191,255,.07) 100%);}
        .cta-scanline{position:absolute;top:-2px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,191,255,.6),transparent);animation:scan 4s linear infinite;pointer-events:none;}
        @keyframes scan{0%{top:-2px;opacity:0;}5%{opacity:1;}95%{opacity:1;}100%{top:100%;opacity:0;}}
        .sticky-bar{position:fixed;bottom:0;left:0;right:0;padding:10px 16px calc(10px + env(safe-area-inset-bottom));background:rgba(10,20,36,.96);border-top:1px solid var(--border);backdrop-filter:blur(12px);z-index:50;}

        /* ─── layout: mobile-first, progressively enhanced ─── */
        .hero-inner{padding:44px 20px 48px;}
        .hero-layout{display:grid;grid-template-columns:1fr;gap:28px;align-items:start;}
        .hero-sidebar{display:none;}
        .hero-mobile-trust{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:18px 0 0;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:rgba(0,191,255,.05);}
        .hero-cta-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center;}
        .lp-section{padding:52px 0;}
        .lp-section-cta{padding:52px 20px;}
        .stats-section{padding:28px 0;}
        .stats-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}
        .form-grid-2{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:16px;}
        .slider-wrap{max-width:640px;margin:0 auto;}
        .slider-track{position:relative;}
        .review-card{position:relative;}
        .slider-controls{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:22px;}
        .slider-arrow{width:38px;height:38px;border-radius:50%;border:1px solid var(--border);background:rgba(255,255,255,.04);color:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s,background .2s,color .2s,transform .2s;flex-shrink:0;}
        .slider-arrow:hover{border-color:var(--bh);background:rgba(0,191,255,.1);color:#fff;transform:translateY(-1px);}
        .slider-dots{display:flex;align-items:center;gap:7px;}
        .slider-dot{width:7px;height:7px;border-radius:50%;border:none;padding:0;background:rgba(255,255,255,.18);cursor:pointer;transition:background .2s,width .2s,border-radius .2s;}
        .slider-dot.active{width:20px;border-radius:4px;background:var(--blue);}
        .guar-grid{display:grid;grid-template-columns:1fr;gap:14px;}
        .values-grid{display:grid;grid-template-columns:1fr;gap:16px;}

        @media(min-width:480px){
          .hero-cta-row{flex-wrap:wrap;}
        }
        @media(max-width:480px){
          .hero-cta-row{flex-direction:column;align-items:stretch;}
          .hero-cta-row .btn-primary,.hero-cta-row .btn-ghost{width:100%;}
        }
        @media(max-width:640px){
          .lp-orb{display:none;}
        }
        @media(min-width:560px){
          .form-grid-2{grid-template-columns:1fr 1fr;}
        }
        @media(min-width:640px){
          .guar-card{padding:40px;}
          .cta-block{padding:64px 44px;}
          .stats-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;}
          .guar-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;}
          .values-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;}
        }
        @media(min-width:768px){
          .form-card{padding:44px;}
          .lp-section{padding:80px 0;}
          .lp-section-cta{padding:80px 24px;}
          .stats-section{padding:52px 0;}
        }
        @media(min-width:1024px){
          .hero-inner{padding:64px 24px 72px;}
          .hero-layout{grid-template-columns:1fr 300px;gap:48px 64px;}
          .hero-sidebar{display:block;}
          .hero-mobile-trust{display:none;}
        }
        @media(prefers-reduced-motion:reduce){.lp *{animation:none!important;transition:none!important;}}
      `}</style>

      <div className="lp min-h-screen" style={{ background: "var(--bg)", color: "#fff" }}>
        <header className="lp-hero" style={{ position: "relative", overflow: "hidden", paddingBottom: "0" }}>
          <div className="lp-grid" aria-hidden />
          <div className="lp-vig" aria-hidden />
          <div className="lp-orb lp-orb-a" aria-hidden />
          <div className="lp-orb lp-orb-b" aria-hidden />

          <div
            className="hero-inner"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1240,
              margin: "0 auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,191,255,.2)",
                  background: "rgba(0,191,255,.06)",
                  fontSize: 11,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--blue)",
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                London Web Agency · UK
              </div>

              <div className="hero-layout">
                <div>
                  <h1
                    style={{
                      fontSize: "clamp(36px,5.5vw,72px)",
                      fontWeight: 800,
                      letterSpacing: "-.035em",
                      lineHeight: 1,
                      margin: "0 0 20px",
                    }}
                  >
                    {selectedServiceData?.title}
                    <span
                      style={{
                        display: "block",
                        background: "linear-gradient(110deg,#00bfff 0%,#6ddcff 45%,#0099cc 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontSize: "clamp(16px,2vw,24px)",
                        fontWeight: 700,
                        letterSpacing: "-.01em",
                        marginTop: 8,
                      }}
                    >
                      {selectedServiceData?.tagline}
                    </span>
                  </h1>

                  <p
                    style={{
                      fontSize: 17,
                      color: "rgba(255,255,255,.86)",
                      lineHeight: 1.7,
                      maxWidth: "56ch",
                      marginBottom: 28,
                      textShadow: "0 2px 16px rgba(4,10,20,.55)",
                    }}
                  >
                    {selectedServiceData?.description} — trusted by growing UK businesses, with
                    every project backed by a satisfaction guarantee.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
                    {selectedServiceData?.features.slice(0, 4).map((f) => (
                      <div key={f} className="feat-chip">
                        <CheckCircle
                          style={{ width: 13, height: 13, color: "var(--blue)", flexShrink: 0 }}
                          aria-hidden
                        />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="hero-cta-row">
                    <button onClick={scrollToForm} className="btn-primary btn-primary-pulse">
                      Get a Free Quote
                      <ArrowRight style={{ width: 15, height: 15 }} aria-hidden />
                    </button>
                    <button onClick={scrollToPortfolio} className="btn-ghost">
                      <Layers style={{ width: 15, height: 15 }} aria-hidden />
                      Discover Our Projects
                    </button>
                    <a href="tel:+447464485026" className="btn-ghost">
                      <Phone style={{ width: 15, height: 15 }} aria-hidden />
                      Call Us
                    </a>
                  </div>

                  <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", marginTop: 16 }}>
                    No commitment · Response within 2 hours · Free consultation included
                  </p>

                  <button
                    onClick={scrollToPricing}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 12,
                      padding: 0,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--blue)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    <DollarSign style={{ width: 14, height: 14 }} aria-hidden />
                    View pricing &amp; packages
                  </button>

                  <div className="hero-mobile-trust">
                    <div style={{ display: "flex", gap: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          style={{ width: 13, height: 13, fill: "#facc15", color: "#facc15" }}
                          aria-hidden
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>5.0</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
                      · Verified reviews · 2-hour response
                    </span>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      marginTop: 14,
                      padding: "8px 14px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,191,255,.25)",
                      background: "rgba(0,191,255,.07)",
                    }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.75)" }}>
                      Now booking new projects for {currentMonthLabel}
                    </span>
                  </div>
                </div>

                <div
                  className="hero-sidebar"
                  style={{
                    border: "1px solid rgba(0,191,255,.15)",
                    background: "rgba(12,22,38,.85)",
                    borderRadius: 18,
                    padding: 24,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google-rev-card"
                    style={{
                      display: "block",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.09)",
                      borderRadius: 14,
                      padding: "16px 16px 15px",
                      marginBottom: 14,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,.5)",
                        }}
                      >
                        Google Reviews
                      </span>
                      <ExternalLink style={{ width: 13, height: 13, color: "rgba(255,255,255,.4)" }} aria-hidden />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 26, fontWeight: 800, lineHeight: 1 }}>5.0</span>
                      <div style={{ display: "flex", gap: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            style={{ width: 16, height: 16, fill: "#facc15", color: "#facc15" }}
                            aria-hidden
                          />
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", margin: 0, lineHeight: 1.5 }}>
                      Read verified client reviews on our Google Business Profile.
                    </p>
                  </a>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                    {[
                      ["2 hours", "Response time"],
                      ["100%", "On-time delivery"],
                    ].map(([n, l]) => (
                      <div
                        key={l}
                        style={{
                          background: "rgba(255,255,255,.04)",
                          borderRadius: 10,
                          padding: "12px",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 20,
                            fontWeight: 800,
                            margin: 0,
                            background: "linear-gradient(110deg,#00bfff,#6ddcff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {n}
                        </p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", margin: 0 }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 44 }}>
                {services.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`svc-tab${selectedService === s.id ? " active" : ""}`}
                    >
                      <Icon style={{ width: 15, height: 15 }} aria-hidden />
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </header>

        <section
          ref={statsRef}
          className="stats-section"
          style={{
            position: "relative",
            borderTop: "1px solid rgba(0,191,255,.08)",
            borderBottom: "1px solid rgba(0,191,255,.08)",
          }}
        >
          <div className="lp-grid" style={{ opacity: 0.15 }} aria-hidden />
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div className="stats-grid">
              {[
                { n: 40, suf: "+", label: "Projects Delivered", sub: "London & UK" },
                { n: 99, suf: "%", label: "On-Time Delivery", sub: "Every project" },
                { n: 100, suf: "%", label: "Client Satisfaction", sub: "Would recommend us" },
                { n: 5, suf: ".0 ★", label: "Average Rating", sub: "Verified reviews" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="stat-card"
                >
                  <div className="stat-num">
                    <AnimNum target={s.n} suffix="" run={statsRun} />
                    <span className="stat-suf">{s.suf}</span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,.7)",
                      margin: "8px 0 2px",
                    }}
                  >
                    {s.label}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", margin: 0 }}>{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={pricingRef} className="lp-section" style={{ borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2
                style={{
                  fontSize: "clamp(24px,3vw,38px)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  margin: "0 0 10px",
                }}
              >
                Choose Your Website Package
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", maxWidth: "56ch", margin: "0 auto" }}>
                Transparent pricing with all-inclusive website design, development, and hosting.
              </p>
            </div>

            <div className="pricing-grid">
              {pricingTiers.map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className={`price-card${tier.featured ? " featured" : ""}`}
                  >
                    {tier.featured && <span className="price-badge">Most Popular</span>}
                    <div className="price-icon-row">
                      <div className="val-ico" style={{ margin: 0 }}>
                        <Icon style={{ width: 20, height: 20, color: "var(--blue)" }} aria-hidden />
                      </div>
                    </div>
                    <h3 className="price-name">{tier.name}</h3>
                    <p className="price-desc">{tier.description}</p>
                    <div className="price-amount-row">
                      <span className="price-from">Starting from</span>
                      <span className="price-amount">{tier.price}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 26, flex: 1 }}>
                      {tier.features.map((f) => (
                        <div key={f} className="price-feature">
                          <CheckCircle style={{ width: 14, height: 14, color: "var(--blue)", flexShrink: 0, marginTop: 2 }} aria-hidden />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => selectPackage(tier)}
                      className={tier.featured ? "btn-primary" : "btn-ghost"}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Get Started
                      <ArrowRight style={{ width: 14, height: 14 }} aria-hidden />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,.32)", marginTop: 28 }}>
              Not sure which package fits? Pick any option — we&apos;ll confirm the right scope during your free consultation.
            </p>
          </div>
        </section>

        <section className="lp-section">
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
            <div ref={formRef} style={{ textAlign: "center", marginBottom: 40 }}>
              <h2
                style={{
                  fontSize: "clamp(26px,3.5vw,42px)",
                  fontWeight: 800,
                  letterSpacing: "-.03em",
                  margin: "0 0 12px",
                }}
              >
                Tell us about your project
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", margin: 0 }}>
                We&apos;ll come back to you within 2 hours with a tailored quote — no pressure, no
                obligation.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="form-card">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "16px 0" }}
                  >
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        background: "rgba(0,191,255,.1)",
                        border: "1px solid rgba(0,191,255,.3)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                      }}
                    >
                      <CheckCircle style={{ width: 32, height: 32, color: "var(--blue)" }} />
                    </div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>
                      We&apos;ve got your request
                    </h3>
                    <p style={{ color: "rgba(255,255,255,.65)", marginBottom: 28 }}>
                      Expect a reply within 2 hours. In the meantime, feel free to explore our work
                      below.
                    </p>
                    <div
                      style={{
                        background: "rgba(255,255,255,.05)",
                        border: "1px solid rgba(255,255,255,.14)",
                        borderRadius: 14,
                        padding: 20,
                        textAlign: "left",
                        marginBottom: 24,
                      }}
                    >
                      <p style={{ fontWeight: 700, margin: "0 0 10px" }}>What happens next</p>
                      {[
                        "We review your requirements",
                        "You receive a detailed quote by email",
                        "We schedule a free consultation call",
                      ].map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 6,
                              background: "rgba(0,191,255,.1)",
                              border: "1px solid rgba(0,191,255,.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              fontWeight: 700,
                              color: "var(--blue)",
                              flexShrink: 0,
                            }}
                          >
                            {i + 1}
                          </div>
                          <p style={{ fontSize: 13, color: "rgba(255,255,255,.75)", margin: 0 }}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                    <a
                      href="tel:+447464485026"
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <Phone style={{ width: 15, height: 15 }} aria-hidden />
                      Call +44 7464 485 026
                    </a>
                    <p className="form-helper" style={{ marginTop: 16, textAlign: "center" }}>
                      ICO registered:{" "}
                      <a
                        href="https://ico.org.uk/ESDWebPages/Entry/ZC026034"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(255,255,255,.75)" }}
                      >
                        ZC026034
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-section-label">
                      <User style={{ width: 13, height: 13 }} aria-hidden />
                      Your Details
                    </div>
                    <div className="form-grid-2">
                      <div>
                        <label className="form-label">Your Name *</label>
                        <div className="input-icon-wrap">
                          <User className="input-icon" aria-hidden />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            autoComplete="name"
                            className="form-input has-icon"
                            placeholder="John Smith"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <div className="input-icon-wrap">
                          <Mail className="input-icon" aria-hidden />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            autoComplete="email"
                            inputMode="email"
                            className="form-input has-icon"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label className="form-label">Phone (optional)</label>
                      <div className="input-icon-wrap">
                        <Phone className="input-icon" aria-hidden />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          autoComplete="tel"
                          inputMode="tel"
                          className="form-input has-icon"
                          placeholder="+44 7464 485 026"
                        />
                      </div>
                    </div>

                    <div className="form-section-label">
                      <DollarSign style={{ width: 13, height: 13 }} aria-hidden />
                      Project Details
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <label className="form-label">Budget range (optional)</label>
                      <div className="budget-pills">
                        {budgetOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                budget: prev.budget === opt ? "" : opt,
                              }))
                            }
                            className={`budget-pill${formData.budget === opt ? " active" : ""}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 22 }}>
                      <label className="form-label">Tell us about your project (optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="form-input"
                        placeholder="What are you trying to build or improve?"
                        style={{ resize: "none" }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center", opacity: isSubmitting ? 0.65 : 1 }}
                    >
                      {isSubmitting ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              width: 16,
                              height: 16,
                              border: "2px solid rgba(255,255,255,.3)",
                              borderTopColor: "#fff",
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                              display: "inline-block",
                            }}
                          />
                          Sending…
                        </span>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Send style={{ width: 15, height: 15 }} aria-hidden />
                          Request My Free Quote
                        </span>
                      )}
                    </button>
                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    <p
                      className="form-helper"
                      style={{
                        textAlign: "center",
                        marginTop: 14,
                      }}
                    >
                      Your details are kept private. ICO registered:{" "}
                      <a
                        href="https://ico.org.uk/ESDWebPages/Entry/ZC026034"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(255,255,255,.75)" }}
                      >
                        ZC026034
                      </a>
                    </p>
                  </form>
                )}

                {!submitSuccess && (
                  <div
                    style={{
                      marginTop: 28,
                      paddingTop: 24,
                      borderTop: "1px solid rgba(255,255,255,.12)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", margin: 0 }}>
                      Prefer to talk first?
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                      <a
                        href="tel:+447464485026"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "9px 16px",
                          border: "1.5px solid rgba(255,255,255,.25)",
                          borderRadius: 10,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "border-color .2s",
                          background: "transparent",
                        }}
                      >
                        <Phone style={{ width: 13, height: 13 }} aria-hidden /> Call us
                      </a>
                      <a
                        href="https://wa.me/447464485026?text=Hi%20Viorix"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "9px 16px",
                          border: "1.5px solid rgba(37,211,102,.4)",
                          borderRadius: 10,
                          color: "#25d366",
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: "none",
                          background: "transparent",
                        }}
                      >
                        <FaWhatsapp style={{ width: 13, height: 13 }} aria-hidden /> WhatsApp
                      </a>
                      <a
                        href="mailto:info@viorix.co.uk"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "9px 16px",
                          border: "1.5px solid rgba(255,255,255,.25)",
                          borderRadius: 10,
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: "none",
                          background: "transparent",
                        }}
                      >
                        <Mail style={{ width: 13, height: 13 }} aria-hidden /> Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={portfolioRef} className="lp-section" style={{ borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 24,
                marginBottom: 32,
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "clamp(24px,3vw,38px)",
                    fontWeight: 800,
                    letterSpacing: "-.025em",
                    margin: "0 0 8px",
                  }}
                >
                  Recent Work
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", margin: 0 }}>
                  Projects that delivered measurable results for real businesses.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 999,
                      border: `1px solid ${portfolioFilter === cat ? "var(--blue)" : "var(--border)"}`,
                      background: portfolioFilter === cat ? "rgba(0,191,255,.12)" : "transparent",
                      color: portfolioFilter === cat ? "var(--blue)" : "rgba(255,255,255,.55)",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all .2s",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(280px,100%),1fr))", gap: 20 }}>
              {filteredPortfolio.map((item, index) => (
                <motion.div
                  key={item.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="port-card"
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "58%",
                      background: "rgba(255,255,255,.04)",
                    }}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      style={{ transition: "transform .4s" }}
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <div style={{ padding: "22px 22px 24px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: "var(--blue)",
                        marginBottom: 6,
                        display: "block",
                      }}
                    >
                      {item.category}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,.45)",
                        lineHeight: 1.6,
                        margin: "0 0 18px",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: "10px 18px", fontSize: 12 }}
                      >
                        View Project <ExternalLink style={{ width: 12, height: 12 }} aria-hidden />
                      </a>
                    ) : (
                      <button
                        onClick={scrollToForm}
                        className="btn-primary"
                        style={{
                          padding: "10px 18px",
                          fontSize: 12,
                          background: "rgba(0,191,255,.12)",
                          color: "var(--blue)",
                        }}
                      >
                        Start something similar <ArrowRight style={{ width: 12, height: 12 }} aria-hidden />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={reviewsRef} className="lp-section" style={{ borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(250,204,21,.25)",
                  background: "rgba(250,204,21,.06)",
                  marginBottom: 16,
                }}
              >
                <Star style={{ width: 14, height: 14, fill: "#facc15", color: "#facc15" }} aria-hidden />
                <span style={{ fontSize: 12, color: "#facc15", fontWeight: 600 }}>5.0 Rating · Verified Reviews</span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(24px,3vw,38px)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  margin: "0 0 10px",
                }}
              >
                What our clients say
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", margin: 0 }}>Real businesses, real outcomes.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ReviewsSlider reviews={reviews} />
            </motion.div>
          </div>
        </section>

        <section className="lp-section" style={{ borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
            <div className="guar-card">
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,191,255,.25)",
                    background: "rgba(0,191,255,.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 18px",
                  }}
                >
                  <Shield style={{ width: 24, height: 24, color: "var(--blue)" }} aria-hidden />
                </div>
                <h2
                  style={{
                    fontSize: "clamp(22px,3vw,34px)",
                    fontWeight: 800,
                    letterSpacing: "-.025em",
                    margin: "0 0 10px",
                  }}
                >
                  Our Guarantee
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", maxWidth: "44ch", margin: "0 auto" }}>
                  We stand behind our work. These aren&apos;t just promises — they&apos;re our standard.
                </p>
              </div>
              <div className="guar-grid">
                {[
                  {
                    icon: CheckCircle,
                    title: "Unlimited Revisions",
                    desc: "We refine until it's exactly what you envisioned — no extra charge.",
                  },
                  {
                    icon: Clock,
                    title: "On-Time Delivery",
                    desc: "Miss a deadline? You get 10% off, automatically.",
                  },
                  {
                    icon: DollarSign,
                    title: "14-Day Money Back",
                    desc: "If we fall short of expectations, you receive a full refund.",
                  },
                ].map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,.03)",
                        border: "1px solid rgba(0,191,255,.1)",
                        borderRadius: 14,
                        padding: "22px 18px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 11,
                          border: "1px solid rgba(0,191,255,.18)",
                          background: "rgba(0,191,255,.07)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 14px",
                        }}
                      >
                        <Icon style={{ width: 18, height: 18, color: "var(--blue)" }} aria-hidden />
                      </div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px" }}>{g.title}</h4>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.6, margin: 0 }}>
                        {g.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" style={{ borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2
                style={{
                  fontSize: "clamp(22px,3vw,34px)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  margin: "0 0 10px",
                }}
              >
                Common Questions
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", margin: 0 }}>
                Everything you need before getting started.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`faq-item${showFaq === faq.q ? " open" : ""}`}
                >
                  <button
                    onClick={() => setShowFaq(showFaq === faq.q ? null : faq.q)}
                    style={{
                      width: "100%",
                      padding: "18px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{faq.q}</span>
                    <ChevronDown
                      style={{
                        width: 18,
                        height: 18,
                        color: "var(--blue)",
                        flexShrink: 0,
                        transform: showFaq === faq.q ? "rotate(180deg)" : "none",
                        transition: "transform .25s",
                      }}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>
                    {showFaq === faq.q && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            padding: "0 22px 18px",
                            fontSize: 14,
                            color: "rgba(255,255,255,.55)",
                            lineHeight: 1.7,
                            margin: 0,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.38)", marginBottom: 16 }}>
                Still have questions?
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                <a href="tel:+447464485026" className="btn-ghost" style={{ fontSize: 13, padding: "10px 20px" }}>
                  <Phone style={{ width: 13, height: 13 }} aria-hidden /> Call us
                </a>
                <a
                  href="https://wa.me/447464485026"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 20px",
                    border: "1px solid rgba(37,211,102,.28)",
                    borderRadius: 11,
                    color: "#25d366",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <FaWhatsapp style={{ width: 13, height: 13 }} aria-hidden /> WhatsApp
                </a>
                <button onClick={scrollToForm} className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }}>
                  <MessageCircle style={{ width: 13, height: 13 }} aria-hidden /> Free Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" style={{ borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2
                style={{
                  fontSize: "clamp(22px,3vw,34px)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  margin: "0 0 10px",
                }}
              >
                Why Viorix?
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", margin: 0 }}>
                What makes working with us genuinely different.
              </p>
            </div>
            <div className="values-grid">
              {[
                {
                  icon: Target,
                  title: "Results-first thinking",
                  desc: "We don't just build things — we ask what outcome you need and engineer backwards from there.",
                },
                {
                  icon: Zap,
                  title: "Fast, responsive team",
                  desc: "2-hour response time, rapid iteration, and honest communication throughout every project.",
                },
                {
                  icon: Users,
                  title: "UK-based expertise",
                  desc: "Work directly with a London team that understands your market, your customers, and your goals.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.09 }}
                    className="val-card"
                  >
                    <div className="val-ico">
                      <Icon style={{ width: 22, height: 22, color: "var(--blue)" }} aria-hidden />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px" }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.65, margin: 0 }}>
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lp-section-cta" style={{ borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="cta-block">
              <div className="lp-grid" style={{ opacity: 0.5 }} aria-hidden />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 30% 50%,rgba(0,191,255,.12) 0%,transparent 58%),radial-gradient(ellipse at 70% 50%,rgba(0,80,200,.1) 0%,transparent 58%)",
                  pointerEvents: "none",
                }}
                aria-hidden
              />
              <div className="cta-scanline" aria-hidden />
              <div style={{ position: "relative", zIndex: 2 }}>
                <h2
                  style={{
                    fontSize: "clamp(26px,3.8vw,46px)",
                    fontWeight: 800,
                    letterSpacing: "-.035em",
                    margin: "0 0 14px",
                    lineHeight: 1.05,
                  }}
                >
                  Ready to build something{" "}
                  <span
                    style={{
                      background: "linear-gradient(110deg,#00bfff 0%,#6ddcff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    great
                  </span>
                  ?
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,.55)",
                    maxWidth: "48ch",
                    margin: "0 auto 32px",
                    lineHeight: 1.7,
                  }}
                >
                  Take the first step — it&apos;s free, takes 2 minutes, and there&apos;s no obligation
                  whatsoever.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                  <button onClick={scrollToForm} className="btn-primary">
                    <Send style={{ width: 15, height: 15 }} aria-hidden />
                    Get a Free Quote
                  </button>
                  <a href="tel:+447464485026" className="btn-ghost">
                    <Phone style={{ width: 15, height: 15 }} aria-hidden />
                    +44 7464 485 026
                  </a>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginTop: 24 }}>
                  {["Free consultation", "2-hour response", "No obligation", "Money-back guarantee"].map((t) => (
                    <span
                      key={t}
                      style={{ fontSize: 12, color: "rgba(255,255,255,.38)", display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <CheckCircle style={{ width: 12, height: 12, color: "var(--blue)" }} aria-hidden /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky-bar lg:hidden">
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={scrollToForm} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              <Send style={{ width: 14, height: 14 }} aria-hidden />
              Free Quote
            </button>
            <a
              href="tel:+447464485026"
              aria-label="Call us"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                color: "#fff",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Phone style={{ width: 18, height: 18 }} aria-hidden />
            </a>
            <a
              href="https://wa.me/447464485026"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(37,211,102,.1)",
                border: "1px solid rgba(37,211,102,.2)",
                color: "#25d366",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <FaWhatsapp style={{ width: 18, height: 18 }} aria-hidden />
            </a>
          </div>
        </div>

        <div className="lg:hidden" style={{ height: 84 }} />
      </div>
    </>
  );
};

export default OptimizedLandingPage;