"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { AppointmentStatus } from "@prisma/client";
import { appointmentFormSchema, appointmentPageSchema } from "@/lib/validationSchema";

export type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; errors?: Record<string, string> };

// ─── Create appointment (Admin form) ──────────────────────────────────────────
export async function createAppointment(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
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

  const { name, email, date, time, reason, notes } = result.data;

  await prisma.appointment.create({
    data: {
      guestFirstName: name.split(" ")[0],
      guestLastName: name.split(" ").slice(1).join(" ") || undefined,
      guestEmail: email,
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

  return { success: true };
}

// ─── Update appointment status ─────────────────────────────────────────────────
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<ActionResponse> {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    updateTag("appointments");
    updateTag("dashboard");

    return { success: true };
  } catch {
    return { success: false, error: "Failed to update appointment status." };
  }
}

// ─── Delete appointment ────────────────────────────────────────────────────────
export async function deleteAppointment(
  id: string
): Promise<ActionResponse> {
  try {
    await prisma.appointment.delete({ where: { id } });

    updateTag("appointments");
    updateTag("dashboard");

    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete appointment." };
  }
}

// ─── Create guest appointment (Public booking form) ───────────────────────────
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

  const result = appointmentPageSchema.safeParse(rawData);

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
    await prisma.appointment.create({
      data: {
        guestFirstName: firstName,
        guestLastName: lastName,
        guestEmail: email,
        guestPhone: phoneNumber,
        date: new Date(requestedDate),
        time: requestedTime,
        reason: "General Consultation",
        status: AppointmentStatus.PENDING,
      },
    });

    updateTag("appointments");
    updateTag("appointments-calendar");
    updateTag("dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error creating guest appointment:", error);
    return {
      success: false,
      error: "Failed to book your appointment. Please try again.",
    };
  }
}
