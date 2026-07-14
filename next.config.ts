import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // ════════════════════════════════════════
  // THE BUNDLE SIZE KILLER — THIS IS THE
  // MOST IMPORTANT SECTION IN THIS FILE
  // ════════════════════════════════════════
  serverExternalPackages: [
    'groq-sdk',
    '@prisma/client',
    'prisma',
    'resend',
    '@anthropic-ai/sdk',
    'nodemailer',
    'bcrypt',
    'bcryptjs',
    'jsonwebtoken',
    'crypto',
    'fs',
    'path',
    'os',
    'stream',
    'http',
    'https',
    'net',
    'tls',
    'child_process',
    'dns',
    'pg',
    'pg-native',
    'pg-pool',
  ],

  // ════════════════════════════════════════
  // IMAGE OPTIMIZATION
  // ════════════════════════════════════════
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [375, 390, 412, 768, 1024, 1280, 1920],
    imageSizes: [32, 64, 128, 256, 384],
    remotePatterns: [
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
    ],
  },

  // ════════════════════════════════════════
  // COMPILER OPTIMIZATIONS
  // ════════════════════════════════════════
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // ════════════════════════════════════════
  // WEBPACK CONFIGURATION
  // ════════════════════════════════════════
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        os: false,
        http: false,
        https: false,
        child_process: false,
        dns: false,
        pg: false,
        'pg-native': false,
        'fs/promises': false,
        'stream/web': false,
        'util/types': false,
        perf_hooks: false,
        async_hooks: false,
        'node:crypto': false,
        'node:fs': false,
        'node:path': false,
        'node:stream': false,
        'node:http': false,
        'node:https': false,
        'node:os': false,
        'node:net': false,
        'node:tls': false,
        'node:buffer': false,
        'node:util': false,
        'node:url': false,
        'node:querystring': false,
        'node:events': false,
      }
    }

    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 200000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            react: {
              name: 'chunk-react',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              chunks: 'all',
              priority: 50,
              enforce: true,
            },
            lucide: {
              name: 'chunk-lucide',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            stackAuth: {
              name: 'chunk-stack-auth',
              test: /[\\/]node_modules[\\/]@stackframe[\\/]/,
              chunks: 'all',
              priority: 35,
            },
            vendor: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    return config
  },

  // ════════════════════════════════════════
  // CACHE-CONTROL HEADERS
  // ════════════════════════════════════════
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return []
    }

    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/hero/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*.{jpg,jpeg,png,webp,avif,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=2592000',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // ════════════════════════════════════════
  // GENERAL SETTINGS
  // ════════════════════════════════════════
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default withAnalyzer(nextConfig)
