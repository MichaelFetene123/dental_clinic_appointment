import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the 24-slot (8:00–19:30) half-hour grid used by AppointmentCalendar
const SLOT_COUNT = 24;

// A few fake "appointments" scattered through the skeleton so the loading state
// looks populated (as the user described: appointments immediately populate)
const FAKE_SLOTS = [2, 5, 8, 13, 18]; // indices of slots that show a shimmer block

export function AppointmentCalendarSkeleton() {
    return (
        <div className="w-full min-w-0 bg-background">
            <div className="w-full min-w-0 max-w-7xl mx-auto">
                {/* Title area */}
                <div className="mb-6 space-y-2">
                    <Skeleton className="h-9 w-72 rounded-md" />
                    <Skeleton className="h-4 w-48 rounded-md" />
                </div>

                {/* Card shell */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    {/* CardHeader — tabs + navigation */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-5 w-20 rounded-md" />
                            {/* Tab pills */}
                            <div className="flex gap-1 ml-4">
                                {["Day", "Week", "Month"].map((t) => (
                                    <Skeleton key={t} className="h-8 w-16 rounded-md" />
                                ))}
                            </div>
                        </div>
                        {/* Chevron navigation */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-5 w-36 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                    </div>

                    {/* Calendar grid — day view layout */}
                    <div className="h-[600px] md:h-[800px] overflow-hidden">
                        <div className="grid grid-cols-[80px_1fr] h-full">
                            {/* Time column */}
                            <div className="border-r border-border bg-background">
                                {/* Header spacer */}
                                <div className="h-12 border-b border-border" />
                                {Array.from({ length: SLOT_COUNT }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-12 border-b border-border px-2 py-1 flex items-start"
                                    >
                                        <Skeleton className="h-3 w-10 rounded" />
                                    </div>
                                ))}
                            </div>

                            {/* Day column */}
                            <div className="min-w-[300px]">
                                {/* Day header */}
                                <div className="h-12 border-b border-border px-2 py-2 bg-muted/50 flex flex-col items-center justify-center gap-1">
                                    <Skeleton className="h-4 w-20 rounded-md" />
                                    <Skeleton className="h-3 w-16 rounded-md" />
                                </div>

                                {/* Time slots — some have shimmering appointment blocks */}
                                {Array.from({ length: SLOT_COUNT }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-12 border-b border-border px-1 py-1 relative"
                                    >
                                        {FAKE_SLOTS.includes(i) && (
                                            <Skeleton className="absolute inset-1 rounded" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
