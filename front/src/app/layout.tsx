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
    default: "Web Development London | Award-Winning Websites & Apps | Viorix",
    template: "%s | Viorix Digital Solutions",
  },
  description:
    "Top-rated web development agency in London. Custom websites, web apps & digital solutions for UK startups & enterprises. Expert Next.js developers. Free consultation today.",
  keywords: [
    "web development london",
    "best web developers london",
    "custom website design london",
    "web app development london",
    "london web agency",
    "responsive web design",
    "e-commerce development london",
    "next.js developers london",
    "affordable web development",
    "professional web design services",
    "london digital agency",
    "startup web development",
    "enterprise web solutions",
    "seo friendly web design london",
    "website redesign london",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://viorix.co.uk",
    siteName: "Viorix Digital Solutions",
    title: "Web Development London | Award-Winning Websites & Apps",
    description:
      "London's trusted web development agency. 50+ successful projects. Custom websites, web apps & digital solutions built with Next.js & React.",
    images: [
      {
        url: "https://viorix.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions - Web Development Agency London",
        type: "image/jpeg",
      },
    ],
  },
 
  alternates: {
    canonical: "https://viorix.co.uk",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService", "SoftwareCompany"],
  "@id": "https://viorix.co.uk#organization",
  name: "Viorix Digital Solutions",
  alternateName: "Viorix",
  description: "Award-winning web development and digital solutions agency serving London and the UK",
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
  logo: {
    "@type": "ImageObject",
    url: "https://viorix.co.uk/logo.png",
    width: 250,
    height: 60,
  },
  image: "https://viorix.co.uk/og-image.jpg",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+447464485026",
      contactType: "sales",
      areaServed: "GB",
      availableLanguage: ["English"],
      contactOption: "TollFree",
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
      description: "Available for consultations and meetings during business hours",
    },
  ],
  priceRange: "££-£££",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "12",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.linkedin.com/company/viorix-digital-solutions",
    "https://www.instagram.com/viorix_digital_solutions",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://viorix.co.uk#localbusiness",
  name: "Viorix Digital Solutions",
  businessType: "SoftwareDevelopment",
  address: {
    "@type": "PostalAddress",
    streetAddress: "124 City Road",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "EC1V 2NX",
    addressCountry: "GB",
  },
  telephone: "+447464485026",
  email: "hello@viorix.co.uk",
  url: "https://viorix.co.uk",
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  knowsAbout: ["Web Development", "Digital Solutions", "Web Apps", "Custom Websites", "Next.js"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=+447464485026" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />

        {/* Sitemap and RSS */}
        <link rel="sitemap" href="https://viorix.co.uk/sitemap.xml" />

        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wzacswvwh2");
            `
          }}
        />

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
            .float-animation { animation: float 3s ease-in-out infinite; }
            
            html {
              scroll-behavior: smooth;
            }
            
            body {
              margin: 0;
              padding: 0;
            }
          `
        }} />
      </head>
      <body className="font-sans">
        {/* Organization Schema - JSON-LD */}
        <Script
          id="ld-json-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Local Business Schema - JSON-LD */}
        <Script
          id="ld-json-local"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-WTB9BL73X4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WTB9BL73X4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WTB9BL73X4', {
              'page_path': window.location.pathname,
              'page_title': document.title,
              'anonymize_ip': true
            });
          `}
        </Script>

        <Navbar />
        <main className="">{children}</main>
        <Footer />
        <FloatingButtons />

        {/* Performance & Analytics */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}