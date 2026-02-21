import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/src/lib/blog";

const siteUrl = "https://jluxemedicalaesthetics.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const staticRoutes = routes.map<MetadataRoute.Sitemap[number]>((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route === "/treatment" ? 0.9 : 0.8,
  }));

  const blogPosts = await getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
