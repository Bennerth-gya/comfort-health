import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { CartProvider } from "@/app/context/cartContext";
import { ToastProvider } from "@/app/context/toastContext";
import { stackServerApp } from "@/stack/server";
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
      <body>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <BackButton />
            <ToastProvider>
              <CartProvider>{children}</CartProvider>
            </ToastProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
