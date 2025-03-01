import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard_Agency from "./pages/Dashboard_Agency";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard_User from "./pages/Dashboard_User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Chatbot from "./components/AI/AI";

// Admin Components
// import Analytics from "./components/Admin/Analytics";
import { Overview } from "./components/Admin/overview";
import Borrowers from "./components/Admin/Borrower";
import { LoanAnalytics } from "./components/Admin/loan-analytics";
import { PaymentAnalytics } from "./components/Admin/payment-analytics";
import { RecentApplications } from "./components/Admin/recent-applications";
// import RiskAssessment from "./components/Admin/RiskAssessment";
import Settings from "./components/Dashboard/Settings";
import Sidebar from "./components/Dashboard/Sidebar";
// import AdminLayout from "./components/Admin/AdminLayout"; // 

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard_user" element={<Dashboard_User />} />
        <Route path="/dashboard_agency" element={<Dashboard_Agency />} />
        {/* <Route path="/AI" element={<Chatbot />} /> */}

        {/* Admin Routes */}
        {/* <Route path="/admin" element={<AdminLayout />}> */}
          {/* <Route path="analytics" element={<Analytics />} /> */}
          <Route path="/admin/overview" element={<Overview />} />
          <Route path="/admin/borrowers" element={<Borrowers />} />
          <Route path="/admin/loan-analytics" element={<LoanAnalytics />} />
          <Route path="/admin/payment-analytics" element={<PaymentAnalytics />} />
          <Route path="/admin/recent-applications" element={<RecentApplications />} />
          {/* <Route path="/admin/risk-assessment" element={<RiskAssessment />} /> */}
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/*" element={<h1>Not Found</h1>} />
          <Route path="/admin/sidebar" element={<Sidebar />} />
        
      </Routes>
    </Router>
  );
}

export default App;