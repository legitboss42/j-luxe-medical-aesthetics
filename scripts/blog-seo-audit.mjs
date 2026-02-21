#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DEFAULTS = {
  dir: "content/blog",
  minWords: 1500,
  densityMin: 0.5,
  densityMax: 2.5,
  minInternalLinks: 3,
  json: false,
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeSlugLike(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toBool(value) {
  return value === "true" || value === "1";
}

function parseArgs(argv) {
  const options = { ...DEFAULTS };

  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [rawKey, rawValue] = arg.slice(2).split("=");
    const key = rawKey.trim();
    const value = (rawValue ?? "").trim();

    if (key === "dir" && value) options.dir = value;
    if (key === "min-words" && value) options.minWords = Number(value);
    if (key === "density-min" && value) options.densityMin = Number(value);
    if (key === "density-max" && value) options.densityMax = Number(value);
    if (key === "min-internal-links" && value) {
      options.minInternalLinks = Number(value);
    }
    if (key === "json") options.json = value ? toBool(value) : true;
  }

  return options;
}

function getFirstParagraph(content) {
  const blocks = content.split(/\r?\n\r?\n/).map((chunk) => chunk.trim());
  for (const block of blocks) {
    if (!block) continue;
    if (/^#/.test(block)) continue;
    if (/^!\[/.test(block)) continue;
    if (/^\[LEAD\|/.test(block)) continue;
    if (/^[-*+]\s/.test(block)) continue;
    if (/^\d+\.\s/.test(block)) continue;
    if (/^>/.test(block)) continue;
    if (/^\|/.test(block)) continue;
    return block.replace(/\s+/g, " ").toLowerCase();
  }
  return "";
}

function getPlainText(content) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+]\([^)]+\)/g, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/[#>*_|~]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function countWords(plainText) {
  const matches = plainText.match(/\b[\p{L}\p{N}'-]+\b/gu);
  return matches ? matches.length : 0;
}

function makePhraseRegex(phrase) {
  const escaped = phrase
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => escapeRegExp(term))
    .join("\\s+");

  if (!escaped) return null;
  return new RegExp(`\\b${escaped}\\b`, "gi");
}

function countPhraseMatches(text, regex) {
  if (!regex) return 0;
  return [...text.matchAll(regex)].length;
}

function countInternalLinks(content) {
  const markdownLinks = [...content.matchAll(/\[[^\]]+]\((\/[^)\s]+)\)/g)].length;
  const htmlLinks = [...content.matchAll(/<a\s+[^>]*href=["'](\/[^"']+)["']/gi)].length;
  return markdownLinks + htmlLinks;
}

function scorePost(filePath, options) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const title = String(data.title ?? "").trim();
  const metaTitle = String(data.metaTitle ?? "").trim();
  const metaDescription = String(data.metaDescription ?? "").trim();
  const primaryKeyword = String(data.primaryKeyword ?? "").trim().toLowerCase();
  const slug = String(data.slug ?? path.basename(filePath, ".md")).trim();

  const firstParagraph = getFirstParagraph(content);
  const h1Match = content.match(/^#\s+(.+)$/m);
  const h1 = h1Match ? h1Match[1].trim().toLowerCase() : "";
  const heroImageMatch = content.match(/!\[([^\]]+)]\((\/images\/blog\/[^)]+)\)/i);
  const heroAlt = heroImageMatch ? heroImageMatch[1].trim().toLowerCase() : "";

  const plainText = getPlainText(content);
  const wordCount = countWords(plainText);
  const phraseRegex = makePhraseRegex(primaryKeyword);
  const phraseMatches = countPhraseMatches(plainText, phraseRegex);
  const phraseWordCount = primaryKeyword.split(/\s+/).filter(Boolean).length || 1;
  const density = wordCount
    ? Number((((phraseMatches * phraseWordCount) / wordCount) * 100).toFixed(2))
    : 0;
  const internalLinks = countInternalLinks(content);

  const normalizedSlug = normalizeSlugLike(slug);
  const normalizedKeyword = normalizeSlugLike(primaryKeyword);
  const slugAligned = normalizedSlug.includes(normalizedKeyword)
    || normalizedKeyword.includes(normalizedSlug);

  const keywordInTitle = title.toLowerCase().includes(primaryKeyword);
  const keywordInMetaTitle = metaTitle.toLowerCase().includes(primaryKeyword);
  const keywordInMetaDesc = metaDescription.toLowerCase().includes(primaryKeyword);
  const keywordInH1 = h1.includes(primaryKeyword);
  const keywordInFirstPara = phraseRegex ? phraseRegex.test(firstParagraph) : false;
  const heroAltHasKeyword = phraseRegex ? phraseRegex.test(heroAlt) : false;

  const checks = {
    keywordInTitle,
    keywordInMetaTitle,
    metaTitleLen: metaTitle.length >= 45 && metaTitle.length <= 65,
    keywordInMetaDesc,
    metaDescLen: metaDescription.length >= 120 && metaDescription.length <= 160,
    slugAligned,
    keywordInH1,
    keywordInFirstPara,
    keywordDensityRange: density >= options.densityMin && density <= options.densityMax,
    internalLinksMin: internalLinks >= options.minInternalLinks,
    heroAltHasKeyword,
    wordsMin: wordCount >= options.minWords,
  };

  const failed = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);

  const passed = Object.keys(checks).length - failed.length;
  const score = Math.round((passed / Object.keys(checks).length) * 100);

  return {
    file: path.basename(filePath),
    slug,
    primaryKeyword,
    wordCount,
    density,
    phraseMatches,
    internalLinks,
    metaTitleLen: metaTitle.length,
    metaDescLen: metaDescription.length,
    score,
    checks,
    failed,
  };
}

function printSummary(results, options) {
  const tableRows = results.map((result) => ({
    file: result.file,
    score: `${result.score}%`,
    words: result.wordCount,
    density: `${result.density}%`,
    links: result.internalLinks,
    metaTitle: result.metaTitleLen,
    metaDesc: result.metaDescLen,
    failed: result.failed.length,
  }));

  console.log("");
  console.log("Blog SEO Audit");
  console.log(`dir=${options.dir}`);
  console.log(
    `thresholds: minWords=${options.minWords}, density=${options.densityMin}-${options.densityMax}%, minInternalLinks=${options.minInternalLinks}`,
  );
  console.table(tableRows);

  for (const result of results) {
    if (!result.failed.length) continue;
    console.log(`${result.file}: ${result.failed.join(", ")}`);
  }

  const averageScore = Math.round(
    results.reduce((sum, row) => sum + row.score, 0) / (results.length || 1),
  );
  const fullPass = results.filter((row) => row.failed.length === 0).length;
  console.log("");
  console.log(`Overall: ${fullPass}/${results.length} posts passed all checks, average score ${averageScore}%`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const blogDir = path.resolve(process.cwd(), options.dir);

  if (!fs.existsSync(blogDir)) {
    console.error(`Directory not found: ${blogDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .sort();

  if (!files.length) {
    console.error(`No markdown blog posts found in ${blogDir}`);
    process.exit(1);
  }

  const results = [];
  for (const file of files) {
    const fullPath = path.join(blogDir, file);
    try {
      results.push(scorePost(fullPath, options));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to audit ${file}: ${message}`);
      process.exitCode = 1;
      return;
    }
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  printSummary(results, options);
}

main();
