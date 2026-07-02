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

const chartData = [
    { status: "Braces", patients: 150, fill: "#407C82" }, // Teal
    { status: "Canal", patients: 120, fill: "#FFC857" }, // Golden Yellow
    { status: "Orthodontics", patients: 200, fill: "#89C2D9" }, // Sky Blue
    { status: "Endodontics", patients: 180, fill: "#1E6091" }, // Warm Orange
]

// Sort the data to ensure the highest number of patients is at the top
const sortedChartData = [...chartData].sort((a, b) => b.patients - a.patients)

const chartConfig = {
    braces: {
        label: "Braces Patients",
        color: "#407C82", // Teal
    },
    canal: {
        label: "Canal Patients",
        color: "#FFC857", // Golden Yellow
    },
    orthodontics: {
        label: "Orthodontics Patients",
        color: "#89C2D9", // Sky Blue
    },
    endodontics: {
        label: "Endodontics Patients",
        color: "#1E6091", // Warm Orange
    },
} satisfies ChartConfig

export function PatientStatusChart() {

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Patient Department</CardTitle>
            </CardHeader>
            <div className="flex px-2">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] w-[70%]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={sortedChartData}  // Use sorted data so highest is at the top
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
                <div className="flex flex-col justify-center gap-2 ml-4">
                    {sortedChartData.map((item) => (
                        <div key={item.status} className="flex items-center gap-2">
                            <Square size={13} style={{ backgroundColor: item.fill, color: item.fill }} />
                            <p className="text-black text-sm">{item.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
