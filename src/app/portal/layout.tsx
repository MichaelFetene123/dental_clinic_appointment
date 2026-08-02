import { Suspense } from "react";
import { requirePatientAuth } from "@/lib/auth/guards";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { PortalSidebar } from "@/components/portal/sidebar/portal-sidebar";
import { SiteHeader } from "@/components/admin/sidebar/site-header";
import { SessionRefresher } from "@/components/providers/SessionRefresher";

async function PortalLayoutContent({ children }: { children: React.ReactNode }) {
    const { session, patient } = await requirePatientAuth();

    return (
        <SidebarProvider className="h-screen overflow-hidden">
            <PortalSidebar 
                variant="inset" 
                user={{ 
                    name: patient.name, 
                    email: patient.email || "", 
                    avatar: null 
                }} 
            />
            <SidebarInset className="overflow-y-auto">
                <Suspense fallback={<div className="h-12 border-b" />}>
                    <SiteHeader />
                </Suspense>
                <div className="flex flex-1 flex-col min-h-0">
                    <div className="@container/main flex flex-1 flex-col gap-2 min-h-0">
                        <SessionRefresher />
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-background"><div className="animate-pulse text-lg text-muted-foreground">Loading portal...</div></div>}>
            <PortalLayoutContent>{children}</PortalLayoutContent>
        </Suspense>
    );
}
