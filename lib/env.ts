import "server-only";

function csv(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function shouldEnforceProductionEnv() {
  if (process.env.NODE_ENV !== "production") {
    return false;
  }

  // Next.js sets NODE_ENV=production during `next build`; skip env enforcement there.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return false;
  }

  return true;
}

export function assertProductionEnv() {
  if (!shouldEnforceProductionEnv()) {
    return;
  }

  const missing: string[] = [];

  if (!process.env.DATABASE_URL && !process.env.DATABASE_POOL_URL) {
    missing.push("DATABASE_URL or DATABASE_POOL_URL");
  }

  if (!process.env.STACK_SECRET_SERVER_KEY) {
    missing.push("STACK_SECRET_SERVER_KEY");
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    missing.push("PAYSTACK_SECRET_KEY");
  }

  if (!process.env.GROQ_API_KEY) {
    missing.push("GROQ_API_KEY");
  }

  const adminIds = csv(process.env.ADMIN_USER_IDS);
  const adminEmails = csv(process.env.ADMIN_EMAILS);

  if (adminIds.length === 0 && adminEmails.length === 0) {
    missing.push("ADMIN_USER_IDS and/or ADMIN_EMAILS");
  }

  if (!process.env.ORDER_RECEIPT_SECRET) {
    missing.push("ORDER_RECEIPT_SECRET");
  } else if (
    process.env.PAYSTACK_SECRET_KEY &&
    process.env.ORDER_RECEIPT_SECRET === process.env.PAYSTACK_SECRET_KEY
  ) {
    throw new Error(
      "ORDER_RECEIPT_SECRET must be different from PAYSTACK_SECRET_KEY in production.",
    );
  }

  if (!process.env.APP_URL) {
    missing.push("APP_URL");
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    missing.push("NEXT_PUBLIC_APP_URL");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required production environment variables: ${missing.join(", ")}`,
    );
  }
}
