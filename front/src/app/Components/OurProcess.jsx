'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  Calendar,
  Code,
  Package,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    title: 'Discovery Call',
    description: 'Discuss your project goals, audience, and requirements to align on vision.',
    icon: <MessageSquare className="w-6 h-6" />,
    duration: '1-2 Days',
    deliverables: ['Project Brief', 'Requirements Document', 'Timeline'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50'
  },
  {
    title: 'Planning & Strategy',
    description: 'Create a project roadmap, sitemap, and technical plan for seamless execution.',
    icon: <Calendar className="w-6 h-6" />,
    duration: '3-5 Days',
    deliverables: ['Project Roadmap', 'Sitemap', 'Technical Specification'],
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'from-purple-50 to-indigo-50'
  },
  {
    title: 'Design & Development',
    description: 'Craft a custom design and build your site with clean, performant code.',
    icon: <Code className="w-6 h-6" />,
    duration: '2-4 Weeks',
    deliverables: ['UI/UX Design', 'Responsive Code', 'Quality Testing'],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-50 to-teal-50'
  },
  {
    title: 'Testing & Launch',
    description: 'Conduct thorough testing, optimise performance, and deploy your site securely.',
    icon: <CheckCircle className="w-6 h-6" />,
    duration: '3-5 Days',
    deliverables: ['Performance Testing', 'Security Audit', 'Live Deployment'],
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50'
  },
  {
    title: 'Ongoing Support',
    description: 'Provide maintenance, updates, and analytics insights to keep you ahead.',
    icon: <Package className="w-6 h-6" />,
    duration: 'Ongoing',
    deliverables: ['24/7 Monitoring', 'Regular Updates', 'Analytics Reports'],
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50'
  },
];

