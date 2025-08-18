"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Building2,
  Linkedin,
  Instagram,
  Twitter,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Headphones,
  Clock,
  Sparkle,
} from "lucide-react";

const initialFormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const teamValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We merge creativity with technology to deliver unique solutions for your business.",
  },
  {
    icon: HeartHandshake,
    title: "Collaboration",
    desc: "We partner closely with our clients for transparent, effective outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Reliability",
    desc: "Your project is safe with us: delivered on time, always.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our team is always available, ensuring seamless communication and assistance.",
  },
];

const socials = [
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/viorix-digital",
    color: "text-[#0077B5]",
  },
  {
    icon: Instagram,
    name: "Instagram",
    url: "https://instagram.com/viorixdigital",
    color: "text-[#E4405F]",
  },
  {
    icon: Twitter,
    name: "Twitter/X",
    url: "https://twitter.com/viorixdigital",
    color: "text-[#1DA1F2]",
  },
];

const faqs = [
  {
    q: "How soon will I get a response after submitting my message?",
    a: "We aim to reply to all messages within 24 hours during business days (Mon–Fri).",
  },
  {
    q: "Can I book a free consultation call?",
    a: <>Absolutely! Just mention it in your message or <a href="/contact" className="text-[#00BFFF] underline">book directly here</a>.</>,
  },
  {
    q: "Where is your team located?",
    a: "Our office is based in London, but we work with clients across the UK and internationally.",
  },
  {
    q: "What services do you provide?",
    a: <>We offer web development, mobile app development, e-commerce, SEO, digital marketing, and more. <a href="/services" className="text-[#00BFFF] underline">See full list.</a></>,
  },
];

