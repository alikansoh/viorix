import type { Metadata } from "next";
import Script from "next/script";
import DigitalMarketingContent from "./content";

export const metadata: Metadata = {
  title: "Digital Marketing Services London | SEO, PPC & Social Media | Viorix",
  description:
    "Expert digital marketing agency in London. SEO services, PPC campaigns, social media marketing & content strategy. Boost conversions & ROI. Free strategy session.",
  keywords: [
    "digital marketing london",
    "seo services london",
    "ppc management london",
    "social media marketing london",
    "content marketing services",
    "digital marketing agency uk",
    "local seo london",
    "google ads management",
    "facebook ads london",
    "search engine optimization",
    "digital marketing strategy",
    "online marketing services",
    "web marketing london",
    "conversion optimization",
    "marketing automation",
  ],
  openGraph: {
    type: "website",
    url: "https://viorix.co.uk/services/digital-marketing",
    siteName: "Viorix Digital Solutions",
    title: "Digital Marketing Services London | SEO, PPC & Social Media",
    description:
      "Top digital marketing agency in London. Data-driven SEO, PPC, social media & content marketing to grow your UK business. Results guaranteed.",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Marketing Services by Viorix Digital Solutions London",
        type: "image/jpeg",
      },
    ],
  },
 
  alternates: {
    canonical: "https://viorix.co.uk/services/digital-marketing",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing Services",
  description:
    "Comprehensive digital marketing services including SEO, PPC, social media marketing, and content strategy for UK businesses.",
  provider: {
    "@type": "Organization",
    name: "Viorix Digital Solutions",
    url: "https://viorix.co.uk",
    logo: "https://viorix.co.uk/logo.png",
    telephone: "+447464485026",
    address: {
      "@type": "PostalAddress",
      streetAddress: "124 City Road",
      addressLocality: "London",
      addressRegion: "England",
      postalCode: "EC1V 2NX",
      addressCountry: "GB",
    },
  },
  areaServed: {
    "@type": "City",
    name: "London",
  },
  url: "https://viorix.co.uk/services/digital-marketing",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "12",
    bestRating: "5",
    worstRating: "1",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What digital marketing services does Viorix offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Viorix offers comprehensive digital marketing services including SEO optimization, PPC campaign management, social media marketing, content strategy, and conversion rate optimization tailored to your business goals.",
      },
    },
    {
      "@type": "Question",
      name: "How long does SEO take to show results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO typically shows initial results in 3-6 months, with significant improvements visible within 6-12 months. Results depend on competition, website authority, and content quality.",
      },
    },
    {
      "@type": "Question",
      name: "What is your average ROI for digital marketing campaigns?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our clients typically see 200-400% ROI within the first 12 months through optimized PPC campaigns, improved organic rankings, and enhanced conversion rates. Results vary based on industry and initial conditions.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer digital marketing for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we specialize in digital marketing for businesses of all sizes, from startups to enterprises. We create customized strategies that fit your budget and business goals.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure digital marketing success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We measure success through KPIs including organic traffic growth, conversion rates, ROI, engagement metrics, and lead quality. We provide monthly reports and transparent analytics.",
      },
    },
  ],
};

export default function DigitalMarketingPage() {
  return (
    <>
      {/* Service Schema */}
      <Script
        id="digital-marketing-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="digital-marketing-breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* FAQ Schema - for Rich Snippets */}
      <Script
        id="digital-marketing-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DigitalMarketingContent />
    </>
  );
}