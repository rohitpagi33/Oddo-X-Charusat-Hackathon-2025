"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, ChartTooltip, Legend)

export function RiskAnalytics() {
  const riskData = {
    labels: ["Low Risk", "Medium Risk", "High Risk"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["rgb(130, 202, 157)", "rgb(255, 198, 88)", "rgb(255, 124, 67)"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <Doughnut
              data={riskData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Risk Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor) => (
              <div key={factor.name} className="flex items-center">
                <div className="w-full flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{factor.name}</div>
                    <div className="text-sm text-muted-foreground">{factor.impact}%</div>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${factor.impact}%` }} />
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

const riskFactors = [
  {
    name: "Credit Score",
    impact: 40,
  },
  {
    name: "Payment History",
    impact: 25,
  },
  {
    name: "Income Stability",
    impact: 20,
  },
  {
    name: "Debt-to-Income Ratio",
    impact: 15,
  },
]

