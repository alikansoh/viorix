import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script"; // 👈 لازم تستورد Script

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Viorix Digital Solutions | Web Development & Digital Services",
    template: "%s | Viorix Digital Solutions",
  },
  description:
    "Viorix Digital Solutions helps businesses in the UK build modern, scalable, and high-performing websites and digital solutions. Based in London.",
  keywords: [
    "Viorix",
    "Viorix Digital Solutions",
    "web development UK",
    "custom websites",
    "London web agency",
    "Next.js development",
    "digital solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://viorix.co.uk",
    siteName: "Viorix Digital Solutions",
    title: "Viorix Digital Solutions | Web Development & Digital Services",
    description:
      "We build modern, scalable websites and digital solutions for UK businesses. Viorix – your trusted partner in London.",
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
    canonical: "https://viorix.co.uk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WTB9BL73X4"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WTB9BL73X4');
          `}
        </Script>
      </head>
      <body className="font-sans">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
