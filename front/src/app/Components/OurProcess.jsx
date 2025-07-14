'use client';

import React from 'react';
import Image from 'next/image';
import {
  CheckCircle,
  Calendar,
  Code,
  Package,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Discovery Call',
    description:
      'Discuss your project goals, audience, and requirements to align on vision.',
    icon: <MessageSquare className="w-6 h-6 text-[#0047AB]" />,
  },
  {
    title: 'Planning & Strategy',
    description:
      'Create a project roadmap, sitemap, and technical plan for seamless execution.',
    icon: <Calendar className="w-6 h-6 text-[#0047AB]" />,
  },
  {
    title: 'Design & Development',
    description:
      'Craft a custom design and build your site with clean, performant code.',
    icon: <Code className="w-6 h-6 text-[#0047AB]" />,
  },
  {
    title: 'Testing & Launch',
    description:
      'Conduct thorough testing, optimise performance, and deploy your site securely.',
    icon: <CheckCircle className="w-6 h-6 text-[#0047AB]" />,
  },
  {
    title: 'Ongoing Support',
    description:
      'Provide maintenance, updates, and analytics insights to keep you ahead.',
    icon: <Package className="w-6 h-6 text-[#0047AB]" />,
  },
];

export default function OurSimpleProcess() {
  return (
    <section className="py-20 bg-transparent" id="process">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#0047AB] to-[#00B4D8] bg-clip-text text-transparent">
          Our Simple Process
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <motion.div
              className="w-full h-auto rounded-3xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/steps.png"
                alt="Responsive display on mobile, tablet, laptop, and large screen"
                className="w-full h-auto"
                style={{ backgroundColor: 'transparent' }}
              />
            </motion.div>
          </div>

          {/* Right Steps */}
          <div className="w-full md:w-1/2 relative">
            {/* vertical line background */}
            <div className="absolute left-5 top-0 h-full w-1 bg-[#00B4D8]/20"></div>
            <div className="flex flex-col space-y-10 pl-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  {/* Numbered circle + arrow */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0047AB] flex items-center justify-center z-10">
                      <span className="font-semibold text-white">
                        {index + 1}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="mt-1">
                        <Image
                          src="/arrow.svg"
                          alt="Arrow"
                          width={24}
                          height={36}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Step content */}
                  <div className="ml-6">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
