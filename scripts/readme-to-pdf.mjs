#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const ROOT = process.cwd();
const README_PATH = path.join(ROOT, "README.md");
const REPORTS_DIR = path.join(ROOT, "reports");
const OUTPUT_PATH = path.join(REPORTS_DIR, "readme-site-guide.pdf");

function ensureReportsDir() {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }
}

function wrapLine(text, font, size, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const lines = [];
  let current = words[0];

  for (let index = 1; index < words.length; index += 1) {
    const next = `${current} ${words[index]}`;
    const width = font.widthOfTextAtSize(next, size);
    if (width <= maxWidth) {
      current = next;
    } else {
      lines.push(current);
      current = words[index];
    }
  }
  lines.push(current);

  return lines;
}

function sanitizeInlineMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
}

async function main() {
  if (!fs.existsSync(README_PATH)) {
    throw new Error(`README not found at ${README_PATH}`);
  }

  ensureReportsDir();
  const markdown = fs.readFileSync(README_PATH, "utf8").replace(/\r\n/g, "\n");
  const lines = markdown.split("\n");

  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  const pageWidth = 595.28; // A4 width in points
  const pageHeight = 841.89; // A4 height in points
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let cursorY = pageHeight - margin;
  let inCodeBlock = false;

  const ensureSpace = (needed = 18) => {
    if (cursorY - needed < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      cursorY = pageHeight - margin;
    }
  };

  const drawWrapped = (text, options = {}) => {
    const {
      size = 11,
      font = fontRegular,
      color = rgb(0, 0, 0),
      indent = 0,
      lineGap = 4,
    } = options;

    const wrapped = wrapLine(text, font, size, maxWidth - indent);
    const lineHeight = size + lineGap;

    wrapped.forEach((line) => {
      ensureSpace(lineHeight + 2);
      page.drawText(line, {
        x: margin + indent,
        y: cursorY - size,
        size,
        font,
        color,
      });
      cursorY -= lineHeight;
    });
  };

  // Title
  drawWrapped("J Luxe Website Readme Guide", {
    size: 18,
    font: fontBold,
    color: rgb(0, 0, 0),
    lineGap: 6,
  });
  cursorY -= 6;

  lines.forEach((rawLine) => {
    const line = rawLine ?? "";
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      cursorY -= 6;
      return;
    }

    if (inCodeBlock) {
      drawWrapped(line.length ? line : " ", {
        size: 9,
        font: fontMono,
        color: rgb(0.08, 0.08, 0.08),
        indent: 12,
        lineGap: 2,
      });
      return;
    }

    if (!trimmed) {
      cursorY -= 6;
      return;
    }

    if (trimmed.startsWith("# ")) {
      drawWrapped(sanitizeInlineMarkdown(trimmed.replace(/^#\s+/, "")), {
        size: 16,
        font: fontBold,
        lineGap: 5,
      });
      cursorY -= 4;
      return;
    }

    if (trimmed.startsWith("## ")) {
      drawWrapped(sanitizeInlineMarkdown(trimmed.replace(/^##\s+/, "")), {
        size: 13,
        font: fontBold,
        lineGap: 4,
      });
      cursorY -= 2;
      return;
    }

    if (trimmed.startsWith("### ")) {
      drawWrapped(sanitizeInlineMarkdown(trimmed.replace(/^###\s+/, "")), {
        size: 12,
        font: fontBold,
        lineGap: 4,
      });
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      drawWrapped(`- ${sanitizeInlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}`, {
        size: 10.5,
        indent: 10,
        lineGap: 3,
      });
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      drawWrapped(sanitizeInlineMarkdown(trimmed), {
        size: 10.5,
        indent: 10,
        lineGap: 3,
      });
      return;
    }

    drawWrapped(sanitizeInlineMarkdown(trimmed), {
      size: 10.5,
      lineGap: 3,
    });
  });

  cursorY -= 8;
  drawWrapped(`Generated: ${new Date().toLocaleString()}`, {
    size: 9,
    color: rgb(0.3, 0.3, 0.3),
  });

  const bytes = await pdfDoc.save({ useObjectStreams: false, addDefaultPage: false });
  fs.writeFileSync(OUTPUT_PATH, bytes);

  console.log(`README PDF generated: ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
