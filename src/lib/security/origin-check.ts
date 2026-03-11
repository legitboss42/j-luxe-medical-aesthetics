type OriginCheckResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

const STATIC_ALLOWED_ORIGINS = new Set([
  "https://www.jluxemedicalaesthetics.com",
  "https://jluxemedicalaesthetics.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function resolveOriginFromRequest(request: Request): string | null {
  const originHeader = request.headers.get("origin");
  if (originHeader) {
    return normalizeOrigin(originHeader);
  }

  const refererHeader = request.headers.get("referer");
  if (refererHeader) {
    return normalizeOrigin(refererHeader);
  }

  return null;
}

function buildAllowedOrigins(): Set<string> {
  const allowed = new Set(STATIC_ALLOWED_ORIGINS);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    allowed.add(`https://${vercelUrl}`);
  }

  const extraOrigins = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  for (const item of extraOrigins) {
    const normalized = normalizeOrigin(item);
    if (normalized) {
      allowed.add(normalized);
    }
  }

  return allowed;
}

export function assertAllowedOrigin(request: Request): OriginCheckResult {
  const requestOrigin = resolveOriginFromRequest(request);
  if (!requestOrigin) {
    return { ok: false, status: 403, error: "Request origin is required." };
  }

  const allowed = buildAllowedOrigins();
  if (!allowed.has(requestOrigin) && !requestOrigin.endsWith(".vercel.app")) {
    return { ok: false, status: 403, error: "Request origin is not allowed." };
  }

  return { ok: true };
}
