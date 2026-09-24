import dns from "node:dns";
import { describe, expect, it } from "vitest";
import { preferIpv4Dns } from "@/lib/prefer-ipv4";

describe("preferIpv4Dns", () => {
  it("sets Node DNS to ipv4first", () => {
    preferIpv4Dns();
    expect(dns.getDefaultResultOrder()).toBe("ipv4first");
  });
});
