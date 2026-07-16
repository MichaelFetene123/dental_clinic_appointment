"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

/**
 * Creates a new dynamic role and attaches the specified permissions.
 */
export async function createRole(
  name: string,
  description: string,
  permissionIds: string[]
): Promise<ActionResponse> {
  if (!name.trim()) return { success: false, error: "Role name is required" };

  try {
    const existing = await prisma.role.findUnique({ where: { name } });
    if (existing) return { success: false, error: "Role name already exists" };

    await prisma.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          name,
          description,
          isSystem: false,
        },
      });

      if (permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((pId) => ({
            roleId: role.id,
            permissionId: pId,
          })),
        });
      }
    });

    updateTag("roles");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create role:", error);
    return { success: false, error: "Failed to create role" };
  }
}

/**
 * Updates a role's name, description, and permissions.
 * Also triggers a background recalculation of cached permissions for affected active sessions.
 */
export async function updateRole(
  id: string,
  name: string,
  description: string,
  permissionIds: string[]
): Promise<ActionResponse> {
  try {
    const role = await prisma.role.findUnique({ where: { id } });
    if (!role) return { success: false, error: "Role not found" };
    if (role.isSystem) return { success: false, error: "Cannot modify system roles" };

    await prisma.$transaction(async (tx) => {
      await tx.role.update({
        where: { id },
        data: { name, description },
      });

      // Completely replace permissions
      await tx.rolePermission.deleteMany({ where: { roleId: id } });
      if (permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((pId) => ({
            roleId: id,
            permissionId: pId,
          })),
        });
      }
    });

    // Invalidate/refresh active sessions for users with this role
    // For simplicity, we just revoke their active sessions so they must re-authenticate.
    // In a fully seamless system, we would iterate and update their Session.permissionsJson directly.
    const affectedUsers = await prisma.userRole.findMany({ where: { roleId: id } });
    const userIds = affectedUsers.map((ur) => ur.userId);
    
    if (userIds.length > 0) {
      await prisma.session.updateMany({
        where: { userId: { in: userIds }, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }

    updateTag("roles");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update role:", error);
    return { success: false, error: "Failed to update role" };
  }
}

/**
 * Deletes a custom role.
 */
export async function deleteRole(id: string): Promise<ActionResponse> {
  try {
    const role = await prisma.role.findUnique({ where: { id } });
    if (!role) return { success: false, error: "Role not found" };
    if (role.isSystem) return { success: false, error: "Cannot delete system roles" };

    await prisma.role.delete({ where: { id } });
    
    updateTag("roles");
    updateTag("staff"); // Invalidate staff list since their roles may have changed
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete role:", error);
    return { success: false, error: "Failed to delete role" };
  }
}
