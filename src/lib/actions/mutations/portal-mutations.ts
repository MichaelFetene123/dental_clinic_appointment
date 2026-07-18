"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { requireAuth } from "@/lib/auth/guards";
import { updateTag } from "next/cache";
// import { sendPortalAccessEmail } from "@/utils/email/mail";

export async function grantPortalAccess(patientId: string, email: string) {
  const session = await requireAuth();

  // Validate patient
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  if (!patient) {
    return { success: false, error: "Patient not found" };
  }

  if (patient.userId) {
    return { success: false, error: "Patient already has portal access" };
  }

  // Handle Email Conflict
  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: {
      patient: true,
      employeeProfile: true,
      userRoles: true,
    },
  });

  let userIdToLink = "";
  const tempPasswordRaw = Math.random().toString(36).slice(-8);
  const hashedPassword = await hashPassword(tempPasswordRaw);

  if (existingUser) {
    if (existingUser.employeeProfile) {
      return { success: false, error: "This email belongs to a staff account." };
    }
    if (existingUser.patient && existingUser.patient.id !== patientId) {
      return { success: false, error: "This email is already linked to a different patient account." };
    }
    if (existingUser.patient && existingUser.patient.id === patientId) {
      return { success: false, error: "Already active." }; // Should not hit if patient.userId is null, but safety first
    }
    // Existing user, no patient linked -> link it
    userIdToLink = existingUser.id;
  } else {
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: patient.name,
        email,
        password: hashedPassword,
      },
    });
    userIdToLink = newUser.id;
  }

  // Link user to patient
  await prisma.patient.update({
    where: { id: patientId },
    data: { userId: userIdToLink },
  });

  updateTag("patients");
  updateTag(`patient-${patientId}`);

  return { success: true, tempPassword: existingUser ? null : tempPasswordRaw };
}

export async function revokePortalAccess(patientId: string) {
  const session = await requireAuth();

  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    select: { userId: true },
  });

  if (!patient || !patient.userId) {
    return { success: false, error: "Patient does not have portal access" };
  }

  // Unlink and optionally delete the user if they only have portal access
  await prisma.patient.update({
    where: { id: patientId },
    data: { userId: null },
  });

  // Check if user has other roles/staff profile
  const user = await prisma.user.findUnique({
    where: { id: patient.userId },
    include: { employeeProfile: true, userRoles: true },
  });

  if (user && !user.employeeProfile && user.userRoles.length === 0) {
    // It's a pure patient user, safe to delete
    await prisma.user.delete({
      where: { id: patient.userId },
    });
  }

  updateTag("patients");
  updateTag(`patient-${patientId}`);

  return { success: true };
}
