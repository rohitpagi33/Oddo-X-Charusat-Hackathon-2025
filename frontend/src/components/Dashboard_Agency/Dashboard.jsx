import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { supabase } from "../../supabaseClient"; // Import your Supabase client instance

const Dashboard = () => {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve userId from localStorage
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User not found");
        setLoading(false);
        return;
      }

      try {
        // Fetch loan statistics for the given userId (which corresponds to agency_id)
        const { data: stats, error: statsError } = await supabase
          .from("agencies")
          .select("*")
          .eq("agency_id", userId)
          .single(); // Fetch a single row matching the agency_id

        if (statsError) {
          throw new Error(statsError.message);
        }

        setLoanStats({
          totalLoans: `₹${stats.total_loan_amount}`,
          activeBorrowers: `+${stats.borrower_count}`,
          recoveryRate: `${stats.recovery_rate}%`, // Use real recovery rate from your data
          pendingApplications: `+${stats.active_loans}`,
        });

        // Fetch recent loan applications for the given userId (which corresponds to agency_id)
        const { data: applications, error: appsError } = await supabase
          .from("loan_applications")
          .select("borrower, loan_type, loan_amount, status")
          .eq("agency_id", userId)
          .order("created_at", { ascending: false })
          .limit(5); // Fetch latest 5 applications

        if (appsError) {
          throw new Error(appsError.message);
        }

        setRecentApplications(
          applications.map((app) => ({
            name: app.borrower_name,
            loan: `${app.loan_type} - ₹${app.loan_amount}`,
            status: app.status,
            color: app.status === "Approved" ? "success" : app.status === "Rejected" ? "danger" : "secondary",
          }))
        );

        // Fetch monthly loan data (directly from the loan_application table)
        const { data: monthlyLoans, error: chartError } = await supabase
          .from("loan_applications")
          .select("loan_amount, created_at")
          .eq("agency_id", userId);

        if (chartError) {
          throw new Error(chartError.message);
        }

        // Process monthly data
        const monthlyData = Array(12).fill(0); // Initialize an array for each month (Jan to Dec)
        monthlyLoans.forEach((loan) => {
          const monthIndex = new Date(loan.created_at).getMonth(); // Get month index (0 = Jan, 11 = Dec)
          monthlyData[monthIndex] += loan.loan_amount;
        });

        setChartData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Loan Amount",
              data: monthlyData,
              backgroundColor: "#fff",
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError(err.message); // Set error message for display
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-white" style={{ background: "#121212", height: "100vh", overflow: "hidden" }}>
      <div className="row p-4">
        {/* Statistics Cards */}
        {[{ title: "Total Loans", value: loanStats.totalLoans, change: "+20.1%", icon: "💰" },
          { title: "Active Borrowers", value: loanStats.activeBorrowers, change: "+180.1%", icon: "👥" },
          { title: "Recovery Rate", value: loanStats.recoveryRate, change: "+7%", icon: "📈" },
          { title: "Pending Applications", value: loanStats.pendingApplications, change: "+201", icon: "📑" }]
          .map((item, idx) => (
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
