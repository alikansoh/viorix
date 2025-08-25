import type { Metadata } from "next";
import ProjectsContent from "./content"; // your component showing projects

export const metadata: Metadata = {
  title: "Our Projects | Viorix Digital Solutions – UK Web & Digital Experts",
  description:
    "Explore our portfolio of web development, mobile apps, and digital solutions. See how Viorix Digital Solutions delivers innovative projects in the UK.",
  openGraph: {
    title: "Viorix Digital Solutions Projects",
    description:
      "Browse our projects showcasing web development, digital solutions, and custom apps delivered for clients across the UK.",
    url: "https://viorix.co.uk/projects",
    siteName: "Viorix Digital Solutions",
    images: [
      {
        url: "https://viorix.co.uk/og.jpg", 
        width: 1200,
        height: 630,
        alt: "Viorix Digital Solutions Projects Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "https://viorix.co.uk/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
