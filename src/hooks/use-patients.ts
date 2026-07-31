"use client";

import { queryKeys } from "@/lib/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPatients, getPatientDetail } from "@/lib/actions/queries/patient-queries";
import { deletePatient, createPatient, updatePatient } from "@/lib/actions/mutations/patient-mutations";

export function usePatients() {
  return useQuery({
    queryKey: queryKeys.patients.list(),
    queryFn: () => getPatients(),
    staleTime: 0,
  });
}

export function usePatientDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => getPatientDetail(id),
    staleTime: 0,
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
        queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
      }
    },
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await createPatient(formData);
      if (!res.success) throw new Error(res.error, { cause: res.errors });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await updatePatient(id, formData);
      if (!res.success) throw new Error(res.error, { cause: res.errors });
      return res;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
