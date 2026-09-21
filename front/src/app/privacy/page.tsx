import type { Metadata } from "next";
import Content from "./content";

const BASE_URL = "https://viorix.co.uk";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Viorix Digital Solutions collects, uses and protects your personal data across our website and services.",
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    type: "website",
    title: "Privacy Policy | Viorix Digital Solutions",
    description:
      "How Viorix Digital Solutions collects, uses and protects your personal data across our website and services.",
    url: `${BASE_URL}/privacy`,
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPageRoute() {
  return <Content />;
}
