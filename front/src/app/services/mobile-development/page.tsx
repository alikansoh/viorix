import type { Metadata } from "next";
import Script from "next/script";
import MobileDevContent from "./content"; // your component showing mobile development services

export const metadata: Metadata = {
  title: "Mobile App Development | Viorix Digital Solutions – UK Experts",
  description:
    "Professional mobile app development services in the UK. Viorix Digital Solutions creates custom Android and iOS apps with stunning UI/UX and seamless performance.",
  keywords: [
    "mobile app development uk",
    "ios app development london",
    "android app development uk",
    "mobile applications uk",
    "custom mobile apps",
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
    "@type": "Country",
    name: "United Kingdom",
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

      {/* Page content */}
      <MobileDevContent />
    </>
  );
}
