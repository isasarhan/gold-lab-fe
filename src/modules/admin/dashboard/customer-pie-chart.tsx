"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
    individual: {
        label: "Individual",
        color: "#4CAF50",
    },
    wholesaler: {
        label: "Wholesaler",
        color: "#2196F3",
    },
    retailer: {
        label: "Retailer",
        color: "#FF9800",
    },
    distributor: {
        label: "Distributor",
        color: "#9C27B0",
    },
    reseller: {
        label: "Reseller",
        color: "#E91E63",
    },
    corporate: {
        label: "Corporate",
        color: "#3F51B5",
    },
    government: {
        label: "Government",
        color: "#F44336",
    },
} satisfies ChartConfig

export interface CustomerPieChartProps {
    customersAnalytics: { _id: string, count: number }[]
}
const CustomerPieChart: React.FC<CustomerPieChartProps> = ({ customersAnalytics }) => {

    const chartData = customersAnalytics.map((analytics)=>({
        type: analytics._id, count:analytics.count,  fill: chartConfig[analytics._id as keyof typeof chartConfig]?.color ?? "#CCCCCC",

    }))
    // [{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },]

    const totalVisitors = React.useMemo(() => {
        return customersAnalytics.reduce((acc, curr) => acc + curr.count, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-center">Customer Types</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="type"
                            innerRadius={60}
                            strokeWidth={5}
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
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Customers
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default CustomerPieChart;
