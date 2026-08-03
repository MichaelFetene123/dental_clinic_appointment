// admin/layout.tsx
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { SiteHeader } from "@/components/admin/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PermissionProvider } from "@/components/providers/PermissionProvider";
import { requireAuth } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";
import { SessionRefresher } from "@/components/providers/SessionRefresher";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
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
            <SidebarProvider className="h-screen overflow-hidden">
                <AppSidebar variant="inset" user={{ name: session.userName, email: session.userEmail, avatar: session.userAvatar || "" }} />
                <SidebarInset className="overflow-y-auto">
                    <SiteHeader />
                    <div className="flex flex-1 flex-col min-h-0">
                        <div className="@container/main flex flex-1 flex-col gap-2 min-h-0">
                            <SessionRefresher />
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </PermissionProvider>
    );
}
