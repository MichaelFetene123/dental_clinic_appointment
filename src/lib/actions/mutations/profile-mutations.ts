"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/guards";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import {
  deleteImageFromImageKit,
  deleteLocalAvatar,
  saveOptimizedAvatarFromImageKit,
} from "@/lib/imagekit";
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

export async function saveAvatarRecord(filePath: string, fileId: string) {
  const session = await requireAuth();

  // Fetch current user to see if they have an existing avatar
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { avatar: true, avatarFileId: true },
  });

  const { filePath: localAvatarPath } = await saveOptimizedAvatarFromImageKit(filePath, session.userId);

  // Update DB
  await prisma.user.update({
    where: { id: session.userId },
    data: { avatar: localAvatarPath, avatarFileId: null },
  });

  // Remove the temporary upload from ImageKit after the optimized local file is stored.
  if (fileId) {
    try {
      await deleteImageFromImageKit(fileId);
    } catch (e) {
      console.warn("Failed to delete temporary avatar from ImageKit", e);
    }
  }

  // Clean up the previous avatar from its original storage location.
  if (user?.avatarFileId && user.avatarFileId !== fileId) {
    try {
      await deleteImageFromImageKit(user.avatarFileId);
    } catch (e) {
      console.warn("Failed to delete old avatar from ImageKit", e);
    }
  }

  if (user?.avatar && user.avatar.startsWith("/avatars/")) {
    try {
      await deleteLocalAvatar(user.avatar);
    } catch (e) {
      console.warn("Failed to delete old local avatar", e);
    }
  }

  updateTag(`profile-${session.userId}`);
  return { success: true, avatar: localAvatarPath };
}

export async function removeAvatar() {
  const session = await requireAuth();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { avatar: true, avatarFileId: true },
  });

  if (user?.avatarFileId) {
    try {
      await deleteImageFromImageKit(user.avatarFileId);
    } catch (e) {
      console.warn("Failed to delete avatar from ImageKit", e);
    }
  }

  if (user?.avatar && user.avatar.startsWith("/avatars/")) {
    try {
      await deleteLocalAvatar(user.avatar);
    } catch (e) {
      console.warn("Failed to delete local avatar", e);
    }
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: { avatar: null, avatarFileId: null },
  });

  updateTag(`profile-${session.userId}`);
  return { success: true };
}
