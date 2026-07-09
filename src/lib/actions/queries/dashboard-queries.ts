"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";
import { AppointmentStatus } from "@prisma/client";

export type DashboardStats = {
  totalPatients: number;
  scheduledAppointments: number;
  completedProcedures: number;
  pendingInQueue: number;
};

export type RecentAppointment = {
  id: string;
  patientName: string;
  reason: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
};

export type DashboardData = {
  stats: DashboardStats;
  recentAppointments: RecentAppointment[];
};

export async function getDashboardData(): Promise<DashboardData> {
  "use cache";
  cacheTag("dashboard");
  cacheLife("hours");

  const [
    totalPatients,
    scheduledAppointments,
    completedProcedures,
    pendingInQueue,
    recentAppointments,
  ] = await Promise.all([
    // Total registered patients
    prisma.patientProfile.count(),

    // Appointments confirmed (accepted)
    prisma.appointment.count({
      where: { status: AppointmentStatus.CONFIRMED },
    }),

    // Completed appointments/procedures
    prisma.appointment.count({
      where: { status: AppointmentStatus.COMPLETED },
    }),

    // Appointments in queue (pending)
    prisma.appointment.count({
      where: { status: AppointmentStatus.PENDING },
    }),

    // Recent 5 appointments for the dashboard list
    prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        patient: {
          include: { user: { select: { name: true } } },
        },
      },
    }),
  ]);

  return {
    stats: {
      totalPatients,
      scheduledAppointments,
      completedProcedures,
      pendingInQueue,
    },
    recentAppointments: recentAppointments.map((appt) => ({
      id: appt.id,
      patientName: appt.patient?.user.name ?? `${appt.guestFirstName ?? ""} ${appt.guestLastName ?? ""}`.trim(),
      reason: appt.reason,
      date: appt.date,
      time: appt.time,
      status: appt.status,
    })),
  };
}
