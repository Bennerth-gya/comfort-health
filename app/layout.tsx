import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/app/context/cartContext";
import { ToastProvider } from "@/app/context/toastContext";
import AppChrome from "@/components/AppChrome";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#15803d' },
    { media: '(prefers-color-scheme: dark)', color: '#0f2318' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: 'Comfort Health — Campus Pharmacy Delivery',
    template: '%s | Comfort Health',
  },
  description: 'Order authentic medications and get same-day campus delivery to your hostel. Comfort Health — Good health with comfort.',
  keywords: [
    'pharmacy delivery', 
    'campus pharmacy', 
    'medicine delivery Ghana',
    'UMaT pharmacy',
    'Tarkwa pharmacy',
    'health delivery Ghana',
    'Comfort Health'
  ],
  authors: [{ name: 'Comfort Health' }],
  creator: 'Comfort Health',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://comforthealth.com'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    siteName: 'Comfort Health',
    title: 'Comfort Health — Campus Pharmacy Delivery',
    description: 'Same-day medicine delivery to your campus hostel.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#f8faf8] text-slate-900 antialiased">
        <ToastProvider>
          <CartProvider>
            <AppChrome>{children}</AppChrome>
          </CartProvider>
        </ToastProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
