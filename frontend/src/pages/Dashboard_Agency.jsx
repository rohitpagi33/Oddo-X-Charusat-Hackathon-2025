import React, { useState } from "react";
import Sidebar from "../components/Dashboard_Agency/Sidebar";
// import Dashboard from "../components/Dashboard_Agency/Dashboard.jsx";
// import Settings from "../components/Dashboard_Agency/Settings.jsx";
// import LoanApplication from "../components/Dashboard_Agency/LoanApplication.jsx";
// import Messages from "../components/Dashboard_Agency/Messages.jsx";
// import Borrower from "../components/Dashboard_Agency/Borrower.jsx";
import Dashboard from "../components/Dashboard_Agency/Dashboard";
import Settings from "../components/Dashboard_Agency/Settings";
import LoanApplication from "../components/Dashboard_Agency/LoanApplication";
import Messages from "../components/Dashboard_Agency/Messages";
import Transaction from "../components/Dashboard_Agency/Transcation";
import Borrower from "../components/Dashboard_Agency/Borrower";


const AgencyDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // Function to render the selected component
  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "loan-application":
        return <LoanApplication />;
      case "borrower":
        return <Borrower />;
      case "messages":
        return <Messages />;
    case "transaction":
        return <Transaction />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar setActiveComponent={setActiveComponent} /> {/* Pass function to Sidebar */}
      <div className="content-section " style={{ flex: 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AgencyDashboard;
