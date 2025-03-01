import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  // Sample data for the bar chart
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Loan Amount",
        data: [3000, 2500, 4500, 6000, 3200, 5100, 2800, 3400, 4700, 5200, 6100, 5800],
        backgroundColor: "#fff",
      },
    ],
  };

  return (
    <div className="container-fluid text-white" style={{ background: "#121212", minHeight: "100vh" }}>
      <div className="row p-4">
        {/* Statistics Cards */}
        {[
          { title: "Total Loans", value: "₹45,231.89", change: "+20.1%", icon: "💰" },
          { title: "Active Borrowers", value: "+2350", change: "+180.1%", icon: "👥" },
          { title: "Recovery Rate", value: "98.3%", change: "+7%", icon: "📈" },
          { title: "Pending Applications", value: "+573", change: "+201", icon: "📑" },
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

      <div className="row px-4">
        {/* Bar Chart Overview */}
        <div className="col-md-8 mb-4">
          <div className="card bg-dark text-white p-3 border-0 rounded-3">
            <h5>Overview</h5>
            <Bar data={chartData} />
          </div>
        </div>

        {/* Recent Applications */}
        <div className="col-md-4">
          <div className="card bg-dark text-white p-3 border-0 rounded-3">
            <h5>Recent Applications</h5>
            <p className="small">You have 265 applications this month.</p>
            {[
              { name: "Rahul Kumar", loan: "Personal Loan - ₹50,000", status: "Pending", color: "secondary" },
              { name: "Priya Singh", loan: "Business Loan - ₹2,00,000", status: "Approved", color: "success" },
              { name: "Amit Patel", loan: "Education Loan - ₹1,50,000", status: "Rejected", color: "danger" },
              { name: "Sneha Gupta", loan: "Personal Loan - ₹75,000", status: "Pending", color: "secondary" },
              { name: "Rajesh Sharma", loan: "Business Loan - ₹3,00,000", status: "Approved", color: "success" },
            ].map((app, idx) => (
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
