"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { patientFormSchema } from "@/lib/validationSchema";
import { Gender, BloodType, GumCondition } from "@/app/generated/prisma/client";
import { requirePermission } from "@/lib/auth/guards";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; errors?: Record<string, string> };

export async function createPatient(
  formData: FormData
): Promise<ActionResponse> {
  await requirePermission("patient.create");
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
    updateTag(`patient-${patient.id}`);
    updateTag("dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating patient:", error);
    return { success: false, error: "Failed to create patient record. Please try again." };
  }
}

export async function updatePatient(
  id: string,
  formData: FormData
): Promise<ActionResponse> {
  await requirePermission("patient.edit");
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
//
// Portal User handling decision (Option A — hard delete):
//   If the patient has a linked portal User account, that User is deleted inside
//   the same $transaction as the Patient.  Rationale:
//     • Portal accounts are single-purpose (identified by: no role, no employee
//       profile, not superAdmin).  An orphaned account stays authenticatable but
//       has no data — a security gap.
//     • Deleting the User cascades their active Sessions automatically
//       (onDelete: Cascade on Session.userId), revoking all portal logins.
//     • AuditLog rows survive with userId → null (onDelete: SetNull), keeping
//       historical records intact but de-identified.
//   An AuditLog entry is always written inside the transaction so the deletion
//   (and any portal revocation) is fully traceable even if cache tags fail.
//
export async function deletePatient(id: string): Promise<ActionResponse> {
  const session = await requirePermission("patient.delete");

  try {
    // Snapshot patient + any linked portal user BEFORE the transaction.
    const patient = await prisma.patient.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });

    if (!patient) {
      return { success: false, error: "Patient not found." };
    }

    const linkedPortalUser = patient.user ?? null;

    await prisma.$transaction(async (tx) => {
      // Step 1 — Delete the patient.
      //   Prisma cascades: Appointment → DentalHistory, MedicalDocument.
      //   The Patient row is removed first so the FK (Patient.userId → User.id)
      //   disappears before we touch the User below.
      await tx.patient.delete({ where: { id } });

      // Step 2 — If a portal User was linked, delete them too.
      //   Sessions are cascade-deleted; AuditLogs survive with userId = null.
      if (linkedPortalUser) {
        await tx.user.delete({ where: { id: linkedPortalUser.id } });
      }

      // Step 3 — Audit log (always written, whether or not a portal user existed).
      await tx.auditLog.create({
        data: {
          userId: session.userId,
          action: "DELETE",
          resource: "Patient",
          resourceId: id,
          details: JSON.stringify({
            patientName: patient.name,
            portalUserDeleted: linkedPortalUser !== null,
            ...(linkedPortalUser && {
              portalUserId: linkedPortalUser.id,
              portalUserEmail: linkedPortalUser.email,
            }),
          }),
        },
      });
    });

    // Invalidate all affected cache tags after the transaction commits.
    updateTag("patients");
    updateTag(`patient-${id}`);
    updateTag("dashboard");
    updateTag("appointments");
    updateTag("appointments-calendar");
    updateTag("portal-users"); // Portal Users page must reflect the revoked account.

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting patient:", error);
    return {
      success: false,
      error: "Failed to delete patient. Please try again.",
    };
  }
}
