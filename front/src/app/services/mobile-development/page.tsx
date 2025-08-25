import type { Metadata } from "next";
import MobileDevContent from "./content"; // your component showing mobile development services

export const metadata: Metadata = {
  title: "Mobile App Development | Viorix Digital Solutions – UK Experts",
  description:
    "Professional mobile app development services in the UK. Viorix Digital Solutions creates custom Android and iOS apps with stunning UI/UX and seamless performance.",
  openGraph: {
    title: "Mobile App Development by Viorix Digital Solutions",
    description:
      "Build custom Android and iOS apps with Viorix Digital Solutions. High-performance, responsive mobile solutions tailored to your business needs.",
    url: "https://viorix.co.uk/services/mobile-development",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og.jpg", // create a visual OG image for this page
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Mobile Development Services",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/mobile-development",
  },
};

export default function MobileDevelopmentPage() {
  return <MobileDevContent />;
}
