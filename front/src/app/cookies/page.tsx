import type { Metadata } from "next";
import Content from "./content";

const BASE_URL = "https://viorix.co.uk";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "How Viorix Digital Solutions uses cookies to improve your browsing experience and the choices you have about them.",
  alternates: {
    canonical: `${BASE_URL}/cookies`,
  },
  openGraph: {
    type: "website",
    title: "Cookies Policy | Viorix Digital Solutions",
    description:
      "How Viorix Digital Solutions uses cookies to improve your browsing experience and the choices you have about them.",
    url: `${BASE_URL}/cookies`,
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

export default function CookiesPageRoute() {
  return <Content />;
}
