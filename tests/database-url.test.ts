import { describe, expect, it } from "vitest";
import { normalizePostgresSslMode } from "@/lib/database-url";

describe("database URL normalization", () => {
  it("preserves current pg SSL behavior with explicit verify-full", () => {
    const url = normalizePostgresSslMode(
      "postgresql://user:pass@example.com/db?sslmode=require&channel_binding=require",
    );

    expect(new URL(url).searchParams.get("sslmode")).toBe("verify-full");
    expect(new URL(url).searchParams.get("channel_binding")).toBe("require");
  });

  it("keeps libpq compatibility URLs unchanged", () => {
    const input =
      "postgresql://user:pass@example.com/db?uselibpqcompat=true&sslmode=require";

    expect(normalizePostgresSslMode(input)).toBe(input);
  });
});
