import type { MetadataRoute } from "next";
import { servicePages, siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = ["", "/about", "/services", "/work", "/contact", "/privacy", "/terms"];

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...servicePages.map((service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
