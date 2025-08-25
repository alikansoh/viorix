// app/page.js (Next.js 13+ using the App Router)
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import WhyChooseUs from "./Components/WhyUs";
import OurProcess from "./Components/OurProcess";

// Metadata for the page
export const metadata = {
  title: "Viorix Digital Solutions | Web Development, Apps & Digital Marketing",
  description:
    "Viorix Digital Solutions provides professional web development, mobile apps, e-commerce solutions, UI/UX design, and digital marketing services to scale your business.",
  keywords:
    "web development, mobile apps, e-commerce, UI/UX design, digital marketing, SEO, software solutions, Viorix Digital Solutions",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Viorix Digital Solutions",
    description:
      "Professional web development, mobile apps, e-commerce, UI/UX design, and digital marketing services to grow your business.",
    url: "https://www.viorix.co.uk/",
    images: [
      {
        url: "https://www.viorix.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viorix Digital Solutions",
    description:
      "Professional web development, mobile apps, e-commerce, UI/UX design, and digital marketing services.",
    site: "@ViorixDigital",
    images: ["https://www.viorix.co.uk/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.viorix.co.uk/",
  },
};

export default function Home() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Our Process Section */}
        <OurProcess />

        {/* Why Choose Us Section */}
        <WhyChooseUs />
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Viorix Digital Solutions",
            url: "https://www.viorix.co.uk/",
            logo: "https://www.viorix.co.uk/logo.png",
            sameAs: [
              "https://www.linkedin.com/company/viorix-digital-solutions",
              "https://twitter.com/ViorixDigital",
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+44-7-464-485026",
                contactType: "Customer Service",
                areaServed: "GB",
                availableLanguage: ["English"],
              },
            ],
          }),
        }}
      />
    </>
  );
}
