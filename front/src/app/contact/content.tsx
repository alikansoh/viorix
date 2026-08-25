"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
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
  Facebook,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Headphones,
  Clock,
  Sparkle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

// Initialize EmailJS with your public key
emailjs.init("_-PS7ydJYxLOybs71"); // Replace with your actual public key

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
    url: "https://www.linkedin.com/company/viorix-digital-solutions",
    color: "text-[#0077B5]",
  },
  {
    icon: Instagram,
    name: "Instagram",
    url: "https://instagram.com/viorix_digital_solutions",
    color: "text-[#E4405F]",
  },
  {
    icon: Facebook,
    name: "Facebook",
    url: "https://www.facebook.com/share/1Vy4drkEKs/?mibextid=wwXIfr",
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
    a: (
      <>
        Absolutely! Just mention it in your message or{" "}
        <a href="/contact" className="text-[#00BFFF] underline">
          book directly here
        </a>
        .
      </>
    ),
  },
  {
    q: "Where is your team located?",
    a: "Our office is based in London, but we work with clients across the UK and internationally.",
  },
  {
    q: "What services do you provide?",
    a: (
      <>
        We offer web development, mobile app development, e-commerce, SEO,
        digital marketing, and more.{" "}
        <a href="/services" className="text-[#00BFFF] underline">
          See full list.
        </a>
      </>
    ),
  },
];

const ContactUs = () => {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    // EmailJS configuration
    const serviceID = "service_c73djix"; // Replace with your EmailJS service ID
    const templateID = "template_m9r6dcl"; // Replace with your EmailJS template ID

    // Template parameters that will be sent to your email template
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      company: form.company || "Not specified",
      message: form.message,
      to_name: "Viorix Digital Solutions",
    };

    try {
      const result = await emailjs.send(serviceID, templateID, templateParams);
      
      if (result.status === 200) {
        setStatus("sent");
        setForm(initialFormState);
        // Auto-hide success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Failed to send message. Please try again or contact us directly."
      );
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#eaf6fb] via-white to-[#e1eaff]"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
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
          Start your next digital project, boost your business, or simply say
          hello.
          <br />
          Our team is ready to help – and we reply fast!
        </motion.p>
      </header>

      {/* Contact Info + Socials + Quick Links */}
      <section className="mb-10 flex flex-col-reverse lg:flex-row gap-8 items-stretch justify-between w-full max-w-5xl mx-auto">
        {/* Contact Info – Glassmorphism Style */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Email */}
          <motion.a
            href="mailto:info@viorix.co.uk"
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#1B365D] shadow-md mb-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#1B365D] text-lg">Email</h3>
            <p className="text-sm text-gray-700">info@viorix.co.uk</p>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+447464485026"
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#1B365D] shadow-md mb-3">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#1B365D] text-lg">Phone</h3>
            <p className="text-sm text-gray-700">+44 7464 485026</p>
          </motion.a>

          {/* Office */}
          <motion.div
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 backdrop-blur-lg border border-white/60 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#1B365D] shadow-md mb-3">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#1B365D] text-lg">Office</h3>
            <p className="text-sm text-gray-700">
            124 City Road, London, United Kingdom, EC1V 2NX
            <br />
              Mon–Fri 09:00–18:00
            </p>
          </motion.div>
        </div>

        {/* Social Media + Quick Links */}
        <aside className="flex flex-col gap-8 items-center justify-center mb-4 lg:mb-0">
          <div>
            <span className="text-base font-semibold text-[#1B365D] mb-2 block text-center">
              Connect With Us
            </span>
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
            <span className="text-base font-semibold text-[#1B365D] mb-2 block text-center">
              Quick Links
            </span>
            <div className="flex flex-col gap-2 items-center">
              <Link
                href="/services/web-development"
                className="text-[#00BFFF] font-medium hover:underline"
              >
                <p>web development</p>
              </Link>
              <Link
                href="/services/ui-ux-design"
                className="text-[#00BFFF] font-medium hover:underline"
              >
                <p>ui-ux design</p>
              </Link>
              <Link
                href="/services/mobile-development"
                className="text-[#00BFFF] font-medium hover:underline"
              >
                <p>mobile development</p>
              </Link>
            </div>
          </div>
        </aside>
      </section>

      {/* Contact Form & Slogan */}
      <section className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-blue-100 z-10 mb-16 relative">
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#1B365D] mb-2"
              >
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
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1B365D] mb-2"
              >
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
                disabled={status === "sending"}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-[#1B365D] mb-2"
            >
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
              disabled={status === "sending"}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#1B365D] mb-2"
            >
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
              disabled={status === "sending"}
            ></textarea>
          </div>
          
          <motion.button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 focus:ring-4 focus:ring-blue-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            whileHover={status !== "sending" ? { scale: 1.05 } : {}}
            whileTap={status !== "sending" ? { scale: 0.98 } : {}}
          >
            <Send className={`w-5 h-5 ${status === "sending" ? "animate-pulse" : ""}`} />
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>

          {/* Success Message */}
          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div className="text-center">
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              <XCircle className="w-5 h-5 text-red-500" />
              <div className="text-center">
                <p className="font-medium">Failed to send message</p>
                <p className="text-sm">{errorMessage || "Please try again or contact us directly at info@viorix.co.uk"}</p>
              </div>
            </motion.div>
          )}
        </form>

        <div className="mt-8 text-center">
          <span className="inline-block bg-gradient-to-r from-[#00BFFF]/10 to-[#1B365D]/10 text-[#1B365D] font-medium px-5 py-2 rounded-full shadow">
            Let&apos;s build your next success story together!
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
                <value.icon
                  className="w-7 h-7 text-[#00BFFF]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-[#1B365D] mb-1">
                {value.title}
              </h3>
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
            <span className="text-lg font-bold text-[#1B365D]">
              Ready to get started?
            </span>
          </div>
          <p className="text-base text-gray-700 mb-6 text-center">
            Our team is excited to hear about your project, challenge, or idea.
            <br />
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