import { isAllowlistedAdmin, parseAdminAllowlist } from "@/lib/admin-access";
import { stackServerApp } from "@/stack/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserRole } from "@/generated/db";

type StackUser = NonNullable<Awaited<ReturnType<typeof stackServerApp.getUser>>>;

function userEmail(user: StackUser) {
  const record = user as unknown as Record<string, unknown>;
  const primary = record.primaryEmail;

  if (typeof primary === "string") {
    return primary;
  }

  if (primary && typeof primary === "object" && "email" in primary) {
    const email = (primary as { email?: unknown }).email;
    if (typeof email === "string") {
      return email;
    }
  }

  const candidates = [record.email, record.primary_email];
  return candidates.find((value): value is string => typeof value === "string");
}

function envAllowlistsAdmin(user: StackUser) {
  return isAllowlistedAdmin({
    userId: user.id,
    email: userEmail(user),
    adminIds: parseAdminAllowlist(process.env.ADMIN_USER_IDS),
    adminEmails: parseAdminAllowlist(process.env.ADMIN_EMAILS),
  });
}

/**
 * Check if a user has admin role.
 * Provisions missing users on first login; env allowlist grants ADMIN role.
 */
export async function isAdminUser(user: StackUser): Promise<boolean> {
  const email = userEmail(user);
  const allowlisted = envAllowlistsAdmin(user);

  try {
    const existing = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (existing) {
      if (allowlisted && existing.role !== UserRole.ADMIN) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: UserRole.ADMIN, ...(email ? { email } : {}) },
        });
        return true;
      }
      return existing.role === UserRole.ADMIN;
    }

    const dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email,
        role: allowlisted ? UserRole.ADMIN : UserRole.USER,
      },
    });
    return dbUser.role === UserRole.ADMIN;
  } catch (error) {
    console.error("Failed to check admin status:", error);
    return allowlisted;
  }
}

export async function getCurrentUser() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      redirect("/sign-in");
    }
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    redirect("/sign-in");
  }
}

export async function getCurrentUserOrNull() {
  try {
    return await stackServerApp.getUser({ or: "return-null" });
  } catch (error) {
    console.error("Failed to get current user for API request:", error);
    return null;
  }
}

export async function requireAdminUser() {
  const user = await getCurrentUserOrNull();

  if (!user) {
    redirect("/");
  }

  if (!(await isAdminUser(user))) {
    redirect("/sign-in?reason=not-admin");
  }

  return user;
}

export async function getAdminUserOrNull() {
  const user = await getCurrentUserOrNull();

  if (!user || !(await isAdminUser(user))) {
    return null;
  }

  return user;
}

/**
 * Get the current user's role. Must be called on the server.
 */
export async function getUserRole() {
  const user = await getCurrentUserOrNull();
  if (!user) return null;

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });
    return dbUser?.role ?? "USER";
  } catch (error) {
    console.error("Failed to get user role:", error);
    return "USER";
  }
}
