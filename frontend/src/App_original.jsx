// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthPage from "./pages/LoginPage"; // Ensure the correct path

// const Home = () => <h1 className="text-center mt-5">Welcome To MicroFin</h1>;

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<AuthPage type="login" />} />
//         <Route path="/register" element={<AuthPage type="register" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


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
import Analytics from "./components/Admin/Analytics";
import { Overview } from "./components/Admin/overview";
import Borrowers from "./components/Admin/Borrower";
import { LoanAnalytics } from "./components/Admin/loan-analytics";
import { Overview } from "./components/Admin/overview";
import { PaymentAnalytics } from "./components/Admin/payment-analytics";
import { RecentApplications } from "./components/Admin/recent-applications";
import RiskAssessment from "./components/Admin/RiskAssessment";
import Settings from "./components/Dashboard/Settings";
import Sidebar from "./components/Dashboard/Sidebar";


function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashbaord_user" element={<Dashboard_User />} />
        <Route path="/dashbaord_Agency" element={<Dashboard_Agency />} />
        {/* <Route path="/AI" element= {<Chatbot />} /> */}


      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="overview" element={<Overview />} />
          <Route path="borrowers" element={<Borrowers />} />
          <Route path="loan-analytics" element={<LoanAnalytics />} />
          <Route path="payment-analytics" element={<PaymentAnalytics />} />
          <Route path="recent-applications" element={<RecentApplications />} />
          <Route path="risk-assessment" element={<RiskAssessment />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route Sidebar="sidebar" element={<Sidebar/>} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
