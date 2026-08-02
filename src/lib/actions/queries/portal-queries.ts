"use server";

import { prisma } from "@/lib/prisma";
import { requirePatientAuth } from "@/lib/auth/guards";
import { cacheTag, cacheLife } from "next/cache";

export async function getPortalAppointments() {
  const { patient } = await requirePatientAuth();
  return fetchPortalAppointments(patient.id);
}

async function fetchPortalAppointments(patientId: string) {
  "use cache";
  cacheTag("appointments", `patient-${patientId}`);
  cacheLife("hours");

  return await prisma.appointment.findMany({
    where: { patientId },
    orderBy: { date: "desc" },
  });
}

export async function getPortalHistory() {
  const { patient } = await requirePatientAuth();
  return fetchPortalHistory(patient.id);
}

async function fetchPortalHistory(patientId: string) {
  "use cache";
  cacheTag("history", `patient-${patientId}`);
  cacheLife("hours");

  return await prisma.dentalHistory.findMany({
    where: { patientId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPortalDocuments() {
  const { patient } = await requirePatientAuth();
  return fetchPortalDocuments(patient.id);
}

async function fetchPortalDocuments(patientId: string) {
  "use cache";
  cacheTag("documents", `patient-${patientId}`);
  cacheLife("hours");

  return await prisma.medicalDocument.findMany({
    where: { patientId },
    orderBy: { uploadedAt: "desc" },
  });
}
