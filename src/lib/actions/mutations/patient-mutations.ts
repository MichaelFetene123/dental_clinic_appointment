"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { patientFormSchema } from "@/lib/validationSchema";
import { Gender, BloodType, GumCondition } from "@/app/generated/prisma/client";

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
    const patient = await prisma.patient.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        gender: data.gender as Gender | undefined,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        bloodType: data.bloodType as BloodType,
        medicalHistory: data.medicalHistory,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        insuranceProvider: data.insuranceProvider,
        insuranceNumber: data.insuranceNumber,
        height: data.height,
        weight: data.weight,
        bloodPressure: data.bloodPressure,
        heartRate: data.heartRate,
        bloodSugarLevel: data.bloodSugarLevel,
        allergies: data.allergies,
        medications: data.medications,
        chronicDiseases: data.chronicDiseases,
        lastDentalVisit: data.lastDentalVisit ? new Date(data.lastDentalVisit) : undefined,
        gumCondition: data.gumCondition as GumCondition | undefined,
        toothDecay: data.toothDecay,
        missingTeethCount: data.missingTeethCount,
        prostheticsUsed: data.prostheticsUsed,
      },
    });

    updateTag("patients");
    updateTag("dashboard"); // Since patients count affects dashboard stats

    return { success: true };
  } catch (error: any) {
    console.error("Error creating patient:", error);
    return { success: false, error: "Failed to create patient record. Please try again." };
  }
}
