import type { MetadataRoute } from "next";

const siteUrl = "https://jluxemedicalaesthetics.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "/",
    "/about-us",
    "/treatment",
    "/facials",
    "/body-sculpting-2",
    "/fillers",
    "/anti-wrinkle-injection",
    "/skin-boosters-mesotherapy",
    "/prp-treatment",
    "/exosomes",
    "/chemical-peels",
    "/iv-vitamin-drip",
    "/teeth-whitening",
    "/waxing",
    "/pricing",
    "/blog",
    "/training",
    "/refer-a-friend",
    "/contact-us",
    "/terms-of-use",
    "/privacy-policy",
    "/complaints-policy",
    "/booking-cancellation-policy",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route === "/treatment" ? 0.9 : 0.8,
  }));
}
