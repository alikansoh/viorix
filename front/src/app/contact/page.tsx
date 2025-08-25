import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Contact Us | Viorix Digital Solutions",
  description:
    "Get in touch with Viorix Digital Solutions. We're here to help you with web development, digital solutions, and custom website projects in the UK.",
  openGraph: {
    title: "Contact Viorix Digital Solutions",
    description:
      "Reach out to Viorix Digital Solutions for modern web development and digital services in the UK.",
    url: "https://viorix.co.uk/contact",
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
    canonical: "https://viorix.co.uk/contact",
  },
};

export default function ContactPage() {
  return <Content />;
}
