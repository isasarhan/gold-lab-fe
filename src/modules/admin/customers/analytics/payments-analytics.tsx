"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import React, { FC } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import YearlyAnalyticsFilter from "./filters";
import { cn } from "@/lib/utils";


const chartConfig = {
    totalCash: {
        label: "$",
        color: "#000000",
    },
    totalWeight18k: {
        label: "740",
        color: "#FFD700",
    },
    totalWeight21k: {
        label: "865",
        color: "#FFC000",
    },
    totalWeight995: {
        label: "995",
        color: "#FCF55F",
    },
    totalWeight999: {
        label: "999.9",
        color: "#FAFA33",
    },
} satisfies ChartConfig

export interface CustomerReceiptsAnalyticsProps {
    className?: string
    chartData: {
        month: string,
        totalCash: number,
        totalWeight18k: number,
        totalWeight21k: number,
        totalWeight995: number,
        totalWeight999: number,
    }[];
}

const CustomerReceiptsAnalytics: FC<CustomerReceiptsAnalyticsProps> = ({ chartData, className }) => {

    return (
        <Card className={cn("mb-3", className)}>
            <div className="flex justify-between px-5">
                <span className="font-bold text-lg">Yearly Receipts - Analytics</span>
                <YearlyAnalyticsFilter />
            </div>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[450] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                        <Line
                            dataKey="totalWeight18k"
                            type="monotone"
                            stroke="#F0E68C "
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="totalWeight21k"
                            type="monotone"
                            stroke="#DAA520"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="totalWeight995"
                            type="monotone"
                            stroke="#FFFF00"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="totalWeight999"
                            type="monotone"
                            stroke="#FFAA33"
                            strokeWidth={2}
                            dot={false}
                        />

                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
export default CustomerReceiptsAnalytics;
