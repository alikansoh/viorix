import type { Metadata } from "next";
import Script from "next/script";
import UIUXContent from "./content"; // Your component showcasing UI/UX design services

export const metadata: Metadata = {
  title: "UI/UX Design Services London | Viorix Digital Solutions",
  description:
    "London-based UI/UX design agency. Viorix Digital Solutions creates intuitive interfaces, user research and seamless digital experiences for websites and apps.",
  keywords: [
    "ui ux design london",
    "ux design agency london",
    "ui design services london",
    "product design london",
    "user experience design london",
    "website design london",
    "app design london",
    "wireframing services london",
    "user research london",
    "figma designers london",
  ],
  openGraph: {
    title: "UI/UX Design by Viorix Digital Solutions",
    description:
      "Discover how Viorix Digital Solutions crafts user-centered UI/UX designs that elevate user satisfaction and drive business success.",
    url: "https://viorix.co.uk/services/ui-ux-design",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png", // Create a visually appealing OG image for this service
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions UI/UX Design Services",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/ui-ux-design",
  },
};

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "UI/UX Design",
  description:
    "User-centred UI/UX design services for UK businesses by Viorix Digital Solutions — user research, wireframing, prototyping, and interface design for web and mobile products.",
  provider: {
    "@type": "Organization",
    name: "Viorix Digital Solutions",
    url: "https://viorix.co.uk",
    logo: "https://viorix.co.uk/logo.png",
  },
  areaServed: {
    "@type": "City",
    name: "London",
  },
  url: "https://viorix.co.uk/services/ui-ux-design",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "12",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://viorix.co.uk" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://viorix.co.uk/services" },
    { "@type": "ListItem", position: 3, name: "UI/UX Design", item: "https://viorix.co.uk/services/ui-ux-design" },
  ],
};

// Mirrors the visible FAQ content in ./content.tsx — keep in sync so the
// schema always matches what's on the page (required for FAQ rich results).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the difference between UI and UX design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "UX (User Experience) focuses on the overall feel and functionality of a product, including user research and journey mapping. UI (User Interface) focuses on the visual elements like colors, typography, and layout. Both are essential for successful digital products.",
      },
    },
    {
      "@type": "Question",
      name: "How do you ensure designs work well for our target audience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We start with comprehensive user research, including surveys, interviews, and competitor analysis. We create user personas and test our designs with real users throughout the process to ensure optimal usability and engagement.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide design files and assets after completion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you receive all design files in native formats (Figma, Sketch, etc.), exported assets, style guides, and comprehensive documentation. We also provide ongoing support during development implementation.",
      },
    },
    {
      "@type": "Question",
      name: "Can you redesign our existing website or app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! We specialize in redesigning existing digital products to improve user experience, increase conversions, and modernize visual appeal while maintaining brand consistency and user familiarity.",
      },
    },
  ],
};

export default function UIUXDesignPage() {
  return (
    <>
      {/* Service JSON-LD */}
      <Script
        id="ui-ux-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />

      {/* Breadcrumbs JSON-LD */}
      <Script
        id="ui-ux-breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* FAQ JSON-LD */}
      <Script
        id="ui-ux-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <UIUXContent />
    </>
  );
}
