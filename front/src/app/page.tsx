// app/page.js (Next.js 13+ using the App Router)
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import WhyChooseUs from "./Components/WhyUs";
import OurProcess from "./Components/OurProcess";



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
