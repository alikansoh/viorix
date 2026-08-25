import type { Metadata } from "next";
import Script from "next/script";
import MobileDevContent from "./content"; // your component showing mobile development services

export const metadata: Metadata = {
  title: "Mobile App Development London | iOS & Android Apps | Viorix",
  description:
    "Professional mobile app development services in the UK. Viorix Digital Solutions creates custom Android and iOS apps with stunning UI/UX and seamless performance.",
  keywords: [
    "mobile app development london",
    "mobile app development uk",
    "app developers london",
    "ios app development london",
    "android app development london",
    "mobile app development agency london",
    "cross platform app development london",
    "react native developers london",
    "flutter developers london",
    "custom mobile apps london",
  ],
  openGraph: {
    title: "Mobile App Development by Viorix Digital Solutions",
    description:
      "Build custom Android and iOS apps with Viorix Digital Solutions. High-performance, responsive mobile solutions tailored to your business needs.",
    url: "https://viorix.co.uk/services/mobile-development",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png", // using the same OG image for branding
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development | Viorix Digital Solutions",
    description:
      "Custom Android and iOS app development services in the UK — responsive, performant, and user-friendly.",
    images: ["https://viorix.co.uk/og-image.png"], // same OG image
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/mobile-development",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD structured data for mobile development page
 * - Service schema strengthens relevance for mobile development intent
 * - AggregateRating added for 5-star rating with 12 reviews
 * - BreadcrumbList helps SERP breadcrumb display
 */
const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mobile App Development",
  description:
    "Custom mobile app development services for UK businesses by Viorix Digital Solutions. Android and iOS apps, responsive UI/UX, and scalable performance.",
  provider: {
    "@type": "Organization",
    name: "Viorix Digital Solutions",
    url: "https://viorix.co.uk",
    logo: "https://viorix.co.uk/og-image.png", // using the OG image as logo for structured data
  },
  areaServed: {
    "@type": "City",
    name: "London",
  },
  url: "https://viorix.co.uk/services/mobile-development",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://viorix.co.uk",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://viorix.co.uk/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Mobile App Development",
      item: "https://viorix.co.uk/services/mobile-development",
    },
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
      name: "Should I choose native or cross-platform development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Native development offers the best performance and platform-specific features, while cross-platform saves time and cost. We recommend native for complex, performance-critical apps and cross-platform for MVPs or simpler applications.",
      },
    },
    {
      "@type": "Question",
      name: "How much does mobile app development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Costs vary based on complexity, features, and platform choice. Simple apps start around £15,000, while complex enterprise apps can range from £50,000+. We provide detailed quotes after understanding your requirements.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to develop a mobile app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Development time depends on app complexity. Simple apps take 3-4 months, while feature-rich applications can take 6-12 months. We provide realistic timelines during the planning phase.",
      },
    },
    {
      "@type": "Question",
      name: "Do you help with app store submission and marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we handle the complete app store submission process for both iOS App Store and Google Play Store, including app store optimization (ASO) and launch marketing strategies.",
      },
    },
  ],
};

export default function MobileDevelopmentPage() {
  return (
    <>
      {/* Service JSON-LD */}
      <Script
        id="mobile-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />

      {/* Breadcrumbs JSON-LD */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* FAQ JSON-LD */}
      <Script
        id="mobile-development-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page content */}
      <MobileDevContent />
    </>
  );
}
