import type { Metadata } from "next";
import Script from "next/script";
import DigitalMarketingContent from "./content"; // Your component showcasing digital marketing services

export const metadata: Metadata = {
  title: "Digital Marketing Services | Viorix Digital Solutions – UK Experts",
  description:
    "Boost your online presence with Viorix Digital Solutions' comprehensive digital marketing services. From SEO and PPC to social media and content marketing, we drive results.",
  keywords: [
    "digital marketing uk",
    "seo services london",
    "ppc management uk",
    "social media marketing uk",
    "content marketing services",
  ],
  openGraph: {
    title: "Digital Marketing by Viorix Digital Solutions",
    description:
      "Elevate your brand with Viorix Digital Solutions' expert digital marketing services, including SEO, PPC, social media, and content marketing strategies.",
    url: "https://viorix.co.uk/services/digital-marketing",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png", // same OG image for consistency
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | Viorix Digital Solutions",
    description:
      "Comprehensive digital marketing services in the UK — SEO, PPC, social media, and content marketing by Viorix Digital Solutions.",
    images: ["https://viorix.co.uk/og-image.png"], // same OG image
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/digital-marketing",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD structured data for Digital Marketing service
 * - Service schema with aggregateRating (5-star, 12 reviews)
 * - BreadcrumbList for SERP breadcrumb display
 */
const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing",
  description:
    "Expert digital marketing services by Viorix Digital Solutions, including SEO, PPC, social media, and content marketing strategies for UK businesses.",
  provider: {
    "@type": "Organization",
    name: "Viorix Digital Solutions",
    url: "https://viorix.co.uk",
    logo: "https://viorix.co.uk/og-image.png", // using OG image
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  url: "https://viorix.co.uk/services/digital-marketing",
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
      name: "Digital Marketing",
      item: "https://viorix.co.uk/services/digital-marketing",
    },
  ],
};

export default function DigitalMarketingPage() {
  return (
    <>
      {/* Service JSON-LD */}
      <Script
        id="digital-marketing-schema"
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
      <DigitalMarketingContent />
    </>
  );
}
