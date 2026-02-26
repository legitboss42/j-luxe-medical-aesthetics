import { randomUUID } from "node:crypto";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type FieldValue = string | string[];

type GuidelineFieldBlueprintItem = {
  name: string;
  label: string;
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

  if (trimmed.toLowerCase() === "on") {
    return "Yes";
  }

  return trimmed;
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
    color = rgb(0.88, 0.88, 0.88),
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
      color: rgb(0.25, 0.25, 0.25),
    });
    y -= 10;
  };

  return {
    drawLine,
    addGap,
    drawDivider,
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
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const ctx = createPageContext(pdfDoc, regularFont);

  ctx.drawLine({
    text: "J LUXE MEDICAL AESTHETICS",
    font: boldFont,
    size: 16,
    color: rgb(0.83, 0.69, 0.22),
    spacing: 6,
  });
  ctx.drawLine({
    text: guidelinesTitle || `${treatmentName} Pre & Post-Treatment Guidelines`,
    font: boldFont,
    size: 14,
    color: rgb(1, 1, 1),
    spacing: 6,
  });
  ctx.addGap(4);
  ctx.drawLine({ text: `Treatment: ${treatmentName}`, size: 10, color: rgb(0.78, 0.78, 0.78) });
  ctx.drawLine({ text: `Template: ${template}`, size: 10, color: rgb(0.78, 0.78, 0.78) });
  ctx.drawLine({ text: `Submitted At: ${submittedAt}`, size: 10, color: rgb(0.78, 0.78, 0.78) });
  if (treatmentPath) {
    ctx.drawLine({ text: `Treatment Page: ${treatmentPath}`, size: 10, color: rgb(0.78, 0.78, 0.78) });
  }
  ctx.addGap(6);
  ctx.drawDivider();

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
      color: rgb(0.85, 0.55, 0.55),
    });
  }

  for (const [sectionTitle, items] of sections.entries()) {
    ctx.addGap(2);
    ctx.drawLine({
      text: sectionTitle,
      font: boldFont,
      size: 12,
      color: rgb(0.94, 0.94, 0.94),
      spacing: 5,
    });
    ctx.addGap(2);

    for (const item of items) {
      ctx.drawLine({
        text: `${item.label}:`,
        font: boldFont,
        size: 10.5,
        color: rgb(0.82, 0.82, 0.82),
        indent: 4,
        spacing: 3,
      });
      ctx.drawLine({
        text: formatValue(data[item.name]),
        size: 10.5,
        color: rgb(0.96, 0.96, 0.96),
        indent: 14,
        spacing: 4,
      });
      ctx.addGap(3);
    }

    ctx.drawDivider();
  }

  ctx.drawLine({
    text: "This PDF confirms submitted acknowledgement fields for the treatment guidelines page.",
    size: 9.5,
    color: rgb(0.7, 0.7, 0.7),
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

    if (Object.keys(data).length === 0) {
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
      data,
      fieldBlueprint,
    );

    const submissionReference = createSubmissionReference(treatmentName, submittedAt);
    const downloadFileName = createDownloadFilename(treatmentName, data);

    const clinicEmail = await emailGuidelinePdfToClinic(
      submissionReference,
      downloadFileName,
      treatmentName,
      treatmentPath,
      template,
      submittedAt,
      data,
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
