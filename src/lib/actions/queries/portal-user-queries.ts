"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";
import { requirePermission } from "@/lib/auth/guards";

export type PortalUserRow = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  patient: {
    id: string;
    name: string;
    phone: string;
  } | null;
};

export type PortalUserListResult = {
  data: PortalUserRow[];
  total: number;
};

/**
 * Returns all User accounts that are linked to a Patient (portal accounts).
 * Excludes staff/employee accounts.
 */
export async function getPortalUsers(): Promise<PortalUserListResult> {
  "use cache";
  await requirePermission("portal_users.read");
  cacheTag("portal-users");
  cacheLife("hours");

  // Fetch portal users: users who have no employee profile and no roles (i.e. pure patient accounts)
  const users = await prisma.user.findMany({
    where: {
      isSuperAdmin: false,
      employeeProfile: null,
      userRoles: { none: {} },
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      patient: {
        select: { id: true, name: true, phone: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.user.count({
    where: {
      isSuperAdmin: false,
      employeeProfile: null,
      userRoles: { none: {} },
    },
  });

  const data: PortalUserRow[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt.toISOString(),
    isActive: !!u.patient,
    patient: u.patient
      ? { id: u.patient.id, name: u.patient.name, phone: u.patient.phone }
      : null,
  }));

  return { data, total };
}
