"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";
import { AppointmentStatus } from "@/app/generated/prisma/client";
import { format } from "date-fns";

export type AppointmentRow = {
  id: string;
  status: AppointmentStatus;
  reason: string;
  notes: string | null;
  date: Date;
  time: string;
  patientName: string;
  patientEmail: string | null;
  patientPhone: string | null;
};

export type CalendarAppointment = {
  id: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  reason: string;
  patientName: string;
  patientEmail: string | null;
  patientPhone: string | null;
  notes: string | null;
};

export type AppointmentListResult = {
  data: AppointmentRow[];
  total: number;
};

export async function getAppointments(
  status?: AppointmentStatus | AppointmentStatus[]
): Promise<AppointmentListResult> {
  "use cache";
  cacheTag("appointments");
  cacheLife("hours");

  const where = status
    ? Array.isArray(status)
      ? { status: { in: status } }
      : { status }
    : {};

  const [rows, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        patient: true,
      },
    }),
    prisma.appointment.count({ where }),
  ]);

  return {
    data: rows.map((a) => ({
      id: a.id,
      status: a.status,
      reason: a.reason,
      notes: a.notes,
      date: a.date,
      time: a.time,
      patientName: a.patient.name,
      patientEmail: a.patient.email,
      patientPhone: a.patient.phone,
    })),
    total,
  };
}

export async function getCalendarAppointments(
  month: string // "YYYY-MM"
): Promise<CalendarAppointment[]> {
  "use cache";
  cacheTag("appointments-calendar");
  cacheLife("hours");

  const [year, mon] = month.split("-").map(Number);
  const start = new Date(year, mon - 1, 1);
  const end = new Date(year, mon, 0, 23, 59, 59);

  const rows = await prisma.appointment.findMany({
    where: { date: { gte: start, lte: end } },
    include: {
      patient: true,
    },
  });

  return rows.map((a) => ({
    id: a.id,
    date: a.date,
    time: a.time,
    status: a.status,
    reason: a.reason,
    patientName: a.patient.name,
    patientEmail: a.patient.email,
    patientPhone: a.patient.phone,
    notes: a.notes ?? null,
  }));
}
