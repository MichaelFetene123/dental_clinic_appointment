"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { AppointmentStatus } from "@/app/generated/prisma/client";
import { appointmentFormSchema, appointmentPageSchema } from "@/lib/validationSchema";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; errors?: Record<string, string> };

// ─── Create appointment (Admin form) ──────────────────────────────────────────
// Always creates or finds a Patient record first, then links the Appointment.
export async function createAppointment(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    name: formData.get("name") as string,
    email: (formData.get("email") as string) || "",
    phone: formData.get("phone") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    reason: formData.get("reason") as string,
    notes: (formData.get("notes") as string) || undefined,
  };

  const result = appointmentFormSchema.superRefine((data, ctx) => {
    const [year, month, day] = data.date.split("-").map(Number);
    const [hours, minutes] = data.time.split(":").map(Number);
    const selectedDateTime = new Date(year, month - 1, day, hours, minutes);
    if (selectedDateTime < new Date()) {
      ctx.addIssue({
        code: "custom",
        message: "Appointments cannot be scheduled in the past.",
        path: ["time"],
      });
    }
  }).safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) errors[field] = issue.message;
    }
    return { success: false, error: "Validation failed", errors };
  }

  const { name, email, phone, date, time, reason, notes } = result.data;

  try {
    // Step 1: Create a Patient record for this person
    const patient = await prisma.patient.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
      },
    });

    // Step 2: Create the Appointment linked to the Patient
    await prisma.appointment.create({
      data: {
        patientId: patient.id,
        date: new Date(date),
        time,
        reason,
        notes: notes ?? null,
        status: AppointmentStatus.PENDING,
      },
    });

    updateTag("appointments");
    updateTag("appointments-calendar");
    updateTag("dashboard");
    updateTag("patients");

    return { success: true };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Failed to create appointment. Please try again." };
  }
}

// ─── Update appointment status ─────────────────────────────────────────────────
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<ActionResponse> {
  try {
    const appt = await prisma.appointment.update({
      where: { id },
      data: { status },
      select: { patientId: true },
    });

    updateTag("appointments");
    updateTag("dashboard");
    updateTag("appointments-calendar");
    updateTag("patients");
    updateTag(`patient-${appt.patientId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return { success: false, error: "Failed to update appointment status." };
  }
}

// ─── Delete appointment ────────────────────────────────────────────────────────
export async function deleteAppointment(
  id: string
): Promise<ActionResponse> {
  try {
    const appt = await prisma.appointment.delete({ 
      where: { id },
      select: { patientId: true },
    });

    updateTag("appointments");
    updateTag("dashboard");
    updateTag("appointments-calendar");
    updateTag("patients");
    updateTag(`patient-${appt.patientId}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return { success: false, error: "Failed to delete appointment." };
  }
}

// ─── Create guest appointment (Public booking form) ───────────────────────────
// Creates a Patient record for the visitor, then links the Appointment.
export async function createGuestAppointment(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    email: formData.get("email") as string,
    requestedDate: formData.get("requestedDate") as string,
    requestedTime: formData.get("requestedTime") as string,
  };

  const result = appointmentPageSchema.superRefine((data, ctx) => {
    const [year, month, day] = data.requestedDate.split("-").map(Number);
    const [hours, minutes] = data.requestedTime.split(":").map(Number);
    const selectedDateTime = new Date(year, month - 1, day, hours, minutes);
    if (selectedDateTime < new Date()) {
      ctx.addIssue({
        code: "custom",
        message: "Appointments cannot be scheduled in the past.",
        path: ["requestedTime"],
      });
    }
  }).safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) errors[field] = issue.message;
    }
    return { success: false, error: "Validation failed", errors };
  }

  const { firstName, lastName, phoneNumber, email, requestedDate, requestedTime } = result.data;

  try {
    // Step 1: Create a Patient record for this visitor
    const patient = await prisma.patient.create({
      data: {
        name: `${firstName} ${lastName}`.trim(),
        email: email || null,
        phone: phoneNumber || null,
      },
    });

    // Step 2: Create the Appointment linked to the Patient
    await prisma.appointment.create({
      data: {
        patientId: patient.id,
        date: new Date(requestedDate),
        time: requestedTime,
        reason: "General Consultation",
        status: AppointmentStatus.PENDING,
      },
    });

    updateTag("appointments");
    updateTag("appointments-calendar");
    updateTag("dashboard");
    updateTag("patients");

    return { success: true };
  } catch (error) {
    console.error("Error creating guest appointment:", error);
    return {
      success: false,
      error: "Failed to book your appointment. Please try again.",
    };
  }
}

// ─── Update appointment (Admin edit form) ─────────────────────────────────────
// Updates both the Appointment and the linked Patient's contact info.
export async function updateAppointmentAdmin(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const id = formData.get("id") as string;
  if (!id) return { success: false, error: "Appointment ID is required" };

  const rawData = {
    name: formData.get("name") as string,
    email: (formData.get("email") as string) || "",
    phone: formData.get("phone") as string,
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    reason: formData.get("reason") as string,
    notes: (formData.get("notes") as string) || undefined,
  };

  const result = appointmentFormSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) errors[field] = issue.message;
    }
    return { success: false, error: "Validation failed", errors };
  }

  const { name, email, phone, date, time, reason, notes } = result.data;

  try {
    // Fetch the appointment to get the patientId
    const existing = await prisma.appointment.findUnique({
      where: { id },
      select: { patientId: true },
    });

    if (!existing) {
      return { success: false, error: "Appointment not found." };
    }

    // Update both the Patient's contact info and the Appointment details in parallel
    await Promise.all([
      prisma.patient.update({
        where: { id: existing.patientId },
        data: {
          name,
          email: email || null,
          phone: phone || null,
        },
      }),
      prisma.appointment.update({
        where: { id },
        data: {
          date: new Date(date),
          time,
          reason,
          notes: notes ?? null,
        },
      }),
    ]);

    updateTag("appointments");
    updateTag("appointments-calendar");
    updateTag("dashboard");
    updateTag("patients");
    updateTag(`patient-${existing.patientId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return { success: false, error: "Failed to update appointment." };
  }
}
