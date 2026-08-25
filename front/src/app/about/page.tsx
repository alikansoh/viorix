import type { Metadata } from "next";
import Content from "./content";

// ✅ Metadata
export const metadata: Metadata = {
  title: "About Us | London Web Development Agency | Viorix Digital Solutions",
  description:
    "Meet Viorix Digital Solutions — a London web development agency delivering custom websites, web apps, and digital solutions for UK startups and businesses.",
  keywords: [
    "about viorix digital solutions",
    "london web development agency",
    "web development company london",
    "web design team london",
    "UK web development company",
  ],
  openGraph: {
    title: "About Viorix Digital Solutions",
    description:
      "Discover how Viorix Digital Solutions provides innovative web development, digital solutions, and custom projects for businesses across the UK.",
    url: "https://viorix.co.uk/about",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og.jpg",
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/about",
  },
};

export default function AboutPage() {
  return <Content />;
}
