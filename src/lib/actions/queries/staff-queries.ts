"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

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

export async function getStaff(): Promise<StaffListResult> {
  "use cache";
  cacheTag("staff");
  cacheLife("hours");

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: { isSuperAdmin: false }, // Exclude super admins from staff list
      include: {
        employeeProfile: true,
        userRoles: { include: { role: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where: { isSuperAdmin: false } }),
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
