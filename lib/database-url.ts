const VERIFY_FULL_COMPAT_SSL_MODES = new Set(["prefer", "require", "verify-ca"]);

export function normalizePostgresSslMode(connectionString: string) {
  try {
    const url = new URL(connectionString);
    const sslMode = url.searchParams.get("sslmode")?.toLowerCase();
    const useLibpqCompat =
      url.searchParams.get("uselibpqcompat")?.toLowerCase() === "true";

    if (
      sslMode &&
      VERIFY_FULL_COMPAT_SSL_MODES.has(sslMode) &&
      !useLibpqCompat
    ) {
      url.searchParams.set("sslmode", "verify-full");
    }

    return url.toString();
  } catch {
    return connectionString;
  }
}
