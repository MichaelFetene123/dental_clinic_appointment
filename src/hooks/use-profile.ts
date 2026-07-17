"use client";

import { useState, useTransition } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";
import { getProfile } from "@/lib/actions/queries/profile-queries";
import {
  updateProfileInfo,
  changePassword,
  updateAvatar,
  removeAvatar,
} from "@/lib/actions/mutations/profile-mutations";

// ─── Profile Query ────────────────────────────────────────────────────────────
export function useProfileQuery() {
  return useQuery({
    queryKey: queryKeys.profile.me(),
    queryFn: () => getProfile(),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Profile Mutations ────────────────────────────────────────────────────────
export function useProfile() {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.profile.all });

  const handleUpdateProfile = (name: string, email: string, phone: string | null) => {
    startTransition(async () => {
      try {
        await updateProfileInfo(name, email, phone);
        toast.success("Profile updated successfully");
        invalidate();
      } catch (error: any) {
        toast.error(error.message || "Failed to update profile");
      }
    });
  };

  const handleChangePassword = (current: string, newPass: string, confirm: string) => {
    if (newPass !== confirm) {
      toast.error("New passwords do not match");
      return;
    }
    startTransition(async () => {
      try {
        await changePassword(current, newPass);
        toast.success("Password changed successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to change password");
      }
    });
  };

  const handleUpdateAvatar = (file: File) => {
    setIsAvatarUploading(true);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        await updateAvatar(formData);
        toast.success("Avatar updated successfully");
        invalidate();
      } catch (error: any) {
        toast.error(error.message || "Failed to update avatar");
      } finally {
        setIsAvatarUploading(false);
      }
    });
  };

  const handleRemoveAvatar = () => {
    startTransition(async () => {
      try {
        await removeAvatar();
        toast.success("Avatar removed successfully");
        invalidate();
      } catch (error: any) {
        toast.error(error.message || "Failed to remove avatar");
      }
    });
  };

  return {
    isPending,
    isAvatarUploading,
    handleUpdateProfile,
    handleChangePassword,
    handleUpdateAvatar,
    handleRemoveAvatar,
  };
}
