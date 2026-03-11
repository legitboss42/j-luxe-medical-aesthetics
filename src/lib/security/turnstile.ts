import { getClientIp } from "@/src/lib/security/request-helpers";

type TurnstileResult = {
  ok: boolean;
  skipped: boolean;
  error?: string;
};

export async function verifyTurnstile(request: Request, token: string | undefined): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true, skipped: true };
  }

  const trimmedToken = token?.trim();
  if (!trimmedToken) {
    return { ok: false, skipped: false, error: "Missing bot verification." };
  }

  try {
    const ip = getClientIp(request);
    const body = new URLSearchParams({
      secret,
      response: trimmedToken,
      remoteip: ip,
    });

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      return { ok: false, skipped: false, error: "Bot verification failed." };
    }

    const json = (await response.json()) as { success?: boolean; ["error-codes"]?: string[] };
    if (!json.success) {
      return { ok: false, skipped: false, error: "Bot verification failed." };
    }

    return { ok: true, skipped: false };
  } catch {
    return { ok: false, skipped: false, error: "Bot verification failed." };
  }
}
