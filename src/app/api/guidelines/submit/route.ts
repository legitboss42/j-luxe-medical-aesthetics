import { randomUUID } from "node:crypto";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage } from "pdf-lib";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type FieldValue = string | string[];

type GuidelineFieldBlueprintItem = {
  name: string;
  label: string;
  section: string;
  order: number;
};

type GuidelineContentBlueprintItem = {
  kind: "heading" | "subheading" | "paragraph" | "bullet" | "label";
  text: string;
  section: string;
  order: number;
};

type GuidelineSubmissionPayload = {
  treatmentName?: unknown;
  treatmentPath?: unknown;
  template?: unknown;
  guidelinesTitle?: unknown;
  submittedAt?: unknown;
  data?: unknown;
  fieldBlueprint?: unknown;
  contentBlueprint?: unknown;
};

type EmailDeliveryResult = {
  enabled: boolean;
  ok: boolean;
  skipped?: boolean;
  message: string;
};

const PAGE = {
  width: 595.28,
  height: 841.89,
  marginX: 48,
  marginTop: 52,
  marginBottom: 48,
};

function toSingleString(value: FieldValue | undefined): string {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.find((item) => item.trim().length > 0)?.trim() ?? "";
  }

  return value.trim();
}

function normalizeData(input: unknown): Record<string, FieldValue> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }

  const normalized: Record<string, FieldValue> = {};

  for (const [rawKey, rawValue] of Object.entries(input as Record<string, unknown>)) {
    const key = rawKey.trim();
    if (!key) {
      continue;
    }

    if (typeof rawValue === "string") {
      const value = rawValue.trim();
      if (value) {
        normalized[key] = value;
      }
      continue;
    }

    if (Array.isArray(rawValue)) {
      const values = rawValue
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      if (values.length === 1) {
        normalized[key] = values[0];
      } else if (values.length > 1) {
        normalized[key] = values;
      }
    }
  }

  return normalized;
}

function normalizeFieldBlueprint(input: unknown): GuidelineFieldBlueprintItem[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const items = input
    .map((item): GuidelineFieldBlueprintItem | null => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const name = typeof record.name === "string" ? record.name.trim() : "";
      if (!name) {
        return null;
      }

      const label = typeof record.label === "string" && record.label.trim().length > 0
        ? record.label.trim()
        : readableFieldName(name);
      const section = typeof record.section === "string" && record.section.trim().length > 0
        ? record.section.trim()
        : "Guideline Acknowledgement";
      const order = typeof record.order === "number" && Number.isFinite(record.order)
        ? record.order
        : Number.MAX_SAFE_INTEGER;

      return { name, label, section, order };
    })
    .filter((item): item is GuidelineFieldBlueprintItem => Boolean(item));

  items.sort((a, b) => a.order - b.order);

  return items;
}

function normalizeContentBlueprint(input: unknown): GuidelineContentBlueprintItem[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const items = input
    .map((item): GuidelineContentBlueprintItem | null => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const rawKind = typeof record.kind === "string" ? record.kind.trim() : "";
      const kind = ["heading", "subheading", "paragraph", "bullet", "label"].includes(rawKind)
        ? (rawKind as GuidelineContentBlueprintItem["kind"])
        : "paragraph";
      const text = typeof record.text === "string" ? record.text.trim() : "";
      if (!text) {
        return null;
      }

      const section = typeof record.section === "string" && record.section.trim().length > 0
        ? record.section.trim()
        : "Guideline Content";
      const order = typeof record.order === "number" && Number.isFinite(record.order)
        ? record.order
        : Number.MAX_SAFE_INTEGER;

      return { kind, text, section, order };
    })
    .filter((item): item is GuidelineContentBlueprintItem => Boolean(item));

  items.sort((a, b) => a.order - b.order);

  return items;
}

function readableFieldName(name: string): string {
  return name
    .replace(/^guidelines[A-Za-z0-9]*/i, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim() || name;
}

function formatValue(value: FieldValue | undefined): string {
  if (!value) {
    return "Not provided";
  }

  const raw = Array.isArray(value) ? value.join(", ") : value;
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Not provided";
  }

  if (/^data:image\/[a-z0-9.+-]+;base64,/i.test(trimmed)) {
    return "Drawn signature captured";
  }

  if (trimmed.toLowerCase() === "on") {
    return "Yes";
  }

  return trimmed;
}

