import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/app/context/cartContext";
import { ToastProvider } from "@/app/context/toastContext";
import AppChrome from "@/components/AppChrome";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Comfi Health - Pharmacy & Checkout",
  description: "Shop health products and complete secure checkout with Paystack.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#f8faf8] text-slate-900 antialiased">
        <ToastProvider>
          <CartProvider>
            <AppChrome>{children}</AppChrome>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
