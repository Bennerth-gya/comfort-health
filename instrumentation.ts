export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { warnProductionEnv } = await import("./lib/env");
    warnProductionEnv();
  }
}
