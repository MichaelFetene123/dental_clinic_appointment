"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getPortalAppointments } from "@/lib/actions/queries/portal-queries";
import { createPortalAppointment } from "@/lib/actions/mutations/appointment-mutations";

// ─── Portal Appointments Query ────────────────────────────────────────────────
// Wraps getPortalAppointments in a TanStack Query hook so the client can:
//   1. Serve the list from its own cache (no extra network round-trip)
//   2. React to invalidateQueries() calls after mutation (instant UI update)
//   3. Background-refetch to stay in sync with the server
export function usePortalAppointments() {
  return useQuery({
    queryKey: queryKeys.portal.appointments(),
    queryFn: () => getPortalAppointments(),
    staleTime: 0, // 0 ensures client fetches fresh data when server cache is busted
  });
}

export function useCreatePortalAppointment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await createPortalAppointment(formData);
      if (!res.success) throw new Error(res.error, { cause: res.errors });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.portal.appointments() });
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
    },
  });
}
