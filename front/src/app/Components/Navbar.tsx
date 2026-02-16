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
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const [navHeight, setNavHeight] = useState(0);

  // Clean-up safe ResizeObserver reference
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track navbar height so mobile menu can position itself under the header
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateNavHeight = () => {
      const navbar = document.querySelector("header");
      if (navbar instanceof HTMLElement) {
        setNavHeight(navbar.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    try {
      resizeObserverRef.current = new ResizeObserver(updateNavHeight);
      const navbar = document.querySelector("header");
      if (navbar) resizeObserverRef.current.observe(navbar);
    } catch {
      // ResizeObserver may not be available in some environments; ignore gracefully.
    }

    return () => {
      window.removeEventListener("resize", updateNavHeight);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [scrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "unset";
    }
    return () => {
      document.body.style.overflow = prev || "unset";
    };
  }, [isOpen]);

  // Clean up any pending timeout at unmount
  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
        menuTimeoutRef.current = null;
      }
    };
  }, []);

  const handleServicesMouseEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setShowServices(true);
  };

  const handleServicesMouseLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setShowServices(false);
      menuTimeoutRef.current = null;
    }, 150);
  };

  const toggleMobileMenu = () => {
    setIsOpen((v) => {
      const next = !v;
      if (!next) {
        setMobileServicesOpen(false);
      }
      return next;
    });
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  const closeAllDropdowns = () => {
    setShowServices(false);
    setMobileServicesOpen(false);
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
  };

  // Keyboard handler for closing dropdowns / menus with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllDropdowns();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const servicesList = useMemo(() => servicesData, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg py-2"
            : "bg-white/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block" aria-label="Viorix Digital Solutions, home">
                {/* Use consistent intrinsic image size; control visual via classes to avoid layout shift */}
                <Image
                  src="/logo.png"
                  alt="Viorix Digital Solutions logo"
                  width={160}
                  height={160}
                  className={`transition-all duration-300 ${
                    scrolled
                      ? "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                      : "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40"
                  }`}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary navigation">
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
                        className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          isActive || showServices
                            ? "text-white bg-gradient-to-r from-[#00BFFF] to-[#1B365D] shadow-md"
                            : "text-gray-700 hover:text-[#1B365D] hover:bg-gray-50"
                        }`}
                        onFocus={handleServicesMouseEnter}
                        onBlur={() => {
                          // slight delay so nested focusable elements don't immediately close it
                          if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
                          menuTimeoutRef.current = setTimeout(() => setShowServices(false), 150);
                        }}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${showServices ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown (desktop) */}
                      {showServices && (
                        <div
                          id="services-dropdown"
                          role="menu"
                          aria-label="Services menu"
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-60"
                        >
                          <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-gray-800 mb-4">Our Services</h3>
                              {servicesList.map((service, idx) => {
                                const ServiceIcon = service.icon;
                                return (
                                  <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    onMouseEnter={() => setActiveService(idx)}
                                    className={`block w-full text-left p-3 rounded-lg transition-all duration-200 focus:outline-none ${
                                      activeService === idx
                                        ? "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white"
                                        : "hover:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <ServiceIcon size={18} className={activeService === idx ? "text-white" : "text-gray-600"} />
                                      <span className="font-medium">{service.category}</span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            <div className="col-span-2 pl-6 border-l border-gray-100">
                              <div className="flex items-center space-x-3 mb-4">
                                {React.createElement(servicesList[activeService].icon, { size: 20, className: "text-[#00BFFF]" })}
                                <h4 className="text-lg font-bold text-gray-800">{servicesList[activeService].category}</h4>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {servicesList[activeService].services.map((svc, sidx) => (
                                  <div
                                    key={sidx}
                                    className="p-3 rounded-lg border border-gray-100 hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5 transition-all duration-200"
                                  >
                                    <h5 className="font-semibold text-gray-800 mb-1">{svc.name}</h5>
                                    <p className="text-sm text-gray-600">{svc.desc}</p>
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
                    className={`relative px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-[#00BFFF] to-[#1B365D] shadow-md"
                        : "text-gray-700 hover:text-[#1B365D] hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon size={16} />
                      {link.name}
                    </span>
                    {isActive && <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />}
                  </Link>
                );
              })}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Desktop CTA */}
              <div className="hidden lg:block">
                <Link
                  href="/web-quote"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Mobile CTA */}
              <div className="block lg:hidden">
                <Link
                  href="/web-quote"
                  className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span>Quote</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute left-0 top-0 w-6 h-0.5 bg-gray-600 transform transition-all duration-200 ${
                      isOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-2.5 w-6 h-0.5 bg-gray-600 transform transition-all duration-200 ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-5 w-6 h-0.5 bg-gray-600 transform transition-all duration-200 ${
                      isOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-x-0 z-40 lg:hidden"
          style={{ top: `${navHeight}px`, bottom: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/20" onClick={closeMobileMenu} aria-hidden="true" />

          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl">
            <div className="p-6 overflow-auto h-full">
              <nav className="space-y-4" aria-label="Mobile primary navigation">
                {links.map((link) => {
                  const isActive = pathname === link.href || (link.hasDropdown && pathname?.startsWith("/services"));
                  const Icon = link.icon;
                  if (link.hasDropdown) {
                    return (
                      <div key={link.name} className="space-y-2">
                        <button
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isActive || mobileServicesOpen
                              ? "text-white bg-gradient-to-r from-[#00BFFF] to-[#1B365D] shadow-md"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-list"
                        >
                          <span className="flex items-center space-x-3">
                            <Icon size={18} />
                            <span>Services</span>
                          </span>
                          <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                        </button>

                        {mobileServicesOpen && (
                          <div id="mobile-services-list" className="pl-6 space-y-2" role="menu" aria-label="Mobile services">
                            {servicesList.map((service) => {
                              const ServiceIcon = service.icon;
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={closeMobileMenu}
                                  className="flex items-center space-x-3 p-2 rounded-lg text-sm text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] transition-all duration-200"
                                  role="menuitem"
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
                      className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isActive ? "text-white bg-gradient-to-r from-[#00BFFF] to-[#1B365D] shadow-md" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/web-quote"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to avoid content jumping under the fixed header */}
      <div className={`${scrolled ? "h-20" : "h-28"} transition-all duration-300`} />
    </>
  );
}