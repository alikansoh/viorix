"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Helper function to bold & color keywords inside descriptions
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
  const services = [
    {
      title: "UI/UX Design",
      description:
        "We craft intuitive and engaging user experiences through clean and modern interface designs.",
      image: "/undraw_designer_efwz.svg",
    },
    {
      title: "Web Development",
      description:
        "We build fast, scalable, and secure websites tailored to your business needs.",
      image: "/undraw_static-website_x3tn.svg",
    },
    {
      title: "Mobile Development",
      description:
        "We develop powerful and responsive mobile apps for both iOS and Android platforms.",
      image: "/undraw_completed_0sqh.svg",
    },
  ];

  const [activeTab, setActiveTab] = useState("Web Development");

  const tabContent = {
    "Web Development": {
      heading: "FOR WEB DEVELOPMENT",
      subheading: "Benefit from our experienced Front-end and Back-end developers.",
      description:
        "Boost your business with our expert <strong class='font-bold text-[#0047AB]'>Front-end</strong> and <strong class='font-bold text-[#0047AB]'>Back-end</strong> development services. We deliver <strong class='font-bold text-[#0047AB]'>SEO-Friendly</strong>, fast, and fully <strong class='font-bold text-[#0047AB]'>responsive</strong> websites designed to increase your online presence and customer engagement.",
      image: "/web.jpg",
    },
    "Mobile Development": {
      heading: "FOR MOBILE DEVELOPMENT",
      subheading: "Launch high-performance apps on both iOS and Android.",
      description:
        "Our team specializes in creating <strong class='font-bold text-[#0047AB]'>mobile apps</strong> that perform seamlessly across <strong class='font-bold text-[#0047AB]'>iOS</strong> and <strong class='font-bold text-[#0047AB]'>Android</strong> devices. We ensure fast loading times, smooth navigation, and a rich user experience to help you reach users on the go.",
      image: "/mobile.jpg",
    },
    "UI/UX Design": {
      heading: "FOR UI/UX DESIGN",
      subheading: "Elevate user engagement with beautiful interfaces.",
      description:
        "Enhance <strong class='font-bold text-[#0047AB]'>user engagement</strong> with our stunning and intuitive <strong class='font-bold text-[#0047AB]'>beautiful interfaces</strong>. We craft meaningful <strong class='font-bold text-[#0047AB]'>user journeys</strong> that not only look great but also improve usability and satisfaction.",
      image: "/ui.jpg",
    },
  };

  const active = tabContent[activeTab];

  return (
    <section className="py-16 px-6 bg-gray-50 mt-20">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Our Services
      </h2>

    

      {/* Dynamic Section + Tabs */}
      <div className="mt-12 max-w-5xl mx-auto px-4 md:flex md:items-start md:gap-12 border border-gray-200 rounded-xl shadow-md bg-white py-8">
        {/* Left side text content */}
        <div className="md:flex-1">
          <h1 className="text-[#0047AB] font-extrabold text-md md:text-xl">
            {active.heading}
          </h1>
          <h2 className="text-xl md:text-4xl font-semibold mt-3 text-gray-800">
            {active.subheading}
          </h2>
          <p
            className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: active.description }}
          />
        </div>

        {/* Right side image and tabs */}
        <div className="md:flex-1 flex flex-col items-center mt-8 md:mt-0">
          <Image
            src={active.image}
            alt={`${activeTab} image`}
            width={500}
            height={200}
            className="object-contain rounded-lg shadow-lg"
            priority
          />

          {/* Tabs below image on md and smaller */}
          <div className="flex mt-8 gap-6 border-b border-gray-300 w-full justify-center md:justify-start">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative pb-3 font-semibold text-sm md:text-base
                  transition-colors duration-300
                  ${
                    activeTab === tab
                      ? "text-[#0047AB]"
                      : "text-gray-500 hover:text-[#0047AB]"
                  }
                `}
                aria-selected={activeTab === tab}
                role="tab"
              >
                {tab.toUpperCase()}

                {/* Underline for active tab */}
                {activeTab === tab && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#0047AB] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
