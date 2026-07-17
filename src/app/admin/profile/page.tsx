import React, { Suspense } from "react";
import { getProfile } from "@/lib/actions/queries/profile-queries";
import { ProfileManager } from "@/components/admin/profile/ProfileManager";

async function ProfileContent() {
  const profile = await getProfile();

  return <ProfileManager profile={profile} />;
}

export default function ProfilePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Account Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information, security settings, and avatar.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse h-96 bg-muted/50 rounded-xl" />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
