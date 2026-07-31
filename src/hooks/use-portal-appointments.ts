"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getPortalAppointments } from "@/lib/actions/queries/portal-queries";

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
