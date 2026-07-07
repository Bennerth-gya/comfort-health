import type { Metadata } from "next";
import { CartProvider } from "@/app/context/cartContext";
import { ToastProvider } from "@/app/context/toastContext";
import type { ReactNode } from "react";
import "./globals.css";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Comfi Health - Pharmacy & Checkout",
  description: "Shop health products and complete secure checkout with Paystack.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[#f8faf8] text-slate-900 antialiased">
        <BackButton />
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
