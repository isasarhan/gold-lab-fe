"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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


const chartConfig = {
    totalWeight: {
        label: "Weight",
        color: "hsl(var(--chart-1))",
    },
    totalCash: {
        label: "Cash",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

import React, { FC } from 'react';
import YearlyAnalyticsFilter from "./filters"
import { cn } from "@/lib/utils"

export interface CustomerAnalyticsProps {
    chartData: { month: string, totalCash: number, totalWeight: number }[];
    className?: string
}
const CustomerInvoiceAnalytics: FC<CustomerAnalyticsProps> = ({ chartData, className }) => {

    return (
        <Card className={cn("mb-3", className)}>
            <div className="flex justify-between px-5">
                <span className="font-bold text-lg">Yearly Invoice - Analytics</span>
                <YearlyAnalyticsFilter />
            </div>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[450] w-full">
                    <BarChart accessibilityLayer data={chartData}>
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
                        <Bar dataKey="totalWeight" fill="#FFD700" radius={4} />
                        <Bar dataKey="totalCash" fill="#85BB65" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
export default CustomerInvoiceAnalytics;
