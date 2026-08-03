"use client"

import * as React from "react"
import {  Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useDashboardStats } from "@/hooks/use-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartAreaInteractiveSkeleton } from "@/components/skeleton/DashboardCardSkeleton"

const chartConfig = {
    visitors: {
        label: "Patients",
    },
    desktop: {
        label: "New Patients",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Returning Patients",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartAreaInteractive() {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("30d")
    const { data, isLoading, isError } = useDashboardStats()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        if (isMobile) {
            setTimeRange("7d")
        }
    }, [isMobile])

    if (!mounted || isLoading) {
        return <ChartAreaInteractiveSkeleton />
    }

    if (isError || !data) {
        return (
            <Card className="h-full flex items-center justify-center p-6">
                <CardTitle className="text-muted-foreground text-sm">Failed to load chart data</CardTitle>
            </Card>
        )
    }

    const chartData = data.chartData;

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date()
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        startDate.setHours(0, 0, 0, 0)
        return date >= startDate
    })

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="relative flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <CardTitle>Total Patients</CardTitle>
                <CardDescription>
                    <span className="@[540px]/card:block hidden">
                        Total for the last 3 months
                    </span>
                    <span className="@[540px]/card:hidden">Last 3 months</span>
                </CardDescription>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex-grow">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto w-full h-full"
                >
                    <BarChart accessibilityLayer data={filteredData}>
                        <ChartLegend content={<ChartLegendContent />} />

                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />

                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}

