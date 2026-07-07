import { afterEach, describe, expect, it, vi } from "vitest";
import { assertSameOrigin, RequestSecurityError } from "@/lib/request-security";

describe("request origin checks", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows the request URL origin during local development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ALLOWED_ORIGINS", "http://localhost:3000");

    const request = new Request("http://192.168.1.25:3000/api/paystack", {
      method: "POST",
      headers: { origin: "http://192.168.1.25:3000" },
    });

    expect(() => assertSameOrigin(request)).not.toThrow();
  });

  it("accepts loopback aliases for the same local dev server", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ALLOWED_ORIGINS", "");

    const request = new Request("http://192.168.1.25:3000/api/paystack", {
      method: "POST",
      headers: { origin: "http://127.0.0.1:3000" },
    });

    expect(() => assertSameOrigin(request)).not.toThrow();
  });

  it("still rejects unconfigured origins in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOWED_ORIGINS", "https://comfihealth.com");

    const request = new Request("https://comfihealth.com/api/paystack", {
      method: "POST",
      headers: { origin: "https://attacker.example" },
    });

    expect(() => assertSameOrigin(request)).toThrow(RequestSecurityError);
  });
});
