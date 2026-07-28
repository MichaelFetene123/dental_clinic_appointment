"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

export type PortalUserRow = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  hasActiveSession: boolean;
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
  cacheTag("portal-users");
  cacheLife("hours");

  // Fetch portal users: users who have a patient linked and no employee profile
  const users = await prisma.user.findMany({
    where: {
      isSuperAdmin: false,
      employeeProfile: null,
      patient: { isNot: null },
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      patient: {
        select: { id: true, name: true, phone: true },
      },
      sessions: {
        where: {
          revokedAt: null,
          tokenExpiresAt: { gt: new Date() },
        },
        select: { id: true },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.user.count({
    where: {
      isSuperAdmin: false,
      employeeProfile: null,
      patient: { isNot: null },
    },
  });

  const data: PortalUserRow[] = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt.toISOString(),
    hasActiveSession: u.sessions.length > 0,
    patient: u.patient
      ? { id: u.patient.id, name: u.patient.name, phone: u.patient.phone }
      : null,
  }));

  return { data, total };
}
