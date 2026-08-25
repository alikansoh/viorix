import type { Metadata } from "next";
import Script from "next/script";
import WebDevContent from "./content"; // ensure this path is correct

export const metadata: Metadata = {
  title: "Web Development Services London | Custom Websites & Web Apps | Viorix",
  description:
    "Professional web development services in the UK. Viorix Digital Solutions delivers custom websites, responsive design, and modern web apps tailored to your business.",
  keywords: [
    "web development london",
    "web development uk",
    "web development services london",
    "web development company london",
    "web development agency london",
    "custom website development london",
    "bespoke web development london",
    "ecommerce development london",
    "next.js developers london",
    "react developers london",
    "custom web apps london",
    "responsive web design london",
    "website development services",
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
    images: ["https://viorix.co.uk/og-image.png"],
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
    "@type": "City",
    name: "London",
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

// Mirrors the visible FAQ content in ./content.tsx — keep in sync so the
// schema always matches what's on the page (required for FAQ rich results).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to develop a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project timelines vary based on complexity. A simple business website takes 2-4 weeks, while complex web applications can take 8-16 weeks. We provide detailed timelines during the planning phase.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide ongoing support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer comprehensive post-launch support including hosting, maintenance, security updates, and feature enhancements to ensure your website continues to perform optimally.",
      },
    },
    {
      "@type": "Question",
      name: "Will my website be mobile-friendly and SEO optimized?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All our websites are built with a mobile-first approach and include technical SEO optimization, fast loading times, proper meta structures, and schema markup for better search engine visibility.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies do you use for web development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use modern technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS. Our tech stack is chosen based on your project requirements for optimal performance and scalability.",
      },
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

      {/* FAQ JSON-LD */}
      <Script
        id="web-development-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page content */}
      <WebDevContent />
    </>
  );
}
