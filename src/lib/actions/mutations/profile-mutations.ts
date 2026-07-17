"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/guards";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { uploadImageToImageKit, deleteImageFromImageKit } from "@/lib/imagekit";
import { updateTag } from "next/cache";

export async function updateProfileInfo(name: string, email: string, phone: string | null) {
  const session = await requireAuth();

  // Validate email uniqueness if changed
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser && existingUser.id !== session.userId) {
    throw new Error("Email is already in use by another account.");
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: { name, email, phone },
  });

  updateTag(`profile-${session.userId}`);
  return { success: true };
}

export async function changePassword(current: string, newPass: string) {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) throw new Error("User not found");

  const isValid = await comparePassword(current, user.password);
  if (!isValid) {
    throw new Error("Incorrect current password.");
  }

  const newPasswordHash = await hashPassword(newPass);

  await prisma.user.update({
    where: { id: session.userId },
    data: { password: newPasswordHash },
  });

  return { success: true };
}

export async function updateAvatar(formData: FormData) {
  const session = await requireAuth();

  const file = formData.get("avatar") as File | null;
  if (!file) throw new Error("No file provided");

  // Validate size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("File exceeds 2MB limit.");
  }

  // Validate type
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Create a unique filename
  const extension = file.name.split('.').pop() || 'jpg';
  const fileName = `avatar_${session.userId}_${Date.now()}.${extension}`;

  // Upload to ImageKit
  const { filePath, fileId } = await uploadImageToImageKit(buffer, fileName);

  // Fetch current user to see if they have an existing avatar
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { avatarFileId: true },
  });

  // Update DB
  await prisma.user.update({
    where: { id: session.userId },
    data: { avatar: filePath, avatarFileId: fileId },
  });

  // Delete old avatar from ImageKit if it exists
  if (user?.avatarFileId) {
    try {
      await deleteImageFromImageKit(user.avatarFileId);
    } catch (e) {
      console.warn("Failed to delete old avatar from ImageKit", e);
    }
  }

  updateTag(`profile-${session.userId}`);
  return { success: true, avatar: filePath };
}

export async function removeAvatar() {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { avatarFileId: true },
  });

  if (user?.avatarFileId) {
    try {
      await deleteImageFromImageKit(user.avatarFileId);
    } catch (e) {
      console.warn("Failed to delete avatar from ImageKit", e);
    }
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: { avatar: null, avatarFileId: null },
  });

  updateTag(`profile-${session.userId}`);
  return { success: true };
}
