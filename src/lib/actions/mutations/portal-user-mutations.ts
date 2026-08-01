"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { requirePermission } from "@/lib/auth/guards";
import { updateTag } from "next/cache";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Updates portal user access.
 * Requires: portal_users.manage permission.
 */
export async function updatePortalUserEmail(
  userId: string,
  newEmail: string
): Promise<ActionResponse> {
  try {
    await requirePermission("portal_users.manage");

    if (!newEmail.trim()) return { success: false, error: "Email is required" };

    const existing = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existing && existing.id !== userId) {
      return { success: false, error: "This email is already in use by another account" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail.trim().toLowerCase() },
    });

    updateTag("portal-users");
    updateTag("patients");
    return { success: true };
  } catch (err: any) {
    console.error("updatePortalUserEmail:", err);
    return { success: false, error: err.message ?? "Failed to update email" };
  }
}

/**
 * Resets a portal user's password to a random temporary password.
 * Requires: portal_users.manage permission.
 */
export async function resetPortalUserPassword(
  userId: string
): Promise<ActionResponse<{ tempPassword: string }>> {
  try {
    await requirePermission("portal_users.manage");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, error: "User not found" };

    const tempPasswordRaw = Math.random().toString(36).slice(-10);
    const hashed = await hashPassword(tempPasswordRaw);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    // Revoke all active sessions so the user must log in again with the new password
    await prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    updateTag("portal-users");
    return { success: true, data: { tempPassword: tempPasswordRaw } };
  } catch (err: any) {
    console.error("resetPortalUserPassword:", err);
    return { success: false, error: err.message ?? "Failed to reset password" };
  }
}

/**
 * Revokes portal access for a user.
 * Requires: portal_users.manage permission.
 */
export async function unlinkPortalUser(
  userId: string
): Promise<ActionResponse> {
  try {
    await requirePermission("portal_users.manage");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: { select: { id: true } },
        employeeProfile: true,
        userRoles: true,
      },
    });

    if (!user) return { success: false, error: "User not found" };
    if (!user.patient) return { success: false, error: "This user is not linked to any patient" };

    const patientId = user.patient.id;

    // Unlink the patient (keep the user account intact)
    await prisma.patient.update({
      where: { id: patientId },
      data: { userId: null },
    });

    // Revoke any active sessions so they can't continue using the portal
    await prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    updateTag("portal-users");
    updateTag("patients");
    updateTag(`patient-${patientId}`);
    return { success: true };
  } catch (err: any) {
    console.error("unlinkPortalUser:", err);
    return { success: false, error: err.message ?? "Failed to unlink portal account" };
  }
}

/**
 * Deletes a portal user (this is a soft delete or hard delete depending on requirements, here we hard delete the User record).
 * Requires: portal_users.manage permission.
 */
export async function deletePortalUser(userId: string): Promise<ActionResponse> {
  try {
    await requirePermission("portal_users.manage");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: { select: { id: true } },
        employeeProfile: true,
      },
    });

    if (!user) return { success: false, error: "User not found" };
    if (user.employeeProfile) {
      return { success: false, error: "Cannot delete a staff account from this panel" };
    }

    const patientId = user.patient?.id;

    // Unlink and delete in a single transaction
    await prisma.$transaction(async (tx) => {
      if (patientId) {
        await tx.patient.update({
          where: { id: patientId },
          data: { userId: null },
        });
      }
      await tx.user.delete({ where: { id: userId } });
    });

    updateTag("portal-users");
    updateTag("patients");
    if (patientId) updateTag(`patient-${patientId}`);
    return { success: true };
  } catch (err: any) {
    console.error("deletePortalUser:", err);
    return { success: false, error: err.message ?? "Failed to delete portal account" };
  }
}
