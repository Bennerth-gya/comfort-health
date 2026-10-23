import { NextResponse } from "next/server";

// Health-check endpoint — no dynamic data needed.
// Cache at CDN for 30 s so monitoring tools don't generate origin traffic.
export const revalidate = 30;

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    },
  );
}
