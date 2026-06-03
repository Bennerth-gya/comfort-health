import { StackClientApp } from "@stackframe/stack";

const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
const publishableClientKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;
const missingEnvVars = [
  !projectId && "NEXT_PUBLIC_STACK_PROJECT_ID",
  !publishableClientKey && "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY",
].filter(Boolean);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing Stack Auth env vars: ${missingEnvVars.join(", ")}`);
}

export const stackClientApp = new StackClientApp({
  projectId,
  publishableClientKey,
  tokenStore: "nextjs-cookie",
  redirectMethod: "nextjs",
  noAutomaticPrefetch: true,
  urls: {
    handler: "/handler",
    signIn: "/sign-in",
    signUp: "/handler/sign-up",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
  },
});
