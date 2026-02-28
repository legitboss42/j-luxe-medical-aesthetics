import { NextResponse } from "next/server";
import {
  getTreatmentById,
  TREATMENT_CATALOG,
  type TreatmentCatalogItem,
} from "@/src/lib/skin-advisor/treatment-catalog";

export const runtime = "nodejs";

type AdvisorAnswers = {
  primaryConcern: string;
  goal: string;
  timeline: string;
  skinSensitivity: string;
  injectablePreference: string;
  downtimeTolerance: string;
  notes: string;
};

type OpenAiRecommendationShape = {
  treatmentId: string;
  reason: string;
  confidence: "high" | "medium" | "low";
  alternatives: string[];
  careNote: string;
};

type RecommendationResult = {
  treatmentId: string;
  reason: string;
  confidence: "high" | "medium" | "low";
  alternatives: string[];
  careNote: string;
};

const OPENAI_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-5-mini";
const DEFAULT_FALLBACK_TREATMENT = "facials";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toCleanString(value: unknown, maxLength = 600): string {
  if (typeof value !== "string") {
    return "";
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed.slice(0, maxLength);
}

function normalizeAnswers(raw: unknown): AdvisorAnswers | null {
  if (!isRecord(raw)) {
    return null;
  }

  const answers: AdvisorAnswers = {
    primaryConcern: toCleanString(raw.primaryConcern, 120),
    goal: toCleanString(raw.goal, 120),
    timeline: toCleanString(raw.timeline, 120),
    skinSensitivity: toCleanString(raw.skinSensitivity, 120),
    injectablePreference: toCleanString(raw.injectablePreference, 120),
    downtimeTolerance: toCleanString(raw.downtimeTolerance, 120),
    notes: toCleanString(raw.notes, 500),
  };

  const required = [
    answers.primaryConcern,
    answers.goal,
    answers.timeline,
    answers.skinSensitivity,
    answers.injectablePreference,
    answers.downtimeTolerance,
  ];
  if (required.some((field) => !field)) {
    return null;
  }

  return answers;
}

function isNonInjectablePreference(value: string): boolean {
  return value.toLowerCase().includes("non") || value.toLowerCase().includes("avoid");
}

function defaultReasonForTreatment(treatment: TreatmentCatalogItem): string {
  return `${treatment.name} aligns with your stated concern, goals, and timeline while matching available treatment options on this website.`;
}

function buildFallbackRecommendation(answers: AdvisorAnswers): RecommendationResult {
  const concern = answers.primaryConcern.toLowerCase();
  const goal = answers.goal.toLowerCase();
  const nonInjectableOnly = isNonInjectablePreference(answers.injectablePreference);

  let treatmentId = DEFAULT_FALLBACK_TREATMENT;

  if (concern.includes("wrinkle") || concern.includes("fine line")) {
    treatmentId = nonInjectableOnly ? "facials" : "antiWrinkle";
  } else if (concern.includes("volume") || concern.includes("hollow")) {
    treatmentId = nonInjectableOnly ? "facials" : "dermalFillers";
  } else if (concern.includes("pigment") || concern.includes("dark spot") || concern.includes("tone")) {
    treatmentId = "chemicalPeels";
  } else if (concern.includes("acne scar") || concern.includes("texture")) {
    treatmentId = nonInjectableOnly ? "chemicalPeels" : "prp";
  } else if (concern.includes("dry") || concern.includes("dehydrat")) {
    treatmentId = nonInjectableOnly ? "facials" : "skinBoosters";
  } else if (concern.includes("fat") || concern.includes("contour") || goal.includes("slim")) {
    treatmentId = concern.includes("double chin") && !nonInjectableOnly ? "fatDissolving" : "bodySculpting";
  } else if (concern.includes("hair")) {
    treatmentId = "waxing";
  } else if (concern.includes("teeth") || concern.includes("smile")) {
    treatmentId = "teethWhitening";
  } else if (concern.includes("energy") || concern.includes("wellness")) {
    treatmentId = nonInjectableOnly ? "facials" : "ivDrip";
  }

  const selected = getTreatmentById(treatmentId) ?? getTreatmentById(DEFAULT_FALLBACK_TREATMENT);
  if (!selected) {
    return {
      treatmentId: DEFAULT_FALLBACK_TREATMENT,
      reason: "Your answers suggest starting with a consultation-led skin treatment.",
      confidence: "low",
      alternatives: [],
      careNote:
        "This suggestion is informational only. Final treatment suitability is confirmed in consultation.",
    };
  }

  const alternatives = TREATMENT_CATALOG
    .filter((item) => item.id !== selected.id)
    .filter((item) => (nonInjectableOnly ? !item.injectable : true))
    .slice(0, 2)
    .map((item) => item.id);

  return {
    treatmentId: selected.id,
    reason: defaultReasonForTreatment(selected),
    confidence: "medium",
    alternatives,
    careNote:
      "This suggestion is informational only. Final treatment suitability is confirmed in consultation.",
  };
}

function extractOutputText(responseJson: unknown): string {
  if (!isRecord(responseJson)) {
    return "";
  }

  const direct = responseJson.output_text;
  if (typeof direct === "string" && direct.trim().length > 0) {
    return direct.trim();
  }

  const output = responseJson.output;
  if (!Array.isArray(output)) {
    return "";
  }

  const chunks: string[] = [];
  for (const item of output) {
    if (!isRecord(item)) {
      continue;
    }

    const content = item.content;
    if (!Array.isArray(content)) {
      continue;
    }

    for (const contentItem of content) {
      if (!isRecord(contentItem)) {
        continue;
      }

      const text = contentItem.text;
      if (typeof text === "string" && text.trim().length > 0) {
        chunks.push(text.trim());
      }
    }
  }

  return chunks.join("\n").trim();
}

function parseRecommendationJson(rawText: string): OpenAiRecommendationShape | null {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return null;
  }

  const candidates: string[] = [trimmed];
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    candidates.push(trimmed.slice(firstBrace, lastBrace + 1));
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as unknown;
      if (!isRecord(parsed)) {
        continue;
      }

      const treatmentId = toCleanString(parsed.treatmentId, 80);
      const reason = toCleanString(parsed.reason, 450);
      const careNote = toCleanString(parsed.careNote, 280);
      const confidenceRaw = toCleanString(parsed.confidence, 20).toLowerCase();
      const confidence = confidenceRaw === "high" || confidenceRaw === "medium" || confidenceRaw === "low"
        ? confidenceRaw
        : "medium";

      const alternativesRaw = Array.isArray(parsed.alternatives) ? parsed.alternatives : [];
      const alternatives = alternativesRaw
        .map((value) => toCleanString(value, 80))
        .filter((value) => value.length > 0);

      if (!treatmentId || !reason) {
        continue;
      }

      return {
        treatmentId,
        reason,
        confidence,
        alternatives,
        careNote: careNote || "Please book a consultation for a full suitability check.",
      };
    } catch {
      continue;
    }
  }

  return null;
}

