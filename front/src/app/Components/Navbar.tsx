"use client";

import React, { useEffect, useState, useRef, useMemo, JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Smartphone,
  Globe,
  Palette,
  BarChart3,
  Home,
  User,
  FolderOpen,
  Mail,
  X,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";

type ServiceItem = {
  name: string;
  desc: string;
};

type ServiceCategory = {
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  services: ServiceItem[];
  color: string;
  slug: string;
};

type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  hasDropdown?: boolean;
};

const servicesData: ServiceCategory[] = [
  {
    category: "Web Development",
    icon: Globe,
    services: [
      { name: "Custom Web Applications", desc: "Scalable web solutions tailored to your business" },
      { name: "E-commerce Platforms", desc: "Complete online store development" },
      { name: "Progressive Web Apps", desc: "Fast, reliable web applications" },
      { name: "API Development", desc: "RESTful and GraphQL APIs" },
    ],
    color: "from-blue-500 to-cyan-500",
    slug: "web-development",
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    services: [
      { name: "iOS App Development", desc: "Native iOS applications" },
      { name: "Android Development", desc: "Native Android applications" },
      { name: "Cross-Platform Apps", desc: "React Native & Flutter apps" },
      { name: "App Store Optimization", desc: "Maximize your app visibility" },
    ],
    color: "from-purple-500 to-pink-500",
    slug: "mobile-development",
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    services: [
      { name: "User Interface Design", desc: "Beautiful, intuitive interfaces" },
      { name: "User Experience Research", desc: "Data-driven design decisions" },
      { name: "Brand Identity", desc: "Complete brand design systems" },
      { name: "Prototyping", desc: "Interactive design prototypes" },
    ],
    color: "from-emerald-500 to-teal-500",
    slug: "ui-ux-design",
  },
  {
    category: "Digital Marketing",
    icon: BarChart3,
    services: [
      { name: "SEO Optimization", desc: "Improve your search rankings" },
      { name: "Social Media Marketing", desc: "Engage your audience effectively" },
      { name: "PPC Advertising", desc: "Targeted advertising campaigns" },
      { name: "Content Marketing", desc: "Strategic content creation" },
    ],
    color: "from-orange-500 to-red-500",
    slug: "digital-marketing",
  },
];

