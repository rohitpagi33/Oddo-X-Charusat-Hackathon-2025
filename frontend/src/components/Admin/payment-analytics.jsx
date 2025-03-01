"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample payment data for the chart
const paymentData = [
  {
    month: "Jan",
    onTime: 4000,
    delayed: 2400,
    defaulted: 400,
  },
  {
    month: "Feb",
    onTime: 3000,
    delayed: 1398,
    defaulted: 210,
  },
  {
    month: "Mar",
    onTime: 2000,
    delayed: 9800,
    defaulted: 290,
  },
  {
    month: "Apr",
    onTime: 2780,
    delayed: 3908,
    defaulted: 100,
  },
  {
    month: "May",
    onTime: 1890,
    delayed: 4800,
    defaulted: 218,
  },
  {
    month: "Jun",
    onTime: 2390,
    delayed: 3800,
    defaulted: 250,
  },
];

// Sample payment methods data
const paymentMethods = [
  {
    name: "UPI",
    percentage: 60,
  },
  {
    name: "Net Banking",
    percentage: 25,
  },
  {
    name: "Credit/Debit Card",
    percentage: 10,
  },
  {
    name: "Others",
    percentage: 5,
  },
];

export function PaymentAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      {/* Payment Trends Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Payment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={paymentData}>
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line type="monotone" dataKey="onTime" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="delayed" stroke="#ffc658" strokeWidth={2} />
              <Line type="monotone" dataKey="defaulted" stroke="#ff7c43" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Methods Distribution */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.name} className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{method.name}</div>
                    <div className="text-sm text-muted-foreground">{method.percentage}%</div>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${method.percentage}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}