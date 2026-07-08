// admin/layout.tsx

import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { SiteHeader } from "@/components/admin/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="h-screen overflow-hidden">
            <AppSidebar variant="inset" />
            <SidebarInset className="overflow-y-auto">
                <SiteHeader />
                <div className="flex flex-1 flex-col min-h-0">
                    <div className="@container/main flex flex-1 flex-col gap-2 min-h-0">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
