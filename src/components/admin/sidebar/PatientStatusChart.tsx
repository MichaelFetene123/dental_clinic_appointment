"use client"

import * as React from "react"
import { Square } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { useDashboardStats } from "@/hooks/use-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { PatientStatusChartSkeleton } from "@/components/skeleton/DashboardCardSkeleton"

export function PatientStatusChart() {
    const { data, isLoading, isError } = useDashboardStats()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || isLoading) {
        return <PatientStatusChartSkeleton />
    }

    if (isError || !data) {
        return (
            <Card className="flex flex-col h-full min-h-[300px] items-center justify-center p-6">
                <CardTitle className="text-muted-foreground text-sm">Failed to load chart data</CardTitle>
            </Card>
        )
    }

    const departmentData = data.departmentData || [];

    if (departmentData.length === 0) {
        return (
            <Card className="flex flex-col h-full min-h-[300px]">
                <CardHeader>
                    <CardTitle>Patient Department</CardTitle>
                </CardHeader>
                <div className="flex-grow flex items-center justify-center p-6 text-center">
                    <p className="text-muted-foreground text-sm">No treatment data yet.</p>
                </div>
            </Card>
        )
    }

    const colorVars = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
    
    const chartDataWithColors = departmentData.map((item, index) => ({
        ...item,
        fill: colorVars[index % colorVars.length]
    }));

    const chartConfig = {} as ChartConfig;
    chartDataWithColors.forEach((item, index) => {
        chartConfig[item.status.toLowerCase()] = {
            label: item.status,
            color: colorVars[index % colorVars.length]
        }
    });

    return (
        <Card className="flex flex-col h-full min-h-[300px]">
            <CardHeader>
                <CardTitle>Patient Department</CardTitle>
            </CardHeader>
            <div className="flex px-2 flex-grow items-center">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] w-[60%]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartDataWithColors}
                            dataKey="patients"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={0}
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                <Sector {...props} outerRadius={outerRadius + 10} />
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-6xl font-bold text-white"
                                                >
                                                    &#x1f465;
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>

                {/* Add all labels here */}
                <div className="flex flex-col justify-center gap-2 ml-4 w-[40%]">
                    {chartDataWithColors.map((item) => (
                        <div key={item.status} className="flex items-center gap-2">
                            <Square size={13} style={{ backgroundColor: item.fill, color: item.fill }} className="flex-shrink-0" />
                            <p className="text-foreground text-sm truncate" title={item.status}>{item.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
