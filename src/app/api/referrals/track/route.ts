import { NextResponse } from "next/server";

type ReferralTrackPayload = {
  event?: string;
  ref?: string;
  source?: string;
  path?: string;
  userAgent?: string;
  timestamp?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReferralTrackPayload;
    const payload = {
      event: body.event ?? "referral_visit",
      ref: body.ref ?? "",
      source: body.source ?? "website",
      path: body.path ?? "/",
      userAgent: body.userAgent ?? request.headers.get("user-agent") ?? "",
      timestamp: body.timestamp ?? new Date().toISOString(),
    };

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
