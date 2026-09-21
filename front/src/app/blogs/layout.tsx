import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "London Web Development Blog & Insights",
  description:
    "Web development, design and digital marketing insights from Viorix, a London web development agency helping UK businesses grow online.",
  keywords: [
    "web development blog london",
    "web design blog london",
    "london web development insights",
    "web development tips",
    "next.js blog",
    "digital marketing blog london",
  ],
  openGraph: {
    title: "Viorix Blog | Web Development & Design Insights",
    description:
      "Read the latest web development, design and digital marketing insights from Viorix Digital Solutions, London.",
    url: "https://viorix.co.uk/blogs",
    siteName: "Viorix Digital Solutions",
  },
  alternates: {
    canonical: "https://viorix.co.uk/blogs",
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
