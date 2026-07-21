"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/guards";
import { cacheTag } from "next/cache";
export async function getProfile() {
  const session = await requireAuth();
  return getCachedProfile(session.userId);
}

async function getCachedProfile(userId: string) {
  "use cache";
  cacheTag(`profile-${userId}`);

  const user = await prisma.user.findUnique({
    where: { id: userId },
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
