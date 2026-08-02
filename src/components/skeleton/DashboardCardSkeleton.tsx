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
