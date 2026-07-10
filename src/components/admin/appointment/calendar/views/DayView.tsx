"use client";

import { format } from "date-fns";
import { timeSlots, type AppointmentEntry } from "../types";
import { AppointmentSlot } from "../calenderUtils/AppointmentSlot";

interface DayViewProps {
    currentDate: Date;
    appointments: AppointmentEntry[];
    isCalendarFetching: boolean;
    pendingSlot: { date: string; time: string } | null;
    onSlotClick: (date: Date, time: string) => void;
    onAppointmentClick: (apt: AppointmentEntry) => void;
}

export function DayView({
    currentDate,
    appointments,
    isCalendarFetching,
    pendingSlot,
    onSlotClick,
    onAppointmentClick,
}: DayViewProps) {
    const currentDateStr = format(currentDate, "yyyy-MM-dd");

    const getAppointmentsForSlot = (time: string) =>
        appointments.filter(
            (apt) =>
                format(apt.date, "yyyy-MM-dd") === currentDateStr &&
                apt.time === time
        );

    return (
        <div className="grid grid-cols-[80px_1fr]">
            {/* Time gutter */}
            <div className="sticky left-0 z-10 bg-background border-r border-border shadow-[1px_0_0_0_hsl(var(--border))]">
                <div className="h-12 border-b border-border" />
                {timeSlots.map((time) => (
                    <div key={time} className="h-12 border-b border-border px-2 py-1">
                        <span className="text-xs text-muted-foreground">{time}</span>
                    </div>
                ))}
            </div>

            {/* Day column */}
            <div className="min-w-[300px]">
                <div className="h-12 border-b border-border px-2 py-2 text-center bg-muted/50">
                    <div className="font-medium">{format(currentDate, "EEEE")}</div>
                    <div className="text-sm text-muted-foreground">{format(currentDate, "MMMM d")}</div>
                </div>
                {timeSlots.map((time) => (
                    <AppointmentSlot
                        key={`${currentDateStr}T${time}`}
                        dateStr={currentDateStr}
                        time={time}
                        appointments={getAppointmentsForSlot(time)}
                        isPending={
                            isCalendarFetching &&
                            pendingSlot?.date === currentDateStr &&
                            pendingSlot?.time === time
                        }
                        onSlotClick={() => onSlotClick(currentDate, time)}
                        onAppointmentClick={onAppointmentClick}
                    />
                ))}
            </div>
        </div>
    );
}
