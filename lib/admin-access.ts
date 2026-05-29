export function parseAdminAllowlist(value: string | undefined) {
  return new Set(
    (value ?? "")
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAllowlistedAdmin(input: {
  userId: string;
  email?: string | null;
  adminIds: Set<string>;
  adminEmails: Set<string>;
  nodeEnv?: string;
}) {
  const { adminIds, adminEmails } = input;

  if (adminIds.size === 0 && adminEmails.size === 0) {
    return (input.nodeEnv ?? process.env.NODE_ENV) !== "production";
  }

  const email = input.email?.toLowerCase();
  return (
    adminIds.has(input.userId.toLowerCase()) ||
    (!!email && adminEmails.has(email))
  );
}
