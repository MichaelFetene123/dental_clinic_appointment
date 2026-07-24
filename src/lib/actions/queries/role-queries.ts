"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

export type RoleData = {
  id: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  permissionIds: string[];
};

export type PermissionData = {
  id: string;
  resource: string;
  action: string;
  description: string | null;
};

export async function getRoles(): Promise<RoleData[]> {
  "use cache";
  cacheTag("roles");
  cacheLife("hours");

  const roles = await prisma.role.findMany({
    include: {
      permissions: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    isSystem: role.isSystem,
    permissionIds: role.permissions.map((rp) => rp.permissionId),
  }));
}

export async function getPermissions(): Promise<PermissionData[]> {
  "use cache";
  cacheTag("permissions");
  cacheLife("hours");

  const perms = await prisma.permission.findMany({
    orderBy: [{ resource: "asc" }, { action: "asc" }],
  });

  return perms.map((p) => ({
    id: p.id,
    resource: p.resource,
    action: p.action,
    description: p.description,
  }));
}
