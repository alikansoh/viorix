'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="mt-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Side - Text */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Build{' '}
            <br />
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
              className="text-[#0047AB]"
            />{' '}
            Solutions
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mb-6">
            At Viorix, we design and deliver high-performance digital products that grow your business.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <Link href="/contact" passHref>
              <motion.button
                className="px-6 py-3 bg-[#0047AB] text-white font-semibold rounded-lg cursor-pointer"
                whileHover={{ scale: 1.1, backgroundColor: '#003080' }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 8px rgba(0, 71, 171, 0.6)',
                    '0 0 20px rgba(0, 71, 171, 1)',
                    '0 0 8px rgba(0, 71, 171, 0.6)',
                  ],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              >
                Get a free consultation
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 flex justify-center">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    className="rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
  >
    <Image
      src="/hero.jpg" // Replace with your actual image path
      alt="Hero Image"
      width={500}
      height={500}
      className="object-contain"
      priority
    />
  </motion.div>
</div>
      </div>
    </section>
  );
};

export default Hero;