function extractImageDataUri(value: FieldValue | undefined): string | null {
  const raw = Array.isArray(value) ? value.find((item) => item.trim().length > 0) ?? "" : value ?? "";
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  if (!/^data:image\/[a-z0-9.+-]+;base64,/i.test(trimmed)) {
    return null;
  }

  return trimmed;
}

function parseDataUriImage(dataUri: string): { mimeType: string; bytes: Uint8Array } | null {
  const match = dataUri.match(/^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i);
  if (!match) {
    return null;
  }

  try {
    const mimeType = match[1].toLowerCase();
    const bytes = Buffer.from(match[2], "base64");
    if (bytes.length === 0) {
      return null;
    }
    return { mimeType, bytes: new Uint8Array(bytes) };
  } catch {
    return null;
  }
}

async function embedSignatureImage(pdfDoc: PDFDocument, dataUri: string): Promise<PDFImage | null> {
  const parsed = parseDataUriImage(dataUri);
  if (!parsed) {
    return null;
  }

  if (parsed.mimeType === "image/png") {
    return pdfDoc.embedPng(parsed.bytes);
  }

  if (parsed.mimeType === "image/jpeg" || parsed.mimeType === "image/jpg") {
    return pdfDoc.embedJpg(parsed.bytes);
  }

  return null;
}

function ensureInternalEmployeePdfFields(
  data: Record<string, FieldValue>,
  fieldBlueprint: GuidelineFieldBlueprintItem[],
): {
  data: Record<string, FieldValue>;
  fieldBlueprint: GuidelineFieldBlueprintItem[];
} {
  const hasEmployeeField =
    Object.keys(data).some((key) => /employee/i.test(key)) ||
    fieldBlueprint.some((item) => /employee/i.test(item.name) || /employee/i.test(item.label));

  if (hasEmployeeField) {
    return { data, fieldBlueprint };
  }

  const section = "Practitioner Acknowledgement (Internal Use Only)";
  const nextOrder =
    fieldBlueprint.reduce((max, item) => (item.order > max ? item.order : max), -1) + 1;

  const internalFields: Array<{ name: string; label: string; value: string }> = [
    {
      name: "__internalEmployeeVisibilityNote",
      label: "Note",
      value: "Customers will not see the employee signature field when filling form online.",
    },
    {
      name: "__internalEmployeeElectronicConsent",
      label: "Employee Electronic Consent",
      value: "",
    },
    {
      name: "__internalEmployeeSignature",
      label: "Employee Signature",
      value: "",
    },
    {
      name: "__internalEmployeeName",
      label: "Employee Name",
      value: "",
    },
    {
      name: "__internalEmployeeDate",
      label: "Date",
      value: "",
    },
  ];

  const nextData: Record<string, FieldValue> = { ...data };
  for (const field of internalFields) {
    nextData[field.name] = field.value;
  }

  const nextBlueprint = [
    ...fieldBlueprint,
    ...internalFields.map((field, index) => ({
      name: field.name,
      label: field.label,
      section,
      order: nextOrder + index,
    })),
  ];

  return {
    data: nextData,
    fieldBlueprint: nextBlueprint,
  };
}

