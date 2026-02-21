#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const ROOT = process.cwd();
const README_PATH = path.join(ROOT, "README.md");
const REPORTS_DIR = path.join(ROOT, "reports");
const OUTPUT_PATH = path.join(REPORTS_DIR, "readme-site-guide.pdf");

function ensureReportsDir() {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }
}

function normalizeMarkdownToReadableText(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/^```[\s\S]*?^```/gm, (block) => block.replace(/```/g, "").trim())
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "- ")
    .replace(/^\s*\d+\.\s+/gm, (match) => match.trimStart())
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  if (!fs.existsSync(README_PATH)) {
    throw new Error(`README not found at ${README_PATH}`);
  }

  ensureReportsDir();
  const content = fs.readFileSync(README_PATH, "utf8");
  const readable = normalizeMarkdownToReadableText(content);

  const doc = new PDFDocument({ size: "A4", margin: 52, compress: false });
  const stream = fs.createWriteStream(OUTPUT_PATH);
  doc.pipe(stream);

  const paintPageBackground = () => {
    doc.save();
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#FFFFFF");
    doc.restore();
  };

  paintPageBackground();
  doc.on("pageAdded", paintPageBackground);

  doc.font("Times-Bold").fontSize(18).fillColor("black").text("J Luxe Website Readme Guide");
  doc.moveDown(0.3);
  doc.strokeColor("#444").lineWidth(0.5).moveTo(doc.x, doc.y).lineTo(540, doc.y).stroke();
  doc.moveDown(0.8);

  doc.font("Times-Roman").fontSize(11).fillColor("black").text(readable, {
    align: "left",
    lineGap: 2,
  });

  doc.moveDown(0.9);
  doc.font("Times-Italic").fontSize(9).fillColor("#444").text(`Generated: ${new Date().toLocaleString()}`);

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`README PDF generated: ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
