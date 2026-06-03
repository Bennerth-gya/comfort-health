/** Inline base64 images must bypass the Next.js image optimizer. */
export function isDataImageUrl(src: string | null | undefined) {
  return !!src && src.startsWith("data:");
}

/** Static files served from /public. */
export function isLocalImageUrl(src: string | null | undefined) {
  return !!src && src.startsWith("/");
}

/**
 * When true, the browser loads the image URL directly.
 * Remote product URLs (S3/CDN/custom HTTPS) rely on CSP `img-src https:`.
 */
export function shouldUnoptimizeProductImage(src: string | null | undefined) {
  if (!src) return false;
  if (isDataImageUrl(src)) return true;
  if (isLocalImageUrl(src)) return false;
  return true;
}