function sanitizeFilenamePart(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function createSubmissionReference(treatmentName: string, submittedAt: string): string {
  const dateSegment = submittedAt.slice(0, 10).replace(/[^0-9]/g, "");
  const slug = sanitizeFilenamePart(treatmentName) || "treatment";
  return `${slug}-guidelines-${dateSegment}-${randomUUID().slice(0, 8)}`;
}

function extractGuidelineFirstName(data: Record<string, FieldValue>): string {
  const directClientName = Object.entries(data).find(([key]) => /clientname$/i.test(key))?.[1];
  const fullName = toSingleString(directClientName);
  if (fullName) {
    const [firstName] = fullName.split(/\s+/);
    return firstName ?? fullName;
  }

  const signatureName = Object.entries(data).find(([key]) => /clientsignature$/i.test(key))?.[1];
  const signature = toSingleString(signatureName);
  if (signature) {
    const [firstName] = signature.split(/\s+/);
    return firstName ?? signature;
  }

  return "client";
}

function createDownloadFilename(treatmentName: string, data: Record<string, FieldValue>): string {
  const firstName = sanitizeFilenamePart(extractGuidelineFirstName(data)) || "client";
  const treatment = sanitizeFilenamePart(treatmentName) || "treatment";
  return `${firstName}-${treatment}-pre-post-guidelines.pdf`;
}

function parseBooleanEnv(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function parseEmailList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  if (!text.trim()) {
    return [""];
  }

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(candidate, fontSize);
    if (width <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
      continue;
    }

    lines.push(word);
    currentLine = "";
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [""];
}

function createPageContext(pdfDoc: PDFDocument, regularFont: PDFFont) {
  let page = pdfDoc.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - PAGE.marginTop;

  const ensureSpace = (requiredHeight: number) => {
    if (y - requiredHeight >= PAGE.marginBottom) {
      return;
    }

    page = pdfDoc.addPage([PAGE.width, PAGE.height]);
    y = PAGE.height - PAGE.marginTop;
  };

  const drawLine = ({
    text,
    font = regularFont,
    size = 11,
    color = rgb(0.1, 0.1, 0.1),
    indent = 0,
    spacing = 4,
  }: {
    text: string;
    font?: PDFFont;
    size?: number;
    color?: ReturnType<typeof rgb>;
    indent?: number;
    spacing?: number;
  }) => {
    const maxWidth = PAGE.width - PAGE.marginX * 2 - indent;
    const lines = wrapText(text, font, size, maxWidth);
    const lineHeight = size + spacing;
    ensureSpace(lines.length * lineHeight + 2);

    for (const line of lines) {
      page.drawText(line, {
        x: PAGE.marginX + indent,
        y,
        size,
        font,
        color,
      });
      y -= lineHeight;
    }
  };

  const addGap = (gap = 8) => {
    ensureSpace(gap);
    y -= gap;
  };

  const drawDivider = () => {
    ensureSpace(12);
    page.drawLine({
      start: { x: PAGE.marginX, y: y + 4 },
      end: { x: PAGE.width - PAGE.marginX, y: y + 4 },
      thickness: 1,
      color: rgb(0.45, 0.45, 0.45),
    });
    y -= 10;
  };

  return {
    drawLine,
    addGap,
    drawDivider,
    ensureSpace,
    getPage: () => page,
    getY: () => y,
    setY: (nextY: number) => {
      y = nextY;
    },
  };
}

async function buildGuidelinePrintablePdf(
  treatmentName: string,
  guidelinesTitle: string,
  treatmentPath: string,
  template: string,
  submittedAt: string,
  data: Record<string, FieldValue>,
  fieldBlueprint: GuidelineFieldBlueprintItem[],
  contentBlueprint: GuidelineContentBlueprintItem[],
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const ctx = createPageContext(pdfDoc, regularFont);

  ctx.drawLine({
    text: "J LUXE MEDICAL AESTHETICS",
    font: boldFont,
    size: 16,
    color: rgb(0.58, 0.44, 0.08),
    spacing: 6,
  });
  ctx.drawLine({
    text: guidelinesTitle || `${treatmentName} Pre & Post-Treatment Guidelines`,
    font: boldFont,
    size: 14,
    color: rgb(0.05, 0.05, 0.05),
    spacing: 6,
  });
  ctx.addGap(4);
  ctx.drawLine({ text: `Treatment: ${treatmentName}`, size: 10, color: rgb(0.28, 0.28, 0.28) });
  ctx.drawLine({ text: `Template: ${template}`, size: 10, color: rgb(0.28, 0.28, 0.28) });
  ctx.drawLine({ text: `Submitted At: ${submittedAt}`, size: 10, color: rgb(0.28, 0.28, 0.28) });
  if (treatmentPath) {
    ctx.drawLine({ text: `Treatment Page: ${treatmentPath}`, size: 10, color: rgb(0.28, 0.28, 0.28) });
  }
  ctx.addGap(6);
  ctx.drawDivider();

  if (contentBlueprint.length > 0) {
    ctx.drawLine({
      text: "Full Guideline (Page Version Submitted)",
      font: boldFont,
      size: 12,
      color: rgb(0.08, 0.08, 0.08),
      spacing: 5,
    });
    ctx.addGap(4);

    for (const item of contentBlueprint) {
      if (item.kind === "heading") {
        ctx.addGap(2);
        ctx.drawLine({
          text: item.text,
          font: boldFont,
          size: 12,
          color: rgb(0.08, 0.08, 0.08),
          spacing: 4,
        });
        ctx.addGap(2);
        continue;
      }

      if (item.kind === "subheading") {
        ctx.addGap(1);
        ctx.drawLine({
          text: item.text,
          font: boldFont,
          size: 11,
          color: rgb(0.12, 0.12, 0.12),
          spacing: 4,
          indent: 2,
        });
        continue;
      }

      if (item.kind === "bullet") {
        ctx.drawLine({
          text: `- ${item.text}`,
          size: 10.5,
          color: rgb(0.12, 0.12, 0.12),
          indent: 10,
          spacing: 4,
        });
        continue;
      }

      if (item.kind === "label") {
        ctx.drawLine({
          text: item.text,
          font: boldFont,
          size: 10,
          color: rgb(0.2, 0.2, 0.2),
          indent: 2,
          spacing: 3,
        });
        continue;
      }

      ctx.drawLine({
        text: item.text,
        size: 10.5,
        color: rgb(0.12, 0.12, 0.12),
        indent: 2,
        spacing: 4,
      });
    }

    ctx.addGap(6);
    ctx.drawDivider();
  }

  const orderedBlueprint = fieldBlueprint.length > 0
    ? fieldBlueprint
    : Object.keys(data).map((name, order) => ({
        name,
        label: readableFieldName(name),
        section: "Guideline Acknowledgement",
        order,
      }));

  const sections = new Map<string, GuidelineFieldBlueprintItem[]>();
  for (const item of orderedBlueprint) {
    const bucket = sections.get(item.section) ?? [];
    bucket.push(item);
    sections.set(item.section, bucket);
  }

  if (sections.size === 0) {
    ctx.drawLine({
      text: "No guideline acknowledgement fields were submitted.",
      size: 11,
      color: rgb(0.65, 0.14, 0.14),
    });
  }

  ctx.drawLine({
    text: "Submitted Acknowledgement Details",
    font: boldFont,
    size: 12,
    color: rgb(0.08, 0.08, 0.08),
    spacing: 5,
  });
  ctx.addGap(2);

  for (const [sectionTitle, items] of sections.entries()) {
    ctx.addGap(2);
    ctx.drawLine({
      text: sectionTitle,
      font: boldFont,
      size: 12,
      color: rgb(0.08, 0.08, 0.08),
      spacing: 5,
    });
    ctx.addGap(2);

    for (const item of items) {
      ctx.drawLine({
        text: `${item.label}:`,
        font: boldFont,
        size: 10.5,
        color: rgb(0.18, 0.18, 0.18),
        indent: 4,
        spacing: 3,
      });

      if (item.name === "__internalEmployeeElectronicConsent") {
        ctx.drawLine({
          text: "[ ] I agree to use electronic records and signatures.",
          size: 10.5,
          color: rgb(0.08, 0.08, 0.08),
          indent: 14,
          spacing: 4,
        });
        ctx.addGap(3);
        continue;
      }

      if (item.name === "__internalEmployeeSignature") {
        const signatureBoxHeight = 76;
        const signatureBoxWidth = Math.min(300, PAGE.width - PAGE.marginX * 2 - 28);
        const signatureBoxX = PAGE.marginX + 14;

        ctx.ensureSpace(signatureBoxHeight + 14);
        const page = ctx.getPage();
        const topY = ctx.getY();
        const signatureBoxY = topY - signatureBoxHeight + 4;

        page.drawRectangle({
          x: signatureBoxX,
          y: signatureBoxY,
          width: signatureBoxWidth,
          height: signatureBoxHeight,
          borderColor: rgb(0.55, 0.55, 0.55),
          borderWidth: 0.9,
          color: rgb(1, 1, 1),
        });
        page.drawText("Employee sign here", {
          x: signatureBoxX + 8,
          y: signatureBoxY + 8,
          size: 9,
          font: regularFont,
          color: rgb(0.45, 0.45, 0.45),
        });

        ctx.setY(signatureBoxY - 4);
        ctx.addGap(3);
        continue;
      }

      if (item.name === "__internalEmployeeName" || item.name === "__internalEmployeeDate") {
        ctx.ensureSpace(18);
        const page = ctx.getPage();
        const y = ctx.getY() - 2;
        const lineStartX = PAGE.marginX + 14;
        const lineEndX = Math.min(PAGE.width - PAGE.marginX - 12, lineStartX + 250);

        page.drawLine({
          start: { x: lineStartX, y },
          end: { x: lineEndX, y },
          thickness: 0.8,
          color: rgb(0.5, 0.5, 0.5),
        });

        ctx.setY(y - 8);
        ctx.addGap(3);
        continue;
      }

      const signatureDataUri = extractImageDataUri(data[item.name]);
      if (signatureDataUri) {
        const signatureImage = await embedSignatureImage(pdfDoc, signatureDataUri);
        if (signatureImage) {
          const maxImageWidth = Math.min(220, PAGE.width - PAGE.marginX * 2 - 28);
          const maxImageHeight = 64;
          const widthScale = maxImageWidth / signatureImage.width;
          const heightScale = maxImageHeight / signatureImage.height;
          const scale = Math.min(widthScale, heightScale, 1);
          const renderedWidth = Math.max(1, signatureImage.width * scale);
          const renderedHeight = Math.max(1, signatureImage.height * scale);
          const containerWidth = renderedWidth + 12;
          const containerHeight = renderedHeight + 12;
          const containerX = PAGE.marginX + 14;

          ctx.ensureSpace(containerHeight + 6);
          const topY = ctx.getY();
          const containerY = topY - containerHeight + 4;
          const page = ctx.getPage();

          page.drawRectangle({
            x: containerX,
            y: containerY,
            width: containerWidth,
            height: containerHeight,
            borderColor: rgb(0.7, 0.7, 0.7),
            borderWidth: 0.8,
            color: rgb(1, 1, 1),
          });
          page.drawImage(signatureImage, {
            x: containerX + 6,
            y: containerY + 6,
            width: renderedWidth,
            height: renderedHeight,
          });

          ctx.setY(containerY - 4);
        } else {
          ctx.drawLine({
            text: "Drawn signature captured",
            size: 10.5,
            color: rgb(0.08, 0.08, 0.08),
            indent: 14,
            spacing: 4,
          });
        }
      } else {
        ctx.drawLine({
          text: formatValue(data[item.name]),
          size: 10.5,
          color: rgb(0.08, 0.08, 0.08),
          indent: 14,
          spacing: 4,
        });
      }
      ctx.addGap(3);
    }

    ctx.drawDivider();
  }

  ctx.drawLine({
    text: "This PDF includes the submitted guideline page content and the captured acknowledgement fields.",
    size: 9.5,
    color: rgb(0.35, 0.35, 0.35),
  });

  return pdfDoc.save();
}

async function emailGuidelinePdfToClinic(
  submissionReference: string,
  downloadFileName: string,
  treatmentName: string,
  treatmentPath: string,
  template: string,
  submittedAt: string,
  data: Record<string, FieldValue>,
  pdfBytes: Uint8Array,
): Promise<EmailDeliveryResult> {
  const host = process.env.FORMS_SMTP_HOST?.trim();
  const port = Number.parseInt(process.env.FORMS_SMTP_PORT ?? "587", 10);
  const secure = parseBooleanEnv(process.env.FORMS_SMTP_SECURE) || port === 465;
  const user = process.env.FORMS_SMTP_USER?.trim();
  const pass = process.env.FORMS_SMTP_PASS?.trim();
  const from = process.env.FORMS_PDF_EMAIL_FROM?.trim();
  const to = parseEmailList(process.env.FORMS_PDF_EMAIL_TO);

  if (!host || !from || to.length === 0) {
    return {
      enabled: false,
      ok: false,
      skipped: true,
      message: "Clinic email notification skipped (SMTP/email settings are not configured).",
    };
  }

  if ((user && !pass) || (!user && pass)) {
    return {
      enabled: true,
      ok: false,
      message: "Clinic email notification failed (SMTP username/password configuration is incomplete).",
    };
  }

  if (!Number.isFinite(port) || port <= 0) {
    return {
      enabled: true,
      ok: false,
      message: "Clinic email notification failed (invalid FORMS_SMTP_PORT).",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && pass ? { user, pass } : undefined,
    });

    const clientName = toSingleString(
      Object.entries(data).find(([key]) => /clientname$/i.test(key))?.[1],
    ) || "-";
    const employeeName = toSingleString(
      Object.entries(data).find(([key]) => /employeename$/i.test(key))?.[1],
    ) || "-";

    const textBody = [
      "A treatment pre/post guideline acknowledgement was submitted.",
      "",
      `Reference: ${submissionReference}`,
      `Treatment: ${treatmentName}`,
      `Template: ${template}`,
      `Submitted At: ${submittedAt}`,
      `Treatment Path: ${treatmentPath || "-"}`,
      `Client Name: ${clientName}`,
      `Employee Name: ${employeeName}`,
      "",
      "The completed guideline PDF is attached to this email.",
    ].join("\n");

    await transporter.sendMail({
      from,
      to: to.join(", "),
      subject: `New guideline acknowledgement: ${treatmentName} (${submissionReference})`,
      text: textBody,
      attachments: [
        {
          filename: downloadFileName,
          content: Buffer.from(pdfBytes),
          contentType: "application/pdf",
        },
      ],
    });

    return {
      enabled: true,
      ok: true,
      message: "Clinic email notification sent with guideline PDF attachment.",
    };
  } catch (error) {
    console.error("[GuidelineSubmit][ClinicEmailException]", error);
    return {
      enabled: true,
      ok: false,
      message: "Clinic email notification failed.",
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GuidelineSubmissionPayload;

    const treatmentName = typeof body.treatmentName === "string" && body.treatmentName.trim().length > 0
      ? body.treatmentName.trim()
      : "Treatment";
    const treatmentPath = typeof body.treatmentPath === "string" ? body.treatmentPath.trim() : "";
    const template = typeof body.template === "string" && body.template.trim().length > 0
      ? body.template.trim()
      : "standard";
    const guidelinesTitle = typeof body.guidelinesTitle === "string" && body.guidelinesTitle.trim().length > 0
      ? body.guidelinesTitle.trim()
      : `${treatmentName} Pre & Post-Treatment Guidelines`;
    const submittedAt = typeof body.submittedAt === "string" && body.submittedAt.trim().length > 0
      ? body.submittedAt.trim()
      : new Date().toISOString();

    const data = normalizeData(body.data);
    const fieldBlueprint = normalizeFieldBlueprint(body.fieldBlueprint);
    const contentBlueprint = normalizeContentBlueprint(body.contentBlueprint);

    const normalizedInternalFields = ensureInternalEmployeePdfFields(data, fieldBlueprint);

    if (Object.keys(normalizedInternalFields.data).length === 0) {
      return NextResponse.json(
        { ok: false, error: "No guideline acknowledgement data was submitted." },
        { status: 400 },
      );
    }

    const pdfBytes = await buildGuidelinePrintablePdf(
      treatmentName,
      guidelinesTitle,
      treatmentPath,
      template,
      submittedAt,
      normalizedInternalFields.data,
      normalizedInternalFields.fieldBlueprint,
      contentBlueprint,
    );

    const submissionReference = createSubmissionReference(treatmentName, submittedAt);
    const downloadFileName = createDownloadFilename(treatmentName, normalizedInternalFields.data);

    const clinicEmail = await emailGuidelinePdfToClinic(
      submissionReference,
      downloadFileName,
      treatmentName,
      treatmentPath,
      template,
      submittedAt,
      normalizedInternalFields.data,
      pdfBytes,
    );

    if (clinicEmail.ok) {
      console.info("[GuidelineSubmit][ClinicEmail]", { submissionReference, message: clinicEmail.message });
    } else if (clinicEmail.skipped) {
      console.warn("[GuidelineSubmit][ClinicEmailSkipped]", { submissionReference, message: clinicEmail.message });
    } else {
      console.error("[GuidelineSubmit][ClinicEmailFailed]", { submissionReference, message: clinicEmail.message });
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you. Your pre & post-treatment guideline acknowledgement has been submitted successfully.",
      submissionReference,
      pdf: {
        fileName: downloadFileName,
        mimeType: "application/pdf",
        base64: Buffer.from(pdfBytes).toString("base64"),
      },
    });
  } catch (error) {
    console.error("[GuidelineSubmitError]", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit guideline right now." },
      { status: 500 },
    );
  }
}

