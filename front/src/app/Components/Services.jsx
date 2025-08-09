"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Tab text highlighting with enhanced styling
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

const Services = () => {
  const [activeTab, setActiveTab] = useState("Web Development");

  const tabContent = {
    "Web Development": {
      heading: "WEB DEVELOPMENT EXCELLENCE",
      subheading: "Cutting-Edge Front-end & Back-end Solutions",
      description: highlightKeywords(
        "Transform your digital presence with our expert Front-end and Back-end development services. We create SEO-Friendly, lightning-fast, and fully responsive websites that drive conversions and enhance your brand's online authority."
      ),
      image: "/web.jpg",
      icon: Code,
      features: [
        "Responsive Design",
        "SEO Optimization", 
        "Fast Loading",
        "Modern Frameworks"
      ]
    },
    "Mobile Development": {
      heading: "MOBILE APP INNOVATION",
      subheading: "Native iOS & Android Development",
      description: highlightKeywords(
        "Launch powerful mobile apps that deliver seamless performance across iOS and Android platforms. Our development approach ensures optimal user engagement with intuitive navigation and lightning-fast response times."
      ),
      image: "/mobile.jpg",
      icon: Smartphone,
      features: [
        "Cross-Platform",
        "Native Performance",
        "App Store Ready",
        "Real-time Updates"
      ]
    },
    "UI/UX Design": {
      heading: "DESIGN THAT CONVERTS",
      subheading: "Beautiful Interfaces & User Experience",
      description: highlightKeywords(
        "Elevate user engagement through beautiful interfaces and carefully crafted user journeys. Our design philosophy combines aesthetic excellence with conversion optimization to maximize your business results."
      ),
      image: "/ui.jpg",
      icon: Palette,
      features: [
        "User-Centered Design",
        "Conversion Focused",
        "Brand Consistency",
        "Accessibility First"
      ]
    },
  };

  const active = tabContent[activeTab];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-200/50 rounded-full text-sm font-bold text-[#1B365D] mb-6"
          >
            <Star className="w-4 h-4 text-[#00BFFF]" />
            <span>OUR PREMIUM SERVICES</span>
            <Zap className="w-4 h-4 text-[#00BFFF]" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            <span className="text-[#1B365D]">Comprehensive</span>{" "}
            <span className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our full range of professional services designed to accelerate your business growth
          </p>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {Object.keys(tabContent).map((tab) => {
            const TabIcon = tabContent[tab].icon;
            return (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-3 px-6 py-4 font-semibold text-sm md:text-base transition-all duration-500 rounded-2xl border-2 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white border-transparent shadow-lg scale-105"
                    : "text-[#1B365D] border-blue-200/50 bg-white/80 backdrop-blur-sm hover:bg-blue-50/50 hover:border-[#00BFFF]/30 hover:scale-102"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                role="tab"
                aria-selected={activeTab === tab}
              >
                <TabIcon className={`w-5 h-5 ${activeTab === tab ? 'text-white' : 'text-[#00BFFF]'}`} />
                <span>{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Enhanced Content Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden backdrop-blur-sm"
          layout
        >
          <div className="flex flex-col lg:flex-row">
            {/* Text Section - Enhanced */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="lg:flex-1 p-8 lg:p-12 flex flex-col justify-center"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-2xl">
                      <active.icon className="w-8 h-8 text-[#1B365D]" />
                    </div>
                    <span className="text-[#00BFFF] text-sm font-bold tracking-widest uppercase">
                      {active.heading}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                    {active.subheading}
                  </h3>

                  <div
                    className="text-gray-600 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: active.description }}
                  />

                  {/* Feature List */}
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    {active.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-6">
                    <motion.button
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Image Section - Enhanced */}
            <div className="lg:flex-1 relative min-h-[400px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00BFFF]/5 via-transparent to-[#1B365D]/5"></div>
                  
                  <Image
                    src={active.image}
                    alt={`${activeTab} professional services - Viorix Digital Solutions`}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'top' }}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Service type indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute top-6 left-6 flex items-center gap-2 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                  >
                    <active.icon className="w-4 h-4" />
                    <span>{activeTab}</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Service Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {Object.entries(tabContent).map(([key, service], index) => {
            const ServiceIcon = service.icon;
            const isActive = activeTab === key;
            
            return (
              <motion.div
                key={key}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#00BFFF]/5 to-[#1B365D]/5 border-[#00BFFF]/30 shadow-lg scale-105' 
                    : 'bg-white/50 border-gray-200/50 hover:border-[#00BFFF]/30 hover:bg-blue-50/30 hover:scale-102'
                }`}
                onClick={() => setActiveTab(key)}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg' 
                      : 'bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 text-[#1B365D] group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20'
                  }`}>
                    <ServiceIcon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">{key}</h4>
                </div>

                {/* Card content */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {key === "Web Development" && "Professional websites that convert visitors into customers"}
                  {key === "Mobile Development" && "Native mobile apps for iOS and Android platforms"}
                  {key === "UI/UX Design" && "User-centered design that drives engagement"}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-3 h-3 bg-[#00BFFF] rounded-full shadow-lg"
                  />
                )}

                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#00BFFF]/5 to-[#1B365D]/5 opacity-100' 
                    : 'bg-gradient-to-br from-[#00BFFF]/0 to-[#1B365D]/0 opacity-0 group-hover:opacity-100'
                }`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;