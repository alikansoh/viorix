// app/about/page.js  (server component)
import AboutUs from "./AboutUs";

export const metadata = {
  title: "About Viorix Digital Solutions | Web Development & Digital Marketing",
  description:
    "Learn about Viorix Digital Solutions: innovation, collaboration, reliability, and growth in web development, mobile apps, and digital marketing.",
};

export default function AboutPage() {
  return <AboutUs />; 
}
