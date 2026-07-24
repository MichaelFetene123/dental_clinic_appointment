import { getPortalAppointments } from "@/lib/actions/queries/portal-queries";
import { requirePatientAuth } from "@/lib/auth/guards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowRight, Calendar, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PortalDashboardPage() {
    const { patient } = await requirePatientAuth();
    const appointments = await getPortalAppointments();
    
    // Find the next upcoming appointment
    const upcomingAppointment = appointments
        .filter(a => new Date(a.date) >= new Date() && a.status !== "COMPLETED")
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {patient.name}!</h1>
                <p className="text-muted-foreground mt-2">Here is an overview of your dental care.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" /> Next Appointment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                        {upcomingAppointment ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="font-medium text-lg">{upcomingAppointment.reason}</div>
                                    <div className="text-muted-foreground">
                                        {format(new Date(upcomingAppointment.date), "PPP")} at {upcomingAppointment.time}
                                    </div>
                                </div>
                                <div>
                                    <Badge variant={upcomingAppointment.status === "CONFIRMED" ? "default" : "secondary"}>
                                        {upcomingAppointment.status}
                                    </Badge>
                                </div>
                            </div>
                        ) : (
                            <div className="text-muted-foreground py-4">
                                You have no upcoming appointments scheduled.
                            </div>
                        )}
                        <div className="pt-6 mt-auto">
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/portal/appointments">
                                    View All Appointments <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Button asChild variant="ghost" className="justify-start">
                                <Link href="/portal/history">
                                    <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                                    View Dental History
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" className="justify-start">
                                <Link href="/portal/documents">
                                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                                    View Medical Documents
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
