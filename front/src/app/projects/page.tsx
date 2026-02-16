import type { Metadata } from "next";
import Script from "next/script";
import ProjectsContent from "./content"; // your component showing projects

export const metadata: Metadata = {
  title: "Our Projects | Viorix Digital Solutions – UK Web & Digital Experts",
  description:
    "Explore our portfolio of web development, mobile apps, and digital solutions. See how Viorix Digital Solutions delivers innovative projects in the UK.",
  keywords: [
    "Viorix projects",
    "UK web development portfolio",
    "digital solutions portfolio",
    "mobile app projects",
  ],
  openGraph: {
    title: "Viorix Digital Solutions Projects",
    description:
      "Browse our projects showcasing web development, digital solutions, and custom apps delivered for clients across the UK.",
    url: "https://viorix.co.uk/projects",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png", // same OG image for consistency
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Projects | Viorix Digital Solutions",
    description:
      "Discover our web development, mobile app, and digital solution projects across the UK.",
    images: ["https://viorix.co.uk/og-image.png"],
  },
  alternates: {
    canonical: "https://viorix.co.uk/projects",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD structured data for the organization (used across site pages)
 */
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Viorix Digital Solutions",
  url: "https://viorix.co.uk",
  telephone: "+447464485026",
  email: "hello@viorix.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "124 City Road",
    addressLocality: "London",
    postalCode: "EC1V 2NX",
    addressCountry: "GB",
  },
  sameAs: [
    "https://www.linkedin.com/company/viorix-digital-solutions",
    "https://www.instagram.com/viorix_digital_solutions",
  ],
  logo: "https://viorix.co.uk/og-image.png",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Organization JSON-LD (non-blocking) */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />

      {/* Page content */}
      <ProjectsContent />
    </>
  );
}
