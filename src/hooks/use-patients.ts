"use client";

import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getPatients, getPatientDetail } from "@/lib/actions/queries/patient-queries";

export function usePatients() {
  return useQuery({
    queryKey: queryKeys.patients.list(),
    queryFn: () => getPatients(),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePatientDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => getPatientDetail(id),
    staleTime: 5 * 60 * 1000,
  });
}