function enforceCatalogConstraints(
  recommendation: RecommendationResult,
  answers: AdvisorAnswers,
  fallback: RecommendationResult,
): RecommendationResult {
  const nonInjectableOnly = isNonInjectablePreference(answers.injectablePreference);
  const selected = getTreatmentById(recommendation.treatmentId);

  const validSelected = selected &&
    (!nonInjectableOnly || !selected.injectable)
    ? selected
    : getTreatmentById(fallback.treatmentId);

  if (!validSelected) {
    return fallback;
  }

  const alternatives = recommendation.alternatives
    .map((id) => getTreatmentById(id))
    .filter((item): item is TreatmentCatalogItem => Boolean(item))
    .filter((item) => item.id !== validSelected.id)
    .filter((item) => (nonInjectableOnly ? !item.injectable : true))
    .slice(0, 2)
    .map((item) => item.id);

  return {
    treatmentId: validSelected.id,
    reason: recommendation.reason || defaultReasonForTreatment(validSelected),
    confidence: recommendation.confidence,
    alternatives,
    careNote: recommendation.careNote,
  };
}

async function requestOpenAiRecommendation(answers: AdvisorAnswers): Promise<RecommendationResult | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
  const catalogPayload = TREATMENT_CATALOG.map((item) => ({
    id: item.id,
    name: item.name,
    path: item.path,
    summary: item.summary,
    bestFor: item.bestFor,
    injectable: item.injectable,
  }));

  const systemPrompt = [
    "You are an assistant for J Luxe Medical Aesthetics.",
    "You must recommend exactly one treatment from the provided catalog based only on the visitor answers.",
    "Do not diagnose medical conditions.",
    "Prefer non-injectable options when injectablePreference says no injectables.",
    "Return only JSON with this exact shape:",
    '{"treatmentId":"string","reason":"string","confidence":"high|medium|low","alternatives":["string","string"],"careNote":"string"}',
  ].join(" ");

  const userPrompt = JSON.stringify(
    {
      visitorAnswers: answers,
      availableTreatments: catalogPayload,
      task: "Pick one best-match treatment and up to two alternatives from availableTreatments IDs only.",
    },
    null,
    2,
  );

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: systemPrompt }],
          },
          {
            role: "user",
            content: [{ type: "input_text", text: userPrompt }],
          },
        ],
        max_output_tokens: 450,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[SkinAdvisor][OpenAIError]", errorText);
      return null;
    }

    const responseJson = (await response.json()) as unknown;
    const outputText = extractOutputText(responseJson);
    const parsed = parseRecommendationJson(outputText);
    if (!parsed) {
      return null;
    }

    return {
      treatmentId: parsed.treatmentId,
      reason: parsed.reason,
      confidence: parsed.confidence,
      alternatives: parsed.alternatives,
      careNote: parsed.careNote,
    };
  } catch (error) {
    console.error("[SkinAdvisor][OpenAIException]", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const answers = normalizeAnswers(body);
    if (!answers) {
      return NextResponse.json(
        { ok: false, error: "Please answer all required questions to get a recommendation." },
        { status: 400 },
      );
    }

    const fallback = buildFallbackRecommendation(answers);
    const openAiRecommendation = await requestOpenAiRecommendation(answers);

    const finalRecommendation = enforceCatalogConstraints(
      openAiRecommendation ?? fallback,
      answers,
      fallback,
    );

    const selected = getTreatmentById(finalRecommendation.treatmentId);
    if (!selected) {
      return NextResponse.json(
        { ok: false, error: "Unable to determine a suitable treatment right now." },
        { status: 500 },
      );
    }

    const alternatives = finalRecommendation.alternatives
      .map((id) => getTreatmentById(id))
      .filter((item): item is TreatmentCatalogItem => Boolean(item))
      .map((item) => ({
        id: item.id,
        name: item.name,
        path: item.path,
      }));

    return NextResponse.json({
      ok: true,
      source: openAiRecommendation ? "openai" : "fallback",
      recommendation: {
        treatmentId: selected.id,
        treatmentName: selected.name,
        treatmentPath: selected.path,
        reason: finalRecommendation.reason,
        confidence: finalRecommendation.confidence,
        alternatives,
        careNote: finalRecommendation.careNote,
        disclaimer:
          "This is an informational recommendation only and not medical advice. Final suitability is confirmed in consultation.",
      },
    });
  } catch (error) {
    console.error("[SkinAdvisor][RouteError]", error);
    return NextResponse.json(
      { ok: false, error: "Unable to generate a treatment recommendation right now." },
      { status: 500 },
    );
  }
}

