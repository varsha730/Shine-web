"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Users, Calendar, CheckSquare, Award } from "lucide-react"

// Update metrics to be education-focused
const metrics = [
  {
    title: "Total Students",
    value: "1,247",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Present Today",
    value: "1,156",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Tasks Submitted",
    value: "892",
    change: "+18.3%",
    changeType: "positive" as const,
    icon: CheckSquare,
  },
  {
    title: "Average Quiz Score",
    value: "78.5%",
    change: "+3.1%",
    changeType: "positive" as const,
    icon: Award,
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metric.changeType === "positive" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={metric.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                {metric.change}
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
