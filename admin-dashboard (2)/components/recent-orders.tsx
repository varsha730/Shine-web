"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: "ACT-001",
    student: {
      name: "Alice Johnson",
      email: "alice.johnson@student.edu",
      avatar: "/placeholder.svg?height=32&width=32",
      studentId: "STU001",
    },
    activity: "Quiz Completed",
    subject: "Mathematics",
    score: "85%",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ACT-002",
    student: {
      name: "Bob Smith",
      email: "bob.smith@student.edu",
      avatar: "/placeholder.svg?height=32&width=32",
      studentId: "STU002",
    },
    activity: "Task Submitted",
    subject: "Physics",
    score: "Pending",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "ACT-003",
    student: {
      name: "Carol Davis",
      email: "carol.davis@student.edu",
      avatar: "/placeholder.svg?height=32&width=32",
      studentId: "STU003",
    },
    activity: "Assignment Submitted",
    subject: "Chemistry",
    score: "92%",
    status: "completed",
    date: "2024-01-13",
  },
  {
    id: "ACT-004",
    student: {
      name: "David Wilson",
      email: "david.wilson@student.edu",
      avatar: "/placeholder.svg?height=32&width=32",
      studentId: "STU004",
    },
    activity: "Quiz Completed",
    subject: "Biology",
    score: "78%",
    status: "completed",
    date: "2024-01-12",
  },
  {
    id: "ACT-005",
    student: {
      name: "Emma Brown",
      email: "emma.brown@student.edu",
      avatar: "/placeholder.svg?height=32&width=32",
      studentId: "STU005",
    },
    activity: "Task Submitted",
    subject: "English",
    score: "88%",
    status: "completed",
    date: "2024-01-11",
  },
]

export function RecentOrders() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Student Activities</CardTitle>
        <CardDescription>Latest student submissions and quiz completions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.student.avatar || "/placeholder.svg"} alt={activity.student.name} />
                      <AvatarFallback>
                        {activity.student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{activity.student.name}</div>
                      <div className="text-sm text-muted-foreground">{activity.student.studentId}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.subject}</TableCell>
                <TableCell className="font-medium">{activity.score}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      activity.status === "completed"
                        ? "default"
                        : activity.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{activity.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
