import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import "next-auth/jwt";
import { isAllowlistedAdmin, parseAdminAllowlist } from "@/lib/admin-access";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    role?: UserRole;
  }
}

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
const googleClientId = process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID;
const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET;

function grantsAdmin(userId: string, email: string) {
  return isAllowlistedAdmin({
    userId,
    email,
    adminIds: parseAdminAllowlist(process.env.ADMIN_USER_IDS),
    adminEmails: parseAdminAllowlist(process.env.ADMIN_EMAILS),
  });
}

/**
 * Creates the user row on first sign in and keeps the ADMIN role in sync with
 * the `ADMIN_USER_IDS` / `ADMIN_EMAILS` allowlists. Matching on email keeps the
 * same user id (and therefore the same inventory) across providers.
 */
async function provisionUser(email: string, name?: string | null) {
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true },
  });

  if (existing) {
    const shouldPromote =
      existing.role !== UserRole.ADMIN && grantsAdmin(existing.id, email);

    if (!shouldPromote) {
      return existing;
    }

    return prisma.user.update({
      where: { id: existing.id },
      data: { role: UserRole.ADMIN },
      select: { id: true, role: true },
    });
  }

  return prisma.user.create({
    data: {
      email,
      name: name ?? undefined,
      role: grantsAdmin("", email) ? UserRole.ADMIN : UserRole.USER,
    },
    select: { id: true, role: true },
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (profile && profile.email_verified === false) {
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      const email = user?.email ?? token.email;

      if (!email) {
        return token;
      }

      if (user || !token.uid) {
        const dbUser = await provisionUser(email, user?.name ?? token.name);
        token.uid = dbUser.id;
        token.role = dbUser.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid ?? session.user.id;
        session.user.role = token.role ?? UserRole.USER;
      }

      return session;
    },
  },
});
