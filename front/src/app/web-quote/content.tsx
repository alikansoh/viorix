"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { ArrowRight, Check } from "lucide-react";
import { projects } from "../projects/portfolioData";

const RECENT_PROJECTS = projects.filter((p) => p.featured).slice(0, 6);

const SECTORS = [
  "Agencies",
  "SaaS and Tech",
  "B2B Transformation",
  "Healthcare",
  "Media & Entertainment",
  "Retail",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  message: string;
};

const INTERESTS = [
  "A new website",
  "Mobile app",
  "UI/UX design",
  "E-commerce",
  "Digital marketing",
  "On-going support",
];

const BUDGET_OPTIONS = [
  "£500 – £1,000",
  "£1,000 – £2,500",
  "£2,500 – £5,000",
  "£5,000 – £10,000",
  "£10,000+",
];

const STEPS = [
  {
    number: "01",
    title: "You tell us about it",
    text: "Fill in the form with as much detail as you have. We'll fill in the gaps together.",
  },
  {
    number: "02",
    title: "We scope it properly",
    text: "Within one business day you'll hear back from a person on the team, with next steps.",
  },
  {
    number: "03",
    title: "We get building",
    text: "Once scope and budget line up, your project moves into discovery and design.",
  },
];

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  budget: "",
  message: "",
};

