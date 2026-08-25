import type { Metadata } from "next";
import UIUXContent from "./content"; // Your component showcasing UI/UX design services

export const metadata: Metadata = {
  title: "UI/UX Design Services London | Viorix Digital Solutions",
  description:
    "London-based UI/UX design agency. Viorix Digital Solutions creates intuitive interfaces, user research and seamless digital experiences for websites and apps.",
  keywords: [
    "ui ux design london",
    "ux design agency london",
    "ui design services london",
    "product design london",
    "user experience design london",
    "website design london",
    "app design london",
    "wireframing services london",
    "user research london",
    "figma designers london",
  ],
  openGraph: {
    title: "UI/UX Design by Viorix Digital Solutions",
    description:
      "Discover how Viorix Digital Solutions crafts user-centered UI/UX designs that elevate user satisfaction and drive business success.",
    url: "https://viorix.co.uk/services/ui-ux-design",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/ogn.jpg", // Create a visually appealing OG image for this service
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions UI/UX Design Services",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/services/ui-ux-design",
  },
};

export default function UIUXDesignPage() {
  return <UIUXContent />;
}
