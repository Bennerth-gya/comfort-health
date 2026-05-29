export function shouldUnoptimizeProductImage(src: string | null | undefined) {
  if (!src) return false;
  if (src.startsWith("data:")) return true;
  return !src.includes("images.unsplash.com");
}
