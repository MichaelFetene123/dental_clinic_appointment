"use server";

import { prisma } from "@/lib/prisma";
import { requirePatientAuth } from "@/lib/auth/guards";
import { cacheTag, cacheLife } from "next/cache";

export async function getPortalAppointments() {
  "use cache";
  cacheTag("portal-appointments");
  cacheLife("minutes");

  const { patient } = await requirePatientAuth();

  return await prisma.appointment.findMany({
    where: { patientId: patient.id },
    orderBy: { date: "desc" },
  });
}

export async function getPortalHistory() {
  const { patient } = await requirePatientAuth();

  return await prisma.dentalHistory.findMany({
    where: { patientId: patient.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPortalDocuments() {
  const { patient } = await requirePatientAuth();

  return await prisma.medicalDocument.findMany({
    where: { patientId: patient.id },
    orderBy: { uploadedAt: "desc" },
  });
}
