import type { Metadata } from "next";
import Content from "./content";

const BASE_URL = "https://viorix.co.uk";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing use of the Viorix Digital Solutions website and our web development, app and digital marketing services.",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    type: "website",
    title: "Terms & Conditions | Viorix Digital Solutions",
    description:
      "The terms and conditions governing use of the Viorix Digital Solutions website and our services.",
    url: `${BASE_URL}/terms`,
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

export default function TermsPageRoute() {
  return <Content />;
}
