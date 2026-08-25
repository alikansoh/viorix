"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView,  } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import {
  Palette,
  Smartphone,
  Monitor,
  Users,
  Eye,
  Heart,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Layers,
  MousePointer,
  Clock,
  Target,
  Phone,
  Mail,
  MapPin,
  Zap,
  Star,
  TrendingUp,
  Sparkles,
  PenTool,

  Shield
  
} from 'lucide-react';

// TypeScript Interfaces
interface DesignService {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
}

interface DesignPrinciple {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  benefit: string;
}

interface Tool {
  name: string;
  image: string;
  color: string;
  category: string;
  expertise: string;
}

interface WorkflowStep {
  phase: string;
  title: string;
  description: string;
  activities: string[];
  duration: string;
}

interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

const UIUXDesignPage: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const isServicesInView = useInView(servicesRef, { once: true });
  const isPrinciplesInView = useInView(principlesRef, { once: true });
  const isWorkflowInView = useInView(workflowRef, { once: true });
  const isToolsInView = useInView(toolsRef, { once: true });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true });


  const designServices: DesignService[] = [
    {
      icon: Eye,
      title: "User Experience (UX) Design",
      description: "Comprehensive UX research and design that puts your users at the center of every decision, creating intuitive and engaging digital experiences.",
      deliverables: ["User Research", "User Personas", "Journey Maps", "Wireframes", "Prototypes"],
      timeline: "3-5 weeks"
    },
    {
      icon: Palette,
      title: "User Interface (UI) Design",
      description: "Beautiful, modern interfaces that align with your brand while ensuring optimal usability and accessibility across all platforms.",
      deliverables: ["Visual Design", "Design System", "Component Library", "Style Guide", "Asset Export"],
      timeline: "2-4 weeks"
    },
    {
      icon: Smartphone,
      title: "Mobile App Design",
      description: "Platform-specific mobile designs that follow iOS and Android guidelines while creating unique, memorable user experiences.",
      deliverables: ["Mobile Wireframes", "App UI Design", "Icon Design", "App Store Assets", "Prototype"],
      timeline: "4-6 weeks"
    },
    {
      icon: Monitor,
      title: "Web Application Design",
      description: "Responsive web designs that work seamlessly across desktop, tablet, and mobile devices with focus on conversion optimization.",
      deliverables: ["Responsive Design", "Landing Pages", "Dashboard Design", "Interactive Elements", "Conversion Funnels"],
      timeline: "3-5 weeks"
    },
    {
      icon: Users,
      title: "Design Research & Testing",
      description: "Data-driven design decisions through user research, usability testing, and continuous optimization based on real user feedback.",
      deliverables: ["User Testing", "A/B Testing", "Analytics Setup", "Research Reports", "Optimization Plan"],
      timeline: "2-3 weeks"
    },
    {
      icon: Layers,
      title: "Design Systems & Branding",
      description: "Cohesive design systems and brand guidelines that ensure consistency across all touchpoints and scale with your business.",
      deliverables: ["Design System", "Brand Guidelines", "Logo Design", "Color Palette", "Typography Guide"],
      timeline: "4-6 weeks"
    }
  ];

  const designPrinciples: DesignPrinciple[] = [
    {
      icon: Heart,
      title: "User-Centered Design",
      description: "Every design decision is made with the end user in mind, ensuring intuitive and delightful experiences.",
      benefit: "Higher user satisfaction and engagement"
    },
    {
      icon: Zap,
      title: "Performance First",
      description: "Designs optimized for fast loading and smooth interactions across all devices and platforms.",
      benefit: "Improved conversion rates and SEO"
    },
    {
      icon: Target,
      title: "Conversion Focused",
      description: "Strategic design elements that guide users toward desired actions and business objectives.",
      benefit: "Increased revenue and goal completion"
    },
    {
      icon: Shield,
      title: "Accessibility Compliant",
      description: "Inclusive designs that work for users of all abilities, following WCAG guidelines and best practices.",
      benefit: "Broader audience reach and legal compliance"
    }
  ];

  const tools: Tool[] = [
    { 
      name: "Figma", 
      image: "/figma.png",
      color: "from-blue-500 to-cyan-500",
      category: "UI Design",
      expertise: "Expert • 5+ Years"
    },
    { 
      name: "Adobe XD", 
      image: "/adobexd.png",
      color: "from-cyan-500 to-blue-600",
      category: "UI Design",
      expertise: "Advanced • 4+ Years"
    },
    { 
      name: "Photoshop", 
      image: "/photoshop.png",
      color: "from-[#00BFFF] to-[#1B365D]",
      category: "Graphics Design",
      expertise: "Expert • 6+ Years"
    },
    { 
      name: "Illustrator", 
      image: "/illustrator.png",
      color: "from-[#1B365D] to-blue-500",
      category: "Graphics Design",
      expertise: "Expert • 5+ Years"
    },
    { 
      name: "Adobe After Effects", 
      image: "/adobeaftereffect.png",
      color: "from-blue-600 to-indigo-600",
      category: "UI Animation",
      expertise: "Advanced • 4+ Years"
    },
  
    // ➕ More UI/UX specific categories
    { 
      name: "Sketch", 
      image: "/sketch.png",
      color: "from-yellow-400 to-orange-500",
      category: "UI Design",
      expertise: "Advanced • 3+ Years"
    },
    { 
      name: "InVision", 
      image: "/invision.png",
      color: "from-pink-500 to-red-500",
      category: "Prototyping",
      expertise: "Intermediate • 2+ Years"
    },
    { 
      name: "Balsamiq", 
      image: "/balsamiq.png",
      color: "from-gray-500 to-gray-700",
      category: "Wireframing",
      expertise: "Intermediate • 2+ Years"
    },
  ];
  

  const workflowSteps: WorkflowStep[] = [
    {
      phase: "Research",
      title: "Discovery & Research",
      description: "Understanding your users, business goals, and market landscape through comprehensive research and analysis.",
      activities: ["Stakeholder Interviews", "User Research", "Competitor Analysis", "Market Research"],
      duration: "1-2 weeks"
    },
    {
      phase: "Strategy", 
      title: "Design Strategy",
      description: "Defining design direction, user personas, and creating a strategic roadmap for optimal user experience.",
      activities: ["User Personas", "Information Architecture", "User Flows", "Design Strategy"],
      duration: "1-2 weeks"
    },
    {
      phase: "Design",
      title: "Visual Design",
      description: "Creating beautiful, functional designs that align with your brand and provide exceptional user experiences.",
      activities: ["Wireframing", "Visual Design", "Design System", "Responsive Layouts"],
      duration: "3-5 weeks"
    },
    {
      phase: "Prototype",
      title: "Interactive Prototypes",
      description: "Building clickable prototypes that demonstrate functionality and allow for user testing and stakeholder feedback.",
      activities: ["Interactive Prototypes", "Micro-interactions", "Animation Design", "User Testing"],
      duration: "1-2 weeks"
    },
    {
      phase: "Handoff",
      title: "Development Handoff",
      description: "Seamless transition to development with detailed specifications, assets, and ongoing design support.",
      activities: ["Design Specifications", "Asset Export", "Developer Collaboration", "Quality Assurance"],
      duration: "1 week"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      company: "TechStartup Ltd",
      role: "CEO",
      quote: "The UI/UX design completely transformed our user engagement. Our app downloads increased by 300% after the redesign.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "E-commerce Plus",
      role: "Product Manager",
      quote: "Outstanding design work that not only looks beautiful but also improved our conversion rates significantly. Highly recommended!",
      rating: 5
    },
    {
      name: "Emma Williams",
      company: "FinTech Solutions",
      role: "Marketing Director",
      quote: "Professional, creative, and results-driven. The design team understood our vision and delivered beyond expectations.",
      rating: 5
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What's the difference between UI and UX design?",
      answer: "UX (User Experience) focuses on the overall feel and functionality of a product, including user research and journey mapping. UI (User Interface) focuses on the visual elements like colors, typography, and layout. Both are essential for successful digital products."
    },
    {
      question: "How do you ensure designs work well for our target audience?",
      answer: "We start with comprehensive user research, including surveys, interviews, and competitor analysis. We create user personas and test our designs with real users throughout the process to ensure optimal usability and engagement."
    },
    {
      question: "Do you provide design files and assets after completion?",
      answer: "Yes, you receive all design files in native formats (Figma, Sketch, etc.), exported assets, style guides, and comprehensive documentation. We also provide ongoing support during development implementation."
    },
    {
      question: "Can you redesign our existing website or app?",
      answer: "Absolutely! We specialize in redesigning existing digital products to improve user experience, increase conversions, and modernize visual appeal while maintaining brand consistency and user familiarity."
    }
  ];

  return (
    <>
      <Head>
        <title>Professional UI/UX Design Services | User Experience & Interface Design</title>
        <meta name="description" content="Expert UI/UX design services for web and mobile applications. User-centered design, conversion optimization, and beautiful interfaces that drive business results." />
        <meta name="keywords" content="UI design, UX design, user experience, interface design, mobile app design, web design, user research, prototyping" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://viorixdigital.com/services/ui-ux-design" />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section with Blue Color Scheme */}
        <header className="bg-gradient-to-br from-[#1B365D] via-blue-800 to-[#00BFFF] text-white relative overflow-hidden min-h-screen flex items-center">
          {/* Floating Design Elements */}
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-lg"
            />
            <motion.div
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-[#00BFFF] to-blue-400 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-32 left-16 w-24 h-24 border-4 border-white/20 rounded-full"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                ref={heroRef}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="text-sm">
                  <ol className="flex space-x-2 text-blue-200">
                    <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                   
                    <li aria-hidden="true">/</li>
                    <li className="text-white" aria-current="page">UI/UX Design</li>
                  </ol>
                </nav>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  Design That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-cyan-300">Converts</span>
                </h1>

                {/* Subheading */}
                <p className="text-xl text-blue-100 leading-relaxed">
                  User-centered design solutions that transform complex ideas into intuitive, beautiful experiences. We create designs that users love and businesses need.
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-6 py-6">
                  {[
                    { number: "250%", label: "Avg. Conversion Increase" },
                    { number: "4.9★", label: "Client Satisfaction" },
                    { number: "48h", label: "Initial Concepts" }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-bold text-[#00BFFF]">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-8 py-4 bg-white text-[#1B365D] font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <PenTool className="w-5 h-5 mr-2" />
                      Start Your Design
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/projects"
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                      View Design Portfolio
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#00BFFF] to-blue-500 rounded-xl flex items-center justify-center">
                        <Palette className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Design Excellence</div>
                        <div className="text-blue-200 text-sm">Award-winning UI/UX</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "95%" }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-gradient-to-r from-[#00BFFF] to-blue-500"
                        />
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "88%" }}
                          transition={{ duration: 2, delay: 1.2 }}
                          className="h-full bg-gradient-to-r from-blue-400 to-cyan-500"
                        />
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "92%" }}
                          transition={{ duration: 2, delay: 1.4 }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-[#00BFFF]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Design Principles Section - Blue Theme */}
        <section
          ref={principlesRef}
          className="py-16 lg:py-24 bg-white"
          aria-labelledby="principles-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPrinciplesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-[#00BFFF]/10 rounded-full border border-blue-200 mb-6">
                <Lightbulb className="w-5 h-5 text-[#00BFFF] mr-2" />
                <span className="text-[#00BFFF] font-medium">Design Philosophy</span>
              </div>
              <h2 id="principles-heading" className="text-3xl sm:text-4xl font-bold text-[#1B365D] mb-4">
                Our Design Principles
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The core principles that guide every design decision we make to ensure exceptional user experiences.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isPrinciplesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group text-center"
                >
                  <div className="relative mb-6">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-2xl mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <principle.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00BFFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B365D] mb-3">{principle.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{principle.description}</p>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-[#00BFFF]/10 text-[#00BFFF] text-xs font-medium rounded-full">
                    {principle.benefit}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid - Blue Theme */}
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
                Complete UI/UX Design Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From initial research to final implementation, we provide comprehensive design services that create exceptional user experiences and drive business success.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {designServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group relative overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00BFFF]/10 to-[#1B365D]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.timeline}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#1B365D] mb-4 group-hover:text-[#00BFFF] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Deliverables:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((deliverable) => (
                          <span
                            key={deliverable}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-[#00BFFF]/10 text-[#00BFFF] text-xs font-medium rounded-full"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section - Blue Theme */}
        <section
          ref={workflowRef}
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-[#1B365D] relative overflow-hidden"
          aria-labelledby="workflow-heading"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#00BFFF] to-blue-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-400 to-cyan-500 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isWorkflowInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00BFFF]/10 to-blue-500/10 rounded-full border border-[#00BFFF]/20 mb-6">
                <Sparkles className="w-5 h-5 text-[#00BFFF] mr-2" />
                <span className="text-cyan-300 font-medium">Design Process</span>
              </div>
              <h2 id="workflow-heading" className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-cyan-400">Design Workflow</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                A proven process that ensures every design decision is backed by research and optimized for user success.
              </p>
            </motion.div>

            {/* Timeline Layout */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00BFFF] to-blue-500"></div>

              <div className="space-y-12">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isWorkflowInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#00BFFF] to-blue-500 rounded-full border-4 border-slate-900 z-10">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00BFFF] to-blue-500 animate-ping opacity-75"></div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}>
                      <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-[#00BFFF]/50 transition-all duration-500">
                        <div className="flex items-center justify-between mb-4">
                          <div className="px-3 py-1 bg-gradient-to-r from-[#00BFFF] to-blue-500 text-white text-sm font-bold rounded-full uppercase tracking-wide">
                            {step.phase}
                          </div>
                          <div className="text-slate-400 text-sm">{step.duration}</div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-slate-300 mb-6 leading-relaxed">{step.description}</p>
                        
                        <div className="space-y-2">
                          <h4 className="text-[#00BFFF] font-semibold text-sm uppercase tracking-wide">Key Activities:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {step.activities.map((activity) => (
                              <div key={activity} className="flex items-center text-slate-300 text-sm">
                                <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                                {activity}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Design Tools Section - Blue Theme */}
        <section
          ref={toolsRef}
          className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
          aria-labelledby="tools-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isToolsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 id="tools-heading" className="text-3xl sm:text-4xl font-bold text-[#1B365D] mb-4">
                Professional Design Tools
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We use industry-leading design tools and software to create exceptional user experiences and maintain design consistency.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isToolsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-20 rounded-2xl`} />
                      <div className="relative w-full h-full bg-white rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Image
                          src={tool.image}
                          alt={`${tool.name} logo`}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                          priority={index < 4}
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#1B365D] mb-2 group-hover:text-[#00BFFF] transition-colors duration-300">
                      {tool.name}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {tool.category}
                      </div>
                      <div className="text-sm text-gray-500">{tool.expertise}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Carousel - Blue Theme */}
        <section
          ref={testimonialsRef}
          className="py-16 lg:py-24 bg-gradient-to-r from-[#1B365D] to-blue-600 text-white"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-blue-100">
                Real feedback from businesses we&apos;ve helped transform through design
              </p>
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isTestimonialsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                    {testimonials[activeTestimonial].quote}
                  </blockquote>
                  
                  <div className="space-y-2">
                    <div className="font-bold text-lg">{testimonials[activeTestimonial].name}</div>
                    <div className="text-blue-200">
                      {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? 'bg-white scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
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
                Common questions about our UI/UX design services and process
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

        {/* Results Showcase - Blue Theme */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1B365D] mb-4">
                Design Results That Matter
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our designs don&apos;t just look beautiful—they deliver measurable business results and improved user experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, metric: "250%", label: "Average Conversion Increase", color: "from-green-500 to-emerald-500" },
                { icon: Users, metric: "85%", label: "User Satisfaction Improvement", color: "from-[#00BFFF] to-blue-500" },
                { icon: MousePointer, metric: "40%", label: "Engagement Rate Boost", color: "from-blue-500 to-[#1B365D]" },
                { icon: Zap, metric: "60%", label: "Task Completion Speed", color: "from-[#00BFFF] to-cyan-500" }
              ].map((result, index) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${result.color} rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <result.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#1B365D] mb-2">{result.metric}</div>
                  <div className="text-gray-600 text-sm leading-relaxed">{result.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Blue Theme */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-[#00BFFF] via-blue-600 to-[#1B365D] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                Ready to Transform Your User Experience?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Let&apos;s create designs that not only look amazing but also drive real business results and user satisfaction.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="tel:+447464485026"
                    className="inline-flex items-center px-8 py-4 bg-white text-[#00BFFF] font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg"
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
                    href="mailto:info@viorix.co.uk"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Start Your Design Project
                  </Link>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100 pt-8 border-t border-white/20">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +44 7464 485026
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@viorix.co.uk
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  London, England, UK
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
      "name": "Professional UI/UX Design Services",
      "provider": {
        "@type": "Organization",
        "name": "Viorix Digital Solutions",
        "url": "https://viorix.co.uk",
        "logo": "https://viorix.co.uk/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+44-7464-485026",
          "contactType": "customer service",
          "areaServed": "GB",
          "availableLanguage": "English"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressRegion": "England",
          "addressCountry": "GB"
        }
      },
      "serviceType": "UI/UX Design",
      "description": "Professional UI/UX design services including user experience research, interface design, mobile app design, and user testing for optimal conversion rates.",
      "areaServed": "London",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "UI/UX Design Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "User Experience (UX) Design",
              "description": "Comprehensive UX research and design for intuitive user experiences"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "User Interface (UI) Design",
              "description": "Beautiful, modern interfaces that align with your brand"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile App Design",
              "description": "Platform-specific mobile designs for iOS and Android"
            }
          }
        ]
      }
    }),
  }}
/>

      </div>
    </>
  );
};

export default UIUXDesignPage;