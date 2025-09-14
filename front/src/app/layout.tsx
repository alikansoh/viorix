import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Viorix Digital Solutions | London Web Development & UK Digital Services",
    template: "%s | Viorix Digital Solutions - London",
  },
  description:
    "Leading London web development agency serving UK businesses. Viorix Digital Solutions creates modern, scalable websites and digital solutions across London, Birmingham, Manchester, and throughout the United Kingdom.",
  keywords: [
    "London web development",
    "UK web development agency",
    "Viorix Digital Solutions London",
    "web developers London",
    "digital agency UK",
    "London website design",
    "UK custom websites",
    "Next.js developers London",
    "digital solutions UK",
    "London tech company",
    "web development services UK",
    "London digital marketing",
    "UK business websites",
    "professional web design London",
    "e-commerce development UK",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://viorix.co.uk",
    siteName: "Viorix Digital Solutions - London",
    title: "London's Premier Web Development Agency | Viorix Digital Solutions",
    description:
      "Trusted London web development agency serving UK businesses since [year]. From startups in Shoreditch to enterprises in Canary Wharf, we deliver exceptional digital solutions across the UK.",
    
  },
 
  alternates: {
    canonical: "https://viorix.co.uk",
  },
  other: {
    "geo.region": "GB-LND",
    "geo.placename": "London",
    "geo.position": "51.5074;-0.1278", // London coordinates
    "ICBM": "51.5074, -0.1278",
  },
};

// JSON-LD structured data for local business
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://viorix.co.uk#organization",
  "name": "Viorix Digital Solutions",
  "alternateName": "Viorix",
  "description": "Professional web development and digital solutions agency serving London and the UK",
  "url": "https://viorix.co.uk",
  "telephone": "+44-7464-485026",
  "email": "hello@viorix.co.uk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "124 City Road",
    "addressLocality": "London",
    "addressRegion": "England",
    "postalCode": "EC1V 2NX",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "51.5074",
    "longitude": "-0.1278"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "London"
    },
    {
      "@type": "Country",
      "name": "United Kingdom"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "51.5074",
      "longitude": "-0.1278"
    },
    "geoRadius": "150000" // 150km radius from London - covers most of Southern England
  },
  "priceRange": "££-£££",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.linkedin.com/company/viorix-digital-solutions",
    "https://www.instagram.com/viorix_digital_solutions",
    // Add your actual social media URLs
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        {/* JSON-LD structured data for local SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WTB9BL73X4"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WTB9BL73X4', {
              custom_map: {'custom_parameter_1': 'location'},
              location: 'London'
            });
          `}
        </Script>

        {/* Additional meta tags for local SEO */}
        <meta name="geo.region" content="GB-LND" />
        <meta name="geo.placename" content="London" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />
        <meta name="DC.title" content="London Web Development Agency - Viorix Digital Solutions" />
      </head>
      <body className="font-sans">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}