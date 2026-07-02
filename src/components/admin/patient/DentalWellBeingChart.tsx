"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Dental health progress data
const chartData = [
    { month: "Jan", health: 75 },
    { month: "Feb", health: 78 },
    { month: "Mar", health: 80 },
    { month: "Apr", health: 85 },
    { month: "May", health: 88 },
    { month: "Jun", health: 90 },
];
const chartConfig = {
    desktop: {
        label: "Health",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function DentalHealthChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dental Well-being Progress</CardTitle>
            </CardHeader>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={8}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 1)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="health" fill="var(--color-desktop)" radius={10} />
                </BarChart>
            </ChartContainer>
        </Card>
    );
}
