"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey = "your-supabase-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export function LoanAnalytics() {
  const [data, setData] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: loanData, error: loanError } = await supabase
        .from("loan_performance")
        .select("*");

      const { data: loanTypeData, error: loanTypeError } = await supabase
        .from("loan_types")
        .select("*");

      if (loanError) {
        console.error("Error fetching loan performance data:", loanError);
      } else {
        setData(loanData);
      }

      if (loanTypeError) {
        console.error("Error fetching loan types data:", loanTypeError);
      } else {
        setLoanTypes(loanTypeData);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="card col-span-4">
        <div className="card-header">
          <h2 className="card-title">Loan Performance</h2>
        </div>
        <div className="card-content">
          <div className="responsive-container" style={{ width: "100%", height: 350 }}>
            <svg viewBox="0 0 500 350">
              <g transform="translate(50, 20)">
                <line x1="0" y1="300" x2="400" y2="300" stroke="#888888" />
                <line x1="0" y1="0" x2="0" y2="300" stroke="#888888" />
                {data.map((entry, index) => (
                  <g key={index}>
                    <circle cx={index * 70 + 50} cy={300 - entry.disbursed / 20} r="4" fill="#8884d8" />
                    <circle cx={index * 70 + 50} cy={300 - entry.recovered / 20} r="4" fill="#82ca9d" />
                    <circle cx={index * 70 + 50} cy={300 - entry.defaulted / 20} r="4" fill="#ff7c43" />
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="card col-span-3">
        <div className="card-header">
          <h2 className="card-title">Loan Distribution</h2>
        </div>
        <div className="card-content">
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
        </div>
      </div>
    </div>
  );
}