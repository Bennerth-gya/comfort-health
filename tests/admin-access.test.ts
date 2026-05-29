import { describe, expect, it } from "vitest";
import { isAllowlistedAdmin, parseAdminAllowlist } from "@/lib/admin-access";

describe("admin access", () => {
  it("allows any user in non-production when allowlists are empty", () => {
    expect(
      isAllowlistedAdmin({
        userId: "user-1",
        email: "any@example.com",
        adminIds: new Set(),
        adminEmails: new Set(),
        nodeEnv: "development",
      }),
    ).toBe(true);
  });

  it("denies everyone in production when allowlists are empty", () => {
    expect(
      isAllowlistedAdmin({
        userId: "user-1",
        email: "admin@example.com",
        adminIds: new Set(),
        adminEmails: new Set(),
        nodeEnv: "production",
      }),
    ).toBe(false);
  });

  it("matches configured admin id or email", () => {
    const adminIds = parseAdminAllowlist("User-ABC");
    const adminEmails = parseAdminAllowlist("admin@example.com");

    expect(
      isAllowlistedAdmin({
        userId: "user-abc",
        email: "other@example.com",
        adminIds,
        adminEmails,
        nodeEnv: "production",
      }),
    ).toBe(true);

    expect(
      isAllowlistedAdmin({
        userId: "other",
        email: "Admin@Example.com",
        adminIds,
        adminEmails,
        nodeEnv: "production",
      }),
    ).toBe(true);
  });
});
