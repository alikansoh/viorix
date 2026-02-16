import type { Metadata } from "next";
import Script from "next/script";
import Content from "./content";

export const metadata: Metadata = {
  title: "Contact Us | Viorix Digital Solutions",
  description:
    "Get in touch with Viorix Digital Solutions. We're here to help you with web development, mobile apps, digital marketing, and custom website projects in the UK.",
  keywords: [
    "contact Viorix Digital Solutions",
    "London web development contact",
    "UK digital services contact",
  ],
  openGraph: {
    title: "Contact Viorix Digital Solutions",
    description:
      "Reach out to Viorix Digital Solutions for modern web development, mobile, and digital services in the UK.",
    url: "https://viorix.co.uk/contact",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png", // same OG image for consistency
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Viorix Digital Solutions",
    description:
      "Reach out to Viorix Digital Solutions for web development, mobile apps, and digital marketing services in the UK.",
    images: ["https://viorix.co.uk/og-image.png"],
  },
  alternates: {
    canonical: "https://viorix.co.uk/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD structured data for the organization (Contact page)
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

export default function ContactPage() {
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
      <Content />
    </>
  );
}
