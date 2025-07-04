"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mon", submissions: 45 },
  { name: "Tue", submissions: 52 },
  { name: "Wed", submissions: 38 },
  { name: "Thu", submissions: 67 },
  { name: "Fri", submissions: 71 },
  { name: "Sat", submissions: 23 },
  { name: "Sun", submissions: 18 },
]

export function SalesChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Weekly Task Submissions</CardTitle>
        <CardDescription>Task submission trends for the current week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            submissions: {
              label: "Submissions",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="submissions" fill="var(--color-submissions)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
