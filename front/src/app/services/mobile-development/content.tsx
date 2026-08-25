"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import {
  Smartphone,
  Tablet,
  MonitorSpeaker,
  Shield,
  Rocket,
  CheckCircle,
  ArrowRight,
  Palette,
  Cloud,
  Zap,
  Clock,
  Target,
  Phone,
  Mail,
  MapPin,
  Users,
  Download,
  Star,
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

type TechCategory = 'native' | 'crossplatform' | 'backend';

interface TechnologiesData {
  native: Technology[];
  crossplatform: Technology[];
  backend: Technology[];
}

const MobileApplicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TechCategory>('native');
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  
  const isServicesInView = useInView(servicesRef, { once: true });
  const isProcessInView = useInView(processRef, { once: true });
  const isTechInView = useInView(techRef, { once: true });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const services: Service[] = [
    {
      icon: Smartphone,
      title: "Native Mobile Apps",
      description: "High-performance native applications for iOS and Android with platform-specific optimizations and seamless user experiences.",
      features: ["iOS (Swift/SwiftUI)", "Android (Kotlin/Java)", "Platform Optimized", "App Store Ready"]
    },
    {
      icon: MonitorSpeaker,
      title: "Cross-Platform Development",
      description: "Cost-effective cross-platform solutions using React Native and Flutter to reach both iOS and Android users with a single codebase.",
      features: ["React Native", "Flutter", "Code Reusability", "Faster Development"]
    },
    {
      icon: Cloud,
      title: "Mobile Backend Services",
      description: "Robust backend infrastructure with APIs, real-time databases, push notifications, and cloud storage for your mobile applications.",
      features: ["REST/GraphQL APIs", "Real-time Database", "Push Notifications", "Cloud Storage"]
    },
    {
      icon: Users,
      title: "UI/UX Design",
      description: "Intuitive mobile interfaces designed following platform guidelines to ensure excellent user experience and engagement.",
      features: ["Material Design", "Human Interface Guidelines", "User Research", "Prototyping"]
    },
    {
      icon: Shield,
      title: "App Security",
      description: "Enterprise-grade security implementation with data encryption, secure authentication, and protection against mobile threats.",
      features: ["Data Encryption", "Biometric Auth", "OWASP Compliance", "Secure Storage"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed and efficiency optimization ensuring fast loading times, smooth animations, and minimal battery consumption.",
      features: ["Code Optimization", "Memory Management", "Battery Efficient", "Fast Loading"]
    }
  ];

  const technologies: TechnologiesData = {
    native: [
      { 
        name: "Swift", 
        image: "/swift.svg",
        color: "from-orange-500 to-red-500",
        description: "iOS native development",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "Kotlin", 
        image: "/kotlin.svg",
        color: "from-purple-500 to-indigo-500",
        description: "Android native development",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "SwiftUI", 
        image: "/swiftui.png",
        color: "from-blue-500 to-cyan-500",
        description: "Modern iOS UI framework",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "Android SDK", 
        image: "/android.svg",
        color: "from-green-500 to-emerald-500",
        description: "Android development platform",
        benefit: "Expert • 5+ Years"
      },
      { 
        name: "Xcode", 
        image: "/xcode.png",
        color: "from-blue-600 to-indigo-600",
        description: "iOS development environment",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "Android Studio", 
        image: "/androidstudio.png",
        color: "from-green-600 to-teal-600",
        description: "Android development IDE",
        benefit: "Expert • 5+ Years"
      }
    ],
    crossplatform: [
      { 
        name: "React Native", 
        image: "/reactnative.png",
        color: "from-blue-500 to-cyan-500",
        description: "Cross-platform with React",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "Flutter", 
        image: "/flutter.svg",
        color: "from-blue-600 to-indigo-600",
        description: "Google's UI toolkit",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "Expo", 
        image: "/expo.svg",
        color: "from-purple-600 to-pink-600",
        description: "React Native development platform",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "Dart", 
        image: "/dart.png",
        color: "from-blue-500 to-teal-500",
        description: "Flutter programming language",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "Ionic", 
        image: "/lonic.svg",
        color: "from-blue-600 to-cyan-600",
        description: "Hybrid app development",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "Cordova", 
        image: "/cordova.png",
        color: "from-gray-600 to-slate-600",
        description: "Web to mobile wrapper",
        benefit: "Advanced • 4+ Years"
      }
    ],
    backend: [
      { 
        name: "Firebase", 
        image: "/firebase.png",
        color: "from-yellow-500 to-orange-500",
        description: "Google's mobile platform",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "AWS Mobile", 
        image: "/aws.png",
        color: "from-orange-500 to-yellow-500",
        description: "Amazon mobile services",
        benefit: "Advanced • 4+ Years"
      },
      { 
        name: "Node.js", 
        image: "/node.png",
        color: "from-green-600 to-green-800",
        description: "Backend API development",
        benefit: "Expert • 5+ Years"
      },
      { 
        name: "GraphQL", 
        image: "/graphql.png",
        color: "from-pink-500 to-purple-500",
        description: "API query language",
        benefit: "Advanced • 3+ Years"
      },
      { 
        name: "MongoDB", 
        image: "/mongo.png",
        color: "from-green-500 to-teal-600",
        description: "NoSQL mobile database",
        benefit: "Expert • 4+ Years"
      },
      { 
        name: "Socket.io", 
        image: "/socketio.png",
        color: "from-gray-600 to-slate-600",
        description: "Real-time communication",
        benefit: "Advanced • 3+ Years"
      }
    ]
  };

  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "App Strategy & Planning",
      description: "We analyze your target market, define core features, and create a comprehensive mobile strategy aligned with your business goals.",
      icon: Target,
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Creating intuitive, platform-specific designs that follow iOS and Android guidelines while maintaining your brand identity.",
      icon: Palette,
      duration: "2-4 weeks"
    },
    {
      step: "03",
      title: "App Development",
      description: "Building your mobile application with clean, scalable code using the latest frameworks and development best practices.",
      icon: Smartphone,
      duration: "6-12 weeks"
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Rigorous testing across multiple devices, operating systems, and scenarios to ensure bug-free performance and user satisfaction.",
      icon: Shield,
      duration: "2-3 weeks"
    },
    {
      step: "05",
      title: "App Store Launch",
      description: "Complete app store submission process, marketing materials, and post-launch support to ensure successful market entry.",
      icon: Rocket,
      duration: "1-2 weeks"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "Should I choose native or cross-platform development?",
      answer: "Native development offers the best performance and platform-specific features, while cross-platform saves time and cost. We recommend native for complex, performance-critical apps and cross-platform for MVPs or simpler applications."
    },
    {
      question: "How much does mobile app development cost?",
      answer: "Costs vary based on complexity, features, and platform choice. Simple apps start around £15,000, while complex enterprise apps can range from £50,000+. We provide detailed quotes after understanding your requirements."
    },
    {
      question: "How long does it take to develop a mobile app?",
      answer: "Development time depends on app complexity. Simple apps take 3-4 months, while feature-rich applications can take 6-12 months. We provide realistic timelines during the planning phase."
    },
    {
      question: "Do you help with app store submission and marketing?",
      answer: "Yes, we handle the complete app store submission process for both iOS App Store and Google Play Store, including app store optimization (ASO) and launch marketing strategies."
    }
  ];

  const stats: Stat[] = [
    { number: "20+", label: "Apps Delivered", icon: Smartphone },
    { number: "200+", label: "Downloads Generated", icon: Download },
    { number: "4.8★", label: "Average App Rating", icon: Star },
    { number: "99%", label: "Client Satisfaction", icon: Users }
  ];

  return (
    <>
      <Head>
        <title>Professional Mobile App Development Services | iOS & Android Apps</title>
        <meta name="description" content="Expert mobile app development services for iOS and Android. Native and cross-platform solutions with React Native, Flutter, Swift, and Kotlin. Custom mobile applications that drive business growth." />
        <meta name="keywords" content="mobile app development, iOS apps, Android apps, React Native, Flutter, Swift, Kotlin, cross-platform development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://viorixdigital.com/services/mobile-applications" />
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
                  <li className="text-white" aria-current="page">Mobile Applications</li>
                </ol>
              </nav>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Mobile App</span> Development
              </h1>

              {/* Subheading */}
              <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Native and cross-platform mobile applications that engage users and drive business growth. From iOS to Android, we build apps that users love and businesses rely on.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {[
                  "iOS & Android",
                  "App Store Ready",
                  "High Performance",
                  "User-Centric Design"
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
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-white text-[#1B365D] font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Your App
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
                    View App Portfolio
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
      <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-[#0A2342] mb-4">
        Complete Mobile App Development Services
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        From concept to app store launch, we provide end-to-end mobile development solutions that transform your ideas into successful mobile applications.
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
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#00BFFF] rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <service.icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-bold text-[#0A2342] mb-4">{service.title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

          <ul className="space-y-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-cyan-500 mr-2 flex-shrink-0" />
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
<section 
  ref={techRef} 
  className="py-16 lg:py-24 bg-gradient-to-br from-[#081830] via-[#0A3D91] to-[#0AB4D8] relative overflow-hidden"
>

  {/* Background Elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isTechInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full border border-blue-500/20 mb-6">
        <Sparkles className="w-5 h-5 text-cyan-400 mr-2" />
        <span className="text-cyan-300 font-medium">Mobile Technologies</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
        Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Mobile Stack</span>
      </h2>
      <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
        We use industry-leading technologies and frameworks to create fast, secure, and scalable mobile applications for iOS and Android platforms.
      </p>
    </motion.div>

    {/* Technology Tabs */}
    <div className="flex justify-center mb-16 px-4">
  <div className="bg-slate-800/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-700/50 flex flex-wrap justify-center gap-2">
    {(Object.keys(technologies) as TechCategory[]).map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 sm:px-8 py-2 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-500 capitalize relative overflow-hidden flex-1 sm:flex-none text-center ${
          activeTab === tab
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl shadow-cyan-500/25'
            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
        }`}
      >
        {activeTab === tab && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">
          {tab === 'native'
            ? 'Native Development'
            : tab === 'crossplatform'
            ? 'Cross-Platform'
            : 'Backend & APIs'}
        </span>
      </button>
    ))}
  </div>
</div>

    {/* Technology Cards */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                    animate={{ width: "90%" }}
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

    {/* App Stats */}
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
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
            <div className="text-white text-sm">{stat.label}</div>
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
                Our App Development Process
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A structured approach that ensures your mobile app is delivered on time, within budget, and exceeds user expectations.
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
                Common questions about our mobile app development services
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

        {/* Platform Benefits Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1B365D] mb-4">
                Why Choose Mobile Apps for Your Business?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Mobile applications offer unique advantages that can transform your business and customer engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Enhanced User Engagement",
                  description: "Apps provide direct access to customers with push notifications, offline functionality, and personalized experiences."
                },
                {
                  icon: Zap,
                  title: "Superior Performance",
                  description: "Native and optimized cross-platform apps deliver faster loading times and smoother user interactions."
                },
                {
                  icon: Shield,
                  title: "Advanced Security",
                  description: "Mobile apps offer better data security with device-level encryption and secure authentication methods."
                },
                {
                  icon: Tablet,
                  title: "Device Integration",
                  description: "Access device features like camera, GPS, contacts, and sensors for enhanced functionality."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-2xl mb-6 mx-auto">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B365D] mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
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
                Ready to Launch Your Mobile App?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Let&apos;s transform your idea into a successful mobile application that users love and your business needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="tel:+447464485026"
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
                    href="mailto:info@viorix.co.uk"
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get Free Consultation
                  </Link>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100 pt-8 border-t border-white/20">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +44 7464 485 026
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
      "name": "Professional Mobile App Development Services",
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
      "serviceType": "Mobile Application Development",
      "description": "Professional mobile app development services for iOS and Android including native apps, cross-platform solutions, and mobile backend services.",
      "areaServed": "London",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mobile App Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Native Mobile Apps",
              "description": "High-performance native applications for iOS and Android"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cross-Platform Development",
              "description": "React Native and Flutter applications"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile Backend Services",
              "description": "APIs and cloud infrastructure for mobile apps"
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

export default MobileApplicationsPage;