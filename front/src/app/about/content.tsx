"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  HeartHandshake,
  Lightbulb,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Star,
  Search,
  Puzzle,
  Layers,
  Briefcase,
  CalendarCheck,
  CheckCircle,
  Headphones,
} from "lucide-react";

// Core values
const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We leverage the latest technologies and creative ideas to deliver unique solutions tailored to your business.",
  },
  {
    icon: HeartHandshake,
    title: "Collaboration",
    desc: "We work hand-in-hand with our clients, creating partnerships built on trust, respect, and clear communication.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "Our commitment to quality ensures your project is delivered on time, every time, with uncompromising standards.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    desc: "We focus on scalable, results-driven solutions that help your business thrive in a competitive digital landscape.",
  },
];

// Stats & Achievements
const stats = [
  {
    icon: Briefcase,
    label: "Projects Completed",
    value: "50+",
  },
  {
    icon: CheckCircle,
    label: "Success Rate",
    value: "99%",
  },
  {
    icon: Headphones,
    label: "Support",
    value: "24/7",
  },
  {
    icon: Star,
    label: "Client Rating",
    value: "5.0",
  },
];

// Tech logos
const techLogos = [
  {
    src: "/google.png",
    alt: "Google Console",
    name: "Google Console",
  },
  {
    src: "/shopify.png",
    alt: "Shopify",
    name: "Shopify",
  },
  {
    src: "/stripe.png",
    alt: "Stripe",
    name: "Stripe",
  },
  {
    src: "/aws.png",
    alt: "Amazon Web Services",
    name: "AWS",
  },
];

// SEO keywords
const seoKeywords = [
  "Web Development",
  "Mobile App Development",
  "E-commerce",
  "Digital Marketing",
  "SEO Optimization",
  "Custom Software",
  "UI/UX Design",
  "API Integration",
  "Cloud Solutions",
  "Conversion Rate Optimization",
  "Content Marketing",
  "Search Engine Marketing",
  "Responsive Design",
  "Local SEO",
  "Social Media Marketing",
];

// Process steps
const processSteps = [
  {
    title: "Discovery & Strategy",
    desc: "We start by understanding your goals, challenges, and vision. Our team conducts market research and creates a tailored strategy to ensure your project’s success.",
    icon: Search,
    color: "from-[#00BFFF]/30 to-[#1B365D]/20",
  },
  {
    title: "Design & Prototyping",
    desc: "Creative concepts, wireframes, and interactive prototypes are crafted to visualize your solution and guarantee a seamless user experience.",
    icon: Layers,
    color: "from-[#00BFFF]/20 to-[#0099CC]/10",
  },
  {
    title: "Development & Integration",
    desc: "Our experts build scalable, high-performance websites, apps, and platforms—integrating the latest technologies for security and speed.",
    icon: Puzzle,
    color: "from-[#1B365D]/20 to-[#00BFFF]/10",
  },
  {
    title: "Launch & Growth",
    desc: "Your project goes live with full support. We track results, optimize for SEO, and help you scale with ongoing digital marketing and technical enhancements.",
    icon: CalendarCheck,
    color: "from-[#00BFFF]/15 to-[#1B365D]/10",
  },
];

