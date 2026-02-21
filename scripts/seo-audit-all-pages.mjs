#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import matter from "gray-matter";
import { load } from "cheerio";
import PDFDocument from "pdfkit";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "src", "app");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const REPORT_DIR = path.join(ROOT, "reports");
const PORT = Number(process.env.SEO_AUDIT_PORT || 4010);
let BASE_URL = process.env.SEO_AUDIT_BASE_URL || `http://127.0.0.1:${PORT}`;

const GENERIC_THRESHOLDS = {
  titleMin: 35,
  titleMax: 65,
  metaMin: 120,
  metaMax: 160,
  minInternalLinks: 3,
  minWords: 250,
};

function isIgnoredAppSegment(segment) {
  return (
    !segment
    || segment.startsWith("(")
    || segment.startsWith("@")
    || segment === "api"
    || segment === "_components"
  );
}

function walkDirRecursive(dirPath) {
  const out = [];
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkDirRecursive(full));
      continue;
    }
    out.push(full);
  }
  return out;
}

function discoverStaticRoutes() {
  const files = walkDirRecursive(APP_DIR).filter((full) => full.endsWith("page.tsx"));
  const routes = new Set();

  for (const file of files) {
    const relDir = path
      .relative(APP_DIR, path.dirname(file))
      .split(path.sep)
      .filter((segment) => !isIgnoredAppSegment(segment))
      .join("/");

    if (relDir.includes("[")) {
      continue;
    }

    const route = relDir ? `/${relDir}` : "/";
    routes.add(route);
  }

  return [...routes].sort();
}

function discoverBlogRoutes() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const routes = [];
  for (const file of fs.readdirSync(BLOG_DIR).sort()) {
    if (!file.endsWith(".md")) continue;
    if (file.startsWith("_")) continue;
    const full = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data } = matter(raw);
    if (!data?.title) continue;
    const slug = String(data.slug || file.replace(/\.md$/, ""));
    routes.push(`/blog/${slug}`);
  }

  return routes;
}

