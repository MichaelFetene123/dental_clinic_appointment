import React, { Suspense } from "react";
import { RolesManager } from "@/components/admin/roles/RolesManager";
import { getRoles, getPermissions } from "@/lib/actions/queries/role-queries";
import { requirePermission } from "@/lib/auth/guards";

async function RolesContent() {
  // Ensure only authorized personnel can access the roles management page
  await requirePermission("staff.manage");

  const [roles, permissions] = await Promise.all([
    getRoles(),
    getPermissions(),
  ]);

  return <RolesManager initialRoles={roles} permissions={permissions} />;
}

export default function RolesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Roles Management</h1>
        <p className="text-muted-foreground mt-2">
          Create custom roles and assign granular permissions for staff members.
        </p>
      </div>

      <Suspense fallback={<div className="animate-pulse h-64 bg-muted/50 rounded-xl" />}>
        <RolesContent />
      </Suspense>
    </div>
  );
}
