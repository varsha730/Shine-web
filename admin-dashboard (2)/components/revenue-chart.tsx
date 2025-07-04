"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", attendance: 85, performance: 78 },
  { month: "Feb", attendance: 88, performance: 82 },
  { month: "Mar", attendance: 92, performance: 85 },
  { month: "Apr", attendance: 87, performance: 80 },
  { month: "May", attendance: 90, performance: 88 },
  { month: "Jun", attendance: 94, performance: 91 },
  { month: "Jul", attendance: 89, performance: 86 },
  { month: "Aug", attendance: 91, performance: 89 },
  { month: "Sep", attendance: 88, performance: 84 },
  { month: "Oct", attendance: 93, performance: 90 },
  { month: "Nov", attendance: 95, performance: 92 },
  { month: "Dec", attendance: 91, performance: 88 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Academic Performance Overview</CardTitle>
        <CardDescription>Monthly attendance and performance trends</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            attendance: {
              label: "Attendance %",
              color: "hsl(var(--chart-1))",
            },
            performance: {
              label: "Performance %",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="var(--color-attendance)"
                strokeWidth={2}
                dot={{ fill: "var(--color-attendance)" }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="var(--color-performance)"
                strokeWidth={2}
                dot={{ fill: "var(--color-performance)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
