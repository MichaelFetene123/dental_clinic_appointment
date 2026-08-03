import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardCardSkeleton() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-3 w-40 rounded" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-16 rounded" />
                    <Skeleton className="h-4 w-20 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export function DashboardCardsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <DashboardCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function ChartAreaInteractiveSkeleton() {
    return (
        <Card className="h-full flex flex-col min-h-[400px]">
            <CardHeader className="relative flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48 hidden sm:block" />
                <Skeleton className="h-10 w-[160px] sm:ml-auto" />
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex-grow flex items-center justify-center">
                <Skeleton className="w-full h-full min-h-[250px] rounded-xl" />
            </CardContent>
        </Card>
    )
}

export function PatientStatusChartSkeleton() {
    return (
        <Card className="flex flex-col h-full min-h-[300px]">
            <CardHeader>
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <div className="flex px-2 flex-grow items-center justify-center p-4">
                <Skeleton className="h-[200px] w-[200px] rounded-full" />
                <div className="flex flex-col justify-center gap-4 ml-8 w-[40%]">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </Card>
    )
}
