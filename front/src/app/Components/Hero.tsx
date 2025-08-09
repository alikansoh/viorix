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
  Shield,
  CheckCircle,
  Globe
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
        className="relative min-h-screen flex items-center mt-16 px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto overflow-hidden"
        itemScope 
        itemType="https://schema.org/WebPage"
        aria-label="Viorix Digital Solutions - Professional Web Development and Digital Marketing Services"
      >
        {/* Enhanced Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20"></div>
          
          {/* Animated geometric shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
            <motion.div 
              className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-l from-[#1B365D] to-[#00BFFF] rounded-full blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
            <motion.div 
              className="absolute top-1/2 right-1/4 w-16 h-16 bg-[#00BFFF] rounded-full blur-xl"
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            ></motion.div>
          </div>

          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Main Content Container */}
        <div className="relative w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            
            {/* Left Side - Enhanced Content */}
            <div className="text-center lg:text-left flex-1 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-200/50 rounded-full text-sm font-medium text-[#1B365D]"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Trusted by 500+ Businesses Worldwide</span>
                  <Globe className="w-4 h-4 text-[#00BFFF]" />
                </motion.div>

                {/* Enhanced H1 with improved typography */}
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-gray-900 leading-[1.1] sm:leading-[1.15]"
                  itemProp="headline"
                >
                  <span className="block text-[#1B365D] mb-2">Professional</span>
                  <span className="block min-h-[1.2em]">
                    <TypeAnimation
                      sequence={[
                        'Web Development', 2000,
                        'Mobile Apps', 2000,
                        'E-commerce', 2000,
                        'Digital Marketing', 2000,
                        'Custom Software', 2000,
                        'SEO Solutions', 2000,
                        'UI/UX Design', 2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      deletionSpeed={40}
                      repeat={Infinity}
                      className="bg-gradient-to-r from-[#00BFFF] via-[#0099CC] to-[#1B365D] bg-clip-text text-transparent"
                    />
                  </span>
                  <span className="block text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-2 font-bold">
                    That Scale Your Business
                  </span>
                </h1>

                {/* Enhanced description with better spacing */}
                <div 
                  className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl space-y-4 leading-relaxed"
                  itemProp="description"
                >
                  <p>
                    <span className="font-bold text-[#1B365D]">Viorix Digital Solutions</span> is a 
                    leading digital agency specializing in <strong>responsive web development</strong>, 
                    <strong> cross-platform mobile app development</strong>, <strong>e-commerce website design</strong>, 
                    and <strong>result-driven digital marketing strategies</strong>.
                  </p>
                  <p className="hidden sm:block">
                    Transform your business with our <strong>custom software solutions</strong>, 
                    <strong>SEO optimization services</strong>, and <strong>conversion-focused web design</strong> 
                    that drive measurable results and boost your online presence.
                  </p>
                </div>

                {/* Enhanced feature highlights with better mobile layout */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {[
                    { icon: Code, text: "Custom Development" },
                    { icon: Smartphone, text: "Mobile-First Design" },
                    { icon: TrendingUp, text: "SEO Optimized" },
                    { icon: Zap, text: "Lightning Fast" },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <feature.icon className="w-4 h-4 text-[#00BFFF]" />
                      <span className="text-sm font-medium text-[#1B365D]">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA Buttons with improved mobile layout */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Link href="/contact" aria-label="Get free consultation for web development services">
                    <motion.button
                      className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 focus:ring-4 focus:ring-blue-300/50 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(0, 191, 255, 0.25)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-2">
                        <Rocket className="w-5 h-5" />
                        <span>Get Free Consultation</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.button>
                  </Link>

                  <Link href="/services" aria-label="View our digital services and solutions">
                    <motion.button
                      className="group w-full sm:w-auto px-8 py-4 border-2 border-[#00BFFF] text-[#1B365D] font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white hover:border-transparent transition-all duration-500 focus:ring-4 focus:ring-blue-300/50 backdrop-blur-sm bg-white/50"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px -12px rgba(27, 54, 93, 0.15)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>View Our Services</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Enhanced Image with better responsive design */}
            <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[580px]"
              >
                <div className="aspect-square w-full relative">
                  {/* Enhanced gradient border with animation */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] via-[#0099CC] to-[#1B365D] rounded-3xl p-1 shadow-2xl"
                    animate={{
                      rotate: [0, 1, 0, -1, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full bg-white rounded-3xl overflow-hidden relative">
                      <Image
                        src="/hero.jpg"
                        alt="Professional web development team at Viorix Digital Solutions creating responsive websites, mobile apps, and e-commerce platforms for business growth"
                        width={580}
                        height={580}
                        className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                        priority
                        sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 450px, (max-width: 1280px) 500px, 580px"
                        itemProp="image"
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#00BFFF]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                  
                  {/* Enhanced floating badges with better mobile positioning */}
                  <motion.div 
                    className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 backdrop-blur-sm"
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#00BFFF]" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white rounded-2xl p-3 sm:p-4 shadow-xl"
                    animate={{ 
                      y: [0, 8, 0],
                      rotate: [0, -3, 0],
                      scale: [1.05, 1, 1.05]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  >
                    <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Additional decorative elements */}
                  <motion.div 
                    className="absolute top-1/4 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg opacity-80"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Trust Indicators with better mobile layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 lg:mt-24"
          >
            {/* Separator */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="px-6 text-sm font-medium text-gray-500 bg-white">Trusted Worldwide</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: Users, number: "500+", label: "Happy Clients", sublabel: "Worldwide" },
                { icon: Award, number: "99%", label: "Success Rate", sublabel: "Project Delivery" },
                { icon: Headphones, number: "24/7", label: "Support", sublabel: "Always Available" },
                { icon: null, number: "5.0", label: "Rating", sublabel: "Client Reviews" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center group cursor-pointer p-4 rounded-2xl hover:bg-white/50 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-2xl group-hover:from-[#00BFFF]/20 group-hover:to-[#1B365D]/20 transition-all duration-300">
                      {stat.icon ? (
                        <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#1B365D]" />
                      ) : (
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.div 
                    className="text-2xl sm:text-3xl font-bold text-[#1B365D] mb-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm sm:text-base text-gray-700 font-medium">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced SEO Content with better mobile formatting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 lg:mt-16 text-center"
          >
            <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-gradient-to-r from-gray-50/50 to-blue-50/30 rounded-3xl border border-gray-100/50 backdrop-blur-sm">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <strong className="text-[#1B365D]">Viorix Digital Solutions</strong> specializes in{' '}
                <em className="text-[#00BFFF] font-medium">responsive web design</em>,{' '}
                <em className="text-[#00BFFF] font-medium">mobile app development</em>,{' '}
                <em className="text-[#00BFFF] font-medium">e-commerce platform development</em>,{' '}
                <em className="text-[#00BFFF] font-medium">search engine optimization (SEO)</em>,{' '}
                <em className="text-[#00BFFF] font-medium">digital marketing strategies</em>,{' '}
                <em className="text-[#00BFFF] font-medium">custom software development</em>,{' '}
                <em className="text-[#00BFFF] font-medium">API integration</em>,{' '}
                <em className="text-[#00BFFF] font-medium">cloud solutions</em>, and{' '}
                <em className="text-[#00BFFF] font-medium">UI/UX design services</em>.{' '}
                We serve businesses of all sizes with cutting-edge technology solutions 
                that drive growth and enhance online presence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;