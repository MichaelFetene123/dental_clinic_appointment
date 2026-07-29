"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { PortalAppointmentModal } from "@/components/portal/PortalAppointmentModal";
import { usePortalAppointments } from "@/hooks/use-portal-appointments";

export default function PortalAppointmentsPage() {
    const { data: appointments, isLoading } = usePortalAppointments();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                    <p className="text-muted-foreground">Manage your upcoming and past appointments.</p>
                </div>
                <PortalAppointmentModal />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    // Skeleton placeholders while loading
                    Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-3 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                        </Card>
                    ))
                ) : appointments?.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        No appointments found. Use the button above to book one!
                    </div>
                ) : (
                    appointments?.map((appt) => (
                        <Card key={appt.id}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{appt.reason}</CardTitle>
                                    <Badge variant={appt.status === "CONFIRMED" ? "default" : appt.status === "PENDING" ? "secondary" : "outline"}>
                                        {appt.status}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    {format(new Date(appt.date), "PPP")} at {appt.time}
                                </CardDescription>
                            </CardHeader>
                            {appt.notes && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{appt.notes}</p>
                                </CardContent>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
