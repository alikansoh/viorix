"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { 
  Code, 
  Smartphone, 
  Palette, 
  ArrowRight, 
  Check, 
  Star,
  Zap,
  Shield,
  Globe,
  TrendingUp
} from "lucide-react";

// SEO-friendly text highlighting with enhanced styling
const highlightKeywords = (text) => {
  const keywords = [
    "Front-end",
    "Back-end", 
    "SEO-Friendly",
    "responsive",
    "mobile apps",
    "iOS",
    "Android",
    "user engagement",
    "beautiful interfaces",
    "user journeys",
    "performance",
    "intuitive",
    "seamless"
  ];

  let highlighted = text;

  keywords.forEach((word) => {
    const regex = new RegExp(`(${word})`, "gi");
    highlighted = highlighted.replace(
      regex,
      '<span class="font-bold text-transparent bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text">$1</span>'
    );
  });

  return highlighted;
};

// Structured data for services
const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Viorix Digital Solutions",
    "description": "Professional web development, mobile app development, and UI/UX design services",
    "url": "https://viorix.com",
    "logo": "https://viorix.com/logo.png",
    "sameAs": [
      "https://facebook.com/viorix",
      "https://twitter.com/viorix",
      "https://linkedin.com/company/viorix"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development Services",
            "description": "Professional front-end and back-end development with SEO optimization and responsive design",
            "provider": {
              "@type": "Organization",
              "name": "Viorix Digital Solutions"
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Responsive Web Design"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO Optimization"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Modern Framework Development"
                  }
                }
              ]
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development Services",
            "description": "Native iOS and Android mobile application development with cross-platform compatibility",
            "provider": {
              "@type": "Organization",
              "name": "Viorix Digital Solutions"
            },
            "areaServed": "Worldwide"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design Services",
            "description": "User-centered design and user experience optimization for web and mobile applications",
            "provider": {
              "@type": "Organization",
              "name": "Viorix Digital Solutions"
            },
            "areaServed": "Worldwide"
          }
        }
      ]
    }
  };
};

