"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

export type PatientRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number | null;
  gender: string;
  lastVisited: string | null;
  appointmentDate: string | null;
  dueDate: string | null;
  dueStatus: string;
};

export type PatientListResult = {
  data: PatientRow[];
  total: number;
};

export async function getPatients(): Promise<PatientListResult> {
  "use cache";
  cacheTag("patients");
  cacheLife("hours");

  const [patients, total] = await Promise.all([
    prisma.patient.findMany({
      include: {
        appointments: {
          orderBy: { date: "desc" },
          take: 1,
        },
        dentalHistory: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.patient.count(),
  ]);

  const data: PatientRow[] = patients.map((patient) => {
    const lastAppt = patient.appointments[0];
    
    // Calculate age
    let age = null;
    if (patient.dateOfBirth) {
      const diffMs = Date.now() - patient.dateOfBirth.getTime();
      const ageDt = new Date(diffMs);
      age = Math.abs(ageDt.getUTCFullYear() - 1970);
    }

    return {
      id: patient.id,
      name: patient.name,
      email: patient.email || "N/A",
      phone: patient.phone || "N/A",
      age,
      gender: patient.gender ?? "N/A",
      lastVisited: patient.lastDentalVisit ? patient.lastDentalVisit.toISOString().split("T")[0] : null,
      appointmentDate: lastAppt ? lastAppt.date.toISOString().split("T")[0] : null,
      dueDate: null, // Replace with real billing logic when implemented
      dueStatus: "Paid", // Replace with real billing logic when implemented
    };
  });

  return { data, total };
}

export async function getPatientDetail(id: string) {
  "use cache";
  cacheTag(`patient-${id}`);
  cacheLife("hours");

  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      user: true, // optional if linked to portal
      dentalHistory: true,
      appointments: {
        orderBy: { date: "desc" },
        take: 5,
      },
      medicalDocuments: {
        orderBy: { uploadedAt: "desc" },
      },
    },
  });

  return patient;
}
