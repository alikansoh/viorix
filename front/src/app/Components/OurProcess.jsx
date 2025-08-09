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
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" id="process" ref={containerRef}>
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full text-sm font-medium text-[#0047AB] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Streamlined Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-6 bg-gradient-to-r from-[#0047AB] via-[#0066CC] to-[#00B4D8] bg-clip-text text-transparent leading-tight">
            Our Simple Process
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial concept to final launch, we follow a proven methodology 
            that ensures <span className="font-semibold text-[#0047AB]">quality</span>, 
            <span className="font-semibold text-[#0047AB]"> transparency</span>, and 
            <span className="font-semibold text-[#0047AB]"> results</span>.
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'w-8 bg-gradient-to-r from-[#0047AB] to-[#00B4D8]' 
                    : 'w-2 bg-gray-300'
                }`}
                style={{ transform: activeStep === index ? 'scale(1.2)' : 'scale(1)' }}
              />
            ))}
          </div>
        </div>

        {/* Steps Container */}
        <div className="max-w-6xl mx-auto relative">
          <div className="flex">
            {/* Left Side - Animated Icons with Proper Spacing */}
            <div className="hidden lg:flex flex-col relative w-32">
              {/* Vertical Progress Line */}
              <div 
                className="absolute left-12 top-16 w-1 bg-gradient-to-b from-[#0047AB]/20 via-[#00B4D8]/40 to-[#0047AB]/20 rounded-full" 
                style={{ height: 'calc(100% - 10rem)' }}
              ></div>
              
              {/* Icons positioned to align with content sections */}
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{ 
                    height: index === steps.length - 1 ? 'auto' : '240px', // Adjust height to match section spacing
                    paddingTop: '24px' // Top padding to align with section content
                  }}
                >
                  <div
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 mx-auto ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] shadow-xl shadow-blue-500/30'
                        : 'bg-white/90 border-2 border-gray-200 shadow-lg hover:shadow-xl'
                    }`}
                    style={{
                      transform: `scale(${activeStep === index ? 1.15 : 0.95}) rotate(${activeStep === index ? 360 : 0}deg)`,
                      color: activeStep === index ? 'white' : '#0047AB',
                      animation: activeStep === index ? 'iconBounce 0.8s ease-out, iconGlow 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    {React.cloneElement(step.icon, {
                      className: `w-7 h-7 transition-all duration-500 ${activeStep === index ? 'text-white animate-pulse' : 'text-[#0047AB]'}`,
                      style: {
                        animation: activeStep === index ? 'iconFloat 3s ease-in-out infinite' : 'none'
                      }
                    })}
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0047AB] to-[#00B4D8] flex items-center justify-center shadow-md">
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
            <div className="flex-1 lg:pl-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={el => stepRefs.current[index] = el}
                  className="group relative mb-12 sm:mb-16 last:mb-0"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div
                    className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                      activeStep === index
                        ? 'shadow-2xl scale-105 border-transparent bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm'
                        : hoveredStep === index 
                          ? 'shadow-xl scale-102 border-[#00B4D8]/30 bg-white/90 backdrop-blur-sm'
                          : 'shadow-lg border-gray-200/50 bg-white/80 backdrop-blur-sm hover:shadow-xl'
                    }`}
                    style={{
                      transform: hoveredStep === index ? 'translateY(-3px)' : 'translateY(0)'
                    }}
                  >
                    {/* Mobile Icon */}
                    <div className="lg:hidden mb-6">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          activeStep === index
                            ? 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white'
                            : 'bg-gray-100 text-[#0047AB]'
                        }`}
                        style={{
                          transform: `scale(${activeStep === index ? 1.1 : 1}) rotate(${activeStep === index ? 360 : 0}deg)`,
                        }}
                      >
                        {React.cloneElement(step.icon, {
                          className: `w-7 h-7 ${activeStep === index ? 'text-white' : 'text-[#0047AB]'}`
                        })}
                      </div>
                    </div>

                    {/* Step number badge for mobile */}
                    <div className="absolute -top-3 -left-3 lg:hidden">
                      <div
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0047AB] to-[#00B4D8] flex items-center justify-center shadow-lg"
                        style={{ transform: activeStep === index ? 'scale(1.2)' : 'scale(1)' }}
                      >
                        <span className="font-bold text-white text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h3 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                          activeStep === index ? 'text-[#0047AB]' : 'text-gray-800 group-hover:text-[#0047AB]'
                        }`}>
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <Clock className="w-4 h-4 text-[#00B4D8]" />
                          <span className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                            activeStep === index
                              ? 'text-white bg-gradient-to-r from-[#0047AB] to-[#00B4D8]'
                              : 'text-[#0047AB] bg-blue-100'
                          }`}>
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          opacity: (hoveredStep === index || activeStep === index) ? 1 : 0,
                          maxHeight: (hoveredStep === index || activeStep === index) ? '200px' : '0'
                        }}
                      >
                        <div className="pt-4 border-t border-gray-200/50">
                          <h4 className="text-sm font-semibold text-[#0047AB] mb-3">Deliverables:</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((d, idx) => (
                              <span
                                key={idx}
                                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
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

          {/* CTA */}
          <div
            className="mt-12 sm:mt-16 text-center lg:pl-44"
          >
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0047AB]/5 to-[#00B4D8]/5 rounded-2xl border border-[#00B4D8]/20">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0047AB] mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Let's discuss your project and create something amazing together.
              </p>
              <button
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-blue-300/50 hover:scale-105 active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Start Your Project</span>
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
          0% { transform: scale(0.95) rotate(0deg); }
          30% { transform: scale(1.2) rotate(180deg); }
          60% { transform: scale(1.1) rotate(270deg); }
          100% { transform: scale(1.15) rotate(360deg); }
        }
        
        @keyframes iconGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 71, 171, 0.3), 0 0 40px rgba(0, 180, 216, 0.2); }
          50% { box-shadow: 0 0 30px rgba(0, 71, 171, 0.5), 0 0 60px rgba(0, 180, 216, 0.4); }
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}