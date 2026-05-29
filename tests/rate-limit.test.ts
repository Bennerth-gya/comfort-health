import { describe, expect, it, vi } from "vitest";
import { consumeRateLimit } from "@/lib/rate-limit";
import { RequestSecurityError } from "@/lib/http-errors";

describe("rate limiting", () => {
  it("uses in-memory fallback when Upstash is not configured", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");

    const identifier = `test:${Date.now()}:${Math.random()}`;

    await expect(
      consumeRateLimit(identifier, { limit: 2, windowMs: 60_000 }),
    ).resolves.toBeUndefined();
    await expect(
      consumeRateLimit(identifier, { limit: 2, windowMs: 60_000 }),
    ).resolves.toBeUndefined();
    await expect(
      consumeRateLimit(identifier, { limit: 2, windowMs: 60_000 }),
    ).rejects.toBeInstanceOf(RequestSecurityError);
  });
});
