"use client";
import React, { useState, useEffect } from "react";
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
    slug: "web-development"
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
    slug: "mobile-development"
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
    slug: "ui-ux-design"
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
    slug: "digital-marketing"
  },
  
];

const links = [
  { name: "Home", href: "/", ariaLabel: "Navigate to homepage", icon: Home },
  { name: "About", href: "/about", ariaLabel: "Learn about our company", icon: User },
  { name: "Services", href: "/services", ariaLabel: "View our services", hasDropdown: true, icon: Palette },
  { name: "Projects", href: "/projects", ariaLabel: "Browse our portfolio", icon: FolderOpen },
  { name: "Contact", href: "/contact", ariaLabel: "Get in touch with us", icon: Mail },
];

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [menuTimeout, setMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate navbar height dynamically
  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector('header');
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, [scrolled]); // Recalculate when scroll state changes

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Improved hover logic: delay hiding mega menu for smoother UX
  const handleServicesMouseEnter = () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setShowServices(true);
  };
  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => setShowServices(false), 120);
    setMenuTimeout(timeout);
  };

  const toggleMobileMenu = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(!isOpen);
    
    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 400);
  };

  const closeMobileMenu = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(false);
    setMobileServicesOpen(false);
    
    setTimeout(() => setIsAnimating(false), 400);
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
                    width={scrolled ? 112 : 160}
                    height={scrolled ? 112 : 160}
                    className={`transition-all duration-500 ${scrolled ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32" : "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44"}`}
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center space-x-4 xl:space-x-8">
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
                      {/* Mega Menu - Better positioned for tablets */}
                      {showServices && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[95vw] max-w-[900px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 z-[60]">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Service Categories */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-gray-800 mb-4">Our Services</h3>
                              {servicesData.map((service, idx) => (
                                <Link
                                  key={idx}
                                  href={`/services/${service.slug}`}
                                  onMouseEnter={() => setActiveService(idx)}
                                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 group block ${activeService === idx ? "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg" : "hover:bg-gray-50"}`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <service.icon size={20} className={activeService === idx ? "text-white" : "text-gray-600"} />
                                    <span className="font-medium">{service.category}</span>
                                  </div>
                                </Link>
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
                                  <div
                                    key={idx}
                                    className="p-4 rounded-xl border border-gray-100 hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5 transition-all duration-300 group "
                                  >
                                    <h5 className="font-semibold text-gray-800 mb-1 group-hover:text-[#1B365D] transition-colors">{service.name}</h5>
                                    <p className="text-sm text-gray-600">{service.desc}</p>
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
              <div className="hidden lg:block">
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

              {/* Enhanced Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                disabled={isAnimating}
                className={`xl:hidden relative w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg transition-all duration-300 group overflow-hidden ${
                  isOpen 
                    ? "shadow-xl bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 border-[#00BFFF]/30 scale-110" 
                    : "hover:shadow-xl hover:bg-white hover:scale-105"
                }`}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {/* Animated background pulse */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#00BFFF]/20 to-[#1B365D]/20 rounded-xl transition-all duration-300 ${
                  isOpen ? "opacity-100 animate-pulse" : "opacity-0"
                }`} />
                
                {/* Menu icon container */}
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  {/* Top line */}
                  <span className={`h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transform transition-all duration-300 ease-out origin-center ${
                    isOpen 
                      ? "rotate-45 translate-y-2 w-6 shadow-sm" 
                      : "w-5 group-hover:w-6 group-hover:shadow-sm"
                  }`} />
                  
                  {/* Middle line */}
                  <span className={`h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transition-all duration-300 ease-out ${
                    isOpen 
                      ? "opacity-0 scale-0 rotate-180" 
                      : "w-6 group-hover:w-6 group-hover:shadow-sm"
                  }`} />
                  
                  {/* Bottom line */}
                  <span className={`h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transform transition-all duration-300 ease-out origin-center ${
                    isOpen 
                      ? "-rotate-45 -translate-y-2 w-6 shadow-sm" 
                      : "w-4 group-hover:w-6 group-hover:shadow-sm"
                  }`} />
                </div>

                {/* Floating dots for enhanced visual feedback */}
                <div className={`absolute top-1 right-1 w-1 h-1 bg-[#00BFFF] rounded-full transition-all duration-500 ${
                  isOpen ? "opacity-100 animate-ping" : "opacity-0"
                }`} />
                <div className={`absolute bottom-1 left-1 w-1 h-1 bg-[#1B365D] rounded-full transition-all duration-500 delay-100 ${
                  isOpen ? "opacity-100 animate-ping" : "opacity-0"
                }`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile/Tablet Menu - Fixed positioning */}
      <div className={`fixed inset-0 z-40 xl:hidden transition-all duration-400 ${
        isOpen ? "visible" : "invisible"
      }`} style={{ top: `${navHeight}px` }}>
        
        {/* Backdrop for tablets */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-400 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />
        
        {/* Sliding Menu Panel - Better positioning for tablets */}
        <div className={`absolute top-0 right-0 h-full w-full sm:w-96 md:w-80 lg:w-96 bg-white shadow-2xl transition-all duration-400 ease-out overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          
          <div className="relative h-full flex flex-col">
            

            {/* Tablet-only Header - Simplified */}
            <div className={`hidden sm:block relative p-4 border-b border-gray-100 bg-gradient-to-r from-[#00BFFF]/5 to-[#1B365D]/5 transition-all duration-500 delay-100 ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}>
              
            </div>

            {/* Navigation with staggered animations */}
            <nav className="relative p-4 space-y-3 flex-grow overflow-y-auto">
              {links.map((link, index) => {
                const isActive = pathname === link.href || (link.hasDropdown && (pathname.startsWith("/services") || servicesData.some(service => pathname.includes(service.slug))));
                const delay = 150 + (index * 50);
                
                if (link.name === "Services") {
                  return (
                    <div key={link.name} className={`space-y-2 transition-all duration-500 ${
                      isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                    }`} style={{ transitionDelay: `${delay}ms` }}>
                      
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between p-4 rounded-2xl font-medium transition-all duration-300 group ${
                          isActive || mobileServicesOpen
                            ? "text-[#1B365D] bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 shadow-lg" 
                            : "text-gray-700 hover:bg-gradient-to-r hover:from-[#00BFFF]/5 hover:to-[#1B365D]/5"
                        }`}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-expanded={mobileServicesOpen}
                      >
                        <span className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                            isActive || mobileServicesOpen
                              ? "bg-white shadow-md" 
                              : "bg-gray-100 group-hover:bg-white group-hover:shadow-md"
                          }`}>
                            <link.icon size={16} className={isActive || mobileServicesOpen ? "text-[#1B365D]" : "text-gray-600"} />
                          </div>
                          <span className="text-lg">Services</span>
                        </span>
                        <ChevronDown size={20} className={`transition-all duration-300 ${
                          mobileServicesOpen ? "rotate-180 text-[#00BFFF]" : "text-gray-400"
                        }`} />
                      </button>

                      {/* Services Dropdown with smooth height transition */}
                      <div className={`overflow-hidden transition-all duration-400 ease-out ${
                        mobileServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}>
                        <div className="pt-2 space-y-2">
                          {servicesData.map((service, serviceIndex) => (
                            <Link
                              key={service.category}
                              href={`/services/${service.slug}`}
                              onClick={closeMobileMenu}
                              className={`flex items-center p-3 ml-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-100 hover:from-[#00BFFF]/10 hover:to-[#1B365D]/10 hover:border-[#00BFFF]/20 text-sm font-medium transition-all duration-300 group transform ${
                                mobileServicesOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                              }`}
                              style={{ transitionDelay: `${100 + (serviceIndex * 50)}ms` }}
                            >
                              <div className="p-1.5 rounded-lg bg-white shadow-sm mr-3 group-hover:shadow-md transition-shadow duration-200">
                                <service.icon size={16} className="text-[#1B365D] group-hover:text-[#00BFFF] transition-colors duration-200" />
                              </div>
                              <span className="flex-1 group-hover:text-[#1B365D] transition-colors duration-200">
                                {service.category}
                              </span>
                              <ArrowRight size={14} className="text-[#00BFFF] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between p-4 rounded-2xl font-medium transition-all duration-500 group ${
                      isActive
                        ? "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg transform scale-105"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-[#00BFFF]/10 hover:to-[#1B365D]/10 hover:text-[#1B365D] hover:scale-105"
                    } ${isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <span className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20" 
                          : "bg-gray-100 group-hover:bg-white group-hover:shadow-md"
                      }`}>
                        <link.icon size={16} className={isActive ? "text-white" : "text-gray-600 group-hover:text-[#1B365D]"} />
                      </div>
                      <span className="text-lg">{link.name}</span>
                    </span>
                    <ArrowRight
                      size={20}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#00BFFF]"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Enhanced CTA with slide-up animation */}
            <div className={`relative p-4 border-t border-gray-100 bg-gradient-to-r from-[#00BFFF]/5 to-[#1B365D]/5 transition-all duration-500 delay-500 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100/50">
                <div className="text-center mb-4">
                  <div className="text-sm font-semibold text-gray-700">Ready to get started?</div>
                  <div className="text-xs text-gray-500 mt-1">Let&apos;s discuss your project</div>
                </div>
                
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="relative flex items-center justify-center space-x-2 w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  
                  <span className="relative z-10">Get a Quote</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  
                  {/* Floating particles */}
                  <div className="absolute top-1 right-2 w-1 h-1 bg-white/60 rounded-full animate-ping" />
                  <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </Link>
                
                {/* Contact info */}
                <div className="mt-4 pt-3 border-t border-gray-200/50">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <span>📞 Call us now</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>✉️ Quick response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className={`${scrolled ? "h-20" : "h-24"} transition-all duration-500`} />
    </>
  );
}