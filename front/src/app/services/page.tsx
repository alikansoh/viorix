import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Code2, Smartphone, Palette, TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Web Development Services London | Viorix Digital Solutions",
  description:
    "London web development agency services: custom web development, mobile app development, UI/UX design, and digital marketing. Get a free consultation today.",
  keywords: [
    "web development services london",
    "web design agency london",
    "app development services london",
    "ui ux design services london",
    "digital marketing services london",
    "london digital agency services",
    "website development company london",
  ],
  openGraph: {
    title: "Our Services | Viorix Digital Solutions",
    description:
      "Explore Viorix Digital Solutions' web development, mobile app, UI/UX design and digital marketing services for London and UK businesses.",
    url: "https://viorix.co.uk/services",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Services",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/services",
  },
};

const services = [
  {
    href: "/services/web-development",
    icon: Code2,
    title: "Web Development",
    description:
      "Custom websites and web apps built with Next.js & React for London and UK businesses — fast, responsive and SEO-friendly.",
  },
  {
    href: "/services/mobile-development",
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform iOS & Android apps designed and built by our London app development team.",
  },
  {
    href: "/services/ui-ux-design",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centred UI/UX design services — wireframes, prototypes and interfaces that convert visitors into customers.",
  },
  {
    href: "/services/digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "SEO, PPC and social media marketing services helping London businesses grow visibility and revenue.",
  },
];

const faqs = [
  {
    question: "What web development services does Viorix offer in London?",
    answer:
      "Viorix Digital Solutions offers custom web development, mobile app development (iOS & Android), UI/UX design, and digital marketing (SEO, PPC, social media) for businesses across London and the UK, built primarily with Next.js and React.",
  },
  {
    question: "How much does a website cost with a London web development agency?",
    answer:
      "Costs vary by scope, but a bespoke business website typically starts from a few thousand pounds, while complex web applications or e-commerce platforms cost more. Viorix offers a free consultation to scope your project and provide an accurate quote.",
  },
  {
    question: "Does Viorix build mobile apps as well as websites?",
    answer:
      "Yes. Viorix builds native and cross-platform iOS and Android apps alongside web development, so businesses can get a unified web and mobile experience from one team.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "A typical custom website project takes 4-8 weeks from discovery to launch, depending on complexity. Larger web applications or e-commerce builds can take longer. Viorix provides a project timeline during the initial consultation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function ServicesPage() {
  return (
    <main className="bg-black text-white py-24 px-6">
      {/* FAQ Schema - JSON-LD */}
      <Script
        id="ld-json-services-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Web Development &amp; Digital Services in London
        </h1>
        <p className="text-gray-400 max-w-2xl mb-12 text-lg">
          Viorix Digital Solutions is a London web development agency helping
          startups and enterprises build custom websites, mobile apps, and
          digital marketing strategies that deliver results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ href, icon: Icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="group border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-colors"
            >
              <Icon className="w-8 h-8 mb-4 text-white" />
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-400 mb-4">{description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Learn more{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* FAQ Section - visible content matching the FAQPage schema above */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl">
            {faqs.map((faq) => (
              <div key={faq.question} className="border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
