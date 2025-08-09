"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, ChevronDown, 
  Code, Smartphone, Globe, Database,
  Palette, Search, Shield, BarChart3,
  Cloud, Zap, Users, Settings
} from 'lucide-react';

const servicesData = [
  {
    category: 'Web Development',
    icon: Globe,
    services: [
      { name: 'Custom Web Applications', desc: 'Scalable web solutions tailored to your business' },
      { name: 'E-commerce Platforms', desc: 'Complete online store development' },
      { name: 'Progressive Web Apps', desc: 'Fast, reliable web applications' },
      { name: 'API Development', desc: 'RESTful and GraphQL APIs' }
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    category: 'Mobile Development',
    icon: Smartphone,
    services: [
      { name: 'iOS App Development', desc: 'Native iOS applications' },
      { name: 'Android Development', desc: 'Native Android applications' },
      { name: 'Cross-Platform Apps', desc: 'React Native & Flutter apps' },
      { name: 'App Store Optimization', desc: 'Maximize your app visibility' }
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    category: 'UI/UX Design',
    icon: Palette,
    services: [
      { name: 'User Interface Design', desc: 'Beautiful, intuitive interfaces' },
      { name: 'User Experience Research', desc: 'Data-driven design decisions' },
      { name: 'Brand Identity', desc: 'Complete brand design systems' },
      { name: 'Prototyping', desc: 'Interactive design prototypes' }
    ],
    color: 'from-emerald-500 to-teal-500'
  },
  {
    category: 'Digital Marketing',
    icon: BarChart3,
    services: [
      { name: 'SEO Optimization', desc: 'Improve your search rankings' },
      { name: 'Social Media Marketing', desc: 'Engage your audience effectively' },
      { name: 'PPC Advertising', desc: 'Targeted advertising campaigns' },
      { name: 'Content Marketing', desc: 'Strategic content creation' }
    ],
    color: 'from-orange-500 to-red-500'
  },
  {
    category: 'Cloud Solutions',
    icon: Cloud,
    services: [
      { name: 'Cloud Migration', desc: 'Seamless cloud transitions' },
      { name: 'DevOps Services', desc: 'Automated deployment pipelines' },
      { name: 'Infrastructure Management', desc: 'Scalable cloud infrastructure' },
      { name: 'Security Solutions', desc: 'Comprehensive security measures' }
    ],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    category: 'Data & Analytics',
    icon: Database,
    services: [
      { name: 'Data Analysis', desc: 'Transform data into insights' },
      { name: 'Business Intelligence', desc: 'Advanced reporting solutions' },
      { name: 'Machine Learning', desc: 'AI-powered solutions' },
      { name: 'Data Visualization', desc: 'Interactive dashboards' }
    ],
    color: 'from-yellow-500 to-orange-500'
  }
];

const links = [
  { name: 'Home', href: '/', ariaLabel: 'Navigate to homepage' },
  { name: 'About', href: '/about', ariaLabel: 'Learn about our company' },
  { name: 'Services', href: '/services', ariaLabel: 'View our services', hasDropdown: true },
  { name: 'Projects', href: '/projects', ariaLabel: 'Browse our portfolio' },
  { name: 'Contact', href: '/contact', ariaLabel: 'Get in touch with us' },
];

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const pathname = '/'; // Mock pathname
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setShowServices(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      {/* Enhanced Header with Glassmorphism */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5 py-3' 
            : 'bg-white/95 backdrop-blur-md py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Enhanced Logo - Bigger on Mobile */}
            <div className="relative z-10">
              <a href="/" className="block" aria-label="Return to homepage">
                <div className={`relative transition-all duration-500 ${
                  scrolled ? 'drop-shadow-lg' : 'drop-shadow-2xl'
                }`}>
                  <img
                    src="/logo.png"
                    alt="Company logo"
                    className={`transition-all duration-500 ${
                      scrolled 
                        ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36' 
                        : 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44'
                    }`}
                  />
                </div>
              </a>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {links.map((link, index) => {
                const isActive = pathname === link.href;
                const isServicesActive = link.name === 'Services' && showServices;
                
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="relative" ref={servicesRef}>
                      <button
                        onMouseEnter={() => setShowServices(true)}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-full text-base font-medium tracking-wide transition-all duration-300 ${
                          isActive || isServicesActive
                            ? 'text-[#1B365D] bg-[#00BFFF]/10'
                            : 'text-gray-700 hover:text-[#1B365D] hover:bg-gray-50'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${
                            showServices ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>

                      {/* Services Mega Menu */}
                      {showServices && (
                        <div 
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[900px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 animate-in slide-in-from-top-2 duration-200"
                          onMouseEnter={() => setShowServices(true)}
                          onMouseLeave={() => setShowServices(false)}
                        >
                          <div className="grid grid-cols-3 gap-8">
                            {/* Service Categories */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-gray-800 mb-4">Our Services</h3>
                              {servicesData.map((service, idx) => (
                                <button
                                  key={idx}
                                  onMouseEnter={() => setActiveService(idx)}
                                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 group ${
                                    activeService === idx 
                                      ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg' 
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <service.icon size={20} className={`${
                                      activeService === idx ? 'text-white' : 'text-gray-600'
                                    }`} />
                                    <span className="font-medium">{service.category}</span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {/* Active Service Details */}
                            <div className="col-span-2 pl-6 border-l border-gray-100">
                              <div className="mb-4">
                                <div className="flex items-center space-x-3 mb-2">
                                  {React.createElement(servicesData[activeService].icon, {
                                    size: 24,
                                    className: "text-[#00BFFF]"
                                  })}
                                  <h4 className="text-xl font-bold text-gray-800">
                                    {servicesData[activeService].category}
                                  </h4>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                {servicesData[activeService].services.map((service, idx) => (
                                  <div 
                                    key={idx}
                                    className="p-4 rounded-xl border border-gray-100 hover:border-[#00BFFF]/30 hover:bg-[#00BFFF]/5 transition-all duration-300 group cursor-pointer"
                                  >
                                    <h5 className="font-semibold text-gray-800 mb-1 group-hover:text-[#1B365D] transition-colors">
                                      {service.name}
                                    </h5>
                                    <p className="text-sm text-gray-600">{service.desc}</p>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <a 
                                  href="/services"
                                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white rounded-full font-semibold hover:from-[#1B365D] hover:to-[#00BFFF] transition-all duration-300 group"
                                >
                                  <span>View All Services</span>
                                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-base font-medium tracking-wide transition-all duration-300 group ${
                      isActive
                        ? 'text-[#2565AD] bg-[#2565AD]/10'
                        : 'text-gray-700 hover:text-[#0047AB] hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#00BFFF] transition-all duration-300 ${
                      isActive ? 'w-6' : 'w-0 group-hover:w-6'
                    }`} />
                  </a>
                );
              })}
            </nav>

            {/* Enhanced CTA Section */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Desktop CTA Button */}
              <div className="hidden md:block">
                <a
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 font-semibold text-white transition-all duration-300 ease-out transform hover:scale-105 focus:scale-105"
                >
                  {/* Main button background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] via-[#0099DD] to-[#1B365D] rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300" />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] via-cyan-400 to-[#1B365D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" 
                       style={{ padding: '2px' }}>
                    <div className="bg-gradient-to-r from-[#00BFFF] to-[#1B365D] rounded-full w-full h-full" />
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm font-bold tracking-wide">Get Free Quote</span>
                    <ArrowRight size={18} className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00BFFF] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#1B365D] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.3s' }} />
                </a>
              </div>

              {/* Enhanced Mobile Menu Button - Better Appearance */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transform transition-all duration-300 ease-out ${
                      isOpen ? 'rotate-45 translate-y-1.5 w-6' : 'group-hover:w-6'
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transition-all duration-300 ease-out ${
                      isOpen ? 'opacity-0 scale-0' : 'group-hover:w-6'
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] transform transition-all duration-300 ease-out ${
                      isOpen ? '-rotate-45 -translate-y-1.5 w-6' : 'group-hover:w-6'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
            <div className="relative h-full">
              {/* Enhanced Mobile Background */}
              <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-bl from-[#00BFFF]/20 via-[#1B365D]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-tr from-[#1B365D]/10 via-[#00BFFF]/5 to-transparent" />
              
              {/* Enhanced Header with Logo */}
              <div className="relative flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10">
                <div className="flex items-center space-x-4">
                  {/* Logo in Mobile Menu */}
                  <div className="flex-shrink-0">
                    <img
                      src="/logo.png"
                      alt="Company logo"
                      className="w-12 h-12 rounded-lg shadow-md"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold bg-gradient-to-r from-[#00BFFF] to-[#1B365D] bg-clip-text text-transparent">
                      Viorix Digital Solutions
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Your Digital Partner</div>
                  </div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-white/50 rounded-xl transition-colors duration-200 backdrop-blur-sm"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Enhanced Navigation Links */}
              <nav className="relative p-4 space-y-2">
                {links.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <div key={link.name} className="space-y-2">
                      <a
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between p-4 rounded-2xl font-medium transition-all duration-300 group ${
                          isActive
                            ? 'bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#00BFFF]/10 hover:to-[#1B365D]/10 hover:text-[#1B365D]'
                        }`}
                      >
                        <span className="text-lg">{link.name}</span>
                        <ArrowRight 
                          size={20} 
                          className={`transition-all duration-300 ${
                            isActive ? 'text-white' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                          }`} 
                        />
                      </a>
                      
                      {/* Enhanced Mobile Services Submenu */}
                      {link.name === 'Services' && (
                        <div className="bg-gradient-to-r from-[#00BFFF]/20 to-[#1B365D]/20 rounded-2xl p-4 space-y-2">
                          <div className="text-sm font-semibold text-gray-600 mb-3 px-2">Our Services</div>
                          {servicesData.map((service, idx) => (
                            <a
                              key={idx}
                              href={`/services/${service.category.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeMobileMenu}
                              className="flex items-center space-x-3 p-3 rounded-xl text-sm bg-white/70 hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#1B365D] hover:text-white transition-all duration-300 group shadow-sm"
                            >
                              <service.icon size={16} className="group-hover:text-white" />
                              <span className="font-medium">{service.category}</span>
                              <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                          <a
                            href="/services"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-center space-x-2 p-3 mt-2 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <span>View All Services</span>
                            <ArrowRight size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Enhanced Mobile CTA */}
              <div className="relative p-4 border-t border-gray-100 mt-auto bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold text-gray-700">Ready to get started?</div>
                    <div className="text-xs text-gray-500">Let's discuss your project</div>
                  </div>
                  <a
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center space-x-2 w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Spacer */}
      <div className={`${scrolled ? 'h-20' : 'h-24'} transition-all duration-500`} />
    </>
  );
}