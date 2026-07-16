"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
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
  const roleId = formData.get("roleId") as string; // Dynamic role ID from the Role table
  const position = formData.get("position") as string;
  const department = formData.get("department") as string;

  if (!name || !email || !roleId || !position || !department) {
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
          password: await hashPassword("ChangeMe@123"),
        },
      });

      // Assign the dynamic role
      await tx.userRole.create({
        data: {
          userId: user.id,
          roleId,
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
  } catch {
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
