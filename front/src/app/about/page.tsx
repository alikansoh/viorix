import type { Metadata } from "next";
import Content from "./content";

// ✅ Metadata
export const metadata: Metadata = {
  title: "About Us | Viorix Digital Solutions",
  description:
    "Learn more about Viorix Digital Solutions — our mission, vision, values, and commitment to delivering top-notch web and digital services in the UK.",
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
