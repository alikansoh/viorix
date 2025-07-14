"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Tab text highlighting
const highlightKeywords = (text) => {
  const keywords = [
    "Front-end",
    "Back-end",
    "SEO-Friendly",
    "responsive",
    "mobile apps",
    "iOS",
    "Android",
    "user engagement",
    "beautiful interfaces",
    "user journeys",
  ];

  let highlighted = text;

  keywords.forEach((word) => {
    const regex = new RegExp(`(${word})`, "gi");
    highlighted = highlighted.replace(
      regex,
      '<strong class="font-bold text-[#0047AB]">$1</strong>'
    );
  });

  return highlighted;
};

const Services = () => {
  const [activeTab, setActiveTab] = useState("Web Development");

  const tabContent = {
    "Web Development": {
      heading: "FOR WEB DEVELOPMENT",
      subheading: "Benefit from our experienced Front-end and Back-end developers.",
      description: highlightKeywords(
        "Boost your business with our expert Front-end and Back-end development services. We deliver SEO-Friendly, fast, and fully responsive websites designed to increase your online presence and customer engagement."
      ),
      image: "/web.jpg",
    },
    "Mobile Development": {
      heading: "FOR MOBILE DEVELOPMENT",
      subheading: "Launch high-performance apps on both iOS and Android.",
      description: highlightKeywords(
        "Our team specializes in creating mobile apps that perform seamlessly across iOS and Android devices. We ensure fast loading times, smooth navigation, and a rich user experience to help you reach users on the go."
      ),
      image: "/mobile.jpg",
    },
    "UI/UX Design": {
      heading: "FOR UI/UX DESIGN",
      subheading: "Elevate user engagement with beautiful interfaces.",
      description: highlightKeywords(
        "Enhance user engagement with our stunning and intuitive beautiful interfaces. We craft meaningful user journeys that not only look great but also improve usability and satisfaction."
      ),
      image: "/ui.jpg",
    },
  };

  const active = tabContent[activeTab];

  return (
    <section className=" px-6  mt-10">
      <div className= "mx-auto bg-white  shadow-lg overflow-hidden">
        <div className="md:flex md:items-center gap-10 p-10">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:flex-1"
          >
            <h1 className="text-[#0047AB] text-sm md:text-base font-bold tracking-widest uppercase">
              {active.heading}
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mt-3 text-gray-800">
              {active.subheading}
            </h2>
            <p
              className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: active.description }}
            />
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:flex-1 flex flex-col items-center mt-10 md:mt-0"
          >
            <Image
              src={active.image}
              alt={`${activeTab} illustration`}
              width={500}
              height={300}
              className="object-contain rounded-xl shadow-lg"
              priority
            />

            {/* Tabs */}
            <div className="flex mt-10 gap-4 border-b border-gray-300 w-full justify-center md:justify-start">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 font-medium text-sm md:text-base transition duration-300 ${
                    activeTab === tab
                      ? "text-[#0047AB]"
                      : "text-gray-500 hover:text-[#0047AB]"
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab}
                >
                  {tab.toUpperCase()}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-[#0047AB] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
