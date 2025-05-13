"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
import { FC } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IEmployee } from "@/types/employee"
import AttendenceFilters from "./components/attendence-filter"


const chartConfig = {
    arrival: {
        label: "Arrival",
        color: "hsl(var(--chart-1))",
    },
    departure: {
        label: "Departure",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export interface AttendenceModuleProps {
    employees: IEmployee[],
    data: {
        data: {
            date: string
            arrival: number
            departure: number
        }[];
        total: number;
        page: number;
        pages: number;
    }
}

const AttendenceModule: FC<AttendenceModuleProps> = ({ data, employees }) => {
    return (
        <Card>
            <CardContent className="w-full">
                <div>
                    <AttendenceFilters employees={employees} />
                </div>
                    <Tabs defaultValue="arrival" >
                        <TabsList>
                            <TabsTrigger value="arrival" className="p-2">Arrival</TabsTrigger>
                            <TabsTrigger value="departure">Departure</TabsTrigger>
                        </TabsList>
                        <TabsContent value="arrival" >
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={data.data}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    // tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <Area
                                        dataKey="arrival"
                                        type="natural"
                                        fill={chartConfig.arrival.color}
                                        stroke={chartConfig.arrival.color}
                                        fillOpacity={0.4}
                                    />

                                </AreaChart>
                            </ChartContainer>
                        </TabsContent>
                        <TabsContent value="departure">
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={data.data}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    // tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <Area
                                        dataKey="departure"
                                        type="natural"
                                        fill={chartConfig.departure.color}
                                        stroke={chartConfig.departure.color}
                                        fillOpacity={0.4}
                                    />

                                </AreaChart>
                            </ChartContainer>
                        </TabsContent>
                    </Tabs>
            </CardContent>
        </Card>
    )
}


export default AttendenceModule;