function runCommandCapture(command, args) {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === "win32";
    const bin = isWin ? `${command}.cmd` : command;
    const child = spawn(bin, args, { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`${command} ${args.join(" ")} failed (${code})\n${stderr}`));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

async function getBlogKeywordAuditMap() {
  try {
    const json = await runCommandCapture("node", [
      "scripts/blog-seo-audit.mjs",
      "--json=true",
    ]);
    const parsed = JSON.parse(json);
    const map = new Map();
    for (const item of parsed) {
      map.set(`/blog/${item.slug}`, item);
    }
    return map;
  } catch {
    return new Map();
  }
}

async function probeServer(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function waitForServer(devChild, timeoutMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (devChild.exitCode !== null) {
      throw new Error(`Dev server exited early.\n${devChild.__logs?.() || ""}`);
    }
    try {
      const res = await fetch(BASE_URL, { redirect: "follow" });
      if (res.status < 500) return;
    } catch {
      // ignore until ready
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
  throw new Error(`Timed out waiting for dev server at ${BASE_URL}\n${devChild.__logs?.() || ""}`);
}

function startDevServer() {
  const isWin = process.platform === "win32";
  const child = isWin
    ? spawn(`npm run dev -- -p ${PORT}`, {
      cwd: ROOT,
      env: process.env,
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    })
    : spawn("npm", ["run", "dev", "--", "-p", String(PORT)], {
      cwd: ROOT,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

  let logs = "";
  child.stdout.on("data", (chunk) => {
    logs += chunk.toString();
    if (logs.length > 12000) logs = logs.slice(-12000);
  });
  child.stderr.on("data", (chunk) => {
    logs += chunk.toString();
    if (logs.length > 12000) logs = logs.slice(-12000);
  });
  child.__logs = () => logs;
  return child;
}

function stopDevServer(child) {
  if (!child || child.killed) return;
  child.kill("SIGTERM");
}

function scoreGenericSeo(metrics) {
  const checks = {
    statusOk: metrics.status === 200,
    titleLen:
      metrics.titleLength >= GENERIC_THRESHOLDS.titleMin
      && metrics.titleLength <= GENERIC_THRESHOLDS.titleMax,
    metaDescLen:
      metrics.metaDescriptionLength >= GENERIC_THRESHOLDS.metaMin
      && metrics.metaDescriptionLength <= GENERIC_THRESHOLDS.metaMax,
    singleH1: metrics.h1Count === 1,
    canonicalExists: Boolean(metrics.canonical),
    indexable: !/noindex/i.test(metrics.robots || ""),
    openGraph: Boolean(metrics.ogTitle) && Boolean(metrics.ogDescription),
    internalLinksMin: metrics.internalLinks >= GENERIC_THRESHOLDS.minInternalLinks,
    imageAltCoverage: metrics.imageCount === 0 || metrics.imagesMissingAlt === 0,
    wordsMin: metrics.wordCount >= GENERIC_THRESHOLDS.minWords,
  };

  const failed = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([key]) => key);
  const score = Math.round(((Object.keys(checks).length - failed.length) / Object.keys(checks).length) * 100);
  return { checks, failed, score };
}

function recommendationFor(checkKey) {
  const map = {
    statusOk: "Ensure route returns HTTP 200 and resolves without runtime errors.",
    titleLen: "Set an SEO title between 35 and 65 characters with the page keyword near the start.",
    metaDescLen: "Set meta description to 120-160 characters with clear intent and CTA.",
    singleH1: "Use exactly one H1 on the page and keep section headings as H2/H3.",
    canonicalExists: "Define a canonical URL in metadata to prevent duplicate indexing issues.",
    indexable: "Remove noindex from pages you want to rank.",
    openGraph: "Add Open Graph title and description for social sharing consistency.",
    internalLinksMin: "Add at least 3 contextual internal links to related pages.",
    imageAltCoverage: "Add descriptive alt text to all meaningful images (keyword-aware where appropriate).",
    wordsMin: "Increase body copy to at least 250 words for thin pages.",
    blogKeywordScore: "Improve keyword placement and content optimization in the blog checker report.",
  };
  return map[checkKey] || "Review and optimize this check for stronger on-page SEO.";
}

function extractMetricsFromHtml(route, status, html) {
  const $ = load(html);
  const title = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || "";
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || "";
  const robots = $('meta[name="robots"]').attr("content")?.trim() || "";
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim() || "";
  const ogDescription = $('meta[property="og:description"]').attr("content")?.trim() || "";
  const h1Count = $("h1").length;
  const mainText = $("main").text().replace(/\s+/g, " ").trim();
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const text = mainText || bodyText;
  const words = text ? (text.match(/\b[\p{L}\p{N}'-]+\b/gu) || []).length : 0;
  const internalLinks = $("a")
    .toArray()
    .map((el) => $(el).attr("href") || "")
    .filter((href) => href.startsWith("/") || href.startsWith(BASE_URL)).length;
  const imageCount = $("img").length;
  const imagesMissingAlt = $("img")
    .toArray()
    .filter((el) => !($(el).attr("alt") || "").trim()).length;
  const ldJsonCount = $('script[type="application/ld+json"]').length;

  return {
    route,
    status,
    title,
    titleLength: title.length,
    metaDescription,
    metaDescriptionLength: metaDescription.length,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    h1Count,
    wordCount: words,
    internalLinks,
    imageCount,
    imagesMissingAlt,
    ldJsonCount,
  };
}

async function auditRoute(route) {
  const url = `${BASE_URL}${route}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    return extractMetricsFromHtml(route, res.status, html);
  } catch (error) {
    return {
      route,
      status: 0,
      title: "",
      titleLength: 0,
      metaDescription: "",
      metaDescriptionLength: 0,
      canonical: "",
      robots: "",
      ogTitle: "",
      ogDescription: "",
      h1Count: 0,
      wordCount: 0,
      internalLinks: 0,
      imageCount: 0,
      imagesMissingAlt: 0,
      ldJsonCount: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function ensureReportDir() {
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }
}

function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
}

function writePdfReport(reportPath, audited) {
  const doc = new PDFDocument({ size: "A4", margin: 42 });
  const stream = fs.createWriteStream(reportPath);
  doc.pipe(stream);

  const avg = Math.round(audited.reduce((sum, row) => sum + row.finalScore, 0) / (audited.length || 1));
  const lowCount = audited.filter((row) => row.finalScore < 85).length;

  doc.fontSize(20).text("J Luxe SEO Audit Feedback");
  doc.moveDown(0.35);
  doc.fontSize(10).fillColor("#444").text(`Generated: ${new Date().toLocaleString()}`);
  doc.text(`Pages audited: ${audited.length}`);
  doc.text(`Average score: ${avg}%`);
  doc.text(`Pages below 85%: ${lowCount}`);
  doc.moveDown();
  doc.fillColor("#000");

  for (const row of audited) {
    if (doc.y > 710) {
      doc.addPage();
    }
    doc.fontSize(12).text(`${row.route} - ${row.finalScore}%`, { underline: true });
    doc.fontSize(9).text(
      `Status ${row.metrics.status} | Title ${row.metrics.titleLength} | Meta ${row.metrics.metaDescriptionLength} | H1 ${row.metrics.h1Count} | Words ${row.metrics.wordCount} | Links ${row.metrics.internalLinks} | Missing Alt ${row.metrics.imagesMissingAlt}/${row.metrics.imageCount}`,
    );

    if (row.failed.length === 0) {
      doc.fillColor("#2f7d32").fontSize(9).text("All checks passed.");
      doc.fillColor("#000");
      doc.moveDown(0.35);
      continue;
    }

    doc.fontSize(9).text("Top fixes:");
    for (const failed of row.failed.slice(0, 5)) {
      doc.text(`- ${recommendationFor(failed)}`);
    }
    doc.moveDown(0.5);
  }

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function main() {
  ensureReportDir();

  const staticRoutes = discoverStaticRoutes();
  const blogRoutes = discoverBlogRoutes();
  const allRoutes = [...new Set([...staticRoutes, ...blogRoutes])];
  const blogKeywordMap = await getBlogKeywordAuditMap();

  let dev = null;

  try {
    const defaultTargetAlive = await probeServer(BASE_URL);
    if (!defaultTargetAlive) {
      const existing3000 = await probeServer("http://127.0.0.1:3000");
      if (existing3000) {
        BASE_URL = "http://127.0.0.1:3000";
      } else {
        dev = startDevServer();
        await waitForServer(dev);
      }
    }

    const results = [];
    for (const route of allRoutes) {
      // eslint-disable-next-line no-await-in-loop
      const metrics = await auditRoute(route);
      const generic = scoreGenericSeo(metrics);
      const blogAudit = blogKeywordMap.get(route);

      const failed = [...generic.failed];
      let finalScore = generic.score;

      if (blogAudit) {
        const blogKeywordScore = Number(blogAudit.score || 0);
        if (blogKeywordScore < 85) {
          failed.push("blogKeywordScore");
        }
        finalScore = Math.round((generic.score + blogKeywordScore) / 2);
      }

      results.push({
        route,
        metrics,
        genericScore: generic.score,
        finalScore,
        failed,
      });
    }

    const sorted = results.sort((a, b) => a.finalScore - b.finalScore);
    const stamp = timestamp();
    const jsonPath = path.join(REPORT_DIR, `seo-audit-all-pages-${stamp}.json`);
    const pdfPath = path.join(REPORT_DIR, `seo-audit-all-pages-${stamp}.pdf`);

    fs.writeFileSync(jsonPath, JSON.stringify(sorted, null, 2), "utf8");
    await writePdfReport(pdfPath, sorted);

    const avg = Math.round(sorted.reduce((sum, row) => sum + row.finalScore, 0) / (sorted.length || 1));
    const lowPages = sorted.filter((row) => row.finalScore < 85).map((row) => row.route);

    console.log(`Audit complete. Pages: ${sorted.length}, avg score: ${avg}%`);
    console.log(`JSON: ${jsonPath}`);
    console.log(`PDF: ${pdfPath}`);
    if (lowPages.length) {
      console.log(`Below 85%: ${lowPages.join(", ")}`);
    } else {
      console.log("All pages are 85%+");
    }
  } finally {
    if (dev) {
      stopDevServer(dev);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