export default function QuoteContent() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setTouched({ name: true, email: true });
      setError("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      budget: formData.budget || "Not specified",
      message: formData.message || "No additional details",
      selectedService: formData.interest || "Not specified",
      submittedAt: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        "service_c73djix",
        "template_rl3gq4l",
        templateParams,
        "_-PS7ydJYxLOybs71",
      );
      setSubmitSuccess(true);
      setFormData(EMPTY_FORM);
      setTouched({});
    } catch {
      setError("We couldn't send your request. Please call us directly at +44 7464 485 026.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nameInvalid = touched.name && !formData.name.trim();
  const emailInvalid = touched.email && !formData.email.trim();

  return (
    <main className="min-h-screen bg-white">
      <div className="lg:grid lg:grid-cols-[minmax(0,480px)_1fr]">
        {/* ───────── Left column — the signature panel ───────── */}
        <div className="relative overflow-hidden bg-[#081226] px-6 sm:px-10 lg:px-14 py-16 lg:py-24 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full opacity-40 blur-[110px]"
            style={{
              background: "radial-gradient(circle, #00BFFF 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: "radial-gradient(circle, #4F8FFF 0%, transparent 70%)",
            }}
          />

          {/* corner brackets — viewfinder signature */}
          <svg
            className="pointer-events-none absolute top-8 left-8 w-8 h-8 text-[#00BFFF]/60"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M1 12V1H12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg
            className="pointer-events-none absolute bottom-8 right-8 w-8 h-8 text-[#00BFFF]/60 hidden lg:block"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M31 20v11H20" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <div className="relative">
            <h1 className="font-serif text-4xl sm:text-[3rem] text-white leading-[1.1] mb-6 tracking-tight mt-2">
              Let&apos;s get your project{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#00BFFF]">started.</span>
                <span
                  className="absolute inset-0 blur-xl opacity-60 -z-0"
                  style={{ background: "#00BFFF" }}
                  aria-hidden
                />
              </span>
            </h1>

            <p className="text-[15px] text-slate-300 leading-relaxed mb-8 max-w-sm">
              Tell us what you&apos;re building. A person on the team will
              reply within one business day.
            </p>

            {/* Mobile-only jump to form */}
            <a
              href="#quote-form"
              className="lg:hidden mb-14 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#1B365D] px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-md active:scale-[0.98] transition-transform"
            >
              Fill in the form
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-1 gap-3 mb-14">
              <a
                href="mailto:hello@viorix.co.uk"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 hover:border-[#00BFFF]/40 hover:bg-white/[0.06] transition-all"
              >
                <span className="text-xs text-slate-400 uppercase tracking-wider">Email</span>
                <span className="text-sm font-medium text-white group-hover:text-[#00BFFF] transition-colors">
                  hello@viorix.co.uk
                </span>
              </a>
              <a
                href="tel:+447464485026"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 hover:border-[#00BFFF]/40 hover:bg-white/[0.06] transition-all"
              >
                <span className="text-xs text-slate-400 uppercase tracking-wider">Phone</span>
                <span className="text-sm font-medium text-white group-hover:text-[#00BFFF] transition-colors">
                  +44 (0)7464 485 026
                </span>
              </a>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Address</span>
                <span className="text-sm font-medium text-white">124 City Road, London</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-16">
              Have a quick question first?{" "}
              <Link
                href="/contact"
                className="text-white font-medium underline underline-offset-2 decoration-slate-600 hover:decoration-[#00BFFF] hover:text-[#00BFFF] transition-colors"
              >
                Get in touch here
              </Link>
            </p>

            <p className="text-xs font-semibold tracking-[0.24em] text-[#00BFFF] uppercase mb-7">
              What happens next
            </p>
            <ol className="relative space-y-9">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#00BFFF]/60 via-white/15 to-transparent" />
              {STEPS.map((step) => (
                <li key={step.number} className="relative pl-11">
                  <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#00BFFF]/40 bg-[#081226] text-[11px] font-semibold text-[#00BFFF] tabular-nums shadow-[0_0_16px_rgba(0,191,255,0.25)]">
                    {step.number}
                  </span>
                  <p className="font-semibold text-white text-sm mb-1">{step.title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ───────── Right column — the form ───────── */}
        <div id="quote-form" className="scroll-mt-6 px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <div className="w-full max-w-xl">
            {submitSuccess ? (
              <div className="relative overflow-hidden border border-gray-200 rounded-2xl p-10 sm:p-12">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00BFFF] to-[#1B365D]" />
                <div className="w-11 h-11 rounded-full bg-[#1B365D] flex items-center justify-center mb-6 animate-[scaleIn_0.3s_ease-out]">
                  <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-semibold text-[#1B365D] mb-2 font-serif">
                  Thanks — request sent.
                </h2>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                  We&apos;ve received your project details and will be in touch within one business day.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="text-sm font-medium text-[#1B365D] underline underline-offset-2 decoration-gray-300 hover:decoration-[#1B365D] transition-colors"
                >
                  Submit another request
                </button>
                <style jsx>{`
                  @keyframes scaleIn {
                    from { transform: scale(0.6); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                  }
                `}</style>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-11" noValidate>
                <div className="flex items-baseline justify-between pb-4 border-b border-gray-100">
                  <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                    Project details
                  </p>
                  <p className="text-xs text-gray-400">
                    <span className="text-[#00BFFF]">*</span> required
                  </p>
                </div>

                {/* Name / Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                  <div className="group relative">
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold tracking-[0.08em] uppercase text-gray-400 group-focus-within:text-[#00BFFF] transition-colors mb-2"
                    >
                      Name <span className="text-[#00BFFF]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={nameInvalid}
                      className={`peer w-full border-0 border-b-2 outline-none py-2.5 text-[15px] text-[#1B365D] bg-transparent transition-colors placeholder:text-gray-300 ${
                        nameInvalid
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#00BFFF]"
                      }`}
                      placeholder="Jane Cooper"
                    />
                    {nameInvalid && (
                      <p className="mt-1.5 text-xs text-red-600">Let us know who&apos;s asking.</p>
                    )}
                  </div>

                  <div className="group relative">
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold tracking-[0.08em] uppercase text-gray-400 group-focus-within:text-[#00BFFF] transition-colors mb-2"
                    >
                      Email <span className="text-[#00BFFF]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={emailInvalid}
                      className={`peer w-full border-0 border-b-2 outline-none py-2.5 text-[15px] text-[#1B365D] bg-transparent transition-colors placeholder:text-gray-300 ${
                        emailInvalid
                          ? "border-red-400"
                          : "border-gray-200 focus:border-[#00BFFF]"
                      }`}
                      placeholder="you@company.com"
                    />
                    {emailInvalid && (
                      <p className="mt-1.5 text-xs text-red-600">We&apos;ll need this to reply.</p>
                    )}
                  </div>
                </div>

                <div className="group sm:w-1/2 sm:pr-3">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold tracking-[0.08em] uppercase text-gray-400 group-focus-within:text-[#00BFFF] transition-colors mb-2"
                  >
                    Phone <span className="text-gray-300 normal-case font-normal tracking-normal">— optional</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-200 focus:border-[#00BFFF] outline-none py-2.5 text-[15px] text-[#1B365D] bg-transparent transition-colors placeholder:text-gray-300"
                    placeholder="07000 000000"
                  />
                </div>

                {/* Interested in — chip selector */}
                <fieldset>
                  <legend className="block text-xs font-semibold tracking-[0.08em] text-gray-400 uppercase mb-3">
                    I am interested in
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((opt) => {
                      const active = formData.interest === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              interest: prev.interest === opt ? "" : opt,
                            }))
                          }
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition-all ${
                            active
                              ? "bg-[#1B365D] border-[#1B365D] text-white shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#00BFFF] hover:text-[#1B365D]"
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Budget — chip selector */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.08em] text-gray-400 uppercase mb-1">
                    Budget
                  </label>
                  <p className="text-xs text-gray-400 mb-3">
                    Not sure yet? Pick your closest estimate — we&apos;ll confirm scope together.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((opt) => {
                      const active = formData.budget === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              budget: prev.budget === opt ? "" : opt,
                            }))
                          }
                          aria-pressed={active}
                          className={`rounded-full px-4 py-2 text-sm font-medium border tabular-nums transition-all ${
                            active
                              ? "bg-[#00BFFF]/10 border-[#00BFFF] text-[#1B365D] shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#00BFFF] hover:text-[#1B365D]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold tracking-[0.08em] uppercase text-gray-400 group-focus-within:text-[#00BFFF] transition-colors mb-2"
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-[#00BFFF] outline-none rounded-xl p-4 text-[15px] text-[#1B365D] transition-colors resize-none placeholder:text-gray-300 focus:ring-4 focus:ring-[#00BFFF]/10"
                    placeholder="What are you trying to build? Timelines, goals, anything useful."
                  />
                </div>

                {error && (
                  <p className="flex items-center gap-2 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white text-sm font-semibold tracking-wide px-8 py-3.5 rounded-full shadow-md hover:shadow-xl hover:shadow-[#00BFFF]/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:shadow-md disabled:active:scale-100"
                >
                  {isSubmitting ? "Sending…" : "Submit"}
                  {!isSubmitting && (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ───────── Recent projects ───────── */}
      <section className="border-t border-gray-100 px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-[#00BFFF] uppercase mb-3">
                Recent projects
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1B365D] tracking-tight">
                A few things we&apos;ve shipped lately
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#1B365D] underline underline-offset-2 decoration-gray-300 hover:decoration-[#1B365D] transition-colors whitespace-nowrap"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_PROJECTS.map((project) => (
              <a
                key={project.id}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 hover:border-[#00BFFF]/40 hover:shadow-xl hover:shadow-[#00BFFF]/10 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {project.category} · {project.year}
                  </p>
                  <p className="font-semibold text-[#1B365D] text-[15px] mb-1 group-hover:text-[#00BFFF] transition-colors">
                    {project.title}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <Link
            href="/projects"
            className="mt-8 inline-flex sm:hidden items-center gap-1.5 text-sm font-medium text-[#1B365D] underline underline-offset-2 decoration-gray-300"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ───────── Our sectors — moving banner ───────── */}
      <section className="border-t border-gray-100 bg-[#081226] py-16 lg:py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <p className="text-xs font-semibold tracking-[0.24em] text-[#00BFFF] uppercase mb-3">
            Our sectors
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
            Where we do our best work
          </h2>
        </div>

        <div className="marquee relative mt-10 flex select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {[0, 1].map((track) => (
            <div
              key={track}
              className="marquee__track flex shrink-0 items-center gap-6 pr-6"
              aria-hidden={track === 1}
            >
              {SECTORS.map((sector) => (
                <span
                  key={`${track}-${sector}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-base font-medium text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00BFFF]" />
                  {sector}
                </span>
              ))}
            </div>
          ))}
        </div>

        <style jsx>{`
          .marquee__track {
            animation: marquee-scroll 32s linear infinite;
          }
          .marquee:hover .marquee__track {
            animation-play-state: paused;
          }
          @keyframes marquee-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee__track {
              animation: none;
            }
          }
        `}</style>
      </section>
    </main>
  );
}