export default function OurSimpleProcess() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        {
          threshold: 0.6,
          rootMargin: '-20% 0px -20% 0px'
        }
      );
      
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 relative overflow-hidden" id="process" ref={containerRef}>
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30"></div>
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full text-xs sm:text-sm font-medium text-[#0047AB] mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Streamlined Process</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-4 sm:mb-6 bg-gradient-to-r from-[#0047AB] via-[#0066CC] to-[#00B4D8] bg-clip-text text-transparent leading-tight px-2">
            Our Simple Process
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            From initial concept to final launch, we follow a proven methodology 
            that ensures <span className="font-semibold text-[#0047AB]">quality</span>, 
            <span className="font-semibold text-[#0047AB]"> transparency</span>, and 
            <span className="font-semibold text-[#0047AB]"> results</span>.
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'w-6 sm:w-8 bg-gradient-to-r from-[#0047AB] to-[#00B4D8]' 
                    : 'w-1.5 sm:w-2 bg-gray-300'
                }`}
                style={{ transform: activeStep === index ? 'scale(1.2)' : 'scale(1)' }}
              />
            ))}
          </div>
        </div>

        {/* Steps Container */}
        <div className="max-w-6xl mx-auto relative">
          <div className="flex">
            {/* Left Side - Desktop Icons */}
            <div className="hidden lg:flex flex-col relative w-24 xl:w-32">
              {/* Vertical Progress Line */}
              <div 
                className="absolute left-8 xl:left-12 top-16 w-0.5 xl:w-1 bg-gradient-to-b from-[#0047AB]/20 via-[#00B4D8]/40 to-[#0047AB]/20 rounded-full" 
                style={{ height: 'calc(100% - 8rem)' }}
              ></div>
              
              {/* Desktop Icons */}
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{ 
                    height: index === steps.length - 1 ? 'auto' : '200px',
                    paddingTop: '20px'
                  }}
                >
                  <div
                    className={`relative z-10 w-16 h-16 xl:w-20 xl:h-20 rounded-full flex items-center justify-center transition-all duration-700 mx-auto ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] shadow-xl shadow-blue-500/30'
                        : 'bg-white/90 border-2 border-gray-200 shadow-lg hover:shadow-xl'
                    }`}
                    style={{
                      transform: `scale(${activeStep === index ? 1.1 : 0.9}) rotate(${activeStep === index ? 360 : 0}deg)`,
                      color: activeStep === index ? 'white' : '#0047AB',
                      animation: activeStep === index ? 'iconBounce 0.8s ease-out, iconGlow 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    {React.cloneElement(step.icon, {
                      className: `w-6 h-6 xl:w-7 xl:h-7 transition-all duration-500 ${activeStep === index ? 'text-white animate-pulse' : 'text-[#0047AB]'}`,
                      style: {
                        animation: activeStep === index ? 'iconFloat 3s ease-in-out infinite' : 'none'
                      }
                    })}
                    
                    {/* Smaller Step Number for Desktop */}
                    <div className="absolute -top-1 -right-1 xl:-top-2 xl:-right-2">
                      <div className="w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-gradient-to-r from-[#0047AB] to-[#00B4D8] flex items-center justify-center shadow-md">
                        <span className="font-bold text-white text-xs">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Pulse effect for active step */}
                    {activeStep === index && (
                      <>
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0047AB] to-[#00B4D8] opacity-20"
                          style={{
                            animation: 'pulse 2s ease-in-out infinite'
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-full border-2 border-white/50"
                          style={{
                            animation: 'ripple 2s ease-out infinite'
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Step Content */}
            <div className="flex-1 lg:pl-8 xl:pl-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={el => stepRefs.current[index] = el}
                  className="group relative mb-8 sm:mb-12 lg:mb-16 last:mb-0"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div
                    className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border transition-all duration-500 cursor-pointer ${
                      activeStep === index
                        ? 'shadow-xl sm:shadow-2xl scale-100 sm:scale-105 border-transparent bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm'
                        : hoveredStep === index 
                          ? 'shadow-lg sm:shadow-xl scale-100 sm:scale-102 border-[#00B4D8]/30 bg-white/90 backdrop-blur-sm'
                          : 'shadow-md sm:shadow-lg border-gray-200/50 bg-white/80 backdrop-blur-sm hover:shadow-lg sm:hover:shadow-xl'
                    }`}
                    style={{
                      transform: hoveredStep === index ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                  >
                    {/* Mobile Icon */}
                    <div className="lg:hidden mb-4 sm:mb-6">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                          activeStep === index
                            ? 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white'
                            : 'bg-gray-100 text-[#0047AB]'
                        }`}
                        style={{
                          transform: `scale(${activeStep === index ? 1.05 : 1}) rotate(${activeStep === index ? 360 : 0}deg)`,
                        }}
                      >
                        {React.cloneElement(step.icon, {
                          className: `w-5 h-5 sm:w-7 sm:h-7 ${activeStep === index ? 'text-white' : 'text-[#0047AB]'}`
                        })}
                      </div>
                    </div>

                    {/* Smaller Step number badge for mobile */}
                    <div className="absolute -top-2 -left-2 lg:hidden">
                      <div
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-[#0047AB] to-[#00B4D8] flex items-center justify-center shadow-lg"
                        style={{ transform: activeStep === index ? 'scale(1.1)' : 'scale(1)' }}
                      >
                        <span className="font-bold text-white text-xs">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
                        <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 flex-1 ${
                          activeStep === index ? 'text-[#0047AB]' : 'text-gray-800 group-hover:text-[#0047AB]'
                        }`}>
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#00B4D8]" />
                          <span className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full transition-all duration-300 ${
                            activeStep === index
                              ? 'text-white bg-gradient-to-r from-[#0047AB] to-[#00B4D8]'
                              : 'text-[#0047AB] bg-blue-100'
                          }`}>
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                        {step.description}
                      </p>

                      {/* Deliverables - Always visible on mobile, hover/active on desktop */}
                      <div
                        className="overflow-hidden transition-all duration-300 lg:opacity-0 lg:max-h-0"
                        style={{
                          opacity: window.innerWidth < 1024 ? 1 : (hoveredStep === index || activeStep === index) ? 1 : 0,
                          maxHeight: window.innerWidth < 1024 ? '200px' : (hoveredStep === index || activeStep === index) ? '200px' : '0'
                        }}
                      >
                        <div className="pt-3 sm:pt-4 border-t border-gray-200/50">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#0047AB] mb-2 sm:mb-3">Deliverables:</h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {step.deliverables.map((d, idx) => (
                              <span
                                key={idx}
                                className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 ${
                                  activeStep === index
                                    ? 'bg-gradient-to-r from-[#0047AB]/10 to-[#00B4D8]/10 border border-[#00B4D8]/50 text-[#0047AB]'
                                    : 'bg-white/80 border border-[#00B4D8]/30 text-[#0047AB]'
                                }`}
                                style={{
                                  opacity: 1,
                                  transform: 'translateY(0)',
                                  transitionDelay: `${idx * 100}ms`
                                }}
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA - Mobile Responsive */}
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center lg:pl-32 xl:pl-44">
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-[#0047AB]/5 to-[#00B4D8]/5 rounded-xl sm:rounded-2xl border border-[#00B4D8]/20">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0047AB] mb-3 sm:mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Let's discuss your project and create something amazing together.
              </p>
              <button
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-blue-300/50 hover:scale-105 active:scale-95"
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes iconBounce {
          0% { transform: scale(0.9) rotate(0deg); }
          30% { transform: scale(1.15) rotate(180deg); }
          60% { transform: scale(1.05) rotate(270deg); }
          100% { transform: scale(1.1) rotate(360deg); }
        }
        
        @keyframes iconGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 71, 171, 0.3), 0 0 30px rgba(0, 180, 216, 0.2); }
          50% { box-shadow: 0 0 25px rgba(0, 71, 171, 0.5), 0 0 50px rgba(0, 180, 216, 0.4); }
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        @media (max-width: 1023px) {
          .lg\\:opacity-0 {
            opacity: 1 !important;
          }
          .lg\\:max-h-0 {
            max-height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}