const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true as const };
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false as const,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);

  return { allowed: true as const };
};

// TODO: Replace this in-memory store with a shared store (Upstash/Redis)
// to avoid resets on cold starts or multi-region serverless runtimes.
