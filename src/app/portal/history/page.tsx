import { getPortalHistory } from "@/lib/actions/queries/portal-queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Stethoscope } from "lucide-react";

export default async function PortalHistoryPage() {
    const history = await getPortalHistory();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dental History</h1>
                <p className="text-muted-foreground">View your past treatments and diagnoses.</p>
            </div>

            <div className="space-y-4">
                {history.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                        No dental history records found.
                    </div>
                ) : (
                    history.map((record) => (
                        <Card key={record.id}>
                            <CardHeader className="pb-3 flex flex-row items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Stethoscope className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{record.treatmentType}</CardTitle>
                                    <CardDescription>
                                        {format(new Date(record.createdAt), "PPP")}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2 text-sm">
                                    {record.notes && (
                                        <div><span className="font-semibold">Notes:</span> {record.notes}</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