const ContactUs = () => {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
      setForm(initialFormState);
      setTimeout(() => setStatus("idle"), 3500);
    }, 1500);
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#eaf6fb] via-white to-[#e1eaff]"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Animated Decorative Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute top-10 left-10 w-56 h-56 bg-gradient-to-tr from-[#00BFFF] to-[#1B365D] rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-32 w-40 h-40 bg-gradient-to-bl from-[#1B365D] to-[#00BFFF] rounded-full blur-2xl opacity-10"
          animate={{ scale: [1, 1.15, 1], y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-2/3 w-16 h-16 bg-gradient-to-br from-[#0099CC] to-[#1B365D] rounded-full blur-xl opacity-20"
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Sparkle foreground */}
        <Sparkle className="absolute bottom-24 left-1/2 w-8 h-8 text-[#00BFFF]/40 blur-sm opacity-80 animate-spin-slow" />
      </div>

      {/* Page Title & Introduction */}
      <header className="text-center mb-10">
        <motion.h1
          id="contact-heading"
          className="text-4xl sm:text-5xl font-black text-[#1B365D] mb-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Send className="w-9 h-9 text-[#00BFFF]" />
          Contact Us
        </motion.h1>
        <motion.p
          className="max-w-lg mx-auto text-xl text-gray-700 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Start your next digital project, boost your business, or simply say hello.<br />Our team is ready to help – and we reply fast!
        </motion.p>
      </header>

      {/* Contact Info + Socials + Quick Links */}
      <section className="mb-10 flex flex-col-reverse lg:flex-row gap-8 items-stretch justify-between w-full max-w-5xl mx-auto">
        {/* Info Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-[#eaf6fb] border border-blue-100 shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Mail className="w-7 h-7 text-[#00BFFF] mb-1" />
            <span className="font-semibold text-[#1B365D]">Email</span>
            <a
              href="mailto:hello@viorix.co.uk"
              className="text-sm text-blue-700 hover:underline"
            >
              hello@viorix.co.uk
            </a>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-[#eaf6fb] border border-blue-100 shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Phone className="w-7 h-7 text-[#00BFFF] mb-1" />
            <span className="font-semibold text-[#1B365D]">Phone</span>
            <a href="tel:+441234567890" className="text-sm text-blue-700 hover:underline">
              +44 1234 567890
            </a>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-[#eaf6fb] border border-blue-100 shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MapPin className="w-7 h-7 text-[#00BFFF] mb-1" />
            <span className="font-semibold text-[#1B365D]">Office</span>
            <span className="text-sm text-gray-700 text-center">London, UK<br />Mon-Fri 09:00–18:00</span>
          </motion.div>
        </div>
        {/* Social Media + Quick Links */}
        <aside className="flex flex-col gap-8 items-center justify-center mb-4 lg:mb-0">
          <div>
            <span className="text-base font-semibold text-[#1B365D] mb-2 block text-center">Connect With Us</span>
            <div className="flex gap-4 justify-center">
              {socials.map(({ icon: Icon, name, url, color }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-white border border-blue-100 shadow hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${color}`}
                  aria-label={name}
                >
                  <Icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <span className="text-base font-semibold text-[#1B365D] mb-2 block text-center">Quick Links</span>
            <div className="flex flex-col gap-2 items-center">
              <a href="/services" className="text-[#00BFFF] font-medium hover:underline">Our Services</a>
              <a href="/about" className="text-[#00BFFF] font-medium hover:underline">About Us</a>
              <a href="/faq" className="text-[#00BFFF] font-medium hover:underline">FAQ</a>
            </div>
          </div>
        </aside>
      </section>

      {/* Contact Form & Slogan */}
      <section className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-10 border border-blue-100 backdrop-blur-md z-10 mb-16 relative overflow-hidden">
        {/* Floating icons */}
        <Sparkle className="absolute top-5 right-6 w-6 h-6 text-[#00BFFF]/40 animate-spin-slow" />
        <div className="absolute left-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-[#00BFFF]/20 to-[#1B365D]/15 rounded-full blur-2xl opacity-30"></div>
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#1B365D] mb-2">
                <User className="inline-block w-4 h-4 mr-1 text-[#00BFFF]" />
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                placeholder="Your Name"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1B365D] mb-2">
                <Mail className="inline-block w-4 h-4 mr-1 text-[#00BFFF]" />
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[#1B365D] mb-2">
              <Building2 className="inline-block w-4 h-4 mr-1 text-[#00BFFF]" />
              Company (optional)
            </label>
            <input
              type="text"
              name="company"
              id="company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
              placeholder="Your Company"
              autoComplete="organization"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1B365D] mb-2">
              <MessageSquare className="inline-block w-4 h-4 mr-1 text-[#00BFFF]" />
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-blue-100 bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <motion.button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 focus:ring-4 focus:ring-blue-300/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-5 h-5" />
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-2 text-[#00BFFF] font-medium"
            >
              Thank you for contacting us! We’ll get back to you soon.
            </motion.div>
          )}
          {status === "error" && (
            <div className="text-center mt-2 text-red-500 font-medium">
              Something went wrong. Please try again.
            </div>
          )}
        </form>
        <div className="mt-8 text-center">
          <span className="inline-block bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 text-[#1B365D] font-medium px-5 py-2 rounded-full shadow">
            Let’s build your next success story together!
          </span>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="w-full max-w-5xl mx-auto mb-16">
        <header className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B365D] flex items-center justify-center gap-2">
            <Sparkle className="w-6 h-6 text-[#00BFFF]" aria-hidden="true" />
            Our Promise To You
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamValues.map((value, idx) => (
            <motion.div
              key={value.title}
              className="flex flex-col items-center gap-3 bg-white/80 px-6 py-8 rounded-2xl border border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#00BFFF]/20 to-[#1B365D]/20 rounded-xl mb-2">
                <value.icon className="w-7 h-7 text-[#00BFFF]" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#1B365D] mb-1">{value.title}</h3>
              <p className="text-sm text-gray-700 text-center">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl mx-auto mb-20">
        <header className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1B365D] flex items-center justify-center gap-2">
            <Clock className="w-6 h-6 text-[#00BFFF]" aria-hidden="true" />
            Frequently Asked Questions
          </h2>
        </header>
        <div className="space-y-5">
          {faqs.map((faq, idx) => (
            <details
              key={faq.q}
              className="bg-white/80 border border-blue-100 rounded-xl shadow px-5 py-4 group"
              open={idx === 0}
            >
              <summary className="cursor-pointer text-[#1B365D] font-semibold group-open:text-[#00BFFF] transition">
                {faq.q}
              </summary>
              <div className="pl-2 pt-2 text-gray-700 text-sm">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Final Call-To-Action */}
      <section className="w-full max-w-4xl mx-auto mb-10">
        <motion.div
          className="flex flex-col items-center justify-center bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 rounded-2xl border border-blue-100 shadow-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkle className="w-7 h-7 text-[#00BFFF]" aria-hidden="true" />
            <span className="text-lg font-bold text-[#1B365D]">Ready to get started?</span>
          </div>
          <p className="text-base text-gray-700 mb-6 text-center">
            Our team is excited to hear about your project, challenge, or idea.<br />
            Reach out now to begin your journey with Viorix Digital Solutions.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 focus:ring-4 focus:ring-blue-300/50"
            aria-label="Start Your Project"
          >
            Start Your Project
          </a>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactUs;