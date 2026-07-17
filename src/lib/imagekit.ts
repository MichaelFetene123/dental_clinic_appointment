import ImageKit, { toFile } from "@imagekit/nodejs";

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  console.warn("WARNING: ImageKit environment variable is missing");
}

export const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy",
  // In v7, you only need the privateKey for backend operations. 
  // URL endpoint and public key are typically used on the client-side via @imagekit/next
});

/**
 * Uploads a file to ImageKit
 * @param fileBuffer Buffer of the file
 * @param fileName Original file name
 * @param folder Folder to upload to (e.g. "/avatars")
 * @returns Object with filePath and fileId
 */
export async function uploadImageToImageKit(
  fileBuffer: Buffer,
  fileName: string,
  folder: string = "/avatars"
): Promise<{ filePath: string; fileId: string }> {
  const result = await imagekit.files.upload({
    file: await toFile(fileBuffer, fileName),
    fileName,
    folder,
  });

  return {
    filePath: result.filePath || "", // The relative path (e.g., /avatars/filename.jpg)
    fileId: result.fileId || "",     // ID required for deletion
  };
}

/**
 * Deletes a file from ImageKit
 * @param fileId The ID of the file to delete
 */
export async function deleteImageFromImageKit(fileId: string): Promise<void> {
  await imagekit.files.delete(fileId);
}
