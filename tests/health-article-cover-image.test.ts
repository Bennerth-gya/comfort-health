import { describe, expect, it } from "vitest";
import { normalizeHealthArticleCoverImage } from "@/lib/health-article-cover-image";

describe("health article cover image URLs", () => {
  it("trims and accepts HTTPS Cloudinary URLs", () => {
    expect(
      normalizeHealthArticleCoverImage(
        " https://res.cloudinary.com/demo/image/upload/sample.jpg "
      )
    ).toBe("https://res.cloudinary.com/demo/image/upload/sample.jpg");
  });

  it("stores blank values as null", () => {
    expect(normalizeHealthArticleCoverImage("   ")).toBeNull();
    expect(normalizeHealthArticleCoverImage(null)).toBeNull();
  });

  it("rejects malformed or non-HTTPS URLs", () => {
    expect(() => normalizeHealthArticleCoverImage("not a url")).toThrow(
      "Cover image must be a valid HTTPS URL or local image path."
    );
    expect(() =>
      normalizeHealthArticleCoverImage("http://res.cloudinary.com/demo/image/upload/sample.jpg")
    ).toThrow("Cover image must be a valid HTTPS URL or local image path.");
  });
});
