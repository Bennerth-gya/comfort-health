import type { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

type AdminShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Shared admin chrome: sidebar + main column offset.
 * Use on dashboard, inventory, orders, and add-products pages.
 */
export default function AdminShell({
  children,
  className = "min-h-screen bg-gray-50",
}: AdminShellProps) {
  return (
    <div className={className}>
      <Sidebar />
      {children}
    </div>
  );
}
