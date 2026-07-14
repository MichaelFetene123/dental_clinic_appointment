"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { Role } from "@/app/generated/prisma/client";
import { hashPassword } from "@/lib/bcrypt";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; errors?: Record<string, string> };

export async function createStaff(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as Role;
  const position = formData.get("position") as string;
  const department = formData.get("department") as string;

  if (!name || !email || !role || !position || !department) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Email already exists" };
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          phone,
          role,
          password: await hashPassword("ChangeMe@123"),
        },
      });

      await tx.employeeProfile.create({
        data: {
          userId: user.id,
          position,
          department,
        },
      });
    });

    updateTag("staff");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to create staff member" };
  }
}

export async function deleteStaff(id: string): Promise<ActionResponse> {
  try {
    await prisma.user.delete({ where: { id } });
    updateTag("staff");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete staff member" };
  }
}
