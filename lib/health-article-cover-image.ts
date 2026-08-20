export function normalizeHealthArticleCoverImage(value: unknown) {
  if (value == null) return null;
  if (typeof value !== "string") {
    throw new Error("Cover image URL must be text.");
  }

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/")) {
    if (trimmed.startsWith("//")) {
      throw new Error("Cover image must be a valid HTTPS URL or local image path.");
    }

    return trimmed;
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error("Cover image must be a valid HTTPS URL or local image path.");
  }

  if (url.protocol !== "https:") {
    throw new Error("Cover image must be a valid HTTPS URL or local image path.");
  }

  return url.toString();
}
