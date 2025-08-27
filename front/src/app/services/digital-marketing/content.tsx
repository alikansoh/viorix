"use client"
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    
  TrendingUp,
  Target,
  Camera,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  MousePointer,
  Phone,
  PenTool,
  DollarSign,
  Rocket,
  Zap,
  Shield,
  Crown,
  Check,
  X,
  Activity,
  Award,
} from 'lucide-react';
import Link from 'next/link';

// TypeScript Interfaces
interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  excludedFeatures?: string[];
  highlighted?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  buttonText: string;
}

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
  color: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}



export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  
  const isServicesInView = useInView(servicesRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });
  const isPricingInView = useInView(pricingRef, { once: true });
  const isProcessInView = useInView(processRef, { once: true });

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      price: "£599",
      period: "/month",
      description: "Professional social media advertising to build your presence",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      buttonText: "Start Advertising",
      features: [
        "Up to 5 professionally designed ads/month",
        "Custom Graphics & Copy for each ad",
        "Audience Targeting & Basic Optimization",
        "Monthly Performance Report",
        "Included Ad Budget: £200"
      ]
    },
    {
      name: "Professional",
      price: "£1,299",
      period: "/month",
      description: "Grow your business with multi-platform campaigns",
      icon: Crown,
      color: "from-cyan-500 to-blue-600",
      buttonText: "Run Campaigns",
      highlighted: true,
      features: [
        "Up to 10 professionally designed ads/month",
        "Custom Graphics & Copy for each ad",
        "Advanced Targeting & A/B Testing",
        "Ad Optimization & Retargeting",
        "Weekly Performance Reports",
        "Consultation & Campaign Strategy",
        "Included Ad Budget: £500"
      ]
    },
    {
      name: "Enterprise",
      price: "£2,499",
      period: "/month",
      description: "Full-service social media campaigns for maximum impact",
      icon: Shield,
      color: "from-blue-600 to-cyan-600",
      buttonText: "Maximize Reach",
      features: [
        "Up to 15 professionally designed ads/month",
        "Custom Graphics & Copy for each ad",
        "Advanced Targeting, Retargeting & Conversion Tracking",
        "Full Ad Optimization",
        "Daily Performance Monitoring & Reports",
        "Dedicated Account Manager & Strategy Sessions",
        "Included Ad Budget: £800"
      ]
    }
  ];
  
  
  const services: Service[] = [
    {
      icon: MousePointer,
      title: "Social Media Advertising",
      description: "Create and manage high-performing social media campaigns that drive measurable results.",
      features: [
        "Ads on multiple platforms",
        "Target Audience Research",
        "Ad Optimization & Retargeting",
        "A/B Testing"
      ]
    },
    {
      icon: PenTool,
      title: "Logo & Branding Design",
      description: "Develop a professional brand identity that stands out and resonates with your audience.",
      features: [
        "Custom Logo Design",
        "Brand Style Guide",
        "Visual Identity Assets",
        "Professional Consultation"
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Performance",
      description: "Track, analyze, and optimize campaigns to maximize ROI.",
      features: [
        "Detailed Performance Reports",
        "Conversion Tracking",
        "ROI Analysis",
        "Campaign Optimization Recommendations"
      ]
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "Produce high-quality content that engages your audience and supports your campaigns.",
      features: [
        "Graphic Design & Visuals",
        "Video Production",
        "Copywriting & Captions",
        "Custom Content for Ads"
      ]
    }
  ];
  
  
  const stats: Stat[] = [
    {
      icon: TrendingUp,
      number: "400%",
      label: "Average ROI on Ad Spend",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      number: "95%",
      label: "Client Retention Rate",
      color: "from-blue-600 to-cyan-400"
    },
    {
      icon: BarChart3,
      number: "150%",
      label: "Average Engagement Increase",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Award,
      number: "4.9",
      label: "Average Client Rating",
      color: "from-cyan-400 to-blue-500"
    }
  ];
  
  
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We analyze your business, competitors, and market opportunities to create a winning strategy.",
      icon: Lightbulb
    },
    {
      number: "02",
      title: "Campaign Development",
      description: "Our experts design and build your marketing campaigns across all selected channels.",
      icon: PenTool
    },
    {
      number: "03",
      title: "Launch & Monitor",
      description: "We launch your campaigns and provide real-time monitoring to ensure optimal performance.",
      icon: Rocket
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description: "Continuous optimization and scaling of successful campaigns to maximize your ROI.",
      icon: TrendingUp
    }
  ];

  

  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden min-h-screen flex items-center pt-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-32 h-32 border-2 border-cyan-300 rounded-full"
          />
          <motion.div
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-sm"
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
            className="absolute bottom-32 left-16 w-40 h-40 border-4 border-cyan-300 rounded-lg rotate-45"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
             

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                Grow Your Business With
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 block">
                  Digital Marketing
                </span>
              </h1>

              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                We help ambitious businesses achieve explosive growth through strategic digital marketing campaigns that deliver measurable results.
              </p>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-blue-400/20">
                {[
                  { number: "400%", label: "ROI Increase" },
                  { number: "250+", label: "Campaigns Launched" },
                  { number: "24h", label: "Quick Start" }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-cyan-300" data-testid={`hero-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center cursor-pointer px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-2xl"
                  data-testid="button-start-growing"
                >

                  <Rocket className="w-5 h-5 mr-2" />
                  Start Growing Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
                </Link>
                
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:block hidden"
            >
              <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-cyan-300/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Campaign Performance</h3>
                    <div className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">Live</div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Website Traffic", value: 87, color: "from-cyan-400 to-blue-500" },
                      { label: "Conversion Rate", value: 92, color: "from-blue-500 to-cyan-500" },
                      { label: "Lead Quality", value: 95, color: "from-cyan-500 to-blue-600" }
                    ].map((metric, index) => (
                      <div key={metric.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-100">{metric.label}</span>
                          <span className="text-white font-semibold">{metric.value}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 2, delay: 1 + (index * 0.2) }}
                            className={`h-full bg-gradient-to-r ${metric.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className="py-24 bg-gradient-to-b from-white to-cyan-50"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200 mb-6">
              <Zap className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-600 font-medium">Our Services</span>
            </div>
            <h2 id="services-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Complete Digital Marketing Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end digital marketing services that drive growth, increase revenue, and establish your brand as an industry leader.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-cyan-200"
                data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-cyan-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-24 bg-gradient-to-r from-blue-600 to-cyan-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Proven Results That Speak Volumes
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our data-driven approach delivers exceptional results for businesses across all industries and sizes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black mb-3 text-cyan-100">{stat.number}</div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        ref={pricingRef}
        className="py-24 bg-gradient-to-b from-cyan-50 to-white"
        aria-labelledby="pricing-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full border border-cyan-200 mb-6">
              <DollarSign className="w-5 h-5 text-cyan-600 mr-2" />
              <span className="text-cyan-600 font-medium">Pricing Plans</span>
            </div>
            <h2 id="pricing-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Growth Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden fees. Select the perfect plan to accelerate your business growth.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  plan.highlighted 
                    ? 'border-cyan-500 scale-105' 
                    : 'border-gray-200 hover:border-cyan-300'
                }`}
                data-testid={`pricing-plan-${plan.name.toLowerCase()}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mx-auto mb-4 shadow-lg`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                      <span className="text-xl text-gray-500 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.excludedFeatures?.map((feature) => (
                      <li key={feature} className="flex items-start opacity-50">
                        <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>

                 
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 ">
            <p className="text-gray-600 mb-4">Need a custom solution? We&apos;ve got you covered.</p>
            <Link href="/contact" >

            <button className="inline-flex items-center cursor-pointer px-6 py-3 border-2 border-cyan-500 text-cyan-600 font-semibold rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300">
              <Phone className="w-5 h-5 mr-2" />
              Contact Us for Enterprise Pricing
            </button>
            </Link>
          </div>
≈        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        ref={processRef}
        className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-400 to-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-6">
              <Activity className="w-5 h-5 text-cyan-300 mr-2" />
              <span className="text-cyan-100 font-medium">Our Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              How We Drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Exceptional Results</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proven 4-step methodology ensures your marketing campaigns deliver maximum impact and sustainable growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-cyan-400/30 relative group"
                data-testid={`process-step-${step.number}`}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-6xl font-bold text-white/10 absolute -top-4 -right-4">{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed relative z-10">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Social Media Advertising",
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
          "serviceType": "Social Media Advertising",
          "description": "Create and manage high-performing social media campaigns that drive measurable results."
        },
        {
          "@type": "Service",
          "name": "Logo & Branding Design",
          "provider": {
            "@type": "Organization",
            "name": "Viorix Digital Solutions",
            "url": "https://viorix.co.uk",
            "logo": "https://viorix.co.uk/logo.png"
          },
          "serviceType": "Branding & Design",
          "description": "Develop a professional brand identity that stands out and resonates with your audience."
        },
        {
          "@type": "Service",
          "name": "Analytics & Performance",
          "provider": {
            "@type": "Organization",
            "name": "Viorix Digital Solutions",
            "url": "https://viorix.co.uk",
            "logo": "https://viorix.co.uk/logo.png"
          },
          "serviceType": "Analytics",
          "description": "Track, analyze, and optimize campaigns to maximize ROI."
        },
        {
          "@type": "Service",
          "name": "Content Creation",
          "provider": {
            "@type": "Organization",
            "name": "Viorix Digital Solutions",
            "url": "https://viorix.co.uk",
            "logo": "https://viorix.co.uk/logo.png"
          },
          "serviceType": "Content Creation",
          "description": "Produce high-quality content that engages your audience and supports your campaigns."
        }
      ]
    })
  }}
/>

      </div>
  );
}
