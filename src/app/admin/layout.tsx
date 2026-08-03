import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { SiteHeader } from "@/components/admin/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PermissionProvider } from "@/components/providers/PermissionProvider";
import { requireAuth } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";
import { SessionRefresher } from "@/components/providers/SessionRefresher";
import { Suspense } from "react";
import Loader from "@/components/Loader";

async function AdminSidebarWrapper() {
    const session = await requireAuth();
    return (
        <PermissionProvider permissions={session.permissions} isSuperAdmin={session.isSuperAdmin}>
            <AppSidebar variant="inset" user={{ name: session.userName, email: session.userEmail, avatar: session.userAvatar || "" }} />
        </PermissionProvider>
    );
}

async function AdminContentWrapper({ children }: { children: React.ReactNode }) {
    const session = await requireAuth();

    if (!session.isSuperAdmin && session.permissions.length === 0) {
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { patient: { select: { id: true } } },
        });

        if (user?.patient) {
            redirect("/portal");
        }
    }

    return (
        <PermissionProvider permissions={session.permissions} isSuperAdmin={session.isSuperAdmin}>
            <SessionRefresher />
            {children}
        </PermissionProvider>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="h-screen overflow-hidden">
            <Suspense fallback={<AppSidebar variant="inset" user={{ name: "Loading...", email: "", avatar: "" }} />}>
                <AdminSidebarWrapper />
            </Suspense>
            <SidebarInset className="overflow-y-auto">
                <Suspense fallback={<header className="h-12 flex shrink-0 items-center border-b px-4 lg:px-6"></header>}>
                    <SiteHeader />
                </Suspense>
                <div className="flex flex-1 flex-col min-h-0">
                    <div className="@container/main flex flex-1 flex-col gap-2 min-h-0">
                        <Suspense fallback={
                            <div className="flex flex-1 items-center justify-center p-8 min-h-[400px]">
                                <Loader />
                            </div>
                        }>
                            <AdminContentWrapper>
                                {children}
                            </AdminContentWrapper>
                        </Suspense>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
