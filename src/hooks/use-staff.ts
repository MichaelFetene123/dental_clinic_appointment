"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getStaff } from "@/lib/actions/queries/staff-queries";
import { deleteStaff } from "@/lib/actions/mutations/staff-mutations";
import { toast } from "sonner";

export function useStaff() {
  return useQuery({
    queryKey: queryKeys.staff.list(),
    queryFn: () => getStaff(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  return async (id: string) => {
    const result = await deleteStaff(id);
    if (result.success) {
      toast.success("Staff member deleted.");
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
    } else {
      toast.error(result.error);
    }
    return result;
  };
}
