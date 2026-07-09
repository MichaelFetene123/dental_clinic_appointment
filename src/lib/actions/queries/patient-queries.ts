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

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: { role: "PATIENT" },
      include: {
        patientProfile: {
          include: {
            appointments: {
              orderBy: { date: "desc" },
              take: 1,
            },
            dentalHistory: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where: { role: "PATIENT" } }),
  ]);

  const data: PatientRow[] = users.map((user) => {
    const profile = user.patientProfile;
    const lastAppt = profile?.appointments[0];
    
    // Calculate age
    let age = null;
    if (profile?.dateOfBirth) {
      const diffMs = Date.now() - profile.dateOfBirth.getTime();
      const ageDt = new Date(diffMs);
      age = Math.abs(ageDt.getUTCFullYear() - 1970);
    }

    return {
      id: profile?.id ?? user.id, // Using profile ID as patient ID
      name: user.name,
      email: user.email,
      phone: user.phone ?? "N/A",
      age,
      gender: profile?.gender ?? "N/A",
      lastVisited: profile?.lastDentalVisit ? profile.lastDentalVisit.toISOString().split("T")[0] : null,
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

  const patient = await prisma.patientProfile.findUnique({
    where: { id },
    include: {
      user: true,
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
