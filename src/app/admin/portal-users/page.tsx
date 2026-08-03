import { Suspense } from 'react';
import PortalUsersClient from "./portal-users-client";
import { requirePermission } from "@/lib/auth/guards";

async function PortalUsersContent() {
    await requirePermission("portal_users.read");
    return <PortalUsersClient />;
}

export default function PortalUsersPage() {
    return (
        <Suspense fallback={<div className="p-8 text-muted-foreground">Loading portal users...</div>}>
            <PortalUsersContent />
        </Suspense>
    );
}
