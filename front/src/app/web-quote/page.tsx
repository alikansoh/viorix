  "use client"
  import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
  import { motion, useInView, AnimatePresence } from "framer-motion";
  import type { SVGProps } from "react";
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
    Award,
    Users,
    Zap,
    Shield,
    Target,
    Send,
    MessageCircle,
    X,
    DollarSign,
    ChevronDown,
    ExternalLink,
  } from "lucide-react";

  import {  projects, stats as importedStats } from "../projects/portfolioData";
  import { Project } from "../projects/schema";

  interface Service {
    id: string;
    title: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    description: string;
    price: string;
    features: string[];
    color: string;
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

  const OptimizedLandingPage: React.FC = () => {
    const [selectedService, setSelectedService] = useState<string>("web");
    const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      phone: "",
      budget: "",
      message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [showExitIntent, setShowExitIntent] = useState<boolean>(false);
    const [showFaq, setShowFaq] = useState<string | null>(null);

    const formRef = useRef<HTMLDivElement | null>(null);
    const reviewsRef = useRef<HTMLDivElement | null>(null);
    const statsRef = useRef<HTMLDivElement | null>(null);

    const isFormInView = useInView(formRef, { once: true });
    const isReviewsInView = useInView(reviewsRef, { once: true });
    const isStatsInView = useInView(statsRef, { once: true });

    useEffect(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !submitSuccess && !showExitIntent) {
          setShowExitIntent(true);
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [submitSuccess, showExitIntent]);

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const service = params.get("service");
      if (service && ["web", "mobile", "uiux"].includes(service)) {
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
          "SEO Optimization",
          "Fast Loading Speed",
          "Secure Hosting Included",
          "Easy Content Updates",
          "24/7 Support",
        ],
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: "mobile",
        title: "Mobile Apps",
        icon: Smartphone,
        description: "iOS & Android apps that engage users and drive revenue",
        price: "From £2,500",
        features: [
          "iOS & Android",
          "Native Performance",
          "Push Notifications",
          "Offline Functionality",
          "App Store Launch",
          "Cloud Backend",
        ],
        color: "from-cyan-500 to-blue-600",
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
        color: "from-indigo-500 to-purple-500",
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
        result: "3x more leads monthly",
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
        text: "Sleek website for our driving school. Students book lessons online effortlessly now. Game changer.",
        avatar: "BB",
        result: "60% faster bookings",
      },
    ];

    // Map imported stats into the component's stats structure, pick small icons for visual parity
    const stats = useMemo(() => {
      const iconCandidates = [Award, Star, Code, Clock];
      return importedStats.map((s: { number: string; label: string }, idx: number) => ({
        number: s.number ?? "",
        label: s.label ?? "",
        icon: iconCandidates[idx % iconCandidates.length],
      }));
    }, []);

    const faqs = [
      {
        q: "How long does it take to build a website?",
        a: "Most websites are completed in 2-4 weeks. We'll give you an exact timeline during your free consultation based on your specific requirements.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes! We offer flexible payment options including 50% upfront and 50% on completion. For larger projects, we can arrange monthly installments.",
      },
      {
        q: "Will I be able to update the website myself?",
        a: "Absolutely. We build websites with easy-to-use content management systems. We also provide training and ongoing support.",
      },
      {
        q: "What if I'm not happy with the final result?",
        a: "We offer unlimited revisions until you're 100% satisfied. Our money-back guarantee ensures you're protected throughout the process.",
      },
      {
        q: "Do you provide hosting and maintenance?",
        a: "Yes, all our packages include secure hosting for the first year. We also offer affordable maintenance plans to keep your site running smoothly.",
      },
    ];

    // Map imported projects to the lightweight PortfolioItem shape expected by the UI
    const portfolioItems: PortfolioItem[] = useMemo(() => {
      return projects.map((p: Project) => {
        // prefer primary image then first in images array
        const imageSrc = p.image?.startsWith("/") ? p.image : p.image || (Array.isArray(p.images) && p.images[0]) || "";
        const category = (p.category || "Websites").replace(/Webistes/gi, "Websites"); // normalize common typo
        return {
          title: p.title || "Untitled Project",
          category,
          imageSrc,
          alt: p.alt || `${p.title} screenshot`,
          description: p.description || p.longDescription || "",
          link: p.liveUrl || p.link || "",
        } as PortfolioItem;
      });
    }, []);

    const [portfolioFilter, setPortfolioFilter] = useState<string>("All");
    const [portfolioQuery, setPortfolioQuery] = useState<string>("");
    const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

    const categories = useMemo(() => {
      const cats = Array.from(new Set(portfolioItems.map((p) => p.category)));
      return ["All", ...cats];
    }, [portfolioItems]);

    const filteredPortfolio = useMemo(() => {
      return portfolioItems.filter((item) => {
        const matchesCategory = portfolioFilter === "All" || item.category === portfolioFilter;
        const matchesQuery =
          portfolioQuery.trim() === "" ||
          item.title.toLowerCase().includes(portfolioQuery.toLowerCase()) ||
          (item.description || "").toLowerCase().includes(portfolioQuery.toLowerCase());
        return matchesCategory && matchesQuery;
      });
    }, [portfolioItems, portfolioFilter, portfolioQuery]);


    const closeModal = useCallback(() => {
      setActiveModalIndex(null);
      document.body.style.overflow = "";
    }, []);

    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (activeModalIndex === null) return;
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowRight") {
          setActiveModalIndex((prev) => {
            if (prev === null) return null;
            return (prev + 1) % filteredPortfolio.length;
          });
        } else if (e.key === "ArrowLeft") {
          setActiveModalIndex((prev) => {
            if (prev === null) return null;
            return (prev - 1 + filteredPortfolio.length) % filteredPortfolio.length;
          });
        }
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [activeModalIndex, filteredPortfolio.length, closeModal]);

    const handleInputChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      const serviceID = "service_c73djix";
      const templateID = "template_rl3gq4l";
      const publicKey = "_-PS7ydJYxLOybs71";

      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not provided",
        budget: formData.budget || "Not specified",
        message: formData.message || "No additional details",
        selectedService: services.find(s => s.id === selectedService)?.title,
        submittedAt: new Date().toLocaleString(),
      };

      try {
        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        setSubmitSuccess(true);
        setIsSubmitting(false);

        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({ name: "", email: "", phone: "", budget: "", message: "" });
        }, 8000);
      } catch (error) {
        console.error("EmailJS error:", error);
        setIsSubmitting(false);
        alert(
          "We couldn't send your request. Please call us directly at +44 7464 485 026"
        );
      }
    };

    const scrollToForm = () => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const selectedServiceData = services.find(s => s.id === selectedService);

    return (
      <div className="min-h-screen bg-white">
        {/* Exit Intent Popup */}
        <AnimatePresence>
          {showExitIntent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowExitIntent(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-6 lg:p-8 max-w-md w-full relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B365D] mb-2">Wait! Before You Go...</h3>
                  <p className="text-gray-600 mb-4">Get £100 OFF your project if you request a quote in the next 5 minutes!</p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 mb-4">
                    <p className="font-bold text-green-900 mb-2">Limited Time Offer:</p>
                    <ul className="text-sm text-green-800 space-y-1 text-left">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        £100 OFF any project over £1,000
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        Free 30-min consultation (worth £150)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        Priority project scheduling
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setShowExitIntent(false);
                      scrollToForm();
                    }}
                    className="w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-bold rounded-xl hover:shadow-lg transition-all mb-3"
                  >
                    Claim My £100 Discount
                  </button>

                  <button
                    onClick={() => setShowExitIntent(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    No thanks, I&apos;ll pay full price
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section - Dynamic based on service */}
        <header className="bg-gradient-to-br from-[#1B365D] via-[#2A4A6B] to-[#00BFFF] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              className="absolute bottom-32 right-16 w-24 h-24 bg-cyan-300 rounded-full blur-2xl"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              {/* Left Column - Copy */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-300/30 mb-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                  <span className="text-green-300 font-medium text-sm">🎉 Special Offer: £100 OFF Today</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
                  {selectedServiceData?.title}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mt-2">
                    {selectedServiceData?.price}
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-blue-100 mb-6 leading-relaxed">
                  {selectedServiceData?.description} • Trusted by 50+ UK businesses • 100% satisfaction guaranteed
                </p>

                <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
                  {selectedServiceData?.features.slice(0, 4).map((feature) => (
                    <div key={feature} className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <CheckCircle className="w-4 h-4 mr-2 text-cyan-300 flex-shrink-0" />
                      <span className="text-left">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <motion.button
                    onClick={scrollToForm}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-[#1B365D] font-bold rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg"
                  >
                    Get Free Quote • 2 Min
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </motion.button>

                  <a
                    href="tel:+447464485026"
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg text-center"
                  >
                    <Phone className="w-5 h-5 inline mr-2" />
                    Call Now
                  </a>
                </div>

                <p className="text-sm text-blue-200 mt-4">
                  ⚡ 2-hour response • No obligation • Free consultation included
                </p>
              </div>

              {/* Right Column - Trust Indicators */}
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-2 font-bold">5.0 Rating</span>
                    </div>
                    <span className="text-sm">50+ Reviews</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {reviews.slice(0, 2).map((review, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                            {review.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{review.name}</p>
                            <p className="text-xs text-blue-200">{review.company}</p>
                          </div>
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                            {review.result}
                          </span>
                        </div>
                        <p className="text-xs text-blue-100 line-clamp-2">{review.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="font-bold text-xl">2 Hour</div>
                      <div className="text-blue-200 text-xs">Response</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="font-bold text-xl">100%</div>
                      <div className="text-blue-200 text-xs">On-Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Trust Bar - Stats */}
        <section ref={statsRef} className="py-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center mb-1">
                      <Icon className="w-5 h-5 text-[#00BFFF] mr-1" />
                      <div className="text-2xl font-bold text-[#1B365D]">{stat.number}</div>
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      {/* Main Form Section - Simplified */}
  <section className="py-12 lg:py-16 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={formRef} className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#1B365D] mb-2">
        Join 50+ UK businesses who trusted Viorix to build their online presence
        </h2>
        <p className="text-gray-600">
          No commitment • No spam • Response in 2 hours
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isFormInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 lg:p-10 rounded-2xl shadow-xl border-2 border-[#00BFFF]/20"
      >
        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Quote Request Received! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ll contact you within 2 hours with your custom quote
            </p>

            <div className="bg-white p-6 rounded-xl border-2 border-green-200 mb-4">
              <p className="font-bold text-[#1B365D] mb-3">What happens next?</p>
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>We&apos;ll review your requirements (5 mins)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    You&apos;ll receive a detailed quote via email (within 2 hours)
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>We&apos;ll schedule a free consultation call</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">Need to speak immediately?</p>
            <a
              href="tel:+447464485026"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +44 7464 485 026
            </a>

            {/* ICO Number for success state */}
            <p className="text-xs text-center text-gray-500 mt-6">
              Registered with the Information Commissioner’s Office (ICO):{" "}
              <a
                href="https://ico.org.uk/ESDWebPages/Entry/ZC026034"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B365D] font-semibold hover:underline"
              >
                ZC026034
              </a>
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFFF] focus:border-[#00BFFF] transition-all"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFFF] focus:border-[#00BFFF] transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFFF] focus:border-[#00BFFF] transition-all"
                  placeholder="+44 7464 485 026"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFFF] focus:border-[#00BFFF] transition-all bg-white"
                >
                  <option value="">Select budget</option>
                  <option value="£500 - £1,000">£500 - £1,000</option>
                  <option value="£1,000 - £2,500">£1,000 - £2,500</option>
                  <option value="£2,500 - £5,000">£2,500 - £5,000</option>
                  <option value="£5,000 - £10,000">£5,000 - £10,000</option>
                  <option value="£10,000+">£10,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Details (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFFF] focus:border-[#00BFFF] transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all text-lg ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Get My Free Quote Now
                </span>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-6 text-xs text-gray-600 pt-2">
              <span className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                100% secure
              </span>
            </div>
          </form>
        )}

        {/* Alternative Contact Below Form */}
        {!submitSuccess && (
          <div className="mt-6 pt-6 border-t border-gray-300">
            <p className="text-sm text-center text-gray-600 mb-3">
              Prefer to talk directly?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+447464485026"
                className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a
                href="mailto:info@viorix.co.uk"
                className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
            </div>

            {/* ICO Number Section */}
            <p className="text-xs text-center text-gray-500 mt-6">
              Registered with the Information Commissioner’s Office (ICO):{" "}
              <a
                href="https://ico.org.uk/ESDWebPages/Entry/ZC026034"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B365D] font-semibold hover:underline"
              >
                ZC026034
              </a>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  </section>


        
        {/* Portfolio Section */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-1">Our Recent Work</h2>
              <p className="text-gray-600">
                Case studies & recent projects that delivered measurable results
              </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      portfolioFilter === cat
                        ? "bg-[#00BFFF] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 w-full sm:w-auto">
                <input
                  value={portfolioQuery}
                  onChange={(e) => setPortfolioQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="outline-none px-2 py-1 text-sm w-full"
                  aria-label="Search projects"
                />
                <button
                  onClick={() => setPortfolioQuery("")}
                  className="text-gray-400 hover:text-gray-600 ml-2 text-sm"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 bg-gray-100">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <div className="text-white font-bold text-lg">{item.title}</div>
                      <div className="text-xs text-white/80">{item.category}</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-[#1B365D] mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Fixed Button */}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white rounded-xl font-semibold hover:shadow-md transition"
                    >
                      View Project <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <button
                      onClick={scrollToForm}
                      className="inline-flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition"
                    >
                      Start a Similar Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 border-2 border-[#00BFFF] text-[#00BFFF] font-semibold rounded-xl hover:bg-[#00BFFF] hover:text-white transition-all"
            >
              Start Your Project Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>
    


        {/* Reviews Section - Enhanced */}
        <section ref={reviewsRef} className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full border border-yellow-300 mb-4">
                <Star className="w-5 h-5 text-yellow-500 mr-2 fill-yellow-500" />
                <span className="text-yellow-900 font-semibold">5.0 Rating • 50+ Reviews</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1B365D] mb-3">
                Real Results from Real Businesses
              </h2>
              <p className="text-lg text-gray-600">See the impact we&apos;ve made for UK companies</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      {review.result}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1B365D] to-[#00BFFF] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-[#1B365D]">{review.name}</p>
                      <p className="text-sm text-gray-600">
                        {review.role}, {review.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Objection Handling */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1B365D] mb-2">Common Questions</h2>
              <p className="text-gray-600">Everything you need to know before getting started</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                >
                  <button
                    onClick={() => setShowFaq(showFaq === faq.q ? null : faq.q)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#1B365D] pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#00BFFF] flex-shrink-0 transition-transform ${
                        showFaq === faq.q ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {showFaq === faq.q && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-700 leading-relaxed">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+447464485026"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us Now
                </a>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#00BFFF] text-[#00BFFF] font-semibold rounded-xl hover:bg-[#00BFFF] hover:text-white transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get Free Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-12 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border-2 border-green-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#1B365D] mb-3">
                  Our 100% Satisfaction Guarantee
                </h2>
                <p className="text-gray-600 text-lg">Your success is our priority. Here&apos;s our promise:</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-[#1B365D] mb-2">Unlimited Revisions</h3>
                  <p className="text-sm text-gray-600">
                    We&apos;ll refine your project until it&apos;s exactly what you envisioned
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-[#1B365D] mb-2">On-Time Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Miss our deadline? Get 10% off your project cost
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-[#1B365D] mb-2">Money-Back Promise</h3>
                  <p className="text-sm text-gray-600">
                    Not satisfied? Get a full refund within 14 days
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-[#00BFFF]">
                <p className="text-center text-gray-700 font-medium mb-4">
                  <span className="font-bold text-[#1B365D]">Zero Risk.</span> If we don&apos;t deliver
                  exceptional results, you don&apos;t pay.
                </p>
                <div className="text-center">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    Get Started Risk-Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1B365D] mb-2">Why Choose Viorix?</h2>
              <p className="text-gray-600">We&apos;re different from other agencies</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Results-Focused",
                  description:
                    "We don't just build websites - we create digital assets that drive real business growth and revenue.",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "2-hour response time, fast project delivery, and immediate support when you need it most.",
                },
                {
                  icon: Users,
                  title: "UK-Based Team",
                  description:
                    "Work directly with local experts who understand your market and speak your language.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-xl mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B365D] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#1B365D] via-[#2A4A6B] to-[#00BFFF] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 12, repeat: Infinity, delay: 2 }}
              className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300 rounded-full blur-3xl"
            />
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-300/30 mb-6">
                <Clock className="w-4 h-4 text-yellow-300 mr-2" />
                <span className="text-yellow-300 font-medium">Limited Time: £100 OFF Today</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join 50+ successful UK businesses. Get your free quote in 2 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.button
                  onClick={scrollToForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1B365D] font-bold rounded-full hover:bg-blue-50 transition-all shadow-2xl text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Get Free Quote Now
                </motion.button>

                <motion.a
                  href="tel:+447464485026"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call +44 7464 485 026
                </motion.a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {[
                  "✓ Free consultation included",
                  "✓ 2-hour response time",
                  "✓ No obligation",
                  "✓ Money-back guarantee",
                ].map((item) => (
                  <span key={item} className="text-blue-100">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t-2 border-gray-200 shadow-2xl z-50"
        >
          <div className="flex gap-2">
            <motion.button
              onClick={scrollToForm}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-bold rounded-xl shadow-lg flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Get Quote
            </motion.button>
            <motion.a
              href="tel:+447464485026"
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center"
            >
              <Phone className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Padding for Mobile */}
        <div className="lg:hidden h-20" />
      </div>
    );
  };

  export default OptimizedLandingPage;