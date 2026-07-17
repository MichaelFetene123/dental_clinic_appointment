"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/guards";
import { cacheTag } from "next/cache";

export async function getProfile() {
  "use cache";
  const session = await requireAuth();
  cacheTag(`profile-${session.userId}`);

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      isSuperAdmin: true,
      userRoles: {
        include: {
          role: {
            select: { name: true },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    ...user,
    roles: user.userRoles.map((ur) => ur.role.name),
  };
}
