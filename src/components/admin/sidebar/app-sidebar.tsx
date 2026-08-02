"use client"

import * as React from "react"
import {
    LayoutDashboardIcon,
    CalendarIcon,
    ClipboardListIcon,
    FileTextIcon,
    DatabaseIcon,
    SettingsIcon,
    HelpCircleIcon,
    SearchIcon,
    UserPlusIcon,
    BoxIcon,
    Stethoscope,
    UserIcon,
    KeyRound,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { usePermissions } from "@/components/providers/PermissionProvider"
import { ShieldCheck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// This is sample data.
const data = {
    user: {
        name: "Admin",
        email: "admin@hospital.com",
        avatar: "",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboardIcon,
        },
    ],
    navManagement: [
        {
            title: "Medical Records",
            icon: FileTextIcon,
            url: "#",
            items: [
                {
                    title: "Active Records",
                    url: "#",
                },
                {
                    title: "Archived Records",
                    url: "#",
                },
            ],
        },
        {
            title: "Inventory",
            icon: DatabaseIcon,
            url: "#",
            items: [
                {
                    title: "Dental Supplies",
                    url: "#",
                },
                {
                    title: "Equipment",
                    url: "#",
                },
            ],
        },
        {
            title: "Staff Management",
            icon: UserPlusIcon,
            url: "#",
            items: [
                {
                    title: "Doctors",
                    url: "#",
                },
                {
                    title: "Nurses & Assistants",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircleIcon,
        },
        {
            title: "Search",
            url: "#",
            icon: SearchIcon,
        },
    ],
    clinic: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboardIcon,
        },
        {
            title: "Appointments",
            url: "/admin/appointment",
            icon: CalendarIcon,
        },
        {
            title: "Patients",
            url: "/admin/patients",
            icon: Stethoscope,
        },
        {
            title: "Billing",
            url: "/admin/billing",
            icon: ClipboardListIcon,
        },
        {
            title: "Staff list",
            url: "/admin/staff",
            icon: UserIcon,
        }
    ],
    physicalAssets: [
        {
            title:"Stocks",
            url:"/admin/stocks",
            icon:BoxIcon
        }
    ]
}


export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: { name: string, email: string, avatar: string } }) {
    const { hasPermission, isLoading } = usePermissions();

    // Filter clinic navigation based on permissions
    const clinicNav = [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboardIcon,
            show: true, // Always visible
        },
        {
            title: "Appointments",
            url: "/admin/appointment",
            icon: CalendarIcon,
            show: isLoading || hasPermission("appointment.read"),
        },
        {
            title: "Patients",
            url: "/admin/patients",
            icon: Stethoscope,
            show: isLoading || hasPermission("patient.read"),
        },
        {
            title: "Staff list",
            url: "/admin/staff",
            icon: UserIcon,
            show: isLoading || hasPermission("staff.read"),
        },
        {
            title: "Portal Users",
            url: "/admin/portal-users",
            icon: KeyRound,
            show: isLoading || hasPermission("portal_users.read"),
        },
        {
            title: "Roles",
            url: "/admin/roles",
            icon: ShieldCheck,
            show: isLoading || hasPermission("staff.manage"), // specific perm for roles
        }
    ].filter(item => item.show);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>

                <NavMain items={clinicNav} name="Clinic"/>
            </SidebarContent>
            <SidebarFooter>
                {isLoading ? (
                    <div className="flex items-center gap-3 p-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-md group-data-[collapsible=icon]:hidden" />
                    </div>
                ) : (
                    <NavUser user={user} />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

