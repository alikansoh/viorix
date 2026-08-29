import type { Metadata } from "next";
import Script from "next/script";
import QuoteContent from "./content";

const BASE_URL = "https://viorix.co.uk";

export const metadata: Metadata = {
  title: "Start Your Project | Get a Free Quote | Viorix Digital Solutions",
  description:
    "Tell us about your project and get a free quote from Viorix Digital Solutions — London web development, mobile apps, UI/UX design and digital marketing.",
  keywords: [
    "request a project quote viorix",
    "viorix project brief form",
    "scope a digital project london",
    "agency quote for saas and b2b builds",
    "web and app project estimate uk",
    "brief a healthcare or retail web project",
  ],
  openGraph: {
    title: "Start Your Project | Viorix Digital Solutions",
    description:
      "Tell us about your project and get a free quote from Viorix Digital Solutions, London.",
    url: `${BASE_URL}/web-quote`,
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Start Your Project with Viorix Digital Solutions",
      },
    ],
  },
  alternates: {
    canonical: `${BASE_URL}/web-quote`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Start Your Project", item: `${BASE_URL}/web-quote` },
  ],
};

export default function WebQuotePage() {
  return (
    <>
      <Script
        id="ld-json-start-project-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <QuoteContent />
    </>
  );
}
