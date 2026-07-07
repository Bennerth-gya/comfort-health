import "server-only";

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
