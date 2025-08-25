import type { Metadata } from "next";
import WebDevContent from "./content"; // your component showing web development services

export const metadata: Metadata = {
  title: "Web Development Services | Viorix Digital Solutions – UK Experts",
  description:
    "Professional web development services in the UK. Viorix Digital Solutions delivers custom websites, responsive design, and modern web apps tailored to your business.",
  openGraph: {
    title: "Web Development by Viorix Digital Solutions",
    description:
      "Custom web development services in the UK. Build responsive, high-performance websites and web apps with Viorix Digital Solutions.",
    url: "https://viorix.co.uk/services/web-development",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og.jpg", // create a visually appealing OG image for this service
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Web Development Services",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/web-development",
  },
};

export default function WebDevelopmentPage() {
  return <WebDevContent />;
}
