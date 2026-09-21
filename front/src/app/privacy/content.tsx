"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f8ff] to-white px-6 sm:px-12 md:px-24 mt-10 py-12">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#00BFFF]/30">
        <h1 className="text-4xl font-bold text-[#1B365D] mb-6">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          <strong>Viorix Digital Solutions Ltd</strong> respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information.
        </p>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">1. Information Collection</h2>
          <p className="text-gray-700">
            We collect information when you visit our website, use our services, or contact us. This may include your name, email address, phone number, and any messages you send.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">2. Use of Data</h2>
          <p className="text-gray-700">
            Your data is used to provide services, communicate with you, improve our offerings, and comply with legal obligations.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">3. Sharing Information</h2>
          <p className="text-gray-700">
            We do not sell your personal data. We may share information with trusted partners or service providers strictly for business purposes.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">4. Cookies & Tracking</h2>
          <p className="text-gray-700">
            We use cookies to improve your experience and analyze traffic. You can manage or disable cookies via your browser settings.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">5. Security</h2>
          <p className="text-gray-700">
            We implement technical and organizational measures to protect your data from unauthorized access, disclosure, or alteration.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">6. Contact</h2>
          <p className="text-gray-700">
            For any questions about this Privacy Policy, please contact us at <strong>info@viorix.co.uk</strong>.
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

export default PrivacyPage;
