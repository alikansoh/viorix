'use client';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  ArrowRight, 
  Rocket, 
  Users, 
  Award, 
  Headphones, 
  Star,
  Code,
  Smartphone,

  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';

const Hero = () => {
  return (
    <>
      {/* Enhanced SEO Meta Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Viorix Digital Solutions",
            "alternateName": "Viorix Digital",
            "url": "https://viorixdigital.com",
            "logo": "https://viorixdigital.com/logo.png",
            "description": "Leading digital agency providing professional web development, mobile app development, e-commerce solutions, SEO services, and custom software development. Transform your business with cutting-edge digital solutions.",
            "foundingDate": "2020",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-XXX-XXX-XXXX",
              "contactType": "customer service",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://linkedin.com/company/viorix-digital",
              "https://twitter.com/viorixdigital",
              "https://facebook.com/viorixdigital"
            ],
            "services": [
              "Web Development Services",
              "Mobile App Development", 
              "E-commerce Development Solutions",
              "Digital Marketing Services",
              "Custom Software Development",
              "SEO Optimization",
              "UI/UX Design",
              "Website Redesign",
              "API Development",
              "Cloud Solutions"
            ],
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "500"
            }
          })
        }}
      />

      <section 
        className="mt-20 px-6 pb-20 max-w-7xl mx-auto"
        itemScope 
        itemType="https://schema.org/WebPage"
        aria-label="Viorix Digital Solutions - Professional Web Development and Digital Marketing Services"
      >
        {/* Enhanced Background with subtle animations */}
        <div className="relative bg-gradient-to-b from-white via-gray-50/30 to-white rounded-3xl shadow-sm px-8 py-16 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-10 w-20 h-20 bg-[#00BFFF] rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-16 h-16 bg-[#1B365D] rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-[#00BFFF] rounded-full blur-lg animate-pulse delay-2000"></div>
          </div>

          <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            
            {/* Left Side - Enhanced Content with SEO Keywords */}
            <div className="text-center lg:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Enhanced H1 with comprehensive keywords */}
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight"
                  itemProp="headline"
                >
                  <span className="text-[#1B365D]">Professional</span>{' '}
                  <TypeAnimation
                    sequence={[
                      'Web Development Services', 2000,
                      'Mobile App Development', 2000,
                      'E-commerce Solutions', 2000,
                      'Digital Marketing', 2000,
                      'Custom Software Development', 2000,
                      'SEO Optimization', 2000,
                      'UI/UX Design Services', 2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    deletionSpeed={30}
                    repeat={Infinity}
                    className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent"
                  />
                  <br />
                  <span className="text-gray-800">That Scale Your Business</span>
                </h1>

                {/* Enhanced description with long-tail keywords */}
                <div 
                  className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 leading-relaxed"
                  itemProp="description"
                >
                  <p className="mb-4">
                    <span className="font-bold text-[#1B365D]">Viorix Digital Solutions</span> is a 
                    leading digital agency specializing in <strong>responsive web development</strong>, 
                    <strong> cross-platform mobile app development</strong>, <strong>e-commerce website design</strong>, 
                    and <strong>result-driven digital marketing strategies</strong>.
                  </p>
                  <p>
                    Transform your business with our <strong>custom software solutions</strong>, 
                    <strong>SEO optimization services</strong>, and <strong>conversion-focused web design</strong> 
                    that drive measurable results and boost your online presence.
                  </p>
                </div>

                {/* Enhanced feature highlights */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                    <Code className="w-4 h-4 text-[#00BFFF]" />
                    <span className="text-sm font-medium text-[#1B365D]">Custom Development</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                    <Smartphone className="w-4 h-4 text-[#00BFFF]" />
                    <span className="text-sm font-medium text-[#1B365D]">Mobile-First Design</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                    <TrendingUp className="w-4 h-4 text-[#00BFFF]" />
                    <span className="text-sm font-medium text-[#1B365D]">SEO Optimized</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                    <Zap className="w-4 h-4 text-[#00BFFF]" />
                    <span className="text-sm font-medium text-[#1B365D]">Fast Loading</span>
                  </div>
                </div>

                {/* Enhanced CTA Buttons with better accessibility */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/contact" aria-label="Get free consultation for web development services">
                    <motion.button
                      className="group px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-blue-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                    >
                      <div className="flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        Get Free Consultation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  </Link>

                  <Link href="/services" aria-label="View our digital services and solutions">
                    <motion.button
                      className="group px-8 py-4 border-2 border-[#00BFFF] text-[#1B365D] font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white hover:border-transparent transition-all duration-300 focus:ring-4 focus:ring-blue-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                    >
                      <div className="flex items-center gap-2">
                        View Our Services
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Enhanced Image with better SEO */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-[360px] sm:w-[420px] md:w-[480px] lg:w-[520px] aspect-square">
                  {/* Enhanced gradient border with animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-2xl p-1 shadow-xl animate-pulse">
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                      <Image
                        src="/hero.jpg"
                        alt="Professional web development team at Viorix Digital Solutions creating responsive websites, mobile apps, and e-commerce platforms for business growth"
                        width={520}
                        height={520}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                        priority
                        sizes="(max-width: 640px) 360px, (max-width: 768px) 420px, (max-width: 1024px) 480px, 520px"
                        itemProp="image"
                      />
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  <motion.div 
                    className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg border border-gray-100"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Shield className="w-6 h-6 text-[#00BFFF]" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white rounded-full p-3 shadow-lg"
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    <Star className="w-6 h-6" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Trust Indicators with Icons and Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-full group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20 transition-all duration-300">
                    <Users className="w-8 h-8 text-[#1B365D]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#1B365D] mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
                <div className="text-xs text-gray-500 mt-1">Worldwide</div>
              </motion.div>

              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-full group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20 transition-all duration-300">
                    <Award className="w-8 h-8 text-[#1B365D]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#1B365D] mb-1">99%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">Project Delivery</div>
              </motion.div>

              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-full group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20 transition-all duration-300">
                    <Headphones className="w-8 h-8 text-[#1B365D]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#1B365D] mb-1">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
                <div className="text-xs text-gray-500 mt-1">Always Available</div>
              </motion.div>

              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-full group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20 transition-all duration-300">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#1B365D] mb-1">5.0</div>
                <div className="text-sm text-gray-600 font-medium">Rating</div>
                <div className="text-xs text-gray-500 mt-1">Client Reviews</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional SEO Content - Keywords Rich Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-500 max-w-4xl mx-auto leading-relaxed">
              <strong>Viorix Digital Solutions</strong> specializes in <em>responsive web design</em>, 
              <em> mobile app development</em>, <em>e-commerce platform development</em>, 
              <em>search engine optimization (SEO)</em>, <em>digital marketing strategies</em>, 
              <em>custom software development</em>, <em>API integration</em>, 
              <em>cloud solutions</em>, and <em>UI/UX design services</em>. 
              We serve businesses of all sizes with cutting-edge technology solutions 
              that drive growth and enhance online presence.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;