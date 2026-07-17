import ImageKit from "@imagekit/nodejs";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  console.warn("WARNING: ImageKit environment variable is missing");
}

export const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy",
  // In v7, you only need the privateKey for backend operations. 
  // URL endpoint and public key are typically used on the client-side via @imagekit/next
});

const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/dummy";
const AVATAR_PUBLIC_DIR = join(process.cwd(), "public", "avatars");
const AVATAR_TRANSFORMATIONS = [
  {
    width: 512,
    height: 512,
    crop: "maintain_ratio" as const,
    quality: 82,
    format: "webp" as const,
  },
];

function toLocalAvatarPath(fileName: string) {
  return `/avatars/${fileName}`;
}

async function deleteIfExists(filePath: string) {
  try {
    await unlink(filePath);
  } catch (error: any) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

export async function saveOptimizedAvatarFromImageKit(sourcePath: string, userId: string) {
  const optimizedUrl = imagekit.helper.buildSrc({
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    src: sourcePath,
    transformation: AVATAR_TRANSFORMATIONS,
  });

  const response = await fetch(optimizedUrl);
  if (!response.ok) {
    throw new Error("Failed to transform avatar using ImageKit");
  }

  const optimizedBytes = Buffer.from(await response.arrayBuffer());
  await mkdir(AVATAR_PUBLIC_DIR, { recursive: true });

  const fileName = `avatar_${userId}_${Date.now()}_${randomUUID().slice(0, 8)}.webp`;
  const absoluteFilePath = join(AVATAR_PUBLIC_DIR, fileName);

  await writeFile(absoluteFilePath, optimizedBytes);

  return {
    filePath: toLocalAvatarPath(fileName),
    absoluteFilePath,
  };
}

export async function deleteLocalAvatar(filePath: string) {
  if (!filePath.startsWith("/avatars/")) {
    return;
  }

  const relativePath = filePath.replace(/^\//, "");
  const absoluteFilePath = join(process.cwd(), "public", relativePath);
  await deleteIfExists(absoluteFilePath);
}

/**
 * Deletes a file from ImageKit
 * @param fileId The ID of the file to delete
 */
export async function deleteImageFromImageKit(fileId: string): Promise<void> {
  await imagekit.files.delete(fileId);
}
