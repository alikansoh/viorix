'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="mt-20 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        We Build{' '}
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
      <Link href="/contact">
        <button className="px-6 py-3 bg-[#0047AB] text-white font-semibold rounded-lg hover:bg-[#003080] transition">
          Get a free consultion
        </button>
      </Link>
    </section>
  );
};

export default Hero;
