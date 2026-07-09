"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getAppointments, getCalendarAppointments } from "@/lib/actions/queries/appointment-queries";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/actions/mutations/appointment-mutations";
import type { AppointmentStatus } from "@prisma/client";
import { toast } from "sonner";
import { format } from "date-fns";

// ─── Appointment List Query ───────────────────────────────────────────────────
export function useAppointments(status?: AppointmentStatus) {
  return useQuery({
    queryKey: queryKeys.appointments.list({ status }),
    queryFn: () => getAppointments(status),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Calendar Query ───────────────────────────────────────────────────────────
export function useCalendarAppointments(date: Date) {
  const month = format(date, "yyyy-MM");
  return useQuery({
    queryKey: queryKeys.appointments.calendar(month),
    queryFn: () => getCalendarAppointments(month),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Status Update Action ─────────────────────────────────────────────────────
export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return async (id: string, status: AppointmentStatus) => {
    const result = await updateAppointmentStatus(id, status);
    if (result.success) {
      toast.success(`Appointment marked as ${status.toLowerCase()}.`);
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    } else {
      toast.error(result.error);
    }
    return result;
  };
}

// ─── Delete Action ────────────────────────────────────────────────────────────
export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return async (id: string) => {
    const result = await deleteAppointment(id);
    if (result.success) {
      toast.success("Appointment deleted.");
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    } else {
      toast.error(result.error);
    }
    return result;
  };
}
