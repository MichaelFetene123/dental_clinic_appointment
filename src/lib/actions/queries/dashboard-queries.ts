"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";
import { AppointmentStatus } from "@/app/generated/prisma/client";

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
  date: string;
  time: string;
  status: AppointmentStatus;
};

export type ChartDataPoint = {
  date: string;
  month: string;
  desktop: number; // New Patients
  mobile: number;  // Returning Patients
};

export type DepartmentDataPoint = {
  status: string;
  patients: number;
};

export type DashboardData = {
  stats: DashboardStats;
  recentAppointments: RecentAppointment[];
  chartData: ChartDataPoint[];
  departmentData: DepartmentDataPoint[];
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
    dentalHistories,
  ] = await prisma.$transaction([
    // Total registered patients
    prisma.patient.count(),

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
        patient: true,
      },
    }),

    // All dental histories for department categorization
    prisma.dentalHistory.findMany({
      select: { treatmentType: true }
    }),
  ]);

  // ---------------------------------------------------------
  // Aggregate Patient Department Data
  // ---------------------------------------------------------
  const depMap = new Map<string, number>();
  for (const dh of dentalHistories) {
    if (!dh.treatmentType) continue;
    // Normalize: trim and Title Case (e.g., "braces" -> "Braces")
    const normalized = dh.treatmentType.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    depMap.set(normalized, (depMap.get(normalized) || 0) + 1);
  }
  const departmentData: DepartmentDataPoint[] = Array.from(depMap.entries()).map(([status, patients]) => ({ status, patients }));
  // Sort descending so largest is first
  departmentData.sort((a, b) => b.patients - a.patients);

  // ---------------------------------------------------------
  // Aggregate Total Patients (New vs Returning) for last 90 days
  // ---------------------------------------------------------
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  ninetyDaysAgo.setHours(0, 0, 0, 0);

  // Fetch data in parallel
  const [recentPatients, recentAppointmentsForChart] = await Promise.all([
    prisma.patient.findMany({
      where: { createdAt: { gte: ninetyDaysAgo } },
      select: { createdAt: true }
    }),
    prisma.appointment.findMany({
      where: { date: { gte: ninetyDaysAgo } },
      select: { patientId: true, date: true, patient: { select: { createdAt: true } } }
    })
  ]);

  const chartDataMap = new Map<string, ChartDataPoint>();
  
  // Initialize map with 0s for the last 90 days
  for (let i = 0; i <= 90; i++) {
      const d = new Date(ninetyDaysAgo);
      d.setDate(d.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const monthStr = d.toLocaleString('default', { month: 'short' });
      chartDataMap.set(dateStr, { date: dateStr, month: monthStr, desktop: 0, mobile: 0 });
  }

  // Count New Patients (desktop): patients registered on this day
  for (const p of recentPatients) {
      const d = p.createdAt;
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      if (chartDataMap.has(dateStr)) {
          chartDataMap.get(dateStr)!.desktop++;
      }
  }

  // Count Returning Patients (mobile): 
  // Definition: A patient with an appointment on this day, where their registration date (createdAt) is strictly before this day.
  const returningPatientsPerDay = new Map<string, Set<string>>();
  for (const appt of recentAppointmentsForChart) {
      const apptDate = appt.date;
      const yearAppt = apptDate.getFullYear();
      const monthAppt = String(apptDate.getMonth() + 1).padStart(2, '0');
      const dayAppt = String(apptDate.getDate()).padStart(2, '0');
      const apptDateStr = `${yearAppt}-${monthAppt}-${dayAppt}`;

      const patDate = appt.patient.createdAt;
      const yearPat = patDate.getFullYear();
      const monthPat = String(patDate.getMonth() + 1).padStart(2, '0');
      const dayPat = String(patDate.getDate()).padStart(2, '0');
      const patientCreatedAtStr = `${yearPat}-${monthPat}-${dayPat}`;
      
      if (patientCreatedAtStr < apptDateStr) {
          if (!returningPatientsPerDay.has(apptDateStr)) {
              returningPatientsPerDay.set(apptDateStr, new Set());
          }
          returningPatientsPerDay.get(apptDateStr)!.add(appt.patientId);
      }
  }

  // Apply returning counts to chart map
  for (const [dateStr, patientsSet] of returningPatientsPerDay.entries()) {
      if (chartDataMap.has(dateStr)) {
          chartDataMap.get(dateStr)!.mobile = patientsSet.size;
      }
  }

  const chartData = Array.from(chartDataMap.values()).sort((a, b) => a.date.localeCompare(b.date));

  return {
    stats: {
      totalPatients,
      scheduledAppointments,
      completedProcedures,
      pendingInQueue,
    },
    recentAppointments: recentAppointments.map((appt) => ({
      id: appt.id,
      patientName: appt.patient.name,
      reason: appt.reason,
      date: appt.date.toISOString(),
      time: appt.time,
      status: appt.status,
    })),
    chartData,
    departmentData,
  };
}
