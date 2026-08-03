import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarCheck } from 'lucide-react';

export function UpcomingAppointmentsSkeleton() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-primary" /> Upcoming Appointments
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y">
                <div className="p-4 flex justify-between items-center gap-4">
                    <div className="flex items-start gap-3">
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            </CardContent>
        </Card>
    )
}
