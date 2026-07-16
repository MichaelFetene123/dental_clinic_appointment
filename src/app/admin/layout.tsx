// admin/layout.tsx

import { Suspense } from "react";
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { SiteHeader } from "@/components/admin/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PermissionProvider } from "@/components/providers/PermissionProvider";
import { requireAuth } from "@/lib/auth/guards";

async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    // Top-level layout guard: fetch current session. 
    // This throws an error/redirect and blocks rendering if no valid session is found.
    const session = await requireAuth();

    return (
        <PermissionProvider permissions={session.permissions} isSuperAdmin={session.isSuperAdmin}>
            <SidebarProvider className="h-screen overflow-hidden">
                <AppSidebar variant="inset" />
                <SidebarInset className="overflow-y-auto">
                    <Suspense fallback={<div className="h-12 border-b" />}>
                        <SiteHeader />
                    </Suspense>
                    <div className="flex flex-1 flex-col min-h-0">
                        <div className="@container/main flex flex-1 flex-col gap-2 min-h-0">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </PermissionProvider>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-background"><div className="animate-pulse text-lg text-muted-foreground">Loading application...</div></div>}>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </Suspense>
    );
}
