"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

export type StaffRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
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
      where: { role: { in: ["ADMIN", "DOCTOR", "RECEPTIONIST"] } },
      include: { employeeProfile: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where: { role: { in: ["ADMIN", "DOCTOR", "RECEPTIONIST"] } } }),
  ]);

  const data: StaffRow[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "N/A",
    role: user.role,
    position: user.employeeProfile?.position ?? "N/A",
    department: user.employeeProfile?.department ?? "N/A",
  }));

  return { data, total };
}
