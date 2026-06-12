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
  ExternalLink,
  LineChart,
  Users,
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
  price: string;
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

  const isFormInView = useInView(formRef, { once: true });
  const isReviewsInView = useInView(reviewsRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

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
      price: "From £500",
      features: [
        "Mobile-Responsive Design",
        "SEO Optimisation",
        "Fast Loading Speed",
        "Secure Hosting Included",
        "Easy Content Updates",
        "24/7 Support",
      ],
    },
    {
      id: "mobile",
      title: "Mobile Apps",
      icon: Smartphone,
      description: "iOS & Android apps that engage users and drive revenue",
      price: "From £1,500",
      features: [
        "iOS & Android",
        "Native Performance",
        "Push Notifications",
        "Offline Functionality",
        "App Store Launch",
        "Cloud Backend",
      ],
    },
    {
      id: "uiux",
      title: "UI/UX Design",
      icon: Palette,
      description: "Beautiful, user-friendly designs that boost conversions",
      price: "From £800",
      features: [
        "User Research",
        "Wireframes & Mockups",
        "Interactive Prototypes",
        "Brand Identity",
        "User Testing",
        "Design System",
      ],
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      icon: LineChart,
      description: "Growth-focused campaigns that drive leads and sales",
      price: "From £100 /mo",
      features: [
        "SEO & Local SEO",
        "Google & Meta Ads",
        "Content Strategy",
        "Conversion Optimisation",
        "Monthly Reporting",
        "Lead Generation",
      ],
    },
  ];

  const reviews = [
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

  const selectedServiceData = services.find((s) => s.id === selectedService);

  return (
    <>
      <style>{`
        .lp {
          --bg: #050a13;
          --blue: #00bfff;
          --navy: #1b365d;
          --border: rgba(0,191,255,.13);
          --bh: rgba(0,191,255,.4);
          --glass: rgba(0,191,255,.05);
          --muted: rgba(255,255,255,.55);
          font-family: Inter, "DM Sans", system-ui, -apple-system, sans-serif;
        }
        .lp-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,191,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,191,255,.05) 1px,transparent 1px);background-size:48px 48px;opacity:.28;pointer-events:none;}
        .lp-vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 70% 30%,rgba(0,80,170,.2) 0%,transparent 55%),radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(4,8,16,.65) 100%);}
        .lp-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px);}
        .lp-orb-a{width:480px;height:480px;top:-80px;right:-120px;background:rgba(0,100,220,.14);animation:orbA 20s ease-in-out infinite alternate;}
        .lp-orb-b{width:360px;height:360px;bottom:-60px;left:-80px;background:rgba(0,191,255,.09);animation:orbB 25s ease-in-out infinite alternate;}
        @keyframes orbA{0%{transform:translate(0,0) scale(1);}100%{transform:translate(-40px,40px) scale(1.1);}}
        @keyframes orbB{0%{transform:translate(0,0) scale(1);}100%{transform:translate(50px,-30px) scale(1.08);}}
        .svc-tab{border:1px solid var(--border);background:rgba(255,255,255,.04);color:rgba(255,255,255,.6);border-radius:10px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .22s,background .22s,color .22s;display:flex;align-items:center;gap:7px;}
        .svc-tab.active{border-color:var(--blue);background:rgba(0,191,255,.1);color:#fff;}
        .svc-tab:hover:not(.active){border-color:rgba(0,191,255,.3);background:rgba(0,191,255,.06);color:#fff;}
        .feat-chip{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:9px;padding:9px 12px;font-size:13px;color:rgba(255,255,255,.8);}
        .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--blue);color:#050a13;font-size:14px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:14px 26px;border-radius:12px;text-decoration:none;position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s,background .2s;border:none;cursor:pointer;}
        .btn-primary::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(105deg,transparent,rgba(255,255,255,.28),transparent);transition:left .4s ease;}
        .btn-primary:hover::before{left:100%;}
        .btn-primary:hover{transform:translateY(-2px);background:#33ccff;}
        .btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1.5px solid rgba(255,255,255,.3);color:rgba(255,255,255,.85);font-size:14px;font-weight:700;padding:14px 26px;border-radius:12px;text-decoration:none;transition:border-color .22s,background .22s,color .22s;background:transparent;}
        .btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.08);color:#fff;}
        .stat-card{border:1px solid var(--border);background:linear-gradient(145deg,rgba(7,16,30,.9),rgba(4,8,16,.95));border-radius:14px;padding:22px 18px;text-align:center;transition:border-color .25s,transform .28s cubic-bezier(.22,1,.36,1);}
        .stat-card:hover{border-color:var(--bh);transform:translateY(-3px);}
        .stat-num{font-size:clamp(30px,4vw,44px);font-weight:800;letter-spacing:-.03em;background:linear-gradient(110deg,#fff,rgba(255,255,255,.7));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .stat-suf{background:linear-gradient(110deg,var(--blue),#6ddcff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .form-card{background:linear-gradient(145deg,rgba(7,16,30,.96),rgba(4,8,16,.98));border:1px solid var(--border);border-radius:22px;padding:44px;}
        .form-input{width:100%;padding:13px 16px;border:1px solid rgba(255,255,255,.1);border-radius:11px;background:rgba(255,255,255,.04);color:#fff;font-size:14px;transition:border-color .22s,background .22s;outline:none;font-family:inherit;}
        .form-input:focus{border-color:var(--blue);background:rgba(0,191,255,.06);}
        .form-input::placeholder{color:rgba(255,255,255,.28);}
        .form-label{display:block;font-size:12px;font-weight:600;color:rgba(255,255,255,.55);margin-bottom:7px;letter-spacing:.07em;text-transform:uppercase;}
        select.form-input option{background:#0a1525;color:#fff;}
        .port-card{background:linear-gradient(145deg,rgba(7,16,30,.9),rgba(4,8,16,.95));border:1px solid var(--border);border-radius:18px;overflow:hidden;transition:border-color .25s,transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s;}
        .port-card:hover{border-color:var(--bh);transform:translateY(-5px);box-shadow:0 20px 48px rgba(0,0,0,.6);}
        .review-card{background:linear-gradient(145deg,rgba(7,16,30,.9),rgba(4,8,16,.95));border:1px solid var(--border);border-radius:18px;padding:28px;transition:border-color .25s,transform .3s cubic-bezier(.22,1,.36,1);}
        .review-card:hover{border-color:var(--bh);transform:translateY(-4px);}
        .review-card::before{content:'"';position:absolute;top:8px;right:20px;font-size:88px;line-height:1;color:rgba(0,191,255,.05);font-family:Georgia,serif;pointer-events:none;}
        .faq-item{background:linear-gradient(145deg,rgba(7,16,30,.9),rgba(4,8,16,.95));border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:border-color .22s;}
        .faq-item:hover{border-color:rgba(0,191,255,.28);}
        .faq-item.open{border-color:rgba(0,191,255,.35);}
        .val-card{background:linear-gradient(145deg,rgba(7,16,30,.9),rgba(4,8,16,.95));border:1px solid var(--border);border-radius:18px;padding:28px;transition:border-color .25s,transform .3s cubic-bezier(.22,1,.36,1);}
        .val-card:hover{border-color:var(--bh);transform:translateY(-4px);}
        .val-ico{width:52px;height:52px;border-radius:14px;border:1px solid rgba(0,191,255,.2);background:rgba(0,191,255,.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px;transition:background .25s;}
        .val-card:hover .val-ico{background:rgba(0,191,255,.15);}
        .guar-card{background:linear-gradient(145deg,rgba(7,16,30,.95),rgba(4,8,16,.98));border:1px solid rgba(0,191,255,.18);border-radius:22px;padding:48px;}
        .cta-block{position:relative;border-radius:24px;padding:72px 48px;text-align:center;overflow:hidden;border:1px solid rgba(0,191,255,.2);background:linear-gradient(135deg,rgba(0,80,170,.18) 0%,rgba(0,40,100,.14) 50%,rgba(0,191,255,.07) 100%);}
        .cta-scanline{position:absolute;top:-2px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,191,255,.6),transparent);animation:scan 4s linear infinite;pointer-events:none;}
        @keyframes scan{0%{top:-2px;opacity:0;}5%{opacity:1;}95%{opacity:1;}100%{top:100%;opacity:0;}}
        .sticky-bar{position:fixed;bottom:0;left:0;right:0;padding:10px 16px;background:rgba(5,10,19,.96);border-top:1px solid var(--border);backdrop-filter:blur(12px);z-index:50;}
        @media(max-width:768px){
          .form-card{padding:24px 18px;}
          .guar-card{padding:28px 20px;}
          .cta-block{padding:40px 20px;}
        }
        @media(prefers-reduced-motion:reduce){.lp *{animation:none!important;transition:none!important;}}
      `}</style>

      <div className="lp min-h-screen" style={{ background: "var(--bg)", color: "#fff" }}>
        <header style={{ position: "relative", overflow: "hidden", paddingBottom: "0" }}>
          <div className="lp-grid" aria-hidden />
          <div className="lp-vig" aria-hidden />
          <div className="lp-orb lp-orb-a" aria-hidden />
          <div className="lp-orb lp-orb-b" aria-hidden />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 1240,
              margin: "0 auto",
              padding: "64px 24px 72px",
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

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "48px 64px",
                  alignItems: "start",
                }}
              >
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
                      }}
                    >
                      {selectedServiceData?.price}
                    </span>
                  </h1>

                  <p
                    style={{
                      fontSize: 17,
                      color: "rgba(255,255,255,.62)",
                      lineHeight: 1.7,
                      maxWidth: "56ch",
                      marginBottom: 28,
                    }}
                  >
                    {selectedServiceData?.description} — trusted by 50+ UK businesses, with every
                    project backed by a satisfaction guarantee.
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

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                    <button onClick={scrollToForm} className="btn-primary">
                      Get a Free Quote
                      <ArrowRight style={{ width: 15, height: 15 }} aria-hidden />
                    </button>
                    <a href="tel:+447464485026" className="btn-ghost">
                      <Phone style={{ width: 15, height: 15 }} aria-hidden />
                      Call Us
                    </a>
                  </div>

                  <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", marginTop: 16 }}>
                    No commitment · Response within 2 hours · Free consultation included
                  </p>
                </div>

                <div
                  className="hidden lg:block"
                  style={{
                    width: 300,
                    border: "1px solid rgba(0,191,255,.15)",
                    background: "rgba(7,16,30,.85)",
                    borderRadius: 18,
                    padding: 24,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          style={{ width: 14, height: 14, fill: "#facc15", color: "#facc15" }}
                          aria-hidden
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>5.0</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>· 50+ reviews</span>
                  </div>
                  {reviews.slice(0, 2).map((r, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,.04)",
                        borderRadius: 12,
                        padding: "12px 14px",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: "linear-gradient(135deg,#00bfff,#1b365d)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {r.avatar}
                        </div>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{r.name}</p>
                          <p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", margin: 0 }}>
                            {r.company}
                          </p>
                        </div>
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 10,
                            background: "rgba(0,191,255,.12)",
                            color: "var(--blue)",
                            padding: "3px 8px",
                            borderRadius: 999,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.result}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,.55)",
                          margin: 0,
                          lineHeight: 1.55,
                        }}
                      >
                        {r.text.slice(0, 90)}…
                      </p>
                    </div>
                  ))}
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
          style={{
            position: "relative",
            padding: "52px 0",
            borderTop: "1px solid rgba(0,191,255,.08)",
            borderBottom: "1px solid rgba(0,191,255,.08)",
          }}
        >
          <div className="lp-grid" style={{ opacity: 0.15 }} aria-hidden />
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16 }}>
              {[
                { n: 40, suf: "+", label: "Projects Delivered", sub: "London & UK" },
                { n: 99, suf: "%", label: "On-Time Delivery", sub: "Every project" },
                { n: 50, suf: "+", label: "Happy Clients", sub: "Across industries" },
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

        <section style={{ padding: "80px 0" }}>
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
                    <p style={{ color: "rgba(255,255,255,.55)", marginBottom: 28 }}>
                      Expect a reply within 2 hours. In the meantime, feel free to explore our work
                      below.
                    </p>
                    <div
                      style={{
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid var(--border)",
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
                          <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", margin: 0 }}>
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
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 16 }}>
                      ICO registered:{" "}
                      <a
                        href="https://ico.org.uk/ESDWebPages/Entry/ZC026034"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(255,255,255,.4)" }}
                      >
                        ZC026034
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 16,
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <label className="form-label">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 16,
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <label className="form-label">Phone (optional)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="+44 7464 485 026"
                        />
                      </div>
                      <div>
                        <label className="form-label">Budget range (optional)</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="">Select a range</option>
                          <option value="£500 - £1,000">£500 – £1,000</option>
                          <option value="£1,000 - £2,500">£1,000 – £2,500</option>
                          <option value="£2,500 - £5,000">£2,500 – £5,000</option>
                          <option value="£5,000 - £10,000">£5,000 – £10,000</option>
                          <option value="£10,000+">£10,000+</option>
                        </select>
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
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,.25)",
                        textAlign: "center",
                        marginTop: 14,
                      }}
                    >
                      Your details are kept private. ICO registered:{" "}
                      <a
                        href="https://ico.org.uk/ESDWebPages/Entry/ZC026034"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(255,255,255,.35)" }}
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
                      borderTop: "1px solid rgba(255,255,255,.07)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", margin: 0 }}>
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
                          border: "1px solid rgba(255,255,255,.12)",
                          borderRadius: 10,
                          color: "rgba(255,255,255,.7)",
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
                          border: "1px solid rgba(37,211,102,.25)",
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
                          border: "1px solid rgba(255,255,255,.1)",
                          borderRadius: 10,
                          color: "rgba(255,255,255,.6)",
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

        <section style={{ padding: "80px 0", borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 24,
                marginBottom: 40,
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 22 }}>
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

        <section ref={reviewsRef} style={{ padding: "80px 0", borderTop: "1px solid rgba(0,191,255,.07)" }}>
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
                <span style={{ fontSize: 12, color: "#facc15", fontWeight: 600 }}>5.0 Rating · 50+ Reviews</span>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20 }}>
              {reviews.map((r, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  className="review-card"
                  style={{ position: "relative" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[...Array(r.rating)].map((_, j) => (
                        <Star
                          key={j}
                          style={{ width: 14, height: 14, fill: "#facc15", color: "#facc15" }}
                          aria-hidden
                        />
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
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,.7)",
                      margin: "0 0 22px",
                      fontStyle: "italic",
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
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", borderTop: "1px solid rgba(0,191,255,.07)" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 18 }}>
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

        <section style={{ padding: "80px 0", borderTop: "1px solid rgba(0,191,255,.07)" }}>
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

        <section style={{ padding: "80px 0", borderTop: "1px solid rgba(0,191,255,.07)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 20 }}>
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

        <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(0,191,255,.07)" }}>
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
              }}
            >
              <Phone style={{ width: 18, height: 18 }} aria-hidden />
            </a>
            <a
              href="https://wa.me/447464485026"
              target="_blank"
              rel="noopener noreferrer"
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
              }}
            >
              <FaWhatsapp style={{ width: 18, height: 18 }} aria-hidden />
            </a>
          </div>
        </div>

        <div className="lg:hidden" style={{ height: 72 }} />
      </div>
    </>
  );
};

export default OptimizedLandingPage;