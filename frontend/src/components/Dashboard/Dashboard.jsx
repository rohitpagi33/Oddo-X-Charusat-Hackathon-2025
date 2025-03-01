import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { ArrowUpRight, Bell, CreditCard, IndianRupee, PieChart, Users } from "lucide-react";


export default function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [progressDetails, setProgressDetails] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchLoanData();
    fetchRecentActivities();
  }, []);

  async function fetchLoanData() {
    const { data, error } = await supabase.from("loan_applications").select("*");
    if (error) {
      console.error("Error fetching loan applications:", error);
      return;
    }

    const totalLoans = data.length;
    const totalLoanAmount = data.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0);
    const totalEmisPaid = data.reduce((sum, loan) => sum + parseInt(loan.emi_paid), 0);
    const totalEmis = data.reduce((sum, loan) => sum + parseInt(loan.loan_tenure), 0);

    setStats([
      { title: "Total Loan Applications", value: totalLoans, description: "Total applications received", icon: Users },
      { title: "Total Loan Amount", value: `₹${totalLoanAmount.toLocaleString()}`, description: "Total disbursed amount", icon: IndianRupee },
      { title: "Total EMIs Paid", value: totalEmisPaid, description: "Across all loans", icon: CreditCard },
      { title: "CIBIL Score", value: "750", description: "Last updated 2 days ago", icon: PieChart },
    ]);

    setProgressDetails([
      { label: "Total EMIs", value: totalEmis.toString() },
      { label: "EMIs Paid", value: totalEmisPaid.toString() },
      { label: "Remaining", value: (totalEmis - totalEmisPaid).toString() },
    ]);
  }

  async function fetchRecentActivities() {
    const { data, error } = await supabase.from("recent_activities").select("*");
    if (error) {
      console.error("Error fetching recent activities:", error);
      return;
    }

    setActivities(
      data.map((activity) => ({
        title: activity.title,
        description: activity.description,
        date: `${new Date(activity.date).toLocaleDateString()} ${activity.time}`,
      }))
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Dashboard</h1>
      </div>

      <div className="row g-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card p-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="m-0">{stat.title}</h6>
                <stat.icon className="h-4 w-4 text-muted" />
              </div>
              <div className="mt-2">
                <h4 className="fw-bold">{stat.value}</h4>
                <p className="text-muted small">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-4">
        <div className="col-lg-8">
          <div className="card p-3 shadow-sm">
            <h5>Loan Repayment Progress</h5>
            <p className="text-muted small">{progressDetails[1]?.value} of {progressDetails[0]?.value} EMIs paid</p>
            <div className="progress" style={{ height: "8px" }}>
              <div className="progress-bar" style={{ width: `${(progressDetails[1]?.value / progressDetails[0]?.value) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <h5>Recent Activity</h5>
            {activities.map((activity, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                  <p className="m-0 fw-medium">{activity.title}</p>
                  <p className="text-muted small">{activity.description}</p>
                </div>
                <p className="text-muted small">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}