const Services = () => {
  const [activeTab, setActiveTab] = useState("Web Development");

  // SEO-optimized tab content with better descriptions and keywords
  const tabContent = {
    "Web Development": {
      heading: "WEB DEVELOPMENT EXCELLENCE",
      subheading: "Professional Front-end & Back-end Development Services",
      description: highlightKeywords(
        "Transform your digital presence with our expert Front-end and Back-end development services. We create SEO-Friendly, lightning-fast, and fully responsive websites that drive conversions and enhance your brand's online authority with modern web technologies."
      ),
      metaDescription: "Professional web development services including front-end, back-end, SEO optimization, and responsive design. Transform your digital presence with expert web development.",
      image: "/web.jpg",
      imageAlt: "Professional web development services - responsive websites and SEO optimization by Viorix Digital Solutions",
      icon: Code,
      features: [
        "Responsive Web Design",
        "SEO Optimization & Technical SEO", 
        "Fast Loading Performance",
        "Modern Web Frameworks (React, Next.js)"
      ],
      keywords: ["web development", "front-end development", "back-end development", "SEO optimization", "responsive design"]
    },
    "Mobile Development": {
      heading: "MOBILE APP DEVELOPMENT", 
      subheading: "Native iOS & Android App Development Services",
      description: highlightKeywords(
        "Launch powerful mobile apps that deliver seamless performance across iOS and Android platforms. Our mobile development approach ensures optimal user engagement with intuitive navigation, native performance, and lightning-fast response times."
      ),
      metaDescription: "Expert mobile app development services for iOS and Android. Native performance, cross-platform compatibility, and app store optimization.",
      image: "/mobile.jpg",
      imageAlt: "Mobile app development services - iOS and Android native apps by Viorix Digital Solutions",
      icon: Smartphone,
      features: [
        "Cross-Platform Development",
        "Native iOS & Android Performance",
        "App Store Optimization (ASO)",
        "Real-time Updates & Push Notifications"
      ],
      keywords: ["mobile app development", "iOS development", "Android development", "cross-platform apps", "app store optimization"]
    },
    "UI/UX Design": {
      heading: "UI/UX DESIGN SERVICES",
      subheading: "User-Centered Design & User Experience Optimization",
      description: highlightKeywords(
        "Elevate user engagement through beautiful interfaces and carefully crafted user journeys. Our UI/UX design philosophy combines aesthetic excellence with conversion optimization and accessibility standards to maximize your business results."
      ),
      metaDescription: "Professional UI/UX design services focused on user experience, conversion optimization, and accessibility. Beautiful interfaces that drive results.",
      image: "/ui.jpg", 
      imageAlt: "UI/UX design services - user experience design and interface optimization by Viorix Digital Solutions",
      icon: Palette,
      features: [
        "User-Centered Design Research",
        "Conversion Rate Optimization",
        "Brand Consistency & Style Guides", 
        "Accessibility (WCAG) Compliance"
      ],
      keywords: ["UI design", "UX design", "user experience", "user interface", "conversion optimization", "accessibility design"]
    },
  };

  const active = tabContent[activeTab];

  // Update page title and meta description when active tab changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `${activeTab} Services | Viorix Digital Solutions - ${active.subheading}`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', active.metaDescription);
      }
      
      // Update keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');  
      if (metaKeywords) {
        metaKeywords.setAttribute('content', active.keywords.join(', '));
      }
    }
  }, [activeTab, active]);

  return (
    <>
      {/* SEO Head Elements */}
      <Head>
        <title>Professional Digital Services | Web Development, Mobile Apps & UI/UX Design | Viorix</title>
        <meta name="description" content="Professional web development, mobile app development, and UI/UX design services. SEO-optimized websites, native mobile apps, and conversion-focused design solutions." />
        <meta name="keywords" content="web development, mobile app development, UI UX design, SEO optimization, responsive design, digital services, professional web design" />
        <meta name="author" content="Viorix Digital Solutions" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Professional Digital Services | Viorix Digital Solutions" />
        <meta property="og:description" content="Expert web development, mobile app development, and UI/UX design services. Transform your digital presence with professional solutions." />
        <meta property="og:image" content="/viorix-digital-services-og.jpg" />
        <meta property="og:url" content="https://viorix.co.uk/services" />
        <meta property="og:site_name" content="Viorix Digital Solutions" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Digital Services | Viorix Digital Solutions" />
        <meta name="twitter:description" content="Expert web development, mobile app development, and UI/UX design services." />
        <meta name="twitter:image" content="/viorix-digital-services-twitter.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://viorix.co.uk/services" />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta name="language" content="English" />
        <meta httpEquiv="content-language" content="en-GB" />
      </Head>

      {/* Main Services Section with semantic HTML */}
      <section 
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
        aria-label="Professional Digital Services"
        role="main"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header with proper heading hierarchy */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-200/50 rounded-full text-xs sm:text-sm font-bold text-[#1B365D] mb-4 sm:mb-6"
              role="banner"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#00BFFF]" aria-hidden="true" />
              <span className="text-xs sm:text-sm">OUR PREMIUM SERVICES</span>
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#00BFFF]" aria-hidden="true" />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 px-2">
              <span className="text-[#1B365D]">Comprehensive</span>{" "}
              <span className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent">
                Digital Solutions
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Discover our full range of professional services designed to accelerate your business growth and digital transformation
            </p>
          </motion.header>

          {/* Enhanced Tabs with ARIA labels and keyboard navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-2 mb-8 sm:mb-12"
            role="tablist"
            aria-label="Service categories"
          >
            {Object.keys(tabContent).map((tab) => {
              const TabIcon = tabContent[tab].icon;
              return (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm md:text-base transition-all duration-500 rounded-xl sm:rounded-2xl border-2 w-full sm:w-auto ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white border-transparent shadow-lg scale-100 sm:scale-105"
                      : "text-[#1B365D] border-blue-200/50 bg-white/80 backdrop-blur-sm hover:bg-blue-50/50 hover:border-[#00BFFF]/30 hover:scale-100 sm:hover:scale-102"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`${tab.toLowerCase().replace(/\s+/g, '-')}-panel`}
                  id={`${tab.toLowerCase().replace(/\s+/g, '-')}-tab`}
                >
                  <TabIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === tab ? 'text-white' : 'text-[#00BFFF]'}`} aria-hidden="true" />
                  <span className="text-sm sm:text-base">{tab}</span>
                  {activeTab === tab && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.nav>

          {/* Enhanced Content Card with proper semantic structure */}
          <motion.article
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-100/50 overflow-hidden backdrop-blur-sm"
            layout
            role="tabpanel"
            aria-labelledby={`${activeTab.toLowerCase().replace(/\s+/g, '-')}-tab`}
            id={`${activeTab.toLowerCase().replace(/\s+/g, '-')}-panel`}
          >
            <div className="flex flex-col">
              {/* Mobile Image Section with proper alt text */}
              <div className="block lg:hidden relative h-48 sm:h-64">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 via-transparent to-[#1B365D]/5" aria-hidden="true"></div>
                    
                    <Image
                      src={active.image}
                      alt={active.imageAlt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center' }}
                      priority={activeTab === "Web Development"}
                      sizes="100vw"
                      loading={activeTab === "Web Development" ? "eager" : "lazy"}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true"></div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="absolute top-4 left-4 flex items-center gap-2 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg"
                    >
                      <active.icon className="w-3 h-3" aria-hidden="true" />
                      <span>{activeTab}</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* Text Section with proper heading hierarchy */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5 }}
                    className="lg:flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-center"
                  >
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="p-2 sm:p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-xl sm:rounded-2xl">
                          <active.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#1B365D]" aria-hidden="true" />
                        </div>
                        <span className="text-[#00BFFF] text-xs sm:text-sm font-bold tracking-widest uppercase">
                          {active.heading}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-gray-900 leading-tight">
                        {active.subheading}
                      </h2>

                      <div
                        className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: active.description }}
                      />

                      {/* Feature List with proper semantic markup */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-8" role="list">
                        {active.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700"
                            role="listitem"
                          >
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Button with proper accessibility */}
                      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6">
                        <motion.button
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:ring-offset-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`Learn more about ${activeTab} services`}
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Desktop Image Section with proper alt text */}
                <div className="hidden lg:block lg:flex-1 relative min-h-[400px] lg:min-h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 via-transparent to-[#1B365D]/5" aria-hidden="true"></div>
                      
                      <Image
                        src={active.image}
                        alt={active.imageAlt}
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'top' }}
                        priority={activeTab === "Web Development"}
                        sizes="50vw"
                        loading={activeTab === "Web Development" ? "eager" : "lazy"}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" aria-hidden="true"></div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="absolute top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                      >
                        <active.icon className="w-4 h-4" aria-hidden="true" />
                        <span>{activeTab}</span>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Enhanced Service Cards Grid with proper semantic structure */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
            aria-label="Service overview cards"
          >
            {Object.entries(tabContent).map(([key, service], index) => {
              const ServiceIcon = service.icon;
              const isActive = activeTab === key;
              
              return (
                <motion.article
                  key={key}
                  className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#00BFFF]/5 to-[#1B365D]/5 border-[#00BFFF]/30 shadow-lg scale-100 sm:scale-105' 
                      : 'bg-white/50 border-gray-200/50 hover:border-[#00BFFF]/30 hover:bg-blue-50/30 hover:scale-100 sm:hover:scale-102'
                  }`}
                  onClick={() => setActiveTab(key)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveTab(key);
                    }
                  }}
                  whileHover={{ y: isActive ? 0 : -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${key} service`}
                >
                  {/* Card header */}
                  <header className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg' 
                        : 'bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 text-[#1B365D] group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20'
                    }`}>
                      <ServiceIcon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-900">{key}</h3>
                  </header>

                  {/* Card content */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
                    {key === "Web Development" && "Professional websites that convert visitors into customers with SEO optimization"}
                    {key === "Mobile Development" && "Native mobile apps for iOS and Android platforms with superior performance"}
                    {key === "UI/UX Design" && "User-centered design that drives engagement and conversion optimization"}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2" role="list">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600" role="listitem">
                        <Check className="w-3 h-3 text-green-500 flex-shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-[#00BFFF] rounded-full shadow-lg"
                      aria-label="Currently selected service"
                    />
                  )}

                  {/* Hover effect */}
                  <div className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#00BFFF]/5 to-[#1B365D]/5 opacity-100' 
                      : 'bg-gradient-to-br from-[#00BFFF]/0 to-[#1B365D]/0 opacity-0 group-hover:opacity-100'
                  }`} aria-hidden="true" />
                </motion.article>
              );
            })}
          </motion.section>
        </div>
      </section>
    </>
  );
};

export default Services;