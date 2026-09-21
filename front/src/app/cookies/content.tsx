"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CookiesPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f8ff] to-white mt-10 px-6 sm:px-12 md:px-24 py-12">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#00BFFF]/30">
        <h1 className="text-4xl font-bold text-[#1B365D] mb-6">Cookies Policy</h1>

        <p className="text-gray-700 mb-4">
          <strong>Viorix Digital Solutions Ltd</strong> uses cookies to enhance your browsing experience and provide personalized content. This policy explains how we use cookies and your choices regarding them.
        </p>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">1. What Are Cookies?</h2>
          <p className="text-gray-700">
            Cookies are small text files stored on your device that help websites remember your preferences, login details, and track site usage.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">2. How We Use Cookies</h2>
          <p className="text-gray-700">
            We use cookies to enhance site functionality, analyze traffic, remember your preferences, and deliver relevant marketing messages.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">3. Third-Party Cookies</h2>
          <p className="text-gray-700">
            Some cookies are set by third-party services such as analytics providers and social media platforms. These are used to improve user experience and website performance.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">4. Managing Cookies</h2>
          <p className="text-gray-700">
            You can manage or disable cookies through your browser settings. Note that some website features may not function properly if cookies are disabled.
          </p>
        </section>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1B365D] text-white font-semibold rounded-full shadow hover:shadow-lg transition-all duration-300"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CookiesPage;
