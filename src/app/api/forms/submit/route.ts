import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type FieldValue = string | string[];

type PdfFieldBlueprintItem = {
  name: string;
  label: string;
  section: string;
  order: number;
};

type FormSubmissionPayload = {
  treatmentName?: string;
  treatmentPath?: string;
  template?: string;
  submittedAt?: string;
  data?: Record<string, FieldValue>;
  fieldBlueprint?: PdfFieldBlueprintItem[];
};

type MailerLiteField = {
  key?: string;
  name?: string;
};

type MailerLiteResult = {
  enabled: boolean;
  ok: boolean;
  skipped?: boolean;
  message: string;
};

type EmailDeliveryResult = {
  enabled: boolean;
  ok: boolean;
  skipped?: boolean;
  message: string;
};

const MAILERLITE_BASE_URL = "https://connect.mailerlite.com/api";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeFieldValue(value: unknown): FieldValue | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (Array.isArray(value)) {
    const normalized = value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return normalized.length > 0 ? normalized : null;
  }

  return null;
}

function normalizeData(value: unknown): Record<string, FieldValue> {
  if (!isRecord(value)) {
    return {};
  }

  const normalized: Record<string, FieldValue> = {};

  for (const [key, rawValue] of Object.entries(value)) {
    const parsed = normalizeFieldValue(rawValue);
    if (!parsed) {
      continue;
    }

    normalized[key] = parsed;
  }

  return normalized;
}

function normalizeFieldBlueprint(value: unknown): PdfFieldBlueprintItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalized: PdfFieldBlueprintItem[] = [];

  for (const item of value) {
    if (!isRecord(item)) {
      continue;
    }

    const name = typeof item.name === "string" ? item.name.trim() : "";
    if (!name) {
      continue;
    }

    const label = typeof item.label === "string" && item.label.trim().length > 0
      ? item.label.trim()
      : toReadableLabel(name);
    const section = typeof item.section === "string" && item.section.trim().length > 0
      ? item.section.trim()
      : "Form Details";
    const order = typeof item.order === "number" && Number.isFinite(item.order)
      ? item.order
      : normalized.length;

    normalized.push({
      name,
      label,
      section,
      order,
    });
  }

  return normalized.sort((a, b) => a.order - b.order);
}

function toSingleString(value: FieldValue | undefined): string {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value.join(", ") : value;
}

function toReadableLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatMailerLiteDateTime(value: string): string {
  const parsed = new Date(value);
  const safeDate = Number.isNaN(parsed.getTime()) ? new Date() : parsed;

  const year = safeDate.getUTCFullYear();
  const month = String(safeDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(safeDate.getUTCDate()).padStart(2, "0");
  const hours = String(safeDate.getUTCHours()).padStart(2, "0");
  const minutes = String(safeDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(safeDate.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const COMMON_MAILERLITE_KEYS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address1",
  "address2",
  "gender",
  "birthMonth",
  "birthDay",
  "birthYear",
  "referredBy",
] as const;

const MAILERLITE_KEYS_BY_TEMPLATE: Record<string, readonly string[]> = {
  antiWrinkle: [
    "absoluteContraAnti",
    "appointmentDateAnti",
    "appointmentTimeAnti",
    "areasConcernAnti",
    "areasConcernAntiOther",
    "assessmentAnti",
    "batchAnti",
    "clientNameAnti",
    "conditionsAnti",
    "conditionsAntiDetails",
    "consentAnti",
    "currentProductsAnti",
    "customerSignatureAnti",
    "doctorCareAnti",
    "doctorCareAntiDetails",
    "electronicRecordsAntiClient",
    "electronicRecordsAntiEmployee",
    "employeeNameAnti",
    "employeeSignatureAnti",
    "employeeSignatureDateAnti",
    "historyAnti",
    "historyAntiArea",
    "historyAntiDate",
    "otherAreaAnti",
    "photoAnti",
    "postCommentsAnti",
    "relativeContraAnti",
    "signatureDateAnti",
    "unitsAnti",
  ],
  bodySculpting: [
    "appointmentBodyDate",
    "appointmentBodyTime",
    "assessmentBody",
    "batchBody",
    "clientNameBody",
    "conditionsBody",
    "conditionsBodyDetails",
    "consentBody",
    "contraBody",
    "customerSignatureBody",
    "doctorCareBody",
    "doctorCareBodyDetails",
    "electronicRecordsBodyClient",
    "electronicRecordsBodyEmployee",
    "employeeNameBody",
    "employeeSignatureBody",
    "employeeSignatureDateBody",
    "photoBody",
    "postCommentsBody",
    "recentBody",
    "signatureDateBody",
    "treatmentBody",
    "unitsBody",
  ],
  chemicalPeels: [
    "appointmentPeelDate",
    "appointmentPeelTime",
    "assessmentPeel",
    "batchPeel",
    "clientPeel",
    "conditionsPeel",
    "conditionsPeelDetails",
    "consentPeel",
    "contraPeel",
    "doctorCarePeel",
    "doctorCarePeelDetails",
    "electronicRecordsPeelClient",
    "electronicRecordsPeelEmployee",
    "employeePeel",
    "employeeSignatureDatePeel",
    "employeeSignaturePeel",
    "photoPeel",
    "postCommentsPeel",
    "recentPeel",
    "signatureDatePeel",
    "signaturePeel",
    "treatmentPeel",
    "unitsPeel",
  ],
  dermalFillers: [
    "appointmentFillersDate",
    "appointmentFillersTime",
    "assessmentFillers",
    "batchFillers",
    "clientFillers",
    "conditionsFillers",
    "conditionsFillersDetails",
    "consentFillers",
    "contraFillers",
    "doctorCareFillers",
    "doctorCareFillersDetails",
    "electronicRecordsFillersClient",
    "electronicRecordsFillersEmployee",
    "employeeFillers",
    "employeeSignatureDateFillers",
    "employeeSignatureFillers",
    "historyFillers",
    "historyFillersArea",
    "historyFillersDate",
    "otherAreaFillers",
    "otherFillers",
    "photoFillers",
    "postCommentsFillers",
    "productsFillers",
    "signatureFillers",
    "signatureFillersDate",
    "treatmentFillers",
    "unitsFillers",
  ],
  exosomes: [
    "appointmentExosomeDate",
    "appointmentExosomeTime",
    "assessmentExosome",
    "batchExosome",
    "clientExosome",
    "conditionsExosome",
    "conditionsExosomeDetails",
    "consentExosome",
    "contraExosome",
    "doctorCareExosome",
    "doctorCareExosomeDetails",
    "electronicRecordsExosomeClient",
    "electronicRecordsExosomeEmployee",
    "employeeExosome",
    "employeeSignatureDateExosome",
    "employeeSignatureExosome",
    "exosomeFocus",
    "photoExosome",
    "postCommentsExosome",
    "signatureDateExosome",
    "signatureExosome",
    "treatmentExosome",
    "unitsExosome",
  ],
  facials: [
    "assessmentFacial",
    "batchFacial",
    "clientFacial",
    "consentFacial",
    "doctorCareFacial",
    "doctorCareFacialDetails",
    "electronicRecordsFacialClient",
    "electronicRecordsFacialEmployee",
    "employeeFacial",
    "employeeSignatureDateFacial",
    "employeeSignatureFacial",
    "facialAppointmentDate",
    "facialAppointmentTime",
    "facialConditions",
    "facialConditionsDetails",
    "facialContra",
    "facialGoals",
    "facialProducts",
    "facialRecentTreatment",
    "facialRoutine",
    "facialTreatment",
    "fitzpatrickFacial",
    "photoFacial",
    "postCommentsFacial",
    "signatureFacial",
    "signatureFacialDate",
    "skinTypeFacial",
    "skinTypeFacialOther",
    "unitsFacial",
  ],
  ivDrip: [
    "appointmentIvDate",
    "appointmentIvTime",
    "assessmentIv",
    "batchIv",
    "clientIv",
    "conditionsIv",
    "conditionsIvDetails",
    "consentIv",
    "contraIv",
    "doctorCareIv",
    "doctorCareIvDetails",
    "electronicRecordsIvClient",
    "electronicRecordsIvEmployee",
    "employeeIv",
    "employeeSignatureDateIv",
    "employeeSignatureIv",
    "photoIv",
    "postCommentsIv",
    "recentIv",
    "signatureDateIv",
    "signatureIv",
    "treatmentIv",
    "unitsIv",
  ],
  microneedling: [
    "absoluteContraMicro",
    "appointmentDateMicro",
    "appointmentTimeMicro",
    "assessmentMicro",
    "batchMicro",
    "bookedTreatmentMicro",
    "clientNameMicro",
    "conditionsMicro",
    "conditionsMicroDetails",
    "consentMicro",
    "customerSignatureMicro",
    "doctorCareMicro",
    "doctorCareMicroDetails",
    "electronicRecordsMicroClient",
    "electronicRecordsMicroEmployee",
    "employeeNameMicro",
    "employeeSignatureDateMicro",
    "employeeSignatureMicro",
    "goalsMicro",
    "medicationMicro",
    "photoConsentMicro",
    "postCommentsMicro",
    "recentAestheticMicro",
    "relativeContraMicro",
    "routineMicro",
    "signatureDateMicro",
    "skinTypeMicro",
    "skinTypeMicroOther",
    "unitsMicro",
  ],
  prp: [
    "appointmentPrpDate",
    "appointmentPrpTime",
    "assessmentPrp",
    "batchPrp",
    "clientPrp",
    "conditionsPrp",
    "conditionsPrpDetails",
    "consentPrp",
    "contraPrp",
    "doctorCarePrp",
    "doctorCarePrpDetails",
    "electronicRecordsPrpClient",
    "electronicRecordsPrpEmployee",
    "employeePrp",
    "employeeSignatureDatePrp",
    "employeeSignaturePrp",
    "goalPrp",
    "photoPrp",
    "postCommentsPrp",
    "signatureDatePrp",
    "signaturePrp",
    "treatmentPrp",
    "unitsPrp",
  ],
  skinBoosters: [
    "appointmentBoostersDate",
    "appointmentBoostersTime",
    "assessmentBoosters",
    "batchBoosters",
    "clientBoosters",
    "conditionsBoosters",
    "conditionsBoostersDetails",
    "consentBoosters",
    "contraBoosters",
    "doctorCareBoosters",
    "doctorCareBoostersDetails",
    "electronicRecordsBoostersClient",
    "electronicRecordsBoostersEmployee",
    "employeeBoosters",
    "employeeSignatureBoosters",
    "employeeSignatureDateBoosters",
    "goalBoosters",
    "photoBoosters",
    "postCommentsBoosters",
    "signatureBoosters",
    "signatureDateBoosters",
    "treatmentBoosters",
    "unitsBoosters",
  ],
  teethWhitening: [
    "appointmentTeethDate",
    "appointmentTeethTime",
    "assessmentTeeth",
    "batchTeeth",
    "clientTeeth",
    "conditionsTeeth",
    "conditionsTeethDetails",
    "consentTeeth",
    "contraTeeth",
    "doctorCareTeeth",
    "doctorCareTeethDetails",
    "electronicRecordsTeethClient",
    "electronicRecordsTeethEmployee",
    "employeeSignatureDateTeeth",
    "employeeSignatureTeeth",
    "employeeTeeth",
    "photoTeeth",
    "postCommentsTeeth",
    "recentTeeth",
    "shadeAfterTeeth",
    "shadeBeforeTeeth",
    "signatureDateTeeth",
    "signatureTeeth",
    "treatmentTeeth",
    "unitsTeeth",
  ],
  waxing: [
    "appointmentWaxingDate",
    "appointmentWaxingTime",
    "assessmentWaxing",
    "batchWaxing",
    "clientWaxing",
    "conditionsWaxing",
    "conditionsWaxingDetails",
    "consentWaxing",
    "contraWaxing",
    "doctorCareWaxing",
    "doctorCareWaxingDetails",
    "electronicRecordsWaxingClient",
    "electronicRecordsWaxingEmployee",
    "employeeSignatureDateWaxing",
    "employeeSignatureWaxing",
    "employeeWaxing",
    "photoWaxing",
    "postCommentsWaxing",
    "recentWaxing",
    "signatureWaxing",
    "signatureWaxingDate",
    "treatmentWaxing",
    "unitsWaxing",
  ],
  standard: [
    "mainConcern",
    "medicalHistory",
    "consentSignature",
  ],
};

const MAILERLITE_TEMPLATE_KEYS = new Set(Object.keys(MAILERLITE_KEYS_BY_TEMPLATE));

function resolveTemplate(value: unknown): string {
  if (typeof value !== "string") {
    return "standard";
  }

  const normalized = value.trim();
  if (!normalized || !MAILERLITE_TEMPLATE_KEYS.has(normalized)) {
    return "standard";
  }

  return normalized;
}

function resolveTreatmentPath(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.trim();
  return normalized.startsWith("/") ? normalized : "";
}

function buildMailerLiteMappedFields(template: string, data: Record<string, FieldValue>): Record<string, string> {
  const templateKeys = MAILERLITE_KEYS_BY_TEMPLATE[template] ?? MAILERLITE_KEYS_BY_TEMPLATE.standard;
  const selectedKeys = Array.from(new Set([...COMMON_MAILERLITE_KEYS, ...templateKeys]));
  const mapped: Record<string, string> = {};

  for (const key of selectedKeys) {
    const value = toSingleString(data[key]);
    if (!value) {
      continue;
    }

    mapped[`form_${key}`] = value;
  }

  return mapped;
}

async function mailerLiteFetch(path: string, token: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${MAILERLITE_BASE_URL}${path}`, {
    ...init,
    headers,
  });
}

async function getMailerLiteFields(token: string): Promise<MailerLiteField[]> {
  const response = await mailerLiteFetch("/fields?limit=100", token);
  if (!response.ok) {
    return [];
  }

  const json = (await response.json()) as { data?: MailerLiteField[] };
  return Array.isArray(json.data) ? json.data : [];
}

function normalizeFieldName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "_");
}

async function ensureMailerLiteFieldKey(
  token: string,
  fieldsCache: MailerLiteField[],
  label: string,
): Promise<string | null> {
  const normalizedLabel = normalizeFieldName(label);

  const existing = fieldsCache.find((field) => {
    const key = field.key ? normalizeFieldName(field.key) : "";
    const name = field.name ? normalizeFieldName(field.name) : "";
    return key === normalizedLabel || name === normalizedLabel;
  });

  if (existing?.key) {
    return existing.key;
  }

  const createResponse = await mailerLiteFetch("/fields", token, {
    method: "POST",
    body: JSON.stringify({
      name: label,
      type: "text",
    }),
  });

  if (!createResponse.ok) {
    return null;
  }

  const json = (await createResponse.json()) as { data?: MailerLiteField };
  const createdField = json.data;
  if (createdField?.key) {
    fieldsCache.push(createdField);
    return createdField.key;
  }

  return null;
}

async function syncToMailerLite(
  treatmentName: string,
  treatmentPath: string,
  template: string,
  submittedAt: string,
  data: Record<string, FieldValue>,
): Promise<MailerLiteResult> {
  const token = process.env.MAILERLITE_API_TOKEN;
  if (!token) {
    return {
      enabled: false,
      ok: false,
      skipped: true,
      message: "MailerLite sync skipped (MAILERLITE_API_TOKEN not configured).",
    };
  }

  const email = toSingleString(data.email);
  if (!email) {
    return {
      enabled: true,
      ok: false,
      message: "MailerLite sync skipped because no email was provided.",
    };
  }

  try {
    const firstName = toSingleString(data.firstName);
    const lastName = toSingleString(data.lastName);
    const phone = toSingleString(data.phone);
    const mappedFields = buildMailerLiteMappedFields(template, data);

    const fieldsCache = await getMailerLiteFields(token);

    const customFieldPayload: Record<string, string> = {};
    const customValues: Array<{ label: string; value: string }> = [
      { label: "form_treatment_name", value: treatmentName },
      { label: "form_treatment_path", value: treatmentPath },
      { label: "form_template", value: template },
      { label: "form_submitted_at", value: submittedAt },
      ...Object.entries(mappedFields).map(([label, value]) => ({ label, value })),
    ];

    for (const item of customValues) {
      if (!item.value) {
        continue;
      }

      const key = await ensureMailerLiteFieldKey(token, fieldsCache, item.label);
      if (!key) {
        continue;
      }

      customFieldPayload[key] = item.value;
    }

    const subscriberFields: Record<string, string> = {
      ...customFieldPayload,
    };

    if (firstName) {
      subscriberFields.name = firstName;
    }
    if (lastName) {
      subscriberFields.last_name = lastName;
    }
    if (phone) {
      subscriberFields.phone = phone;
    }

    const groupIds = (process.env.MAILERLITE_GROUP_IDS ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const payload: Record<string, unknown> = {
      email,
      fields: subscriberFields,
      status: "active",
      subscribed_at: formatMailerLiteDateTime(submittedAt),
    };

    if (groupIds.length > 0) {
      payload.groups = groupIds;
    }

    const response = await mailerLiteFetch("/subscribers", token, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[FormSubmit][MailerLiteError]", errorBody);
      return {
        enabled: true,
        ok: false,
        message: "MailerLite sync failed, but PDF generation succeeded.",
      };
    }

    const mappedCount = Object.keys(mappedFields).length;
    return {
      enabled: true,
      ok: true,
      message: `Mapped treatment fields synced to MailerLite (${mappedCount} fields).`,
    };
  } catch (error) {
    console.error("[FormSubmit][MailerLiteException]", error);
    return {
      enabled: true,
      ok: false,
      message: "MailerLite sync failed, but PDF generation succeeded.",
    };
  }
}

function wrapTextToWidth(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  if (!text) {
    return [""];
  }

  const words = text.split(/\s+/).filter((word) => word.length > 0);
  if (words.length === 0) {
    return [""];
  }

  const lines: string[] = [];
  let currentLine = "";

  const pushWord = (word: string) => {
    if (font.widthOfTextAtSize(word, size) <= maxWidth) {
      return [word];
    }

    const fragments: string[] = [];
    let fragment = "";

    for (const char of word) {
      const test = `${fragment}${char}`;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) {
        fragment = test;
      } else {
        if (fragment) {
          fragments.push(fragment);
        }
        fragment = char;
      }
    }

    if (fragment) {
      fragments.push(fragment);
    }

    return fragments;
  };

  for (const word of words) {
    const fragments = pushWord(word);

    for (const fragment of fragments) {
      const testLine = currentLine ? `${currentLine} ${fragment}` : fragment;
      if (font.widthOfTextAtSize(testLine, size) <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = fragment;
      }
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

const PDF_TEMPLATE_TOKENS = new Set([
  "anti",
  "body",
  "peel",
  "fillers",
  "exosome",
  "facial",
  "iv",
  "micro",
  "prp",
  "boosters",
  "teeth",
  "waxing",
  "chemical",
  "wrinkle",
  "mesotherapy",
]);

const PDF_FORM_TITLE_BY_TEMPLATE: Record<string, string> = {
  antiWrinkle: "Anti-Wrinkle Consultation & Consent Form",
  bodySculpting: "Body Sculpting Consultation & Consent Form",
  chemicalPeels: "Chemical Peel Consultation & Consent Form",
  dermalFillers: "Dermal Fillers Consultation & Consent Form",
  exosomes: "Exosome Therapy Consultation & Consent Form",
  facials: "Facial Consultation & Consent Form",
  ivDrip: "IV Drip Consultation & Consent Form",
  microneedling: "Microneedling Consultation & Consent Form",
  prp: "PRP Consultation & Consent Form",
  skinBoosters: "Skin Boosters & Mesotherapy Consultation & Consent Form",
  teethWhitening: "Teeth Whitening Consultation & Consent Form",
  waxing: "Waxing Consultation & Consent Form",
  standard: "Consultation & Consent Form",
};

const PDF_LOGO_CANDIDATE_PATHS = [
  "public/images/logo.png",
  "public/images/logo.jpg",
  "public/images/logo.jpeg",
] as const;

const PDF_FIELD_LABELS_BY_CANONICAL: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  address1: "Address Line 1",
  address2: "Address Line 2",
  email: "Email",
  phone: "Phone Number",
  gender: "Gender",
  birthMonth: "Birth Month",
  birthDay: "Birth Day",
  birthYear: "Birth Year",
  referredBy: "Referred By",
  doctorCare: "Are you currently under the care of a doctor or dermatologist?",
  doctorCareDetails: 'If "Yes" please specify',
  conditions: "Medical Conditions",
  conditionsDetails: "Condition Details",
  contra: "Contraindication Check",
  absoluteContra: "Absolute Contraindications",
  relativeContra: "Relative Contraindications",
  treatment: "Treatment Selection",
  bookedTreatment: "Booked Treatment",
  appointmentDate: "Date of Scheduled Appointment",
  appointmentTime: "Time of Scheduled Appointment",
  recent: "Recent Aesthetic Treatment (Last 6 Weeks)",
  recentAesthetic: "Recent Aesthetic Treatment (Last 6 Weeks)",
  skinType: "Skin Type",
  skinTypeOther: "Skin Type (Other)",
  goals: "Primary Goals",
  goal: "Primary Goal",
  focus: "Treatment Focus",
  routine: "Skincare Routine",
  medication: "Current Medications / Products",
  products: "Current Products",
  currentProducts: "Current Products",
  history: "Treatment History",
  historyDate: "Treatment History Date",
  historyArea: "Treatment History Area",
  otherArea: "Other Area",
  areasConcern: "Areas of Concern",
  areasConcernOther: "Areas of Concern (Other)",
  fitzpatrick: "Fitzpatrick Skin Type",
  consent: "Client Consent Statements",
  photo: "Photo & Marketing Consent",
  photoConsent: "Photo & Marketing Consent",
  electronicRecordsClient: "Electronic Records Consent (Client)",
  electronicRecordsEmployee: "Electronic Records Consent (Employee)",
  signature: "Customer Signature",
  customerSignature: "Customer Signature",
  signatureDate: "Customer Signature Date",
  client: "Client Name",
  clientName: "Client Name",
  employee: "Employee Name",
  employeeName: "Employee Name",
  employeeSignature: "Employee Signature",
  employeeSignatureDate: "Employee Signature Date",
  assessment: "Assessment",
  batch: "Batch Number & Expiry Date",
  units: "Treatment Given / Units Used",
  postComments: "Post-Treatment Comments",
  shadeBefore: "Shade Before",
  shadeAfter: "Shade After",
  mainConcern: "Main Concern",
  medicalHistory: "Medical History",
  consentSignature: "Consent Signature",
};

type PdfSectionId =
  | "demographics"
  | "medicalHistory"
  | "contraindications"
  | "treatmentDetails"
  | "consent"
  | "practitionerNotes"
  | "additional";

const PDF_SECTION_ORDER: PdfSectionId[] = [
  "demographics",
  "medicalHistory",
  "contraindications",
  "treatmentDetails",
  "consent",
  "practitionerNotes",
  "additional",
];

const PDF_SECTION_TITLES: Record<PdfSectionId, string> = {
  demographics: "1. Client Demographic Information",
  medicalHistory: "Medical History & Skin Analysis",
  contraindications: "Contraindication Check",
  treatmentDetails: "Treatment Details",
  consent: "Client's Consent (Mandatory)",
  practitionerNotes: "Practitioner Notes (For Internal Use Only)",
  additional: "Additional Submitted Details",
};

const PDF_SECTION_DESCRIPTIONS: Partial<Record<PdfSectionId, string>> = {
  contraindications:
    "Some contraindications are absolute (treatment cannot proceed), while others are relative and may require adjustment or postponement.",
  consent:
    "Photographs may be taken before and after treatment for medical documentation and client records.",
};

function toPdfKeyTokens(key: string): string[] {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .split(/\s+/)
    .map((token) => token.trim().toLowerCase())
    .filter((token) => token.length > 0)
    .filter((token) => !PDF_TEMPLATE_TOKENS.has(token));
}

function toPdfCanonicalKey(key: string): string {
  const tokens = toPdfKeyTokens(key);
  if (tokens.length === 0) {
    return key.replace(/[^a-z0-9]/gi, "").toLowerCase();
  }

  return tokens
    .map((token, index) => (index === 0 ? token : token.charAt(0).toUpperCase() + token.slice(1)))
    .join("");
}

function toTitleCaseWord(token: string): string {
  const acronymMap: Record<string, string> = {
    iv: "IV",
    prp: "PRP",
    dvt: "DVT",
    pe: "PE",
    aha: "AHA",
    bha: "BHA",
  };

  if (token in acronymMap) {
    return acronymMap[token];
  }

  return token.charAt(0).toUpperCase() + token.slice(1);
}

function toPdfFieldLabel(key: string): string {
  const canonical = toPdfCanonicalKey(key);
  const configured = PDF_FIELD_LABELS_BY_CANONICAL[canonical];
  if (configured) {
    return configured;
  }

  const tokens = toPdfKeyTokens(key);
  if (tokens.length === 0) {
    return toReadableLabel(key);
  }

  return tokens.map(toTitleCaseWord).join(" ");
}

function formatPdfSubmittedAt(submittedAt: string): string {
  const date = new Date(submittedAt);
  if (Number.isNaN(date.getTime())) {
    return submittedAt;
  }

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPdfValueLines(value: FieldValue): string[] {
  const normalizeLine = (line: string): string => {
    const normalized = line.trim();
    if (!normalized) {
      return "";
    }

    if (normalized.toLowerCase() === "on") {
      return "Yes";
    }

    return normalized;
  };

  if (Array.isArray(value)) {
    const values = value
      .map((item) => normalizeLine(item))
      .filter((item) => item.length > 0);

    if (values.length === 0) {
      return ["-"];
    }

    if (values.length === 1) {
      return [values[0]];
    }

    return values.map((item) => `- ${item}`);
  }

  const normalized = normalizeLine(value);
  if (!normalized) {
    return ["-"];
  }

  const lines = normalized
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.length > 0 ? lines : [normalized];
}

function getPdfSectionForField(canonical: string): PdfSectionId {
  if ([
    "firstName",
    "lastName",
    "address1",
    "address2",
    "email",
    "phone",
    "gender",
    "birthMonth",
    "birthDay",
    "birthYear",
    "referredBy",
  ].includes(canonical)) {
    return "demographics";
  }

  if ([
    "assessment",
    "batch",
    "units",
    "postComments",
  ].includes(canonical)) {
    return "practitionerNotes";
  }

  if (canonical.includes("consent") || canonical.includes("signature") || canonical.startsWith("photo")
    || canonical.startsWith("electronicRecords") || canonical.startsWith("client") || canonical.startsWith("employee")) {
    return "consent";
  }

  if (canonical.includes("contra")) {
    return "contraindications";
  }

  if (canonical.startsWith("appointment") || canonical.includes("treatment") || canonical.includes("goal")
    || canonical.includes("focus") || canonical.includes("shade")) {
    return "treatmentDetails";
  }

  if (canonical.includes("doctorCare") || canonical.includes("condition") || canonical.includes("history")
    || canonical.includes("skin") || canonical.includes("routine") || canonical.includes("medication")
    || canonical.includes("product") || canonical.includes("recent") || canonical.includes("fitzpatrick")
    || canonical.includes("area")) {
    return "medicalHistory";
  }

  return "additional";
}

type PdfFieldEntry = {
  key: string;
  label: string;
  canonical: string;
  value: FieldValue;
  order: number;
};

async function tryEmbedPdfLogo(pdfDoc: PDFDocument) {
  for (const relativePath of PDF_LOGO_CANDIDATE_PATHS) {
    const absolutePath = path.resolve(process.cwd(), relativePath);
    try {
      const bytes = await readFile(absolutePath);
      if (relativePath.endsWith(".png")) {
        return await pdfDoc.embedPng(bytes);
      }

      return await pdfDoc.embedJpg(bytes);
    } catch {
      continue;
    }
  }

  return null;
}

async function buildPrintablePdf(
  treatmentName: string,
  template: string,
  submittedAt: string,
  data: Record<string, FieldValue>,
  fieldBlueprint: PdfFieldBlueprintItem[],
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 34;
  const maxWidth = pageWidth - margin * 2;
  const colors = {
    page: rgb(0.05, 0.05, 0.05),
    card: rgb(0.09, 0.09, 0.09),
    cardBorder: rgb(0.23, 0.23, 0.23),
    text: rgb(0.93, 0.93, 0.93),
    muted: rgb(0.7, 0.7, 0.7),
    accent: rgb(0.83, 0.69, 0.22),
    label: rgb(0.83, 0.83, 0.83),
  };

  const newPage = () => {
    const nextPage = pdfDoc.addPage([pageWidth, pageHeight]);
    nextPage.drawRectangle({
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
      color: colors.page,
    });
    return nextPage;
  };

  let page: PDFPage = newPage();
  let y = pageHeight - margin;

  const ensureSpace = (requiredHeight: number) => {
    if (y - requiredHeight < margin) {
      page = newPage();
      y = pageHeight - margin;
    }
  };

  const drawWrapped = (
    text: string,
    options?: {
      size?: number;
      bold?: boolean;
      indent?: number;
      spacing?: number;
      color?: ReturnType<typeof rgb>;
      width?: number;
    },
  ) => {
    const size = options?.size ?? 10;
    const indent = options?.indent ?? 0;
    const spacing = options?.spacing ?? 13;
    const font = options?.bold ? boldFont : regularFont;
    const availableWidth = options?.width ?? maxWidth - indent;
    const lines = wrapTextToWidth(text, font, size, availableWidth);

    for (const line of lines) {
      ensureSpace(spacing);
      page.drawText(line, {
        x: margin + indent,
        y,
        size,
        font,
        color: options?.color ?? colors.text,
      });
      y -= spacing;
    }
  };

  const drawDivider = () => {
    ensureSpace(10);
    page.drawLine({
      start: { x: margin, y: y - 2 },
      end: { x: margin + maxWidth, y: y - 2 },
      thickness: 1,
      color: colors.cardBorder,
    });
    y -= 10;
  };

  const formTitle = PDF_FORM_TITLE_BY_TEMPLATE[template] ?? `${treatmentName} Consultation & Consent Form`;
  const submittedAtDisplay = formatPdfSubmittedAt(submittedAt);
  const clientDisplay = [toSingleString(data.firstName), toSingleString(data.lastName)]
    .filter((item) => item.length > 0)
    .join(" ")
    .trim();
  const logo = await tryEmbedPdfLogo(pdfDoc);
  let logoHeight = 0;

  if (logo) {
    const maxLogoWidth = 115;
    const maxLogoHeight = 44;
    const scale = Math.min(maxLogoWidth / logo.width, maxLogoHeight / logo.height, 1);
    const width = logo.width * scale;
    const height = logo.height * scale;
    logoHeight = height;

    page.drawImage(logo, {
      x: pageWidth - margin - width,
      y: pageHeight - margin - height,
      width,
      height,
    });
  }

  drawWrapped("J Luxe Medical Aesthetics", { size: 13, bold: true, color: colors.accent, spacing: 16 });
  drawWrapped(formTitle, { size: 16, bold: true, spacing: 20, color: colors.text });
  drawWrapped(`Treatment: ${treatmentName}`, { size: 9, color: colors.muted, spacing: 12 });
  drawWrapped(`Submitted: ${submittedAtDisplay}`, { size: 9, color: colors.muted, spacing: 12 });
  if (clientDisplay) {
    drawWrapped(`Client: ${clientDisplay}`, { size: 9, color: colors.muted, spacing: 12 });
  }
  if (logoHeight > 0) {
    y = Math.min(y, pageHeight - margin - logoHeight - 10);
  }
  y -= 4;
  drawDivider();

  type PdfRenderSection = {
    title: string;
    entries: PdfFieldEntry[];
    description?: string;
  };

  const renderSections: PdfRenderSection[] = [];

  const drawFieldCard = (entry: PdfFieldEntry) => {
    const cardPaddingX = 10;
    const cardPaddingY = 8;
    const labelSize = 8;
    const labelLineHeight = 10;
    const valueSize = 10;
    const valueLineHeight = 13;
    const cardInnerWidth = maxWidth - cardPaddingX * 2;

    const labelLines = wrapTextToWidth(entry.label, boldFont, labelSize, cardInnerWidth);
    const valueLines = formatPdfValueLines(entry.value).flatMap((line) => wrapTextToWidth(line, regularFont, valueSize, cardInnerWidth));
    const safeValueLines = valueLines.length > 0 ? valueLines : ["-"];

    const cardHeight = cardPaddingY * 2 + labelLines.length * labelLineHeight + safeValueLines.length * valueLineHeight;

    ensureSpace(cardHeight + 8);

    const cardTopY = y;
    const cardBottomY = cardTopY - cardHeight;

    page.drawRectangle({
      x: margin,
      y: cardBottomY,
      width: maxWidth,
      height: cardHeight,
      color: colors.card,
      borderColor: colors.cardBorder,
      borderWidth: 1,
    });

    let textY = cardTopY - cardPaddingY - labelSize;
    for (const labelLine of labelLines) {
      page.drawText(labelLine, {
        x: margin + cardPaddingX,
        y: textY,
        size: labelSize,
        font: boldFont,
        color: colors.label,
      });
      textY -= labelLineHeight;
    }

    for (const valueLine of safeValueLines) {
      page.drawText(valueLine, {
        x: margin + cardPaddingX,
        y: textY,
        size: valueSize,
        font: regularFont,
        color: colors.text,
      });
      textY -= valueLineHeight;
    }

    y = cardBottomY - 8;
  };

  if (fieldBlueprint.length > 0) {
    const sectionMap = new Map<string, PdfFieldEntry[]>();
    const usedKeys = new Set<string>();
    let fallbackOrder = fieldBlueprint.length;

    for (const item of fieldBlueprint) {
      const value = data[item.name];
      if (!value || usedKeys.has(item.name)) {
        continue;
      }

      const sectionTitle = item.section || PDF_SECTION_TITLES.additional;
      const existing = sectionMap.get(sectionTitle) ?? [];
      existing.push({
        key: item.name,
        label: item.label || toPdfFieldLabel(item.name),
        canonical: toPdfCanonicalKey(item.name),
        value,
        order: item.order,
      });
      sectionMap.set(sectionTitle, existing);
      usedKeys.add(item.name);
    }

    for (const [key, value] of Object.entries(data)) {
      if (usedKeys.has(key)) {
        continue;
      }

      const additionalTitle = PDF_SECTION_TITLES.additional;
      const existing = sectionMap.get(additionalTitle) ?? [];
      existing.push({
        key,
        label: toPdfFieldLabel(key),
        canonical: toPdfCanonicalKey(key),
        value,
        order: fallbackOrder,
      });
      sectionMap.set(additionalTitle, existing);
      fallbackOrder += 1;
    }

    for (const [title, entries] of sectionMap.entries()) {
      renderSections.push({
        title,
        entries: entries.sort((a, b) => a.order - b.order),
      });
    }
  } else {
    const groupedSections: Record<PdfSectionId, PdfFieldEntry[]> = {
      demographics: [],
      medicalHistory: [],
      contraindications: [],
      treatmentDetails: [],
      consent: [],
      practitionerNotes: [],
      additional: [],
    };

    let order = 0;
    for (const [key, value] of Object.entries(data)) {
      const canonical = toPdfCanonicalKey(key);
      const section = getPdfSectionForField(canonical);
      groupedSections[section].push({
        key,
        label: toPdfFieldLabel(key),
        canonical,
        value,
        order,
      });
      order += 1;
    }

    for (const sectionId of PDF_SECTION_ORDER) {
      const entries = groupedSections[sectionId].sort((a, b) => a.order - b.order);
      if (entries.length === 0) {
        continue;
      }

      renderSections.push({
        title: PDF_SECTION_TITLES[sectionId],
        entries,
        description: PDF_SECTION_DESCRIPTIONS[sectionId],
      });
    }
  }

  for (const section of renderSections) {
    ensureSpace(24);
    drawWrapped(section.title, { size: 11, bold: true, color: colors.accent, spacing: 14 });

    if (section.description) {
      drawWrapped(section.description, { size: 8, color: colors.muted, spacing: 10 });
    }

    y -= 2;
    for (const entry of section.entries) {
      drawFieldCard(entry);
    }

    y -= 4;
  }

  return pdfDoc.save();
}

function sanitizeFilenamePart(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function createSubmissionReference(treatmentName: string, submittedAt: string): string {
  const dateSegment = submittedAt.slice(0, 10).replace(/[^0-9]/g, "");
  const slug = sanitizeFilenamePart(treatmentName) || "treatment";
  return `${slug}-${dateSegment}-${randomUUID().slice(0, 8)}`;
}

function createDownloadFilename(treatmentName: string, data: Record<string, FieldValue>): string {
  const firstName = sanitizeFilenamePart(toSingleString(data.firstName)) || "client";
  const treatment = sanitizeFilenamePart(treatmentName) || "treatment";
  return `${firstName}-${treatment}-consultation-form.pdf`;
}

async function savePdfForClinicOnly(reference: string, pdfBytes: Uint8Array): Promise<string> {
  const configuredDir = process.env.FORMS_PDF_STORAGE_DIR?.trim();
  const defaultDir = process.env.VERCEL ? "/tmp/reports/submissions" : "reports/submissions";
  const relativeDir = configuredDir && configuredDir.length > 0 ? configuredDir : defaultDir;
  const outputDir = path.resolve(process.cwd(), relativeDir);

  await mkdir(outputDir, { recursive: true });

  const fileName = `${reference}.pdf`;
  const outputPath = path.join(outputDir, fileName);
  await writeFile(outputPath, Buffer.from(pdfBytes));

  return outputPath;
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

async function emailPdfToClinic(
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

    const clientName = [toSingleString(data.firstName), toSingleString(data.lastName)]
      .filter((item) => item.length > 0)
      .join(" ")
      .trim();
    const email = toSingleString(data.email);
    const phone = toSingleString(data.phone);

    const textBody = [
      "A new treatment consultation form was submitted.",
      "",
      `Reference: ${submissionReference}`,
      `Treatment: ${treatmentName}`,
      `Template: ${template}`,
      `Submitted At: ${submittedAt}`,
      `Treatment Path: ${treatmentPath || "-"}`,
      `Client Name: ${clientName || "-"}`,
      `Client Email: ${email || "-"}`,
      `Client Phone: ${phone || "-"}`,
      "",
      "The completed consultation PDF is attached to this email.",
    ].join("\n");

    await transporter.sendMail({
      from,
      to: to.join(", "),
      subject: `New consultation form: ${treatmentName} (${submissionReference})`,
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
      message: "Clinic email notification sent with PDF attachment.",
    };
  } catch (error) {
    console.error("[FormSubmit][ClinicEmailException]", error);
    return {
      enabled: true,
      ok: false,
      message: "Clinic email notification failed.",
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FormSubmissionPayload;

    const treatmentName = typeof body.treatmentName === "string" && body.treatmentName.trim().length > 0
      ? body.treatmentName.trim()
      : "Treatment";

    const template = resolveTemplate(body.template);
    const treatmentPath = resolveTreatmentPath(body.treatmentPath);

    const submittedAt = typeof body.submittedAt === "string" && body.submittedAt.trim().length > 0
      ? body.submittedAt.trim()
      : new Date().toISOString();

    const data = normalizeData(body.data);
    const fieldBlueprint = normalizeFieldBlueprint(body.fieldBlueprint);

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { ok: false, error: "No form data was submitted." },
        { status: 400 },
      );
    }

    const mailerLite = await syncToMailerLite(treatmentName, treatmentPath, template, submittedAt, data);
    const pdfBytes = await buildPrintablePdf(treatmentName, template, submittedAt, data, fieldBlueprint);
    const submissionReference = createSubmissionReference(treatmentName, submittedAt);
    const downloadFileName = createDownloadFilename(treatmentName, data);
    try {
      const pdfPath = await savePdfForClinicOnly(submissionReference, pdfBytes);
      console.info("[FormSubmit][PdfSaved]", { submissionReference, pdfPath });
    } catch (error) {
      console.error("[FormSubmit][PdfSaveFailed]", { submissionReference, error });
    }
    const clinicEmail = await emailPdfToClinic(
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
      console.info("[FormSubmit][ClinicEmail]", { submissionReference, message: clinicEmail.message });
    } else if (clinicEmail.skipped) {
      console.warn("[FormSubmit][ClinicEmailSkipped]", { submissionReference, message: clinicEmail.message });
    } else {
      console.error("[FormSubmit][ClinicEmailFailed]", { submissionReference, message: clinicEmail.message });
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you. Your consultation form has been submitted successfully.",
      submissionReference,
      mailerLite,
      pdf: {
        fileName: downloadFileName,
        mimeType: "application/pdf",
        base64: Buffer.from(pdfBytes).toString("base64"),
      },
    });
  } catch (error) {
    console.error("[FormSubmitError]", error);
    return NextResponse.json(
      { ok: false, error: "Unable to submit form right now." },
      { status: 500 },
    );
  }
}
