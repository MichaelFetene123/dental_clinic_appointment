import { requirePatientAuth } from "@/lib/auth/guards";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { PortalSidebar } from "@/components/portal/sidebar/portal-sidebar";
import { SiteHeader } from "@/components/admin/sidebar/site-header";
import { SessionRefresher } from "@/components/providers/SessionRefresher";
import { Suspense } from "react";
import Loader from "@/components/Loader";

async function PortalSidebarWrapper() {
    const { patient } = await requirePatientAuth();
    return (
        <PortalSidebar 
            variant="inset" 
            user={{ 
                name: patient.name, 
                email: patient.email || "", 
                avatar: null 
            }} 
        />
    );
}

async function PortalContentWrapper({ children }: { children: React.ReactNode }) {
    await requirePatientAuth();
    return (
        <>
            <SessionRefresher />
            {children}
        </>
    );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="h-screen overflow-hidden">
            <Suspense fallback={<PortalSidebar variant="inset" user={{ name: "Loading...", email: "", avatar: null }} />}>
                <PortalSidebarWrapper />
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
                            <PortalContentWrapper>
                                {children}
                            </PortalContentWrapper>
                        </Suspense>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
