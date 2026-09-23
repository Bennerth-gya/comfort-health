import "server-only";

import { auth } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserRole } from "@/generated/db";

export type SessionUser = {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  role: UserRole;
};

export function isAdminUser(user: SessionUser) {
  return user.role === UserRole.ADMIN;
}

export async function getCurrentUserOrNull(): Promise<SessionUser | null> {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user?.id) {
      return null;
    }

    return {
      id: user.id,
      email: user.email ?? null,
      name: user.name ?? null,
      image: user.image ?? null,
      role: user.role ?? UserRole.USER,
    };
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

export async function getCurrentUser() {
  const user = await getCurrentUserOrNull();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

export async function requireAdminUser() {
  const user = await getCurrentUserOrNull();

  if (!user) {
    redirect("/sign-in");
  }

  if (!isAdminUser(user)) {
    redirect("/sign-in?reason=not-admin");
  }

  return user;
}

export async function getAdminUserOrNull() {
  const user = await getCurrentUserOrNull();

  if (!user || !isAdminUser(user)) {
    return null;
  }

  return user;
}

/**
 * Get the current user's role. Must be called on the server.
 */
export async function getUserRole() {
  const user = await getCurrentUserOrNull();

  if (!user) {
    return null;
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });
    return dbUser?.role ?? user.role;
  } catch (error) {
    console.error("Failed to get user role:", error);
    return user.role;
  }
}
