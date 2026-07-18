import { getPortalAppointments } from "@/lib/actions/queries/portal-queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function PortalAppointmentsPage() {
    const appointments = await getPortalAppointments();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                <p className="text-muted-foreground">Manage your upcoming and past appointments.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        No appointments found. Call the clinic to book one!
                    </div>
                ) : (
                    appointments.map((appt) => (
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
