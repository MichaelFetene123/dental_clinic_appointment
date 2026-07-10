"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button }   from "@/components/ui/button";
import { getAppointmentTypeDetails, type AppointmentEntry } from "../types";

interface AppointmentSlotProps {
    dateStr:             string;
    time:                string;
    appointments:        AppointmentEntry[];
    isPending:           boolean;
    onSlotClick:         () => void;
    onAppointmentClick:  (apt: AppointmentEntry) => void;
}

export function AppointmentSlot({
    dateStr,
    time,
    appointments,
    isPending,
    onSlotClick,
    onAppointmentClick,
}: AppointmentSlotProps) {
    return (
        <div
            key={`${dateStr}T${time}`}
            className="h-12 border-b border-border px-1 py-1 relative group"
            onClick={onSlotClick}
        >
            {isPending ? (
                <Skeleton className="absolute inset-1 rounded" />
            ) : (
                <>
                    {appointments.map((apt) => {
                        const typeDetails = getAppointmentTypeDetails(apt.type);
                        return (
                            <div
                                key={apt.id}
                                className={`absolute inset-1 rounded p-1 text-xs cursor-pointer ${typeDetails?.color}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAppointmentClick(apt);
                                }}
                            >
                                <div className="font-medium truncate">{apt.patient}</div>
                                <div className="truncate">{typeDetails?.name}</div>
                            </div>
                        );
                    })}
                    {appointments.length === 0 && (
                        <div className="hidden group-hover:block">
                            <Button variant="ghost" className="h-full w-full p-0 text-xs">+</Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
