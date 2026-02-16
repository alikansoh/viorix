import type { Metadata } from "next";
import Script from "next/script";
import WebDevContent from "./content"; // ensure this path is correct

export const metadata: Metadata = {
  title: "Web Development Services | Viorix Digital Solutions – UK Experts",
  description:
    "Professional web development services in the UK. Viorix Digital Solutions delivers custom websites, responsive design, and modern web apps tailored to your business.",
  keywords: [
    "web development uk",
    "web development services",
    "web development company london",
    "custom web apps",
    "responsive web design",
  ],
  openGraph: {
    title: "Web Development by Viorix Digital Solutions",
    description:
      "Custom web development services in the UK. Build responsive, high-performance websites and web apps with Viorix Digital Solutions.",
    url: "https://viorix.co.uk/services/web-development",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Web Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services | Viorix Digital Solutions",
    description:
      "Custom web development services in the UK — responsive, performant, and secure.",
    images: ["https://viorix.co.uk/og-web-development.png"],
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/web-development",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD structured data for this service page
 * - Service schema strengthens relevance for web development intent
 * - BreadcrumbList helps SERP breadcrumb display
 * - Added 5-star rating with 12 reviews
 */
const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development",
  description:
    "Custom web development services for UK businesses by Viorix Digital Solutions. Responsive websites, PWAs, and scalable web applications.",
  provider: {
    "@type": "Organization",
    name: "Viorix Digital Solutions",
    url: "https://viorix.co.uk",
    logo: "https://viorix.co.uk/logo.png",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  url: "https://viorix.co.uk/services/web-development",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",   // 5-star rating
    reviewCount: "12"     // total reviews
  }
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
      name: "Web Development",
      item: "https://viorix.co.uk/services/web-development",
    },
  ],
};

export default function WebDevelopmentPage() {
  return (
    <>
      {/* Service JSON-LD (non-blocking) */}
      <Script
        id="service-schema"
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
      <WebDevContent />
    </>
  );
}
