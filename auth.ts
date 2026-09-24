import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// The dev server binds 0.0.0.0. Without AUTH_URL, Auth.js advertises that as
// the OAuth origin and GitHub returns to /callback/github with no `code`.
if (
  process.env.NODE_ENV !== "production" &&
  !process.env.AUTH_URL &&
  !process.env.NEXTAUTH_URL
) {
  process.env.AUTH_URL = "http://localhost:3000";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? process.env.GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export function isNextAuthConfigured() {
  const hasSecret = Boolean(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET);
  const hasGitHub = Boolean(
    (process.env.AUTH_GITHUB_ID || process.env.GITHUB_ID) &&
      (process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_SECRET),
  );
  return hasSecret && hasGitHub;
}
