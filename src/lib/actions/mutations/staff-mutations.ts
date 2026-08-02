"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { hashPassword } from "@/lib/bcrypt";
import { requirePermission } from "@/lib/auth/guards";
import crypto from "crypto";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; errors?: Record<string, string> };

export async function createStaff(
  _prevState: ActionResponse<{ tempPassword?: string }>,
  formData: FormData
): Promise<ActionResponse<{ tempPassword?: string }>> {
  await requirePermission("staff.create");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const roleId = formData.get("roleId") as string; // Dynamic role ID from the Role table
  const position = formData.get("position") as string;
  const department = formData.get("department") as string;

  if (!name || !email || !roleId || !position || !department) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Email already exists" };
    }

    const tempPassword = crypto.randomBytes(8).toString("hex");

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          phone,
          password: await hashPassword(tempPassword),
        },
      });

      // Assign the dynamic role
      await tx.userRole.create({
        data: {
          userId: user.id,
          roleId,
        },
      });

      await tx.employeeProfile.create({
        data: {
          userId: user.id,
          position,
          department,
        },
      });
    });

    updateTag("staff");
    return { success: true, data: { tempPassword } };
  } catch {
    return { success: false, error: "Failed to create staff member" };
  }
}

/**
 * Updates name, email, phone, position, department, and role for a staff member.
 * Requires: staff.edit permission.
 */
export async function updateStaff(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  await requirePermission("staff.edit");

  const id = (formData.get("id") as string | null) || "";
  const name = (formData.get("name") as string | null) || "";
  const email = (formData.get("email") as string | null) || "";
  const phone = (formData.get("phone") as string | null) || "";
  const roleId = (formData.get("roleId") as string | null) || "";
  const position = (formData.get("position") as string | null) || "";
  const department = (formData.get("department") as string | null) || "";

  if (!id || !name || !email || !roleId || !position || !department) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    // Check email uniqueness (excluding self)
    const conflict = await prisma.user.findFirst({ where: { email, NOT: { id } } });
    if (conflict) return { success: false, error: "Email is already in use by another account" };

    await prisma.$transaction(async (tx) => {
      // Update user core fields
      await tx.user.update({
        where: { id },
        data: { name, email, phone: phone || null },
      });

      // Replace role: remove all current roles, assign the new one
      await tx.userRole.deleteMany({ where: { userId: id } });
      await tx.userRole.create({ data: { userId: id, roleId } });

      // Upsert employee profile
      await tx.employeeProfile.upsert({
        where: { userId: id },
        update: { position, department },
        create: { userId: id, position, department },
      });
    });

    updateTag("staff");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update staff member" };
  }
}

/**
 * Deletes a staff member by their User ID.
 * Requires: staff.delete permission.
 */
export async function deleteStaff(id: string): Promise<ActionResponse> {
  await requirePermission("staff.delete");
  try {
    await prisma.user.delete({ where: { id } });
    updateTag("staff");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete staff member" };
  }
}

/**
 * Resets a staff member's password to a secure random string and revokes their sessions.
 * Requires: staff.edit permission.
 */
export async function resetStaffPassword(userId: string): Promise<ActionResponse<{ tempPassword: string }>> {
  await requirePermission("staff.edit");
  try {
    const tempPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await hashPassword(tempPassword);

    await prisma.$transaction(async (tx) => {
      // Update password
      await tx.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      // Revoke all active sessions
      await tx.session.deleteMany({
        where: { userId },
      });
    });

    return { success: true, data: { tempPassword } };
  } catch (error) {
    return { success: false, error: "Failed to reset password" };
  }
}
