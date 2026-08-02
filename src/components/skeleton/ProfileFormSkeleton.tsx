import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileFormSkeleton() {
    return (
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 space-y-6 max-w-4xl">
            {/* Header Skeleton */}
            <div>
                <Skeleton className="h-9 w-48 rounded" />
                <Skeleton className="h-4 w-72 mt-2 rounded" />
            </div>

            <Tabs defaultValue="general" className="max-w-4xl">
                <TabsList className="mb-4">
                    <TabsTrigger value="general" disabled>
                        <Skeleton className="h-4 w-16" />
                    </TabsTrigger>
                    <TabsTrigger value="security" disabled>
                        <Skeleton className="h-4 w-16" />
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40 rounded" />
                            <Skeleton className="h-4 w-56 mt-2 rounded" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar section skeleton */}
                            <div className="flex items-center gap-6">
                                <Skeleton className="h-24 w-24 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-64 rounded" />
                                    <Skeleton className="h-4 w-48 rounded" />
                                </div>
                            </div>
                            
                            {/* Inputs section skeleton */}
                            <form className="space-y-4 max-w-xl">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-4 w-24 rounded" />
                                        <Skeleton className="h-10 w-full rounded" />
                                    </div>
                                ))}
                            </form>
                        </CardContent>
                        <CardFooter className="justify-end border-t p-4 bg-muted/20">
                            <Skeleton className="h-10 w-32 rounded" />
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
