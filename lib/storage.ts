import "server-only";

/*
 SUPABASE STORAGE SETUP (one-time, done in Supabase dashboard):
 1. Go to supabase.com → your project → Storage
 2. Click "Create bucket"
 3. Name: health-images
 4. Toggle "Public bucket" ON
 5. Click "Create bucket"
 The public URL base will be:
   https://ydjqsflsqtczcuskxxli.supabase.co/storage/v1/object/public/health-images/
*/

import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export function isObjectStorageConfigured() {
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY,
  );
}

function getS3Client() {
  if (!isObjectStorageConfigured()) {
    throw new Error("Object storage is not configured.");
  }

  return new S3Client({
    region: process.env.S3_REGION ?? "auto",
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  });
}

function publicObjectUrl(key: string) {
  const configured = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");
  if (configured) {
    return `${configured}/${key}`;
  }

  const bucket = process.env.S3_BUCKET!;
  const region = process.env.S3_REGION ?? "us-east-1";
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

function extensionForContentType(contentType: string) {
  switch (contentType) {
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

export async function uploadProductImage(input: {
  userId: string;
  buffer: Buffer;
  contentType: string;
}) {
  if (!ALLOWED_IMAGE_TYPES.has(input.contentType.toLowerCase())) {
    throw new Error("Unsupported image type.");
  }

  if (input.buffer.byteLength > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 2MB or smaller.");
  }

  const extension = extensionForContentType(input.contentType.toLowerCase());
  const key = `products/${input.userId}/${randomUUID()}.${extension}`;
  const client = getS3Client();

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: input.buffer,
      ContentType: input.contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return publicObjectUrl(key);
}

export function storagePublicHostname() {
  const configured = process.env.S3_PUBLIC_URL;
  if (!configured) return null;

  try {
    return new URL(configured).hostname;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE STORAGE — Health article cover images
// Uses SUPABASE_SECRET_KEY (service role) to bypass RLS for admin uploads.
// ─────────────────────────────────────────────────────────────────────────────

const HEALTH_BUCKET = "health-images";
const HEALTH_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const HEALTH_ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Accept either naming convention used in this project
  const key =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase admin credentials missing. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY are set."
    );
  }

  return createSupabaseAdminClient(url, key, {
    auth: { persistSession: false },
  });
}

export type HealthImageUploadResult = {
  success: boolean;
  url?: string;
  error?: string;
};

/**
 * Upload a health article cover image to Supabase Storage.
 * Returns the permanent public URL on success.
 */
export async function uploadHealthImage(input: {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  folder?: string;
}): Promise<HealthImageUploadResult> {
  const { buffer, fileName, mimeType, folder = "covers" } = input;

  if (!HEALTH_ALLOWED_TYPES.has(mimeType.toLowerCase())) {
    return { success: false, error: "Invalid file type. Only JPEG, PNG, WebP and GIF are allowed." };
  }

  if (buffer.byteLength > HEALTH_MAX_BYTES) {
    return { success: false, error: "File too large. Maximum size is 5 MB." };
  }

  const ext = mimeType.split("/")[1]?.replace("jpeg", "jpg") ?? "bin";
  const safeName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "-")
    .replace(/-+/g, "-");
  const storagePath = `${folder}/${Date.now()}-${randomUUID()}-${safeName}.${ext}`;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage
    .from(HEALTH_BUCKET)
    .upload(storagePath, buffer, { contentType: mimeType, upsert: false });

  if (error) {
    console.error("Supabase health image upload error:", error);
    return { success: false, error: error.message };
  }

  const { data } = supabase.storage.from(HEALTH_BUCKET).getPublicUrl(storagePath);
  return { success: true, url: data.publicUrl };
}

/**
 * Delete a health article cover image from Supabase Storage.
 * Silently succeeds if the URL doesn't match the bucket.
 */
export async function deleteHealthImage(imageUrl: string): Promise<boolean> {
  try {
    const marker = `/${HEALTH_BUCKET}/`;
    const idx = imageUrl.indexOf(marker);
    if (idx === -1) return false;

    // The path after the bucket name (strip any query params)
    const storagePath = imageUrl.slice(idx + marker.length).split("?")[0];

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage
      .from(HEALTH_BUCKET)
      .remove([storagePath]);

    if (error) {
      console.error("Supabase health image delete error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("deleteHealthImage error:", err);
    return false;
  }
}
