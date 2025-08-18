"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Smartphone,
  Globe,
  Database,
  Palette,
  BarChart3,
  Cloud,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

const servicesData = [
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
  },
  {
    category: "Cloud Solutions",
    icon: Cloud,
    services: [
      { name: "Cloud Migration", desc: "Seamless cloud transitions" },
      { name: "DevOps Services", desc: "Automated deployment pipelines" },
      { name: "Infrastructure Management", desc: "Scalable cloud infrastructure" },
      { name: "Security Solutions", desc: "Comprehensive security measures" },
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    category: "Data & Analytics",
    icon: Database,
    services: [
      { name: "Data Analysis", desc: "Transform data into insights" },
      { name: "Business Intelligence", desc: "Advanced reporting solutions" },
      { name: "Machine Learning", desc: "AI-powered solutions" },
      { name: "Data Visualization", desc: "Interactive dashboards" },
    ],
    color: "from-yellow-500 to-orange-500",
  },
];

const links = [
  { name: "Home", href: "/", ariaLabel: "Navigate to homepage" },
  { name: "About", href: "/about", ariaLabel: "Learn about our company" },
  { name: "Services", href: "/services", ariaLabel: "View our services", hasDropdown: true },
  { name: "Projects", href: "/projects", ariaLabel: "Browse our portfolio" },
  { name: "Contact", href: "/contact", ariaLabel: "Get in touch with us" },
];

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Improved hover logic: delay hiding mega menu for smoother UX
  const handleServicesMouseEnter = () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setShowServices(true);
  };
  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => setShowServices(false), 120); // short delay prevents flickering
    setMenuTimeout(timeout);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5 py-3" : "bg-white/95 backdrop-blur-md py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative z-10">
              <Link href="/" aria-label="Return to homepage" className="block">
                <div className={`relative transition-all duration-500 ${scrolled ? "drop-shadow-lg" : "drop-shadow-2xl"}`}>
                  <Image
                    src="/logo.png"
                    alt="Company logo"
                    width={scrolled ? 112 : 160} // fallback width for various breakpoints
                    height={scrolled ? 112 : 160} // fallback height for various breakpoints
                    className={`transition-all duration-500 ${scrolled ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32" : "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44"}`}
                    priority
                  />
                </div>
              </Link>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.hasDropdown && pathname.startsWith("/services"));
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
                        className={`flex items-center space-x-1 px-4 py-2 rounded-full text-base font-medium tracking-wide transition-all duration-300 ${isActive || showServices ? "text-[#1B365D] bg-[#00BFFF]/10" : "text-gray-700 hover:text-[#1B365D] hover:bg-gray-50"}`}
                        aria-expanded={showServices}
                        aria-haspopup="true"
                        tabIndex={0}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${showServices ? "rotate-180" : ""}`} />
                      </button>
                      {/* Mega Menu */}
                      {showServices && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[96vw] max-w-[900px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 z-50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Service Categories */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-gray-800 mb-4">Our Services</h3>
                              {servicesData.map((service, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onMouseEnter={() => setActiveService(idx)}
                                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 group ${activeService === idx ? "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg" : "hover:bg-gray-50"}`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <service.icon size={20} className={activeService === idx ? "text-white" : "text-gray-600"} />
                                    <span className="font-medium">{service.category}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                            {/* Active Service Details */}
                            <div className="md:col-span-2 pl-0 md:pl-6 border-l-0 md:border-l border-gray-100">
                              <div className="mb-4">
                                <div className="flex items-center space-x-3 mb-2">
                                  {React.createElement(servicesData[activeService].icon, { size: 24, className: "text-[#00BFFF]" })}
                                  <h4 className="text-xl font-bold text-gray-800">{servicesData[activeService].category}</h4>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {servicesData[activeService].services.map((service, idx) => (
                                  <div key={idx} className="p-4 rounded-xl border border-gray-100 hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5 transition-all duration-300 group cursor-pointer">
                                    <h5 className="font-semibold text-gray-800 mb-1 group-hover:text-[#1B365D] transition-colors">{service.name}</h5>
                                    <p className="text-sm text-gray-600">{service.desc}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link href="/services" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white rounded-full font-semibold hover:from-[#1B365D] hover:to-[#00BFFF] transition-all duration-300 group">
                                  <span>View All Services</span>
                                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-base font-medium tracking-wide transition-all duration-300 group ${isActive ? "text-[#2565AD] bg-[#2565AD]/10" : "text-gray-700 hover:text-[#0047AB] hover:bg-gray-50"}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00BFFF] transition-all duration-300 ${isActive ? "w-6" : "w-0 group-hover:w-6"}`} />
                  </Link>
                );
              })}
            </nav>
            {/* CTA Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden md:block">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-7 py-3 font-semibold text-white transition-all duration-300 ease-out transform hover:scale-105 focus:scale-105"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    overflow: "hidden",
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] via-[#0099DD] to-[#1B365D] rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300" style={{ zIndex: 0 }} />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] via-cyan-400 to-[#1B365D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ padding: '2px', zIndex: 0 }} />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" style={{ zIndex: 0 }} />
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm font-bold tracking-wide">Get Free Quote</span>
                    <ArrowRight size={18} className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00BFFF] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ zIndex: 0 }} />
                  <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#1B365D] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: "0.3s", zIndex: 0 }} />
                </Link>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-11 h-11 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transform transition-all duration-300 ease-out ${isOpen ? "rotate-45 translate-y-1.5 w-6" : "group-hover:w-6"}`} />
                  <span className={`w-full h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transition-all duration-300 ease-out ${isOpen ? "opacity-0 scale-0" : "group-hover:w-6"}`} />
                  <span className={`w-full h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transform transition-all duration-300 ease-out ${isOpen ? "-rotate-45 -translate-y-1.5 w-6" : "group-hover:w-6"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
            <div className="relative h-full flex flex-col">
              {/* Mobile Menu Gradient Backgrounds */}
              <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-bl from-[#00BFFF]/20 via-[#1B365D]/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-tr from-[#1B365D]/10 via-[#00BFFF]/5 to-transparent pointer-events-none" />
              {/* Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Company logo"
                      width={58}
                      height={58}
                      className="w-20 h-20  "
                      priority
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent">Viorix Digital Solutions</div>
                    <div className="text-xs mt-1">Your Digital Partner</div>
                  </div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-white/50 rounded-xl transition-colors duration-200 backdrop-blur-sm"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              {/* Mobile Navigation */}
              <nav className="relative p-4 space-y-2 flex-grow">
                {links.map((link) => {
                  const isActive = pathname === link.href || (link.hasDropdown && pathname.startsWith("/services"));
                  if (link.name === "Services") {
                    return (
                      <div key={link.name} className="space-y-2">
                        {/* Mobile Dropdown for Service Categories */}
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between p-4 rounded-2xl font-medium bg-white  transition-all duration-300 ${
                            mobileServicesOpen ? "text-[#1B365D] bg-[#00BFFF]/10" : "text-gray-700"
                          }`}
                          onClick={() => setMobileServicesOpen((prev) => !prev)}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-dropdown"
                        >
                          <span className="flex items-center space-x-2">
                            <span>Services</span>
                          </span>
                          <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileServicesOpen && (
                          <div
                            id="mobile-services-dropdown"
                            className="mt-2 space-y-2"
                          >
                            {servicesData.map((service) => (
                              <Link
                                key={service.category}
                                href={`/services/${service.category.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={closeMobileMenu}
                                className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gradient-to-r hover:from-[#00BFFF]/10 hover:to-[#1B365D]/10 hover:text-[#1B365D] text-base font-semibold transition-all duration-200"
                              >
                                <service.icon size={18} className="mr-3 text-[#1B365D]" />
                                <span>{service.category}</span>
                                <ArrowRight size={16} className="ml-auto text-[#00BFFF]" />
                              </Link>
                            ))}
                            
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
                      className={`flex items-center justify-between p-4 rounded-2xl font-medium transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-[#00BFFF]/10 hover:to-[#1B365D]/10 hover:text-[#1B365D]"
                      }`}
                    >
                      <span className="text-lg">{link.name}</span>
                      <ArrowRight
                        size={20}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
              {/* Mobile CTA */}
              <div className="relative p-4 border-t border-gray-100 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold text-gray-700">Ready to get started?</div>
                    <div className="text-xs text-gray-500">Let&apos;s discuss your project</div>
                  </div>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center space-x-2 w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={`${scrolled ? "h-20" : "h-24"} transition-all duration-500`} />
    </>
  );
}