const links: NavLink[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Services", href: "/services", hasDropdown: true, icon: Palette },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function EnhancedNavbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : prev || "unset";
    return () => {
      document.body.style.overflow = prev || "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  const closeAllDropdowns = () => {
    setShowServices(false);
    setMobileServicesOpen(false);
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllDropdowns();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleServicesMouseEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setShowServices(true);
  };

  const handleServicesMouseLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => setShowServices(false), 120);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  const servicesList = useMemo(() => servicesData, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-0 m-0">
        <div className="w-full p-0 m-0">
          <div
            className={`w-full border-b transition-all duration-300 ${
              isScrolled ? "px-4 md:px-6 py-2.5" : "px-4 md:px-6 py-3"
            }`}
            style={{
              background: "linear-gradient(135deg, rgba(5,10,19,0.92), rgba(8,16,30,0.9))",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderColor: "rgba(0,191,255,0.18)",
              boxShadow: isScrolled
                ? "0 8px 24px rgba(0,0,0,0.32)"
                : "0 10px 28px rgba(0,0,0,0.36)",
            }}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className={`flex items-center flex-shrink-0 transition-all duration-300 ${
                  isScrolled ? "gap-2" : "gap-3"
                }`}
                aria-label="Home"
              >
                <div
                  className="transition-all duration-300 overflow-hidden flex items-center justify-center rounded-full"
                  style={{
                    width: isScrolled ? "46px" : "64px",
                    height: isScrolled ? "46px" : "64px",
                    background: "rgba(255,255,255,255.10)",
                    border: "1px solid rgba(0,191,255,0.22)",
                    boxShadow: "0 0 18px rgba(0,201,255,0.18)",
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Viorix Logo"
                    width={64}
                    height={64}
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>

              <nav
                className={`hidden lg:flex items-center transition-all duration-300 ${
                  isScrolled ? "space-x-0.5" : "space-x-1"
                }`}
                aria-label="Primary navigation"
              >
                {links.map((link) => {
                  const isActive =
                    pathname === link.href || (link.hasDropdown && pathname?.startsWith("/services"));

                  if (link.hasDropdown) {
                    return (
                      <div
                        key={link.name}
                        className="relative"
                        onMouseEnter={handleServicesMouseEnter}
                        onMouseLeave={handleServicesMouseLeave}
                      >
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={showServices}
                          aria-controls="services-dropdown"
                          className={`flex items-center gap-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isScrolled ? "px-3 py-1.5" : "px-4 py-2"
                          } ${
                            isActive || showServices
                              ? "text-cyan-300"
                              : "text-white/75 hover:text-white"
                          }`}
                          style={{
                            background: isActive || showServices ? "rgba(0,191,255,0.14)" : "transparent",
                            border: isActive || showServices ? "1px solid rgba(0,191,255,0.28)" : "1px solid transparent",
                          }}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${showServices ? "rotate-180" : ""}`}
                          />
                        </button>

                        {showServices && (
                          <div
                            id="services-dropdown"
                            role="menu"
                            aria-label="Services menu"
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[760px] rounded-2xl p-7 z-[60] animate-in fade-in slide-in-from-top-2 duration-300"
                            style={{
                              background: "linear-gradient(140deg, rgba(5,10,19,0.95), rgba(9,17,32,0.94))",
                              backdropFilter: "blur(18px)",
                              WebkitBackdropFilter: "blur(18px)",
                              border: "1px solid rgba(0,191,255,0.24)",
                              boxShadow: "0 20px 50px rgba(0,0,0,0.48)",
                            }}
                          >
                            <div className="grid grid-cols-3 gap-7">
                              <div className="space-y-1">
                                <h3 className="text-[11px] font-bold text-cyan-300/70 uppercase tracking-wider mb-3">
                                  Categories
                                </h3>
                                {servicesList.map((service, idx) => {
                                  const ServiceIcon = service.icon;
                                  return (
                                    <Link
                                      key={service.slug}
                                      href={`/services/${service.slug}`}
                                      onMouseEnter={() => setActiveService(idx)}
                                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        activeService === idx ? "text-white scale-[1.02]" : "text-white/75 hover:text-white"
                                      }`}
                                      style={{
                                        background:
                                          activeService === idx
                                            ? "linear-gradient(90deg, rgba(0,191,255,0.28), rgba(0,120,255,0.22))"
                                            : "rgba(255,255,255,0.02)",
                                        border:
                                          activeService === idx
                                            ? "1px solid rgba(0,191,255,0.34)"
                                            : "1px solid rgba(255,255,255,0.04)",
                                      }}
                                    >
                                      <ServiceIcon size={18} />
                                      <span className="font-medium text-sm">{service.category}</span>
                                    </Link>
                                  );
                                })}
                              </div>

                              <div className="hidden md:block border-l border-cyan-300/20" />

                              <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-5 animate-in fade-in duration-300">
                                  {React.createElement(servicesList[activeService].icon, {
                                    size: 20,
                                    className: "text-cyan-300",
                                  })}
                                  <h4 className="text-lg font-bold text-white">
                                    {servicesList[activeService].category}
                                  </h4>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  {servicesList[activeService].services.map((svc, sidx) => (
                                    <div
                                      key={sidx}
                                      className="p-4 rounded-xl transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                                      style={{
                                        background: "rgba(255,255,255,0.02)",
                                        border: "1px solid rgba(0,191,255,0.15)",
                                      }}
                                    >
                                      <h5 className="font-semibold text-white text-sm mb-1">{svc.name}</h5>
                                      <p className="text-xs text-white/55">{svc.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isScrolled ? "px-3 py-1.5" : "px-4 py-2"
                      } ${isActive ? "text-cyan-300" : "text-white/75 hover:text-white"}`}
                      style={{
                        background: isActive ? "rgba(0,191,255,0.14)" : "transparent",
                        border: isActive ? "1px solid rgba(0,191,255,0.28)" : "1px solid transparent",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon size={16} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  href="/web-quote"
                  className={`hidden lg:inline-flex items-center gap-2 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                    isScrolled ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"
                  }`}
                  style={{
                    background: "linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)",
                    boxShadow: "0 0 20px rgba(0,191,255,0.3)",
                  }}
                >
                  <span>Get Free Quote</span>
                  <ArrowRight size={16} />
                </Link>

                <button
                  onClick={() => setIsOpen((v) => !v)}
                  className="lg:hidden p-2.5 rounded-lg transition-all duration-200"
                  style={{
                    background: "rgba(0,191,255,0.08)",
                    border: "1px solid rgba(0,191,255,0.2)",
                  }}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pt-[78px] px-0 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          <div
            className="relative w-full overflow-hidden z-50 animate-in slide-in-from-top duration-200"
            style={{
              background: "linear-gradient(140deg, rgba(5,10,19,0.96), rgba(9,17,32,0.94))",
              borderTop: "1px solid rgba(0,191,255,0.22)",
              borderBottom: "1px solid rgba(0,191,255,0.22)",
            }}
          >
            <div className="p-5 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              <nav className="space-y-2" aria-label="Mobile primary navigation">
                {links.map((link) => {
                  const isActive =
                    pathname === link.href || (link.hasDropdown && pathname?.startsWith("/services"));
                  const Icon = link.icon;

                  if (link.hasDropdown) {
                    return (
                      <div key={link.name} className="space-y-2">
                        <button
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive || mobileServicesOpen ? "text-cyan-300" : "text-white/80"
                          }`}
                          style={{
                            background: isActive || mobileServicesOpen ? "rgba(0,191,255,0.14)" : "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(0,191,255,0.18)",
                          }}
                          aria-expanded={mobileServicesOpen}
                        >
                          <span className="flex items-center gap-2">
                            <Icon size={18} />
                            <span>Services</span>
                          </span>
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {mobileServicesOpen && (
                          <div className="pl-4 space-y-1 border-l border-cyan-300/30 animate-in slide-in-from-top duration-200">
                            {servicesList.map((service) => {
                              const ServiceIcon = service.icon;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={closeMobileMenu}
                                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white/75 hover:text-cyan-300 transition-all duration-200"
                                >
                                  <ServiceIcon size={16} />
                                  <span>{service.category}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive ? "text-cyan-300" : "text-white/80"
                      }`}
                      style={{
                        background: isActive ? "rgba(0,191,255,0.14)" : "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(0,191,255,0.14)",
                      }}
                    >
                      <Icon size={18} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-cyan-300/20">
                <Link
                  href="/web-quote"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-lg transition-all duration-200"
                  style={{
                    background: "linear-gradient(90deg, #00BFFF 0%, #0099CC 100%)",
                    boxShadow: "0 0 20px rgba(0,191,255,0.3)",
                  }}
                >
                  <span>Get Free Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`${isScrolled ? "h-[72px]" : "h-[84px]"} transition-all duration-300`} />
    </>
  );
}