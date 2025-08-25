import { ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Code, Smartphone,  Rocket } from "lucide-react";
import Link from "next/link";

export default function WonderfulFooter() {
  return (
    <footer className="bg-gradient-to-br from-[#001732] via-[#003366] to-[#0077AA] mt-20 text-[#F5F5F5] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0077AA]/10 via-[#003366]/20 to-[#001732]/30"></div>
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-[#1AD1FF]/10 to-[#003366]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-tl from-[#001732]/20 via-[#003366]/10 to-[#0077AA]/15 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-[#1AD1FF]/10 to-[#001732]/10 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-10 right-1/4 w-24 h-24 bg-[#003366]/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter */}
        <div className="border-b border-[#F5F5F5]/20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight drop-shadow-md">
                Stay Updated with {" "}
                <span className="bg-gradient-to-r from-[#1AD1FF] via-[#00BFFF] to-[#0077FF] bg-clip-text text-transparent">
                  Digital Innovation
                </span>
              </h3>
              <p className="text-[#1AD1FF] text-lg sm:text-xl mb-12 leading-relaxed drop-shadow-md">
                Subscribe to our newsletter for the latest insights on web development, mobile apps, 
                e-commerce solutions, and digital marketing strategies that drive business growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="flex-1 relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1AD1FF] group-focus-within:text-[#00BFFF] transition-colors duration-300" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-[#001732]/30 backdrop-blur-md border border-[#00BFFF]/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1AD1FF]/60 focus:border-[#00BFFF] focus:bg-[#003366]/40 text-[#F5F5F5] placeholder-[#1AD1FF] transition-all duration-300 hover:border-[#00BFFF]/70"
                  />
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-[#1AD1FF] via-[#00BFFF] to-[#0077FF] rounded-2xl hover:shadow-2xl hover:shadow-[#1AD1FF]/40 transition-all duration-500 font-bold flex items-center justify-center gap-2 hover:scale-105 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <span className="relative text-[#001732]">Subscribe</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative text-[#001732]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Company Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#1AD1FF] via-[#00BFFF] to-[#0077FF] bg-clip-text text-transparent mb-6 drop-shadow-md">
                    Viorix Digital Solutions
                  </h3>
                  <p className="text-[#1AD1FF] leading-relaxed text-base drop-shadow-md">
                    Leading digital agency specializing in responsive web development, 
                    mobile app development, e-commerce solutions, and result-driven 
                    digital marketing strategies.
                  </p>
                </div>
                
                {/* Contact */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-[#1AD1FF] hover:text-white transition-colors duration-300 group">
                    <div className="p-2 bg-[#003366]/30 rounded-xl group-hover:bg-[#00BFFF]/30 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-[#1AD1FF]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Our Office</div>
                      124 City Road, London, United Kingdom, EC1V 2NX
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[#1AD1FF] hover:text-white transition-colors duration-300 group">
                    <div className="p-2 bg-[#003366]/30 rounded-xl group-hover:bg-[#00BFFF]/30 transition-all duration-300">
                      <Phone className="w-5 h-5 text-[#1AD1FF]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">+44 7464 485 026</div>
                      <div className="text-sm text-[#1AD1FF] drop-shadow-md">24/7 Support Available</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[#1AD1FF] hover:text-white transition-colors duration-300 group">
                    <div className="p-2 bg-[#003366]/30 rounded-xl group-hover:bg-[#00BFFF]/30 transition-all duration-300">
                      <Mail className="w-5 h-5 text-[#1AD1FF]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">info@viorix.co.uk</div>
                      <div className="text-sm text-[#1AD1FF] drop-shadow-md">Get Free Consultation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-xl font-black text-white mb-8 tracking-tight drop-shadow-sm">Our Services</h4>
                <ul className="space-y-4">
                  {[
                    { name: "Web Development", icon: Code, href: "/services/web-development" },
                    { name: "Mobile App Development", icon: Smartphone, href: "/services/mobile-development" },
                    { name: "Digital Marketing", icon: Rocket, href: "/services/digital-marketing" },
                    { name: "UI/UX Design", icon: null, href: "/services/ui-ux-design" },
                  ].map((service) => (
                    <li key={service.name}>
                      <Link href={service.href} className="text-[#1AD1FF] hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-3 group p-2 rounded-xl hover:bg-white/10">
                        <ArrowRight className="w-4 h-4 text-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="font-medium">{service.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-xl font-black text-white mb-8 tracking-tight drop-shadow-sm">Company</h4>
                <ul className="space-y-4">
                  {[
                    { name: "About Us", href: "/about" },
                    
                    { name: "Blog", href: "/blogs" },
                    { name: "Careers", href: "#" },
                    { name: "Contact", href: "/contact" },
                    { name: "Privacy Policy", href: "/privacy" },
                    { name: "Terms & Conditions", href: "/terms" },
                    { name: "Cookies Policy", href: "/cookies" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-[#1AD1FF] hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-3 group p-2 rounded-xl hover:bg-white/10">
                        <ArrowRight className="w-4 h-4 text-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F5F5F5]/20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              <div className="flex flex-col sm:flex-row items-center gap-2 text-[#1AD1FF] text-center sm:text-left drop-shadow-md">
                <div className="flex items-center justify-center gap-2">
                  <span>© 2025 Viorix Digital Solutions.</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span>All rights reserved.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: "Facebook", href: "#" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                  { icon: Instagram, label: "Instagram", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`Follow us on ${label}`}
                    className="w-12 h-12 bg-[#001732]/30 hover:bg-gradient-to-r hover:from-[#1AD1FF] hover:to-[#00BFFF] backdrop-blur-sm border border-[#1AD1FF]/50 hover:border-transparent rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 group"
                  >
                    <Icon className="w-5 h-5 text-[#1AD1FF] group-hover:text-white transition-colors duration-300" />
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
