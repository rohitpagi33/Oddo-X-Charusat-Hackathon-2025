"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    month: "Jan",
    disbursed: 4000,
    recovered: 2400,
    defaulted: 400,
  },
  {
    month: "Feb",
    disbursed: 3000,
    recovered: 1398,
    defaulted: 210,
  },
  {
    month: "Mar",
    disbursed: 2000,
    recovered: 9800,
    defaulted: 290,
  },
  {
    month: "Apr",
    disbursed: 2780,
    recovered: 3908,
    defaulted: 100,
  },
  {
    month: "May",
    disbursed: 1890,
    recovered: 4800,
    defaulted: 218,
  },
  {
    month: "Jun",
    disbursed: 2390,
    recovered: 3800,
    defaulted: 250,
  },
];

const loanTypes = [
  {
    name: "Personal Loans",
    percentage: 45,
  },
  {
    name: "Business Loans",
    percentage: 30,
  },
  {
    name: "Education Loans",
    percentage: 15,
  },
  {
    name: "Home Loans",
    percentage: 10,
  },
];

export function LoanAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Loan Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line type="monotone" dataKey="disbursed" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="recovered" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="defaulted" stroke="#ff7c43" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Loan Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loanTypes.map((type) => (
              <div key={type.name} className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{type.name}</div>
                    <div className="text-sm text-muted-foreground">{type.percentage}%</div>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${type.percentage}%` }} />
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