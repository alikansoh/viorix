import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import FloatingButtons from "./Components/FloatingButtons";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
    images: [
      {
        url: "https://viorix.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions - London web development agency",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk",
  },
  other: {
    // Add any verification meta tags here if needed:
    // "google-site-verification": "your_token"
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService", "SoftwareCompany"],
  "@id": "https://viorix.co.uk#organization",
  name: "Viorix Digital Solutions",
  alternateName: "Viorix",
  description: "Professional web development and digital solutions agency serving London and the UK",
  url: "https://viorix.co.uk",
  telephone: "+447464485026",
  email: "hello@viorix.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "124 City Road",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "EC1V 2NX",
    addressCountry: "GB",
  },
  logo: "https://viorix.co.uk/logo.png",
  image: "https://viorix.co.uk/og-image.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+447464485026",
      contactType: "sales",
      areaServed: "GB",
      availableLanguage: ["English"],
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "££-£££",
  sameAs: [
    "https://www.linkedin.com/company/viorix-digital-solutions",
    "https://www.instagram.com/viorix_digital_solutions",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        {/* Minimal server-side CSS for any global animations you want server-rendered */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Minimal non-styled-jsx CSS (safe in server component) */
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
            .float-animation { animation: float 3s ease-in-out infinite; }
          `
        }} />
      </head>
      <body className="font-sans">
        {/* JSON-LD structured data: non-blocking */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google tag (gtag.js) - load after interactive to avoid blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WTB9BL73X4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WTB9BL73X4');
          `}
        </Script>

        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />

        {/* Floating buttons moved into a client component to avoid styled-jsx errors */}
        <FloatingButtons />

        {/* Performance & analytics */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}