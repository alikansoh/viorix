import type { Metadata } from "next";
import DigitalMarketingContent from "./content"; // Your component showcasing digital marketing services

export const metadata: Metadata = {
  title: "Digital Marketing Services | Viorix Digital Solutions – UK Experts",
  description:
    "Boost your online presence with Viorix Digital Solutions' comprehensive digital marketing services. From SEO and PPC to social media and content marketing, we drive results.",
  openGraph: {
    title: "Digital Marketing by Viorix Digital Solutions",
    description:
      "Elevate your brand with Viorix Digital Solutions' expert digital marketing services, including SEO, PPC, social media, and content marketing strategies.",
    url: "https://viorix.co.uk/services/digital-marketing",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og.jpg", // Ensure this image is visually appealing and relevant
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Digital Marketing Services",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/digital-marketing",
  },
};

export default function DigitalMarketingPage() {
  return <DigitalMarketingContent />;
}
