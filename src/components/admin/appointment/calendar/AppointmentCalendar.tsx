"use client";

import { useState, useActionState, useEffect, useRef } from "react";
import { useCalendarAppointments } from "@/hooks/use-appointments";
import { useQueryClient } from "@tanstack/react-query";
import { createAppointment, type ActionResponse } from "@/lib/actions/mutations/appointment-mutations";
import { toast } from "sonner";
import { queryKeys } from "@/lib/queryKeys";
import { format, addDays, startOfWeek, eachDayOfInterval, addMonths, startOfMonth, endOfMonth } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import type { AppointmentEntry } from "./types";
import { CalendarToolbar } from "./calenderUtils/CalendarToolbar";
import { DayView } from "./views/DayView";
import { WeekView } from "./views/WeekView";
import { MonthView } from "./views/MonthView";
import { NewAppointmentDialog } from "./dialogs/NewAppointmentDialog";
import { ViewAppointmentDialog } from "./dialogs/ViewAppointmentDialog";

// ─── Orchestrator ────────────────────────────────────────────────────────────
export default function AppointmentCalendar() {
    // ── Data ──────────────────────────────────────────────────────────────────
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const { data: serverAppointments, isFetching: isCalendarFetching } =
        useCalendarAppointments(currentDate);
    const queryClient = useQueryClient();

    // ── Create-appointment action ──────────────────────────────────────────────
    const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(
        createAppointment,
        { success: false, error: "" }
    );

    const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
    const [pendingSlot, setPendingSlot] = useState<{ date: string; time: string } | null>(null);

    // Track the slot that was active when the form was submitted
    // (selectedSlot may be cleared before the effect fires)
    const submittedSlotRef = useRef<{ date: Date; time: string } | null>(null);

    // Detect a *new* success response — useActionState never resets state between
    // submissions, so depending on state.success alone skips the effect on repeat submits.
    const prevStateRef = useRef<ActionResponse | null>(null);

    useEffect(() => {
        // Only react when a genuinely new state object has arrived AND it's a success.
        // This ensures repeated submissions each trigger the toast + close.
        if (prevStateRef.current === state) return;
        prevStateRef.current = state;

        if (state.success) {
            if (submittedSlotRef.current) {
                setPendingSlot({
                    date: format(submittedSlotRef.current.date, "yyyy-MM-dd"),
                    time: submittedSlotRef.current.time,
                });
                submittedSlotRef.current = null;
            }
            setSelectedSlot(null);
            toast.success("Appointment successfully scheduled!");
            queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
        }
    }, [state, queryClient]);

    // Clear the optimistic skeleton once the refetch settles
    useEffect(() => {
        if (!isCalendarFetching && pendingSlot) setPendingSlot(null);
    }, [isCalendarFetching, pendingSlot]);

    // ── Normalise server data ──────────────────────────────────────────────────
    const appointments: AppointmentEntry[] =
        serverAppointments?.map((apt) => ({
            id: apt.id,
            date: new Date(apt.date),
            time: apt.time,
            duration: 30,
            patient: apt.patientName,
            type: apt.reason,
            phone: apt.patientPhone || "N/A",
            email: apt.patientEmail || "N/A",
            notes: apt.notes || "",
        })) ?? [];

    // ── View / selection state ────────────────────────────────────────────────
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentEntry | null>(null);
    const [view, setView] = useState("day");
    const [isEditing, setIsEditing] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    // ── Derived calendar ranges ───────────────────────────────────────────────
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });
    const monthStart = startOfMonth(currentDate);
    const monthDays = eachDayOfInterval({
        start: startOfWeek(monthStart, { weekStartsOn: 1 }),
        end: endOfMonth(currentDate),
    });

    // ── Navigation ────────────────────────────────────────────────────────────
    const handlePrevious = () => {
        if (view === "day") setCurrentDate(addDays(currentDate, -1));
        if (view === "week") setCurrentDate(addDays(currentDate, -7));
        if (view === "month") setCurrentDate(addMonths(currentDate, -1));
    };
    const handleNext = () => {
        if (view === "day") setCurrentDate(addDays(currentDate, 1));
        if (view === "week") setCurrentDate(addDays(currentDate, 7));
        if (view === "month") setCurrentDate(addMonths(currentDate, 1));
    };

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="w-full min-w-0 bg-background">
            <div className="w-full min-w-0 max-w-7xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-foreground">Dental Clinic Schedule</h1>
                    <p className="text-muted-foreground mt-2">Manage your appointments efficiently</p>
                </div>

                <Card className="w-full overflow-hidden">
                    <CalendarToolbar
                        view={view}
                        setView={setView}
                        currentDate={currentDate}
                        weekStart={weekStart}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />

                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        <ScrollArea className="h-[600px] md:h-[800px] w-full rounded-none sm:rounded-md border-y sm:border">
                            <Tabs value={view} className="w-full">
                                <TabsContent value="day" className="m-0 min-w-[300px]">
                                    <DayView
                                        currentDate={currentDate}
                                        appointments={appointments}
                                        isCalendarFetching={isCalendarFetching}
                                        pendingSlot={pendingSlot}
                                        onSlotClick={(date, time) => setSelectedSlot({ date, time })}
                                        onAppointmentClick={setSelectedAppointment}
                                    />
                                </TabsContent>
                                <TabsContent value="week" className="m-0 min-w-[1340px]">
                                    <WeekView
                                        weekDays={weekDays}
                                        appointments={appointments}
                                        isCalendarFetching={isCalendarFetching}
                                        pendingSlot={pendingSlot}
                                        onSlotClick={(date, time) => setSelectedSlot({ date, time })}
                                        onAppointmentClick={setSelectedAppointment}
                                    />
                                </TabsContent>
                                <TabsContent value="month" className="m-0 min-w-[700px]">
                                    <MonthView
                                        monthDays={monthDays}
                                        currentDate={currentDate}
                                        appointments={appointments}
                                        onDayClick={(date) => {
                                            setCurrentDate(date);
                                            setView("day");
                                        }}
                                        onAppointmentClick={setSelectedAppointment}
                                    />
                                </TabsContent>
                            </Tabs>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* ── Dialogs ─────────────────────────────────────────────── */}
                <NewAppointmentDialog
                    selectedSlot={selectedSlot}
                    onClose={() => setSelectedSlot(null)}
                    formAction={formAction}
                    onSubmit={() => { submittedSlotRef.current = selectedSlot; }}
                    state={state}
                    isPending={isPending}
                />

                <ViewAppointmentDialog
                    selectedAppointment={selectedAppointment}
                    isEditing={isEditing}
                    resetKey={resetKey}
                    onClose={() => {
                        setSelectedAppointment(null);
                        setIsEditing(false);
                    }}
                    onEdit={() => setIsEditing(true)}
                    onCancelEdit={() => setIsEditing(false)}
                    onSuccess={() => {
                        setResetKey((prev) => prev + 1);
                        setSelectedAppointment(null);
                        setIsEditing(false);
                    }}
                />
            </div>
        </div>
    );
}