'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Rocket } from 'lucide-react';

const Hero = () => {
  return (
    <section className="mt-20 px-6 pb-20 max-w-7xl mx-auto bg-gradient-to-b from-white via-gray-50 to-white rounded-3xl shadow-sm">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Side - Text */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            We Build <br />
            <TypeAnimation
              sequence={[
                'Digital', 1500,
                '', 500,
                'Modern', 1500,
                '', 500,
                'Reliable', 1500,
                '', 500,
                'Scalable', 1500,
                '', 500,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={40}
              repeat={Infinity}
              className="bg-gradient-to-r from-[#0047AB] to-[#00B4D8] bg-clip-text text-transparent"
            />{' '}
            <span className="text-gray-800">Solutions</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mb-8">
            At <span className="font-semibold text-[#0047AB]">Viorix</span>, we design and deliver high-performance digital products that grow your business and elevate your brand.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/contact" passHref>
              <motion.button
                className="px-6 py-3 bg-[#0047AB] text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:bg-[#003080] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Rocket size={18} /> Get a free consultation
              </motion.button>
            </Link>

            <Link href="/services" passHref>
              <motion.button
                className="px-6 py-3 border border-[#0047AB] text-[#0047AB] font-semibold rounded-lg flex items-center gap-2 hover:bg-[#0047AB] hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <ArrowRight size={18} /> Our Services
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="w-[360px] sm:w-[420px] md:w-[480px] lg:w-[520px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/hero.jpg"
              alt="Professional team working on digital solutions"
              width={800}
              height={800}
              className="object-cover w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
