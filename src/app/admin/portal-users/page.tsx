import { Suspense } from 'react';
import PortalUsersClient from "./portal-users-client";
import { requirePermission, ForbiddenError } from "@/lib/auth/guards";

async function PortalUsersContent() {
    try {
        await requirePermission("portal_users.read");
        return <PortalUsersClient />;
    } catch (e) {
        if (e instanceof ForbiddenError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/20 border rounded-lg m-6 p-12 text-center">
                    <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                    <p className="text-muted-foreground">You do not have permission to view portal users.</p>
                </div>
            )
        }
        throw e;
    }
}

export default function PortalUsersPage() {
    return (
        <Suspense fallback={<div className="p-8 text-muted-foreground">Loading portal users...</div>}>
            <PortalUsersContent />
        </Suspense>
    );
}
