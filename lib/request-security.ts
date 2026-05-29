import "server-only";

import { RequestSecurityError } from "@/lib/http-errors";
import { consumeRateLimit } from "@/lib/rate-limit";

export { RequestSecurityError };

function csv(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toOrigin(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    throw new RequestSecurityError("Invalid origin configuration.", 500);
  }
}

function configuredOrigins(request: Request) {
  const origins = new Set<string>();

  for (const value of csv(process.env.ALLOWED_ORIGINS)) {
    origins.add(toOrigin(value));
  }

  for (const value of [process.env.APP_URL, process.env.NEXT_PUBLIC_APP_URL]) {
    if (value) {
      origins.add(toOrigin(value));
    }
  }

  if (origins.size === 0) {
    origins.add(new URL(request.url).origin);
  }

  return origins;
}

function clientIp(request: Request) {
  if (process.env.RATE_LIMIT_TRUST_PROXY_HEADERS === "true") {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
      return forwardedFor.split(",")[0]?.trim() ?? "unknown";
    }

    return (
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-real-ip") ??
      "unknown"
    );
  }

  return "shared";
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    const fetchSite = request.headers.get("sec-fetch-site");
    if (
      process.env.NODE_ENV !== "production" ||
      fetchSite === "same-origin" ||
      fetchSite === "same-site"
    ) {
      return;
    }

    throw new RequestSecurityError("Missing request origin.", 403);
  }

  let requestOrigin: string;
  try {
    requestOrigin = new URL(origin).origin;
  } catch {
    throw new RequestSecurityError("Invalid request origin.", 403);
  }

  if (!configuredOrigins(request).has(requestOrigin)) {
    throw new RequestSecurityError("Invalid request origin.", 403);
  }
}

export function assertJsonContentType(request: Request) {
  const contentType = request.headers.get("content-type");
  if (!contentType?.toLowerCase().includes("application/json")) {
    throw new RequestSecurityError("Content-Type must be application/json.", 415);
  }
}

export function assertRequestBodySize(request: Request, maxBytes: number) {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return;

  const size = Number(contentLength);
  if (!Number.isFinite(size) || size > maxBytes) {
    throw new RequestSecurityError("Request body is too large.", 413);
  }
}

export async function readRequestText(request: Request, maxBytes: number) {
  assertRequestBodySize(request, maxBytes);

  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let body = "";
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;

    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      throw new RequestSecurityError("Request body is too large.", 413);
    }

    body += decoder.decode(value, { stream: true });
  }

  body += decoder.decode();
  return body;
}

export async function readJsonRequest(request: Request, maxBytes: number) {
  const body = await readRequestText(request, maxBytes);

  if (!body.trim()) {
    throw new RequestSecurityError("Request body is required.", 400);
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new RequestSecurityError("Request body must be valid JSON.", 400);
  }
}

export async function rateLimitRequest(
  request: Request,
  key: string,
  options: { limit: number; windowMs: number },
) {
  const identifier = `${key}:${clientIp(request)}`;
  await consumeRateLimit(identifier, options);
}
