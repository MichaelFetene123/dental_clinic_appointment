import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 space-y-6">
            <div>
                <Skeleton className="h-9 w-64 rounded" />
                <Skeleton className="h-4 w-72 rounded mt-2" />
            </div>

            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="pb-3 flex flex-row items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-40 rounded" />
                                <Skeleton className="h-4 w-32 rounded" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-64 rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
