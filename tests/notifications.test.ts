import { afterEach, describe, expect, it, vi } from "vitest";
import { sendBmsSMS } from "@/lib/notifications";

describe("BMS SMS acknowledgement", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("accepts a successful provider acknowledgement and bounds the request duration", async () => {
    vi.stubEnv("BMS_API_KEY", "test-key");
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ code: "2000", status: "success" }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendBmsSMS("0240000000", "Test order")).toBe(true);
    expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  it.each([{ code: "1004" }, { status: "error" }, null])(
    "rejects an HTTP 200 response without a valid acknowledgement: %j",
    async (body) => {
      vi.stubEnv("BMS_API_KEY", "test-key");
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(body)));
      vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(await sendBmsSMS("0240000000", "Test order")).toBe(false);
    },
  );

  it("handles a timeout without logging the request URL or credentials", async () => {
    vi.stubEnv("BMS_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("sensitive request URL")));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await sendBmsSMS("0240000000", "Test order")).toBe(false);
    expect(log).toHaveBeenCalledWith("BMS Africa SMS notification failed:", "Error");
  });
});
