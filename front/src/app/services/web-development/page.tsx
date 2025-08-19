"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import {
  Code2,
  Smartphone,
  Globe,
  Shield,
  Rocket,
  CheckCircle,
  ArrowRight,
  Palette,
  Cloud,
  Search,
  Clock,
  Target,
  Phone,
  Mail,
  MapPin,
  
  
  Sparkles
} from 'lucide-react';

// TypeScript Interfaces
interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}

interface Technology {
  name: string;
  image: string;
  color: string;
  description: string;
  benefit: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Stat {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

type TechCategory = 'frontend' | 'backend' | 'tools';

interface TechnologiesData {
  frontend: Technology[];
  backend: Technology[];
  tools: Technology[];
}

const WebDevelopmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TechCategory>('frontend');
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  
  const isServicesInView = useInView(servicesRef, { once: true,  });
  const isProcessInView = useInView(processRef, { once: true, });
  const isTechInView = useInView(techRef, { once: true,  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const services: Service[] = [
    {
      icon: Code2,
      title: "Custom Web Development",
      description: "Bespoke web applications built with modern frameworks like React, Next.js, and Node.js for optimal performance and scalability.",
      features: ["React & Next.js", "Node.js Backend", "API Development", "Database Design"]
    },
    {
      icon: Smartphone,
      title: "Responsive Web Design",
      description: "Mobile-first approach ensuring your website looks perfect and functions flawlessly across all devices and screen sizes.",
      features: ["Mobile-First Design", "Cross-Browser Compatible", "Touch-Friendly UI", "Flexible Layouts"]
    },
    {
      icon: Globe,
      title: "E-commerce Development",
      description: "Complete online store solutions with secure payment processing, inventory management, and conversion optimization.",
      features: ["Shopify & WooCommerce", "Payment Integration", "Inventory Management", "SEO Optimized"]
    },
    {
      icon: Search,
      title: "SEO Web Development",
      description: "Websites built with search engine optimization in mind, featuring clean code, fast loading times, and proper meta structures.",
      features: ["Technical SEO", "Page Speed Optimization", "Schema Markup", "Core Web Vitals"]
    },
    {
      icon: Shield,
      title: "Secure Web Solutions",
      description: "Enterprise-grade security implementation with SSL certificates, data encryption, and protection against common vulnerabilities.",
      features: ["SSL Implementation", "Data Encryption", "Security Audits", "GDPR Compliance"]
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description: "Scalable cloud hosting solutions with automated backups, CDN integration, and 99.9% uptime guarantee.",
      features: ["AWS & Azure", "CDN Integration", "Auto Scaling", "24/7 Monitoring"]
    }
  ];

  const technologies: TechnologiesData = {
    frontend: [
      { 
        name: "React", 
        image: "/react.png",
        color: "from-blue-500 to-cyan-500",
        description: "Building dynamic user interfaces",
        benefit: "Expert • 5+ Years"
      },
      { 
        name: "Next.js", 
        image: "/next.svg",
        color: "from-gray-700 to-gray-900",
        description: "Full-stack React framework",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "Vue.js", 
        image: "/vue.png",
        color: "from-green-500 to-emerald-500",
        description: "Progressive JavaScript framework",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "TypeScript", 
        image: "/typescript.png",
        color: "from-blue-600 to-indigo-600",
        description: "Type-safe development",
        benefit: "Expert • 5+ Years"
      },
      { 
        name: "Tailwind CSS", 
        image: "/tailwind.png",
        color: "from-cyan-500 to-blue-500",
        description: "Utility-first styling",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "Angular", 
        image: "/angular.png",
        color: "from-red-600 to-pink-600",
        description: "Enterprise web applications",
        benefit: "Advanced • 3+ Years"
      }
    ],
    backend: [
      { 
        name: "Node.js", 
        image: "/node.png",
        color: "from-green-600 to-green-800",
        description: "JavaScript runtime environment",
        benefit: "Expert • 5+ Years"
      },
      { 
        name: "Python", 
        image: "/paython.png",
        color: "from-yellow-500 to-orange-500",
        description: "Versatile backend development",
        benefit: "Advanced • 4+ Years"
      },
      { 
        name: "PHP", 
        image: "/php.png",
        color: "from-purple-600 to-indigo-600",
        description: "Server-side web development",
        benefit: "Advanced • 4+ Years"
      },
      { 
        name: "MongoDB", 
        image: "/mongo.png",
        color: "from-green-500 to-teal-600",
        description: "NoSQL document database",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "PostgreSQL", 
        image: "/postgre.png",
        color: "from-blue-600 to-indigo-600",
        description: "Relational database system",
        benefit: "Advanced • 4+ Years"
      },
      { 
        name: "Express.js", 
        image: "/express.svg",
        color: "from-gray-600 to-gray-800",
        description: "Minimalist web framework",
        benefit: "Expert • 4+ Years"
      }
    ],
    tools: [
      { 
        name: "Docker", 
        image: "/docker.svg",
        color: "from-blue-500 to-cyan-500",
        description: "Containerization platform",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "AWS", 
        image: "/aws.png",
        color: "from-orange-500 to-yellow-500",
        description: "Cloud computing services",
        benefit: "Advanced • 4+ Years"
      },
      { 
        name: "Git", 
        image: "/git.png",
        color: "from-red-500 to-orange-500",
        description: "Version control system",
        benefit: "Expert • 5+ Years"
      },
      { 
        name: "Webpack", 
        image: "/webpack.png",
        color: "from-blue-600 to-cyan-600",
        description: "Module bundler",
        benefit: "Advanced • 4+ Years"
      },
      { 
        name: "Redis", 
        image: "/redis.svg",
        color: "from-red-600 to-red-800",
        description: "In-memory data structure store",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "Nginx", 
        image: "/nginx.svg",
        color: "from-green-600 to-emerald-600",
        description: "Web server and reverse proxy",
        benefit: "Advanced • 3+ Years"
      }
    ]
  };

  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your business requirements, target audience, and technical specifications to create a comprehensive project roadmap.",
      icon: Target,
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "Design & Wireframing",
      description: "Our UI/UX team creates wireframes and designs that prioritize user experience and align with your brand identity.",
      icon: Palette,
      duration: "2-3 weeks"
    },
    {
      step: "03",
      title: "Development",
      description: "Clean, scalable code development using modern frameworks and best practices for optimal performance and maintainability.",
      icon: Code2,
      duration: "4-8 weeks"
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Comprehensive testing across devices and browsers to ensure bug-free functionality and optimal user experience.",
      icon: Shield,
      duration: "1-2 weeks"
    },
    {
      step: "05",
      title: "Launch & Support",
      description: "Smooth deployment to production with ongoing maintenance, updates, and technical support for continuous optimization.",
      icon: Rocket,
      duration: "Ongoing"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How long does it take to develop a website?",
      answer: "Project timelines vary based on complexity. A simple business website takes 2-4 weeks, while complex web applications can take 8-16 weeks. We provide detailed timelines during the planning phase."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer comprehensive post-launch support including hosting, maintenance, security updates, and feature enhancements to ensure your website continues to perform optimally."
    },
    {
      question: "Will my website be mobile-friendly and SEO optimized?",
      answer: "Absolutely. All our websites are built with a mobile-first approach and include technical SEO optimization, fast loading times, proper meta structures, and schema markup for better search engine visibility."
    },
    {
      question: "What technologies do you use for web development?",
      answer: "We use modern technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS. Our tech stack is chosen based on your project requirements for optimal performance and scalability."
    }
  ];

  const stats: Stat[] = [
    { number: "50+", label: "Projects Delivered", icon: Rocket },
    { number: "20+", label: "Technologies", icon: Code2 },
    { number: "99.9%", label: "Uptime Guarantee", icon: Shield },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  return (
    <>
      <Head>
        <title>Professional Web Development Services | Custom Web Applications</title>
        <meta name="description" content="Expert web development services including custom web applications, responsive design, e-commerce solutions, and SEO optimization. Mobile-first approach with modern frameworks." />
        <meta name="keywords" content="web development, custom websites, React development, Next.js, responsive design, e-commerce development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://viorixdigital.com/services/web-development" />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* SEO Optimized Header */}
        <header className="bg-gradient-to-br from-[#1B365D] via-[#2A4A6B] to-[#00BFFF] text-white relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <motion.div
              style={{ y }}
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
            />
            <div className="absolute top-0 left-0 w-full h-full">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-white to-cyan-200 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-l from-white to-blue-200 rounded-full blur-2xl"
              />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="text-sm">
                <ol className="flex justify-center space-x-2 text-blue-200">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white" aria-current="page">Web Development</li>
                </ol>
              </nav>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Web Development</span> Services
              </h1>

              {/* Subheading */}
              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Custom web development solutions that drive business growth. From responsive websites to complex web applications, we build digital experiences that convert visitors into customers.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {[
                  "Mobile-First Design",
                  "SEO Optimized",
                  "Fast Loading",
                  "Secure & Scalable"
                ].map((benefit) => (
                  <span
                    key={benefit}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {benefit}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#contact"
                    className="inline-flex items-center px-8 py-4 bg-white text-[#1B365D] font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#portfolio"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    View Our Work
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Services Section */}
        <section
          ref={servicesRef}
          className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-[#1B365D] mb-4">
                Comprehensive Web Development Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer end-to-end web development solutions tailored to your business needs, from simple websites to complex enterprise applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1B365D] mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Technologies Section */}
        <section ref={techRef} className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-indigo-400 to-purple-500 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-500/20 mb-6">
                <Sparkles className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-cyan-300 font-medium">Technologies We Master</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Cutting-Edge <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Tech Stack</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We leverage the latest technologies and frameworks to build modern, scalable, and maintainable web applications that exceed expectations.
              </p>
            </motion.div>

         {/* Enhanced Technology Tabs */}
<div className="flex justify-center mb-16 px-4">
  <div className="bg-slate-800/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-700/50 flex flex-wrap justify-center gap-2">
    {(Object.keys(technologies) as TechCategory[]).map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 sm:px-8 py-2 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-500 capitalize relative overflow-hidden flex-1 sm:flex-none text-center ${
          activeTab === tab
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl shadow-cyan-500/25'
            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
        }`}
      >
        {activeTab === tab && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">
          {tab === 'frontend'
            ? 'Frontend'
            : tab === 'backend'
            ? 'Backend'
            : 'Tools & DevOps'}
        </span>
      </button>
    ))}
  </div>
</div>

            {/* Enhanced Technology Cards */}
            <div className="max-w-6xl mx-auto">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {technologies[activeTab].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Tech Icon & Title */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative w-20 h-20 p-4 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-all duration-500 border border-white/20">
                          <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-20 rounded-2xl`} />
                          <Image
                            src={tech.image}
                            alt={`${tech.name} logo`}
                            width={48}
                            height={48}
                            className="relative z-10 w-full h-full object-contain filter drop-shadow-lg"
                            priority={index < 3}
                          />
                        </div>
                      </div>

                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-2">
                          {tech.name}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{tech.description}</p>
                      </div>

                      {/* Key Benefit */}
                      <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-slate-700/50 rounded-full border border-slate-600/50">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
                          <span className="text-slate-300 text-sm font-medium">
                            {tech.benefit}
                          </span>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="mt-4">
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${tech.color} relative`}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Floating Particles */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="relative">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                          <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Tech Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTechInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                    className="group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section
          ref={processRef}
          className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
          aria-labelledby="process-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-[#1B365D] mb-4">
                Our Development Process
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A proven methodology that ensures project success from concept to launch and beyond.
              </p>
            </motion.div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col lg:flex-row items-center gap-8 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full text-white font-bold text-xl">
                      {step.step}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                      <step.icon className="w-6 h-6 text-[#1B365D]" />
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="text-xl font-bold text-[#1B365D]">{step.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mt-2 lg:mt-0">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1B365D] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about our web development services
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
                >
                  <summary className="cursor-pointer font-semibold text-[#1B365D] text-lg list-none flex items-center justify-between">
                    {faq.question}
                    <ArrowRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-[#1B365D] to-[#00BFFF] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                Ready to Start Your Web Development Project?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Let&apos;s discuss your requirements and create a custom web solution that drives your business forward.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="tel:+441234567890"
                    className="inline-flex items-center px-8 py-4 bg-white text-[#1B365D] font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us Now
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="mailto:hello@viorixdigital.com"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get Free Quote
                  </Link>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100 pt-8 border-t border-white/20">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +44 123 456 7890
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@viorixdigital.com
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Luton, England, UK
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Professional Web Development Services",
              "provider": {
                "@type": "Organization",
                "name": "Viorix Digital Solutions",
                "url": "https://viorixdigital.com",
                "logo": "https://viorixdigital.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+44-123-456-7890",
                  "contactType": "customer service",
                  "areaServed": "GB",
                  "availableLanguage": "English"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Luton",
                  "addressRegion": "England",
                  "addressCountry": "GB"
                }
              },
              "serviceType": "Web Development",
              "description": "Professional web development services including custom web applications, responsive design, e-commerce development, and SEO optimization.",
              "areaServed": "United Kingdom",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Web Development Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom Web Development",
                      "description": "Bespoke web applications built with modern frameworks"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Responsive Web Design",
                      "description": "Mobile-first approach for all devices"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-commerce Development",
                      "description": "Complete online store solutions"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "50"
              }
            })
          }}
        />
      </div>
    </>
  );
};

export default WebDevelopmentPage;