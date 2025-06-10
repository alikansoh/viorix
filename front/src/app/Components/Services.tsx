'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: 'UI/UX Design',
      description:
        'We craft intuitive and engaging user experiences through clean and modern interface designs.',
      image: '/undraw_designer_efwz.svg',
    },
    {
      title: 'Web Development',
      description:
        'We build fast, scalable, and secure websites tailored to your business needs.',
      image: '/undraw_static-website_x3tn.svg',
    },
    {
      title: 'Mobile Development',
      description:
        'We develop powerful and responsive mobile apps for both iOS and Android platforms.',
      image: '/undraw_completed_0sqh.svg',
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Our Services
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/3 text-center hover:shadow-xl transition"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.1, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="w-full h-58 flex items-center justify-center mb-4">
              <Image
                src={service.image}
                alt={service.title}
                width={170}
                height={170}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#0047AB] mb-2 mt-5">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;


