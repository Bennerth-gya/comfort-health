import "server-only";

import Link from "next/link";
import { getCurrentUserOrNull, isAdminUser } from "@/lib/auth";

/**
 * Only visible to signed-in admins. No public Admin/Login links on the storefront.
 * Staff: bookmark /sign-in (not linked from the shop).
 */
export async function AdminHeaderLink() {
  const user = await getCurrentUserOrNull();

  if (!user || !(await isAdminUser(user))) {
    return null;
  }

  return (
    <Link
      href="/dashboard"
      className="hidden text-sm font-medium text-gray-600 hover:text-emerald-600 md:block"
    >
      Dashboard
    </Link>
  );
}
