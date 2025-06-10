'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="mt-20 flex flex-col items-center justify-center px-6 text-center">
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
    </section>
  );
};

export default Hero;
