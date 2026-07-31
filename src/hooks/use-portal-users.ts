"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";
import { getPortalUsers } from "@/lib/actions/queries/portal-user-queries";
import { updatePortalUserEmail, resetPortalUserPassword, deletePortalUser } from "@/lib/actions/mutations/portal-user-mutations";

export function usePortalUsers() {
  return useQuery({
    queryKey: queryKeys.portalUsers.lists(),
    queryFn: () => getPortalUsers(),
    staleTime: 30_000,
  });
}

export function useUpdatePortalUserEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, email }: { id: string; email: string }) => {
      return updatePortalUserEmail(id, email);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Email updated successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.portalUsers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: () => toast.error("Failed to update email"),
  });
}

export function useResetPortalUserPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return resetPortalUserPassword(id);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.portalUsers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
    onError: () => toast.error("Failed to reset password"),
  });
}

export function useDeletePortalUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return deletePortalUser(id);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Portal account unlinked and removed.");
      queryClient.invalidateQueries({ queryKey: queryKeys.portalUsers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
    },
    onError: () => toast.error("Failed to remove portal account"),
  });
}
