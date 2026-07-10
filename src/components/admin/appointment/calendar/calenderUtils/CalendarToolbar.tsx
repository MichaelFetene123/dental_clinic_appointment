"use client";

import { format, addDays } from "date-fns";
import { CalendarCheck2, ChevronLeft, ChevronRight } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button }                from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalendarToolbarProps {
    view:        string;
    setView:     (v: string) => void;
    currentDate: Date;
    weekStart:   Date;
    onPrevious:  () => void;
    onNext:      () => void;
}

export function CalendarToolbar({
    view,
    setView,
    currentDate,
    weekStart,
    onPrevious,
    onNext,
}: CalendarToolbarProps) {
    const dateLabel =
        view === "month"
            ? format(currentDate, "MMMM yyyy")
            : view === "week"
            ? `${format(weekStart, "MMM d")} – ${format(addDays(weekStart, 6), "MMM d, yyyy")}`
            : format(currentDate, "MMMM d, yyyy");

    return (
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <CardTitle className="flex items-center gap-2">
                    <CalendarCheck2 className="h-5 w-5" />
                    Schedule
                </CardTitle>
                <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto sm:ml-4">
                    <TabsList className="grid w-full grid-cols-3 sm:flex">
                        <TabsTrigger value="day">Day</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                <Button variant="outline" size="icon" onClick={onPrevious} className="shrink-0">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium text-sm sm:text-base whitespace-nowrap text-center flex-1 sm:flex-none">
                    {dateLabel}
                </span>
                <Button variant="outline" size="icon" onClick={onNext} className="shrink-0">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </CardHeader>
    );
}
