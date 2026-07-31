"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getStaff } from "@/lib/actions/queries/staff-queries";
import { createStaff, updateStaff, deleteStaff } from "@/lib/actions/mutations/staff-mutations";
import { toast } from "sonner";

export function useStaff() {
  return useQuery({
    queryKey: queryKeys.staff.list(),
    queryFn: () => getStaff(),
    staleTime: 0,
  });
}

export function useCreateStaff(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createStaff({ success: false, error: "" }, formData),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Staff member created successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      onSuccess?.();
    },
    onError: () => toast.error("Failed to create staff member."),
  });
}

export function useUpdateStaff(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateStaff({ success: false, error: "" }, formData),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Staff member updated successfully.");
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      onSuccess?.();
    },
    onError: () => toast.error("Failed to update staff member."),
  });
}

export function useDeleteStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStaff(id),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Staff member deleted.");
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
    },
    onError: () => toast.error("Failed to delete staff member."),
  });
}
