import Head from "next/head";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import WhyChooseUs from "./Components/WhyUs";
import OurProcess from "./Components/OurProcess";

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Viorix Digital Solutions | Web Development, Apps & Digital Marketing</title>
        <meta
          name="description"
          content="Viorix Digital Solutions provides professional web development, mobile apps, e-commerce solutions, UI/UX design, and digital marketing services to scale your business."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="web development, mobile apps, e-commerce, UI/UX design, digital marketing, SEO, software solutions, Viorix Digital Solutions" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Viorix Digital Solutions" />
        <meta
          property="og:description"
          content="Professional web development, mobile apps, e-commerce, UI/UX design, and digital marketing services to grow your business."
        />
        <meta property="og:url" content="https://www.viorix.co.uk/" />
        <meta property="og:image" content="https://www.viorix.co.uk/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Viorix Digital Solutions" />
        <meta
          name="twitter:description"
          content="Professional web development, mobile apps, e-commerce, UI/UX design, and digital marketing services."
        />
        <meta name="twitter:image" content="https://www.viorix.co.uk/og-image.jpg" />
        <meta name="twitter:site" content="@ViorixDigital" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.viorix.co.uk/" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Viorix Digital Solutions",
              "url": "https://www.viorix.co.uk/",
              "logo": "https://www.viorix.co.uk/logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/viorix-digital-solutions",
                "https://twitter.com/ViorixDigital"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+44-7-464-485026",
                  "contactType": "Customer Service",
                  "areaServed": "GB",
                  "availableLanguage": ["English"]
                }
              ]
            }),
          }}
        />
      </Head>

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Our Process Section */}
        <OurProcess />

          {/* Our Process Section */}
          <WhyChooseUs />

      </main>
    </>
  );
}
