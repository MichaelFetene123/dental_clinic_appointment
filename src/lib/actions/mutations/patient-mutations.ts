"use server";

import { prisma } from "@/lib/prisma";
import { unstable_updateTag as updateTag } from "next/cache";
import { patientFormSchema } from "@/lib/validationSchema";
import { Gender, BloodType, GumCondition } from "@prisma/client";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; errors?: Record<string, string> };

export async function createPatient(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const rawData: Record<string, string> = {};
  formData.forEach((value, key) => {
    rawData[key] = value as string;
  });

  // Default values
  rawData.role = "PATIENT";
  rawData.password = rawData.password || "default-password-change-me"; // Dummy password for manual patient creation by admin

  const result = patientFormSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) errors[field] = issue.message;
    }
    return { success: false, error: "Validation failed", errors };
  }

  const data = result.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with this email already exists.",
        errors: { email: "Email already exists" },
      };
    }

    // Use transaction to create user, profile, and dental history
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password, // In a real app, hash this!
          role: "PATIENT",
          phone: data.phone,
          address: data.address,
        },
      });

      const profile = await tx.patientProfile.create({
        data: {
          userId: user.id,
          gender: data.gender as Gender,
          dateOfBirth: new Date(data.dateOfBirth),
          bloodType: data.bloodType as BloodType,
          medicalHistory: data.medicalHistory,
          emergencyContactName: data.emergencyContactName,
          emergencyContactPhone: data.emergencyContactPhone,
          insuranceProvider: data.insuranceProvider,
          insuranceNumber: data.insuranceNumber,
          height: parseFloat(data.height),
          weight: parseFloat(data.weight),
          bloodPressure: data.bloodPressure,
          heartRate: parseInt(data.heartRate),
          bloodSugarLevel: parseFloat(data.bloodSugarLevel),
          allergies: data.allergies,
          medications: data.medications,
          chronicDiseases: data.chronicDiseases,
          lastDentalVisit: new Date(data.lastDentalVisit),
        },
      });

      await tx.dentalHistory.create({
        data: {
          patientId: profile.id,
          gumCondition: data.gumCondition as GumCondition,
          toothDecay: parseInt(data.toothDecay),
          missingTeethCount: parseInt(data.missingTeethCount),
          prostheticsUsed: data.prostheticsUsed,
        },
      });
    });

    updateTag("patients");
    updateTag("dashboard"); // Since patients count affects dashboard stats

    return { success: true };
  } catch (error: any) {
    console.error("Error creating patient:", error);
    return { success: false, error: "Failed to create patient record. Please try again." };
  }
}
