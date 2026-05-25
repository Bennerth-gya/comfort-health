import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

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
