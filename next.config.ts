import type { NextConfig } from "next";

function csv(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function originHost(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return value;
  }
}

const privateDevOriginHosts = [
  "localhost",
  "*.localhost",
  "127.0.0.1",
  "10.*.*.*",
  "172.*.*.*",
  "192.168.*.*",
];

function allowedDevOrigins() {
  const hosts = new Set<string>(
    process.env.NODE_ENV === "production" ? [] : privateDevOriginHosts,
  );

  for (const value of [
    ...csv(process.env.ALLOWED_DEV_ORIGINS),
    ...csv(process.env.ALLOWED_ORIGINS),
    process.env.APP_URL,
    process.env.NEXT_PUBLIC_APP_URL,
  ]) {
    if (value) {
      hosts.add(originHost(value));
    }
  }

  return hosts.size > 0 ? Array.from(hosts) : undefined;
}

function storageImagePattern() {
  const publicUrl = process.env.S3_PUBLIC_URL;
  if (!publicUrl) return null;

  try {
    const { protocol, hostname } = new URL(publicUrl);
    if (protocol !== "https:" && protocol !== "http:") return null;

    return {
      protocol: protocol.replace(":", "") as "https" | "http",
      hostname,
      pathname: "/**" as const,
    };
  } catch {
    return null;
  }
}

function storageCspHost() {
  const hostname = storageImagePattern()?.hostname;
  return hostname ? ` https://${hostname}` : "";
}

function productImageRemotePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "*.amazonaws.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "*.r2.dev",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "*.r2.cloudflarestorage.com",
      pathname: "/**",
    },
  ];

  const storage = storageImagePattern();
  if (storage) {
    patterns.push(storage);
  }

  return patterns;
}

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedDevOrigins(),
  turbopack: {
    root: __dirname,
  },
  async headers() {
    // Strict CSP breaks Next.js dev (HMR needs eval) and can block hydration → blank black page.
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://js.paystack.co https://*.stack-auth.com https://*.built-with-stack-auth.com",
      "style-src 'self' 'unsafe-inline'",
      // `https:` allows product/CDN images loaded directly (unoptimized remote URLs).
      `img-src 'self' data: blob: https: https://images.unsplash.com https://*.stack-auth.com https://*.built-with-stack-auth.com${storageCspHost()}`,
      "font-src 'self' data:",
      "connect-src 'self' https://api.paystack.co https://api.stack-auth.com https://api1.stack-auth.com https://api2.stack-auth.com https://app.stack-auth.com https://*.stack-auth.com",
      "frame-src 'self' https://checkout.paystack.com https://*.paystack.co https://*.built-with-stack-auth.com",
      "form-action 'self' https://checkout.paystack.com https://*.paystack.co",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: productImageRemotePatterns(),
    dangerouslyAllowSVG: false,
    qualities: [75],
  },
};

export default nextConfig;
