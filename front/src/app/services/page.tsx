import type { Metadata } from "next";
import Link from "next/link";
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
        url: "https://viorix.co.uk/og-image.jpg",
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

export default function ServicesPage() {
  return (
    <main className="bg-black text-white py-24 px-6">
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
      </div>
    </main>
  );
}
