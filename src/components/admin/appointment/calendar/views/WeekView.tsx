"use client";

import { format } from "date-fns";
import { timeSlots, type AppointmentEntry } from "../types";
import { AppointmentSlot } from "../calenderUtils/AppointmentSlot";

interface WeekViewProps {
    weekDays: Date[];
    appointments: AppointmentEntry[];
    isCalendarFetching: boolean;
    pendingSlot: { date: string; time: string } | null;
    onSlotClick: (date: Date, time: string) => void;
    onAppointmentClick: (apt: AppointmentEntry) => void;
}

export function WeekView({
    weekDays,
    appointments,
    isCalendarFetching,
    pendingSlot,
    onSlotClick,
    onAppointmentClick,
}: WeekViewProps) {
    const getAppointmentsForSlot = (date: Date, time: string) =>
        appointments.filter(
            (apt) =>
                format(apt.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
                apt.time === time
        );

    return (
        <div className="grid grid-cols-[80px_repeat(7,1fr)] divide-x divide-border">
            {/* Time gutter */}
            <div className="sticky left-0 z-10 bg-background border-r border-border shadow-[1px_0_0_0_hsl(var(--border))]">
                <div className="h-12 border-b border-border" />
                {timeSlots.map((time) => (
                    <div key={time} className="h-12 border-b border-border px-2 py-1">
                        <span className="text-xs text-muted-foreground">{time}</span>
                    </div>
                ))}
            </div>

            {/* One column per day */}
            {weekDays.map((date) => {
                const dateStr = format(date, "yyyy-MM-dd");
                return (
                    <div key={date.toString()} className="min-w-[180px]">
                        <div className="h-12 border-b border-border px-2 py-2 text-center bg-muted/50">
                            <div className="font-medium">{format(date, "EEE")}</div>
                            <div className="text-sm text-muted-foreground">{format(date, "MMM d")}</div>
                        </div>
                        {timeSlots.map((time) => (
                            <AppointmentSlot
                                key={`${dateStr}T${time}`}
                                dateStr={dateStr}
                                time={time}
                                appointments={getAppointmentsForSlot(date, time)}
                                isPending={
                                    isCalendarFetching &&
                                    pendingSlot?.date === dateStr &&
                                    pendingSlot?.time === time
                                }
                                onSlotClick={() => onSlotClick(date, time)}
                                onAppointmentClick={onAppointmentClick}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
