"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getAppointments, getCalendarAppointments } from "@/lib/actions/queries/appointment-queries";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/actions/mutations/appointment-mutations";
import type { AppointmentStatus } from "@/app/generated/prisma/client";
import { toast } from "sonner";
import { format } from "date-fns";

// ─── Appointment List Query ───────────────────────────────────────────────────
export function useAppointments(status?: AppointmentStatus | AppointmentStatus[]) {
  return useQuery({
    queryKey: queryKeys.appointments.list({ status }),
    queryFn: () => getAppointments(status),
    staleTime: 0,
  });
}

// ─── Calendar Query ───────────────────────────────────────────────────────────
export function useCalendarAppointments(date: Date) {
  const month = format(date, "yyyy-MM");
  return useQuery({
    queryKey: queryKeys.appointments.calendar(month),
    queryFn: () => getCalendarAppointments(month),
    staleTime: 0,
  });
}

// ─── Status Update Mutation ───────────────────────────────────────────────────
export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AppointmentStatus }) =>
      updateAppointmentStatus(id, status),
    onSuccess: (result, { status }) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(`Appointment marked as ${status.toLowerCase()}.`);
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: () => toast.error("Failed to update appointment status."),
  });
}

// ─── Delete Mutation ──────────────────────────────────────────────────────────
export function useDeleteAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAppointment(id),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Appointment deleted.");
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: () => toast.error("Failed to delete appointment."),
  });
}
