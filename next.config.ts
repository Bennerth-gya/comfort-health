import type { NextConfig } from "next";

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

const storagePattern = storageImagePattern();

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://js.paystack.co",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: https://images.unsplash.com https://*.stack-auth.com https://*.built-with-stack-auth.com${storageCspHost()}`,
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
      ...(storagePattern ? [storagePattern] : []),
    ],
    dangerouslyAllowSVG: false,
    qualities: [75],
  },
};

export default nextConfig;
