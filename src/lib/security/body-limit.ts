type LimitedJsonParseResult =
  | { ok: true; data: unknown; bytes: number }
  | { ok: false; status: number; error: string };

export async function parseJsonBodyWithLimit(
  request: Request,
  maxBytes: number,
): Promise<LimitedJsonParseResult> {
  const rawBody = await request.text();
  const bytes = new TextEncoder().encode(rawBody).length;

  if (bytes > maxBytes) {
    return {
      ok: false,
      status: 413,
      error: "Submitted data is too large. Please reduce the size and try again.",
    };
  }

  if (!rawBody.trim()) {
    return {
      ok: false,
      status: 400,
      error: "Request body is required.",
    };
  }

  try {
    const data = JSON.parse(rawBody) as unknown;
    return { ok: true, data, bytes };
  } catch {
    return {
      ok: false,
      status: 400,
      error: "Invalid JSON payload.",
    };
  }
}
