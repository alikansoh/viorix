import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/invoice/"],
      },
    ],
    sitemap: "https://viorix.co.uk/sitemap.xml",
    host: "https://viorix.co.uk",
  };
}
