export async function uploadProductImageFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/admin/uploads", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as { url?: string; error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to upload image.");
  }

  if (!data.url) {
    throw new Error("Upload did not return an image URL.");
  }

  return data.url;
}
