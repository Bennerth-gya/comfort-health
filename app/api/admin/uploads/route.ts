import { NextResponse } from "next/server";
import { getAdminUserOrNull } from "@/lib/auth";
import {
  assertSameOrigin,
  rateLimitRequest,
  RequestSecurityError,
} from "@/lib/request-security";
import { isObjectStorageConfigured, uploadProductImage } from "@/lib/storage";

export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await rateLimitRequest(request, "upload:image", { limit: 30, windowMs: 60_000 });

    const user = await getAdminUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!isObjectStorageConfigured()) {
      return NextResponse.json(
        {
          error:
            "Object storage is not configured. Set S3_BUCKET, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY.",
        },
        { status: 503 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Image must be 2MB or smaller." }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadProductImage({
      userId: user.id,
      buffer,
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Failed to upload product image", error);

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
