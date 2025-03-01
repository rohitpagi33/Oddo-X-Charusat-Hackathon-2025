"use client";

import React from "react";

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
      <div className="card col-span-4">
        <div className="card-header">
          <h2 className="card-title">Payment Trends</h2>
        </div>
        <div className="card-content">
          <div className="responsive-container" style={{ width: "100%", height: 350 }}>
            <svg viewBox="0 0 500 350">
              <g transform="translate(50, 20)">
                <line x1="0" y1="300" x2="400" y2="300" stroke="#888888" />
                <line x1="0" y1="0" x2="0" y2="300" stroke="#888888" />
                {paymentData.map((entry, index) => (
                  <g key={index}>
                    <circle cx={index * 70 + 50} cy={300 - entry.onTime / 20} r="4" fill="#82ca9d" />
                    <circle cx={index * 70 + 50} cy={300 - entry.delayed / 20} r="4" fill="#ffc658" />
                    <circle cx={index * 70 + 50} cy={300 - entry.defaulted / 20} r="4" fill="#ff7c43" />
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Payment Methods Distribution */}
      <div className="card col-span-3">
        <div className="card-header">
          <h2 className="card-title">Payment Methods</h2>
        </div>
        <div className="card-content">
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
        </div>
      </div>
    </div>
  );
}