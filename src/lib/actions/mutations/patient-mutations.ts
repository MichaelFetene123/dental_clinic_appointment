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
        phone: data.phone,                              // required
        gender: data.gender as Gender,                  // required
        dateOfBirth: new Date(data.dateOfBirth),        // required
        email: data.email || undefined,
        address: data.address || undefined,
        bloodType: (data.bloodType as BloodType) ?? "UNKNOWN",
        medicalHistory: data.medicalHistory || undefined,
        emergencyContactName: data.emergencyContactName || undefined,
        emergencyContactPhone: data.emergencyContactPhone || undefined,
        insuranceProvider: data.insuranceProvider || undefined,
        insuranceNumber: data.insuranceNumber || undefined,
        height: data.height || undefined,
        weight: data.weight || undefined,
        bloodPressure: data.bloodPressure || undefined,
        heartRate: data.heartRate || undefined,
        bloodSugarLevel: data.bloodSugarLevel || undefined,
        allergies: data.allergies || undefined,
        medications: data.medications || undefined,
        chronicDiseases: data.chronicDiseases || undefined,
        lastDentalVisit: data.lastDentalVisit ? new Date(data.lastDentalVisit) : undefined,
        gumCondition: (data.gumCondition as GumCondition) ?? "HEALTHY",
        toothDecay: data.toothDecay || undefined,
        missingTeethCount: data.missingTeethCount || undefined,
        prostheticsUsed: data.prostheticsUsed || undefined,
      },
    });

    updateTag("patients");
    updateTag("dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating patient:", error);
    return { success: false, error: "Failed to create patient record. Please try again." };
  }
}

export async function updatePatient(
  id: string,
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
    await prisma.patient.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        gender: data.gender as Gender,
        dateOfBirth: new Date(data.dateOfBirth),
        email: data.email || null,
        address: data.address || null,
        bloodType: (data.bloodType as BloodType) ?? "UNKNOWN",
        medicalHistory: data.medicalHistory || null,
        emergencyContactName: data.emergencyContactName || null,
        emergencyContactPhone: data.emergencyContactPhone || null,
        insuranceProvider: data.insuranceProvider || null,
        insuranceNumber: data.insuranceNumber || null,
        height: data.height || null,
        weight: data.weight || null,
        bloodPressure: data.bloodPressure || null,
        heartRate: data.heartRate || null,
        bloodSugarLevel: data.bloodSugarLevel || null,
        allergies: data.allergies || null,
        medications: data.medications || null,
        chronicDiseases: data.chronicDiseases || null,
        lastDentalVisit: data.lastDentalVisit ? new Date(data.lastDentalVisit) : null,
        gumCondition: (data.gumCondition as GumCondition) ?? "HEALTHY",
        toothDecay: data.toothDecay || null,
        missingTeethCount: data.missingTeethCount || null,
        prostheticsUsed: data.prostheticsUsed || null,
      },
    });

    updateTag("patients");
    updateTag(`patient-${id}`);

    return { success: true };
  } catch (error: any) {
    console.error("Error updating patient:", error);
    return { success: false, error: "Failed to update patient record. Please try again." };
  }
}

// ─── Delete Patient ────────────────────────────────────────────────────────────
export async function deletePatient(id: string): Promise<ActionResponse> {
  try {
    // Delete the patient (due to onDelete: Cascade in prisma schema, this should delete related appointments, history, documents)
    await prisma.patient.delete({
      where: { id },
    });

    updateTag("patients");
    updateTag(`patient-${id}`);
    updateTag("dashboard");
    updateTag("appointments");
    updateTag("appointments-calendar");

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting patient:", error);
    return { success: false, error: "Failed to delete patient. Ensure related data is cleared or cascade rules apply." };
  }
}
