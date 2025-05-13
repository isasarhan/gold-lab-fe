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
    console.log(data);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Area Chart</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex">
                    <div className="w-1/5 flex flex-col justify-center">
                        <AttendenceFilters employees={employees}/>
                    </div>
                    <div className="w-4/5"><Tabs defaultValue="arrival" className="h-1/6">
                    <TabsList>
                        <TabsTrigger value="arrival">Arrival</TabsTrigger>
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
                                    type="linear"
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
                                    type="linear"
                                    fill={chartConfig.departure.color}
                                    stroke={chartConfig.departure.color}
                                    fillOpacity={0.4}
                                />

                            </AreaChart>
                        </ChartContainer>
                    </TabsContent>
                </Tabs></div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}


export default AttendenceModule;