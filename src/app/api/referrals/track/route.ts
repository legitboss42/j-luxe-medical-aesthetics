import { NextResponse } from "next/server";
import { checkRateLimit } from "@/src/lib/security/rate-limit";
import { parseJsonBodyWithLimit } from "@/src/lib/security/body-limit";
import { assertAllowedOrigin } from "@/src/lib/security/origin-check";

type ReferralTrackPayload = {
  event?: string;
  ref?: string;
  source?: string;
  path?: string;
  userAgent?: string;
  timestamp?: string;
};
const MAX_REFERRAL_REQUEST_BYTES = 32_000;
const ALLOWED_REFERRAL_EVENTS = new Set([
  "referral_visit",
  "referral_popup_seen",
  "referral_applied",
]);

function toSafeString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLength);
}

function normalizeReferralCode(value: unknown): string {
  const raw = toSafeString(value, 120);
  // Keep analytics clean: allow only typical referral-code characters.
  return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
}

function normalizePath(value: unknown): string {
  const raw = toSafeString(value, 200);
  if (!raw || !raw.startsWith("/")) {
    return "/";
  }
  return raw;
}

function normalizeTimestamp(value: unknown): string {
  const raw = toSafeString(value, 40);
  if (!raw) {
    return new Date().toISOString();
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }
  return parsed.toISOString();
}

function normalizeEvent(value: unknown): string {
  const raw = toSafeString(value, 40).toLowerCase();
  if (!raw || !ALLOWED_REFERRAL_EVENTS.has(raw)) {
    return "referral_visit";
  }
  return raw;
}

function normalizeReferralPayload(body: unknown, request: Request) {
  const payload = (body && typeof body === "object" && !Array.isArray(body))
    ? (body as ReferralTrackPayload)
    : {};

  return {
    event: normalizeEvent(payload.event),
    ref: normalizeReferralCode(payload.ref),
    source: toSafeString(payload.source, 40) || "website",
    path: normalizePath(payload.path),
    userAgent: toSafeString(payload.userAgent, 300) || toSafeString(request.headers.get("user-agent"), 300),
    timestamp: normalizeTimestamp(payload.timestamp),
  };
}

export async function POST(request: Request) {
  try {
    const originCheck = assertAllowedOrigin(request);
    if (!originCheck.ok) {
      return NextResponse.json({ ok: false }, { status: originCheck.status });
    }

    const rateLimit = await checkRateLimit(request, "referral-track", { limit: 10, window: "1 m" });
    if (!rateLimit.allowed) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const parsed = await parseJsonBodyWithLimit(request, MAX_REFERRAL_REQUEST_BYTES);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false }, { status: parsed.status });
    }

    const payload = normalizeReferralPayload(parsed.data, request);

    // Server logs can be viewed in hosting logs (e.g. Vercel/Node logs).
    console.log("[ReferralTrack]", payload);

    const webhookUrl = process.env.REFERRAL_TRACKING_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[ReferralTrackError]", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
