import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientIp } from "@/src/lib/security/request-helpers";

type RateLimitResult = {
  allowed: boolean;
  skipped: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
};

function canRateLimit(): boolean {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  return Boolean(url && token);
}

export async function checkRateLimit(
  request: Request,
  keyPrefix: string,
  options?: { limit?: number; window?: `${number} s` | `${number} m` | `${number} h` },
): Promise<RateLimitResult> {
  if (!canRateLimit()) {
    return { allowed: true, skipped: true };
  }

  const ip = getClientIp(request);
  const key = `${keyPrefix}:${ip}`;

  const limit = options?.limit ?? 5;
  const window = options?.window ?? "1 m";
  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix: "jluxe-rate-limit",
  });

  const result = await limiter.limit(key);
  return {
    allowed: result.success,
    skipped: false,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
