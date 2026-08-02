import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 space-y-6">
            <div>
                <Skeleton className="h-9 w-64 rounded" />
                <Skeleton className="h-4 w-72 mt-2 rounded" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="pb-3 flex flex-row items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4 rounded" />
                                <Skeleton className="h-4 w-1/2 rounded" />
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
