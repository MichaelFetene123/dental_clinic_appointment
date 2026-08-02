"use client"

import * as React from "react"
import {
    LayoutDashboardIcon,
    CalendarIcon,
    FileTextIcon,
    ActivityIcon,
    UserIcon,
} from "lucide-react"

import { PortalNavMain } from "./portal-nav-main"
import { PortalNavUser } from "./portal-nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

export function PortalSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: { name: string, email: string, avatar?: string | null } }) {
    const portalNav = [
        {
            title: "Dashboard",
            url: "/portal",
            icon: LayoutDashboardIcon,
        },
        {
            title: "Appointments",
            url: "/portal/appointments",
            icon: CalendarIcon,
        },
        {
            title: "Dental History",
            url: "/portal/history",
            icon: ActivityIcon,
        },
        {
            title: "Documents",
            url: "/portal/documents",
            icon: FileTextIcon,
        },
    ]

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="py-4">
                <Link href="/" className="flex items-center justify-center">
                    <Image 
                        src="/images/logo/logo-1.png" 
                        alt="Clinic Logo" 
                        width={120} 
                        height={40} 
                        className="h-10 w-auto object-contain transition-all group-data-[collapsible=icon]:scale-0 group-data-[collapsible=icon]:w-0"
                        priority
                    />
                    {/* Small icon for collapsed state */}
                    <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center h-10 w-10 bg-primary/10 rounded-md">
                        <span className="text-primary font-bold text-lg">C</span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <PortalNavMain items={portalNav} name="Patient Portal" />
            </SidebarContent>
            <SidebarFooter>
                <PortalNavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
