'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import Link from 'next/link';
const steps = [
  {
    title: 'Discovery Call',
    description: 'Discuss your project goals, audience, and requirements to align on vision.',
    icon: MessageSquare,
    duration: '1-2 Days',
    deliverables: ['Project Brief', 'Requirements Document', 'Timeline'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Planning & Strategy',
    description: 'Create a project roadmap, sitemap, and technical plan for seamless execution.',
    icon: Calendar,
    duration: '3-5 Days',
    deliverables: ['Project Roadmap', 'Sitemap', 'Technical Specification'],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'Design & Development',
    description: 'Craft a custom design and build your site with clean, performant code.',
    icon: Code,
    duration: '2-4 Weeks',
    deliverables: ['UI/UX Design', 'Responsive Code', 'Quality Testing'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Testing & Launch',
    description: 'Conduct thorough testing, optimise performance, and deploy your site securely.',
    icon: CheckCircle,
    duration: '3-5 Days',
    deliverables: ['Performance Testing', 'Security Audit', 'Live Deployment'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Ongoing Support',
    description: 'Provide maintenance, updates, and analytics insights to keep you ahead.',
    icon: Package,
    duration: 'Ongoing',
    deliverables: ['24/7 Monitoring', 'Regular Updates', 'Analytics Reports'],
    color: 'from-pink-500 to-rose-500',
  },
];

export default function OurSimpleProcess() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const stepRefs = useRef([]);
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Enhanced smooth scroll with better positioning
  const smoothScrollTo = (index) => {
    if (typeof window === 'undefined') return;
    
    const element = stepRefs.current[index];
    if (!element) return;

    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

    window.scrollTo({
      top: Math.max(0, middle),
      behavior: 'smooth'
    });
  };

  // Better intersection observer for large screens
  useEffect(() => {
    if (!stepRefs.current.length) return;

    const observerOptions = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-20% 0px -40% 0px'
    };

    let activeIndex = 0;
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          const rect = entry.boundingClientRect;
          const windowHeight = window.innerHeight;
          
          // Calculate if the element is in the "active zone" (center portion of viewport)
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
          
          // Element is considered "active" when it's closest to viewport center
          if (entry.isIntersecting && distanceFromCenter < windowHeight * 0.4) {
            if (index !== activeIndex) {
              activeIndex = index;
              setActiveStep(index);
            }
          }
        },
        observerOptions
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  // Calculate scroll progress for progress line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stepRefs.current.length) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + window.pageYOffset;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the container has been scrolled through
      const scrollTop = window.pageYOffset;
      const containerStart = containerTop - windowHeight * 0.5;
      const containerEnd = containerTop + containerHeight - windowHeight * 0.5;
      
      let progress = 0;
      if (scrollTop > containerStart && scrollTop < containerEnd) {
        progress = (scrollTop - containerStart) / (containerEnd - containerStart);
      } else if (scrollTop >= containerEnd) {
        progress = 1;
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Calculate initial progress
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial visibility animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoized styles for better performance
  const backgroundStyles = useMemo(() => ({
    background: 'linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(255, 255, 255, 1) 50%, rgba(239, 246, 255, 0.6) 100%)',
  }), []);

  // Enhanced keyboard navigation
  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveStep(index);
      smoothScrollTo(index);
    }
  };

  return (
    <section 
      className={`py-16 lg:py-24 relative overflow-hidden transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      ref={containerRef}
      role="main"
      aria-labelledby="process-heading"
      style={backgroundStyles}
    >
      {/* Enhanced floating background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/8 to-teal-400/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '6s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '5s' }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Header with enhanced animations */}
        <header className="text-center mb-16">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full text-sm font-medium text-[#0047AB] mb-4 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Streamlined Process</span>
          </div>
          
          <h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-[#0047AB] via-[#0066CC] to-[#00B4D8] bg-clip-text text-transparent leading-tight transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
            id="process-heading"
          >
            Our Simple Process
          </h1>
          
          <p 
            className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            From initial concept to final launch, we follow a proven methodology 
            that ensures <span className="font-semibold text-[#0047AB]">quality</span>, 
            <span className="font-semibold text-[#0047AB]"> transparency</span>, and 
            <span className="font-semibold text-[#0047AB]"> results</span>.
          </p>

          {/* Enhanced progress indicator */}
          <nav 
            className={`flex items-center justify-center gap-2 mt-8 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
            aria-label="Process steps progress"
          >
            {steps.map((step, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeStep === index 
                    ? 'w-8 bg-gradient-to-r from-[#0047AB] to-[#00B4D8] shadow-lg' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400 hover:w-4'
                }`}
                onClick={() => {
                  setActiveStep(index);
                  smoothScrollTo(index);
                }}
                aria-label={`Go to step ${index + 1}: ${step.title}`}
                aria-current={activeStep === index ? 'step' : 'false'}
              />
            ))}
          </nav>
        </header>

        {/* Steps Container */}
        <div className="max-w-6xl mx-auto relative">
          <div className="flex">
            {/* Enhanced Desktop Icons - Better aligned and animated */}
            <aside className="hidden lg:flex flex-col relative w-24" aria-hidden="true">
              {/* Animated vertical line with smooth progress */}
              <div 
                ref={progressLineRef}
                className="absolute left-8 w-1 bg-gradient-to-b from-transparent via-[#00B4D8]/30 to-transparent rounded-full"
                style={{ 
                  top: '60px',
                  height: 'calc(100% - 120px)'
                }}
              >
                <div 
                  className="w-full bg-gradient-to-b from-[#0047AB] to-[#00B4D8] rounded-full transition-all duration-300 ease-out"
                  style={{ 
                    height: `${scrollProgress * 100}%`,
                    transformOrigin: 'top'
                  }}
                />
              </div>
              
              {/* Desktop Icons with better spacing */}
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep === index;
                const isPassed = activeStep > index;
                
                return (
                  <div
                    key={index}
                    className="relative flex items-start justify-start"
                    style={{ 
                      minHeight: index === steps.length - 1 ? '160px' : '240px',
                      paddingTop: '40px'
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveStep(index);
                        smoothScrollTo(index);
                      }}
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] shadow-2xl shadow-blue-500/40 scale-110'
                          : isPassed
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg scale-100'
                          : 'bg-white/90 border-2 border-gray-200 shadow-lg hover:shadow-xl hover:scale-105'
                      }`}
                      aria-label={`Navigate to step ${index + 1}: ${step.title}`}
                    >
                      <IconComponent 
                        className={`w-6 h-6 transition-all duration-500 ${
                          isActive || isPassed ? 'text-white' : 'text-[#0047AB]'
                        }`}
                      />
                      
                      {/* Enhanced step number */}
                      <div className="absolute -top-1 -right-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                          isActive || isPassed 
                            ? 'bg-white text-[#0047AB] scale-110' 
                            : 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white'
                        }`}>
                          <span className="font-bold text-xs">
                            {isPassed ? '✓' : index + 1}
                          </span>
                        </div>
                      </div>
                      
                      {/* Active step effects */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0047AB] to-[#00B4D8] opacity-20 animate-ping" />
                          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </aside>

            {/* Enhanced Step Content with better spacing */}
            <main className="flex-1 lg:pl-12">
              <div className="space-y-16 lg:space-y-24">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === index;
                  const isPassed = activeStep > index;
                  
                  return (
                    <article
                      key={index}
                      ref={el => stepRefs.current[index] = el}
                      className={`group relative transition-all duration-700 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 100 + 1000}ms`,
                        minHeight: '200px'
                      }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      <div
                        className={`relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                          isActive
                            ? 'shadow-2xl scale-105 border-transparent bg-gradient-to-br from-blue-50/80 to-cyan-50/80'
                            : hoveredStep === index 
                              ? 'shadow-xl scale-102 border-[#00B4D8]/30 bg-white/90'
                              : 'shadow-lg border-gray-200/50 bg-white/80 hover:shadow-xl hover:scale-101'
                        }`}
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => handleKeyPress(e, index)}
                        onClick={() => {
                          setActiveStep(index);
                          smoothScrollTo(index);
                        }}
                        aria-label={`Step ${index + 1}: ${step.title}`}
                      >
                        {/* Mobile Icon */}
                        <div className="lg:hidden mb-6 relative">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isActive
                                ? 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white shadow-lg'
                                : isPassed
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                : 'bg-gray-100 text-[#0047AB]'
                            }`}
                          >
                            <IconComponent className="w-7 h-7" />
                          </div>
                          
                          {/* Mobile step number */}
                          <div className="absolute -top-2 -left-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                              isActive || isPassed 
                                ? 'bg-white text-[#0047AB]' 
                                : 'bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white'
                            }`}>
                              <span className="font-bold text-xs">
                                {isPassed ? '✓' : index + 1}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                            <h2 
                              className={`text-xl lg:text-2xl font-bold transition-all duration-300 flex-1 ${
                                isActive ? 'text-[#0047AB]' : 'text-gray-800 group-hover:text-[#0047AB]'
                              }`}
                            >
                              {step.title}
                            </h2>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Clock className="w-4 h-4 text-[#00B4D8]" aria-hidden="true" />
                              <time 
                                className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                                  isActive
                                    ? 'text-white bg-gradient-to-r from-[#0047AB] to-[#00B4D8]'
                                    : 'text-[#0047AB] bg-blue-100'
                                }`}
                              >
                                {step.duration}
                              </time>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Enhanced deliverables */}
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              hoveredStep === index || isActive || isMobile
                                ? 'opacity-100 max-h-48'
                                : 'opacity-0 max-h-0 lg:opacity-0 lg:max-h-0'
                            }`}
                          >
                            <div className="pt-4 border-t border-gray-200/50">
                              <h3 className="text-sm font-semibold text-[#0047AB] mb-3">
                                Deliverables:
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {step.deliverables.map((deliverable, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                                      isActive
                                        ? 'bg-gradient-to-r from-[#0047AB]/10 to-[#00B4D8]/10 border border-[#00B4D8]/50 text-[#0047AB]'
                                        : 'bg-white/80 border border-[#00B4D8]/30 text-[#0047AB] hover:bg-[#0047AB]/5'
                                    }`}
                                    style={{ transitionDelay: `${idx * 100}ms` }}
                                  >
                                    {deliverable}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </main>
          </div>

          {/* Enhanced CTA */}
          <aside 
            className={`mt-16 text-center lg:pl-44 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '1500ms' }}
          >
            <div className="p-8 bg-gradient-to-r from-[#0047AB]/5 to-[#00B4D8]/5 rounded-2xl border border-[#00B4D8]/20 backdrop-blur-sm">
              <h2 className="text-xl lg:text-2xl font-bold text-[#0047AB] mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 mb-6">
                Let's discuss your project and create something amazing together.
              </p>
              <Link href="/contact" >
              <button
                className="group cursor-pointer w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0047AB] to-[#00B4D8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-blue-300/50 hover:scale-105 active:scale-95 focus:outline-none"
                type="button"
                aria-label="Start your web development project"
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </span>
              </button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        /* Enhanced mobile responsiveness */
        @media (max-width: 1023px) {
          .lg\\:opacity-0 {
            opacity: 1 !important;
          }
          .lg\\:max-h-0 {
            max-height: 200px !important;
          }
        }

        /* Smooth hover effects */
        .hover\\:scale-101:hover {
          transform: scale(1.01);
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Enhanced focus styles */
        button:focus-visible,
        [role="button"]:focus-visible {
          outline: 2px solid #0047AB;
          outline-offset: 2px;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}