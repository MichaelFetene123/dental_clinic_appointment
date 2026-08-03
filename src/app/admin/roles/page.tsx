import React, { Suspense } from "react";
import { RolesPageSkeleton } from "@/components/skeleton/RolesPageSkeleton";
import { RolesManager } from "@/components/admin/roles/RolesManager";
import { getRoles, getPermissions } from "@/lib/actions/queries/role-queries";
import { requirePermission, ForbiddenError } from "@/lib/auth/guards";

async function RolesContent() {
  // Ensure only authorized personnel can access the roles management page
  try {
    await requirePermission("staff.manage");
  } catch (e) {
    if (e instanceof ForbiddenError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/20 border rounded-lg p-12 text-center mt-6">
                <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                <p className="text-muted-foreground">You do not have permission to manage roles.</p>
            </div>
        )
    }
    throw e;
  }

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

      <Suspense fallback={<RolesPageSkeleton />}>
        <RolesContent />
      </Suspense>
    </div>
  );
}
