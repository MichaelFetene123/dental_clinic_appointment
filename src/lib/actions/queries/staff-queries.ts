"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";
import type { Prisma } from "@/app/generated/prisma/client";

export type StaffRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: string[]; // Array of role names from dynamic RBAC
  position: string;
  department: string;
};

export type StaffListResult = {
  data: StaffRow[];
  total: number;
};

// Staff = users with an employee profile OR at least one assigned role.
// This explicitly excludes pure portal patient accounts (no profile, no roles).
const staffFilter: Prisma.UserWhereInput = {
  isSuperAdmin: false,
  OR: [
    { employeeProfile: { isNot: null } },
    { userRoles: { some: {} } },
  ],
};

export async function getStaff(): Promise<StaffListResult> {
  "use cache";
  cacheTag("staff");
  cacheLife("hours");

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: staffFilter,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        employeeProfile: {
          select: { position: true, department: true },
        },
        userRoles: {
          select: { role: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where: staffFilter }),
  ]);

  const data: StaffRow[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "N/A",
    roles: user.userRoles.map((ur) => ur.role.name),
    position: user.employeeProfile?.position ?? "N/A",
    department: user.employeeProfile?.department ?? "N/A",
  }));

  return { data, total };
}
