"use client";

import { useDashboardStats } from "@/hooks/use-dashboard";
import { SectionCards } from "@/components/admin/sidebar/section-cards";
import AppointmentList from "@/components/admin/appointment/appointment-list";
import EmployeeList from "@/components/admin/staff/EmployeeList";
import {
    AlertTriangleIcon,
    CalendarCheckIcon,
    CircleCheckBig,
    TrendingUpIcon,
    Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardClient() {
    const { data, isLoading, isError } = useDashboardStats();

    const cardData = [
        {
            title: "Total registered patients",
            value: data?.stats.totalPatients ?? 0,
            description: "Total Patients",
            icon: <Users className="text-primary" />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Currently confirmed appointments",
            value: data?.stats.scheduledAppointments ?? 0,
            description: "Appointments Scheduled",
            icon: <CalendarCheckIcon />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Successfully completed procedures",
            value: data?.stats.completedProcedures ?? 0,
            description: "Completed Procedures",
            icon: <CircleCheckBig />,
            badge: { text: "Live", icon: <TrendingUpIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
        {
            title: "Appointments awaiting confirmation",
            value: data?.stats.pendingInQueue ?? 0,
            description: "In Queue",
            icon: <AlertTriangleIcon />,
            badge: { text: "Pending", icon: <AlertTriangleIcon className="size-3" />, color: "green", textColor: "green", borderColor: "green" },
        },
    ];

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-sm">
                Failed to load dashboard statistics. Please refresh the page.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <SectionCards data={cardData} />
            <div className="grid md:grid-cols-2 gap-4 h-full">
                <EmployeeList />
                <AppointmentList recentAppointments={data?.recentAppointments ?? []} />
            </div>
        </div>
    );
}
