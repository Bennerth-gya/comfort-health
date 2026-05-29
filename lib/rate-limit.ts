import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { RequestSecurityError } from "@/lib/http-errors";

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type MemoryEntry = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, MemoryEntry>();
const distributedLimiters = new Map<string, Ratelimit>();

function isUpstashConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

function getDistributedLimiter(options: RateLimitOptions) {
  const windowSeconds = Math.max(1, Math.ceil(options.windowMs / 1000));
  const cacheKey = `${options.limit}:${windowSeconds}`;

  let limiter = distributedLimiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(options.limit, `${windowSeconds} s`),
      prefix: "comfi",
    });
    distributedLimiters.set(cacheKey, limiter);
  }

  return limiter;
}

function consumeMemoryRateLimit(identifier: string, options: RateLimitOptions) {
  const now = Date.now();

  for (const [bucketKey, entry] of memoryBuckets) {
    if (entry.resetAt <= now) {
      memoryBuckets.delete(bucketKey);
    }
  }

  const current = memoryBuckets.get(identifier);

  if (!current || current.resetAt <= now) {
    memoryBuckets.set(identifier, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return;
  }

  current.count += 1;

  if (current.count > options.limit) {
    throw new RequestSecurityError("Too many requests. Please try again later.", 429);
  }
}

export async function consumeRateLimit(
  identifier: string,
  options: RateLimitOptions,
) {
  if (!isUpstashConfigured()) {
    consumeMemoryRateLimit(identifier, options);
    return;
  }

  const limiter = getDistributedLimiter(options);
  const result = await limiter.limit(identifier);

  if (!result.success) {
    throw new RequestSecurityError("Too many requests. Please try again later.", 429);
  }
}
