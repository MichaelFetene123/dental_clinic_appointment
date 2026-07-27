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
  userId: string | null;
  // Extended fields for edit form
  address: string | null;
  dateOfBirth: string | null;
  bloodType: string | null;
  medicalHistory: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  insuranceProvider: string | null;
  insuranceNumber: string | null;
  height: string | null;
  weight: string | null;
  bloodPressure: string | null;
  heartRate: string | null;
  bloodSugarLevel: string | null;
  allergies: string | null;
  medications: string | null;
  chronicDiseases: string | null;
  lastDentalVisit: string | null;
  gumCondition: string | null;
  toothDecay: string | null;
  missingTeethCount: string | null;
  prostheticsUsed: string | null;
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
      userId: patient.userId,
      // Extended fields for edit form
      address: patient.address ?? null,
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.toISOString().split("T")[0] : null,
      bloodType: patient.bloodType ?? null,
      medicalHistory: patient.medicalHistory ?? null,
      emergencyContactName: patient.emergencyContactName ?? null,
      emergencyContactPhone: patient.emergencyContactPhone ?? null,
      insuranceProvider: patient.insuranceProvider ?? null,
      insuranceNumber: patient.insuranceNumber ?? null,
      height: patient.height ?? null,
      weight: patient.weight ?? null,
      bloodPressure: patient.bloodPressure ?? null,
      heartRate: patient.heartRate ?? null,
      bloodSugarLevel: patient.bloodSugarLevel ?? null,
      allergies: patient.allergies ?? null,
      medications: patient.medications ?? null,
      chronicDiseases: patient.chronicDiseases ?? null,
      lastDentalVisit: patient.lastDentalVisit ? patient.lastDentalVisit.toISOString().split("T")[0] : null,
      gumCondition: patient.gumCondition ?? null,
      toothDecay: patient.toothDecay ?? null,
      missingTeethCount: patient.missingTeethCount ?? null,
      prostheticsUsed: patient.prostheticsUsed ?? null,
    };
  });

  return { data, total };
}

export async function getPatientDetail(id: string) {
  "use cache";
  cacheTag("patients");
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

  return patient ? JSON.parse(JSON.stringify(patient)) : null;
}
