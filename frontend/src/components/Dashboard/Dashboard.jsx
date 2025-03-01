import { ArrowUpRight, Bell, CreditCard, IndianRupee, PieChart, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Dashboard</h1>
        <button className="btn btn-outline-secondary">
          <Bell className="h-4 w-4" />
        </button>
      </div>

      {/* Stats Cards */}
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

      {/* Loan Repayment Progress & Recent Activity */}
      <div className="row g-4 mt-4">
        <div className="col-lg-8">
          <div className="card p-3 shadow-sm">
            <h5>Loan Repayment Progress</h5>
            <p className="text-muted small">12 of 24 EMIs paid</p>
            <div className="progress" style={{ height: "8px" }}>
              <div className="progress-bar" style={{ width: "50%" }}></div>
            </div>
            <div className="row mt-3 text-center">
              {progressDetails.map((item, idx) => (
                <div key={idx} className="col">
                  <p className="text-muted small">{item.label}</p>
                  <p className="fw-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <h5>Recent Activity</h5>
            <p className="text-muted small">Your latest loan-related activities</p>
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

      {/* Alerts & Quick Actions */}
      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <div className="alert alert-warning d-flex align-items-center">
            <Bell className="me-2" />
            <div>
              <strong>Upcoming EMI Payment</strong>
              <p className="m-0 small">
                Your next EMI payment of ₹12,500 is due on 15 Feb 2024. Ensure sufficient balance.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Quick Actions</h5>
            <button className="btn btn-primary w-100 d-flex justify-content-between mt-2">
              View EMI Schedule <ArrowUpRight />
            </button>
            <button className="btn btn-outline-secondary w-100 d-flex justify-content-between mt-2">
              Download Statement <ArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Static Data for Cards
const stats = [
  { title: "Total Loan Amount", value: "₹2,50,000", description: "Disbursed on 15 Jan 2024", icon: IndianRupee },
  { title: "EMI Amount", value: "₹12,500", description: "Next due on 15 Feb 2024", icon: CreditCard },
  { title: "CIBIL Score", value: "750", description: "Last updated 2 days ago", icon: PieChart },
  { title: "Repayment Status", value: "On Track", description: "All EMIs paid on time", icon: Users },
];

const progressDetails = [
  { label: "Total EMIs", value: "24" },
  { label: "EMIs Paid", value: "12" },
  { label: "Remaining", value: "12" },
];

const activities = [
  { title: "EMI Payment Successful", description: "₹12,500 processed", date: "2h ago" },
  { title: "CIBIL Score Updated", description: "Your score increased to 750", date: "2d ago" },
  { title: "Document Verified", description: "Bank statement verified", date: "5d ago" },
];