const AboutUs = () => {
  return (
    <main
      className="relative min-h-screen flex items-center pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      itemScope
      itemType="https://schema.org/AboutPage"
      aria-labelledby="about-heading"
      role="main"
    >
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="relative w-full">
        {/* Heading & Intro */}
        <header className="text-center mb-16">
          <motion.h1
            id="about-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-[#00BFFF] via-[#0099CC] to-[#1B365D] bg-clip-text text-transparent">
              Viorix Digital Solutions
            </span>
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Empowering businesses with{" "}
            <span className="font-bold text-[#1B365D]">
              cutting-edge digital solutions
            </span>{" "}
            that drive growth, creativity, and measurable success. Our passion
            and expertise make us the trusted partner for ambitious companies
            looking to innovate.
          </motion.p>
        </header>

        {/* Logos Section */}
        <section className="mb-16">
          <header className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#00BFFF] flex justify-center items-center gap-2">
              <Rocket className="w-6 h-6 text-[#00BFFF]" aria-hidden="true" />
              Technology & Integrations
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mt-2">
              We partner and integrate with the world&apos;s leading platforms
              to deliver robust, scalable, and secure solutions for your
              business.
            </p>
          </header>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
            {techLogos.map((logo, idx) => (
              <motion.div
                key={logo.name}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 * idx }}
              >
                <div className="bg-white rounded-full shadow-lg p-4 border border-blue-100 hover:scale-105 transition-transform duration-300">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={52}
                    height={52}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-[#1B365D] font-semibold">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Image + Story */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-20">
          {/* Left: Team Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full max-w-[380px] lg:max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#00BFFF]/10 to-[#1B365D]/10 p-2"
          >
            <img
              src="/about.jpg"
              alt="Viorix Digital Solutions team collaborating in a modern workspace"
              width={440}
              height={550}
              className="object-cover object-center w-full h-full rounded-2xl"
            />
          </motion.div>

          {/* Right: Story & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B365D] mb-4">
              Our Story
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-4">
              Founded in the heart of the UK, Viorix Digital Solutions emerged
              from a passion for technology and a vision to help businesses
              succeed online. Our team blends technical expertise, creative
              vision, and proven strategies to deliver websites, apps, and
              marketing campaigns that make an impact. We believe in the power
              of digital transformation to unlock new opportunities and drive
              lasting change for our clients.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Every project is approached with a growth mindset, ensuring your
              brand stands out in a crowded market. Our journey has been shaped
              by a relentless pursuit of excellence and a commitment to making a
              difference.
            </p>
            <h3 className="text-xl font-semibold text-[#00BFFF] mb-3 flex items-center gap-2">
              <Search className="w-6 h-6 text-[#00BFFF]" aria-hidden="true" />
              Our SEO-Focused Mission
            </h3>
            <p className="text-base text-gray-700">
              Our mission is to empower UK businesses to achieve{" "}
              <strong className="text-[#00BFFF]">maximum online growth</strong>{" "}
              and visibility through industry-leading{" "}
              <strong>web development</strong>,{" "}
              <strong>mobile app development</strong>,{" "}
              <strong>e-commerce solutions</strong>, and{" "}
              <strong>digital marketing</strong> strategies.
              <br />
              <br />
              We deliver <strong>SEO optimization</strong> and{" "}
              <strong>responsive design</strong> to ensure your website ranks at
              the top of search engines, attracts organic traffic, and converts
              visitors into loyal customers. Our expertise spans{" "}
              <strong>UI/UX design</strong>, <strong>custom software</strong>,{" "}
              <strong>API integration</strong>, <strong>cloud solutions</strong>
              , <strong>conversion rate optimization</strong>,{" "}
              <strong>content marketing</strong>,{" "}
              <strong>search engine marketing</strong>,{" "}
              <strong>local SEO</strong>, and{" "}
              <strong>social media marketing</strong>—giving your business the
              digital edge it needs.
              <br />
              <br />
              At Viorix, we believe in measurable results, transparent
              communication, and lasting partnerships. Let us help you dominate
              the digital landscape and turn your vision into reality.
            </p>
            {/* SEO keywords visual */}
            <div className="flex flex-wrap gap-2 mt-4">
              {seoKeywords.map((kw, i) => (
                <span
                  key={kw}
                  className="bg-blue-50 text-[#00BFFF] px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-blue-100"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="mb-24">
          <header className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#1B365D]">
              Our Core Values
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${
                    idx % 2 === 0
                      ? "from-[#00BFFF]/20 to-[#1B365D]/20"
                      : "from-[#1B365D]/10 to-[#00BFFF]/20"
                  } rounded-xl`}
                >
                  <value.icon
                    className="w-7 h-7 text-[#00BFFF]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1B365D] mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-700">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats & Achievements */}
        <section className="mb-20">
          <header className="flex items-center justify-center mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <h2 className="px-6 text-sm font-medium text-gray-500 bg-white">
              Why Choose Us
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white/80 px-6 py-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <div className="flex items-center justify-center mb-3">
                  <stat.icon
                    className="w-8 h-8 text-[#1B365D]"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-3xl font-bold text-[#00BFFF] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Section: How We Work */}
        <section className="mb-16">
          <header className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#1B365D] flex items-center justify-center gap-2">
              <Briefcase
                className="w-6 h-6 text-[#00BFFF]"
                aria-hidden="true"
              />
              How We Work
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mt-2">
              Experience our streamlined, transparent process—from vision to
              launch and beyond.
            </p>
          </header>
          {/* Process Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                className={`bg-white/90 border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 * idx }}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${step.color}`}
                >
                  <step.icon
                    className="w-8 h-8 text-[#00BFFF]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1B365D] text-center mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700 text-center">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Impact & Enhanced Call to Action */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50/50 to-blue-50/30 rounded-3xl border border-gray-100/50 p-10 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Globe className="w-7 h-7 text-[#00BFFF]" aria-hidden="true" />
              <span className="text-lg font-bold text-[#1B365D]">
                Global Impact
              </span>
            </div>
            <p className="text-base md:text-lg text-gray-700 mb-7">
              From startups to established brands, our solutions have helped
              businesses across the UK and beyond build a powerful digital
              presence. Join our growing family of successful clients and scale
              your vision with Viorix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 focus:ring-4 focus:ring-blue-300/50"
                aria-label="Contact Viorix Digital Solutions"
              >
                Get Free Consultation
              </Link>
              
            </div>
            <div className="flex flex-col items-center gap-2 mt-6">
              <span className="text-sm text-gray-500">
                <Star
                  className="inline-block w-4 h-4 text-[#FFD700] mr-1"
                  aria-hidden="true"
                />
                5.0/5.0 Client Satisfaction
              </span>
              <span className="text-sm text-gray-500">
                <CheckCircle
                  className="inline-block w-4 h-4 text-[#00BFFF] mr-1"
                  aria-hidden="true"
                />
                99% Success Rate & 24/7 Dedicated Support
              </span>
            </div>
            <div className="mt-8">
              <span className="inline-block bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 text-[#1B365D] font-medium px-5 py-2 rounded-full shadow">
                Let’s build something amazing together!
              </span>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;