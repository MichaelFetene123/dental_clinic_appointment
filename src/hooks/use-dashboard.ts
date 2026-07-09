"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getDashboardData } from "@/lib/actions/queries/dashboard-queries";

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: () => getDashboardData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
