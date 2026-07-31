"use client";

import { queryKeys } from "@/lib/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPatients, getPatientDetail } from "@/lib/actions/queries/patient-queries";
import { deletePatient } from "@/lib/actions/mutations/patient-mutations";

export function usePatients() {
  return useQuery({
    queryKey: queryKeys.patients.list(),
    queryFn: () => getPatients(),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function usePatientDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => getPatientDetail(id),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      }
    },
  });
}
