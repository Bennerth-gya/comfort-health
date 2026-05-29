import { isAllowlistedAdmin, parseAdminAllowlist } from "@/lib/admin-access";
import { stackServerApp } from "@/stack/server";
import { forbidden, redirect } from "next/navigation";

type StackUser = NonNullable<Awaited<ReturnType<typeof stackServerApp.getUser>>>;

function userEmail(user: StackUser) {
  const record = user as unknown as Record<string, unknown>;
  const candidates = [
    record.primaryEmail,
    record.email,
    record.primary_email,
  ];

  return candidates.find((value): value is string => typeof value === "string");
}

export function isAdminUser(user: StackUser) {
  return isAllowlistedAdmin({
    userId: user.id,
    email: userEmail(user),
    adminIds: parseAdminAllowlist(process.env.ADMIN_USER_IDS),
    adminEmails: parseAdminAllowlist(process.env.ADMIN_EMAILS),
  });
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
  const user = await getCurrentUser();

  if (!isAdminUser(user)) {
    forbidden();
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
