import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

type FrontmatterData = {
  title?: string;
  excerpt?: string;
  date?: string;
  category?: string;
  tags?: string[];
  readTime?: string;
  cover?: string;
  slug?: string;
  featured?: boolean;
  author?: string;
  heroImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
};

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateLabel: string;
  publishedAt: string;
  author: string;
  imageSrc: string;
  featured: boolean;
  tags: string[];
  readTime: string;
  primaryKeyword?: string;
};

export type BlogPost = BlogPostSummary & {
  htmlContent: string;
  heroImageSrc: string;
  metaTitle?: string;
  metaDescription?: string;
  secondaryKeywords: string[];
};

function toDateLabel(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.valueOf())) return date;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getBaseSummary(data: FrontmatterData, fallbackSlug: string): BlogPostSummary {
  const publishedAt = data.date ?? new Date().toISOString().slice(0, 10);
  const resolvedSlug = typeof data.slug === "string" && data.slug.trim().length > 0
    ? data.slug.trim()
    : fallbackSlug;

  return {
    id: resolvedSlug,
    slug: resolvedSlug,
    title: data.title ?? "Untitled Article",
    excerpt: data.excerpt ?? "",
    category: data.category ?? "General",
    dateLabel: toDateLabel(publishedAt),
    publishedAt,
    author: data.author ?? "J Luxe Team",
    imageSrc: data.cover ?? "/images/heroBackground.png",
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: data.readTime ?? "8 min read",
    primaryKeyword: data.primaryKeyword,
  };
}

function sortByDateDesc<T extends { publishedAt: string }>(posts: T[]) {
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf(),
  );
}

async function safeReadDir(dirPath: string) {
  try {
    return await fs.readdir(dirPath);
  } catch {
    return [];
  }
}

function renderLeadMagnetToken(markdown: string) {
  const leadRegex = /\[LEAD\|([^|\]]+)\|([^\]]+)\]/g;
  const leadHeadingRegex = /^\s*##\s*Lead\s+magnet\s*$/gim;
  const imagePromptsSectionRegex = /(?:^|\n)##\s*Image\s+generation\s+prompts[\s\S]*?(?=\n##\s+|$)/i;

  const withoutLeadHeading = markdown.replace(leadHeadingRegex, "").trim();
  const withoutImagePrompts = withoutLeadHeading.replace(imagePromptsSectionRegex, "").trim();

  return withoutImagePrompts.replace(leadRegex, (_match, title, href) => {
    return [
      '<div class="lead-magnet">',
      '<p class="lead-magnet-kicker">Free Resource</p>',
      `<h3>${title}</h3>`,
      `<a href="${href}">Download Now</a>`,
      "</div>",
    ].join("");
  });
}

function extractFirstMarkdownImageSrc(markdown: string) {
  const imageMatch = markdown.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return imageMatch?.[1]?.trim() || "";
}

function isMarkdownPostFile(fileName: string) {
  return fileName.endsWith(".md") && !fileName.startsWith("_");
}

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const files = await safeReadDir(BLOG_CONTENT_DIR);
  const markdownFiles = files.filter(isMarkdownPostFile);

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContent);
      const fallbackSlug = fileName.replace(/\.md$/, "");
      const frontmatter = data as FrontmatterData;

      // Skip utility/placeholder markdown files that are not actual blog posts.
      if (!frontmatter.title) {
        return null;
      }

      return getBaseSummary(frontmatter, fallbackSlug);
    }),
  );

  const publishablePosts = posts.filter((post): post is BlogPostSummary => post !== null);

  return sortByDateDesc(publishablePosts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug || slug.startsWith("_")) {
    return null;
  }

  const files = await safeReadDir(BLOG_CONTENT_DIR);
  const markdownFiles = files.filter(isMarkdownPostFile);

  for (const fileName of markdownFiles) {
    const fullPath = path.join(BLOG_CONTENT_DIR, fileName);

    try {
      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(fileContent);
      const frontmatter = data as FrontmatterData;

      if (!frontmatter.title) {
        continue;
      }

      const fallbackSlug = fileName.replace(/\.md$/, "");
      const resolvedSlug = typeof frontmatter.slug === "string" && frontmatter.slug.trim().length > 0
        ? frontmatter.slug.trim()
        : fallbackSlug;

      if (resolvedSlug !== slug) {
        continue;
      }

      const summary = getBaseSummary(frontmatter, fallbackSlug);
      const heroImageSrc =
        (frontmatter.heroImage ?? "").trim() ||
        extractFirstMarkdownImageSrc(content) ||
        summary.imageSrc;

      const markdownWithLead = renderLeadMagnetToken(content);
      const processed = await remark()
        .use(html, { sanitize: false })
        .process(markdownWithLead);
      const normalizedHtml = processed
        .toString()
        .replace(/<h1(\b[^>]*)>/g, "<h2$1>")
        .replace(/<\/h1>/g, "</h2>");

      return {
        ...summary,
        htmlContent: normalizedHtml,
        heroImageSrc,
        metaTitle: frontmatter.metaTitle,
        metaDescription: frontmatter.metaDescription,
        secondaryKeywords: Array.isArray(frontmatter.secondaryKeywords)
          ? frontmatter.secondaryKeywords
          : [],
      };
    } catch {
      continue;
    }
  }

  return null;
}

export async function getBlogSlugs() {
  const files = await safeReadDir(BLOG_CONTENT_DIR);
  const markdownFiles = files.filter(isMarkdownPostFile);

  const slugs = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContent);
      const frontmatter = data as FrontmatterData;

      if (!frontmatter.title) {
        return null;
      }

      const fallbackSlug = fileName.replace(/\.md$/, "");
      const resolvedSlug = typeof frontmatter.slug === "string" && frontmatter.slug.trim().length > 0
        ? frontmatter.slug.trim()
        : fallbackSlug;

      return resolvedSlug;
    }),
  );

  return slugs.filter((slug): slug is string => slug !== null);
}
