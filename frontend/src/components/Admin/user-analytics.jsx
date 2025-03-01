"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const userData = [
  {
    month: "Jan",
    "New Users": 400,
    "Active Users": 240,
  },
  {
    month: "Feb",
    "New Users": 300,
    "Active Users": 139,
  },
  {
    month: "Mar",
    "New Users": 200,
    "Active Users": 980,
  },
  {
    month: "Apr",
    "New Users": 278,
    "Active Users": 390,
  },
  {
    month: "May",
    "New Users": 189,
    "Active Users": 480,
  },
  {
    month: "Jun",
    "New Users": 239,
    "Active Users": 380,
  },
]

export function UserAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={userData}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Bar dataKey="New Users" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              <Bar dataKey="Active Users" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary/50" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>User Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demographics.map((demo) => (
              <div key={demo.category} className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{demo.category}</div>
                    <div className="text-sm text-muted-foreground">{demo.percentage}%</div>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${demo.percentage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const demographics = [
  {
    category: "18-25 years",
    percentage: 25,
  },
  {
    category: "26-35 years",
    percentage: 45,
  },
  {
    category: "36-45 years",
    percentage: 20,
  },
  {
    category: "46+ years",
    percentage: 10,
  },
]

