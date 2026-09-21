"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f8ff] to-white px-6 sm:px-12 md:px-24 py-12  mt-10"  >
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#00BFFF]/30">
        <h1 className="text-4xl font-bold text-[#1B365D] mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to <strong>Viorix Digital Solutions Ltd</strong>. By using our website and services, you agree to the following terms:
        </p>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">1. General</h2>
          <p className="text-gray-700">
            This website is owned by Viorix Digital Solutions Ltd, registered in England & Wales (Company No. 16587182). By accessing our website or engaging our services, you confirm you are at least 18 years old.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">2. Services</h2>
          <p className="text-gray-700">
            We provide web development, digital solutions, and consultancy. Project timelines and costs are agreed in writing before work begins.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">3. Payments</h2>
          <p className="text-gray-700">
            All invoices must be paid within the agreed timeframe. Late payments may result in service suspension.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">4. Intellectual Property</h2>
          <p className="text-gray-700">
            All code, designs, and content remain our intellectual property until full payment is received. Ownership is transferred upon payment unless otherwise agreed.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">5. Liability</h2>
          <p className="text-gray-700">
            We are not liable for indirect, incidental, or consequential damages. While we deliver secure work, we cannot guarantee absolute protection against cyber threats.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold text-[#00BFFF] mb-2">6. Governing Law</h2>
          <p className="text-gray-700">
            These Terms are governed by the laws of England & Wales. Disputes will be handled exclusively by the courts of England & Wales.
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

export default TermsPage;
