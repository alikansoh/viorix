import { ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Code, Smartphone, Globe, Rocket } from "lucide-react";

export default function WonderfulFooter() {
  return (
    <footer className="bg-gradient-to-br from-[#2C5282] via-[#2D3748] to-[#1A202C] text-white relative overflow-hidden">
      {/* Enhanced Background with logo-matching colors */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Background gradient matching logo colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#63B3ED]/10 via-[#3182CE]/15 to-[#2C5282]/20"></div>
        
        {/* Animated geometric shapes with logo colors */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#63B3ED]/8 to-[#3182CE]/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-tl from-[#2C5282]/12 via-[#3182CE]/8 to-[#63B3ED]/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-[#63B3ED]/8 to-[#2C5282]/8 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-10 right-1/4 w-24 h-24 bg-[#3182CE]/6 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern with logo colors */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2363B3ED' fill-opacity='0.6'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        ></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section with logo-inspired gradient */}
        <div className="border-b border-white/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                Stay Updated with{" "}
                <span className="bg-gradient-to-r from-[#63B3ED] via-[#4299E1] to-[#3182CE] bg-clip-text text-transparent">
                  Digital Innovation
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-gray-200 mb-12 leading-relaxed drop-shadow-sm">
                Subscribe to our newsletter for the latest insights on web development, mobile apps, 
                e-commerce solutions, and digital marketing strategies that drive business growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="flex-1 relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#63B3ED] w-5 h-5 group-focus-within:text-[#4299E1] transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/15 backdrop-blur-md border border-[#63B3ED]/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#63B3ED] focus:border-[#4299E1] focus:bg-white/25 text-white placeholder-gray-200 transition-all duration-300 hover:border-[#63B3ED]/60"
                  />
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-[#63B3ED] via-[#4299E1] to-[#3182CE] rounded-2xl hover:shadow-2xl hover:shadow-[#63B3ED]/30 transition-all duration-500 font-bold flex items-center justify-center gap-2 hover:scale-105 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <span className="relative text-white">Subscribe</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Company Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#63B3ED] via-[#4299E1] to-[#3182CE] bg-clip-text text-transparent mb-6 drop-shadow-lg">
                    Viorix Digital Solutions
                  </h3>
                  <p className="text-gray-100 leading-relaxed text-base drop-shadow-sm">
                    Leading digital agency specializing in responsive web development, 
                    mobile app development, e-commerce solutions, and result-driven 
                    digital marketing strategies.
                  </p>
                </div>
                
                {/* Contact Info with logo-inspired styling */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-gray-100 hover:text-white transition-colors duration-300 group">
                    <div className="p-2 bg-gradient-to-r from-[#63B3ED]/20 to-[#3182CE]/15 rounded-xl group-hover:from-[#63B3ED]/30 group-hover:to-[#3182CE]/25 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-[#63B3ED]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Our Office</div>
                      <div className="text-sm text-gray-300">123 Innovation Street, Tech City, TC 12345</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-gray-100 hover:text-white transition-colors duration-300 group">
                    <div className="p-2 bg-gradient-to-r from-[#63B3ED]/20 to-[#3182CE]/15 rounded-xl group-hover:from-[#63B3ED]/30 group-hover:to-[#3182CE]/25 transition-all duration-300">
                      <Phone className="w-5 h-5 text-[#63B3ED]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">+1 (555) 123-4567</div>
                      <div className="text-sm text-gray-300">24/7 Support Available</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-gray-100 hover:text-white transition-colors duration-300 group">
                    <div className="p-2 bg-gradient-to-r from-[#63B3ED]/20 to-[#3182CE]/15 rounded-xl group-hover:from-[#63B3ED]/30 group-hover:to-[#3182CE]/25 transition-all duration-300">
                      <Mail className="w-5 h-5 text-[#63B3ED]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">hello@viorixdigital.com</div>
                      <div className="text-sm text-gray-300">Get Free Consultation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-xl font-black text-white mb-8 tracking-tight drop-shadow-sm">Our Services</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Web Development', icon: Code },
                    { name: 'Mobile App Development', icon: Smartphone },
                    { name: 'E-commerce Solutions', icon: Globe },
                    { name: 'Digital Marketing', icon: Rocket },
                    { name: 'SEO Optimization', icon: null },
                    { name: 'UI/UX Design', icon: null }
                  ].map((service) => (
                    <li key={service.name}>
                      <a href="#" className="text-gray-100 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-3 group p-2 rounded-xl hover:bg-white/10">
                        <ArrowRight className="w-4 h-4 text-[#63B3ED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="font-medium">{service.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-xl font-black text-white mb-8 tracking-tight drop-shadow-sm">Company</h4>
                <ul className="space-y-4">
                  {['About Us', 'Our Process', 'Case Studies', 'Blog', 'Careers', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-100 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-3 group p-2 rounded-xl hover:bg-white/10">
                        <ArrowRight className="w-4 h-4 text-[#63B3ED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="font-medium">{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar with logo branding */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Copyright with logo branding */}
              <div className="flex flex-col sm:flex-row items-center gap-2 text-gray-200 text-center sm:text-left">
                <div className="flex items-center justify-center gap-2">
                  <span>© 2025 Viorix Digital Solutions.</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span>All rights reserved.</span>
              </div>

              {/* Social Links with logo color scheme */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: 'Facebook', href: '#' },
                  { icon: Twitter, label: 'Twitter', href: '#' },
                  { icon: Linkedin, label: 'LinkedIn', href: '#' },
                  { icon: Instagram, label: 'Instagram', href: '#' }
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`Follow us on ${label}`}
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-r hover:from-[#63B3ED] hover:to-[#3182CE] backdrop-blur-sm border border-white/20 hover:border-transparent rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 group"
                  >
                    <Icon className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}