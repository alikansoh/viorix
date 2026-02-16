"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Shield,
  Bolt,
  ArrowRight,
  Globe,
  Code,
  Database,
  Cpu,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const WhyUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Custom Web Development",
      description:
        "Tailored solutions built from scratch to match your exact business requirements and goals.",
      icon: <Code aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "100% Custom",
    },
    {
      title: "Enterprise Security",
      description:
        "Bank-grade encryption, secure authentication, and compliance with industry standards.",
      icon: <Shield aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "ISO Certified",
    },
    {
      title: "Performance Optimization",
      description:
        "Lightning-fast load times and optimized performance for better user experience and SEO.",
      icon: <Bolt aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "Sub-2s Load",
    },
    {
      title: "Data Analytics",
      description:
        "Real-time dashboards and actionable insights to track what matters for your business.",
      icon: (
        <Database aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />
      ),
      metric: "Real-Time Data",
    },
    {
      title: "Global Infrastructure",
      description:
        "Reliable cloud hosting with 99.9% uptime guarantee and worldwide availability.",
      icon: <Globe aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "99.9% Uptime",
    },
    {
      title: "Rapid Deployment",
      description:
        "Agile development methodology for faster time-to-market without sacrificing quality.",
      icon: <TrendingUp aria-hidden="true" className="w-8 h-8 text-[#00BFFF]" />,
      metric: "Fast Launch",
    },
  ];

  const values = [
    {
      title: "Proven Track Record",
      description: "40+ successful projects delivered with measurable results.",
      icon: <CheckCircle className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "Expert Team",
      description: "Full-stack developers with 10+ years of combined experience.",
      icon: <Code className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "Results-Focused",
      description: "We measure success by your business growth and ROI.",
      icon: <TrendingUp className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "24/7 Support",
      description: "Dedicated support team available when you need us most.",
      icon: <Users className="w-5 h-5 text-[#00BFFF]" />,
    },
    {
      title: "Scalable Solutions",
      description: "Technology that grows with your business needs.",
      icon: <Target className="w-5 h-5 text-[#00BFFF]" />,
    },
  ];

  const testimonials = [
    {
      name: "Imad Al Soudani",
      role: "Owner",
      company: "Hope BTC",
      quote:
        "viorix  built us a professional website that makes it easy for new students to register for training. His dedication and support were excellent, and through Viorix Digital Solutions we now have a strong online presence.",
      metric: "300% More Registrations",
      avatar: "IA",
    },
    {
      name: "Hassan Husseini",
      role: "Owner",
      company: "JRS Building Company",
      quote:
        "Ali created a modern portfolio website that showcases our projects beautifully and helps us attract new clients. Thanks to his work and the expertise of Viorix Digital Solutions, our company looks more professional online.",
      metric: "250% More Inquiries",
      avatar: "HH",
    },
    {
      name: "Ali Hashem",
      role: "Owner",
      company: "ColdFix",
      quote:
        "viorix designed a clean, SEO-friendly website for ColdFix that represents our services perfectly. His professionalism, combined with the quality standards of Viorix Digital Solutions, has already brought us more leads.",
      metric: "40% More Leads",
      avatar: "AH",
    },
    {
      name: "Bader Al Badri",
      role: "Owner",
      company: "360 Drive Academy",
      quote:
        "they built a sleek, user-friendly website for our driving school. Students can now book lessons effortlessly, and through Viorix Digital Solutions we've noticed a clear increase in new enrolments.",
      metric: "30% More Bookings",
      avatar: "BB",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Viorix Digital Solutions",
            description:
              "Custom web development and digital solutions for modern businesses",
            applicationCategory: "WebApplication",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              ratingCount: "50",
            },
          }),
        }}
      />

      <section className="relative bg-white py-12 sm:py-16 md:py-20">
        {/* Minimal background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 to-white pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <div
            className={`text-center mb-12 sm:mb-14 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 text-[#1B365D] text-sm font-semibold rounded-full border border-[#00BFFF]/20">
                <Cpu className="w-4 h-4 text-[#00BFFF]" />
                Why Choose Us
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trusted by Growing Businesses
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              We deliver high-performance web solutions that drive real business
              results. Our proven methodology and expert team turn your vision
              into measurable success.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200">
                ✓ Custom Solutions
              </div>
              <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200">
                ✓ Proven Results
              </div>
              <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200">
                ✓ Expert Support
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#00BFFF] hover:shadow-lg transition-all duration-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-xl border border-[#00BFFF]/20">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-bold text-[#1B365D] bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 px-3 py-1 rounded-full">
                    {feature.metric}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide our work and ensure exceptional
                results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#00BFFF] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-lg mb-4">
                    {value.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Client Success Stories
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real businesses. Real results. Real growth.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-[#00BFFF] hover:shadow-lg transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#1B365D] bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 px-3 py-1 rounded-full">
                      {testimonial.metric}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 mb-8 leading-relaxed font-medium">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Author */}
                  <div className="border-t border-gray-200 pt-6 flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#00BFFF] to-[#1B365D] rounded-lg text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#00BFFF] font-semibold">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-3xl p-12 sm:p-16 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h3>
            <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you achieve your goals with
              innovative digital solutions.
            </p>
            <Link href="/web-quote">
              <button className="inline-flex items-center gap-2 bg-white text-[#1B365D] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUs;