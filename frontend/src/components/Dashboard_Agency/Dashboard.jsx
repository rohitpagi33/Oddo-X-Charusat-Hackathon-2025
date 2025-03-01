import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { supabase }  from "../../supabaseClient";

const Dashboard = ({ agencyId }) => {
  const [loanStats, setLoanStats] = useState({
    totalLoans: 0,
    activeBorrowers: 0,
    recoveryRate: "0%",
    pendingApplications: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{ label: "Loan Amount", data: [], backgroundColor: "#fff" }],
  });

  // Fetch agency-related data
  useEffect(() => {
    const fetchData = async () => {
      if (!agencyId) return;

      // Fetch loan statistics
      let { data: stats, error: statsError } = await supabase
        .from("agency_data")
        .select("*")
        .eq("agency_id", agencyId)
        .single();

      if (statsError) console.error(statsError);
      else {
        setLoanStats({
          totalLoans: `₹${stats.total_loan_amount}`,
          activeBorrowers: `+${stats.borrower_count}`,
          recoveryRate: "98.3%", // You can calculate this based on real data
          pendingApplications: `+${stats.active_loans}`,
        });
      }

      // Fetch recent applications
      let { data: applications, error: appsError } = await supabase
        .from("loan_application")
        .select("borrower_name, loan_type, loan_amount, status")
        .eq("agency_id", agencyId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (appsError) console.error(appsError);
      else {
        setRecentApplications(
          applications.map((app) => ({
            name: app.borrower_name,
            loan: `${app.loan_type} - ₹${app.loan_amount}`,
            status: app.status,
            color: app.status === "Approved" ? "success" : app.status === "Rejected" ? "danger" : "secondary",
          }))
        );
      }

      // Fetch monthly loan data for the chart
      let { data: monthlyLoans, error: chartError } = await supabase.rpc("get_monthly_loans", {
        agency_id_input: agencyId,
      });

      if (chartError) console.error(chartError);
      else {
        setChartData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{ label: "Loan Amount", data: monthlyLoans.map((m) => m.amount), backgroundColor: "#fff" }],
        });
      }
    };

    fetchData();
  }, [agencyId]);

  return (
    <div className="text-white" style={{ background: "#121212", height: "100vh", overflow: "hidden" }}>
      <div className="row p-4">
        {/* Statistics Cards */}
        {[
          { title: "Total Loans", value: loanStats.totalLoans, change: "+20.1%", icon: "💰" },
          { title: "Active Borrowers", value: loanStats.activeBorrowers, change: "+180.1%", icon: "👥" },
          { title: "Recovery Rate", value: loanStats.recoveryRate, change: "+7%", icon: "📈" },
          { title: "Pending Applications", value: loanStats.pendingApplications, change: "+201", icon: "📑" },
        ].map((item, idx) => (
          <div className="col-md-3 mb-4" key={idx}>
            <div className="card bg-dark text-white p-3 border-0 rounded-3">
              <div className="d-flex align-items-center">
                <span className="fs-4 me-2">{item.icon}</span>
                <div>
                  <h5 className="mb-0">{item.title}</h5>
                  <h3 className="mb-0">{item.value}</h3>
                  <small className="text-success">{item.change} from last month</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row p-3">
        {/* Bar Chart Overview */}
        <div className="col-md-8 mb-4">
          <div className="card bg-dark text-white p-3 border-0 rounded-3">
            <h5>Overview</h5>
            <Bar data={chartData} />
          </div>
        </div>

        {/* Recent Applications */}
        <div className="col-md-4 mb-4">
          <div className="card bg-dark text-white p-3 border-0 rounded-3">
            <h5>Recent Applications</h5>
            <p className="small">You have {recentApplications.length} applications this month.</p>
            {recentApplications.map((app, idx) => (
              <div key={idx} className="d-flex align-items-center justify-content-between my-2">
                <div>
                  <strong>{app.name}</strong>
                  <p className="mb-0 small text-muted">{app.loan}</p>
                </div>
                <span className={`badge bg-${app.color} px-3 py-1`}>{app.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
