import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx"; // Example component
import Settings from "../components/Dashboard/Settings.jsx"; // Example component
import CIBIL from "../components/Dashboard/cibil.jsx"; // Example component
import Messages from "../components/Dashboard/Messages.jsx"; // Example component
import EMI_Schedual from "../components/Dashboard/EMI_schedules.jsx"; // Example component
import Apply_loan from "../components/Dashboard/Apply_loan.jsx"; // Example component
import { useState } from "react";
import KYCVerification from "../components/KYC/aadhar_kyc.jsx";

const UserDashboard = () => {
    const [activeComponent, setActiveComponent] = useState("dashboard"); // Default: Dashboard

  // Function to render the selected component
  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "apply_loan":
        return <Apply_loan />;
      case "cibil":
        return <CIBIL />;
      case "kyc":
        return <KYCVerification />;
      case "emi":
        return <EMI_Schedual />;
      case "messages":
          return <Messages />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar setActiveComponent={setActiveComponent} /> {/* Pass function to Sidebar */}
      <div className="content-section p-4" style={{ flex: 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
