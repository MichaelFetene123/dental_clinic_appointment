"use client";

import { format, isSameMonth, isSameDay } from "date-fns";
import { getAppointmentTypeDetails, type AppointmentEntry } from "../types";

interface MonthViewProps {
    monthDays:           Date[];
    currentDate:         Date;
    appointments:        AppointmentEntry[];
    onDayClick:          (date: Date) => void;
    onAppointmentClick:  (apt: AppointmentEntry) => void;
}

export function MonthView({
    monthDays,
    currentDate,
    appointments,
    onDayClick,
    onAppointmentClick,
}: MonthViewProps) {
    const getAppointmentsForDate = (date: Date) =>
        appointments.filter(
            (apt) => apt.date.toDateString() === date.toDateString()
        );

    return (
        <div className="grid grid-cols-7 gap-px bg-border min-w-[700px]">
            {/* Day-of-week headers */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="bg-muted/50 p-2 text-center text-xs font-medium">
                    {day}
                </div>
            ))}

            {/* Day cells */}
            {monthDays.map((date) => {
                const dayAppointments = getAppointmentsForDate(date);
                const isCurrentMonth  = isSameMonth(date, currentDate);
                return (
                    <div
                        key={date.toString()}
                        className={[
                            "min-h-[120px] bg-card p-2 cursor-pointer",
                            !isCurrentMonth ? "text-muted-foreground" : "",
                            isSameDay(date, new Date()) ? "bg-primary/5" : "",
                        ].join(" ")}
                        onClick={() => onDayClick(date)}
                    >
                        <div className="font-medium">{format(date, "d")}</div>
                        <div className="mt-1 space-y-1">
                            {dayAppointments.slice(0, 3).map((apt) => {
                                const typeDetails = getAppointmentTypeDetails(apt.type);
                                return (
                                    <div
                                        key={apt.id}
                                        className={`text-xs p-1 rounded ${typeDetails?.color}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAppointmentClick(apt);
                                        }}
                                    >
                                        {apt.time} — {apt.patient}
                                    </div>
                                );
                            })}
                            {dayAppointments.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                    +{dayAppointments.length - 3} more
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
