"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Star, Shield, Bolt, ArrowRight, Globe, Code, Database, Cpu, Zap, Target, Users, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";

const WhyUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(-1);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Innovative Tech Stack",
      description:
        "We embrace cutting-edge technologies and modern frameworks to build future-ready applications that scale with your business growth.",
      icon: <Code aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "Latest Tech",
      color: "from-[#1B365D]/5 to-[#00BFFF]/5"
    },
    {
      title: "Security First",
      description:
        "Built-in security measures from day one with encryption, secure authentication, and compliance with industry standards.",
      icon: <Shield aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "Bank-Grade Security",
      color: "from-[#1B365D]/5 to-[#00BFFF]/5"
    },
    {
      title: "AI-Powered Solutions",
      description:
        "Integrate intelligent automation and machine learning capabilities to give your business a competitive edge in the market.",
      icon: <Cpu aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "AI Integration",
      color: "from-[#1B365D]/5 to-[#00BFFF]/5"
    },
    {
      title: "Smart Analytics",
      description:
        "Transform raw data into actionable insights with advanced analytics dashboards and real-time reporting capabilities.",
      icon: <Database aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "Data-Driven",
      color: "from-[#1B365D]/5 to-[#00BFFF]/5"
    },
    {
      title: "Cloud-Native Architecture",
      description:
        "Scalable, resilient applications built for the cloud with automatic scaling, high availability, and global reach.",
      icon: <Globe aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "99.9% Uptime",
      color: "from-[#1B365D]/5 to-[#00BFFF]/5"
    },
    {
      title: "Rapid Development",
      description:
        "Agile methodology with rapid prototyping, continuous delivery, and iterative improvements for faster time-to-market.",
      icon: <Bolt aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "Fast Delivery",
      color: "from-[#1B365D]/5 to-[#00BFFF]/5"
    },
  ];

  const values = [
    {
      title: "Quality Code",
      description: "Clean, maintainable, and well-documented code with comprehensive testing coverage.",
      icon: <CheckCircle className="w-5 h-5 text-[#00BFFF]" />
    },
    {
      title: "Innovation Focus", 
      description: "Always exploring new technologies and methodologies to deliver cutting-edge solutions.",
      icon: <Zap className="w-5 h-5 text-[#00BFFF]" />
    },
    {
      title: "Performance Optimization",
      description: "Lightning-fast applications optimized for speed, efficiency, and user experience.",
      icon: <TrendingUp className="w-5 h-5 text-[#00BFFF]" />
    },
    {
      title: "Client Partnership",
      description: "Collaborative approach with transparent communication and dedicated project support.",
      icon: <Users className="w-5 h-5 text-[#00BFFF]" />
    },
    {
      title: "Future-Ready",
      description: "Building scalable solutions designed to grow and evolve with your business needs.",
      icon: <Target className="w-5 h-5 text-[#00BFFF]" />
    },
  ];

  const testimonials = [
    {
      name: "Imad Al Soudani",
      role: "Owner",
      company: "Hope btc ",
      quote: "Ali built us a professional website that makes it easy for new students to register for training. His dedication and support were excellent, and through Viorix Digital Solutions we now have a strong online presence.",
      metric: "More Student Registrations",
      avatar: "IA"
    },
    {
      name: "Hassan Husseini",
      role: "Owner",
      company: "JRS Building Company",
      quote: "Ali created a modern portfolio website that showcases our projects beautifully and helps us attract new clients. Thanks to his work and the expertise of Viorix Digital Solutions, our company looks more professional online.",
      metric: "Increased Client Enquiries",
      avatar: "HH"
    },
    {
      name: "Ali Hashem",
      role: "Owner",
      company: "ColdFix",
      quote: "Ali designed a clean, SEO-friendly website for ColdFix that represents our services perfectly. His professionalism, combined with the quality standards of Viorix Digital Solutions, has already brought us more leads.",
      metric: "40% More Leads",
      avatar: "AH"
    },
    {
      name: "Bader Al Badri",
      role: "Owner",
      company: "360 Drive Academy",
      quote: "Ali built a sleek, user-friendly website for our driving school. Students can now book lessons effortlessly, and through Viorix Digital Solutions we’ve noticed a clear increase in new enrolments.",
      metric: "30% More Bookings",
      avatar: "BB"
    }
  ];
   
  
  // Enhanced animated background particles - using deterministic values for SSR compatibility
  const particles = useMemo(
    () => {
      const positions = [
        { left: 15, top: 25 }, { left: 85, top: 75 }, { left: 45, top: 10 }, { left: 70, top: 90 }, { left: 20, top: 60 },
        { left: 90, top: 30 }, { left: 35, top: 80 }, { left: 65, top: 15 }, { left: 10, top: 85 }, { left: 80, top: 45 },
        { left: 55, top: 70 }, { left: 25, top: 35 }, { left: 75, top: 95 }, { left: 40, top: 50 }, { left: 95, top: 20 }
      ];
      const durations = [3.5, 4.2, 5.1, 3.8, 4.7, 5.5, 4.1, 3.9, 4.8, 5.2, 4.4, 3.7, 5.0, 4.3, 4.6];
      const sizes = ['w-1 h-1', 'w-2 h-2', 'w-1 h-1', 'w-2 h-2', 'w-1 h-1', 'w-2 h-2', 'w-1 h-1', 'w-2 h-2', 'w-1 h-1', 'w-2 h-2', 'w-1 h-1', 'w-2 h-2', 'w-1 h-1', 'w-2 h-2', 'w-1 h-1'];
      const opacities = ['opacity-20', 'opacity-30', 'opacity-20', 'opacity-30', 'opacity-20', 'opacity-30', 'opacity-20', 'opacity-30', 'opacity-20', 'opacity-30', 'opacity-20', 'opacity-30', 'opacity-20', 'opacity-30', 'opacity-20'];

      return [...Array(15)].map((_, i) => ({
        id: i,
        left: `${positions[i].left}%`,
        top: `${positions[i].top}%`,
        delay: `${i * 0.4}s`,
        duration: `${durations[i]}s`,
        size: sizes[i],
        opacity: opacities[i],
      }));
    },
    []
  );

  const floatingElements = useMemo(
    () => {
      const positions = [
        { left: 20, top: 30 }, { left: 80, top: 70 }, { left: 50, top: 20 }, { left: 30, top: 80 },
        { left: 70, top: 40 }, { left: 60, top: 85 }, { left: 40, top: 55 }, { left: 85, top: 25 }
      ];
      const durations = [12.5, 14.2, 11.8, 13.6, 15.1, 12.9, 14.7, 13.3];

      return [...Array(8)].map((_, i) => ({
        id: i,
        left: `${positions[i].left}%`,
        top: `${positions[i].top}%`,
        delay: `${i * 1.5}s`,
        duration: `${durations[i]}s`,
      }));
    },
    []
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white via-blue-50/20 to-slate-100">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#00BFFF]/6 to-[#1B365D]/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#1B365D]/6 to-[#00BFFF]/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-gray-900/5 to-[#00BFFF]/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Dynamic grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute ${p.size} bg-[#00BFFF] rounded-full animate-float ${p.opacity}`}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          ></div>
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((elem) => (
          <div
            key={elem.id}
            className="absolute w-5 h-5 border-2 border-[#1B365D]/15 rounded-sm animate-float-slow"
            style={{
              left: elem.left,
              top: elem.top,
              animationDelay: elem.delay,
              animationDuration: elem.duration,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-50px) scale(1.4);
            opacity: 0.8;
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-25px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translateY(-15px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translateY(-35px) rotate(270deg) scale(1.2);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(0,191,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        {/* Enhanced header section */}
        <div className={`text-center mb-28 transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-white via-blue-50/60 to-white border-2 border-[#00BFFF]/20 text-[#1B365D] font-bold text-sm mb-10 shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <Cpu className="w-6 h-6 mr-3 text-[#00BFFF]" />
            Next-Generation Software Solutions
            <div className="ml-4 w-3 h-3 bg-[#00BFFF] rounded-full animate-pulse shadow-lg shadow-[#00BFFF]/50"></div>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-6xl mb-10 leading-tight">
            Why Forward-Thinking
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B365D] via-[#00BFFF] to-black relative">
              Companies Choose Us
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B365D] via-[#00BFFF] to-black opacity-20 blur-xl"></div>
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-12 font-medium">
            We&apos;re a dynamic team of innovators building the future of software development. 
            Our fresh perspective and cutting-edge expertise help businesses leap ahead of the competition.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-base font-semibold">
            <div className="flex items-center text-[#1B365D] bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-[#00BFFF]/20 shadow-md">
              <div className="w-3 h-3 bg-[#00BFFF] rounded-full mr-3 animate-pulse"></div>
              Innovative Approach
            </div>
            <div className="flex items-center text-[#1B365D] bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-[#00BFFF]/20 shadow-md">
              <div className="w-3 h-3 bg-[#1B365D] rounded-full mr-3 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              Rapid Deployment
            </div>
            <div className="flex items-center text-[#1B365D] bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-[#00BFFF]/20 shadow-md">
              <div className="w-3 h-3 bg-black rounded-full mr-3 animate-pulse" style={{animationDelay: '1s'}}></div>
              Future-Ready Tech
            </div>
          </div>
        </div>

        {/* Enhanced features grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-3xl p-10 hover:border-[#00BFFF]/40 transition-all duration-700 hover:shadow-2xl hover:shadow-[#00BFFF]/10 hover:-translate-y-3 transform cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{transitionDelay: `${index * 150}ms`}}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(-1)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              <div className="absolute inset-0 rounded-3xl animate-shimmer opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div className={`flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-50 to-[#00BFFF]/10 border-2 border-[#00BFFF]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg group-hover:shadow-xl group-hover:shadow-[#00BFFF]/20`}>
                    {feature.icon}
                  </div>
                  <span className="text-xs font-black text-[#00BFFF] bg-gradient-to-r from-blue-50 to-[#00BFFF]/10 px-5 py-3 rounded-full border-2 border-[#00BFFF]/20 shadow-sm">
                    {feature.metric}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-8 group-hover:text-[#1B365D] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">{feature.description}</p>
                
                {/* Fixed arrow positioning */}
                <div className={`flex justify-end mt-8 transform transition-all duration-500 ${hoveredFeature === index ? 'translate-x-0 opacity-100 scale-110' : 'translate-x-6 opacity-0'}`}>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full flex items-center justify-center shadow-lg shadow-[#00BFFF]/30">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced values section */}
        <div className="mb-32">
          <div className="text-center mb-24">
            <h3 className="text-5xl font-black text-gray-900 bg-gradient-to-r from-[#0047AB] via-[#0066CC] to-[#00B4D8] bg-clip-text text-transparent leading-tight transform transition-all duration-700 mb-8">Our Core Principles</h3>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The values that drive our innovation and ensure exceptional results for every project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white via-white to-blue-50/20 border-2 border-gray-100 rounded-3xl p-10 hover:border-[#00BFFF]/40 transition-all duration-700 hover:shadow-xl hover:shadow-[#00BFFF]/10 hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-50 to-[#00BFFF]/10 rounded-2xl mr-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-[#00BFFF]/20 shadow-lg">
                    {value.icon}
                  </div>
                  <h4 className="font-black text-[#1B365D] text-xl group-hover:text-black transition-colors duration-300">{value.title}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced testimonials */}
        <div className="mb-32">
          <div className="text-center mb-24">
            <h3 className="text-5xl font-black bg-gradient-to-r from-[#0047AB] via-[#0066CC] to-[#00B4D8] bg-clip-text text-transparent leading-tight transform transition-all duration-700' mb-8">Success Stories</h3>
            <p className="text-2xl text-gray-600">Real impact from companies who trusted us to bring their vision to life.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white/95 backdrop-blur-sm border-2 border-gray-100 rounded-3xl p-12 hover:border-[#00BFFF]/40 transition-all duration-700 hover:shadow-2xl hover:shadow-[#00BFFF]/10 hover:-translate-y-2 group cursor-pointer"
              >
                <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="text-8xl text-[#00BFFF] font-serif"></div>
                </div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 fill-[#00BFFF] text-[#00BFFF]" />
                    ))}
                  </div>
                  <span className="text-sm font-black text-[#1B365D] bg-gradient-to-r from-blue-50 to-[#00BFFF]/10 px-6 py-3 rounded-full border-2 border-[#00BFFF]/20">
                    {testimonial.metric}
                  </span>
                </div>
                <blockquote className="text-gray-700 mb-10 leading-relaxed italic text-xl font-medium">
                  {testimonial.quote}
                </blockquote>
                <div className="border-t-2 border-gray-100 pt-10">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1B365D] to-[#00BFFF] rounded-3xl flex items-center justify-center text-white font-black text-xl mr-8 shadow-lg shadow-[#00BFFF]/30">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-xl mb-1">{testimonial.name}</p>
                      <p className="text-[#00BFFF] font-bold text-lg">{testimonial.role}</p>
                      <p className="text-gray-500 font-semibold">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced call to action section */}
        <div className="text-center bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-3xl p-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/20 via-transparent to-[#1B365D]/20"></div>

      <div className="relative z-10">
        <h3 className="text-4xl font-black text-white mb-8">Ready to Transform Your Business?</h3>
        <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Let&apos;s discuss how we can help you build innovative solutions that drive growth and success.
        </p>
        <Link href="/contact">
        <button className="bg-white cursor-pointer text-[#1B365D] font-black px-12 py-6 rounded-3xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg">
          Start Your Project Today
          <ArrowRight className="w-6 h-6 inline-block ml-3" />
        </button>
        </Link>
      </div>
    </div>
      </div>
    </section>
  );
};

export default WhyUs;